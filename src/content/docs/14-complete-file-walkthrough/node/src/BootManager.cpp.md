---
title: "node/src/BootManager.cpp"
---

# node/src/BootManager.cpp

File ini menangani pekerjaan awal sebelum aplikasi node berjalan normal.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/src/BootManager.cpp` |
| Komponen | Firmware Node |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas mengecek apakah perangkat perlu factory reset, mencatat crash, memproses crash log, memperbaiki cache atau filesystem jika boot sering gagal, lalu me-restart perangkat jika perlu.

## Kenapa File Ini Ada

Node sensor dipasang di lingkungan greenhouse dan harus mampu pulih sendiri. Jika firmware crash berulang, operator tidak selalu bisa langsung membuka perangkat. `BootManager` memberi jalur self-healing bertahap.

## Alur Kerja File

1. Cek apakah reboot terakhir meminta `FACTORY_RESET`.
2. Jika iya, format LittleFS dengan watchdog dimatikan sementara.
3. Clear flag `BootGuard`, set alasan boot ke `POWER_ON`, lalu restart.
4. Jika bukan factory reset, tambah crash count.
5. Buat `FileSystemManager` untuk mount LittleFS.
6. Jalankan `CrashHandler::process()`.
7. Jika crash count 4 sampai 7, hapus `/cache.dat`.
8. Jika crash count 8 sampai 12, format filesystem.
9. Jika crash count lebih dari 12, matikan Wi-Fi sementara dan cooldown.
10. Jika crash terlalu banyak, reset counter crash.

## Fungsi Penting

### `formatLittleFsSafe()`

Mematikan watchdog sebelum `LittleFS.format()` karena format filesystem bisa lama, lalu mengaktifkan watchdog lagi setelah selesai.

### `BootManager::run()`

Menjalankan seluruh kebijakan boot recovery.

## Input

Input utama adalah alasan reboot dan crash count dari `BootGuard`, kondisi filesystem LittleFS, serta file cache `/cache.dat`.

## Output

Output dapat berupa filesystem diformat, cache dihapus, crash log diproses, Wi-Fi dimatikan sementara, crash counter dibersihkan, atau perangkat direstart.

## Error Handling

File ini mencatat hasil format filesystem. Jika format gagal, log error muncul. Untuk crash berulang, file ini tidak langsung menyerah, tetapi menaikkan level pemulihan dari hapus cache, format filesystem, sampai cooldown.

## Catatan Keamanan

Factory reset menghapus data lokal. Ini bisa membantu menghilangkan konfigurasi rusak, tetapi juga berarti kredensial atau cache lokal bisa hilang. Jalur yang memicu factory reset harus dijaga di modul command/portal.

## Catatan Performa

Format LittleFS bisa memakan waktu lama. Karena itu watchdog dimatikan sementara dan diaktifkan lagi setelah selesai agar perangkat tidak reset di tengah format.

## Catatan Debugging

Jika node terus reboot, baca log `BOOT` dan `AUTO-FIX`. Nilai crash count menentukan apakah perangkat sedang menghapus cache, format filesystem, atau cooldown.

## Hubungan dengan Laporan TA

File ini mendukung bagian reliabilitas node, local cache, recovery, dan maintenance firmware di sistem IoT greenhouse.
