---
title: "Boot Sequence"
---

# Boot Sequence

Boot sequence adalah urutan saat node menyala sampai siap bekerja.

## Alur dari Kode

`node/src/main.cpp` menjalankan urutan:

1. `delay(1000)`
2. membuat `SerialManager`
3. `BootManager::run()`
4. `RtcManager::init()`
5. membuat `Runtime`
6. `runtime.init()`
7. menyimpan pointer runtime ke `g_runtime`
8. masuk loop utama

## BootManager

File `node/src/BootManager.cpp` menangani kondisi khusus sebelum aplikasi berjalan penuh.

Hal yang dilakukan:

- memproses factory reset,
- format LittleFS jika factory reset diminta,
- menaikkan crash counter,
- memproses crash log,
- membersihkan cache pada crash level awal,
- format filesystem pada crash level berikutnya,
- mematikan Wi-Fi sementara saat crash terlalu banyak.

## Stable Boot

Di `loop()` pada `main.cpp`, setelah firmware berjalan lebih dari 60 detik, sistem menandai boot sebagai stabil dan menghapus crash counter.

## Kenapa Ini Penting

Perangkat IoT bisa mati listrik, crash, atau gagal boot karena filesystem rusak, cache rusak, atau konfigurasi buruk. Boot sequence dibuat agar node punya kesempatan memperbaiki diri sebelum harus dibongkar fisik.

## Catatan Debugging

Jika node terus restart:

1. cek Serial Monitor,
2. cari log `BOOT` atau `AUTO-FIX`,
3. cek apakah LittleFS diformat,
4. cek apakah crash counter masuk safe mode,
5. cek apakah portal mode aktif.

Lanjutkan ke [Pembacaan Sensor](./pembacaan-sensor.md).
