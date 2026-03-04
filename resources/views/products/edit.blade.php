<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Edit Produk') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-card text-card-foreground shadow sm:rounded-lg transition-colors border border-border">
                <div class="max-w-2xl mx-auto">
                    <header class="mb-6 border-b border-border pb-4">
                        <h2 class="text-lg font-medium text-card-foreground">
                            {{ __('Perbarui Informasi Produk') }}
                        </h2>
                        <p class="mt-1 text-sm text-muted-foreground">
                            {{ __('Ubah detail harga, deskripsi, atau status ketersediaan barang.') }}
                        </p>
                    </header>

                    <form method="POST" action="{{ route('products.update', $product) }}"
                        enctype="multipart/form-data" class="space-y-6">
                        @csrf
                        @method('PUT')

                        <!-- SECTION 1: IDENTITAS PRODUK -->
                        <div class="bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm mb-6">
                            <h3 class="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">1. Identitas Produk</h3>
                            
                            <div class="space-y-4">
                                <div>
                                    <x-input-label for="category_name" :value="__('Kategori')" />
                                    <x-text-input id="category_name" type="text"
                                        class="mt-1 block w-full bg-muted text-muted-foreground cursor-not-allowed border-border"
                                        :value="$product->category->name" disabled />
                                    <p class="text-xs text-muted-foreground mt-1">Kategori tidak dapat diubah untuk
                                        menjaga konsistensi spesifikasi.</p>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <x-input-label for="brand" :value="__('Merek / Brand')" />
                                        <select id="brand" name="brand"
                                            class="mt-1 block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm"
                                            required>
                                            <option value="">-- Pilih Merek --</option>
                                            @foreach (['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Infinix', 'Asus', 'Lenovo', 'HP', 'Dell', 'Acer', 'Huawei', 'Sony', 'Google'] as $brand)
                                                <option value="{{ $brand }}" {{ old('brand', $product->brand) == $brand ? 'selected' : '' }}>
                                                    {{ $brand }}</option>
                                            @endforeach
                                            <option value="Lainnya" {{ old('brand', $product->brand) == 'Lainnya' ? 'selected' : '' }}>Lainnya</option>
                                        </select>
                                        <x-input-error class="mt-2" :messages="$errors->get('brand')" />
                                    </div>

                                    <div>
                                        <x-input-label for="type" :value="__('Tipe / Model')" />
                                        <x-text-input id="type" name="type" type="text" class="mt-1 block w-full"
                                            :value="old('type', $product->type)" required placeholder="Cari model... (misal: iPhone 13)" autocomplete="off" />
                                        <x-input-error class="mt-2" :messages="$errors->get('type')" />
                                    </div>
                                </div>

                                <div>
                                    <x-input-label for="variant" :value="__('Varian (RAM/Storage/Warna)')" />
                                    <x-text-input id="variant" name="variant" type="text" class="mt-1 block w-full"
                                        :value="old('variant', $product->variant)" placeholder="Misal: 128GB Midnight (Opsional)" autocomplete="off" />
                                    <p class="text-xs text-muted-foreground mt-1">Dibiarkan kosong jika tidak ada varian.</p>
                                    <x-input-error class="mt-2" :messages="$errors->get('variant')" />
                                </div>
                            </div>
                        </div>

                        <!-- SECTION 2: INFORMASI PENJUALAN -->
                        <div class="bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm mb-6">
                            <h3 class="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">2. Informasi Penjualan</h3>
                            
                            <div class="space-y-4">
                                <div>
                                    <x-input-label for="price" :value="__('Harga (Rp)')" />
                                    <x-text-input id="price" name="price" type="number" class="mt-1 block w-full"
                                        :value="old('price', $product->price)" required min="1000" />
                                    <x-input-error class="mt-2" :messages="$errors->get('price')" />
                                </div>

                                <div>
                                    <x-input-label for="condition" :value="__('Kondisi Barang')" />
                                    <select id="condition" name="condition"
                                        class="mt-1 block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm"
                                        required>
                                        <option value="">-- Pilih Kondisi --</option>
                                        @foreach (['Baru', 'Bekas Like New', 'Bekas Normal', 'Rusak Ringan'] as $kondisi)
                                            <option value="{{ $kondisi }}" {{ old('condition', $product->condition) == $kondisi ? 'selected' : '' }}>
                                                {{ $kondisi }}</option>
                                        @endforeach
                                    </select>
                                    <x-input-error class="mt-2" :messages="$errors->get('condition')" />
                                </div>

                                <div>
                                    <x-input-label for="status" :value="__('Status Ketersediaan')" />
                                    <select id="status" name="status"
                                        class="mt-1 block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm">
                                        <option value="available" {{ $product->status == 'available' ? 'selected' : '' }}>
                                            Tersedia (Available)</option>
                                        <option value="sold" {{ $product->status == 'sold' ? 'selected' : '' }}>Terjual (Sold)
                                        </option>
                                    </select>
                                    <x-input-error class="mt-2" :messages="$errors->get('status')" />
                                </div>

                                <div>
                                    <x-input-label for="description" :value="__('Deskripsi')" />
                                    <textarea id="description" name="description" rows="5"
                                        class="mt-1 block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm"
                                        required placeholder="Jelaskan minus, kelengkapan, dan kondisi fisik secara detail...">{{ old('description', $product->description) }}</textarea>
                                    <x-input-error class="mt-2" :messages="$errors->get('description')" />
                                </div>
                            </div>
                        </div>

                        <!-- SECTION 3: SPESIFIKASI TAMBAHAN -->
                        @php
                            $catSlug = strtolower($product->category->slug ?? $product->category->name);
                            $specs = $product->specifications ?? [];
                        @endphp

                        @if (in_array($catSlug, ['smartphone', 'laptop', 'tablet', 'aksesoris']))
                            <div class="bg-muted text-card-foreground p-6 rounded-lg border border-border shadow-sm mb-6">
                                <h3 class="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">3. Spesifikasi Tambahan</h3>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="mb-4">
                                        <x-input-label for="spec_ram" :value="__('RAM')" />
                                        <select name="specifications[ram]" id="spec_ram"
                                            class="block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm mt-1">
                                            <option value="">Pilih RAM</option>
                                            @foreach (['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB', '18GB', '24GB', '32GB', '64GB'] as $ram)
                                                <option value="{{ $ram }}"
                                                    {{ ($specs['ram'] ?? '') == $ram ? 'selected' : '' }}>
                                                    {{ $ram }}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <div class="mb-4">
                                        <x-input-label for="spec_storage" :value="__('Penyimpanan (ROM/SSD)')" />
                                        <select name="specifications[storage]" id="spec_storage"
                                            class="block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm mt-1">
                                            <option value="">Pilih Kapasitas</option>
                                            @foreach (['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'] as $rom)
                                                <option value="{{ $rom }}"
                                                    {{ ($specs['storage'] ?? '') == $rom ? 'selected' : '' }}>
                                                    {{ $rom }}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    @if (in_array($catSlug, ['smartphone', 'tablet']))
                                        <div class="mb-4">
                                            <x-input-label for="spec_bh" :value="__('Battery Health (BH) %')" />
                                            <x-text-input name="specifications[battery_health]" type="number"
                                                class="block w-full mt-1" :value="$specs['battery_health'] ?? ''"
                                                placeholder="Misal: 85" min="0" max="100" />
                                        </div>
                                    @endif

                                     @if ($catSlug !== 'smartphone')
                                        <div class="mb-4">
                                            <x-input-label for="spec_screen" :value="__('Ukuran Layar (Inch)')" />
                                            <x-text-input name="specifications[screen_size]" type="text"
                                                class="block w-full mt-1" :value="$specs['screen_size'] ?? ''"
                                                placeholder="Misal: 14" />
                                        </div>
                                    @endif

                                    @if ($catSlug == 'laptop')
                                        <div class="mb-4">
                                            <x-input-label for="spec_processor" :value="__('Processor')" />
                                            <x-text-input name="specifications[processor]" type="text"
                                                class="block w-full mt-1" :value="$specs['processor'] ?? ''"
                                                placeholder="Contoh: Intel Core i5 Gen 12" />
                                        </div>

                                        <div class="mb-4">
                                            <x-input-label for="spec_gpu" :value="__('VGA / GPU')" />
                                            <x-text-input name="specifications[gpu]" type="text"
                                                class="block w-full mt-1" :value="$specs['gpu'] ?? ''"
                                                placeholder="Contoh: NVIDIA RTX 3050" />
                                        </div>
                                    @endif

                                    <div class="mb-4">
                                        <x-input-label for="spec_kelengkapan" :value="__('Kelengkapan')" />
                                        <select name="specifications[kelengkapan]" id="spec_kelengkapan"
                                            class="block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm mt-1">
                                            <option value="">-- Pilih Kelengkapan --</option>
                                            <option value="Fullset" {{ ($specs['kelengkapan'] ?? '') == 'Fullset' ? 'selected' : '' }}>Fullset (Box + Charger)</option>
                                            <option value="Unit + Charger" {{ ($specs['kelengkapan'] ?? '') == 'Unit + Charger' ? 'selected' : '' }}>Unit + Charger</option>
                                            <option value="Batangan" {{ ($specs['kelengkapan'] ?? '') == 'Batangan' ? 'selected' : '' }}>Unit Only / Batangan</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        @endif

                        <!-- SECTION 4: MEDIA -->
                        <div class="bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm mb-6">
                            <h3 class="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">4. Media Foto</h3>
                            
                            <div>
                                <x-input-label :value="__('Foto Produk Saat Ini')" />
                                @if ($product->images->isNotEmpty())
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 mt-2">
                                        @foreach ($product->images as $image)
                                            <div class="relative group">
                                                <img src="{{ asset('storage/' . $image->image_path) }}"
                                                    class="h-24 w-full object-cover rounded border border-border" alt="Foto Produk">
                                                <div class="mt-2 flex items-center bg-red-50 text-red-700 px-2 py-1 rounded border border-red-200">
                                                    <input type="checkbox" name="delete_images[]" value="{{ $image->id }}" id="del_img_{{ $image->id }}" class="rounded border-red-300 text-red-600 shadow-sm focus:ring-red-500">
                                                    <label for="del_img_{{ $image->id }}" class="ml-2 text-sm font-medium cursor-pointer">Hapus Foto</label>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                @else
                                    <p class="text-sm text-muted-foreground mt-2 mb-4">Belum ada foto yang di-upload.</p>
                                @endif
                                
                                <x-input-label for="images" :value="__('Tambah Foto Baru (Opsional)')" class="mt-6 border-t border-border pt-4" />
                                <input id="images" name="images[]" type="file"
                                    class="mt-1 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition"
                                    multiple accept="image/jpeg,image/png,image/jpg" />
                                <p class="text-xs text-muted-foreground mt-2">Format: JPG, JPEG, PNG. Maksimal ukuran total menyesuaikan server.</p>
                                <x-input-error class="mt-2" :messages="$errors->get('images')" />
                                @foreach ($errors->get('images.*') as $errorMessages)
                                    <x-input-error class="mt-2" :messages="$errorMessages" />
                                @endforeach
                            </div>
                        </div>

                        <div class="flex items-center gap-4 border-t border-border pt-6">
                            <x-primary-button>{{ __('Simpan Perubahan') }}</x-primary-button>
                            <a href="{{ route('dashboard') }}"
                                class="text-sm text-muted-foreground hover:text-foreground">{{ __('Batal') }}</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
