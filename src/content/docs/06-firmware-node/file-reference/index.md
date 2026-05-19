---
title: "File Reference Firmware Node"
---

# File Reference Firmware Node

Bagian ini akan menjadi pintu masuk dokumentasi file-by-file firmware node.

## Status Saat Ini

Semua file node yang relevan tercatat di [Coverage Report](../../14-complete-file-walkthrough/coverage-report.md). Halaman detail membantu pembaca masuk dari file utama ke modul pendukung.

## Kelompok File Node

| Kelompok | Peran |
|---|---|
| `node/src/` | Entry point dan lifecycle utama. |
| `node/include/` | Header aplikasi, konfigurasi, dan generated data. |
| `node/lib/NodeCore/api/` | Upload cloud/edge, queue, QoS, transport. |
| `node/lib/NodeCore/net/` | Wi-Fi dan NTP. |
| `node/lib/NodeCore/ota/` | OTA dan boot guard. |
| `node/lib/NodeCore/sensor/` | Sensor SHT/BH1750 dan normalisasi data. |
| `node/lib/NodeCore/storage/` | Cache dan RTC storage. |
| `node/lib/NodeCore/web/` | App server dan portal server. |
| `node/lib/NodeCore/terminal/` | Terminal diagnostik. |
| `node/lib/NodeCore/commands/` | Command terminal. |
| `node/test/` | Test dan mock. |

## Urutan Batch File-by-File yang Disarankan

1. `node/src/main.cpp`
2. `node/src/Application.cpp`
3. `node/src/BootManager.cpp`
4. `node/include/config/constants.h`
5. `node/include/config/hardware_pins.h`
6. `node/lib/NodeCore/sensor/SensorManager.h`
7. `node/lib/NodeCore/sensor/SensorManager.cpp`
8. `node/lib/NodeCore/api/ApiClient.h`
9. `node/lib/NodeCore/storage/CacheManager.h`
10. `node/lib/NodeCore/ota/OtaManager.h`

Untuk setiap file, baca dari peran file, kapan dipakai, alur data, bagian penting, risiko error, dan cara debug.
