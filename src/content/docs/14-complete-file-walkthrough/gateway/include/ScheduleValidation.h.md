---
title: "gateway/include/ScheduleValidation.h"
---

# gateway/include/ScheduleValidation.h

File ini berisi fungsi validasi dan parsing jadwal relay gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/ScheduleValidation.h` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Jadwal dari cloud atau dashboard tidak boleh langsung dipakai tanpa diperiksa. File ini memastikan jam, menit, mode relay, status aktif, dan format JSON jadwal sesuai sebelum masuk ke `ScheduleConfig`.

## Fungsi Utama

| Fungsi | Tujuan |
|---|---|
| `isTimeComponentValid(...)` | Memastikan jam 0-23 dan menit 0-59. |
| `isWindowNonZero(...)` | Memastikan waktu mulai dan selesai tidak sama. |
| `isRelayModeValid(...)` | Memastikan mode relay hanya `0`, `1`, atau `2`. |
| `isScheduleWindowValid(...)` | Validasi gabungan waktu jadwal. |
| `isScheduleConfigValid(...)` | Validasi struct `ScheduleConfig`. |
| `parseScheduleActiveFlag(...)` | Membaca field aktif dari bool, int, atau string. |
| `parseScheduleTimeValue(...)` | Membaca format waktu `HH:MM`. |
| `parseScheduleRelayModes(...)` | Membaca string tiga mode relay. |
| `parseScheduleConfig(...)` | Membaca JSON menjadi `ScheduleConfig`. |

## Data Masuk

Data masuk berupa komponen waktu, mode relay, `JsonVariantConst`, `JsonObjectConst`, dan struct `ScheduleConfig`.

## Data Keluar

Data keluar berupa status valid/tidak valid dan struct `ScheduleConfig` yang sudah diisi dari JSON.

## Kapan Dipakai

File ini dipakai sebelum gateway menerima atau menyimpan schedule dari cloud, dashboard, atau jalur lokal.

## Error yang Mungkin Terjadi

- Format waktu selain `HH:MM` akan ditolak.
- Jadwal aktif dengan waktu mulai sama dengan selesai akan ditolak.
- Mode relay selain tiga karakter `0`, `1`, dan `2` akan ditolak.
- Field JSON memakai nama `aktif`, `mulai`, `selesai`, dan `relay`; perubahan kontrak backend perlu diikuti.

## Bagian untuk Pemula

File ini seperti penjaga pintu untuk jadwal. Ia mengecek apakah jam dan pilihan relay masuk akal sebelum gateway memakai jadwal itu.

## Bagian Advanced

Semua fungsi dibuat `inline` di header. Ini praktis untuk utilitas kecil, tetapi perubahan logic validasi akan memengaruhi semua file yang meng-include header ini.

## Hubungan ke Sistem TA

Validasi jadwal mencegah aktuator greenhouse bekerja berdasarkan jadwal yang salah format atau tidak aman.
