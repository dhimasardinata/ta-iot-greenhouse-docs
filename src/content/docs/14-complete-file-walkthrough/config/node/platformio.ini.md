---
title: "node/platformio.ini"
---

# node/platformio.ini

File ini adalah konfigurasi build PlatformIO utama untuk firmware node ESP8266.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/platformio.ini` |
| Komponen | Config |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

PlatformIO membaca file ini untuk tahu board, framework, library, script build, flag compiler, environment USB/OTA, dan environment test. Tanpa file ini, firmware node tidak punya resep build yang jelas.

## Konfigurasi Global

| Item | Nilai |
|---|---|
| `default_envs` | `wemosd1mini_usb` |
| Platform | `espressif8266@4.2.1` |
| Framework | `arduino` |
| Filesystem | `littlefs` |
| Monitor speed | `115200` |
| Upload default | `esptool` |

## Library

Library yang dipakai:

- `sensirion/arduino-sht@1.2.6`
- `claws/BH1750@1.3.0`
- `esp32async/ESPAsyncWebServer@3.8.1`

Ini sesuai dengan kebutuhan node: sensor suhu/kelembapan, sensor cahaya, dan web server lokal.

## Build Flags Penting

File ini memakai C++20, menonaktifkan RTTI dan exception, mengaktifkan penghematan section linker, memakai mode memori ESP8266 tertentu, dan mengatur `WS_MAX_QUEUED_MESSAGES=12`.

Untuk source proyek, file ini mengaktifkan banyak warning ketat termasuk `-Werror`, `-Wconversion`, `-Wshadow=local`, dan `-Wstack-usage=1024`.

## Environment

| Environment | Fungsi |
|---|---|
| `wemosd1mini_usb` | Build release untuk Wemos D1 Mini lewat USB. |
| `wemosd1mini_ota` | Turunan Wemos D1 Mini dengan upload OTA. |
| `nodemcuv2_usb` | Build untuk NodeMCU v2 lewat USB. |
| `nodemcuv2_ota` | Build NodeMCU v2 dengan upload OTA. |
| `integration_test_mocked` | Test integrasi mocked. |
| `native` | Native test di komputer host. |

## Script Build

Environment Wemos D1 Mini menjalankan:

- `scripts/inject_config.py`
- `scripts/extra_script.py`
- `scripts/web_to_header.py`
- `scripts/convert_certs.py`
- `scripts/convert_sysincludes.py`

Script ini penting karena konfigurasi, asset web, dan sertifikat dapat digenerate sebelum build.

## Error yang Mungkin Terjadi

- Jika salah environment dipakai, firmware bisa dibuat untuk board atau mode upload yang keliru.
- Karena `-Werror` aktif, warning kecil bisa menghentikan build.
- Jika script pre-build gagal, file generated tidak dibuat dan build gagal.
- Jika library versi berubah, kompatibilitas firmware bisa berubah.

## Bagian untuk Pemula

File ini adalah resep utama membuat firmware node. Di sini tertulis papan apa yang dipakai, sensor apa yang didukung, dan langkah apa yang harus dijalankan sebelum firmware jadi.

## Bagian Advanced

Pemisahan `build_flags` dan `build_src_flags` berarti warning ketat lebih difokuskan ke source proyek, bukan semua dependency. Ini membantu menjaga kualitas source sendiri tanpa memecahkan library pihak ketiga.

## Hubungan ke Sistem TA

Node greenhouse dibangun, dites, dan di-upload dari konfigurasi ini. File ini menjadi salah satu bukti utama cara firmware node dijalankan.

