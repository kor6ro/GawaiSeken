<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Jobs\ProcessProductImage;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    // Menampilkan form tambah produk
    public function create(): Response
    {
        $categories = Cache::remember('categories', 60 * 60 * 24, fn () => Category::all());

        return Inertia::render('Products/Create', compact('categories'));
    }

    // Menyimpan produk ke database
    public function store(StoreProductRequest $request)
    {
        DB::transaction(function () use ($request) {
            $category = Category::find($request->category_id);
            $reference_url = null;
            if ($category) {
                $catName = strtolower(trim($category->name));
                if (in_array($catName, ['smartphone', 'tablet', 'smartphones', 'tablets'])) {
                    $reference_url = 'https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName='.urlencode($request->brand.' '.$request->type);
                } elseif (in_array($catName, ['laptop', 'laptops'])) {
                    $reference_url = 'https://www.google.com/search?q='.urlencode($request->brand.' '.$request->type);
                }
            }

            // Auto-generate title
            $title = trim($request->brand.' '.$request->type);

            // 1. Simpan Data Produk
            $product = Product::create([
                'user_id' => Auth::id(),
                'category_id' => $request->category_id,
                'title' => $title,
                'slug' => Str::slug($title).'-'.uniqid(),
                'brand' => $request->brand,
                'type' => $request->type,
                'condition' => $request->condition,
                'is_cod' => $request->boolean('is_cod'),
                'is_negotiable' => $request->boolean('is_negotiable', true),
                'reference_url' => $reference_url,
                'description' => $request->description,
                'price' => $request->price,
                'availability' => 'available',
                'status' => 'pending',
                'specifications' => $request->specifications,
            ]);

            if ($request->hasFile('images')) {
                $images = $request->file('images');
                if (!is_array($images)) {
                    $images = [$images];
                }
                
                $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver);
                
                foreach ($images as $file) {
                    if (!$file->isValid()) continue;
                    try {
                        $extension = $file->getClientOriginalExtension() ?: 'jpg';
                        $fileName  = Str::uuid()->toString() . '.' . $extension;
                        $finalPath = "products/{$fileName}";

                        // Use getContent() — works reliably in PHP 8.4 multipart uploads
                        // where getRealPath() returns empty and UploadedFile object reading fails
                        $imageContent = $file->getContent();
                        $image = $manager->read($imageContent);

                        $image->scale(width: 1200);
                        $encoded = $image->toJpeg(80);

                        if (!Storage::disk('public')->exists('products')) {
                            Storage::disk('public')->makeDirectory('products');
                        }

                        if (Storage::disk('public')->put($finalPath, $encoded->toString())) {
                            ProductImage::create([
                                'product_id' => $product->id,
                                'image_path' => $finalPath,
                            ]);
                        }
                    } catch (\Throwable $e) {
                        \Illuminate\Support\Facades\Log::error('Image store failed: ' . $e->getMessage());
                    }
                }
            }
        });

        return redirect()->route('dashboard')->with('status', 'Produk berhasil ditambahkan!');
    }

    public function edit(Product $product): Response
    {
        Gate::authorize('update', $product);

        $categories = Cache::remember('categories', 60 * 60 * 24, fn () => Category::all());
        // Load relasi category dan images agar tidak error di view
        $product->load('category', 'images');

        return Inertia::render('Products/Edit', compact('product', 'categories'));
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        Gate::authorize('update', $product);

        DB::transaction(function () use ($request, $product) {
            $catName = strtolower(trim($product->category->name ?? ''));
            $reference_url = null;
            if (in_array($catName, ['smartphone', 'tablet', 'smartphones', 'tablets'])) {
                $reference_url = 'https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName='.urlencode($request->brand.' '.$request->type);
            } elseif (in_array($catName, ['laptop', 'laptops'])) {
                $reference_url = 'https://www.google.com/search?q='.urlencode($request->brand.' '.$request->type);
            }

            // Auto-generate title
            $title = trim($request->brand.' '.$request->type);

            // Auto-pend jika judul atau deskripsi berubah
            $newStatus = $product->status;
            if ($product->title !== $title || $product->description !== $request->description) {
                $newStatus = 'pending';
            }

            // 1. Update Data Teks
            $product->update([
                'title' => $title,
                'brand' => $request->brand,
                'type' => $request->type,
                'condition' => $request->condition,
                'is_cod' => $request->boolean('is_cod'),
                'is_negotiable' => $request->boolean('is_negotiable'),
                'reference_url' => $reference_url,
                'price' => $request->price,
                'description' => $request->description,
                'availability' => $request->availability,
                'status' => $newStatus,
                'specifications' => $request->specifications,
            ]);

            // 2. Handle Hapus Foto yang dipilih
            if ($request->filled('delete_images')) {
                $imagesToDelete = ProductImage::whereIn('id', $request->delete_images)
                    ->where('product_id', $product->id)
                    ->get();

                foreach ($imagesToDelete as $img) {
                    Storage::disk('public')->delete($img->image_path);
                    $img->delete();
                }
            }

            // 3. Handle Upload Foto Baru
            if ($request->hasFile('images')) {
                $images = $request->file('images');
                if (!is_array($images)) {
                    $images = [$images];
                }
                
                $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver);

                foreach ($images as $file) {
                    if (!$file->isValid()) continue;
                    try {
                        $extension = $file->getClientOriginalExtension() ?: 'jpg';
                        $fileName  = Str::uuid()->toString() . '.' . $extension;
                        $finalPath = "products/{$fileName}";

                        // Use getContent() — works reliably in PHP 8.4 multipart uploads
                        $imageContent = $file->getContent();
                        $image = $manager->read($imageContent);

                        $image->scale(width: 1200);
                        $encoded = $image->toJpeg(80);

                        if (!Storage::disk('public')->exists('products')) {
                            Storage::disk('public')->makeDirectory('products');
                        }

                        if (Storage::disk('public')->put($finalPath, $encoded->toString())) {
                            ProductImage::create([
                                'product_id' => $product->id,
                                'image_path' => $finalPath,
                            ]);
                        }
                    } catch (\Throwable $e) {
                        \Illuminate\Support\Facades\Log::error('Image update failed: ' . $e->getMessage());
                    }
                }
            }
        });

        return redirect()->route('dashboard')->with('status', 'Produk berhasil diperbarui!');
    }

    public function show(Product $product): Response
    {
        // Hanya tampilkan produk aktif ke publik, kecuali pemilik atau admin
        if ($product->status !== 'active' && 
            (!Auth::check() || (Auth::id() !== $product->user_id && !Auth::user()->isAdmin()))
        ) {
            abort(404, 'Produk sedang dalam moderasi atau tidak tersedia.');
        }

        // Pastikan load relasi store/toko agar bisa menampilkan info penjual
        $product->load(['store.profile', 'images', 'category']);

        // Data nego aktif buyer untuk produk ini (jika login)
        $myNegotiation = null;
        $myActiveTransaction = null;

        if (Auth::check() && Auth::id() !== $product->user_id) {
            $myNegotiation = \App\Models\Negotiation::where('product_id', $product->id)
                ->where('buyer_id', Auth::id())
                ->whereIn('status', ['pending', 'countered', 'accepted'])
                ->where(function ($q) {
                    $q->where('expires_at', '>', now())->orWhere('status', 'accepted');
                })
                ->latest()
                ->first();

            $myActiveTransaction = \App\Models\Transaction::where('product_id', $product->id)
                ->where('buyer_id', Auth::id())
                ->whereNotIn('status', ['completed', 'canceled'])
                ->first();
        }

        return Inertia::render('Products/Show', [
            'product'             => $product,
            'myNegotiation'       => $myNegotiation,
            'myActiveTransaction' => $myActiveTransaction,
        ]);
    }

    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);

        // Jangan izinkan penghapusan jika produk sudah terjual (availability = sold)
        // karena dibutuhkan untuk riwayat transaksi
        if ($product->availability === 'sold') {
            return redirect()->back()->with('error', 'Produk yang sudah terjual tidak dapat dihapus.');
        }

        // 2. Hapus File Gambar dari Storage (Agar hemat penyimpanan)
        if ($product->images->isNotEmpty()) {
            foreach ($product->images as $image) {
                // Hapus file fisik di folder storage/app/public/products/
                Storage::disk('public')->delete($image->image_path);
                // Hapus record gambar di database
                $image->delete();
            }
        }

        // 3. Hapus Produk dari Database
        $product->delete();

        // 4. Kembali ke Dashboard dengan pesan sukses
        return redirect()->route('dashboard')->with('status', 'Produk berhasil dihapus.');
    }

    public function searchGsmArena(Request $request)
    {
        $query = $request->query('q');
        if (! $query) {
            return response()->json([]);
        }

        // Try a few known working unofficial API endpoints
        $endpoints = [
            'https://gsm-arena-api.vercel.app/search?q=',
            'https://gsmarena-api-six.vercel.app/api/search?q=',
            'https://azharimm-gsmarena-api.vercel.app/search?q=',
        ];

        foreach ($endpoints as $url) {
            try {
                /** @var \Illuminate\Http\Client\Response $response */
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                ])->timeout(5)->get($url.urlencode($query));

                if ($response->successful()) {
                    $data = $response->json();

                    // Normalize the response
                    if (isset($data['data'])) {
                        return response()->json($data['data']);
                    }
                    if (isset($data['results'])) {
                        return response()->json($data['results']);
                    }
                    if (is_array($data)) {
                        return response()->json($data);
                    }
                }
            } catch (\Exception $e) {
                // Continue to next endpoint
            }
        }

        return response()->json([]);
    }

    public function getGsmArenaDetails(Request $request)
    {
        $slug = $request->query('slug');
        if (! $slug) {
            return response()->json(['error' => 'Slug is required'], 400);
        }

        // We use the same endpoints but with a different path usually
        // Most of these unofficial APIs use /detail?id=slug or /product?id=slug
        $endpoints = [
            'https://gsm-arena-api.vercel.app/product/', // usually /product/:id
            'https://gsmarena-api-six.vercel.app/api/product/',
            'https://azharimm-gsmarena-api.vercel.app/product/',
        ];

        foreach ($endpoints as $url) {
            try {
                /** @var \Illuminate\Http\Client\Response $response */
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                ])->timeout(5)->get($url.$slug);

                if ($response->successful()) {
                    $data = $response->json();

                    // Normalize the response (extract RAM, Storage, etc.)
                    // Usually returned in 'specifications' or 'data'
                    $rawSpecs = $data['data'] ?? $data['specifications'] ?? $data;

                    return response()->json([
                        'success' => true,
                        'data' => $rawSpecs,
                    ]);
                }
            } catch (\Exception $e) {
                // Continue
            }
        }

        return response()->json(['error' => 'Device details not found'], 404);
    }

    public function favorites(): Response
    {
        $user = Auth::user();
        $favoriteIds = $user->favorites ?? [];

        $isMobile = preg_match('/Mobile|Android|iPhone/i', request()->userAgent());
        $perPage = $isMobile ? 8 : 15;

        $products = Product::whereIn('id', $favoriteIds)
            ->where('user_id', '!=', $user->id)
            ->with(['images', 'category', 'store.profile', 'activeNegotiation' => function($q) use ($user) {
                $q->where('buyer_id', $user->id)
                  ->whereIn('status', ['pending', 'countered', 'accepted', 'rejected'])
                  ->where(function ($query) {
                      $query->where('expires_at', '>', now())->orWhere('status', 'accepted')->orWhere('status', 'rejected');
                  });
            }])
            ->latest()
            ->paginate($perPage);

        return Inertia::render('Products/Favorites', [
            'products' => $products,
        ]);
    }

    public function toggleFavorite(Product $product)
    {
        $user = Auth::user();

        if ($product->user_id === $user->id) {
            return back()->with('error', 'Produk jualan sendiri tidak bisa ditambahkan ke keranjang.');
        }

        $favorites = $user->favorites ?? [];

        if (in_array($product->id, $favorites)) {
            $favorites = array_values(array_filter($favorites, fn ($id) => $id !== $product->id));
            $status = 'removed';
        } else {
            $favorites[] = $product->id;
            $status = 'added';
        }

        $user->update(['favorites' => $favorites]);

        return back()->with('status', $status === 'added' ? 'Berhasil ditambahkan ke keranjang.' : 'Produk dihapus dari keranjang.');
    }

    public function toggleStatus(Product $product)
    {
        Gate::authorize('update', $product);

        $newAvailability = $product->availability === 'available' ? 'sold' : 'available';
        $product->update(['availability' => $newAvailability]);

        return back()->with('status', 'Status ketersediaan produk berhasil diperbarui.');
    }

    public function report(Request $request, Product $product)
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $reports = $product->reports ?? [];
        $reports[] = [
            'user_id' => Auth::id(),
            'reason' => $request->reason,
            'date' => now()->toDateTimeString(),
        ];

        $product->update(['reports' => $reports]);

        return back()->with('status', 'Laporan Anda telah terkirim. Terima kasih.');
    }
}
