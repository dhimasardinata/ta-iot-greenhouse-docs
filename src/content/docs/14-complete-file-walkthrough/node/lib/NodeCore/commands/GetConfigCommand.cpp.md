---
title: "node/lib/NodeCore/commands/GetConfigCommand.cpp"
---

# node/lib/NodeCore/commands/GetConfigCommand.cpp

File ini mengimplementasikan command `getconfig`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/GetConfigCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini membaca config aktif, URL upload/OTA, gateway GH1/GH2, status token, status provisioned, dan interval timer, lalu mencetaknya ke terminal.

## Catatan Keamanan

Upload token dan portal password disembunyikan. File ini hanya menampilkan apakah token kosong, default pabrik, override, atau sudah di-set.

## Catatan Debugging

Gunakan command ini saat node upload ke endpoint salah, interval tidak sesuai, atau status token diragukan.
