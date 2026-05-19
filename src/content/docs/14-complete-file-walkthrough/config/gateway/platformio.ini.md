---
title: "gateway/platformio.ini"
---

# gateway/platformio.ini

File ini adalah konfigurasi build PlatformIO untuk firmware gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/platformio.ini` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

PlatformIO perlu tahu board, framework, library, partisi, URL endpoint, flag kompilasi, dan environment mana yang akan dibangun. File ini menyatukan konfigurasi itu untuk gateway greenhouse.

## Struktur Utama

| Section | Fungsi |
|---|---|
| `[platformio]` | Mengatur default environment dan cache build. |
| `[config_gh1]` | ID gateway/firmware untuk greenhouse 1. |
| `[config_gh2]` | ID gateway/firmware untuk greenhouse 2. |
| `[origin]` | Base URL API cloud utama. |
| `[proxy]` | Base URL relay/proxy. |
| `[common]` | Konfigurasi yang dipakai bersama oleh environment gateway. |
| `[env:gh1]` | Build firmware khusus greenhouse 1. |
| `[env:gh2]` | Build firmware khusus greenhouse 2. |

## Konfigurasi Board dan Framework

Bagian `[common]` menunjukkan:

- platform: `espressif32`
- board: `esp32dev`
- framework: `arduino`
- monitor serial: `115200`
- partisi: `partitions_custom.csv`

Ini berarti gateway pada snapshot ini dibangun sebagai firmware Arduino untuk ESP32 generic development board.

## Library yang Dipakai

Library yang terlihat:

- `ArduinoJson`
- `RTClib`
- `LiquidCrystal_I2C`
- `TinyGSM`
- `NTPClient`
- `ESPAsyncWebServer`
- `AsyncTCP`

Nama library ini cocok dengan kebutuhan gateway: JSON API, RTC, LCD I2C, modem GSM, sinkronisasi waktu, web server lokal, dan komunikasi TCP async.

## URL dan Flag Penting

Build flags mendefinisikan endpoint seperti:

- `TH_URL`
- `ND_URL`
- `DEVICE_STATUS_POST_URL`
- `DEVICE_STATUS_GET_URL_BASE`
- `FW_UPDATE_URL`
- `ND_URL_BASE`
- `SCHEDULE_URL`
- `CAMERA_STATUS_URL_BASE`
- `RELAY_API_ROOT`

Flag juga mengaktifkan:

- modem `SIM800` melalui `TINY_GSM_MODEM_SIM800`
- optimasi ukuran melalui `-Os`
- debug level `DEBUG_LEVEL=3`
- `GH_ID_CONFIG` sesuai environment
- `FW_VERSION_ID` sesuai environment

## Perbedaan GH1 dan GH2

| Environment | `GH_ID_CONFIG` | `FW_VERSION_ID` | Upload |
|---|---:|---:|---|
| `gh1` | `1` | `100` | `esptool` |
| `gh2` | `2` | `200` | `esptool` |

Komentar di file menunjukkan OTA bisa dipakai dengan mengganti protocol ke `espota` dan port ke hostname gateway masing-masing. Namun pada isi aktif file ini, upload masih memakai `esptool`.

## Data Masuk dan Keluar

File ini menjadi input untuk PlatformIO. Outputnya adalah hasil build firmware gateway, bukan data runtime langsung.

## Error yang Mungkin Terjadi

- Jika `default_envs` masih `gh1`, build default akan menghasilkan firmware GH1, bukan GH2.
- Jika URL cloud/proxy berubah tetapi build flags tidak diperbarui, gateway akan memanggil endpoint lama.
- Jika dependency versi baru berubah perilaku, firmware bisa gagal build atau berubah runtime.
- Jika `partitions_custom.csv` tidak cocok dengan ukuran firmware, OTA atau upload bisa gagal.
- Jika `TINY_GSM_MODEM_SIM800` tidak sesuai modem aktual, koneksi modem bisa bermasalah.

## Bagian untuk Pemula

File ini seperti resep build. PlatformIO membaca resep ini untuk tahu alat apa yang dipakai, library apa yang dipasang, alamat server mana yang dituju, dan greenhouse mana yang sedang dibuatkan firmware.

## Bagian Advanced

Banyak endpoint dimasukkan lewat compile-time flags. Ini membuat firmware jelas saat dibangun, tetapi perubahan endpoint memerlukan rebuild dan upload ulang firmware. Untuk sistem produksi yang sering berubah URL, sebagian konfigurasi bisa dipertimbangkan masuk storage runtime, tetapi hal itu belum dikonfirmasi sebagai desain pada file ini.

## Hubungan ke Sistem TA

Gateway mengandalkan file ini untuk membedakan greenhouse, mengambil threshold/jadwal, mengirim status perangkat, melakukan update firmware, dan memakai library hardware yang sesuai.

Lanjutkan ke [Folder Overview: Gateway](../../gateway/index.md).
