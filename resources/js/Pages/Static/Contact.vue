<script setup>
import { Head } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import { Mail } from 'lucide-vue-next'
</script>

<template>
  <Head title="Contact Us" />
  <AppLayout>
    <div class="py-16">
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <Mail class="h-8 w-8" />
          </div>
          <h1 class="text-4xl font-black tracking-tight text-foreground sm:text-5xl">Hubungi Kami</h1>
          <p class="mt-4 text-lg text-muted-foreground">Tim dukungan kami siap membantu setiap pertanyaan dan keluhan Anda.</p>
        </div>

        <div class="rounded-3xl border border-border bg-card p-8 sm:p-12 text-center shadow-sm">
          <Mail class="h-12 w-12 text-primary mx-auto mb-6" />
          <h3 class="text-2xl font-bold mb-3">Email Bantuan</h3>
          <p class="text-muted-foreground mb-8">Kirimkan pertanyaan, masukan, atau kendala Anda langsung ke alamat email resmi kami. Tim kami akan merespons pesan Anda secepat mungkin.</p>
          <a href="mailto:gawai2nd@gmail.com" class="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-base font-black text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform">
            gawai2nd@gmail.com
          </a>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
