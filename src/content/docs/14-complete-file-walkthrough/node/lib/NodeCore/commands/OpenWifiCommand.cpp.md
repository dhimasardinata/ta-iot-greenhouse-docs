---
title: "node/lib/NodeCore/commands/OpenWifiCommand.cpp"
---

# node/lib/NodeCore/commands/OpenWifiCommand.cpp

File ini mengimplementasikan command `openwifi`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/OpenWifiCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini menampilkan status Wi-Fi saat ini, memutus koneksi tanpa menghapus credential, membuka portal, lalu menampilkan SSID AP dan alamat `http://192.168.4.1`.

## Catatan Debugging

Gunakan command ini saat perangkat perlu konfigurasi Wi-Fi ulang tetapi masih bisa diakses lewat terminal.
