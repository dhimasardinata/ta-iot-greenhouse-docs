---
title: "Troubleshooting Produksi"
---

# Troubleshooting Produksi

Troubleshooting produksi adalah langkah mencari penyebab saat sistem gagal di lapangan.

## Mulai dari Gejala

| Gejala | Area Pertama yang Dicek |
|---|---|
| Data sensor tidak muncul | node, Wi-Fi, cache, backend API |
| Data terlambat | RSSI, upload interval, backend, cache |
| Relay tidak aktif | threshold, schedule, mode, sensor stale |
| OTA gagal | versi, token, file URL, ukuran firmware |
| Terminal tidak tersambung | WebSocket, Wi-Fi lokal, browser, enkripsi |
| Android tidak membuka web | internet, WebView, URL, permission |
| Gateway salah GH | environment `gh1` atau `gh2` |

## Urutan Aman

1. Catat gejala dan waktu.
2. Cek dashboard.
3. Cek serial monitor atau terminal lokal.
4. Cek cache dan status upload.
5. Cek backend response.
6. Cek konfigurasi greenhouse dan node.
7. Baru lakukan restart atau update firmware jika perlu.

## Jangan Langsung Menghapus Data

Cache, log, dan konfigurasi adalah bukti. Jika langsung dihapus, penyebab masalah bisa hilang. Simpan screenshot atau salinan log sebelum melakukan reset.

## File yang Akan Dibaca Saat File-by-File

- `node/lib/NodeCore/system/CrashHandler.*`
- `node/lib/NodeCore/storage/CacheManager.*`
- `node/lib/NodeCore/api/ApiClient.*`
- `gateway/src/MyNetworkManager.cpp`
- `gateway/src/RelayController.cpp`
- `web/ApiController.php`
- `web/OtaController.php`

Kembali ke [Coverage Report](../14-complete-file-walkthrough/coverage-report.md).
