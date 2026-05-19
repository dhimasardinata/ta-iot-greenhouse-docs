---
title: "node/lib/NodeCore/commands/WifiRemoveCommand.cpp"
---

# node/lib/NodeCore/commands/WifiRemoveCommand.cpp

File ini mengimplementasikan command `wifiremove`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/WifiRemoveCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini mengekstrak SSID dari argumen, menolak penghapusan jaringan built-in, lalu menghapus credential user dari `WifiManager`.

## Error Handling

Argumen kosong, percobaan menghapus jaringan built-in, atau SSID tidak ditemukan menghasilkan pesan error.

## Hubungan dengan Laporan TA

File ini menjelaskan pengelolaan Wi-Fi multi-credential dari terminal node.
