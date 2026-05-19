---
title: "node/lib/NodeCore/commands/SetWifiCommand.cpp"
---

# node/lib/NodeCore/commands/SetWifiCommand.cpp

File ini mengimplementasikan command `setwifi`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SetWifiCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini memecah argumen quoted, memvalidasi SSID/password, menyimpan credential sementara, lalu reboot agar koneksi Wi-Fi baru dipakai.

## Error Handling

SSID kosong/terlalu panjang, password terlalu panjang, karakter tidak aman, atau gagal menyimpan credential menghasilkan pesan error.

## Catatan Debugging

Jika perangkat tidak kembali online setelah `setwifi`, cek SSID/password yang diberikan dan gunakan portal Wi-Fi bila masih tersedia.
