---
title: "node/lib/NodeCore/api/ApiClient.UploadRuntimeCycle.cpp"
---

# node/lib/NodeCore/api/ApiClient.UploadRuntimeCycle.cpp

File ini mengimplementasikan siklus upload queued dan live snapshot.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.UploadRuntimeCycle.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menyiapkan payload edge terenkripsi, menjalankan siklus upload cache, mengirim record queued ke cloud/edge, dan mengirim live snapshot ke gateway saat mode gateway aktif.

## Kenapa File Ini Ada

Upload queued perlu banyak keputusan runtime: OTA sedang berjalan atau tidak, Wi-Fi scan aktif atau tidak, heap cukup atau tidak, queue siap atau perlu recovery, target cloud atau edge, dan waktu NTP valid atau belum.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `prepareEdgePayload` | Mengubah payload JSON menjadi format edge terenkripsi `ENC:` dan menambah field khusus gateway. |
| `handleUploadCycle` | Jalur utama upload cache dari RTC/LittleFS. |
| `dispatchQueuedUploadRecord` | Memulai upload record ke edge atau cloud. |
| `trySendLiveSnapshotToGateway` | Mengirim snapshot sensor terbaru ke gateway tanpa menunggu queue utama. |

## Error Handling

Upload ditunda bila OTA aktif, Wi-Fi scan berjalan, heap rendah, pop queue sedang cooldown, NTP belum sync untuk cloud, atau target decision meminta wait/hold. Jika RAM rendah berulang lebih dari batas, firmware reboot untuk self-heal.

## Catatan Performa

Payload edge dimodifikasi langsung di shared buffer, lalu dienkripsi ke buffer sementara. Ini menghindari banyak copy besar.

## Catatan Debugging

Jika gateway lokal aktif tetapi tidak menerima live snapshot, cek `liveSnapshotPending`, `liveSnapshotInFlight`, `localGatewayMode`, `cachedGatewayMode`, dan hasil `prepareEdgePayload`.

## Hubungan dengan Laporan TA

File ini menjelaskan jalur utama node untuk menjaga upload tetap berjalan secara bertahap dan adaptif.
