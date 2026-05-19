---
title: "node/lib/NodeCore/api/ApiClient.TransportSingle.cpp"
---

# node/lib/NodeCore/api/ApiClient.TransportSingle.cpp

File ini mengimplementasikan upload HTTPS blocking satu payload.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.TransportSingle.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`performSingleUpload` mengirim satu payload JSON ke cloud atau relay lewat HTTPS, membaca response HTTP, sinkronisasi waktu dari header server, mendeteksi blokir WAF, dan mencoba fallback relay jika direct cloud gagal.

## Kenapa File Ini Ada

Beberapa jalur butuh upload blocking, terutama immediate upload dan emergency direct send. Jalur ini lebih sederhana dari state machine async, tetapi tetap perlu TLS, auth header, device identity, timeout, dan fallback.

## Isi Penting

| Bagian | Peran |
|---|---|
| Heap/TLS guard | Menolak upload jika resource TLS tidak cukup. |
| `updateCloudTargetCacheFor` | Memilih target direct atau relay. |
| Request manual | Menulis request HTTP POST langsung ke `secureClient`. |
| `build_auth_header_for_upload` | Menambah bearer token upload jika tersedia. |
| `NodeIdentity` | Menambah `User-Agent` dan `X-Device-ID`. |
| `write_all` | Mengirim body dengan timeout dan deteksi disconnect. |
| Response parser | Membaca status, headers, body preview, dan WAF block. |
| Relay fallback | Mengulang upload lewat relay bila direct layak dianggap gagal. |

## Error Handling

Fungsi mengembalikan `UploadResult` dengan pesan seperti `Low TLS heap`, `TLS connect failed`, `Write timeout`, `Connection Lost`, `No HTTP response`, atau `Imunify360 blocked`.

## Catatan Keamanan

Token upload dipakai untuk header authorization, tetapi tidak perlu dicetak ke log. TLS resource dikelola oleh `acquireTlsResources` dan `releaseTlsResources`.

## Catatan Debugging

Jika immediate upload gagal hanya pada cloud, cek host/path target, `lastResult.httpCode`, body preview WAF, dan apakah fallback relay aktif.

## Hubungan dengan Laporan TA

File ini menjelaskan jalur pengiriman data sensor ke backend ketika firmware butuh hasil langsung dalam satu panggilan.
