---
title: "Debugging Dasar"
---

# Debugging Dasar

Debugging adalah proses mencari penyebab masalah. Debugging bukan menebak. Debugging dilakukan dengan membaca gejala, mencari bukti, lalu menguji kemungkinan penyebab.

## Contoh Masalah di Sistem IoT Greenhouse

Contoh masalah yang mungkin terjadi:

- node tidak mengirim data,
- gateway tidak mengambil threshold,
- relay tidak menyala,
- data di dashboard kosong,
- API memberi error,
- Android WebView gagal membuka halaman,
- OTA update gagal,
- data sensor terlihat tidak masuk akal.

## Langkah Debugging Umum

Gunakan urutan ini:

1. Catat gejala.
2. Cari komponen yang terdampak.
3. Cek log paling dekat dengan masalah.
4. Cek input yang masuk.
5. Cek output yang keluar.
6. Cek error handling.
7. Cek dependency seperti Wi-Fi, server, database, atau sensor fisik.
8. Uji perubahan kecil.

## Debugging Firmware

Untuk firmware, tempat cek utama biasanya:

- Serial Monitor,
- log boot,
- status Wi-Fi,
- nilai sensor,
- status cache,
- response API,
- status relay,
- tegangan dan wiring.

Firmware juga bisa gagal karena memori kecil, watchdog, delay terlalu lama, atau jaringan tidak stabil.

## Debugging Backend

Untuk backend, tempat cek utama:

- log Laravel,
- response API,
- status code HTTP,
- database,
- validasi request,
- middleware atau autentikasi.

Jika data tidak masuk database, cek apakah request benar-benar sampai ke endpoint dan apakah validasinya lolos.

## Debugging Frontend dan Android

Untuk frontend, cek:

- browser console,
- Network tab,
- response API,
- state komponen,
- error tampilan.

Untuk Android WebView, cek:

- permission internet,
- URL yang dibuka,
- error WebView,
- koneksi ponsel,
- certificate atau HTTPS jika relevan.

## Jangan Langsung Mengubah Banyak Hal

Saat debugging, jangan mengubah banyak bagian sekaligus. Jika banyak perubahan dilakukan bersamaan, sulit tahu perubahan mana yang memperbaiki masalah atau membuat masalah baru.

## Kesimpulan

Debugging adalah mencari bukti. Pada sistem ini, bukti bisa berasal dari log firmware, API, database, browser, Android, atau perangkat fisik. Dokumentasi file-by-file nanti harus mencatat cara debugging untuk setiap file penting.

Kembali ke [Peta Belajar](../00-start-here/peta-belajar.md).
