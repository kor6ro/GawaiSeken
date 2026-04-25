<script setup>
import Checkbox from '@/Components/Checkbox.vue'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import BackButton from '@/Components/BackButton.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from 'lucide-vue-next'
import { ref } from 'vue'

const showPassword = ref(false)

defineProps({
  canResetPassword: {
    type: Boolean,
  },
  status: {
    type: String,
  },
})

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

const submit = () => {
  form.post(route('login'), {
    onFinish: () => form.reset('password'),
  })
}
</script>

<template>
  <GuestLayout>
    <Head title="Masuk ke Akun" />

    <div class="mb-10 text-center">
      <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
        <LogIn class="h-6 w-6" />
      </div>
      <h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Selamat Datang!</h1>
      <p class="text-sm font-medium text-slate-500 mt-1">Masuk untuk melanjutkan belanja di GawaiSeken.</p>
    </div>

    <div v-if="status" class="mb-6 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
      {{ status }}
    </div>

    <form @submit.prevent="submit" class="space-y-6">
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
            autofocus
            autocomplete="username"
            placeholder="nama@email.com"
          />
          <Mail class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
        <InputError class="mt-2" :message="form.errors.email" />
      </div>

      <!-- Password -->
      <div class="space-y-2">
        <div class="flex items-center justify-between px-1">
          <InputLabel for="password" value="Kata Sandi" class="text-[10px] font-black uppercase tracking-widest text-slate-400" />
          <Link
            v-if="canResetPassword"
            :href="route('password.request')"
            class="text-[10px] font-black uppercase tracking-wider text-primary hover:underline"
          >
            Lupa Sandi?
          </Link>
        </div>

        <div class="group relative">
          <TextInput
            id="password"
            :type="showPassword ? 'text' : 'password'"
            class="block w-full pl-11 pr-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl dark:bg-slate-800/50 dark:border-slate-700"
            v-model="form.password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
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
        <InputError class="mt-2" :message="form.errors.password" />
      </div>

      <!-- Remember Me -->
      <div class="flex items-center">
        <Checkbox name="remember" v-model:checked="form.remember" id="remember" />
        <label for="remember" class="ms-2 text-xs font-bold text-slate-500 cursor-pointer select-none">Ingat saya di perangkat ini</label>
      </div>

      <!-- Submit -->
      <div class="pt-2">
        <PrimaryButton class="w-full py-4 text-sm font-black shadow-xl shadow-primary/20" :disabled="form.processing">
          Masuk Sekarang
          <ArrowRight class="ml-2 h-4 w-4" />
        </PrimaryButton>
      </div>

      <!-- Register Link -->
      <div class="text-center pt-4">
        <p class="text-sm font-medium text-slate-500">
          Belum punya akun?
          <Link :href="route('register')" class="font-black text-primary hover:underline">
            Daftar Gratis
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
