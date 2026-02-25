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
        // 1. Setup Kategori
        $catSmartphone = Category::create(['name' => 'Smartphone', 'slug' => 'smartphone']);
        $catLaptop = Category::create(['name' => 'Laptop', 'slug' => 'laptop']);
        $catTablet = Category::create(['name' => 'Tablet', 'slug' => 'tablet']);
        $catAksesoris = Category::create(['name' => 'Aksesoris', 'slug' => 'aksesoris']);

        // 2. Buat 3 User Seller
        for ($u = 1; $u <= 3; $u++) {
            $seller = User::create([
                'name' => "Juragan Gadget $u",
                'email' => "seller$u@gmail.com",
                'password' => Hash::make('password'),
                'role' => 'seller',
            ]);

            // 3. Buat Produk dengan SPESIFIKASI LENGKAP

            // --- Produk Smartphone ---
            Product::create([
                'user_id' => $seller->id,
                'category_id' => $catSmartphone->id,
                'title' => "iPhone 13 Pro Max $u",
                'slug' => Str::slug("iPhone 13 Pro Max $u") . '-' . uniqid(),
                'description' => 'Kondisi mulus, BH 90%, fullset original.',
                'price' => 12000000,
                'specifications' => [
                    'brand' => 'Apple',
                    'ram' => '6GB',
                    'storage' => '128GB',
                    'color' => 'Sierra Blue',
                    'battery_health' => '90%',
                    'screen_size' => '6.7 inch',
                    'condition' => 'Bekas - Seperti Baru'
                ]
            ]);

            // --- Produk Laptop ---
            Product::create([
                'user_id' => $seller->id,
                'category_id' => $catLaptop->id,
                'title' => "MacBook Air M1 2020 $u",
                'slug' => Str::slug("MacBook Air M1 2020 $u") . '-' . uniqid(),
                'description' => 'Siklus baterai rendah, jarang dipakai.',
                'price' => 10500000,
                'specifications' => [
                    'brand' => 'Apple',
                    'processor' => 'Apple M1',
                    'ram' => '8GB',
                    'storage' => '256GB SSD',
                    'gpu' => 'Integrated 7-core GPU',
                    'screen_size' => '13.3 inch',
                    'condition' => 'Bekas - Mulus'
                ]
            ]);

            // --- Produk Laptop Gaming ---
            Product::create([
                'user_id' => $seller->id,
                'category_id' => $catLaptop->id,
                'title' => "ASUS ROG Zephyrus G14 $u",
                'slug' => Str::slug("ASUS ROG Zephyrus G14 $u") . '-' . uniqid(),
                'description' => 'Laptop gaming powerfull, keyboard RGB normal.',
                'price' => 15000000,
                'specifications' => [
                    'brand' => 'ASUS',
                    'processor' => 'AMD Ryzen 9',
                    'ram' => '16GB',
                    'storage' => '1TB NVMe SSD',
                    'gpu' => 'NVIDIA RTX 3060',
                    'screen_size' => '14 inch 144Hz',
                    'condition' => 'Bekas - Lecet Pemakaian'
                ]
            ]);

             // --- Produk Tablet ---
             Product::create([
                'user_id' => $seller->id,
                'category_id' => $catTablet->id,
                'title' => "Samsung Galaxy Tab S8 $u",
                'slug' => Str::slug("Samsung Galaxy Tab S8 $u") . '-' . uniqid(),
                'description' => 'Tablet Android terbaik, S-Pen lancar.',
                'price' => 8500000,
                'specifications' => [
                    'brand' => 'Samsung',
                    'ram' => '8GB',
                    'storage' => '128GB',
                    'screen_size' => '11 inch',
                    'connectivity' => 'WiFi + Cellular',
                    'condition' => 'Bekas - Fullset'
                ]
            ]);
        }
        
        // Loop terpisah untuk image agar kode lebih rapi (opsional)
        $products = Product::all();
        foreach($products as $prod) {
            ProductImage::create([
                'product_id' => $prod->id,
                'image_path' => 'products/default.jpg',
            ]);
        }
    }
}