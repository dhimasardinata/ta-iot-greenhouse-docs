---
title: "Mode Cloud"
---

# Mode Cloud

Mode cloud berarti node mengirim data ke server cloud.

## Bukti dari Kode

File `node/lib/NodeCore/api/ApiClient.h` mendefinisikan `UploadMode`:

- `AUTO`
- `CLOUD`
- `EDGE`

Mode `CLOUD` berarti upload dipaksa ke cloud saja.

## Peran Cloud

Cloud dipakai untuk:

- menerima payload sensor,
- menyimpan data ke backend/database,
- memberi response berhasil atau gagal,
- menyediakan sumber waktu atau OTA jika dikonfigurasi,
- menjadi sumber dashboard web dan Android.

## Risiko

Mode cloud bergantung pada:

- Wi-Fi,
- DNS,
- HTTPS/TLS,
- token atau autentikasi,
- ketersediaan backend,
- heap cukup untuk HTTP/TLS.

Jika cloud gagal, file API harus menjelaskan apakah data masuk cache, antrean darurat, atau fallback.

## Hal yang Harus Diverifikasi di File-by-File

- URL endpoint cloud,
- format payload,
- header autentikasi,
- response yang dianggap sukses,
- kondisi error,
- backoff dan retry,
- kapan cache dipakai.

Lanjutkan ke [Mode Edge](./mode-edge.md).
