<x-app-layout>
    <div class="py-12 bg-background text-foreground min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {{-- Breadcrumbs --}}
            <nav class="flex mb-8 text-sm font-medium" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <a href="{{ route('home') }}"
                            class="text-gray-500 hover:text-primary transition-colors flex items-center">
                            <i data-lucide="home" class="w-4 h-4 mr-2"></i>
                            Beranda
                        </a>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
                            <span class="ml-1 text-gray-500 md:ml-2">{{ $product->category->name }}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {{-- Left: Image Gallery (Lg: 7 columns) --}}
                <div class="lg:col-span-7 space-y-6"
                    x-data="{ activeImage: '{{ asset('storage/' . ($product->images->first()->image_path ?? '')) }}' }">
                    <div
                        class="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-card text-card-foreground shadow-2xl shadow-gray-200/50 dark:shadow-none border border-border">
                        <img :src="activeImage" alt="{{ $product->title }}"
                            class="w-full h-full object-cover transition-all duration-700">

                        <div class="absolute top-6 left-6 flex flex-col gap-2">
                            @if($product->reference_url)
                                <a href="{{ $product->reference_url }}" target="_blank"
                                    class="bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider hover:bg-primary transition-all flex items-center gap-2">
                                    {{ $product->brand }}
                                    <i data-lucide="external-link" class="w-3 h-3"></i>
                                </a>
                            @else
                                <span
                                    class="bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider">
                                    {{ $product->brand }}
                                </span>
                            @endif
                        </div>
                    </div>

                    @if($product->images->count() > 1)
                        <div class="grid grid-cols-4 gap-4">
                            @foreach($product->images as $image)
                                <button @click="activeImage = '{{ asset('storage/' . $image->image_path) }}'"
                                    class="relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300"
                                    :class="activeImage === '{{ asset('storage/' . $image->image_path) }}' ? 'border-primary scale-95 shadow-lg' : 'border-transparent hover:border-gray-200 grayscale hover:grayscale-0 opacity-70 hover:opacity-100'">
                                    <img src="{{ asset('storage/' . $image->image_path) }}" class="w-full h-full object-cover">
                                </button>
                            @endforeach
                        </div>
                    @endif
                </div>



                {{-- Right: Product Details (Lg: 5 columns) --}}
                <div class="lg:col-span-5 flex flex-col">
                    <div
                        class="bg-card text-card-foreground rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-200/40 dark:shadow-none border border-border sticky top-8">
                        <div class="mb-6">
                            <div class="flex items-center gap-2 mb-3">
                                <span
                                    class="px-3 py-1 bg-muted rounded-lg text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{{ $product->type }}</span>
                                <span
                                    class="px-3 py-1 bg-primary/10 dark:bg-primary/30 rounded-lg text-[10px] font-bold text-primary dark:text-primary uppercase tracking-widest">{{ $product->status }}</span>
                            </div>
                            <h1 class="text-3xl md:text-4xl font-black text-card-foreground leading-tight mb-4">
                                @if($product->reference_url)
                                    <a href="{{ $product->reference_url }}" target="_blank"
                                        class="hover:text-primary transition-colors flex items-center gap-3">
                                        {{ $product->title }}
                                        <i data-lucide="external-link" class="w-6 h-6 text-muted-foreground"></i>
                                    </a>
                                @else
                                    {{ $product->title }}
                                @endif
                            </h1>
                            <div class="flex items-baseline gap-2">
                                <span class="text-4xl font-black text-primary">
                                    Rp {{ number_format($product->price, 0, ',', '.') }}
                                </span>
                            </div>
                        </div>

                        <div class="space-y-8">
                            {{-- Specs Grid --}}
                            <div class="grid grid-cols-2 gap-4">
                                @foreach($product->specifications as $key => $value)
                                    @if($value)
                                        <div class="bg-muted p-4 rounded-2xl border border-border">
                                            <span
                                                class="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">{{ str_replace('_', ' ', $key) }}</span>
                                            <span class="block text-sm font-bold text-foreground">{{ $value }}</span>
                                        </div>
                                    @endif
                                @endforeach
                            </div>

                            @if($product->reference_url)
                                <a href="{{ $product->reference_url }}" target="_blank"
                                    class="flex items-center justify-center gap-3 w-full py-4 bg-muted hover:bg-accent border border-border rounded-2xl text-sm font-black transition-all group">
                                    <i data-lucide="globe" class="w-5 h-5"></i>
                                    Lihat Referensi Eksternal
                                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                                </a>
                            @endif

                            {{-- Description --}}
                            <div>
                                <h3 class="text-sm font-black text-foreground uppercase tracking-wider mb-3">
                                    Deskripsi Produk</h3>
                                <div
                                    class="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    {!! nl2br(e($product->description)) !!}
                                </div>
                            </div>

                            {{-- Seller Card --}}
                            <div
                                class="bg-card text-card-foreground border border-border rounded-3xl p-6 overflow-hidden relative group">
                                <div
                                    class="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150">
                                </div>

                                <div class="flex items-center justify-between mb-6 relative z-10">
                                    <div class="flex items-center gap-4">
                                        <div
                                            class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-xl font-black text-primary-foreground shadow-xl">
                                            {{ strtoupper(substr($product->seller->name, 0, 1)) }}
                                        </div>
                                        <div>
                                            <h4 class="font-black text-lg text-card-foreground">
                                                {{ $product->seller->name }}
                                            </h4>
                                            <div class="flex items-center text-xs text-muted-foreground">
                                                <i data-lucide="map-pin" class="w-3 h-3 mr-1"></i>
                                                {{ $product->seller->profile->address ?? 'Lokasi tidak diset' }}
                                            </div>
                                        </div>
                                    </div>
                                    <a href="{{ route('store.show', $product->user_id) }}"
                                        class="p-3 bg-muted hover:bg-accent rounded-xl transition-colors">
                                        <i data-lucide="store" class="w-5 h-5 text-foreground"></i>
                                    </a>
                                </div>

                                @auth
                                    @if(Auth::id() !== $product->user_id)
                                        <form action="{{ route('chat.initiate', $product) }}" method="POST"
                                            class="relative z-10">
                                            @csrf
                                            <button type="submit"
                                                class="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 rounded-2xl font-black text-sm shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2">
                                                <i data-lucide="message-circle" class="w-5 h-5"></i>
                                                Chat Penjual Sekarang
                                            </button>
                                        </form>
                                    @else
                                        <a href="{{ route('products.edit', $product) }}"
                                            class="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 py-4 rounded-2xl font-black text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                                            <i data-lucide="edit-3" class="w-5 h-5"></i>
                                            Edit Produk Anda
                                        </a>
                                    @endif
                                @else
                                    <a href="{{ route('login') }}"
                                        class="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2">
                                        Login untuk Chat
                                    </a>
                                @endauth
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</x-app-layout>