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
                    <header>
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div>
                                <h2 class="text-2xl font-bold text-foreground">
                                    {{ __('Edit Produk') }}
                                </h2>
                                <p class="mt-1 text-sm text-muted-foreground">
                                    {{ __('Perbarui informasi harga, kondisi, atau detail spesifikasi gawai Anda.') }}
                                </p>
                            </div>
                        </div>
                    </header>

                    <form method="POST" action="{{ route('products.update', $product) }}"
                        enctype="multipart/form-data" class="space-y-6">
                        @csrf
                        @method('PUT')

                        <!-- SECTION 1: IDENTITAS PRODUK -->
                        <div class="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl border border-border shadow-md mb-8">
                            <h3 class="text-lg font-bold text-foreground mb-6 border-b border-border pb-3 flex items-center gap-2">
                                <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">1</span>
                                1. Identitas Produk
                            </h3>
                            
                            <div class="space-y-6">
                                <div>
                                    <x-input-label for="category_name" :value="__('Kategori')" />
                                    <x-text-input id="category_name" type="text"
                                        class="mt-1 block w-full h-11 bg-muted/50 text-muted-foreground cursor-not-allowed border-border rounded-xl"
                                        :value="$product->category->name" disabled />
                                    <p class="text-[10px] text-muted-foreground mt-1 italic">Kategori tidak dapat diubah untuk menjaga konsistensi spesifikasi.</p>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <x-input-label for="brand" :value="__('Merek / Brand')" />
                                        <select id="brand" name="brand"
                                            class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm"
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
                                        <x-text-input id="type" name="type" type="text" class="mt-1 block w-full h-11 rounded-xl"
                                            :value="old('type', $product->type)" required placeholder="Cari model... (misal: iPhone 13)" autocomplete="off" />
                                        <x-input-error class="mt-2" :messages="$errors->get('type')" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SECTION 2: INFORMASI PENJUALAN -->
                        <div class="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl border border-border shadow-md mb-8">
                            <h3 class="text-lg font-bold text-foreground mb-6 border-b border-border pb-3 flex items-center gap-2">
                                <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">2</span>
                                2. Informasi Penjualan
                            </h3>
                            
                            <div class="space-y-6">
                                <div>
                                    <x-input-label for="price" :value="__('Harga (Rp)')" />
                                    <x-text-input id="price" name="price" type="number" class="mt-1 block w-full h-11 rounded-xl"
                                        :value="old('price', $product->price)" required min="1000" />
                                    <x-input-error class="mt-2" :messages="$errors->get('price')" />
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <x-input-label for="condition" :value="__('Kondisi Barang')" />
                                        <select id="condition" name="condition"
                                            class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm"
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
                                            class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm">
                                            <option value="available" {{ $product->status == 'available' ? 'selected' : '' }}>
                                                Tersedia (Available)</option>
                                            <option value="sold" {{ $product->status == 'sold' ? 'selected' : '' }}>Terjual (Sold)
                                            </option>
                                        </select>
                                        <x-input-error class="mt-2" :messages="$errors->get('status')" />
                                    </div>
                                </div>

                                <div>
                                    <x-input-label for="description" :value="__('Deskripsi')" />
                                    <textarea id="description" name="description" rows="5"
                                        class="mt-1 block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm p-3"
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
                            <div class="bg-muted/30 text-card-foreground p-6 sm:p-8 rounded-2xl border border-border shadow-md mb-8">
                                <h3 class="text-lg font-bold text-foreground mb-6 border-b border-border pb-3 flex items-center gap-2">
                                    <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">3</span>
                                    3. Spesifikasi Tambahan
                                </h3>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="mb-4">
                                        <x-input-label for="spec_ram" :value="__('RAM')" />
                                        <select name="specifications[ram]" id="spec_ram"
                                            class="block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 transition-all text-sm">
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
                                            class="block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 transition-all text-sm">
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
                                                class="block w-full h-11 mt-1 rounded-xl" :value="$specs['battery_health'] ?? ''"
                                                placeholder="Misal: 85" min="0" max="100" />
                                        </div>
                                    @endif

                                     @if ($catSlug !== 'smartphone')
                                        <div class="mb-4">
                                            <x-input-label for="spec_screen" :value="__('Ukuran Layar (Inch)')" />
                                            <x-text-input name="specifications[screen_size]" type="text"
                                                class="block w-full h-11 mt-1 rounded-xl" :value="$specs['screen_size'] ?? ''"
                                                placeholder="Misal: 14" />
                                        </div>
                                    @endif

                                    @if ($catSlug == 'laptop')
                                        <div class="mb-4">
                                            <x-input-label for="spec_processor" :value="__('Processor')" />
                                            <x-text-input name="specifications[processor]" type="text"
                                                class="block w-full h-11 mt-1 rounded-xl" :value="$specs['processor'] ?? ''"
                                                placeholder="Contoh: Intel Core i5 Gen 12" />
                                        </div>

                                        <div class="mb-4">
                                            <x-input-label for="spec_gpu" :value="__('VGA / GPU')" />
                                            <x-text-input name="specifications[gpu]" type="text"
                                                class="block w-full h-11 mt-1 rounded-xl" :value="$specs['gpu'] ?? ''"
                                                placeholder="Contoh: NVIDIA RTX 3050" />
                                        </div>
                                    @endif

                                    <div class="mb-4">
                                        <x-input-label for="spec_kelengkapan" :value="__('Kelengkapan')" />
                                        <select name="specifications[kelengkapan]" id="spec_kelengkapan"
                                            class="block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm mt-1 transition-all text-sm">
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
                        <div class="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl border border-border shadow-md mb-8"
                            x-data="{ 
                                files: [],
                                previews: [],
                                handleFiles(event) {
                                    const newFiles = Array.from(event.target.files);
                                    newFiles.forEach(file => {
                                        this.files.push(file);
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            this.previews.push({
                                                url: e.target.result,
                                                name: file.name
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    });
                                    this.syncFiles();
                                },
                                removeFile(index) {
                                    this.files.splice(index, 1);
                                    this.previews.splice(index, 1);
                                    this.syncFiles();
                                },
                                syncFiles() {
                                    const dataTransfer = new DataTransfer();
                                    this.files.forEach(file => dataTransfer.items.add(file));
                                    this.$refs.fileInput.files = dataTransfer.files;
                                }
                            }">
                            <h3 class="text-lg font-bold text-foreground mb-6 border-b border-border pb-3 flex items-center gap-2">
                                <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">4</span>
                                4. Media Foto
                            </h3>
                            
                            <div>
                                <x-input-label :value="__('Foto Produk Saat Ini')" />
                                @if ($product->images->isNotEmpty())
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 mt-2">
                                        @foreach ($product->images as $image)
                                            <div class="relative group aspect-square rounded-lg overflow-hidden border border-border shadow-sm">
                                                <img src="{{ asset('storage/' . $image->image_path) }}"
                                                    class="h-full w-full object-cover group-hover:opacity-80 transition-opacity" alt="Foto Produk">
                                                {{-- Toggle Delete (Top Right) --}}
                                                <div class="absolute top-1 right-1 z-10">
                                                    <input type="checkbox" name="delete_images[]" value="{{ $image->id }}" id="del_img_{{ $image->id }}" class="hidden peer">
                                                    <label for="del_img_{{ $image->id }}" 
                                                        class="cursor-pointer p-1 bg-white/90 dark:bg-black/80 text-foreground rounded-full flex items-center justify-center shadow-md border border-border hover:bg-red-500 hover:text-white peer-checked:bg-red-500 peer-checked:text-white transition-all">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                    </label>
                                                </div>
                                                <div class="absolute inset-0 bg-red-500/10 pointer-events-none opacity-0 group-[.peer:checked]:opacity-100 transition-opacity"></div>
                                            </div>
                                        @endforeach
                                    </div>
                                @else
                                    <p class="text-sm text-muted-foreground mt-2 mb-4 italic">Belum ada foto yang di-upload.</p>
                                @endif
                                
                                <x-input-label for="images" :value="__('Tambah Foto Baru (Opsional)')" class="mt-6 border-t border-border pt-4" />
                                <div class="mt-2 flex items-center justify-center w-full">
                                    <label for="images" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <i data-lucide="image-plus" class="w-8 h-8 text-muted-foreground mb-2"></i>
                                            <p class="text-xs text-muted-foreground"><span class="font-bold text-primary">Klik untuk tambah foto baru</span></p>
                                        </div>
                                        <input id="images" x-ref="fileInput" name="images[]" type="file" @change="handleFiles($event)"
                                            class="hidden" multiple accept="image/jpeg,image/png,image/jpg" />
                                    </label>
                                </div>

                                {{-- New Preview Gallery --}}
                                <template x-if="previews.length > 0">
                                    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4 p-3 bg-muted/50 rounded-xl border border-border">
                                        <template x-for="(preview, index) in previews" :key="index">
                                            <div class="relative aspect-square rounded-lg overflow-hidden border border-border shadow-sm bg-card group">
                                                <img :src="preview.url" class="w-full h-full object-cover">
                                                {{-- Remove button (Top Right) --}}
                                                <button type="button" @click="removeFile(index)" 
                                                    class="absolute top-1 right-1 p-1 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-all shadow-lg z-10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                </button>
                                            </div>
                                        </template>
                                    </div>
                                </template>

                                <div class="flex items-center gap-2 mt-3">
                                    <i data-lucide="info" class="w-3 h-3 text-muted-foreground"></i>
                                    <p class="text-[10px] text-muted-foreground italic">Foto baru akan ditambahkan ke daftar yang sudah ada.</p>
                                </div>

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
