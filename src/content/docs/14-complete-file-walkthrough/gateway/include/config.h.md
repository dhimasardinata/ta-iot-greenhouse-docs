---
title: "gateway/include/config.h"
---

# gateway/include/config.h

File ini adalah konfigurasi pusat firmware gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/config.h` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Firmware gateway membutuhkan satu tempat untuk mendefinisikan versi firmware, level debug, pin hardware, nama greenhouse, default jaringan, endpoint waktu, token default, timeout, interval, watchdog, dan interval WebSocket.

## Isi Utama

File ini berisi:

- enum `RelayIndex`,
- `FIRMWARE_VERSION`,
- `DEBUG_LEVEL`,
- pin SIM800L,
- pin SD Card SPI,
- pin relay berdasarkan `GH_ID_CONFIG`,
- pin I2C dan alamat LCD,
- default SSID/password Wi-Fi,
- default GPRS,
- timezone dan NTP server,
- token autentikasi default,
- interval kontrol, API, retry, stale data, fail-safe, SD retry, OTA, portal, admin password, watchdog, dan WebSocket.

## Konfigurasi Relay Per Greenhouse

Jika `GH_ID_CONFIG == 1`, `GH_NAME` menjadi `GREENHOUSE 1` dan pin relay CH3/CH4 berbeda dari GH2.

Jika `GH_ID_CONFIG == 2`, `GH_NAME` menjadi `GREENHOUSE 2` dan pin relay CH3/CH4 ditukar dibanding GH1.

Jika nilai selain 1 atau 2 dipakai, file ini memicu error compile.

## Data Masuk

Data masuk utama berasal dari build flag `GH_ID_CONFIG` dan `DEBUG_LEVEL` dari PlatformIO.

## Data Keluar

Data keluar berupa konstanta compile-time yang dipakai semua modul gateway.

## Kapan Dipakai

File ini dipakai hampir semua bagian firmware gateway: relay, LCD, RTC, network, SD Card, WebSocket, watchdog, dan OTA.

## Error yang Mungkin Terjadi

- Jika `GH_ID_CONFIG` salah, build gagal atau pin relay tidak sesuai hardware.
- Jika pin relay tidak sesuai wiring aktual, aktuator salah kanal.
- Jika timeout terlalu besar, control loop bisa tertahan.
- Jika timeout terlalu kecil, request jaringan sering gagal.
- File ini memuat kredensial/token/default password yang terlihat di source. Untuk produksi, nilai semacam ini perlu diperlakukan sebagai rahasia atau minimal dicatat sebagai risiko keamanan.

## Bagian untuk Pemula

File ini seperti buku aturan utama firmware gateway. Banyak nilai penting seperti pin, waktu tunggu, nama greenhouse, dan interval kerja diambil dari sini.

## Bagian Advanced

Konfigurasi di header membuat nilai mudah dipakai saat compile, tetapi perubahan membutuhkan rebuild firmware. Nilai rahasia yang tertanam di firmware juga tidak mudah dicabut tanpa update firmware.

## Hubungan ke Sistem TA

Kesalahan di file ini bisa berdampak langsung ke koneksi jaringan, waktu, relay, SD Card, OTA, dan keselamatan kontrol greenhouse.
