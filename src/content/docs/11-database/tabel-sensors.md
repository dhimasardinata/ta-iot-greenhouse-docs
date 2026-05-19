---
title: "Tabel `sensors`"
---

# Tabel `sensors`

## Fungsi Tabel

Tabel `sensors` menyimpan daftar sensor per greenhouse dan threshold.

## Bukti dari Kode

Controller memakai kolom yang tersirat:

- `id`
- `gh_id`
- `name`
- `unit`
- `threshold_min`
- `threshold_max`

Nama sensor yang dipakai:

- `Temperature`
- `Humidity`
- `Light Intensity`
- `RSSI`

## Dipakai Oleh

- mapping sensor saat simpan data,
- gauge monitoring,
- heatmap threshold,
- controlling threshold.

Lanjutkan ke [Tabel Sensor Data](./tabel-sensor-data.md).
