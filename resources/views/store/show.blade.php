<x-app-layout>
    {{-- Header Background --}}
    <div class="h-48 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-gray-800 dark:to-gray-900"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative pb-12" x-data="{ activeTab: 'products' }">

        {{-- PROFILE CARD SECTION --}}
        <div
            class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div class="md:flex">
                {{-- Kiri: Foto & Info Utama --}}
                <div
                    class="p-8 md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div class="inline-block relative">
                        <div
                            class="h-32 w-32 rounded-full bg-white dark:bg-gray-700 p-1 shadow-lg mx-auto md:mx-0 overflow-hidden">
                            @if ($user->avatar)
                                {{-- Jika user punya foto profil --}}
                                <img src="{{ Storage::url($user->avatar) }}" alt="{{ $user->name }}"
                                    class="h-full w-full rounded-full object-cover">
                            @else
                                {{-- Fallback inisial nama --}}
                                <div
                                    class="h-full w-full rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-4xl font-bold text-primary-600 dark:text-primary-300">
                                    {{ substr($user->name, 0, 1) }}
                                </div>
                            @endif
                        </div>
                        {{-- Online Status (Opsional: Butuh implementasi Cache/LastSeen) --}}
                        <span
                            class="absolute bottom-2 right-2 block h-5 w-5 rounded-full ring-2 ring-white dark:ring-gray-800 bg-green-400"
                            title="Online"></span>
                    </div>

                    <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{{ $user->name }}</h1>

                    {{-- Lokasi Dinamis
                    <p
                        class="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center md:justify-start gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {{ $stats['city'] }}
                    </p> --}}

                    <div class="mt-6 flex flex-col gap-3">
                        @if (auth()->id() !== $user->id)
                            <button onclick="alert('Fitur buka chat belum dihubungkan')"
                                class="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-lg shadow-primary-600/30 transition-all flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Chat Penjual
                            </button>
                        @else
                            <a href="{{ route('profile.edit') }}"
                                class="w-full py-2.5 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-xl font-medium transition-all text-center">
                                Edit Profil
                            </a>
                        @endif
                    </div>
                </div>

                {{-- Kanan: Statistik & Bio --}}
                <div class="p-8 md:w-2/3">
                    <div class="grid grid-cols-3 gap-4 text-center mb-8">
                        <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                            <span
                                class="block text-2xl font-bold text-gray-900 dark:text-white">{{ $products->count() }}</span>
                            <span class="text-xs text-gray-500 uppercase tracking-wide">Produk Aktif</span>
                        </div>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                            <span
                                class="block text-2xl font-bold text-gray-900 dark:text-white">{{ $stats['sold'] }}</span>
                            <span class="text-xs text-gray-500 uppercase tracking-wide">Terjual</span>
                        </div>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                            <div class="flex items-center justify-center gap-1">
                                {{-- Format rating 1 desimal (4.8) --}}
                                <span
                                    class="text-2xl font-bold text-gray-900 dark:text-white">{{ number_format($stats['rating'], 1) }}</span>
                                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="text-xs text-gray-500 uppercase tracking-wide">Rating Toko</span>
                        </div>
                    </div>

                    <div class="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300">
                        <h3 class="text-gray-900 dark:text-white font-semibold mb-2">Tentang Toko</h3>
                        <p>
                            {{-- Tampilkan Bio dari DB, atau Default Text jika kosong --}}
                            {{ $user->bio ?? "Halo! Saya member GawaiSeken sejak {$stats['joined']}. Saya menjual barang elektronik bekas berkualitas. Silakan chat untuk bertanya detail kondisi barang." }}
                        </p>
                    </div>
                </div>
            </div>

            {{-- Navigation Tabs
            <div class="flex border-t border-gray-100 dark:border-gray-700">
                <button @click="activeTab = 'products'"
                    class="flex-1 py-4 text-sm font-medium border-b-2 transition-colors"
                    :class="activeTab === 'products' ?
                        'border-primary-600 text-primary-600 bg-primary-50/50 dark:bg-primary-900/10' :
                        'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'">
                    Etalase ({{ $products->count() }})
                </button>
                <button @click="activeTab = 'reviews'"
                    class="flex-1 py-4 text-sm font-medium border-b-2 transition-colors"
                    :class="activeTab === 'reviews' ?
                        'border-primary-600 text-primary-600 bg-primary-50/50 dark:bg-primary-900/10' :
                        'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'">
                    Ulasan ({{ $reviews->count() }})
                </button>
            </div>
        </div> --}}

            {{-- CONTENT SECTIONS --}}
            <div class="mt-8">

                {{-- TAB: PRODUCTS (REAL DATA) --}}
                <div x-show="activeTab === 'products'" x-transition:enter="transition ease-out duration-300"
                    x-transition:enter-start="opacity-0 translate-y-4"
                    x-transition:enter-end="opacity-100 translate-y-0">

                    @forelse($products as $product)
                        <a href="{{ route('dashboard', $product) }}"
                            class="block group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
                            {{-- Product Image --}}
                            <div class="aspect-square bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                @if ($product->image)
                                    <img src="{{ Storage::url($product->image) }}" alt="{{ $product->title }}"
                                        class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                @else
                                    <div class="flex items-center justify-center h-full text-gray-400">
                                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                @endif

                                {{-- Badge Kondisi (Opsional jika ada kolom condition di DB) --}}
                                <div
                                    class="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                                    {{ ucfirst($product->condition ?? 'Bekas') }}
                                </div>
                            </div>

                            <div class="p-4">
                                <h3
                                    class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1 mb-1">
                                    {{ $product->title }}
                                </h3>
                                <p class="text-primary-600 font-bold text-lg">
                                    Rp {{ number_format($product->price, 0, ',', '.') }}
                                </p>
                                <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                                    <span>{{ $product->created_at->diffForHumans() }}</span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        {{ $product->views ?? 0 }}
                                    </span>
                                </div>
                            </div>
                        </a>
                    @empty
                        <div class="col-span-full text-center py-20">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Belum ada barang</h3>
                            <p class="text-gray-500">Penjual ini belum memajang produk apapun.</p>
                        </div>
                    @endforelse
                </div>

                {{-- TAB: REVIEWS (REAL DATA) --}}
                <div x-show="activeTab === 'reviews'" x-transition:enter="transition ease-out duration-300"
                    x-transition:enter-start="opacity-0 translate-y-4"
                    x-transition:enter-end="opacity-100 translate-y-0" style="display: none;">

                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Apa kata pembeli?</h3>

                        <div class="space-y-6">
                            @forelse($reviews as $review)
                                <div
                                    class="flex gap-4 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                                    {{-- Avatar Pembeli --}}
                                    <div
                                        class="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 font-bold shrink-0 overflow-hidden">
                                        @if ($review->buyer->avatar ?? false)
                                            <img src="{{ Storage::url($review->buyer->avatar) }}"
                                                class="h-full w-full object-cover">
                                        @else
                                            {{ substr($review->buyer->name ?? 'A', 0, 1) }}
                                        @endif
                                    </div>

                                    <div>
                                        <div class="flex items-center gap-2 mb-1">
                                            <h4 class="font-bold text-gray-900 dark:text-white">
                                                {{ $review->buyer->name ?? 'Pengguna' }}</h4>
                                            <span class="text-xs text-gray-500">•
                                                {{ $review->created_at->diffForHumans() }}</span>
                                        </div>

                                        {{-- Star Rating Loop --}}
                                        <div class="flex text-yellow-400 text-xs mb-2">
                                            @for ($i = 1; $i <= 5; $i++)
                                                @if ($i <= $review->rating)
                                                    <span>★</span>
                                                @else
                                                    <span class="text-gray-300">★</span>
                                                @endif
                                            @endfor
                                        </div>

                                        <p class="text-gray-600 dark:text-gray-300 text-sm">
                                            {{ $review->comment }}
                                        </p>

                                        @if ($review->product)
                                            <div
                                                class="mt-2 text-xs bg-gray-100 dark:bg-gray-700 inline-block px-2 py-1 rounded text-gray-500">
                                                Membeli: {{ $review->product->title }}
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            @empty
                                <div class="text-center py-8 text-gray-500">
                                    Belum ada ulasan untuk toko ini.
                                </div>
                            @endforelse
                        </div>
                    </div>
                </div>

            </div>
        </div>
</x-app-layout>
