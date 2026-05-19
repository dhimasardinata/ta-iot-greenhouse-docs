---
title: "WebSocket Local"
---

# WebSocket Local

WebSocket lokal dipakai untuk komunikasi dua arah antara browser dan firmware node.

## Bukti dari Kode

Di `node/src/main.cpp`, `Runtime` membuat:

- `AsyncWebServer server`
- `AsyncWebSocket ws` dengan path `/ws`
- `DiagnosticsTerminal terminal`
- `AppServer`
- `PortalServer`

Observer `WifiMemoryModeObserver` mengaktifkan WebSocket saat Wi-Fi masuk `CONNECTED_STA` dan menonaktifkan/menyesuaikan resource saat portal mode.

## Fungsi WebSocket

WebSocket dapat dipakai untuk:

- terminal diagnostik,
- broadcast status,
- output command,
- pesan upload,
- komunikasi terenkripsi jika `ApiClient.broadcastEncrypted` dipakai.

## Portal dan App Server

`PortalServer` menangani captive portal dan konfigurasi Wi-Fi. `AppServer` menangani route aplikasi lokal, status, konfigurasi, Wi-Fi saved request, time request, format filesystem, dan OTA upload web.

## Risiko

- WebSocket memakai RAM,
- terlalu banyak client bisa mengganggu perangkat,
- command harus dibatasi,
- session harus timeout,
- input harus disanitasi.

Konstanta `MAX_WS_CLIENTS`, `WS_SESSION_TIMEOUT_MS`, `MAX_WS_PACKET_SIZE`, dan `INPUT_SANITIZE_MAX_LEN` berada di `constants.h`.

Lanjutkan ke [OTA Update](./ota-update.md).
