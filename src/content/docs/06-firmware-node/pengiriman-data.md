---
title: "Pengiriman Data"
---

# Pengiriman Data

Pengiriman data dilakukan oleh `ApiClient`.

## Bukti dari Kode

`ApiClient.h` menunjukkan bahwa API client bertanggung jawab pada:

- payload buffer,
- immediate upload,
- queued upload,
- emergency queue,
- upload cloud/edge,
- QoS upload,
- TLS resource guard,
- local gateway fallback,
- signing payload dengan HMAC,
- WebSocket encrypted broadcast.

## Alur Konsep

```mermaid
sequenceDiagram
    participant Sensor
    participant ApiClient
    participant Cache
    participant Target as Cloud/Gateway

    Sensor->>ApiClient: Data sensor
    ApiClient->>ApiClient: Build payload
    ApiClient->>Target: Upload
    Target-->>ApiClient: Response
    ApiClient->>Cache: Simpan atau pop sesuai hasil
```

## Faktor Keberhasilan

Upload berhasil jika:

- data sensor valid,
- payload dapat dibuat,
- heap cukup,
- Wi-Fi tersedia,
- TLS/HTTP siap,
- target menjawab dengan status yang diterima,
- cache pop berhasil jika data berasal dari cache.

## Error yang Mungkin Terjadi

- low memory,
- HTTP timeout,
- TLS gagal,
- target cloud gagal,
- gateway lokal tidak tersedia,
- response bukan sukses,
- payload terlalu besar,
- queue/caching gagal.

## Catatan untuk Pemula

Mengirim data dari perangkat kecil tidak sesederhana `kirim lalu selesai`. Firmware harus menjaga memori, jaringan, retry, cache, dan keamanan sekaligus.

Lanjutkan ke [WebSocket Local](./websocket-local.md).
