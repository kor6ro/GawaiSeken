<script setup>
import { ref, computed } from 'vue'
import { Head, Link, usePage, router } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import {
  Home,
  ChevronRight,
  ExternalLink,
  Globe,
  ArrowRight,
  MapPin,
  Store,
  MessageCircle,
  Edit3,
  ShieldCheck,
  ShoppingCart,
  X,
  Flag,
  AlertTriangle,
} from 'lucide-vue-next'
import Modal from '@/Components/Modal.vue'

const props = defineProps({
  product: Object,
})

const activeImage = ref(
  props.product.images.length > 0
    ? `/storage/${props.product.images[0].image_path}`
    : '/images/placeholder-product.png'
)
const showRemoveModal = ref(false)

const auth = usePage().props.auth

const isFavorited = computed(() => {
  return auth.user?.favorites?.includes(props.product.id)
})

const toggleFavorite = () => {
  if (!auth.user) {
    router.get(route('login'))
    return
  }
  if (isFavorited.value) {
    showRemoveModal.value = true
  } else {
    submitToggle()
  }
}

const submitToggle = () => {
  showRemoveModal.value = false
  router.post(
    route('products.toggle-favorite', props.product.id),
    {},
    {
      preserveScroll: true,
    }
  )
}

const reportProduct = () => {
  if (!auth.user) {
    router.get(route('login'))
    return
  }
  const reason = prompt('Alasan melaporkan produk ini?')
  if (reason) {
    router.post(
      route('products.report', props.product.id),
      { reason },
      {
        preserveScroll: true,
      }
    )
  }
}

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(props.product.price)
})

const specifications = computed(() => {
  if (!props.product.specifications) return []
  return Object.entries(props.product.specifications)
    .filter(([key, value]) => value !== null && value !== '')
    .map(([key, value]) => ({
      label: key.replace(/_/g, ' '),
      value: value,
    }))
})
</script>

