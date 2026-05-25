---
title: "Table"
description: "Panduan teknis antarmuka tabel riwayat sensor terpaginasi, integrasi kueri sortir kolom, filter pencarian node, dan rentang tanggal."
---

# Table

Halaman Tabel (`Table.vue`) menyajikan seluruh log historis data sensor mentah yang tersimpan dalam basis data secara terperinci. Halaman ini didesain menggunakan teknik pemuatan asinkron dinamis untuk menangani tabel sensor raksasa tanpa membebani browser.

---

## Interaksi Filter dan Parameter Pencarian

Untuk memudahkan analisis data anggrek oleh pengguna, halaman ini menyediakan opsi filter pencarian dinamis yang secara otomatis dikemas menjadi satu parameter JSON string bernama `dict` sebelum dikirimkan ke server Laravel:

```mermaid
graph TD
    UI[Input Filter di Table.vue] -->|Bungkus ke JSON| Dict[dict: gh_id, page, per_page, sort_field, sort_direction, start_date, end_date, node_id]
    Dict -->|Kueri GET via Axios| Endpoint[/api/table-data-per-gh]
    Endpoint -->|Bandingkan Database| DB[(MySQL)]
    DB -->|Kirim Paginator JSON| UI
```

### Parameter Filter yang Didukung:
*   **Greenhouse Active Tab**: Memilih sumber data rumah kaca (Greenhouse 1 atau Greenhouse 2).
*   **Node ID Selector**: Menyaring data agar hanya memunculkan data dari satu node sensor tertentu (misal: Node 3 saja).
*   **Date Range Picker**: Membatasi tanggal awal (`start_date`) dan akhir (`end_date`) pembacaan data.
*   **Column Sorting**: Menyortir data secara menaik (*Ascending*) atau menurun (*Descending*) dengan mengeklik header kolom tabel (Waktu, Suhu, Kelembapan, Lux, RSSI).

---

## Mekanisme Paginasi Asinkron (Async Reloading)

Saat tabel dimuat atau filter diubah:
1.  Vue menampilkan overlay loading abu-abu transparan atau baris animasi skeleton.
2.  Skrip mengirim request GET Axios ke `/api/table-data-per-gh` membawa query string parameter `dict`.
3.  Server Laravel mengeksekusi paginasi tingkat database (`LIMIT OFFSET`) dan mengembalikan data terpaginasi:
    ```json
    {
      "success": true,
      "data": [],
      "total": 4580,
      "current_page": 2,
      "per_page": 10,
      "last_page": 458
    }
    ```
4.  Vue memperbarui state lokal `finalData`, mematikan indikator loading, dan me-render ulang tombol-tombol navigasi halaman (*Previous*, *Next*, halaman spesifik) secara dinamis sesuai nilai `last_page` dan `current_page`.

---

## Penanganan Keadaan Khusus

*   **Data Kosong**: Jika data tidak ditemukan untuk filter yang disetel (misal: tidak ada data di tanggal yang dipilih), tabel menyembunyikan pagination controller dan menampilkan ilustrasi kotak kosong disertai pesan ramah: *Data tidak ditemukan*.
*   **Loading State Guard**: Tombol filter dinonaktifkan sementara selama request asinkron berjalan untuk mencegah spamming request yang dapat mengacaukan antrean respons server.

Lanjutkan ke bagian **[Heatmap](./heatmap.md)** untuk mempelajari bagaimana data spasial divisualisasikan secara geografis.
