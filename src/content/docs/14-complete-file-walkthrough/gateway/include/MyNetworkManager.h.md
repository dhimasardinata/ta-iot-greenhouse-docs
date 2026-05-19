---
title: "gateway/include/MyNetworkManager.h"
---

# gateway/include/MyNetworkManager.h

File ini mendeklarasikan class pengelola jaringan gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/MyNetworkManager.h` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway perlu koneksi Wi-Fi, fallback GPRS, request HTTP/HTTPS, relay/proxy fallback, sinkronisasi waktu, fetch data cloud, post status perangkat, dan QoS check. File ini menjadi kontrak utama untuk semua pekerjaan jaringan itu.

## Struct Penting

| Struct | Fungsi awal |
|---|---|
| `QoSMetrics` | Ringkasan latency, packet loss, throughput, jitter, score, dan target. |
| `SpecificWiFiConnectResult` | Hasil koneksi Wi-Fi manual, termasuk scan, RSSI, status, dan hidden network. |
| `HttpTimeInfo` | Waktu dari API HTTP beserta timezone dan offset. |
| `ModemTimeInfo` | Waktu dari modem beserta offset. |
| `CloudSensorSnapshot` | Snapshot data sensor dari cloud. |
| `CloudThresholdSnapshot` | Snapshot threshold dari cloud. |
| `CloudScheduleSnapshot` | Snapshot jadwal cloud. |
| `CloudFogSnapshot` | Snapshot status fog/kabut dari cloud. |

## Enum Penting

| Enum | Fungsi awal |
|---|---|
| `GprsSetupStage` | Tahapan setup modem/GPRS dari AT probe sampai complete. |
| `WiFiState` | State machine Wi-Fi dan fallback GPRS. |
| `UplinkMode` | Mode rute uplink: auto, direct, atau relay. |

## Fungsi Publik Utama

Area publik class mencakup:

- `begin(...)` untuk konfigurasi awal,
- `handleWiFi(...)`, `connectWiFi()`, dan `connectMobile()` untuk state machine koneksi,
- koneksi Wi-Fi spesifik/manual,
- status koneksi, RSSI, SSID, scan result, dan mode uplink,
- tambah/hapus credential Wi-Fi,
- fetch threshold, node data, schedule, waktu HTTP, waktu modem,
- post/get device status,
- fetch bundle greenhouse,
- fetch camera status,
- QoS checks,
- `printStatus(...)`,
- `updateApiConfig(...)`.

## Data Masuk

Data masuk berupa konfigurasi token, URL API, SSID/password, APN GPRS, SIM PIN, greenhouse ID, payload HTTP, timeout, dan stream output untuk log/terminal.

## Data Keluar

Data keluar berupa status koneksi, snapshot cloud, status device, data QoS, waktu network, string route uplink, dan pesan status ke stream.

## Kapan Dipakai

File ini dipakai hampir sepanjang runtime gateway: saat koneksi awal, saat koneksi berubah, saat mengambil data cloud, saat mengirim status relay, saat fallback ke GPRS, dan saat operator menjalankan diagnostic QoS.

## Error yang Mungkin Terjadi

- Jika state machine Wi-Fi tidak dipanggil rutin, koneksi bisa macet di state tertentu.
- Jika GPRS setup stage gagal atau timeout, fallback seluler tidak siap.
- Jika token atau URL salah, request cloud akan gagal walaupun jaringan tersambung.
- Jika relay fallback/proxy salah mendeteksi kegagalan cloud, route uplink bisa tidak sesuai.
- Jika JSON response cloud berubah format, snapshot bisa `valid = false`.

## Bagian untuk Pemula

File ini adalah pengatur internet gateway. Ia mencoba Wi-Fi, bisa pindah ke GPRS, mengambil data dari server, dan mengirim status balik.

## Bagian Advanced

Header ini menunjukkan banyak tanggung jawab dalam satu class: Wi-Fi, GPRS, HTTP, QoS, API cloud, relay fallback, dan time sync. Dokumentasi final perlu menghubungkan method publik dengan implementasi `.cpp` agar alur blocking dan timeout jelas.

## Hubungan ke Sistem TA

Tanpa jaringan yang sehat, gateway tidak bisa mengambil threshold/jadwal cloud, mengirim status perangkat, atau melakukan sinkronisasi data dengan backend TA.
