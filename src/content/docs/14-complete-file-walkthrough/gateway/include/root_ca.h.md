---
title: "gateway/include/root_ca.h"
---

# gateway/include/root_ca.h

File ini mendeklarasikan root CA certificate untuk koneksi TLS gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/root_ca.h` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway mengakses endpoint HTTPS. Agar koneksi TLS bisa memverifikasi server, firmware membutuhkan root CA certificate. Header ini hanya mendeklarasikan pointer `root_ca_cert`; isi certificate berada di file `.cpp` lain menurut komentar source.

## Isi Utama

File ini berisi:

```cpp
extern const char* root_ca_cert;
```

`extern` berarti variabel dideklarasikan di sini, tetapi definisi dan isi memorinya berada di file lain.

## Data Masuk

Tidak ada data masuk runtime langsung ke header ini.

## Data Keluar

Data keluar berupa simbol `root_ca_cert` yang bisa dipakai file lain saat membuat koneksi HTTPS.

## Kapan Dipakai

File ini dipakai oleh modul jaringan gateway saat membuat koneksi aman ke server.

## Error yang Mungkin Terjadi

- Jika definisi `root_ca_cert` tidak ada di `.cpp`, build gagal saat link.
- Jika certificate kadaluarsa atau tidak cocok dengan server, koneksi HTTPS gagal.
- Jika gateway memakai banyak domain dengan CA berbeda, certificate perlu dievaluasi ulang.

## Bagian untuk Pemula

Root CA adalah bukti kepercayaan untuk HTTPS. Gateway memakainya untuk memastikan server yang dihubungi bukan server palsu.

## Bagian Advanced

Header ini memisahkan deklarasi dari isi certificate untuk menghindari multiple definition. Dokumentasi final perlu mengecek file `.cpp` yang benar-benar mendefinisikan certificate.

## Hubungan ke Sistem TA

Komunikasi gateway ke API cloud TA memakai HTTPS, sehingga root CA memengaruhi keamanan dan keberhasilan request jaringan.
