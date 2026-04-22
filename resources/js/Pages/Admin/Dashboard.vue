<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import Modal from '@/Components/Modal.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import InputLabel from '@/Components/InputLabel.vue'
import InputError from '@/Components/InputError.vue'

const props = defineProps({
  pendingVerifications: {
    type: Array,
    default: () => [],
  },
  pendingProductsCount: {
    type: Number,
    default: 0,
  },
})

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
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 class="text-sm font-medium text-muted-foreground">Menunggu Verifikasi Seller</h3>
            <p class="mt-2 text-3xl font-bold text-foreground">{{ pendingVerifications.length }}</p>
          </div>
          <Link :href="route('admin.products.index', { status: 'pending' })" class="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary transition-colors">
            <h3 class="text-sm font-medium text-muted-foreground">Produk Menunggu Moderasi</h3>
            <p class="mt-2 text-3xl font-bold text-foreground">{{ pendingProductsCount }}</p>
          </Link>
          <Link :href="route('admin.disputes.index')" class="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-red-500 transition-colors">
            <h3 class="text-sm font-medium text-muted-foreground">Komplain Transaksi</h3>
            <p class="mt-2 text-3xl font-bold text-red-500">{{ $page.props.pendingDisputesCount || 0 }}</p>
          </Link>
        </div>

        <!-- Verification Table -->
        <div class="overflow-hidden bg-card border border-border shadow sm:rounded-2xl">
          <div class="p-6">
            <h3 class="mb-4 text-lg font-bold text-foreground">Daftar Pengajuan Verifikasi Seller</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm text-foreground">
                <thead class="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground font-semibold">
                  <tr>
                    <th class="px-6 py-4">User</th>
                    <th class="px-6 py-4">Email</th>
                    <th class="px-6 py-4">Tanggal Pengajuan</th>
                    <th class="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr v-for="verification in pendingVerifications" :key="verification.id" class="hover:bg-muted/50 transition-colors">
                    <td class="px-6 py-4 font-medium">{{ verification.user.name }}</td>
                    <td class="px-6 py-4 text-muted-foreground">{{ verification.user.email }}</td>
                    <td class="px-6 py-4 text-muted-foreground">{{ new Date(verification.created_at).toLocaleDateString('id-ID') }}</td>
                    <td class="px-6 py-4 text-right">
                      <PrimaryButton @click="openReview(verification)">Review KYC</PrimaryButton>
                    </td>
                  </tr>
                  <tr v-if="pendingVerifications.length === 0">
                    <td colspan="4" class="px-6 py-8 text-center text-muted-foreground italic">
                      Tidak ada pengajuan verifikasi yang sedang menunggu.
                    </td>
                  </tr>
                </tbody>
              </table>
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
                :href="'/storage/' + selectedVerification?.ktp_image_path" 
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
                :href="'/storage/' + selectedVerification?.face_image_path" 
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
