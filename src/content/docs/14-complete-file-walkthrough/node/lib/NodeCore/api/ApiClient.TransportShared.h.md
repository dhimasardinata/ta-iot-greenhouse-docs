---
title: "node/lib/NodeCore/api/ApiClient.TransportShared.h"
---

# node/lib/NodeCore/api/ApiClient.TransportShared.h

File ini mendeklarasikan helper transport HTTP bersama.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.TransportShared.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Header ini berisi deklarasi helper yang dipakai file transport: target gateway edge, bearer token, parsing URL cloud, baca/tulis stream HTTP, parsing status code, response header, waktu server, preview body, dan deteksi blokir WAF.

## Kenapa File Ini Ada

Beberapa file transport perlu fungsi kecil yang sama. Header ini mencegah duplikasi antara upload cloud, upload gateway, QoS, dan helper response.

## Isi Penting

| Bagian | Peran |
|---|---|
| `EdgeGatewayTargets` | Menyimpan target mDNS/IP primary dan secondary gateway. |
| `build_bearer` | Membuat header `Bearer ...`. |
| `resolveCloudTarget` | Memecah URL menjadi host dan path. |
| `read_line` | Membaca satu baris dari TCP/HTTP stream. |
| `write_all` | Menulis semua byte dengan timeout dan status gagal. |
| `parse_status_code` | Mengambil status HTTP dari baris pertama response. |
| `parse_response_headers` | Mengambil header seperti `Date` dan `Location`. |
| `sync_time_from_http_date` | Sinkronisasi waktu dari header HTTP. |
| `response_body_indicates_waf_block` | Mendeteksi body yang menunjukkan request diblokir proteksi web. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ApiClient.State.h` | Tipe `UploadResult`. |
| `ConfigManager.h` | Token dan target gateway/cloud. |
| `TextBufferUtils.h` | Helper copy/append string aman. |
| `NtpClient` / `WiFiClient` | Operasi waktu dan stream jaringan. |

## Catatan Desain

Header ini hanya deklarasi dan type helper. Implementasi ada di `ApiClient.TransportShared.cpp`.

## Catatan Debugging

Jika parsing response atau target upload terasa salah, cocokkan deklarasi di file ini dengan implementasi `.cpp` dan pemanggil di transport.

## Hubungan dengan Laporan TA

File ini menjelaskan fondasi kecil yang membuat komunikasi HTTP node lebih tahan terhadap timeout, redirect, dan response server yang tidak ideal.
