---
title: "Batasan Masalah"
---

# Batasan Masalah

Batasan masalah menjelaskan ruang lingkup agar sistem dan dokumentasi tidak melebar tanpa arah.

## Batasan Sistem

Dokumentasi berfokus pada:

- greenhouse anggrek,
- IoT dan WSN,
- node sensor,
- gateway IoT,
- backend Laravel,
- frontend Vue.js,
- Android WebView,
- database MySQL,
- REST API dan WebSocket,
- OTA update,
- caching,
- HTTPS, token, dan AES-256-CBC.

## Batasan Dokumentasi

Dokumentasi menghindari:

1. mengubah konteks menjadi proyek bisnis umum,
2. mengarang fungsi yang tidak terlihat dari kode,
3. menganggap semua endpoint atau tabel ada jika file belum membuktikan,
4. menyalin isi rahasia seperti private key,
5. mendokumentasikan dependency hasil install seolah kode utama TA,
6. melewati file source penting tanpa penjelasan.

## Batasan Bukti

Beberapa hal mungkin belum lengkap di snapshot repository saat ini. Contohnya, file migration database belum terlihat sebagai struktur Laravel lengkap. Untuk bagian seperti ini, penjelasan memakai file yang tersedia, misalnya controller/API, atau file database jika nanti ditambahkan.

## Batasan Perangkat

Node dan gateway berjalan di perangkat embedded. Artinya dokumentasi harus memperhatikan keterbatasan:

- memori,
- koneksi Wi-Fi,
- waktu tunggu jaringan,
- watchdog,
- daya listrik,
- sensor fisik,
- relay atau aktuator.

Lanjutkan ke [Manfaat](./manfaat.md).
