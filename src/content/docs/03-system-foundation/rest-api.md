---
title: "REST API"
---

# REST API

REST API adalah cara umum agar dua program bisa berkomunikasi melalui HTTP atau HTTPS. API seperti pintu resmi untuk mengirim atau mengambil data.

## Contoh API dalam Sistem Greenhouse

API dapat dipakai untuk:

- node mengirim data sensor,
- gateway mengambil rata-rata data sensor,
- gateway mengambil threshold,
- gateway mengambil jadwal,
- web mengambil data monitoring,
- web mengirim perubahan kontrol,
- perangkat mengambil informasi firmware OTA.

Endpoint nyata harus diverifikasi dari controller atau route yang tersedia.

## Request dan Response

Request adalah permintaan. Response adalah jawaban.

Contoh request data sensor:

```json
{
  "gh_id": 1,
  "node_id": 4,
  "temperature": 25.4,
  "humidity": 82.1
}
```

Contoh response sederhana:

```json
{
  "success": true,
  "message": "data diterima"
}
```

Contoh ini hanya ilustrasi. Format nyata harus dibaca dari kode.

## Hal yang Harus Didokumentasikan

Untuk setiap endpoint:

- URL,
- method,
- tujuan,
- siapa yang memakai,
- request,
- response berhasil,
- response gagal,
- validasi,
- tabel database terkait,
- catatan keamanan.

Lanjutkan ke [WebSocket](./websocket.md).
