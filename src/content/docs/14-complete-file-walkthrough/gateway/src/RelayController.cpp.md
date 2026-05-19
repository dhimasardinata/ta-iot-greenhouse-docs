---
title: "gateway/src/RelayController.cpp"
---

# gateway/src/RelayController.cpp

File ini mengimplementasikan pengendalian relay gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/RelayController.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway mengendalikan aktuator greenhouse melalui relay. File ini mengatur pin relay, schedule lokal/cloud, mode relay, threshold logic, fog forcing, safe state, dan status keputusan terakhir.

## Alur Begin

1. Pin relay diambil dari `config.h`.
2. Semua pin relay diset `OUTPUT`.
3. Relay dimatikan dengan `digitalWrite(..., HIGH)`.
4. Schedule lokal dimuat dari namespace `scheduler`.
5. Schedule cloud dimuat dari namespace `scheduler_cloud`.
6. Status cloud schedule freshness dimulai dari 0.

## Schedule

Schedule cloud diperbarui lewat `updateSchedulesFromCloud(...)` dan `applyCloudSchedules(...)`. Data cloud hanya ditulis ulang ke NVS jika berubah, untuk mengurangi tulis flash berulang.

Schedule lokal disimpan lewat `saveSchedule(...)` ke namespace `scheduler`.

## Logika Relay

`updateSingleRelayState(...)` memakai urutan:

1. Validasi index relay.
2. Cek schedule aktif jika evaluasi schedule diizinkan.
3. Jika schedule mode `1`, relay ON.
4. Jika schedule mode `0`, relay OFF.
5. Jika mode threshold, relay exhaust/dehumidifier mengikuti kelembapan atau fog, sedangkan blower mengikuti suhu.
6. Deadband menjaga relay yang sudah ON tetap ON sampai nilai turun melewati minimum.
7. Jika target berubah, pin relay ditulis.

## Data Masuk

Data masuk berupa suhu, kelembapan, threshold, waktu sekarang, fog, pilihan schedule lokal/cloud, izin evaluasi schedule, dan izin evaluasi threshold.

## Data Keluar

Data keluar berupa status pin relay, `states[]`, sumber keputusan relay, status schedule aktif, dan schedule ID aktif.

## Error yang Mungkin Terjadi

- Jika waktu RTC salah, schedule aktif di jam salah.
- Jika schedule cloud stale tetapi tetap dipakai sebagai last-known cloud, perilaku bisa mengikuti jadwal lama.
- Jika threshold buruk masuk ke caller, relay bisa menyala/mati di kondisi salah.
- `setManualOverride(...)` saat ini mengabaikan `desiredState` dan `duration`, lalu membersihkan override. Jadi manual override aktif belum terkonfirmasi dari file ini.

## Bagian untuk Pemula

File ini adalah bagian yang menyalakan dan mematikan saklar greenhouse. Ia memutuskan berdasarkan jadwal, batas sensor, dan kondisi kabut.

## Bagian Advanced

Relay tampak active-low: `LOW` berarti ON dan `HIGH` berarti OFF. Ini penting saat membaca wiring dan debugging aktuator.

## Hubungan ke Sistem TA

Kontrol exhaust fan, dehumidifier, blower, dan relay cadangan bergantung pada logika di file ini.
