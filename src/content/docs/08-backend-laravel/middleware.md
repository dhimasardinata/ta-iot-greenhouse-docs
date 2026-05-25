---
title: "Middleware"
description: "Lapisan middleware yang perlu mengitari controller agar validasi perangkat, session web, dan cache tetap rapi."
---

# Middleware

Controller di folder `web/` sudah menangani data inti, tetapi autentikasi dan pembatasan akses sebaiknya tidak ditaruh di setiap method controller. Middleware adalah tempat yang lebih tepat untuk aturan lintas endpoint.

## Middleware API Perangkat

Firmware gateway dan node dapat mengirim `Authorization: Bearer ...`, `X-Device-ID`, dan pada jalur tertentu `X-Signature`. Middleware API dapat melakukan empat pekerjaan sebelum request masuk ke controller:

1. Membaca identitas perangkat dari `X-Device-ID`.
2. Memvalidasi token bearer terhadap token perangkat yang disimpan server.
3. Jika signature dipakai, menghitung ulang HMAC payload dan membandingkannya secara constant-time.
4. Menolak request yang gagal sebelum `saveSensorData()`, `postDeviceStatus()`, atau endpoint OTA menjalankan operasi database.

## Middleware Web Dashboard

`PageController` merender halaman Inertia seperti `Monitoring`, `Heatmap`, `Table`, `Camera`, dan `Controlling`. Route web untuk halaman ini sebaiknya berada di grup session auth agar hanya admin yang dapat membuka dashboard dan mengubah threshold/jadwal.

## Pembagian Tanggung Jawab

| Lapisan | Tanggung Jawab |
|---|---|
| Middleware API | Identitas perangkat, bearer token, signature, rate limit. |
| Controller API | Validasi payload, query database, cache invalidation, response JSON. |
| Middleware Web | Session pengguna dan redirect login. |
| PageController | Menyiapkan props Inertia dan data dashboard. |

Dengan pemisahan ini, dokumentasi controller tetap sesuai source, sementara kebutuhan keamanan produksi tetap lengkap dan jelas tempat implementasinya.

Lanjutkan ke [Model](./model.md).
