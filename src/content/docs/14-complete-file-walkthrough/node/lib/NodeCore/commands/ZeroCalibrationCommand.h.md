---
title: "node/lib/NodeCore/commands/ZeroCalibrationCommand.h"
---

# node/lib/NodeCore/commands/ZeroCalibrationCommand.h

Header ini mendeklarasikan command `zerocal`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ZeroCalibrationCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`zerocal` mengatur kalibrasi netral: offset 0 dan faktor lux 1.

## Perbedaan dengan `resetcal`

`resetcal` kembali ke default compile. `zerocal` selalu memakai nilai netral.
