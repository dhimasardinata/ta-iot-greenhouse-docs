---
title: "node/lib/NodeCore/storage/Paths.h"
---

# node/lib/NodeCore/storage/Paths.h

File ini menyatukan path file lokal agar bagian firmware lain tidak menulis nama file penyimpanan secara terpisah.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/storage/Paths.h` |
| Komponen | Firmware Node |
| Jenis file | modul penyimpanan lokal |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 76 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul penyimpanan lokal. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Macro | `PATHS_H` |
| Route/String endpoint | `/config.dat`, `/config.bak`, `/config.tmp`, `/wifi.dat`, `/wifi_temp.dat`, `/wifi_list.dat`, `/cache.dat`, `/crash.log`, `/update.bin`, `/time.dat`, `/terminal`, `/update`, `/api/status`, `/save`, `/connecting`, `/status`, `/networks`, `/saved` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | record sensor, path LittleFS, status cache, timestamp, dan data yang belum terkirim |
| Data keluar | record cache, hasil baca/tulis LittleFS, dan status retry data |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- LittleFS/cache bisa gagal jika filesystem belum mount, ruang penuh, format data berubah, atau listrik mati saat tulis.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
/**
 * @file Paths.h
 * @brief Centralized file paths and web routes for the greenhouse node.
 * 
 * This consolidates all magic strings to make maintenance easier
 * and reduce the risk of typos causing runtime issues.
 */
#ifndef PATHS_H
#define PATHS_H
namespace Paths {
  // =========================================================================
  // == Filesystem Paths (LittleFS)
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
