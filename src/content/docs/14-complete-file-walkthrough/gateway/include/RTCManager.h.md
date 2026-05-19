---
title: "gateway/include/RTCManager.h"
---

# gateway/include/RTCManager.h

File ini mendeklarasikan pengelola waktu gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/RTCManager.h` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway membutuhkan waktu yang benar untuk jadwal aktuator, logging, sinkronisasi, dan status sistem. File ini menggabungkan RTC hardware DS3231, NTP, waktu modem, waktu HTTP API, dan bootstrap epoch dari client.

## Enum Penting

| Enum | Fungsi awal |
|---|---|
| `RtcSyncResult` | Hasil sinkronisasi: tidak ada, NTP, modem network, HTTP, atau client bootstrap. |
| `RtcTimeSource` | Sumber waktu terakhir: hardware RTC, modem, HTTP API, client bootstrap, atau NTP. |

## Fungsi Publik Utama

Class `RTCManager` menyediakan:

- `begin()` untuk inisialisasi RTC,
- `update()` untuk memperbarui waktu runtime,
- `checkAndSyncOnDrift(...)` untuk sinkronisasi saat waktu bergeser,
- `getTime()` untuk string waktu,
- `isHardwareOk()` dan `isTimeSet()`,
- pencatatan epoch dari client,
- sync dari epoch client terbaru,
- metadata timezone, UTC offset, epoch sync, millis sync, authoritative flag, dan server NTP.

## Data Masuk

Data masuk berasal dari RTC DS3231, NTP server, modem, HTTP API, dan epoch client.

## Data Keluar

Data keluar berupa waktu string, status hardware, status waktu valid, sumber sinkronisasi, timezone, offset UTC, dan metadata sinkronisasi.

## Kapan Dipakai

File ini dipakai saat gateway boot, saat jadwal aktuator dievaluasi, saat log butuh timestamp, dan saat perlu memperbaiki drift waktu.

## Error yang Mungkin Terjadi

- Jika RTC hardware gagal, gateway harus mengandalkan sumber waktu lain.
- Jika Wi-Fi/GPRS tidak tersedia, NTP/HTTP/modem time bisa gagal.
- Jika epoch client salah, waktu gateway bisa terset ke nilai yang tidak benar.
- Jika timezone/offset tidak tervalidasi, jadwal lokal bisa bergeser.

## Bagian untuk Pemula

RTC adalah jam di perangkat. File ini membantu gateway mengetahui jam sekarang, bahkan saat internet tidak selalu tersedia.

## Bagian Advanced

File ini menyimpan metadata sumber waktu dan apakah sync terakhir authoritative. Ini penting untuk membedakan waktu yang benar-benar dipercaya dengan waktu cadangan.

## Hubungan ke Sistem TA

Jadwal fan, dehumidifier, blower, dan log greenhouse bergantung pada waktu gateway yang benar.
