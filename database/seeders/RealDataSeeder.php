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
        // ── Admin ────────────────────────────────────────────────────────────
        User::updateOrCreate(
            ['email' => 'gawai2nd@gmail.com'],
            [
                'name'              => 'Super Admin',
                'password'          => Hash::make('Gawai123!'),
                'role'              => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // ── Categories ───────────────────────────────────────────────────────
        $smartphone = Category::where('slug', 'smartphone')->first();
        $laptop     = Category::where('slug', 'laptop')->first();
        $tablet     = Category::where('slug', 'tablet')->first();
        $audio      = Category::where('slug', 'audio')->first();
        $wearable   = Category::where('slug', 'wearable')->first();

        // ── Buyers ───────────────────────────────────────────────────────────
        $buyers = [
            ['name' => 'Ahmad',  'email' => 'ahmadnrosyid@gmail.com', 'avatar' => 'https://i.pravatar.cc/150?u=ahmad'],
            ['name' => 'Mus',    'email' => 'mmuslikhudin06@gmail.com','avatar' => 'https://i.pravatar.cc/150?u=mus'],
        ];

        foreach ($buyers as $b) {
            $user = User::updateOrCreate(
                ['email' => $b['email']],
                ['name' => $b['name'], 'password' => Hash::make('Gawai123!'), 'role' => 'buyer']
            );
            $user->profile()->updateOrCreate(
                ['user_id' => $user->id],
                ['avatar' => $this->downloadImage($b['avatar'], 'avatars/personal'), 'phone' => '08'.rand(1000000000, 9999999999), 'city' => 'Jakarta']
            );
        }

        // ── Sellers & Products ───────────────────────────────────────────────
        $sellersData = [
            [
                'name'       => 'Gilang',
                'email'      => 'gil414100@gmail.com',
                'store_name' => 'Gilang Gadget Store',
                'city'       => 'Jakarta Selatan',
                'avatar'     => 'https://i.pravatar.cc/150?u=gilang',
                'store_logo' => 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200&h=200',
                'products'   => [
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Xiaomi Poco X8 Pro 8/256GB Black',
                        'brand'          => 'Poco',
                        'type'           => 'Poco X8 Pro',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 4800000,
                        'description'    => 'Poco X8 Pro 8/256GB Volcanic Black. Kondisi mulus 98%, baterai 95%. Layar AMOLED 6.67" 120Hz. Snapdragon 8s Gen 3. Bonus case original.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '8GB', 'storage' => '256GB', 'battery_health' => '95%', 'screen_size' => '6.67 inch'],
                        'image'          => 'products/seed/poco-x8-pro.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Samsung Galaxy A55 5G 8/256GB Navy',
                        'brand'          => 'Samsung',
                        'type'           => 'Galaxy A55',
                        'condition'      => ProductConditionEnum::SECOND_GOOD->value,
                        'price'          => 4200000,
                        'description'    => 'Samsung Galaxy A55 5G Awesome Navy. Exynos 1480, layar Super AMOLED 120Hz. Fisik bagus, ada baret tipis di frame. Baterai 85%.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '8GB', 'storage' => '256GB', 'battery_health' => '85%', 'screen_size' => '6.6 inch'],
                        'image'          => 'products/seed/samsung-a55.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'iPhone 16 Pro Max 256GB Desert Titanium',
                        'brand'          => 'Apple',
                        'type'           => 'iPhone 16 Pro Max',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 22500000,
                        'description'    => 'iPhone 16 Pro Max 256GB Desert Titanium. Garansi iBox resmi aktif. Kondisi 99% mulus, baterai 100% dari Apple. Camera Control.',
                        'is_cod'         => false,
                        'is_negotiable'  => false,
                        'specifications' => ['ram' => '8GB', 'storage' => '256GB', 'battery_health' => '100%', 'screen_size' => '6.9 inch'],
                        'image'          => 'products/seed/iphone-16-pro-max.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Realme GT 6 12/256GB Fluid Silver',
                        'brand'          => 'Realme',
                        'type'           => 'GT 6',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 5500000,
                        'description'    => 'Realme GT 6 12/256GB Fluid Silver. Snapdragon 8s Gen 3, layar 144Hz. Baterai 5500mAh + 120W SUPERVOOC. Unit mulus seperti baru.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '12GB', 'storage' => '256GB', 'battery_health' => '98%', 'screen_size' => '6.78 inch'],
                        'image'          => 'products/seed/realme-gt-6.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Oppo Reno 11 F 5G 8/256GB Coral Purple',
                        'brand'          => 'Oppo',
                        'type'           => 'Reno 11 F',
                        'condition'      => ProductConditionEnum::SECOND_GOOD->value,
                        'price'          => 3100000,
                        'description'    => 'Oppo Reno 11 F 5G Coral Purple. Dimensity 6080, layar curved 120Hz 6.7". Kamera 64MP. Fisik mulus, baterai 82%.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '8GB', 'storage' => '256GB', 'battery_health' => '82%', 'screen_size' => '6.7 inch'],
                        'image'          => 'products/seed/oppo-reno11-f.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Samsung Galaxy S24 FE 8/256GB Graphite',
                        'brand'          => 'Samsung',
                        'type'           => 'Galaxy S24 FE',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 7800000,
                        'description'    => 'Samsung Galaxy S24 FE Graphite. Exynos 2500, Dynamic AMOLED 6.7". AI features lengkap. Kondisi 99% mulus fullset.',
                        'is_cod'         => true,
                        'is_negotiable'  => false,
                        'specifications' => ['ram' => '8GB', 'storage' => '256GB', 'battery_health' => '97%', 'screen_size' => '6.7 inch'],
                        'image'          => 'products/seed/samsung-s24-fe.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Vivo V40 12/256GB Ganges Blue',
                        'brand'          => 'Vivo',
                        'type'           => 'V40',
                        'condition'      => ProductConditionEnum::SECOND_GOOD->value,
                        'price'          => 4900000,
                        'description'    => 'Vivo V40 Ganges Blue. Snapdragon 7 Gen 3, AMOLED curved 120Hz. Kamera 50MP Zeiss Aura Light Portrait. Baterai 80%.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '12GB', 'storage' => '256GB', 'battery_health' => '80%', 'screen_size' => '6.78 inch'],
                        'image'          => 'products/seed/vivo-v40.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Asus ROG Phone 8 16/512GB Phantom Black',
                        'brand'          => 'Asus',
                        'type'           => 'ROG Phone 8',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 12500000,
                        'description'    => 'Asus ROG Phone 8 Phantom Black. Snapdragon 8 Gen 3, layar 165Hz AMOLED. Gaming smartphone terkencang. Baterai 97%, fullset dengan AeroActive Cooler.',
                        'is_cod'         => false,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '16GB', 'storage' => '512GB', 'battery_health' => '97%', 'screen_size' => '6.78 inch'],
                        'image'          => 'products/seed/asus-rog-phone-8.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Xiaomi Redmi Note 13 Pro 5G 8/256GB',
                        'brand'          => 'Xiaomi',
                        'type'           => 'Redmi Note 13 Pro 5G',
                        'condition'      => ProductConditionEnum::SECOND_GOOD->value,
                        'price'          => 3500000,
                        'description'    => 'Redmi Note 13 Pro 5G Midnight Black. Dimensity 7200 Ultra, kamera 200MP OIS. Ada goresan kecil di pojok layar. Baterai 88%.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '8GB', 'storage' => '256GB', 'battery_health' => '88%', 'screen_size' => '6.67 inch'],
                        'image'          => 'products/seed/redmi-note-13-pro.jpg',
                    ],
                    [
                        'category_id'    => $tablet->id,
                        'title'          => 'Samsung Galaxy Tab A9+ 8/128GB WiFi',
                        'brand'          => 'Samsung',
                        'type'           => 'Galaxy Tab A9+',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 3800000,
                        'description'    => 'Samsung Galaxy Tab A9+ WiFi Graphite. Layar 11" 90Hz IPS. Snapdragon 695. Cocok buat belajar dan hiburan. Kondisi mulus fullset.',
                        'is_cod'         => true,
                        'is_negotiable'  => false,
                        'specifications' => ['ram' => '8GB', 'storage' => '128GB', 'battery_health' => '95%', 'screen_size' => '11 inch', 'connectivity' => 'WiFi'],
                        'image'          => 'products/seed/samsung-tab-a9-plus.jpg',
                    ],
                ],
            ],
            [
                'name'       => 'Vyno',
                'email'      => 'rumahgtasamp@gmail.com',
                'store_name' => 'Vyno Tech Hub',
                'city'       => 'Bandung',
                'avatar'     => 'https://i.pravatar.cc/150?u=vyno',
                'store_logo' => 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=200&h=200',
                'products'   => [
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Xiaomi Poco X6 Pro 12/512GB Grey',
                        'brand'          => 'Poco',
                        'type'           => 'Poco X6 Pro',
                        'condition'      => ProductConditionEnum::SECOND_GOOD->value,
                        'price'          => 4100000,
                        'description'    => 'Poco X6 Pro 12/512GB Grey. Dimensity 8300-Ultra, layar 1.5K AMOLED 120Hz. Kamera 64MP OIS. Baterai 89%, fisik ada baret tipis di back cover.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '12GB', 'storage' => '512GB', 'battery_health' => '89%', 'screen_size' => '6.67 inch'],
                        'image'          => 'products/seed/poco-x6-pro.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'OnePlus 12 16/512GB Silky Black',
                        'brand'          => 'OnePlus',
                        'type'           => 'OnePlus 12',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 9800000,
                        'description'    => 'OnePlus 12 Silky Black. Snapdragon 8 Gen 3, LTPO AMOLED 4K 2Hz-120Hz. Kamera Hasselblad 50MP. 100W SUPERVOOC. Unit sangat mulus.',
                        'is_cod'         => true,
                        'is_negotiable'  => false,
                        'specifications' => ['ram' => '16GB', 'storage' => '512GB', 'battery_health' => '96%', 'screen_size' => '6.82 inch'],
                        'image'          => 'products/seed/oneplus-12.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Infinix Note 30 Pro 8/256GB Mirror Black',
                        'brand'          => 'Infinix',
                        'type'           => 'Note 30 Pro',
                        'condition'      => ProductConditionEnum::SECOND_GOOD->value,
                        'price'          => 2300000,
                        'description'    => 'Infinix Note 30 Pro Mirror Black. Helio G99, layar curved AMOLED 120Hz. Baterai besar 5000mAh, 68W Fast Charging. Baterai 84%.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '8GB', 'storage' => '256GB', 'battery_health' => '84%', 'screen_size' => '6.78 inch'],
                        'image'          => 'products/seed/infinix-note-30-pro.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Google Pixel 8a 8/128GB Obsidian',
                        'brand'          => 'Google',
                        'type'           => 'Pixel 8a',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 8500000,
                        'description'    => 'Google Pixel 8a Obsidian. Tensor G3, kamera 64MP Night Sight terbaik di kelasnya. 7 tahun update OS. Unit mulus fullset.',
                        'is_cod'         => false,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '8GB', 'storage' => '128GB', 'battery_health' => '98%', 'screen_size' => '6.1 inch'],
                        'image'          => 'products/seed/google-pixel-8a.jpg',
                    ],
                    [
                        'category_id'    => $smartphone->id,
                        'title'          => 'Samsung Galaxy M55 5G 8/128GB Icy Blue',
                        'brand'          => 'Samsung',
                        'type'           => 'Galaxy M55',
                        'condition'      => ProductConditionEnum::SECOND_GOOD->value,
                        'price'          => 3700000,
                        'description'    => 'Samsung Galaxy M55 5G Icy Blue. Snapdragon 7 Gen 1, layar Super AMOLED 120Hz 6.7". Baterai 5000mAh. Ada sedikit baret di layar tepi.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '8GB', 'storage' => '128GB', 'battery_health' => '87%', 'screen_size' => '6.7 inch'],
                        'image'          => 'products/seed/samsung-galaxy-m55.jpg',
                    ],
                    [
                        'category_id'    => $tablet->id,
                        'title'          => 'Samsung Galaxy Tab S9 WiFi 8/128GB Graphite',
                        'brand'          => 'Samsung',
                        'type'           => 'Galaxy Tab S9',
                        'condition'      => ProductConditionEnum::SECOND_GOOD->value,
                        'price'          => 8500000,
                        'description'    => 'Samsung Galaxy Tab S9 WiFi Graphite. Snapdragon 8 Gen 2, Dynamic AMOLED X 11" 120Hz. Include S-Pen. Baterai 90%.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '8GB', 'storage' => '128GB', 'battery_health' => '90%', 'screen_size' => '11 inch', 'connectivity' => 'WiFi'],
                        'image'          => 'products/seed/samsung-tab-s9.jpg',
                    ],
                    [
                        'category_id'    => $tablet->id,
                        'title'          => 'Xiaomi Redmi Pad Pro 8/256GB Graphite Gray',
                        'brand'          => 'Xiaomi',
                        'type'           => 'Redmi Pad Pro',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 4200000,
                        'description'    => 'Redmi Pad Pro 8/256GB Graphite Gray. Snapdragon 7s Gen 2, layar 12.1" 144Hz. Speaker quad dengan Dolby Atmos. Kondisi mulus fullset.',
                        'is_cod'         => true,
                        'is_negotiable'  => false,
                        'specifications' => ['ram' => '8GB', 'storage' => '256GB', 'battery_health' => '97%', 'screen_size' => '12.1 inch', 'connectivity' => 'WiFi'],
                        'image'          => 'products/seed/redmi-pad-pro.jpg',
                    ],
                    [
                        'category_id'    => $laptop->id,
                        'title'          => 'MacBook Air M2 8/256GB Midnight',
                        'brand'          => 'Apple',
                        'type'           => 'MacBook Air M2',
                        'condition'      => ProductConditionEnum::SECOND_GOOD->value,
                        'price'          => 13500000,
                        'description'    => 'MacBook Air M2 Midnight 8/256GB. Cycle count 120, baterai 92%. Layar Liquid Retina 13.6". Tipis, ringan, dan kencang untuk kerja/kuliah.',
                        'is_cod'         => false,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '8GB', 'storage' => '256GB', 'screen_size' => '13.6 inch'],
                        'image'          => 'products/seed/macbook-air-m2.jpg',
                    ],
                    [
                        'category_id'    => $laptop->id,
                        'title'          => 'Asus ROG Zephyrus G14 2024 Ryzen 9',
                        'brand'          => 'Asus',
                        'type'           => 'ROG Zephyrus G14 2024',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 28000000,
                        'description'    => 'Asus ROG Zephyrus G14 2024. Ryzen 9 8945HS + RX 7900S 16GB VRAM. RAM 32GB, SSD 1TB. Layar OLED QHD 165Hz. Unit sangat mulus.',
                        'is_cod'         => false,
                        'is_negotiable'  => true,
                        'specifications' => ['ram' => '32GB', 'storage' => '1TB', 'screen_size' => '14 inch'],
                        'image'          => 'products/seed/asus-rog-g14.jpg',
                    ],
                    [
                        'category_id'    => $audio->id,
                        'title'          => 'Sony WH-1000XM5 Wireless Headphone',
                        'brand'          => 'Sony',
                        'type'           => 'WH-1000XM5',
                        'condition'      => ProductConditionEnum::SECOND_LIKE_NEW->value,
                        'price'          => 3200000,
                        'description'    => 'Sony WH-1000XM5 Black. ANC terbaik di kelasnya, suara Hi-Res. Baterai 30 jam. Ada pouch original. Kondisi sangat mulus.',
                        'is_cod'         => true,
                        'is_negotiable'  => true,
                        'specifications' => ['connectivity' => 'Bluetooth'],
                        'image'          => 'products/seed/sony-wh1000xm5.jpg',
                    ],
                ],
            ],
        ];

        foreach ($sellersData as $sellerData) {
            $seller = User::updateOrCreate(
                ['email' => $sellerData['email']],
                ['name' => $sellerData['name'], 'password' => Hash::make('Gawai123!'), 'role' => 'seller']
            );

            $seller->profile()->updateOrCreate(
                ['user_id' => $seller->id],
                [
                    'store_name'    => $sellerData['store_name'],
                    'city'          => $sellerData['city'],
                    'bio'           => "Saya adalah pemilik {$sellerData['store_name']}.",
                    'store_bio'     => "Selamat datang di {$sellerData['store_name']}! Kami menjual gadget second berkualitas tinggi.",
                    'phone'         => '0812'.rand(10000000, 99999999),
                    'address'       => 'Perumahan Gadget Indah No. '.rand(1, 100),
                    'store_address' => 'Jl. Gadget Raya No. '.rand(1, 100).', '.$sellerData['city'],
                    'avatar'        => $this->downloadImage($sellerData['avatar'], 'avatars/personal'),
                    'store_logo'    => $this->downloadImage($sellerData['store_logo'], 'avatars/logos'),
                ]
            );

            foreach ($sellerData['products'] as $p) {
                $imagePath = $p['image'];
                unset($p['image']);

                $product = Product::create(array_merge($p, [
                    'user_id'      => $seller->id,
                    'slug'         => Str::slug($p['title']).'-'.Str::random(5),
                    'availability' => 'available',
                    'status'       => 'active',
                ]));

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $imagePath,
                ]);
            }
        }
    }

    private function downloadImage(string $url, string $directory): ?string
    {
        try {
            $context  = stream_context_create(['http' => ['header' => "User-Agent: Mozilla/5.0\r\n"]]);
            $contents = @file_get_contents($url, false, $context);
            if ($contents === false) return null;
            $path = "$directory/".Str::random(15).'.jpg';
            Storage::disk('public')->put($path, $contents);
            return $path;
        } catch (\Exception) {
            return null;
        }
    }
}