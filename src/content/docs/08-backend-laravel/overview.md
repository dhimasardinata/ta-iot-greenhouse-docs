---
title: "Overview Backend Laravel"
---

# Overview Backend Laravel

Backend Laravel adalah server pusat yang menerima data, mengambil data dari database, menyimpan konfigurasi, dan memberi response JSON atau halaman Inertia.

## Bukti dari Kode

Snapshot repo ini hanya memperlihatkan beberapa file backend di folder `web/`:

- `web/ApiController.php`
- `web/ScheduleController.php`
- `web/OtaController.php`
- `web/PageController.php`

File route, model lengkap, migration, middleware, dan `composer.json` tidak terlihat di inventory awal. Karena itu dokumentasi backend harus jujur jika ada detail yang belum terkonfirmasi.

## Peran Backend

1. Menyimpan data sensor dari hardware.
2. Menyediakan data monitoring, table, chart, heatmap, dan camera.
3. Mengatur threshold dan device status.
4. Mengelola schedule gateway.
5. Mengelola firmware OTA.
6. Menyediakan halaman Inertia untuk web dashboard.

Lanjutkan ke [Cara Kerja Laravel](./cara-kerja-laravel.md).
