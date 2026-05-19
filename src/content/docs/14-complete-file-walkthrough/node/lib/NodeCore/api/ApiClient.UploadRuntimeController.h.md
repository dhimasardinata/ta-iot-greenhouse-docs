---
title: "node/lib/NodeCore/api/ApiClient.UploadRuntimeController.h"
---

# node/lib/NodeCore/api/ApiClient.UploadRuntimeController.h

File ini mendeklarasikan controller runtime siklus upload.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.UploadRuntimeController.h` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Controller ini mengurus keputusan runtime saat upload sedang berjalan: heap sehat atau tidak, backoff, sukses/gagal upload, hasil gateway mode, payload edge, dispatch record queued, dan pengiriman live snapshot ke gateway.

## Kenapa File Ini Ada

Runtime upload adalah bagian yang paling banyak berubah mengikuti kondisi perangkat. Ia perlu merespons RAM rendah, server gagal, gateway mode berubah, dan cache yang masih menunggu.

## Isi Penting

| Method | Fungsi |
|---|---|
| `notifyLowMemory` | Memberi tahu saat heap tidak cukup. |
| `calculateBackoffInterval` | Menghitung jeda retry setelah gagal. |
| `trackUploadFailure` | Mencatat kegagalan upload beruntun. |
| `handleSuccessfulUpload` | Menangani upload yang sukses. |
| `handleFailedUpload` | Menangani upload yang gagal. |
| `isHeapHealthy` | Mengecek apakah upload aman dijalankan. |
| `processGatewayResult` | Memproses hasil response gateway. |
| `checkGatewayMode` | Mengecek mode gateway lokal/cloud/auto. |
| `prepareEdgePayload` | Menyesuaikan payload untuk target edge. |
| `handleUploadCycle` | Menjalankan siklus upload utama. |
| `dispatchQueuedUploadRecord` | Mengirim record dari queue. |
| `trySendLiveSnapshotToGateway` | Mencoba kirim snapshot langsung ke gateway. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `RuntimeHealth` | Dasar keputusan heap dan storage. |
| `OperationalState` | Counter failure, timer, state upload, dan flag pause. |
| `RoutingState` | Target cloud/edge/relay dan mode gateway. |
| `TransportController` | Jalur upload HTTP yang dipakai setelah target dipilih. |

## Catatan Desain

Controller ini menjadi otak siklus upload. Ia tidak hanya mengirim data, tetapi juga menentukan kapan harus menunggu, retry, fallback, atau menganggap upload sukses.

## Error Handling

Backoff, low memory notification, failure counter, dan gateway result processing berada di area ini. Ini mencegah firmware melakukan retry terlalu agresif saat jaringan atau RAM sedang buruk.

## Catatan Debugging

Jika upload terlihat hidup-mati atau terlalu lama retry, cek `consecutiveUploadFailures`, hasil `calculateBackoffInterval`, dan status `UploadState`.

## Hubungan dengan Laporan TA

File ini penting untuk menjelaskan strategi ketahanan node: sistem tetap berjalan walaupun upload tidak selalu berhasil pada percobaan pertama.
