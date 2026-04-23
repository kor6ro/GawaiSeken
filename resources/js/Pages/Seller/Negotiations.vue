<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import {
    Tag, CheckCircle2, XCircle, RotateCcw, MessageSquare,
    Package, Clock, ChevronDown, ChevronUp, Truck, MapPin, Calendar,
    Users, CreditCard, AlertCircle, RefreshCw,
    LayoutDashboard, ShoppingBag, Settings
} from 'lucide-vue-next'
import Pagination from '@/Components/Pagination.vue'

const props = defineProps({ negotiations: Object })

const expandedItems = ref({})
const toggleExpand = (id) => { expandedItems.value[id] = !expandedItems.value[id] }

// ─── Forms ────────────────────────────────────────────────────────────────────
const counterForms = ref({})

const getCounterForm = (id) => {
    if (!counterForms.value[id]) {
        counterForms.value[id] = { counter_price: '', seller_message: '' }
    }
    return counterForms.value[id]
}

// ─── Actions ─────────────────────────────────────────────────────────────────
const acceptNegotiation = (id) => {
    if (confirm('Terima penawaran harga dari buyer?'))
        router.post(route('negotiations.accept', id))
}

const rejectNegotiation = (id, message) => {
    if (confirm('Tolak penawaran ini?'))
        router.post(route('negotiations.reject', id), { seller_message: message })
}

const counterNegotiation = (id, form) => {
    if (!form.counter_price) return alert('Masukkan harga counter terlebih dahulu.')
    router.post(route('negotiations.counter', id), form)
}

const formatRp = (v) => 'Rp ' + new Intl.NumberFormat('id-ID').format(v)
const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }) : '-'
const expiresIn = (d) => {
    const diff = new Date(d) - new Date()
    if (diff <= 0) return 'Kadaluarsa'
    const hours = Math.floor(diff / 1000 / 3600)
    const mins  = Math.floor((diff / 1000 % 3600) / 60)
    return `${hours}j ${mins}m lagi`
}

const statusConfig = {
    pending:   { label: 'Menunggu Respons', color: 'amber' },
    accepted:  { label: 'Diterima ✓', color: 'green' },
    rejected:  { label: 'Ditolak', color: 'red' },
    countered: { label: 'Counter-Offer Dikirim', color: 'indigo' },
    expired:   { label: 'Kadaluarsa', color: 'slate' },
}

const badgeClass = (status) => {
    const colorMap = {
        amber:  'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400',
        green:  'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400',
        red:    'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400',
        indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400',
        slate:  'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400',
    }
    return colorMap[statusConfig[status]?.color] ?? colorMap.slate
}
</script>

