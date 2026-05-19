---
title: "gateway/include/SDCardLogger.h"
---

# gateway/include/SDCardLogger.h

File ini mendeklarasikan logger SD Card gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/SDCardLogger.h` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway perlu menyimpan data operasional ke SD Card agar riwayat kondisi greenhouse tetap tersedia secara lokal. File ini menyediakan kontrak untuk inisialisasi SD Card, logging data sensor/kontrol, logging QoS, melihat ukuran log, melihat info storage, dan format log.

## Isi Utama

File ini berisi:

- struct `SDCardInfo` untuk total dan used bytes,
- class `SDCardLogger`,
- status busy internal,
- method `begin()`, `reInit()`, `closeFiles()`,
- method `logData(...)` dan `logQoS(...)`,
- method `getLogFileSize()`, `getStorageInfo()`, dan `formatLog()`.

## Data Masuk

`logData(...)` menerima waktu, suhu, kelembapan, cahaya, RSSI, status GPRS, status relay, status fog, threshold, mode gateway, sumber threshold, sumber schedule, status schedule per relay, ID schedule, dan sumber keputusan relay.

`logQoS(...)` menerima node ID, epoch kirim, ukuran payload, RSSI aktif, dan RSSI nonaktif.

## Data Keluar

Data keluar berupa catatan yang ditulis ke SD Card dan info storage yang dikembalikan ke caller.

## Kapan Dipakai

File ini dipakai saat gateway mencatat data greenhouse, mencatat kualitas komunikasi node, atau saat operator ingin memeriksa/format log.

## Error yang Mungkin Terjadi

- Jika SD Card tidak terpasang atau gagal inisialisasi, logging tidak bisa dilakukan.
- Jika flag busy tidak dijaga, operasi log bisa bertabrakan.
- Jika storage penuh, penulisan log bisa gagal.
- Jika format log dipanggil tanpa konfirmasi operator, riwayat lokal bisa hilang.

## Bagian untuk Pemula

SD Card berfungsi seperti buku catatan lokal gateway. File ini adalah daftar fungsi untuk membuka buku itu, menulis data, mengecek ukuran, dan menghapus isi log jika perlu.

## Bagian Advanced

Header memakai referensi `bool& sdOk`, sehingga status SD Card dapat dibagikan dengan modul lain. Implementasi perlu memastikan flag ini selalu mencerminkan kondisi nyata storage.

## Hubungan ke Sistem TA

Logging lokal membantu pembuktian data greenhouse, analisis gangguan jaringan, dan evaluasi hasil pengujian TA.
