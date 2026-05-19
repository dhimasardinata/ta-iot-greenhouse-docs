---
title: "node/lib/NodeCore/ota/OtaManager.cpp"
---

# node/lib/NodeCore/ota/OtaManager.cpp

File ini adalah bagian dari pengelola OTA node. OTA memungkinkan firmware diperbarui lewat jaringan tanpa membuka casing perangkat.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/ota/OtaManager.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul OTA firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 485 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul OTA firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `ota/OtaManager.h`, `Arduino.h`, `ESP8266HTTPClient.h`, `ESP8266httpUpdate.h`, `WiFiClientSecureBearSSL.h`, `cstring`, `cstdlib`, `new`, `strings.h`, `support/CryptoUtils.h`, `system/ConfigManager.h`, `system/Logger.h`, `net/NtpClient.h`, `system/NodeIdentity.h`, `ota/OtaManager.Health.h`, `net/WifiManager.h`, `ota/BootGuard.h`, `config/constants.h`, `generated/node_config.h` |
| Fungsi C/C++ | `OtaManager::init`, `OtaManager::applyConfig`, `OtaManager::handle`, `OtaManager::forceUpdateCheck`, `OtaManager::forceInsecureUpdate`, `OtaManager::setTrustAnchors`, `OtaManager::setUploadInProgress`, `OtaManager::isBusy`, `OtaManager::beginCloudOtaSession`, `OtaManager::updateCloudOtaProgress`, `OtaManager::finishCloudOtaSession`, `OtaManager::handleCloudOtaWatchdog`, `OtaManager::parseOtaJson`, `u32_to_dec`, `buildOtaUrl`, `copyTokenStrict`, `resolveOtaTokenForRequest`, `buildBearerHeader`, `OtaManager::checkForUpdates` |
| Macro | `FACTORY_OTA_TOKEN` |
| String command/konfigurasi | `version`, `file_url`, `status` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | metadata update, URL firmware, status boot, dan response server OTA |
| Data keluar | keputusan update, status validasi firmware, dan tanda boot sukses/gagal |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- OTA bisa gagal karena URL salah, firmware tidak cocok, koneksi putus, validasi boot gagal, atau ruang flash tidak cukup.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#include "ota/OtaManager.h"
#include <Arduino.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>
#include <WiFiClientSecureBearSSL.h>
#include <cstring>
#include <cstdlib>
#include <new>
#include <strings.h>
#include "support/CryptoUtils.h"
#include "system/ConfigManager.h"
#include "system/Logger.h"
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
