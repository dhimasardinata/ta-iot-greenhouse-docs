---
title: "OTA Release"
---

# OTA Release

OTA release adalah proses membuat firmware baru lalu mengunggahnya agar perangkat bisa update dari jaringan.

## Script yang Terlihat

- `node/scripts/build_all.py`
- `node/scripts/build_and_ota.py`
- `node/scripts/curl_ota_post.py`
- `node/scripts/curl_ota_post_all.py`
- `node/scripts/test_ota_upload.py`

## Alur Node

1. Pilih versi firmware.
2. Build firmware untuk node target.
3. Simpan file `.bin`.
4. Upload ke endpoint OTA backend.
5. Node cek versi terbaru.
6. Node download firmware.
7. Node menulis firmware dan restart.

## Endpoint Backend

`web/OtaController.php` menunjukkan:

- `uploadFirmware()` untuk upload file.
- `getFirmwareInfo()` untuk mengambil firmware terbaru.

Upload menerima:

- `status`,
- `version`,
- `file`,
- `sensor_id` atau `node_id`.

## Checklist Aman

- Versi firmware jelas.
- File `.bin` berasal dari environment yang benar.
- Node ID benar.
- Token upload benar.
- Metadata firmware tersimpan.
- Firmware lama tidak langsung hilang sebelum update baru terbukti.
- Ada cara recovery jika perangkat gagal boot.

Lanjutkan ke [Konfigurasi Perangkat](./konfigurasi-perangkat.md).
