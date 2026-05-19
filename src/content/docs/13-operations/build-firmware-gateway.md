---
title: "Build Firmware Gateway"
---

# Build Firmware Gateway

Build firmware gateway mengubah source ESP32 menjadi firmware untuk greenhouse tertentu.

## Environment yang Terlihat

Dari `gateway/platformio.ini`:

- `env:gh1`
- `env:gh2`

Default environment:

```txt
gh1
```

## Konfigurasi GH

`gateway/platformio.ini` memiliki bagian:

```txt
[config_gh1]
gh_id = 1
fw_id = 100
up_id = 1

[config_gh2]
gh_id = 2
fw_id = 200
up_id = 2
```

Artinya firmware gateway bisa dibedakan untuk GH 1 dan GH 2.

## Endpoint Operasional

Build flags gateway memasukkan URL untuk:

- threshold,
- average sensor data,
- device status,
- firmware update,
- schedule,
- camera status,
- relay proxy.

## Risiko Operasional

Jika salah memilih environment, gateway bisa memakai `GH_ID_CONFIG` dan `FW_VERSION_ID` yang salah. Dampaknya data, threshold, jadwal, atau OTA bisa mengarah ke greenhouse yang tidak sesuai.

Lanjutkan ke [OTA Release](./ota-release.md).
