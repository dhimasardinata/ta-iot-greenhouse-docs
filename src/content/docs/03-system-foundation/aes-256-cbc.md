---
title: "AES-256-CBC"
---

# AES-256-CBC

AES-256-CBC adalah salah satu cara mengenkripsi data. AES adalah algoritma enkripsi, 256 menunjukkan ukuran kunci, dan CBC adalah mode operasi.

## Arti Sederhana

Enkripsi adalah proses mengubah data asli menjadi bentuk yang sulit dibaca tanpa kunci. Tujuannya melindungi data dari pihak yang tidak berwenang.

## Di Mana Dipakai

`goal.md` menyebut AES-256-CBC sebagai bagian keamanan sistem. Detail file yang memakai AES harus diverifikasi di source code, terutama di firmware, backend, atau asset web yang berkaitan dengan crypto.

## Hal yang Perlu Hati-hati

Enkripsi harus hati-hati. Beberapa hal penting:

- kunci tidak boleh bocor,
- IV harus digunakan dengan benar,
- data harus divalidasi sebelum dan sesudah dekripsi,
- error dekripsi harus ditangani,
- jangan menyalin rahasia ke dokumentasi.

## Batas Kejujuran

Halaman ini hanya menjelaskan konsep. Cara sistem benar-benar memakai AES-256-CBC harus dibuktikan dari file seperti crypto utility, asset JavaScript, backend, atau konfigurasi terkait.

Lanjutkan ke [Database](./database.md).
