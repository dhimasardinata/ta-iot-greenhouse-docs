---
title: "node/lib/NodeCore/api/ApiClient.UploadShared.h"
---

# node/lib/NodeCore/api/ApiClient.UploadShared.h

File ini mendeklarasikan helper upload bersama.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.UploadShared.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Header ini mendeklarasikan helper untuk membangun URL gateway, membandingkan SSID, membaca RSSI jaringan nonaktif, memanipulasi field `recorded_at`, membuat payload sensor, dan membuat payload dari record RTC.

## Kenapa File Ini Ada

Upload flow, upload records, queue storage, dan runtime cycle membutuhkan helper yang sama. File ini menjadi kontrak kecil agar fungsi tersebut tidak diduplikasi.

## Isi Penting

| Bagian | Peran |
|---|---|
| Gateway URL helper | Membuat URL gateway dari host/IP dan path. |
| RSSI helper | Mengambil RSSI jaringan greenhouse yang sedang tidak aktif. |
| Payload helper | Membuat JSON sensor dari field numerik. |
| Time helper | Format timestamp record menjadi `YYYY-MM-DD HH:MM:SS`. |
| RTC helper | Membuat payload dari `RtcSensorRecord`. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ConfigManager` | Sumber host/IP gateway. |
| `RtcManager` | Tipe record RTC. |
| `SensorNormalization` | Clamp dan format nilai sensor. |
| `TextBufferUtils` | Append/copy string berbatas ukuran. |
| `WifiManager` | Credential dan RSSI Wi-Fi greenhouse. |

## Hubungan dengan Laporan TA

File ini menjelaskan fondasi kecil yang dipakai untuk membuat data sensor siap dikirim ke cloud atau gateway.
