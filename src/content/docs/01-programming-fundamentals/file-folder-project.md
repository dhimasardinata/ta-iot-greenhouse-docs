---
title: "File, Folder, dan Project"
---

# File, Folder, dan Project

Sebelum membaca kode, pembaca perlu memahami tiga hal: file, folder, dan project.

## File

File adalah satu berkas. File bisa berisi kode, konfigurasi, data, dokumentasi, atau asset tampilan.

Contoh file dalam sistem ini:

| File | Fungsi Umum |
|---|---|
| `node/src/main.cpp` | Titik awal firmware node. |
| `gateway/src/main.cpp` | Titik awal firmware gateway. |
| `web/ApiController.php` | Potongan backend Laravel. |
| `web/Heatmap.vue` | Komponen frontend Vue. |
| `android/MainActivity.kt.txt` | Potongan activity Android. |
| `node/platformio.ini` | Konfigurasi build firmware node. |

Catatan: fungsi detail setiap file dibaca di halaman file-by-file.

## Folder

Folder adalah tempat mengelompokkan file. Folder membantu manusia memahami struktur project.

Contoh folder:

| Folder | Fungsi Umum |
|---|---|
| `node/` | Firmware dan tooling node sensor. |
| `gateway/` | Firmware gateway. |
| `web/` | Potongan backend dan frontend web. |
| `android/` | Potongan Android WebView. |
| `docs-site/` | Dokumentasi yang sedang dibuat. |

## Project

Project adalah kumpulan file dan folder yang membentuk satu sistem. Project TA ini tidak hanya satu aplikasi. Ada beberapa komponen yang bekerja bersama.

Karena itu, saat membaca project ini, jangan hanya bertanya `file ini apa`. Tanyakan juga:

1. File ini milik komponen apa?
2. File ini dipakai kapan?
3. File ini menerima data dari mana?
4. File ini mengirim data ke mana?
5. Kalau file ini error, bagian mana yang terdampak?

## Source Code dan Konfigurasi

Source code berisi logika program. Konfigurasi berisi pengaturan agar program bisa dibangun atau dijalankan.

Contoh source code:

- `.cpp`, `.h`, `.php`, `.vue`, `.js`, `.kt`.

Contoh konfigurasi:

- `.ini`, `.json`, `.yml`, `.yaml`, `.csv`, `.conf`.

Konfigurasi juga penting. File seperti `platformio.ini` menentukan board, library, flag build, dan script yang berjalan saat build.

## Dependency dan Cache

Dependency adalah library dari luar project. Cache adalah file sementara hasil proses program atau tools.

Dependency dan cache biasanya tidak perlu didokumentasikan file-by-file, karena bukan kode utama yang ditulis untuk TA. Namun dependency tetap perlu dipahami dari file manifest seperti `package.json` atau `platformio.ini`.

## Kesimpulan

File adalah unit kecil, folder adalah pengelompokan, dan project adalah keseluruhan sistem. Dokumentasi ini akan membaca semuanya secara bertahap agar pembaca bisa memahami hubungan antar komponen.

Lanjutkan ke [Variabel dan Tipe Data](./variabel-dan-tipe-data.md).
