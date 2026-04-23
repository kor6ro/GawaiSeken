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

class GawaiSekenSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Setup Kategori
        $catSmartphone = Category::create(['name' => 'Smartphone', 'slug' => 'smartphone']);
        $catLaptop = Category::create(['name' => 'Laptop', 'slug' => 'laptop']);
        $catTablet = Category::create(['name' => 'Tablet', 'slug' => 'tablet']);
        $catAksesoris = Category::create(['name' => 'Aksesoris', 'slug' => 'aksesoris']);

        // 2. Buat 3 User Seller dengan Profil
        $sellers = [];
        $cities = ['Jakarta Selatan', 'Bandung', 'Surabaya'];
        for ($u = 1; $u <= 3; $u++) {
            $seller = User::create([
                'name' => "Juragan Gadget $u",
                'email' => "seller$u@gmail.com",
                'password' => Hash::make('password'),
                'role' => 'seller',
            ]);

            $avatarPath = $this->downloadImage("https://i.pravatar.cc/150?u=seller$u", 'avatars/personal');
            $logoPath = $this->downloadImage("https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200&h=200", 'avatars/logos');

            $seller->profile()->create([
                'store_name' => "Toko Gadget $u",
                'city' => $cities[$u - 1],
                'is_ktp_verified' => ($u === 1), // Seller 1 is Premium
                'phone' => "08123456780$u",
                'address' => "Jl. Gadget No. $u, ".$cities[$u - 1],
                'bio' => "Penyedia gadget berkualitas se-{$cities[$u - 1]}.",
                'avatar' => $avatarPath,
                'store_logo' => $logoPath,
            ]);

            $sellers[] = $seller;
        }

        // 3. Buat Produk Realistis
        $products_data = [
            [
                'category_id' => $catSmartphone->id,
                'title' => 'iPhone 15 Pro Natural Titanium',
                'brand' => 'Apple',
                'type' => 'Smartphone',
                'condition' => ProductConditionEnum::SECOND_LIKE_NEW->value,

                'is_cod' => true,
                'is_negotiable' => false,
                'description' => 'iPhone 15 Pro 128GB Natural Titanium. BNIB Segel. Garansi iBox resmi.',
                'price' => 18500000,
                'specifications' => [
                    'ram' => '8GB',
                    'storage' => '128GB',
                    'color' => 'Natural Titanium',
                    'battery_health' => '100%',
                    'condition' => 'Seperti Baru',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catLaptop->id,
                'title' => 'MacBook Pro M3 Max 14 inch',
                'brand' => 'Apple',
                'type' => 'Laptop',
                'condition' => ProductConditionEnum::SECOND_LIKE_NEW->value,

                'is_cod' => true,
                'is_negotiable' => true,
                'description' => 'MacBook Pro M3 Max 14-inch Space Black. RAM 36GB, SSD 1TB. Fisik sangat mulus.',
                'price' => 45000000,
                'specifications' => [
                    'processor' => 'Apple M3 Max',
                    'ram' => '36GB',
                    'storage' => '1TB SSD',
                    'screen' => '14.2-inch Liquid Retina XDR',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'Samsung Galaxy S24 Ultra',
                'brand' => 'Samsung',
                'type' => 'Smartphone',
                'condition' => ProductConditionEnum::SECOND_GOOD->value,

                'is_cod' => false,
                'is_negotiable' => true,
                'description' => 'Samsung Galaxy S24 Ultra 12GB/256GB Platinum Silver. Kaca belakang ada retak tipis di pojok kanan bawah. Fungsi 100% normal.',
                'price' => 14000000,
                'specifications' => [
                    'ram' => '12GB',
                    'storage' => '256GB',
                    'color' => 'Titanium Gray',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catTablet->id,
                'title' => 'iPad Pro M4 11-inch',
                'brand' => 'Apple',
                'type' => 'Tablet',
                'description' => 'iPad Pro M4 256GB Space Black. Sangat tipis dan kencang. Termasuk Apple Pencil Pro.',
                'price' => 16000000,
                'specifications' => [
                    'storage' => '256GB',
                    'chip' => 'Apple M4',
                    'screen' => '11-inch Ultra Retina XDR',
                    'condition' => 'Mulus 98%',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catAksesoris->id,
                'title' => 'Sony WH-1000XM5',
                'brand' => 'Sony',
                'type' => 'Headphone',
                'description' => 'Headphone Noise Cancelling terbaik. Suara jernih dan bass mantap. Lengkap dengan case.',
                'price' => 3500000,
                'specifications' => [
                    'battery_life' => 'Up to 30 hours',
                    'noise_cancelling' => 'Yes, Active',
                    'color' => 'Black',
                    'condition' => 'Pemakaian wajar, earpad masih bagus',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catLaptop->id,
                'title' => 'ASUS ROG Zephyrus G14',
                'brand' => 'ASUS',
                'type' => 'Laptop',
                'description' => 'Laptop gaming compact yang powerful. AMD Ryzen 9, RTX 4060, layar OLED 120Hz.',
                'price' => 22000000,
                'specifications' => [
                    'processor' => 'AMD Ryzen 9 7940HS',
                    'ram' => '16GB',
                    'gpu' => 'NVIDIA RTX 4060',
                    'storage' => '1TB SSD',
                    'condition' => 'Mulus, no minus',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'Google Pixel 8 Pro',
                'brand' => 'Google',
                'type' => 'Smartphone',
                'description' => 'Google Pixel 8 Pro Obsidian Black. Kamera mumpuni khas Pixel, murni Android.',
                'price' => 13500000,
                'specifications' => [
                    'ram' => '12GB',
                    'storage' => '128GB',
                    'color' => 'Obsidian Black',
                    'condition' => 'Lengkap, minus lecet pemakaian tipis',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catLaptop->id,
                'title' => 'Lenovo ThinkPad X1 Carbon Gen 11',
                'brand' => 'Lenovo',
                'type' => 'Laptop',
                'description' => 'Laptop bisnis legendaris. Core i7 Gen 13, ringan dan baterai awet. Cocok buat kerja.',
                'price' => 19500000,
                'specifications' => [
                    'processor' => 'Intel Core i7-1355U',
                    'ram' => '16GB',
                    'storage' => '512GB SSD',
                    'weight' => '1.12 kg',
                    'condition' => 'Keyboard masih empuk, layar jernih',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catAksesoris->id,
                'title' => 'Apple AirPods Pro 2',
                'brand' => 'Apple',
                'type' => 'TWS',
                'description' => 'AirPods Pro Gen 2 dengan USB-C magsafe charging case. ANC mantap.',
                'price' => 2800000,
                'specifications' => [
                    'type' => 'In-Ear',
                    'connection' => 'Bluetooth 5.3',
                    'condition' => 'Seperti Baru, include eartips cadangan',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catTablet->id,
                'title' => 'Samsung Galaxy Tab S9 Ultra',
                'brand' => 'Samsung',
                'type' => 'Tablet',
                'description' => 'Tablet layar besar 14.6 inch Dynamic AMOLED 2X. Include S-Pen.',
                'price' => 15000000,
                'specifications' => [
                    'ram' => '12GB',
                    'storage' => '256GB',
                    'screen' => '14.6-inch',
                    'condition' => 'Mulus, free book cover keyboard',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catAksesoris->id,
                'title' => 'Logitech MX Master 3S',
                'brand' => 'Logitech',
                'type' => 'Mouse',
                'description' => 'Mouse produktivitas terbaik. Klik silent, scroll wheel magnetic.',
                'price' => 1200000,
                'specifications' => [
                    'dpi' => '8000 DPI sensor',
                    'connectivity' => 'Bluetooth / Logi Bolt',
                    'condition' => 'Normal, karet grip masih bagus',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'Xiaomi 14 Ultra',
                'brand' => 'Xiaomi',
                'type' => 'Smartphone',
                'description' => 'Flagship camera phone dengan lensa Leica. Fotografi level pro di genggaman.',
                'price' => 16500000,
                'specifications' => [
                    'ram' => '16GB',
                    'storage' => '512GB',
                    'camera' => 'Leica Summilux',
                    'condition' => 'Fullset dengan photography kit',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'iPhone 13 Pro Max',
                'brand' => 'Apple',
                'type' => 'Smartphone',
                'description' => 'iPhone 13 Pro Max 256GB Sierra Blue. Baterai awet, kamera tajam, layar ProMotion.',
                'price' => 11500000,
                'specifications' => [
                    'ram' => '6GB',
                    'storage' => '256GB',
                    'color' => 'Sierra Blue',
                    'battery_health' => '86%',
                    'condition' => 'Mulus, no dent',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'Samsung Galaxy Z Fold 5',
                'brand' => 'Samsung',
                'type' => 'Smartphone',
                'description' => 'Samsung Z Fold 5 512GB Phantom Black. Engsel rapat, layar lipat sempurna.',
                'price' => 19000000,
                'specifications' => [
                    'ram' => '12GB',
                    'storage' => '512GB',
                    'color' => 'Phantom Black',
                    'condition' => 'Mulus, garansi Samsung Care+ aktif',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'Samsung Galaxy Z Flip 5',
                'brand' => 'Samsung',
                'type' => 'Smartphone',
                'description' => 'HP lipat compact dan stylish. Layar cover lebih besar untuk selfie praktis.',
                'price' => 10500000,
                'specifications' => [
                    'ram' => '8GB',
                    'storage' => '256GB',
                    'color' => 'Mint',
                    'condition' => 'Normal, layar aman no minus',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catLaptop->id,
                'title' => 'MacBook Air M2 13-inch',
                'brand' => 'Apple',
                'type' => 'Laptop',
                'description' => 'MacBook Air M2 Midnight. Ringan dan super irit baterai.',
                'price' => 13500000,
                'specifications' => [
                    'processor' => 'Apple M2 8-core CPU',
                    'ram' => '8GB',
                    'storage' => '256GB SSD',
                    'battery_health' => '94%',
                    'condition' => 'Mulus, pemakaian office ringan',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catTablet->id,
                'title' => 'iPad Air M1 64GB',
                'brand' => 'Apple',
                'type' => 'Tablet',
                'description' => 'iPad Air Generasi 5 (M1), Starlight. Cocok untuk kuliah dan kerja ringan.',
                'price' => 7500000,
                'specifications' => [
                    'processor' => 'Apple M1',
                    'storage' => '64GB',
                    'connectivity' => 'Wi-Fi Only',
                    'condition' => 'Mulus, batangan + charger',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catAksesoris->id,
                'title' => 'Apple Watch Ultra',
                'brand' => 'Apple',
                'type' => 'Smartwatch',
                'description' => 'Apple Watch Ultra Gen 1. Baterai tahan lama, casing titanium tangguh.',
                'price' => 9500000,
                'specifications' => [
                    'case' => 'Titanium 49mm',
                    'band' => 'Alpine Loop',
                    'battery_health' => '98%',
                    'condition' => 'Seperti Baru, lengkap kotaknya',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catLaptop->id,
                'title' => 'Dell XPS 15 9520',
                'brand' => 'Dell',
                'type' => 'Laptop',
                'description' => 'Laptop premium dengan layar bezelless. Layar OLED 3.5K touch.',
                'price' => 21000000,
                'specifications' => [
                    'processor' => 'Intel Core i9-12900HK',
                    'ram' => '32GB',
                    'storage' => '1TB SSD',
                    'gpu' => 'RTX 3050 Ti',
                    'condition' => 'Mulus, baterai awet',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catTablet->id,
                'title' => 'Xiaomi Pad 6 Pro',
                'brand' => 'Xiaomi',
                'type' => 'Tablet',
                'description' => 'Tablet kencang dengan Snapdragon 8+ Gen 1. Layar 144Hz lancar banget.',
                'price' => 5500000,
                'specifications' => [
                    'ram' => '8GB',
                    'storage' => '256GB',
                    'refresh_rate' => '144Hz',
                    'condition' => 'Lengkap/Fullset',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catAksesoris->id,
                'title' => 'Keychron Q1 Pro',
                'brand' => 'Keychron',
                'type' => 'Keyboard',
                'description' => 'Mechanical keyboard wireless premium, gasket mount, bodi aluminium.',
                'price' => 2500000,
                'specifications' => [
                    'layout' => '75%',
                    'switch' => 'K Pro Banana',
                    'connectivity' => 'Bluetooth / Wired cable',
                    'condition' => 'Mulus, keycaps tidak mengkilap',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'OPPO Find N3',
                'brand' => 'OPPO',
                'type' => 'Smartphone',
                'description' => 'HP lipat tipis dengan kamera Hasselblad. Layar luar rasio normal.',
                'price' => 21500000,
                'specifications' => [
                    'ram' => '16GB',
                    'storage' => '512GB',
                    'color' => 'Classic Black',
                    'condition' => 'Mulus 99% seperti baru',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'Vivo X100 Pro',
                'brand' => 'Vivo',
                'type' => 'Smartphone',
                'description' => 'Kamera Zeiss paling top markotop. Sensor 1 inch bikin foto malam terang benderang.',
                'price' => 14000000,
                'specifications' => [
                    'ram' => '16GB',
                    'storage' => '512GB',
                    'color' => 'Asteroid Black',
                    'condition' => 'Lengkap dengan box asli',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catLaptop->id,
                'title' => 'Razer Blade 15',
                'brand' => 'Razer',
                'type' => 'Laptop',
                'description' => 'MacBook-nya laptop Windows untuk gaming. Bodi aluminium CNC solid.',
                'price' => 28000000,
                'specifications' => [
                    'processor' => 'Intel Core i7-12800H',
                    'ram' => '16GB',
                    'gpu' => 'RTX 3070 Ti',
                    'screen' => 'QHD 240Hz',
                    'condition' => 'Fisik 95% mulus, baterai normal',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catLaptop->id,
                'title' => 'HP Spectre x360 14',
                'brand' => 'HP',
                'type' => 'Laptop',
                'description' => 'Laptop 2-in-1 desain mewah nan elegan. Layar sentuh OLED bisa dilipat 360 derajat.',
                'price' => 17000000,
                'specifications' => [
                    'processor' => 'Intel Core i7-1255U',
                    'ram' => '16GB',
                    'storage' => '1TB SSD',
                    'screen' => '13.5-inch OLED Touch',
                    'condition' => 'Mulus, lengkap dengan stylus',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catTablet->id,
                'title' => 'Microsoft Surface Pro 9',
                'brand' => 'Microsoft',
                'type' => 'Tablet',
                'description' => 'Tablet Windows mumpuni untuk segala skenario. Fleksibel dan ringan.',
                'price' => 18500000,
                'specifications' => [
                    'processor' => 'Intel Core i5-1235U',
                    'ram' => '8GB',
                    'storage' => '256GB',
                    'color' => 'Graphite',
                    'condition' => 'Include Signature Keyboard dan Slim Pen 2',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catSmartphone->id,
                'title' => 'Poco F5',
                'brand' => 'Poco',
                'type' => 'Smartphone',
                'description' => 'Raja mid-range performa buas. Snapdragon 7+ Gen 2 setara HP flagship.',
                'price' => 4500000,
                'specifications' => [
                    'ram' => '12GB',
                    'storage' => '256GB',
                    'color' => 'White',
                    'condition' => 'Mulus, garansi resmi masih ada 2 bulan',
                ],
                'images' => ['products/placeholder.png'],
            ],
            [
                'category_id' => $catAksesoris->id,
                'title' => 'DJI Osmo Mobile 6',
                'brand' => 'DJI',
                'type' => 'Gimbal',
                'description' => 'Gimbal smartphone untuk video cinematic yang stabil tiada tara. Fitur tracking akurat.',
                'price' => 2000000,
                'specifications' => [
                    'weight' => '309g',
                    'battery' => 'Up to 6 hours',
                    'features' => 'ActiveTrack 6.0',
                    'condition' => 'Jarang pakai, sangat mulus',
                ],
                'images' => ['products/placeholder.png'],
            ],
        ];

        foreach ($products_data as $index => $data) {
            $seller = $sellers[$index % count($sellers)];
            $images = $data['images'];
            unset($data['images']);

            $product = Product::create(array_merge($data, [
                'user_id' => $seller->id,
                'slug' => Str::slug($data['title']).'-'.uniqid(),
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

    /**
     * Download image from URL and save to local storage.
     */
    private function downloadImage($url, $directory)
    {
        try {
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
