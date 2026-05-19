---
title: "Storage, Cache, dan OTA Firmware"
---

# Storage, Cache, dan OTA Firmware

Firmware greenhouse menyimpan konfigurasi, cache data sensor, log, credential, dan firmware update. Storage tidak hanya soal tempat menyimpan file, tetapi juga soal kapan aman menulis, bagaimana recovery saat crash, dan bagaimana mencegah data hilang ketika jaringan gagal.

## Jenis Storage

| Storage | Target | Dipakai Untuk |
|---|---|---|
| LittleFS | Node ESP8266 | Config, cache, file update, halaman runtime. |
| RTC memory / SRAM cache | Node | Cache cepat dan recovery record sensor. |
| Flash `PROGMEM` | Node dan gateway | Asset web, sertifikat, string, tabel CRC. |
| Preferences / NVS | Gateway ESP32 | Config dan credential yang persist. |
| SD Card | Gateway | Log CSV, data QoS, log operasional. |
| Partisi OTA | Gateway ESP32 | Slot firmware untuk update lebih aman. |

## Cache Data Sensor

Cache menjaga data ketika upload gagal. Data sensor bisa dibuat, disimpan, dikirim ulang, lalu dihapus setelah sukses.

Hal penting:

- record perlu punya panjang dan CRC,
- queue perlu tahu head/tail,
- record gagal baca tidak boleh menghapus semua cache,
- cache penuh perlu backpressure,
- data live perlu emergency queue jika storage utama bermasalah.

Edge case:

- listrik mati saat write,
- CRC mismatch pada satu record,
- record terkirim tetapi gagal dihapus,
- data terkirim ke gateway dan cloud dengan status yang tidak sinkron,
- cache LittleFS penuh,
- RTC cache hilang setelah reset tertentu.

## Konfigurasi

Konfigurasi firmware meliputi:

- token upload,
- token OTA,
- URL API,
- gateway host/IP,
- Wi-Fi credential,
- password admin,
- mode cloud/edge/auto,
- calibration.

Node memakai buffer ukuran tetap dan config manager. Gateway memakai Preferences/NVS dan halaman portal.

Edge case:

- config lama punya format berbeda,
- token kosong perlu fallback atau penolakan jelas,
- URL HTTP plain perlu dibatasi jika insecure mode tidak diizinkan,
- credential perlu disimpan tanpa bocor ke log,
- perubahan config perlu memicu service yang bergantung pada config.

## OTA

OTA adalah pembaruan firmware lewat jaringan. Project ini punya beberapa jalur:

- ArduinoOTA,
- web OTA lokal,
- cloud OTA,
- file update yang ditulis ke filesystem lalu di-flash,
- boot guard untuk mendeteksi boot gagal.

OTA perlu pause atau menunda pekerjaan lain karena update firmware memakai waktu dan memori besar.

Risiko OTA:

- firmware tidak cocok board,
- ruang flash tidak cukup,
- download putus,
- file `.bin` kosong atau rusak,
- watchdog reset di tengah update,
- update sukses tetapi boot berikutnya crash,
- token OTA salah atau endpoint salah.

## Boot Recovery

Boot manager dan boot guard membantu firmware pulih dari crash berulang. Recovery bisa berupa:

- hapus cache sensor,
- format filesystem,
- masuk safe mode portal,
- clear crash counter setelah stabil.

Ini penting karena perangkat greenhouse tidak selalu mudah dibongkar fisik.

## Flash Wear

Flash punya batas tulis. Menulis config atau schedule terlalu sering bisa mempercepat aus. Karena itu gateway menulis hasil cloud ke NVS hanya jika berubah, dan cache perlu batching/flush yang masuk akal.

## File yang Relevan

- [node/lib/NodeCore/storage/CacheManager.h](../14-complete-file-walkthrough/node/lib/NodeCore/storage/CacheManager.h.md)
- [node/lib/NodeCore/storage/RtcManager.h](../14-complete-file-walkthrough/node/lib/NodeCore/storage/RtcManager.h.md)
- [node/lib/NodeCore/api/ApiClient.QueueStorage.cpp](../14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.QueueStorage.cpp.md)
- [node/lib/NodeCore/api/ApiClient.QueueEmergency.cpp](../14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.QueueEmergency.cpp.md)
- [node/lib/NodeCore/ota/OtaManager.h](../14-complete-file-walkthrough/node/lib/NodeCore/ota/OtaManager.h.md)
- [node/lib/NodeCore/ota/BootGuard.h](../14-complete-file-walkthrough/node/lib/NodeCore/ota/BootGuard.h.md)
- [node/src/BootManager.cpp](../14-complete-file-walkthrough/node/src/BootManager.cpp.md)
- [gateway/src/SDCardLogger.cpp](../14-complete-file-walkthrough/gateway/src/SDCardLogger.cpp.md)
- [gateway/partitions_custom.csv](../14-complete-file-walkthrough/config/gateway/partitions_custom.csv.md)
