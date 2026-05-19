---
title: "gateway/include/ConfigManager.h"
---

# gateway/include/ConfigManager.h

File ini mendeklarasikan antarmuka konfigurasi gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/ConfigManager.h` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway perlu menyimpan dan memakai konfigurasi seperti SSID, password Wi-Fi, token API, URL cloud, password admin, dan pilihan GPRS. File header ini membuat variabel global dan fungsi konfigurasi bisa dipakai oleh file gateway lain tanpa menyalin implementasi.

## Isi Utama

File ini berisi:

- forward declaration untuk `AsyncWebServer`, `AsyncWebServerRequest`, dan `LCDDisplay`,
- deklarasi variabel global aktif seperti `active_ssid`, `active_pwd`, token, URL, `active_admin_pass`, dan `gprs_enabled`,
- deklarasi halaman OTA `OTA_UPDATE_PAGE`,
- fungsi load konfigurasi, portal konfigurasi, OTA handler, clear Wi-Fi, dan simpan GPRS,
- fungsi autentikasi admin berbasis password, session token, request binding, dan pengecekan request.

## Data Masuk

Data masuk dapat berupa:

- konfigurasi yang tersimpan di NVS,
- input portal konfigurasi,
- password admin dari request,
- token admin dari request,
- request HTTP dari `AsyncWebServerRequest`.

## Data Keluar

Data keluar berupa:

- isi variabel global aktif yang dipakai modul lain,
- session token admin,
- status valid/tidak valid untuk password atau token,
- perubahan konfigurasi Wi-Fi/GPRS yang disimpan.

## Kapan Dipakai

File ini dipakai saat gateway boot, masuk portal konfigurasi, menerima request admin, menangani OTA, atau menghapus kredensial Wi-Fi.

## Error yang Mungkin Terjadi

- Jika variabel `extern` tidak punya definisi cocok di file `.cpp`, build akan gagal pada tahap link.
- Jika ukuran buffer global tidak cukup untuk nilai URL/token, implementasi perlu memastikan tidak terjadi pemotongan atau overflow.
- Jika password admin kosong atau terlalu lemah, akses konfigurasi dan OTA lebih berisiko.
- Jika request binding/token tidak sinkron antara client dan server, request admin bisa ditolak.

## Bagian untuk Pemula

Header ini seperti daftar pintu masuk untuk fitur konfigurasi. Isinya belum menjelaskan semua cara kerja, tetapi memberi tahu fungsi dan data apa yang boleh dipanggil oleh bagian gateway lain.

## Bagian Advanced

Desain memakai variabel global aktif. Ini sederhana untuk firmware kecil, tetapi kontrak ukuran buffer dan urutan pemuatan konfigurasi harus jelas supaya modul lain tidak membaca nilai kosong atau lama.

## Hubungan ke Sistem TA

Gateway membutuhkan konfigurasi yang benar agar bisa terhubung ke Wi-Fi, cloud, endpoint TA, OTA, dan mode fallback GPRS.
