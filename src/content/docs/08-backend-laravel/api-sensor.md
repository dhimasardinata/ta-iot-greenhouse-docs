---
title: "API Sensor"
description: "Panduan integrasi teknis endpoint penyimpanan data sensor, pemetaan alias parameter, serta siklus hidup penulisan database dan pembersihan cache."
---

# API Sensor

Endpoint API Sensor melayani unggahan data berkala dari ESP8266 Node. Logika endpoint ini diimplementasikan pada method `saveSensorData()` di dalam kelas [ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php).

---

## Spesifikasi Endpoint `POST /api/save-sensor-data`

*   **URL**: `/api/save-sensor-data`
*   **Method**: `POST`
*   **Content-Type**: `application/json` atau `application/x-www-form-urlencoded`
*   **Headers perangkat**: firmware dapat mengirim `Authorization`, `X-Device-ID`, dan `X-Signature`. Method controller yang terlihat tidak membaca header ini langsung; validasinya sebaiknya berada di middleware API.

### Validasi Parameter Input
Setiap request yang masuk divalidasi dengan aturan ketat:
```php
$request->validate([
    'gh_id' => 'required|integer',
    'node_id' => 'required|integer',
]);
```
Jika validasi ini gagal, server akan mengembalikan kode respons `422 Unprocessable Entity` beserta detail error.

---

## Logika Pemetaan Parameter (Alias Matching)

Backend menyediakan pemetaan alias parameter sensor sebelum dimasukkan ke dalam basis data. Pencocokan memakai nama field request apa adanya, jadi firmware sebaiknya memakai huruf kecil seperti daftar berikut:

| Parameter Fisik | Nama Sensor di DB | Alias yang Didukung |
|---|---|---|
| Suhu Udara | `Temperature` | `temperature`, `temp` |
| Kelembapan Udara | `Humidity` | `humidity`, `hum` |
| Intensitas Cahaya | `Light Intensity` | `light_intensity`, `light`, `lux` |
| Kekuatan Sinyal WiFi | `RSSI` | `rssi` |

### Potongan Kode Pemrosesan Alias:
```php
$aliases = [
    'temperature' => ['temperature', 'temp'],
    'humidity' => ['humidity', 'hum'],
    'light_intensity' => ['light_intensity', 'light', 'lux'],
    'rssi' => ['rssi'],
];

foreach ($mapping as $key => $sensor_id) {
    $value = null;
    foreach ($aliases[$key] as $alias) {
        if ($request->has($alias)) {
            $value = $request->input($alias);
            break;
        }
    }
    // ... proses simpan ...
}
```

---

## Operasi Basis Data Ganda (Dual-Write)

Ketika nilai sensor berhasil diidentifikasi, backend menjalankan dua operasi penulisan basis data berurutan untuk mengoptimalkan kinerja pembacaan:

1.  **Insert ke `sensor_data` (Transaksi Historis)**:
    Menambahkan baris log baru untuk mencatat rekaman histori sensor lengkap beserta timestamp (`recorded_at`).
2.  **Upsert ke `sensor_snapshots` (Status Terkini)**:
    Menjalankan kueri `updateOrInsert` untuk memperbarui baris status terakhir node yang bersangkutan. Operasi ini memastikan bahwa tabel snapshot selalu memuat data paling segar demi efisiensi proses render monitoring.

---

## Mekanisme Pembersihan Cache (Cache Invalidation)

Segera setelah data baru masuk dan ditulis ke database (`$insertedCount > 0`), backend membersihkan seluruh cache dasbor yang usang guna memastikan tampilan web langsung mutakhir pada muatan berikutnya:

*   `Cache::forget('gaugeData')`
*   `Cache::forget('monitoring_latest_time')`
*   `Cache::forget('heatmap_sensor_data')`
*   `Cache::forget('heatmap_latest_time')`
*   `Cache::forget('heatmap_thresholds')`

---

## Format Respons API

### Respons Sukses (HTTP 200 OK)
```json
{
  "success": true,
  "inserted": 4
}
```

### Respons Gagal Validasi (HTTP 422 Unprocessable Entity)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "gh_id": ["The gh id field is required."]
  }
}
```

Lanjutkan ke bagian **[API Average Sensor](./api-average-sensor.md)** untuk melihat bagaimana data sensor diagregasikan untuk visualisasi grafik.
