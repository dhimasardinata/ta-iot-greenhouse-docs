---
title: "Database"
---

# Database

Database adalah tempat menyimpan data secara terstruktur. Sistem TA ini memakai konteks MySQL untuk menyimpan data greenhouse dan mendukung dashboard.

## Kenapa Database Dibutuhkan

Data sensor perlu disimpan agar bisa:

- dilihat kembali,
- dianalisis,
- dibuat grafik,
- dibandingkan antar waktu,
- dipakai untuk laporan TA,
- dipakai oleh web dan Android.

## Contoh Data yang Disimpan

Data yang dibahas dalam dokumentasi mencakup tabel seperti:

- users,
- greenhouses,
- sensors,
- sensor_data,
- sensor_snapshots,
- schedules,
- device_statuses.

Namun file migration/schema belum terlihat di inventory awal. Karena itu bagian database detail memakai bukti dari file yang tersedia atau file database yang nanti ditambahkan.

## Data Historis dan Snapshot

Data historis biasanya menyimpan banyak catatan dari waktu ke waktu. Snapshot biasanya menyimpan kondisi terbaru agar dashboard cepat mengambil status terakhir.

Pemisahan ini dapat membantu performa. Implementasi pastinya mengikuti schema dan query yang tersedia di repository.

Lanjutkan ke [OTA Update](./ota-update.md).
