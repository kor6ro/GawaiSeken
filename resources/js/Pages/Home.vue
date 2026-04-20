<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Head, Link, router, usePage } from '@inertiajs/vue3'
import axios from 'axios'
import AppLayout from '@/Layouts/AppLayout.vue'
import ProductCard from '@/Components/ProductCard.vue'
import Pagination from '@/Components/Pagination.vue'
import Modal from '@/Components/Modal.vue'
import { SlidersHorizontal, Search, Cpu, HardDrive, Package, ArrowUpDown, X } from 'lucide-vue-next'
import debounce from 'lodash/debounce'
import pickBy from 'lodash/pickBy'

const props = defineProps({
  products: Object,
  categories: Array,
  rams: Array,
  storages: Array,
  kelengkapan: Array,
  filters: Object,
  auth: Object,
})

const filterModalOpen = ref(false)
const search = ref(props.filters.search || '')
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
        'X-Inertia-Partial-Component': 'Home',
        'X-Inertia-Partial-Data': 'products',
      },
    })

    const newProducts = response.data.props.products
    allProducts.value.push(...newProducts.data)
    nextUrl.value = newProducts.next_page_url
  } catch (error) {
    console.error('Error loading more products:', error)
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

const filterParams = ref({
  category: props.filters.category || '',
  ram: props.filters.ram || '',
  storage: props.filters.storage || '',
  kelengkapan: props.filters.kelengkapan || '',
  sort: props.filters.sort || 'latest',
})

const performSearch = debounce(() => {
  loading.value = true

  let params = pickBy(
    {
      search: search.value,
      ...filterParams.value,
    },
    (value, key) => {
      if (key === 'sort' && value === 'latest') return false
      return value !== '' && value !== null && value !== undefined
    }
  )

  router.get(route('home'), params, {
    preserveState: true,
    preserveScroll: true,
    onFinish: () => (loading.value = false),
  })
}, 500)

watch(
  () => props.filters.search,
  (newVal) => {
    search.value = newVal || ''
  }
)

watch(search, () => {
  performSearch()
})

const applyFilters = () => {
  filterModalOpen.value = false

  let params = pickBy(
    {
      search: search.value,
      ...filterParams.value,
    },
    (value, key) => {
      if (key === 'sort' && value === 'latest') return false
      return value !== '' && value !== null && value !== undefined
    }
  )

  router.get(route('home'), params, {
    preserveState: true,
  })
}

const resetFilters = () => {
  search.value = ''
  filterParams.value = {
    category: '',
    ram: '',
    storage: '',
    kelengkapan: '',
    sort: 'latest',
  }
  applyFilters()
}

const hasActiveFilters = () => {
  return (
    filterParams.value.category ||
    filterParams.value.ram ||
    filterParams.value.storage ||
    filterParams.value.kelengkapan ||
    (filterParams.value.sort && filterParams.value.sort !== 'latest') ||
    search.value
  )
}
</script>

<template>
  <AppLayout>
    <Head title="Home" />

    <div class="px-4 py-8">
      <div class="mx-auto max-w-7xl">
        <!-- Active Filters Info (Optional, simple version) -->
        <div
          v-if="hasActiveFilters()"
          class="mb-6 flex items-center justify-between rounded-xl border border-border bg-card p-4"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span class="mr-2 text-sm font-medium text-muted-foreground">Hasil untuk:</span>
            <span
              v-if="search"
              class="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
              >"{{ search }}"</span
            >
            <span
              v-if="filterParams.category"
              class="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-foreground"
              >{{ filterParams.category }}</span
            >
            <span
              v-if="filterParams.ram"
              class="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-foreground"
              >RAM: {{ filterParams.ram }}</span
            >
            <span
              v-if="filterParams.storage"
              class="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold text-foreground"
              >ROM: {{ filterParams.storage }}</span
            >
          </div>
          <button @click="resetFilters" class="text-xs font-bold text-red-500 hover:underline">
            Hapus Semua
          </button>
        </div>

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
          class="col-span-full rounded-2xl border border-dashed border-border bg-card py-20 text-center text-card-foreground transition-colors"
        >
          <div
            class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700"
          >
            <Search class="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Tidak ditemukan</h3>
          <p class="mt-1 text-gray-500 dark:text-gray-400">
            Coba kata kunci lain atau reset filter.
          </p>
          <button
            @click="resetFilters"
            class="mt-4 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Reset Filter
          </button>
        </div>

        <!-- Load More / Infinite Scroll Sentinel -->
        <div ref="loadMoreTrigger" class="mt-12 flex justify-center">
          <div v-if="loading" class="flex flex-col items-center gap-2">
            <div
              class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
            ></div>
            <span class="text-xs font-bold uppercase tracking-widest text-muted-foreground"
              >Memuat barang...</span
            >
          </div>
          <div v-else-if="!nextUrl && allProducts.length > 0" class="py-8 text-center">
            <div class="flex items-center gap-3 text-muted-foreground/40">
              <div class="h-px w-8 bg-current"></div>
              <span class="text-[10px] font-black uppercase tracking-[0.2em]"
                >Semua produk telah ditampilkan</span
              >
              <div class="h-px w-8 bg-current"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
