---
title: "OTA Update Gateway"
description: "Panduan teknis sistem Over-The-Air (OTA) firmware update pada ESP32 Gateway, mencakup pengecekan cloud otomatis dan upload web lokal terenkripsi."
---

# Over-The-Air (OTA) Update Gateway

ESP32 Gateway mendukung pembaruan firmware nirkabel (*Over-The-Air*) melalui dua jalur independen: **Pengecekan Cloud Otomatis (WiFi)** dan **Upload Web Lokal Terverifikasi**. Selama proses flashing berlangsung, operasi logging SD card dan pembacaan sensor ditangguhkan untuk menghindari tabrakan bus SPI/I2C serta meminimalkan risiko kegagalan.

---

## Jalur 1: Pengecekan Cloud Otomatis via Wi-Fi

Gateway secara berkala (setiap 1 jam sekali) melakukan pengecekan ketersediaan firmware baru di server cloud jika terhubung ke Wi-Fi.

> [!IMPORTANT]
> **Bypass GPRS**: Pembaruan OTA otomatis ditangguhkan sepenuhnya jika gateway menggunakan koneksi GPRS seluler untuk menghemat kuota data dan menghindari kegagalan akibat koneksi seluler yang lambat atau tidak stabil.

### Alur Kerja `checkForUpdates()`

Logika ini diimplementasikan di dalam [main.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/main.cpp):
1.  **Pemeriksaan Awal**: Memastikan `net.isWiFiConnected()` bernilai true.
2.  **Display Status**: LCD menampilkan pesan `Chk OTA...` pada baris ke-3.
3.  **HTTP Request**: Mengirimkan HTTP GET ke endpoint `FW_UPDATE_URL` yang dibubuhi parameter `FW_VERSION_ID` menggunakan objek secure client `WiFiClientSecure` (dikonfigurasi bypass sertifikat menggunakan `c.setInsecure()`).
4.  **Headers**: Request membawa header `X-Device-ID` untuk pencatatan server.
5.  **Parsing JSON**: Jika respons HTTP 200 OK, payload JSON diparsing untuk mengekstrak parameter `status`, `file_url`, dan `version`.
6.  **Komparasi Versi**: Versi baru dibandingkan dengan versi berjalan `FIRMWARE_VERSION`:
    *   Jika `allowApply` (konstanta `AUTO_OTA_APPLY_ENABLED`) bernilai `false`, penemuan versi baru hanya dituliskan ke WebSerial/Serial monitor sebagai log informasi tanpa tindakan flashing.
    *   Jika `allowApply` bernilai `true`, LCD menampilkan `Upd...`, watchdog diatur ulang, dan library `HTTPUpdate` diaktifkan untuk mengunduh serta mem-flash firmware secara langsung dari `file_url`. Setelah selesai, sistem otomatis melakukan `ESP.restart()`.

---

## Jalur 2: Upload Web Lokal Terverifikasi (`/doUpdate`)

Pengguna administratif dapat mengunggah file biner firmware (`.bin`) secara manual melalui dashboard diagnostik lokal atau portal konfigurasi di endpoint `/doUpdate` (HTTP POST).

### Protokol Validasi Keamanan

Untuk mencegah infiltrasi firmware tidak sah, handler di dalam [ConfigManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/ConfigManager.cpp) memberlakukan verifikasi ketat sebagai berikut:

1.  **Autentikasi Proof Terenkripsi**: Setiap request POST harus menyertakan header `X-Admin-Proof`. Payload ini didekripsi menggunakan AES-256-CBC untuk memverifikasi token admin aktif dan mencegah serangan replay.
2.  **Metadata Matching**: Pengirim harus mengirimkan header metadata file:
    *   `X-Upload-Filename`: Nama file biner.
    *   `X-Upload-Size`: Ukuran file dalam satuan byte.
    *   `X-Upload-SHA256`: Hash SHA-256 dari file biner utuh.
    *   Jika parameter ini tidak cocok dengan isi payload terenkripsi di `X-Admin-Proof`, proses unggahan langsung digagalkan (`Update.abort()`).
3.  **Kalkulasi Hash On-The-Fly**: Selama potongan data (*chunks*) diunggah, data langsung ditulis ke flash partisi cadangan menggunakan fungsi `Update.write()`. Bersamaan dengan itu, gateway mengkalkulasi hash SHA-256 biner tersebut secara bertahap menggunakan library MbedTLS melalui `mbedtls_sha256_update`.
4.  **Verifikasi Akhir**: Pada bagian akhir transmisi (`final` block):
    *   Gateway menyelesaikan kalkulasi hash (`mbedtls_sha256_finish`) dan membandingkannya dengan `X-Upload-SHA256`.
    *   Total byte yang diterima dicocokkan dengan `X-Upload-Size`.
    *   Jika cocok, fungsi `Update.end(true)` dipanggil, LCD memunculkan `OTA UPDATE SUCCESS`, dan perangkat restart setelah jeda 1 detik.
    *   Jika hash atau ukuran tidak cocok, partisi cadangan dibersihkan dan update dibatalkan.

---

## Penanganan Masalah & Failsafe OTA

*   **SD Card Lockout**: Fungsi logging dinonaktifkan dengan menyetel bendera kesibukan `_isBusy` pada `SDCardLogger` sebelum proses update berjalan. Hal ini mencegah tabrakan bus SPI saat flash internal sedang sibuk menulis block data firmware.
*   **Watchdog Feed**: Watchdog dipelihara secara manual di tengah-tengah penerimaan chunk untuk mencegah timeout CPU selama penulisan memori flash sektor besar.

Lanjutkan ke [Debugging Gateway](./debugging-gateway.md) untuk melihat panduan penyelesaian masalah hardware dan software.
