---
title: "Visualisasi Web Leaflet dan Canvas"
---

# Visualisasi Web Leaflet dan Canvas

Dashboard web tidak hanya menampilkan tabel. File `Heatmap.vue` memakai Leaflet, image overlay, canvas, marker, warna threshold, dan state Vue untuk menampilkan kondisi greenhouse. Halaman ini menjelaskan konsep visualisasi yang muncul di kode web.

## Kenapa Memakai Leaflet

Leaflet biasanya dipakai untuk peta geografis. Di project ini, Leaflet dipakai dengan `CRS.Simple`, artinya koordinatnya bukan latitude/longitude dunia nyata, tetapi koordinat gambar greenhouse.

Dengan pola ini, gambar greenhouse menjadi dasar peta, lalu node sensor ditempatkan di posisi manual.

## Komponen Visualisasi

| Komponen | Fungsi |
|---|---|
| `L.map` | Membuat area peta. |
| `L.CRS.Simple` | Menggunakan koordinat gambar, bukan koordinat bumi. |
| `L.imageOverlay` | Menaruh gambar greenhouse sebagai background peta. |
| `L.marker` | Menaruh node sensor. |
| `L.divIcon` | Membuat marker custom dengan HTML/CSS. |
| Canvas layer | Menggambar heatmap warna. |
| Legend | Menjelaskan arti warna. |

## Data Menjadi Warna

Heatmap mengubah nilai sensor menjadi warna. Parameter aktif bisa suhu, kelembaban, atau cahaya.

Langkah konsepnya:

1. pilih greenhouse aktif,
2. pilih parameter aktif,
3. ambil sensor data untuk greenhouse itu,
4. ambil threshold parameter,
5. normalisasi nilai menjadi rentang warna,
6. gambar warna pada canvas,
7. update marker dan legend.

Edge case:

- sensor data kosong,
- node id tidak punya koordinat,
- threshold minimum sama dengan maksimum,
- nilai sensor di luar threshold,
- greenhouse aktif berubah saat render masih berjalan.

## Canvas Layer

Canvas dipakai karena heatmap perlu menggambar banyak titik warna dengan cepat. Leaflet layer custom membuat canvas mengikuti posisi dan zoom peta.

Hal yang perlu dipahami:

- canvas harus dipindah saat map move atau zoom,
- ukuran canvas harus mengikuti viewport map,
- redraw terlalu sering bisa membuat UI lambat,
- `requestAnimationFrame` dipakai agar redraw mengikuti frame browser.

## ResizeObserver

Ukuran container peta bisa berubah karena layout responsive. `ResizeObserver` memberi tahu kode saat container berubah, lalu map bisa `invalidateSize`.

Tanpa ini, peta bisa terlihat kosong, terpotong, atau layer marker tidak sejajar setelah sidebar/mobile layout berubah.

## Watcher Vue

`watch` dipakai untuk merespons perubahan:

- greenhouse aktif,
- parameter aktif,
- data sensor,
- threshold,
- ukuran map.

Watcher harus hati-hati karena satu perubahan bisa memicu banyak redraw. Kode perlu mengecek apakah map masih ada sebelum update.

## Backend Data untuk Visualisasi

Data heatmap berasal dari Laravel. `PageController` menyiapkan props awal, sedangkan API endpoint bisa memberi data terbaru.

Risiko di lapisan data:

- data terbaru belum masuk cache,
- timestamp antar sensor berbeda,
- cache threshold belum di-invalidate,
- format angka dari database menjadi string,
- frontend membaca data lama saat user pindah greenhouse.

## File yang Relevan

- [Heatmap.vue](../14-complete-file-walkthrough/web/Heatmap.vue.md)
- [PageController.php](../14-complete-file-walkthrough/backend/web/PageController.php.md)
- [ApiController.php](../14-complete-file-walkthrough/backend/web/ApiController.php.md)
- [Vue Reactivity dan UI Greenhouse](./web-vue-reactivity-ui.md)
- [Laravel API dan Database Query](./web-laravel-api-database.md)
