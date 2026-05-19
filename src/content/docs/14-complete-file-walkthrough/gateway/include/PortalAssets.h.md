---
title: "gateway/include/PortalAssets.h"
---

# gateway/include/PortalAssets.h

File ini menyimpan halaman HTML portal konfigurasi gateway di dalam firmware.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/PortalAssets.h` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Saat gateway belum punya konfigurasi jaringan atau perlu dikonfigurasi ulang, perangkat dapat menampilkan portal setup lokal. File ini menyimpan HTML, CSS, dan JavaScript portal tersebut sebagai string `PROGMEM`.

## Isi Utama

File ini mendefinisikan:

```cpp
const char PORTAL_HTML[] PROGMEM = ...
```

Halaman portal berisi:

- judul `Greenhouse Gateway Setup`,
- form `POST /save`,
- scan Wi-Fi lewat `fetch('/scan')`,
- input SSID dan password Wi-Fi,
- input API token dan TA API token,
- input threshold URL dan data endpoint base URL,
- input admin password,
- checkbox GPRS fallback.

## Placeholder

HTML memakai placeholder seperti:

- `%SSID%`
- `%TOKEN%`
- `%TA_TOKEN%`
- `%TH_URL%`
- `%ND_URL_BASE%`
- `%GPRS_CHECKED%`

Nilai placeholder ini harus diganti oleh implementasi server sebelum dikirim ke browser.

## Data Masuk

Data masuk berasal dari pengguna melalui form konfigurasi dan dari endpoint `/scan` yang mengembalikan daftar jaringan Wi-Fi.

## Data Keluar

Data keluar berupa request `POST /save` berisi konfigurasi gateway baru.

## Kapan Dipakai

File ini dipakai saat gateway menjalankan access point/portal konfigurasi.

## Error yang Mungkin Terjadi

- Jika endpoint `/scan` tidak tersedia, daftar Wi-Fi tidak muncul.
- Jika endpoint `/save` tidak memproses semua field, konfigurasi tidak tersimpan lengkap.
- Jika placeholder tidak diganti, pengguna bisa melihat nilai mentah seperti `%TOKEN%`.
- Token dan password muncul sebagai input form; halaman harus disajikan pada jalur lokal yang aman sesuai desain gateway.

## Bagian untuk Pemula

File ini adalah halaman setup yang disimpan langsung di firmware gateway. Pengguna membuka halaman ini untuk memasukkan Wi-Fi, token, URL server, password admin, dan pilihan GPRS.

## Bagian Advanced

Asset ini berada di flash program melalui `PROGMEM`. Ini menghemat kebutuhan filesystem terpisah, tetapi setiap perubahan UI portal memerlukan rebuild firmware.

## Hubungan ke Sistem TA

Portal ini membantu gateway masuk ke jaringan dan server TA sehingga gateway bisa mengambil data, mengirim status, dan menjalankan kontrol greenhouse.
