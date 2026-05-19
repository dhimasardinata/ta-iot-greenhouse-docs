---
title: "node/lib/NodeCore/commands/ModeCommand.cpp"
---

# node/lib/NodeCore/commands/ModeCommand.cpp

File ini mengimplementasikan command `mode`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ModeCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Tanpa argumen atau dengan `show`, command menampilkan mode upload dan status gateway. Dengan argumen `auto`, `cloud`, atau `edge`, command mengubah mode upload.

## Error Handling

Argumen selain `show`, `auto`, `cloud`, atau `edge` menghasilkan pesan penggunaan yang benar.

## Hubungan dengan Laporan TA

File ini menjelaskan kontrol operator untuk memilih jalur cloud atau gateway lokal.
