<?php

namespace Database\Seeders;

use App\Enums\ProductConditionEnum;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RealDataSeeder extends Seeder
{
    public function run(): void
    {
        // 0. Create Admin
        User::updateOrCreate(
            ['email' => 'admin@gawaiseken.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // 1. Get Categories (They are already created by CategorySeeder)
        $smartphone = Category::where('slug', 'smartphone')->first();
        $laptop = Category::where('slug', 'laptop')->first();
        $tablet = Category::where('slug', 'tablet')->first();
        $audio = Category::where('slug', 'audio')->first();

        // 2. Create Buyers
        $buyers = [
            ['name' => 'Ahmad', 'email' => 'ahmad@example.com', 'avatar' => 'https://i.pravatar.cc/150?u=ahmad'],
            ['name' => 'Mus', 'email' => 'mus@example.com', 'avatar' => 'https://i.pravatar.cc/150?u=mus'],
        ];

        foreach ($buyers as $buyerData) {
            $user = User::updateOrCreate(
                ['email' => $buyerData['email']],
                [
                    'name' => $buyerData['name'],
                    'password' => Hash::make('password'),
                    'role' => 'buyer',
                ]
            );

            $avatarPath = $this->downloadImage($buyerData['avatar'], 'avatars/personal');
            
            $user->profile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'avatar' => $avatarPath,
                    'phone' => '08' . rand(1000000000, 9999999999),
                    'city' => 'Jakarta',
                ]
            );
        }

        // 3. Create Sellers
        $sellersData = [
            [
                'name' => 'Gilang',
                'email' => 'gilang@example.com',
                'store_name' => 'Gilang Gadget Store',
                'city' => 'Jakarta Selatan',
                'avatar' => 'https://i.pravatar.cc/150?u=gilang',
                'store_logo' => 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200&h=200',
                'products' => [
                    [
                        'category_id' => $smartphone->id,
                        'title' => 'iPhone 13 Pro 256GB Sierra Blue',
                        'brand' => 'Apple',
                        'type' => 'Smartphone',
                        'condition' => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price' => 11500000,
                        'description' => 'iPhone 13 Pro 256GB Sierra Blue. Kondisi fisik 99% mulus, baterai HP 90%. Kelengkapan fullset original.',
                        'is_cod' => true,
                        'is_negotiable' => true,
                        'specifications' => ['ram' => '6GB', 'storage' => '256GB', 'color' => 'Sierra Blue'],
                        'image' => 'products/iphone13.jpg',
                    ],
                    [
                        'category_id' => $laptop->id,
                        'title' => 'MacBook Air M1 2020 8/256GB Grey',
                        'brand' => 'Apple',
                        'type' => 'Laptop',
                        'condition' => ProductConditionEnum::SECOND_GOOD->value,
                        'price' => 9500000,
                        'description' => 'MacBook Air M1 RAM 8GB SSD 256GB. Unit sangat terawat, cycle count rendah. Siap pakai untuk kerja atau kuliah.',
                        'is_cod' => false,
                        'is_negotiable' => true,
                        'specifications' => ['processor' => 'Apple M1', 'ram' => '8GB', 'storage' => '256GB'],
                        'image' => 'products/macbook.jpg',
                    ],
                    [
                        'category_id' => $tablet->id,
                        'title' => 'iPad Air 4th Gen WiFi 64GB',
                        'brand' => 'Apple',
                        'type' => 'Tablet',
                        'condition' => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price' => 6500000,
                        'description' => 'iPad Air 4 64GB WiFi Only Sky Blue. Bonus Apple Pencil 2nd Gen Clone. Layar jernih no minus.',
                        'is_cod' => true,
                        'is_negotiable' => false,
                        'specifications' => ['ram' => '4GB', 'storage' => '64GB', 'chipset' => 'A14 Bionic'],
                        'image' => 'products/ipad.jpg',
                    ],
                ],
            ],
            [
                'name' => 'Vyno',
                'email' => 'vyno@example.com',
                'store_name' => 'Vyno Tech Hub',
                'city' => 'Bandung',
                'avatar' => 'https://i.pravatar.cc/150?u=vyno',
                'store_logo' => 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=200&h=200',
                'products' => [
                    [
                        'category_id' => $smartphone->id,
                        'title' => 'Samsung Galaxy S22 Ultra 12/256GB',
                        'brand' => 'Samsung',
                        'type' => 'Smartphone',
                        'condition' => ProductConditionEnum::SECOND_GOOD->value,
                        'price' => 9200000,
                        'description' => 'Samsung S22 Ultra Phantom Black. S-Pen masih empuk, layar aman no sadow. Minus lecet pemakaian tipis di bezel.',
                        'is_cod' => true,
                        'is_negotiable' => true,
                        'specifications' => ['ram' => '12GB', 'storage' => '256GB', 'color' => 'Phantom Black'],
                        'image' => 'products/samsung.jpg',
                    ],
                    [
                        'category_id' => $laptop->id,
                        'title' => 'ASUS ROG Zephyrus G14 Gaming Laptop',
                        'brand' => 'ASUS',
                        'type' => 'Laptop',
                        'condition' => ProductConditionEnum::MINUS->value,
                        'price' => 14500000,
                        'description' => 'Laptop Gaming Slim ROG Zephyrus G14. Ryzen 9, RTX 3060. Minus batre drop, harus dicolok charger terus.',
                        'is_cod' => false,
                        'is_negotiable' => true,
                        'specifications' => ['processor' => 'Ryzen 9', 'gpu' => 'RTX 3060', 'ram' => '16GB'],
                        'image' => 'products/rog.jpg',
                    ],
                    [
                        'category_id' => $audio->id,
                        'title' => 'Sony WH-1000XM4 Noise Cancelling',
                        'brand' => 'Sony',
                        'type' => 'Headphone',
                        'condition' => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price' => 3200000,
                        'description' => 'Sony XM4 Headphones Black. Noise cancelling terbaik, suara mantap. Lengkap dengan pouch dan kabel original.',
                        'is_cod' => true,
                        'is_negotiable' => false,
                        'specifications' => ['battery_life' => '30h', 'bluetooth' => '5.0'],
                        'image' => 'products/sony.jpg',
                    ],
                ],
            ],
        ];

        foreach ($sellersData as $sellerData) {
            $seller = User::updateOrCreate(
                ['email' => $sellerData['email']],
                [
                    'name' => $sellerData['name'],
                    'password' => Hash::make('password'),
                    'role' => 'seller',
                ]
            );

            $avatarPath = $this->downloadImage($sellerData['avatar'], 'avatars/personal');
            $logoPath = $this->downloadImage($sellerData['store_logo'], 'avatars/logos');

            $seller->profile()->updateOrCreate(
                ['user_id' => $seller->id],
                [
                    'store_name' => $sellerData['store_name'],
                    'city' => $sellerData['city'],
                    'bio' => "Saya adalah pemilik {$sellerData['store_name']}.", // Personal bio
                    'store_bio' => "Selamat datang di {$sellerData['store_name']}! Kami menjual gadget second berkualitas tinggi.",
                    'phone' => '0812'.rand(10000000, 99999999),
                    'address' => 'Alamat Rumah Seller No. '.rand(1, 100), // Personal address
                    'store_address' => 'Jl. Gadget Real No. '.rand(1, 100).', '.$sellerData['city'], // Store address
                    'avatar' => $avatarPath,
                    'store_logo' => $logoPath,
                ]
            );

            foreach ($sellerData['products'] as $p) {
                $imagePath = $p['image'];
                unset($p['image']);

                $product = Product::create(array_merge($p, [
                    'user_id' => $seller->id,
                    'slug' => Str::slug($p['title']).'-'.Str::random(5),
                    'availability' => 'available',
                    'status' => 'active',
                ]));

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $imagePath,
                ]);
            }
        }
    }

    /**
     * Download image from URL and save to local storage.
     */
    private function downloadImage($url, $directory)
    {
        try {
            // Use a simple stream context to avoid some basic 403s
            $options = [
                'http' => [
                    'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3\r\n"
                ]
            ];
            $context = stream_context_create($options);
            $contents = file_get_contents($url, false, $context);
            
            if ($contents === false) return null;

            $filename = Str::random(15) . '.jpg';
            $path = "$directory/$filename";
            
            Storage::disk('public')->put($path, $contents);
            return $path;
        } catch (\Exception $e) {
            return null;
        }
    }
}
