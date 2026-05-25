---
title: "Controller"
description: "Rincian implementasi, parameter input, algoritma pemrosesan, dan fungsionalitas dari pengontrol utama di backend Laravel."
---

# Controller

Bagian ini membahas arsitektur internal dan logika kode dari empat controller utama di dalam folder [web/](file:///home/dhimasardinata/Dokumen/ta/web/). Pengontrol-pengontrol ini mengimplementasikan logika penanganan data sensor, kontrol jadwal aktuator, validasi OTA update, dan penyusunan visualisasi data.

---

## 1. ApiController

[ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php) adalah pengontrol utama untuk semua lalu lintas data mentah (raw data) dan operasi sinkronisasi API.

### Algoritma Optimasi `tablePerGH()` (Pivot Paginasi)
Menampilkan data sensor historis dalam format tabel secara real-time sangat menantang karena struktur data sensor disimpan per baris parameter individu.
*   **Masalah**: Data sensor disimpan per parameter, sementara tabel dashboard perlu menampilkan satu baris gabungan per `node_id` dan `recorded_at`.
*   **Solusi**: `ApiController` melakukan paginasi dua lapis.
    1.  Pertama, ambil `node_id` dan `recorded_at` yang unik dari tabel `sensor_data` sesuai limit, offset, dan filter tanggal.
    2.  Kedua, lakukan kueri aggregate `MAX(CASE WHEN...)` hanya untuk data yang memiliki kecocokan kombinasi `(node_id, recorded_at)` yang ada pada halaman tersebut.
    3.  Lakukan pencocokan kembali data mentah di level memori PHP sebelum dikirimkan ke web dashboard.

### Pemrosesan Gambar & Pemicu Notifikasi `saveCameraData()`
Menerima kiriman Base64 dari ESP32-CAM:
1.  **Regex Decode**: Memeriksa header base64 (`/^data:image\/(\w+);base64,/`) untuk menentukan format file (default `.jpg`).
2.  **Filesystem Management**: Menyimpan data gambar ke `/storage/camera/` menggunakan fasad `Storage`.
3.  **FCM Cloud Topic Message**: Jika status `isFoggy` bernilai `true` (embun terdeteksi), controller memanggil Firebase Cloud Messaging sdk (`app('firebase.messaging')`) untuk mengirim notifikasi push instan ke topik `peringatan_kabut`:
    ```php
    $message = \Kreait\Firebase\Messaging\CloudMessage::fromArray([
        'topic' => 'peringatan_kabut',
        'notification' => [
            'title' => 'Peringatan Kabut',
            'body' => 'Terdeteksi kabut pada kamera!',
        ],
    ]);
    ```

---

## 2. ScheduleController

[ScheduleController.php](file:///home/dhimasardinata/Dokumen/ta/web/ScheduleController.php) mengelola seluruh logika siklus hidup penjadwalan relay.

### Algoritma Pemetaan Status `getSchedule()`
Untuk meminimalkan beban CPU pada ESP32 Gateway, status aktuator diwakili dalam format representasi nilai biner sederhana di kolom `relay_binary`:
*   `0`: Dipaksa **OFF** (*Force OFF*).
*   `1`: Dipaksa **ON** (*Force ON*).
*   `2`: Mengikuti status otomatis sensor (*Threshold Control Mode*).

Respons JSON yang dikembalikan dipadatkan menjadi format ringkas:
```json
{
  "success": true,
  "gh_id": 1,
  "schedules": [
    {
      "id": 14,
      "aktif": 1,
      "mulai": "08:00",
      "selesai": "12:00",
      "relay": "222"
    }
  ]
}
```
*Catatan: String `"222"` berarti Exhaust, Dehumidifier, dan Blower semuanya berjalan di mode otomatis sensor.*

---

## 3. PageController

[PageController.php](file:///home/dhimasardinata/Dokumen/ta/web/PageController.php) bertindak sebagai penyusun visual halaman web dashboard Inertia.

### Logika Deteksi Koneksi Gateway `buildMonitoringActuatorStatus()`
PageController menyimpulkan apakah ESP32 Gateway saat ini online atau offline untuk menentukan keakuratan tampilan status aktuator:
1.  Ambil interval kesegaran gateway dari konfigurasi: `config('app.gateway_device_status_interval_seconds')` (default 300 detik atau 5 menit).
2.  Cek kolom `updated_at` di tabel `device_statuses`.
3.  Jika `updated_at` lebih baru dari `now() - interval`, maka gateway dinyatakan **Online**. Status aktuator yang ditampilkan di web diambil langsung dari laporan fisik gateway (`exhaust_status`, dll).
4.  Jika `updated_at` lebih lama dari interval, maka gateway dinyatakan **Offline**. Status aktuator yang ditampilkan di web akan diturunkan secara teoretis berdasarkan logika server menggunakan data rata-rata sensor saat itu (`resolveActuatorState()`).

---

## 4. OtaController

[OtaController.php](file:///home/dhimasardinata/Dokumen/ta/web/OtaController.php) bertindak sebagai server pengelola distribusi binary firmware update.

### Alur Kerja Upload dan Validasi Firmware
1.  **Format Penamaan Dinamis**: Saat file diunggah via `/api/files`, controller memformat nama berkas secara konsisten: `file-sensor{nodeId}-v{version}-s{nodeId}.bin`.
2.  **Single Active Flag**: Jika status biner yang diunggah disetel aktif (`status` = true), controller menonaktifkan status berkas firmware versi lama untuk node tersebut untuk memastikan request OTA hanya mengambil berkas terbaru.
3.  **Caching Metadata**: Informasi ini disimpan di dalam cache `firmware_latest_node_{nodeId}` untuk mempercepat respons kueri ketika perangkat keras melakukan ping OTA periodik.

Lanjutkan ke bagian **[Middleware](./middleware.md)** untuk melihat pengaman keamanan request.
