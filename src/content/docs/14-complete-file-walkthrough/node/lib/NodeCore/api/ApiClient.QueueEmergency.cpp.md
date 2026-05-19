---
title: "node/lib/NodeCore/api/ApiClient.QueueEmergency.cpp"
---

# node/lib/NodeCore/api/ApiClient.QueueEmergency.cpp

File ini mengimplementasikan penyimpanan emergency record dan backpressure.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.QueueEmergency.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menangani kondisi saat data sensor harus diselamatkan walaupun cache utama bermasalah. Ia mencoba RTC, LittleFS, direct send, lalu fallback ke emergency queue RAM.

## Kenapa File Ini Ada

Node harus tetap menjaga data penting saat storage penuh, RTC gagal, atau jaringan belum siap. Backpressure mencegah firmware terus menumpuk data sampai sistem makin tidak stabil.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `applyQueuePopFailureCooldown` | Memberi jeda retry saat record gagal dihapus dari queue. |
| `logEmergencyQueueState` | Mencatat depth queue, backpressure, RTC, dan LittleFS. |
| `persistEmergencyRecord` | Mencoba simpan emergency record ke RTC, LittleFS, atau direct send. |
| `drainEmergencyQueueToStorage` | Memindahkan record RAM ke storage saat memungkinkan. |
| `createAndCachePayload` | Membuat snapshot sensor, mencoba persist, dan mengatur backpressure. |

## Alur Penyimpanan

1. Drain emergency queue lama maksimal dua record.
2. Jika emergency queue penuh, aktifkan backpressure dan reset akumulator sampel.
3. Buat emergency record dari data sensor.
4. Jika RTC penuh, flush ke LittleFS.
5. Coba simpan ke RTC/LittleFS atau kirim langsung.
6. Jika semua gagal, masukkan ke emergency queue RAM.

## Error Handling

File ini memakai cooldown bertingkat untuk kegagalan pop queue dan fallback LittleFS. Saat queue penuh, `emergencyBackpressure` diaktifkan agar sampling tidak terus menambah tekanan.

## Catatan Performa

Drain dibatasi `maxRecords` dan loop memberi makan watchdog dengan `ESP.wdtFeed()` serta `yield()` agar firmware tidak freeze.

## Catatan Debugging

Jika log `[EMERG]` sering muncul, cek depth emergency queue, `RtcManager::getCount()`, ukuran LittleFS cache, dan status `emergencyBackpressure`.

## Hubungan dengan Laporan TA

File ini penting untuk menjelaskan ketahanan data sensor ketika node bekerja di jaringan atau storage yang tidak ideal.
