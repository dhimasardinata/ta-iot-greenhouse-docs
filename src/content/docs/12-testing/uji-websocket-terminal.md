---
title: "Uji WebSocket Terminal"
---

# Uji WebSocket Terminal

Uji WebSocket terminal memastikan operator bisa mengirim command dan membaca status perangkat secara lokal.

## Bukti dari Kode

Firmware node:

- `node/lib/NodeCore/terminal/DiagnosticsTerminal.*`
- `node/lib/NodeCore/web/AppServer.*`
- `node/lib/NodeCore/web/PortalServer.*`
- `node/data/terminal.html`
- `node/data/terminal.js`
- `node/data/terminal.css`

Gateway:

- `gateway/include/WebSerial.h`
- `gateway/src/WebSerial.cpp`
- `gateway/include/WebSocketManager.h`
- `gateway/src/WebSocketManager.cpp`
- `gateway/include/EmbeddedCryptoJs.h`
- `gateway/include/CryptoUtils.h`

## Yang Diuji

- Browser berhasil membuka terminal lokal.
- WebSocket tersambung.
- Command sederhana menghasilkan respons.
- Command admin memerlukan autentikasi jika memang dibuat begitu.
- Pesan terenkripsi bisa didekripsi oleh sisi penerima.
- Koneksi putus tidak membuat firmware crash.

## Skenario Dasar

| Skenario | Harapan |
|---|---|
| Terminal dibuka saat perangkat online | Status awal muncul |
| Command status dikirim | Status perangkat dikirim balik |
| Command salah dikirim | Error jelas, firmware tetap jalan |
| Wi-Fi putus | Terminal disconnect dan bisa reconnect |
| Payload terlalu panjang | Ditolak atau dipotong aman |

## Status Bukti

Kode WebSocket dan terminal terlihat, tetapi file test otomatis terminal belum terlihat. Bagian ini perlu uji manual dengan browser saat perangkat aktif.

Lanjutkan ke [Uji Web dan Android](./uji-web-android.md).
