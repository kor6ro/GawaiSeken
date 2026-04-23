<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import { Head, Link, usePage, router } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import {
    ShoppingBag, Package, AlertCircle, CheckCircle2, Clock, CreditCard,
    Truck, MapPin, Calendar, ExternalLink, ChevronDown, ChevronUp,
    MessageSquare, Tag, Users, RefreshCw, XCircle, Info
} from 'lucide-vue-next'
import { onMounted } from 'vue'
import Pagination from '@/Components/Pagination.vue'
import DisputeForm from './DisputeForm.vue'
import axios from 'axios'

const props = defineProps({ orders: Object })

onMounted(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
    const clientKey = usePage().props.midtrans_client_key
    if (!document.querySelector(`script[src="${midtransScriptUrl}"]`)) {
        const script = document.createElement('script')
        script.src = midtransScriptUrl
        script.setAttribute('data-client-key', clientKey)
        document.head.appendChild(script)
    }
})

// ─── State ────────────────────────────────────────────────────────────────────
const showDisputeModal = ref(false)
const selectedTransaction = ref(null)
const expandedOrders = ref({})
const shipForm = ref({}) // per order ID

const toggleExpand = (id) => {
    expandedOrders.value[id] = !expandedOrders.value[id]
}

// ─── Midtrans Payment ─────────────────────────────────────────────────────────
const payNow = async (order) => {
    if (order.snap_token) {
        openSnap(order.snap_token)
    } else {
        refreshPayment(order)
    }
}

const openSnap = (token) => {
    window.snap.pay(token, {
        onSuccess: () => window.location.reload(),
        onPending: () => window.location.reload(),
        onError:   (r) => console.error(r),
    })
}

const refreshPayment = async (order) => {
    try {
        const res = await axios.post(route('transactions.repay', order.id))
        if (res.data.snap_token) openSnap(res.data.snap_token)
    } catch {
        alert('Gagal memperbarui sesi pembayaran. Silakan coba lagi.')
    }
}

const simulatePayment = (order) => {
    if (confirm('Simulasi pembayaran sukses? (ONLY LOCAL)'))
        router.post(route('transactions.simulate-payment', order.id))
}

// ─── Buyer Actions ────────────────────────────────────────────────────────────
const confirmDelivery = (order) => {
    if (confirm('Konfirmasi bahwa barang sudah Anda terima dengan baik?'))
        router.post(route('transactions.deliver', order.id))
}

const completeCod = (order) => {
    if (confirm('Konfirmasi bahwa pertemuan COD telah selesai?'))
        router.post(route('transactions.cod-complete', order.id))
}

const acceptCounter = (negotiationId) => {
    if (confirm('Terima harga counter dari seller?'))
        router.post(route('negotiations.accept-counter', negotiationId))
}

const openDisputeModal = (transaction) => {
    selectedTransaction.value = transaction
    showDisputeModal.value = true
}

// ─── Status Helpers ───────────────────────────────────────────────────────────
const statusConfig = {
    pending:       { label: 'Menunggu Pembayaran', color: 'amber',  icon: Clock },
    paid:          { label: 'Dibayar — Dalam Escrow', color: 'blue', icon: CheckCircle2 },
    processing:    { label: 'Diproses Seller', color: 'indigo', icon: RefreshCw },
    shipped:       { label: 'Dikirim', color: 'purple', icon: Truck },
    delivered:     { label: 'Terima Dikonfirmasi', color: 'teal', icon: CheckCircle2 },
    completed:     { label: 'Selesai ✓', color: 'green', icon: CheckCircle2 },
    canceled:      { label: 'Dibatalkan', color: 'slate', icon: XCircle },
    disputed:      { label: 'Sengketa', color: 'red', icon: AlertCircle },
    cod_requested: { label: 'COD — Menunggu Seller', color: 'amber', icon: Users },
    cod_confirmed: { label: 'COD — Jadwal Terkonfirmasi', color: 'teal', icon: MapPin },
}

const getStatusConfig = (status) => statusConfig[status] || { label: status, color: 'slate', icon: Info }

const statusBadgeClass = (status) => {
    const colorMap = {
        amber:  'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
        blue:   'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
        indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
        purple: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
        teal:   'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800',
        green:  'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
        red:    'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
        slate:  'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
    }
    return colorMap[getStatusConfig(status).color] ?? colorMap.slate
}

const formatRp = (v) => 'Rp ' + new Intl.NumberFormat('id-ID').format(v)
const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '-'
</script>

