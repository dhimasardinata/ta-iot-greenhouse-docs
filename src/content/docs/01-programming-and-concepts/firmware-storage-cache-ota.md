---
title: "Storage, Cache, dan OTA Firmware"
---

# Storage, Cache, dan OTA Firmware

Penyimpanan lokal pada firmware memegang peranan krusial saat konektivitas terputus. Sistem IoT pada greenhouse ini menggunakan berbagai jenis media penyimpanan untuk mengelola konfigurasi, mencatat data sensor sementara (*caching*), dan memfasilitasi pembaruan sistem nirkabel (*Over-The-Air* atau OTA).

---

## 1. Jenis Media Penyimpanan (Storage)

Tabel berikut menunjukkan pembagian tanggung jawab media penyimpanan di tingkat Node (ESP8266) dan Gateway (ESP32):

| Media Penyimpanan | Perangkat | Deskripsi Penggunaan | File Terkait |
| :--- | :--- | :--- | :--- |
| **LittleFS** | Node | Menyimpan file konfigurasi statis, buffer data sensor darurat, dan file aset web lokal. | [CacheManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/CacheManager.h) |
| **RTC User Memory** | Node | Penyimpanan RAM yang tetap hidup selama *deep sleep* atau setelah *software crash*. Digunakan untuk antrean sensor berkecepatan tinggi. | [RtcManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/RtcManager.h) |
| **Preferences (NVS)** | Gateway | Menyimpan konfigurasi seperti kredensial Wi-Fi/GPRS, pengaturan GPRS, dan beberapa state kontrol/threshold. | [ConfigManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/ConfigManager.cpp) |
| **SD Card** | Gateway | Penyimpanan jangka panjang untuk log CSV dari data sensor IoT dan QoS jaringan. | [SDCardLogger.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SDCardLogger.cpp) |
| **Partisi Flash Khusus**| Gateway | Skema pembagian ruang flash ESP32 untuk membagi slot aplikasi utama dan slot OTA. | `gateway/partitions_custom.csv` |

---

## 2. Manajemen Antrean Cache Data Sensor

Saat jaringan terputus, data sensor tidak boleh hilang. Firmware mengimplementasikan sistem antrean data berlapis:

1. **RTC Cache**: Data sensor ditulis pertama kali ke memori RTC yang cepat menggunakan [RtcManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/RtcManager.h).
2. **LittleFS Backup**: Jika koneksi terputus cukup lama hingga RTC penuh, data dipindahkan ke file flash LittleFS melalui [ApiClient.QueueStorage.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.QueueStorage.cpp).
3. **Emergency Queue**: Jika LittleFS mengalami error baca/tulis, data dialihkan ke antrean darurat RAM yang dikelola di [ApiClient.QueueEmergency.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.QueueEmergency.cpp).

### Integritas Data dengan CRC
Setiap record data sensor yang disimpan dalam cache dilengkapi dengan checksum CRC. Saat data dibaca kembali untuk dikirim ke server, CRC dihitung ulang dan dicocokkan. Record yang korup akan langsung dieliminasi secara terisolasi tanpa merusak sisa file cache lainnya.

---

## 3. Proses Pembaruan Firmware (OTA) dan Boot Guard

Pembaruan firmware jarak jauh (*Over-The-Air*) dikelola secara aman oleh [OtaManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/ota/OtaManager.h). Selama proses OTA berjalan, firmware akan menangguhkan pembacaan sensor dan transmisi data untuk menghindari kelangkaan memori dan gangguan watchdog.

### Proteksi Boot Loop Menggunakan BootGuard
Salah satu risiko terbesar OTA adalah firmware baru berhasil di-flash tetapi mengalami crash berulang (*boot loop*) sesaat setelah dinyalakan. Untuk mengantisipasi ini, sistem menggunakan modul **BootGuard** ([BootGuard.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/ota/BootGuard.h)):

1. Saat boot awal, firmware meningkatkan nilai `crashCount` di memori RTC stabil.
2. Jika firmware berjalan stabil cukup lama, fungsi `markStable()` dipanggil dari `main.cpp` untuk mereset `crashCount` kembali ke `0`.
3. Jika perangkat crash sebelum stabil, `crashCount` akan meningkat. [BootManager.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/BootManager.cpp) memakai level counter ini untuk menghapus `/cache.dat`, memformat LittleFS pada level lebih tinggi, atau melakukan cooldown/restart. Source yang terlihat tidak menunjukkan rollback otomatis ke partisi firmware cadangan.

Struktur penyimpanan data diagnostik BootGuard dirancang aman menggunakan checksum internal:
```cpp
struct alignas(4) RtcData {
  uint32_t magic;
  uint32_t crashCount;
  uint32_t lastReasonRaw;  // Alasan reboot terakhir (RebootReason)
  uint32_t lastCrashTime;  // Timestamp untuk melacak tingkat crash rate
  uint32_t crc;
};
```
Fungsi `calculateCRC` memastikan data diagnostik ini tidak rusak selama proses boot paksa atau gangguan tegangan listrik (*brownout*).
