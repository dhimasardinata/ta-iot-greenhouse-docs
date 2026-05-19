---
title: "Uji Web dan Android"
---

# Uji Web dan Android

Uji web dan Android memastikan dashboard bisa dipakai pengguna untuk monitoring, heatmap, kontrol threshold, jadwal, dan export data.

## Bukti dari Kode

Frontend web:

- `web/Controlling.vue` memakai Inertia props, Axios, threshold, jadwal, dan toast.
- `web/Heatmap.vue` memakai Leaflet, gambar greenhouse, node location, threshold, dan auto refresh.
- `web/PageController.php` memasok data halaman monitoring, table, heatmap, camera, dan controlling.

Android:

- `android/MainActivity.kt.txt` membuka `https://ta.atomic.web.id/` dengan WebView.
- Android mengaktifkan JavaScript dan DOM storage.
- Android menangani download biasa dan blob export.
- Android subscribe FCM topic `peringatan_kabut`.
- `android/AndroidManifest.xml.txt` meminta permission internet, network state, dan storage lama.

## Yang Diuji

- Login dan sesi pengguna.
- Halaman monitoring memuat data terbaru.
- Heatmap berubah sesuai data dan greenhouse aktif.
- Threshold bisa diubah.
- Jadwal bisa dibuat, disimpan, dan dibatalkan.
- Export file berhasil di browser dan Android.
- WebView menampilkan error saat jaringan gagal.

## Status Bukti

Belum terlihat test otomatis frontend atau Android di snapshot ini. Pengujian bagian ini kemungkinan perlu blackbox manual atau tambahan test end-to-end.

Lanjutkan ke [Uji Keamanan](./uji-keamanan.md).
