<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Marketplace') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div class="text-center">
                    <h1 class="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Temukan <span class="text-primary-600">Gawai Terbaik</span> Untuk Anda
                    </h1>
                    <p class="text-gray-600 text-lg mb-8">Pasar gadget bekas terpercaya dengan sistem keamanan transaksi.
                    </p>

                    <form action="#" method="GET" class="max-w-2xl mx-auto relative group">
                        <input type="text" name="search" placeholder="Cari iPhone, laptop, atau komponen PC..."
                            class="w-full pl-12 pr-4 py-4 rounded-2xl border-gray-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all">
                        <div
                            class="absolute left-4 top-4 text-gray-400 group-focus-within:text-primary-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button type="submit"
                            class="absolute right-3 top-2 bottom-2 bg-primary-600 text-white px-6 rounded-xl hover:bg-primary-700 transition-colors font-semibold">
                            Cari
                        </button>
                    </form>
                </div>
            </div>

            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    @forelse($products as $product)
                        <div
                            class="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 flex flex-col h-full">

                            <div class="aspect-square bg-gray-100 relative overflow-hidden">
                                @if ($product->images->isNotEmpty())
                                    <img src="{{ asset('storage/' . $product->images->first()->image_path) }}"
                                        alt="{{ $product->title }}"
                                        class="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500">
                                @else
                                    <div
                                        class="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50">
                                        <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                        <span class="text-xs uppercase tracking-widest">No Image</span>
                                    </div>
                                @endif
                                <div
                                    class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary-700 shadow-sm uppercase tracking-wider">
                                    {{ $product->category->name }}
                                </div>
                            </div>

                            <div class="p-5 flex flex-col flex-grow">
                                <h3 class="text-base font-bold text-gray-800 line-clamp-2 mb-2 h-12 leading-tight">
                                    {{ $product->title }}
                                </h3>

                                <div class="mt-auto">
                                    <p class="text-primary-600 font-black text-xl">
                                        Rp {{ number_format($product->price, 0, ',', '.') }}
                                    </p>

                                    <div class="flex items-center mt-3 text-xs text-gray-500">
                                        <div class="bg-gray-100 p-1.5 rounded-md mr-2">
                                            <svg class="h-3.5 w-3.5 text-gray-400" fill="currentColor"
                                                viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <span
                                            class="truncate">{{ $product->seller->profile->address ?? 'Kota tidak tersedia' }}</span>
                                    </div>

                                    <a href="#"
                                        class="mt-5 block w-full text-center bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-bold py-2.5 rounded-xl transition-all duration-200">
                                        Lihat Detail
                                    </a>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="col-span-full py-20 text-center">
                            <p class="text-gray-500">Belum ada produk yang tersedia saat ini.</p>
                        </div>
                    @endforelse
                </div>

                <div class="mt-12">
                    {{ $products->links() }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
