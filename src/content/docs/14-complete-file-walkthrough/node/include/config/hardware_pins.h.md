---
title: "node/include/config/hardware_pins.h"
---

# node/include/config/hardware_pins.h

File ini mendefinisikan pin hardware node sensor.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/config/hardware_pins.h` |
| Komponen | Firmware Node |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas menyimpan nomor pin I2C untuk sensor pada node ESP8266.

## Kenapa File Ini Ada

Sensor suhu/kelembapan dan sensor cahaya biasanya memakai jalur I2C. Dengan file ini, nomor pin tidak perlu ditulis ulang di banyak tempat.

## Konstanta Penting

| Konstanta | Nilai | Fungsi |
|---|---:|---|
| `PIN_I2C_SDA` | `4` | Jalur data I2C, sesuai D2 pada NodeMCU/Wemos. |
| `PIN_I2C_SCL` | `5` | Jalur clock I2C, sesuai D1 pada NodeMCU/Wemos. |

## Konsep Dasar yang Perlu Dipahami

- I2C memakai dua jalur utama: SDA untuk data dan SCL untuk clock.
- GPIO ESP8266 memakai nomor internal seperti 4 dan 5.
- Label board seperti D1/D2 adalah label fisik pada papan NodeMCU/Wemos.

## Error Handling

Tidak ada error handling langsung. Jika wiring tidak sesuai file ini, sensor bisa gagal terdeteksi atau membaca nilai kosong.

## Catatan Debugging

Jika SHT atau BH1750 tidak terbaca, cek wiring SDA ke D2/GPIO4 dan SCL ke D1/GPIO5, lalu cek pull-up dan alamat I2C sensor.

## Hubungan dengan Laporan TA

File ini berhubungan dengan wiring node sensor dan Bab III perancangan perangkat keras.
