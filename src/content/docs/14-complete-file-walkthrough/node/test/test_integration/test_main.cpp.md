---
title: "node/test/test_integration/test_main.cpp"
---

# node/test/test_integration/test_main.cpp

File ini adalah bagian dari test firmware node. Test membantu memastikan cache, JSON, integrasi, dan simulasi tetap berjalan sesuai harapan.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/test/test_integration/test_main.cpp` |
| Komponen | Firmware Node |
| Jenis file | pengujian firmware node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 106 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi pengujian firmware node. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `api/ApiClient.h`, `Arduino.h`, `ArduinoJson.h`, `unity.h`, `mock_cache_manager.h`, `mock_sensor_manager.h` |
| Class/Struct | `under` |
| Fungsi C/C++ | `mock_ws`, `mock_ntp_client`, `setUp`, `tearDown`, `test_createAndCachePayload_writes_correct_json_for_valid_data`, `apiClient`, `test_createAndCachePayload_writes_zero_for_invalid_data`, `setup`, `loop` |
| Route/String endpoint | `/ws` |
| String command/konfigurasi | `cached`, `temperature`, `humidity`, `light_intensity`, `recorded_at` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | skenario test, mock object, input simulasi, dan fixture pengujian |
| Data keluar | assertion test, hasil simulasi, dan sinyal gagal/lulus untuk pengembang |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- Test bisa memberi hasil keliru jika mock tidak lagi mengikuti perilaku firmware sebenarnya.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#include <api/ApiClient.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <unity.h>
#include "mock_cache_manager.h"
#include "mock_sensor_manager.h"
// --- Mock other dependencies ---
AsyncWebSocket mock_ws("/ws");
BearSSL::WiFiClientSecure mock_secure_client;
ConfigManager mock_config_manager;
WifiManager mock_wifi_manager;
NtpClient mock_ntp_client(mock_wifi_manager);
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
