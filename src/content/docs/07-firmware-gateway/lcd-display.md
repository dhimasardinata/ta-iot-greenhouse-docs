---
title: "LCD Display"
---

# LCD Display

LCD menampilkan ringkasan status gateway di lokasi perangkat.

## Bukti dari Kode

`LCDDisplay.cpp` memakai `LiquidCrystal_I2C` dengan alamat dari `LCD_ADDR` dan ukuran 20x4.

Sebelum menulis, LCD diprobe melalui `Wire.beginTransmission(LCD_ADDR)`. Jika tidak tersedia, display dinonaktifkan agar log error tidak spam.

## Baris Tampilan

`LCDDisplay::update()` menampilkan:

1. waktu, tipe jaringan, status data, RSSI, atau failsafe,
2. suhu, kelembapan, cahaya,
3. status exhaust, dehumidifier, blower, dan fog,
4. threshold suhu dan kelembapan.

## Catatan Debugging

Jika LCD kosong:

1. cek alamat I2C `0x27`,
2. cek SDA/SCL 21/22,
3. cek power LCD,
4. cek log `LCD Not detected`,
5. jalankan I2C scanner jika perlu.

Lanjutkan ke [WebSocket Terminal](./websocket-terminal.md).
