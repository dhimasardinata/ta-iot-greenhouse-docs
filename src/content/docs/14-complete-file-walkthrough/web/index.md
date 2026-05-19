---
title: "Folder Overview: Frontend Web"
---

# Folder Overview: Frontend Web

Folder ini akan menampung dokumentasi file-by-file untuk frontend web Vue.js.

## Fungsi Komponen

Frontend web menampilkan data dan kontrol kepada pengguna. Dalam inventory awal, potongan frontend yang terlihat berhubungan dengan controlling dan heatmap.

## File yang Terlihat di Inventory

- `web/Controlling.vue`
- `web/Heatmap.vue`

## Hal yang Harus Dicari Saat File-by-File

- data yang ditampilkan,
- API yang dipanggil,
- state penting,
- event pengguna,
- error UI,
- hubungan dengan backend dan gateway,
- risiko tampilan jika response kosong atau gagal.

## Urutan Membaca

1. `web/Controlling.vue`
2. `web/Heatmap.vue`

## Status

Dua file frontend web sudah memiliki halaman detail awal dengan status `Drafted` di [Coverage Report](../coverage-report.md). Review berikutnya perlu memakai component pendukung seperti `Tabs`, `ScheduleCard`, layout, locale, dan route file jika snapshot frontend lengkap ditambahkan.
