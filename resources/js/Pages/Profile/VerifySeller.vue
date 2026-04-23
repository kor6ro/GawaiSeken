<script setup>
import AuthenticatedLayout from '@/Layouts/AppLayout.vue'
import { Head, useForm, Link } from '@inertiajs/vue3'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import Modal from '@/Components/Modal.vue'
import { ref, computed, onBeforeUnmount } from 'vue'
import {
  ShieldCheck,
  Clock,
  XCircle,
  CheckCircle2,
  Upload,
  CreditCard,
  Camera as CameraIcon,
  AlertCircle,
  ArrowRight,
  Store,
  RotateCcw,
  X,
} from 'lucide-vue-next'

const props = defineProps({
  verification: {
    type: Object,
    default: null,
  },
})

const form = useForm({
  ktp_image: null,
  face_image: null,
})

const ktpPreview = ref(null)
const facePreview = ref(null)

// Camera State
const isCameraOpen = ref(false)
const cameraType = ref(null) // 'ktp' or 'face'
const video = ref(null)
const canvas = ref(null)
const stream = ref(null)
const cameraError = ref(null)

const handleKtpChange = (e) => {
  const file = e.target.files[0]
  if (file) setKtpFile(file)
}

const handleFaceChange = (e) => {
  const file = e.target.files[0]
  if (file) setFaceFile(file)
}

const setKtpFile = (file) => {
  form.ktp_image = file
  ktpPreview.value = URL.createObjectURL(file)
}

const setFaceFile = (file) => {
  form.face_image = file
  facePreview.value = URL.createObjectURL(file)
}

const openCamera = async (type) => {
  cameraType.value = type
  isCameraOpen.value = true
  cameraError.value = null

  // Cek apakah browser mendukung getUserMedia
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    cameraError.value = "Browser Anda tidak mendukung akses kamera."
    return
  }

  // Cek Secure Context (HTTPS/Localhost)
  if (!window.isSecureContext) {
    cameraError.value = "Akses kamera memerlukan koneksi aman (HTTPS). Silakan gunakan HTTPS atau akses melalui localhost."
    return
  }
  
  try {
    const constraints = {
      video: { 
        facingMode: type === 'face' ? 'user' : 'environment',
        // Gunakan resolusi yang lebih fleksibel
        width: { min: 640, ideal: 1280 },
        height: { min: 480, ideal: 720 }
      }
    }
    stream.value = await navigator.mediaDevices.getUserMedia(constraints)
    if (video.value) {
      video.value.srcObject = stream.value
    }
  } catch (err) {
    console.error("Camera access error:", err)
    if (err.name === 'NotAllowedError') {
      cameraError.value = "Izin kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda."
    } else {
      cameraError.value = "Gagal mengakses kamera. Pastikan kamera tidak sedang digunakan aplikasi lain."
    }
  }
}

const closeCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
  }
  stream.value = null
  isCameraOpen.value = false
}

const capturePhoto = () => {
  if (!video.value || !canvas.value) return

  const context = canvas.value.getContext('2d')
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  
  // Draw the video frame to the canvas
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height)
  
  // Convert canvas to blob
  canvas.value.toBlob((blob) => {
    const fileName = `${cameraType.value}_${Date.now()}.jpg`
    const file = new File([blob], fileName, { type: 'image/jpeg' })
    
    if (cameraType.value === 'ktp') {
      setKtpFile(file)
    } else {
      setFaceFile(file)
    }
    
    closeCamera()
  }, 'image/jpeg', 0.9)
}

const submit = () => {
  form.post(route('seller.verification.store'), {
    forceFormData: true,
    onSuccess: () => {
      form.reset()
      ktpPreview.value = null
      facePreview.value = null
    },
  })
}

const statusConfig = computed(() => {
  if (!props.verification) return null
  const configs = {
    pending: {
      icon: Clock,
      label: 'Sedang Diproses',
      desc: 'Dokumen Anda sedang dalam peninjauan oleh tim admin. Proses biasanya memakan waktu 1×24 jam.',
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800/30',
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    },
    approved: {
      icon: CheckCircle2,
      label: 'Terverifikasi',
      desc: 'Selamat! Akun Anda telah terverifikasi sebagai penjual. Anda kini bisa menjual produk di GawaiSeken.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/30',
      badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-amber-400',
    },
    rejected: {
      icon: XCircle,
      label: 'Ditolak',
      desc: props.verification?.rejection_note || 'Dokumen Anda tidak memenuhi syarat. Silakan unggah ulang.',
      color: 'text-red-600',
      bg: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30',
      badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    },
  }
  return configs[props.verification.status] ?? null
})

const canSubmit = computed(() => {
  if (!props.verification) return true
  return props.verification.status === 'rejected'
})

onBeforeUnmount(() => {
  closeCamera()
})
</script>

