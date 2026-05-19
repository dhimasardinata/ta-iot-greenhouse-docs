---
title: "gateway/include/WebSocketManager.h"
---

# gateway/include/WebSocketManager.h

File ini mendeklarasikan pengelola WebSocket dashboard gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/WebSocketManager.h` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Dashboard lokal gateway perlu menerima status real-time dan mengirim aksi seperti scan Wi-Fi, ganti Wi-Fi, autentikasi admin, atau perubahan kontrol. File ini mengelola komunikasi WebSocket antara browser dan firmware.

## Isi Utama

Class `WebSocketManager` menyimpan referensi ke:

- `SensorDataManager`,
- `RelayController`,
- `MyNetworkManager`,
- `RTCManager`.

Method publiknya:

- `begin(...)`,
- `broadcastStatus()`,
- `sendMutationResultToClient(...)`,
- `pumpAsyncEvents()`,
- `cleanupClients()`.

## Fungsi Internal Penting

Fungsi private mencakup pengiriman JSON ke client, cached status, hasil mutation terbaru, hasil scan Wi-Fi, log Wi-Fi, request scan, perubahan Wi-Fi, cache hasil Wi-Fi change, autentikasi admin, dan event WebSocket.

## Data Masuk

Data masuk berupa event WebSocket, JSON dari client, password admin, SSID/password Wi-Fi, dan request aksi lokal.

## Data Keluar

Data keluar berupa JSON status gateway, hasil mutation, hasil scan Wi-Fi, log Wi-Fi, dan pesan autentikasi admin required.

## Kapan Dipakai

File ini dipakai saat dashboard lokal gateway aktif dan browser tersambung lewat WebSocket.

## Error yang Mungkin Terjadi

- Jika cache status terlalu lama, client dapat melihat status lama.
- Jika admin auth tidak dicek konsisten, aksi sensitif bisa ditolak atau justru terlalu longgar.
- Jika scan Wi-Fi masih pending tetapi request baru masuk, UI bisa bingung tanpa state yang jelas.
- Jika client tidak dibersihkan, koneksi lama bisa membebani memori.

## Bagian untuk Pemula

WebSocket membuat browser dan gateway bisa saling kirim pesan tanpa refresh halaman. File ini adalah pengatur percakapan real-time itu.

## Bagian Advanced

Header menunjukkan state cache untuk Wi-Fi scan/change dan singleton `_instance`. Implementasi perlu menjaga urutan event agar hasil scan atau perubahan Wi-Fi dikirim ke client yang tepat.

## Hubungan ke Sistem TA

Dashboard lokal gateway, konfigurasi Wi-Fi, status real-time, dan aksi kontrol lokal bergantung pada WebSocket manager.
