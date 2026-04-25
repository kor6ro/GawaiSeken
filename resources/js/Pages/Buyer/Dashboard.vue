<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Head, Link, usePage, router } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import axios from 'axios'
import BackButton from '@/Components/BackButton.vue'
import {
    ChevronLeft, ShoppingCart, Gavel, ShoppingBag, Heart, Package, Clock, 
    CheckCircle2, XCircle, RefreshCw, MessageSquare, Tag, 
    ChevronDown, ChevronUp, Info, Calendar, Store, ArrowRight,
    Search, SlidersHorizontal, CreditCard, Truck, MapPin, AlertCircle,
    Trash2, Users, Circle
} from 'lucide-vue-next'
import Pagination from '@/Components/Pagination.vue'
import DisputeForm from '@/Pages/Profile/DisputeForm.vue'

const props = defineProps({
    favorites: Array,
    negotiations: Array,
    orders: Array,
    mustVerifyEmail: Boolean,
    status: String,
})

// ─── Tab Logic ────────────────────────────────────────────────────────────────
const tab = ref(new URLSearchParams(window.location.search).get('tab') || 'favorites')

watch(tab, (newTab) => {
    const url = new URL(window.location)
    url.searchParams.set('tab', newTab)
    window.history.pushState({}, '', url)
})

// ─── Common Helpers ───────────────────────────────────────────────────────────
const formatRp = (v) => 'Rp ' + new Intl.NumberFormat('id-ID').format(v)
const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '-'

// ─── Favorites Logic ──────────────────────────────────────────────────────────
const removeFavorite = (product) => {
    if (confirm('Hapus produk ini dari keranjang?')) {
        router.post(route('products.toggle-favorite', product.id), {}, {
            preserveScroll: true
        })
    }
}

// ─── Negotiations Logic ───────────────────────────────────────────────────────
const expandedNego = ref({})
const toggleNego = (id) => expandedNego.value[id] = !expandedNego.value[id]

const showAcceptModal = ref(false)
const selectedNego = ref(null)

const confirmAcceptCounter = (nego) => {
    selectedNego.value = nego
    showAcceptModal.value = true
}

const acceptCounter = () => {
    if (!selectedNego.value) return
    router.post(route('negotiations.accept-counter', selectedNego.value.id), {}, {
        onFinish: () => {
            showAcceptModal.value = false
            selectedNego.value = null
        }
    })
}

const negoStatusConfig = {
    pending:   { label: 'Menunggu Respon', color: 'amber',  icon: Clock },
    accepted:  { label: 'Diterima', color: 'green', icon: CheckCircle2 },
    rejected:  { label: 'Ditolak', color: 'red',   icon: XCircle },
    countered: { label: 'Counter-Offer', color: 'indigo', icon: RefreshCw },
    expired:   { label: 'Kadaluarsa', color: 'slate', icon: Clock },
}

const getNegoStatus = (n) => {
    if ((n.status === 'pending' || n.status === 'countered') && new Date(n.expires_at) < new Date()) return negoStatusConfig.expired
    return negoStatusConfig[n.status] || { label: n.status, color: 'slate', icon: Info }
}

const acceptCounterOld = (id) => {
    if (confirm('Terima penawaran balik dari penjual?')) router.post(route('negotiations.accept-counter', id))
}

// ─── Orders Logic ─────────────────────────────────────────────────────────────
const expandedOrders = ref({})
const toggleOrder = (id) => expandedOrders.value[id] = !expandedOrders.value[id]

const showDisputeModal = ref(false)
const selectedTransaction = ref(null)

onMounted(() => {
})

const confirmDelivery = (order) => {
    if (confirm('Konfirmasi barang sudah diterima?')) router.post(route('transactions.deliver', order.id))
}

const completeCod = (order) => {
    if (confirm('Konfirmasi pertemuan COD selesai?')) router.post(route('transactions.cod-complete', order.id))
}

