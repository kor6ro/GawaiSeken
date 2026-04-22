<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import { ref } from 'vue'
import { 
    ShoppingBag, 
    ChevronRight, 
    Package, 
    AlertCircle, 
    CheckCircle2, 
    Clock, 
    MessageSquare,
    ExternalLink,
    CreditCard
} from 'lucide-vue-next'
import { onMounted } from 'vue'
import Pagination from '@/Components/Pagination.vue'
import DisputeForm from './DisputeForm.vue'
import axios from 'axios'

const props = defineProps({
    orders: Object
})

onMounted(() => {
    // Load Midtrans Snap Script
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
    const clientKey = usePage().props.midtrans_client_key

    if (!document.querySelector(`script[src="${midtransScriptUrl}"]`)) {
        const script = document.createElement('script')
        script.src = midtransScriptUrl
        script.setAttribute('data-client-key', clientKey)
        document.head.appendChild(script)
    }
})

const showDisputeModal = ref(false)
const selectedTransaction = ref(null)

const payNow = async (order) => {
    // Jika token sudah ada, langsung buka Snap
    if (order.snap_token) {
        openSnap(order.snap_token)
    } else {
        // Jika belum ada, refresh/generate baru
        refreshPayment(order)
    }
}

const openSnap = (token) => {
    window.snap.pay(token, {
        onSuccess: function(result) {
            window.location.reload()
        },
        onPending: function(result) {
            window.location.reload()
        },
        onError: function(result) {
            console.error(result)
        },
        onClose: function() {
            console.log('customer closed the popup without finishing the payment')
        }
    })
}

const refreshPayment = async (order) => {
    try {
        const response = await axios.post(route('transactions.repay', order.id))
        if (response.data.snap_token) {
            openSnap(response.data.snap_token)
        }
    } catch (error) {
        console.error('Gagal memperbarui token pembayaran:', error)
        alert('Gagal memperbarui sesi pembayaran. Silakan coba lagi.')
    }
}

const openDisputeModal = (transaction) => {
    selectedTransaction.value = transaction
    showDisputeModal.value = true
}

const getStatusClass = (status) => {
    switch (status) {
        case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
        case 'paid': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
        case 'shipped': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800'
        case 'completed': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
        case 'disputed': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
        case 'canceled': return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
        default: return 'bg-slate-100 text-slate-700'
    }
}

const getStatusLabel = (status) => {
    switch (status) {
        case 'pending': return 'Menunggu Pembayaran'
        case 'paid': return 'Dibayar'
        case 'shipped': return 'Dikirim'
        case 'completed': return 'Selesai'
        case 'disputed': return 'Komplain / Dispute'
        case 'canceled': return 'Dibatalkan'
        default: return status
    }
}
</script>

<template>
    <Head title="Pesanan Saya" />

    <AppLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-foreground">Pesanan Saya</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="bg-card border border-border shadow-sm rounded-3xl overflow-hidden">
                    <div class="p-6 sm:p-8">
                        <div class="flex items-center gap-3 mb-8">
                            <div class="p-3 rounded-2xl bg-primary/10 text-primary">
                                <ShoppingBag class="h-6 w-6" />
                            </div>
                            <div>
                                <h3 class="text-lg font-bold">Riwayat Pembelian</h3>
                                <p class="text-sm text-muted-foreground">Daftar semua transaksi yang pernah Anda lakukan.</p>
                            </div>
                        </div>

                        <div v-if="orders.data.length === 0" class="py-20 text-center">
                            <div class="flex flex-col items-center">
                                <Package class="h-16 w-16 text-muted-foreground/30 mb-4" />
                                <h4 class="text-lg font-bold text-muted-foreground">Belum ada pesanan</h4>
                                <p class="text-sm text-muted-foreground mb-6">Ayo mulai belanja gadget impianmu sekarang!</p>
                                <Link :href="route('home')" class="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    Cari Produk
                                </Link>
                            </div>
                        </div>

                        <div v-else class="space-y-6">
                            <div v-for="order in orders.data" :key="order.id" class="group border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors bg-muted/30">
                                <div class="p-4 sm:p-6">
                                    <!-- Header: Ref Number & Status -->
                                    <div class="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-border">
                                        <div class="flex items-center gap-3">
                                            <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest">#{{ order.reference_number }}</span>
                                            <span class="text-xs text-muted-foreground">•</span>
                                            <span class="text-xs text-muted-foreground">{{ new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
                                        </div>
                                        <span 
                                            class="px-3 py-1 text-[10px] font-black uppercase tracking-wider border rounded-full"
                                            :class="getStatusClass(order.status)"
                                        >
                                            {{ getStatusLabel(order.status) }}
                                        </span>
                                    </div>

                                    <!-- Body: Product Info -->
                                    <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                        <div class="h-20 w-20 flex-shrink-0 rounded-xl border border-border bg-card overflow-hidden">
                                            <img 
                                                v-if="order.product.images && order.product.images.length > 0"
                                                :src="`/storage/${order.product.images[0].image_path}`"
                                                class="h-full w-full object-cover"
                                            />
                                            <div v-else class="h-full w-full flex items-center justify-center bg-muted">
                                                <Package class="h-8 w-8 text-muted-foreground/30" />
                                            </div>
                                        </div>

                                        <div class="flex-1 min-w-0">
                                            <h4 class="font-bold text-lg truncate group-hover:text-primary transition-colors">{{ order.product.title }}</h4>
                                            <div class="flex items-center gap-2 mt-1 mb-2">
                                                <div class="h-5 w-5 rounded-full bg-muted overflow-hidden border border-border">
                                                    <img v-if="order.seller.profile?.avatar" :src="`/storage/${order.seller.profile.avatar}`" class="h-full w-full object-cover" />
                                                    <div v-else class="h-full w-full flex items-center justify-center bg-primary/10 text-[8px] font-bold text-primary">
                                                        {{ order.seller.name.substring(0, 1) }}
                                                    </div>
                                                </div>
                                                <span class="text-xs font-medium text-muted-foreground">{{ order.seller.profile?.store_name || order.seller.name }}</span>
                                            </div>
                                            <p class="font-black text-primary">Rp {{ new Intl.NumberFormat('id-ID').format(order.price) }}</p>
                                        </div>

                                        <div class="flex flex-col sm:items-end justify-between gap-4">
                                            <div class="flex flex-wrap gap-2">
                                                <Link 
                                                    :href="route('products.show', order.product.slug)"
                                                    class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-border hover:bg-muted transition-colors"
                                                >
                                                    <ExternalLink class="h-3 w-3" />
                                                    Detail Produk
                                                </Link>
                                                
                                                <!-- Action Buttons -->
                                                <div v-if="order.status === 'pending'" class="flex flex-col gap-2">
                                                    <button 
                                                        @click="payNow(order)"
                                                        class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                                    >
                                                        <CreditCard class="h-3 w-3" />
                                                        Bayar Sekarang
                                                    </button>
                                                    <button 
                                                        @click="refreshPayment(order)"
                                                        class="text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <Clock class="h-3 w-3" />
                                                        Refresh Sesi Pembayaran
                                                    </button>
                                                </div>

                                                <button 
                                                    v-if="['shipped', 'paid'].includes(order.status)"
                                                    @click="openDisputeModal(order)"
                                                    class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors"
                                                >
                                                    <AlertCircle class="h-3 w-3" />
                                                    Ajukan Komplain
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8">
                                <Pagination :links="orders.links" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dispute Modal -->
        <DisputeForm 
            :show="showDisputeModal" 
            :transaction="selectedTransaction"
            @close="showDisputeModal = false"
        />
    </AppLayout>
</template>
