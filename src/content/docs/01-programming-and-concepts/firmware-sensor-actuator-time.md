---
title: "Sensor, Aktuator, dan Waktu Firmware"
---

# Sensor, Aktuator, dan Waktu Firmware

Di dalam sistem greenhouse, firmware berinteraksi langsung dengan lingkungan fisik. Sensor membaca parameter lingkungan, modul pemrosesan menormalkan dan mengalibrasi data tersebut, pengatur waktu memastikan sinkronisasi aksi, dan aktuator (relay) mengubah kondisi fisik di dalam greenhouse.

---

## 1. Sensor: Pengumpulan dan Normalisasi Data

Firmware membaca data fisik dari berbagai sensor lingkungan:
- **SHT3x / SHT2x** untuk mengukur suhu (°C) dan kelembapan relatif (%).
- **BH1750** untuk mengukur intensitas cahaya (Lux).
- **Wi-Fi RSSI** untuk memantau kekuatan sinyal jaringan.

Agar data dari sensor dapat dipercaya, firmware melakukan sanitasi dan normalisasi di [SensorNormalization.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/sensor/SensorNormalization.h) sebelum data dipaketkan.

### Validasi dan Normalisasi Nilai Sensor
Firmware memastikan data berada pada batas fisik yang logis menggunakan fungsi pembatas (*clamp*) dan pengecekan nilai tidak valid (`isfinite`):
```cpp
inline bool normalizeTemperature(float& value) {
  if (!isfinite(value))
    return false;
  if (value < -40.0f) value = -40.0f;
  if (value > 100.0f) value = 100.0f;
  return true;
}
```

### Kalibrasi Sensor
Sensor fisik sering kali memiliki deviasi pembacaan. Firmware menerapkan konfigurasi kalibrasi menggunakan offset penjumlahan untuk suhu dan kelembapan, serta faktor pengali untuk intensitas cahaya:
- **Suhu Efektif**: Suhu Raw + Offset (didefinisikan di [calibration.h](file:///home/dhimasardinata/Dokumen/ta/node/include/config/calibration.h)).
- **Intensitas Cahaya Efektif**: Lux Raw × Scaling Factor (misalnya faktor 1.2 untuk kompensasi kaca greenhouse).

Semua logika ini dibungkus dalam [SensorManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/sensor/SensorManager.h) pada tingkat node, dan diagregasikan di [SensorDataManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SensorDataManager.cpp) pada tingkat gateway.

---

## 2. Aktuator: Pengendalian Relay dan SSR

Gateway berfungsi untuk mengendalikan aktuator fisik (seperti kipas *exhaust*, blower, *dehumidifier*, pompa air, dan lampu LED grow light) melalui modul relay/SSR.

Sistem kontrol relay diatur pada [RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp). Keputusan untuk menyalakan/mematikan relay didasarkan pada tiga mode:
1. **Manual Mode**: Perintah paksa langsung dari pengguna (Cloud/Web UI).
2. **Threshold Mode**: Relay aktif jika nilai sensor berada di luar batas aman yang dikonfigurasi. Validasi threshold ini dilakukan melalui [ThresholdValidation.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/ThresholdValidation.h).
3. **Schedule Mode**: Relay aktif berdasarkan rentang waktu tertentu. Validasi format jadwal waktu dikelola di [ScheduleValidation.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/ScheduleValidation.h).

### Logika Failsafe Aktuator
Untuk mencegah aktuator menyala/mati terlalu cepat yang dapat merusak perangkat (misal kompresor AC), [RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp) menerapkan batas waktu jeda aman (*cooldown* atau *hold time*). Selain itu, jika data sensor terdeteksi kedaluwarsa (*stale data*) karena node mati, sistem otomatis mematikan aktuator sebagai langkah pengamanan (*failsafe*).

---

## 3. Sinkronisasi Waktu (Time Management)

Waktu yang presisi sangat krusial untuk:
- Memberikan timestamp yang valid pada data sensor untuk visualisasi grafik.
- Mengeksekusi jadwal kontrol aktuator secara akurat.
- Melindungi komunikasi data dari serangan *replay protection*.

Gateway mengelola sinkronisasi waktu lewat [RTCManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RTCManager.cpp). Kode mencoba memakai RTC fisik DS3231 jika tersedia dan valid, lalu memiliki jalur sinkronisasi lain seperti NTP, HTTP time, atau waktu modem.

### Sumber Waktu Cadangan (Multi-Source Time)
Gateway dapat menyinkronkan waktunya dari tiga sumber utama secara hierarkis:
1. **NTP Server**: Melalui koneksi Wi-Fi ketika terhubung ke internet.
2. **GSM Network Time**: Dari jaringan seluler lewat modem GPRS jika Wi-Fi mati.
3. **HTTP Time Header**: Mengekstrak header `Date` dari response API server sebagai fallback terakhir saat port NTP diblokir.

Waktu aktual yang tersinkronisasi ditampilkan secara langsung di layar LCD lokal melalui [LCDDisplay.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/LCDDisplay.cpp).
