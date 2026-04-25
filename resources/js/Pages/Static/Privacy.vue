<script setup>
import { Head } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import { ShieldCheck } from 'lucide-vue-next'
</script>

<template>
  <Head title="Privacy Policy" />
  <AppLayout>
    <div class="py-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-500 mb-6">
            <ShieldCheck class="h-8 w-8" />
          </div>
          <h1 class="text-4xl font-black tracking-tight text-foreground sm:text-5xl">Kebijakan Privasi</h1>
          <p class="mt-4 text-lg text-muted-foreground">Diperbarui pada: 26 April 2026</p>
        </div>

        <div class="prose prose-sm sm:prose-base prose-neutral dark:prose-invert mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm max-w-none">
          <p>
            Di GawaiSeken, privasi pengunjung kami adalah salah satu prioritas utama. Dokumen Kebijakan Privasi ini menguraikan jenis informasi pribadi yang diterima dan dikumpulkan oleh GawaiSeken serta bagaimana informasi tersebut digunakan.
          </p>

          <h3>1. Informasi yang Kami Kumpulkan</h3>
          <p>Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami saat Anda membuat akun, memperbarui profil Anda, menggunakan layanan interaktif (seperti fitur chat atau nego harga), atau berkomunikasi dengan layanan pelanggan kami. Informasi ini dapat mencakup:</p>
          <ul>
            <li>Nama lengkap dan username</li>
            <li>Alamat email dan nomor telepon</li>
            <li>Alamat domisili dan pengiriman</li>
            <li>Data identitas untuk keperluan verifikasi penjual (KYC)</li>
            <li>Informasi perangkat dan log koneksi untuk tujuan keamanan</li>
          </ul>

          <h3>2. Bagaimana Kami Menggunakan Informasi Anda</h3>
          <p>Informasi yang kami kumpulkan digunakan untuk berbagai tujuan, antara lain:</p>
          <ul>
            <li>Menyediakan, memelihara, dan meningkatkan layanan kami.</li>
            <li>Memproses transaksi dan mengirimkan pemberitahuan terkait, termasuk konfirmasi COD.</li>
            <li>Memverifikasi identitas pengguna untuk mencegah penipuan dan aktivitas ilegal lainnya.</li>
            <li>Merespons komentar, pertanyaan, dan permintaan layanan pelanggan.</li>
            <li>Berkomunikasi dengan Anda tentang produk, layanan, penawaran, promosi, dan acara yang ditawarkan oleh GawaiSeken.</li>
          </ul>

          <h3>3. Berbagi Informasi Pribadi</h3>
          <p>Kami tidak akan menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi Anda dalam situasi berikut:</p>
          <ul>
            <li>Dengan penjual atau pembeli (seperti nama, nomor telepon, dan lokasi) untuk memfasilitasi transaksi Cash On Delivery (COD).</li>
            <li>Untuk mematuhi hukum, regulasi, atau permintaan hukum yang sah.</li>
            <li>Untuk melindungi hak, properti, atau keselamatan GawaiSeken, pengguna kami, atau pihak lainnya.</li>
          </ul>

          <h3>4. Keamanan Data</h3>
          <p>Kami mengambil langkah-langkah yang wajar untuk membantu melindungi informasi Anda dari kehilangan, pencurian, penyalahgunaan, dan akses tanpa izin, pengungkapan, perubahan, dan penghancuran. Namun, perlu diingat bahwa tidak ada transmisi data melalui internet atau penyimpanan elektronik yang 100% aman.</p>

          <h3>5. Perubahan pada Kebijakan Privasi Ini</h3>
          <p>GawaiSeken dapat mengubah Kebijakan Privasi ini dari waktu ke waktu. Jika kami melakukan perubahan material, kami akan memberi tahu Anda dengan merevisi tanggal di bagian atas kebijakan ini dan, dalam beberapa kasus, kami dapat memberi Anda pemberitahuan tambahan (seperti menambahkan pernyataan di situs web kami atau mengirimkan pemberitahuan kepada Anda).</p>

          <h3>Hubungi Kami</h3>
          <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="mailto:privacy@gawaiseken.id">privacy@gawaiseken.id</a>.</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
