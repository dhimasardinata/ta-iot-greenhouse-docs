---
title: "API Threshold"
description: "Spesifikasi teknis API pembaruan ambang batas sensor lingkungan, validasi payload, dan mekanisme pembersihan cache internal."
---

# API Threshold

API Threshold memfasilitasi perubahan batas aman minimum dan maksimum suhu, kelembapan, dan intensitas cahaya dari antarmuka editor di dashboard web. Perintah ini diimplementasikan di method `updateThresholds()` dalam kelas [ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php).

---

## Spesifikasi Endpoint `POST /api/update-thresholds`

*   **URL**: `/api/update-thresholds`
*   **Method**: `POST`
*   **Content-Type**: `application/json`

### Payload Request (JSON Body)
Request dikirimkan dalam bentuk array objek `thresholds` yang berisi daftar ID sensor beserta nilai barunya:
```json
{
  "thresholds": [
    {
      "sensor_id": 1,
      "threshold_min": 24.5,
      "threshold_max": 33.5
    },
    {
      "sensor_id": 2,
      "threshold_min": 55.0,
      "threshold_max": 75.0
    }
  ]
}
```

### Aturan Validasi
1.  **Format Array**: Body request harus memuat properti `thresholds` bertipe array. Jika parameter ini absen atau bukan array, controller membatalkan request dan melempar respons `400 Bad Request`.
2.  **Isi Item**: Frontend mengirim `sensor_id`, `threshold_min`, dan `threshold_max`. Controller yang terlihat belum memakai validator detail per item, jadi validasi angka/rentang sebaiknya ditambahkan di backend jika endpoint ini dibuka untuk klien selain dashboard resmi.

---

## Proses Pembaruan Basis Data

Begitu data lolos validasi format awal, controller melakukan iterasi untuk memperbarui record di tabel `sensors` secara individual:
```php
foreach ($thresholds as $t) {
    DB::table('sensors')
        ->where('id', $t['sensor_id'])
        ->update([
            'threshold_min' => $t['threshold_min'],
            'threshold_max' => $t['threshold_max'],
            'updated_at' => now(),
        ]);
}
```
Jika `sensor_id` tidak ditemukan, query `where('id', ...)` tidak memperbarui baris apa pun dan loop tetap lanjut ke item berikutnya.

---

## Mekanisme Pembersihan Cache

Setelah data ambang batas disimpan di basis data, backend secara eksplisit membuang data cache dasbor yang berkaitan dengan konfigurasi kontrol untuk memaksa browser memuat data terbaru:

*   `Cache::forget('heatmap_thresholds')`: Memastikan denah heatmap merujuk ke rentang klasifikasi warna yang baru.
*   `Cache::forget('controlling_data')`: Menjamin editor slider web langsung sinkron dengan nilai database baru saat halaman dimuat ulang.

---

## Format Respons API

### Respons Sukses (HTTP 200 OK)
```json
{
  "success": true
}
```

### Respons Gagal (HTTP 400 Bad Request)
```json
{
  "success": false,
  "message": "Invalid data format"
}
```

Lanjutkan ke bagian **[API Schedule](./api-schedule.md)** untuk melihat pengontrolan aktuator berbasis waktu.
