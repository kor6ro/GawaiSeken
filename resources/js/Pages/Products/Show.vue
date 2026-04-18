<script setup>
import { ref, computed } from 'vue';
import { Head, Link, usePage, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Home, ChevronRight, ExternalLink, Globe, ArrowRight, MapPin, Store, MessageCircle, Edit3, ShieldCheck, ShoppingCart, X, Flag, AlertTriangle } from 'lucide-vue-next';
import Modal from '@/Components/Modal.vue';

const props = defineProps({
    product: Object,
});

const activeImage = ref(props.product.images.length > 0 
    ? `/storage/${props.product.images[0].image_path}` 
    : '/images/placeholder-product.png');
const showRemoveModal = ref(false);

const auth = usePage().props.auth;

const isFavorited = computed(() => {
    return auth.user?.favorites?.includes(props.product.id);
});

const toggleFavorite = () => {
    if (!auth.user) {
        router.get(route('login'));
        return;
    }
    if (isFavorited.value) {
        showRemoveModal.value = true;
    } else {
        submitToggle();
    }
};

const submitToggle = () => {
    showRemoveModal.value = false;
    router.post(route('products.toggle-favorite', props.product.id), {}, {
        preserveScroll: true,
    });
};

const reportProduct = () => {
    if (!auth.user) {
        router.get(route('login'));
        return;
    }
    const reason = prompt('Alasan melaporkan produk ini?');
    if (reason) {
        router.post(route('products.report', props.product.id), { reason }, {
            preserveScroll: true,
        });
    }
};

const formattedPrice = computed(() => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(props.product.price);
});

const specifications = computed(() => {
    if (!props.product.specifications) return [];
    return Object.entries(props.product.specifications)
        .filter(([key, value]) => value !== null && value !== '')
        .map(([key, value]) => ({
            label: key.replace(/_/g, ' '),
            value: value
        }));
});
</script>

