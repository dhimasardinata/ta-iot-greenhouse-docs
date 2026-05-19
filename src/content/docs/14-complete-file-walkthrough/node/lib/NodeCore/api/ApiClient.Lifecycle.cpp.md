---
title: "node/lib/NodeCore/api/ApiClient.Lifecycle.cpp"
---

# node/lib/NodeCore/api/ApiClient.Lifecycle.cpp

File ini mengimplementasikan lifecycle utama `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Lifecycle.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini adalah penggerak harian `ApiClient`: menerapkan config timer, menjalankan sampling, membuat payload, mengirim cache, menangani state HTTP, menjalankan immediate upload, QoS, fallback waktu, dan watchdog software.

## Kenapa File Ini Ada

Firmware node berjalan di loop utama. Semua tugas API perlu dijadwalkan tanpa membuat perangkat macet. File ini mengatur kapan tiap tugas API boleh berjalan.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `applyConfig` | Mengatur interval upload data, sampling, pengiriman cache, flush cache, dan software watchdog. |
| `handleTimerTasks` | Menangani sampling RSSI, pembuatan payload, live snapshot gateway, upload cache, dan flush cache. |
| `checkSoftwareWdt` | Reboot jika terlalu lama tidak ada upload sukses. |
| `handle` | Loop utama API yang memproses HTTP state, QoS, immediate upload, NTP fallback, dan timer task. |
| `scheduleImmediateUpload` | Membuat payload dan menjadwalkan upload cache. |
| `requestImmediateUpload` | Menyiapkan payload untuk upload langsung dan opsi restore WebSocket. |
| Constructor `ApiClient` | Menyimpan dependency dan membuat `ControllerContext`. |

## Alur Kerja Loop

1. Cek software watchdog.
2. Refresh kondisi runtime.
3. Jika HTTP sedang aktif, jalankan state machine upload.
4. Jika upload selesai/gagal, proses hasil dan lepas resource.
5. Jika QoS aktif, jalankan QoS.
6. Jika immediate upload diminta, cek OTA, Wi-Fi scan, heap, dan jalankan upload langsung.
7. Jika Wi-Fi siap, lanjut ke fallback waktu dan timer task.

## Error Handling

Upload yang selesai diproses lewat `handleSuccessfulUpload`, `handleFailedUpload`, atau `processGatewayResult`. Setelah selesai, state kembali ke `IDLE`, shared buffer dilepas, dan resource TLS dibersihkan.

## Catatan Debugging

Jika node tidak mengirim data secara periodik, mulai dari `handleTimerTasks`: cek timer, status Wi-Fi, jumlah cache, dan apakah `uploadState` berubah menjadi `UPLOADING`.

## Hubungan dengan Laporan TA

File ini menunjukkan jadwal kerja firmware node, dari sampling sampai pengiriman data dan recovery.
