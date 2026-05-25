---
title: "Overview Database"
description: "Gambaran tabel database berdasarkan pemakaian nyata di controller backend."
---

# Overview Database

Database menyimpan data historis sensor, snapshot terbaru, jadwal, status gateway, kamera, dan firmware OTA. Daftar tabel di bawah disusun dari tabel yang dipakai controller backend.

| Nama Tabel | Peran Utama | Bukti Pemakaian |
|---|---|---|
| [greenhouses](./tabel-greenhouses.md) | Daftar rumah kaca. | `Greenhouse::select(...)`, validasi `exists:greenhouses,id`. |
| [sensors](./tabel-sensors.md) | Metadata sensor dan threshold. | `DB::table('sensors')`, `Sensor::whereIn(...)`. |
| [sensor_data](./tabel-sensor-data.md) | Log historis pembacaan sensor. | `DB::table('sensor_data')->insert(...)`. |
| [sensor_snapshots](./tabel-sensor-snapshots.md) | Nilai terakhir per sensor-node. | `updateOrInsert`, `ON DUPLICATE KEY UPDATE`. |
| [device_statuses](./tabel-device-statuses.md) | Heartbeat dan status relay gateway. | `DB::table('device_statuses')->updateOrInsert(...)`. |
| [schedules](./tabel-schedules.md) | Jadwal aktuator. | `Schedule::where(...)`, `Schedule::create(...)`. |
| `camera_data` | Gambar kamera dan status kabut. | `DB::table('camera_data')->insert(...)`. |
| `firmware_files` | Metadata firmware OTA. | `FirmwareFile::updateOrCreate(...)`. |
| [users](./tabel-users.md) | Akun admin jika login dashboard aktif. | Dibutuhkan oleh auth web, tetapi file auth tidak ada di snapshot. |

## Pola Baca/Tulis

Data sensor ditulis ganda:

1. `sensor_data` menyimpan histori.
2. `sensor_snapshots` menyimpan nilai terakhir untuk monitoring dan heatmap.

Rata-rata snapshot dapat diringkas sebagai:

$$
\overline{x} = \frac{x_1 + x_2 + \cdots + x_n}{n}
$$

Controller mengimplementasikannya dengan `AVG(ss.value)`.

Lanjutkan ke [ERD](./erd.md).
