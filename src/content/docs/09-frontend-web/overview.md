---
title: "Overview Frontend Web"
---

# Overview Frontend Web

Frontend web adalah dashboard yang dilihat pengguna. Snapshot repo memperlihatkan dua komponen Vue utama:

- `web/Controlling.vue`
- `web/Heatmap.vue`

Backend `PageController` juga merender halaman Inertia seperti monitoring, table, heatmap, camera, dan controlling.

## Peran Frontend

1. Menampilkan data monitoring.
2. Menampilkan heatmap greenhouse.
3. Mengatur threshold sensor.
4. Mengatur scheduling aktuator.
5. Mengambil dan menyimpan data melalui API.
6. Memberi feedback loading, error, dan toast.

## Status Bukti

Halaman login, monitoring, table, dan export tidak terlihat sebagai file Vue terpisah di snapshot ini. Penjelasan halaman tersebut harus mengandalkan bukti dari `PageController` atau menunggu file frontend lengkap.

Lanjutkan ke [Cara Kerja Vue](./cara-kerja-vue.md).
