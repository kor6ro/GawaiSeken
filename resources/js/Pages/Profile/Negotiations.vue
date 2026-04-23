<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import {
    Gavel, Package, Clock, CheckCircle2, XCircle, RefreshCw, 
    MessageSquare, ShoppingCart, Tag, ChevronDown, ChevronUp,
    Info, Calendar, Store, ArrowRight
} from 'lucide-vue-next'
import Pagination from '@/Components/Pagination.vue'

const props = defineProps({ negotiations: Object })

const expandedItems = ref({})
const toggleExpand = (id) => {
    expandedItems.value[id] = !expandedItems.value[id]
}

const formatRp = (v) => 'Rp ' + new Intl.NumberFormat('id-ID').format(v)
const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '-'

const statusConfig = {
    pending:   { label: 'Menunggu Respon', color: 'amber',  icon: Clock },
    accepted:  { label: 'Penawaran Diterima', color: 'green', icon: CheckCircle2 },
    rejected:  { label: 'Penawaran Ditolak', color: 'red',   icon: XCircle },
    countered: { label: 'Counter-Offer', color: 'indigo', icon: RefreshCw },
    expired:   { label: 'Kadaluarsa', color: 'slate', icon: Clock },
}

const getStatusConfig = (status, expires_at) => {
    if (status === 'pending' || status === 'countered') {
        if (new Date(expires_at) < new Date()) {
            return statusConfig.expired
        }
    }
    return statusConfig[status] || { label: status, color: 'slate', icon: Info }
}

const statusBadgeClass = (status, expires_at) => {
    const config = getStatusConfig(status, expires_at)
    const colorMap = {
        amber:  'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
        green:  'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
        red:    'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
        indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
        slate:  'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
    }
    return colorMap[config.color] ?? colorMap.slate
}

const acceptCounter = (id) => {
    if (confirm('Terima penawaran balik dari penjual?')) {
        router.post(route('negotiations.accept-counter', id))
    }
}
</script>

