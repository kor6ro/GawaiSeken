<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import ApplicationLogo from '@/Components/ApplicationLogo.vue'
import NavLink from '@/Components/NavLink.vue'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue'
import Dropdown from '@/Components/Dropdown.vue'
import DropdownLink from '@/Components/DropdownLink.vue'
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Home,
  LayoutDashboard,
  PlusCircle,
  MessageSquare,
  Settings,
  ShoppingCart,
  Search,
  SlidersHorizontal,
  Cpu,
  HardDrive,
  Package,
  ArrowUpDown,
  Store,
  ShoppingBag,
  Gavel,
} from 'lucide-vue-next'
import { router } from '@inertiajs/vue3'
import debounce from 'lodash/debounce'
import Modal from '@/Components/Modal.vue'
import pickBy from 'lodash/pickBy'
import { setupOnlinePresence } from '@/onlineState'
import { isDark, toggleTheme, initTheme } from '@/themeState'

const page = usePage()
const { props: pageProps } = page
const auth = pageProps.auth
const globalFilters = pageProps.global_filters
const initialFilters = pageProps.active_filters
const toastVisible = ref(false)
const toastText = ref('')
const toastType = ref('success')
let toastTimer = null

const flashText = computed(
  () =>
    page.props.flash?.status ||
    page.props.flash?.success ||
    page.props.flash?.message ||
    page.props.flash?.error ||
    ''
)

const flashType = computed(() => (page.props.flash?.error ? 'error' : 'success'))

const filterModalOpen = ref(false)
const search = ref(initialFilters.search || '')

const filterParams = ref({
  category: initialFilters.category || '',
  ram: initialFilters.ram || '',
  storage: initialFilters.storage || '',
  kelengkapan: initialFilters.kelengkapan || '',
  sort: initialFilters.sort || 'latest',
})

const performSearch = debounce(() => {
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
  })
}, 500)

watch(search, () => {
  performSearch()
})

const applyFilters = () => {
  filterModalOpen.value = false
  performSearch()
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

const showingNavigationDropdown = ref(false)

onMounted(() => {
  initTheme()

  const checkEcho = setInterval(() => {
    if (window.Echo) {
      clearInterval(checkEcho)
      setupOnlinePresence()
    }
  }, 100)
  setTimeout(() => clearInterval(checkEcho), 5000)
})

watch(
  flashText,
  (message) => {
    if (!message) return

    toastText.value = message
    toastType.value = flashType.value
    toastVisible.value = true

    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastVisible.value = false
    }, 2800)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (toastTimer) clearTimeout(toastTimer)
})


