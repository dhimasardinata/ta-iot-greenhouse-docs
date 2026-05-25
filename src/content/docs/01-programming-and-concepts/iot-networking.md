---
title: "IoT Networking Concepts"
---

# IoT Networking Concepts

Jaringan IoT (Internet of Things) adalah fondasi dasar yang memungkinkan node sensor, gateway, web dashboard, dan aplikasi Android saling berkomunikasi. Tanpa pemahaman konsep jaringan yang solid, sangat sulit untuk mendeteksi di mana masalah terjadi ketika data sensor gagal muncul di layar monitor.

---

## 1. Lapisan Komunikasi Proyek (Networking Layers)

Dalam sistem greenhouse ini, jaringan dibagi menjadi beberapa lapisan tanggung jawab untuk mempermudah pelacakan error:

| Lapisan | Deskripsi | Contoh Kasus di Proyek | File Terkait |
| :--- | :--- | :--- | :--- |
| **Physical / Radio** | Pengiriman bit data melalui gelombang udara atau kabel. | Membaca kekuatan Wi-Fi RSSI atau mengaktifkan modul seluler SIM800. | [MyNetworkManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/MyNetworkManager.h) |
| **IP / DNS** | Pengalamatan perangkat dan pencarian host tujuan. | Mengubah alamat host API domain menjadi alamat IP dinamis. | [MyNetworkManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/MyNetworkManager.cpp) |
| **Transport** | Pengiriman data yang aman dan andal melalui protokol internet. | Melakukan jabat tangan (*handshake*) TLS untuk membuat sesi HTTPS. | [ApiClient.Transport.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.Transport.cpp) |
| **Application** | Format pesan yang dipahami oleh penerima dan pengirim. | Mengirim parameter sensor dalam format JSON ke controller Laravel. | [ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php) |
| **Operational** | Kebijakan sistem saat menghadapi ketidakstabilan jaringan. | Menyimpan data ke flash lokal ketika upload gagal dan mencobanya lagi nanti. | [CacheManager.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/CacheManager.cpp) |

---

## 2. Kontrak Payload JSON

Untuk menjaga kelancaran alur data dari perangkat keras ke perangkat lunak, sistem menerapkan kontrak skema data yang ketat.

Struktur data pembacaan sensor fisik didefinisikan pertama kali di tingkat C++ firmware pada [SensorData.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/sensor/SensorData.h):
```cpp
struct SensorReading {
  float value;
  bool isValid;
};
```

Data ini kemudian dikonversi menjadi payload JSON untuk dikirimkan melalui REST API. Endpoint penerima pada [ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php) memetakan field-field tersebut secara dinamis ke dalam database melalui fungsi `saveSensorData`:
- `gh_id` (ID Greenhouse)
- `node_id` (ID Node Sensor)
- `temperature` / `temp` (Suhu dalam °C)
- `humidity` / `hum` (Kelembapan Relatif dalam %)
- `light_intensity` / `light` / `lux` (Intensitas Cahaya)
- `rssi` (Kekuatan Sinyal Wi-Fi)
- `recorded_at` (Waktu perekaman data)

Jika terjadi inkonsistensi nama field (misalnya firmware mengirim `temp` sementara backend mencari `temperature`), data sensor akan gagal di-parsing dan dibuang.

---

## 3. Timeout, Retry, dan Backoff

Pada jaringan nirkabel lapangan, kegagalan request adalah hal yang lumrah. Sistem menerapkan tiga strategi utama:
- **Timeout**: Membatasi berapa lama firmware harus menunggu response. Di [MyNetworkManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/MyNetworkManager.cpp), timeout untuk request seluler GPRS dibuat lebih longgar dibanding Wi-Fi karena latensi koneksi seluler jauh lebih tinggi.
- **Retry**: Mencoba mengirim kembali data yang gagal. Namun, retry tanpa jeda (*immediate retry*) dapat membanjiri server yang sedang down (*thundering herd problem*).
- **QoS & Cache**: Jika batas retry habis, data sensor akan dialihkan ke memori RTC/LittleFS lokal untuk dikirimkan secara kolektif saat jaringan pulih kembali.

---

## Modul Pembelajaran Lanjutan

Untuk mempelajari bagaimana konsep ini diimplementasikan di tingkat kode, silakan merujuk pada materi berikut:
- [Runtime Jaringan Firmware](./firmware-network-runtime.md)
- [GPRS dan Fallback Gateway](./gateway-gprs-fallback.md)
- [Laravel API dan Database Query](./web-laravel-api-database.md)
- [Vue Reactivity dan UI Greenhouse](./web-vue-reactivity-ui.md)
- [Security, OTA, and Cache](./security-ota-cache.md)
