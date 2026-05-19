---
title: "Boot Sequence Gateway"
---

# Boot Sequence Gateway

Boot sequence gateway adalah urutan dari perangkat menyala sampai siap melakukan kontrol.

## Alur dari `setup()`

`gateway/src/main.cpp` menunjukkan urutan:

1. mulai Serial 115200,
2. konfigurasi watchdog,
3. `Wire.begin(SDA_PIN, SCL_PIN)`,
4. `lcd.begin()`,
5. `sensorData.begin()`,
6. `loadConfiguration()`,
7. set URL jadwal dari build flag,
8. `sd_logger.begin()`,
9. `relay.begin()`,
10. `relay.loadOverrides()`,
11. siapkan APN/GPRS,
12. `net.begin(...)`,
13. load uplink mode,
14. tunggu koneksi awal,
15. jika gagal, mulai config portal,
16. matikan Wi-Fi sleep,
17. mulai mDNS,
18. register route HTTP/API.

## Komponen yang Langsung Diaktifkan

- LCD,
- data manager,
- konfigurasi,
- SD Card,
- relay,
- Wi-Fi/GPRS network manager,
- web server route,
- WebSerial dan WebSocket.

## Catatan Debugging

Jika gateway gagal boot:

1. cek Serial Monitor,
2. cek LCD apakah berhenti di init tertentu,
3. cek SD Card mount,
4. cek pin I2C,
5. cek koneksi Wi-Fi/GPRS,
6. cek watchdog reset.

Lanjutkan ke [Mode Cloud](./mode-cloud.md).
