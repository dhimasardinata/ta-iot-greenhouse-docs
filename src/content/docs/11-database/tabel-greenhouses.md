---
title: "Tabel `greenhouses`"
---

# Tabel `greenhouses`

## Fungsi Tabel

Tabel `greenhouses` menyimpan identitas greenhouse.

## Bukti dari Kode

`PageController::getGreenhousesBasic()` mengambil:

- `id`
- `name`

`ScheduleController` memvalidasi bahwa `gh_id` harus ada di `greenhouses`.

## Dipakai Oleh

- monitoring,
- table,
- heatmap,
- controlling,
- schedule.

## Belum Terkonfirmasi

Tipe kolom, constraint, dan relasi Eloquent lengkap belum terlihat dari migration.

Lanjutkan ke [Tabel Sensors](./tabel-sensors.md).
