---
title: "node/lib/NodeCore/commands/SetTimeCommand.cpp"
---

# node/lib/NodeCore/commands/SetTimeCommand.cpp

File ini mengimplementasikan command `settime`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SetTimeCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini menerima epoch detik atau tanggal `YYYY-MM-DD HH:MM:SS` / `YYYY-MM-DDTHH:MM:SS`, mengubahnya menjadi epoch, lalu memanggil `NtpClient::setManualTime`.

## Error Handling

Argumen kosong, format salah, atau epoch tidak valid menghasilkan pesan error.

## Hubungan dengan Laporan TA

File ini menjelaskan jalur manual untuk memastikan timestamp data sensor tetap benar ketika NTP belum tersedia.
