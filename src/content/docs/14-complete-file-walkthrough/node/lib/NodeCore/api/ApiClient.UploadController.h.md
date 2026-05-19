---
title: "node/lib/NodeCore/api/ApiClient.UploadController.h"
---

# node/lib/NodeCore/api/ApiClient.UploadController.h

File ini mendeklarasikan controller helper upload dan emergency record.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.UploadController.h` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Controller ini mengurus detail upload yang tidak murni transport: membangun URL gateway lokal, mengirim ke gateway lokal, membuat emergency record, menulis record ke RTC/LittleFS, menandai record berhasil, dan memilih target upload queued.

## Kenapa File Ini Ada

Upload data punya banyak aturan bisnis: local gateway, cache, emergency snapshot, label sumber record, dan reset siklus queue. File ini mengelompokkan aturan itu di luar controller HTTP.

## Isi Penting

| Method | Fungsi |
|---|---|
| `buildLocalGatewayUrl` | Membuat URL gateway lokal. |
| `performLocalGatewayUpload` | Mengirim payload ke gateway lokal. |
| `populateEmergencyRecord` | Mengisi snapshot emergency dari sensor/runtime. |
| `buildPayloadFromEmergencyRecord` | Mengubah emergency record menjadi payload. |
| `appendEmergencyRecordToRtc` | Menulis emergency record ke RTC. |
| `appendEmergencyRecordToLittleFs` | Menulis emergency record ke LittleFS. |
| `tryDirectSendEmergencyRecord` | Mencoba kirim emergency record langsung. |
| `finishLoadedRecordSuccess` | Menyelesaikan record yang berhasil diupload. |
| `resolveQueuedUploadTarget` | Menentukan target cloud atau edge untuk record queued. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `RoutingState` | Menentukan target cloud, edge, relay, atau gateway lokal. |
| `QueueState` | Menyimpan status record dan recovery queue. |
| `SensorManager` | Sumber data untuk emergency snapshot. |
| `CacheManager` / `RtcManager` | Penyimpanan record saat upload gagal. |

## Catatan Desain

File ini berada di tengah antara queue dan transport. Queue menyediakan record, transport mengirim record, sedangkan upload controller memutuskan cara record diperlakukan.

## Error Handling

Ada helper reset recovery, reset flag record, dan recovery pop queue. Ini mencegah satu kegagalan storage membuat siklus upload berikutnya ikut rusak.

## Catatan Debugging

Jika record sudah terkirim tetapi masih muncul di cache, cek `finishLoadedRecordSuccess`, `popLoadedRecord`, dan flag current record.

## Hubungan dengan Laporan TA

File ini menjelaskan bagaimana node menjaga data sensor tetap konsisten walaupun upload dilakukan lewat target yang berbeda-beda.
