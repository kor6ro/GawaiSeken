<script setup>
import { Head } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import { Info } from 'lucide-vue-next'
</script>

<template>
  <Head title="About Us" />
  <AppLayout>
    <div class="py-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <Info class="h-8 w-8" />
          </div>
          <h1 class="text-4xl font-black tracking-tight text-foreground sm:text-5xl">Tentang GawaiSeken</h1>
          <p class="mt-4 text-lg text-muted-foreground">Mewujudkan ekosistem jual beli gadget seken yang aman, transparan, dan terpercaya.</p>
        </div>

        <div class="prose prose-sm sm:prose-base prose-neutral dark:prose-invert mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm">
          <h3>Visi Kami</h3>
          <p>
            GawaiSeken hadir untuk menjembatani pembeli dan penjual gadget bekas di seluruh Indonesia. Kami percaya bahwa setiap gadget memiliki nilai dan fungsi yang masih bisa dimanfaatkan dengan baik oleh orang lain. Misi kami adalah menciptakan platform yang tidak hanya memfasilitasi transaksi, tetapi juga membangun komunitas pecinta gadget yang solid.
          </p>

          <h3>Mengapa Memilih Kami?</h3>
          <ul>
            <li><strong>Transaksi COD Murni:</strong> Bertemu langsung dengan penjual untuk memeriksa barang sebelum membayar, menjamin kepuasan 100%.</li>
            <li><strong>Tanpa Potongan Admin:</strong> Transaksi di GawaiSeken sepenuhnya gratis tanpa potongan biaya platform bagi pembeli maupun penjual.</li>
            <li><strong>Verifikasi Penjual:</strong> Sistem KYC (Know Your Customer) kami memastikan bahwa Anda bertransaksi dengan penjual yang terverifikasi dan amanah.</li>
            <li><strong>Fitur Nego Harga:</strong> Tawar menawar harga layaknya di pasar tradisional, namun dengan kenyamanan aplikasi digital.</li>
          </ul>

          <h3>Perjalanan Kami</h3>
          <p>
            Berawal dari kesulitan tim kami dalam menemukan platform jual beli gadget bekas yang transparan dan tanpa biaya tersembunyi, GawaiSeken diciptakan sebagai solusi dari komunitas untuk komunitas. Kami terus berkembang dan berinovasi untuk memberikan pengalaman pengguna yang lebih baik setiap harinya.
          </p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
