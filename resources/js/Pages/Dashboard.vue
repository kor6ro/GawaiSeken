<script setup>
import { ref, shallowRef, onMounted, onUnmounted, watch } from 'vue'
import { Head, Link, useForm, usePage } from '@inertiajs/vue3'
import axios from 'axios'
import AppLayout from '@/Layouts/AppLayout.vue'
import { useIntersectionObserver } from '@vueuse/core'
import {
  LayoutDashboard,
  Settings,
  Package,
  ShoppingBag,
  MessageCircle,
  Plus,
  Edit3,
  Trash2,
  Image,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  X,
  Calendar,
  Phone,
  Truck,
  Tag,
  Users,
  CreditCard,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
} from 'lucide-vue-next'
import { router } from '@inertiajs/vue3'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue'
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'
import Modal from '@/Components/Modal.vue'
import Pagination from '@/Components/Pagination.vue'
import AddressForm from '@/Components/AddressForm.vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const props = defineProps({
  user: Object,
  productsCount: Number,
  transactionsCount: Number,
  unreadMessagesCount: Number,
  totalRevenue: Number,
  pendingOrders: Number,
  myProducts: Object,
  transactions: Object,
  negotiations: Object,
})

const tab = ref(new URLSearchParams(window.location.search).get('tab') || 'overview')
const tabSettings = ref('store') // 'store' or 'user'
const loading = ref(false)

watch(tab, (newTab) => {
  const url = new URL(window.location)
  url.searchParams.set('tab', newTab)
  window.history.pushState({}, '', url)
})

// ─── Negotiation Logic ───
const expandedItems = ref({})
const toggleExpand = (id) => { expandedItems.value[id] = !expandedItems.value[id] }

const counterForms = ref({})
const getCounterForm = (id) => {
    if (!counterForms.value[id]) {
        counterForms.value[id] = { counter_price: '', seller_message: '' }
    }
    return counterForms.value[id]
}

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
// ─────────────────────────

// Use shallowRef to avoid massive reactivity tracking on product array
const allMyProducts = shallowRef([...props.myProducts.data])
const nextUrl = ref(props.myProducts.next_page_url)
const loadMoreTrigger = ref(null)

const loadMore = async () => {
  if (!nextUrl.value || loading.value || tab.value !== 'overview') return

  loading.value = true
  try {
    const response = await axios.get(nextUrl.value, {
      headers: {
        'X-Inertia': 'true',
        'X-Inertia-Version': usePage().version,
        'X-Inertia-Partial-Component': 'Dashboard',
        'X-Inertia-Partial-Data': 'myProducts',
      },
    })

    const newProducts = response.data.props.myProducts
    allMyProducts.value = [...allMyProducts.value, ...newProducts.data]
    nextUrl.value = newProducts.next_page_url
  } catch (error) {
    console.error('Error loading more dashboard products:', error)
  } finally {
    loading.value = false
  }
}

useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadMore()
    }
  },
  { rootMargin: '400px 0px' }
)

watch(
  () => props.myProducts,
  (newVal) => {
    if (newVal.current_page === 1) {
      allMyProducts.value = [...newVal.data]
    }
    nextUrl.value = newVal.next_page_url
  },
  { deep: false }
)

const confirmProductDeletion = ref(false)
const productToDelete = ref(null)

const deleteForm = useForm({})

const deleteProduct = () => {
  deleteForm.delete(route('products.destroy', productToDelete.value.slug), {
    onSuccess: () => closeModal(),
  })
}

const confirmDeletion = (product) => {
  productToDelete.value = product
  confirmProductDeletion.value = true
}

const closeModal = () => {
  confirmProductDeletion.value = false
  productToDelete.value = null
}

const toggleStatus = (product) => {
  router.patch(
    route('products.toggle-status', product.id),
    {},
    {
      preserveScroll: true,
    }
  )
}

// Store Settings Form
const storeForm = useForm({
  store_name: props.user.profile?.store_name || props.user.name,
  store_bio: props.user.profile?.store_bio || '',
  store_address: props.user.profile?.store_address || '',
  store_landmark: props.user.profile?.store_landmark || '',
  store_province: props.user.profile?.store_province || '',
  store_city: props.user.profile?.store_city || '',
  store_district: props.user.profile?.store_district || '',
  store_village: props.user.profile?.store_village || '',
  store_logo: null,
})

// Personal Profile Form
const personalForm = useForm({
  name: props.user.name,
  email: props.user.email,
  phone: props.user.profile?.phone || '',
  address: props.user.profile?.address || '',
  landmark: props.user.profile?.landmark || '',
  province: props.user.profile?.province || '',
  city: props.user.profile?.city || '',
  district: props.user.profile?.district || '',
  village: props.user.profile?.village || '',
  bio: props.user.profile?.bio || '',
  date_of_birth: props.user.profile?.date_of_birth || '',
  gender: props.user.profile?.gender || '',
  avatar: null,
})

const photoPreview = ref(null)
const personalPhotoPreview = ref(null)
const photoInput = ref(null)
const personalPhotoInput = ref(null)

const cropModalOpen = ref(false)
const imageToCrop = ref(null)
const cropper = ref(null)
const currentCropTarget = ref('store') // 'store' or 'personal'

const updatePhotoPreview = (target = 'store') => {
  const input = target === 'store' ? photoInput.value : personalPhotoInput.value
  const photo = input.files[0]
  if (!photo) return

  input.value = ''
  currentCropTarget.value = target

  const reader = new FileReader()
  reader.onload = (e) => {
    imageToCrop.value = e.target.result
    cropModalOpen.value = true
  }
  reader.readAsDataURL(photo)
}

const cancelCrop = () => {
  cropModalOpen.value = false
  imageToCrop.value = null
}

