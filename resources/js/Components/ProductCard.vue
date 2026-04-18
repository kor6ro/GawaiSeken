<script setup>
import { ref, computed } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import { 
    ImageOff, 
    MapPin, 
    Star, 
    ShoppingCart,
    X, 
    Flag, 
    ShieldCheck, 
    Zap,
    Clock,
    Handshake,
    AlertTriangle
} from 'lucide-vue-next';
import Modal from '@/Components/Modal.vue';

const props = defineProps({
    product: Object,
    auth: Object,
});

const activeImage = ref(0);
const showRemoveModal = ref(false);

// Favorite Status
const isFavorited = computed(() => {
    return props.auth.user?.favorites?.includes(props.product.id);
});

const toggleFavorite = () => {
    if (!props.auth.user) {
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
    if (!props.auth.user) {
        router.get(route('login'));
        return;
    }
    // Simple report for now, could be a modal later
    const reason = prompt('Alasan melaporkan produk ini?');
    if (reason) {
        router.post(route('products.report', props.product.id), { reason }, {
            preserveScroll: true,
        });
    }
};

// Helper for "Time Ago"
const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Baru saja';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}j`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}hr`;
    
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

const isNewPosting = computed(() => {
    const hours = (new Date() - new Date(props.product.created_at)) / (1000 * 60 * 60);
    return hours < 24;
});

const isPremiumSeller = computed(() => {
    return props.product.seller?.profile?.is_ktp_verified && (props.product.seller?.transactions_as_seller_count >= 5);
});

const conditionBadgeClass = computed(() => {
    const color = props.product.condition_badge_color;
    if (color === 'green') return 'bg-emerald-600 text-white';
    if (color === 'yellow') return 'bg-amber-500 text-white';
    return 'bg-slate-500 text-white';
});
</script>

<template>
    <div class="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full overflow-hidden">
        <!-- Main Product Link -->
        <Link :href="route('products.show', product.slug)" class="absolute inset-0 z-10"></Link>

        <!-- Top LEFT: Grouped Minimalist Badges -->
        <div class="absolute top-2.5 left-2.5 flex flex-col gap-1 z-20 pointer-events-none">
            <div v-if="isNewPosting" class="flex items-center gap-1 bg-emerald-500/90 backdrop-blur text-white pl-1 pr-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider shadow-sm">
                <Zap class="w-2.5 h-2.5 fill-current" />
                <span>Baru</span>
            </div>
            <div v-if="product.is_cod" class="flex items-center gap-1 bg-blue-500/90 backdrop-blur text-white pl-1 pr-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider shadow-sm">
                <Handshake class="w-2.5 h-2.5" />
                <span>COD</span>
            </div>
            <div v-if="product.is_negotiable" class="flex items-center gap-1 bg-indigo-500/90 backdrop-blur text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider shadow-sm">
                <span>Nego</span>
            </div>
        </div>

        <!-- Top RIGHT: Actions (Favorite & Flag) - Neatened Glassmorphism -->
        <div class="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20">
            <button @click.stop="toggleFavorite" 
                class="p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 shadow-sm transition-all hover:scale-110 active:scale-95 group/heart"
                :class="isFavorited ? 'text-rose-500 hover:text-rose-600' : 'text-slate-400 hover:text-blue-500'">
                <X v-if="isFavorited" class="w-3.5 h-3.5" />
                <ShoppingCart v-else class="w-3.5 h-3.5" />
            </button>
            <button @click.stop="reportProduct" 
                class="p-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 shadow-sm transition-all hover:scale-110 text-slate-400 hover:text-amber-500">
                <Flag class="w-3.5 h-3.5" />
            </button>
        </div>

        <!-- Image Gallery Container -->
        <div class="aspect-square relative overflow-hidden bg-slate-50 dark:bg-slate-800/50">
            <template v-if="product.images && product.images.length > 0">
                <img :src="`/storage/${product.images[activeImage].image_path}`"
                     :alt="product.title"
                     class="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-110">
                
                <!-- Hover Dots -->
                <div v-if="product.images.length > 1" class="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div v-for="(_, index) in product.images" :key="index"
                         @mouseenter="activeImage = index"
                         class="h-1 rounded-full transition-all duration-300"
                         :class="activeImage === index ? 'w-4 bg-white shadow-sm' : 'w-1 bg-white/40'">
                    </div>
                </div>
            </template>
            <div v-else class="flex flex-col items-center justify-center h-full text-slate-300 dark:text-slate-700">
                <ImageOff class="w-10 h-10 mb-1 stroke-[1.5]" />
                <span class="text-[8px] font-black uppercase tracking-widest">No Image</span>
            </div>

            <!-- Condition (Bottom Left) - Solid Contrast (Hidden on small mobile to save space if needed, or smaller) -->
            <div class="absolute bottom-1.5 left-1.5 z-20">
                <span :class="[conditionBadgeClass, 'px-1.5 py-0.5 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-lg border border-white/10 whitespace-nowrap']">
                    {{ product.condition }}
                </span>
            </div>
        </div>

        <!-- Body Content -->
        <div class="p-3.5 flex flex-col flex-grow">
            <!-- Brand & Category (Muted, Small) -->
            <div class="flex items-center gap-1.5 mb-1.5 opacity-60">
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter truncate max-w-[80px]">
                    {{ product.brand }}
                </span>
                <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                <span class="text-[9px] font-medium text-slate-400 uppercase tracking-tighter truncate">
                    {{ product.category?.name }}
                </span>
            </div>

            <!-- Title (Big & Bold) -->
            <h3 class="text-sm font-black text-slate-900 dark:text-white line-clamp-2 leading-snug min-h-[2.5rem] mb-3 group-hover:text-primary transition-colors">
                {{ product.title }}
            </h3>

            <!-- Price & Hero -->
            <div class="mt-auto pt-2.5 border-t border-slate-100 dark:border-white/5">
                <div class="text-[15px] sm:text-xl font-black text-primary dark:text-blue-400 leading-tight">
                    Rp{{ new Intl.NumberFormat('id-ID').format(product.price) }}
                </div>
            </div>

            <!-- Profile & Meta (Responsive Footer) -->
            <div class="mt-3.5 flex flex-col gap-2">
                <div class="flex items-center justify-between gap-2 overflow-hidden">
                    <Link :href="route('store.show', product.user_id)" class="flex items-center gap-1.5 group/seller z-20 min-w-0">
                        <div class="relative shrink-0">
                            <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[9px] sm:text-[10px] font-black text-slate-500 border border-slate-200 dark:border-white/10 group-hover/seller:border-primary/50 transition-colors">
                                {{ product.seller.name.charAt(0).toUpperCase() }}
                            </div>
                            <ShieldCheck v-if="isPremiumSeller" class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 text-amber-500 fill-white dark:fill-slate-900" />
                        </div>
                        <div class="flex flex-col min-w-0">
                            <span class="text-[9px] sm:text-[10px] font-black text-slate-700 dark:text-slate-300 truncate max-w-[70px] sm:max-w-none group-hover/seller:text-primary">
                                {{ product.seller.profile?.store_name ?? product.seller.name }}
                            </span>
                            <div class="flex items-center gap-1 text-[8px] sm:text-[9px] text-slate-400">
                                <Star v-if="product.seller.reviews_as_seller_avg_rating" class="w-2 h-2 text-amber-500 fill-current" />
                                <span v-if="product.seller.reviews_as_seller_avg_rating" class="font-bold">
                                    {{ Number(product.seller.reviews_as_seller_avg_rating).toFixed(1) }}
                                </span>
                                <span v-else class="text-blue-500 font-bold uppercase tracking-tighter text-[7px]">Baru</span>
                            </div>
                        </div>
                    </Link>

                    <!-- Time Ago (Desktop Only or Small Mobile) -->
                    <div class="flex items-center gap-0.5 text-[8px] sm:text-[9px] text-slate-400 shrink-0">
                        <Clock class="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[1.5]" />
                        <span>{{ formatTimeAgo(product.created_at) }}</span>
                    </div>
                </div>

                <!-- Location Line (Separate row on mobile to avoid overlap) -->
                <div class="flex items-center gap-1 text-[8px] sm:text-[9px] text-slate-400">
                    <MapPin class="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[1.5]" />
                    <span class="truncate">{{ product.seller.profile?.city ?? 'Lokasi N/A' }}</span>
                </div>
            </div>
        </div>

        <!-- Remove Modal -->
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
    </div>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
