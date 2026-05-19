---
title: "Sensor Suhu dan Kelembapan"
---

# Sensor Suhu dan Kelembapan

Sensor suhu dan kelembapan membaca kondisi udara greenhouse.

## Bukti dari Kode

`node/lib/NodeCore/sensor/SensorManager.h` memakai `SHTSensor`. File yang sama menyimpan nilai:

- `m_temperature`,
- `m_humidity`,
- status sensor SHT,
- failure count,
- state recovery.

## Data yang Dibaca

Data utama:

| Data | Arti |
|---|---|
| Suhu | Tingkat panas udara. |
| Kelembapan | Banyaknya uap air di udara. |

## Nilai Tidak Valid

Kode mendefinisikan nilai tidak valid:

| Konstanta | Nilai |
|---|---:|
| `INVALID_TEMP` | `-999.0` |
| `INVALID_HUMIDITY` | `-999.0` |

Namun `SensorReading` juga punya field `isValid`, sehingga dokumentasi file-by-file perlu menjelaskan kapan nilai dianggap valid.

## Risiko Hardware

- wiring I2C salah,
- sensor tidak mendapat daya stabil,
- sensor gagal init,
- pembacaan terlalu sering,
- kabel terlalu panjang,
- kelembapan tinggi merusak kontak.

Lanjutkan ke [Sensor Cahaya](./sensor-cahaya.md).
