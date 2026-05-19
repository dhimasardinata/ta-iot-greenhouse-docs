---
title: "node/lib/NodeCore/web/AppServer.cpp"
---

# node/lib/NodeCore/web/AppServer.cpp

File ini menjalankan server web lokal node untuk dashboard, endpoint status, dan fitur lokal lain.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/web/AppServer.cpp` |
| Komponen | Firmware Node |
| Jenis file | server web lokal firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 185 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi server web lokal firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `web/AppServer.h`, `ArduinoOTA.h`, `ESP8266WiFi.h`, `ESP8266mDNS.h`, `ESPAsyncWebServer.h`, `Updater.h`, `ota/BootGuard.h`, `system/ConfigManager.h`, `system/Logger.h`, `net/NtpClient.h` |
| Fungsi C/C++ | `AppServer::onWifiStateChanged`, `AppServer::handle`, `AppServer::begin`, `AppServer::stop`, `AppServer::onFlashRequest`, `AppServer::setOtaCallbacks`, `AppServer::startWebOtaSession`, `AppServer::touchWebOtaSession`, `AppServer::finishWebOtaSession`, `AppServer::abortWebOtaSession` |
| String command/konfigurasi | `http`, `tcp`, `stalled`, `yes` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | HTTP request lokal, form konfigurasi, WebSocket atau endpoint status |
| Data keluar | response HTTP, halaman portal, JSON status, atau perubahan konfigurasi |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- Input operator perlu divalidasi karena command atau request lokal bisa kosong, salah format, atau tidak punya izin.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#include "web/AppServer.h"
#include <ArduinoOTA.h>
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <ESPAsyncWebServer.h>
#include <Updater.h>
#include "ota/BootGuard.h"
#include "system/ConfigManager.h"
#include "system/Logger.h"
#include "net/NtpClient.h"
AppServer::AppServer(AsyncWebServer& server,
                     AsyncWebSocket& ws,
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
