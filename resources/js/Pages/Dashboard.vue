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
} from 'lucide-vue-next'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue'
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'
import Modal from '@/Components/Modal.vue'
import Pagination from '@/Components/Pagination.vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const props = defineProps({
  user: Object,
  productsCount: Number,
  transactionsCount: Number,
  unreadMessagesCount: Number,
  myProducts: Object,
})

const tab = ref('overview')
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

// Store Settings Form
const storeForm = useForm({
  store_name: props.user.profile?.store_name || props.user.name,
  bio: props.user.profile?.bio || '',
  address: props.user.profile?.address || '',
  city: props.user.profile?.city || '',
  avatar: null,
})

const photoPreview = ref(null)
const photoInput = ref(null)

const cropModalOpen = ref(false)
const imageToCrop = ref(null)
const cropper = ref(null)

const updatePhotoPreview = () => {
  const photo = photoInput.value.files[0]
  if (!photo) return

  photoInput.value.value = ''

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
    photoPreview.value = canvas.toDataURL()

    canvas.toBlob(
      (blob) => {
        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
        storeForm.avatar = file
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
              <div class="hidden overflow-x-auto md:block">
                <table class="w-full text-left text-sm">
                  <thead
                    class="border-b border-border bg-muted text-xs uppercase text-muted-foreground"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-4 font-semibold">Produk</th>
                      <th scope="col" class="px-6 py-4 font-semibold">Harga</th>
                      <th scope="col" class="px-6 py-4 text-center font-semibold">Status</th>
                      <th scope="col" class="px-6 py-4 text-center font-semibold">Tanggal</th>
                      <th scope="col" class="px-6 py-4 text-right font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border">
                    <tr
                      v-for="item in allMyProducts"
                      :key="item.id"
                      class="bg-card transition-colors hover:bg-muted"
                    >
                      <td class="px-6 py-4 align-middle">
                        <div class="flex items-center gap-4">
                          <div
                            class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted"
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
                              <Image class="h-6 w-6" />
                            </div>
                          </div>
                          <div>
                            <div class="line-clamp-1 text-base font-bold">{{ item.title }}</div>
                            <div class="text-xs text-muted-foreground">
                              {{ item.category?.name }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 align-middle font-medium">
                        Rp {{ new Intl.NumberFormat('id-ID').format(item.price) }}
                      </td>
                      <td class="px-6 py-4 text-center align-middle">
                        <span
                          class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold"
                          :class="
                            item.status === 'available'
                              ? 'border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : 'border-gray-200 bg-gray-100 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          "
                        >
                          {{ item.status }}
                        </span>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-center align-middle text-xs text-muted-foreground"
                      >
                        {{
                          new Date(item.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        }}
                      </td>
                      <td class="px-6 py-4 text-right align-middle">
                        <div class="flex items-center justify-end gap-2">
                          <Link
                            :href="route('products.edit', item.slug)"
                            class="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm transition hover:bg-muted"
                          >
                            Edit
                          </Link>
                          <DangerButton @click="confirmDeletion(item)">Hapus</DangerButton>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="allMyProducts.length === 0">
                      <td colspan="5" class="px-6 py-12 text-center text-muted-foreground">
                        <div class="flex flex-col items-center">
                          <span class="mb-2">Belum ada produk yang dijual.</span>
                          <Link :href="route('products.create')" class="font-bold text-primary"
                            >+ Tambah Produk Baru</Link
                          >
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                      <span
                        class="inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-bold"
                        :class="
                          item.status === 'available'
                            ? 'border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'border-gray-200 bg-gray-100 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        "
                      >
                        {{ item.status }}
                      </span>
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

        <!-- TAB 2: SETTINGS -->
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

              <form @submit.prevent="updateStoreSettings" class="mt-6 space-y-6">
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
                        v-else-if="user.profile?.avatar"
                        :src="`/storage/${user.profile.avatar}`"
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
                          >Ubah</span
                        >
                      </div>
                    </div>
                    <input
                      type="file"
                      ref="photoInput"
                      class="hidden"
                      accept="image/*"
                      @change="updatePhotoPreview"
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
                      >Unggah Gambar</SecondaryButton
                    >
                    <InputError :message="storeForm.errors.avatar" class="mt-2" />
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

                  <!-- Bio -->
                  <div class="md:col-span-2">
                    <InputLabel
                      for="bio"
                      value="Bio / Deskripsi Singkat Toko"
                      class="mb-1 font-bold"
                    />
                    <textarea
                      id="bio"
                      v-model="storeForm.bio"
                      rows="4"
                      class="block w-full resize-none rounded-xl border-border bg-background text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary"
                      placeholder="Ceritakan kelebihan toko Anda kepada calon pembeli..."
                    ></textarea>
                    <InputError :message="storeForm.errors.bio" class="mt-1" />
                  </div>

                  <!-- City -->
                  <div class="md:col-span-1">
                    <InputLabel for="city" value="Kota / Kabupaten" class="mb-1 font-bold" />
                    <div class="relative">
                      <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                      >
                        <MapPin class="h-4 w-4 text-muted-foreground" />
                      </div>
                      <TextInput
                        id="city"
                        v-model="storeForm.city"
                        type="text"
                        class="block h-12 w-full rounded-xl pl-9 text-sm"
                        placeholder="Misal: Jakarta Selatan"
                      />
                    </div>
                    <InputError :message="storeForm.errors.city" class="mt-1" />
                  </div>

                  <!-- Address -->
                  <div class="md:col-span-1">
                    <InputLabel
                      for="address"
                      value="Alamat Lengkap (Opsional)"
                      class="mb-1 font-bold"
                    />
                    <TextInput
                      id="address"
                      v-model="storeForm.address"
                      type="text"
                      class="block h-12 w-full rounded-xl text-sm"
                      placeholder="Jalan, No Rumah, RT/RW..."
                    />
                    <InputError :message="storeForm.errors.address" class="mt-1" />
                  </div>
                </div>

                <div class="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <PrimaryButton
                    :disabled="storeForm.processing"
                    class="h-12 rounded-xl px-8 text-sm font-black shadow-lg shadow-primary/20"
                  >
                    <span
                      v-if="storeForm.processing"
                      class="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    ></span>
                    Simpan Perubahan
                  </PrimaryButton>
                  <Transition
                    enter-from-class="opacity-0 -translate-y-2"
                    leave-to-class="opacity-0 translate-y-2"
                    class="transition duration-300 ease-out"
                  >
                    <div
                      v-if="storeForm.recentlySuccessful"
                      class="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-600 dark:text-green-400"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <p class="text-sm font-bold">Profil Berhasil Diperbarui!</p>
                    </div>
                  </Transition>
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
      </div>
    </div>
  </AppLayout>
</template>
