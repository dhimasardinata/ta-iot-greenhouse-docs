---
title: "Uji Caching"
---

# Uji Caching

Uji caching memastikan data sensor tidak langsung hilang saat jaringan atau penyimpanan mengalami masalah.

## Bentuk Cache yang Terlihat

Firmware node memakai jalur cache RTC dan LittleFS. Backend juga memakai cache Laravel untuk data dashboard dan firmware OTA.

## Bukti dari Kode

Firmware node:

- `node/lib/NodeCore/storage/CacheManager.*`
- `node/lib/NodeCore/storage/RtcManager.*`
- `node/lib/NodeCore/api/ApiClient.UploadRecords.cpp`
- `node/lib/NodeCore/api/ApiClient.UploadFlow.cpp`
- `node/test/test_native_stress/test_simulation.cpp`
- `node/test/fault_injection/cache_fault_injection_e2e.js`

Backend:

- `web/ApiController.php` membersihkan cache dashboard setelah data sensor baru.
- `web/OtaController.php` memakai cache `firmware_latest_node_{id}` untuk lookup firmware.

## Yang Diuji

- Data masuk cache saat upload gagal.
- Cache bisa dibaca kembali.
- Cache bisa dihapus setelah upload sukses.
- Corrupt record tidak menghapus semua data valid.
- LittleFS fallback bekerja saat RTC gagal.
- Emergency queue bekerja saat RTC dan LittleFS gagal.

## Bukti Test Otomatis

`cache_fault_injection_e2e.js` menguji:

- RTC gagal lalu fallback ke LittleFS.
- RTC dan LittleFS gagal lalu masuk emergency queue.
- CRC mismatch pada satu record tidak harus menghapus seluruh cache.

`test_native_stress/test_simulation.cpp` menjalankan simulasi 10.000 siklus dengan corrupt byte acak dan cek header cache.

Lanjutkan ke [Uji OTA](./uji-ota.md).
