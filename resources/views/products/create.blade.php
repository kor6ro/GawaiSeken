<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Jual Produk Baru') }}
        </h2>
    </x-slot>

    <div class="py-12" x-data="{
        searching: false,
        categoryId: '{{ old('category_id') }}',
        brandMapping: {
            '1': ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Infinix', 'Poco', 'Asus', 'Sony', 'Huawei', 'Google', 'OnePlus', 'Advan', 'Evercoss', 'Luna'], // Smartphone
            '2': ['Apple', 'Asus', 'Lenovo', 'HP', 'Dell', 'Acer', 'MSI', 'Microsoft', 'Huawei', 'Xiaomi', 'Razer', 'Gigabyte', 'Axioo', 'Zyrex', 'Advan'], // Laptop
            '3': ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Lenovo', 'Microsoft', 'Oppo', 'Realme', 'Advan', 'Axioo', 'Evercoss'], // Tablet
            'default': ['Apple', 'Samsung', 'Xiaomi', 'Sony', 'Logitech', 'Razer', 'Anker', 'Baseus'] // Aksesoris/Lainnya
        },
        get filteredBrands() {
            return this.brandMapping[this.categoryId] || this.brandMapping['default'];
        },
        openGsmSearch() {
            const brand = document.getElementById('brand').value;
            const type = document.getElementById('type').value;
            if (!brand || !type) {
                alert('Pilih Merek dan isi Tipe terlebih dahulu.');
                return;
            }
            const query = encodeURIComponent(brand + ' ' + type);
            
            // Logic based on category (assuming 1=Smartphone, 3=Tablet for GSMArena)
            if (this.categoryId === '1' || this.categoryId === '3') {
                window.open(`https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=${query}`, '_blank');
            } else {
                // Laptop or Accessories use Google Search with specs intent
                const suffix = this.categoryId === '2' ? ' specs laptopmedia' : ' specs';
                window.open(`https://www.google.com/search?q=${query}${suffix}`, '_blank');
            }
        }
    }">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-card text-card-foreground shadow sm:rounded-lg border border-border transition-colors">
                <div class="max-w-2xl mx-auto">
                    <header>
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div>
                                <h2 class="text-2xl font-bold text-foreground">
                                    {{ __('Informasi Produk') }}
                                </h2>
                                <p class="mt-1 text-sm text-muted-foreground">
                                    {{ __('Lengkapi detail gawai yang ingin Anda jual.') }}
                                </p>
                            </div>
                            <button type="button" @click="openGsmSearch()" 
                                class="inline-flex items-center px-3 py-2 bg-accent/50 text-accent-foreground rounded-xl font-semibold text-xs hover:bg-accent focus:outline-none transition-all gap-2 border border-border shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                <span x-text="(categoryId === '1' || categoryId === '3') ? 'Cari di GSM Arena' : 'Cari Spesifikasi'"></span>
                            </button>
                        </div>
                    </header>

                    <form method="POST" action="{{ route('products.store') }}" enctype="multipart/form-data"
                        class="space-y-6">
                        @csrf

                        <!-- SECTION 1: IDENTITAS PRODUK -->
                        <div class="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl border border-border shadow-md mb-8">
                            <h3 class="text-lg font-bold text-foreground mb-6 border-b border-border pb-3 flex items-center gap-2">
                                <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">1</span>
                                1. Identitas Produk
                            </h3>
                            
                            <div class="space-y-6">
                                <div>
                                    <x-input-label for="category_id" :value="__('Kategori')" />
                                    <select id="category_id" name="category_id" x-model="categoryId"
                                        class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all"
                                        required>
                                        <option value="">-- Pilih Kategori --</option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}"
                                                {{ old('category_id') == $category->id ? 'selected' : '' }}>
                                                {{ $category->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    <x-input-error class="mt-2" :messages="$errors->get('category_id')" />
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <x-input-label for="brand" :value="__('Merek / Brand')" />
                                        <select id="brand" name="brand"
                                            class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all"
                                            required>
                                            <option value="">-- Pilih Merek --</option>
                                            <template x-for="brandName in filteredBrands" :key="brandName">
                                                <option :value="brandName" x-text="brandName" :selected="brandName == '{{ old('brand') }}'"></option>
                                            </template>
                                            <option value="Lainnya" {{ old('brand') == 'Lainnya' ? 'selected' : '' }}>Lainnya</option>
                                        </select>
                                        <x-input-error class="mt-2" :messages="$errors->get('brand')" />
                                    </div>

                                    <div>
                                        <x-input-label for="type" :value="__('Tipe / Model')" />
                                        <x-text-input id="type" name="type" type="text" class="mt-1 block w-full h-11 rounded-xl"
                                            :value="old('type')" required placeholder="Misal: iPhone 13" autocomplete="off" />
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
                                        :value="old('price')" required placeholder="0" min="1000" />
                                    <x-input-error class="mt-2" :messages="$errors->get('price')" />
                                </div>

                                <div>
                                    <x-input-label for="condition" :value="__('Kondisi Barang')" />
                                    <select id="condition" name="condition"
                                        class="mt-1 block w-full h-11 border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm"
                                        required>
                                        <option value="">-- Pilih Kondisi --</option>
                                        @foreach (['Baru', 'Bekas Like New', 'Bekas Normal', 'Rusak Ringan'] as $kondisi)
                                            <option value="{{ $kondisi }}" {{ old('condition') == $kondisi ? 'selected' : '' }}>
                                                {{ $kondisi }}</option>
                                        @endforeach
                                    </select>
                                    <x-input-error class="mt-2" :messages="$errors->get('condition')" />
                                </div>

                                <div>
                                    <x-input-label for="description" :value="__('Deskripsi')" />
                                    <textarea id="description" name="description" rows="5"
                                        class="mt-1 block w-full border-border bg-background text-foreground focus:ring-primary focus:border-primary rounded-xl shadow-sm transition-all text-sm p-3"
                                        required placeholder="Jelaskan minus, kelengkapan, dan kondisi fisik secara detail...">{{ old('description') }}</textarea>
                                    <x-input-error class="mt-2" :messages="$errors->get('description')" />
                                </div>
                            </div>
                        </div>

                        <!-- SECTION 3: SPESIFIKASI TAMBAHAN -->
                        <div id="specs-container" class="hidden bg-muted/30 text-card-foreground p-6 sm:p-8 rounded-2xl border border-border shadow-md mb-8 transition-all duration-300">
                            <h3 class="text-lg font-bold text-foreground mb-6 border-b border-border pb-3 flex items-center gap-2">
                                <span class="flex items-center justify-center w-7 h-7 bg-primary/10 text-primary rounded-full text-xs">3</span>
                                3. Spesifikasi Tambahan
                            </h3>
                            <p class="text-sm text-muted-foreground mb-6">Informasi ini menyesuaikan dengan kategori produk yang dipilih.</p>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="spec-field hidden" data-categories="smartphone,laptop,tablet">
                                    <x-input-label for="spec_ram" :value="__('RAM')" />
                                    <select name="specifications[ram]" id="spec_ram"
                                        class="block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm mt-1">
                                        <option value="">Pilih RAM</option>
                                        @foreach (['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB', '18GB', '24GB', '32GB', '64GB'] as $ram)
                                            <option value="{{ $ram }}"
                                                {{ old('specifications.ram') == $ram ? 'selected' : '' }}>
                                                {{ $ram }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="spec-field hidden" data-categories="smartphone,laptop,tablet">
                                    <x-input-label for="spec_storage" :value="__('Penyimpanan (ROM/SSD)')" />
                                    <select name="specifications[storage]" id="spec_storage"
                                        class="block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm mt-1">
                                        <option value="">Pilih Kapasitas</option>
                                        @foreach (['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'] as $rom)
                                            <option value="{{ $rom }}"
                                                {{ old('specifications.storage') == $rom ? 'selected' : '' }}>
                                                {{ $rom }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="spec-field hidden" data-categories="smartphone,tablet">
                                    <x-input-label for="spec_bh" :value="__('Battery Health (BH) %')" />
                                    <x-text-input name="specifications[battery_health]" type="number" class="block w-full mt-1"
                                        :value="old('specifications.battery_health')" placeholder="Misal: 85" min="0" max="100" />
                                    <x-input-error class="mt-2" :messages="$errors->get('specifications.battery_health')" />
                                </div>

                                <div class="spec-field hidden" data-categories="laptop">
                                    <x-input-label for="spec_screen" :value="__('Ukuran Layar (Inch)')" />
                                    <x-text-input name="specifications[screen_size]" type="text" class="block w-full mt-1"
                                        :value="old('specifications.screen_size')" placeholder="Misal: 14" />
                                </div>

                                <div class="spec-field hidden" data-categories="laptop">
                                    <x-input-label for="spec_processor" :value="__('Processor')" />
                                    <x-text-input name="specifications[processor]" type="text" class="block w-full mt-1"
                                        :value="old('specifications.processor')" placeholder="Contoh: Intel Core i5 Gen 12" />
                                </div>

                                <div class="spec-field hidden" data-categories="laptop">
                                    <x-input-label for="spec_gpu" :value="__('VGA / GPU')" />
                                    <x-text-input name="specifications[gpu]" type="text" class="block w-full mt-1"
                                        :value="old('specifications.gpu')" placeholder="Contoh: NVIDIA RTX 3050" />
                                </div>

                                <div class="spec-field hidden" data-categories="smartphone,laptop,tablet,aksesoris">
                                    <x-input-label for="spec_kelengkapan" :value="__('Kelengkapan')" />
                                    <select name="specifications[kelengkapan]" id="spec_kelengkapan"
                                        class="block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm mt-1">
                                        <option value="">-- Pilih Kelengkapan --</option>
                                        <option value="Fullset" {{ old('specifications.kelengkapan') == 'Fullset' ? 'selected' : '' }}>Fullset (Box + Charger)</option>
                                        <option value="Unit + Charger" {{ old('specifications.kelengkapan') == 'Unit + Charger' ? 'selected' : '' }}>Unit + Charger</option>
                                        <option value="Batangan" {{ old('specifications.kelengkapan') == 'Batangan' ? 'selected' : '' }}>Unit Only / Batangan</option>
                                    </select>
                                </div>
                            </div>
                        </div>

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
                                <x-input-label for="images" :value="__('Upload Foto Produk')" />
                                <div class="mt-2 flex items-center justify-center w-full">
                                    <label for="images" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/50 transition-all">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <i data-lucide="image-plus" class="w-8 h-8 text-muted-foreground mb-2"></i>
                                            <p class="text-xs text-muted-foreground"><span class="font-bold text-primary">Klik untuk tambah</span> atau seret ke sini</p>
                                        </div>
                                        <input id="images" x-ref="fileInput" name="images[]" type="file" @change="handleFiles($event)"
                                            class="hidden" multiple accept="image/jpeg,image/png,image/jpg" 
                                            :required="files.length === 0" />
                                    </label>
                                </div>
                                
                                {{-- Preview Gallery --}}
                                <template x-if="previews.length > 0">
                                    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4 p-3 bg-muted/50 rounded-xl border border-border">
                                        <template x-for="(preview, index) in previews" :key="index">
                                            <div class="relative aspect-square rounded-lg overflow-hidden border border-border shadow-sm bg-card group">
                                                <img :src="preview.url" class="w-full h-full object-cover">
                                                {{-- Remove button (Top Right) --}}
                                                <button type="button" @click="removeFile(index)" 
                                                    class="absolute top-1.5 right-1.5 p-1 bg-white/90 dark:bg-black/80 text-foreground rounded-full flex items-center justify-center shadow-md border border-border hover:bg-red-500 hover:text-white transition-all z-10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                </button>
                                            </div>
                                        </template>
                                    </div>
                                </template>

                                <div class="flex items-center gap-2 mt-3">
                                    <i data-lucide="info" class="w-3 h-3 text-muted-foreground"></i>
                                    <p class="text-[10px] text-muted-foreground italic">JPG, PNG. Rekomendasi 1:1, max 2MB per foto.</p>
                                </div>

                                <x-input-error class="mt-2" :messages="$errors->get('images')" />
                                @foreach ($errors->get('images.*') as $errorMessages)
                                    <x-input-error class="mt-2" :messages="$errorMessages" />
                                @endforeach
                            </div>
                        </div>

                        <div class="flex items-center gap-4 pt-4">
                            <x-primary-button>{{ __('Tayangkan Produk') }}</x-primary-button>
                            <a href="{{ route('dashboard') }}"
                                class="text-sm text-muted-foreground hover:text-foreground">{{ __('Batal') }}</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const categorySelect = document.getElementById('category_id');
            const container = document.getElementById('specs-container');
            const fields = document.querySelectorAll('.spec-field');

            function updateSpecs() {
                let selectedText = categorySelect.options[categorySelect.selectedIndex].text.toLowerCase();
                if (selectedText && selectedText !== '-- pilih kategori --') {
                    container.classList.remove('hidden');
                } else {
                    container.classList.add('hidden');
                }
                fields.forEach(field => {
                    let allowedCats = field.getAttribute('data-categories');
                    if (allowedCats && allowedCats.includes(selectedText)) {
                        field.classList.remove('hidden');
                    } else {
                        field.classList.add('hidden');
                    }
                });
            }
            categorySelect.addEventListener('change', function() {
                updateSpecs();
                fields.forEach(field => {
                    if (field.classList.contains('hidden')) {
                        let input = field.querySelector('input, select');
                        if (input) input.value = '';
                    }
                });
            });
            updateSpecs();
        });
    </script>
</x-app-layout>
