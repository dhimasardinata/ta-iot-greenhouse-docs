---
title: "node/lib/NodeCore/commands/SetCalibrationCommand.h"
---

# node/lib/NodeCore/commands/SetCalibrationCommand.h

Header ini mendeklarasikan command `setcal`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SetCalibrationCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`setcal` mengubah kalibrasi sensor dengan format `setcal <temp> <hum> <lux>`.

## Catatan Keamanan

Command ini perlu autentikasi karena bisa mengubah hasil data sensor.
