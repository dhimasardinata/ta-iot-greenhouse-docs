---
title: "API Sensor"
---

# API Sensor

API sensor menerima dan menyediakan data sensor.

## Method yang Terlihat

`ApiController.php` memiliki method:

- `saveSensorData`
- `get_average_sensor_data`
- `fetchChart`
- `tablePerGH`

## Simpan Data Sensor

`saveSensorData()` memvalidasi:

- `gh_id`
- `node_id`

Lalu mencari sensor berdasarkan greenhouse dan nama sensor:

- `Temperature`
- `Humidity`
- `Light Intensity`
- `RSSI`

Data disimpan ke `sensor_data` dan snapshot terbaru di `sensor_snapshots`.

## Cache yang Dibersihkan

Saat data baru masuk, controller membersihkan cache:

- `gaugeData`
- `monitoring_latest_time`
- `heatmap_sensor_data`
- `heatmap_latest_time`
- `heatmap_thresholds`

## Catatan

Validasi nilai sensor detail belum terlihat kuat di method ini. Halaman file-by-file perlu mengecek risiko data palsu atau nilai ekstrem.

Lanjutkan ke [API Threshold](./api-threshold.md).
