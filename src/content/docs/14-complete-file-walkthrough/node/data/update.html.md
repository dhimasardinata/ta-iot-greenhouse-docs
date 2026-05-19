---
title: "node/data/update.html"
---

# node/data/update.html

File ini adalah halaman upload firmware OTA lokal.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/data/update.html` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas menyediakan form upload file `.bin` firmware dan password admin untuk melakukan update firmware node lewat browser lokal.

## Posisi File dalam Sistem

`AppServer.Routes.cpp` mengirim file ini pada route `GET /update` dan menerima upload firmware pada `POST /update`.

## Kenapa File Ini Dibutuhkan

OTA lokal berguna ketika operator ingin memperbarui firmware dari jaringan lokal tanpa kabel USB dan tanpa menunggu update cloud.

## Alur Kerja File

1. Pengguna membuka `/update`.
2. Pengguna memasukkan password admin.
3. Pengguna memilih file firmware `.bin`.
4. JavaScript membuat `FormData`.
5. `XMLHttpRequest` mengirim data ke `POST /update`.
6. Progress upload ditampilkan.
7. Jika server mengembalikan sukses, halaman menampilkan pesan berhasil.
8. Jika gagal, halaman menampilkan pesan error.

## Input

| Input | Fungsi |
|---|---|
| Password admin | Digunakan firmware untuk otorisasi update. |
| File `.bin` | Binary firmware yang akan dipasang. |
| Drag and drop file | Alternatif memilih file. |

## Output

Output berupa request upload multipart ke `/update`, progress bar, dan pesan sukses/gagal.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/lib/NodeCore/web/AppServer.Routes.cpp` | Mendaftarkan route `GET /update` dan `POST /update`. |
| `node/src/Application.cpp` | Menjalankan flash firmware dari `/update.bin` saat diminta. |
| `node/include/generated/WebAppData.h` | Menyimpan halaman update sebagai asset firmware. |

## Error Handling

Halaman menangani upload progress, status HTTP sukses/gagal, dan error koneksi. Validasi lebih kuat seperti password benar, ukuran file, ruang flash, dan proses write firmware dilakukan oleh firmware.

## Catatan Keamanan

File ini sangat sensitif karena bisa mengganti firmware. Password admin wajib divalidasi di server. File yang diterima harus benar-benar firmware valid dan route upload tidak boleh terbuka bebas.

## Catatan Performa

Upload firmware dapat memakai memori dan waktu cukup besar. Di firmware, jalur OTA perlu menjaga watchdog, pause sensor/API, dan memastikan ruang flash cukup.

## Catatan Debugging

Jika upload gagal, cek status HTTP dari `/update`, log `FLASH`/`APP`, ukuran file `.bin`, password admin, dan apakah LittleFS/flash cukup.

## Hubungan dengan Laporan TA

File ini mendukung pembahasan OTA update, maintenance firmware, dan operasi perangkat setelah instalasi di greenhouse.
