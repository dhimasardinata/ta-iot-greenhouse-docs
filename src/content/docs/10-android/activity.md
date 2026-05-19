---
title: "Activity"
---

# Activity

Activity adalah layar utama aplikasi Android.

## Bukti dari Kode

`MainActivity.kt.txt` mewarisi `ComponentActivity` dan menjalankan `onCreate()`.

Di dalam `onCreate()`, activity:

- memuat layout,
- mencari WebView,
- mencari loading screen,
- menyiapkan FCM,
- menyiapkan WebView settings,
- menyiapkan download handler,
- mengatur WebViewClient,
- memuat URL dashboard.

## Catatan

Package name di file snapshot disamarkan sebagai `xxxxxxxxxxxxxxxxxx`, sehingga nama paket final belum terkonfirmasi.

Lanjutkan ke [Permission](./permission.md).
