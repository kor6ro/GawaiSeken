<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Jual Produk Baru') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-card text-card-foreground shadow sm:rounded-lg border border-border transition-colors">
                <div class="max-w-2xl mx-auto">
                    <header>
                        <h2 class="text-lg font-medium text-card-foreground">
                            {{ __('Informasi Produk') }}
                        </h2>
                        <p class="mt-1 text-sm text-muted-foreground mb-6">
                            {{ __('Lengkapi detail gawai yang ingin Anda jual.') }}
                        </p>
                    </header>

                    <form method="POST" action="{{ route('products.store') }}" enctype="multipart/form-data"
                        class="space-y-6">
                        @csrf

                        <!-- SECTION 1: IDENTITAS PRODUK -->
                        <div class="bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm mb-6">
                            <h3 class="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">1. Identitas Produk</h3>
                            
                            <div class="space-y-4">
                                <div>
                                    <x-input-label for="category_id" :value="__('Kategori')" />
                                    <select id="category_id" name="category_id"
                                        class="mt-1 block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm"
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
                                            class="mt-1 block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm"
                                            required>
                                            <option value="">-- Pilih Merek --</option>
                                            @foreach (['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Infinix', 'Asus', 'Lenovo', 'HP', 'Dell', 'Acer', 'Huawei', 'Sony', 'Google'] as $brand)
                                                <option value="{{ $brand }}" {{ old('brand') == $brand ? 'selected' : '' }}>
                                                    {{ $brand }}</option>
                                            @endforeach
                                            <option value="Lainnya" {{ old('brand') == 'Lainnya' ? 'selected' : '' }}>Lainnya</option>
                                        </select>
                                        <x-input-error class="mt-2" :messages="$errors->get('brand')" />
                                    </div>

                                    <div>
                                        <x-input-label for="type" :value="__('Tipe / Model')" />
                                        <x-text-input id="type" name="type" type="text" class="mt-1 block w-full"
                                            :value="old('type')" required placeholder="Misal: iPhone 13" autocomplete="off" />
                                        <x-input-error class="mt-2" :messages="$errors->get('type')" />
                                    </div>
                                </div>

                                <div>
                                    <x-input-label for="variant" :value="__('Varian (RAM/Storage/Warna)')" />
                                    <x-text-input id="variant" name="variant" type="text" class="mt-1 block w-full"
                                        :value="old('variant')" placeholder="Misal: 128GB Midnight (Opsional)" autocomplete="off" />
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
                                        :value="old('price')" required placeholder="0" min="1000" />
                                    <x-input-error class="mt-2" :messages="$errors->get('price')" />
                                </div>

                                <div>
                                    <x-input-label for="condition" :value="__('Kondisi Barang')" />
                                    <select id="condition" name="condition"
                                        class="mt-1 block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm"
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
                                    <textarea id="description" name="description" rows="4"
                                        class="mt-1 block w-full border-border bg-background text-foreground focus:ring-ring focus:border-ring rounded-md shadow-sm"
                                        required placeholder="Jelaskan minus, kelengkapan, dan kondisi fisik secara detail...">{{ old('description') }}</textarea>
                                    <x-input-error class="mt-2" :messages="$errors->get('description')" />
                                </div>
                            </div>
                        </div>

                        <!-- SECTION 3: SPESIFIKASI TAMBAHAN -->
                        <div id="specs-container" class="hidden bg-muted text-card-foreground p-6 rounded-lg border border-border shadow-sm mb-6 transition-all duration-300">
                            <h3 class="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">3. Spesifikasi Tambahan</h3>
                            <p class="text-sm text-muted-foreground mb-4">Informasi ini menyesuaikan dengan kategori produk yang dipilih.</p>

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
                        <div class="bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm mb-6">
                            <h3 class="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">4. Media Foto</h3>
                            
                            <div>
                                <x-input-label for="images" :value="__('Upload Foto Produk (Bisa Pilih Banyak)')" />
                                <input id="images" name="images[]" type="file"
                                    class="mt-1 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition"
                                    multiple required accept="image/jpeg,image/png,image/jpg" />
                                <p class="text-xs text-muted-foreground mt-2">Format: JPG, JPEG, PNG. Maksimal ukuran total menyesuaikan server (rekomendasi &lt; 2MB per foto).</p>
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