<template>
    <Head title="Penawaran Saya" />
    <AppLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-foreground">Penawaran Saya</h2>
        </template>

        <div class="py-10">
            <div class="mx-auto max-w-4xl px-4 sm:px-6">

                <!-- Header Section -->
                <div class="mb-8 flex items-center gap-4">
                    <div class="rounded-2xl bg-primary/10 p-3 text-primary shadow-sm">
                        <Gavel class="h-6 w-6" />
                    </div>
                    <div>
                        <h3 class="text-lg font-bold">Daftar Penawaran Harga</h3>
                        <p class="text-sm text-muted-foreground">Pantau status negosiasi produk yang Anda tawar di sini.</p>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="negotiations.data.length === 0" class="flex flex-col items-center py-24 text-center">
                    <div class="relative mb-6">
                        <Gavel class="h-20 w-20 text-muted-foreground/10" />
                        <Tag class="absolute -bottom-2 -right-2 h-8 w-8 text-muted-foreground/20" />
                    </div>
                    <h4 class="text-lg font-bold text-muted-foreground">Belum ada penawaran</h4>
                    <p class="mb-6 mt-1 text-sm text-muted-foreground">Anda bisa menawar produk yang memiliki label "Nego" di halamannya.</p>
                    <Link :href="route('home')" class="rounded-xl bg-primary px-8 py-2.5 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                        Cari Produk
                    </Link>
                </div>

                <!-- Negotiations List -->
                <div v-else class="space-y-5">
                    <div v-for="nego in negotiations.data" :key="nego.id"
                         class="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                        
                        <!-- Header Bar -->
                        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3 transition-colors group-hover:bg-muted/40">
                            <div class="flex items-center gap-3 text-xs text-muted-foreground">
                                <Calendar class="h-3.5 w-3.5" />
                                <span>Diajukan pada {{ formatDate(nego.created_at) }}</span>
                            </div>
                            <span class="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm"
                                  :class="statusBadgeClass(nego.status, nego.expires_at)">
                                <component :is="getStatusConfig(nego.status, nego.expires_at).icon" class="mr-1 inline h-3 w-3" />
                                {{ getStatusConfig(nego.status, nego.expires_at).label }}
                            </span>
                        </div>

                        <div class="p-5">
                            <!-- Product Info Row -->
                            <div class="flex gap-4 sm:gap-6">
                                <!-- Image -->
                                <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-inner sm:h-24 sm:w-24">
                                    <img v-if="nego.product?.images?.length" :src="`/storage/${nego.product.images[0].image_path}`" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div v-else class="flex h-full w-full items-center justify-center">
                                        <Package class="h-8 w-8 text-muted-foreground/30" />
                                    </div>
                                </div>

                                <!-- Details -->
                                <div class="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                    <div>
                                        <Link :href="route('products.show', nego.product.slug)"
                                              class="font-bold text-base sm:text-lg hover:text-primary transition-colors block line-clamp-1">
                                            {{ nego.product.title }}
                                        </Link>
                                        <Link :href="route('store.show', nego.seller.id)"
                                              class="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit font-medium">
                                            <Store class="h-3.5 w-3.5" />
                                            {{ nego.seller.profile?.store_name || nego.seller.name }}
                                        </Link>
                                    </div>

                                    <!-- Price Comparison (Desktop Only) -->
                                    <div class="hidden sm:flex items-end gap-6 mt-3">
                                        <div>
                                            <p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Harga Asli</p>
                                            <p class="text-sm font-bold text-muted-foreground line-through decoration-red-500/50">{{ formatRp(nego.product.price) }}</p>
                                        </div>
                                        <ArrowRight class="h-4 w-4 text-muted-foreground/30 mb-1" />
                                        <div>
                                            <p class="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Penawaran Anda</p>
                                            <p class="text-xl font-black text-primary">{{ formatRp(nego.proposed_price) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Price Comparison (Mobile) -->
                            <div class="mt-5 flex items-center justify-between sm:hidden rounded-xl bg-muted/30 p-3 border border-border/50">
                                <div class="text-center flex-1">
                                    <p class="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Harga Asli</p>
                                    <p class="text-xs font-bold text-muted-foreground line-through">{{ formatRp(nego.product.price) }}</p>
                                </div>
                                <ArrowRight class="h-4 w-4 text-muted-foreground/20" />
                                <div class="text-center flex-1">
                                    <p class="text-[9px] font-bold uppercase tracking-widest text-primary mb-1">Penawaran</p>
                                    <p class="text-sm font-black text-primary">{{ formatRp(nego.proposed_price) }}</p>
                                </div>
                            </div>

                            <!-- Action Buttons & Toggle -->
                            <div class="mt-6 flex flex-col sm:flex-row items-center gap-3">
                                <div class="flex items-center gap-2 w-full sm:w-auto">
                                    <!-- Chat Action -->
                                    <Link :href="route('chat.new', nego.product.slug)"
                                          class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-xs font-bold text-primary hover:bg-primary/10 transition-colors">
                                        <MessageSquare class="h-3.5 w-3.5" />
                                        Chat Penjual
                                    </Link>
                                    
                                    <!-- Accept Counter Action -->
                                    <button v-if="nego.status === 'countered'"
                                            @click="acceptCounter(nego.id)"
                                            class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95">
                                        <CheckCircle2 class="h-3.5 w-3.5" />
                                        Terima Balasan
                                    </button>

                                    <!-- Lanjut Checkout (If Accepted) -->
                                    <Link v-if="nego.status === 'accepted' && nego.product.availability === 'available'"
                                          :href="route('products.show', nego.product.slug)"
                                          class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all active:scale-95">
                                        <ShoppingCart class="h-3.5 w-3.5" />
                                        Checkout Sekarang
                                    </Link>
                                </div>

                                <!-- Expand Toggle -->
                                <button @click="toggleExpand(nego.id)"
                                        class="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors">
                                    <component :is="expandedItems[nego.id] ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />
                                    {{ expandedItems[nego.id] ? 'Sembunyikan' : 'Rincian' }}
                                </button>
                            </div>

                            <!-- Expanded Content -->
                            <Transition enter-from-class="opacity-0 -translate-y-2" leave-to-class="opacity-0 -translate-y-2"
                                        enter-active-class="transition-all duration-200" leave-active-class="transition-all duration-200">
                                <div v-if="expandedItems[nego.id]" class="mt-4 space-y-4 pt-4 border-t border-border">
                                    
                                    <!-- Message from Buyer -->
                                    <div v-if="nego.message" class="rounded-xl border border-border bg-muted/30 p-4">
                                        <p class="mb-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Pesan Anda</p>
                                        <p class="text-sm italic">"{{ nego.message }}"</p>
                                    </div>

                                    <!-- Counter Offer Info -->
                                    <div v-if="nego.status === 'countered'" class="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-800/50 dark:bg-indigo-900/10">
                                        <div class="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
                                            <RefreshCw class="h-4 w-4" />
                                            <p class="text-xs font-black uppercase tracking-widest">Penawaran Balik Seller</p>
                                        </div>
                                        <p class="text-xl font-black text-indigo-600 dark:text-indigo-400">{{ formatRp(nego.counter_price) }}</p>
                                        <p v-if="nego.seller_message" class="mt-2 text-sm italic text-muted-foreground bg-white/50 dark:bg-black/20 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                                            "{{ nego.seller_message }}"
                                        </p>
                                    </div>

                                    <!-- Rejection Info -->
                                    <div v-if="nego.status === 'rejected' && nego.seller_message" class="rounded-xl border border-red-200 bg-red-50/30 p-4 dark:border-red-800/50 dark:bg-red-900/10">
                                        <p class="mb-1 text-[10px] font-bold text-red-600 uppercase tracking-widest">Alasan Penolakan</p>
                                        <p class="text-sm italic">"{{ nego.seller_message }}"</p>
                                    </div>

                                    <!-- Expiration/System Info -->
                                    <div class="flex items-start gap-2 p-3 bg-muted/30 rounded-xl">
                                        <Info class="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                                        <p class="text-[11px] text-muted-foreground leading-relaxed">
                                            Penawaran ini berlaku hingga <span class="font-bold">{{ formatDate(nego.expires_at) }}</span>. 
                                            Jika tidak ada respon hingga batas waktu tersebut, penawaran akan dianggap kadaluarsa secara otomatis.
                                        </p>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div class="mt-8">
                        <Pagination :links="negotiations.links" />
                    </div>
                </div>

            </div>
        </div>
    </AppLayout>
</template>
