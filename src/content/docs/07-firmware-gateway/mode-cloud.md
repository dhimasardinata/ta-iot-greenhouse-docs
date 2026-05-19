---
title: "Mode Cloud Gateway"
---

# Mode Cloud Gateway

Mode cloud berarti gateway memakai data dan konfigurasi dari cloud sebagai sumber utama kontrol.

## Bukti dari Kode

`SensorDataManager` memiliki `DataSourceMode` yang menghasilkan string `CLOUD`, `LOCAL`, atau `AUTO`. Fungsi `getModeString()` dan `getConfiguredModeString()` menunjukkan mode runtime dan mode konfigurasi.

`main.cpp` menjalankan cloud fetch bertahap untuk:

- node data,
- threshold,
- schedule,
- camera/fog khusus GH2.

## Data Cloud

Data cloud masuk ke struktur:

- `CloudSensorSnapshot`,
- `CloudThresholdSnapshot`,
- `CloudScheduleSnapshot`,
- `CloudFogSnapshot`.

Setelah fetch berhasil, data diterapkan ke `SensorDataManager` dan `RelayController`.

## Risiko

- endpoint tidak dapat diakses,
- token salah,
- payload cloud tidak lengkap,
- threshold invalid,
- schedule invalid,
- data cloud stale,
- request terlalu lama dan mengganggu kontrol.

Lanjutkan ke [Mode Edge](./mode-edge.md).
