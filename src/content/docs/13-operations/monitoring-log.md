---
title: "Monitoring Log"
---

# Monitoring Log

Monitoring log membantu operator tahu apakah perangkat masih sehat, jaringan tersambung, data masuk, dan aktuator bekerja.

## Firmware Node

Area log dan status yang terlihat:

- `node/lib/NodeCore/system/Logger.*`
- `node/lib/NodeCore/system/CrashHandler.*`
- `node/lib/NodeCore/system/SystemHealth.h`
- `node/lib/NodeCore/system/MemoryTelemetry.h`
- `node/lib/NodeCore/commands/SysInfoCommand.*`
- `node/lib/NodeCore/commands/CrashLogCommand.*`
- `node/lib/NodeCore/commands/CacheStatusCommand.*`
- `node/lib/NodeCore/commands/FsStatusCommand.*`

## Firmware Gateway

Area log yang terlihat:

- `gateway/include/SDCardLogger.h`
- `gateway/src/SDCardLogger.cpp`
- `gateway/include/WebSerial.h`
- `gateway/src/WebSerial.cpp`
- `gateway/include/LCDDisplay.h`
- `gateway/src/LCDDisplay.cpp`

## Backend

`web/OtaController.php` memakai log untuk upload firmware dan lookup OTA. `web/ApiController.php` perlu dibaca file-by-file untuk peta log data sensor.

## Yang Perlu Dicatat

- Waktu kejadian.
- Node atau gateway mana.
- Mode sistem.
- Status Wi-Fi.
- Free heap atau indikator memori.
- Jumlah cache.
- Status OTA.
- Status relay.
- Pesan error asli.

Lanjutkan ke [Dependency Governance](./dependency-governance.md).
