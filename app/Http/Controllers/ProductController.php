<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Gate;
use App\Jobs\ProcessProductImage;


use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    // Menampilkan form tambah produk
    public function create(): Response
    {
        $categories = Category::all();
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
                    $reference_url = 'https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=' . urlencode($request->brand . ' ' . $request->type);
                } elseif (in_array($catName, ['laptop', 'laptops'])) {
                    $reference_url = 'https://www.google.com/search?q=' . urlencode($request->brand . ' ' . $request->type);
                }
            }

            // Auto-generate title
            $title = trim($request->brand . ' ' . $request->type);

            // 1. Simpan Data Produk
            $product = Product::create([
                'user_id' => Auth::id(),
                'category_id' => $request->category_id,
                'title' => $title,
                'slug' => Str::slug($title) . '-' . uniqid(),
                'brand' => $request->brand,
                'type' => $request->type,
                'condition' => $request->condition,
                'is_cod' => $request->boolean('is_cod'),
                'is_negotiable' => $request->boolean('is_negotiable', true),
                'reference_url' => $reference_url,
                'description' => $request->description,
                'price' => $request->price,
                'status' => 'available',
                'specifications' => $request->specifications,
            ]);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    if ($file->isValid()) {
                        // Simpan file sementara ke disk 'local' (bukan public)
                        $tempPath = $file->store('tmp', 'local');
                        $fileName = $file->hashName();

                        // Dispatch Job untuk proses kompresi, resize, dan penyimpanan final
                        ProcessProductImage::dispatch($product, $tempPath, $fileName)->afterCommit();
                    }
                }
            }
        });

        return redirect()->route('dashboard')->with('status', 'Produk berhasil ditambahkan!');
    }

    public function edit(Product $product): Response
    {
        Gate::authorize('update', $product);

        $categories = Category::all();
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
                $reference_url = 'https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=' . urlencode($request->brand . ' ' . $request->type);
            } elseif (in_array($catName, ['laptop', 'laptops'])) {
                $reference_url = 'https://www.google.com/search?q=' . urlencode($request->brand . ' ' . $request->type);
            }

            // Auto-generate title
            $title = trim($request->brand . ' ' . $request->type);

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
                'status' => $request->status,
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

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    if ($file->isValid()) {
                        // Simpan file sementara ke disk 'local' (bukan public)
                        $tempPath = $file->store('tmp', 'local');
                        $fileName = $file->hashName();

                        // Dispatch Job untuk proses kompresi, resize, dan penyimpanan final
                        ProcessProductImage::dispatch($product, $tempPath, $fileName)->afterCommit();
                    }
                }
            }
        });

        return redirect()->route('dashboard')->with('status', 'Produk berhasil diperbarui!');
    }

    public function show(Product $product): Response
    {
        // Pastikan load relasi store/toko agar bisa menampilkan info penjual
        $product->load(['store.profile', 'images', 'category']);

        return Inertia::render('Products/Show', compact('product'));
    }

    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);

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
        if (!$query) {
            return response()->json([]);
        }

        // Try a few known working unofficial API endpoints
        $endpoints = [
            "https://gsm-arena-api.vercel.app/search?q=",
            "https://gsmarena-api-six.vercel.app/api/search?q=",
            "https://azharimm-gsmarena-api.vercel.app/search?q="
        ];

        foreach ($endpoints as $url) {
            try {
                /** @var \Illuminate\Http\Client\Response $response */
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                ])->timeout(5)->get($url . urlencode($query));

                if ($response->successful()) {
                    $data = $response->json();

                    // Normalize the response
                    if (isset($data['data']))
                        return response()->json($data['data']);
                    if (isset($data['results']))
                        return response()->json($data['results']);
                    if (is_array($data))
                        return response()->json($data);
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
        if (!$slug) {
            return response()->json(['error' => 'Slug is required'], 400);
        }

        // We use the same endpoints but with a different path usually
        // Most of these unofficial APIs use /detail?id=slug or /product?id=slug
        $endpoints = [
            "https://gsm-arena-api.vercel.app/product/", // usually /product/:id
            "https://gsmarena-api-six.vercel.app/api/product/",
            "https://azharimm-gsmarena-api.vercel.app/product/"
        ];

        foreach ($endpoints as $url) {
            try {
                /** @var \Illuminate\Http\Client\Response $response */
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                ])->timeout(5)->get($url . $slug);

                if ($response->successful()) {
                    $data = $response->json();

                    // Normalize the response (extract RAM, Storage, etc.)
                    // Usually returned in 'specifications' or 'data'
                    $rawSpecs = $data['data'] ?? $data['specifications'] ?? $data;

                    return response()->json([
                        'success' => true,
                        'data' => $rawSpecs
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
            ->with(['images', 'category', 'store.profile'])
            ->latest()
            ->paginate($perPage);

        return Inertia::render('Products/Favorites', [
            'products' => $products
        ]);
    }

    public function toggleFavorite(Product $product)
    {
        $user = Auth::user();
        $favorites = $user->favorites ?? [];

        if (in_array($product->id, $favorites)) {
            $favorites = array_values(array_filter($favorites, fn($id) => $id !== $product->id));
            $status = 'removed';
        } else {
            $favorites[] = $product->id;
            $status = 'added';
        }

        $user->update(['favorites' => $favorites]);

        return back()->with('status', $status === 'added' ? 'Produk ditambahkan ke favorit' : 'Produk dihapus dari favorit');
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