---
title: "SD Card"
---

# SD Card

SD Card dipakai untuk logging lokal gateway.

## Bukti dari Kode

`gateway/include/config.h` mendefinisikan pin SPI SD Card:

| Fungsi | Pin |
|---|---:|
| SD CS | 2 |
| SD SCK | 18 |
| SD MISO | 19 |
| SD MOSI | 13 |

`gateway/include/SDCardLogger.h` menunjukkan fungsi logging data dan QoS.

## Data yang Bisa Dicatat

Berdasarkan parameter `logData`, logger dapat mencatat:

- waktu,
- suhu,
- kelembapan,
- cahaya,
- RSSI,
- GPRS atau bukan,
- status relay,
- status fog,
- threshold,
- mode gateway,
- sumber threshold,
- sumber jadwal,
- keputusan relay.

`logQoS` juga menerima data node, waktu kirim, ukuran payload, dan RSSI.

## Risiko

- SD Card tidak terbaca,
- file log terlalu besar,
- write gagal,
- proses logging mengganggu loop kontrol,
- kartu penuh,
- format log rusak.

Lanjutkan ke [Wiring](./wiring.md).