<template>
    <Head title="Penawaran Masuk" />
    <AppLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-foreground">Penawaran Masuk (NEGO)</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                <!-- TAB NAVIGATION BUTTONS -->
                <div class="mx-auto flex max-w-2xl space-x-1 rounded-xl bg-muted p-1 sm:mx-0">
                  <Link
                    :href="route('dashboard', { tab: 'overview' })"
                    class="text-muted-foreground hover:text-foreground flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    <LayoutDashboard class="h-4 w-4" /> Ringkasan
                  </Link>
                  <Link
                    :href="route('dashboard', { tab: 'transactions' })"
                    class="text-muted-foreground hover:text-foreground flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    <ShoppingBag class="h-4 w-4" /> Pesanan
                  </Link>
                  <button
                    class="bg-background text-foreground shadow-sm flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    <Tag class="h-4 w-4" /> Penawaran
                  </button>
                  <Link
                    :href="route('dashboard', { tab: 'settings' })"
                    class="text-muted-foreground hover:text-foreground flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    <Settings class="h-4 w-4" /> Pengaturan
                  </Link>
                </div>

                <div class="mb-8 flex items-center gap-4">
                    <div class="rounded-2xl bg-primary/10 p-3 text-primary">
                        <Tag class="h-6 w-6" />
                    </div>
                    <div>
                        <h3 class="text-lg font-bold">Penawaran Harga dari Buyer</h3>
                        <p class="text-sm text-muted-foreground">Terima, counter, atau tolak penawaran yang masuk.</p>
                    </div>
                </div>

                <!-- Empty -->
                <div v-if="negotiations.data.length === 0" class="flex flex-col items-center py-24 text-center">
                    <Tag class="mb-4 h-16 w-16 text-muted-foreground/25" />
                    <h4 class="text-lg font-bold text-muted-foreground">Belum ada penawaran masuk</h4>
                    <p class="mt-1 text-sm text-muted-foreground">Aktifkan opsi NEGO di produk Anda agar buyer bisa menawar.</p>
                </div>

                <!-- List -->
                <div v-else class="space-y-5">
                    <div v-for="nego in negotiations.data" :key="nego.id"
                         class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                        <!-- Header -->
                        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3">
                            <div class="flex items-center gap-3">
                                <div class="h-8 w-8 overflow-hidden rounded-full border border-border bg-muted">
                                    <img v-if="nego.buyer?.profile?.avatar" :src="`/storage/${nego.buyer.profile.avatar}`" class="h-full w-full object-cover" />
                                    <div v-else class="flex h-full w-full items-center justify-center text-xs font-bold text-primary">{{ nego.buyer?.name?.charAt(0) }}</div>
                                </div>
                                <div>
                                    <p class="text-sm font-bold">{{ nego.buyer?.name }}</p>
                                    <p class="text-[10px] text-muted-foreground">{{ formatDate(nego.created_at) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider" :class="badgeClass(nego.status)">
                                    {{ statusConfig[nego.status]?.label ?? nego.status }}
                                </span>
                                <span v-if="['pending','countered'].includes(nego.status)" class="flex items-center gap-1 text-[10px] text-muted-foreground">
                                    <Clock class="h-3 w-3" /> {{ expiresIn(nego.expires_at) }}
                                </span>
                            </div>
                        </div>

                        <!-- Body -->
                        <div class="p-5">
                            <!-- Product -->
                            <div class="flex items-center gap-3 mb-4">
                                <div class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                                    <img v-if="nego.product?.images?.length" :src="`/storage/${nego.product.images[0].image_path}`" class="h-full w-full object-cover" />
                                    <div v-else class="flex h-full w-full items-center justify-center"><Package class="h-6 w-6 text-muted-foreground/30" /></div>
                                </div>
                                <div>
                                    <p class="font-bold truncate max-w-xs">{{ nego.product?.title }}</p>
                                    <div class="mt-1 flex items-center gap-3 text-sm">
                                        <span class="text-muted-foreground line-through">{{ formatRp(nego.product?.price) }}</span>
                                        <span class="font-black text-primary">{{ formatRp(nego.proposed_price) }}</span>
                                        <span class="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                            -{{ Math.round((1 - nego.proposed_price / nego.product?.price) * 100) }}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Message -->
                            <div v-if="nego.message" class="mb-4 rounded-xl border border-border bg-muted/30 p-3 text-sm italic text-muted-foreground">
                                "{{ nego.message }}"
                            </div>

                            <!-- Counter info -->
                            <div v-if="nego.counter_price" class="mb-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 text-sm dark:border-indigo-800 dark:bg-indigo-900/10">
                                <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">Counter-offer Anda: </span>
                                <span class="font-black text-indigo-700 dark:text-indigo-300">{{ formatRp(nego.counter_price) }}</span>
                                <p v-if="nego.seller_message" class="mt-1 text-xs italic text-muted-foreground">"{{ nego.seller_message }}"</p>
                            </div>

                            <!-- Toggle Aksi -->
                            <button v-if="['pending','countered'].includes(nego.status)"
                                    @click="toggleExpand(nego.id)"
                                    class="flex w-full items-center justify-center gap-1 rounded-xl border border-border py-2 text-xs font-bold text-muted-foreground hover:bg-muted transition-colors">
                                <component :is="expandedItems[nego.id] ? ChevronUp : ChevronDown" class="h-4 w-4" />
                                {{ expandedItems[nego.id] ? 'Tutup' : 'Buka Aksi' }}
                            </button>

                            <!-- Action Panel -->
                            <Transition enter-from-class="opacity-0 -translate-y-2" leave-to-class="opacity-0 -translate-y-2"
                                        enter-active-class="transition-all duration-200" leave-active-class="transition-all duration-200">
                                <div v-if="expandedItems[nego.id] && nego.status === 'pending'" class="mt-4 space-y-4 border-t border-border pt-4">
                                    <!-- Terima -->
                                    <button @click="acceptNegotiation(nego.id)"
                                            class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors">
                                        <CheckCircle2 class="h-4 w-4" /> Terima Harga {{ formatRp(nego.proposed_price) }}
                                    </button>

                                    <!-- Counter -->
                                    <div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-800 dark:bg-indigo-900/10">
                                        <p class="mb-3 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Beri Counter-Offer</p>
                                        <div class="flex gap-2">
                                            <div class="relative flex-1">
                                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">Rp</span>
                                                <input v-model="getCounterForm(nego.id).counter_price"
                                                       type="number" placeholder="Harga counter..."
                                                       class="w-full rounded-xl border border-border bg-background pl-8 pr-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20" />
                                            </div>
                                            <button @click="counterNegotiation(nego.id, getCounterForm(nego.id))"
                                                    class="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-colors">
                                                Kirim
                                            </button>
                                        </div>
                                        <input v-model="getCounterForm(nego.id).seller_message"
                                               type="text" placeholder="Pesan untuk buyer (opsional)..."
                                               class="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none" />
                                    </div>

                                    <!-- Tolak -->
                                    <button @click="rejectNegotiation(nego.id, getCounterForm(nego.id).seller_message)"
                                            class="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors dark:bg-red-900/10 dark:border-red-800">
                                        <XCircle class="h-4 w-4" /> Tolak Penawaran
                                    </button>
                                </div>
                            </Transition>
                        </div>
                    </div>

                    <div class="mt-8">
                        <Pagination :links="negotiations.links" />
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
