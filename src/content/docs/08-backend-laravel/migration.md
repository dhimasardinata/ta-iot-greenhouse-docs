---
title: "Migration"
description: "Rancangan migration minimum yang konsisten dengan controller backend yang tersedia."
---

# Migration

File migration Laravel tidak ada di snapshot source `web/`, tetapi controller menunjukkan struktur minimum yang harus disediakan database. Bagian ini melengkapi rancangan migration dari kebutuhan runtime controller, bukan dari tebakan nama file migration.

## Urutan Pembuatan Tabel

Urutan aman untuk menyiapkan database:

1. `greenhouses`
2. `sensors`
3. `sensor_data`
4. `sensor_snapshots`
5. `device_statuses`
6. `schedules`
7. `camera_data`
8. `firmware_files`
9. `users`, jika dashboard web memakai login berbasis session

`greenhouses` dan `sensors` perlu dibuat lebih awal karena controller memakai `gh_id` dan `sensor_id` hampir di semua jalur data.

## Constraint Minimum

`sensor_snapshots` perlu memiliki unique key:

```sql
UNIQUE KEY sensor_snapshots_sensor_node_unique (sensor_id, node_id)
```

Kunci ini mendukung dua jalur kode:

- `DB::table('sensor_snapshots')->updateOrInsert(...)` di `saveSensorData()`.
- `ON DUPLICATE KEY UPDATE` di `ensureSensorSnapshotsReady()` dan `get_average_sensor_data()`.

`device_statuses` sebaiknya memiliki unique key pada `gh_id` agar heartbeat gateway selalu memperbarui baris yang sama:

```sql
UNIQUE KEY device_statuses_gh_unique (gh_id)
```

## Data Awal

Seeder minimum perlu membuat greenhouse dan sensor yang dipakai mapping controller:

| Nama Sensor | Dipakai Sebagai |
|---|---|
| `Temperature` | `temperature`, kontrol blower |
| `Humidity` | `humidity`, kontrol exhaust/dehumidifier |
| `Light Intensity` | `light_intensity` / `lux`, heatmap cahaya |
| `RSSI` | kualitas sinyal node |

Lanjutkan ke [Database Schema](./database-schema.md).
