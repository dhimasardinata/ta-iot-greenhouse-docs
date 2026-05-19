---
title: "Debugging Node"
---

# Debugging Node

Debugging node berarti mencari masalah pada firmware, sensor, Wi-Fi, cache, API, OTA, atau portal.

## Tempat Mulai

1. Serial Monitor.
2. Log tag seperti `BOOT`, `APP`, `WIFI`, `HEALTH`, `AUTO-FIX`.
3. Portal lokal jika Wi-Fi gagal.
4. Terminal WebSocket jika session tersedia.
5. Status cache.
6. Response API.

## Masalah Umum

| Gejala | Kemungkinan Area |
|---|---|
| Node restart terus | BootGuard, crash handler, filesystem, WDT |
| Sensor invalid | I2C, SHT, BH1750, recovery sensor |
| Tidak bisa Wi-Fi | WifiManager, credential store, portal |
| Data tidak terkirim | ApiClient, TLS, cloud/edge target, cache |
| Portal lambat | heap, WebSocket, TLS buffer, scan Wi-Fi |
| OTA gagal | OtaManager, AppServer OTA, ArduinoOTA, timeout |

## Langkah Aman

1. Baca log boot.
2. Pastikan perangkat tidak sedang safe mode.
3. Cek status Wi-Fi.
4. Cek status sensor.
5. Cek heap/free block jika upload gagal.
6. Cek apakah data masuk cache.
7. Cek endpoint cloud/gateway.

## Jangan Langsung Menghapus Data

Factory reset dan format filesystem bisa menghapus konfigurasi/cache. Gunakan hanya jika memang diperlukan dan sudah memahami akibatnya.

Lanjutkan ke [File Reference Node](./file-reference/index.md).
