---
title: "Model"
---

# Model

Model Laravel mewakili tabel database.

## Model yang Disebut di Kode

Controller menyebut model:

- `Greenhouse`
- `Schedule`
- `FirmwareFile`
- `CameraData`
- `DeviceStatus`
- `Sensor`
- `SensorData`

## Status Bukti

File model sebenarnya belum ada dalam snapshot inventory awal. Yang terlihat hanya pemakaian model dari controller.

## Yang Perlu Diverifikasi Nanti

Jika file model tersedia, halaman model menjelaskan:

- nama tabel,
- fillable/guarded field,
- relasi,
- casting,
- scope,
- event/model hook,
- risiko mass assignment.

Lanjutkan ke [Migration](./migration.md).
