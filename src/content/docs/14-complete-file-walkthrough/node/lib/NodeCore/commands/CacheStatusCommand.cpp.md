---
title: "node/lib/NodeCore/commands/CacheStatusCommand.cpp"
---

# node/lib/NodeCore/commands/CacheStatusCommand.cpp

File ini mengimplementasikan command `cache`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/CacheStatusCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini mencetak status cache RTC, LittleFS, emergency queue, head/tail cache, dan estimasi waktu penampungan data berdasarkan interval sampling.

## Isi Penting

| Bagian | Fungsi |
|---|---|
| `formatDuration` | Mengubah milidetik menjadi teks menit/jam/hari. |
| `kWorstCaseLittleFsRecordBytes` | Estimasi ukuran record LittleFS terburuk. |
| `execute` | Mengambil status cache dan mengirim laporan ke WebSocket. |

## Error Handling

Jika client tidak ada atau tidak bisa mengirim, command langsung berhenti.

## Catatan Debugging

Jika cache penuh, lihat baris `RTC`, `LittleFS`, dan `Emergency Backpressure` dari output command ini.
