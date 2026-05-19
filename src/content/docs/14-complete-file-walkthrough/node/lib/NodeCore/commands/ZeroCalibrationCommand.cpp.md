---
title: "node/lib/NodeCore/commands/ZeroCalibrationCommand.cpp"
---

# node/lib/NodeCore/commands/ZeroCalibrationCommand.cpp

File ini mengimplementasikan command `zerocal`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ZeroCalibrationCommand.cpp` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini menyimpan kalibrasi `0.0`, `0.0`, dan `1.0`, lalu menampilkan nilai baru serta default firmware sebagai pembanding.

## Catatan Debugging

Gunakan command ini untuk membedakan apakah masalah sensor berasal dari pembacaan raw atau dari nilai kalibrasi.
