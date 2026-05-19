---
title: "Uji OTA"
---

# Uji OTA

Uji OTA memastikan firmware bisa diperbarui tanpa membuka casing perangkat.

## Alur OTA

```mermaid
flowchart LR
    Build[Build Firmware] --> Upload[Upload Firmware ke Backend]
    Upload --> Check[Node atau Gateway Cek Versi]
    Check --> Download[Download File]
    Download --> Flash[Tulis Firmware]
    Flash --> Reboot[Restart Perangkat]
```

## Bukti dari Kode

Firmware node:

- `node/lib/NodeCore/ota/OtaManager.*`
- `node/lib/NodeCore/ota/BootGuard.*`
- `node/lib/NodeCore/commands/CheckUpdateCommand.*`
- `node/scripts/build_all.py`
- `node/scripts/build_and_ota.py`
- `node/scripts/curl_ota_post.py`
- `node/scripts/curl_ota_post_all.py`
- `node/scripts/test_ota_upload.py`

Backend:

- `web/OtaController.php` menyediakan `uploadFirmware()` dan `getFirmwareInfo()`.

Gateway:

- `gateway/platformio.ini` memiliki `FW_UPDATE_URL`.

## Yang Diuji

- File `.bin` valid dan ukurannya sesuai batas backend.
- Upload firmware menerima `status`, `version`, `file`, dan `sensor_id` atau `node_id`.
- Node mendapat versi terbaru dari endpoint.
- Token OTA benar.
- Download gagal tidak membuat perangkat bootloop.
- Perangkat restart dengan firmware yang benar.

## Status Bukti

Script build dan upload OTA sudah terlihat. Hasil uji fisik update firmware pada perangkat belum terlihat sebagai laporan terpisah di snapshot ini.

Lanjutkan ke [Uji WebSocket Terminal](./uji-websocket-terminal.md).
