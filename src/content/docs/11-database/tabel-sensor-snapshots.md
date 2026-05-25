---
title: "Tabel Sensor Snapshots"
description: "Rincian spesifikasi kolom tabel sensor_snapshots, kunci komposit unik, dan operasi penulisan balik (Upsert) untuk optimalisasi pembacaan dasbor."
---

# Tabel Sensor Snapshots

Tabel `sensor_snapshots` bertindak sebagai database cache tingkat tinggi. Alih-alih memindai tabel log `sensor_data` yang lambat, halaman Monitoring dan Heatmap dasbor memanggil tabel ini untuk menarik kondisi lingkungan real-time secara instan.

---

## Spesifikasi Struktur Kolom Tabel (`sensor_snapshots`)

| Nama Kolom | Jenis Tipe Data | Aturan Constraint | Default | Deskripsi Fungsi |
|---|---|---|---|---|
| **sensor_id** | `int` unsigned | bagian dari unique key | - | ID parameter sensor yang bersangkutan (`sensors.id`). |
| **node_id** | `int` | bagian dari unique key | - | ID fisik node sensor pengirim data. |
| **value** | `double` | `NOT NULL` | - | Nilai pembacaan mentah terakhir sensor. |
| **recorded_at** | `timestamp` | `NOT NULL` | - | Waktu pembacaan terakhir dari perangkat keras. |
| **created_at** | `timestamp` | `NULLABLE` | `NULL` | Catatan waktu pembuatan baris data. |
| **updated_at** | `timestamp` | `NULLABLE` | `NULL` | Waktu modifikasi terakhir data snapshot. |

---

## Kunci Unik Komposit

Controller membutuhkan kunci unik dari kombinasi kolom:
`UNIQUE KEY (sensor_id, node_id)`

### Keunggulan Kunci Unik:
1.  **Proteksi Duplikasi**: Menjamin hanya ada maksimal satu baris data status terakhir untuk setiap sensor di setiap node.
2.  **Operasi Upsert Efisien**: Mengizinkan backend Laravel menjalankan fungsi SQL `ON DUPLICATE KEY UPDATE` secara native. Jika kombinasi `sensor_id` dan `node_id` sudah ada di database, baris tersebut langsung diperbarui. Jika belum ada, baris baru dimasukkan.

---

## Contoh Rekaman Data Snapshot Terkini

Berikut adalah contoh baris log representatif data snapshot terkini:

| sensor_id | node_id | value | recorded_at | updated_at |
|---|---|---|---|---|
| 1 | 1 | `29.12` | `2026-05-25 09:15:00` | `2026-05-25 09:15:02` |
| 2 | 1 | `68.10` | `2026-05-25 09:15:00` | `2026-05-25 09:15:02` |
| 1 | 2 | `28.80` | `2026-05-25 09:14:45` | `2026-05-25 09:14:47` |

Lanjutkan ke bagian **[Tabel Device Statuses](./tabel-device-statuses.md)** untuk mempelajari rincian sinkronisasi gateway.
