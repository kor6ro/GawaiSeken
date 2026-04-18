<script setup>
import { ref, onMounted, watch } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import { Sun, Moon, Menu, X, User, LogOut, ChevronDown, Home, LayoutDashboard, PlusCircle, MessageSquare, Settings, ShoppingCart, Search, SlidersHorizontal, Cpu, HardDrive, Package, ArrowUpDown } from 'lucide-vue-next';
import { router } from '@inertiajs/vue3';
import debounce from 'lodash/debounce';
import Modal from '@/Components/Modal.vue';
import pickBy from 'lodash/pickBy';

const { props: pageProps } = usePage();
const auth = pageProps.auth;
const globalFilters = pageProps.global_filters;
const initialFilters = pageProps.active_filters;

const filterModalOpen = ref(false);
const search = ref(initialFilters.search || '');

const filterParams = ref({
    category: initialFilters.category || '',
    ram: initialFilters.ram || '',
    storage: initialFilters.storage || '',
    kelengkapan: initialFilters.kelengkapan || '',
    sort: initialFilters.sort || 'latest',
});

const performSearch = debounce(() => {
    let params = pickBy({
        search: search.value,
        ...filterParams.value
    }, (value, key) => {
        if (key === 'sort' && value === 'latest') return false;
        return value !== '' && value !== null && value !== undefined;
    });

    router.get(route('home'), params, {
        preserveState: true,
        preserveScroll: true,
    });
}, 500);

watch(search, () => {
    performSearch();
});

const applyFilters = () => {
    filterModalOpen.value = false;
    performSearch();
};

const resetFilters = () => {
    search.value = '';
    filterParams.value = {
        category: '',
        ram: '',
        storage: '',
        kelengkapan: '',
        sort: 'latest',
    };
    applyFilters();
};

const hasActiveFilters = () => {
    return filterParams.value.category || filterParams.value.ram || filterParams.value.storage || filterParams.value.kelengkapan || (filterParams.value.sort && filterParams.value.sort !== 'latest') || search.value;
};

const showingNavigationDropdown = ref(false);
const isDark = ref(localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));

const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark.value);
};

onMounted(() => {
    document.documentElement.classList.toggle('dark', isDark.value);
});
</script>

