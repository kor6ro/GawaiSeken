<script setup>
import { ref, computed, reactive } from 'vue'
import { Head, Link, usePage, router, useForm } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import BackButton from '@/Components/BackButton.vue'
import {
  ChevronLeft, Home, ChevronRight, ExternalLink, Globe, ArrowRight,
  MapPin, Store, MessageCircle, Edit3, ShieldCheck,
  ShoppingCart, X, Flag, AlertTriangle, Heart,
  HandCoins, Truck, Users, CheckCircle, Clock, ArrowRightLeft,
} from 'lucide-vue-next'
import Modal from '@/Components/Modal.vue'

const props = defineProps({
  product: Object,
  myNegotiation: Object,
  myActiveTransaction: Object,
})

const auth = usePage().props.auth

const activeImage = ref(
  props.product.images.length > 0
    ? `/storage/${props.product.images[0].image_path}`
    : '/images/placeholder-product.png'
)

// ── Modals
const showRemoveModal = ref(false)
const showCodModal = ref(false)

// ── Forms
const codForm = useForm({ payment_method: 'cod', cod_location: '', cod_scheduled_at: '', negotiation_id: null })
const negoForm = useForm({ proposed_price: Math.floor(Number(props.product.price)), message: '' })

const submitCod = () => {
  if (props.myNegotiation?.status === 'accepted') codForm.negotiation_id = props.myNegotiation.id
  codForm.post(route('transactions.checkout', props.product.slug), {
    onSuccess: () => { showCodModal.value = false },
  })
}

const submitNego = () => {
  negoForm.post(route('negotiations.store', props.product.slug), {
    onSuccess: () => { showNegoModal.value = false },
  })
}

const acceptCounter = () => {
  router.post(route('negotiations.accept-counter', props.myNegotiation.id), {}, { preserveScroll: true })
}

// ── Favorite
const isFavorited = computed(() => auth.user?.favorites?.includes(props.product.id))

const toggleFavorite = () => {
  if (!auth.user) { router.get(route('login')); return }
  if (isFavorited.value) showRemoveModal.value = true
  else submitToggle()
}

const submitToggle = () => {
  showRemoveModal.value = false
  router.post(route('products.toggle-favorite', props.product.id), {}, { preserveScroll: true })
}

const reportProduct = () => {
  if (!auth.user) { router.get(route('login')); return }
  const reason = prompt('Alasan melaporkan produk ini?')
  if (reason) router.post(route('products.report', props.product.id), { reason }, { preserveScroll: true })
}

// ── Helpers
const fmt = (n) => new Intl.NumberFormat('id-ID').format(n)

const specifications = computed(() => {
  if (!props.product.specifications) return []
  return Object.entries(props.product.specifications)
    .filter(([k, v]) => v !== null && v !== '' && k !== 'sub_type')
    .map(([k, v]) => ({
      label: k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: Array.isArray(v) ? v.join(', ') : v,
    }))
})

const negoStatusLabel = computed(() => {
  const s = props.myNegotiation?.status
  if (s === 'pending') return { text: 'Menunggu respons seller', color: 'text-amber-500' }
  if (s === 'countered') return { text: 'Seller kirim counter-offer!', color: 'text-blue-500' }
  if (s === 'accepted') return { text: 'Penawaran diterima! Lanjutkan checkout', color: 'text-emerald-600' }
  return null
})

const isOwner = computed(() => auth.user?.id === props.product.user_id)
const hasActiveTransaction = computed(() => !!props.myActiveTransaction)

// Produk ini menggunakan route checkout dengan product slug
const checkoutRoute = computed(() => route('transactions.checkout', props.product.slug))
</script>