const applyCrop = () => {
  if (!cropper.value) return
  const { canvas } = cropper.value.getResult()
  if (canvas) {
    if (currentCropTarget.value === 'store') {
      photoPreview.value = canvas.toDataURL()
    } else {
      personalPhotoPreview.value = canvas.toDataURL()
    }

    canvas.toBlob(
      (blob) => {
        const file = new File([blob], currentCropTarget.value === 'store' ? 'store_logo.jpg' : 'avatar.jpg', {
          type: 'image/jpeg',
        })
        if (currentCropTarget.value === 'store') {
          storeForm.store_logo = file
        } else {
          personalForm.avatar = file
        }
        cropModalOpen.value = false
        imageToCrop.value = null
      },
      'image/jpeg',
      0.9
    )
  }
}

const updateStoreSettings = () => {
  storeForm
    .transform((data) => ({
      ...data,
      _method: 'PATCH',
    }))
    .post(route('store.update'), {
      forceFormData: true,
      preserveScroll: true,
    })
}

const updatePersonalProfile = () => {
  personalForm
    .transform((data) => ({
      ...data,
      _method: 'PATCH',
    }))
    .post(route('profile.update'), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        // Option to reload if name changed and we want it reflected everywhere
      }
    })
}

const handleSettingsSubmit = () => {
  if (tabSettings.value === 'store') {
    updateStoreSettings()
  } else {
    updatePersonalProfile()
  }
}

const selectedDispute = ref(null)
const showDisputeModal = ref(false)

const openDisputeDetail = (transaction) => {
  selectedDispute.value = transaction.dispute
  showDisputeModal.value = true
}

const getStatusLabel = (status) => {
  const labels = {
    pending:       'Menunggu Pembayaran',
    paid:          'Dibayar — Dalam Escrow',
    processing:    'Diproses Seller',
    shipped:       'Dikirim',
    delivered:     'Diterima Buyer',
    completed:     'Selesai ✓',
    disputed:      'Sengketa',
    canceled:      'Dibatalkan',
    cod_requested: 'COD — Tunggu Konfirmasi',
    cod_confirmed: 'COD — Jadwal Dikonfirmasi',
  }
  return labels[status] ?? status
}

// ─── Modal Resi ─────────────────────────────────────────────────────────────
const shipModal = ref(false)
const selectedShipTransaction = ref(null)
const shipForm = useForm({ tracking_number: '', courier_name: '', seller_notes: '' })

const openShipModal = (item) => {
  selectedShipTransaction.value = item
  shipForm.reset()
  shipModal.value = true
}

const submitShipment = () => {
  shipForm.post(route('transactions.ship', selectedShipTransaction.value.id), {
    preserveScroll: true,
    onSuccess: () => { shipModal.value = false },
  })
}

// ─── Aksi COD ────────────────────────────────────────────────────────────────
const codModal = ref(false)
const selectedCodTransaction = ref(null)
const codForm = useForm({ cod_location: '', cod_scheduled_at: '', seller_notes: '' })

const openCodModal = (item) => {
  selectedCodTransaction.value = item
  codForm.cod_location     = item.cod_location || ''
  codForm.cod_scheduled_at = item.cod_scheduled_at?.substring(0,16) || ''
  codForm.seller_notes     = ''
  codModal.value = true
}

const submitCodConfirm = () => {
  codForm.post(route('transactions.cod-confirm', selectedCodTransaction.value.id), {
    preserveScroll: true,
    onSuccess: () => { codModal.value = false },
  })
}

const rejectCod = (item) => {
  if (confirm('Tolak permintaan COD dari buyer ini?'))
    router.post(route('transactions.cod-reject', item.id))
}

const productHeaders = [
  { text: "Produk", value: "title" },
  { text: "Harga", value: "price" },
  { text: "Status", value: "status" },
  { text: "Tanggal", value: "created_at" },
  { text: "Aksi", value: "actions", width: 150 },
]

const transactionHeaders = [
  { text: "Transaksi", value: "transaction" },
  { text: "Pembeli", value: "buyer" },
  { text: "Total", value: "total" },
  { text: "Status", value: "status" },
  { text: "Aksi", value: "actions", width: 180 },
]
</script>

