<script setup>
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import { useForm, Link } from '@inertiajs/vue3'
import { ref } from 'vue'
import { Lock, ShieldCheck, KeyRound, CheckCircle2 } from 'lucide-vue-next'

const passwordInput = ref(null)
const currentPasswordInput = ref(null)

const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const updatePassword = () => {
  form.put(route('password.update'), {
    preserveScroll: true,
    onSuccess: () => form.reset(),
    onError: () => {
      if (form.errors.password) {
        form.reset('password', 'password_confirmation')
        passwordInput.value.focus()
      }
      if (form.errors.current_password) {
        form.reset('current_password')
        currentPasswordInput.value.focus()
      }
    },
  })
}
</script>

<template>
  <section>
    <header class="mb-8">
      <div class="flex items-center gap-3">
        <div class="rounded-2xl bg-primary/10 p-2 text-primary shadow-sm ring-1 ring-primary/20">
          <Lock class="h-6 w-6" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-foreground">Keamanan & Sandi</h2>
          <p class="text-sm text-muted-foreground">Pastikan akun Anda tetap aman dengan sandi yang kuat.</p>
        </div>
      </div>
    </header>

    <form @submit.prevent="updatePassword" class="space-y-8">
      <div class="max-w-xl space-y-6">
        <!-- Current Password -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <InputLabel for="current_password" value="Password Saat Ini" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
            <Link :href="route('password.request')" class="text-[10px] font-black uppercase tracking-wider text-primary hover:underline">
              Lupa Password?
            </Link>
          </div>
          <div class="relative group">
            <TextInput
              id="current_password"
              ref="currentPasswordInput"
              v-model="form.current_password"
              type="password"
              class="block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl"
              autocomplete="current-password"
            />
            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <InputError :message="form.errors.current_password" class="mt-2" />
        </div>

        <!-- New Password -->
        <div class="space-y-2">
          <InputLabel for="password" value="Password Baru" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
          <div class="relative group">
            <TextInput
              id="password"
              ref="passwordInput"
              v-model="form.password"
              type="password"
              class="block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl"
              autocomplete="new-password"
            />
            <KeyRound class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <InputError :message="form.errors.password" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="space-y-2">
          <InputLabel for="password_confirmation" value="Konfirmasi Password Baru" class="text-xs uppercase tracking-widest font-bold text-muted-foreground" />
          <div class="relative group">
            <TextInput
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              class="block w-full pl-11 bg-muted/30 border-transparent focus:bg-background transition-all rounded-2xl"
              autocomplete="new-password"
            />
            <ShieldCheck class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <InputError :message="form.errors.password_confirmation" class="mt-2" />
        </div>
      </div>

      <!-- Submit -->
      <div class="flex items-center gap-4 pt-6 border-t border-border">
        <PrimaryButton :disabled="form.processing" class="px-10 py-3.5 shadow-lg shadow-primary/25">
          Perbarui Sandi
        </PrimaryButton>
        <Transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 translate-x-2"
          enter-to-class="opacity-100 translate-x-0"
        >
          <p v-if="form.recentlySuccessful" class="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 class="h-4 w-4" /> Sandi berhasil diubah!
          </p>
        </Transition>
      </div>
    </form>
  </section>
</template>
