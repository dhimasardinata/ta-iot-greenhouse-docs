---
title: "WebView Loading"
---

# WebView Loading

Loading WebView adalah proses memuat dashboard web di aplikasi Android.

## Bukti dari Kode

Layout memiliki:

- `LinearLayout` dengan id `loadingScreen`,
- `WebView` dengan id `webView` dan visibility awal `gone`.

Di `onPageFinished()`, kode:

- menyembunyikan loading screen,
- menampilkan WebView.

## URL yang Dibuka

`MainActivity` memanggil:

```txt
webView.loadUrl("https://ta.atomic.web.id/")
```

## Risiko

- koneksi internet tidak tersedia,
- HTTPS/certificate bermasalah,
- halaman web lambat,
- login web redirect,
- loading screen tidak hilang jika page gagal.

Lanjutkan ke [Error Handling](./error-handling.md).
