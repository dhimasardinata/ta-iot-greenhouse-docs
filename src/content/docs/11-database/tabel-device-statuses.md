---
title: "Tabel Device Statuses"
description: "Rincian spesifikasi kolom tabel device_statuses, tipe data boolean/tinyint, indeks unik, dan perannya dalam pemantauan kesehatan gateway (heartbeat)."
---

# Tabel Device Statuses

Tabel `device_statuses` menyimpan status aktif aktuator fisik aktual ( Exhaust, Dehumidifier, Blower) yang dilaporkan secara berkala oleh ESP32 Gateway di lapangan. Data di tabel ini juga bertindak sebagai data penentu kesehatan (*heartbeat*) konektivitas gateway.

---

## Spesifikasi Struktur Kolom Tabel (`device_statuses`)

| Nama Kolom | Jenis Tipe Data | Aturan Constraint | Default | Deskripsi Fungsi |
|---|---|---|---|---|
| **id** | `int` unsigned | `PRIMARY KEY`, `AUTO_INCREMENT` | - | ID unik status. |
| **gh_id** | `int` unsigned | `UNIQUE INDEX` disarankan, `NOT NULL` | - | ID rumah kaca terkait (`greenhouses.id`). |
| **exhaust_status** | `tinyint(1)` (boolean) | `NOT NULL` | `0` (Mati) | Status relay fisik blower pengering udara (`0` = OFF, `1` = ON). |
| **dehumidifier_status** | `tinyint(1)` (boolean) | `NOT NULL` | `0` (Mati) | Status relay dehumidifier pengatur kabut (`0` = OFF, `1` = ON). |
| **blower_status** | `tinyint(1)` (boolean) | `NOT NULL` | `0` (Mati) | Status relay exhaust blower pembuang panas (`0` = OFF, `1` = ON). |
| **created_at** | `timestamp` | `NULLABLE` | `NULL` | Catatan waktu pembuatan baris pertama data. |
| **updated_at** | `timestamp` | `NULLABLE` | `NULL` | Waktu penerimaan laporan heartbeat terakhir dari gateway. |

---

## Indeks dan Relasi Kunci (Indexes & Keys)

*   **PRIMARY KEY (`id`)**: Indeks utama.
*   **UNIQUE INDEX pada `gh_id`**: Dibutuhkan agar `updateOrInsert(['gh_id' => $gh_id], ...)` memperbarui satu rekaman status terpadu per greenhouse.
*   **Relasi operasional**: `gh_id` mengacu ke `greenhouses.id`; nama constraint fisik mengikuti migration yang dipakai di aplikasi penuh.

---

## Peran Penting dalam Deteksi Online / Offline Gateway

Kolom `updated_at` di tabel ini dimanfaatkan secara reaktif oleh server Laravel untuk mendeteksi status kesehatan gateway:
1.  Saat gateway mengirimkan request laporan status ke `/api/device-status`, server memperbarui kolom status beserta `updated_at` ke waktu saat ini (`now()`).
2.  Jika selisih waktu `updated_at` dengan waktu server saat ini kurang dari 5 menit (300 detik), dasbor monitoring web me-render ikon berwarna hijau **Online**.
3.  Jika selisih waktu melampaui batas tersebut, dasbor otomatis berasumsi gateway terputus dari listrik AC atau kehilangan jaringan internet, menampilkan status berwarna merah **Offline**, dan beralih ke logika perhitungan server untuk estimasi status relay.

Lanjutkan ke bagian **[Tabel Schedules](./tabel-schedules.md)** untuk melihat skema penyimpanan jadwal.
