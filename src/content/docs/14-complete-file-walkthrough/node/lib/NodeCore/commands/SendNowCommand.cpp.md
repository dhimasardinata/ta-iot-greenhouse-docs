---
title: "node/lib/NodeCore/commands/SendNowCommand.cpp"
---

# node/lib/NodeCore/commands/SendNowCommand.cpp

File ini mengimplementasikan command `sendnow`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SendNowCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini meminta node mengirim data sekarang. Jika heap rendah, terminal WebSocket ditutup sementara agar upload HTTPS punya RAM lebih longgar.

## Alur Kerja

1. Kirim pesan `Sending data now`.
2. Cek free heap dan max block.
3. Jika RAM tidak cukup untuk TLS, tutup client terminal dan disable WebSocket sementara.
4. Panggil `ApiClient::requestImmediateUpload`.

## Catatan Debugging

Jika terminal terputus setelah `sendnow`, itu bisa memang disengaja oleh low-heap guard. `ApiClient` akan mencoba restore WebSocket setelah upload selesai.
