---
title: "node/lib/NodeCore/commands/SetPortalPassCommand.cpp"
---

# node/lib/NodeCore/commands/SetPortalPassCommand.cpp

File ini mengimplementasikan command `setportalpass`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SetPortalPassCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini memvalidasi panjang password minimal 8 karakter dan karakter aman, lalu menyimpan password portal baru.

## Error Handling

Jika password terlalu pendek, mengandung karakter tidak aman, atau gagal disimpan, terminal menerima pesan error.

## Catatan Keamanan

Password tidak dicetak ulang ke output setelah disimpan.
