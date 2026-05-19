---
title: "Uji Gateway dan Aktuator"
---

# Uji Gateway dan Aktuator

Uji gateway dan aktuator memastikan keputusan kontrol tidak salah menyalakan atau mematikan perangkat greenhouse.

## Aktuator yang Terlihat dari Dokumentasi dan Source

- Drum fan atau blower.
- Exhaust fan.
- Dehumidifier.
- Relay atau SSR.

## Bukti dari Kode

Gateway memiliki file kontrol berikut:

- `gateway/include/RelayController.h`
- `gateway/src/RelayController.cpp`
- `gateway/include/GatewayControlState.h`
- `gateway/src/GatewayControlState.cpp`
- `gateway/include/ThresholdValidation.h`
- `gateway/include/ScheduleValidation.h`
- `gateway/include/SensorDataManager.h`
- `gateway/src/SensorDataManager.cpp`

Backend dan frontend kontrol terlihat di:

- `web/ScheduleController.php`
- `web/Controlling.vue`

## Parameter Uji

- Threshold min dan max benar dibaca.
- Jadwal aktif pada jam yang benar.
- Relay mengikuti sumber keputusan yang benar.
- Manual override tidak tertukar dengan mode otomatis.
- Failsafe bekerja saat data sensor stale.
- LCD dan dashboard lokal menampilkan status yang sama.

## Skenario Aman

Jangan menguji relay dengan beban listrik besar pada tahap awal. Mulai dari lampu indikator atau multimeter, baru lanjut ke aktuator asli setelah logika terbukti.

## Status Bukti

Gateway memiliki kode kontrol dan validasi, tetapi test otomatis gateway belum terlihat. Uji fisik aktuator perlu dicatat manual dalam laporan TA.

Lanjutkan ke [Uji Caching](./uji-caching.md).
