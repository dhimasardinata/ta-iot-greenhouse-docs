---
title: "node/lib/NodeCore/system/ConfigManager.h"
---

# node/lib/NodeCore/system/ConfigManager.h

File ini mengatur konfigurasi node seperti mode kerja, URL, token, Wi-Fi, dan nilai runtime lain yang perlu bertahan setelah restart.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/system/ConfigManager.h` |
| Komponen | Firmware Node |
| Jenis file | modul sistem firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 285 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul sistem firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `Arduino.h`, `array`, `memory`, `span`, `string_view`, `interfaces/IConfigObserver.h`, `generated/node_config.h`, `support/CompileTimeUtils.h`, `config/calibration.h` |
| Class/Struct | `ConfigStatus`, `UplinkMode`, `ConfigFlags`, `AppConfig`, `AppConfigStrings`, `WifiCredentials`, `ConfigManager` |
| Enum | `ConfigStatus`, `UplinkMode` |
| Fungsi C/C++ | `IS_PROVISIONED`, `set_provisioned`, `ALLOW_INSECURE_HTTPS`, `set_insecure`, `LOG_LEVEL`, `set_log_level`, `UPLINK_MODE`, `set_uplink_mode`, `ConfigManager`, `init`, `registerObserver`, `getConfig`, `getStrings`, `releaseStrings`, `setAuthToken`, `setOtaAuthToken`, `clearOtaAuthToken`, `setDataUploadUrl`, `setOtaUrlBase`, `setGatewayHost`, `setGatewayIp`, `setPortalPassword`, `setTimingConfig`, `setProvisioned` |
| Macro | `CONFIG_MANAGER_H`, `DEFAULT_DATA_URL`, `DEFAULT_OTA_URL_BASE`, `DEFAULT_RELAY_DATA_URL`, `DEFAULT_RELAY_OTA_URL_BASE`, `DEFAULT_ADMIN_PASS_HASH`, `DEFAULT_PORTAL_PASS`, `DEFAULT_GATEWAY_IP_GH1`, `DEFAULT_GATEWAY_IP_GH2`, `DEFAULT_GATEWAY_HOST_GH1`, `DEFAULT_GATEWAY_HOST_GH2` |
| String command/konfigurasi | `medini123` |

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
#ifndef CONFIG_MANAGER_H
#define CONFIG_MANAGER_H
#include <Arduino.h>
#include <array>
#include <memory>
#include <span>
#include <string_view>
#include "interfaces/IConfigObserver.h"
#include "generated/node_config.h"
// Provisioning overrides (compile-time)
#ifndef DEFAULT_DATA_URL
#define DEFAULT_DATA_URL "https://atomic.web.id/api/sensor"
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
