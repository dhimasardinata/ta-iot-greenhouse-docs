---
title: "gateway/src/LCDDisplay.cpp"
---

# gateway/src/LCDDisplay.cpp

File ini mengimplementasikan tampilan LCD 20x4 gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/LCDDisplay.cpp` |
| Komponen | Firmware Gateway |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Header `LCDDisplay.h` mendeklarasikan fungsi LCD. File ini berisi cara gateway mengecek LCD di bus I2C, menulis pesan, membersihkan layar, dan menampilkan ringkasan status sistem.

## Alur Inisialisasi

1. Constructor membuat objek `LiquidCrystal_I2C` dengan alamat `LCD_ADDR` dan ukuran 20x4.
2. `begin()` memanggil `checkAvailability()`.
3. Jika LCD tersedia, LCD di-init, backlight dinyalakan, dan pesan loading ditampilkan.
4. Jika tidak tersedia, display dinonaktifkan dan hanya log debug yang keluar.

## Cek Availability

`checkAvailability()` memakai `Wire.beginTransmission(LCD_ADDR)` dan `Wire.endTransmission()` untuk mendeteksi apakah LCD merespons. Status perubahan dari ada ke hilang, atau sebaliknya, dicatat lewat debug.

## Tampilan Utama

`update(...)` mengisi 4 baris:

1. waktu dan status network, atau `FAILSAFE`,
2. suhu, kelembapan, dan cahaya,
3. status relay exhaust, dehumidifier, blower, dan fog,
4. threshold suhu dan kelembapan.

## Data Masuk

Data masuk berupa waktu, data sensor, status relay, status fog, threshold, koneksi network, stale flag, SD flag, fail-safe flag, RSSI, dan status GPRS.

## Data Keluar

Data keluar berupa teks pada LCD fisik.

## Error yang Mungkin Terjadi

- Jika LCD tidak terpasang, semua operasi display dilewati.
- Jika `dt` tidak berisi format dengan jam di posisi `dt + 11`, baris waktu bisa salah.
- Karena `update()` memanggil `clear()` layar setiap refresh, update terlalu sering bisa membuat tampilan berkedip.

## Bagian untuk Pemula

File ini membuat layar gateway menampilkan kondisi penting tanpa perlu membuka dashboard.

## Bagian Advanced

`message()` membuat buffer 20 karakter untuk satu baris. Ini cocok dengan LCD 20 kolom, tetapi pesan panjang akan terpotong.

## Hubungan ke Sistem TA

LCD memberi status lokal untuk operator greenhouse: apakah gateway online, data stale, relay aktif, atau masuk fail-safe.
