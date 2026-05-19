---
title: "node/lib/NodeCore/net/WifiManager.cpp"
---

# node/lib/NodeCore/net/WifiManager.cpp

File ini mengatur state koneksi Wi-Fi node, termasuk transisi koneksi dan notifikasi perubahan status jaringan.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/net/WifiManager.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul jaringan firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 922 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul jaringan firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `net/WifiManager.h`, `ESP8266WiFi.h`, `user_interface.h`, `algorithm`, `cstring`, `system/ConfigManager.h`, `interfaces/IWifiStateObserver.h`, `system/Logger.h`, `config/constants.h`, `support/Utils.h` |
| Fungsi C/C++ | `WifiManager::init`, `WifiManager::ensureScanBuffer`, `WifiManager::releaseScanBuffer`, `WifiManager::copyScanResults`, `WifiManager::requestPortalScan`, `WifiManager::requestNetworkScan`, `WifiManager::captureScanSnapshotFromWifi`, `WifiManager::releaseScanCache`, `WifiManager::setState`, `WifiManager::startScan`, `WifiManager::processScanResults`, `WifiManager::cacheScanResultsFromWifi`, `WifiManager::tryNextCredential`, `WifiManager::startConnectionAttempt`, `WifiManager::handle`, `if`, `processScanResults`, `handleConnecting`, `handleConnected`, `handlePortalMode`, `WifiManager::handleConnecting`, `WifiManager::handleConnected`, `WifiManager::processRoamingScanResults`, `WifiManager::handlePortalMode` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | SSID, password, status Wi-Fi, waktu NTP, dan event koneksi jaringan |
| Data keluar | status koneksi, waktu tersinkron, event observer, atau kredensial tersimpan |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- Koneksi Wi-Fi/NTP bisa gagal karena kredensial salah, sinyal lemah, DNS bermasalah, atau server waktu tidak merespons.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#include "net/WifiManager.h"
#include <ESP8266WiFi.h>
#include <user_interface.h>
#include <algorithm>
#include <cstring>
#include "system/ConfigManager.h"
#include "interfaces/IWifiStateObserver.h"
#include "system/Logger.h"
#include "config/constants.h"
#include "support/Utils.h"
// Timer intervals
namespace {
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
