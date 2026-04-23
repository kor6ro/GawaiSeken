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
  myProducts: Object,
  transactions: Object,
})

const tab = ref('overview')
const tabSettings = ref('store') // 'store' or 'user'
const loading = ref(false)

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
  switch (status) {
    case 'pending': return 'Menunggu Pembayaran'
    case 'paid': return 'Dibayar'
    case 'shipped': return 'Dikirim'
    case 'completed': return 'Selesai'
    case 'disputed': return 'Komplain'
    case 'canceled': return 'Dibatalkan'
    default: return status
  }
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
        <div class="mx-auto flex max-w-md space-x-1 rounded-xl bg-muted p-1 sm:mx-0">
          <button
            @click="tab = 'overview'"
            :class="
              tab === 'overview'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            "
            class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <LayoutDashboard class="h-4 w-4" />
            Ringkasan
          </button>
          <button
            @click="tab = 'transactions'"
            :class="
              tab === 'transactions'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            "
            class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <ShoppingBag class="h-4 w-4" />
            Pesanan
          </button>
          <button
            @click="tab = 'settings'"
            :class="
              tab === 'settings'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            "
            class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <Settings class="h-4 w-4" />
            Pengaturan
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
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              <div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6">
                <div class="mb-2 flex items-center justify-between">
                  <p
                    class="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm"
                  >
                    Produk Aktif
                  </p>
                  <Package class="h-5 w-5 text-primary" />
                </div>
                <p class="mt-2 text-2xl font-black text-primary sm:text-3xl">{{ productsCount }}</p>
              </div>
              <div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6">
                <div class="mb-2 flex items-center justify-between">
                  <p
                    class="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm"
                  >
                    Total Terjual
                  </p>
                  <ShoppingBag class="h-5 w-5 text-green-500" />
                </div>
                <p class="mt-2 text-2xl font-black text-green-600 dark:text-green-400 sm:text-3xl">
                  {{ transactionsCount }}
                </p>
              </div>
              <div class="rounded-2xl border border-border bg-muted p-4 transition-colors sm:p-6">
                <div class="mb-2 flex items-center justify-between">
                  <p
                    class="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm"
                  >
                    Pesan Baru
                  </p>
                  <MessageCircle class="h-5 w-5 text-orange-500" />
                </div>
                <p class="mt-2 text-2xl font-black text-orange-500 sm:text-3xl">
                  {{ unreadMessagesCount }}
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

            <div class="overflow-hidden border border-border shadow-sm sm:rounded-lg">
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
                      @click="toggleStatus(item)"
                      class="group relative inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                      :class="
                        item.availability === 'available'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400'
                      "
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
                    <Link
                      :href="route('products.edit', item.slug)"
                      class="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm transition hover:bg-muted"
                    >
                      Edit
                    </Link>
                    <DangerButton @click="confirmDeletion(item)">Hapus</DangerButton>
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
                        @click="toggleStatus(item)"
                        class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all active:scale-90"
                        :class="
                          item.availability === 'available'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400'
                        "
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
                    </div>
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

                <template #item-status="{ status }">
                  <span 
                    class="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border"
                    :class="{
                      'border-amber-200 bg-amber-50 text-amber-700': status === 'pending',
                      'border-blue-200 bg-blue-50 text-blue-700': status === 'paid',
                      'border-purple-200 bg-purple-50 text-purple-700': status === 'shipped',
                      'border-emerald-200 bg-emerald-50 text-emerald-700': status === 'completed',
                      'border-red-200 bg-red-50 text-red-700': status === 'disputed',
                      'border-slate-200 bg-slate-50 text-slate-700': status === 'canceled',
                    }"
                  >
                    {{ getStatusLabel(status) }}
                  </span>
                </template>

                <template #item-actions="item">
                  <div class="flex items-center justify-end gap-2 py-2">
                    <button 
                      v-if="item.status === 'pending'"
                      @click="router.post(route('transactions.update-status', item.id), { status: 'paid' })"
                      class="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Tandai Dibayar
                    </button>
                    <button 
                      v-if="item.status === 'paid'"
                      @click="router.post(route('transactions.update-status', item.id), { status: 'shipped' })"
                      class="inline-flex items-center gap-1 px-3 py-1 bg-purple-500 text-white text-[10px] font-bold rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Tandai Dikirim
                    </button>
                    <button 
                      v-if="item.status === 'shipped'"
                      @click="router.post(route('transactions.update-status', item.id), { status: 'completed' })"
                      class="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Selesaikan
                    </button>
                    <button 
                      v-if="item.status === 'disputed'"
                      @click="openDisputeDetail(item)"
                      class="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
                    >
                      <AlertTriangle class="h-3 w-3" />
                      Detail Komplain
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

        <!-- TAB 3: SETTINGS -->
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

  border-radius: 16px;
  overflow: hidden;
  border: 1px solid hsl(var(--border));
}

:deep(.customize-header) {
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

.easy-table-wrapper {
  @apply rounded-2xl overflow-hidden border border-border;
}

/* Dark mode specific overrides */
.dark .customize-table {
  --easy-table-body-row-hover-background-color: hsl(var(--muted) / 0.3);
}
</style>
