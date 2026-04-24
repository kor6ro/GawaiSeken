<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import { Head, useForm, Link } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import Pagination from '@/Components/Pagination.vue'
import Modal from '@/Components/Modal.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'
import { Users, Package, AlertCircle, CheckSquare, ShieldCheck, Tag, ShoppingBag, LayoutDashboard, Search, Eye, Ban, CheckCircle2, XCircle, Trash2, ArrowRight, Settings } from 'lucide-vue-next'

const props = defineProps({
  pendingVerifications: Array,
  pendingVerificationsCount: Number,
  pendingProductsCount: Number,
  pendingDisputesCount: Number,
  totalUsersCount: Number,
  totalProductsCount: Number,
  products: Object,
  users: Object,
  disputes: Object,
  filters: Object,
})

const tab = ref(new URLSearchParams(window.location.search).get('tab') || 'overview')

watch(tab, (newTab) => {
  const url = new URL(window.location)
  url.searchParams.set('tab', newTab)
  window.history.pushState({}, '', url)
})

const headers = [
  { text: "User", value: "user" },
  { text: "Email", value: "email" },
  { text: "Tanggal Pengajuan", value: "created_at" },
  { text: "Aksi", value: "actions", width: 150 },
]

const userHeaders = [
  { text: "Nama", value: "user" },
  { text: "Email", value: "email" },
  { text: "Role", value: "role" },
  { text: "Produk", value: "products_count" },
  { text: "Status", value: "status" },
  { text: "Aksi", value: "actions", width: 100 },
]

const productHeaders = [
  { text: "Produk", value: "product" },
  { text: "Penjual", value: "seller" },
  { text: "Harga", value: "price" },
  { text: "Status", value: "status" },
  { text: "Aksi", value: "actions", width: 100 },
]

const disputeHeaders = [
  { text: "Referensi", value: "reference" },
  { text: "Pelapor", value: "reporter" },
  { text: "Tipe", value: "type" },
  { text: "Status", value: "status" },
  { text: "Aksi", value: "actions", width: 100 },
]

const selectedVerification = ref(null)
const isRejectModalOpen = ref(false)

const form = useForm({
  rejection_note: '',
})

const openReview = (verification) => {
  selectedVerification.value = verification
}

const closeReview = () => {
  selectedVerification.value = null
}

const approve = (verification) => {
  if (confirm('Apakah Anda yakin ingin menyetujui verifikasi ini?')) {
    useForm({}).post(route('admin.verifications.approve', verification.id), {
      onSuccess: () => closeReview(),
    })
  }
}

const openRejectModal = () => {
  isRejectModalOpen.value = true
}

const closeRejectModal = () => {
  isRejectModalOpen.value = false
  form.reset()
}

const reject = () => {
  form.post(route('admin.verifications.reject', selectedVerification.value.id), {
    onSuccess: () => {
      closeRejectModal()
      closeReview()
    },
  })
}

import { router, usePage } from '@inertiajs/vue3'

const toggleRekber = () => {
  const page = usePage()
  const isEnabled = page.props.settings?.rekber_enabled ?? false
  
  router.post(route('admin.settings.update'), {
    rekber_enabled: !isEnabled
  }, {
    preserveScroll: true
  })
}
</script>

