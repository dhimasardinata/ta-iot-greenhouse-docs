---
title: "Judul dan Latar Belakang"
---

# Judul dan Latar Belakang

Judul sistem yang menjadi acuan dokumentasi ini adalah:

**Integrasi Internet of Things Wireless Sensor Network Berbasis Web dan Android untuk Keamanan Serta Manajemen Data pada Greenhouse Anggrek PT Von Florist**

Dokumentasi ini harus selalu memakai konteks Tugas Akhir IoT Greenhouse. Sistem ini bukan aplikasi bisnis umum dan bukan proyek komersial tanpa konteks penelitian.

## Latar Belakang Sederhana

Greenhouse anggrek membutuhkan kondisi lingkungan yang lebih terkontrol dibanding area terbuka. Suhu, kelembapan, dan cahaya dapat mempengaruhi kondisi tanaman. Jika data lingkungan tidak dipantau dengan baik, pengelola sulit mengetahui perubahan kondisi secara cepat.

Sistem IoT membantu karena perangkat dapat membaca data sensor dan mengirimkannya ke sistem digital. Data tersebut kemudian dapat dilihat melalui web atau Android.

## Masalah Umum yang Ingin Dibantu

Sistem ini dibuat untuk membantu:

1. pemantauan kondisi greenhouse,
2. pengiriman data sensor secara lebih teratur,
3. pengelolaan data historis,
4. kendali aktuator berdasarkan threshold atau jadwal,
5. akses dashboard melalui web dan Android,
6. pengamanan komunikasi data,
7. pembaruan firmware melalui OTA.

## Komponen yang Terlibat

Komponen utama dalam ruang lingkup dokumentasi:

- node sensor,
- gateway IoT,
- backend Laravel,
- frontend Vue.js,
- aplikasi Android WebView,
- database MySQL,
- jaringan Wi-Fi/cloud-edge,
- keamanan HTTPS, token, WebSocket, dan AES-256-CBC,
- caching dan OTA update.

## Batas Kejujuran Dokumentasi

Halaman ini menjelaskan konteks dari `goal.md`. Detail teknis per file tetap harus diverifikasi melalui kode. Jika nanti ada perbedaan antara gambaran umum dan kode aktual, dokumentasi file-by-file harus menulis kondisi sebenarnya.

Lanjutkan ke [Rumusan Masalah](./rumusan-masalah.md).
