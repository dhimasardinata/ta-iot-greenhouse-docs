---
title: "node/lib/NodeCore/api/ApiClient.h"
---

# node/lib/NodeCore/api/ApiClient.h

File ini adalah kontrak utama klien API firmware node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.h` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`ApiClient.h` mendefinisikan class `ApiClient`, yaitu pintu utama untuk mengirim data sensor, mengatur mode upload, menangani queue/cache, menjalankan QoS test, dan menjaga fallback cloud, relay, atau gateway lokal.

## Kenapa File Ini Ada

Tanpa facade ini, modul lain harus tahu detail HTTP, TLS, cache RTC, LittleFS, emergency queue, gateway mode, dan QoS secara langsung. File ini menyatukan semua itu menjadi API yang lebih jelas untuk `Application`, command terminal, dan modul OTA.

## Isi Penting

| Bagian | Fungsi |
|---|---|
| `enum class UploadMode` | Memilih upload otomatis, paksa cloud, atau paksa edge/gateway lokal. |
| Constructor `ApiClient(...)` | Menerima dependency utama seperti WebSocket, NTP, Wi-Fi, sensor, TLS client, config, cache, dan trust anchor. |
| `init`, `applyConfig`, `handle` | Lifecycle utama klien API. |
| `scheduleImmediateUpload`, `requestImmediateUpload` | Meminta pengiriman data langsung dari loop utama. |
| `requestQosUpload`, `requestQosOta` | Menjalankan pengujian kualitas jalur upload/OTA. |
| `pause`, `resume`, `setOtaInProgress` | Menahan upload saat sistem sedang dalam kondisi khusus. |
| Private helper | Mengatur buffer, TLS, queue, payload, upload state machine, fallback, dan QoS. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ApiClient.Context.h` | Menyediakan state, policy, resource, dan context bersama. |
| `ConfigManager` | Sumber endpoint, token, mode, dan interval upload. |
| `CacheManager` | Penyimpanan cache data saat upload tertunda. |
| `SensorManager` | Sumber data sensor untuk payload. |
| `WifiManager` | Status koneksi dan gateway lokal. |
| `AsyncWebSocket` | Broadcast status terenkripsi ke terminal/web lokal. |

## Alur Kerja

1. `Application` membuat `ApiClient` dengan dependency firmware.
2. `init()` dan `applyConfig()` menyiapkan timer, endpoint, mode, dan state awal.
3. `handle()` dipanggil berkala dari loop utama.
4. Jika waktunya kirim data, payload dibuat dan disimpan dulu.
5. Upload diarahkan ke cloud, relay, atau gateway lokal sesuai mode dan hasil fallback.

## Catatan Desain

Class ini memakai pola facade. Implementasi detail dipisah ke controller kecil seperti lifecycle, control, queue, transport, upload, runtime, dan QoS supaya file implementasi tidak menjadi satu class besar yang sulit dirawat.

## Error Handling

File header ini belum mengeksekusi error handling langsung, tetapi ia mendeklarasikan mekanisme penting seperti `UploadResult`, recovery queue, backoff, emergency queue, dan fallback relay/gateway.

## Catatan Keamanan

Bagian API ini memegang jalur token, HMAC signature, TLS trust anchor, serta mode insecure fallback. Perubahan di file ini harus hati-hati karena bisa mempengaruhi keamanan upload data dan OTA.

## Catatan Debugging

Jika upload tidak jalan, baca file ini untuk mencari pintu masuk public method yang dipanggil modul lain, lalu lanjut ke controller atau `.cpp` sesuai nama helper private yang dipakai.

## Hubungan dengan Laporan TA

File ini adalah pusat komunikasi node ke sistem monitoring. Ia menjelaskan bagaimana node menjaga data tetap terkirim walaupun koneksi tidak selalu stabil.
