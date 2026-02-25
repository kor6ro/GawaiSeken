<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Edit Produk') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition-colors">
                <div class="max-w-2xl mx-auto">
                    <header class="mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {{ __('Perbarui Informasi Produk') }}
                        </h2>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {{ __('Ubah detail harga, deskripsi, atau status ketersediaan barang.') }}
                        </p>
                    </header>

                    <form method="POST" action="{{ route('products.update', $product->id) }}"
                        enctype="multipart/form-data" class="space-y-6">
                        @csrf
                        @method('PUT')

                        <div>
                            <x-input-label for="title" :value="__('Nama Produk')" />
                            <x-text-input id="title" name="title" type="text" class="mt-1 block w-full"
                                :value="old('title', $product->title)" required autofocus />
                            <x-input-error class="mt-2" :messages="$errors->get('title')" />
                        </div>

                        <div>
                            <x-input-label for="category_name" :value="__('Kategori')" />
                            <x-text-input id="category_name" type="text"
                                class="mt-1 block w-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed border-gray-300 dark:border-gray-600"
                                :value="$product->category->name" disabled />
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Kategori tidak dapat diubah untuk
                                menjaga konsistensi
                                spesifikasi.</p>
                        </div>

                        <div>
                            <x-input-label for="price" :value="__('Harga (Rp)')" />
                            <x-text-input id="price" name="price" type="number" class="mt-1 block w-full"
                                :value="old('price', $product->price)" required />
                            <x-input-error class="mt-2" :messages="$errors->get('price')" />
                        </div>

                        <div>
                            <x-input-label for="status" :value="__('Status Ketersediaan')" />
                            <select id="status" name="status"
                                class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                                <option value="available" {{ $product->status == 'available' ? 'selected' : '' }}>
                                    Tersedia (Available)</option>
                                <option value="sold" {{ $product->status == 'sold' ? 'selected' : '' }}>Terjual (Sold)
                                </option>
                            </select>
                            <x-input-error class="mt-2" :messages="$errors->get('status')" />
                        </div>

                        <div>
                            <x-input-label for="description" :value="__('Deskripsi Kondisi')" />
                            <textarea id="description" name="description" rows="5"
                                class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                required>{{ old('description', $product->description) }}</textarea>
                            <x-input-error class="mt-2" :messages="$errors->get('description')" />
                        </div>

                        @php
                            $catSlug = strtolower($product->category->slug ?? $product->category->name);
                            $specs = $product->specifications ?? [];
                        @endphp

                        @if (in_array($catSlug, ['smartphone', 'laptop', 'tablet', 'aksesoris']))
                            <div
                                class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                <h3 class="text-md font-bold text-gray-700 dark:text-gray-300 mb-4">Spesifikasi Detail
                                </h3>

                                @if (in_array($catSlug, ['smartphone', 'laptop']))
                                    <div class="mb-4">
                                        <x-input-label for="spec_ram" :value="__('RAM')" />
                                        <select name="specifications[ram]" id="spec_ram"
                                            class="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm mt-1 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600">
                                            <option value="">Pilih RAM</option>
                                            @foreach (['2GB', '4GB', '6GB', '8GB', '12GB', '16GB', '32GB', '64GB'] as $ram)
                                                <option value="{{ $ram }}"
                                                    {{ ($specs['ram'] ?? '') == $ram ? 'selected' : '' }}>
                                                    {{ $ram }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                @endif

                                @if (in_array($catSlug, ['smartphone', 'laptop', 'tablet']))
                                    <div class="mb-4">
                                        <x-input-label for="spec_storage" :value="__('Internal Storage / ROM')" />
                                        <select name="specifications[storage]" id="spec_storage"
                                            class="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm mt-1 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600">
                                            <option value="">Pilih Storage</option>
                                            @foreach (['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'] as $rom)
                                                <option value="{{ $rom }}"
                                                    {{ ($specs['storage'] ?? '') == $rom ? 'selected' : '' }}>
                                                    {{ $rom }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                @endif

                                @if ($catSlug == 'laptop')
                                    <div class="mb-4">
                                        <x-input-label for="spec_processor" :value="__('Processor')" />
                                        <x-text-input name="specifications[processor]" type="text"
                                            class="block w-full mt-1" :value="$specs['processor'] ?? ''"
                                            placeholder="Contoh: Intel Core i5 Gen 12" />
                                    </div>
                                @endif
                            </div>
                        @endif

                        <div>
                            <x-input-label for="image" :value="__('Ganti Foto Utama (Opsional)')" />
                            @if ($product->images->isNotEmpty())
                                <div
                                    class="mb-2 mt-2 flex items-center gap-3 p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 w-fit">
                                    <img src="{{ asset('storage/' . $product->images->first()->image_path) }}"
                                        class="h-16 w-16 object-cover rounded">
                                    <span class="text-xs text-gray-500 dark:text-gray-400">Foto saat ini</span>
                                </div>
                            @endif
                            <input id="image" name="image" type="file"
                                class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 dark:file:bg-primary-900 dark:file:text-primary-300 file:text-primary-700 hover:file:bg-primary-100 dark:hover:file:bg-primary-800 transition" />
                            <x-input-error class="mt-2" :messages="$errors->get('image')" />
                        </div>

                        <div class="flex items-center gap-4 border-t border-gray-100 dark:border-gray-700 pt-6">
                            <x-primary-button>{{ __('Simpan Perubahan') }}</x-primary-button>
                            <a href="{{ route('dashboard') }}"
                                class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">{{ __('Batal') }}</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
