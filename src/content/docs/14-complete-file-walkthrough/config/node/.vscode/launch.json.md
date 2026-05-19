---
title: "node/.vscode/launch.json"
---

# node/.vscode/launch.json

File ini berisi konfigurasi debug PlatformIO untuk firmware node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/.vscode/launch.json` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Jika debug hardware atau debug PlatformIO dipakai, editor membutuhkan informasi environment, executable firmware, dan toolchain. File ini menyimpan konfigurasi itu.

## Sifat File

Komentar awal menyatakan file ini dibuat otomatis dan tidak disarankan diedit manual. Konfigurasi debug sebaiknya mengikuti pengaturan PlatformIO.

## Konfigurasi Debug

| Nama | Fungsi |
|---|---|
| `PIO Debug` | Debug normal dengan `Pre-Debug` task. |
| `PIO Debug (skip Pre-Debug)` | Debug tanpa task awal. |
| `PIO Debug (without uploading)` | Debug dengan `loadMode: manual`. |

Semua konfigurasi menunjuk ke environment `wemosd1mini_usb` dan firmware ELF di `.pio/build/wemosd1mini_usb/firmware.elf`.

## Error yang Mungkin Terjadi

- Jika firmware belum dibangun, file `firmware.elf` belum ada.
- Jika path absolut berbeda di komputer lain, debug tidak bisa mulai.
- Jika board atau environment berubah, isi file perlu dibuat ulang.

## Bagian untuk Pemula

File ini seperti alamat peta untuk mode debug. Editor memakai alamat ini untuk mencari firmware yang ingin diperiksa.

## Bagian Advanced

Karena proyek memakai ESP8266/Wemos D1 Mini, debug hardware tidak selalu sesederhana board desktop. Konfigurasi ini lebih aman dibaca sebagai output PlatformIO, bukan bukti bahwa debug hardware selalu siap.

## Hubungan ke Sistem TA

Debug membantu mencari masalah firmware node saat pembacaan sensor, koneksi WiFi, cache, atau upload data tidak berjalan sesuai harapan.

