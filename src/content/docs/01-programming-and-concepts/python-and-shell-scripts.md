---
title: "Python and Shell Scripts"
---

# Python and Shell Scripts

Python, shell, dan batch dipakai untuk pekerjaan yang berulang: build firmware, OTA upload, konversi sertifikat, persiapan asset, sanitasi source, dan analisis stack.

Untuk pemula, script adalah file instruksi yang dijalankan developer dari terminal. Script berbeda dari firmware runtime karena script berjalan di komputer pengembang, bukan di ESP8266 atau ESP32.

## Jenis Script di Project

| Script | Fungsi |
|---|---|
| build script | Menjalankan build firmware beberapa environment. |
| OTA script | Mengirim file firmware ke perangkat atau endpoint update. |
| asset converter | Mengubah HTML/CSS/JS menjadi header `PROGMEM`. |
| cert converter | Mengubah PEM menjadi array C/C++. |
| config injector | Menghasilkan config build dari input lokal. |
| stack analyzer | Membaca output `-fstack-usage`. |
| sanitizer | Menyiapkan source agar aman dipublikasi. |
| watcher | Memantau perubahan repo saat development. |

## Kenapa Script Dibutuhkan

Firmware punya banyak langkah mekanis:

1. pilih environment,
2. injeksi config,
3. konversi asset web,
4. konversi sertifikat,
5. build,
6. upload atau OTA,
7. cek ukuran/stack/log.

Script mengurangi salah klik dan membuat langkah yang sama bisa diulang.

## Risiko Script

- path relatif salah,
- file generated tidak ikut update,
- token atau sertifikat ikut tersalin,
- build environment tidak sama dengan perangkat target,
- script mengubah file source tanpa disadari,
- script sukses tetapi firmware belum tentu benar di perangkat fisik.

## File yang Relevan

- [build_all.py](../14-complete-file-walkthrough/scripts/node/scripts/build_all.py.md)
- [build_and_ota.py](../14-complete-file-walkthrough/scripts/node/scripts/build_and_ota.py.md)
- [web_to_header.py](../14-complete-file-walkthrough/scripts/node/scripts/web_to_header.py.md)
- [convert_certs.py](../14-complete-file-walkthrough/scripts/node/scripts/convert_certs.py.md)
- [inject_config.py](../14-complete-file-walkthrough/scripts/node/scripts/inject_config.py.md)
- [analyze_stack.py](../14-complete-file-walkthrough/scripts/node/scripts/analyze_stack.py.md)
- [sanitize_for_public.py](../14-complete-file-walkthrough/scripts/node/scripts/sanitize_for_public.py.md)
