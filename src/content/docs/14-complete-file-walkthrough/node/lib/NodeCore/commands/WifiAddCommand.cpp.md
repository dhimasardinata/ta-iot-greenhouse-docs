---
title: "node/lib/NodeCore/commands/WifiAddCommand.cpp"
---

# node/lib/NodeCore/commands/WifiAddCommand.cpp

File ini mengimplementasikan command `wifiadd`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/WifiAddCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini membaca SSID/password, mendeteksi flag `-h`, memvalidasi panjang SSID dan password, lalu menambahkan credential ke `WifiManager`.

## Error Handling

SSID kosong, SSID terlalu panjang, password terlalu panjang, atau storage credential penuh menghasilkan pesan error.
