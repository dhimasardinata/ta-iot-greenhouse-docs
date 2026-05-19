---
title: "Heatmap"
---

# Heatmap

Heatmap menampilkan sebaran nilai sensor di denah greenhouse.

## Bukti dari Kode

`Heatmap.vue` memakai Leaflet dengan CRS simple dan gambar:

- `/images/greenhouse_plan.webp`
- `/images/greenhouse_plan2.webp`

Komponen menyimpan konfigurasi node location untuk GH1 dan GH2, parameter aktif `temperature`, `humidity`, atau `lux`, dan threshold per greenhouse.

## Cara Kerja Singkat

1. Data sensor dikirim dari `PageController::heatmap()`.
2. Vue memilih greenhouse aktif.
3. Vue memilih parameter aktif.
4. Marker node digambar sesuai koordinat.
5. Canvas heatmap layer menghitung warna dengan inverse-distance weighting sederhana.
6. Warna mengikuti gradient biru, cyan, kuning, oranye, merah.

## Risiko UI

- koordinat node salah,
- gambar denah tidak tersedia,
- data sensor kosong,
- threshold kosong,
- canvas terlalu berat di perangkat lambat.

Lanjutkan ke [Table](./table.md).
