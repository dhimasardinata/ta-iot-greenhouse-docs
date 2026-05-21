---
title: "REST API"
---

# REST API

Dalam sistem Tugas Akhir ini, **REST API** bertindak sebagai antarmuka utama (interface) yang menghubungkan perangkat keras (firmware node & gateway) dengan server backend cloud berbasis **Laravel**.

Semua pertukaran data yang bersifat satu arah terputus (seperti mengirim data sensor secara terjadwal atau memeriksa ketersediaan file update) dilayani melalui protokol HTTP/HTTPS menggunakan REST API.

---

## Daftar Endpoint Utama (Laravel Backend)

Seluruh logika API diimplementasikan pada dua controller utama di backend Laravel:
1. `App\Http\Controllers\Api\ApiController` (Mengurus data sensor, kamera, kontrol, dan status).
2. `App\Http\Controllers\Api\OtaController` (Mengurus upload firmware dan pengecekan versi OTA).

Berikut adalah pemetaan endpoint yang aktif digunakan oleh perangkat keras dan dashboard:

### 1. Pengiriman Data Sensor
* **Endpoint:** `POST /api/sensor`
* **Controller:** `ApiController@saveSensorData`
* **Pengguna:** Node Sensor ESP8266 & Gateway ESP32 (saat sinkronisasi cache offline).
* **Format Request Body (JSON / Form-Data):**
  ```json
  {
    "gh_id": 1,
    "node_id": 4,
    "temperature": 27.5,
    "humidity": 78.2,
    "light_intensity": 450.0,
    "rssi": -65,
    "recorded_at": "2026-05-21 09:24:00"
  }
  ```
  *(Catatan: `recorded_at` bersifat opsional. Jika dikirim dari cache data offline, field ini diisi dengan waktu saat data dibaca di masa lalu).*
* **Format Response Sukses (JSON):**
  ```json
  {
    "success": true,
    "inserted": 4
  }
  ```

### 2. Pengiriman Data Kamera (Analisis Kabut)
* **Endpoint:** `POST /api/save-camera-data`
* **Controller:** `ApiController@saveCameraData`
* **Pengguna:** Gateway ESP32 (mengambil gambar dari modul ESP32-Cam).
* **Fungsi Tambahan:** Jika parameter `isFoggy` terdeteksi bernilai `true` (berkabut), server Laravel secara otomatis memicu push notification Firebase Cloud Messaging (FCM) ke aplikasi Android pengguna.
* **Format Request Body:**
  ```json
  {
    "gh_id": 1,
    "isFoggy": true,
    "confidence": 0.89,
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "recorded_at": "2026-05-21 09:24:00"
  }
  ```
* **Format Response Sukses:**
  ```json
  {
    "success": true
  }
  ```

### 3. Pengecekan Firmware Terbaru (OTA)
* **Endpoint:** `GET /api/get-file/{nodeId}` atau `GET /api/get-file?node_id={nodeId}`
* **Controller:** `OtaController@getFirmwareInfo`
* **Pengguna:** Node Sensor ESP8266 & Gateway ESP32.
* **Fungsi:** Memeriksa apakah ada file binari baru di server untuk di-update.
* **Format Response Sukses (Ada Update):**
  ```json
  {
    "version": "1.2.0",
    "file_url": "http://192.168.1.100:8000/storage/files/file-sensor4-v1_2_0-s4.bin",
    "status": 1,
    "node_id": 4
  }
  ```
* **Format Response Sukses (Tidak Ada Update / Versi Sudah Terbaru):**
  ```json
  {
    "version": "",
    "file_url": "",
    "status": 0,
    "node_id": 4
  }
  ```

### 4. Sinkronisasi Status Aktuator
* **Endpoint:** `POST /api/post-device-status`
* **Controller:** `ApiController@postDeviceStatus`
* **Pengguna:** Gateway ESP32.
* **Fungsi:** Mengabarkan kondisi riil relay kipas/pompa ke server agar status di dashboard sinkron.
* **Format Request Body:**
  ```json
  {
    "gh_id": 1,
    "exhaust_status": 1,
    "dehumidifier_status": 0,
    "blower_status": 1
  }
  ```

---

## Mekanisme Penanganan Kegagalan API di Sisi Perangkat
Perangkat IoT harus siap menghadapi situasi di mana server Laravel tidak menjawab (HTTP status selain 2xx, timeout, atau salah IP).

Dalam firmware kita:
1. **Timeout Batas Pendek:** Request HTTP dibatasi maksimal 5-10 detik. Jika melebihi itu, koneksi diputus paksa agar tidak memblokir pembacaan sensor berikutnya.
2. **Offline Buffer:** Data sensor disimpan lebih dulu ke antrean lokal. Firmware memakai RTC RAM untuk antrean pendek dan fallback LittleFS (`/cache.dat`) jika RTC penuh atau gagal, lalu mengirim ulang saat koneksi pulih.

Lanjutkan ke [WebSocket](./websocket.md) untuk melihat jalur komunikasi realtime yang digunakan untuk terminal debugging lokal!
