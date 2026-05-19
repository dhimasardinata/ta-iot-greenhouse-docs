---
title: "Batasan Masalah"
---

# Batasan Masalah

Batasan masalah menjelaskan ruang lingkup agar sistem dan dokumentasi tidak melebar tanpa arah.

## Batasan Sistem

Berdasarkan `goal.md`, dokumentasi berfokus pada:

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

Dokumentasi tidak boleh:

1. mengubah konteks menjadi proyek bisnis umum,
2. mengarang fungsi yang tidak terlihat dari kode,
3. menganggap semua endpoint atau tabel ada jika file belum membuktikan,
4. menyalin isi rahasia seperti private key,
5. mendokumentasikan dependency hasil install seolah kode utama TA,
6. melewati file source penting tanpa alasan.

## Batasan Bukti

Beberapa hal mungkin belum lengkap di repository snapshot saat ini. Contoh: file migration database belum terlihat sebagai struktur Laravel lengkap. Jika dokumen database dibuat, buktinya harus berasal dari file yang tersedia, misalnya controller/API, atau dari file database jika nanti tersedia.

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
