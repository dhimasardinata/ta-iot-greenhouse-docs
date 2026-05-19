---
title: "node/lib/NodeCore/system/ConfigManager.cpp"
---

# node/lib/NodeCore/system/ConfigManager.cpp

File ini mengatur konfigurasi node seperti mode kerja, URL, token, Wi-Fi, dan nilai runtime lain yang perlu bertahan setelah restart.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/system/ConfigManager.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul sistem firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 1064 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul sistem firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `system/ConfigManager.h`, `Arduino.h`, `FS.h`, `LittleFS.h`, `algorithm`, `new`, `support/CompileTimeUtils.h`, `support/Crc32.h`, `system/Logger.h`, `config/calibration.h`, `config/constants.h`, `support/Utils.h` |
| Class/Struct | `ConfigFileHeaderV2`, `ConfigFileHeaderV3`, `StoredConfigV3`, `StoredConfigV4`, `StoredConfig`, `AppConfigV1` |
| Fungsi C/C++ | `create_hostname`, `isValidHttpsUrl`, `formatLittleFsSafe`, `ConfigManager::registerObserver`, `ConfigManager::init`, `ConfigManager::applyDefaults`, `strings`, `ConfigManager::load`, `ConfigManager::loadFromFile`, `buf`, `ConfigManager::save`, `ConfigManager::notifyObservers`, `ConfigManager::getConfig`, `ConfigManager::ensureStringsLoaded`, `ConfigManager::getStrings`, `ConfigManager::releaseStrings`, `ConfigManager::getAuthToken`, `ConfigManager::getOtaAuthToken`, `ConfigManager::getEffectiveUploadAuthToken`, `ConfigManager::getEffectiveOtaAuthToken`, `ConfigManager::getDataUploadUrl`, `ConfigManager::getOtaUrlBase`, `ConfigManager::getGatewayHost`, `ConfigManager::getGatewayIp` |
| Macro | `FACTORY_API_TOKEN`, `FACTORY_OTA_TOKEN`, `STR_HELPER`, `STR` |
| Route/String endpoint | `/config.dat`, `/config.bak`, `/config.tmp`, `/wifi_temp.dat`, `/wifi.dat` |
| String command/konfigurasi | `gh-` |

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
#include "system/ConfigManager.h"
#include <Arduino.h>
#include <FS.h>
#include <LittleFS.h>
#include <algorithm>
#include <new>
#include "support/CompileTimeUtils.h"
#include "support/Crc32.h"
#include "system/Logger.h"
#include "config/calibration.h"
#include "config/constants.h"
#include "support/Utils.h"
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
