---
title: "Debugging Frontend"
---

# Debugging Frontend

Debugging frontend berarti memeriksa tampilan, state Vue, props Inertia, dan request API.

## Tempat Cek

1. Browser console.
2. Network tab.
3. Vue devtools jika tersedia.
4. Response API.
5. Props dari Inertia.
6. Laravel log jika request backend gagal.

## Gejala Umum

| Gejala | Area Dicek |
|---|---|
| Threshold tidak berubah | `/api/update-thresholds`, `editedThresholds` |
| Jadwal tidak tersimpan | `/api/schedules`, validasi time |
| Heatmap kosong | `sensorDataByGh`, node location, image path |
| Marker salah posisi | konfigurasi `nodeLocations` |
| Export gagal di Android | blob download dan WebView handler |

## Catatan

Beberapa halaman frontend tidak ada di snapshot ini, sehingga debugging lengkap perlu file aplikasi web penuh.

Lanjutkan ke [File Reference Web](./file-reference/index.md).
