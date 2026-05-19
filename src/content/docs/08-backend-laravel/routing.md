---
title: "Routing"
---

# Routing

Routing adalah pemetaan URL ke method controller.

## Status Bukti

File route Laravel seperti `routes/api.php` atau `routes/web.php` belum terlihat di inventory awal. Karena itu daftar route tidak bisa dipastikan penuh dari snapshot ini.

## Route yang Terlihat dari Komentar/Kode

Beberapa endpoint disebut atau tersirat di controller:

| Endpoint | Sumber Bukti | Fungsi |
|---|---|---|
| `POST /api/files` | `OtaController.php` | Upload firmware. |
| `GET /api/get-file/{nodeId}` | `OtaController.php` | Ambil firmware terbaru. |
| `GET /api/schedules` | `ScheduleController.php`, `Controlling.vue` | Ambil jadwal. |
| `POST /api/schedules` | `ScheduleController.php`, `Controlling.vue` | Simpan jadwal. |
| `POST /api/update-thresholds` | `Controlling.vue`, `ApiController.php` | Update threshold. |

## Belum Terkonfirmasi

Nama route final, middleware, prefix, dan auth rule harus diverifikasi dari file route jika tersedia.

Lanjutkan ke [Controller](./controller.md).
