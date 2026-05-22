---
title: "Referensi File Node"
description: "Peta struktur direktori dan detail file-by-file untuk basis kode ESP8266 Node Firmware."
---

# Referensi File Node Firmware

Halaman ini menyajikan pemetaan struktur file dan direktori resmi untuk proyek Node Firmware (`06-firmware-node/`). Pemetaan ini ditujukan untuk membantu pengembang memahami letak modul, file konfigurasi, serta controller yang mengendalikan siklus hidup perangkat ESP8266.

---

## Pemetaan Direktori & Komponen Core

Berikut adalah struktur pohon direktori utama di dalam repositori `node/`:

```text
node/
├── include/
│   └── config/
│       ├── constants.h         # Konstanta kapasitas cache, buffer TLS, dan interval waktu
│       └── hardware_pins.h     # Pemetaan GPIO hardware (Pin SDA=D2/GPIO4, SCL=D1/GPIO5)
├── src/
│   ├── main.cpp                # Titik masuk utama firmware (setup & non-blocking loop)
│   └── Application.cpp         # Implementasi state machine & siklus hidup aplikasi
└── lib/
    └── NodeCore/
        ├── api/                # Sub-sistem ApiClient (Cloud & Edge upload)
        ├── sensor/             # Integrasi SHTSensor & BH1750 (CRTP, Stuck-Bus recovery)
        ├── storage/            # Manajemen cache flash LittleFS & RTC RAM
        ├── ota/                # Updater OTA dan pengawas BootGuard
        ├── terminal/           # Terminal diagnostik berbasis WebSocket
        ├── commands/           # Kumpulan instruksi CLI terminal diagnostik
        └── web/                # Portal Web AP & WebServer Administrasi lokal
```

---

## File-by-File Reference Matrix

Berikut adalah penjelasan fungsi teknis dari file-file utama di dalam firmware Node:

### 1. Titik Masuk Utama (Entry Point) & Siklus Hidup
- **[main.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/main.cpp)**
  - *Peran:* Fungsi `setup()` menyiapkan hardware, memulihkan status boot, dan menginisialisasi objek [Application](file:///home/dhimasardinata/Dokumen/ta/node/src/Application.cpp). Fungsi `loop()` menjalankan scheduler kooperatif non-blocking secara terus menerus.
- **[Application.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/Application.cpp)** / **[Application.h](file:///home/dhimasardinata/Dokumen/ta/node/include/app/Application.h)**
  - *Peran:* Mengendalikan siklus hidup state machine node (stabilisasi sensor, pencarian WiFi, portal konfigurasi, hingga mode jalan).

### 2. Sub-sistem Komunikasi (API Client)
Seluruh logika komunikasi diisolasi di dalam sub-direktori `node/lib/NodeCore/api/`:
- **[ApiClient.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.h)**
  - *Peran:* Pintu gerbang utama (Facade) yang diekspos ke loop utama aplikasi.
- **[ApiClient.Context.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.Context.h)** / **[ApiClient.State.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.State.h)**
  - *Peran:* Definisi struktur data status upload, antrian darurat (*emergency queue*), parameter konfigurasi timeout, dan buffer payload.
- **[ApiClient.Security.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.Security.cpp)**
  - *Peran:* Penanganan memori heap untuk TLS. Mengelola ukuran buffer BearSSL secara dinamis (2048/1024 byte saat aktif, 512/256 byte saat idle) serta tanda tangan digital HMAC-SHA256.
- **[ApiClient.UploadFlow.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.UploadFlow.cpp)**
  - *Peran:* Membangun rute gateway lokal, memproses daftar kandidat IP gateway, dan menguji pengiriman HTTP edge.
- **[ApiClient.UploadRuntimeCycle.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.UploadRuntimeCycle.cpp)**
  - *Peran:* State machine pengiriman data cache yang dijadwalkan, penyisipan kolom khusus lokal (`rssi_nonactive`, `send_time`), enkripsi payload, dan pengiriman Live Snapshot darurat.
- **[ApiClient.UploadRuntimePolicy.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp)**
  - *Peran:* Memeriksa kesehatan RAM sebelum mengaktifkan client HTTPS dan menghitung durasi jeda kegagalan (*backoff interval* dengan limit cap 5 menit).

### 3. Integrasi Sensor & Pengondisian Sinyal
- **[SensorManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/sensor/SensorManager.h)** / **[SensorManager.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/sensor/SensorManager.cpp)**
  - *Peran:* Membaca data sensor I2C menggunakan pola desain CRTP (*Curiously Recurring Template Pattern*) untuk kecepatan eksekusi tanpa overhead polymorphism runtime. Menyertakan bit-bang pemulihan stuck-bus 18 kali dan fungsi kalibrasi/normalisasi nilai sensor.

### 4. Manajemen Penyimpanan Lokal & Data Cache
- **[CacheManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/CacheManager.h)** / **[CacheManager.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/CacheManager.cpp)**
  - *Peran:* Mengelola file database sirkular `/cache.dat` pada LittleFS. Menangani penyimpanan darurat jika koneksi gagal, pemulihan data rusak berbasis CRC, dan pembatasan frekuensi penulisan header flash (*deferred flushing* setelah 32 mutasi atau waktu 2 menit terlampaui).

### 5. Keamanan & Boot Safeguards
- **[BootManager.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/BootManager.cpp)**
  - *Peran:* Memantau kegagalan sistem saat booting awal melalui penyimpanan RTC RAM. Memicu jenjang penyembuhan otomatis (Self-Healing Level 1 sampai 3) jika crash count meningkat.
- **[OtaManager.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/ota/OtaManager.cpp)** / **[OtaManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/ota/OtaManager.h)**
  - *Peran:* Mengurus pembaruan firmware Over-The-Air secara nirkabel dengan watchdog Ticker 1000 ms. Timeout macetnya berbeda per jalur: ArduinoOTA 10 detik dan Cloud OTA 45 detik.
