---
title: "node/lib/NodeCore/sensor/SensorManager.h"
---

# node/lib/NodeCore/sensor/SensorManager.h

File ini mengatur pembacaan sensor pada node dan menyediakan hasilnya ke modul upload, terminal, atau diagnostik.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/sensor/SensorManager.h` |
| Komponen | Firmware Node |
| Jenis file | modul pembacaan sensor |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 87 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul pembacaan sensor. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `Arduino.h`, `BH1750.h`, `system/IntervalTimer.h`, `SHTSensor.h`, `sensor/SensorData.h`, `interfaces/ISensorManager.h`, `config/constants.h` |
| Class/Struct | `SensorState`, `SensorManager`, `ISensorManager`, `State` |
| Enum | `State` |
| Fungsi C/C++ | `SensorManager`, `init`, `handleImpl`, `pause`, `resume`, `getTempImpl`, `getHumidityImpl`, `getLightImpl`, `getShtStatusImpl`, `getBh1750StatusImpl`, `attemptSensorInitOrRecovery`, `recoverI2CBus`, `updateShtData`, `updateBh1750Data`, `handleInitializing`, `handleRunning`, `handleRecovery`, `tryInitSht`, `tryInitBh1750` |
| Macro | `SENSOR_MANAGER_H` |

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
#ifndef SENSOR_MANAGER_H
#define SENSOR_MANAGER_H
#include <Arduino.h>
#include <BH1750.h>
#include <system/IntervalTimer.h>
#include <SHTSensor.h>
#include "sensor/SensorData.h"
#include "interfaces/ISensorManager.h"
#include "config/constants.h"
// --- Sensor Constants ---
constexpr float INVALID_TEMP = -999.0f;
constexpr float INVALID_HUMIDITY = -999.0f;
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
