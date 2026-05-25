---
title: "Tabel Sensors"
description: "Rincian kolom tabel sensors, unit pengukuran, dan threshold yang dipakai controller."
---

# Tabel Sensors

Tabel `sensors` menampung tipe-tipe parameter lingkungan yang dimonitor di masing-masing rumah kaca. Kolom di tabel ini mendefinisikan satuan ukuran serta ambang batas (*threshold*) batas atas dan batas bawah keselamatan tanaman.

---

## Spesifikasi Struktur Kolom Tabel (`sensors`)

| Nama Kolom | Jenis Tipe Data | Aturan Constraint | Default | Deskripsi Fungsi |
|---|---|---|---|---|
| **id** | `int` unsigned | `PRIMARY KEY`, `AUTO_INCREMENT` | - | ID unik sensor (dirujuk oleh tabel data sensor). |
| **gh_id** | `int` unsigned | `NOT NULL`, index disarankan | - | ID rumah kaca pemilik sensor (`greenhouses.id`). |
| **name** | `varchar(255)` | `NOT NULL` | - | Kategori sensor (Temperature, Humidity, Light Intensity, RSSI). |
| **unit** | `varchar(50)` | `NOT NULL` | - | Satuan ukuran parameter fisik (e.g. `°C`, `%`, `lux`, `dBm`). |
| **threshold_min** | `double` | `NULLABLE` | `0` | Nilai batas bawah parameter untuk memicu relay. |
| **threshold_max** | `double` | `NULLABLE` | `100` | Nilai batas atas parameter untuk memicu relay. |
| **created_at** | `timestamp` | `NULLABLE` | `NULL` | Waktu pembuatan data. |
| **updated_at** | `timestamp` | `NULLABLE` | `NULL` | Waktu modifikasi terakhir (misal setelah geser slider). |

---

## Indeks dan Relasi Kunci (Indexes & Keys)

*   **PRIMARY KEY (`id`)**: Indeks utama.
*   **Relasi operasional `gh_id`**: Menghubungkan sensor ke `greenhouses.id`.
*   **Dependensi operasional**: ID sensor ini dipakai oleh:
    *   `sensor_data.sensor_id` -> `sensors.id`
    *   `sensor_snapshots.sensor_id` -> `sensors.id`

---

## Contoh Rekaman Data Inisiasi Seeder

Seeder minimum perlu mengisi konfigurasi sensor untuk greenhouse yang dipakai perangkat. Contoh bentuk data untuk Greenhouse 1 (`gh_id` = 1):

| id | gh_id | name | unit | threshold_min | threshold_max |
|---|---|---|---|---|---|
| 1 | 1 | Temperature | `°C` | `25.0` | `35.0` |
| 2 | 1 | Humidity | `%` | `50.0` | `80.0` |
| 3 | 1 | Light Intensity | `lux` | `20000.0` | `50000.0` |
| 4 | 1 | RSSI | `dBm` | `0.0` | `100.0` |

Untuk greenhouse lain, pola nama sensor yang sama bisa diulang dengan `gh_id` berbeda.

Lanjutkan ke bagian **[Tabel Sensor Data](./tabel-sensor-data.md)** untuk mempelajari bagaimana data historis log direkam.
