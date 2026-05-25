---
title: "Database Schema"
description: "Skema data yang disusun dari tabel dan kolom yang benar-benar dipakai controller backend."
---

# Database Schema

Skema database backend dapat disusun dari pemakaian tabel di `ApiController.php`, `ScheduleController.php`, `OtaController.php`, dan `PageController.php`. Halaman ini tidak menebak nama migration, tetapi melengkapi gambaran struktur operasional yang diperlukan agar controller dapat berjalan.

## Tabel Operasional

| Tabel | Dipakai Oleh | Peran |
|---|---|---|
| [greenhouses](../11-database/tabel-greenhouses.md) | `ScheduleController`, `PageController` | Daftar rumah kaca dan sumber `gh_id`. |
| [sensors](../11-database/tabel-sensors.md) | `ApiController`, `PageController` | Metadata sensor, satuan, dan ambang batas. |
| [sensor_data](../11-database/tabel-sensor-data.md) | `ApiController` | Log historis nilai sensor. |
| [sensor_snapshots](../11-database/tabel-sensor-snapshots.md) | `ApiController`, `PageController` | Nilai terakhir per kombinasi sensor dan node. |
| [device_statuses](../11-database/tabel-device-statuses.md) | `ApiController`, `PageController` | Laporan status relay fisik gateway. |
| [schedules](../11-database/tabel-schedules.md) | `ScheduleController`, `PageController` | Jadwal kerja aktuator. |
| `camera_data` | `ApiController`, `PageController` | Path gambar kamera, status `isFoggy`, confidence, dan waktu rekam. |
| `firmware_files` | `OtaController` | Metadata file `.bin`, versi, node, URL, dan status aktif. |

## Kunci yang Wajib Ada

`sensor_snapshots` harus memiliki kunci unik untuk `(sensor_id, node_id)`. Kode memakai `updateOrInsert()` dan SQL `ON DUPLICATE KEY UPDATE`, sehingga tanpa kunci unik itu snapshot dapat terduplikasi.

`device_statuses` sebaiknya memiliki satu baris per `gh_id`, karena `postDeviceStatus()` memakai `updateOrInsert(['gh_id' => $gh_id], ...)` dan `PageController` membaca satu status gateway per greenhouse.

`schedules` dibaca berdasarkan `gh_id` dan `start_time`, lalu validator membatasi maksimal empat jadwal per greenhouse pada payload web.

## Rumus Agregasi yang Dipakai

Rata-rata monitoring dihitung dari snapshot sensor hari ini. Secara konsep:

$$
\overline{x}_{sensor} = \frac{\sum_{i=1}^{n} x_i}{n}
$$

Di source, perhitungan itu muncul sebagai `AVG(ss.value)` setelah `sensor_snapshots` di-join dengan `sensors`.

Lanjutkan ke [Authentication](./authentication.md).
