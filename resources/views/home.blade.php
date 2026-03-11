<x-app-layout>
    <div x-data="{ 
        loading: false,
        async performSearch(url = null) {
            this.loading = true;
            if (!url) {
                const searchForm = this.$refs.searchForm;
                const filterForm = this.$refs.filterForm;
                
                const searchData = new FormData(searchForm);
                const filterData = new FormData(filterForm);
                
                const params = new URLSearchParams();
                
                // Merge all form data
                for (let [key, value] of searchData.entries()) {
                    if (value) params.set(key, value);
                }
                for (let [key, value] of filterData.entries()) {
                    if (value) params.set(key, value);
                }
                
                const baseUrl = searchForm.action;
                url = baseUrl + '?' + params.toString();
            }
            
            window.history.pushState({}, '', url);

            try {
                const response = await fetch(url, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                const html = await response.text();
                const container = document.getElementById('product-list-container');
                container.innerHTML = html;
                
                // Refresh Lucide icons ONLY in the updated container to avoid duplication
                this.$nextTick(() => {
                    if (window.renderIcons) {
                        window.renderIcons(container);
                    }
                });
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        handleLinks(e) {
            const link = e.target.closest('a');
            if (link && !link.hasAttribute('data-no-ajax')) {
                // Check if it's a home-related link (pagination, filter, etc.)
                const url = new URL(link.href);
                const homeUrl = new URL('{{ route('home') }}', window.location.origin);
                
                if (url.origin === homeUrl.origin && (url.pathname === homeUrl.pathname || url.pathname === homeUrl.pathname + '/')) {
                    // It's a link to the home page, likely a search/filter/pagination
                    e.preventDefault();
                    this.performSearch(link.href);
                }
            }
        }
    }" @click="handleLinks($event)">
        <div class="bg-primary py-12 mb-8 shadow-md relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div class="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white mix-blend-overlay blur-3xl"></div>
                <div class="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-primary-400 mix-blend-overlay blur-3xl">
                </div>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h1
                    class="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 tracking-tight leading-tight">
                    Temukan <span class="text-primary-foreground/70">Gawai Terbaik</span> <br class="hidden md:block"> di
                    Satu Tempat
                </h1>
                <p class="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-2xl mx-auto px-4 font-medium">
                    Pasar gadget bekas terpercaya dengan sistem keamanan transaksi dan verifikasi seller.
                </p>

                <form x-ref="searchForm" action="{{ route('home') }}" method="GET" class="max-w-2xl mx-auto px-4"
                    @submit.prevent="performSearch()">

                    <div class="flex flex-col sm:flex-row gap-3">
                        <div class="flex gap-3 flex-1">
                            <button type="button" x-data=""
                                x-on:click="$dispatch('open-modal', 'filter-modal')"
                                class="flex-shrink-0 bg-background text-foreground w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3 rounded-2xl font-bold shadow-lg hover:bg-accent hover:text-accent-foreground transition flex items-center justify-center gap-2 border-2 border-transparent hover:border-border relative group">

                                <i data-lucide="sliders-horizontal"
                                    class="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors"></i>

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
                                    <div x-show="!loading" x-cloak>
                                        <i data-lucide="search"
                                            class="h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors"></i>
                                    </div>
                                    <div x-show="loading" x-cloak>
                                        <div class="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                </div>

                                <input type="text" name="search" value="{{ request('search') }}"
                                    placeholder="Cari iPhone, Macbook..."
                                    @input.debounce.500ms="performSearch()"
                                    class="w-full pl-12 pr-4 py-3.5 rounded-2xl shadow-lg 
                                    text-foreground placeholder-muted-foreground 
                                    bg-background border border-border 
                                    focus:ring-2 focus:ring-ring focus:outline-none text-base transition-colors">
                            </div>
                        </div>
                    </div>
                </form>

                @if (request()->anyFilled(['category', 'ram', 'storage', 'kelengkapan', 'sort']))
                    <div class="mt-5 flex justify-center gap-2 flex-wrap items-center animate-fade-in-down">
                        <span class="text-primary-foreground/60 text-sm mr-1">Filter:</span>
                        @if (request('category'))
                            <span class="bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground text-[10px] px-3 py-1 rounded-full border border-primary-foreground/20">
                                {{ request('category') }}
                            </span>
                        @endif
                        @if (request('ram'))
                            <span class="bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground text-[10px] px-3 py-1 rounded-full border border-primary-foreground/20">
                                RAM: {{ request('ram') }}
                            </span>
                        @endif
                        @if (request('storage'))
                            <span class="bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground text-[10px] px-3 py-1 rounded-full border border-primary-foreground/20">
                                ROM: {{ request('storage') }}
                            </span>
                        @endif
                        @if (request('kelengkapan'))
                            <span class="bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground text-[10px] px-3 py-1 rounded-full border border-primary-foreground/20">
                                {{ request('kelengkapan') }}
                            </span>
                        @endif
                        @if (request('sort'))
                            <span class="bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground text-[10px] px-3 py-1 rounded-full border border-primary-foreground/20">
                                {{ request('sort') == 'oldest' ? 'Terlama' : 'Terbaru' }}
                            </span>
                        @endif
                        <a href="{{ route('home') }}"
                            class="ml-2 text-primary-foreground/80 hover:text-primary-foreground text-[10px] font-bold underline decoration-dotted transition">
                            Hapus Filter
                        </a>
                    </div>
                @endif
            </div>
        </div>

        <div class="pb-12 px-4">
            <div class="max-w-7xl mx-auto">
                <div id="product-list-container">
                    @include('products._list')
                </div>
            </div>
        </div>

        <x-modal name="filter-modal" focusable>
            <div class="p-6 bg-background text-foreground transition-colors">
                <div class="flex justify-between items-center mb-6 pb-4 border-b border-border">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Filter Pencarian</h2>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sesuaikan hasil sesuai kebutuhan Anda
                        </p>
                    </div>
                    <button x-on:click="$dispatch('close')"
                        class="p-2 bg-muted rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form x-ref="filterForm" action="{{ route('home') }}" method="GET" @submit.prevent="performSearch(); $dispatch('close')">

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
                                    class="px-3 py-3 rounded-xl border border-border text-center text-sm font-medium 
                                    text-foreground
                                    group-hover:border-ring transition-all duration-200
                                    peer-checked:bg-primary 
                                    peer-checked:text-primary-foreground 
                                    peer-checked:border-primary 
                                    peer-checked:shadow-md ring-0 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-ring">
                                    Semua Kategori
                                </div>
                            </label>

                            @foreach ($categories as $cat)
                                <label class="cursor-pointer relative group">
                                    <input type="radio" name="category" value="{{ $cat->slug }}"
                                        class="peer sr-only" {{ request('category') == $cat->slug ? 'checked' : '' }}>
                                    <div
                                        class="px-3 py-3 rounded-xl border border-border text-center text-sm font-medium 
                                        text-foreground
                                        group-hover:border-ring transition-all duration-200
                                        peer-checked:bg-primary 
                                        peer-checked:text-primary-foreground 
                                        peer-checked:border-primary 
                                        peer-checked:shadow-md">
                                        {{ $cat->name }}
                                    </div>
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <div class="mb-6">
                        <h4 class="text-[11px] font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <i data-lucide="cpu" class="w-4 h-4 text-primary-600"></i>
                            RAM
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            @foreach ($rams as $ram)
                                <label class="cursor-pointer group relative">
                                    <input type="radio" name="ram" value="{{ $ram }}"
                                        class="peer sr-only" {{ request('ram') == $ram ? 'checked' : '' }}>
                                    <span class="px-3 py-1.5 rounded-lg text-xs font-bold border border-border bg-background text-foreground group-hover:bg-muted transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-checked:shadow-md select-none block">
                                        {{ $ram }}
                                    </span>
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <div class="mb-6">
                        <h4 class="text-[11px] font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <i data-lucide="hard-drive" class="w-4 h-4 text-primary-600"></i>
                            Penyimpanan
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            @foreach ($storages as $storage)
                                <label class="cursor-pointer group relative">
                                    <input type="radio" name="storage" value="{{ $storage }}"
                                        class="peer sr-only" {{ request('storage') == $storage ? 'checked' : '' }}>
                                    <span class="px-3 py-1.5 rounded-lg text-xs font-bold border border-border bg-background text-foreground group-hover:bg-muted transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-checked:shadow-md select-none block">
                                        {{ $storage }}
                                    </span>
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <div class="mb-6">
                        <h4 class="text-[11px] font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <i data-lucide="package" class="w-4 h-4 text-primary-600"></i>
                            Kelengkapan
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            @foreach ($kelengkapan as $item)
                                <label class="cursor-pointer group relative">
                                    <input type="radio" name="kelengkapan" value="{{ $item }}"
                                        class="peer sr-only" {{ request('kelengkapan') == $item ? 'checked' : '' }}>
                                    <span class="px-3 py-1.5 rounded-lg text-xs font-bold border border-border bg-background text-foreground group-hover:bg-muted transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-checked:shadow-md select-none block">
                                        {{ $item }}
                                    </span>
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <div class="mb-8">
                        <h4 class="text-[11px] font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <i data-lucide="arrow-up-down" class="w-4 h-4 text-primary-600"></i>
                            Urutkan
                        </h4>
                        <div class="grid grid-cols-2 gap-3">
                            <label class="cursor-pointer group relative">
                                <input type="radio" name="sort" value="latest" class="peer sr-only" {{ request('sort', 'latest') == 'latest' ? 'checked' : '' }}>
                                <div class="px-3 py-3 rounded-xl border border-border text-center text-xs font-bold text-foreground group-hover:border-ring transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-checked:shadow-md">
                                    Produk Terbaru
                                </div>
                            </label>
                            <label class="cursor-pointer group relative">
                                <input type="radio" name="sort" value="oldest" class="peer sr-only" {{ request('sort') == 'oldest' ? 'checked' : '' }}>
                                <div class="px-3 py-3 rounded-xl border border-border text-center text-xs font-bold text-foreground group-hover:border-ring transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-checked:shadow-md">
                                    Produk Terlama
                                </div>
                            </label>
                        </div>
                    </div>

                    <div
                        class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <button type="button" x-on:click="$dispatch('close')"
                            class="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring">
                            Batal
                        </button>

                        @if (request()->anyFilled(['category', 'ram', 'storage', 'kelengkapan', 'sort']))
                            <a href="{{ route('home') }}"
                                class="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold px-4 transition-colors">
                                Reset
                            </a>
                        @endif

                        <button type="submit"
                            class="px-6 py-2 text-sm font-bold text-primary-foreground bg-primary border border-transparent rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring shadow-lg shadow-primary/30">
                            Terapkan Filter
                        </button>
                    </div>
                </form>
            </div>
        </x-modal>
    </div>
</x-app-layout>
