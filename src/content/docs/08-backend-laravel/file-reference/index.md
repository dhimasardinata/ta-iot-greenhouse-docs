---
title: "File Reference Backend Laravel"
---

# File Reference Backend Laravel

Bagian ini menjadi pintu masuk file-by-file backend.

## File yang Terlihat

| File | Peran Awal |
|---|---|
| `web/ApiController.php` | Sensor, chart, table, camera, threshold, device status. |
| `web/ScheduleController.php` | Jadwal gateway dan web. |
| `web/OtaController.php` | Firmware upload dan update info. |
| `web/PageController.php` | Halaman Inertia monitoring, table, heatmap, camera, controlling. |

## Urutan File-by-File yang Disarankan

1. `web/ApiController.php`
2. `web/ScheduleController.php`
3. `web/OtaController.php`
4. `web/PageController.php`

Semua file ini masih `Pending` di [Coverage Report](../../14-complete-file-walkthrough/coverage-report.md).
