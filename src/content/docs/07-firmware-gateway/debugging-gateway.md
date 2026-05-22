---
title: "Debugging Gateway"
description: "Panduan teknis diagnostik dan troubleshooting lapangan untuk ESP32 Gateway, mencakup monitoring Serial, kode status LCD, perintah WebSerial, dan pemecahan masalah hardware."
---

# Panduan Debugging & Diagnostik ESP32 Gateway

Dokumen ini ditujukan sebagai panduan teknis bagi teknisi lapangan untuk melakukan pelacakan kesalahan (*troubleshooting*) dan analisis kegagalan pada perangkat keras maupun perangkat lunak ESP32 Gateway.

---

## 1. Alat Bantu Diagnostik Utama

Gateway menyediakan beberapa antarmuka pemantauan internal yang dapat diakses untuk menganalisis kesehatan sistem secara *real-time*:

### A. Monitor Serial (Baud Rate 115200)
Menghubungkan langsung PC ke port USB-Serial gateway. Output debug memuat penanda berikut untuk mempermudah pemfilteran log:
*   `[HTTP]`: Transaksi request/response API cloud atau lokal.
*   `[UPLINK]`: Status pergantian rute internet (`DIRECT`/`RELAY` fallback).
*   `[WIFI]` / `[GPRS]`: Perubahan status jaringan fisik dan proses attachment GSM.
*   `[SD]`: Aktivitas pembacaan/penulisan file `/log.csv` dan `/qos.csv` pada kartu SD.
*   `[LCD]`: Log probing alamat LCD `0x27`.
*   `[FAILSAFE]`: Log keputusan darurat pemutusan daya relai.

### B. Indikator Status LCD 20x4 (Baris 0)
Baris paling atas LCD memberikan informasi cepat mengenai status jaringan:
*   Format Normal: `<HH:MM:SS> <netType>:<netStatus> [<rssi>]`
    *   `netType`: `WF` (Wi-Fi) atau `GP` (GPRS).
    *   `netStatus`: `OK` (Terhubung & sehat), `ST` (Stale - data cloud kedaluwarsa), `OF` (Offline - jaringan putus total).
    *   `rssi`: Nilai kekuatan sinyal (dBm untuk Wi-Fi, tingkat penerimaan untuk GSM).
*   Format Darurat: `** FAILSAFE ** <HH:MM:SS>` (Menandakan seluruh kontrol dinonaktifkan demi alasan keselamatan).

### C. Konsol WebSerial Terenkripsi
Dashboard web lokal menyediakan terminal diagnostik interaktif. Perintah yang dikirimkan dari web browser wajib memakai frame terenkripsi AES-256-CBC sebelum dieksekusi:
*   `status`: Menampilkan informasi uptime, kapasitas memori RAM bebas (*free heap*), mode uplink aktif, jumlah kesuksesan sinkronisasi, dan status pin relai.
*   `reboot`: Memaksa CPU ESP32 melakukan restart.
*   `resetwifi`: Menghapus kredensial Wi-Fi dari NVS dan memaksa masuk ke portal konfigurasi setelah reboot.

---

## 2. Tabel Troubleshooting Kegagalan Sistem

| Gejala Masalah | Kemungkinan Kode Komponen Terkait | Langkah Diagnosis | Solusi Pemecahan |
|---|---|---|---|
| **Relai Tidak Mau Aktif/Mati** | [RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp) | 1. Ketik `status` di WebSerial, cek status override.<br>2. Periksa apakah sistem berada dalam kondisi `failsafe`. | 1. Jika failsafe, perbaiki koneksi sensor/cloud agar data segar kembali.<br>2. Periksa fisik tegangan catu daya relai (relai Active-Low). |
| **Data Sensor Dinyatakan Stale (`ST` di LCD)** | [SensorDataManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SensorDataManager.cpp) | 1. Periksa log serial untuk error `[ND] Invalid cloud payload`.<br>2. Pastikan node sensor lokal memancarkan data ke IP gateway. | 1. Sesuaikan rentang normalisasi sensor jika data dibuang karena out-of-range.<br>2. Periksa catu daya 5V 3A pada node sensor lokal. |
| **GPRS Terjebak di Mode Init / Loop Failover** | [MyNetworkManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/MyNetworkManager.cpp) | 1. Lihat langkah `GprsSetupStage` terakhir pada log monitor serial.<br>2. Periksa ketersediaan sinyal GSM. | 1. Pastikan kartu SIM memiliki paket data aktif dan PIN telah dideaktivasi.<br>2. Periksa antena eksternal SIM800L apakah terpasang kokoh. |
| **Layar LCD Kosong / Karakter Rusak** | [LCDDisplay.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/LCDDisplay.cpp) | 1. Tunggu 5 detik untuk memicu fungsi auto-probe.<br>2. Periksa tegangan I2C pada SDA/SCL. | 1. Gateway otomatis melakukan scan alamat `0x27` setiap 5 detik untuk mencegah hang.<br>2. Kencangkan konektor kabel display I2C. |
| **SD Card Gagal Menulis Log CSV** | [SDCardLogger.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SDCardLogger.cpp) | 1. Cek apakah bendera `_isBusy` bernilai true (terkunci karena unduhan).<br>2. Periksa pin SPI (SCK=18, MISO=19, MOSI=13, CS=2). | 1. Jangan mencabut SD Card saat pengunduhan log sedang berlangsung.<br>2. Format ulang kartu SD ke FAT32 dengan ukuran sektor default. |
| **Jam Perangkat Bergeser (RTC Drift)** | [RTCManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RTCManager.cpp) | 1. Periksa pesan log `RTC lost confidence`.<br>2. Uji sinkronisasi waktu via HTTP. | 1. Ganti baterai backup coin cell CR2032 pada modul DS3231.<br>2. Pastikan gateway mendapatkan koneksi internet minimal sekali untuk sync NTP. |

---

## 3. Penanganan Kejenuhan Memori (Heap Leak Protection)

ESP32 Gateway diprogram untuk bekerja secara terus-menerus tanpa reboot. Untuk mencegah crash akibat fragmentasi RAM (*Out of Memory*):
*   Fungsi `_performHttpRequestWiFi()` memantau ukuran RAM bebas sebelum melakukan transaksi besar.
*   Jika kapasitas RAM bebas turun di bawah **25.000 byte** (`ESP.getFreeHeap() < 25000`), gateway menangguhkan transaksi non-kritis selama 200ms (`delay(200)`) untuk memberi kesempatan Wi-Fi/TCP stack dan task latar Arduino-ESP32 berjalan sebelum request besar dilanjutkan.

Lanjutkan ke [File Reference](./file-reference/index.md) untuk melihat daftar lengkap berkas proyek dan relasinya.
