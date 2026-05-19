---
title: "Scheduling Control"
---

# Scheduling Control

Scheduling control adalah pengendalian relay berdasarkan jadwal.

## Bukti dari Kode

`RelayController` memiliki:

- `ScheduleConfig`,
- `MAX_SCHEDULES`,
- local schedules,
- cloud schedules,
- `updateSchedulesFromCloud`,
- `saveSchedule`,
- `shouldUseLocalSchedules`,
- `hasAnyExplicitActiveSchedule`.

Schedule disimpan di NVS namespace `scheduler` dan `scheduler_cloud`.

## Mode Schedule

Komentar di header menjelaskan mode relay:

- `0` berarti OFF,
- `1` berarti ON,
- `2` berarti THRESHOLD.

Jika schedule aktif dan mode relay `0` atau `1`, keputusan relay berasal dari schedule. Jika mode `2`, relay tetap memakai threshold.

## Jadwal Melewati Tengah Malam

`isScheduleActive()` menangani jadwal yang start lebih besar dari end, sehingga jadwal bisa melewati tengah malam.

## Risiko

- waktu RTC belum valid,
- schedule invalid,
- cloud schedule stale,
- local schedule belum dikonfigurasi,
- prioritas schedule dan threshold disalahpahami.

Lanjutkan ke [Actuator Control](./actuator-control.md).
