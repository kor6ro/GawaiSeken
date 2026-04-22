<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})

const form = useForm({
  email: props.email,
  code: '',
})

const submit = () => {
  form.post(route('verification.code.verify'), {
    onFinish: () => form.reset('code'),
  })
}
</script>

<template>
  <GuestLayout>
    <Head title="Verifikasi Email" />

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Terima kasih telah mendaftar! Sebelum memulai, silakan verifikasi alamat email Anda dengan
      memasukkan 6 digit kode yang telah kami kirimkan ke <strong>{{ email }}</strong>.
    </div>

    <form @submit.prevent="submit">
      <div>
        <InputLabel for="code" value="Kode Verifikasi" />

        <TextInput
          id="code"
          type="text"
          class="mt-1 block w-full text-center text-2xl tracking-widest"
          v-model="form.code"
          required
          autofocus
          placeholder="000000"
          maxlength="6"
        />

        <InputError class="mt-2" :message="form.errors.code" />
      </div>

      <div class="mt-4 flex items-center justify-between">
        <Link
          :href="route('login')"
          class="text-sm text-muted-foreground underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Kembali ke Login
        </Link>

        <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Verifikasi Kode
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>
