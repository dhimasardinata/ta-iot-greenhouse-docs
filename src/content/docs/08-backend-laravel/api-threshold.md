---
title: "API Threshold"
---

# API Threshold

API threshold mengatur batas sensor yang dipakai dashboard dan gateway.

## Bukti dari Kode

`ApiController::updateThresholds()` menerima array `thresholds`. Setiap item mengandung:

- `sensor_id`
- `threshold_min`
- `threshold_max`

Controller lalu update tabel `sensors`.

## Cache yang Dibersihkan

Setelah update, cache berikut dibersihkan:

- `heatmap_thresholds`
- `controlling_data`

## Hubungan dengan Gateway

Gateway mengambil threshold cloud melalui `MyNetworkManager::fetchThresholds()` dan menyimpannya di `SensorDataManager`.

## Risiko

- threshold_min lebih besar dari threshold_max,
- sensor_id tidak valid,
- user tidak berhak mengubah threshold,
- cache gateway belum refresh.

Validasi lengkap endpoint harus dicek di route dan controller file-by-file.

Lanjutkan ke [API Schedule](./api-schedule.md).
