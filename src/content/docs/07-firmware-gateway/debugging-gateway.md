---
title: "Debugging Gateway"
---

# Debugging Gateway

Debugging gateway perlu melihat jaringan, data source, relay, SD, RTC, LCD, dan WebSocket.

## Tempat Mulai

1. Serial Monitor 115200.
2. LCD 20x4.
3. WebSerial command `status`.
4. WebSocket dashboard.
5. SD Card log `/log.csv` dan `/qos.csv`.
6. Endpoint lokal seperti `/api/time` dan `/api/mode`.

## Masalah Umum

| Gejala | Area yang Dicek |
|---|---|
| Relay tidak berubah | RelayController, threshold, schedule, failsafe |
| Data stale | SensorDataManager, cloud fetch, node lokal |
| Gateway offline | MyNetworkManager, Wi-Fi, GPRS, APN |
| LCD kosong | I2C, alamat LCD, `LCDDisplay` |
| Log tidak tersimpan | SD Card, SPI pin, busy flag |
| Jam salah | RTCManager, RTC DS3231, NTP, HTTP time, modem time |
| Terminal tidak bisa command | encryption, admin session, WebSocket |

## Prinsip Aman

Jangan langsung memaksa relay ON/OFF tanpa memahami source mode, schedule, threshold, dan failsafe. Relay mengendalikan perangkat fisik.

Lanjutkan ke [File Reference Gateway](./file-reference/index.md).