<template>
  <AppLayout>
    <Head title="Seller Dashboard" />

    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-foreground">Seller Dashboard</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
        <!-- TAB NAVIGATION BUTTONS -->
        <div class="mx-auto flex max-w-2xl space-x-1 rounded-xl bg-muted p-1 sm:mx-0">
          <button
            @click="tab = 'overview'"
            :class="tab === 'overview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
            class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <LayoutDashboard class="h-4 w-4" /> Ringkasan
          </button>
          <button
            @click="tab = 'transactions'"
            :class="tab === 'transactions' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
            class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <ShoppingBag class="h-4 w-4" /> Pesanan
          </button>
          <button
            @click="tab = 'negotiations'"
            :class="tab === 'negotiations' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
            class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <Tag class="h-4 w-4" /> Penawaran
          </button>
          <button
            @click="tab = 'settings'"
            :class="tab === 'settings' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
            class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <Settings class="h-4 w-4" /> Pengaturan
          </button>
        </div>

        <!-- TAB 1: OVERVIEW -->
        <div v-show="tab === 'overview'" class="transition-all duration-300">
          <div
            class="mb-6 border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8"
          >
            <header class="mb-6">
              <h2 class="text-lg font-medium">Statistik Toko</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Ringkasan performa penjualan Anda saat ini.
              </p>
            </header>
            <div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              <!-- Pendapatan -->
              <div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6">
                <div class="mb-2 flex items-center justify-between">
                  <p class="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs">
                    Total Pendapatan
                  </p>
                  <CreditCard class="h-4 w-4 text-indigo-500 sm:h-5 sm:w-5" />
                </div>
                <p class="mt-2 text-lg font-black text-indigo-600 dark:text-indigo-400 sm:text-2xl truncate">
                  Rp {{ new Intl.NumberFormat('id-ID').format(totalRevenue || 0) }}
                </p>
              </div>

              <!-- Pesanan Aktif -->
              <div @click="tab = 'transactions'" class="rounded-2xl border border-border bg-muted p-4 transition-colors cursor-pointer hover:bg-accent/50 hover:border-amber-500/30 sm:p-6">
                <div class="mb-2 flex items-center justify-between">
                  <p class="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs">
                    Pesanan Aktif
                  </p>
                  <Clock class="h-4 w-4 text-amber-500 sm:h-5 sm:w-5" />
                </div>
                <p class="mt-2 text-xl font-black text-amber-600 dark:text-amber-400 sm:text-3xl">
                  {{ pendingOrders || 0 }}
                </p>
              </div>

              <!-- Total Terjual -->
              <div @click="tab = 'transactions'" class="rounded-2xl border border-border bg-muted p-4 transition-colors cursor-pointer hover:bg-accent/50 hover:border-emerald-500/30 sm:p-6">
                <div class="mb-2 flex items-center justify-between">
                  <p class="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs">
                    Total Terjual
                  </p>
                  <ShoppingBag class="h-4 w-4 text-emerald-500 sm:h-5 sm:w-5" />
                </div>
                <p class="mt-2 text-xl font-black text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                  {{ transactionsCount || 0 }}
                </p>
              </div>

              <!-- Produk Aktif -->
              <div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6">
                <div class="mb-2 flex items-center justify-between">
                  <p class="text-[10px] font-black uppercase tracking-wider text-muted-foreground sm:text-xs">
                    Produk Aktif
                  </p>
                  <Package class="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
                </div>
                <p class="mt-2 text-xl font-black text-blue-600 dark:text-blue-400 sm:text-3xl">
                  {{ productsCount || 0 }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8"
          >
            <div class="mb-6 flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold">Produk Saya</h3>
                <p class="text-sm text-muted-foreground">Kelola barang dagangan Anda.</p>
              </div>
              <Link
                :href="route('products.create')"
                class="inline-flex items-center rounded-xl border border-transparent bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-md transition duration-150 hover:bg-primary/90"
              >
                <Plus class="mr-2 h-4 w-4" />
                <span>Tambah Produk</span>
              </Link>
            </div>

            <!-- Desktop Table -->
            <div class="easy-table-wrapper hidden md:block">
              <EasyDataTable
                :headers="productHeaders"
                :items="allMyProducts"
                hide-footer
                border-cell
                table-class-name="customize-table"
                header-class-name="customize-header"
              >
                <template #item-title="{ title, images, category }">
                  <div class="flex items-center gap-4 py-2">
                    <div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                      <img
                        v-if="images && images.length > 0"
                        :src="`/storage/${images[0].image_path}`"
                        loading="lazy"
                        class="h-full w-full object-cover"
                      />
                      <div v-else class="flex h-full w-full items-center justify-center text-muted-foreground">
                        <Image class="h-6 w-6" />
                      </div>
                    </div>
                    <div class="min-w-0">
                      <div class="line-clamp-1 text-base font-bold text-foreground">{{ title }}</div>
                      <div class="text-xs text-muted-foreground/80">{{ category?.name }}</div>
                    </div>
                  </div>
                </template>

                <template #item-price="{ price }">
                  <span class="font-medium text-foreground">Rp {{ new Intl.NumberFormat('id-ID').format(price) }}</span>
                </template>

                <template #item-status="item">
                  <div class="flex flex-col items-center gap-1 py-2">
                    <button
                      @click="item.availability !== 'sold' && toggleStatus(item)"
                      :disabled="item.availability === 'sold'"
                      class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all"
                      :class="[
                        item.availability === 'sold' ? 'opacity-60 cursor-not-allowed' : 'active:scale-90 hover:scale-105',
                        item.availability === 'available'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400'
                          : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400'
                      ]"
                    >
                      <CheckCircle v-if="item.availability === 'available'" class="h-3.5 w-3.5" />
                      <Circle v-else class="h-3.5 w-3.5" />
                      {{ item.availability === 'available' ? 'Tersedia' : 'Terjual' }}
                    </button>
                    
                    <div v-if="item.status !== 'active'" 
                      class="text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border"
                      :class="{
                        'border-amber-200 bg-amber-50 text-amber-600': item.status === 'pending',
                        'border-red-200 bg-red-50 text-red-600': item.status === 'rejected',
                        'border-destructive/30 bg-destructive/10 text-destructive': item.status === 'banned',
                      }"
                    >
                      {{ item.status === 'pending' ? 'Moderasi' : (item.status === 'rejected' ? 'Ditolak' : 'Dibanned') }}
                    </div>
                  </div>
                </template>

                <template #item-created_at="{ created_at }">
                  <span class="text-xs text-muted-foreground">
                    {{ new Date(created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}
                  </span>
                </template>

                <template #item-actions="item">
                  <div class="flex items-center justify-end gap-2 py-2">
                    <template v-if="item.availability !== 'sold'">
                      <Link
                        :href="route('products.edit', item.slug)"
                        class="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm transition hover:bg-muted"
                      >
                        Edit
                      </Link>
                      <DangerButton @click="confirmDeletion(item)">Hapus</DangerButton>
                    </template>
                    <div v-else class="text-xs italic text-muted-foreground mr-2 border border-border px-3 py-1.5 rounded-md bg-muted">
                      Terkunci (Terjual)
                    </div>
                  </div>
                </template>

                <template #empty-message>
                  <div class="py-12 text-center text-muted-foreground">
                    <div class="flex flex-col items-center">
                      <span class="mb-2">Belum ada produk yang dijual.</span>
                      <Link :href="route('products.create')" class="font-bold text-primary">+ Tambah Produk Baru</Link>
                    </div>
                  </div>
                </template>
              </EasyDataTable>
            </div>

              <!-- Mobile Cards -->
              <div class="divide-y divide-border md:hidden">
                <div v-for="item in allMyProducts" :key="item.id" class="flex flex-col gap-4 p-4">
                  <div class="flex items-center gap-4">
                    <div
                      class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted"
                    >
                      <img
                        v-if="item.images && item.images.length > 0"
                        :src="`/storage/${item.images[0].image_path}`"
                        loading="lazy"
                        class="h-full w-full object-cover"
                      />
                      <div
                        v-else
                        class="flex h-full w-full items-center justify-center text-muted-foreground"
                      >
                        <Image class="h-8 w-8" />
                      </div>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="truncate text-base font-bold">{{ item.title }}</div>
                      <div class="text-xs text-muted-foreground">{{ item.category?.name }}</div>
                      <div class="mt-1 font-bold text-primary">
                        Rp {{ new Intl.NumberFormat('id-ID').format(item.price) }}
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between gap-4 border-t border-border pt-2">
                    <div class="flex flex-col gap-1">
                      <button
                        @click="item.availability !== 'sold' && toggleStatus(item)"
                        :disabled="item.availability === 'sold'"
                        class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all"
                        :class="[
                          item.availability === 'sold' ? 'opacity-60 cursor-not-allowed' : 'active:scale-90',
                          item.availability === 'available'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400'
                        ]"
                      >
                        <CheckCircle v-if="item.availability === 'available'" class="h-3 w-3" />
                        <Circle v-else class="h-3 w-3" />
                        {{ item.availability === 'available' ? 'Tersedia' : 'Terjual' }}
                      </button>
                      <!-- Mobile Moderation Status -->
                      <div v-if="item.status !== 'active'" 
                        class="inline-block text-[8px] font-black uppercase tracking-tighter px-1 rounded border self-start"
                        :class="{
                          'border-amber-200 bg-amber-50 text-amber-600': item.status === 'pending',
                          'border-red-200 bg-red-50 text-red-600': item.status === 'rejected',
                          'border-destructive/30 bg-destructive/10 text-destructive': item.status === 'banned',
                        }"
                      >
                        {{ item.status === 'pending' ? 'Moderasi' : (item.status === 'rejected' ? 'Ditolak' : 'Dibanned') }}
                      </div>
                      <span class="text-[10px] text-muted-foreground">{{
                        new Date(item.created_at).toLocaleDateString('id-ID')
                      }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <template v-if="item.availability !== 'sold'">
                        <Link
                          :href="route('products.edit', item.slug)"
                          class="rounded-lg p-2 text-muted-foreground transition hover:bg-accent"
                        >
                          <Edit3 class="h-5 w-5" />
                        </Link>
                        <button
                          @click="confirmDeletion(item)"
                          class="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
                        >
                          <Trash2 class="h-5 w-5" />
                        </button>
                      </template>
                      <span v-else class="text-[10px] italic text-muted-foreground">Terkunci</span>
                    </div>
                  </div>
              </div>
            </div>

            <!-- Load More Sentinel -->
            <div ref="loadMoreTrigger" class="mt-8 flex justify-center pb-4">
              <div v-if="loading" class="flex flex-col items-center gap-2">
                <div
                  class="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
                ></div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                  >Memuat produk...</span
                >
              </div>
              <div v-else-if="!nextUrl && allMyProducts.length > 0" class="py-4 text-center">
                <span
                  class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50"
                  >Semua produk ditampilkan</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: TRANSACTIONS (PESANAN) -->
        <div v-show="tab === 'transactions'" class="transition-all duration-300">
          <div
            class="border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8"
          >
            <div class="mb-6">
              <h3 class="text-lg font-bold">Pesanan Masuk</h3>
              <p class="text-sm text-muted-foreground">Kelola transaksi penjualan Anda.</p>
            </div>

            <div class="easy-table-wrapper">
                <EasyDataTable
                  :headers="transactionHeaders"
                  :items="transactions.data"
                  hide-footer
                  border-cell
                  table-class-name="customize-table"
                  header-class-name="customize-header"
                >
                  <template #item-transaction="{ reference_number, product }">
                    <div class="flex items-center gap-3 py-2">
                      <div class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                        <img v-if="product.images?.length > 0" :src="`/storage/${product.images[0].image_path}`" class="h-full w-full object-cover" />
                      </div>
                      <div class="min-w-0">
                        <div class="font-bold truncate text-foreground">#{{ reference_number }}</div>
                        <div class="text-[10px] text-muted-foreground/80 truncate max-w-[150px]">{{ product.title }}</div>
                      </div>
                    </div>
                  </template>

                  <template #item-buyer="{ buyer }">
                    <div class="py-2">
                      <div class="text-sm font-medium text-foreground">{{ buyer.name }}</div>
                      <div class="text-[10px] text-muted-foreground/80">{{ buyer.email }}</div>
                    </div>
                  </template>

                  <template #item-total="{ price }">
                    <span class="font-bold text-foreground">Rp {{ new Intl.NumberFormat('id-ID').format(price) }}</span>
                  </template>

              <!-- ─── Transaction Actions (Seller) ─────────────────────────── -->
                  <template #item-status="{ status, payment_method }">
                    <div class="flex flex-col items-start gap-1 py-2">
                      <span
                        class="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border"
                        :class="{
                          'border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400': ['pending','cod_requested'].includes(status),
                          'border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400': status === 'paid',
                          'border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400': status === 'processing',
                          'border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400': status === 'shipped',
                          'border-teal-200 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400': ['delivered','cod_confirmed'].includes(status),
                          'border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400': status === 'completed',
                          'border-red-200 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400': status === 'disputed',
                          'border-slate-200 bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400': status === 'canceled',
                        }"
                      >
                        {{ getStatusLabel(status) }}
                      </span>
                      <span v-if="payment_method === 'cod'" class="inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-orange-500">
                        <Users class="h-2.5 w-2.5" /> COD
                      </span>
                      <span v-else class="inline-flex items-center gap-0.5 text-[8px] font-black uppercase text-blue-500">
                        <CreditCard class="h-2.5 w-2.5" /> Rekber
                      </span>
                    </div>
                  </template>

                  <template #item-actions="item">
                    <div class="flex flex-wrap items-center justify-end gap-1.5 py-2">
                      <!-- REKBER FLOW -->
                      <template v-if="item.payment_method === 'rekber' || !item.payment_method">
                        <button
                          v-if="item.status === 'paid'"
                          @click="openShipModal(item)"
                          class="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-[10px] font-bold rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Truck class="h-3 w-3" /> Input Resi
                        </button>
                        <button
                          v-if="item.status === 'pending' || item.status === 'paid'"
                          @click="router.post(route('transactions.update-status', item.id), { status: 'processing' })"
                          v-show="item.status === 'paid'"
                          class="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                          Tandai Diproses
                        </button>
                      </template>

                      <!-- COD FLOW -->
                      <template v-if="item.payment_method === 'cod'">
                        <button
                          v-if="item.status === 'cod_requested'"
                          @click="openCodModal(item)"
                          class="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-[10px] font-bold rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          <Users class="h-3 w-3" /> Konfirmasi COD
                        </button>
                        <button
                          v-if="item.status === 'cod_requested'"
                          @click="rejectCod(item)"
                          class="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Tolak COD
                        </button>
                        <button
                          v-if="item.status === 'cod_confirmed'"
                          @click="router.post(route('transactions.cod-complete', item.id))"
                          class="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          COD Selesai
                        </button>
                      </template>

                      <!-- Dispute -->
                      <button
                        v-if="item.status === 'disputed'"
                        @click="openDisputeDetail(item)"
                        class="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
                      >
                        <AlertTriangle class="h-3 w-3" /> Detail Komplain
                      </button>
                    </div>
                  </template>

                  <template #empty-message>
                    <div class="py-12 text-center text-muted-foreground">
                      Belum ada transaksi masuk.
                    </div>
                  </template>
                </EasyDataTable>
              </div>

            <div class="mt-6">
              <Pagination :links="transactions.links" />
            </div>
          </div>
        </div>

        <!-- TAB 3: NEGOTIATIONS -->
        <div v-show="tab === 'negotiations'" class="transition-all duration-300">
          <div class="space-y-6">
            <div class="mb-8 flex items-center gap-4">
              <div class="rounded-2xl bg-primary/10 p-3 text-primary">
                <Tag class="h-6 w-6" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-foreground">Penawaran Harga dari Buyer</h3>
                <p class="text-sm text-muted-foreground">Terima, counter, atau tolak penawaran yang masuk.</p>
              </div>
            </div>

            <!-- Empty -->
            <div v-if="negotiations?.data?.length === 0" class="flex flex-col items-center py-24 text-center">
              <Tag class="mb-4 h-16 w-16 text-muted-foreground/25" />
              <h4 class="text-lg font-bold text-muted-foreground">Belum ada penawaran masuk</h4>
              <p class="mt-1 text-sm text-muted-foreground">Aktifkan opsi NEGO di produk Anda agar buyer bisa menawar.</p>
            </div>

            <!-- List -->
            <div v-else class="space-y-5">
              <div v-for="nego in negotiations?.data" :key="nego.id"
                   class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

                <!-- Header -->
                <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-5 py-3">
                  <div class="flex items-center gap-3">
                    <div class="h-8 w-8 overflow-hidden rounded-full border border-border bg-muted">
                      <img v-if="nego.buyer?.profile?.avatar" :src="`/storage/${nego.buyer.profile.avatar}`" class="h-full w-full object-cover" />
                      <div v-else class="flex h-full w-full items-center justify-center text-xs font-bold text-primary">{{ nego.buyer?.name?.charAt(0) }}</div>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-foreground">{{ nego.buyer?.name }}</p>
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
                      <p class="font-bold text-foreground truncate max-w-xs">{{ nego.product?.title }}</p>
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

              <div class="mt-8" v-if="negotiations?.links">
                <Pagination :links="negotiations.links" />
              </div>
            </div>
        </div>
      </div>


        <!-- TAB 4: SETTINGS -->
        <div v-show="tab === 'settings'" class="transition-all duration-300">
          <div
            class="border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-lg sm:p-8"
          >
            <div class="max-w-xl">
              <header>
                <h2 class="text-lg font-medium">Profil Toko</h2>
                <p class="mt-1 text-sm text-muted-foreground">
                  Informasi ini akan ditampilkan di halaman publik toko Anda.
                </p>
              </header>

              <form @submit.prevent="handleSettingsSubmit" class="mt-6 space-y-6">
                <!-- Profile Type Switcher -->
                <div class="mb-8 p-1 bg-muted rounded-xl flex gap-1">
                  <button 
                    type="button"
                    @click="tabSettings = 'store'"
                    class="flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all"
                    :class="tabSettings === 'store' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
                  >
                    Profil Toko
                  </button>
                  <button 
                    type="button"
                    @click="tabSettings = 'user'"
                    class="flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all"
                    :class="tabSettings === 'user' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
                  >
                    Profil Pribadi
                  </button>
                </div>

                <div v-if="tabSettings === 'store'" class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <!-- Avatar Upload -->
                <div
                  class="flex flex-col items-center gap-6 border-b border-border pb-6 sm:flex-row sm:items-start"
                >
                  <div class="group relative shrink-0">
                    <div
                      class="relative h-28 w-28 overflow-hidden rounded-full border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border transition-all duration-300 group-hover:ring-primary"
                    >
                      <img
                        v-if="photoPreview"
                        :src="photoPreview"
                        loading="lazy"
                        class="h-full w-full object-cover"
                      />
                      <img
                        v-else-if="user.profile?.store_logo"
                        :src="`/storage/${user.profile.store_logo}`"
                        loading="lazy"
                        class="h-full w-full object-cover"
                      />
                      <div
                        v-else
                        class="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-black text-primary"
                      >
                        {{ (user.profile?.store_name || user.name).substring(0, 1) }}
                      </div>
                      <!-- Overlay -->
                      <div
                        class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                        @click="photoInput.click()"
                      >
                        <Image class="mb-1 h-6 w-6 text-white" />
                        <span class="text-[10px] font-bold uppercase tracking-wider text-white"
                          >Ubah Logo</span
                        >
                      </div>
                    </div>
                    <input
                      type="file"
                      ref="photoInput"
                      class="hidden"
                      accept="image/*"
                      @change="updatePhotoPreview('store')"
                    />
                    <div
                      class="absolute -bottom-1 -right-1 rounded-full bg-background p-1 shadow-sm"
                    >
                      <button
                        type="button"
                        @click.prevent="photoInput.click()"
                        class="rounded-full bg-primary p-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                      >
                        <Edit3 class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div class="flex-1 pt-2 text-center sm:text-left">
                    <h3 class="text-lg font-black text-foreground">Foto Profil Toko</h3>
                    <p class="mb-4 mt-1 text-sm leading-relaxed text-muted-foreground">
                      Rekomendasi rasio 1:1, maks 2MB. Format file JPG, JPEG, PNG, atau WebP. Gambar
                      yang diunggah akan dapat dicrop secara langsung.
                    </p>
                    <SecondaryButton @click.prevent="photoInput.click()" class="border-2 shadow-sm"
                      >Ganti Logo Toko</SecondaryButton
                    >
                    <InputError :message="storeForm.errors.store_logo" class="mt-2" />
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <!-- Store Name -->
                  <div class="md:col-span-2">
                    <InputLabel
                      for="store_name"
                      value="Nama Toko / Penjual"
                      class="mb-1 font-bold"
                    />
                    <TextInput
                      id="store_name"
                      v-model="storeForm.store_name"
                      type="text"
                      class="block h-12 w-full rounded-xl text-sm font-medium"
                      placeholder="Ketik nama toko Anda..."
                      required
                    />
                    <InputError :message="storeForm.errors.store_name" class="mt-1" />
                  </div>

                  <!-- Store Bio -->
                  <div class="md:col-span-2">
                    <InputLabel
                      for="store_bio"
                      value="Bio / Deskripsi Singkat Toko"
                      class="mb-1 font-bold"
                    />
                    <textarea
                      id="store_bio"
                      v-model="storeForm.store_bio"
                      rows="4"
                      class="block w-full resize-none rounded-xl border-border bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary"
                      placeholder="Ceritakan kelebihan toko Anda kepada calon pembeli..."
                    ></textarea>
                    <InputError :message="storeForm.errors.store_bio" class="mt-1" />
                  </div>

                  <!-- Store Location & Address -->
                  <div class="md:col-span-2">
                    <AddressForm v-model="storeForm" prefix="store_" />
                  </div>
                </div>
              </div>

                <!-- USER PROFILE SECTION -->
                <div v-if="tabSettings === 'user'" class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <!-- Personal Avatar Upload -->
                   <div class="flex flex-col items-center gap-6 border-b border-border pb-6 sm:flex-row sm:items-start">
                    <div class="group relative shrink-0">
                      <div class="relative h-28 w-28 overflow-hidden rounded-full border-[6px] border-background bg-muted shadow-2xl ring-1 ring-border transition-all duration-300 group-hover:ring-primary">
                        <img v-if="personalPhotoPreview" :src="personalPhotoPreview" class="h-full w-full object-cover" />
                        <img v-else-if="user.profile?.avatar" :src="`/storage/${user.profile.avatar}`" class="h-full w-full object-cover" />
                        <div v-else class="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-black text-primary">
                          {{ user.name.charAt(0) }}
                        </div>
                        <div class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" @click="personalPhotoInput.click()">
                          <Image class="mb-1 h-6 w-6 text-white" />
                          <span class="text-[10px] font-bold uppercase tracking-wider text-white">Ubah Foto</span>
                        </div>
                      </div>
                      <input type="file" ref="personalPhotoInput" class="hidden" accept="image/*" @change="updatePhotoPreview('personal')" />
                    </div>
                    <div class="flex-1 pt-2 text-center sm:text-left">
                      <h3 class="text-lg font-black text-foreground">Foto Profil Pribadi</h3>
                      <p class="mb-4 mt-1 text-sm leading-relaxed text-muted-foreground">
                        Foto ini akan muncul saat Anda mengobrol dengan pembeli atau memberikan ulasan.
                      </p>
                      <SecondaryButton @click.prevent="personalPhotoInput.click()" class="border-2 shadow-sm">Ganti Foto Profil</SecondaryButton>
                      <InputError :message="personalForm.errors.avatar" class="mt-2" />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div class="md:col-span-2">
                      <InputLabel for="personal_name" value="Nama Lengkap" class="mb-1 font-bold" />
                      <TextInput id="personal_name" v-model="personalForm.name" type="text" class="block h-12 w-full rounded-xl text-sm font-medium" required />
                      <InputError :message="personalForm.errors.name" class="mt-1" />
                    </div>
                    <div class="md:col-span-1">
                      <InputLabel for="personal_phone" value="Nomor Telepon" class="mb-1 font-bold" />
                      <TextInput id="personal_phone" v-model="personalForm.phone" type="text" class="block h-12 w-full rounded-xl text-sm" />
                      <InputError :message="personalForm.errors.phone" class="mt-1" />
                    </div>
                    <div class="md:col-span-1">
                      <InputLabel for="personal_email" value="Email" class="mb-1 font-bold" />
                      <TextInput id="personal_email" v-model="personalForm.email" type="email" class="block h-12 w-full rounded-xl text-sm bg-muted/50" disabled />
                    </div>

                    <div class="md:col-span-1">
                      <InputLabel for="date_of_birth" value="Tanggal Lahir" class="mb-1 font-bold" />
                      <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Calendar class="h-4 w-4 text-muted-foreground" />
                        </div>
                        <TextInput id="date_of_birth" v-model="personalForm.date_of_birth" type="date" class="block h-12 w-full rounded-xl pl-9 text-sm" />
                      </div>
                      <InputError :message="personalForm.errors.date_of_birth" class="mt-1" />
                    </div>

                    <div class="md:col-span-1">
                      <InputLabel for="gender" value="Jenis Kelamin" class="mb-1 font-bold" />
                      <select id="gender" v-model="personalForm.gender" class="block h-12 w-full rounded-xl border-border bg-background text-sm focus:border-primary focus:ring-primary">
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                        <option value="other">Lainnya</option>
                      </select>
                      <InputError :message="personalForm.errors.gender" class="mt-1" />
                    </div>
                    <div class="md:col-span-2">
                      <InputLabel for="personal_bio" value="Bio Singkat" class="mb-1 font-bold" />
                      <textarea id="personal_bio" v-model="personalForm.bio" rows="3" class="block w-full resize-none rounded-xl border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"></textarea>
                    </div>

                    <!-- Personal Location & Address -->
                    <div class="md:col-span-2">
                      <AddressForm v-model="personalForm" prefix="" />
                    </div>
                  </div>

                  <div class="mt-8 flex items-center gap-4 border-t border-border pt-6">
                    <PrimaryButton @click="updatePersonalProfile" :disabled="personalForm.processing" class="h-12 rounded-xl px-8 text-sm font-black shadow-lg shadow-primary/20">
                      <span v-if="personalForm.processing" class="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                      Simpan Profil Pribadi
                    </PrimaryButton>
                    <Transition enter-from-class="opacity-0 -translate-y-2" leave-to-class="opacity-0 translate-y-2" class="transition duration-300 ease-out">
                      <div v-if="personalForm.recentlySuccessful" class="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-600 dark:text-green-400">
                        <CheckCircle class="h-4 w-4" />
                        <p class="text-sm font-bold">Profil Pribadi Diperbarui!</p>
                      </div>
                    </Transition>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Cropper Modal -->
        <Modal :show="cropModalOpen" @close="cancelCrop" maxWidth="xl">
          <div class="bg-card p-6 text-card-foreground">
            <header class="mb-4">
              <h2 class="text-xl font-black">Sesuaikan Foto Profil</h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Geser, putar, atau perbesar/perkecil foto untuk mendapatkan potongan yang pas.
                Lingkaran adalah pratinjau hasil akhirnya.
              </p>
            </header>

            <div
              class="relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-border bg-black shadow-inner ring-1 ring-border"
            >
              <Cropper
                ref="cropper"
                class="h-full w-full object-contain"
                :src="imageToCrop"
                :stencil-props="{
                  aspectRatio: 1,
                  movable: false,
                  resizable: false,
                }"
                :resize-image="{
                  adjustStencil: false,
                }"
                :move-image="{
                  adjustStencil: false,
                }"
                image-restriction="stencil"
              />
            </div>

            <div class="mt-6 flex items-center justify-end gap-3">
              <SecondaryButton
                @click="cancelCrop"
                class="h-11 rounded-xl px-6 font-bold hover:bg-muted"
                >Batal</SecondaryButton
              >
              <PrimaryButton @click="applyCrop" class="h-11 rounded-xl px-8 font-bold shadow-lg"
                >Terapkan</PrimaryButton
              >
            </div>
          </div>
        </Modal>

        <!-- Deletion Confirm Modal -->
        <Modal :show="confirmProductDeletion" @close="closeModal">
          <div class="p-6">
            <div class="flex flex-col items-center justify-center text-center">
              <div
                class="mx-auto mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900"
              >
                <Trash2 class="h-6 w-6 text-red-600 dark:text-red-200" />
              </div>
              <h2 class="text-lg font-medium">Konfirmasi Hapus</h2>
              <p class="mt-2 text-sm text-muted-foreground">
                Apakah Anda yakin ingin menghapus produk
                <strong>{{ productToDelete?.title }}</strong
                >? <br />
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div class="mt-6 flex justify-center gap-3">
              <SecondaryButton @click="closeModal">Batal</SecondaryButton>
              <DangerButton
                @click="deleteProduct"
                :class="{ 'opacity-25': deleteForm.processing }"
                :disabled="deleteForm.processing"
              >
                Ya, Hapus
              </DangerButton>
            </div>
          </div>
        </Modal>

        <!-- Dispute Detail Modal (Seller) -->
        <Modal :show="showDisputeModal" @close="showDisputeModal = false" maxWidth="2xl">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6 border-b border-border pb-4">
              <h3 class="text-xl font-bold flex items-center gap-2">
                <AlertTriangle class="text-red-500 h-6 w-6" />
                Detail Komplain Pembeli
              </h3>
              <button @click="showDisputeModal = false" class="text-muted-foreground hover:text-foreground">
                <X class="h-6 w-6" />
              </button>
            </div>

            <div v-if="selectedDispute" class="space-y-6">
              <div class="bg-muted/50 p-4 rounded-xl border border-border">
                <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Alasan</p>
                <p class="text-base font-bold text-foreground">
                  {{ 
                    selectedDispute.reason === 'not_delivered' ? 'Barang Belum Sampai' :
                    selectedDispute.reason === 'not_as_described' ? 'Barang Tidak Sesuai Deskripsi' :
                    selectedDispute.reason === 'damaged' ? 'Barang Rusak / Cacat' : 'Lainnya'
                  }}
                </p>
              </div>

              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Deskripsi Masalah</p>
                <p class="text-sm leading-relaxed text-foreground whitespace-pre-line">{{ selectedDispute.description }}</p>
              </div>

              <div v-if="selectedDispute.evidence_images?.length > 0">
                <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Foto Bukti</p>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <a 
                    v-for="(img, idx) in selectedDispute.evidence_images" 
                    :key="idx" 
                    :href="`/storage/${img}`" 
                    target="_blank"
                    class="aspect-square rounded-xl border border-border overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img :src="`/storage/${img}`" class="h-full w-full object-cover" />
                  </a>
                </div>
              </div>

              <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
                <p class="text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
                  <strong>Catatan:</strong> Status transaksi telah berubah menjadi <strong>Disputed</strong>. Admin akan meninjau bukti yang ada dan memberikan keputusan segera. Dana Anda tertahan sementara di sistem.
                </p>
              </div>
            </div>

            <div class="mt-8 flex justify-end border-t border-border pt-4">
              <SecondaryButton @click="showDisputeModal = false">Tutup</SecondaryButton>
            </div>
          </div>
        </Modal>

        <!-- ─── Modal Input Resi ──────────────────────────────────────────── -->
        <Modal :show="shipModal" @close="shipModal = false" maxWidth="md">
          <div class="p-6">
            <div class="mb-6 flex items-center justify-between border-b border-border pb-4">
              <h3 class="flex items-center gap-2 text-lg font-bold">
                <Truck class="h-5 w-5 text-purple-600" /> Input Nomor Resi
              </h3>
              <button @click="shipModal = false" class="text-muted-foreground hover:text-foreground">
                <X class="h-5 w-5" />
              </button>
            </div>
            <form @submit.prevent="submitShipment" class="space-y-4">
              <div>
                <InputLabel value="Nama Ekspedisi" />
                <TextInput v-model="shipForm.courier_name" placeholder="JNE, J&T, SiCepat, dll." class="mt-1 block w-full" required />
                <InputError :message="shipForm.errors.courier_name" class="mt-1" />
              </div>
              <div>
                <InputLabel value="Nomor Resi" />
                <TextInput v-model="shipForm.tracking_number" placeholder="Masukkan nomor resi..." class="mt-1 block w-full font-mono" required />
                <InputError :message="shipForm.errors.tracking_number" class="mt-1" />
              </div>
              <div>
                <InputLabel value="Catatan untuk Buyer (opsional)" />
                <textarea v-model="shipForm.seller_notes" rows="2" placeholder="Misal: Barang sudah dikemas rapi, sudah di-bubblewrap..."
                          class="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
              <div class="flex justify-end gap-2 pt-2">
                <SecondaryButton type="button" @click="shipModal = false">Batal</SecondaryButton>
                <PrimaryButton type="submit" :disabled="shipForm.processing">
                  <Truck class="mr-2 h-4 w-4" /> Simpan & Konfirmasi Pengiriman
                </PrimaryButton>
              </div>
            </form>
          </div>
        </Modal>

        <!-- ─── Modal Konfirmasi COD ──────────────────────────────────────── -->
        <Modal :show="codModal" @close="codModal = false" maxWidth="md">
          <div class="p-6">
            <div class="mb-6 flex items-center justify-between border-b border-border pb-4">
              <h3 class="flex items-center gap-2 text-lg font-bold">
                <Users class="h-5 w-5 text-teal-600" /> Konfirmasi Meetup COD
              </h3>
              <button @click="codModal = false" class="text-muted-foreground hover:text-foreground">
                <X class="h-5 w-5" />
              </button>
            </div>
            <form @submit.prevent="submitCodConfirm" class="space-y-4">
              <div>
                <InputLabel value="Lokasi Meetup" />
                <TextInput v-model="codForm.cod_location" placeholder="Nama tempat / alamat lengkap..." class="mt-1 block w-full" required />
                <InputError :message="codForm.errors.cod_location" class="mt-1" />
              </div>
              <div>
                <InputLabel value="Waktu Meetup" />
                <TextInput v-model="codForm.cod_scheduled_at" type="datetime-local" class="mt-1 block w-full" required />
                <InputError :message="codForm.errors.cod_scheduled_at" class="mt-1" />
              </div>
              <div>
                <InputLabel value="Pesan untuk Buyer (opsional)" />
                <textarea v-model="codForm.seller_notes" rows="2" placeholder="Misal: Saya pakai baju merah, hubungi sebelum datang..."
                          class="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
              <div class="rounded-xl border border-teal-200 bg-teal-50/50 p-3 text-sm text-teal-700 dark:border-teal-800 dark:bg-teal-900/10 dark:text-teal-300">
                ℹ️ Setelah dikonfirmasi, buyer akan menerima notifikasi detail meetup ini.
              </div>
              <div class="flex justify-end gap-2 pt-2">
                <SecondaryButton type="button" @click="codModal = false">Batal</SecondaryButton>
                <PrimaryButton type="submit" :disabled="codForm.processing">
                  <Users class="mr-2 h-4 w-4" /> Konfirmasi COD
                </PrimaryButton>
              </div>
            </form>
          </div>
        </Modal>

      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.customize-table {
  --easy-table-border: 1px solid hsl(var(--border));
  --easy-table-header-font-size: 12px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: hsl(var(--muted-foreground));
  --easy-table-header-background-color: hsl(var(--muted));
  
  --easy-table-body-row-font-size: 13px;
  --easy-table-body-font-color: hsl(var(--foreground));
  --easy-table-body-row-height: 60px;
  --easy-table-body-row-background-color: hsl(var(--card));
  --easy-table-body-row-hover-background-color: hsl(var(--muted) / 0.5);
  
  --easy-table-footer-background-color: hsl(var(--card));
  --easy-table-footer-font-color: hsl(var(--muted-foreground));
  --easy-table-footer-font-size: 12px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  border-radius: 12px;
  overflow: hidden;
}

:deep(.customize-header) {
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

.easy-table-wrapper {
  @apply rounded-xl overflow-hidden border border-border shadow-sm bg-card;
}

/* Dark mode specific overrides */
.dark .customize-table {
  --easy-table-body-row-hover-background-color: hsl(var(--muted) / 0.3);
}
</style>
