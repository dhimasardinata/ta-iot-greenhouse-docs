---
title: "Tabel `sensor_snapshots`"
---

# Tabel `sensor_snapshots`

## Fungsi Tabel

`sensor_snapshots` menyimpan nilai terbaru per sensor dan node.

## Kolom yang Terlihat dari Query

- `sensor_id`
- `node_id`
- `value`
- `recorded_at`
- `created_at`
- `updated_at`

## Dipakai Oleh

- monitoring gauge,
- latest data,
- heatmap,
- actuator status logic,
- average sensor API.

## Kenapa Dipisah dari `sensor_data`

`sensor_data` menyimpan histori panjang. `sensor_snapshots` menyimpan kondisi terbaru agar dashboard lebih cepat.

Lanjutkan ke [Tabel Schedules](./tabel-schedules.md).
