---
title: "Overview Pengujian"
---

# Overview Pengujian

Pengujian adalah cara membuktikan bahwa sistem TA IoT Greenhouse bekerja sesuai tujuan, bukan hanya terlihat berjalan di layar.

Pada snapshot ini, bukti pengujian otomatis paling kuat ada di firmware node. Firmware node memiliki environment `native`, `integration_test_mocked`, test Unity, fault injection JavaScript, workflow CI, dan workflow peak simulation. Gateway, backend, frontend web, dan Android sudah punya source yang bisa diuji, tetapi file test otomatis khusus untuk bagian tersebut belum terlihat di inventory awal.

## Bukti dari Kode

- `node/platformio.ini` mendefinisikan `env:native` dan `env:integration_test_mocked`.
- `node/test/` berisi test cache, integration, JSON logic, stress, simulation, dan fault injection.
- `node/.github/workflows/ci.yml` menjalankan build firmware, native test, static analysis, dan fault injection.
- `node/.github/workflows/simulation.yml` menjalankan peak load simulation mingguan atau manual.
- `gateway/test/README` masih placeholder PlatformIO, bukan test gateway lengkap.

## Jenis Pengujian yang Harus Dibaca

1. Uji sensor.
2. Uji node ke cloud.
3. Uji node ke gateway.
4. Uji gateway dan aktuator.
5. Uji caching.
6. Uji OTA.
7. Uji WebSocket terminal.
8. Uji web dan Android.
9. Uji keamanan.
10. Blackbox testing.
11. Analisis hasil pengujian.

## Cara Membaca Bagian Ini

Anggap pengujian sebagai daftar pertanyaan:

- data yang masuk apa,
- bagian sistem mana yang menerima,
- hasil yang benar seperti apa,
- bukti lulusnya dari mana,
- dan apa risiko jika gagal.

Jika halaman menyebut "belum terkonfirmasi", artinya bukti langsung belum terlihat dari file yang tersedia, bukan berarti fiturnya pasti tidak ada.

Lanjutkan ke [Uji Akurasi Sensor](./uji-akurasi-sensor.md).
