---
title: "node/lib/NodeCore/commands/CheckUpdateCommand.cpp"
---

# node/lib/NodeCore/commands/CheckUpdateCommand.cpp

File ini mengimplementasikan command `checkupdate`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/CheckUpdateCommand.cpp` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini mengecek apakah Wi-Fi sudah tersambung dan waktu sudah sinkron. Jika aman, command memanggil `forceUpdateCheck()`.

## Alur Kerja

1. Tolak jika Wi-Fi belum `CONNECTED_STA`.
2. Tolak jika waktu NTP belum sync.
3. Beri pesan bahwa update check dijadwalkan.
4. Panggil `OtaManager::forceUpdateCheck`.

## Hubungan dengan Laporan TA

File ini menjelaskan cara operator meminta node mengecek firmware baru lewat terminal.
