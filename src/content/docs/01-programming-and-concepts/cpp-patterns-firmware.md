---
title: "Pola C++ di Firmware"
description: "Penjelasan ramah pemula tentang pola C++ yang muncul di firmware node dan gateway, termasuk CRTP, observer, facade, controller split, state machine, dan singleton."
---

# Pola C++ di Firmware

Halaman ini menjelaskan pola desain C++ yang muncul di firmware node dan gateway. Tujuannya bukan menghafal nama pola, tetapi memahami kenapa kode terlihat seperti itu.

Anggap pola desain seperti kebiasaan menyusun alat kerja. Kalau alatnya selalu diletakkan di tempat yang sama, teknisi lain lebih cepat menemukan bagian yang harus dibaca.

## Ringkasan Cepat

| Pola | Arti Sederhana | Contoh di Project |
|---|---|---|
| CRTP | Interface umum, tetapi keputusan fungsi dibuat saat build. | `ISensorManager<SensorManager>`, `ICacheManager<CacheManager>`, `IAuthManager<DiagnosticsTerminal>`. |
| Observer | Satu modul memberi kabar ke modul lain saat ada perubahan. | `IWifiStateObserver`, `IConfigObserver`. |
| Facade | Satu pintu masuk agar modul lain tidak perlu tahu detail rumit. | `ApiClient`. |
| Controller split | Pekerjaan besar dipecah ke controller kecil. | `ApiClientTransportController`, `ApiClientQueueController`, `ApiClientQosController`. |
| State machine | Program bergerak antar status yang jelas. | `Application::State`, `SensorManager::State`, `HttpState`, `GprsSetupStage`. |
| Singleton/static callback bridge | Satu instance dipakai oleh callback library C/Arduino. | `WebSocketManager::_instance`, `HealthMonitor::instance()`. |
| Command object | Setiap command terminal punya class kecil sendiri. | `LoginCommand`, `SetWifiCommand`, `ReadSensorsCommand`, `QosUploadCommand`. |

## CRTP: Interface Tanpa Virtual Call

CRTP adalah singkatan dari **Curiously Recurring Template Pattern**. Bentuknya terlihat aneh karena class turunan memasukkan namanya sendiri ke class basis:

```cpp
class SensorManager : public ISensorManager<SensorManager> {
  friend class ISensorManager<SensorManager>;
};
```

Maknanya:

1. `ISensorManager` menyediakan nama fungsi umum yang konsisten.
2. `SensorManager` tetap menjadi tempat kerja sebenarnya.
3. Compiler sudah tahu tipe akhirnya saat build, jadi tidak perlu mencari fungsi lewat virtual table saat runtime.

Di firmware kecil, ini berguna karena loop utama harus ringan dan RAM terbatas. CRTP cocok ketika tipenya sudah jelas sejak awal, misalnya satu `SensorManager` konkret untuk firmware node.

CRTP kurang cocok jika satu daftar harus menyimpan banyak tipe berbeda. Untuk kasus itu project tetap memakai interface virtual, misalnya observer konfigurasi.

## Observer: Modul Diberi Kabar Saat Ada Perubahan

Observer dipakai ketika satu modul perlu memberi tahu modul lain tanpa tahu detail isi modul penerima.

Contohnya:

- `WifiManager` dapat memberi kabar ke `AppServer`, `PortalServer`, atau `NtpClient` lewat `IWifiStateObserver`.
- `ConfigManager` dapat memberi kabar ke `Application` lewat `IConfigObserver`.

Pola ini membuat kode lebih rapi karena modul Wi-Fi tidak perlu langsung memanggil semua detail server, portal, atau waktu. Ia cukup mengirim event.

## Facade: Satu Pintu Masuk

`ApiClient` adalah contoh facade. Modul lain cukup memanggil `ApiClient`, tanpa harus tahu detail:

- target cloud atau gateway,
- TLS/BearSSL,
- cache RTC dan LittleFS,
- emergency queue,
- HMAC signature,
- QoS,
- state machine HTTP.

