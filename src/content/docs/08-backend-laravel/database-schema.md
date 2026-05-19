---
title: "Database Schema Backend"
---

# Database Schema Backend

Halaman ini merangkum schema yang tersirat dari controller. Ini bukan pengganti migration.

## Tabel yang Terlihat dari Kode

| Tabel / Model | Bukti |
|---|---|
| `greenhouses` | `Greenhouse` model, query greenhouse. |
| `sensors` | mapping sensor dan threshold. |
| `sensor_data` | data historis sensor. |
| `sensor_snapshots` | data terbaru per sensor/node. |
| `camera_data` | gambar/status kabut. |
| `device_statuses` | status relay gateway. |
| `schedules` | jadwal aktuator. |
| `firmware_files` atau sejenis | model `FirmwareFile`, nama tabel belum terkonfirmasi. |

## Belum Terkonfirmasi

- tipe kolom,
- primary key,
- foreign key,
- index,
- constraint unik,
- nama tabel model `FirmwareFile`.

Lanjutkan ke [Debugging Backend](./debugging-backend.md).
