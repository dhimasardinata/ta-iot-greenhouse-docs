---
title: "Folder Overview: Gateway"
---

# Folder Overview: Gateway

Folder ini akan menampung dokumentasi file-by-file untuk firmware gateway.

## Fungsi Komponen

Gateway bertugas menjadi pusat kendali lokal, mengambil atau menerima data, mengelola threshold dan jadwal, menampilkan status ke LCD, menulis log ke SD Card, menjaga waktu RTC/NTP, dan mengendalikan relay/aktuator.

## Jenis File

- `gateway/src/*.cpp` berisi implementasi firmware gateway.
- `gateway/include/*.h` berisi deklarasi class, konfigurasi, validasi, dan asset embedded.
- `gateway/platformio.ini` dan `gateway/partitions_custom.csv` adalah konfigurasi build/partisi.

## File Paling Penting untuk Dibaca Awal

1. `gateway/src/main.cpp`
2. `gateway/include/config.h`
3. `gateway/src/MyNetworkManager.cpp`
4. `gateway/src/SensorDataManager.cpp`
5. `gateway/src/RelayController.cpp`
6. `gateway/src/RTCManager.cpp`
7. `gateway/src/SDCardLogger.cpp`
8. `gateway/src/LCDDisplay.cpp`
9. `gateway/src/WebSocketManager.cpp`

## Urutan Membaca

Mulai dari konfigurasi dan `main.cpp`, lalu network, data sensor, kontrol relay, waktu, SD Card, LCD, WebSocket, dan crypto.

## Status

File detail masih `Pending` di [Coverage Report](../coverage-report.md). Halaman ini hanya overview komponen.