Facade membuat pemanggil lebih mudah dibaca. Detail rumit tetap ada, tetapi disembunyikan di balik API yang lebih stabil.

## Controller Split: File Besar Dipecah Tanpa Mengubah API

Setelah `ApiClient` punya banyak pekerjaan, implementasinya dipisah ke controller kecil:

- `ApiClientTransportController` untuk koneksi HTTP/TLS,
- `ApiClientQueueController` untuk antrean cache,
- `ApiClientUploadRuntimeController` untuk siklus upload berkala,
- `ApiClientQosController` untuk pengujian kualitas link.

Ini bukan pola untuk membuat kode terlihat rumit. Justru tujuannya agar pembaca bisa fokus: kalau masalahnya HTTP, baca transport; kalau masalahnya cache, baca queue.

## State Machine: Status Jelas, Transisi Jelas

Firmware berjalan terus di loop. Agar tidak kacau, banyak modul memakai state machine.

Contoh:

- `Application::State`: `INITIALIZING`, `SENSOR_STABILIZATION`, `CONNECTING`, `RUNNING`, `UPDATING`, `FLASHING_FIRMWARE`.
- `SensorManager::State`: `INITIALIZING`, `RUNNING`, `RECOVERY`, `PAUSED`.
- `ApiClient::HttpState`: `CONNECTING`, `SENDING_REQUEST`, `WAITING_RESPONSE`, `READING_RESPONSE`, `COMPLETE`, `FAILED`.
- Gateway memakai `GprsSetupStage` dan `WiFiState` untuk koneksi jaringan.

Cara membaca state machine:

1. Cari enum statusnya.
2. Cari fungsi yang mengubah status.
3. Cari kondisi timeout atau error.
4. Ikuti satu transisi dari awal sampai selesai.

## Singleton dan Static Callback Bridge

Beberapa library Arduino/ESP memakai callback gaya C atau static function. Callback seperti ini tidak selalu bisa membawa objek C++ biasa. Karena itu firmware kadang memakai satu pointer static ke instance aktif.

Contoh gateway:

```cpp
WebSocketManager* WebSocketManager::_instance = nullptr;
```

Ini membuat callback WebSocket bisa kembali memanggil objek `WebSocketManager` yang memegang referensi ke sensor, relay, network, dan RTC.

Pola ini praktis untuk embedded, tetapi harus dipakai hati-hati. Cocok jika memang hanya ada satu manager di perangkat. Tidak cocok jika nanti perlu banyak instance independen.

## Command Object: Satu Perintah, Satu Class

Terminal node memiliki banyak perintah. Daripada semua logika command ditumpuk dalam satu fungsi besar, banyak perintah dibuat sebagai class kecil yang mengikuti `ICommand`.

Contoh:

- `LoginCommand`,
- `SetWifiCommand`,
- `SetTokenCommand`,
- `ReadSensorsCommand`,
- `QosUploadCommand`,
- `FactoryResetCommand`.

Keuntungannya, operator bisa menambah atau memperbaiki satu command tanpa membaca seluruh terminal.

## Cara Membaca File yang Memakai Pola

Gunakan urutan ini:

1. Baca file `.h` untuk melihat bentuk class, enum, dan fungsi publik.
2. Cari nama pola dari bentuknya: `template <typename Derived>` biasanya CRTP, `on...Changed()` biasanya observer, enum status biasanya state machine.
3. Buka file `.cpp` yang namanya sama untuk melihat pekerjaan nyata.
4. Cari fungsi `begin()`, `handle()`, `loop()`, `update()`, atau `process()` karena biasanya dipanggil rutin dari loop utama.
5. Jangan langsung membaca semua file controller. Pilih controller sesuai masalah yang sedang dicari.

Lanjutkan ke [Pembacaan Sensor & Bus I2C](../06-firmware-node/pembacaan-sensor.md) untuk melihat contoh CRTP pada `SensorManager`, atau ke [Referensi File Node](../06-firmware-node/file-reference/index.md) untuk melihat pembagian file-by-file.
