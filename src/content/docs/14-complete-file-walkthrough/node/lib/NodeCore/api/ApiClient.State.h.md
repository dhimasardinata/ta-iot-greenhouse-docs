---
title: "node/lib/NodeCore/api/ApiClient.State.h"
---

# node/lib/NodeCore/api/ApiClient.State.h

File ini mendefinisikan struktur state utama untuk `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.State.h` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini adalah daftar memori kerja `ApiClient`: hasil upload terakhir, mode routing, queue darurat, status upload langsung, state HTTP, runtime transport, dan runtime QoS.

## Kenapa File Ini Ada

Upload data node bukan satu langkah sederhana. Node perlu menyimpan data saat offline, memilih target upload, mencoba fallback, mengukur QoS, dan menahan upload saat OTA. Semua status tersebut dikelompokkan di file ini.

## Isi Penting

| Bagian | Fungsi |
|---|---|
| `UploadResult` | Hasil HTTP terakhir: kode, sukses/gagal, dan pesan pendek. |
| `EmergencyRecord` | Snapshot sensor kecil untuk kondisi darurat/backpressure. |
| `RoutingState` | Mode upload, target cloud/edge, relay pin, dan status gateway. |
| `QueueState` | Status queue RTC/LittleFS, recovery pop, dan emergency ring buffer. |
| `ImmediateUploadState` | Status permintaan upload langsung dari terminal atau loop. |
| `OperationalState` | Timer, akumulator sampel, status upload, failure counter, dan pause flag. |
| `TransportRuntime` | Host/path cloud-edge, state HTTP, client aktif, dan response terakhir. |
| `QosRuntime` | State pengujian QoS dan statistik latensi. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ConfigManager.h` | Memakai `UplinkMode` dan `AppConfig`. |
| `IntervalTimer` | Timer pengiriman data, sampling, cache, dan watchdog software. |
| `ESP8266HTTPClient` / `ESP8266WiFi` | Tipe transport HTTP dan Wi-Fi client. |
| `ApiClient.Context.h` | Membungkus state ini ke context controller. |

## Catatan Desain

State dipisah per area agar lebih mudah dipahami: routing, queue, immediate upload, operational timer, transport HTTP, dan QoS. Ini membuat controller bisa fokus ke satu tanggung jawab.

## Error Handling

Beberapa field memang disiapkan untuk recovery: `popFailStreak`, `popRetryAfter`, `rtcFallbackFsFailStreak`, `emergencyBackpressure`, dan `consecutiveUploadFailures`.

## Catatan Performa

Emergency queue memakai `std::array` kapasitas tetap 16. Ini menghindari alokasi dinamis saat kondisi memori sedang buruk.

## Catatan Debugging

Jika ada bug upload yang sulit dilacak, baca state ini dulu. Banyak gejala seperti relay terus aktif, queue tidak habis, atau upload pause akan terlihat dari field di file ini.

## Hubungan dengan Laporan TA

File ini menjelaskan bagaimana node tetap punya ingatan internal saat jaringan tidak stabil dan upload harus dicoba ulang.
