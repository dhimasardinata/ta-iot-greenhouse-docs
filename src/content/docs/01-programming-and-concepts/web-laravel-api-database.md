---
title: "Laravel API dan Database Query"
---

# Laravel API dan Database Query

Backend Laravel menjadi penghubung antara firmware, database, dashboard web, dan Android WebView. Controller menerima request, membaca atau menulis database, lalu mengirim response JSON.

## Konsep Laravel yang Terlihat

| Konsep | Fungsi |
|---|---|
| Controller | Mengelompokkan endpoint, misalnya sensor, jadwal, OTA, dan halaman. |
| `Request` | Membaca query string, body, dan parameter. |
| Validator | Memastikan bentuk request benar sebelum database diubah. |
| Query Builder `DB::table` | Membuat query SQL tanpa menulis semua SQL manual. |
| Eloquent Model | Mengakses tabel lewat class seperti `Schedule` dan `Greenhouse`. |
| Cache facade | Menyimpan hasil query sementara agar request gateway/web lebih ringan. |
| Pagination | Membagi data tabel agar tidak dikirim sekaligus. |
| `response()->json` | Mengirim data ke frontend atau firmware dalam format JSON. |
| Carbon | Mengelola tanggal dan waktu jika dipakai pada controller. |

## Request dan Parameter

Beberapa endpoint membaca `gh_id`, `page`, `per_page`, tanggal, node id, dan sort field. Ada juga pola `dict` JSON dalam request untuk membawa banyak parameter sekaligus.

Risiko:

- `dict` invalid membuat parameter tidak terbaca,
- `gh_id` kosong bisa fallback ke greenhouse default,
- sort field perlu whitelist agar tidak membuka query bebas,
- tanggal perlu format yang konsisten,
- page/per_page perlu batas agar tidak mengambil data terlalu besar.

## Query Sensor Pivot

`ApiController::tablePerGH` membaca data sensor lalu membuat format pivot:

- satu row mewakili `node_id` dan `recorded_at`,
- temperature, humidity, light, dan RSSI menjadi kolom,
- sorting bisa berdasarkan waktu atau nilai sensor,
- query paginasi dibuat sebelum aggregate detail agar lebih ringan.

Edge case:

- sensor id tidak ditemukan dan menjadi `0`,
- satu sensor hilang pada timestamp tertentu,
- `recorded_at` sama tetapi data sensor tidak lengkap,
- sorting aggregate perlu join tambahan,
- count cache bisa stale selama TTL.

## Snapshot dan Cache Backend

Backend memakai cache untuk mengurangi query berat. Contohnya:

- count table greenhouse,
- schedule gateway,
- schedule web,
- status actuator,
- sensor snapshot initialized.

Cache membantu performa, tetapi setiap update perlu invalidasi cache yang tepat. Jika tidak, dashboard atau gateway bisa melihat data lama.

## Validator

`ScheduleController` memakai `Validator::make` untuk memastikan:

- `gh_id` ada dan integer,
- greenhouse ada,
- schedules berbentuk array,
- jam format `H:i`,
- end time setelah start time,
- mode actuator hanya `on`, `off`, atau `threshold`.

Edge case:

- validasi frontend dan backend bisa berbeda,
- timezone browser dan server bisa beda,
- schedule overlap diizinkan atau ditolak harus jelas di UI dan backend,
- delete lalu create ulang schedule perlu transaksi jika nanti data makin kompleks.

## JSON Response

Response JSON umumnya memuat:

- `success`,
- `data`,
- `message`,
- `errors`,
- `total`,
- `current_page`,
- `last_page`.

Frontend perlu membaca response dengan defensive check karena response error bisa punya shape berbeda dari response sukses.

## File yang Relevan

- [ApiController.php](../14-complete-file-walkthrough/backend/web/ApiController.php.md)
- [ScheduleController.php](../14-complete-file-walkthrough/backend/web/ScheduleController.php.md)
- [OtaController.php](../14-complete-file-walkthrough/backend/web/OtaController.php.md)
- [PageController.php](../14-complete-file-walkthrough/backend/web/PageController.php.md)
- [Controlling.vue](../14-complete-file-walkthrough/web/Controlling.vue.md)
- [Heatmap.vue](../14-complete-file-walkthrough/web/Heatmap.vue.md)
