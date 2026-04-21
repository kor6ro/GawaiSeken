<script setup>
import { ref, computed } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import {
  ImageOff,
  MapPin,
  Star,
  ShoppingCart,
  X,
  Flag,
  ShieldCheck,
  Zap,
  Clock,
  Handshake,
  AlertTriangle,
} from 'lucide-vue-next'
import Modal from '@/Components/Modal.vue'

const props = defineProps({
  product: Object,
  auth: Object,
})

const activeImage = ref(0)
const showRemoveModal = ref(false)

// Favorite Status
const isFavorited = computed(() => {
  return props.auth.user?.favorites?.includes(props.product.id)
})

const toggleFavorite = () => {
  if (!props.auth.user) {
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
  if (!props.auth.user) {
    router.get(route('login'))
    return
  }
  // Simple report for now, could be a modal later
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

// Helper for "Time Ago"
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return 'Baru saja'
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes}m`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}j`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}hr`

  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

const isNewPosting = computed(() => {
  const hours = (new Date() - new Date(props.product.created_at)) / (1000 * 60 * 60)
  return hours < 24
})

const isPremiumSeller = computed(() => {
  return (
    props.product.store?.profile?.is_ktp_verified &&
    props.product.store?.transactions_as_seller_count >= 5
  )
})

const conditionBadgeClass = computed(() => {
  const color = props.product.condition_badge_color
  if (color === 'green') return 'bg-emerald-600 text-white'
  if (color === 'yellow') return 'bg-amber-500 text-white'
  return 'bg-slate-500 text-white'
})
</script>

<template>
  <div
    class="product-card-container group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 will-change-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 dark:border-white/5 dark:bg-slate-900"
  >
    <!-- Main Product Link -->
    <Link :href="route('products.show', product.slug)" class="absolute inset-0 z-10"></Link>

    <!-- Top LEFT: Grouped Minimalist Badges -->
    <div class="pointer-events-none absolute left-2.5 top-2.5 z-20 flex flex-col gap-1">
      <div
        v-if="isNewPosting"
        class="flex items-center gap-1 rounded-md bg-emerald-500 py-0.5 pl-1 pr-2 text-[8px] font-black uppercase tracking-wider text-white shadow-sm"
      >
        <Zap class="h-2.5 w-2.5 fill-current" />
        <span>Baru</span>
      </div>
      <div
        v-if="product.is_cod"
        class="flex items-center gap-1 rounded-md bg-blue-500 py-0.5 pl-1 pr-2 text-[8px] font-black uppercase tracking-wider text-white shadow-sm"
      >
        <Handshake class="h-2.5 w-2.5" />
        <span>COD</span>
      </div>
      <div
        v-if="product.is_negotiable"
        class="flex items-center gap-1 rounded-md bg-indigo-500 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white shadow-sm"
      >
        <span>Nego</span>
      </div>
    </div>

    <!-- Top RIGHT: Actions (Favorite & Flag) - Clean Solid Background -->
    <div class="absolute right-2.5 top-2.5 z-20 flex flex-col gap-1.5">
      <button
        @click.stop="toggleFavorite"
        class="group/heart rounded-full border border-slate-200 bg-white p-2 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-slate-800"
        :class="
          isFavorited ? 'text-rose-500 hover:text-rose-600' : 'text-slate-400 hover:text-blue-500'
        "
      >
        <X v-if="isFavorited" class="h-3.5 w-3.5" />
        <ShoppingCart v-else class="h-3.5 w-3.5" />
      </button>
      <button
        @click.stop="reportProduct"
        class="rounded-full border border-slate-200 bg-white p-2 text-slate-400 shadow-sm transition-all duration-200 hover:scale-105 hover:text-amber-500 dark:border-white/10 dark:bg-slate-800"
      >
        <Flag class="h-3.5 w-3.5" />
      </button>
    </div>

    <!-- Image Gallery Container -->
    <div class="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800/50">
      <template v-if="product.images && product.images.length > 0">
        <img
          :src="`/storage/${product.images[activeImage].image_path}`"
          :alt="product.title"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <!-- Hover Dots -->
        <div
          v-if="product.images.length > 1"
          class="absolute bottom-2.5 left-0 right-0 z-20 flex justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div
            v-for="(_, index) in product.images"
            :key="index"
            @mouseenter="activeImage = index"
            class="h-1 rounded-full transition-all duration-300"
            :class="activeImage === index ? 'w-4 bg-white shadow-sm' : 'w-1 bg-white/40'"
          ></div>
        </div>
      </template>
      <div
        v-else
        class="flex h-full flex-col items-center justify-center text-slate-300 dark:text-slate-700"
      >
        <ImageOff class="mb-1 h-10 w-10 stroke-[1.5]" />
        <span class="text-[8px] font-black uppercase tracking-widest">No Image</span>
      </div>

      <!-- Condition (Bottom Left) - Solid Contrast (Hidden on small mobile to save space if needed, or smaller) -->
      <div class="absolute bottom-1.5 left-1.5 z-20">
        <span
          :class="[
            conditionBadgeClass,
            'whitespace-nowrap rounded-lg border border-white/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest shadow-lg sm:text-[9px]',
          ]"
        >
          {{ product.condition }}
        </span>
      </div>
    </div>

    <!-- Body Content -->
    <div class="flex flex-grow flex-col p-4">
      <!-- Price: Most Prominent -->
      <div
        class="mb-1 text-xl font-black leading-tight tracking-tight text-primary dark:text-blue-400 sm:text-2xl"
      >
        Rp{{ new Intl.NumberFormat('id-ID').format(product.price) }}
      </div>

      <!-- Title: Second most prominent -->
      <h3
        class="mb-3 line-clamp-1 text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-primary dark:text-slate-100 sm:text-base"
      >
        {{ product.title }}
      </h3>

      <!-- Secondary Info (Condition & Store) -->
      <div class="mt-auto space-y-3">
        <div class="flex items-center justify-between gap-2 overflow-hidden">
          <div class="flex min-w-0 items-center gap-1.5">
            <!-- Condition Text -->
            <span
              class="shrink-0 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 sm:text-xs"
            >
              {{ product.condition }}
            </span>

            <span class="h-1 w-1 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700"></span>

            <!-- Store Name -->
            <Link
              :href="route('store.show', product.user_id)"
              class="z-20 truncate text-[10px] font-bold text-slate-500 transition-colors hover:text-primary dark:text-slate-400 sm:text-xs"
            >
              {{ product.store.profile?.store_name ?? product.store.name }}
            </Link>
          </div>

          <!-- Rating -->
          <div
            v-if="product.store.reviews_as_seller_avg_rating"
            class="flex shrink-0 items-center gap-0.5 text-[10px] font-bold text-amber-500 sm:text-xs"
          >
            <Star class="h-2.5 w-2.5 fill-current sm:h-3 sm:w-3" />
            <span>{{ Number(product.store.reviews_as_seller_avg_rating).toFixed(1) }}</span>
          </div>
        </div>

        <!-- Footer Meta (Location & Time) -->
        <div
          class="flex items-center justify-between border-t border-slate-100 pt-2.5 text-[9px] text-slate-400 dark:border-white/5 sm:text-[10px]"
        >
          <div class="flex items-center gap-1 truncate">
            <MapPin class="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
            <span class="truncate">{{ product.store.profile?.city ?? 'Lokasi N/A' }}</span>
          </div>
          <div
            class="flex shrink-0 items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 dark:bg-slate-800/50"
          >
            <Clock class="h-2.5 w-2.5" />
            <span>{{ formatTimeAgo(product.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove Modal -->
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
  </div>
</template>

<style scoped>
.product-card-container {
  /* Native windowing/virtualization rendering */
  content-visibility: auto;
  contain-intrinsic-size: auto 320px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