<template>
    <AppLayout>
        <Head :title="product.title" />

        <div class="py-12 bg-background min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Breadcrumbs -->
                <nav class="flex mb-8 text-sm font-medium" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                            <Link :href="route('home')" class="text-muted-foreground hover:text-primary transition-colors flex items-center">
                                <Home class="w-4 h-4 mr-2" />
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <ChevronRight class="w-4 h-4 text-muted-foreground" />
                                <span class="ml-1 text-muted-foreground md:ml-2">{{ product.category?.name }}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <!-- Left: Image Gallery -->
                    <div class="lg:col-span-7 space-y-6">
                        <div class="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-2xl transition-all duration-500 hover:shadow-primary/5">
                            <img :src="activeImage" :alt="product.title" class="w-full h-full object-cover transition-all duration-700">
                            
                            <div class="absolute top-6 left-6 flex flex-col gap-2">
                                <div v-if="product.reference_url" class="flex">
                                    <a :href="product.reference_url" target="_blank"
                                        class="bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider hover:bg-primary transition-all flex items-center gap-2">
                                        {{ product.brand }}
                                        <ExternalLink class="w-3 h-3" />
                                    </a>
                                </div>
                                <span v-else class="bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider">
                                    {{ product.brand }}
                                </span>
                            </div>
                        </div>

                        <div v-if="product.images.length > 1" class="grid grid-cols-4 gap-4">
                            <button v-for="image in product.images" :key="image.id"
                                @click="activeImage = `/storage/${image.image_path}`"
                                class="relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 group"
                                :class="activeImage === `/storage/${image.image_path}` ? 'border-primary shadow-lg' : 'border-transparent hover:border-muted-foreground/30 opacity-70 hover:opacity-100'">
                                <img :src="`/storage/${image.image_path}`" class="w-full h-full object-cover transition-transform group-hover:scale-110">
                            </button>
                        </div>
                    </div>

                    <!-- Right: Product Details -->
                    <div class="lg:col-span-5">
                        <div class="bg-card text-card-foreground rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-border sticky top-8">
                            <div class="mb-8">
                                <div class="flex flex-wrap items-center gap-3 mb-4">
                                    <span class="px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{{ product.category?.name }}</span>
                                    <span :class="[
                                        product.condition_badge_color === 'green' ? 'bg-emerald-500' : 
                                        product.condition_badge_color === 'yellow' ? 'bg-amber-500' : 'bg-slate-400',
                                        'px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest'
                                    ]">{{ product.condition }}</span>
                                    <span v-if="product.is_cod" class="px-3 py-1 bg-blue-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">COD</span>
                                    <span v-if="product.is_negotiable" class="px-3 py-1 bg-indigo-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">Bisa Nego</span>
                                </div>
                                <h1 class="text-3xl md:text-4xl font-black leading-tight mb-4">
                                    {{ product.title }}
                                </h1>
                                <div class="flex items-baseline gap-2">
                                    <span class="text-4xl font-black text-primary">Rp {{ new Intl.NumberFormat('id-ID').format(product.price) }}</span>
                                </div>
                            </div>

                            <div class="space-y-10">
                                <!-- Specs Grid -->
                                <div v-if="specifications.length > 0" class="grid grid-cols-2 gap-4">
                                    <div v-for="spec in specifications" :key="spec.label" class="bg-muted/50 p-4 rounded-2xl border border-border group hover:bg-muted transition-colors">
                                        <span class="block text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mb-1">{{ spec.label }}</span>
                                        <span class="block text-sm font-bold">{{ spec.value }}</span>
                                    </div>
                                </div>

                                <a v-if="product.reference_url" :href="product.reference_url" target="_blank"
                                    class="flex items-center justify-center gap-3 w-full py-4 bg-muted hover:bg-accent border border-border rounded-2xl text-sm font-black transition-all group shadow-sm">
                                    <Globe class="w-5 h-5" />
                                    Lihat Referensi Eksternal
                                    <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </a>

                                <!-- Description -->
                                <div>
                                    <h3 class="text-sm font-black text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <div class="w-1.5 h-4 bg-primary rounded-full"></div>
                                        Deskripsi Produk
                                    </h3>
                                    <div class="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                                        {{ product.description }}
                                    </div>
                                </div>

                                <!-- Seller Card -->
                                <div class="bg-muted/30 border border-border rounded-3xl p-6 overflow-hidden relative group">
                                    <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150"></div>

                                    <div class="flex items-center justify-between mb-6 relative z-10">
                                        <div class="flex items-center gap-4">
                                            <div class="relative">
                                                <div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-xl font-black text-primary-foreground shadow-xl transition-transform group-hover:scale-105">
                                                    {{ product.seller?.name.charAt(0).toUpperCase() }}
                                                </div>
                                                <div v-if="product.seller?.profile?.is_ktp_verified && product.seller?.transactions_as_seller_count >= 5" 
                                                     class="absolute -bottom-1 -right-1 bg-amber-400 text-white p-1 rounded-lg border-2 border-card shadow-lg ring-1 ring-amber-500/20">
                                                    <ShieldCheck class="w-4 h-4" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex items-center gap-2">
                                                    <h4 class="font-black text-lg">{{ product.seller?.profile?.store_name ?? product.seller?.name }}</h4>
                                                    <div v-if="product.seller?.profile?.is_ktp_verified && product.seller?.transactions_as_seller_count >= 5" 
                                                         class="bg-amber-400/10 text-amber-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                                                        Premium Seller
                                                    </div>
                                                </div>
                                                <div class="flex items-center text-xs text-muted-foreground mt-1">
                                                    <MapPin class="w-3 h-3 mr-1" />
                                                    {{ product.seller?.profile?.city || 'Lokasi tidak diisi' }}
                                                </div>
                                            </div>
                                        </div>
                                        <Link :href="route('store.show', product.user_id)" class="p-3 bg-card hover:bg-accent rounded-xl transition-all border border-border shadow-sm group-hover:border-primary/30">
                                            <Store class="w-5 h-5 transition-transform group-hover:scale-110" />
                                        </Link>
                                    </div>

                                    <div v-if="auth.user">
                                        <div class="flex gap-4">
                                            <Link v-if="auth.user.id !== product.user_id" 
                                                :href="route('chat.initiate', product.slug)"
                                                method="post"
                                                as="button"
                                                class="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-4 rounded-2xl font-black text-sm shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2">
                                                <MessageCircle class="w-5 h-5" />
                                                Chat Penjual
                                            </Link>
                                            <Link v-else :href="route('products.edit', product.slug)"
                                                class="flex-1 bg-accent text-accent-foreground hover:bg-accent/80 py-4 rounded-2xl font-black text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                                                <Edit3 class="w-5 h-5" />
                                                Edit Produk
                                            </Link>

                                            <!-- Favorite Toggle Button -->
                                            <button @click="toggleFavorite"
                                                class="p-4 rounded-2xl border-2 transition-all duration-300 transform active:scale-90 flex items-center justify-center shadow-lg"
                                                :class="isFavorited ? 'bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100' : 'bg-background border-border text-muted-foreground hover:text-blue-500 hover:border-blue-200'">
                                                <X v-if="isFavorited" class="w-6 h-6" />
                                                <ShoppingCart v-else class="w-6 h-6" />
                                            </button>
                                        </div>

                                        <!-- Report Button -->
                                        <button v-if="auth.user.id !== product.user_id" 
                                            @click="reportProduct"
                                            class="w-full mt-4 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground hover:text-amber-600 transition-colors py-2">
                                            <Flag class="w-3.5 h-3.5" />
                                            Laporkan masalah pada produk ini
                                        </button>
                                    </div>
                                    <Link v-else :href="route('login')"
                                        class="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2">
                                        Login untuk Chat & Keranjang
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal :show="showRemoveModal" @close="showRemoveModal = false" maxWidth="sm">
            <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl">
                <div class="flex justify-center mb-4">
                    <div class="p-3 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full">
                        <AlertTriangle class="w-8 h-8" />
                    </div>
                </div>
                <h3 class="text-lg font-black text-center text-slate-900 dark:text-white mb-2">Hapus dari Keranjang?</h3>
                <p class="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">
                    Apakah Anda yakin ingin menghapus produk ini dari keranjang Anda?
                </p>
                <div class="flex gap-3">
                    <button @click="showRemoveModal = false" class="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                        Batal
                    </button>
                    <button @click="submitToggle" class="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-500/20">
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </Modal>
    </AppLayout>
</template>
