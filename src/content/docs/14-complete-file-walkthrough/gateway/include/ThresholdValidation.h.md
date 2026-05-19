---
title: "gateway/include/ThresholdValidation.h"
---

# gateway/include/ThresholdValidation.h

File ini berisi validasi rentang threshold sensor.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/ThresholdValidation.h` |
| Komponen | Firmware Gateway |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Threshold menentukan batas aman suhu, kelembapan, dan cahaya. Jika threshold salah, aktuator bisa menyala atau mati pada kondisi yang tidak tepat. File ini memastikan nilai minimum dan maksimum berada di rentang yang masuk akal.

## Batas yang Terlihat

| Sensor | Minimum allowed | Maximum allowed |
|---|---:|---:|
| Temperature | -20 | 80 |
| Humidity | 0 | 100 |
| Light Intensity | 0 | 65535 |

Semua range juga harus memenuhi `minValue < maxValue`.

## Fungsi Utama

| Fungsi | Tujuan |
|---|---|
| `isTemperatureRangeValid(...)` | Validasi threshold suhu. |
| `isHumidityRangeValid(...)` | Validasi threshold kelembapan. |
| `isLightRangeValid(...)` | Validasi threshold cahaya. |
| `isRangeValidForName(...)` | Memilih validasi berdasarkan nama sensor. |

## Data Masuk

Data masuk berupa nama sensor dan pasangan nilai minimum/maksimum.

## Data Keluar

Data keluar berupa `true` jika valid dan `false` jika tidak valid.

## Kapan Dipakai

File ini dipakai sebelum gateway menerima atau menyimpan threshold dari cloud, dashboard, atau mode lokal.

## Error yang Mungkin Terjadi

- Nama sensor harus cocok dengan string `Temperature`, `Humidity`, atau `Light Intensity`.
- Nilai NaN/inf akan ditolak.
- Jika minimum lebih besar atau sama dengan maksimum, threshold ditolak.

## Bagian untuk Pemula

File ini mengecek batas bawah dan batas atas. Misalnya batas minimum tidak boleh lebih besar dari batas maksimum.

## Bagian Advanced

Validasi berbasis string nama sensor mudah dibaca, tetapi rawan mismatch jika backend mengganti label sensor. Kontrak nama sensor perlu dijaga.

## Hubungan ke Sistem TA

Threshold valid membantu gateway mengendalikan fan, dehumidifier, dan blower berdasarkan batas greenhouse yang benar.
