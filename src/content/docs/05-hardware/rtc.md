---
title: "RTC"
---

# RTC

RTC adalah Real Time Clock, yaitu modul waktu. Gateway memakai RTC agar waktu tetap tersedia walaupun koneksi jaringan tidak selalu stabil.

## Bukti dari Kode

`gateway/include/RTCManager.h` memakai `RTC_DS3231`, `NTPClient`, dan `WiFiUDP`.

File tersebut menyebut beberapa sumber sinkronisasi waktu:

- RTC hardware,
- modem network,
- HTTP API,
- client bootstrap,
- NTP.

## Kenapa Waktu Penting

Waktu dipakai untuk:

- jadwal aktuator,
- timestamp data,
- log SD Card,
- validasi data stale,
- analisis pengujian.

## Risiko

- RTC hardware tidak tersedia,
- waktu belum diset,
- NTP gagal,
- modem tidak mendapat waktu,
- zona waktu salah,
- jadwal aktuator bergeser.

Dokumentasi file-by-file harus menjelaskan sumber waktu mana yang paling dipercaya dan bagaimana fallback dilakukan.

Lanjutkan ke [SD Card](./sd-card.md).
