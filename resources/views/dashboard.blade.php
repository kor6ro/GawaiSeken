<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Seller Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12" x-data="{ tab: 'overview', deleteUrl: '' }">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

            {{-- TAB NAVIGATION BUTTONS --}}
            <div class="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl max-w-md">
                <button @click="tab = 'overview'"
                    :class="tab === 'overview' ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm' :
                        'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
                    class="flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                        </path>
                    </svg>
                    Ringkasan & Produk
                </button>
                <button @click="tab = 'settings'"
                    :class="tab === 'settings' ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm' :
                        'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
                    class="flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Pengaturan Toko
                </button>
            </div>

            {{-- 
                =========================================
                TAB 1: OVERVIEW & PRODUCT LIST (DEFAULT)
                =========================================
            --}}
            <div x-show="tab === 'overview'" x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0">

                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition-colors mb-6">
                    <header class="mb-6">
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ __('Statistik Toko') }}</h2>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {{ __('Ringkasan performa penjualan Anda saat ini.') }}
                        </p>
                    </header>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                            class="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl border border-gray-100 dark:border-gray-600 transition-colors">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Produk Aktif</p>
                            <p class="text-3xl font-black text-primary-600 dark:text-primary-400 mt-2">
                                {{ $productsCount }}</p>
                        </div>
                        <div
                            class="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl border border-gray-100 dark:border-gray-600 transition-colors">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Total Terjual</p>
                            <p class="text-3xl font-black text-green-600 dark:text-green-400 mt-2">
                                {{ $transactionsCount }}</p>
                        </div>
                        <div
                            class="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl border border-gray-100 dark:border-gray-600 transition-colors">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Pesan Baru</p>
                            <p class="text-3xl font-black text-orange-500 dark:text-orange-400 mt-2">
                                {{ $unreadMessagesCount }}</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition-colors">
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Produk Saya</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Kelola barang dagangan Anda.</p>
                        </div>
                        <a href="{{ route('products.create') }}"
                            class="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-700 transition shadow-sm whitespace-nowrap flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4"></path>
                            </svg>
                            Tambah Produk
                        </a>
                    </div>

                    <div
                        class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    class="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                                    <tr>
                                        <th scope="col" class="px-6 py-4 font-semibold">Produk</th>
                                        <th scope="col" class="px-6 py-4 font-semibold">Harga</th>
                                        <th scope="col" class="px-6 py-4 font-semibold text-center">Status</th>
                                        <th scope="col" class="px-6 py-4 font-semibold text-center">Tanggal</th>
                                        <th scope="col" class="px-6 py-4 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                                    @forelse($myProducts as $item)
                                        <tr
                                            class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition ease-in-out duration-150">
                                            <td class="px-6 py-4 align-middle">
                                                <div class="flex items-center gap-4">
                                                    <div
                                                        class="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 overflow-hidden flex-shrink-0">
                                                        @if ($item->images->first())
                                                            <img src="{{ asset('storage/' . $item->images->first()->image_path) }}"
                                                                class="w-full h-full object-cover">
                                                        @else
                                                            <div
                                                                class="flex items-center justify-center w-full h-full text-gray-400 dark:text-gray-500">
                                                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                                                    stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        @endif
                                                    </div>
                                                    <div>
                                                        <div
                                                            class="text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                                                            {{ $item->title }}</div>
                                                        <div class="text-xs text-gray-500 dark:text-gray-400">
                                                            {{ $item->category->name }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                class="px-6 py-4 align-middle font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                                Rp {{ number_format($item->price, 0, ',', '.') }}
                                            </td>
                                            <td class="px-6 py-4 align-middle text-center">
                                                <span
                                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border {{ $item->status == 'available' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800' : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600' }}">
                                                    {{ ucfirst($item->status) }}
                                                </span>
                                            </td>
                                            <td
                                                class="px-6 py-4 align-middle text-center text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                {{ $item->created_at->format('d M Y') }}
                                            </td>
                                            <td class="px-6 py-4 align-middle text-right">
                                                <div class="flex items-center justify-end gap-2">
                                                    <a href="{{ route('products.edit', $item->id) }}"
                                                        class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                                                        Edit
                                                    </a>
                                                    <x-danger-button type="button"
                                                        x-on:click="$dispatch('open-modal', 'confirm-product-deletion'); deleteUrl = '{{ route('products.destroy', $item->id) }}'">
                                                        Hapus
                                                    </x-danger-button>
                                                </div>
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="5"
                                                class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                <div class="flex flex-col items-center">
                                                    <span class="mb-2">Belum ada produk yang dijual.</span>
                                                    <a href="{{ route('products.create') }}"
                                                        class="text-primary-600 hover:text-primary-700 font-bold">+
                                                        Tambah Produk Baru</a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                    @if ($myProducts->hasPages())
                        <div class="mt-4">{{ $myProducts->links() }}</div>
                    @endif
                </div>
            </div>

            {{-- 
                =========================================
                TAB 2: PENGATURAN TOKO (UPDATED)
                =========================================
            --}}
            <div x-show="tab === 'settings'" style="display: none;"
                x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0">

                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        <header>
                            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                                {{ __('Profil Toko') }}
                            </h2>
                            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {{ __('Informasi ini akan ditampilkan di halaman publik toko Anda.') }}
                            </p>
                        </header>

                        {{-- Form Update Profil Toko (Action ke route store.update) --}}
                        <form method="post" action="{{ route('store.update') }}" class="mt-6 space-y-6"
                            enctype="multipart/form-data">
                            @csrf
                            @method('patch')

                            {{-- Avatar Upload dengan Preview --}}
                            <div x-data="{ photoName: null, photoPreview: null }" class="col-span-6 sm:col-span-4">
                                <input type="file" class="hidden" x-ref="photo" name="avatar"
                                    x-on:change="
                                            photoName = $refs.photo.files[0].name;
                                            const reader = new FileReader();
                                            reader.onload = (e) => { photoPreview = e.target.result; };
                                            reader.readAsDataURL($refs.photo.files[0]);
                                    " />

                                <label class="block font-medium text-sm text-gray-700 dark:text-gray-300"
                                    for="photo">
                                    {{ __('Foto Profil Toko') }}
                                </label>

                                <div class="mt-2 flex items-center gap-4">
                                    <div class="mt-2" x-show="! photoPreview">
                                        {{-- Cek avatar di profile relation --}}
                                        @if (Auth::user()->profile && Auth::user()->profile->avatar)
                                            <img src="{{ Storage::url(Auth::user()->profile->avatar) }}"
                                                alt="{{ Auth::user()->name }}"
                                                class="rounded-full h-20 w-20 object-cover border-2 border-gray-200 dark:border-gray-700">
                                        @else
                                            <div
                                                class="h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-2xl font-bold text-primary-600 dark:text-primary-300 border-2 border-gray-200 dark:border-gray-700">
                                                {{ substr(Auth::user()->profile->store_name ?? Auth::user()->name, 0, 1) }}
                                            </div>
                                        @endif
                                    </div>

                                    <div class="mt-2" x-show="photoPreview" style="display: none;">
                                        <span
                                            class="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center border-2 border-primary-500"
                                            :style="'background-image: url(\'' + photoPreview + '\');'">
                                        </span>
                                    </div>

                                    <x-secondary-button class="mt-2" type="button"
                                        x-on:click.prevent="$refs.photo.click()">
                                        {{ __('Pilih Foto Baru') }}
                                    </x-secondary-button>
                                </div>
                            </div>

                            {{-- Nama Toko --}}
                            <div>
                                <x-input-label for="store_name" :value="__('Nama Toko / Penjual')" />
                                {{-- Value mengambil dari store_name, fallback ke nama user --}}
                                <x-text-input id="store_name" name="store_name" type="text"
                                    class="mt-1 block w-full" :value="old(
                                        'store_name',
                                        Auth::user()->profile->store_name ?? Auth::user()->name,
                                    )" required autofocus />
                                <x-input-error class="mt-2" :messages="$errors->get('store_name')" />
                            </div>

                            {{-- Bio / Deskripsi Singkat --}}
                            <div>
                                <x-input-label for="bio" :value="__('Bio / Deskripsi Toko')" />
                                <textarea id="bio" name="bio" rows="3"
                                    class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-primary-500 dark:focus:border-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 rounded-md shadow-sm"
                                    placeholder="Jual beli barang bekas berkualitas...">{{ old('bio', Auth::user()->profile->bio ?? '') }}</textarea>
                                <x-input-error class="mt-2" :messages="$errors->get('bio')" />
                            </div>

                            {{-- Alamat / Kota --}}
                            <div>
                                <x-input-label for="address" :value="__('Lokasi / Kota')" />
                                <x-text-input id="address" name="address" type="text" class="mt-1 block w-full"
                                    :value="old('address', Auth::user()->profile->address ?? '')" placeholder="Contoh: Malang, Jawa Timur" />
                                <x-input-error class="mt-2" :messages="$errors->get('address')" />
                            </div>

                            <div class="flex items-center gap-4">
                                <x-primary-button>{{ __('Simpan Toko') }}</x-primary-button>

                                @if (session('status') === 'store-updated')
                                    <p x-data="{ show: true }" x-show="show" x-transition x-init="setTimeout(() => show = false, 2000)"
                                        class="text-sm text-green-600 dark:text-green-400 font-bold">
                                        {{ __('Tersimpan.') }}</p>
                                @endif
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {{-- Modal Konfirmasi Hapus (Tetap Sama) --}}
            <x-modal name="confirm-product-deletion" focusable>
                <form method="post" :action="deleteUrl" class="p-6 bg-white dark:bg-gray-800">
                    @csrf
                    @method('DELETE')
                    <div class="flex flex-col items-center text-center justify-center">
                        <div
                            class="mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                            <svg class="h-6 w-6 text-red-600 dark:text-red-200" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Konfirmasi Hapus</h2>
                        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Apakah Anda yakin ingin menghapus
                            produk ini? <br> Tindakan ini tidak dapat dibatalkan.</p>
                    </div>
                    <div class="mt-6 flex justify-center gap-3">
                        <x-secondary-button x-on:click="$dispatch('close')">Batal</x-secondary-button>
                        <x-danger-button type="submit">Ya, Hapus</x-danger-button>
                    </div>
                </form>
            </x-modal>

        </div>
    </div>
</x-app-layout>
