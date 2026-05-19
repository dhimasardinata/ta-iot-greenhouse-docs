---
title: "File Reference Firmware Gateway"
---

# File Reference Firmware Gateway

Bagian ini akan menjadi pintu masuk dokumentasi file-by-file gateway.

## Status Saat Ini

File gateway yang relevan masih `Pending` di [Coverage Report](../../14-complete-file-walkthrough/coverage-report.md). Halaman ini hanya overview.

## Kelompok File Gateway

| Kelompok | Peran |
|---|---|
| `gateway/src/main.cpp` | Entry point, HTTP routes, loop kontrol. |
| `gateway/include/config.h` | Pin, endpoint, token default, timeout, watchdog. |
| `gateway/src/MyNetworkManager.cpp` | Wi-Fi, GPRS, API fetch, QoS. |
| `gateway/src/SensorDataManager.cpp` | Data cloud/local, threshold, mode sumber data. |
| `gateway/src/RelayController.cpp` | Schedule, threshold, relay, failsafe. |
| `gateway/src/RTCManager.cpp` | RTC, NTP, HTTP time, modem time. |
| `gateway/src/SDCardLogger.cpp` | Log CSV dan QoS. |
| `gateway/src/LCDDisplay.cpp` | Tampilan LCD 20x4. |
| `gateway/src/WebSocketManager.cpp` | Dashboard realtime, terminal, encrypted frame. |

## Urutan Batch File-by-File yang Disarankan

1. `gateway/include/config.h`
2. `gateway/src/main.cpp`
3. `gateway/src/SensorDataManager.cpp`
4. `gateway/src/RelayController.cpp`
5. `gateway/src/MyNetworkManager.cpp`
6. `gateway/src/GatewayControlState.cpp`
7. `gateway/src/RTCManager.cpp`
8. `gateway/src/SDCardLogger.cpp`
9. `gateway/src/WebSocketManager.cpp`
10. `gateway/src/LCDDisplay.cpp`

Gunakan template wajib dari `goal.md` untuk setiap file.
