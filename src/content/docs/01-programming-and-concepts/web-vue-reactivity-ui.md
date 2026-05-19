---
title: "Vue Reactivity dan UI Greenhouse"
---

# Vue Reactivity dan UI Greenhouse

Frontend Vue mengubah data backend menjadi tampilan dan kontrol. Pada project ini, Vue dipakai untuk controlling, scheduling, threshold, heatmap, tab greenhouse, toast, slider, dan peta greenhouse.

## Composition API

Kode Vue memakai `<script setup>` dan Composition API.

| API | Fungsi |
|---|---|
| `ref` | State mutable seperti active tab, loading, threshold, schedules. |
| `computed` | Nilai turunan seperti active sensors, status perubahan, config parameter. |
| `watch` | Menjalankan efek saat props atau state berubah. |
| `onMounted` / `onUnmounted` | Setup dan cleanup map, timer, observer. |
| `nextTick` | Menunggu DOM selesai update sebelum operasi UI. |
| `defineProps` | Menerima data awal dari backend/Inertia. |

## Inertia Props

`usePage()` membawa props dari backend ke Vue. Controlling memakai props seperti greenhouse, initial data, dan initial schedules. Heatmap menerima props sensor data, threshold, greenhouse aktif, dan latest data.

Edge case:

- props bisa kosong saat render awal,
- array bisa datang sebagai object,
- field nested perlu dicek sebelum dipakai,
- data awal bisa berubah setelah navigasi Inertia.

## Threshold dan Schedule

Controlling mengelola dua jenis state:

- threshold sensor,
- schedule actuator.

Pola penting:

- simpan nilai awal,
- simpan nilai edit,
- hitung apakah ada perubahan,
- blok pindah tab jika ada perubahan belum disimpan,
- kirim hanya data yang berubah jika memungkinkan.

Edge case:

- `JSON.stringify` untuk membandingkan object bergantung urutan field,
- angka dari input bisa menjadi string,
- start time dan end time perlu dibandingkan sebagai waktu,
- schedule baru butuh id sementara di UI,
- backend tetap menjadi sumber validasi akhir.

## Axios dan Error Handling

Vue memakai Axios untuk request API seperti load dan save schedule/threshold.

Yang perlu diperhatikan:

- set loading sebelum request,
- reset loading di akhir,
- cek `response.data?.success`,
- tampilkan toast sukses/gagal,
- jangan menganggap response error punya bentuk sama dengan response sukses.

## Heatmap dan Leaflet

Heatmap memakai Leaflet untuk peta greenhouse. Data sensor diubah menjadi marker dan warna.

Konsep yang muncul:

- posisi node manual per greenhouse,
- parameter aktif temperature/humidity/lux,
- threshold min/max untuk normalisasi warna,
- marker layer,
- resize observer,
- request animation frame,
- auto refresh.

Edge case:

- map belum siap saat data datang,
- container berubah ukuran,
- node id tidak punya posisi,
- threshold min sama dengan max,
- data sensor kosong,
- interval refresh perlu dibersihkan saat unmount.

## UI State dan Race Condition

UI bisa berubah saat request masih berjalan. Contohnya user pindah greenhouse saat load schedule belum selesai.

Pola aman:

- cek greenhouse aktif sebelum menulis hasil request,
- cleanup timer/observer di `onUnmounted`,
- debounce resize,
- gunakan flag `isSaving`,
- jangan update map layer jika map sudah dihancurkan.

## File yang Relevan

- [Controlling.vue](../14-complete-file-walkthrough/web/Controlling.vue.md)
- [Heatmap.vue](../14-complete-file-walkthrough/web/Heatmap.vue.md)
- [ApiController.php](../14-complete-file-walkthrough/backend/web/ApiController.php.md)
- [ScheduleController.php](../14-complete-file-walkthrough/backend/web/ScheduleController.php.md)

## Halaman Lanjutan

- [Visualisasi Web Leaflet dan Canvas](./web-visualization-leaflet.md)
- [Laravel API dan Database Query](./web-laravel-api-database.md)
