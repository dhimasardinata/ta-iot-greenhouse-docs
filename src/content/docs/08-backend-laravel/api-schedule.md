---
title: "API Schedule"
---

# API Schedule

API schedule mengatur jadwal aktuator.

## Method yang Terlihat

`ScheduleController.php` memiliki:

- `getSchedule`
- `saveSchedules`
- `getSchedulesForWeb`

## Format Gateway

`getSchedule()` mengembalikan field:

- `id`
- `aktif`
- `mulai`
- `selesai`
- `relay`

Ini dibuat untuk konsumsi gateway.

## Format Web

`getSchedulesForWeb()` mengembalikan:

- `id`
- `greenhouse_id`
- `enabled`
- `start_time`
- `end_time`
- `actuators.blower`
- `actuators.exhaust`
- `actuators.dehumidifier`

## Simpan Jadwal

`saveSchedules()` memvalidasi maksimal 4 jadwal, waktu mulai/selesai, dan mode aktuator `on`, `off`, atau `threshold`. Setelah menyimpan, cache schedule dan monitoring dibersihkan.

Lanjutkan ke [API Average Sensor](./api-average-sensor.md).
