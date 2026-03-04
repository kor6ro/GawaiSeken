# GawaiSeken - Marketplace Gawai Bekas

GawaiSeken adalah platform marketplace khusus untuk jual beli gawai (gadget) bekas dengan fitur chat dan dashboard penjual yang intuitif.

## Fitur Utama

- 🏠 **Home**: Jelajahi berbagai gawai bekas berkualitas.
- 📱 **Seller Dashboard**: Kelola produk jualan Anda dengan mudah.
- 💬 **Real-time Chat**: Berkomunikasi langsung dengan penjual/pembeli.
- 🌙 **Dark/Light Mode**: Pengalaman visual yang nyaman di segala kondisi.
- 🔒 **Role Based Access**: Fitur berbeda untuk Penjual dan Pembeli.

## Prasyarat

- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL/MariaDB

## Cara Instalasi (Getting Started)

1. **Clone Repository**
   ```bash
   git clone [url-repository]
   cd GawaiSeken
   ```

2. **Instal Dependensi**
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Jangan lupa sesuaikan konfigurasi database di file `.env`.*

4. **Migrasi Database & Seeding**
   ```bash
   php artisan migrate --seed
   ```

5. **Build Assets**
   ```bash
   npm run build
   # atau untuk development
   npm run dev
   ```

6. **Storage Link**
   ```bash
   php artisan storage:link
   ```

7. **Jalankan Aplikasi**
   ```bash
   php artisan serve
   ```

## Catatan Penting untuk Clone

- **Theme Mode**: Jika theme mode tidak tersimpan, pastikan browser Anda mengizinkan `localStorage`.
- **Vite Development**: Jika mengakses dari perangkat lain di jaringan yang sama, sesuaikan `APP_URL` di `.env` dan jalankan Vite dengan flag `--host`.

## Lisensi

[MIT license](https://opensource.org/licenses/MIT).
