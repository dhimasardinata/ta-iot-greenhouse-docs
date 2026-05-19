---
title: "node/lib/NodeCore/api/ApiClient.TransportState.cpp"
---

# node/lib/NodeCore/api/ApiClient.TransportState.cpp

File ini mengimplementasikan state machine upload HTTP.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.TransportState.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menjalankan upload non-blocking bertahap: connect, kirim request, tunggu response, baca response, lalu tandai complete atau failed.

## Kenapa File Ini Ada

Upload periodik tidak boleh membuat loop firmware berhenti terlalu lama. State machine membagi upload menjadi beberapa tahap sehingga loop tetap bisa memberi kesempatan ke watchdog dan tugas lain.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `startUpload` | Menyiapkan payload length, target edge/cloud, target cache, dan masuk state `CONNECTING`. |
| `handleStateConnecting` | Membuka koneksi ke gateway edge atau cloud HTTPS. |
| `handleStateSending` | Menulis header HTTP, auth/signature, dan body payload. |
| `handleStateWaiting` | Menunggu response atau timeout. |
| `handleStateReading` | Membaca status HTTP, header, body preview, dan pesan hasil. |
| `handleUploadStateMachine` | Dispatcher state utama. |

## Jalur Edge dan Cloud

Untuk edge, file ini mencoba kandidat gateway mDNS/IP primary dan secondary, lalu menambah header `X-Node-ID`, `X-GH-ID`, `X-Signature`, dan `X-Timestamp`. Untuk cloud, file ini memakai TLS dan bearer token.

## Error Handling

Koneksi gagal, payload buffer hilang, short write, disconnect, timeout, response buruk, redirect, dan WAF block semuanya diubah menjadi `UploadResult` yang bisa diproses oleh lifecycle.

## Catatan Debugging

Jika upload stuck, cek `httpState`, `stateEntryTime`, `payloadLen`, `edgeHost`, `cloudHost`, dan apakah state berhenti di `WAITING_RESPONSE`.

## Hubungan dengan Laporan TA

File ini menunjukkan bagaimana node mengirim data tanpa memblokir firmware terlalu lama.
