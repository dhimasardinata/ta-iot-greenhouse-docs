---
title: "Authentication"
---

# Authentication

Authentication adalah proses memastikan siapa pengguna atau perangkat yang mengakses sistem.

## Bukti dari Kode

Snapshot controller tidak memperlihatkan guard auth lengkap. Namun firmware gateway dan node memakai token/API config, dan controller OTA/endpoint hardware menerima request yang seharusnya dilindungi.

## Area yang Perlu Diperiksa

- auth user web,
- token perangkat node/gateway,
- endpoint upload firmware,
- endpoint simpan sensor,
- endpoint update threshold,
- endpoint device status,
- middleware route.

## Risiko

Jika endpoint hardware atau upload firmware tidak dilindungi, pihak luar bisa mengirim data palsu, mengubah threshold, atau mengunggah firmware yang tidak diinginkan.

## Status

Belum terlihat dari kode route/middleware pada snapshot ini.

Lanjutkan ke [API Sensor](./api-sensor.md).
