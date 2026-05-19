---
title: "Security, OTA, and Cache"
---

# Security, OTA, and Cache

Keamanan muncul lewat HTTPS/TLS, trust anchor, token, AES-256-CBC, dan validasi request. OTA memungkinkan firmware diperbarui lewat jaringan. Cache menjaga data tetap tersimpan saat koneksi bermasalah.

Tiga konsep ini saling terkait: sistem harus tetap aman, bisa diperbarui, dan tidak langsung kehilangan data saat jaringan greenhouse tidak stabil.

## Keamanan

Keamanan di project ini muncul di beberapa titik:

- TLS trust anchor untuk HTTPS,
- token upload dan token OTA,
- AES-256-CBC untuk payload lokal tertentu,
- session admin,
- replay window,
- validasi input command,
- pembatasan URL insecure,
- redaksi token pada log.

Edge case:

- waktu perangkat salah dapat mengganggu TLS atau replay protection,
- token kosong perlu fallback atau penolakan jelas,
- payload terenkripsi tetap perlu autentikasi dan validasi,
- private key atau token produksi tidak disalin ke dokumentasi publik,
- terminal lokal perlu timeout dan pembatasan command.

## OTA

OTA punya tiga risiko besar:

1. file firmware salah,
2. koneksi putus,
3. boot setelah update gagal.

Karena itu firmware perlu mengecek ukuran file, token, ruang flash, progress, timeout, dan status boot setelah reboot.

## Cache

Cache dipakai agar data sensor tidak langsung hilang ketika jaringan gagal. Cache perlu CRC, batas ukuran, backpressure, dan strategi pengiriman ulang.

Edge case:

- record korup,
- cache penuh,
- data sudah dikirim tetapi gagal dihapus,
- power loss saat write,
- recovery setelah crash berulang.

## Halaman Lanjutan

- [Storage, Cache, dan OTA Firmware](./firmware-storage-cache-ota.md)
- [Runtime Jaringan Firmware](./firmware-network-runtime.md)
- [Web UI Tertanam di Firmware](./firmware-embedded-web-ui.md)
- [Peta Memori Embedded](./embedded-memory-map.md)
- [Laravel API dan Database Query](./web-laravel-api-database.md)
