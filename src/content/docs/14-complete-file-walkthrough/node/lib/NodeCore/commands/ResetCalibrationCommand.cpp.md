---
title: "node/lib/NodeCore/commands/ResetCalibrationCommand.cpp"
---

# node/lib/NodeCore/commands/ResetCalibrationCommand.cpp

File ini mengimplementasikan command `resetcal`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ResetCalibrationCommand.cpp` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini menulis ulang kalibrasi dari `CompiledDefaults`, menyimpan config, lalu memberi pesan sukses atau gagal.

## Error Handling

Jika client tidak bisa mengirim, command berhenti. Jika `save()` gagal, terminal menerima pesan error.
