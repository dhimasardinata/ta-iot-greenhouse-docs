---
title: "API Average Sensor"
---

# API Average Sensor

Average sensor API menyediakan nilai rata-rata sensor untuk monitoring.

## Bukti dari Kode

`ApiController::get_average_sensor_data()` memakai `sensor_snapshots` dan `sensors`, lalu menghitung rata-rata berdasarkan nama sensor untuk greenhouse tertentu.

Response menyertakan:

- `temperature`
- `humidity`
- `light_intensity`
- `last_recorded_at`

## Optimasi Snapshot

Controller mencoba mengisi `sensor_snapshots` dari `sensor_data` jika snapshot belum siap. Ini menghindari full table scan berat di request berikutnya.

## Risiko

- snapshot belum terinisialisasi,
- data hari ini kosong,
- nama sensor tidak konsisten,
- cache stale,
- query berat jika table besar.

Lanjutkan ke [API Firmware OTA](./api-firmware-ota.md).
