---
title: "Alur OTA"
---

# Alur OTA

OTA update memungkinkan firmware diperbarui melalui jaringan.

## Alur Konsep

```mermaid
sequenceDiagram
    participant Device as Node/Gateway
    participant API as Backend OTA
    participant Storage as Firmware File

    Device->>API: Cek versi firmware
    API-->>Device: Info update
    Device->>Storage: Download firmware
    Storage-->>Device: Binary firmware
    Device->>Device: Verifikasi dan install
    Device->>Device: Restart
```

## Titik Risiko

- perangkat salah membaca versi,
- URL firmware salah,
- download terputus,
- file firmware rusak,
- storage tidak cukup,
- verifikasi keamanan lemah,
- perangkat gagal boot setelah update.

## File yang Kemungkinan Terkait

- `node/lib/NodeCore/ota/`,
- `node/lib/NodeCore/commands/CheckUpdateCommand.*`,
- `gateway/platformio.ini`,
- `web/OtaController.php`.

Detail endpoint dan mekanisme validasi dibaca dari kode.

Lanjutkan ke [Alur Caching](./alur-caching.md).
