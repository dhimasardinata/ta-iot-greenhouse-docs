---
title: "IoT Networking Concepts"
---

# IoT Networking Concepts

Konsep jaringan yang sering muncul adalah Wi-Fi, SSID, password, captive portal, NTP, REST API, WebSocket, HTTPS, gateway, cloud, edge, retry, timeout, dan payload JSON.

Pada sistem greenhouse, jaringan menentukan apakah data sensor bisa sampai ke server, apakah gateway bisa mengontrol aktuator, dan apakah operator bisa membuka dashboard lokal.

## Lapisan Jaringan

| Lapisan | Contoh di Project | Masalah yang Ditangani |
|---|---|---|
| Fisik/radio | Wi-Fi RSSI, GPRS SIM800 | sinyal lemah, disconnect, fallback. |
| IP/DNS | host cloud, gateway local, relay URL | DNS gagal, target salah, timeout connect. |
| Transport | HTTP client, TLS client | koneksi putus, TLS handshake, sertifikat. |
| Aplikasi | REST API, WebSocket, JSON | format payload, status response, command realtime. |
| Operasional | retry, cache, watchdog, QoS | jaringan tidak stabil tanpa kehilangan data. |

## Firmware dan Web Sama-Sama Bergantung pada Kontrak

Firmware mengirim payload. Backend membaca field. Frontend menampilkan field. Jika nama field berubah, semua lapisan bisa terdampak.

Contoh kontrak:

- `gh_id`,
- `node_id`,
- `temperature`,
- `humidity`,
- `light_intensity` atau `lux`,
- `rssi`,
- `recorded_at` atau `timestamp`,
- `success`,
- `message`,
- `errors`.

## Timeout dan Retry

Timeout mencegah firmware atau web menunggu selamanya. Retry memberi kesempatan saat jaringan gagal sementara.

Edge case:

- timeout terlalu pendek membuat request sehat dianggap gagal,
- timeout terlalu panjang membuat loop firmware macet,
- retry tanpa backoff bisa membanjiri server,
- retry upload perlu idempotency atau status record agar data tidak dobel.

## Halaman Lanjutan

- [Runtime Jaringan Firmware](./firmware-network-runtime.md)
- [Laravel API dan Database Query](./web-laravel-api-database.md)
- [Vue Reactivity dan UI Greenhouse](./web-vue-reactivity-ui.md)
- [Security, OTA, and Cache](./security-ota-cache.md)
