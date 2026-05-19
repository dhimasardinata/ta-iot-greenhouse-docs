---
title: "ERD"
---

# ERD

ERD adalah diagram hubungan antar tabel.

## ERD Sementara dari Kode

```mermaid
erDiagram
    greenhouses ||--o{ sensors : has
    sensors ||--o{ sensor_data : records
    sensors ||--o{ sensor_snapshots : latest
    greenhouses ||--o{ schedules : controls
    greenhouses ||--o{ device_statuses : reports
    greenhouses ||--o{ camera_data : captures
```

## Batasan

Diagram ini adalah inferensi dari controller, bukan dari migration. Cardinality, foreign key, dan constraint belum terkonfirmasi penuh.

## Sumber Bukti

- `ApiController.php`
- `ScheduleController.php`
- `PageController.php`
- `OtaController.php`

Lanjutkan ke [Tabel Users](./tabel-users.md).
