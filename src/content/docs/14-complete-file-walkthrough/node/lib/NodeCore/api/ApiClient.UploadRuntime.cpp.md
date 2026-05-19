---
title: "node/lib/NodeCore/api/ApiClient.UploadRuntime.cpp"
---

# node/lib/NodeCore/api/ApiClient.UploadRuntime.cpp

File ini berisi wrapper runtime upload untuk `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.UploadRuntime.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini meneruskan method runtime upload dari facade `ApiClient` ke `ApiClientUploadRuntimeController`.

## Kenapa File Ini Ada

Runtime upload punya banyak bagian: backoff, low memory, sukses/gagal, gateway mode, payload edge, siklus upload, dispatch queue, dan live snapshot. File ini menjaga facade tetap rapi sambil memindahkan detail ke controller.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `notifyLowMemory` | Delegasi notifikasi RAM rendah. |
| `calculateBackoffInterval` | Delegasi hitung retry backoff. |
| `handleSuccessfulUpload` / `handleFailedUpload` | Delegasi hasil upload. |
| `processGatewayResult` | Delegasi hasil gateway edge. |
| `checkGatewayMode` | Delegasi polling mode gateway. |
| `prepareEdgePayload` | Delegasi transform payload untuk edge. |
| `handleUploadCycle` | Delegasi siklus upload cache. |
| `trySendLiveSnapshotToGateway` | Delegasi live snapshot gateway. |

## Catatan Debugging

Jika mencari logic runtime yang sebenarnya, lanjut ke `ApiClient.UploadRuntimePolicy.cpp` dan `ApiClient.UploadRuntimeCycle.cpp`.

## Hubungan dengan Laporan TA

File ini menunjukkan cara kode menjaga interface `ApiClient` tetap stabil sambil memecah implementasi upload yang kompleks.
