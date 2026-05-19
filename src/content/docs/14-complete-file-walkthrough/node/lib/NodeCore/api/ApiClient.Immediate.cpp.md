---
title: "node/lib/NodeCore/api/ApiClient.Immediate.cpp"
---

# node/lib/NodeCore/api/ApiClient.Immediate.cpp

File ini mengimplementasikan upload langsung dari `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Immediate.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Upload langsung adalah pengiriman data yang diminta segera, misalnya dari terminal. File ini menyiapkan record, memilih target cloud atau gateway, mencoba fallback, dan mengembalikan hasil upload.

## Kenapa File Ini Ada

Upload periodik berbeda dengan upload manual. Upload manual perlu respons cepat, tetapi tetap harus aman terhadap queue recovery, Wi-Fi scan, heap rendah, dan OTA yang sedang berjalan.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `performImmediateUpload` | Jalur utama upload langsung. |
| `prepareImmediateUploadRecord` | Membuat payload bila perlu, lalu memuat record dari queue. |
| `markImmediateUploadDeferred` | Menunda upload saat RAM atau kondisi jaringan belum siap. |
| `resetImmediateUploadPollState` | Mereset hasil poll gateway. |
| `resolveImmediateUploadTarget` | Menentukan apakah upload langsung ke edge/gateway atau cloud. |
| `finalizeImmediateUploadResult` | Membersihkan record yang sukses atau menaikkan counter gagal. |

## Alur Kerja

1. Cek cooldown pop queue dan recovery pending.
2. Refresh health runtime, lalu tunda jika Wi-Fi sedang scan.
3. Siapkan payload dan muat record dari RTC atau LittleFS.
4. Tentukan target berdasarkan mode upload dan status gateway.
5. Jika edge gagal, coba fallback ke cloud.
6. Jika sukses, record sumber dibersihkan dan timestamp sukses diperbarui.

## Error Handling

File ini memakai pesan hasil seperti `Queue pop cooldown`, `WiFi scan active`, `Payload creation failed`, `Queue empty`, dan `Deferred`. Jika HTTPS gagal karena RAM rendah, upload ditandai deferred agar dicoba lagi setelah warmup.

## Catatan Performa

Ada log heap sebelum dan sesudah upload langsung. Ini membantu melihat apakah upload HTTPS atau fallback gateway menghabiskan terlalu banyak memori.

## Catatan Debugging

Jika tombol/command `send now` tidak langsung mengirim, cek `retryAt`, `warmup`, `pollReady`, `gatewayMode`, dan apakah `httpCode` menjadi `kImmediateDeferred`.

## Hubungan dengan Laporan TA

File ini mendukung fitur operasional: pengguna dapat meminta node mengirim data sekarang, bukan menunggu interval upload berikutnya.
