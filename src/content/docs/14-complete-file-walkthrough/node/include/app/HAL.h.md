---
title: "node/include/app/HAL.h"
---

# node/include/app/HAL.h

File ini menyediakan helper hardware abstraction ringan untuk Serial dan LittleFS.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/app/HAL.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas menyiapkan komunikasi Serial dan filesystem LittleFS dengan cara yang rapi, sehingga `main.cpp` tidak penuh detail inisialisasi hardware.

## Kenapa File Ini Ada

Firmware butuh Serial Monitor untuk debugging dan LittleFS untuk menyimpan file lokal seperti konfigurasi, cache, halaman web, atau firmware update. File ini membungkus dua hal itu dalam class kecil.

## Class Penting

### `SerialManager`

Constructor class ini menjalankan `Serial.begin(115200)`, menunggu Serial sampai 2 detik, lalu menulis log bahwa Serial sudah siap.

### `FileSystemManager`

Constructor class ini mencoba mount LittleFS sampai 3 kali. Jika tetap gagal, filesystem diformat lalu dicoba mount lagi.

## Alur Kerja File

1. `SerialManager` dibuat di `setup()`.
2. Serial diaktifkan pada baud rate 115200.
3. `FileSystemManager` dibuat dari `BootManager`.
4. LittleFS dicoba mount maksimal 3 kali.
5. Jika gagal, LittleFS diformat dengan watchdog dimatikan sementara.
6. Setelah format, LittleFS dicoba mount ulang.

## Catatan C++ Penting

Copy constructor dan assignment operator dihapus dengan `= delete`. Artinya object manager ini tidak boleh disalin. Ini masuk akal karena Serial dan filesystem adalah resource global perangkat.

## Error Handling

Jika LittleFS gagal mount, file ini mencoba format otomatis. Jika setelah format masih gagal, log critical muncul dan kemungkinan ada masalah flash/filesystem.

## Catatan Performa

Format filesystem adalah operasi berat. File ini mematikan watchdog sementara agar format tidak dipotong oleh reset watchdog.

## Catatan Debugging

Jika halaman lokal, cache, atau OTA file tidak ditemukan, cek log `FS`. Jika Serial Monitor tidak menampilkan log awal, pastikan baud rate monitor adalah `115200`.

## Hubungan dengan Laporan TA

File ini terkait dengan debugging firmware, local storage, LittleFS, caching lokal, dan mekanisme OTA file di node.
