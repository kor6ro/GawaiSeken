<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import BackButton from '@/Components/BackButton.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Eye, EyeOff, User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck } from 'lucide-vue-next'
import { ref } from 'vue'

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const submit = () => {
  form.post(route('register'), {
    onFinish: () => form.reset('password', 'password_confirmation'),
  })
}
</script>

<template>
  <GuestLayout>
    <Head title="Daftar Akun Baru" />

    <div class="mb-10 text-center">
      <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
        <UserPlus class="h-6 w-6" />
      </div>
      <h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Buat Akun</h1>
      <p class="text-sm font-medium text-slate-500 mt-1">Mulai pengalaman belanja dan jualan terbaik Anda.</p>
    </div>

    <form @submit.prevent="submit" class="space-y-5">
      <!-- Name -->
      <div class="space-y-2">
        <InputLabel for="name" value="Nama Lengkap" class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1" />
        <div class="group relative">
          <TextInput
            id="name"
            type="text"
            class="block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700"
            v-model="form.name"
            required
            autofocus
            autocomplete="name"
            placeholder="Contoh: Budi Santoso"
          />
          <User class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
        <InputError class="mt-1" :message="form.errors.name" />
      </div>

      <!-- Email -->
      <div class="space-y-2">
        <InputLabel for="email" value="Alamat Email" class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1" />
        <div class="group relative">
          <TextInput
            id="email"
            type="email"
            class="block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700"
            v-model="form.email"
            required
            autocomplete="username"
            placeholder="nama@email.com"
          />
          <Mail class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
        <InputError class="mt-1" :message="form.errors.email" />
      </div>

      <!-- Password -->
      <div class="space-y-2">
        <InputLabel for="password" value="Kata Sandi" class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1" />
        <div class="group relative">
          <TextInput
            id="password"
            :type="showPassword ? 'text' : 'password'"
            class="block w-full pl-11 pr-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700"
            v-model="form.password"
            required
            autocomplete="new-password"
            placeholder="Minimal 8 karakter"
          />
          <Lock class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            tabindex="-1"
          >
            <Eye v-if="!showPassword" class="h-4 w-4" />
            <EyeOff v-else class="h-4 w-4" />
          </button>
        </div>
        <InputError class="mt-1" :message="form.errors.password" />
      </div>

      <!-- Confirm Password -->
      <div class="space-y-2">
        <InputLabel for="password_confirmation" value="Konfirmasi Sandi" class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1" />
        <div class="group relative">
          <TextInput
            id="password_confirmation"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            class="block w-full pl-11 pr-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700"
            v-model="form.password_confirmation"
            required
            autocomplete="new-password"
            placeholder="Ulangi kata sandi"
          />
          <ShieldCheck class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <button
            type="button"
            @click="showPasswordConfirmation = !showPasswordConfirmation"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            tabindex="-1"
          >
            <Eye v-if="!showPasswordConfirmation" class="h-4 w-4" />
            <EyeOff v-else class="h-4 w-4" />
          </button>
        </div>
        <InputError class="mt-1" :message="form.errors.password_confirmation" />
      </div>

      <!-- Submit -->
      <div class="pt-4">
        <PrimaryButton class="w-full py-4 text-sm font-black shadow-xl shadow-primary/20" :disabled="form.processing">
          Daftar Sekarang
          <ArrowRight class="ml-2 h-4 w-4" />
        </PrimaryButton>
      </div>

      <!-- Login Link -->
      <div class="text-center pt-2">
        <p class="text-sm font-medium text-slate-500">
          Sudah punya akun?
          <Link :href="route('login')" class="font-black text-primary hover:underline">
            Masuk Saja
          </Link>
        </p>
      </div>
    </form>
    
    <!-- Floating Back Button -->
    <div class="absolute left-4 top-4 sm:left-8 sm:top-8">
      <BackButton />
    </div>
  </GuestLayout>
</template>
