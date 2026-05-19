---
title: "Monitoring"
---

# Monitoring

Halaman monitoring menampilkan ringkasan kondisi greenhouse.

## Bukti dari Backend

`PageController::monitoring()` merender `Monitoring` melalui Inertia dan mengirim:

- `gaugeData`
- `latestData`
- `actuatorStatus`

Data `gaugeData` berasal dari `sensor_snapshots` dan `sensors`. `actuatorStatus` dibangun dari snapshot sensor, schedule aktif, dan `device_statuses` jika gateway online.

## Status Frontend

File Vue `Monitoring` tidak terlihat di folder `web/` snapshot ini. Dokumentasi detail UI monitoring perlu file source frontend lengkap.

## Hal yang Harus Dijelaskan Nanti

- gauge suhu/kelembapan/cahaya,
- status actuator,
- waktu data terakhir,
- indikator gateway online/offline,
- error jika data kosong.

Lanjutkan ke [Heatmap](./heatmap.md).
