<x-app-layout>
    <div>
        <div class="bg-primary-600 py-12 mb-8 shadow-md relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div class="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white mix-blend-overlay blur-3xl"></div>
                <div class="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-primary-400 mix-blend-overlay blur-3xl">
                </div>
            </div>

            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center relative z-10">
                <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                    Temukan <span class="text-primary-200">Gawai Terbaik</span>
                </h1>
                <p class="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                    Pasar gadget bekas terpercaya dengan sistem keamanan transaksi.
                </p>

                <form action="{{ route('home') }}" method="GET" class="max-w-2xl mx-auto px-4">
                    @if (request('category'))
                        <input type="hidden" name="category" value="{{ request('category') }}">
                    @endif
                    @if (request('ram'))
                        <input type="hidden" name="ram" value="{{ request('ram') }}">
                    @endif

                    <div class="flex gap-3">
                        <button type="button" x-data=""
                            x-on:click="$dispatch('open-modal', 'filter-modal')"
                            class="flex-shrink-0 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3 rounded-2xl font-bold shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2 border-2 border-transparent hover:border-primary-200 relative group">

                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 transition-colors"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>

                            <span class="hidden md:inline">Filter</span>

                            @if (request()->anyFilled(['category', 'ram']))
                                <span class="absolute top-2 right-2 md:top-3 md:right-3 flex h-3 w-3">
                                    <span
                                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span
                                        class="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                                </span>
                            @endif
                        </button>

                        <div class="relative flex-grow group">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <svg class="h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <input type="text" name="search" value="{{ request('search') }}"
                                placeholder="Cari iPhone 13, Macbook..."
                                class="w-full pl-12 pr-28 py-3.5 rounded-2xl border-0 shadow-lg 
                                text-gray-900 dark:text-white placeholder-gray-400 
                                bg-white dark:bg-gray-800 
                                focus:ring-4 focus:ring-primary-500/30 text-base transition-colors">

                            <div class="absolute inset-y-1 right-1 flex">
                                <button type="submit"
                                    class="bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 text-white px-5 rounded-xl text-sm font-bold transition-all shadow-md">
                                    Cari
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                @if (request()->anyFilled(['category', 'ram']))
                    <div class="mt-5 flex justify-center gap-2 flex-wrap items-center animate-fade-in-down">
                        <span class="text-primary-100 text-sm mr-1">Filter:</span>
                        @if (request('category'))
                            <span
                                class="bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                                {{ request('category') }}
                            </span>
                        @endif
                        @if (request('ram'))
                            <span
                                class="bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                                RAM: {{ request('ram') }}
                            </span>
                        @endif
                        <a href="{{ route('home') }}"
                            class="ml-2 text-white/80 hover:text-white text-xs underline decoration-dotted transition">
                            Hapus Filter
                        </a>
                    </div>
                @endif
            </div>
        </div>

        <div class="pb-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    @forelse($products as $product)
                        <div
                            class="bg-white dark:bg-gray-800 group rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500 hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 flex flex-col overflow-hidden">

                            <div class="aspect-square bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                                @if ($product->images->isNotEmpty())
                                    <img src="{{ asset('storage/' . $product->images->first()->image_path) }}"
                                        alt="{{ $product->title }}"
                                        class="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                                @else
                                    <div
                                        class="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-900">
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
                                    class="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary-700 dark:text-primary-300 shadow-sm uppercase tracking-wider">
                                    {{ $product->category->name }}
                                </div>
                                <div
                                    class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                                    @auth
                                        @if (Auth::id() !== $product->user_id)
                                            <form action="{{ route('chat.initiate', $product->id) }}" method="POST">
                                                @csrf
                                                <x-primary-button
                                                    class="w-full justify-center !bg-white !text-primary-700 hover:!bg-primary-50 font-bold shadow-lg text-xs">
                                                    Chat Penjual
                                                </x-primary-button>
                                            </form>
                                        @endif
                                    @endauth
                                </div>
                            </div>

                            <div class="p-5 flex flex-col flex-grow">
                                <h3
                                    class="text-base font-bold text-gray-800 dark:text-gray-100 line-clamp-2 mb-2 h-12 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {{ $product->title }}
                                </h3>
                                <div class="mt-auto">
                                    <p class="text-primary-600 dark:text-primary-400 font-black text-xl">
                                        Rp {{ number_format($product->price, 0, ',', '.') }}
                                    </p>
                                    <div class="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                                        <svg class="h-3.5 w-3.5 mr-1 text-gray-400" fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <span
                                            class="truncate">{{ $product->seller->profile->address ?? 'Lokasi Seller' }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div
                            class="col-span-full py-20 text-center bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 transition-colors">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700 mb-4">
                                <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Tidak ditemukan</h3>
                            <p class="text-gray-500 dark:text-gray-400 mt-1">Coba kata kunci lain atau reset filter.
                            </p>
                            <a href="{{ route('home') }}"
                                class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/50 hover:bg-primary-200 dark:hover:bg-primary-900">
                                Reset Filter
                            </a>
                        </div>
                    @endforelse
                </div>

                <div class="mt-12">
                    {{ $products->links() }}
                </div>
            </div>
        </div>

        <x-modal name="filter-modal" focusable>
            <div class="p-6 bg-white dark:bg-gray-800 transition-colors">
                <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Filter Pencarian</h2>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sesuaikan hasil sesuai kebutuhan Anda
                        </p>
                    </div>
                    <button x-on:click="$dispatch('close')"
                        class="p-2 bg-gray-50 dark:bg-gray-700 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-600 dark:hover:text-gray-200 transition">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form action="{{ route('home') }}" method="GET">
                    @if (request('search'))
                        <input type="hidden" name="search" value="{{ request('search') }}">
                    @endif

                    <div class="mb-6">
                        <h4
                            class="text-sm font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            Kategori
                        </h4>
                        <div class="grid grid-cols-2 gap-3">
                            <label class="cursor-pointer relative group">
                                <input type="radio" name="category" value="" class="peer sr-only"
                                    {{ !request('category') ? 'checked' : '' }}>
                                <div
                                    class="px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-center text-sm font-medium 
                                    text-gray-700 dark:text-gray-300
                                    group-hover:border-gray-300 dark:group-hover:border-gray-500 transition-all duration-200
                                    peer-checked:bg-gray-900 dark:peer-checked:bg-primary-600 
                                    peer-checked:text-white dark:peer-checked:text-white 
                                    peer-checked:border-gray-900 dark:peer-checked:border-primary-600 
                                    peer-checked:shadow-md ring-0 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-gray-900 dark:peer-focus:ring-gray-600">
                                    Semua Kategori
                                </div>
                            </label>

                            @foreach ($categories as $cat)
                                <label class="cursor-pointer relative group">
                                    <input type="radio" name="category" value="{{ $cat->slug }}"
                                        class="peer sr-only" {{ request('category') == $cat->slug ? 'checked' : '' }}>
                                    <div
                                        class="px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-center text-sm font-medium 
                                        text-gray-700 dark:text-gray-300
                                        group-hover:border-gray-300 dark:group-hover:border-gray-500 transition-all duration-200
                                        peer-checked:bg-gray-900 dark:peer-checked:bg-primary-600 
                                        peer-checked:text-white dark:peer-checked:text-white 
                                        peer-checked:border-gray-900 dark:peer-checked:border-primary-600 
                                        peer-checked:shadow-md">
                                        {{ $cat->name }}
                                    </div>
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <div class="mb-8">
                        <h4
                            class="text-sm font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            RAM
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            @foreach (['4GB', '8GB', '16GB', '32GB'] as $ram)
                                <label class="cursor-pointer group relative">
                                    <input type="radio" name="ram" value="{{ $ram }}"
                                        class="peer sr-only" {{ request('ram') == $ram ? 'checked' : '' }}>
                                    <span
                                        class="px-5 py-2 rounded-lg text-sm font-bold border border-gray-200 dark:border-gray-600 
                                        bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300
                                        group-hover:bg-gray-50 dark:group-hover:bg-gray-600 transition-all
                                        peer-checked:bg-primary-600 dark:peer-checked:bg-primary-600 
                                        peer-checked:text-white dark:peer-checked:text-white 
                                        peer-checked:border-primary-600 dark:peer-checked:border-primary-600 
                                        peer-checked:shadow-md select-none block">
                                        {{ $ram }}
                                    </span>
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <div
                        class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <button type="button" x-on:click="$dispatch('close')"
                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Batal
                        </button>

                        @if (request()->anyFilled(['category', 'ram']))
                            <a href="{{ route('home', ['search' => request('search')]) }}"
                                class="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold px-4">
                                Reset
                            </a>
                        @endif

                        <button type="submit"
                            class="px-6 py-2 text-sm font-bold text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-500/30">
                            Terapkan Filter
                        </button>
                    </div>
                </form>
            </div>
        </x-modal>
    </div>
</x-app-layout>
