---
title: "Controlling Scheduling"
---

# Controlling Scheduling

Controlling scheduling adalah fitur mengatur jadwal aktuator.

## Bukti dari Kode

`Controlling.vue` memiliki sub-tab `scheduling` dan memakai `ScheduleCard`. Jadwal disimpan dalam state `schedules`.

Default schedule:

- enabled true,
- `08:00` sampai `12:00`,
- blower/exhaust/dehumidifier mode `threshold`.

## Batas Jadwal

`canAddSchedule` membatasi maksimal 4 jadwal per greenhouse. Ini cocok dengan gateway `MAX_SCHEDULES = 4`.

## API

Frontend memakai:

- `GET /api/schedules?gh_id=...`
- `POST /api/schedules`

Mode aktuator yang dipakai:

- `on`,
- `off`,
- `threshold`.

## Risiko

- waktu start/end invalid,
- jadwal overlap tidak dicegah di frontend,
- API gagal menyimpan,
- jadwal lokal dan cloud gateway perlu sinkron.

Lanjutkan ke [API Integration](./api-integration.md).
