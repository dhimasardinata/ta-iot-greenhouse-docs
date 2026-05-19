---
title: "node/lib/NodeCore/web/PortalServer.cpp"
---

# node/lib/NodeCore/web/PortalServer.cpp

File ini menjalankan portal konfigurasi Wi-Fi. Portal ini membantu operator mengatur node ketika belum tersambung ke jaringan.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/web/PortalServer.cpp` |
| Komponen | Firmware Node |
| Jenis file | server web lokal firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 194 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi server web lokal firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `web/PortalServer.h`, `ESP8266WiFi.h`, `ESPAsyncWebServer.h`, `cstring`, `ota/BootGuard.h`, `system/Logger.h`, `net/NtpClient.h`, `web/WifiRouteUtils.h` |
| Fungsi C/C++ | `scrub_buffer`, `PortalServer::refreshCachedNetworksFromWifiManager`, `PortalServer::onWifiStateChanged`, `PortalServer::begin`, `PortalServer::stop`, `PortalServer::handlePendingConnection`, `PortalServer::startConnectionAttempt`, `PortalServer::handleTestResult`, `PortalServer::handle` |

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
#include "web/PortalServer.h"
#include <ESP8266WiFi.h>
#include <ESPAsyncWebServer.h>
#include <cstring>
#include "ota/BootGuard.h"
#include "system/Logger.h"
#include "net/NtpClient.h"
#include "web/WifiRouteUtils.h"
namespace {
  void scrub_buffer(char* buf, size_t len) {
    volatile char* p = reinterpret_cast<volatile char*>(buf);
    while (len--) {
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
