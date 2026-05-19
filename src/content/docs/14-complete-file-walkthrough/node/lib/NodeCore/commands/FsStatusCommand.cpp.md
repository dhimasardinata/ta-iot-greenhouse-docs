---
title: "node/lib/NodeCore/commands/FsStatusCommand.cpp"
---

# node/lib/NodeCore/commands/FsStatusCommand.cpp

File ini mengimplementasikan command `fsstatus`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/FsStatusCommand.cpp` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini membaca info LittleFS dan mengirim laporan total, used, dan persen pemakaian ke terminal.

## Error Handling

Jika `LittleFS.info` gagal, terminal menerima pesan error.

## Catatan Debugging

Gunakan command ini saat cache atau file config dicurigai memenuhi filesystem.
