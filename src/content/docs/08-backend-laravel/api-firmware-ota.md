---
title: "API Firmware OTA"
description: "Spesifikasi teknis API unggahan berkas biner firmware, skema penamaan slug dinamis, dan penyediaan metadata pembaruan OTA."
---

# API Firmware OTA

Central Hub menyediakan jalur Over-The-Air (OTA) untuk membagikan file firmware `.bin`. Logika distribusi yang terlihat di snapshot diatur oleh kelas [OtaController.php](file:///home/dhimasardinata/Dokumen/ta/web/OtaController.php).

---

## 1. Upload Berkas Firmware (`POST /api/files`)

Digunakan oleh sistem administrator untuk mengunggah file biner hasil kompilasi program (.bin) ke server.

### Aturan Validasi Pengunggahan:
*   `status`: Wajib bertipe boolean. Menandakan apakah versi ini langsung aktif dirilis.
*   `version`: Wajib bertipe string, maksimal 20 karakter (misal: `"1.0.4"`).
*   `file`: Wajib berupa file dengan ekstensi `.bin` dan ukuran maksimal **2048 KB (2 MB)**.
*   `node_id` / `sensor_id`: Wajib diisi salah satu untuk mengaitkan berkas ke tipe perangkat tertentu.

### Penamaan Berkas & Penyimpanan Fisik:
1.  **Format Nama Dinamis**: Untuk menghindari tabrakan nama berkas di server, titik pada string versi digantikan dengan garis bawah (`_`). Nama file diatur dengan formula:
    `file-sensor{nodeId}-v{versionSlug}-s{nodeId}.bin`
    *Contoh*: `file-sensor1-v1_0_4-s1.bin`
2.  **Penyimpanan**: Disimpan di folder `/storage/app/public/files/` melalui disk `public` Laravel.
3.  **URL Dinamis**: Agar tautan download biner selalu dapat diakses meskipun domain server berubah, backend memformulasikan alamat URL menggunakan host aktif pengakses:
    `$fileUrl = rtrim($request->getSchemeAndHttpHost(), '/') . '/storage/' . ltrim($path, '/');`

### Persistensi Metadata Database:
*   Informasi disimpan di tabel `firmware_files` menggunakan kueri `updateOrCreate()`.
*   **Single-Active Rule**: Jika `status` unggahan bernilai `true`, controller otomatis mematikan status aktif seluruh versi lama firmware untuk node tersebut agar perangkat keras tidak terbingung memilih:
    ```php
    if ($status) {
        FirmwareFile::where('node_id', $nodeId)
            ->where('id', '!=', $firmware->id)
            ->update(['status' => false]);
    }
    ```
*   Hapus cache `firmware_latest_node_{nodeId}`.

---

## 2. Dapatkan Info Firmware Terbaru (`GET /api/get-file/{nodeId?}`)

Dipanggil secara berkala oleh ESP8266 Node atau ESP32 Gateway untuk menanyakan apakah ada rilis firmware baru.

*   **Identifikasi Node**: Mendukung pencarian node ID lewat URL path `/api/get-file/{nodeId}` atau parameter query string `node_id`, `sensor_id`, maupun `fw_id`.
*   **Caching Cepat**: Metadata pembaruan ditahan di cache `firmware_latest_node_{nodeId}` selama 30 detik untuk melindungi database dari spam request polling hardware.

### Respons format:

#### Kasus A: Ada Update Aktif Terbaru (HTTP 200 OK)
Jika ada firmware aktif untuk `node_id` tersebut, server mengembalikan `status: 1` dan URL download. Perbandingan apakah versi ini lebih baru dari firmware yang sedang berjalan dilakukan di sisi perangkat atau lapisan lain, karena `getFirmwareInfo()` yang terlihat hanya memilih firmware aktif terbaru dari database:
```json
{
  "version": "1.0.4",
  "file_url": "http://192.168.1.100:8000/storage/files/file-sensor1-v1_0_4-s1.bin",
  "status": 1,
  "node_id": 1
}
```

#### Kasus B: Tidak Ada Update / Node Tidak Valid (HTTP 200 OK)
Jika tidak ada biner aktif atau parameter tidak valid, server tetap mengembalikan HTTP 200 dengan status 0 tanpa memicu error koneksi hardware:
```json
{
  "version": "",
  "file_url": "",
  "status": 0,
  "node_id": 1
}
```

Lanjutkan ke bagian **[Debugging Backend](./debugging-backend.md)** untuk melihat taktik pemantauan log dan pemecahan masalah server.
