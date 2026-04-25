<script setup>
import { Head } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import { FileText } from 'lucide-vue-next'
</script>

<template>
  <Head title="Terms of Service" />
  <AppLayout>
    <div class="py-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-6">
            <FileText class="h-8 w-8" />
          </div>
          <h1 class="text-4xl font-black tracking-tight text-foreground sm:text-5xl">Syarat & Ketentuan</h1>
          <p class="mt-4 text-lg text-muted-foreground">Aturan main bertransaksi dengan aman di platform kami.</p>
        </div>

        <div class="prose prose-sm sm:prose-base prose-neutral dark:prose-invert mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm max-w-none">
          <p>
            Selamat datang di GawaiSeken! Syarat & Ketentuan ("Ketentuan") ini mengatur penggunaan Anda atas situs web dan aplikasi GawaiSeken. Dengan mengakses atau menggunakan platform kami, Anda setuju untuk terikat oleh Ketentuan ini.
          </p>

          <h3>1. Penerimaan Ketentuan</h3>
          <p>Dengan membuat akun atau menggunakan bagian mana pun dari layanan kami, Anda mengonfirmasi bahwa Anda telah membaca, memahami, dan menyetujui seluruh isi Ketentuan ini. Jika Anda tidak setuju, harap jangan menggunakan layanan kami.</p>

          <h3>2. Model Transaksi (COD Murni)</h3>
          <p>GawaiSeken beroperasi sepenuhnya sebagai platform yang memfasilitasi transaksi <strong>Cash On Delivery (COD) / Ketemuan Langsung</strong>. Kami tidak menahan dana, dan transaksi pembayaran dilakukan langsung secara peer-to-peer antara pembeli dan penjual pada saat pertemuan.</p>
          <ul>
            <li>GawaiSeken <strong>tidak memungut biaya admin</strong> atas transaksi yang dilakukan.</li>
            <li>Risiko transaksi yang dilakukan di luar pengawasan sistem kami adalah tanggung jawab masing-masing pihak (pembeli dan penjual).</li>
            <li>Pengguna disarankan untuk memilih lokasi pertemuan yang aman, ramai, dan pada siang hari.</li>
          </ul>

          <h3>3. Ketentuan Penjual</h3>
          <p>Penjual yang mendaftar dan menawarkan barang di GawaiSeken harus mematuhi aturan berikut:</p>
          <ul>
            <li>Harus menyelesaikan proses Verifikasi Identitas (KYC) yang disediakan oleh platform.</li>
            <li>Dilarang menjual barang ilegal, curian, palsu (replika/HDC), atau barang yang melanggar hak kekayaan intelektual pihak ketiga.</li>
            <li>Harus mendeskripsikan kondisi barang sebenar-benarnya, termasuk minus, lecet, atau kerusakan internal.</li>
            <li>Wajib menepati jadwal dan lokasi pertemuan COD yang telah disepakati bersama pembeli.</li>
          </ul>

          <h3>4. Ketentuan Pembeli</h3>
          <p>Pembeli yang bertransaksi melalui GawaiSeken diwajibkan untuk:</p>
          <ul>
            <li>Beritikad baik saat melakukan penawaran harga (Nego) maupun saat membuat jadwal pertemuan COD.</li>
            <li>Memeriksa fisik, kelengkapan, dan fungsionalitas barang secara menyeluruh saat pertemuan COD sebelum melakukan pembayaran ke penjual.</li>
            <li>Platform tidak memfasilitasi "Return" atau Pengembalian Barang setelah transaksi COD selesai dan barang telah dibawa pulang. Segala bentuk garansi personal tunduk pada kesepakatan antara penjual dan pembeli.</li>
          </ul>

          <h3>5. Penghentian Akses</h3>
          <p>GawaiSeken berhak untuk membekukan atau menghapus akun secara permanen apabila pengguna terbukti melakukan penipuan, spam, menjual barang terlarang, atau melanggar Syarat & Ketentuan ini.</p>

          <h3>6. Penyangkalan (Disclaimer)</h3>
          <p>Layanan GawaiSeken disediakan "sebagaimana adanya". Kami tidak menjamin keakuratan, keandalan, atau kualitas barang yang diiklankan oleh pengguna. Segala sengketa yang timbul pasca-transaksi COD merupakan ranah tanggung jawab pengguna, meski kami menyediakan fitur "Komplain" untuk menengahi atau membekukan akun yang bermasalah.</p>

          <h3>Hubungi Kami</h3>
          <p>Jika Anda memiliki pertanyaan lebih lanjut mengenai Syarat & Ketentuan ini, hubungi kami di <a href="mailto:legal@gawaiseken.id">legal@gawaiseken.id</a>.</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
