<script setup>
import { ref, computed } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import ProductCard from '@/Components/ProductCard.vue';
import { MessageCircle, MapPin, Store, Package, Star, ShieldCheck } from 'lucide-vue-next';

const props = defineProps({
    seller: Object,
    products: Object,
    stats: Object,
    reviews: Array,
});

import Pagination from '@/Components/Pagination.vue';

const activeTab = ref('products');
const auth = usePage().props.auth;

const formattedJoined = computed(() => props.stats.joined);
</script>

<template>
    <AppLayout>
        <Head :title="seller.profile?.store_name || seller.name" />

        <!-- Header Background -->
        <div class="h-48 bg-gradient-to-r from-primary to-primary/80 dark:from-gray-800 dark:to-gray-900 transition-all duration-500"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative pb-12">
            <!-- PROFILE CARD SECTION -->
            <div class="bg-card text-card-foreground rounded-[2.5rem] shadow-2xl overflow-hidden border border-border transition-all hover:shadow-primary/5">
                <div class="md:flex">
                    <!-- Kiri: Foto & Info Utama -->
                    <div class="p-8 md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-border bg-muted/30">
                        <div class="inline-block relative">
                            <div class="h-32 w-32 rounded-full bg-background p-1 shadow-lg mx-auto md:mx-0 overflow-hidden ring-4 ring-primary/10">
                                <img v-if="seller.profile?.avatar" :src="'/storage/' + seller.profile.avatar" :alt="seller.name" class="h-full w-full rounded-full object-cover">
                                <div v-else class="h-full w-full rounded-full bg-primary flex items-center justify-center text-4xl font-black text-primary-foreground">
                                    {{ seller.name.charAt(0).toUpperCase() }}
                                </div>
                            </div>
                            <span class="absolute bottom-2 right-2 block h-5 w-5 rounded-full ring-4 ring-background bg-green-500 shadow-sm" title="Online"></span>
                        </div>

                        <div class="flex items-center gap-2 mt-4">
                            <h1 class="text-2xl font-black">{{ seller.profile?.store_name || seller.name }}</h1>
                            <div v-if="stats.is_premium" class="bg-amber-400 text-white p-1 rounded-full shadow-lg shadow-amber-500/30 ring-2 ring-white dark:ring-slate-900" title="Premium Seller">
                                <ShieldCheck class="w-4 h-4" />
                            </div>
                        </div>
                        <p class="text-xs text-muted-foreground mt-1 flex items-center justify-center md:justify-start gap-1 font-bold">
                            <MapPin class="w-3 h-3" />
                            {{ seller.profile?.city || 'Lokasi tidak diisi' }}
                        </p>

                        <div class="mt-6 flex flex-col gap-3">
                            <template v-if="auth.user && auth.user.id !== seller.id">
                                <button @click="alert('Fitur Chat segera hadir')" 
                                    class="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-black shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                    <MessageCircle class="w-5 h-5" />
                                    Chat Penjual
                                </button>
                            </template>
                            <Link v-else-if="auth.user && auth.user.id === seller.id" :href="route('profile.edit')"
                                class="w-full py-3 px-4 bg-background border border-border text-foreground hover:bg-accent rounded-2xl font-black transition-all text-center">
                                Edit Profil
                            </Link>
                            <Link v-else :href="route('login')"
                                class="w-full py-3 px-4 bg-primary text-primary-foreground rounded-2xl font-black shadow-xl transition-all text-center">
                                Login untuk Chat
                            </Link>
                        </div>
                    </div>

                    <!-- Kanan: Statistik & Bio -->
                    <div class="p-8 md:w-2/3 flex flex-col justify-between">
                        <div class="grid grid-cols-3 gap-6 text-center mb-10">
                            <div class="p-6 bg-muted/50 rounded-3xl border border-border hover:bg-muted transition-colors">
                                <span class="block text-3xl font-black text-foreground">{{ products.length }}</span>
                                <span class="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Produk Aktif</span>
                            </div>
                            <div class="p-6 bg-muted/50 rounded-3xl border border-border hover:bg-muted transition-colors">
                                <span class="block text-3xl font-black text-foreground">{{ stats.sold }}</span>
                                <span class="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Terjual</span>
                            </div>
                            <div class="p-6 bg-muted/50 rounded-3xl border border-border hover:bg-muted transition-colors">
                                <div class="flex items-center justify-center gap-1">
                                    <span class="text-3xl font-black text-foreground">{{ stats.rating.toFixed(1) }}</span>
                                    <Star class="w-6 h-6 text-yellow-500 fill-current" />
                                </div>
                                <span class="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Rating Toko</span>
                            </div>
                        </div>

                        <div class="prose dark:prose-invert max-w-none">
                            <h3 class="text-foreground font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                                <div class="w-1.5 h-4 bg-primary rounded-full"></div>
                                Tentang Toko
                            </h3>
                            <p class="text-muted-foreground text-sm leading-relaxed">
                                {{ seller.profile?.bio || `Halo! Saya member GawaiSeken sejak ${formattedJoined}. Saya menjual barang elektronik bekas berkualitas. Silakan chat untuk bertanya detail kondisi barang.` }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="flex border-t border-border bg-card/50 backdrop-blur">
                    <button @click="activeTab = 'products'"
                        class="flex-1 py-5 text-sm font-black border-b-2 transition-all duration-300"
                        :class="activeTab === 'products' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground'">
                        Etalase ({{ products.total }})
                    </button>
                    <button @click="activeTab = 'reviews'"
                        class="flex-1 py-5 text-sm font-black border-b-2 transition-all duration-300"
                        :class="activeTab === 'reviews' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground'">
                        Ulasan ({{ reviews.length }})
                    </button>
                </div>
            </div>

            <!-- Tab Content -->
            <div class="mt-12 transition-all duration-500">
                <!-- Products Tab -->
                <div v-if="activeTab === 'products'" class="space-y-8 animate-fade-in">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                        <ProductCard v-for="product in products.data" :key="product.id" :product="product" :auth="auth" />
                    </div>
                    
                    <div v-if="products.data.length === 0" class="col-span-full text-center py-20 bg-card rounded-[2.5rem] border border-border border-dashed shadow-sm">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                            <Package class="w-10 h-10 text-muted-foreground opacity-50" />
                        </div>
                        <h3 class="text-xl font-black text-foreground">Belum ada barang</h3>
                        <p class="text-muted-foreground text-sm">Penjual ini belum memajang produk apapun.</p>
                    </div>

                    <div v-if="products.data.length > 0" class="mt-8">
                        <Pagination :links="products.links" />
                    </div>
                </div>

                <!-- Reviews Tab -->
                <div v-if="activeTab === 'reviews'" class="max-w-3xl mx-auto space-y-6 animate-fade-in">
                    <div v-for="review in reviews" :key="review.id" class="bg-card p-6 rounded-3xl border border-border shadow-sm group hover:shadow-md transition-all">
                        <div class="flex gap-4">
                            <div class="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0 overflow-hidden shadow-lg shadow-primary/10">
                                <img v-if="review.buyer?.profile?.avatar" :src="'/storage/' + review.buyer.profile.avatar" class="h-full w-full object-cover">
                                <span v-else>{{ review.buyer?.name.charAt(0).toUpperCase() }}</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center justify-between mb-2">
                                    <h4 class="font-black text-foreground">{{ review.buyer?.name }}</h4>
                                    <span class="text-[10px] text-muted-foreground font-bold">Ulasan Pelanggan</span>
                                </div>
                                <div class="flex text-yellow-500 mb-3">
                                    <Star v-for="i in 5" :key="i" class="w-3 h-3" :class="{ 'fill-current': i <= review.rating, 'text-muted': i > review.rating }" />
                                </div>
                                <p class="text-muted-foreground text-sm leading-relaxed mb-4">{{ review.comment }}</p>
                                <div v-if="review.product" class="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground border border-border">
                                    <Package class="w-3 h-3" />
                                    {{ review.product.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="reviews.length === 0" class="text-center py-20 bg-card rounded-[2.5rem] border border-border border-dashed">
                        <p class="text-muted-foreground font-bold italic">Belum ada ulasan untuk toko ini.</p>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
