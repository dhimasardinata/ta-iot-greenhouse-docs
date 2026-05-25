---
title: "Model"
description: "Model Eloquent yang dibutuhkan oleh controller dan relasi data yang dipakai saat runtime."
---

# Model

Controller backend memakai kombinasi Eloquent model dan query builder. Model yang terlihat dari `use App\Models\...` adalah `Greenhouse`, `Schedule`, `FirmwareFile`, `CameraData`, `DeviceStatus`, `Sensor`, dan `SensorData`.

## Model yang Dipakai Langsung

| Model | Controller | Kegunaan |
|---|---|---|
| `Greenhouse` | `ScheduleController`, `PageController` | Validasi greenhouse dan daftar tab dashboard. |
| `Schedule` | `ScheduleController`, `PageController` | Ambil, hapus, dan buat jadwal aktuator. |
| `FirmwareFile` | `OtaController` | Simpan metadata firmware dan mencari firmware aktif per node. |
| `CameraData` | `PageController` | Mengambil waktu rekaman kamera terbaru. |
| `DeviceStatus` | `PageController` | Menentukan status gateway online/offline dan status relay fisik. |
| `Sensor` | `PageController` | Mengambil threshold sensor untuk heatmap dan controlling. |

`SensorData` diimpor oleh `PageController`, tetapi sebagian besar query sensor historis di potongan source memakai `DB::table('sensor_data')`.

## Relasi yang Diperlukan Controller

`PageController::controlling()` memakai:

```php
Greenhouse::query()
    ->select(['id', 'name'])
    ->with([
        'sensor' => function ($query) {
            $query->select(['id', 'gh_id', 'name', 'unit', 'threshold_min', 'threshold_max'])
                ->where('name', '!=', 'RSSI');
        }
    ])
    ->get();
```

Karena itu model `Greenhouse` perlu menyediakan relasi `sensor()` ke model `Sensor`.

`ScheduleController` memakai `Schedule::create(...)`, `Schedule::where(...)->delete()`, dan mapping field relay. Model `Schedule` perlu mengizinkan field `gh_id`, `enabled`, `start_time`, `end_time`, `relay_exhaust`, `relay_dehumidifier`, dan `relay_blower` untuk mass assignment.

`OtaController` memakai `FirmwareFile::updateOrCreate(...)`, lalu menonaktifkan firmware lain untuk node yang sama jika upload baru aktif. Model `FirmwareFile` perlu memetakan tabel `firmware_files` dan field `node_id`, `version`, `status`, `file_path`, dan `file_url`.

## Representasi Relay

Mode relay yang valid berasal dari validator schedule:

- `on`
- `off`
- `threshold`

`ScheduleController::getSchedule()` mengirim field `relay` dari properti `relay_binary`. Jadi model `Schedule` perlu menyediakan accessor `relay_binary` yang mengubah tiga mode relay menjadi format ringkas untuk gateway.

Lanjutkan ke [Migration](./migration.md).
