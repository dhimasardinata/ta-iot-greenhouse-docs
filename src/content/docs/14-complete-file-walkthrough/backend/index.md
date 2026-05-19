---
title: "Folder Overview: Backend Laravel"
---

# Folder Overview: Backend Laravel

Folder ini akan menampung dokumentasi file-by-file untuk potongan backend Laravel yang ada di folder `web/`.

## Fungsi Komponen

Backend Laravel bertugas menerima request, memvalidasi data, mengambil atau menyimpan data, menyediakan response JSON, dan mendukung fitur seperti monitoring, jadwal, kontrol, halaman, dan OTA.

## File yang Terlihat di Inventory

- `web/ApiController.php`
- `web/OtaController.php`
- `web/PageController.php`
- `web/ScheduleController.php`

## Catatan Bukti

Inventory awal belum menemukan struktur Laravel lengkap seperti route file, model, migration, middleware, atau composer manifest di root snapshot ini. Dokumentasi backend detail harus jujur jika suatu bagian belum terkonfirmasi dari kode.

## Urutan Membaca

1. `web/ApiController.php`
2. `web/ScheduleController.php`
3. `web/OtaController.php`
4. `web/PageController.php`

## Status

Empat controller backend sudah memiliki halaman detail awal dengan status `Drafted` di [Coverage Report](../coverage-report.md). Review berikutnya perlu memakai route, model, migration, dan middleware asli jika snapshot lengkap Laravel ditambahkan.