<template>
  <AppLayout>
    <Head :title="product.title" />

    <template #header>
      <div class="flex items-center gap-3">
        <BackButton fallbackRoute="home" />
        <h2 class="text-xl font-semibold leading-tight text-foreground">Detail Produk</h2>
      </div>
    </template>

    <div class="min-h-screen bg-background py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                    >{{ product.condition_label }}</span
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
                          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary overflow-hidden shadow-xl transition-transform group-hover:scale-105"
                        >
                          <img 
                            v-if="product.store?.profile?.store_logo" 
                            :src="`/storage/${product.store.profile.store_logo}`" 
                            class="h-full w-full object-cover" 
                          />
                          <span v-else class="text-xl font-black text-primary-foreground">
                            {{ (product.store?.profile?.store_name ?? product.store?.name).charAt(0).toUpperCase() }}
                          </span>
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
                      :href="route('store.show', product.store?.id ?? product.user_id)"
                      class="rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:bg-accent group-hover:border-primary/30"
                    >
                      <Store class="h-5 w-5 transition-transform group-hover:scale-110" />
                    </Link>
                  </div>

                  <!-- OWNER: edit button -->
                  <div v-if="isOwner" class="flex gap-3">
                    <Link :href="route('products.edit', product.slug)"
                      class="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-sm font-black text-accent-foreground shadow-xl transition-all hover:bg-accent/80">
                      <Edit3 class="h-5 w-5" /> Edit Produk
                    </Link>
                  </div>

                  <!-- NOT LOGGED IN -->
                  <Link v-else-if="!auth.user" :href="route('login')"
                    class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-black text-primary-foreground shadow-xl">
                    Login untuk Beli / Chat
                  </Link>

                  <!-- BUYER ACTIONS -->
                  <div v-else class="space-y-3">

                    <!-- Active Transaction Banner -->
                    <div v-if="hasActiveTransaction"
                      class="flex items-center gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-sm text-amber-700 dark:text-amber-400">
                      <Clock class="h-5 w-5 shrink-0" />
                      <div>
                        <p class="font-black">Transaksi Sedang Berjalan</p>
                        <p class="text-xs mt-0.5">Anda sudah memiliki transaksi aktif untuk produk ini.</p>
                      </div>
                      <Link :href="route('profile.orders')" class="ml-auto shrink-0 text-xs font-black underline">Lihat</Link>
                    </div>

                    <!-- Negotiation Status Banner -->
                    <div v-if="myNegotiation && !hasActiveTransaction"
                      class="rounded-2xl border p-4 space-y-2"
                      :class="{
                        'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700': myNegotiation.status === 'pending',
                        'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700': myNegotiation.status === 'countered',
                        'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700': myNegotiation.status === 'accepted',
                      }">
                      <div class="flex items-center gap-2">
                        <HandCoins class="h-4 w-4" />
                        <span class="text-xs font-black uppercase tracking-wider" :class="negoStatusLabel?.color">{{ negoStatusLabel?.text }}</span>
                      </div>
                      <div class="text-xs space-y-1">
                        <p>Penawaran Anda: <strong>Rp {{ fmt(myNegotiation.proposed_price) }}</strong></p>
                        <p v-if="myNegotiation.counter_price">Counter Seller: <strong>Rp {{ fmt(myNegotiation.counter_price) }}</strong></p>
                        <p v-if="myNegotiation.agreed_price">Harga Disepakati: <strong class="text-emerald-600">Rp {{ fmt(myNegotiation.agreed_price) }}</strong></p>
                      </div>
                      <!-- Accept counter-offer -->
                      <button v-if="myNegotiation.status === 'countered'" @click="acceptCounter"
                        class="w-full rounded-xl bg-blue-500 py-2.5 text-xs font-black text-white hover:bg-blue-600 transition">
                        Terima Counter-Offer Seller
                      </button>
                    </div>

                    <!-- Main Action Buttons -->
                    <div v-if="!hasActiveTransaction" class="flex flex-col gap-2">
                      <!-- Beli COD -->
                      <button v-if="product.is_cod" @click="showCodModal = true"
                        class="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-blue-500 bg-blue-500/10 py-4 text-sm font-black text-blue-600 dark:text-blue-400 transition hover:bg-blue-500/20 active:scale-95">
                        <Users class="h-5 w-5" />
                        Beli via COD (Ketemu Langsung)
                      </button>

                      <!-- Nego -->
                      <button v-if="product.is_negotiable && !myNegotiation" @click="showNegoModal = true"
                        class="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-indigo-400 bg-indigo-400/10 py-4 text-sm font-black text-indigo-600 dark:text-indigo-400 transition hover:bg-indigo-400/20 active:scale-95">
                        <HandCoins class="h-5 w-5" />
                        Tawar Harga
                      </button>

                      <!-- Chat -->
                      <Link :href="route('chat.initiate', product.slug)" method="post" as="button"
                        class="flex w-full items-center justify-center gap-2 rounded-2xl border border-border py-3 text-sm font-bold text-muted-foreground transition hover:bg-accent active:scale-95">
                        <MessageCircle class="h-4 w-4" /> Chat Penjual
                      </Link>
                    </div>

                    <!-- Favorite + Report -->
                    <div class="flex items-center gap-2 pt-1">
                      <button @click="toggleFavorite"
                        class="flex items-center justify-center rounded-2xl border-2 p-3 transition active:scale-90"
                        :class="isFavorited ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-border text-muted-foreground hover:text-rose-500'">
                        <Heart class="h-5 w-5" :class="{ 'fill-current': isFavorited }" />
                      </button>
                      <button @click="reportProduct"
                        class="flex flex-1 items-center justify-center gap-1 py-2 text-xs font-bold text-muted-foreground hover:text-amber-600 transition">
                        <Flag class="h-3.5 w-3.5" /> Laporkan produk ini
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Hapus Favorit -->
    <Modal :show="showRemoveModal" @close="showRemoveModal = false" maxWidth="sm">
      <div class="rounded-2xl bg-white p-6 dark:bg-slate-900">
        <div class="mb-4 flex justify-center">
          <div class="rounded-full bg-red-100 p-3 text-red-500 dark:bg-red-500/20">
            <AlertTriangle class="h-8 w-8" />
          </div>
        </div>
        <h3 class="mb-2 text-center text-lg font-black text-slate-900 dark:text-white">Hapus dari Favorit?</h3>
        <div class="flex gap-3 mt-4">
          <button @click="showRemoveModal = false" class="flex-1 rounded-xl bg-slate-100 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">Batal</button>
          <button @click="submitToggle" class="flex-1 rounded-xl bg-red-500 py-2.5 font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600">Ya, Hapus</button>
        </div>
      </div>
    </Modal>



    <!-- Modal: Beli via COD -->
    <Modal :show="showCodModal" @close="showCodModal = false" maxWidth="md">
      <div class="bg-card text-card-foreground rounded-2xl p-6">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-4">
          <div class="rounded-2xl bg-blue-500/10 p-3">
            <Users class="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 class="text-xl font-black">Beli via COD</h3>
            <p class="text-xs text-muted-foreground">Ketemu langsung, bayar langsung ke penjual</p>
          </div>
        </div>

        <!-- Highlight: Tanpa Biaya Admin -->
        <div class="mb-5 rounded-2xl border-2 border-green-400/40 bg-green-50 dark:bg-green-900/10 px-4 py-3 flex items-center gap-3">
          <CheckCircle class="h-5 w-5 shrink-0 text-green-500" />
          <div>
            <p class="text-sm font-black text-green-700 dark:text-green-400">Tanpa Biaya Admin Platform!</p>
            <p class="text-xs text-green-600 dark:text-green-500">COD adalah transaksi langsung antara Anda dan penjual. Tidak ada potongan dari platform.</p>
          </div>
        </div>

        <!-- Price box -->
        <div class="rounded-2xl bg-muted/50 border border-border p-4 mb-5 space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Harga Produk</span>
            <span class="font-bold">Rp {{ fmt(myNegotiation?.status === 'accepted' ? myNegotiation.agreed_price : product.price) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Biaya Admin Platform</span>
            <span class="font-black text-green-600">GRATIS ✓</span>
          </div>
          <div class="flex justify-between border-t border-border pt-2">
            <span class="font-bold">Bayar ke Seller Saat Meetup</span>
            <span class="font-black text-orange-600">Rp {{ fmt(myNegotiation?.status === 'accepted' ? myNegotiation.agreed_price : product.price) }}</span>
          </div>
        </div>

        <!-- Alur COD -->
        <div class="mb-5 rounded-xl border border-blue-200 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800 p-4">
          <p class="mb-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Alur COD (4 Langkah)</p>
          <ol class="space-y-1 text-xs text-muted-foreground">
            <li class="flex items-center gap-2"><span class="text-blue-400 font-bold">①</span> Anda kirim permintaan COD + usul lokasi &amp; jadwal</li>
            <li class="flex items-center gap-2"><span class="text-blue-400 font-bold">②</span> Penjual setujui atau ubah lokasi &amp; jadwal meetup</li>
            <li class="flex items-center gap-2"><span class="text-blue-400 font-bold">③</span> Meetup terjadi &rarr; penjual tandai selesai setelah menerima uang</li>
            <li class="flex items-center gap-2"><span class="text-blue-400 font-bold">④</span> Anda konfirmasi &rarr; transaksi selesai, produk dikunci sebagai <strong>Terjual</strong></li>
          </ol>
        </div>

        <form @submit.prevent="submitCod" class="space-y-4">
          <div>
            <label class="block text-xs font-black uppercase tracking-wider mb-1.5">Usul Lokasi Pertemuan <span class="text-red-500">*</span></label>
            <input v-model="codForm.cod_location" type="text" required placeholder="Contoh: Alfamart Jl. Sudirman No. 12, Minimarket terdekat..."
              class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/30" />
            <p v-if="codForm.errors.cod_location" class="text-xs text-red-500 mt-1">{{ codForm.errors.cod_location }}</p>
            <p class="text-[10px] text-muted-foreground mt-1">Penjual dapat mengkonfirmasi atau menyesuaikan lokasi ini.</p>
          </div>
          <div>
            <label class="block text-xs font-black uppercase tracking-wider mb-1.5">Usul Jadwal Pertemuan <span class="text-red-500">*</span></label>
            <input v-model="codForm.cod_scheduled_at" type="datetime-local" required
              class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/30" />
            <p v-if="codForm.errors.cod_scheduled_at" class="text-xs text-red-500 mt-1">{{ codForm.errors.cod_scheduled_at }}</p>
          </div>
          <div class="flex gap-3 pt-1">
            <button type="button" @click="showCodModal = false" class="flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80">Batal</button>
            <button type="submit" :disabled="codForm.processing"
              class="flex-1 rounded-xl bg-blue-500 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-600 disabled:opacity-60">
              {{ codForm.processing ? 'Memproses...' : 'Kirim Permintaan COD' }}
            </button>
          </div>
        </form>
      </div>
    </Modal>

    <!-- Modal: Nego -->
    <Modal :show="showNegoModal" @close="showNegoModal = false" maxWidth="md">
      <div class="bg-card text-card-foreground rounded-2xl p-6">
        <h3 class="text-xl font-black mb-1">Tawar Harga</h3>
        <p class="text-sm text-muted-foreground mb-5">Harga asli: <strong>Rp {{ fmt(product.price) }}</strong>. Penawaran harus lebih rendah.</p>
        <form @submit.prevent="submitNego" class="space-y-4">
          <div>
            <label class="block text-xs font-black uppercase tracking-wider mb-1.5">Harga Penawaran (Rp) <span class="text-red-500">*</span></label>
            <input v-model="negoForm.proposed_price" type="number" required :max="product.price - 1" min="1000"
              placeholder="Masukkan harga penawaran..."
              class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30" />
            <p v-if="negoForm.errors.proposed_price" class="text-xs text-red-500 mt-1">{{ negoForm.errors.proposed_price }}</p>
          </div>
          <div>
            <label class="block text-xs font-black uppercase tracking-wider mb-1.5">Pesan (Opsional)</label>
            <textarea v-model="negoForm.message" rows="2" placeholder="Alasan penawaran Anda..."
              class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 resize-none"></textarea>
          </div>
          <div class="flex gap-3">
            <button type="button" @click="showNegoModal = false" class="flex-1 rounded-xl bg-muted py-3 font-bold text-sm transition hover:bg-muted/80">Batal</button>
            <button type="submit" :disabled="negoForm.processing"
              class="flex-1 rounded-xl bg-indigo-500 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600 disabled:opacity-60">
              {{ negoForm.processing ? 'Mengirim...' : 'Kirim Penawaran' }}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  </AppLayout>
</template>
