---
title: "Folder Overview: Scripts"
---

# Folder Overview: Scripts

Folder ini akan menampung dokumentasi file-by-file untuk script pendukung.

## Fungsi Komponen

Script membantu proses build, asset generation, certificate conversion, OTA testing, formatting, static analysis, prompt collection, dan watcher tooling.

## Area Script yang Terlihat

- `node/scripts/*.py`, `.sh`, `.bat`,
- `node/tools/watch/*.js`,
- `node/tools/repro/*.js`.

## Hal yang Harus Dicari Saat File-by-File

- command yang dijalankan,
- input dan output file,
- apakah script mengubah source/generated file,
- apakah script dipanggil dari `platformio.ini` atau package script,
- dependency eksternal,
- risiko jika script gagal.

## Urutan Membaca

Mulai dari script yang dipanggil oleh `node/platformio.ini`, lalu script OTA/build, lalu watcher/repro.

## Status

File detail masih `Pending` di [Coverage Report](../coverage-report.md).
