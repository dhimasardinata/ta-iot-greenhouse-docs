---
title: "API Integration"
---

# API Integration

Frontend berkomunikasi dengan backend melalui Inertia props dan request Axios.

## Inertia Props

`PageController` mengirim data awal untuk halaman:

- monitoring,
- table,
- heatmap,
- camera,
- controlling.

`Controlling.vue` membaca props melalui `usePage()`.

## Axios

`Controlling.vue` memakai Axios untuk:

- mengambil jadwal,
- menyimpan jadwal,
- update threshold.

## Heatmap Data

`Heatmap.vue` menerima props:

- `sensorDataByGh`,
- `thresholdsByGh`,
- `greenhouses`,
- `activeGhId`,
- `latestData`.

## Catatan

Jika response API berubah, frontend bisa gagal karena property yang dibaca tidak ada. Dokumentasi file-by-file harus mencatat kontrak data tiap komponen.

Lanjutkan ke [Debugging Frontend](./debugging-frontend.md).
