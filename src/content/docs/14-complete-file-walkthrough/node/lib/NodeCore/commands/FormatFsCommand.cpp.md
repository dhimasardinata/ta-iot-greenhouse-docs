---
title: "node/lib/NodeCore/commands/FormatFsCommand.cpp"
---

# node/lib/NodeCore/commands/FormatFsCommand.cpp

File ini mengimplementasikan command `format`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/FormatFsCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini memformat LittleFS hanya jika operator memberi argumen `yes` atau `confirm`.

## Alur Kerja

1. Tolak tanpa konfirmasi.
2. Beri pesan bahwa LittleFS sedang diformat.
3. Matikan watchdog sementara.
4. Panggil `LittleFS.format()`.
5. Aktifkan watchdog lagi.
6. Laporkan sukses atau gagal.

## Catatan Debugging

Jika format gagal, sistem menyarankan reboot manual sebelum mencoba lagi.
