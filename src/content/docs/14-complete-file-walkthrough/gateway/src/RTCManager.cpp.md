---
title: "gateway/src/RTCManager.cpp"
---

# gateway/src/RTCManager.cpp

File ini mengimplementasikan pengelolaan waktu gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/RTCManager.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway membutuhkan waktu yang benar untuk jadwal aktuator, log, validasi timestamp terenkripsi, dan tampilan. File ini menyatukan RTC DS3231, jam internal ESP32, NTP, waktu modem, HTTP time API, dan epoch dari dashboard.

## Prinsip Waktu

Komentar source menyatakan jam internal ESP32 disetel ke UTC, lalu timezone lokal diatur melalui environment `TZ` POSIX. Untuk sistem ini, timezone default adalah `Asia/Jakarta` dengan POSIX `WIB-7`.

## Alur Begin

1. Menampilkan pesan `Init Time Mgr...`.
2. Mengatur replay skew crypto ke soft window.
3. Menyalin timezone dan NTP server dari `config.h`.
4. Mengatur `TZ` dan `tzset()`.
5. Mengecek RTC hardware.
6. Jika RTC valid, jam internal ESP32 diset dari RTC.
7. Jika RTC gagal atau waktu invalid, gateway mengandalkan sync sumber lain.

## Urutan Sinkronisasi

`checkAndSyncOnDrift(...)` mencoba NTP, waktu modem, HTTP time API, lalu epoch client terbaru. Jika semua gagal, hasilnya `None`.

## Validasi Sumber Waktu

- Epoch harus lebih baru dari batas awal 2023.
- HTTP time harus cocok timezone dan UTC offset.
- Modem time harus cocok UTC offset.
- Client epoch hanya dipercaya jika masih dalam umur singkat dari `CLIENT_TIME_SAMPLE_MAX_AGE_MS`.

## Data Masuk

Data masuk berasal dari RTC hardware, NTP server, modem network, HTTP API, dan epoch yang dikirim client dashboard.

## Data Keluar

Data keluar berupa jam sistem, string waktu lokal, metadata sumber sinkronisasi, status authoritative, dan pengaturan replay skew window crypto.

## Error yang Mungkin Terjadi

- RTC hardware tidak ditemukan.
- NTP gagal karena Wi-Fi atau server tidak bisa dijangkau.
- Modem/HTTP time ditolak karena timezone atau offset tidak cocok.
- Client epoch terlalu lama atau salah.
- Jika waktu tidak valid, schedule dan validasi timestamp terenkripsi bisa terganggu.

## Bagian untuk Pemula

File ini memastikan gateway tahu jam berapa sekarang. Jadwal relay tidak bisa dipercaya kalau jam gateway salah.

## Bagian Advanced

Saat sync authoritative berhasil, `recordSyncMetadata(...)` mengubah replay window crypto menjadi strict. Saat belum authoritative, window lebih longgar agar toleran terhadap perbedaan waktu.

## Hubungan ke Sistem TA

Jadwal aktuator, log SD Card, dashboard, dan keamanan payload gateway semuanya bergantung pada waktu yang benar.
