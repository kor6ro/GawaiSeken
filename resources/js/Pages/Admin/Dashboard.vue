<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import { Head, useForm, Link } from '@inertiajs/vue3'
import { ref } from 'vue'
import Modal from '@/Components/Modal.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'
import { Users, Package, AlertCircle, CheckSquare } from 'lucide-vue-next'

const props = defineProps({
  pendingVerifications: {
    type: Array,
    default: () => [],
  },
  pendingProductsCount: {
    type: Number,
    default: 0,
  },
  totalUsersCount: Number,
  totalProductsCount: Number,
})

const headers = [
  { text: "User", value: "user" },
  { text: "Email", value: "email" },
  { text: "Tanggal Pengajuan", value: "created_at" },
  { text: "Aksi", value: "actions", width: 150 },
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
</script>

<template>
  <Head title="Admin Dashboard" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-foreground">
        Admin Dashboard
      </h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <!-- Stats Summary -->
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link :href="route('admin.users.index')" class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Pengguna</h3>
                <p class="mt-2 text-3xl font-black text-foreground">{{ totalUsersCount || 0 }}</p>
              </div>
              <div class="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Users class="h-6 w-6" />
              </div>
            </div>
          </Link>

          <Link :href="route('admin.products.index')" class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Produk</h3>
                <p class="mt-2 text-3xl font-black text-foreground">{{ totalProductsCount || 0 }}</p>
              </div>
              <div class="rounded-xl bg-blue-500/10 p-3 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Package class="h-6 w-6" />
              </div>
            </div>
          </Link>

          <Link :href="route('admin.products.index', { status: 'pending' })" class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-amber-500 hover:shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pending Moderasi</h3>
                <p class="mt-2 text-3xl font-black text-amber-500">{{ pendingProductsCount }}</p>
              </div>
              <div class="rounded-xl bg-amber-500/10 p-3 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <AlertCircle class="h-6 w-6" />
              </div>
            </div>
          </Link>

          <Link :href="route('admin.disputes.index')" class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-red-500 hover:shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Komplain Aktif</h3>
                <p class="mt-2 text-3xl font-black text-red-500">{{ $page.props.pendingDisputesCount || 0 }}</p>
              </div>
              <div class="rounded-xl bg-red-500/10 p-3 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                <CheckSquare class="h-6 w-6" />
              </div>
            </div>
          </Link>
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
