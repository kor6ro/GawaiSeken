<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GawaiSekenSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat User Seller (Agar bisa akses Dashboard)
        $seller = User::create([
            'name' => 'Penjual Gadget',
            'email' => 'seller@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'seller',
        ]);

        // 2. Buat Kategori [cite: 88, 91, 95]
        $categories = ['Smartphone', 'Laptop', 'Tablet', 'Aksesoris'];
        foreach ($categories as $cat) {
            $category = Category::create([
                'name' => $cat,
                'slug' => Str::slug($cat),
            ]);

            // 3. Buat Produk Contoh untuk setiap kategori [cite: 36, 59, 71]
            for ($i = 1; $i <= 3; $i++) {
                $product = Product::create([
                    'user_id' => $seller->id, // [cite: 43]
                    'category_id' => $category->id, // [cite: 53]
                    'title' => $cat . ' Bekas Berkualitas ' . $i,
                    'slug' => Str::slug($cat . ' Bekas Berkualitas ' . $i) . '-' . uniqid(),
                    'description' => 'Deskripsi untuk ' . $cat . ' yang masih sangat mulus dan terawat.',
                    'price' => rand(1000000, 15000000), // [cite: 71, 72]
                    'status' => 'available', // [cite: 77, 78]
                ]);

                // 4. Tambahkan Dummy Image Path [cite: 11, 28, 29]
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => 'products/default.jpg', // Nanti bisa ganti file asli
                ]);
            }
        }
    }
}