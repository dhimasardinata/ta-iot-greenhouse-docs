---
title: "node/lib/NodeCore/commands/ClearCacheCommand.cpp"
---

# node/lib/NodeCore/commands/ClearCacheCommand.cpp

File ini mengimplementasikan command `clearcache`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ClearCacheCommand.cpp` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini menghapus cache sensor hanya jika operator mengetik `clearcache yes` atau `clearcache confirm`.

## Error Handling

Jika argumen bukan `yes` atau `confirm`, command hanya mengirim warning dan tidak menghapus data.

## Catatan Debugging

Gunakan command `cache` sebelum dan sesudah `clearcache yes` untuk memastikan cache benar-benar kosong.
