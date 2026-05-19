---
title: "Konfigurasi Perangkat"
---

# Konfigurasi Perangkat

Konfigurasi perangkat menentukan identitas node, greenhouse, token, URL API, interval, Wi-Fi, dan mode kerja.

## Firmware Node

File yang terlihat:

- `node/node_id.ini`
- `node/include/generated/node_config.h`
- `node/include/config/constants.h`
- `node/include/config/calibration.h`
- `node/lib/NodeCore/system/ConfigManager.*`
- `node/lib/NodeCore/net/WifiCredentialStore.*`
- `node/scripts/inject_config.py`

Command terminal yang berkaitan dengan konfigurasi terlihat dari nama file:

- `SetWifiCommand`
- `WifiAddCommand`
- `WifiListCommand`
- `WifiRemoveCommand`
- `SetTokenCommand`
- `SetUrlCommand`
- `SetGatewayCommand`
- `SetConfigCommand`
- `GetConfigCommand`
- `ModeCommand`

## Firmware Gateway

File yang terlihat:

- `gateway/platformio.ini`
- `gateway/include/config.h`
- `gateway/include/ConfigManager.h`
- `gateway/src/ConfigManager.cpp`
- `gateway/include/WiFiCredentialStore.h`
- `gateway/src/WiFiCredentialStore.cpp`

## Prinsip Aman

Token produksi tidak disalin ke dokumentasi publik. Jika token perlu dibahas, dokumentasi cukup menjelaskan fungsi dan lokasinya, bukan nilai rahasianya.

Lanjutkan ke [Monitoring Log](./monitoring-log.md).
