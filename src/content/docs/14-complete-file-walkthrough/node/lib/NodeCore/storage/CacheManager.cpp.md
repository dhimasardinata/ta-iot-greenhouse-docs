---
title: "node/lib/NodeCore/storage/CacheManager.cpp"
---

# node/lib/NodeCore/storage/CacheManager.cpp

File ini mengatur cache lokal data node. Cache membantu data tidak langsung hilang ketika koneksi cloud atau gateway sedang bermasalah.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/storage/CacheManager.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul penyimpanan lokal |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 778 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul penyimpanan lokal. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `storage/CacheManager.h`, `system/ConfigManager.h`, `FS.h`, `LittleFS.h`, `cstring`, `memory`, `system/Logger.h`, `storage/Paths.h`, `support/Crc32.h` |
| Class/Struct | `CacheHeader`, `ScanResult` |
| Enum | `ScanResult` |
| Fungsi C/C++ | `performSyncScan`, `advanceTailPointer`, `updateHeadPointer`, `trimCacheForWrite`, `calculate_header_crc`, `Crc32::compute`, `readWithWrap`, `writeWithWrap`, `verifyWithWrap`, `readCacheHeader`, `writeCacheHeader`, `writeRecordData`, `verifyRecordData`, `CacheManager::initImpl`, `CacheManager::resetImpl`, `CacheManager::flush`, `CacheManager::markDirty`, `tryWriteWithRetry`, `CacheManager::writeImpl`, `CacheManager::read_oneImpl`, `CacheManager::pop_oneImpl`, `CacheManager::get_statusImpl`, `CacheManager::get_sizeImpl` |
| Macro | `CACHE_MAGIC`, `CACHE_VERIFY_WRITE` |
| String command/konfigurasi | `logical`, `verify` |

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
#include "storage/CacheManager.h"
#include <system/ConfigManager.h>
#include <FS.h>
#include <LittleFS.h>
#include <cstring>
#include <memory>
#include "system/Logger.h"
#include "storage/Paths.h"
#include "support/Crc32.h"
#define CACHE_MAGIC 0xDEADBEEF
#ifndef CACHE_VERIFY_WRITE
#define CACHE_VERIFY_WRITE 0
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
