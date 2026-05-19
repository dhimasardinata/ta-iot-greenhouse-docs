---
title: "LCD"
---

# LCD

LCD menampilkan status gateway secara lokal.

## Bukti dari Kode

`gateway/include/config.h` mendefinisikan:

| Item | Nilai |
|---|---|
| SDA | 21 |
| SCL | 22 |
| LCD address | `0x27` |

`gateway/include/LCDDisplay.h` memakai `LiquidCrystal_I2C` dan `Wire`.

## Data yang Ditampilkan

Berdasarkan parameter `LCDDisplay::update`, LCD dapat menerima data:

- tanggal/waktu,
- suhu,
- kelembapan,
- cahaya,
- status relay,
- status fog,
- threshold,
- status jaringan,
- status data stale,
- status SD Card,
- failsafe,
- RSSI,
- apakah memakai GPRS.

## Risiko

- alamat I2C salah,
- kabel SDA/SCL salah,
- LCD tidak tersedia,
- pesan terlalu panjang,
- refresh terlalu sering.

File `LCDDisplay.h` memiliki pengecekan ketersediaan berkala, sehingga dokumentasi file-by-file perlu menjelaskan cara kerja check tersebut.

Lanjutkan ke [RTC](./rtc.md).
