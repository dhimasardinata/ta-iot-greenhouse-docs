---
title: "Debugging Backend"
---

# Debugging Backend

Debugging backend berarti memeriksa request, response, database, cache, dan log Laravel.

## Area Utama

1. Cek request yang masuk.
2. Cek validasi controller.
3. Cek query database.
4. Cek cache yang mungkin stale.
5. Cek response JSON.
6. Cek log Laravel.

## Gejala Umum

| Gejala | Area Dicek |
|---|---|
| Dashboard kosong | `sensor_snapshots`, `gaugeData`, `monitoring_latest_time` |
| Data sensor tidak masuk | `saveSensorData`, mapping `sensors`, `sensor_data` |
| Schedule gateway kosong | `ScheduleController::getSchedule` |
| Threshold tidak berubah | `updateThresholds`, cache `controlling_data` |
| OTA tidak tersedia | `OtaController::getFirmwareInfo`, model `FirmwareFile` |
| Heatmap salah node | mapping node di `PageController::heatmap` |

## Catatan

Karena route/middleware belum terlihat, debugging auth dan route perlu membuka file Laravel lengkap jika tersedia.

Lanjutkan ke [File Reference Backend](./file-reference/index.md).
