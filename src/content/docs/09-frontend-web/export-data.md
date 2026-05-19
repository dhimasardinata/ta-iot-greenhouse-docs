---
title: "Export Data"
---

# Export Data

Export data adalah fitur mengunduh data dari dashboard.

## Status Bukti

File frontend export tidak terlihat di snapshot ini. Namun Android `MainActivity.kt.txt` menyiapkan handler download, termasuk blob download dari WebView.

## Bukti Android

Android WebView menambahkan JavaScript interface `AndroidBlobHandler` untuk mengubah blob base64 menjadi file di folder Downloads. Ini menunjukkan web kemungkinan punya fitur export berbasis download/blob.

## Yang Perlu Diverifikasi

- tombol export berada di halaman mana,
- format file export,
- endpoint yang dipakai,
- apakah memakai blob,
- izin Android yang diperlukan,
- error saat download gagal.

Lanjutkan ke [Controlling Threshold](./controlling-threshold.md).
