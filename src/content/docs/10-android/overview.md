---
title: "Overview Android"
---

# Overview Android

Aplikasi Android pada snapshot ini adalah wrapper WebView untuk membuka dashboard web TA.

## File yang Tersedia

- `android/AndroidManifest.xml.txt`
- `android/activity_main.xml.txt`
- `android/MainActivity.kt.txt`

## Peran Utama

1. Membuka `https://ta.atomic.web.id/`.
2. Menampilkan loading screen sebelum halaman selesai dimuat.
3. Mengaktifkan JavaScript dan DOM storage.
4. Mendukung download file biasa dan blob export.
5. Mengambil token FCM dan subscribe topic `peringatan_kabut`.

Lanjutkan ke [Cara Kerja Android WebView](./cara-kerja-android-webview.md).
