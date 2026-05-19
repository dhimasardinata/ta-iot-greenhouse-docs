---
title: "node/lib/NodeCore/sensor/SensorManager.cpp"
---

# node/lib/NodeCore/sensor/SensorManager.cpp

File ini mengatur pembacaan sensor pada node dan menyediakan hasilnya ke modul upload, terminal, atau diagnostik.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/sensor/SensorManager.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul pembacaan sensor |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 311 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul pembacaan sensor. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `sensor/SensorManager.h`, `Wire.h`, `config/hardware_pins.h`, `system/Logger.h`, `sensor/SensorNormalization.h` |
| Fungsi C/C++ | `SensorManager::init`, `SensorManager::pause`, `SensorManager::resume`, `SensorManager::handleImpl`, `handleInitializing`, `handleRunning`, `handleRecovery`, `SensorManager::handleInitializing`, `SensorManager::handleRunning`, `SensorManager::handleRecovery`, `SensorManager::updateShtData`, `SensorManager::updateBh1750Data`, `SensorManager::tryInitSht`, `SensorManager::tryInitBh1750`, `SensorManager::attemptSensorInitOrRecovery`, `SensorManager::recoverI2CBus`, `SensorManager::getTempImpl`, `SensorManager::getHumidityImpl`, `SensorManager::getLightImpl`, `SensorManager::getShtStatusImpl`, `SensorManager::getBh1750StatusImpl` |
| Fungsi JavaScript | `uses` |

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
#include "sensor/SensorManager.h"
#include <Wire.h>
#include "config/hardware_pins.h"
#include "system/Logger.h"
#include "sensor/SensorNormalization.h"
SensorManager::SensorManager()
    : m_lightMeter(AppConstants::BH1750_I2C_ADDR),
      m_currentState(State::INITIALIZING),
      m_shtReadTimer(AppConstants::SHT_READ_INTERVAL_MS),
      m_bh1750ReadTimer(AppConstants::BH1750_READ_INTERVAL_MS),
      m_actionTimer(AppConstants::SENSOR_INIT_RETRY_INTERVAL_MS),
      m_temperature(INVALID_TEMP),
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