const orderStatusConfig = {
    completed:     { label: 'Selesai ✓', color: 'green', icon: CheckCircle2 },
    canceled:      { label: 'Batal', color: 'slate', icon: XCircle },
    disputed:      { label: 'Sengketa', color: 'red', icon: AlertCircle },
    cod_requested: { label: 'COD - Tunggu', color: 'amber', icon: Users },
    cod_confirmed: { label: 'COD - Jadwal', color: 'teal', icon: MapPin },
}

const getOrderStatus = (s) => orderStatusConfig[s] || { label: s, color: 'slate', icon: Info }

const badgeClass = (color) => {
    const map = {
        amber:  'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400',
        green:  'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400',
        red:    'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400',
        indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400',
        blue:   'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
        purple: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400',
        teal:   'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400',
        slate:  'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400',
    }
    return map[color] || map.slate
}

const openDisputeModal = (order) => {
    selectedTransaction.value = order
    showDisputeModal.value = true
}
</script>

<template>
    <AppLayout>
        <Head title="Aktivitas Saya" />

        <template #header>
            <div class="flex items-center gap-3">
              <BackButton fallbackRoute="home" />
              <h2 class="text-xl font-semibold leading-tight text-foreground">Aktivitas Saya</h2>
            </div>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                
                <!-- TAB NAVIGATION -->
                <div class="mx-auto flex max-w-md space-x-1 rounded-2xl bg-muted p-1.5 shadow-sm border border-border/50">
                    <button
                        @click="tab = 'favorites'"
                        :class="tab === 'favorites' ? 'bg-background text-primary shadow-sm ring-1 ring-black/5' : 'text-muted-foreground hover:text-foreground'"
                        class="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300"
                    >
                        <ShoppingCart class="h-4 w-4" /> Keranjang
                    </button>
                    <button
                        @click="tab = 'negotiations'"
                        :class="tab === 'negotiations' ? 'bg-background text-primary shadow-sm ring-1 ring-black/5' : 'text-muted-foreground hover:text-foreground'"
                        class="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300"
                    >
                        <Gavel class="h-4 w-4" /> Penawaran
                    </button>
                    <button
                        @click="tab = 'orders'"
                        :class="tab === 'orders' ? 'bg-background text-primary shadow-sm ring-1 ring-black/5' : 'text-muted-foreground hover:text-foreground'"
                        class="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300"
                    >
                        <ShoppingBag class="h-4 w-4" /> Pesanan
                    </button>
                </div>

                <!-- CONTENT AREA -->
                <div class="transition-all duration-500">
                    
                    <!-- TAB: FAVORITES -->
                    <div v-if="tab === 'favorites'" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div class="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden relative">
                            <div class="absolute -right-20 -top-20 h-64 w-64 bg-primary/5 rounded-full blur-3xl"></div>
                            
                            <div class="relative z-10">
                                <div class="mb-8">
                                    <h3 class="text-2xl font-black tracking-tight">Keranjang Saya</h3>
                                    <p class="text-muted-foreground text-sm mt-1">Daftar produk gadget impian yang Anda simpan.</p>
                                </div>

                                <div v-if="favorites.length === 0" class="flex flex-col items-center py-20 text-center">
                                    <div class="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                                        <Heart class="h-10 w-10 text-muted-foreground/30" />
                                    </div>
                                    <h4 class="text-lg font-bold text-muted-foreground">Keranjang masih kosong</h4>
                                    <p class="text-sm text-muted-foreground/60 mt-1 mb-8">Yuk cari gadget impianmu dan tambahkan ke sini!</p>
                                    <Link :href="route('home')" class="rounded-2xl bg-primary px-8 py-3 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                                        Eksplor Produk
                                    </Link>
                                </div>

                                <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <div v-for="product in favorites" :key="product.id" 
                                         class="group relative overflow-hidden rounded-3xl border border-border bg-background transition-all hover:shadow-xl hover:border-primary/20">
                                        
                                        <div class="aspect-square overflow-hidden bg-muted">
                                            <img v-if="product.images?.length" :src="`/storage/${product.images[0].image_path}`" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div v-else class="flex h-full w-full items-center justify-center">
                                                <Package class="h-12 w-12 text-muted-foreground/20" />
                                            </div>
                                            
                                            <!-- Remove Action -->
                                            <button @click="removeFavorite(product)" class="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center text-red-500 shadow-lg hover:scale-110 transition-transform active:scale-90 z-20">
                                                <Trash2 class="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div class="p-6">
                                            <div class="mb-4">
                                                <div class="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{{ product.category?.name }}</div>
                                                <Link :href="route('products.show', product.slug)" class="text-lg font-bold leading-tight line-clamp-2 hover:text-primary transition-colors">{{ product.title }}</Link>
                                            </div>

                                            <div class="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                                                <div class="text-xl font-black text-primary">{{ formatRp(product.price) }}</div>
                                                <Link :href="route('products.show', product.slug)" class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                                                    <ArrowRight class="h-5 w-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- TAB: NEGOTIATIONS -->
                    <div v-if="tab === 'negotiations'" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div class="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden relative">
                            <div class="mb-8">
                                <h3 class="text-2xl font-black tracking-tight">Penawaran Saya</h3>
                                <p class="text-muted-foreground text-sm mt-1">Pantau status tawar-menawar harga Anda.</p>
                            </div>

                            <div v-if="negotiations.length === 0" class="flex flex-col items-center py-20 text-center">
                                <Gavel class="h-16 w-16 text-muted-foreground/20 mb-4" />
                                <h4 class="text-lg font-bold text-muted-foreground">Belum ada penawaran aktif</h4>
                                <p class="text-sm text-muted-foreground/60 mt-1 mb-8">Nego harga bisa bikin belanja makin hemat!</p>
                            </div>

                            <div v-else class="space-y-4">
                                <div v-for="nego in negotiations" :key="nego.id" 
                                     class="overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-primary/30 group">
                                    
                                    <div class="flex flex-wrap items-center justify-between gap-3 bg-muted/30 px-5 py-3">
                                        <div class="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                                            <Calendar class="h-4 w-4" /> {{ formatDate(nego.created_at) }}
                                        </div>
                                        <span class="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm"
                                              :class="badgeClass(getNegoStatus(nego).color)">
                                            {{ getNegoStatus(nego).label }}
                                        </span>
                                    </div>

                                    <div class="p-5">
                                        <div class="flex gap-4">
                                            <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                                                <img v-if="nego.product?.images?.length" :src="`/storage/${nego.product.images[0].image_path}`" class="h-full w-full object-cover" />
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <Link :href="route('products.show', nego.product.slug)" class="font-bold text-base truncate block hover:text-primary transition-colors">{{ nego.product.title }}</Link>
                                                <div class="flex items-center gap-6 mt-3">
                                                    <div>
                                                        <div class="text-[9px] font-black text-muted-foreground uppercase">Asli</div>
                                                        <div class="text-xs font-bold text-muted-foreground line-through">{{ formatRp(nego.product.price) }}</div>
                                                    </div>
                                                    <ArrowRight class="h-3 w-3 text-muted-foreground/30" />
                                                    <div>
                                                        <div class="text-[9px] font-black text-primary uppercase">Tawaran</div>
                                                        <div class="text-lg font-black text-primary">{{ formatRp(nego.proposed_price) }}</div>
                                                    </div>
                                                    <template v-if="nego.counter_price">
                                                        <ArrowRight class="h-3 w-3 text-indigo-300 dark:text-indigo-700" />
                                                        <div>
                                                            <div class="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase">Counter</div>
                                                            <div class="text-lg font-black text-indigo-600 dark:text-indigo-400">{{ formatRp(nego.counter_price) }}</div>
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-5 flex items-center gap-3">
                                            <Link :href="route('chat.new', nego.product.slug)" class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-muted px-5 py-2.5 text-xs font-bold hover:bg-accent transition-colors">
                                                <MessageSquare class="h-4 w-4" /> Chat Seller
                                            </Link>
                                            <button v-if="nego.status === 'countered'" @click="confirmAcceptCounter(nego)" class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors">
                                                <CheckCircle2 class="h-4 w-4" /> Terima Counter-Offer
                                            </button>
                                            <button @click="toggleNego(nego.id)" class="ml-auto p-2 text-muted-foreground hover:text-foreground">
                                                <component :is="expandedNego[nego.id] ? ChevronUp : ChevronDown" class="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div v-if="expandedNego[nego.id]" class="mt-4 pt-4 border-t border-border space-y-4 animate-in slide-in-from-top-2 duration-300">
                                            <div v-if="nego.message" class="rounded-xl bg-muted/50 p-4">
                                                <p class="text-[10px] font-black uppercase text-muted-foreground mb-1">Catatan Anda</p>
                                                <p class="text-sm italic">"{{ nego.message }}"</p>
                                            </div>
                                            <div v-if="nego.status === 'countered'" class="rounded-xl bg-indigo-50 dark:bg-indigo-900/10 p-4 border border-indigo-100 dark:border-indigo-900/30">
                                                <p class="text-[10px] font-black uppercase text-indigo-600 mb-1">Tawaran Balik Seller</p>
                                                <p class="text-xl font-black text-indigo-600">{{ formatRp(nego.counter_price) }}</p>
                                                <p v-if="nego.seller_message" class="mt-2 text-sm italic">"{{ nego.seller_message }}"</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- TAB: ORDERS -->
                    <div v-if="tab === 'orders'" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div class="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden relative">
                            <div class="mb-8">
                                <h3 class="text-2xl font-black tracking-tight">Pesanan Saya</h3>
                                <p class="text-muted-foreground text-sm mt-1">Kelola riwayat belanja dan lacak pengiriman.</p>
                            </div>

                            <div v-if="orders.length === 0" class="flex flex-col items-center py-20 text-center">
                                <ShoppingBag class="h-16 w-16 text-muted-foreground/20 mb-4" />
                                <h4 class="text-lg font-bold text-muted-foreground">Belum ada pesanan</h4>
                                <p class="text-sm text-muted-foreground/60 mt-1 mb-8">Gadget impian menantimu untuk diangkut!</p>
                            </div>

                            <div v-else class="space-y-5">
                                <div v-for="order in orders" :key="order.id" 
                                     class="overflow-hidden rounded-2xl border border-border bg-background hover:shadow-md transition-all">
                                    
                                    <div class="flex flex-wrap items-center justify-between gap-3 bg-muted/20 px-5 py-3 border-b border-border">
                                        <div class="flex items-center gap-3">
                                            <span class="font-mono text-[10px] font-bold text-muted-foreground tracking-tighter">#{{ order.reference_number }}</span>
                                            <span class="text-[10px] text-muted-foreground">{{ formatDate(order.created_at) }}</span>
                                            <span class="inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-900/20 px-2 py-0.5 text-[8px] font-black uppercase text-orange-600">COD</span>
                                        </div>
                                        <span class="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider"
                                              :class="badgeClass(getOrderStatus(order.status).color)">
                                            {{ getOrderStatus(order.status).label }}
                                        </span>
                                    </div>

                                    <div class="p-5">
                                        <div class="flex gap-4">
                                            <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                                                <img v-if="order.product?.images?.length" :src="`/storage/${order.product.images[0].image_path}`" class="h-full w-full object-cover" />
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <div class="flex items-start justify-between gap-4">
                                                    <div>
                                                        <Link :href="route('products.show', order.product.slug)" class="font-bold text-base truncate block hover:text-primary">{{ order.product.title }}</Link>
                                                        <div class="text-xs text-muted-foreground mt-1">Seller: {{ order.seller.profile?.store_name || order.seller.name }}</div>
                                                    </div>
                                                    <div class="text-right">
                                                        <div class="text-[10px] font-black text-muted-foreground uppercase mb-0.5">Total Bayar</div>
                                                        <div class="text-lg font-black text-primary">{{ formatRp(order.price) }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-6 flex items-center gap-3">
                                            <button v-if="order.status === 'cod_confirmed'" @click="completeCod(order)" class="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-700 transition-colors">
                                                Konfirmasi COD Selesai
                                            </button>
                                            <button v-if="['cod_confirmed'].includes(order.status)" @click="openDisputeModal(order)" class="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">
                                                <AlertCircle class="h-4 w-4" /> Komplain
                                            </button>

                                            <button @click="toggleOrder(order.id)" class="ml-auto flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground">
                                                {{ expandedOrders[order.id] ? 'Sembunyikan' : 'Detail' }}
                                                <component :is="expandedOrders[order.id] ? ChevronUp : ChevronDown" class="h-4 w-4" />
                                            </button>
                                        </div>

                                        <!-- EXPANDED ORDER -->
                                        <div v-if="expandedOrders[order.id]" class="mt-5 pt-5 border-t border-border space-y-4 animate-in slide-in-from-top-2 duration-300">
                                            <div class="grid gap-4 sm:grid-cols-2">
                                                <div class="rounded-xl bg-muted/30 p-4 space-y-2">
                                                    <p class="text-[10px] font-black uppercase text-muted-foreground mb-2">Rincian Pembayaran</p>
                                                    <div class="flex justify-between text-sm">
                                                        <span>Harga Produk</span>
                                                        <span class="font-bold">{{ formatRp(order.price) }}</span>
                                                    </div>
                                                    <div class="flex justify-between text-base font-black border-t border-border pt-2 text-primary">
                                                        <span>Total</span>
                                                        <span>{{ formatRp(order.price) }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Dispute Modal -->
        <DisputeForm :show="showDisputeModal" :transaction="selectedTransaction" @close="showDisputeModal = false" />

        <!-- Accept Counter Modal -->
        <div v-if="showAcceptModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div @click="showAcceptModal = false" class="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"></div>
            
            <div class="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-card p-8 shadow-2xl border border-border animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                <div class="absolute -right-10 -top-10 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                
                <div class="relative space-y-6">
                    <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600">
                        <Gavel class="h-8 w-8" />
                    </div>

                    <div>
                        <h3 class="text-2xl font-black tracking-tight text-foreground">Terima Penawaran?</h3>
                        <p class="mt-2 text-sm text-muted-foreground">
                            Anda akan menyetujui harga tawaran balik dari penjual untuk produk ini.
                        </p>
                    </div>

                    <div class="rounded-3xl bg-muted/50 p-6 space-y-4 border border-border/50">
                        <div class="flex items-center gap-4">
                            <div class="h-12 w-12 overflow-hidden rounded-xl border border-border bg-background">
                                <img v-if="selectedNego?.product?.images?.length" :src="`/storage/${selectedNego.product.images[0].image_path}`" class="h-full w-full object-cover" />
                            </div>
                            <div class="flex-1 font-bold text-sm truncate">{{ selectedNego?.product?.title }}</div>
                        </div>

                        <div class="pt-4 border-t border-border/50">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-xs font-bold text-muted-foreground uppercase">Tawaran Anda</span>
                                <span class="text-sm font-bold text-muted-foreground line-through">{{ formatRp(selectedNego?.proposed_price) }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-xs font-bold text-indigo-600 uppercase">Harga Final</span>
                                <span class="text-2xl font-black text-indigo-600">{{ formatRp(selectedNego?.counter_price) }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <button 
                            @click="acceptCounter"
                            class="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"
                        >
                            Ya, Saya Setuju
                        </button>
                        <button 
                            @click="showAcceptModal = false"
                            class="w-full py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Mungkin Nanti
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </AppLayout>
</template>
