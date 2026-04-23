<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import axios from 'axios'
import AppLayout from '@/Layouts/AppLayout.vue'
import ProductCard from '@/Components/ProductCard.vue'
import { MessageCircle, MapPin, Store, Package, Star, ShieldCheck } from 'lucide-vue-next'

const props = defineProps({
  seller: Object,
  products: Object,
  stats: Object,
  reviews: Array,
})

const activeTab = ref('products')
const auth = usePage().props.auth
const loading = ref(false)

const allProducts = ref([...props.products.data])
const nextUrl = ref(props.products.next_page_url)
const loadMoreTrigger = ref(null)
let observer = null

const sellerInitial = computed(() => {
  const name = props.seller?.name ?? ''
  return name ? name.charAt(0).toUpperCase() : '?'
})

const buyerInitial = (buyer) => {
  const name = buyer?.name ?? ''
  return name ? name.charAt(0).toUpperCase() : '?'
}

const loadMore = async () => {
  if (!nextUrl.value || loading.value || activeTab.value !== 'products') return

  loading.value = true
  try {
    const response = await axios.get(nextUrl.value, {
      headers: {
        'X-Inertia': 'true',
        'X-Inertia-Version': usePage().version,
        'X-Inertia-Partial-Component': 'Store/Show',
        'X-Inertia-Partial-Data': 'products',
      },
    })

    const newProducts = response.data.props.products
    allProducts.value.push(...newProducts.data)
    nextUrl.value = newProducts.next_page_url
  } catch (error) {
    console.error('Error loading more store products:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { rootMargin: '200px' }
  )

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

watch(
  () => props.products,
  (newVal) => {
    if (newVal.current_page === 1) {
      allProducts.value = [...newVal.data]
    }
    nextUrl.value = newVal.next_page_url
  },
  { deep: true }
)

const formattedJoined = computed(() => props.stats.joined)
</script>

<template>
  <AppLayout>
    <Head :title="seller.profile?.store_name || seller.name" />

    <!-- Header Background -->
    <div
      class="h-48 bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 dark:from-gray-800 dark:to-gray-900"
    ></div>

    <div class="relative mx-auto -mt-24 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <!-- PROFILE CARD SECTION -->
      <div
        class="overflow-hidden rounded-[2.5rem] border border-border bg-card text-card-foreground shadow-2xl transition-all hover:shadow-primary/5"
      >
        <div class="md:flex">
          <!-- Kiri: Foto & Info Utama -->
          <div
            class="border-b border-border bg-muted/30 p-8 text-center md:w-1/3 md:border-b-0 md:border-r md:text-left"
          >
            <div class="relative inline-block">
              <div
                class="mx-auto h-32 w-32 overflow-hidden rounded-full bg-background p-1 shadow-lg ring-4 ring-primary/10 md:mx-0"
              >
                <img
                  v-if="seller.profile?.store_logo"
                  :src="'/storage/' + seller.profile.store_logo"
                  :alt="seller.name"
                  loading="lazy"
                  class="h-full w-full rounded-full object-cover"
                />
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center rounded-full bg-primary text-4xl font-black text-primary-foreground"
                >
                  {{ sellerInitial }}
                </div>
              </div>
              <span
                class="absolute bottom-2 right-2 block h-5 w-5 rounded-full bg-green-500 shadow-sm ring-4 ring-background"
                title="Online"
              ></span>
            </div>

            <div class="mt-4 flex items-center gap-2">
              <h1 class="text-2xl font-black">{{ seller.profile?.store_name || seller.name }}</h1>
              <div
                v-if="stats.is_premium"
                class="rounded-full bg-amber-400 p-1 text-white shadow-lg shadow-amber-500/30 ring-2 ring-white dark:ring-slate-900"
                title="Premium Seller"
              >
                <ShieldCheck class="h-4 w-4" />
              </div>
            </div>
            <p
              class="mt-1 flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground md:justify-start"
            >
              <MapPin class="h-3 w-3" />
              {{ seller.profile?.city || 'Lokasi tidak diisi' }}
            </p>

            <div class="mt-6 flex flex-col gap-3">
              <template v-if="auth.user && auth.user.id !== seller.id">
                <button
                  @click="alert('Fitur Chat segera hadir')"
                  class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-black text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90"
                >
                  <MessageCircle class="h-5 w-5" />
                  Chat Penjual
                </button>
              </template>
              <Link
                v-else-if="auth.user && auth.user.id === seller.id"
                :href="route('profile.edit')"
                class="w-full rounded-2xl border border-border bg-background px-4 py-3 text-center font-black text-foreground transition-all hover:bg-accent"
              >
                Edit Profil
              </Link>
              <Link
                v-else
                :href="route('login')"
                class="w-full rounded-2xl bg-primary px-4 py-3 text-center font-black text-primary-foreground shadow-xl transition-all"
              >
                Login untuk Chat
              </Link>
            </div>
          </div>

          <!-- Kanan: Statistik & Bio -->
          <div class="flex flex-col justify-between p-8 md:w-2/3">
            <div class="mb-10 grid grid-cols-3 gap-6 text-center">
              <div
                class="rounded-3xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted"
              >
                <span class="block text-3xl font-black text-foreground">{{ products.total }}</span>
                <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                  >Produk Aktif</span
                >
              </div>
              <div
                class="rounded-3xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted"
              >
                <span class="block text-3xl font-black text-foreground">{{ stats.sold }}</span>
                <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                  >Terjual</span
                >
              </div>
              <div
                class="rounded-3xl border border-border bg-muted/50 p-6 transition-colors hover:bg-muted"
              >
                <div class="flex items-center justify-center gap-1">
                  <span class="text-3xl font-black text-foreground">{{
                    stats.rating.toFixed(1)
                  }}</span>
                  <Star class="h-6 w-6 fill-current text-yellow-500" />
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                  >Rating Toko</span
                >
              </div>
            </div>

            <div class="prose dark:prose-invert max-w-none">
              <h3
                class="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground"
              >
                <div class="h-4 w-1.5 rounded-full bg-primary"></div>
                Tentang Toko
              </h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                {{
                  seller.profile?.store_bio ||
                  `Halo! Saya member GawaiSeken sejak ${formattedJoined}. Saya menjual barang elektronik bekas berkualitas. Silakan chat untuk bertanya detail kondisi barang.`
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex border-t border-border bg-card/50 backdrop-blur">
          <button
            @click="activeTab = 'products'"
            class="flex-1 border-b-2 py-5 text-sm font-black transition-all duration-300"
            :class="
              activeTab === 'products'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            "
          >
            Etalase ({{ products.total }})
          </button>
          <button
            @click="activeTab = 'reviews'"
            class="flex-1 border-b-2 py-5 text-sm font-black transition-all duration-300"
            :class="
              activeTab === 'reviews'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            "
          >
            Ulasan ({{ reviews.length }})
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="mt-12 transition-all duration-500">
        <!-- Products Tab -->
        <div v-if="activeTab === 'products'" class="animate-fade-in space-y-8">
          <div
            class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5"
          >
            <ProductCard
              v-for="product in allProducts"
              :key="product.id"
              :product="product"
              :auth="auth"
            />
          </div>

          <div
            v-if="allProducts.length === 0"
            class="col-span-full rounded-[2.5rem] border border-dashed border-border bg-card py-20 text-center shadow-sm"
          >
            <div
              class="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted"
            >
              <Package class="h-10 w-10 text-muted-foreground opacity-50" />
            </div>
            <h3 class="text-xl font-black text-foreground">Belum ada barang</h3>
            <p class="text-sm text-muted-foreground">Penjual ini belum memajang produk apapun.</p>
          </div>

          <!-- Load More Sentinel -->
          <div ref="loadMoreTrigger" class="mt-8 flex justify-center pb-4">
            <div v-if="loading" class="flex flex-col items-center gap-2">
              <div
                class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
              ></div>
              <span class="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >Sambil memuat...</span
              >
            </div>
            <div v-else-if="!nextUrl && allProducts.length > 0" class="py-4 text-center">
              <span class="text-xs font-bold uppercase tracking-widest text-muted-foreground/30"
                >Sekian koleksi dari {{ seller.profile?.store_name || seller.name }}</span
              >
            </div>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div v-if="activeTab === 'reviews'" class="animate-fade-in mx-auto max-w-3xl space-y-6">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div class="flex gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary font-black text-primary-foreground shadow-lg shadow-primary/10"
              >
                <img
                  v-if="review.buyer?.profile?.avatar"
                  :src="'/storage/' + review.buyer.profile.avatar"
                  loading="lazy"
                  class="h-full w-full object-cover"
                />
                <span v-else>{{ buyerInitial(review.buyer) }}</span>
              </div>
              <div class="flex-1">
                <div class="mb-2 flex items-center justify-between">
                  <h4 class="font-black text-foreground">{{ review.buyer?.name }}</h4>
                  <span class="text-[10px] font-bold text-muted-foreground">Ulasan Pelanggan</span>
                </div>
                <div class="mb-3 flex text-yellow-500">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    class="h-3 w-3"
                    :class="{ 'fill-current': i <= review.rating, 'text-muted': i > review.rating }"
                  />
                </div>
                <p class="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {{ review.comment }}
                </p>
                <div
                  v-if="review.product"
                  class="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[10px] font-bold text-muted-foreground"
                >
                  <Package class="h-3 w-3" />
                  {{ review.product.title }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="reviews.length === 0"
            class="rounded-[2.5rem] border border-dashed border-border bg-card py-20 text-center"
          >
            <p class="font-bold italic text-muted-foreground">Belum ada ulasan untuk toko ini.</p>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
