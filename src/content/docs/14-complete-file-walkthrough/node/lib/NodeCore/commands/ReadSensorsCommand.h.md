---
title: "node/lib/NodeCore/commands/ReadSensorsCommand.h"
---

# node/lib/NodeCore/commands/ReadSensorsCommand.h

Header ini mendeklarasikan command `read`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ReadSensorsCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`read` membaca nilai sensor saat ini dan menampilkan nilai mentah serta nilai setelah koreksi konfigurasi.

## Dependency Internal

Command ini memakai `SensorManager` untuk pembacaan sensor dan `ConfigManager` untuk offset/scaling.
