---
title: "node/lib/NodeCore/sensor/SensorNormalization.h"
---

# node/lib/NodeCore/sensor/SensorNormalization.h

File ini menormalkan nilai sensor agar data yang dipakai sistem lebih konsisten sebelum ditampilkan atau dikirim.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/sensor/SensorNormalization.h` |
| Komponen | Firmware Node |
| Jenis file | modul pembacaan sensor |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 171 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul pembacaan sensor. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `math.h`, `stdint.h`, `sensor/SensorData.h` |
| Class/Struct | `EffectiveReading`, `EffectiveSensorSnapshot` |
| Fungsi C/C++ | `roundToNearestInt`, `normalizeTemperature`, `normalizeHumidity`, `normalizeLight`, `clampTemperatureTenths`, `clampHumidityTenths`, `clampLightUInt`, `makeEffectiveTemperatureReading`, `makeEffectiveHumidityReading`, `makeEffectiveLightReading`, `makeEffectiveSensorSnapshot`, `applyTemperatureCalibration`, `applyHumidityCalibration`, `applyLightCalibration` |
| Macro | `SENSOR_NORMALIZATION_H` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | pembacaan sensor, konfigurasi kalibrasi, status waktu, dan request diagnostik |
| Data keluar | nilai sensor terstruktur, status error sensor, dan data siap kirim |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- Pembacaan sensor bisa tidak valid jika pin salah, sensor rusak, kalibrasi keliru, atau nilai di luar rentang normal.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#ifndef SENSOR_NORMALIZATION_H
#define SENSOR_NORMALIZATION_H
#include <math.h>
#include <stdint.h>
#include "sensor/SensorData.h"
namespace SensorNormalization {
struct EffectiveReading {
  float rawValue = 0.0f;
  float effectiveValue = 0.0f;
  bool isValid = false;
};
struct EffectiveSensorSnapshot {
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
