---
title: "Tabel Schedules"
description: "Rincian spesifikasi kolom tabel schedules, tipe data time untuk jam aktif, enum kontrol aktuator, dan batasan operasional."
---

# Tabel Schedules

Tabel `schedules` menyimpan aturan operasional waktu kerja aktuator. Aturan ini dikonfigurasi melalui dasbor controlling dan disinkronisasikan ke ESP32 Gateway agar gateway tetap dapat mengendalikan relay secara lokal meskipun koneksi internet ke cloud terputus.

---

## Spesifikasi Struktur Kolom Tabel (`schedules`)

| Nama Kolom | Jenis Tipe Data | Aturan Constraint | Default | Deskripsi Fungsi |
|---|---|---|---|---|
| **id** | `int` unsigned | `PRIMARY KEY`, `AUTO_INCREMENT` | - | ID unik jadwal. |
| **gh_id** | `int` unsigned | `NOT NULL`, index disarankan | - | ID rumah kaca pemilik jadwal (`greenhouses.id`). |
| **enabled** | `tinyint(1)` (boolean) | `NOT NULL` | `1` (Aktif) | Status sakelar aktif jadwal (`0` = Nonaktif, `1` = Aktif). |
| **start_time** | `time` | `NOT NULL` | - | Jam mulai berlakunya jadwal (Format: `HH:MM:SS`). |
| **end_time** | `time` | `NOT NULL` | - | Jam berakhirnya jadwal (Format: `HH:MM:SS`). |
| **relay_exhaust** | `varchar(50)` / `enum` | `NOT NULL` | `'threshold'` | Mode kerja exhaust blower selama jadwal (`on`, `off`, `threshold`). |
| **relay_dehumidifier** | `varchar(50)` / `enum` | `NOT NULL` | `'threshold'` | Mode kerja dehumidifier kabut selama jadwal (`on`, `off`, `threshold`). |
| **relay_blower** | `varchar(50)` / `enum` | `NOT NULL` | `'threshold'` | Mode kerja blower pendingin selama jadwal (`on`, `off`, `threshold`). |
| **created_at** | `timestamp` | `NULLABLE` | `NULL` | Catatan waktu pembuatan data. |
| **updated_at** | `timestamp` | `NULLABLE` | `NULL` | Catatan waktu pembaruan jadwal. |

---

## Representasi Mode Kerja Aktuator (Enum Value)

Kolom status relay (`relay_exhaust`, `relay_dehumidifier`, `relay_blower`) menggunakan string mode yang diterjemahkan reaktif di dasbor:
*   **`'on'` (Force ON)**: Menyalakan relay terus menerus selama durasi jadwal berlangsung, melangkahi logika sensor.
*   **`'off'` (Force OFF)**: Mematikan relay terus menerus selama durasi jadwal, melangkahi logika sensor.
*   **`'threshold'` (Automatic)**: Menyerahkan kendali ke histeresis sensor (relay menyala otomatis hanya jika suhu/kelembapan keluar dari batas aman).

---

## Hubungan Indeks dan Integritas Kunci

*   **PRIMARY KEY (`id`)**: Indeks utama baris jadwal.
*   **Relasi operasional `gh_id`**: Menghubungkan jadwal ke `greenhouses.id`; nama constraint fisik mengikuti migration aplikasi penuh.
*   **Batasan Kapasitas**: Di tingkat frontend dan API validator, jumlah baris jadwal dengan `gh_id` yang sama dibatasi maksimal **4 baris** untuk menjaga stabilitas memori mikrokontroler.

Lanjutkan ke bagian **[Query Penting](./query-penting.md)** untuk melihat kueri raw SQL krusial yang berjalan pada sistem basis data ini.
