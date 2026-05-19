---
title: "node/lib/NodeCore/web/PortalServer.h"
---

# node/lib/NodeCore/web/PortalServer.h

File ini menjalankan portal konfigurasi Wi-Fi. Portal ini membantu operator mengatur node ketika belum tersambung ke jaringan.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/web/PortalServer.h` |
| Komponen | Firmware Node |
| Jenis file | server web lokal firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 78 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi server web lokal firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `DNSServer.h`, `system/IntervalTimer.h`, `system/ConfigManager.h`, `interfaces/IWifiStateObserver.h`, `net/WifiManager.h` |
| Class/Struct | `AsyncWebServer`, `AsyncWebHandler`, `AsyncWebServerRequest`, `NtpClient`, `PortalServer`, `PortalStatus` |
| Enum | `PortalStatus` |
| Fungsi C/C++ | `handle`, `begin`, `stop`, `setupRoutes`, `handleSaveRequest`, `handleScanRequest`, `handleForgetRequest`, `handleFactoryResetRequest`, `handleTimeRequest`, `sendStatusJson`, `sendNetworksJson`, `sendSavedCredentialsJson`, `cacheNetworkScanResults`, `refreshCachedNetworksFromWifiManager`, `templateProcessor`, `handlePendingConnection`, `startConnectionAttempt`, `handleTestResult` |
| Macro | `PORTAL_SERVER_H` |

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
#ifndef PORTAL_SERVER_H
#define PORTAL_SERVER_H
#include <DNSServer.h>
#include <system/IntervalTimer.h>
#include "system/ConfigManager.h"
#include "interfaces/IWifiStateObserver.h"
#include "net/WifiManager.h"
static constexpr uint32_t SCAN_CACHE_DURATION_MS = 10000;
class AsyncWebServer;
class AsyncWebHandler;
class AsyncWebServerRequest;
class NtpClient;
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
