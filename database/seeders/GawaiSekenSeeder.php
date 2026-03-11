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
        $sellers = [];
        for ($u = 1; $u <= 3; $u++) {
            $sellers[] = User::create([
                'name' => "Juragan Gadget $u",
                'email' => "seller$u@gmail.com",
                'password' => Hash::make('password'),
                'role' => 'seller',
            ]);
        }

        // 3. Buat Produk Realistis
        $products_data = [
            [
                'category_id' => $catSmartphone->id,
                'title' => 'iPhone 15 Pro Natural Titanium',
                'brand' => 'Apple',
                'type' => 'Smartphone',
                'description' => 'iPhone 15 Pro 128GB Natural Titanium. Lengkap dengan box dan kabel original. Garansi iBox masih aktif.',
                'price' => 16500000,
                'specifications' => [
                    'ram' => '8GB',
                    'storage' => '128GB',
                    'color' => 'Natural Titanium',
                    'battery_health' => '100%',
                    'condition' => 'Seperti Baru'
                ],
                'images' => ['products/placeholder.png']
            ],
            [
                'category_id' => $catLaptop->id,
                'title' => 'MacBook Pro M3 Max 14 inch',
                'brand' => 'Apple',
                'type' => 'Laptop',
                'description' => 'MacBook Pro M3 Max 14-inch Space Black. RAM 36GB, SSD 1TB. Performa gila untuk editing video.',
                'price' => 45000000,
                'specifications' => [
                    'processor' => 'Apple M3 Max',
                    'ram' => '36GB',
                    'storage' => '1TB SSD',
                    'screen' => '14.2-inch Liquid Retina XDR',
                    'condition' => 'Mulus 99%'
                ],
                'images' => ['products/placeholder.png']
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'Samsung Galaxy S24 Ultra',
                'brand' => 'Samsung',
                'type' => 'Smartphone',
                'description' => 'Samsung Galaxy S24 Ultra 12GB/256GB Titanium Gray. Layar datar paling jernih dengan fitur AI.',
                'price' => 18000000,
                'specifications' => [
                    'ram' => '12GB',
                    'storage' => '256GB',
                    'color' => 'Titanium Gray',
                    'condition' => 'Lengkap/Fullset'
                ],
                'images' => ['products/placeholder.png']
            ]
        ];

        foreach ($products_data as $index => $data) {
            $seller = $sellers[$index % count($sellers)];
            $images = $data['images'];
            unset($data['images']);

            $product = Product::create(array_merge($data, [
                'user_id' => $seller->id,
                'slug' => Str::slug($data['title']) . '-' . uniqid(),
                'status' => 'available',
            ]));

            foreach ($images as $img) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $img,
                ]);
            }
        }
    }
}