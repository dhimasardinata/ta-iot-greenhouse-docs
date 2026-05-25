---
title: "API Average Sensor"
description: "Rincian teknis API penarikan rata-rata sensor real-time dan generator grafik dengan pengelompokan rentang waktu (time-bucketing) dinamis."
---

# API Average Sensor

Backend Laravel menyediakan dua API utama untuk menyajikan data sensor teragregasi ke dashboard: **API Rata-Rata Gauge** (`get_average_sensor_data`) dan **API Generator Grafik** (`fetchChart`). Kedua metode ini diimplementasikan di [ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php).

---

## 1. API Rata-Rata Gauge (`GET /api/get-average-sensor-data`)

Endpoint ini dipanggil oleh widget gauge di dashboard monitoring untuk menampilkan rata-rata suhu, kelembapan, dan intensitas cahaya dari seluruh node aktif hari ini.

*   **Parameter**: `gh_id` (default 1)
*   **Kueri Optimasi**: Mengambil data dari tabel `sensor_snapshots` dan memfilternya dari awal hari ini (`recorded_at >= Carbon::today()`). Hal ini menghindari operasi pemindaian penuh (*full scan*) pada tabel log raksasa `sensor_data`.
*   **Format Respons**:
    ```json
    {
      "success": true,
      "data": {
        "temperature": 29.45,
        "humidity": 68.2,
        "light_intensity": 24500.12,
        "last_recorded_at": "2026-05-25 09:15:00"
      }
    }
    ```

---

## 2. API Generator Grafik (`POST / GET /api/chart-sensor-data`)

Dashboard menggunakan endpoint ini (`fetchChart`) untuk mengambil data grafik historis. Library grafik di sisi frontend tidak terlihat di snapshot `web/`, tetapi payload yang dikirim backend sudah dipisahkan menjadi label sumbu-X dan array nilai.

### Parameter Request
Data dapat dikirim via parameter query atau objek kamus JSON `dict`:
*   `sensor_id`: ID sensor yang dicari.
*   `mode`: `'avg'` (rata-rata seluruh node) atau `'per_node'` (memisahkan garis grafik per node).
*   `range`: Rentang waktu (`'last_1h'`, `'today'`, `'last_1w'`, `'last_1m'`, `'custom'`).
*   `date_start` / `date_end`: Tanggal filter (hanya untuk mode `custom`).
*   `time`: Filter jam spesifik (format `H:00`, hanya untuk mode `custom`).

### Mekanisme Pengelompokan Waktu (*Time-Bucketing*)
Untuk mencegah response grafik terlalu besar, backend menerapkan pengelompokan waktu (*bucket*) secara dinamis di tingkat database:

| Rentang Waktu (`range`) | Batas Jam Maksimal | Format Label Waktu (`DATE_FORMAT`) | Skala Bucket |
|---|---|---|---|
| `last_1h` | 1 jam | `%H:%i` (Jam:Menit) | Menit |
| `today` | 24 jam | `%H:00` (Jam:00) | Jam |
| default selain opsi eksplisit | 24 jam | `%H:00` (Jam:00) | Jam |
| `last_1w` | 168 jam | `%Y-%m-%d` (Tahun-Bulan-Hari) | Hari |
| `last_1m` | 720 jam | `%Y-%m-%d` (Tahun-Bulan-Hari) | Hari |

---

## Contoh Format Output Grafik

### Mode Rata-Rata Gabungan (`mode = 'avg'`)
Mengembalikan satu array nilai tunggal untuk satu garis grafik:
```json
{
  "success": true,
  "mode": "avg",
  "data": [28.5, 29.1, 29.8, 30.2],
  "raw_labels": ["08:00", "09:00", "10:00", "11:00"],
  "bucket_type": "hour"
}
```

### Mode Per Node (`mode = 'per_node'`)
Memecah dataset menjadi beberapa garis terpisah sesuai jumlah node aktif:
```json
{
  "success": true,
  "mode": "per_node",
  "raw_labels": ["08:00", "09:00", "10:00"],
  "bucket_type": "hour",
  "datasets": [
    {
      "node_id": 1,
      "label": "Node 1",
      "data": [28.2, 28.9, 29.5]
    },
    {
      "node_id": 2,
      "label": "Node 2",
      "data": [28.8, 29.3, 30.1]
    }
  ]
}
```

Lanjutkan ke bagian **[API Threshold](./api-threshold.md)** untuk melihat pengontrolan batas operasional sensor.
