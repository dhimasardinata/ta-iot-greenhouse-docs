---
title: "HTTPS"
---

# HTTPS

HTTPS adalah HTTP yang dilindungi enkripsi TLS. Tujuannya agar data yang lewat jaringan tidak mudah dibaca atau diubah pihak lain.

## Kenapa HTTPS Penting

Sistem greenhouse mengirim data dan mungkin token. Tanpa HTTPS, data bisa lebih mudah disadap pada jaringan yang tidak aman.

HTTPS membantu melindungi:

- data sensor,
- token autentikasi,
- request kontrol,
- informasi firmware OTA,
- komunikasi web dengan backend.

## Sertifikat

HTTPS memakai sertifikat. Perangkat perlu mempercayai sertifikat server agar dapat memastikan sedang berbicara dengan server yang benar.

Pada firmware, sertifikat root atau trust anchor sering disimpan di source/config. Dokumentasi file-by-file harus berhati-hati saat menjelaskan file sertifikat dan tidak menyalin rahasia private key.

## Batasan

HTTPS bukan berarti semua masalah keamanan selesai. Sistem tetap perlu:

- autentikasi,
- validasi input,
- pembatasan akses,
- perlindungan token,
- error handling yang benar.

Lanjutkan ke [AES-256-CBC](./aes-256-cbc.md).
