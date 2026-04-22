<script setup>
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import { Link, useForm, usePage } from '@inertiajs/vue3'
import { User, Mail, MapPin, Calendar, CheckCircle2, ShieldCheck } from 'lucide-vue-next'

const props = defineProps({
  mustVerifyEmail: {
    type: Boolean,
  },
  status: {
    type: String,
  },
  profile: {
    type: Object,
  },
})

const user = usePage().props.auth.user

const form = useForm({
  name: user.name,
  email: user.email,
  address: props.profile?.address || '',
  date_of_birth: props.profile?.date_of_birth || '',
  gender: props.profile?.gender || '',
})
</script>

<template>
  <section>
    <header class="mb-8">
      <div class="flex items-center gap-3">
        <div class="rounded-2xl bg-primary/10 p-2 text-primary shadow-sm ring-1 ring-primary/20">
          <User class="h-6 w-6" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-foreground">Informasi Profil</h2>
          <p class="text-sm text-muted-foreground">Perbarui identitas dan alamat kontak Anda.</p>
        </div>
      </div>
    </header>

    <form @submit.prevent="form.patch(route('profile.update'))" class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Nama -->
        <div class="space-y-2">
          <InputLabel for="name" value="Nama Lengkap" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
          <div class="relative group">
            <TextInput
              id="name"
              type="text"
              class="block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl"
              v-model="form.name"
              required
              autofocus
              autocomplete="name"
            />
            <User class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <InputError class="mt-2" :message="form.errors.name" />
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <InputLabel for="email" value="Alamat Email" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
          <div class="relative group">
            <TextInput
              id="email"
              type="email"
              class="block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl"
              v-model="form.email"
              required
              autocomplete="username"
            />
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <div v-if="user.email_verified_at" class="absolute right-4 top-1/2 -translate-y-1/2" title="Terverifikasi">
              <CheckCircle2 class="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
            </div>
          </div>
          <InputError class="mt-2" :message="form.errors.email" />
        </div>

        <!-- Tanggal Lahir -->
        <div class="space-y-2">
          <InputLabel for="date_of_birth" value="Tanggal Lahir" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
          <div class="relative group">
            <TextInput
              id="date_of_birth"
              type="date"
              class="block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl"
              v-model="form.date_of_birth"
            />
            <Calendar class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <InputError class="mt-2" :message="form.errors.date_of_birth" />
        </div>

        <!-- Jenis Kelamin -->
        <div class="space-y-2">
          <InputLabel for="gender" value="Jenis Kelamin" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
          <div class="relative group">
            <select
              id="gender"
              class="block w-full rounded-2xl border-transparent bg-muted/30 py-3 pl-4 pr-10 text-sm focus:border-primary focus:bg-background focus:ring-primary transition-all dark:bg-gray-900"
              v-model="form.gender"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
              <option value="other">Lainnya</option>
            </select>
          </div>
          <InputError class="mt-2" :message="form.errors.gender" />
        </div>
      </div>

      <!-- Alamat -->
      <div class="space-y-2">
        <InputLabel for="address" value="Alamat Lengkap" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
        <div class="relative group">
          <TextInput
            id="address"
            type="text"
            class="block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl"
            v-model="form.address"
            autocomplete="address"
          />
          <MapPin class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <InputError class="mt-2" :message="form.errors.address" />
      </div>

      <!-- Email Verification Notice -->
      <div v-if="mustVerifyEmail && user.email_verified_at === null" class="rounded-[1.5rem] bg-amber-50 p-6 border border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/30">
        <div class="flex items-start gap-4">
          <div class="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/50">
            <ShieldCheck class="h-6 w-6" />
          </div>
          <div>
            <p class="text-sm font-black text-amber-900 dark:text-amber-400 uppercase tracking-tight">Email Belum Terverifikasi</p>
            <p class="text-sm text-amber-800 dark:text-amber-500/80 mt-1">
              Silakan verifikasi email Anda untuk mendapatkan akses penuh ke fitur GawaiSeken.
            </p>
            <Link
              :href="route('verification.send')"
              method="post"
              as="button"
              class="mt-4 inline-flex items-center text-xs font-black uppercase tracking-widest text-amber-900 underline hover:no-underline dark:text-amber-400"
            >
              Kirim Ulang Kode Verifikasi
            </Link>
          </div>
        </div>
        <div v-show="status === 'verification-link-sent'" class="mt-4 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
          Kode verifikasi baru telah dikirim ke email Anda.
        </div>
      </div>

      <!-- Submit -->
      <div class="flex items-center gap-4 pt-6 border-t border-border">
        <PrimaryButton :disabled="form.processing" class="px-10 py-3.5 shadow-lg shadow-primary/25">
          Simpan Perubahan
        </PrimaryButton>
        <Transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 translate-x-2"
          enter-to-class="opacity-100 translate-x-0"
        >
          <p v-if="form.recentlySuccessful" class="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 class="h-4 w-4" /> Tersimpan!
          </p>
        </Transition>
      </div>
    </form>
  </section>
</template>