</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors duration-100">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="toastVisible"
        class="fixed right-4 top-20 z-[70] rounded-xl px-4 py-2.5 text-xs font-bold shadow-xl sm:right-6"
        :class="
          toastType === 'error'
            ? 'border border-red-200 bg-red-50 text-red-700'
            : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
        "
      >
        {{ toastText }}
      </div>
    </Transition>

    <nav
      class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur transition-colors duration-100 supports-[backdrop-filter]:bg-background/60"
    >
      <!-- Primary Navigation Menu -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex items-center">
            <!-- Logo -->
            <div class="mr-6 flex shrink-0 items-center">
              <Link :href="route('home')">
                <ApplicationLogo class="h-auto w-28" />
              </Link>
            </div>

            <!-- Navigation Icons Group -->
            <div class="hidden h-8 items-center gap-1 border-l border-border/50 pl-4 sm:flex">
              <Link
                :href="route('home')"
                :class="[
                  route().current('home')
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                ]"
                class="group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"
                title="Home"
              >
                <Home class="h-5 w-5 transition-transform group-hover:scale-110" />
                <span class="hidden text-sm font-bold md:block">Beranda</span>
              </Link>

              <template v-if="auth.user">
                <Link
                  v-if="auth.user.role === 'admin'"
                  :href="route('admin.dashboard')"
                  :class="[
                    route().current('admin.*')
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  ]"
                  class="group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"
                  title="Admin Panel"
                >
                  <LayoutDashboard class="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span class="hidden text-sm font-bold md:block">Admin</span>
                </Link>

                <Link
                  v-if="auth.user.role === 'seller'"
                  :href="route('dashboard')"
                  :class="[
                    route().current('dashboard')
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  ]"
                  class="group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"
                  title="Dashboard"
                >
                  <LayoutDashboard class="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span class="hidden text-sm font-bold md:block">Dashboard</span>
                </Link>

                <Link
                  v-if="auth.user.role !== 'admin'"
                  :href="route('chat.index')"
                  :class="[
                    route().current('chat.*')
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  ]"
                  class="group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"
                  title="Pesan"
                >
                  <MessageSquare class="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span class="hidden text-sm font-bold md:block">Pesan</span>
                  <span
                    v-if="auth.user.unread_messages_count > 0"
                    class="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background"
                  >
                    {{ auth.user.unread_messages_count > 9 ? '9+' : auth.user.unread_messages_count }}
                  </span>
                </Link>

                <Link
                  v-if="auth.user.role !== 'admin'"
                  :href="route('buyer.dashboard')"
                  :class="[
                    route().current('buyer.dashboard')
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  ]"
                  class="group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-100"
                  title="Aktivitas Saya"
                >
                  <ShoppingCart class="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span class="hidden text-sm font-bold md:block">Aktivitas</span>
                  <span
                    v-if="auth.user.favorites?.length > 0"
                    class="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-background bg-primary shadow-sm"
                  ></span>
                </Link>
              </template>
            </div>
          </div>

          <!-- Right Side Actions (Desktop) -->
          <div class="hidden gap-1 sm:flex sm:items-center">
            <!-- Global Search & Filter -->
            <div v-if="$page.component === 'Home'" class="mr-2 flex items-center gap-2">
              <div class="group relative">
                <div
                  class="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3 transition-colors"
                >
                  <Search class="h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
                </div>
                <input
                  type="text"
                  v-model="search"
                  placeholder="Cari gadget..."
                  class="w-40 rounded-xl border-transparent bg-muted/60 py-1.5 pl-9 pr-4 text-sm transition-all duration-100 placeholder:text-muted-foreground/70 focus:border-border focus:bg-background focus:ring-2 focus:ring-primary/20 lg:w-56"
                />
              </div>
              <button
                @click="filterModalOpen = true"
                class="group relative rounded-xl bg-muted/60 p-2 text-muted-foreground transition-all hover:bg-accent hover:text-primary"
                title="Filter Pencarian"
              >
                <SlidersHorizontal class="h-4 w-4" />
                <span
                  v-if="hasActiveFilters()"
                  class="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-background bg-primary"
                ></span>
              </button>
            </div>

            <!-- Secondary Actions (Love, Theme) -->
            <div class="mr-2 flex items-center gap-1 border-r border-border/50 px-2">
              <!-- Mode (Theme Toggle) -->
              <button
                @click="toggleTheme"
                type="button"
                class="rounded-xl p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground focus:outline-none"
              >
                <Sun v-if="isDark" class="h-5 w-5" />
                <Moon v-else class="h-5 w-5" />
              </button>
            </div>

            <!-- User Dropdown -->
            <div v-if="auth.user" class="relative">
              <Dropdown align="right" width="48">
                <template #trigger>
                  <button
                    type="button"
                    class="group inline-flex items-center gap-2.5 rounded-2xl border border-border/40 bg-muted/20 px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:border-primary/30 hover:bg-muted/40 focus:outline-none"
                  >
                    <div
                      class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary/10 text-xs font-bold uppercase text-primary shadow-sm"
                    >
                      <img
                        v-if="auth.user.role === 'seller' && auth.user.profile?.store_logo"
                        :src="`/storage/${auth.user.profile.store_logo}`"
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <img
                        v-else-if="auth.user.profile?.avatar"
                        :src="`/storage/${auth.user.profile.avatar}`"
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <template v-else>
                        {{ auth.user.name.charAt(0) }}
                      </template>
                    </div>
                    
                    <div class="hidden text-left lg:block">
                      <div class="max-w-[110px] truncate text-[12px] font-bold text-foreground leading-tight">
                        {{ auth.user.role === 'seller' ? (auth.user.profile?.store_name || auth.user.name) : auth.user.name }}
                      </div>
                      <div class="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-0.5 opacity-60">
                        {{ auth.user.role }}
                      </div>
                    </div>

                    <ChevronDown class="h-3.5 w-3.5 text-muted-foreground/50 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                </template>

                <template #content>
                  <div class="px-4 py-2.5 border-b border-border/50 bg-muted/5">
                    <p class="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Email</p>
                    <p class="truncate text-xs font-bold text-foreground mt-0.5">{{ auth.user.email }}</p>
                  </div>
                  <div class="p-1">
                    <DropdownLink v-if="auth.user.role === 'admin'" :href="route('admin.dashboard')">
                      <LayoutDashboard class="mr-2 inline h-3.5 w-3.5 text-primary" /> Admin Panel
                    </DropdownLink>
                    <DropdownLink :href="route('profile.edit')">
                      <User class="mr-2 inline h-3.5 w-3.5" /> Profil Saya
                    </DropdownLink>
                    <DropdownLink
                      v-if="auth.user.role === 'buyer'"
                      :href="route('seller.verification.create')"
                      class="text-primary font-bold"
                    >
                      <Store class="mr-2 inline h-3.5 w-3.5" /> Jadi Penjual
                    </DropdownLink>
                  </div>
                  <div class="border-t border-border/40 p-1">
                    <DropdownLink :href="route('logout')" method="post" as="button" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors">
                      <LogOut class="mr-2 inline h-3.5 w-3.5" /> Log Out
                    </DropdownLink>
                  </div>
                </template>
              </Dropdown>
            </div>

            <div v-else class="flex items-center gap-2 pl-2">
              <Link
                :href="route('login')"
                class="px-3 text-xs font-bold text-foreground transition hover:text-primary"
              >
                Login
              </Link>
              <Link
                :href="route('register')"
                class="inline-flex items-center rounded-xl border border-transparent bg-primary px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-sm transition duration-150 hover:bg-primary/90"
              >
                Daftar
              </Link>
            </div>
          </div>

          <!-- Mobile Toggle -->
          <div class="-me-2 flex items-center gap-1 sm:hidden">
            <button
              @click="toggleTheme"
              type="button"
              class="rounded-lg p-2.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Sun v-if="isDark" class="h-5 w-5" />
              <Moon v-else class="h-5 w-5" />
            </button>
            <Link
              v-if="auth.user && auth.user.role !== 'admin'"
              :href="route('chat.index')"
              class="group relative rounded-lg p-2.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <MessageSquare class="h-5 w-5" />
              <span
                v-if="auth.user.unread_messages_count > 0"
                class="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-background"
              >
                {{ auth.user.unread_messages_count > 9 ? '9+' : auth.user.unread_messages_count }}
              </span>
            </Link>
            <button
              @click="showingNavigationDropdown = !showingNavigationDropdown"
              class="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition duration-150 ease-in-out hover:bg-accent hover:text-foreground focus:outline-none"
            >
              <Menu v-if="!showingNavigationDropdown" class="h-6 w-6" />
              <X v-else class="h-6 w-6" />
            </button>
          </div>
        </div>

        <!-- Mobile Search Bar (Only Visible on Home) -->
        <div v-if="$page.component === 'Home'" class="pb-3 pt-2 sm:hidden">
          <div class="flex gap-2">
            <div class="group relative flex-1">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3 transition-colors"
              >
                <Search class="h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
              </div>
              <input
                type="text"
                v-model="search"
                placeholder="Cari gadget..."
                class="w-full rounded-xl border-transparent bg-muted/60 py-2 pl-10 pr-4 text-sm transition-all duration-100 placeholder:text-muted-foreground/70 focus:border-border focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              @click="filterModalOpen = true"
              class="group relative rounded-xl bg-muted/60 p-2 text-muted-foreground transition-all hover:bg-accent hover:text-primary"
              title="Filter Pencarian"
            >
              <SlidersHorizontal class="h-5 w-5" />
              <span
                v-if="hasActiveFilters()"
                class="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-background bg-primary"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Responsive Navigation Menu -->
      <div
        :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
        class="border-t border-border bg-background shadow-2xl sm:hidden"
      >
        <!-- Mobile Drawer Header (User Card) -->
        <div v-if="auth.user" class="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background p-6">
          <div class="relative z-10 flex items-center gap-4">
            <div class="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-primary/20 bg-muted shadow-lg">
              <img v-if="auth.user.role === 'seller' && auth.user.profile?.store_logo" :src="`/storage/${auth.user.profile.store_logo}`" class="h-full w-full object-cover" />
              <img v-else-if="auth.user.profile?.avatar" :src="`/storage/${auth.user.profile.avatar}`" class="h-full w-full object-cover" />
              <div v-else class="flex h-full w-full items-center justify-center text-xl font-black text-primary/40">
                {{ auth.user.name.charAt(0) }}
              </div>
            </div>
            <div class="flex-1 overflow-hidden">
              <div class="flex items-center gap-2">
                <h3 class="truncate text-lg font-black text-foreground tracking-tight">
                  {{ auth.user.role === 'seller' ? (auth.user.profile?.store_name || auth.user.name) : auth.user.name }}
                </h3>
                <span class="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-primary-foreground shadow-sm">
                  {{ auth.user.role }}
                </span>
              </div>
              <p class="truncate text-xs font-medium text-muted-foreground mt-0.5">{{ auth.user.email }}</p>
            </div>
            <Link :href="route('profile.edit')" class="rounded-xl bg-card border border-border p-2 text-muted-foreground shadow-sm transition hover:bg-accent hover:text-primary">
              <Settings class="h-5 w-5" />
            </Link>
          </div>
          <!-- Decorative Background Element -->
          <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
        </div>

        <!-- Mobile Navigation Items -->
        <div class="pb-6 pt-2">
          <div class="space-y-1 px-3">
            <ResponsiveNavLink :href="route('home')" :active="route().current('home')">
              <div class="flex items-center gap-3"><Home class="h-5 w-5" /> Home</div>
            </ResponsiveNavLink>

            <template v-if="auth.user">
              <ResponsiveNavLink
                v-if="auth.user.role === 'seller'"
                :href="route('dashboard')"
                :active="route().current('dashboard')"
              >
                <div class="flex items-center gap-3">
                  <LayoutDashboard class="h-5 w-5" /> Seller Dashboard
                </div>
              </ResponsiveNavLink>

              <div class="my-3 border-t border-border/50 mx-4"></div>

                <ResponsiveNavLink :href="route('buyer.dashboard')" :active="route().current('buyer.dashboard')">
                  <div class="flex items-center gap-3">
                    <ShoppingCart class="h-5 w-5" /> Aktivitas Saya
                  </div>
                </ResponsiveNavLink>

              <ResponsiveNavLink
                v-if="auth.user.role === 'buyer'"
                :href="route('seller.verification.create')"
                class="mt-4"
              >
                <div class="flex items-center gap-3 font-bold text-primary">
                  <Store class="h-5 w-5" /> Jadi Penjual
                </div>
              </ResponsiveNavLink>

              <div class="my-3 border-t border-border/50 mx-4"></div>

              <ResponsiveNavLink
                :href="route('logout')"
                method="post"
                as="button"
                class="font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <div class="flex items-center gap-3"><LogOut class="h-5 w-5" /> Log Out</div>
              </ResponsiveNavLink>
            </template>

            <template v-else>
              <div class="space-y-3 p-3">
                <Link
                  :href="route('login')"
                  class="block w-full rounded-2xl border border-border bg-card py-3 text-center text-sm font-bold text-foreground shadow-sm transition hover:bg-accent"
                >
                  Login
                </Link>
                <Link
                  :href="route('register')"
                  class="block w-full rounded-2xl bg-primary py-3 text-center text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                >
                  Daftar Akun Baru
                </Link>
              </div>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Global Filter Modal -->
    <Modal :show="filterModalOpen" @close="filterModalOpen = false">
      <div class="bg-background p-6 text-foreground transition-colors duration-100">
        <div class="mb-6 flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 class="text-xl font-bold">Filter Pencarian</h2>
            <p class="mt-1 text-xs text-muted-foreground">Sesuaikan hasil sesuai kebutuhan Anda</p>
          </div>
          <button
            @click="filterModalOpen = false"
            class="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-accent"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <div class="mb-6">
          <h4 class="mb-3 text-sm font-bold uppercase tracking-wider">Kategori</h4>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <label
              v-for="cat in globalFilters.categories"
              :key="cat.id"
              class="group relative cursor-pointer"
            >
              <input
                type="radio"
                v-model="filterParams.category"
                :value="cat.slug"
                class="peer sr-only"
              />
              <div
                class="rounded-xl border border-border px-3 py-2.5 text-center text-xs font-bold transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
              >
                {{ cat.name }}
              </div>
            </label>
            <label class="group relative cursor-pointer">
              <input type="radio" v-model="filterParams.category" value="" class="peer sr-only" />
              <div
                class="rounded-xl border border-border px-3 py-2.5 text-center text-xs font-bold transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
              >
                Semua
              </div>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h4
            class="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary"
          >
            <Cpu class="h-4 w-4" /> RAM
          </h4>
          <div class="flex flex-wrap gap-2">
            <label
              v-for="ram in globalFilters.rams"
              :key="ram"
              class="group relative cursor-pointer"
            >
              <input type="radio" v-model="filterParams.ram" :value="ram" class="peer sr-only" />
              <span
                class="rounded-lg border border-border bg-background px-3 py-1.5 text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground"
              >
                {{ ram }}
              </span>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h4
            class="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary"
          >
            <HardDrive class="h-4 w-4" /> Penyimpanan
          </h4>
          <div class="flex flex-wrap gap-2">
            <label
              v-for="storage in globalFilters.storages"
              :key="storage"
              class="group relative cursor-pointer"
            >
              <input
                type="radio"
                v-model="filterParams.storage"
                :value="storage"
                class="peer sr-only"
              />
              <span
                class="rounded-lg border border-border bg-background px-3 py-1.5 text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground"
              >
                {{ storage }}
              </span>
            </label>
          </div>
        </div>

        <div class="mb-8">
          <h4
            class="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary"
          >
            <ArrowUpDown class="h-4 w-4" /> Urutkan
          </h4>
          <div class="grid grid-cols-2 gap-3">
            <label class="group relative cursor-pointer">
              <input type="radio" v-model="filterParams.sort" value="latest" class="peer sr-only" />
              <div
                class="rounded-xl border border-border px-3 py-2.5 text-center text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground"
              >
                Terbaru
              </div>
            </label>
            <label class="group relative cursor-pointer">
              <input type="radio" v-model="filterParams.sort" value="oldest" class="peer sr-only" />
              <div
                class="rounded-xl border border-border px-3 py-2.5 text-center text-[10px] font-bold transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground"
              >
                Terlama
              </div>
            </label>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 border-t border-border pt-6">
          <button
            @click="resetFilters"
            class="px-4 text-xs font-bold text-red-500 transition-colors hover:text-red-600"
          >
            Reset
          </button>
          <button
            @click="applyFilters"
            class="rounded-xl bg-primary px-8 py-2 text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
          >
            Terapkan
          </button>
        </div>
      </div>
    </Modal>

    <!-- Page Heading -->
    <header v-if="$slots.header" class="border-b border-border bg-card shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <slot name="header" />
      </div>
    </header>

    <!-- Page Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="mt-20 border-t border-border bg-card py-12 shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div class="flex items-center gap-4">
            <ApplicationLogo class="h-8 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
            <div class="h-6 w-px bg-border"></div>
            <p class="text-xs font-bold tracking-widest uppercase text-muted-foreground">&copy; {{ new Date().getFullYear() }} GawaiSeken.</p>
          </div>
          <div class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
            <Link :href="route('about')" class="hover:text-primary transition-colors">Tentang Kami</Link>
            <Link :href="route('contact')" class="hover:text-primary transition-colors">Hubungi Kami</Link>
            <Link :href="route('privacy')" class="hover:text-primary transition-colors">Kebijakan Privasi</Link>
            <Link :href="route('terms')" class="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
