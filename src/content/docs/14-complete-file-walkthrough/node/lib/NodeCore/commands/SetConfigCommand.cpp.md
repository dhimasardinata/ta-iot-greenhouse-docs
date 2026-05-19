---
title: "node/lib/NodeCore/commands/SetConfigCommand.cpp"
---

# node/lib/NodeCore/commands/SetConfigCommand.cpp

File ini mengimplementasikan command `setconfig`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SetConfigCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini membaca key dan value milidetik, memvalidasi rentang interval, mengubah field timer pada `AppConfig`, lalu menyimpannya.

## Error Handling

Jika format salah, key tidak dikenal, atau value di luar batas `INTERVAL_MIN_MS` sampai `INTERVAL_MAX_MS`, command mengirim error dan tidak menyimpan perubahan.

## Hubungan dengan Laporan TA

File ini menjelaskan cara interval sampling/upload/cache dapat diubah tanpa rebuild firmware.
