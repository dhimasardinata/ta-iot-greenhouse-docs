---
title: "Folder Overview: Config"
---

# Folder Overview: Config

Folder ini akan menampung dokumentasi file-by-file untuk konfigurasi penting.

## Fungsi Komponen

File konfigurasi menentukan cara project dibangun, dijalankan, dianalisis, diuji, dan dihubungkan ke dependency atau environment.

## Contoh File Config Penting

- `node/platformio.ini`
- `gateway/platformio.ini`
- `gateway/partitions_custom.csv`
- `node/package.json`
- `node/package-lock.json`
- `node/.github/workflows/*.yml`
- `node/.vscode/*.json`
- `node/tools/certs/*`

## Hal yang Harus Hati-hati

Konfigurasi dapat berisi token, sertifikat, private key, URL produksi, atau password default. Dokumentasi boleh menjelaskan fungsi dan risiko, tetapi jangan menyalin rahasia lebih jauh dari yang sudah terlihat di source.

## Urutan Membaca

Mulai dari `platformio.ini`, lalu manifest dependency, workflow CI, editor config, dan sertifikat/tooling.

## Status

File detail masih `Pending` di [Coverage Report](../coverage-report.md).
