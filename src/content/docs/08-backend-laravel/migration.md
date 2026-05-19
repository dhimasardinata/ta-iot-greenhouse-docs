---
title: "Migration"
---

# Migration

Migration adalah file Laravel untuk membuat atau mengubah struktur tabel database.

## Status Bukti

Inventory awal tidak menemukan file migration. Karena itu struktur tabel lengkap belum bisa dipastikan dari migration.

## Tabel yang Tersirat dari Controller

Controller menyebut tabel atau model:

- `sensors`
- `sensor_data`
- `sensor_snapshots`
- `camera_data`
- `device_statuses`
- `schedules`
- `greenhouses`
- tabel firmware melalui `FirmwareFile`

## Batas Kejujuran

Kolom, tipe data, index, foreign key, dan constraint dianggap final jika migration atau schema tersedia sebagai bukti.

Lanjutkan ke [Middleware](./middleware.md).
