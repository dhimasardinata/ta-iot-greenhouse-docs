---
title: "node/lib/NodeCore/api/ApiClient.QueueController.h"
---

# node/lib/NodeCore/api/ApiClient.QueueController.h

File ini mendeklarasikan controller queue data upload.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.QueueController.h` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Queue controller mengurus data yang belum terkirim. Ia bisa membaca record dari RTC, membaca dari LittleFS, membuat payload baru, menyimpan emergency record, dan memindahkan cache RTC ke LittleFS.

## Kenapa File Ini Ada

Koneksi node tidak selalu tersedia. Data sensor perlu disimpan sementara agar tidak langsung hilang saat upload gagal. Controller ini menjadi penjaga jalur cache dan recovery.

## Isi Penting

| Method | Fungsi |
|---|---|
| `loadRecordFromRtc` | Mengambil record dari cache RTC. |
| `loadRecordFromLittleFs` | Mengambil record dari cache file system. |
| `loadRecordForUpload` | Memilih sumber record terbaik untuk dikirim. |
| `popLoadedRecord` | Menghapus record yang sudah berhasil diproses. |
| `applyQueuePopFailureCooldown` | Memberi jeda saat penghapusan record gagal. |
| `logEmergencyQueueState` | Mencatat kondisi emergency queue. |
| `persistEmergencyRecord` | Menyimpan snapshot darurat. |
| `drainEmergencyQueueToStorage` | Memindahkan emergency queue ke storage. |
| `createAndCachePayload` | Membuat payload sensor dan menyimpannya. |
| `flushRtcToLittleFs` | Memindahkan cache cepat RTC ke LittleFS. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `CacheManager` | Penyimpanan LittleFS. |
| `RtcManager` | Penyimpanan cepat berbasis RTC. |
| `SensorManager` | Sumber payload sensor. |
| `QueueState` | Status retry, backpressure, dan emergency queue. |

## Catatan Desain

Controller ini memisahkan masalah penyimpanan dari masalah transport. Upload boleh gagal, tetapi data tetap dipertahankan selama kapasitas cache masih tersedia.

## Error Handling

Ada mekanisme cooldown untuk kegagalan pop queue dan fallback RTC ke LittleFS. Emergency queue juga punya backpressure agar sistem tidak terus menambah data saat storage penuh.

## Catatan Debugging

Jika data seperti tidak terkirim tetapi cache terus membesar, cek `loadRecordForUpload`, `popLoadedRecord`, dan status `emergencyBackpressure`.

## Hubungan dengan Laporan TA

File ini penting untuk menjelaskan reliabilitas sistem monitoring saat internet atau server sedang bermasalah.
