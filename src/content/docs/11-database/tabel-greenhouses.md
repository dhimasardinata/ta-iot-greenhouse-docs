---
title: "Tabel Greenhouses"
description: "Rincian spesifikasi kolom tabel greenhouses, tipe data, indeks, dan representasi rumah kaca anggrek."
---

# Tabel Greenhouses

Tabel `greenhouses` menyimpan informasi daftar gedung rumah kaca (*greenhouse*) anggrek yang dikelola oleh sistem. Tabel ini bertindak sebagai kontainer level teratas untuk relasi sensor, jadwal, dan aktuator.

---

## Spesifikasi Struktur Kolom Tabel (`greenhouses`)

| Nama Kolom | Jenis Tipe Data | Aturan Constraint | Default | Deskripsi Fungsi |
|---|---|---|---|---|
| **id** | `int` unsigned | `PRIMARY KEY`, `AUTO_INCREMENT` | - | ID unik rumah kaca (digunakan sebagai `gh_id` di API). |
| **name** | `varchar(255)` | `NOT NULL` | - | Nama deskriptif rumah kaca (misal: Greenhouse 1). |
| **created_at** | `timestamp` | `NULLABLE` | `NULL` | Catatan waktu pembuatan data. |
| **updated_at** | `timestamp` | `NULLABLE` | `NULL` | Catatan waktu modifikasi terakhir. |

---

## Indeks Database (Indexes)

*   **PRIMARY KEY (`id`)**: Indeks penanda baris utama rumah kaca.
*   **Dependensi operasional**: Kolom `id` dipakai sebagai `gh_id` oleh tabel-tabel anak:
    *   `sensors.gh_id` -> `greenhouses.id`
    *   `device_statuses.gh_id` -> `greenhouses.id`
    *   `schedules.gh_id` -> `greenhouses.id`
    *   `camera_data.gh_id` -> `greenhouses.id`

---

## Contoh Rekaman Data Seeder

Seeder aplikasi sebaiknya mengisi minimal record rumah kaca yang dipakai perangkat. Contoh bentuk datanya:

| id | name | created_at | updated_at |
|---|---|---|---|
| 1 | Greenhouse 1 | `2026-05-25 09:00:00` | `2026-05-25 09:00:00` |
| 2 | Greenhouse 2 | `2026-05-25 09:00:00` | `2026-05-25 09:00:00` |

Lanjutkan ke bagian **[Tabel Sensors](./tabel-sensors.md)** untuk mempelajari rincian parameter sensor yang dikandungnya.
