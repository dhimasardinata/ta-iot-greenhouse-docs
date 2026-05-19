---
title: "SD Card Logging"
---

# SD Card Logging

SD Card logging mencatat data operasional dan QoS gateway.

## Bukti dari Kode

`SDCardLogger.cpp` membuka:

- `/log.csv`
- `/qos.csv`

Jika file kosong, logger menulis header CSV.

## Data Log Utama

`logData()` mencatat:

- waktu,
- suhu,
- kelembapan,
- cahaya,
- tipe jaringan,
- signal/RSSI,
- status relay,
- fog,
- threshold,
- gateway mode,
- threshold source,
- schedule source,
- status schedule aktif,
- sumber keputusan relay.

## Data QoS

`logQoS()` mencatat:

- waktu RX,
- node ID,
- waktu TX,
- ukuran payload,
- RSSI active,
- RSSI non-active.

## Perlindungan

Logger memiliki flag `_isBusy` agar logging tidak bertabrakan dengan download atau operasi lain. Flush log utama dilakukan setelah beberapa write.

Lanjutkan ke [LCD Display](./lcd-display.md).
