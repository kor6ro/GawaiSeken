<script setup>
import { computed } from 'vue'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

const props = defineProps({
  status: {
    type: String,
  },
})

const form = useForm({})

const submit = () => {
  form.post(route('verification.send'))
}

const verificationLinkSent = computed(() => props.status === 'verification-link-sent')
</script>

<template>
  <GuestLayout>
    <Head title="Email Verification" />

    <div class="mb-4 text-sm text-muted-foreground">
      Terima kasih telah mendaftar! Sebelum memulai, bisakah Anda memverifikasi alamat email Anda
      dengan mengeklik tautan yang baru saja kami kirimkan melalui email kepada Anda? Jika Anda
      tidak menerima email tersebut, kami dengan senang hati akan mengirimkan email lainnya kepada
      Anda.
    </div>

    <div class="mb-4 text-sm font-medium text-green-600" v-if="verificationLinkSent">
      Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
    </div>

    <form @submit.prevent="submit">
      <div class="mt-4 flex items-center justify-between">
        <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
          Kirim Ulang Email Verifikasi
        </PrimaryButton>

        <Link
          :href="route('logout')"
          method="post"
          as="button"
          class="rounded-md text-sm text-muted-foreground underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >Log Out</Link
        >
      </div>
    </form>
  </GuestLayout>
</template>
