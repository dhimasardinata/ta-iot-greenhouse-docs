---
title: "Folder Overview: Node Sensor"
---

# Folder Overview: Node Sensor

Folder ini akan menampung dokumentasi file-by-file untuk firmware node sensor.

## Fungsi Komponen

Node sensor bertugas membaca data lingkungan greenhouse, memvalidasi pembacaan, mengirim data ke cloud atau gateway, menyediakan portal/terminal lokal, menangani cache, dan mendukung OTA.

## Jenis File di Dalam Source

Berdasarkan coverage awal, file node yang perlu dijelaskan mencakup:

- firmware C++ di `node/src/`, `node/include/`, dan `node/lib/NodeCore/`,
- asset runtime portal di `node/data/`,
- test dan mock di `node/test/`,
- konfigurasi build node,
- script pendukung node.

## File Paling Penting untuk Dibaca Awal

1. `node/src/main.cpp`
2. `node/src/Application.cpp`
3. `node/src/BootManager.cpp`
4. `node/lib/NodeCore/sensor/SensorManager.h`
5. `node/lib/NodeCore/api/ApiClient.h`
6. `node/lib/NodeCore/storage/CacheManager.h`
7. `node/lib/NodeCore/ota/OtaManager.h`
8. `node/lib/NodeCore/web/AppServer.h`
9. `node/lib/NodeCore/terminal/DiagnosticsTerminal.h`

## Urutan Membaca

Mulai dari boot dan application lifecycle, lanjut ke sensor, API, cache, web lokal, command terminal, OTA, lalu test.

## Status

Draft awal sudah dimulai dari jalur boot/runtime:

- `node/src/main.cpp`
- `node/src/Application.cpp`
- `node/include/app/Application.h`
- `node/src/BootManager.cpp`
- `node/include/app/BootManager.h`
- `node/include/app/HAL.h`
- `node/include/config/calibration.h`
- `node/include/config/constants.h`
- `node/include/config/hardware_pins.h`
- `node/lib/NodeCore/library.json`

Draft awal asset runtime lokal juga sudah dibuat untuk semua file `node/data/*`, termasuk dashboard lokal, portal setup Wi-Fi, terminal WebSocket, halaman OTA lokal, dan library crypto JavaScript minimal.

Header generated awal juga sudah didokumentasikan: `WebAppData.h`, `node_config.h`, `root_ca_data.h`, dan `certs.h`.

Batch ApiClient core/facade awal juga sudah dibuat untuk `ApiClient.h`, `ApiClient.cpp`, state/context/health/shared helper, serta controller header lifecycle, control, queue, transport, upload, upload runtime, dan QoS.

Batch implementasi ApiClient awal juga sudah dibuat untuk `ApiClient.Control.cpp`, `ApiClient.Lifecycle.cpp`, `ApiClient.Immediate.cpp`, `ApiClient.Qos.cpp`, file queue RTC/LittleFS/emergency, `ApiClient.Security.cpp`, dan helper `ApiClient.TransportShared.*`.

Seluruh batch `ApiClient.*` sudah ditutup dengan dokumentasi transport state/single/support, upload flow/records/runtime, runtime policy/cycle, dan helper upload shared.

Batch awal command terminal juga sudah dibuat untuk fondasi command, status cache/filesystem/crash, aksi sistem dasar, pembacaan sensor, pengiriman langsung, QoS, dan pengecekan OTA.

Batch command konfigurasi dan kalibrasi juga sudah dibuat untuk login/logout, mode upload, netconfig, openwifi, timer config, portal password, dan kalibrasi sensor.

File node lain masih dilanjutkan bertahap sesuai [Coverage Report](../coverage-report.md).
