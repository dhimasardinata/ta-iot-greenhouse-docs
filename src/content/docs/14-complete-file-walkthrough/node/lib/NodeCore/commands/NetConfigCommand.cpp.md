---
title: "node/lib/NodeCore/commands/NetConfigCommand.cpp"
---

# node/lib/NodeCore/commands/NetConfigCommand.cpp

File ini mengimplementasikan command `netconfig`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/NetConfigCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini mencetak URL upload/OTA, relay upload URL, status token, gateway GH1/GH2, mode upload, mode uplink, route cloud aktif, dan status gateway.

## Error Handling

Argumen selain kosong atau `show` ditolak dengan pesan penggunaan.

## Catatan Keamanan

File ini tidak mencetak token asli. Output hanya menampilkan status seperti `empty`, `factory-default`, `set`, atau `override-set`.
