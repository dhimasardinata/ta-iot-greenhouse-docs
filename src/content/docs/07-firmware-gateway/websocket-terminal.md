---
title: "WebSocket Terminal"
---

# WebSocket Terminal

Gateway menyediakan komunikasi realtime lewat WebSocket dan WebSerial.

## Bukti dari Kode

`WebSocketManager.cpp` melakukan:

- encrypt/decrypt payload dengan `CryptoUtils`,
- admin session untuk WebSocket client,
- cache mutation result,
- Wi-Fi scan result cache,
- broadcast status.

`main.cpp` juga memiliki command WebSerial seperti:

- `status`,
- `sdcard_status`,
- `memo_status`,
- `qos_*`,
- `mode cloud/local/auto`,
- `uplink show/direct/relay/auto`,
- `login`,
- `get_now`,
- `formatsdcard`,
- `resetwifi`,
- `reboot`.

## Keamanan Terminal

Kode meminta encrypted frame untuk command WebSerial. Perintah admin membutuhkan login atau token admin session.

## Risiko

- command tanpa autentikasi,
- payload tidak terenkripsi,
- session admin kedaluwarsa,
- mutasi threshold/jadwal bertabrakan dengan loop kontrol,
- terlalu banyak client.

Lanjutkan ke [OTA Update](./ota-update.md).
