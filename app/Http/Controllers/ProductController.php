<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
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
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:1000',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Validasi foto
        ]);

        // 1. Simpan Data Produk
        $product = Product::create([
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'description' => $request->description,
            'price' => $request->price,
            'status' => 'available',
        ]);

        // 2. Simpan Foto (jika ada)
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $path,
            ]);
        }

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
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'status' => 'required|in:available,sold',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // 1. Update Data Teks
        $product->update([
            'title' => $request->title,
            'price' => $request->price,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        // 2. Handle Ganti Foto (Jika user upload foto baru)
        if ($request->hasFile('image')) {
            // Hapus foto lama dari storage
            $oldImage = $product->images()->first();
            if ($oldImage) {
                Storage::disk('public')->delete($oldImage->image_path);
                $oldImage->delete();
            }

            // Upload foto baru
            $path = $request->file('image')->store('products', 'public');
            
            // Simpan ke database
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $path,
            ]);
        }

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
                foreach($product->images as $image) {
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
}