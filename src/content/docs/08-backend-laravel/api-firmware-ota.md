---
title: "API Firmware OTA"
---

# API Firmware OTA

API firmware OTA mengatur upload file firmware dan informasi update untuk node/gateway.

## Method yang Terlihat

`OtaController.php` memiliki:

- `uploadFirmware`
- `getFirmwareInfo`

## Upload Firmware

`uploadFirmware()` memvalidasi:

- `status`
- `version`
- file `.bin` maksimal 2 MB,
- `sensor_id` atau `node_id`.

File disimpan ke disk `public` dengan nama yang mengandung node dan versi. Metadata disimpan melalui model `FirmwareFile`.

## Get Firmware Info

`getFirmwareInfo()` mendukung:

- path `{nodeId}`,
- query `node_id`,
- query `sensor_id`,
- query legacy `fw_id`.

Response berisi `version`, `file_url`, `status`, dan `node_id`.

## Risiko

- upload firmware tanpa autentikasi,
- file_url bergantung host upload,
- metadata gagal tersimpan,
- satu node hanya satu firmware aktif,
- cache firmware terbaru hanya 30 detik.

Lanjutkan ke [Database Schema](./database-schema.md).
