---
title: "node/lib/NodeCore/system/Logger.h"
---

# node/lib/NodeCore/system/Logger.h

File ini mengatur format log firmware agar pesan diagnostik lebih konsisten saat dilihat lewat serial atau terminal.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/system/Logger.h` |
| Komponen | Firmware Node |
| Jenis file | modul sistem firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 89 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul sistem firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `Arduino.h` |
| Class/Struct | `LogLevel`, `with`, `Logger` |
| Enum | `LogLevel` |
| Fungsi C/C++ | `log` |
| Macro | `LOGGER_H`, `LOG_DEBUG`, `LOG_INFO`, `LOG_WARN`, `LOG_ERROR` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | data runtime dari modul pemanggil dan konfigurasi firmware yang relevan |
| Data keluar | hasil pemrosesan yang dikembalikan ke modul pemanggil |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
/**
 * @file Logger.h
 * @brief Lightweight logging abstraction with runtime-configurable log levels.
 * 
 * Log levels are stored in AppConfig and can be changed without recompilation.
 * Usage:
 *   LOG_DEBUG("WIFI", "Connecting to %s", ssid);
 *   LOG_INFO("API", "Upload complete");
 *   LOG_WARN("MEM", "Low heap: %u bytes", freeHeap);
 *   LOG_ERROR("SENSOR", "I2C read failed");
 */
#ifndef LOGGER_H
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
