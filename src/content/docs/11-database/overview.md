---
title: "Overview Database"
---

# Overview Database

Database menyimpan data greenhouse, sensor, snapshot sensor, jadwal, status perangkat, kamera, dan firmware.

## Status Bukti

Inventory awal tidak menemukan file migration atau SQL. Tabel yang dijelaskan di bagian ini berasal dari controller Laravel dan belum memuat tipe data/constraint final.

## Tabel yang Terlihat dari Kode

- `greenhouses`
- `sensors`
- `sensor_data`
- `sensor_snapshots`
- `schedules`
- `device_statuses`
- `camera_data`
- tabel model `FirmwareFile` yang nama tabel fisiknya belum terkonfirmasi.

## Prinsip Dokumentasi

Jika migration belum tersedia, jangan mengarang tipe data, foreign key, atau index. Tulis berdasarkan query yang terbukti.

Lanjutkan ke [ERD](./erd.md).
