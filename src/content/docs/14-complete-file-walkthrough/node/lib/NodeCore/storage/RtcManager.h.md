---
title: "node/lib/NodeCore/storage/RtcManager.h"
---

# node/lib/NodeCore/storage/RtcManager.h

File ini mengelola data RTC atau waktu lokal yang tersimpan, terutama untuk membantu timestamp ketika jaringan belum siap.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/storage/RtcManager.h` |
| Komponen | Firmware Node |
| Jenis file | modul penyimpanan lokal |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 129 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul penyimpanan lokal. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `Arduino.h`, `user_interface.h` |
| Class/Struct | `alignas`, `RtcReadStatus`, `RtcManager` |
| Enum | `RtcReadStatus` |
| Fungsi C/C++ | `init`, `append`, `isFull`, `peekEx`, `popEx`, `pop`, `peek`, `getCount`, `getRawData`, `clear`, `readRaw`, `writeRaw`, `writeData`, `resetDataInMemory`, `validateHeader`, `calculateHeaderCrc`, `calculateRecordCrc`, `isRecordValid`, `loadAndHeal`, `sanitizeFrontSlots`, `salvageFromCurrentSlots`, `tryMigrateFromLegacy`, `legacyCrcValid`, `setSlotFromPayload` |
| Macro | `RTC_MANAGER_H`, `RTC_SENSOR_BLOCK_OFFSET`, `RTC_SENSOR_MAGIC`, `RTC_RECORD_MAGIC`, `RTC_LAYOUT_VERSION`, `RTC_MAX_RECORDS`, `RTC_RECOVERY_BUDGET_SLOTS` |

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
#ifndef RTC_MANAGER_H
#define RTC_MANAGER_H
#include <Arduino.h>
#include <user_interface.h>
// Public payload shape for caller (without RTC metadata).
struct alignas(4) RtcSensorRecord {
  uint32_t timestamp;
  int16_t temp10;
  int16_t hum10;
  uint16_t lux;
  int16_t rssi;
};
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
