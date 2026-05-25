---
title: "Routing"
description: "Pemetaan endpoint yang diturunkan dari method controller dan pemanggilan frontend yang terlihat."
---

# Routing

Tabel ini disusun dari nama method controller, komentar endpoint di controller, dan pemanggilan endpoint dari komponen Vue/firmware supaya pemetaan route tetap langsung terhubung ke artefak source yang tersedia.

## Endpoint API

| Method | Endpoint | Handler | Parameter Utama | Fungsi |
|---|---|---|---|---|
| `POST` | `/api/save-sensor-data` | `ApiController::saveSensorData` | `gh_id`, `node_id`, nilai sensor | Simpan data sensor dan update snapshot. |
| `POST` | `/api/save-camera-data` | `ApiController::saveCameraData` | `gh_id`, `isFoggy`, `confidence`, `image` | Simpan gambar kamera dan kirim FCM jika `isFoggy` true. |
| `GET` | endpoint chart sensor | `ApiController::fetchChart` | `sensor_id`, `mode`, `range`, `dict` | Ambil data grafik historis. |
| `GET` | endpoint rata-rata sensor | `ApiController::get_average_sensor_data` | `gh_id` | Ambil rata-rata snapshot hari ini. |
| `POST` | `/api/update-thresholds` | `ApiController::updateThresholds` | `thresholds[]` | Ubah `threshold_min` dan `threshold_max`. |
| `GET` | `/api/device-status` | `ApiController::getDeviceStatus` | `gh_id` | Baca status relay gateway. |
| `POST` | `/api/device-status` | `ApiController::postDeviceStatus` | `gh_id`, status relay | Upsert heartbeat status gateway. |
| `GET` | `/api/schedules` | `ScheduleController::getSchedule` / `getSchedulesForWeb` | `gh_id`, `schedule_id` | Ambil jadwal gateway atau web. |
| `POST` | `/api/schedules` | `ScheduleController::saveSchedules` | `gh_id`, `schedules[]` | Ganti jadwal greenhouse. |
| `POST` | `/api/files` | `OtaController::uploadFirmware` | `status`, `version`, `.bin`, `node_id`/`sensor_id` | Upload firmware. |
| `GET` | `/api/get-file/{nodeId?}` | `OtaController::getFirmwareInfo` | `node_id`/`sensor_id`/`fw_id` | Ambil firmware aktif untuk node. |

## Halaman Web

`PageController` menyiapkan halaman Inertia berikut:

| Path Konseptual | Method | Komponen |
|---|---|---|
| `/monitoring` | `PageController::monitoring` | `Monitoring` |
| `/table` | `PageController::table` | `Table` |
| `/heatmap` | `PageController::heatmap` | `Heatmap` |
| `/camera` | `PageController::camera` | `Camera` |
| `/controlling` | `PageController::controlling` | `Controlling` |

Nama path web mengikuti nama method dan route helper yang terlihat, misalnya `router.get(route("heatmap"), ...)` di `Heatmap.vue`.

Lanjutkan ke [Controller](./controller.md).
