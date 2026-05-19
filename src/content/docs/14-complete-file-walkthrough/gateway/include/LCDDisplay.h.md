---
title: "gateway/include/LCDDisplay.h"
---

# gateway/include/LCDDisplay.h

File ini mendeklarasikan class untuk tampilan LCD gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/LCDDisplay.h` |
| Komponen | Firmware Gateway |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway memakai LCD untuk menampilkan kondisi sistem secara lokal. Operator bisa melihat waktu, data sensor, status relay, koneksi, SD Card, fail-safe, RSSI, dan apakah gateway memakai GPRS.

## Isi Utama

Class `LCDDisplay` menyediakan:

- constructor,
- `begin()` untuk inisialisasi,
- `update(...)` untuk memperbarui tampilan utama,
- `message(...)` untuk menulis pesan pada posisi tertentu,
- `clear()` untuk membersihkan layar,
- `isAvailable()` dan `checkAvailability()` untuk mengecek LCD/I2C.

## Data Masuk

Method `update(...)` menerima banyak status:

- tanggal/waktu,
- suhu, kelembapan, cahaya,
- status relay 1 sampai 3 dan fog,
- threshold suhu dan kelembapan,
- koneksi network,
- status data stale,
- status SD Card,
- status fail-safe,
- RSSI,
- status GPRS.

## Data Keluar

Data keluar bukan file atau JSON, melainkan tampilan fisik di LCD.

## Kapan Dipakai

File ini dipakai saat gateway boot, menampilkan pesan status, dan memperbarui tampilan selama loop runtime.

## Error yang Mungkin Terjadi

- Jika LCD tidak terdeteksi lewat I2C, update tampilan bisa gagal.
- Jika `message()` menulis teks terlalu panjang, tampilan 20x4 bisa terlihat terpotong.
- Jika update terlalu sering, bus I2C bisa menambah beban runtime.

## Bagian untuk Pemula

LCD adalah layar kecil di alat. File ini adalah daftar fungsi yang dipakai firmware untuk menulis informasi ke layar itu.

## Bagian Advanced

File ini menyimpan status availability dan interval cek 5000 ms. Ini membantu menghindari spam I2C saat LCD tidak ada atau bermasalah.

## Hubungan ke Sistem TA

LCD membantu operator greenhouse melihat kondisi gateway tanpa membuka web dashboard.
