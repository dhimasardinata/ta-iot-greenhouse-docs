---
title: "Tabel `sensor_data`"
---

# Tabel `sensor_data`

## Fungsi Tabel

`sensor_data` menyimpan data historis sensor.

## Kolom yang Terlihat dari Query

- `id`
- `sensor_id`
- `node_id`
- `value`
- `recorded_at`
- `created_at`
- `updated_at`

## Dipakai Oleh

- `ApiController::saveSensorData()`
- `ApiController::tablePerGH()`
- `ApiController::fetchChart()`
- inisialisasi `sensor_snapshots`

## Catatan Performa

Query tabel historis bisa berat. Kode memakai `sensor_snapshots` untuk data terbaru agar dashboard tidak selalu membaca seluruh histori.

Lanjutkan ke [Tabel Sensor Snapshots](./tabel-sensor-snapshots.md).
