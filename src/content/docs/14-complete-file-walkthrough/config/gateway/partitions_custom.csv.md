---
title: "gateway/partitions_custom.csv"
---

# gateway/partitions_custom.csv

File ini menentukan pembagian ruang flash gateway ESP32.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/partitions_custom.csv` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway membutuhkan ruang flash untuk konfigurasi non-volatile, metadata OTA, dan dua slot aplikasi. Dua slot aplikasi membuat update firmware lebih aman karena firmware baru dapat ditulis ke slot lain sebelum perangkat berpindah versi.

## Isi Partisi

| Nama | Type | SubType | Offset | Size | Fungsi awal |
|---|---|---|---|---|---|
| `nvs` | `data` | `nvs` | `0x9000` | `0x5000` | Penyimpanan konfigurasi kecil seperti preferensi atau kredensial. |
| `otadata` | `data` | `ota` | `0xe000` | `0x2000` | Metadata yang membantu bootloader memilih slot OTA. |
| `app0` | `app` | `ota_0` | `0x10000` | `0x1E0000` | Slot aplikasi pertama. |
| `app1` | `app` | `ota_1` | `0x1F0000` | `0x1E0000` | Slot aplikasi kedua. |

## Data Masuk dan Keluar

File ini tidak dipakai sebagai data runtime biasa. PlatformIO/ESP-IDF membaca file ini saat build untuk menentukan layout flash firmware gateway.

## Kapan Dipakai

File ini dipakai karena `gateway/platformio.ini` mengatur:

```ini
board_build.partitions = partitions_custom.csv
```

Artinya build gateway memakai layout partisi custom ini, bukan layout default board.

## Error yang Mungkin Terjadi

- Jika ukuran firmware lebih besar dari `0x1E0000`, build atau upload dapat gagal.
- Jika offset dan ukuran saling bertabrakan, firmware bisa gagal boot atau OTA gagal.
- Jika fitur filesystem dibutuhkan tetapi tidak ada partisi filesystem, fitur itu tidak punya ruang khusus. Dari file ini, partisi filesystem gateway belum terlihat.

## Bagian untuk Pemula

Flash itu seperti lemari penyimpanan di dalam ESP32. File ini membagi lemari itu menjadi beberapa rak: rak konfigurasi, rak informasi update, dan dua rak untuk firmware.

## Bagian Advanced

Layout ini mendukung OTA dua slot. Namun tidak ada partisi `spiffs`, `littlefs`, atau `fat` di file ini. Jika gateway nanti membutuhkan filesystem lokal, layout ini perlu dievaluasi lagi.

## Hubungan ke Sistem TA

Gateway adalah perangkat penting untuk kontrol greenhouse. Layout partisi yang salah bisa membuat update firmware atau boot gateway gagal, sehingga greenhouse kehilangan pusat kendali lokal.

Lanjutkan ke [gateway/platformio.ini](./platformio.ini.md).
