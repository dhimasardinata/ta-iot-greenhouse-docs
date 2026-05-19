---
title: "node/lib/NodeCore/commands/SetCalibrationCommand.cpp"
---

# node/lib/NodeCore/commands/SetCalibrationCommand.cpp

File ini mengimplementasikan command `setcal`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SetCalibrationCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini membaca tiga angka dari argumen, memvalidasi batas offset dan faktor lux, lalu menyimpan kalibrasi baru.

## Validasi

Lux factor harus lebih dari 0, offset suhu/kelembapan tidak boleh melewati batas firmware, dan lux factor tidak boleh melewati `LUX_FACTOR_MAX`.

## Error Handling

Jika argumen terlalu panjang, format salah, atau nilai melewati batas, command mengirim pesan error dan tidak menyimpan config.

## Hubungan dengan Laporan TA

File ini menjelaskan bagaimana koreksi sensor bisa diubah lewat terminal tanpa flash firmware ulang.
