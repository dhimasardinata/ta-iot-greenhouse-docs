---
title: "node/.github/workflows/simulation.yml"
---

# node/.github/workflows/simulation.yml

File ini mengatur workflow simulasi beban puncak untuk firmware node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/.github/workflows/simulation.yml` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Selain build biasa, firmware node perlu diuji pada skenario beban tinggi. Workflow ini menjalankan test native stress secara berkala atau manual.

## Pemicu Workflow

Workflow berjalan pada:

- jadwal mingguan, cron `0 0 * * 0`
- `workflow_dispatch`
- `push` yang mengubah `test/test_native_stress/**`

## Langkah Utama

| Langkah | Fungsi |
|---|---|
| Checkout | Mengambil source repository. |
| Cache pip | Menyimpan cache package Python. |
| Cache PlatformIO | Menyimpan cache PlatformIO. |
| Set up Python | Memakai Python `3.11`. |
| Install PlatformIO | Memasang PlatformIO `6.1.15`. |
| Run Peak Load Simulation | Menjalankan `pio test -e native -f test_native_stress -v`. |
| Verify Results | Menampilkan pesan sukses jika test lulus. |

## Error yang Mungkin Terjadi

- Jika stress test terlalu berat atau tidak stabil, workflow bisa gagal walau build biasa sukses.
- Jika PlatformIO cache tidak cocok, setup bisa lebih lama.
- Jika test stress berubah tanpa sinkron dengan source, hasil simulasi bisa tidak mewakili firmware terbaru.

## Bagian untuk Pemula

File ini seperti latihan ujian berat untuk firmware. Tujuannya melihat apakah logika node tetap kuat saat diuji berkali-kali.

## Bagian Advanced

Workflow ini menjalankan native test, bukan firmware langsung di hardware. Jadi hasilnya berguna untuk logika dan ketahanan simulasi, tetapi tidak menggantikan uji perangkat nyata.

## Hubungan ke Sistem TA

Node greenhouse harus stabil saat membaca sensor dan mengirim data. Simulasi beban membantu mencari masalah sebelum firmware dipakai lama di lapangan.

