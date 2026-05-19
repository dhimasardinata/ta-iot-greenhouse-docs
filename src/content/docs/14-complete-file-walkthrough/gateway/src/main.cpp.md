---
title: "gateway/src/main.cpp"
---

# gateway/src/main.cpp

File ini adalah pusat runtime firmware gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/main.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway membutuhkan titik masuk yang mengikat semua modul: LCD, sensor data manager, SD logger, relay controller, network manager, RTC, web server, WebSocket, OTA, API upload, WebSerial command, deferred action, dan control loop. File ini menjalankan semua itu.

## Objek Global

File ini membuat objek utama:

- `LCDDisplay lcd`,
- `SensorDataManager sensorData`,
- `SDCardLogger sd_logger`,
- `RelayController relay`,
- `MyNetworkManager net`,
- `RTCManager rtc_mgr`,
- `AsyncWebServer server`,
- `WebSocketManager wsManager`.

## Queue dan Pending Work

File ini menyimpan antrian untuk:

- `PendingControlAction`,
- `PendingQosLog`,
- `PendingNodeUpdate`,
- pending relay status sync,
- pending manual fetch,
- pending RTC drift check,
- pending OTA check.

Antrian memakai kapasitas tetap dan `portMUX_TYPE`, sehingga cocok untuk firmware yang harus menghindari alokasi bebas di jalur kritis.

## Setup

`setup()` menginisialisasi hardware, konfigurasi, network, server, WebSerial, WebSocket, SD Card, RTC, relay, route API lokal, upload data, download log, OTA handler, mDNS, dan watchdog.

## Loop

`loop()` menjaga:

- watchdog reset,
- WebSocket cleanup/pump,
- network state machine,
- deferred network action,
- pending node update,
- pending QoS log,
- relay status sync,
- control loop,
- API/cloud fetch bertahap,
- RTC sync,
- OTA check,
- SD retry,
- WebSocket broadcast.

## Command dan API Lokal

File ini menangani banyak command WebSerial dan route API lokal. Dari struktur fungsi terlihat ada auth WebSerial admin, help command, command parsing, upload node data, schedule/threshold mutation, source mode mutation, manual fetch, client epoch, dan download log.

## Control Logic

`runControlLogic()` memakai data sensor, threshold, schedule, RTC, gateway control state, dan relay controller untuk menentukan output aktuator. File ini juga mengatur fail-safe dan sinkron status relay ke server.

## Data Masuk

Data masuk berasal dari node lokal, dashboard lokal, WebSerial command, cloud API, SD Card, RTC, dan konfigurasi NVS.

## Data Keluar

Data keluar berupa perubahan relay, log SD Card, response API lokal, broadcast WebSocket, upload status ke cloud, update firmware, dan output LCD.

## Error yang Mungkin Terjadi

- Karena file ini sangat besar, perubahan kecil bisa memengaruhi banyak jalur runtime.
- Jika queue penuh, mutation atau log bisa ditolak.
- Jika control loop tertahan oleh network/blocking work, aktuator bisa terlambat.
- Jika auth command tidak konsisten, aksi admin bisa gagal atau terlalu longgar.
- Jika watchdog timeout tidak cukup untuk operasi berat, gateway bisa reboot.

## Bagian untuk Pemula

File ini adalah "otak utama" gateway. Semua bagian yang sudah dijelaskan sebelumnya akhirnya dipanggil dan dijalankan dari sini.

## Bagian Advanced

File ini memisahkan beberapa pekerjaan menjadi deferred queue dan service function. Itu penting agar callback network tidak langsung melakukan pekerjaan berat di waktu yang tidak aman.

## Hubungan ke Sistem TA

Seluruh gateway IoT greenhouse berjalan melalui file ini: menerima data, memilih mode, mengontrol relay, menulis log, melayani dashboard, dan menjaga koneksi cloud.
