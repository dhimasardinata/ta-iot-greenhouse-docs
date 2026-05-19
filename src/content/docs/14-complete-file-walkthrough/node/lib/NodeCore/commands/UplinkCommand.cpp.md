---
title: "node/lib/NodeCore/commands/UplinkCommand.cpp"
---

# node/lib/NodeCore/commands/UplinkCommand.cpp

File ini mengimplementasikan command `uplink`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/UplinkCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Tanpa argumen atau dengan `show`, command menampilkan mode uplink, route cloud aktif, direct URL, dan relay URL. Dengan argumen `auto`, `direct`, atau `relay`, command menyimpan mode baru.

## Error Handling

Argumen tidak dikenal atau save gagal menghasilkan pesan error.

## Hubungan dengan Laporan TA

File ini menjelaskan kontrol operator untuk memilih direct cloud atau relay fallback.
