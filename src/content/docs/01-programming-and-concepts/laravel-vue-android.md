---
title: "Laravel, Vue, and Android"
---

# Laravel, Vue, and Android

Laravel menangani backend dan endpoint API. Vue menangani tampilan web seperti monitoring, heatmap, dan controlling. Android WebView membuka sistem web dari aplikasi mobile.

Konsep pentingnya adalah controller, route, request, response JSON, component, props, state, event, Activity, WebView, permission, dan layout XML.

## Peran Tiap Lapisan

| Lapisan | Tugas |
|---|---|
| Laravel controller | Menerima request, membaca query/database, validasi, cache, dan mengirim JSON. |
| Vue component | Menampilkan data, mengelola interaksi user, dan mengirim perubahan ke API. |
| Inertia | Membawa props awal dari backend ke halaman Vue. |
| Android WebView | Membuka dashboard web dari aplikasi Android. |
| Docs site Next.js | Menyajikan dokumentasi, search, dan referensi OpenAPI. |

## Pola Data

Alur umumnya:

1. Firmware mengirim data sensor atau status.
2. Backend menyimpan atau membaca data dari database.
3. Controller mengirim JSON.
4. Vue membaca JSON dan mengubahnya menjadi UI.
5. Android menampilkan UI web melalui WebView.

Jika salah satu field berubah, efeknya bisa sampai ke beberapa lapisan. Misalnya perubahan nama field `light_intensity` dapat memengaruhi query backend, mapping frontend, dan tampilan heatmap.

## Hal yang Sering Membuat Bug

- backend mengirim angka sebagai string,
- frontend menganggap array selalu ada,
- cache backend belum dihapus setelah data diubah,
- validasi backend tidak sama dengan validasi UI,
- WebView punya izin atau mode loading berbeda dari browser desktop,
- endpoint firmware dan endpoint web memakai format field yang berbeda.

## Halaman Lanjutan

- [Laravel API dan Database Query](./web-laravel-api-database.md)
- [Vue Reactivity dan UI Greenhouse](./web-vue-reactivity-ui.md)
- [Next.js, Fumadocs, dan Search Docs](./docs-platform-next-fumadocs.md)
