---
title: "gateway/include/WiFiCredentialStore.h"
---

# gateway/include/WiFiCredentialStore.h

File ini mendeklarasikan penyimpanan multi-kredensial Wi-Fi gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/WiFiCredentialStore.h` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway dapat mencoba beberapa jaringan Wi-Fi: kredensial bawaan greenhouse dan jaringan tambahan yang disimpan pengguna. File ini mengatur penyimpanan, prioritas, hasil scan, RSSI, hidden network, dan urutan percobaan koneksi.

## Konstanta Penting

| Konstanta | Nilai | Fungsi awal |
|---|---:|---|
| `MAX_SAVED_NETWORKS` | 5 | Batas jaringan yang disimpan pengguna. |
| `WIFI_SSID_MAX_LEN` | 33 | Kapasitas SSID. |
| `WIFI_PASS_MAX_LEN` | 65 | Kapasitas password. |
| `MAX_SCAN_CACHE_RESULTS` | 12 | Batas cache hasil scan. |

## Struktur Data

`WiFiScanRecord` menyimpan SSID, RSSI, secure flag, dan valid flag.

`WifiCredential` menyimpan SSID, password, RSSI terakhir, availability, built-in flag, hidden flag, serta helper `isEmpty()` dan `clear()`.

## Fungsi Publik Utama

Class `WiFiCredentialStore` menyediakan:

- `init()`,
- tambah/hapus credential,
- cek credential,
- update dari hasil scan,
- catat kegagalan scan,
- ambil credential berikutnya,
- reset percobaan koneksi,
- getter jumlah saved/available,
- getter hasil scan terakhir,
- getter primary/secondary GH,
- `printStatus(...)`.

## Data Masuk

Data masuk berupa SSID, password, hidden flag, jumlah hasil scan, scan code, dan hasil scan Wi-Fi dari library ESP32.

## Data Keluar

Data keluar berupa credential berikutnya untuk dicoba, daftar scan cache, jumlah jaringan, dan status ke stream.

## Kapan Dipakai

File ini dipakai oleh network manager saat gateway mencari Wi-Fi yang tersedia atau saat operator menambah/menghapus kredensial.

## Error yang Mungkin Terjadi

- Jika SSID/password melebihi kapasitas buffer, implementasi harus memotong atau menolak dengan aman.
- Jika lebih dari 5 jaringan disimpan, jaringan tambahan tidak bisa masuk.
- Jika hasil scan gagal, gateway perlu menentukan apakah akan mencoba hidden network atau fallback.
- Jika kredensial built-in salah, gateway bisa terus gagal konek sebelum mencoba jaringan lain.

## Bagian untuk Pemula

File ini seperti buku daftar Wi-Fi gateway. Gateway melihat jaringan yang ada, memilih yang paling cocok, lalu mencoba login.

## Bagian Advanced

Penyimpanan memakai `Preferences` dan array kapasitas tetap. Ini cocok untuk embedded karena lebih terkontrol daripada alokasi dinamis besar.

## Hubungan ke Sistem TA

Koneksi gateway ke cloud bergantung pada pemilihan Wi-Fi yang benar, terutama jika greenhouse punya lebih dari satu jaringan atau perlu fallback.
