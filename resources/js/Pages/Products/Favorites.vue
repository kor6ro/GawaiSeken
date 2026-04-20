<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import axios from 'axios'
import AppLayout from '@/Layouts/AppLayout.vue'
import ProductCard from '@/Components/ProductCard.vue'
import { ShoppingCart, Package } from 'lucide-vue-next'

const props = defineProps({
  products: Object,
  auth: Object,
})

const loading = ref(false)
const allProducts = ref([...props.products.data])
const nextUrl = ref(props.products.next_page_url)
const loadMoreTrigger = ref(null)
let observer = null

const loadMore = async () => {
  if (!nextUrl.value || loading.value) return

  loading.value = true
  try {
    const response = await axios.get(nextUrl.value, {
      headers: {
        'X-Inertia': 'true',
        'X-Inertia-Version': usePage().version,
        'X-Inertia-Partial-Component': 'Products/Favorites',
        'X-Inertia-Partial-Data': 'products',
      },
    })

    const newProducts = response.data.props.products
    allProducts.value.push(...newProducts.data)
    nextUrl.value = newProducts.next_page_url
  } catch (error) {
    console.error('Error loading more favorites:', error)
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
</script>

<template>
  <AppLayout>
    <Head title="Keranjang Saya" />

    <div class="min-h-screen bg-slate-50 py-12 dark:bg-slate-950">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-10 flex items-center gap-4">
          <div class="rounded-2xl bg-primary p-3 shadow-lg shadow-primary/20">
            <ShoppingCart class="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-black text-slate-900 dark:text-white">Keranjang Saya</h1>
            <p class="font-medium text-slate-500 dark:text-slate-400">
              Produk yang Anda taruh di keranjang.
            </p>
          </div>
        </div>

        <div v-if="allProducts.length > 0" class="space-y-8">
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

          <!-- Load More Sentinel -->
          <div ref="loadMoreTrigger" class="mt-12 flex justify-center pb-8">
            <div v-if="loading" class="flex flex-col items-center gap-2">
              <div
                class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
              ></div>
              <span class="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >Memuat favorit...</span
              >
            </div>
            <div v-else-if="!nextUrl && allProducts.length > 0" class="py-4 text-center">
              <div class="flex items-center gap-3 text-muted-foreground/30">
                <div class="h-px w-8 bg-current"></div>
                <span class="text-[10px] font-black uppercase tracking-[0.2em]"
                  >Ini semua barang favorit Anda</span
                >
                <div class="h-px w-8 bg-current"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="mb-4 rounded-full bg-slate-50 p-6 dark:bg-slate-800">
            <Package class="h-12 w-12 text-slate-300 dark:text-slate-600" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">Keranjang Kosong</h3>
          <p class="mb-8 mt-2 text-slate-500 dark:text-slate-400">
            Anda belum memasukkan produk apapun ke keranjang.
          </p>
          <Link
            :href="route('home')"
            class="rounded-2xl bg-primary px-8 py-3 font-black text-white shadow-xl shadow-primary/20 transition-all hover:scale-105"
          >
            Cari Produk Sekarang
          </Link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