<template>
  <AppLayout>
    <Head :title="product.title" />

    <div class="min-h-screen bg-background py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumbs -->
        <nav class="mb-8 flex text-sm font-medium" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <Link
                :href="route('home')"
                class="flex items-center text-muted-foreground transition-colors hover:text-primary"
              >
                <Home class="mr-2 h-4 w-4" />
                Beranda
              </Link>
            </li>
            <li>
              <div class="flex items-center">
                <ChevronRight class="h-4 w-4 text-muted-foreground" />
                <span class="ml-1 text-muted-foreground md:ml-2">{{ product.category?.name }}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <!-- Left: Image Gallery -->
          <div class="space-y-6 lg:col-span-7">
            <div
              class="relative aspect-square overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl transition-all duration-500 hover:shadow-primary/5 md:aspect-[4/3]"
            >
              <img
                :src="activeImage"
                :alt="product.title"
                loading="lazy"
                class="h-full w-full object-cover transition-all duration-700"
              />

              <div class="absolute left-6 top-6 flex flex-col gap-2">
                <div v-if="product.reference_url" class="flex">
                  <a
                    :href="product.reference_url"
                    target="_blank"
                    class="flex items-center gap-2 rounded-xl bg-primary/90 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-lg backdrop-blur-md transition-all hover:bg-primary"
                  >
                    {{ product.brand }}
                    <ExternalLink class="h-3 w-3" />
                  </a>
                </div>
                <span
                  v-else
                  class="rounded-xl bg-primary/90 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-lg backdrop-blur-md"
                >
                  {{ product.brand }}
                </span>
              </div>
            </div>

            <div v-if="product.images.length > 1" class="grid grid-cols-4 gap-4">
              <button
                v-for="image in product.images"
                :key="image.id"
                @click="activeImage = `/storage/${image.image_path}`"
                class="group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300"
                :class="
                  activeImage === `/storage/${image.image_path}`
                    ? 'border-primary shadow-lg'
                    : 'border-transparent opacity-70 hover:border-muted-foreground/30 hover:opacity-100'
                "
              >
                <img
                  :src="`/storage/${image.image_path}`"
                  loading="lazy"
                  class="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </button>
            </div>
          </div>

          <!-- Right: Product Details -->
          <div class="lg:col-span-5">
            <div
              class="sticky top-8 rounded-[2.5rem] border border-border bg-card p-8 text-card-foreground shadow-xl md:p-10"
            >
              <div class="mb-8">
                <div class="mb-4 flex flex-wrap items-center gap-3">
                  <span
                    class="rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                    >{{ product.category?.name }}</span
                  >
                  <span
                    :class="[
                      product.condition_badge_color === 'green'
                        ? 'bg-emerald-500'
                        : product.condition_badge_color === 'yellow'
                          ? 'bg-amber-500'
                          : 'bg-slate-400',
                      'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white',
                    ]"
                    >{{ product.condition }}</span
                  >
                  <span
                    v-if="product.is_cod"
                    class="rounded-full bg-blue-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                    >COD</span
                  >
                  <span
                    v-if="product.is_negotiable"
                    class="rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                    >Bisa Nego</span
                  >
                </div>
                <h1 class="mb-4 text-3xl font-black leading-tight md:text-4xl">
                  {{ product.title }}
                </h1>
                <div class="flex items-baseline gap-2">
                  <span class="text-4xl font-black text-primary"
                    >Rp {{ new Intl.NumberFormat('id-ID').format(product.price) }}</span
                  >
                </div>
              </div>

              <div class="space-y-10">
                <!-- Specs Grid -->
                <div v-if="specifications.length > 0" class="grid grid-cols-2 gap-4">
                  <div
                    v-for="spec in specifications"
                    :key="spec.label"
                    class="group rounded-2xl border border-border bg-muted/50 p-4 transition-colors hover:bg-muted"
                  >
                    <span
                      class="mb-1 block text-[10px] font-bold uppercase tracking-tighter text-muted-foreground"
                      >{{ spec.label }}</span
                    >
                    <span class="block text-sm font-bold">{{ spec.value }}</span>
                  </div>
                </div>

                <a
                  v-if="product.reference_url"
                  :href="product.reference_url"
                  target="_blank"
                  class="group flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-muted py-4 text-sm font-black shadow-sm transition-all hover:bg-accent"
                >
                  <Globe class="h-5 w-5" />
                  Lihat Referensi Eksternal
                  <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>

                <!-- Description -->
                <div>
                  <h3
                    class="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground"
                  >
                    <div class="h-4 w-1.5 rounded-full bg-primary"></div>
                    Deskripsi Produk
                  </h3>
                  <div class="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {{ product.description }}
                  </div>
                </div>

                <!-- Seller Card -->
                <div
                  class="group relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-6"
                >
                  <div
                    class="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-700 group-hover:scale-150"
                  ></div>

                  <div class="relative z-10 mb-6 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div class="relative">
                        <div
                          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-foreground shadow-xl transition-transform group-hover:scale-105"
                        >
                          {{ product.store?.name.charAt(0).toUpperCase() }}
                        </div>
                        <div
                          v-if="
                            product.store?.profile?.is_ktp_verified &&
                            product.store?.transactions_as_seller_count >= 5
                          "
                          class="absolute -bottom-1 -right-1 rounded-lg border-2 border-card bg-amber-400 p-1 text-white shadow-lg ring-1 ring-amber-500/20"
                        >
                          <ShieldCheck class="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <h4 class="text-lg font-black">
                            {{ product.store?.profile?.store_name ?? product.store?.name }}
                          </h4>
                          <div
                            v-if="
                              product.store?.profile?.is_ktp_verified &&
                              product.store?.transactions_as_seller_count >= 5
                            "
                            class="rounded bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-600"
                          >
                            Premium Seller
                          </div>
                        </div>
                        <div class="mt-1 flex items-center text-xs text-muted-foreground">
                          <MapPin class="mr-1 h-3 w-3" />
                          {{ product.store?.profile?.city || 'Lokasi tidak diisi' }}
                        </div>
                      </div>
                    </div>
                    <Link
                      :href="route('store.show', product.user_id)"
                      class="rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:bg-accent group-hover:border-primary/30"
                    >
                      <Store class="h-5 w-5 transition-transform group-hover:scale-110" />
                    </Link>
                  </div>

                  <div v-if="auth.user">
                    <div class="flex gap-4">
                      <Link
                        v-if="auth.user.id !== product.user_id"
                        :href="route('chat.initiate', product.slug)"
                        method="post"
                        as="button"
                        class="flex flex-1 transform items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-black text-primary-foreground shadow-xl transition-all duration-300 hover:bg-primary/90 active:scale-95"
                      >
                        <MessageCircle class="h-5 w-5" />
                        Chat Penjual
                      </Link>
                      <Link
                        v-else
                        :href="route('products.edit', product.slug)"
                        class="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-sm font-black text-accent-foreground shadow-xl transition-all duration-300 hover:bg-accent/80"
                      >
                        <Edit3 class="h-5 w-5" />
                        Edit Produk
                      </Link>

                      <!-- Favorite Toggle Button -->
                      <button
                        @click="toggleFavorite"
                        class="flex transform items-center justify-center rounded-2xl border-2 p-4 shadow-lg transition-all duration-300 active:scale-90"
                        :class="
                          isFavorited
                            ? 'border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100'
                            : 'border-border bg-background text-muted-foreground hover:border-blue-200 hover:text-blue-500'
                        "
                      >
                        <X v-if="isFavorited" class="h-6 w-6" />
                        <ShoppingCart v-else class="h-6 w-6" />
                      </button>
                    </div>

                    <!-- Report Button -->
                    <button
                      v-if="auth.user.id !== product.user_id"
                      @click="reportProduct"
                      class="mt-4 flex w-full items-center justify-center gap-2 py-2 text-xs font-bold text-muted-foreground transition-colors hover:text-amber-600"
                    >
                      <Flag class="h-3.5 w-3.5" />
                      Laporkan masalah pada produk ini
                    </button>
                  </div>
                  <Link
                    v-else
                    :href="route('login')"
                    class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-black text-primary-foreground shadow-xl"
                  >
                    Login untuk Chat & Keranjang
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal :show="showRemoveModal" @close="showRemoveModal = false" maxWidth="sm">
      <div class="rounded-2xl bg-white p-6 dark:bg-slate-900">
        <div class="mb-4 flex justify-center">
          <div class="rounded-full bg-red-100 p-3 text-red-500 dark:bg-red-500/20">
            <AlertTriangle class="h-8 w-8" />
          </div>
        </div>
        <h3 class="mb-2 text-center text-lg font-black text-slate-900 dark:text-white">
          Hapus dari Keranjang?
        </h3>
        <p class="mb-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Apakah Anda yakin ingin menghapus produk ini dari keranjang Anda?
        </p>
        <div class="flex gap-3">
          <button
            @click="showRemoveModal = false"
            class="flex-1 rounded-xl bg-slate-100 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Batal
          </button>
          <button
            @click="submitToggle"
            class="flex-1 rounded-xl bg-red-500 py-2.5 font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </Modal>
  </AppLayout>
</template>
