---
title: "node/lib/NodeCore/storage/CacheManager.h"
---

# node/lib/NodeCore/storage/CacheManager.h

File ini mengatur cache lokal data node. Cache membantu data tidak langsung hilang ketika koneksi cloud atau gateway sedang bermasalah.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/storage/CacheManager.h` |
| Komponen | Firmware Node |
| Jenis file | modul penyimpanan lokal |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 42 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul penyimpanan lokal. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `interfaces/ICacheManager.h`, `FS.h` |
| Class/Struct | `CacheManager`, `ICacheManager` |
| Fungsi C/C++ | `CacheManager`, `initImpl`, `resetImpl`, `read_oneImpl`, `get_statusImpl`, `flush`, `markDirty` |
| Macro | `CACHE_MANAGER_H` |

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
#ifndef CACHE_MANAGER_H
#define CACHE_MANAGER_H
#include "interfaces/ICacheManager.h"
#include <FS.h>
// ============================================================================
// CacheManager with CRTP (Zero Virtual Overhead)
// ============================================================================
class CacheManager final : public ICacheManager<CacheManager> {
  friend class ICacheManager<CacheManager>;
public:
  CacheManager();
  // Deleted copy constructor and assignment operator
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