<template>
    <Head title="Pesanan Saya" />
    <AppLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-foreground">Pesanan Saya</h2>
        </template>

        <div class="py-10">
            <div class="mx-auto max-w-4xl px-4 sm:px-6">

                <!-- Header -->
                <div class="mb-8 flex items-center gap-4">
                    <div class="rounded-2xl bg-primary/10 p-3 text-primary">
                        <ShoppingBag class="h-6 w-6" />
                    </div>
                    <div>
                        <h3 class="text-lg font-bold">Riwayat Pembelian</h3>
                        <p class="text-sm text-muted-foreground">Semua transaksi Anda tercatat dengan aman di sini.</p>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="orders.data.length === 0" class="flex flex-col items-center py-24 text-center">
                    <Package class="mb-4 h-16 w-16 text-muted-foreground/25" />
                    <h4 class="text-lg font-bold text-muted-foreground">Belum ada pesanan</h4>
                    <p class="mb-6 mt-1 text-sm text-muted-foreground">Yuk mulai cari gadget impianmu!</p>
                    <Link :href="route('home')" class="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                        Cari Produk
                    </Link>
                </div>

                <!-- Orders List -->
                <div v-else class="space-y-5">
                    <div v-for="order in orders.data" :key="order.id"
                         class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">

                        <!-- Order Header -->
                        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3">
                            <div class="flex flex-wrap items-center gap-3">
                                <span class="font-mono text-[11px] font-bold text-muted-foreground tracking-widest">#{{ order.reference_number }}</span>
                                <span class="text-xs text-muted-foreground">{{ formatDate(order.created_at) }}</span>
                                <!-- Method badge -->
                                <span v-if="order.payment_method === 'cod'"
                                      class="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                                    <Users class="h-2.5 w-2.5" /> COD
                                </span>
                                <span v-else class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                    <CreditCard class="h-2.5 w-2.5" /> Rekber
                                </span>
                                <!-- Nego badge -->
                                <span v-if="order.negotiation_id"
                                      class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                                    <Tag class="h-2.5 w-2.5" /> Harga Nego
                                </span>
                            </div>
                            <span class="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider"
                                  :class="statusBadgeClass(order.status)">
                                {{ getStatusConfig(order.status).label }}
                            </span>
                        </div>

                        <div class="p-5">
                            <!-- Product Row -->
                            <div class="flex gap-4">
                                <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                                    <img v-if="order.product?.images?.length" :src="`/storage/${order.product.images[0].image_path}`" class="h-full w-full object-cover" />
                                    <div v-else class="flex h-full w-full items-center justify-center">
                                        <Package class="h-8 w-8 text-muted-foreground/30" />
                                    </div>
                                </div>

                                <div class="flex-1 min-w-0">
                                    <Link v-if="order.product?.slug" :href="route('products.show', order.product.slug)"
                                          class="font-bold text-base truncate hover:text-primary transition-colors block">
                                        {{ order.product.title }}
                                    </Link>
                                    <p v-else class="font-bold text-base text-muted-foreground italic truncate">{{ order.product?.title }} (Dihapus)</p>

                                    <!-- Seller -->
                                    <Link v-if="order.seller?.id" :href="route('store.show', order.seller.id)"
                                          class="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit">
                                        <div class="h-4 w-4 overflow-hidden rounded-full border border-border bg-muted">
                                            <img v-if="order.seller.profile?.store_logo" :src="`/storage/${order.seller.profile.store_logo}`" class="h-full w-full object-cover" />
                                            <div v-else class="flex h-full w-full items-center justify-center text-[8px] font-bold">{{ order.seller.name.charAt(0) }}</div>
                                        </div>
                                        {{ order.seller.profile?.store_name || order.seller.name }}
                                    </Link>
                                </div>

                                <!-- Price Summary -->
                                <div class="hidden sm:flex flex-col items-end justify-center shrink-0">
                                    <div class="text-xs text-muted-foreground">Total Dibayar</div>
                                    <div class="text-xl font-black text-primary">{{ formatRp(order.total_amount) }}</div>
                                    <div v-if="order.service_fee > 0" class="text-[10px] text-muted-foreground/70">(incl. biaya layanan {{ formatRp(order.service_fee) }})</div>
                                </div>
                            </div>

                            <!-- Price (mobile) -->
                            <div class="mt-3 flex items-center justify-between sm:hidden border-t border-border pt-3">
                                <span class="text-sm font-bold text-muted-foreground">Total Dibayar</span>
                                <span class="text-lg font-black text-primary">{{ formatRp(order.total_amount) }}</span>
                            </div>

                            <!-- Toggle Detail -->
                            <button @click="toggleExpand(order.id)"
                                    class="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-muted transition-colors">
                                <component :is="expandedOrders[order.id] ? ChevronUp : ChevronDown" class="h-4 w-4" />
                                {{ expandedOrders[order.id] ? 'Sembunyikan Detail' : 'Lihat Detail & Aksi' }}
                            </button>

                            <!-- Expanded Detail -->
                            <Transition enter-from-class="opacity-0 -translate-y-2" leave-to-class="opacity-0 -translate-y-2"
                                        enter-active-class="transition-all duration-200" leave-active-class="transition-all duration-200">
                                <div v-if="expandedOrders[order.id]" class="mt-4 space-y-4">

                                    <!-- Rincian Harga -->
                                    <div class="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
                                        <div class="flex justify-between">
                                            <span class="text-muted-foreground">Harga Produk{{ order.negotiation_id ? ' (Nego)' : '' }}</span>
                                            <span class="font-bold">{{ formatRp(order.price) }}</span>
                                        </div>
                                        <div v-if="order.service_fee > 0" class="flex justify-between">
                                            <span class="text-muted-foreground">Biaya Layanan</span>
                                            <span class="font-bold text-amber-600">{{ formatRp(order.service_fee) }}</span>
                                        </div>
                                        <div class="flex justify-between border-t border-border pt-2">
                                            <span class="font-bold">Total</span>
                                            <span class="text-lg font-black text-primary">{{ formatRp(order.total_amount) }}</span>
                                        </div>
                                    </div>

                                    <!-- Info COD -->
                                    <div v-if="order.payment_method === 'cod' && (order.cod_location || order.cod_scheduled_at)"
                                         class="rounded-xl border border-orange-200 bg-orange-50/50 p-4 dark:border-orange-800 dark:bg-orange-900/10">
                                        <p class="mb-2 text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">Detail Meetup COD</p>
                                        <div v-if="order.cod_location" class="flex items-start gap-2 text-sm">
                                            <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                                            <span>{{ order.cod_location }}</span>
                                        </div>
                                        <div v-if="order.cod_scheduled_at" class="mt-1.5 flex items-center gap-2 text-sm">
                                            <Calendar class="h-4 w-4 shrink-0 text-orange-500" />
                                            <span>{{ formatDate(order.cod_scheduled_at) }}</span>
                                        </div>
                                    </div>

                                    <!-- Info Pengiriman (Rekber) -->
                                    <div v-if="order.tracking_number"
                                         class="rounded-xl border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-800 dark:bg-purple-900/10">
                                        <p class="mb-2 text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">Info Pengiriman</p>
                                        <div class="flex items-center gap-2 text-sm">
                                            <Truck class="h-4 w-4 text-purple-500" />
                                            <span class="font-bold">{{ order.courier_name }}</span>
                                        </div>
                                        <div class="mt-1 flex items-center gap-2">
                                            <span class="text-xs text-muted-foreground">No. Resi:</span>
                                            <span class="font-mono text-sm font-bold tracking-wider">{{ order.tracking_number }}</span>
                                        </div>
                                    </div>

                                    <!-- Catatan Seller -->
                                    <div v-if="order.seller_notes" class="rounded-xl border border-border bg-muted/30 p-4 text-sm">
                                        <p class="mb-1 text-xs font-bold text-muted-foreground uppercase tracking-widest">Catatan Seller</p>
                                        <p>{{ order.seller_notes }}</p>
                                    </div>

                                    <!-- Counter-offer dari seller -->
                                    <div v-if="order.negotiation?.status === 'countered'"
                                         class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-800 dark:bg-indigo-900/10">
                                        <p class="mb-2 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Seller Memberi Counter-Offer</p>
                                        <p class="text-sm text-muted-foreground">Seller menawarkan harga:</p>
                                        <p class="text-xl font-black text-indigo-600">{{ formatRp(order.negotiation.counter_price) }}</p>
                                        <p v-if="order.negotiation.seller_message" class="mt-1 text-xs italic text-muted-foreground">"{{ order.negotiation.seller_message }}"</p>
                                        <button @click="acceptCounter(order.negotiation.id)"
                                                class="mt-3 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-bold text-white hover:bg-indigo-700 transition-colors">
                                            Terima Counter-Offer &amp; Lanjut Checkout
                                        </button>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="flex flex-wrap gap-2">
                                        <!-- Rekber: Bayar -->
                                        <template v-if="order.payment_method === 'rekber'">
                                            <button v-if="order.status === 'pending'" @click="payNow(order)"
                                                    class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                                                <CreditCard class="h-4 w-4" /> Bayar Sekarang
                                            </button>
                                            <button v-if="order.status === 'pending' && $page.props.app_env === 'local'"
                                                    @click="simulatePayment(order)"
                                                    class="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-colors">
                                                ⚡ Simulasi Bayar
                                            </button>
                                            <!-- Konfirmasi Terima Barang -->
                                            <button v-if="order.status === 'shipped'" @click="confirmDelivery(order)"
                                                    class="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors">
                                                <CheckCircle2 class="h-4 w-4" /> Konfirmasi Terima Barang
                                            </button>
                                        </template>

                                        <!-- COD: Konfirmasi Selesai -->
                                        <button v-if="order.status === 'cod_confirmed'" @click="completeCod(order)"
                                                class="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-colors">
                                            <Users class="h-4 w-4" /> Konfirmasi COD Selesai
                                        </button>

                                        <!-- Ajukan Dispute -->
                                        <button v-if="['shipped', 'paid', 'cod_confirmed'].includes(order.status)" @click="openDisputeModal(order)"
                                                class="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors dark:bg-red-900/10 dark:border-red-800">
                                            <AlertCircle class="h-4 w-4" /> Ajukan Komplain
                                        </button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div class="mt-8">
                        <Pagination :links="orders.links" />
                    </div>
                </div>

            </div>
        </div>

        <!-- Dispute Modal -->
        <DisputeForm :show="showDisputeModal" :transaction="selectedTransaction" @close="showDisputeModal = false" />
    </AppLayout>
</template>
