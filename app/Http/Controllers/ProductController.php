<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Menampilkan form tambah produk
    public function create()
    {
        $categories = Category::all();
        return view('products.create', compact('categories'));
    }

    // Menyimpan produk ke database
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'brand' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'variant' => 'nullable|string|max:255',
            'condition' => 'required|string|max:255',
            'price' => 'required|numeric|min:1000',
            'description' => 'required|string',
            'specifications' => 'nullable|array',
            'specifications.battery_health' => 'nullable|numeric|min:0|max:100',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

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
            $title = trim($request->brand . ' ' . $request->type . ' ' . $request->variant);

            // 1. Simpan Data Produk
            $product = Product::create([
                'user_id' => Auth::id(),
                'category_id' => $request->category_id,
                'title' => $title,
                'slug' => Str::slug($title) . '-' . uniqid(),
                'brand' => $request->brand,
                'type' => $request->type,
                'variant' => $request->variant,
                'condition' => $request->condition,
                'reference_url' => $reference_url,
                'description' => $request->description,
                'price' => $request->price,
                'status' => 'available',
                'specifications' => $request->specifications,
            ]);

            // 2. Simpan Foto (bisa multiple)
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    if ($file->isValid()) {
                        // Resilient storage for Windows/Laragon where getRealPath() might return false
                        $tempPath = $file->getRealPath() ?: $file->getPathname();
                        $fileName = $file->hashName();
                        $path = "products/{$fileName}";

                        $stream = fopen($tempPath, 'r');
                        Storage::disk('public')->put($path, $stream);
                        if (is_resource($stream)) {
                            fclose($stream);
                        }

                        ProductImage::create([
                            'product_id' => $product->id,
                            'image_path' => $path,
                        ]);
                    }
                }
            }
        });

        return redirect()->route('dashboard')->with('status', 'Produk berhasil ditambahkan!');
    }

    public function edit(Product $product)
    {
        // Keamanan: Pastikan hanya pemilik yang bisa edit
        if ($product->user_id !== Auth::id()) {
            abort(403);
        }

        $categories = Category::all();
        // Load relasi category dan images agar tidak error di view
        $product->load('category', 'images');

        return view('products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        if ($product->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'brand' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'variant' => 'nullable|string|max:255',
            'condition' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'status' => 'required|in:available,sold',
            'specifications' => 'nullable|array',
            'specifications.battery_health' => 'nullable|numeric|min:0|max:100',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
            'delete_images' => 'nullable|array',
            'delete_images.*' => 'exists:product_images,id',
        ]);

        DB::transaction(function () use ($request, $product) {
            $catName = strtolower(trim($product->category->name ?? ''));
            $reference_url = null;
            if (in_array($catName, ['smartphone', 'tablet', 'smartphones', 'tablets'])) {
                $reference_url = 'https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=' . urlencode($request->brand . ' ' . $request->type);
            } elseif (in_array($catName, ['laptop', 'laptops'])) {
                $reference_url = 'https://www.google.com/search?q=' . urlencode($request->brand . ' ' . $request->type);
            }

            // Auto-generate title
            $title = trim($request->brand . ' ' . $request->type . ' ' . $request->variant);

            // 1. Update Data Teks
            $product->update([
                'title' => $title,
                'brand' => $request->brand,
                'type' => $request->type,
                'variant' => $request->variant,
                'condition' => $request->condition,
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

            // 3. Handle Tambah Foto Baru
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    if ($file->isValid()) {
                        $tempPath = $file->getRealPath() ?: $file->getPathname();
                        $fileName = $file->hashName();
                        $path = "products/{$fileName}";

                        $stream = fopen($tempPath, 'r');
                        Storage::disk('public')->put($path, $stream);
                        if (is_resource($stream)) {
                            fclose($stream);
                        }

                        ProductImage::create([
                            'product_id' => $product->id,
                            'image_path' => $path,
                        ]);
                    }
                }
            }
        });

        return redirect()->route('dashboard')->with('status', 'Produk berhasil diperbarui!');
    }

    public function show(Product $product)
    {
        // Pastikan load relasi user/toko agar bisa menampilkan info penjual
        $product->load(['user.profile', 'images']);

        return view('products.show', compact('product'));
    }

    public function destroy(Product $product)
    {
        // 1. Keamanan: Cek apakah yang menghapus adalah pemilik produk
        if ($product->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
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
}