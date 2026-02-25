<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Jual Produk Baru') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition-colors">
                <div class="max-w-2xl mx-auto">
                    <header>
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {{ __('Informasi Produk') }}
                        </h2>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
                            {{ __('Lengkapi detail gawai yang ingin Anda jual.') }}
                        </p>
                    </header>

                    <form method="POST" action="{{ route('products.store') }}" enctype="multipart/form-data"
                        class="space-y-6">
                        @csrf

                        <div>
                            <x-input-label for="title" :value="__('Nama Produk')" />
                            <x-text-input id="title" name="title" type="text" class="mt-1 block w-full"
                                :value="old('title')" required autofocus placeholder="Contoh: iPhone 11 128GB Ex iBox" />
                            <x-input-error class="mt-2" :messages="$errors->get('title')" />
                        </div>

                        <div>
                            <x-input-label for="category_id" :value="__('Kategori')" />
                            <select id="category_id" name="category_id"
                                class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
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

                        <div>
                            <x-input-label for="price" :value="__('Harga (Rp)')" />
                            <x-text-input id="price" name="price" type="number" class="mt-1 block w-full"
                                :value="old('price')" required placeholder="0" />
                            <x-input-error class="mt-2" :messages="$errors->get('price')" />
                        </div>

                        <div>
                            <x-input-label for="description" :value="__('Deskripsi Kondisi')" />
                            <textarea id="description" name="description" rows="4"
                                class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                required placeholder="Jelaskan minus, kelengkapan, dan kondisi fisik...">{{ old('description') }}</textarea>
                            <x-input-error class="mt-2" :messages="$errors->get('description')" />
                        </div>

                        <div id="specs-container"
                            class="space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4 mt-4 hidden bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-colors">
                            <h3 class="text-md font-bold text-gray-700 dark:text-gray-300">Spesifikasi Detail</h3>

                            <div class="spec-field hidden" data-categories="smartphone,laptop,tablet">
                                <x-input-label for="spec_ram" :value="__('RAM')" />
                                <select name="specifications[ram]" id="spec_ram"
                                    class="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm mt-1 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600">
                                    <option value="">Pilih RAM</option>
                                    @foreach (['2GB', '4GB', '6GB', '8GB', '12GB', '16GB', '32GB', '64GB'] as $ram)
                                        <option value="{{ $ram }}"
                                            {{ old('specifications.ram') == $ram ? 'selected' : '' }}>
                                            {{ $ram }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="spec-field hidden" data-categories="smartphone,laptop,tablet">
                                <x-input-label for="spec_storage" :value="__('Internal Storage / ROM')" />
                                <select name="specifications[storage]" id="spec_storage"
                                    class="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm mt-1 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600">
                                    <option value="">Pilih Storage</option>
                                    @foreach (['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'] as $rom)
                                        <option value="{{ $rom }}"
                                            {{ old('specifications.storage') == $rom ? 'selected' : '' }}>
                                            {{ $rom }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="spec-field hidden" data-categories="laptop">
                                <x-input-label for="spec_processor" :value="__('Processor')" />
                                <x-text-input name="specifications[processor]" type="text" class="block w-full mt-1"
                                    :value="old('specifications.processor')" placeholder="Contoh: Intel Core i5 Gen 12" />
                            </div>
                        </div>

                        <div>
                            <x-input-label for="image" :value="__('Foto Produk Utama')" />
                            <input id="image" name="image" type="file"
                                class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 dark:file:bg-primary-900 dark:file:text-primary-300 file:text-primary-700 hover:file:bg-primary-100 dark:hover:file:bg-primary-800 transition"
                                required />
                            <x-input-error class="mt-2" :messages="$errors->get('image')" />
                        </div>

                        <div class="flex items-center gap-4 pt-4">
                            <x-primary-button>{{ __('Tayangkan Produk') }}</x-primary-button>
                            <a href="{{ route('dashboard') }}"
                                class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">{{ __('Batal') }}</a>
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
