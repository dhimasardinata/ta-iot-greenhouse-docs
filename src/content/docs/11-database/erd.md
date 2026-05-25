---
title: "Entity Relationship Diagram (ERD)"
description: "Relasi operasional antartabel yang dipakai controller backend."
---

# Entity Relationship Diagram (ERD)

Diagram ini menggambarkan relasi operasional yang dibutuhkan controller. Label `FK` dibaca sebagai kolom penghubung yang dipakai kode, bukan klaim nama constraint migration.

```mermaid
erDiagram
    GREENHOUSES ||--o{ SENSORS : has
    GREENHOUSES ||--o| DEVICE_STATUSES : reports
    GREENHOUSES ||--o{ SCHEDULES : schedules
    GREENHOUSES ||--o{ CAMERA_DATA : stores
    SENSORS ||--o{ SENSOR_DATA : records
    SENSORS ||--o{ SENSOR_SNAPSHOTS : snapshots

    GREENHOUSES {
        int id PK
        string name
    }

    USERS {
        int id PK
        string name
        string email
        string password
    }

    SENSORS {
        int id PK
        int gh_id FK
        string name
        string unit
        float threshold_min
        float threshold_max
    }

    SENSOR_DATA {
        bigint id PK
        int sensor_id FK
        int node_id
        float value
        timestamp recorded_at
    }

    SENSOR_SNAPSHOTS {
        int sensor_id
        int node_id
        float value
        timestamp recorded_at
    }

    DEVICE_STATUSES {
        int id PK
        int gh_id
        boolean exhaust_status
        boolean dehumidifier_status
        boolean blower_status
        timestamp updated_at
    }

    SCHEDULES {
        int id PK
        int gh_id
        boolean enabled
        time start_time
        time end_time
        string relay_exhaust
        string relay_dehumidifier
        string relay_blower
    }

    CAMERA_DATA {
        int id PK
        int gh_id
        string image
        boolean isFoggy
        float confidence
        timestamp recorded_at
    }

    FIRMWARE_FILES {
        int id PK
        int node_id
        string version
        boolean status
        string file_path
        string file_url
    }
```

## Relasi Utama

`greenhouses.id` menjadi `gh_id` pada sensor, jadwal, kamera, dan status gateway.

`sensors.id` menjadi `sensor_id` pada histori sensor dan snapshot sensor.

`sensor_snapshots` perlu unik pada pasangan `(sensor_id, node_id)` agar upsert snapshot berjalan benar.

Lanjutkan ke [Tabel Users](./tabel-users.md).
