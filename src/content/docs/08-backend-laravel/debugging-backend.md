---
title: "Debugging Backend"
description: "Panduan praktis diagnosis error server Laravel, pemantauan berkas log, pemecahan masalah FCM, dan pemeliharaan cache dasbor."
---

# Debugging Backend

Central Hub Laravel harus selalu dipelihara agar selalu tanggap menerima kiriman data sensor 24 jam non-stop. Bagian ini menjelaskan langkah-langkah diagnostik praktis untuk melacak kesalahan database, mengaudit lalu lintas API, serta mendeteksi kegagalan integrasi eksternal.

---

## 1. Pemantauan Berkas Log Utama (`laravel.log`)

Seluruh pesan kesalahan PHP, kegagalan kueri basis data, hingga kesalahan eksekusi middleware dicatat di berkas log internal Laravel yang berlokasi di:
`[storage/logs/laravel.log](file:///home/dhimasardinata/Dokumen/ta/web)` *(lokasi di folder runtime backend)*

### Cara Membaca Log secara Real-Time via Terminal:
Untuk memantau log masuk secara langsung saat pengujian perangkat keras berlangsung, gunakan perintah `tail` di terminal Linux:
```bash
tail -f storage/logs/laravel.log
```

---

## 2. Diagnosis Kegagalan Firebase Cloud Messaging (FCM)

Saat kamera mendeteksi kabut, [ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php) memicu pengiriman notifikasi ke topic Firebase. Jika pengguna tidak menerima notifikasi di ponselnya, audit alur berikut:

1.  **Cek Log Inisiasi**: Cari baris log berikut di `laravel.log` untuk memastikan status `isFoggy` bernilai true dan terbaca oleh controller:
    `Triggering FCM for GH 1. isFoggy=true`
2.  **Cek Log Pengiriman**: Jika server Firebase berhasil memproses request, log akan mencatat:
    `FCM sent successfully for GH 1`
3.  **Lacak Stack Trace Gagal**: Jika koneksi internet server terputus atau binding `firebase.messaging` gagal dipakai, blok `catch` akan mencatat error detail beserta jejak eksekusinya:
    `FCM Error: [Pesan Kesalahan dari Firebase API]`

---

## 3. Pemeliharaan dan Pembersihan Cache Manual

Karena dasbor web IoT mengandalkan cache agresif untuk menahan kueri SQL berat, adakalanya cache menjadi tersumbat (*stale*) setelah perubahan data fisik di database manual (seperti mengubah relasi sensor langsung via MySQL client).

Gunakan perintah `php artisan` untuk membersihkan cache secara terarah:

*   **Bersihkan Cache Data Aplikasi**: Menghapus seluruh cache monitoring, rata-rata gauge, dan jadwal:
    ```bash
    php artisan cache:clear
    ```
*   **Bersihkan Cache Konfigurasi & Routing**: Digunakan saat menambahkan route API baru atau mengubah file `.env`:
    ```bash
    php artisan config:clear
    php artisan route:clear
    ```

---

## 4. Troubleshooting Kueri Berkinerja Lambat

Jika tabel `sensor_data` bertumbuh sangat cepat dan halaman dasbor monitoring mulai mengalami timeout (HTTP 504), lakukan tindakan preventif berikut:

1.  **Pastikan Migrasi Snapshot Berjalan**: Verifikasi tabel `sensor_snapshots` sudah terisi data. Jika kosong, hapus cache inisialisasi agar query regenerasi snapshot dipicu ulang oleh backend:
    ```php
    Cache::forget('sensor_snapshots_initialized');
    ```
2.  **Periksa query yang dipakai controller**: mulai dari query `sensor_snapshots`, `sensor_data`, dan `schedules` yang ada di `ApiController.php` dan `PageController.php`, karena tiga tabel itu menjadi jalur baca paling berat.

Lanjutkan ke bagian **[Overview Frontend Web](./../09-frontend-web/overview.md)** untuk mempelajari bagaimana sisi client mengonsumsi API ini.
