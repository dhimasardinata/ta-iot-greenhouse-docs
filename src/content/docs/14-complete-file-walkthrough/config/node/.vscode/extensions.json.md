---
title: "node/.vscode/extensions.json"
---

# node/.vscode/extensions.json

File ini berisi rekomendasi ekstensi editor untuk proyek node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/.vscode/extensions.json` |
| Komponen | Config |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Saat repository dibuka di VS Code atau VSCodium, editor dapat menyarankan ekstensi yang membantu kerja pada proyek ini. File ini membuat rekomendasi tersebut konsisten.

## Rekomendasi

File ini merekomendasikan:

- `pioarduino.pioarduino-ide`
- `platformio.platformio-ide`

File ini juga menandai `ms-vscode.cpptools-extension-pack` sebagai unwanted recommendation.

## Error yang Mungkin Terjadi

- Jika ekstensi yang direkomendasikan tidak tersedia di marketplace yang dipakai editor, pengguna perlu memasang alternatif.
- Jika dua ekstensi PlatformIO punya fitur tumpang tindih, pengguna perlu memilih yang cocok.
- Jika ekstensi C++ tidak dipasang, fitur baca kode bisa kurang lengkap.

## Bagian untuk Pemula

File ini seperti daftar alat editor yang disarankan. Dengan alat yang tepat, proyek lebih mudah dibuka, dibangun, dan dibaca.

## Bagian Advanced

Rekomendasi ini berbeda dari Dev Container yang juga menyarankan ekstensi Microsoft C/C++. Jadi konfigurasi editor lokal dan container belum sepenuhnya sama.

## Hubungan ke Sistem TA

Ekstensi PlatformIO membantu proses build dan upload firmware node, bagian penting dari sistem IoT greenhouse.

