---
title: "Tabel `schedules`"
---

# Tabel `schedules`

## Fungsi Tabel

`schedules` menyimpan jadwal aktuator per greenhouse.

## Kolom yang Terlihat dari Kode

- `id`
- `gh_id`
- `enabled`
- `start_time`
- `end_time`
- `relay_exhaust`
- `relay_dehumidifier`
- `relay_blower`

## Dipakai Oleh

- `ScheduleController::getSchedule()`
- `ScheduleController::saveSchedules()`
- `ScheduleController::getSchedulesForWeb()`
- `PageController::buildMonitoringActuatorStatus()`

## Catatan

Backend web memakai mode aktuator `on`, `off`, atau `threshold`. Gateway mengubah jadwal cloud menjadi `ScheduleConfig`.

Lanjutkan ke [Tabel Device Statuses](./tabel-device-statuses.md).