<template>
  <Head title="Admin Dashboard" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-foreground">
        Admin Dashboard
      </h2>
    </template>

    <div class="py-8">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Tab Navigation -->
        <div class="mb-8 flex flex-wrap items-center gap-2 rounded-2xl bg-muted p-1.5 shadow-inner sm:w-fit">
          <button
            @click="tab = 'overview'"
            :class="tab === 'overview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
            class="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"
          >
            <LayoutDashboard class="h-4 w-4" /> Ringkasan
          </button>
          <button
            @click="tab = 'users'"
            :class="tab === 'users' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
            class="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"
          >
            <Users class="h-4 w-4" /> Pengguna
          </button>
          <button
            @click="tab = 'products'"
            :class="tab === 'products' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
            class="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"
          >
            <Package class="h-4 w-4" /> Produk
          </button>
          <button
            @click="tab = 'disputes'"
            :class="tab === 'disputes' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
            class="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"
          >
            <AlertCircle class="h-4 w-4" /> Komplain
          </button>
          <button
            @click="tab = 'settings'"
            :class="tab === 'settings' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
            class="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 sm:flex-none"
          >
            <Settings class="h-4 w-4" /> Pengaturan
          </button>
        </div>

        <!-- TAB CONTENT -->
        <div v-show="tab === 'overview'" class="transition-all duration-300">
          <!-- Stats Summary -->
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button @click="tab = 'users'" class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md text-left">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Pengguna</h3>
                <p class="mt-2 text-3xl font-black text-foreground">{{ totalUsersCount || 0 }}</p>
              </div>
              <div class="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Users class="h-6 w-6" />
              </div>
            </div>
          </button>

          <button @click="tab = 'products'" class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md text-left">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Produk</h3>
                <p class="mt-2 text-3xl font-black text-foreground">{{ totalProductsCount || 0 }}</p>
              </div>
              <div class="rounded-xl bg-blue-500/10 p-3 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Package class="h-6 w-6" />
              </div>
            </div>
          </button>

          <button @click="tab = 'products'" class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-amber-500 hover:shadow-md text-left">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pending Moderasi</h3>
                <p class="mt-2 text-3xl font-black text-amber-500">{{ pendingProductsCount }}</p>
              </div>
              <div class="rounded-xl bg-amber-500/10 p-3 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <AlertCircle class="h-6 w-6" />
              </div>
            </div>
          </button>

          <button @click="tab = 'disputes'" class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-red-500 hover:shadow-md text-left">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Komplain Aktif</h3>
                <p class="mt-2 text-3xl font-black text-red-500">{{ pendingDisputesCount || 0 }}</p>
              </div>
              <div class="rounded-xl bg-red-500/10 p-3 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                <CheckSquare class="h-6 w-6" />
              </div>
            </div>
          </button>
        </div>

        <!-- Verification Table -->
        <div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden">
          <div class="p-6">
            <h3 class="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
              <CheckSquare class="h-5 w-5 text-primary" />
              Daftar Pengajuan Verifikasi Seller
            </h3>
            
            <div class="easy-table-wrapper">
              <EasyDataTable
                :headers="headers"
                :items="pendingVerifications"
                hide-footer
                border-cell
                table-class-name="customize-table"
                header-class-name="customize-header"
              >
                <template #item-user="{ user }">
                  <span class="font-medium text-foreground">{{ user.name }}</span>
                </template>

                <template #item-email="{ user }">
                  <span class="text-muted-foreground">{{ user.email }}</span>
                </template>

                <template #item-created_at="{ created_at }">
                  <span class="text-muted-foreground">{{ new Date(created_at).toLocaleDateString('id-ID') }}</span>
                </template>

                <template #item-actions="item">
                  <div class="flex justify-end py-2">
                    <PrimaryButton @click="openReview(item)">Review KYC</PrimaryButton>
                  </div>
                </template>

                <template #empty-message>
                  <div class="py-12 text-center text-muted-foreground italic">
                    Tidak ada pengajuan verifikasi yang sedang menunggu.
                  </div>
                </template>
              </EasyDataTable>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: USERS -->
        <div v-show="tab === 'users'" class="transition-all duration-300">
          <div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold text-foreground flex items-center gap-2">
                  <Users class="h-5 w-5 text-primary" />
                  Manajemen Pengguna
                </h3>
              </div>

              <div class="easy-table-wrapper">
                <EasyDataTable
                  :headers="userHeaders"
                  :items="users.data"
                  hide-footer
                  border-cell
                  table-class-name="customize-table"
                  header-class-name="customize-header"
                >
                  <template #item-user="{ name, profile }">
                    <div class="flex items-center gap-3 py-2">
                      <div class="h-8 w-8 overflow-hidden rounded-full border border-border bg-muted">
                        <img v-if="profile?.avatar" :src="`/storage/${profile.avatar}`" class="h-full w-full object-cover" />
                        <div v-else class="flex h-full w-full items-center justify-center text-xs font-bold text-primary">{{ name.charAt(0) }}</div>
                      </div>
                      <span class="font-bold text-foreground">{{ name }}</span>
                    </div>
                  </template>

                  <template #item-role="{ role }">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border"
                      :class="role === 'admin' ? 'bg-red-50 text-red-600 border-red-200' : (role === 'seller' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-50 text-slate-600 border-slate-200')">
                      {{ role }}
                    </span>
                  </template>

                  <template #item-status="{ is_suspended }">
                    <span v-if="is_suspended" class="text-red-500 font-bold flex items-center gap-1 text-xs">
                      <Ban class="h-3 w-3" /> Suspended
                    </span>
                    <span v-else class="text-emerald-500 font-bold flex items-center gap-1 text-xs">
                      <CheckCircle2 class="h-3 w-3" /> Active
                    </span>
                  </template>

                  <template #item-actions="item">
                    <Link :href="route('admin.users.index', { search: item.email })" class="text-primary hover:underline font-bold text-xs">
                      Detail
                    </Link>
                  </template>
                </EasyDataTable>
              </div>
              <div class="mt-6">
                <Pagination :links="users.links" />
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 3: PRODUCTS -->
        <div v-show="tab === 'products'" class="transition-all duration-300">
          <div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold text-foreground flex items-center gap-2">
                  <Package class="h-5 w-5 text-blue-500" />
                  Moderasi Produk
                </h3>
              </div>

              <div class="easy-table-wrapper">
                <EasyDataTable
                  :headers="productHeaders"
                  :items="products.data"
                  hide-footer
                  border-cell
                  table-class-name="customize-table"
                  header-class-name="customize-header"
                >
                  <template #item-product="{ title, images }">
                    <div class="flex items-center gap-3 py-2">
                      <div class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                        <img v-if="images?.length > 0" :src="`/storage/${images[0].image_path}`" class="h-full w-full object-cover" />
                      </div>
                      <span class="font-bold text-foreground truncate max-w-[200px]">{{ title }}</span>
                    </div>
                  </template>

                  <template #item-seller="{ user }">
                    <span class="text-sm text-muted-foreground">{{ user.name }}</span>
                  </template>

                  <template #item-price="{ price }">
                    <span class="font-bold text-foreground">Rp {{ new Intl.NumberFormat('id-ID').format(price) }}</span>
                  </template>

                  <template #item-status="{ status }">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border"
                      :class="{
                        'bg-amber-50 text-amber-600 border-amber-200': status === 'pending',
                        'bg-emerald-50 text-emerald-600 border-emerald-200': status === 'active',
                        'bg-red-50 text-red-600 border-red-200': ['rejected', 'banned'].includes(status)
                      }">
                      {{ status }}
                    </span>
                  </template>

                  <template #item-actions="item">
                    <Link :href="route('admin.products.index', { search: item.title })" class="text-primary hover:underline font-bold text-xs">
                      Kelola
                    </Link>
                  </template>
                </EasyDataTable>
              </div>
              <div class="mt-6">
                <Pagination :links="products.links" />
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 4: DISPUTES -->
        <div v-show="tab === 'disputes'" class="transition-all duration-300">
          <div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold text-foreground flex items-center gap-2">
                  <AlertCircle class="h-5 w-5 text-red-500" />
                  Pusat Resolusi (Disputes)
                </h3>
              </div>

              <div class="easy-table-wrapper">
                <EasyDataTable
                  :headers="disputeHeaders"
                  :items="disputes.data"
                  hide-footer
                  border-cell
                  table-class-name="customize-table"
                  header-class-name="customize-header"
                >
                  <template #item-reference="{ transaction }">
                    <span class="font-bold text-foreground">#{{ transaction.reference_number }}</span>
                  </template>

                  <template #item-reporter="{ user }">
                    <span class="text-sm text-muted-foreground">{{ user.name }}</span>
                  </template>

                  <template #item-type="{ reason }">
                    <span class="text-xs text-foreground italic">"{{ reason }}"</span>
                  </template>

                  <template #item-status="{ status }">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border"
                      :class="status === 'pending' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'">
                      {{ status }}
                    </span>
                  </template>

                  <template #item-actions="item">
                    <Link :href="route('admin.disputes.show', item.id)" class="text-primary hover:underline font-bold text-xs flex items-center gap-1">
                      Resolusi <ArrowRight class="h-3 w-3" />
                    </Link>
                  </template>
                </EasyDataTable>
              </div>
              <div class="mt-6">
                <Pagination :links="disputes.links" />
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 5: SETTINGS -->
        <div v-show="tab === 'settings'" class="transition-all duration-300">
          <div class="bg-card border border-border shadow sm:rounded-2xl overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold text-foreground flex items-center gap-2">
                  <Settings class="h-5 w-5 text-gray-500" />
                  Pengaturan Sistem
                </h3>
              </div>
              <div class="space-y-4">
                <div class="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <h4 class="font-bold text-foreground">Fitur Rekber</h4>
                    <p class="text-sm text-muted-foreground">Aktifkan atau nonaktifkan fitur pembayaran menggunakan Rekber. Saat ini dimatikan sementara karena payment gateway belum diapprove.</p>
                  </div>
                  <button
                    @click="toggleRekber"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    :class="[ $page.props.settings?.rekber_enabled ? 'bg-primary' : 'bg-muted' ]"
                  >
                    <span
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      :class="[ $page.props.settings?.rekber_enabled ? 'translate-x-5' : 'translate-x-0' ]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Review Detail Modal -->
    <Modal :show="!!selectedVerification" @close="closeReview" maxWidth="2xl">
      <div class="p-6">
        <header class="mb-6">
          <h2 class="text-xl font-bold text-foreground">
            Review Verifikasi: {{ selectedVerification?.user.name }}
          </h2>
          <p class="text-sm text-muted-foreground">Silakan periksa dokumen berikut dengan teliti.</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground uppercase tracking-wider">Foto KTP</h4>
            <div class="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
              <img 
                :src="'/storage/' + selectedVerification?.ktp_image_path" 
                class="absolute inset-0 h-full w-full object-cover" 
              />
              <a 
                :src="'/storage/' + selectedVerification?.ktp_image_path" 
                target="_blank" 
                class="absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
              >
                Buka Fullsize
              </a>
            </div>
          </div>
          <div class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground uppercase tracking-wider">Foto Wajah</h4>
            <div class="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
              <img 
                :src="'/storage/' + selectedVerification?.face_image_path" 
                class="absolute inset-0 h-full w-full object-cover" 
              />
              <a 
                :src="'/storage/' + selectedVerification?.face_image_path" 
                target="_blank" 
                class="absolute bottom-2 right-2 rounded-lg bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md hover:bg-black/70 transition-colors"
              >
                Buka Fullsize
              </a>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-end gap-3 border-t border-border pt-6">
          <SecondaryButton @click="closeReview">Tutup</SecondaryButton>
          <DangerButton @click="openRejectModal">Tolak</DangerButton>
          <PrimaryButton @click="approve(selectedVerification)">Setujui Verifikasi</PrimaryButton>
        </div>
      </div>
    </Modal>

    <!-- Rejection Note Modal -->
    <Modal :show="isRejectModalOpen" @close="closeRejectModal" maxWidth="md">
      <div class="p-6">
        <h2 class="text-lg font-bold text-foreground">
          Konfirmasi Penolakan
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          Berikan alasan mengapa pengajuan verifikasi ini ditolak agar user dapat memperbaikinya.
        </p>

        <div class="mt-6">
          <InputLabel for="rejection_note" value="Alasan Penolakan" />
          <TextInput
            id="rejection_note"
            type="text"
            class="mt-1 block w-full"
            v-model="form.rejection_note"
            placeholder="Contoh: Foto KTP buram atau tidak sesuai."
            required
          />
          <InputError class="mt-2" :message="form.errors.rejection_note" />
        </div>

        <div class="mt-8 flex justify-end gap-3">
          <SecondaryButton @click="closeRejectModal">Batal</SecondaryButton>
          <DangerButton @click="reject" :disabled="form.processing">
            Tolak Sekarang
          </DangerButton>
        </div>
      </div>
    </Modal>
  </AuthenticatedLayout>
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
