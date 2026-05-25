---
title: "Tabel Sensor Data"
description: "Rincian kolom tabel transaksi sensor_data dan indeks yang membantu query controller."
---

# Tabel Sensor Data

Tabel `sensor_data` adalah tabel transaksi utama yang mencatat log pembacaan parameter lingkungan secara historis. Kode menulis baris baru setiap kali sensor mengirim nilai.

---

## Spesifikasi Struktur Kolom Tabel (`sensor_data`)

| Nama Kolom | Jenis Tipe Data | Aturan Constraint | Default | Deskripsi Fungsi |
|---|---|---|---|---|
| **id** | `bigint` unsigned | `PRIMARY KEY`, `AUTO_INCREMENT` | - | ID unik transaksi log (menggunakan `bigint` untuk menampung data skala besar). |
| **sensor_id** | `int` unsigned | `NOT NULL`, index disarankan | - | ID tipe sensor yang mengirim data (`sensors.id`). |
| **node_id** | `int` | `INDEX`, `NOT NULL` | - | ID fisik node sensor pengirim data (misal: Node 1 s.d 10). |
| **value** | `double` | `NOT NULL` | - | Nilai pembacaan mentah sensor (panas/lembap/lux). |
| **recorded_at** | `timestamp` | `NOT NULL` | - | Timestamp custom waktu pengukuran di sisi perangkat keras. |
| **created_at** | `timestamp` | `NULLABLE` | `NULL` | Catatan waktu data masuk ke server Laravel. |
| **updated_at** | `timestamp` | `NULLABLE` | `NULL` | Catatan waktu pembaruan data di server. |

---

## Indeks Database (Indexes & Keys)

*   **PRIMARY KEY (`id`)**: Indeks utama.
*   **Indeks Komposit Kritis (`sensor_data_lookup_index`)**:
    Karena dasbor sering mencari data gabungan parameter tertentu per waktu, indeks komposit didefinisikan pada gabungan kolom:
    `INDEX (sensor_id, node_id, recorded_at)`
    Indeks ini mendukung query `fetchChart()` dan `tablePerGH()` yang memfilter sensor, node, dan waktu.

---

## Contoh Rekaman Data Historis

Berikut adalah contoh baris log representatif data sensor yang masuk:

| id | sensor_id | node_id | value | recorded_at | created_at |
|---|---|---|---|---|---|
| 10458 | 1 | 1 | `28.45` | `2026-05-25 09:10:00` | `2026-05-25 09:10:02` |
| 10459 | 2 | 1 | `67.50` | `2026-05-25 09:10:00` | `2026-05-25 09:10:02` |
| 10460 | 3 | 1 | `24000.00` | `2026-05-25 09:10:00` | `2026-05-25 09:10:02` |

Lanjutkan ke bagian **[Tabel Sensor Snapshots](./tabel-sensor-snapshots.md)** untuk mempelajari database cache pembacaan tercepat.
