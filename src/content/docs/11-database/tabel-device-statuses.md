---
title: "Tabel `device_statuses`"
---

# Tabel `device_statuses`

## Fungsi Tabel

`device_statuses` menyimpan status relay/perangkat gateway.

## Kolom yang Terlihat dari Kode

- `gh_id`
- `exhaust_status`
- `dehumidifier_status`
- `blower_status`
- `updated_at`

## Dipakai Oleh

- `ApiController::getDeviceStatus()`
- `ApiController::postDeviceStatus()`
- `PageController::buildMonitoringActuatorStatus()`

## Fungsi di Dashboard

Jika gateway dianggap online berdasarkan `updated_at`, dashboard memakai status dari gateway. Jika offline, dashboard memakai hasil logika sensor/schedule.

Lanjutkan ke [Query Penting](./query-penting.md).
