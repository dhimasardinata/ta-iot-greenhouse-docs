---
title: "gateway/include/RelayController.h"
---

# gateway/include/RelayController.h

File ini mendeklarasikan pengendali relay gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/RelayController.h` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway mengendalikan aktuator greenhouse melalui relay. File ini membuat kontrak untuk mengatur relay berdasarkan manual override, jadwal, threshold, hold state, data sensor, dan status fog.

## Isi Utama

File ini mendefinisikan:

- `MAX_SCHEDULES = 4`,
- enum `RelayDecisionSource`,
- struct `ScheduleConfig`,
- class `RelayController`.

## ScheduleConfig

`ScheduleConfig` menyimpan:

- `id`,
- `active`,
- jam dan menit mulai,
- jam dan menit selesai,
- mode relay `r1Mode`, `r2Mode`, dan `r3Mode`.

Komentar menyatakan mode relay:

- `0` = OFF,
- `1` = ON,
- `2` = THRESHOLD.

## Fungsi Publik Utama

Class `RelayController` menyediakan:

- `begin()`,
- `updateSingleRelayState(...)`,
- `ensureRelay4Off()`,
- `setManualOverride(...)`,
- `forceSafeState()`,
- `loadOverrides()`,
- `updateSchedulesFromCloud(...)`,
- `applyCloudSchedules(...)`,
- `saveSchedule(...)`,
- pembacaan schedule lokal/cloud,
- status decision source relay,
- getter status relay R1 sampai R4.

## Data Masuk

Data masuk berupa kelembapan, suhu, threshold, waktu sekarang, status fog, mode schedule lokal/cloud, izin evaluasi schedule, izin evaluasi threshold, dan JSON schedule dari cloud.

## Data Keluar

Data keluar berupa perubahan pin relay, status relay, status schedule, sumber keputusan relay, dan data override/schedule yang tersimpan.

## Kapan Dipakai

File ini dipakai saat gateway mengevaluasi apakah aktuator harus menyala atau mati, baik dari jadwal, threshold, maupun override manual.

## Error yang Mungkin Terjadi

- Jika waktu gateway salah, schedule bisa aktif di jam yang salah.
- Jika threshold tidak valid, keputusan relay berbasis sensor bisa salah.
- Jika manual override tidak kedaluwarsa dengan benar, relay bisa bertahan di status yang tidak diharapkan.
- Jika cloud schedule stale tetapi tetap dipakai, kontrol greenhouse bisa mengikuti jadwal lama.

## Bagian untuk Pemula

Relay adalah saklar listrik yang dikendalikan gateway. File ini adalah daftar fungsi untuk menyalakan, mematikan, dan menentukan alasan relay berubah.

## Bagian Advanced

Header ini menunjukkan dua profil schedule: lokal dan cloud. Implementasi harus jelas memilih kapan local schedule dipakai, kapan cloud schedule dipakai, dan kapan gateway masuk safe state.

## Hubungan ke Sistem TA

Keamanan greenhouse sangat bergantung pada file ini karena relay mengendalikan aktuator fisik seperti exhaust fan, dehumidifier, dan blower.
