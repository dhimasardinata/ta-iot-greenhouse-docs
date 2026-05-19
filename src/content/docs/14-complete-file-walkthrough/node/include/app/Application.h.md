---
title: "node/include/app/Application.h"
---

# node/include/app/Application.h

File ini mendeklarasikan class `Application`, yaitu pengatur lifecycle utama firmware node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/app/Application.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas memberi daftar fungsi, state, service, timer, dan data internal yang dipakai `Application.cpp`.

## Kenapa File Ini Ada

File `.h` dibutuhkan agar file lain tahu bentuk class `Application` tanpa perlu membaca implementasi lengkapnya. `main.cpp` memakai header ini untuk membuat object `Application`.

## Isi Utama

| Bagian | Fungsi |
|---|---|
| Forward declaration | Mengurangi include berat dengan cukup menyebut nama class. |
| `ApplicationServices` | Wadah reference ke semua service yang dibutuhkan aplikasi. |
| `Application::State` | Daftar state lifecycle node. |
| `init()` | Memulai aplikasi. |
| `loop()` | Menjalankan aplikasi terus-menerus. |
| `onConfigUpdated()` | Callback saat konfigurasi berubah. |

## ApplicationServices

`ApplicationServices` mengumpulkan dependency utama seperti `ConfigManager`, `WifiManager`, `NtpClient`, `SensorManager`, `ApiClient`, `OtaManager`, `AppServer`, dan `PortalServer`. `DiagnosticsTerminal` dibuat pointer karena terminal diset setelah object lain siap.

## Konsep Dasar yang Perlu Dipahami

- `class` adalah cetakan object.
- `enum class` adalah daftar pilihan state yang lebih aman daripada angka biasa.
- Reference seperti `ConfigManager&` berarti service wajib ada dan tidak boleh kosong.
- `override` menandakan fungsi berasal dari interface `IConfigObserver`.
- `Ticker` dipakai untuk timer callback pada ESP8266.

## Variabel Penting

| Variabel | Fungsi |
|---|---|
| `m_state` | Menyimpan state aplikasi saat ini. |
| `m_stateTimer` | Timer untuk perpindahan state, misalnya stabilisasi sensor. |
| `m_loopWdTimer` | Watchdog software untuk mendeteksi loop terlalu lambat. |
| `m_healthCheckTimer` | Timer pemeriksaan kesehatan sistem. |
| `m_otaTimer` | Timer throttle untuk `ArduinoOTA.handle()`. |
| `m_arduinoOtaWatchdog` | Watchdog khusus sesi Arduino OTA. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `interfaces/IConfigObserver.h` | Kontrak callback saat konfigurasi berubah. |
| `system/IntervalTimer.h` | Timer ringan berbasis interval. |

## Error Handling

Header ini tidak menjalankan error handling langsung. Ia menyediakan struktur data yang dipakai `Application.cpp` untuk boot loop guard, OTA watchdog, dan maintenance reboot.

## Bagian untuk Pemula

Anggap file ini sebagai daftar isi teknis untuk `Application.cpp`. Jika ingin memahami cara kerjanya, baca header ini dulu untuk melihat nama state dan fungsi, lalu lanjut ke implementasinya.

## Hubungan dengan Laporan TA

File ini berhubungan dengan rancangan state machine firmware node dan pembagian modul agar node lebih mudah diuji serta dipelihara.
