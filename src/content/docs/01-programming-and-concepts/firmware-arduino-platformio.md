---
title: "Stack Firmware Arduino dan PlatformIO"
---

# Stack Firmware Arduino dan PlatformIO

Firmware di project ini dibangun dengan PlatformIO dan framework Arduino. Node memakai ESP8266, sedangkan gateway memakai ESP32. Keduanya sama-sama C++, tetapi library, memori, dan peripheral yang tersedia tidak identik.

## PlatformIO

`platformio.ini` adalah pusat konfigurasi build firmware. File ini menentukan board, framework, library, filesystem, flag compiler, dan environment upload.

Di node:

- platform `espressif8266`,
- framework `arduino`,
- filesystem `littlefs`,
- standard C++ `gnu++20`,
- warning ketat di source,
- flag ukuran dan garbage collection seperti `-ffunction-sections`, `-fdata-sections`, dan `-Wl,--gc-sections`,
- opsi low memory untuk lwIP.

Di gateway:

- platform `espressif32`,
- board `esp32dev`,
- framework `arduino`,
- custom partition table,
- environment `gh1` dan `gh2`,
- macro build untuk URL, GH ID, dan firmware version ID.

## Arduino Framework

Arduino menyediakan fungsi dan object umum:

- `setup()` dan `loop()`,
- `Serial`,
- `String`,
- `millis()`,
- Wi-Fi library,
- filesystem helper,
- OTA helper,
- macro flash string seperti `F()` dan `PROGMEM`.

Pada firmware besar, `setup()` biasanya hanya menjadi bootstrap. Setelah service dibuat, logic dipindah ke class seperti `Application`, `ApiClient`, `WifiManager`, `SensorManager`, atau `RelayController`.

## ESP8266 vs ESP32

| Area | Node ESP8266 | Gateway ESP32 |
|---|---|---|
| RAM | Lebih sempit, perlu guard heap agresif. | Lebih longgar, tetapi tetap perlu jaga fragmentasi. |
| TLS | BearSSL dan buffer perlu hemat. | TLS juga berat, tetapi RAM lebih besar. |
| Storage | LittleFS dan RTC memory/cache. | Preferences/NVS, SD Card, partisi OTA. |
| Jaringan tambahan | Wi-Fi utama. | Wi-Fi dan GPRS/SIM800 lewat TinyGSM. |
| UI lokal | Portal, dashboard node, terminal. | Portal gateway, WebSerial, WebSocket dashboard. |

## Library Firmware yang Terlihat

| Library / API | Area | Fungsi |
|---|---|---|
| `ESPAsyncWebServer` | Node dan gateway | HTTP route, portal, local dashboard, WebSocket. |
| `AsyncWebSocket` | Node dan gateway | Terminal dan update status realtime. |
| `ESP8266WiFi` / `WiFi` | Node/gateway | Koneksi Wi-Fi dan RSSI. |
| `WiFiClientSecureBearSSL` | Node | HTTPS/TLS upload dan OTA. |
| `HTTPClient` | Node/gateway | Request REST API. |
| `LittleFS` | Node | Config/cache/update file. |
| `Preferences` | Gateway | Penyimpanan konfigurasi di NVS. |
| `ArduinoOTA` / `Update` | Node | OTA dan flashing firmware. |
| `ArduinoJson` | Gateway | Parsing dan membuat JSON. |
| `TinyGSM` | Gateway | Koneksi modem SIM800/GPRS. |
| `RTClib`, `NTPClient` | Gateway | Waktu RTC dan sinkronisasi jaringan. |
| `LiquidCrystal_I2C` | Gateway | LCD 20x4. |
| `BH1750`, `arduino-sht` | Node | Sensor cahaya, suhu, dan kelembapan. |

## Macro Build dan Konfigurasi

Gateway memakai macro build seperti `GH_ID_CONFIG`, `FW_VERSION_ID`, dan URL API. Node memakai file generated seperti `node_config.h` untuk token, URL, firmware version, dan identitas node.

Keuntungannya:

- satu source bisa dibuild untuk beberapa greenhouse,
- data identitas masuk saat build,
- firmware bisa membedakan GH1/GH2 tanpa copy project.

Risikonya:

- perubahan macro perlu rebuild,
- nilai rahasia tidak boleh ditulis ulang sembarangan ke dokumentasi publik,
- mismatch environment bisa membuat firmware salah GH ID atau salah endpoint.

## File yang Relevan

- [node/platformio.ini](../14-complete-file-walkthrough/config/node/platformio.ini.md)
- [gateway/platformio.ini](../14-complete-file-walkthrough/config/gateway/platformio.ini.md)
- [node/src/main.cpp](../14-complete-file-walkthrough/node/src/main.cpp.md)
- [node/src/Application.cpp](../14-complete-file-walkthrough/node/src/Application.cpp.md)
- [gateway/src/main.cpp](../14-complete-file-walkthrough/gateway/src/main.cpp.md)
- [node/include/generated/node_config.h](../14-complete-file-walkthrough/node/include/generated/node_config.h.md)
