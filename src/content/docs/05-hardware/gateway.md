---
title: "Gateway"
---

# Gateway

Gateway adalah perangkat pusat lokal yang membantu mengambil data, mengendalikan aktuator, menyimpan log, menampilkan status, dan berkomunikasi ke cloud.

## Bukti dari Kode

File `gateway/include/config.h` menyebut proyek gateway sebagai ESP32 T-Call Relay Controller dan mendefinisikan perangkat berikut:

- SIM800L / modem GSM,
- SD Card melalui SPI,
- relay channel,
- I2C untuk LCD dan RTC,
- LCD I2C alamat `0x27`,
- watchdog,
- WebSocket update interval.

## Pin Penting Gateway

| Bagian | Pin |
|---|---|
| GSM TX | 26 |
| GSM RX | 27 |
| GSM PWKEY | 4 |
| GSM RST | 5 |
| MODEM_POWER_ON | 23 |
| SD CS | 2 |
| SD SCK | 18 |
| SD MISO | 19 |
| SD MOSI | 13 |
| I2C SDA | 21 |
| I2C SCL | 22 |

## Peran Gateway

Gateway dapat menjadi penghubung antara sistem lokal dan cloud. Gateway juga dekat dengan aktuator, sehingga kesalahan konfigurasi gateway bisa berdampak langsung ke perangkat fisik.

## Catatan Penting

File config gateway juga memuat default SSID, password, token, dan endpoint. Dokumentasi file-by-file harus membahas risiko keamanan tanpa menyalin rahasia lebih jauh dari yang sudah ada di source.

Lanjutkan ke [Relay dan SSR](./relay-ssr.md).
