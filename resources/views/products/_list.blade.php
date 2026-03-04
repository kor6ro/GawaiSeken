<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    @forelse($products as $product)
        <div x-data="{ activeImage: 0, imageCount: {{ $product->images->count() }} }"
            class="group relative bg-card text-card-foreground rounded-3xl border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col">

            {{-- Image Container --}}
            <div class="aspect-[4/5] relative overflow-hidden bg-muted">
                @if ($product->images->isNotEmpty())
                    {{-- Multi-image Slider --}}
                    <div class="w-full h-full relative">
                        @foreach ($product->images as $index => $image)
                            <img draggable="false" src="{{ asset('storage/' . $image->image_path) }}"
                                alt="{{ $product->title }} - {{ $index + 1 }}" x-show="activeImage === {{ $index }}"
                                x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 scale-105"
                                x-transition:enter-end="opacity-100 scale-100"
                                class="absolute inset-0 object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110">
                        @endforeach
                    </div>

                    {{-- Navigation Dots --}}
                    @if ($product->images->count() > 1)
                        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 transition-opacity duration-300">
                            @foreach ($product->images as $index => $image)
                                <button @mouseenter="activeImage = {{ $index }}" class="h-1.5 rounded-full transition-all duration-300"
                                    :class="activeImage === {{ $index }} ? 'w-4 bg-white shadow-sm' :
                                                        'w-1.5 bg-white/40 hover:bg-white/60'">
                                </button>
                            @endforeach
                        </div>
                    @endif
                @else
                    <div class="flex flex-col items-center justify-center h-full text-gray-400">
                        <i data-lucide="image-off" class="w-12 h-12 mb-2 stroke-[1.5]"></i>
                        <span class="text-[10px] uppercase font-bold tracking-widest">No Image</span>
                    </div>
                @endif

                {{-- Badges --}}
                <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <span
                        class="bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-primary shadow-sm uppercase tracking-wider border border-border">
                        {{ $product->category->name }}
                    </span>
                    @if ($product->status !== 'available')
                        <span
                            class="bg-destructive/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-destructive-foreground shadow-sm uppercase tracking-wider border border-border">
                            Terjual
                        </span>
                    @endif
                </div>

                {{-- Quick View Overlay --}}
                <a href="{{ route('products.show', $product->slug) }}"
                    class="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[2px]">
                    <div
                        class="bg-card text-card-foreground px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                        Lihat Detail
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </a>
            </div>

            {{-- Product Info --}}
            <div class="p-6 flex flex-col flex-grow">
                <div class="mb-3">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            {{ $product->brand ?? 'Gadget' }}
                        </span>
                        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            {{ $product->type ?? 'Gawai' }}
                        </span>
                    </div>
                    <h3
                        class="text-base font-bold text-card-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {{ $product->title }}
                    </h3>
                </div>

                <div class="mt-auto space-y-4">
                    <div class="flex flex-col">
                        <span
                            class="text-[10px] font-bold text-primary-600/50 dark:text-primary-400/50 uppercase tracking-tighter">Harga
                            App</span>
                        <span class="text-xl font-black text-primary-600 dark:text-primary-400">
                            Rp {{ number_format($product->price, 0, ',', '.') }}
                        </span>
                    </div>

                    <div class="flex items-center pt-4 border-t border-border">
                        <div class="flex items-center flex-1">
                            <div
                                class="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold mr-2 shadow-inner">
                                {{ strtoupper(substr($product->seller->name, 0, 1)) }}
                            </div>
                            <div class="flex flex-col min-w-0">
                                <span class="text-[10px] font-bold text-foreground truncate">
                                    {{ $product->seller->name }}
                                </span>
                                <div class="flex items-center text-[9px] text-gray-500">
                                    <i data-lucide="map-pin" class="h-2.5 w-2.5 mr-0.5"></i>
                                    <span class="truncate">{{ $product->seller->profile->address ?? 'Lokasi...' }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-1">
                            @auth
                                @if (Auth::id() !== $product->user_id)
                                    <form action="{{ route('chat.initiate', $product) }}" method="POST">
                                        @csrf
                                        <button type="submit"
                                            class="p-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                                            <i data-lucide="message-circle" class="w-4 h-4"></i>
                                        </button>
                                    </form>
                                @endif
                            @endauth
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @empty
        <div
            class="col-span-full py-20 text-center bg-card text-card-foreground rounded-2xl border border-dashed border-border transition-colors">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700 mb-4">
                <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Tidak ditemukan</h3>
            <p class="text-gray-500 dark:text-gray-400 mt-1">Coba kata kunci lain atau reset filter.
            </p>
            <a href="{{ route('home') }}"
                class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90">
                Reset Filter
            </a>
        </div>
    @endforelse
</div>

<div class="mt-12">
    {{ $products->links() }}
</div>

<script>
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
</script>