<nav x-data="{ open: false }"
    class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50 transition-colors duration-200">
    <!-- Primary Navigation Menu -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">
                <!-- Logo -->
                <div class="shrink-0 flex items-center">
                    <a href="/">
                        <x-application-logo class="w-32 h-auto" />
                    </a>
                </div>

                <!-- Navigation Links (Desktop) -->
                <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                    <x-nav-link :href="route('home')" :active="request()->routeIs('home')">
                        {{ __('Home') }}
                    </x-nav-link>

                    @auth
                        @if (Auth::user()->role === 'seller')
                            <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                                {{ __('Seller Dashboard') }}
                            </x-nav-link>
                            <x-nav-link :href="route('products.create')" :active="request()->routeIs('products.create')">
                                {{ __('Jual') }}
                            </x-nav-link>
                        @endif
                        <x-nav-link :href="route('chat.index')" :active="request()->routeIs('chat.*')">
                            {{ __('Pesan') }}
                        </x-nav-link>
                    @endauth
                </div>
            </div>

            <!-- Settings & Theme Toggle (Desktop) -->
            <div class="hidden sm:flex sm:items-center sm:ms-6 gap-3">
                <button @click="$store.theme.toggle()" type="button"
                    class="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-lg text-sm p-2.5 transition">
                    <div class="relative w-5 h-5">
                        <span x-show="$store.theme.isDark" x-cloak><i data-lucide="sun" class="w-5 h-5"></i></span>
                        <span x-show="!$store.theme.isDark" x-cloak><i data-lucide="moon" class="w-5 h-5"></i></span>
                    </div>
                </button>

                @auth
                    <x-dropdown align="right" width="48">
                        <x-slot name="trigger">
                            <button
                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-muted-foreground bg-background hover:text-foreground focus:outline-none transition ease-in-out duration-150">
                                <div class="flex items-center gap-1">
                                    <span>{{ Auth::user()->name }}</span>
                                    <span class="italic text-xs text-gray-400">({{ Auth::user()->role }})</span>
                                </div>
                                <div class="ms-1">
                                    <span><i data-lucide="chevron-down" class="w-4 h-4"></i></span>
                                </div>
                            </button>
                        </x-slot>

                        <x-slot name="content">
                            <x-dropdown-link :href="route('profile.edit')">
                                <span><i data-lucide="user" class="w-4 h-4 inline mr-2"></i></span> {{ __('Profile') }}
                            </x-dropdown-link>

                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <x-dropdown-link :href="route('logout')"
                                    onclick="event.preventDefault(); this.closest('form').submit();">
                                    <span><i data-lucide="log-out" class="w-4 h-4 inline mr-2 text-red-500"></i></span>
                                    {{ __('Log Out') }}
                                </x-dropdown-link>
                            </form>
                        </x-slot>
                    </x-dropdown>
                @else
                    <div class="flex items-center gap-4">
                        <a href="{{ route('login') }}"
                            class="text-sm text-foreground hover:text-primary font-semibold transition">Login</a>
                        <a href="{{ route('register') }}"
                            class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-xl font-bold text-xs text-primary-foreground uppercase tracking-widest hover:bg-primary/90 transition duration-150">
                            Daftar
                        </a>
                    </div>
                @endauth
            </div>

            <!-- Mobile Actions -->
            <div class="-me-2 flex items-center sm:hidden gap-1">
                <button @click="$store.theme.toggle()" type="button"
                    class="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-lg text-sm p-2.5 transition">
                    <div class="relative w-5 h-5">
                        <span x-show="$store.theme.isDark" x-cloak><i data-lucide="sun" class="w-5 h-5"></i></span>
                        <span x-show="!$store.theme.isDark" x-cloak><i data-lucide="moon" class="w-5 h-5"></i></span>
                    </div>
                </button>
                <button @click="open = ! open"
                    class="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none transition duration-150 ease-in-out">
                    <span x-show="!open" x-cloak><i data-lucide="menu" class="w-6 h-6"></i></span>
                    <span x-show="open" x-cloak><i data-lucide="x" class="w-6 h-6"></i></span>
                </button>
            </div>
        </div>
    </div>

    <!-- Responsive Navigation Menu -->
    <div x-show="open" x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0 -translate-y-4" x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 -translate-y-4"
        class="sm:hidden bg-background border-t border-border shadow-xl">
        <div class="pt-2 pb-3 space-y-1">
            <x-responsive-nav-link :href="route('home')" :active="request()->routeIs('home')">
                <div class="flex items-center gap-2">
                    <i data-lucide="home" class="w-4 h-4"></i>
                    {{ __('Home') }}
                </div>
            </x-responsive-nav-link>
            @auth
                @if (Auth::user()->role === 'seller')
                    <x-responsive-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                        <div class="flex items-center gap-2">
                            <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                            {{ __('Seller Dashboard') }}
                        </div>
                    </x-responsive-nav-link>
                    <x-responsive-nav-link :href="route('products.create')" :active="request()->routeIs('products.create')"
                        class="text-primary font-bold">
                        <div class="flex items-center gap-2">
                            <i data-lucide="plus-circle" class="w-4 h-4"></i>
                            {{ __('Jual Produk') }}
                        </div>
                    </x-responsive-nav-link>
                @endif
                <x-responsive-nav-link :href="route('chat.index')" :active="request()->routeIs('chat.*')">
                    <div class="flex items-center gap-2">
                        <span><i data-lucide="message-square" class="w-4 h-4"></i></span>
                        {{ __('Pesan') }}
                    </div>
                </x-responsive-nav-link>
            @endauth
        </div>

        <!-- Responsive Settings Options -->
        <div class="pt-4 pb-1 border-t border-border">
            @auth
                <div class="px-4 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <i data-lucide="user" class="w-6 h-6 text-muted-foreground"></i>
                    </div>
                    <div>
                        <div class="font-medium text-base text-foreground">{{ Auth::user()->name }}</div>
                        <div class="font-medium text-sm text-muted-foreground">{{ Auth::user()->role }} |
                            {{ Auth::user()->email }}
                        </div>
                    </div>
                </div>

                <div class="mt-3 space-y-1">
                    <x-responsive-nav-link :href="route('profile.edit')">
                        <div class="flex items-center gap-2">
                            <i data-lucide="settings" class="w-4 h-4"></i>
                            {{ __('Profile Settings') }}
                        </div>
                    </x-responsive-nav-link>

                    <!-- Authentication -->
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <x-responsive-nav-link :href="route('logout')"
                            onclick="event.preventDefault(); this.closest('form').submit();">
                            <div class="flex items-center gap-2 text-red-500 font-bold">
                                <i data-lucide="log-out" class="w-4 h-4"></i>
                                {{ __('Log Out') }}
                            </div>
                        </x-responsive-nav-link>
                    </form>
                </div>
            @else
                <div class="p-4 space-y-3">
                    <a href="{{ route('login') }}"
                        class="block w-full text-center py-2 text-foreground font-semibold border border-border rounded-xl">
                        Login
                    </a>
                    <a href="{{ route('register') }}"
                        class="block w-full text-center py-2 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg">
                        Daftar Akun Baru
                    </a>
                </div>
            @endauth
        </div>
    </div>
</nav>