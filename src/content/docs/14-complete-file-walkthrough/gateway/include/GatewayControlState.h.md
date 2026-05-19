---
title: "gateway/include/GatewayControlState.h"
---

# gateway/include/GatewayControlState.h

File ini mendeklarasikan ringkasan status kontrol gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/GatewayControlState.h` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway dapat memakai data lokal, data cloud, threshold lokal/cloud, schedule lokal/cloud, dan mode auto. File ini menyatukan status keputusan tersebut dalam satu struct agar bagian lain bisa memahami sumber kontrol yang sedang aktif.

## Isi Utama

`GatewayControlState` menyimpan:

- mode yang dikonfigurasi,
- apakah runtime memakai data lokal,
- apakah threshold dan schedule bisa diedit,
- kesiapan schedule edge/cloud,
- status data lokal dan cloud,
- status threshold, schedule, dan fog,
- kesehatan jalur kontrol,
- umur sumber aktif,
- string sumber runtime dan source efektif,
- nilai mode API.

## Fungsi yang Dideklarasikan

| Fungsi | Tujuan awal |
|---|---|
| `resolveGatewayControlState(...)` | Menghitung status kontrol dari sensor, relay, RTC, network, dan waktu sekarang. |
| `resolveAndCacheGatewayControlState(...)` | Menghitung sekaligus menyimpan cache status. |
| `cacheGatewayControlState(...)` | Menyimpan status terakhir. |
| `tryGetCachedGatewayControlState(...)` | Membaca status cache jika masih layak. |
| `resolveShouldUseLocalRuntime(...)` | Menentukan apakah runtime perlu memakai data lokal. |
| `resolveShouldEnterFailSafe(...)` | Menentukan apakah gateway harus masuk fail-safe. |

## Data Masuk

Data masuk berasal dari `SensorDataManager`, `RelayController`, `RTCManager`, status koneksi network, waktu sekarang, dan waktu terakhir jalur kontrol sehat.

## Data Keluar

Data keluar berupa struct `GatewayControlState` dan keputusan boolean seperti "pakai lokal" atau "masuk fail-safe".

## Kapan Dipakai

File ini dipakai saat gateway perlu menjelaskan atau menentukan jalur kontrol aktif: cloud, edge, auto, fallback, schedule-only, atau fail-safe.

## Error yang Mungkin Terjadi

- Jika status freshness data salah dihitung, gateway bisa memakai data lama.
- Jika fail-safe terlambat aktif, aktuator bisa bertahan dalam keputusan yang tidak sehat.
- Jika string source tidak konsisten dengan logika boolean, dashboard/operator bisa salah membaca mode aktif.

## Bagian untuk Pemula

File ini adalah papan status internal gateway. Dari sini gateway tahu apakah ia percaya data lokal, data cloud, jadwal, threshold, atau harus masuk mode aman.

## Bagian Advanced

Struct ini banyak membawa flag. Dokumentasi final perlu mencocokkan setiap flag dengan implementasi resolver supaya tidak ada status yang terlihat benar di UI tetapi berbeda dari keputusan relay.

## Hubungan ke Sistem TA

Keamanan dan manajemen greenhouse bergantung pada keputusan sumber data dan fail-safe gateway, terutama saat internet, sensor lokal, atau cloud bermasalah.
