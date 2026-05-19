---
title: "node/lib/NodeCore/commands/ReadSensorsCommand.cpp"
---

# node/lib/NodeCore/commands/ReadSensorsCommand.cpp

File ini mengimplementasikan command `read`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ReadSensorsCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini memaksa `SensorManager::handle()`, membuat snapshot efektif dengan `SensorNormalization`, lalu mencetak status suhu, kelembapan, dan cahaya.

## Output

Output menunjukkan status `OK` atau `FAIL`, nilai raw, dan nilai effective untuk tiap sensor.

## Catatan Debugging

Gunakan command ini saat pembacaan sensor di dashboard terlihat aneh, karena ia menunjukkan sebelum dan sesudah kalibrasi.
