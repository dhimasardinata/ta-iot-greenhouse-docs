---
title: "Wiring"
---

# Wiring

Wiring adalah hubungan kabel antar perangkat. Wiring harus jelas karena kesalahan kabel dapat membuat sensor, relay, LCD, RTC, atau SD Card gagal bekerja.

## Wiring Node Sensor

Berdasarkan `node/include/config/hardware_pins.h`:

| Jalur | GPIO | Label |
|---|---:|---|
| I2C SDA | 4 | D2 |
| I2C SCL | 5 | D1 |

Sensor SHT dan BH1750 memakai I2C berdasarkan `SensorManager.h`.

## Wiring Gateway

Berdasarkan `gateway/include/config.h`:

| Bagian | Pin |
|---|---|
| I2C SDA | 21 |
| I2C SCL | 22 |
| SD CS | 2 |
| SD SCK | 18 |
| SD MISO | 19 |
| SD MOSI | 13 |
| GSM TX | 26 |
| GSM RX | 27 |
| GSM PWKEY | 4 |
| GSM RST | 5 |
| MODEM_POWER_ON | 23 |

## Wiring Relay

Pin relay berbeda untuk GH1 dan GH2 pada channel CH3/CH4:

| Greenhouse | CH1 | CH2 | CH3 | CH4 |
|---|---:|---:|---:|---:|
| GH1 | 32 | 33 | 14 | 12 |
| GH2 | 32 | 33 | 12 | 14 |

## Checklist Pemula

1. Pastikan GND antar modul tersambung sesuai kebutuhan rangkaian.
2. Pastikan tegangan sensor sesuai spesifikasi modul.
3. Jangan menukar SDA dan SCL.
4. Jangan menukar RX dan TX modem tanpa memahami arah komunikasi.
5. Periksa pin relay sesuai greenhouse yang sedang dipakai.
6. Jalankan I2C scanner jika LCD atau sensor tidak terdeteksi.
7. Jangan menyentuh kabel aktuator bertegangan tinggi tanpa prosedur keselamatan.

## Belum Terkonfirmasi

Detail wiring fisik lengkap, tegangan tiap modul, active high/low relay, dan diagram kabel aktual belum terlihat sebagai file skematik di inventory awal.
