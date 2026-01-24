<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Seller Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <header class="mb-6">
                    <h2 class="text-lg font-medium text-gray-900">
                        {{ __('Statistik Toko') }}
                    </h2>
                    <p class="mt-1 text-sm text-gray-600">
                        {{ __('Ringkasan performa penjualan Anda saat ini.') }}
                    </p>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Produk Aktif</p>
                        <p class="text-3xl font-black text-primary-600 mt-2">12</p>
                    </div>
                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Terjual</p>
                        <p class="text-3xl font-black text-green-600 mt-2">0</p>
                    </div>
                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Pesan Baru</p>
                        <p class="text-3xl font-black text-orange-500 mt-2">0</p>
                    </div>
                </div>
            </div>

            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div class="text-center py-4">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Siap berjualan produk baru?</h3>
                    <p class="text-gray-500 mb-6 text-sm">Kelola inventaris gawai bekas Anda dengan mudah di sini.</p>
                    <div class="flex justify-center space-x-4">
                        <a href="#"
                            class="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition">
                            + Tambah Produk
                        </a>
                        <a href="#"
                            class="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition">
                            Lihat Pesanan
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
