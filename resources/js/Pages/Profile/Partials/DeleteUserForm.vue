<script setup>
import DangerButton from '@/Components/DangerButton.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import Modal from '@/Components/Modal.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import { Trash2, AlertTriangle, ShieldX } from 'lucide-vue-next'

const confirmingUserDeletion = ref(false)
const passwordInput = ref(null)

const form = useForm({
  password: '',
})

const confirmUserDeletion = () => {
  confirmingUserDeletion.value = true
}

const deleteUser = () => {
  form.delete(route('profile.destroy'), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => passwordInput.value.focus(),
    onFinish: () => form.reset(),
  })
}

const closeModal = () => {
  confirmingUserDeletion.value = false
  form.reset()
}
</script>

<template>
  <section>
    <header class="mb-8">
      <div class="flex items-center gap-3">
        <div class="rounded-2xl bg-red-50 p-2 text-red-500 shadow-sm ring-1 ring-red-100">
          <Trash2 class="h-6 w-6" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-foreground">Hapus Akun</h2>
          <p class="text-sm text-muted-foreground">Tindakan ini bersifat permanen dan tidak dapat dibatalkan.</p>
        </div>
      </div>
    </header>

    <div class="rounded-2xl bg-red-50 p-6 border border-red-100 dark:bg-red-900/10 dark:border-red-900/30">
      <div class="flex items-start gap-4">
        <div class="rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-900/50">
          <AlertTriangle class="h-6 w-6" />
        </div>
        <div class="flex-1">
          <p class="text-sm font-black text-red-900 dark:text-red-400 uppercase tracking-tight">Peringatan Penting</p>
          <p class="text-sm text-red-800 dark:text-red-500/80 mt-1">
            Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen.
            Sebelum menghapus akun Anda, harap unduh data atau informasi apa pun yang ingin Anda simpan.
          </p>
          <DangerButton @click="confirmUserDeletion" class="mt-6 px-8 shadow-lg shadow-red-500/20">
            Saya Mengerti, Hapus Akun Ini
          </DangerButton>
        </div>
      </div>
    </div>

    <Modal :show="confirmingUserDeletion" @close="closeModal" maxWidth="md">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <div class="rounded-full bg-red-100 p-4 text-red-600">
            <ShieldX class="h-10 w-10" />
          </div>
        </div>
        <h2 class="text-center text-xl font-black text-foreground">
          Konfirmasi Penghapusan
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          Silakan masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun ini secara permanen.
        </p>

        <div class="mt-8">
          <InputLabel for="password" value="Password" class="sr-only" />
          <TextInput
            id="password"
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-1 block w-full bg-muted/50 border-transparent focus:bg-background rounded-2xl"
            placeholder="Masukkan password Anda"
            @keyup.enter="deleteUser"
          />
          <InputError :message="form.errors.password" class="mt-2" />
        </div>

        <div class="mt-10 flex flex-col gap-3">
          <DangerButton
            class="w-full justify-center py-3.5 shadow-xl shadow-red-500/20"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            @click="deleteUser"
          >
            Hapus Akun Sekarang
          </DangerButton>
          <SecondaryButton @click="closeModal" class="w-full justify-center py-3.5">
            Batal
          </SecondaryButton>
        </div>
      </div>
    </Modal>
  </section>
</template>
