<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Seller Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12" x-data="{ tab: 'overview', deleteUrl: '' }">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

            {{-- TAB NAVIGATION BUTTONS --}}
            <div class="flex space-x-1 bg-muted p-1 rounded-xl max-w-md mx-auto sm:mx-0">
                <button @click="tab = 'overview'" :class="tab === 'overview' ? 'bg-background text-foreground shadow-sm' :
                        'text-muted-foreground hover:text-foreground'"
                    class="flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2">
                    <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                    Ringkasan
                </button>
                <button @click="tab = 'settings'" :class="tab === 'settings' ? 'bg-background text-foreground shadow-sm' :
                        'text-muted-foreground hover:text-foreground'"
                    class="flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2">
                    <i data-lucide="settings" class="w-4 h-4"></i>
                    Pengaturan
                </button>
            </div>

            {{--
            =========================================
            TAB 1: OVERVIEW & PRODUCT LIST (DEFAULT)
            =========================================
            --}}
            <div x-show="tab === 'overview'" x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0">

                <div class="p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg mb-6">
                    <header class="mb-6">
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ __('Statistik Toko') }}</h2>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {{ __('Ringkasan performa penjualan Anda saat ini.') }}
                        </p>
                    </header>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div
                            class="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-600 transition-colors">
                            <div class="flex items-center justify-between mb-2">
                                <p
                                    class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Produk Aktif</p>
                                <i data-lucide="package" class="w-5 h-5 text-primary-500"></i>
                            </div>
                            <p class="text-2xl sm:text-3xl font-black text-primary-600 dark:text-primary-400 mt-2">
                                {{ $productsCount }}
                            </p>
                        </div>
                        <div
                            class="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-600 transition-colors">
                            <div class="flex items-center justify-between mb-2">
                                <p
                                    class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Total Terjual</p>
                                <i data-lucide="shopping-bag" class="w-5 h-5 text-green-500"></i>
                            </div>
                            <p class="text-2xl sm:text-3xl font-black text-green-600 dark:text-green-400 mt-2">
                                {{ $transactionsCount }}
                            </p>
                        </div>
                        <div
                            class="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-600 transition-colors">
                            <div class="flex items-center justify-between mb-2">
                                <p
                                    class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Pesan Baru</p>
                                <i data-lucide="message-circle" class="w-5 h-5 text-orange-500"></i>
                            </div>
                            <p class="text-2xl sm:text-3xl font-black text-orange-500 dark:text-orange-400 mt-2">
                                {{ $unreadMessagesCount }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg">
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Produk Saya</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Kelola barang dagangan Anda.</p>
                        </div>
                        <a href="{{ route('products.create') }}"
                            class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-xl font-bold text-xs text-primary-foreground uppercase tracking-widest hover:bg-primary/90 transition duration-150 shadow-md">
                            <i data-lucide="plus" class="w-4 h-4 mr-2"></i>
                            <span>Tambah Produk</span>
                        </a>
                    </div>

                    <div
                        class="bg-card text-card-foreground overflow-hidden shadow-sm sm:rounded-lg border border-border">

                        {{-- Desktop Table --}}
                        <div class="hidden md:block overflow-x-auto">
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
                                                            {{ $item->title }}
                                                        </div>
                                                        <div class="text-xs text-gray-500 dark:text-gray-400">
                                                            {{ $item->category->name }}
                                                        </div>
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
                                                    <a href="{{ route('products.edit', $item) }}"
                                                        class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                                                        Edit
                                                    </a>
                                                    <x-danger-button type="button"
                                                        x-on:click="$dispatch('open-modal', 'confirm-product-deletion'); deleteUrl = '{{ route('products.destroy', $item) }}'">
                                                        Hapus
                                                    </x-danger-button>
                                                </div>
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="5" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
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

                        {{-- Mobile Cards --}}
                        <div class="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
                            @forelse($myProducts as $item)
                                <div class="p-4 flex flex-col gap-4">
                                    <div class="flex items-center gap-4">
                                        <div
                                            class="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 overflow-hidden flex-shrink-0">
                                            @if ($item->images->first())
                                                <img src="{{ asset('storage/' . $item->images->first()->image_path) }}"
                                                    class="w-full h-full object-cover">
                                            @else
                                                <div
                                                    class="flex items-center justify-center w-full h-full text-gray-400 dark:text-gray-500">
                                                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            @endif
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
                                                {{ $item->title }}
                                            </div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">
                                                {{ $item->category->name }}
                                            </div>
                                            <div class="mt-1 text-primary-600 dark:text-primary-400 font-bold">Rp
                                                {{ number_format($item->price, 0, ',', '.') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="flex items-center justify-between gap-4 pt-2 border-t border-gray-50 dark:border-gray-700">
                                        <div class="flex flex-col gap-1">
                                            <span
                                                class="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[10px] font-bold border {{ $item->status == 'available' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800' : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600' }}">
                                                {{ ucfirst($item->status) }}
                                            </span>
                                            <span
                                                class="text-[10px] text-gray-400">{{ $item->created_at->format('d M Y') }}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <a href="{{ route('products.edit', $item) }}"
                                                class="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                                <i data-lucide="edit-3" class="w-5 h-5"></i>
                                            </a>
                                            <button type="button"
                                                x-on:click="$dispatch('open-modal', 'confirm-product-deletion'); deleteUrl = '{{ route('products.destroy', $item) }}'"
                                                class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                                                <i data-lucide="trash-2" class="w-5 h-5"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            @empty
                                <div class="p-8 text-center text-gray-500 dark:text-gray-400">
                                    <div class="flex flex-col items-center">
                                        <span class="mb-2">Belum ada produk yang dijual.</span>
                                        <a href="{{ route('products.create') }}"
                                            class="text-primary-600 hover:text-primary-700 font-bold">+ Tambah Produk
                                            Baru</a>
                                    </div>
                                </div>
                            @endforelse
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
                x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-2"
                x-transition:enter-end="opacity-100 translate-y-0">

                <div class="p-4 sm:p-8 bg-card text-card-foreground border border-border shadow-sm sm:rounded-lg">
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
                                <input type="file" class="hidden" x-ref="photo" name="avatar" x-on:change="
                                            photoName = $refs.photo.files[0].name;
                                            const reader = new FileReader();
                                            reader.onload = (e) => { photoPreview = e.target.result; };
                                            reader.readAsDataURL($refs.photo.files[0]);
                                    " />

                                <label class="block font-medium text-sm text-gray-700 dark:text-gray-300" for="photo">
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
                                <x-text-input id="store_name" name="store_name" type="text" class="mt-1 block w-full"
                                    :value="old(
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
                                    :value="old('address', Auth::user()->profile->address ?? '')"
                                    placeholder="Contoh: Malang, Jawa Timur" />
                                <x-input-error class="mt-2" :messages="$errors->get('address')" />
                            </div>

                            <div class="flex items-center gap-4">
                                <x-primary-button>{{ __('Simpan Toko') }}</x-primary-button>

                                @if (session('status') === 'store-updated')
                                    <p x-data="{ show: true }" x-show="show" x-transition
                                        x-init="setTimeout(() => show = false, 2000)"
                                        class="text-sm text-green-600 dark:text-green-400 font-bold">
                                        {{ __('Tersimpan.') }}
                                    </p>
                                @endif
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {{-- Modal Konfirmasi Hapus (Tetap Sama) --}}
            <x-modal name="confirm-product-deletion" focusable>
                <form method="post" :action="deleteUrl" class="p-6 bg-card text-card-foreground">
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