<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import { Head, useForm } from '@inertiajs/vue3'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import { ref } from 'vue'

const props = defineProps({
  verification: {
    type: Object,
  },
})

const form = useForm({
  ktp_image: null,
  face_image: null,
})

const ktpPreview = ref(null)
const facePreview = ref(null)

const handleKtpChange = (e) => {
  const file = e.target.files[0]
  form.ktp_image = file
  if (file) {
    ktpPreview.value = URL.createObjectURL(file)
  }
}

const handleFaceChange = (e) => {
  const file = e.target.files[0]
  form.face_image = file
  if (file) {
    facePreview.value = URL.createObjectURL(file)
  }
}

const submit = () => {
  form.post(route('seller.verification.store'), {
    forceFormData: true,
    onSuccess: () => {
      form.reset()
    },
  })
}
</script>

<template>
  <Head title="Verifikasi Seller" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-foreground">Verifikasi Seller (KYC)</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-card border border-border shadow sm:rounded-2xl">
          <div class="p-6">
            <!-- Status Alert -->
            <div v-if="verification" class="mb-6">
              <div
                v-if="verification.status === 'pending'"
                class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
              >
                <p class="font-bold">Verifikasi Sedang Diproses</p>
                <p>Dokumen Anda telah kami terima dan sedang dalam tahap peninjauan oleh tim admin.</p>
              </div>
              <div
                v-else-if="verification.status === 'approved'"
                class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
              >
                <p class="font-bold">Verifikasi Disetujui</p>
                <p>Selamat! Akun Anda telah terverifikasi sebagai seller.</p>
              </div>
              <div
                v-else-if="verification.status === 'rejected'"
                class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
              >
                <p class="font-bold">Verifikasi Ditolak</p>
                <p>{{ verification.rejection_note }}</p>
                <p class="mt-2">Silakan unggah kembali dokumen yang valid.</p>
              </div>
            </div>

            <header class="mb-6">
              <h3 class="text-lg font-medium">Unggah Dokumen</h3>
              <p class="text-sm text-muted-foreground">
                Mohon unggah foto KTP dan foto wajah Anda untuk memverifikasi identitas sebagai seller.
              </p>
            </header>

            <form @submit.prevent="submit" class="space-y-6">
              <div>
                <InputLabel for="ktp_image" value="Foto KTP" />
                <input
                  type="file"
                  id="ktp_image"
                  class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  @change="handleKtpChange"
                  accept="image/*"
                />
                <div v-if="ktpPreview" class="mt-2">
                  <img :src="ktpPreview" class="h-40 w-auto rounded-lg shadow-md" />
                </div>
                <InputError class="mt-2" :message="form.errors.ktp_image" />
              </div>

              <div>
                <InputLabel for="face_image" value="Foto Wajah (Selfie)" />
                <input
                  type="file"
                  id="face_image"
                  class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  @change="handleFaceChange"
                  accept="image/*"
                />
                <div v-if="facePreview" class="mt-2">
                  <img :src="facePreview" class="h-40 w-auto rounded-lg shadow-md" />
                </div>
                <InputError class="mt-2" :message="form.errors.face_image" />
              </div>

              <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing">
                  Unggah Dokumen Verifikasi
                </PrimaryButton>
                <Transition
                  enter-from-class="opacity-0"
                  leave-to-class="opacity-0"
                  class="transition ease-in-out"
                >
                  <p v-if="form.recentlySuccessful" class="text-sm text-green-600 font-bold">
                    Tersimpan.
                  </p>
                </Transition>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
