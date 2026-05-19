---
title: "Error Handling"
---

# Error Handling

Error handling Android menangani kegagalan WebView dan download.

## WebView Error

`MainActivity` override `onReceivedError()` dan menulis log:

- deskripsi error,
- URL request.

Namun UI error khusus untuk pengguna belum terlihat. Loading screen juga tidak jelas apakah disembunyikan saat error.

## Download Error

Download biasa memakai `DownloadManager`. Jika terjadi exception, aplikasi menampilkan Toast `Gagal`.

Blob download diproses lewat JavaScript bridge. Jika konversi gagal, aplikasi menampilkan Toast `Gagal memproses file`.

## Risiko

- error hanya ada di log,
- user tidak mendapat layar retry,
- izin storage gagal,
- blob terlalu besar,
- filename tidak aman.

Lanjutkan ke [Build APK](./build-apk.md).