<template>
  <Head title="Jadi Penjual" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-foreground">Daftar Jadi Penjual</h2>
    </template>

    <div class="py-6 sm:py-12">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">

        <!-- Steps Banner -->
        <div class="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 class="mb-5 text-sm font-black uppercase tracking-widest text-muted-foreground">
            Cara Menjadi Penjual
          </h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="flex items-start gap-3">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30">
                1
              </div>
              <div>
                <p class="font-bold text-foreground text-sm">Unggah KTP</p>
                <p class="text-xs text-muted-foreground mt-0.5">Foto KTP yang jelas dan tidak buram.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30">
                2
              </div>
              <div>
                <p class="font-bold text-foreground text-sm">Selfie dengan KTP</p>
                <p class="text-xs text-muted-foreground mt-0.5">Foto wajah Anda sambil memegang KTP.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/30">
                3
              </div>
              <div>
                <p class="font-bold text-foreground text-sm">Tunggu Verifikasi Admin</p>
                <p class="text-xs text-muted-foreground mt-0.5">Proses 1×24 jam, lalu akun penjual aktif.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Status Banner -->
        <div
          v-if="verification && statusConfig"
          class="rounded-3xl border p-6 shadow-sm"
          :class="statusConfig.bg"
        >
          <div class="flex items-start gap-4">
            <div class="rounded-xl p-2.5" :class="statusConfig.badge">
              <component :is="statusConfig.icon" class="h-6 w-6" :class="statusConfig.color" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <p class="font-black text-foreground">Status Verifikasi:</p>
                <span class="rounded-full px-3 py-0.5 text-xs font-black uppercase tracking-wider" :class="statusConfig.badge">
                  {{ statusConfig.label }}
                </span>
              </div>
              <p class="mt-1.5 text-sm text-muted-foreground">{{ statusConfig.desc }}</p>

              <Link
                v-if="verification.status === 'approved'"
                :href="route('dashboard')"
                class="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700"
              >
                <Store class="h-4 w-4" />
                Buka Dashboard Penjual
                <ArrowRight class="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <!-- Form Upload -->
        <div v-if="canSubmit" class="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div class="p-6 sm:p-8">
            <header class="mb-8">
              <div class="flex items-center gap-3 mb-1">
                <div class="rounded-xl bg-primary/10 p-2 text-primary ring-1 ring-primary/20">
                  <ShieldCheck class="h-6 w-6" />
                </div>
                <div>
                  <h3 class="text-lg font-black text-foreground">
                    {{ verification?.status === 'rejected' ? 'Unggah Ulang Dokumen' : 'Unggah Dokumen Verifikasi' }}
                  </h3>
                  <p class="text-sm text-muted-foreground">Pilih ambil foto langsung atau unggah file. Maks 2 MB.</p>
                </div>
              </div>
            </header>

            <form @submit.prevent="submit" class="space-y-8">
              <!-- KTP Image -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <InputLabel for="ktp_image" class="text-xs uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2">
                    <CreditCard class="h-4 w-4" /> Foto KTP
                  </InputLabel>
                  <button 
                    type="button" 
                    @click="openCamera('ktp')"
                    class="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
                  >
                    <CameraIcon class="h-3.5 w-3.5" /> Ambil Foto Langsung
                  </button>
                </div>

                <label
                  for="ktp_image"
                  class="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition hover:border-primary hover:bg-primary/5"
                  :class="{ 'border-primary bg-primary/5': ktpPreview }"
                >
                  <div v-if="ktpPreview" class="w-full">
                    <img :src="ktpPreview" class="mx-auto max-h-48 rounded-xl object-contain shadow-md" alt="Preview KTP" />
                    <p class="mt-3 text-xs text-primary font-bold flex items-center justify-center gap-2">
                      <RotateCcw class="h-3 w-3" /> Ganti foto / Unggah file
                    </p>
                  </div>
                  <div v-else class="flex flex-col items-center gap-2">
                    <div class="rounded-full bg-muted p-4 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition">
                      <Upload class="h-7 w-7" />
                    </div>
                    <p class="text-sm font-bold text-foreground">Klik untuk unggah file KTP</p>
                    <p class="text-xs text-muted-foreground">Atau gunakan tombol ambil foto di atas</p>
                  </div>
                  <input
                    type="file"
                    id="ktp_image"
                    class="hidden"
                    @change="handleKtpChange"
                    accept="image/jpg,image/jpeg,image/png"
                  />
                </label>
                <InputError class="mt-1" :message="form.errors.ktp_image" />
              </div>

              <!-- Face Image -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <InputLabel for="face_image" class="text-xs uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2">
                    <CameraIcon class="h-4 w-4" /> Foto Selfie Memegang KTP
                  </InputLabel>
                  <button 
                    type="button" 
                    @click="openCamera('face')"
                    class="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
                  >
                    <CameraIcon class="h-3.5 w-3.5" /> Ambil Foto Langsung
                  </button>
                </div>

                <label
                  for="face_image"
                  class="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition hover:border-primary hover:bg-primary/5"
                  :class="{ 'border-primary bg-primary/5': facePreview }"
                >
                  <div v-if="facePreview" class="w-full">
                    <img :src="facePreview" class="mx-auto max-h-48 rounded-xl object-contain shadow-md" alt="Preview Selfie" />
                    <p class="mt-3 text-xs text-primary font-bold flex items-center justify-center gap-2">
                      <RotateCcw class="h-3 w-3" /> Ganti foto / Unggah file
                    </p>
                  </div>
                  <div v-else class="flex flex-col items-center gap-2">
                    <div class="rounded-full bg-muted p-4 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition">
                      <CameraIcon class="h-7 w-7" />
                    </div>
                    <p class="text-sm font-bold text-foreground">Klik untuk unggah file selfie</p>
                    <p class="text-xs text-muted-foreground">Atau gunakan tombol ambil foto di atas</p>
                  </div>
                  <input
                    type="file"
                    id="face_image"
                    class="hidden"
                    @change="handleFaceChange"
                    accept="image/jpg,image/jpeg,image/png"
                  />
                </label>
                <InputError class="mt-1" :message="form.errors.face_image" />
              </div>

              <div class="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-900/10">
                <AlertCircle class="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                <p class="text-xs text-amber-800 dark:text-amber-400">
                  Data verifikasi Anda bersifat <strong>rahasia</strong> dan hanya digunakan untuk keperluan verifikasi identitas.
                </p>
              </div>

              <!-- Submit -->
              <div class="flex items-center gap-4 border-t border-border pt-6">
                <PrimaryButton
                  :disabled="form.processing"
                  class="flex items-center gap-2 px-8 py-3.5 shadow-lg shadow-primary/25"
                >
                  <Upload class="h-4 w-4" />
                  {{ form.processing ? 'Mengunggah...' : 'Kirim Dokumen Verifikasi' }}
                </PrimaryButton>
                <Transition
                  enter-active-class="transition duration-500 ease-out"
                  enter-from-class="opacity-0 translate-x-2"
                  enter-to-class="opacity-100 translate-x-0"
                >
                  <p v-if="form.recentlySuccessful" class="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 class="h-4 w-4" /> Dokumen berhasil dikirim!
                  </p>
                </Transition>
              </div>
            </form>
          </div>
        </div>

        <!-- Pending Status -->
        <div
          v-if="verification?.status === 'pending'"
          class="rounded-3xl border border-border bg-card p-6 text-center shadow-sm"
        >
          <Clock class="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <p class="font-bold text-foreground">Dokumen Anda sedang diproses</p>
          <p class="text-sm text-muted-foreground mt-1">Anda tidak perlu mengunggah ulang. Tim kami akan meninjau dalam 1×24 jam.</p>
        </div>

      </div>
    </div>

    <!-- Camera Modal -->
    <Modal :show="isCameraOpen" @close="closeCamera" maxWidth="2xl">
      <div class="relative overflow-hidden bg-black p-0 sm:rounded-3xl">
        <div class="flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent">
          <h3 class="text-sm font-bold text-white uppercase tracking-widest">
            {{ cameraType === 'ktp' ? 'Foto KTP' : 'Foto Selfie' }}
          </h3>
          <button @click="closeCamera" class="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <X class="h-5 w-5" />
          </button>
        </div>

        <div class="relative aspect-video w-full bg-gray-900 flex items-center justify-center">
          <video 
            ref="video" 
            autoplay 
            playsinline 
            class="h-full w-full object-cover"
            :class="{ 'scale-x-[-1]': cameraType === 'face' }"
          ></video>
          
          <!-- Overlay Guide -->
          <div v-if="!cameraError" class="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
            <div 
              class="border-2 border-dashed border-white/50"
              :class="cameraType === 'ktp' ? 'w-4/5 aspect-[1.6/1] rounded-xl' : 'w-2/3 aspect-square rounded-full'"
            ></div>
          </div>

          <div v-if="cameraError" class="p-6 text-center text-white">
            <AlertCircle class="mx-auto h-10 w-10 text-red-500 mb-3" />
            <p class="font-bold">{{ cameraError }}</p>
          </div>
        </div>

        <canvas ref="canvas" class="hidden"></canvas>

        <div class="p-8 flex items-center justify-center bg-black">
          <button 
            v-if="!cameraError"
            @click="capturePhoto"
            class="h-16 w-16 rounded-full border-4 border-white flex items-center justify-center p-1 transition hover:scale-105 active:scale-95"
          >
            <div class="h-full w-full rounded-full bg-white"></div>
          </button>
        </div>
      </div>
    </Modal>
  </AuthenticatedLayout>
</template>
