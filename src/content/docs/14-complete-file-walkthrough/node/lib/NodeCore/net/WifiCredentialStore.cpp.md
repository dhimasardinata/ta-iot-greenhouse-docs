---
title: "node/lib/NodeCore/net/WifiCredentialStore.cpp"
---

# node/lib/NodeCore/net/WifiCredentialStore.cpp

File ini mengatur penyimpanan kredensial Wi-Fi node. Bagian ini menjaga SSID/password tetap bisa dipakai ulang setelah perangkat restart.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/net/WifiCredentialStore.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul jaringan firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 639 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul jaringan firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `net/WifiCredentialStore.h`, `ESP8266WiFi.h`, `LittleFS.h`, `algorithm`, `cstring`, `new`, `system/Logger.h`, `storage/Paths.h`, `generated/node_config.h`, `support/Utils.h` |
| Class/Struct | `CredentialFileHeader`, `SavedSlot` |
| Fungsi C/C++ | `fnv1a32`, `availability_label_P`, `restore_runtime_state`, `strip_transient_state`, `WifiCredentialStore::setupBuiltInCredentials`, `WifiCredentialStore::init`, `WifiCredentialStore::ensureSavedLoaded`, `WifiCredentialStore::savedSpan`, `WifiCredentialStore::getSavedCredentials`, `savedSpan`, `WifiCredentialStore::releaseSavedCredentials`, `WifiCredentialStore::loadFromFile`, `WifiCredentialStore::saveToFile`, `WifiCredentialStore::addCredential`, `WifiCredentialStore::removeCredential`, `WifiCredentialStore::hasCredential`, `WifiCredentialStore::resetAvailability`, `WifiCredentialStore::updateFromScan`, `WifiCredentialStore::updateFromScanList`, `WifiCredentialStore::sortByRssi`, `WifiCredentialStore::resetConnectionAttempt`, `WifiCredentialStore::getNextCredential`, `WifiCredentialStore::getSavedCount`, `WifiCredentialStore::getTotalAvailableCount` |
| Macro | `BUILTIN_GH_ATAS_SSID`, `BUILTIN_GH_BAWAH_SSID`, `BUILTIN_GH_PASSWORD`, `ENABLE_BUILTIN_WIFI_CREDENTIALS` |
| Route/String endpoint | `/wifi_list.tmp` |

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
#include "net/WifiCredentialStore.h"
#include <ESP8266WiFi.h>
#include <LittleFS.h>
#include <algorithm>
#include <cstring>
#include <new>
#include "system/Logger.h"
#include "storage/Paths.h"
#include "generated/node_config.h"
#include "support/Utils.h"
namespace {
  // Built-in credentials for primary infrastructure points (overridable via build flags).
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
