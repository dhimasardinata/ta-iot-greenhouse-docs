---
title: "node/lib/NodeCore/commands/GetCalibrationCommand.cpp"
---

# node/lib/NodeCore/commands/GetCalibrationCommand.cpp

File ini mengimplementasikan command `getcal`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/GetCalibrationCommand.cpp` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini mencetak tabel kalibrasi: offset suhu, offset kelembapan, dan faktor lux, dibandingkan dengan default hasil compile.

## Error Handling

Jika client WebSocket tidak tersedia atau tidak bisa mengirim, command langsung berhenti.

## Hubungan dengan Laporan TA

File ini membantu operator membuktikan nilai sensor yang tampil sudah melewati koreksi kalibrasi.
