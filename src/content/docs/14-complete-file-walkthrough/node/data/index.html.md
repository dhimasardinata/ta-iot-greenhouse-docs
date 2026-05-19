---
title: "node/data/index.html"
---

# node/data/index.html

File ini adalah dashboard lokal utama node sensor.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/data/index.html` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas menampilkan halaman web lokal saat pengguna membuka alamat node. Dari halaman ini pengguna bisa melihat status node, nilai sensor, koneksi Wi-Fi, jaringan tersimpan, tautan terminal, dan tautan update firmware.

## Posisi File dalam Sistem

File ini adalah asset runtime untuk `AppServer`. Saat node sudah berjalan normal, route `/` mengirim isi dashboard ini dari header hasil generator `generated/WebAppData.h`.

## Kenapa File Ini Dibutuhkan

Node tidak hanya mengirim data ke cloud. Node juga harus bisa diperiksa secara lokal oleh operator. Halaman ini menjadi dashboard ringan langsung dari ESP8266 tanpa perlu backend Laravel.

## Kapan File Ini Dipakai

File ini dipakai ketika browser membuka `/` pada node yang sudah masuk mode aplikasi normal. File ini juga dipakai saat operator ingin melihat status cepat, mengelola Wi-Fi tersimpan, membuka terminal, atau masuk halaman OTA lokal.

## Alur Kerja File

1. Browser membuka `/`.
2. Firmware mengirim HTML dashboard ini.
3. JavaScript menjalankan `syncClientTime()`.
4. `refreshData()` mengambil `/api/status`.
5. Nilai suhu, kelembapan, lux, uptime, firmware, node id, Wi-Fi, IP, dan heap ditampilkan.
6. `loadSavedNetworks()` mengambil `/api/wifi/saved`.
7. Fitur Wi-Fi memakai `/networks`, `/save`, dan `/forget`.
8. Fitur format filesystem memakai `/api/fs/format`.

## API yang Dipakai

| Endpoint | Fungsi |
|---|---|
| `/api/status` | Mengambil status node dan pembacaan sensor. |
| `/api/time?epoch=...` | Mengirim waktu browser ke node jika NTP belum valid. |
| `/networks` | Mengambil daftar jaringan Wi-Fi yang terlihat. |
| `/save` | Menyimpan atau mencoba kredensial Wi-Fi. |
| `/forget` | Menghapus jaringan Wi-Fi tersimpan. |
| `/api/wifi/saved` | Mengambil daftar kredensial Wi-Fi tersimpan. |
| `/api/fs/format` | Menjadwalkan format filesystem. |

## Konsep Dasar yang Perlu Dipahami

- HTML membentuk struktur halaman.
- CSS di dalam file mengatur tampilan dashboard.
- JavaScript mengambil data dari firmware memakai `fetch()`.
- REST endpoint lokal adalah alamat seperti `/api/status` yang dijawab langsung oleh ESP8266.
- Local dashboard berarti halaman berjalan tanpa server cloud.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/lib/NodeCore/web/AppServer.Routes.cpp` | Mendaftarkan route `/`, `/api/status`, Wi-Fi, dan format filesystem. |
| `node/include/generated/WebAppData.h` | Menampung hasil konversi HTML ini menjadi array firmware. |
| `node/scripts/web_to_header.py` | Menghasilkan header asset dari file di `node/data/`. |

## Input

Input berasal dari response JSON firmware, hasil scan Wi-Fi, input SSID/password, tombol format filesystem, dan waktu browser.

## Output

Output berupa tampilan dashboard, request HTTP ke firmware, perubahan daftar Wi-Fi lokal, dan permintaan format filesystem jika dikonfirmasi.

## Error Handling

Jika `/api/status` gagal, error dicatat ke browser console. Jika scan Wi-Fi gagal, halaman menampilkan pesan gagal. Jika format filesystem ditolak, halaman menampilkan alert gagal.

## Catatan Keamanan

Halaman ini dapat mengirim password Wi-Fi lewat `/save` dan bisa meminta format filesystem. Karena itu route firmware yang menerima request harus melakukan validasi, pembatasan input, dan perlindungan terhadap aksi berbahaya.

## Catatan Performa

File ini besar untuk ukuran ESP8266 karena berisi CSS dan JavaScript dashboard. Karena itu file dikonversi ke `WebAppData.h` agar dapat disajikan dari flash, bukan dibuat dinamis di heap.

## Catatan Debugging

Jika dashboard kosong atau nilai tidak berubah, cek response `/api/status` di browser devtools dan log `APP` pada firmware. Jika Wi-Fi list tidak muncul, cek route `/networks`.

## Hubungan dengan Laporan TA

File ini mendukung pembahasan dashboard lokal node, pemantauan sensor, konfigurasi Wi-Fi, operasi edge/local, dan debugging perangkat.
