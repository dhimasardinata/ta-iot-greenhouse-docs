---
title: "Uji Node ke Gateway"
---

# Uji Node ke Gateway

Uji node ke gateway memastikan mode edge bekerja saat node mengirim atau menyesuaikan data melalui gateway lokal.

## Kenapa Ini Penting

Jika internet terganggu, sistem tetap diharapkan punya jalur lokal. Pada TA ini, jalur lokal berkaitan dengan mode edge, mode auto, gateway, dan fallback.

## Bukti dari Kode

Nama file dan simbol yang terlihat menunjukkan jalur gateway pada firmware node:

- `node/lib/NodeCore/support/GatewayTargeting.h`
- `node/lib/NodeCore/api/ApiClient.Control.cpp`
- `node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp`
- `node/lib/NodeCore/api/ApiClient.UploadFlow.cpp`
- `node/lib/NodeCore/commands/SetGatewayCommand.*`
- `node/lib/NodeCore/commands/UplinkCommand.*`

Gateway memiliki penerima data dan WebSocket di:

- `gateway/include/SensorDataManager.h`
- `gateway/src/SensorDataManager.cpp`
- `gateway/include/WebSocketManager.h`
- `gateway/src/WebSocketManager.cpp`

## Parameter Uji

- Node menemukan gateway yang benar.
- Node memakai mode cloud, edge, atau auto sesuai konfigurasi.
- Gateway menerima data node lokal.
- Data lokal dipakai untuk kontrol saat cloud tidak tersedia.
- Delay node ke gateway.
- Data loss node ke gateway.
- RSSI saat node terhubung ke Wi-Fi lokal.

## Skenario Dasar

| Skenario | Harapan |
|---|---|
| Cloud tersedia | Node boleh mengirim ke cloud sesuai mode |
| Cloud putus, gateway tersedia | Mode edge atau auto memakai gateway |
| Gateway tidak tersedia | Node menyimpan cache atau fallback sesuai kebijakan |
| Wi-Fi lemah | Sistem tidak crash dan status error terlihat |

## Status Bukti

Belum terlihat file hasil uji QoS node ke gateway. Dokumentasi file-by-file harus memastikan detail protokol lokal dari implementasi `ApiClient` dan `SensorDataManager`.

Lanjutkan ke [Uji Gateway dan Aktuator](./uji-gateway-aktuator.md).
