---
title: "node/lib/NodeCore/api/ApiClient.TransportController.h"
---

# node/lib/NodeCore/api/ApiClient.TransportController.h

File ini mendeklarasikan controller transport HTTP/TLS untuk `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.TransportController.h` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Transport controller menangani jalur pengiriman HTTP: memilih target cloud/relay, menyiapkan TLS, menandatangani payload, menjalankan state machine HTTP, membaca response, dan menjalankan upload tunggal.

## Kenapa File Ini Ada

Transport adalah bagian yang paling dekat dengan jaringan. Dengan controller khusus, logic HTTP/TLS tidak bercampur dengan logic queue, sensor, atau mode command.

## Isi Penting

| Method | Fungsi |
|---|---|
| `tryNtpFallbackProbe` | Mengecek waktu server sebagai fallback NTP. |
| `probeServerTimeHeader` | Membaca header waktu dari server. |
| `updateCloudTargetCache` | Menyiapkan host/path target cloud. |
| `activateRelayFallback` / `clearRelayFallback` | Mengatur fallback relay. |
| `buildErrorMessage` | Menyusun pesan error upload. |
| `signPayload` | Membuat signature payload. |
| `executeQosSample` | Menjalankan satu sample QoS HTTP. |
| `startUpload` | Memulai state machine upload. |
| `handleStateConnecting` sampai `handleStateReading` | Tahap state machine HTTP. |
| `performSingleUpload` | Melakukan upload blocking untuk satu payload. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ESP8266HTTPClient` | Client HTTP level tinggi. |
| `ESP8266WiFi` | Client TCP biasa. |
| `ApiClient` private helper | Akuisisi TLS resource, shared buffer, result update, dan state transition. |
| `TransportRuntime` | Menyimpan state HTTP dan client aktif. |

## Catatan Desain

Header ini menyediakan wrapper private ke fungsi `ApiClient` seperti `acquireTlsResources`, `releaseTlsResources`, dan `transitionState`. Ini menjaga controller tetap bisa mengatur resource tanpa membuka semua detail ke public API.

## Error Handling

Transport controller punya jalur fallback relay, error message, timeout state, dan update `UploadResult`. Implementasi detail ada di file transport `.cpp`.

## Catatan Keamanan

Fungsi TLS dan signature berada di area ini. Perubahan pada `allowInsecure`, trust anchor, atau `signPayload` bisa berdampak langsung pada keamanan data.

## Catatan Debugging

Jika upload gagal di level jaringan, mulai dari `TransportRuntime.httpState`, `lastResult`, `lastResponseLocation`, dan fungsi state handler di controller ini.

## Hubungan dengan Laporan TA

File ini menjelaskan bagian komunikasi node ke cloud atau relay secara teknis, termasuk fallback saat jalur utama gagal.
