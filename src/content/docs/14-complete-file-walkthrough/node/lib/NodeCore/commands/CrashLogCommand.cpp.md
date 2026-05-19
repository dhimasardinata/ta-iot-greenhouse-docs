---
title: "node/lib/NodeCore/commands/CrashLogCommand.cpp"
---

# node/lib/NodeCore/commands/CrashLogCommand.cpp

File ini mengimplementasikan command `crashlog` dan `clearcrash`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/CrashLogCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`crashlog` mengalirkan log crash ke WebSocket secara bertahap. `clearcrash` menghapus riwayat crash.

## Isi Penting

| Bagian | Fungsi |
|---|---|
| `WsPrint` | Adapter `Print` yang mengirim buffer ke WebSocket terenkripsi. |
| `CrashHandler::streamLogTo` | Sumber data log crash. |
| `CrashHandler::clearLog` | Penghapus log crash. |

## Error Handling

Jika client tidak ada atau tidak bisa mengirim, `crashlog` langsung berhenti.

## Hubungan dengan Laporan TA

File ini mendukung observabilitas perangkat setelah restart atau crash.
