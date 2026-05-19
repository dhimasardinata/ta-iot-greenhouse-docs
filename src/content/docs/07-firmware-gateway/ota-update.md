---
title: "OTA Update Gateway"
---

# OTA Update Gateway

Gateway memiliki mekanisme pengecekan update firmware otomatis.

## Bukti dari Kode

`loop()` di `gateway/src/main.cpp` membuat `pendingOtaCheck = true` jika:

- SD logger tidak sibuk,
- Wi-Fi terhubung,
- interval satu jam tercapai.

`config.h` juga mendefinisikan `FW_UPDATE_URL` dari `platformio.ini` dan `AUTO_OTA_APPLY_ENABLED = false`.

## Catatan Penting

Karena `AUTO_OTA_APPLY_ENABLED` bernilai false, firmware tidak langsung memutus kontrol produksi secara otomatis. Detail implementasi OTA dibaca pada bagian `serviceDeferredMaintenance()` dan fungsi terkait di `main.cpp`.

## Risiko

- update berjalan saat kontrol kritis,
- SD logger sedang sibuk,
- Wi-Fi putus,
- firmware salah versi,
- restart saat greenhouse membutuhkan kontrol.

Lanjutkan ke [Debugging Gateway](./debugging-gateway.md).