<template>
    <div class="min-h-screen bg-background text-foreground transition-colors duration-200">
        <nav class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50 transition-colors duration-200">
            <!-- Primary Navigation Menu -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <!-- Logo -->
                        <div class="shrink-0 flex items-center mr-6">
                            <Link :href="route('home')">
                                <ApplicationLogo class="w-28 h-auto" />
                            </Link>
                        </div>

                        <!-- Navigation Icons Group -->
                        <div class="hidden sm:flex items-center gap-1 border-l border-border/50 pl-4 h-8">
                            <Link :href="route('home')" 
                                :class="[route().current('home') ? 'text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground']"
                                class="p-2 rounded-xl transition-all duration-200 group relative" 
                                title="Home">
                                <Home class="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </Link>

                            <template v-if="auth.user">
                                <Link v-if="auth.user.role === 'seller'" 
                                    :href="route('dashboard')" 
                                    :class="[route().current('dashboard') ? 'text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground']"
                                    class="p-2 rounded-xl transition-all duration-200 group relative"
                                    title="Dashboard">
                                    <LayoutDashboard class="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </Link>
                                
                                <Link :href="route('chat.index')" 
                                    :class="[route().current('chat.*') ? 'text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground']"
                                    class="p-2 rounded-xl transition-all duration-200 group relative"
                                    title="Pesan">
                                    <MessageSquare class="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </Link>
                            </template>
                        </div>
                    </div>

                    <!-- Right Side Actions (Desktop) -->
                    <div class="hidden sm:flex sm:items-center gap-1">

                        <!-- Global Search & Filter -->
                        <div class="flex items-center gap-2 mr-2">
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-colors">
                                    <Search class="h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
                                </div>
                                <input 
                                    type="text" 
                                    v-model="search" 
                                    placeholder="Cari gadget..."
                                    class="w-40 lg:w-56 pl-9 pr-4 py-1.5 rounded-xl bg-muted/60 border-transparent focus:border-border focus:bg-background focus:ring-2 focus:ring-primary/20 text-sm transition-all duration-200 placeholder:text-muted-foreground/70"
                                >
                            </div>
                            <button 
                                @click="filterModalOpen = true"
                                class="p-2 rounded-xl bg-muted/60 hover:bg-accent text-muted-foreground hover:text-primary transition-all relative group"
                                title="Filter Pencarian"
                            >
                                <SlidersHorizontal class="w-4 h-4" />
                                <span v-if="hasActiveFilters()" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse"></span>
                            </button>
                        </div>

                        <!-- Secondary Actions (Love, Theme) -->
                        <div class="flex items-center gap-1 mr-2 px-2 border-r border-border/50">
                            <!-- Keranjang Saya -->
                            <Link v-if="auth.user" :href="route('products.favorites')"
                                :class="[route().current('products.favorites') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-accent hover:text-primary']"
                                class="p-2 rounded-xl transition relative group"
                                title="Keranjang Saya">
                                <ShoppingCart class="w-5 h-5 transition-transform group-hover:scale-110" />
                                <span v-if="auth.user.favorites?.length > 0" class="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background"></span>
                            </Link>

                            <!-- Mode (Theme Toggle) -->
                            <button @click="toggleTheme" type="button"
                                class="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none rounded-xl p-2 transition">
                                <Sun v-if="isDark" class="w-5 h-5" />
                                <Moon v-else class="w-5 h-5" />
                            </button>
                        </div>

                        <!-- User Dropdown -->
                        <div v-if="auth.user" class="relative">
                            <Dropdown align="right" width="48">
                                <template #trigger>
                                    <button
                                        type="button"
                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-muted-foreground bg-muted/60 backdrop-blur-md hover:text-foreground hover:bg-muted/80 focus:outline-none transition ease-in-out duration-150 shadow-sm"
                                    >
                                        <div class="flex items-center gap-2">
                                            <div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                                                {{ auth.user.name.charAt(0) }}
                                            </div>
                                            <div class="hidden lg:block text-left mr-1">
                                                <div class="text-[11px] font-bold truncate max-w-[100px] leading-tight">{{ auth.user.name }}</div>
                                                <div class="text-[9px] text-muted-foreground leading-tight">{{ auth.user.role }}</div>
                                            </div>
                                        </div>
                                        <ChevronDown class="h-3 w-3 text-muted-foreground" />
                                    </button>
                                </template>

                                <template #content>
                                    <div class="px-4 py-2 border-b border-border mb-1 block lg:hidden">
                                        <div class="text-sm font-bold truncate">{{ auth.user.name }}</div>
                                        <div class="text-xs text-muted-foreground">{{ auth.user.role }}</div>
                                    </div>
                                    <DropdownLink :href="route('profile.edit')">
                                        <User class="w-4 h-4 inline mr-2" /> Profile
                                    </DropdownLink>
                                    <DropdownLink :href="route('logout')" method="post" as="button">
                                        <LogOut class="w-4 h-4 inline mr-2 text-red-500" /> Log Out
                                    </DropdownLink>
                                </template>
                            </Dropdown>
                        </div>

                        <div v-else class="flex items-center gap-2 pl-2">
                            <Link :href="route('login')" class="text-xs text-foreground hover:text-primary font-bold transition px-3">
                                Login
                            </Link>
                            <Link :href="route('register')" class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-xl font-black text-[10px] text-primary-foreground uppercase tracking-widest hover:bg-primary/90 transition duration-150 shadow-sm">
                                Daftar
                            </Link>
                        </div>
                    </div>

                    <!-- Mobile Toggle -->
                    <div class="-me-2 flex items-center sm:hidden gap-1">
                        <button @click="toggleTheme" type="button"
                            class="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-lg text-sm p-2.5 transition">
                            <Sun v-if="isDark" class="w-5 h-5" />
                            <Moon v-else class="w-5 h-5" />
                        </button>
                        <button
                            @click="showingNavigationDropdown = !showingNavigationDropdown"
                            class="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none transition duration-150 ease-in-out"
                        >
                            <Menu v-if="!showingNavigationDropdown" class="w-6 h-6" />
                            <X v-else class="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Responsive Navigation Menu -->
            <div
                :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                class="sm:hidden bg-background border-t border-border shadow-xl"
            >
                <div class="p-4 border-b border-border flex gap-2">
                    <div class="relative flex-1">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <Search class="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input 
                            type="text" 
                            v-model="search" 
                            placeholder="Cari gadget..."
                            class="w-full pl-10 pr-4 py-2 rounded-xl bg-muted border-none focus:ring-2 focus:ring-primary text-sm transition-all"
                        >
                    </div>
                    <button @click="filterModalOpen = true" class="p-2 bg-muted rounded-xl text-muted-foreground">
                        <SlidersHorizontal class="w-5 h-5" />
                    </button>
                </div>

                <div class="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink :href="route('home')" :active="route().current('home')">
                        <div class="flex items-center gap-2">
                            <Home class="w-4 h-4" /> Home
                        </div>
                    </ResponsiveNavLink>
                    <template v-if="auth.user">
                        <ResponsiveNavLink v-if="auth.user.role === 'seller'" :href="route('dashboard')" :active="route().current('dashboard')">
                            <div class="flex items-center gap-2">
                                <LayoutDashboard class="w-4 h-4" /> Seller Dashboard
                            </div>
                        </ResponsiveNavLink>
                        <ResponsiveNavLink :href="route('chat.index')" :active="route().current('chat.*')">
                            <div class="flex items-center gap-2">
                                <MessageSquare class="w-4 h-4" /> Pesan
                            </div>
                        </ResponsiveNavLink>
                    </template>
                </div>

                <!-- Responsive Settings -->
                <div class="pt-4 pb-1 border-t border-border">
                    <template v-if="auth.user">
                        <div class="px-4 flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                <User class="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                                <div class="font-medium text-base text-foreground">{{ auth.user.name }}</div>
                                <div class="font-medium text-sm text-muted-foreground">{{ auth.user.role }} | {{ auth.user.email }}</div>
                            </div>
                        </div>
                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')">
                                <div class="flex items-center gap-2">
                                    <Settings class="w-4 h-4" /> Profile Settings
                                </div>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('logout')" method="post" as="button" class="text-red-500 font-bold">
                                <div class="flex items-center gap-2">
                                    <LogOut class="w-4 h-4" /> Log Out
                                </div>
                            </ResponsiveNavLink>
                        </div>
                    </template>
                    <template v-else>
                        <div class="p-4 space-y-3">
                            <Link :href="route('login')" class="block w-full text-center py-2 text-foreground font-semibold border border-border rounded-xl">
                                Login
                            </Link>
                            <Link :href="route('register')" class="block w-full text-center py-2 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg">
                                Daftar Akun Baru
                            </Link>
                        </div>
                    </template>
                </div>
            </div>
        </nav>

        <!-- Global Filter Modal -->
        <Modal :show="filterModalOpen" @close="filterModalOpen = false">
            <div class="p-6 bg-background text-foreground transition-colors">
                 <div class="flex justify-between items-center mb-6 pb-4 border-b border-border">
                    <div>
                        <h2 class="text-xl font-bold">Filter Pencarian</h2>
                        <p class="text-xs text-muted-foreground mt-1">Sesuaikan hasil sesuai kebutuhan Anda</p>
                    </div>
                    <button @click="filterModalOpen = false" class="p-2 bg-muted rounded-full text-muted-foreground hover:bg-accent transition">
                        <X class="h-5 w-5" />
                    </button>
                </div>

                <div class="mb-6">
                    <h4 class="text-sm font-bold mb-3 uppercase tracking-wider">Kategori</h4>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <label v-for="cat in globalFilters.categories" :key="cat.id" class="cursor-pointer relative group">
                            <input type="radio" v-model="filterParams.category" :value="cat.slug" class="peer sr-only">
                            <div class="px-3 py-2.5 rounded-xl border border-border text-center text-xs font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary">
                                {{ cat.name }}
                            </div>
                        </label>
                        <label class="cursor-pointer relative group">
                            <input type="radio" v-model="filterParams.category" value="" class="peer sr-only">
                            <div class="px-3 py-2.5 rounded-xl border border-border text-center text-xs font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary">
                                Semua
                            </div>
                        </label>
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="text-[10px] font-bold mb-3 uppercase tracking-wider flex items-center gap-2 text-primary">
                        <Cpu class="w-4 h-4" /> RAM
                    </h4>
                    <div class="flex flex-wrap gap-2">
                        <label v-for="ram in globalFilters.rams" :key="ram" class="cursor-pointer group relative">
                            <input type="radio" v-model="filterParams.ram" :value="ram" class="peer sr-only">
                            <span class="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-border bg-background peer-checked:bg-primary peer-checked:text-primary-foreground transition-all">
                                {{ ram }}
                            </span>
                        </label>
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="text-[10px] font-bold mb-3 uppercase tracking-wider flex items-center gap-2 text-primary">
                        <HardDrive class="w-4 h-4" /> Penyimpanan
                    </h4>
                    <div class="flex flex-wrap gap-2">
                        <label v-for="storage in globalFilters.storages" :key="storage" class="cursor-pointer group relative">
                            <input type="radio" v-model="filterParams.storage" :value="storage" class="peer sr-only">
                            <span class="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-border bg-background peer-checked:bg-primary peer-checked:text-primary-foreground transition-all">
                                {{ storage }}
                            </span>
                        </label>
                    </div>
                </div>

                <div class="mb-8">
                    <h4 class="text-[10px] font-bold mb-3 uppercase tracking-wider flex items-center gap-2 text-primary">
                        <ArrowUpDown class="w-4 h-4" /> Urutkan
                    </h4>
                    <div class="grid grid-cols-2 gap-3">
                        <label class="cursor-pointer group relative">
                            <input type="radio" v-model="filterParams.sort" value="latest" class="peer sr-only">
                            <div class="px-3 py-2.5 rounded-xl border border-border text-center text-[10px] font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground">
                                Terbaru
                            </div>
                        </label>
                        <label class="cursor-pointer group relative">
                            <input type="radio" v-model="filterParams.sort" value="oldest" class="peer sr-only">
                            <div class="px-3 py-2.5 rounded-xl border border-border text-center text-[10px] font-bold transition-all peer-checked:bg-primary peer-checked:text-primary-foreground">
                                Terlama
                            </div>
                        </label>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-3 pt-6 border-t border-border">
                    <button @click="resetFilters" class="text-xs text-red-500 hover:text-red-600 font-bold px-4 transition-colors">
                        Reset
                    </button>
                    <button @click="applyFilters" class="px-8 py-2 text-sm font-black text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                        Terapkan
                    </button>
                </div>
            </div>
        </Modal>

        <!-- Page Heading -->
        <header v-if="$slots.header" class="bg-card border-b border-border shadow-sm">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <slot name="header" />
            </div>
        </header>

        <!-- Page Content -->
        <main>
            <slot />
        </main>
    </div>
</template>
