---
title: "Array, Object, Struct, dan Enum"
---

# Array, Object, Struct, dan Enum

Halo, rekan developer! Ketika membuat sistem IoT yang kompleks, kita perlu mengelompokkan data agar terorganisasi dengan baik.

Proyek Smart Greenhouse ini memanfaatkan berbagai jenis struktur data seperti **Array**, **Object/JSON**, **Struct (C++)**, dan **Enum (C++)** untuk mengelola aliran informasi dari sensor fisik hingga ke dashboard web.

Mari kita bahas satu per satu secara detail!

---

## 1. Struct (C++) - Contoh: `RtcRecordV2`

**Struct** adalah fitur dalam bahasa C/C++ yang mengelompokkan beberapa variabel dengan tipe data berbeda ke dalam satu wadah berukuran tetap. Ini sangat penting di mikrokontroler untuk mengelola alokasi memori secara efisien.

Buka berkas [node/lib/NodeCore/storage/RtcManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/RtcManager.h):

```cpp
struct alignas(4) RtcRecordV2 {
  uint16_t magic;
  uint16_t seq;
  uint32_t timestamp;
  int16_t temp10;
  int16_t hum10;
  uint16_t lux;
  int16_t rssi;
  uint32_t crc;
};
```

### Mengapa struct ini didesain seperti ini?
1.  **`alignas(4)`**: Memaksa compiler agar meratakan alokasi memori struct ini kelipatan 4-byte, karena hardware ESP8266 membutuhkan akses memori RTC yang terikat dengan arsitektur 32-bit.
2.  **Optimalisasi Tipe Data**:
    *   `temp10` & `hum10` bertipe `int16_t` (integer 16-bit bertanda). Untuk menghemat memori, nilai suhu desimal dikalikan 10 sebelum disimpan (misal: suhu `25.4` °C disimpan sebagai `254`). Trik ini menghindari pemakaian tipe data `float` yang berukuran lebih besar dan lambat diproses.
    *   `magic`: Penanda validitas data (`0xBEEF`).
    *   `crc`: Validasi checksum CRC32 untuk mendeteksi korupsi memori RTC saat perangkat mengalami reboot/crash.
3.  **Ukuran Tetap**: Total ukuran struct ini dijamin tepat 20 byte (`sizeof(RtcRecordV2) == 20`), membuatnya sangat mudah ditulis dan dibaca dari blok memori flash/RTC.

---

## 2. Enum Class (C++) - Contoh: `Application::State`

**Enum (Enumeration)** digunakan untuk mendefinisikan sekumpulan konstanta bernama. Daripada menggunakan angka biasa (*magic numbers*) seperti `0`, `1`, `2` yang membingungkan, enum membuat kode kita jauh lebih ekspresif dan aman dari kesalahan penulisan (*type-safe*).

Buka berkas [node/include/app/Application.h](file:///home/dhimasardinata/Dokumen/ta/node/include/app/Application.h):

```cpp
enum class State {
    INITIALIZING,
    SENSOR_STABILIZATION,
    CONNECTING,
    RUNNING,
    UPDATING,
    FLASHING_FIRMWARE
};
```

Di dalam kode program [node/src/Application.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/Application.cpp), kita menggunakan status di atas untuk mengontrol mesin keadaan (*state machine*) aplikasi:

```cpp
void Application::setState(State newState) {
    m_state = newState;
    m_stateTimer.reset();
    // Jalankan logika transisi state...
}
```

Jika ada developer lain mencoba mengisi status di luar daftar tersebut (misalnya angka acak `99`), compiler C++ akan menolaknya saat proses kompilasi.

---

## 3. Object dan JSON - Contoh: Payload API

**JSON (JavaScript Object Notation)** adalah format pertukaran data berbasis teks yang ringan dan mudah dibaca oleh manusia maupun komputer. JSON merepresentasikan gabungan antara **Object** (kunci-nilai) dan **Array** (daftar).

### A. Payload Pengiriman Data Sensor (JSON Object)
Ketika Node atau Gateway mengirimkan data sensor ke Laravel, data tersebut dibungkus sebagai JSON Object:

```json
{
  "gh_id": 1,
  "node_id": 4,
  "temperature": 25.4,
  "humidity": 82.1,
  "light_intensity": 500,
  "rssi": -65
}
```
Di Laravel [web/ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php), JSON di atas divalidasi dan diurai secara otomatis menjadi variabel database.

### B. Payload Konfigurasi Jadwal (JSON Array of Objects)
Saat mengonfigurasi jadwal otomatisasi pompa/blower dari frontend Vue ke Laravel, datanya dikirim dalam format JSON yang lebih kompleks (Array yang menampung beberapa Object):

```json
{
  "gh_id": 1,
  "schedules": [
    {
      "enabled": true,
      "start_time": "08:00",
      "end_time": "17:00",
      "actuators": {
        "blower": "on",
        "exhaust": "off",
        "dehumidifier": "threshold"
      }
    },
    {
      "enabled": false,
      "start_time": "18:00",
      "end_time": "22:00",
      "actuators": {
        "blower": "threshold",
        "exhaust": "threshold",
        "dehumidifier": "off"
      }
    }
  ]
}
```
Logika pemrosesan array jadwal di atas diimplementasikan pada berkas Laravel [web/ScheduleController.php](file:///home/dhimasardinata/Dokumen/ta/web/ScheduleController.php).

---

## Kesimpulan untuk Developer

*   Gunakan **Struct** di sisi firmware C++ untuk merepresentasikan baris rekaman data sensor di memori fisik yang membutuhkan presisi alokasi byte.
*   Gunakan **Enum** untuk mendefinisikan pilihan status tetap pada mesin keadaan (*state machine*) agar kode tidak dipenuhi angka-angka misterius.
*   Gunakan **JSON** saat berkomunikasi antar-bahasa pemrograman (misalnya mengirim data dari C++ mikrokontroler ke PHP Laravel backend, atau dari Laravel ke JavaScript/Vue frontend).

---

Lanjutkan ke langkah berikutnya: **[Algoritma Dasar](./algoritma-dasar.md)**.
