---
title: "node/lib/NodeCore/commands/RebootCommand.cpp"
---

# node/lib/NodeCore/commands/RebootCommand.cpp

File ini mengimplementasikan command `reboot`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/RebootCommand.cpp` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini mengirim pesan `Rebooting now...`, mencatat alasan reboot sebagai `COMMAND`, menunggu sebentar, lalu memanggil `ESP.restart()`.

## Hubungan dengan Laporan TA

File ini menunjukkan fitur maintenance jarak dekat melalui terminal lokal.
