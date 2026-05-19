---
title: "node/.devcontainer/devcontainer.json"
---

# node/.devcontainer/devcontainer.json

File ini mendefinisikan lingkungan kerja container untuk mengembangkan firmware node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/.devcontainer/devcontainer.json` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Pengembangan firmware butuh Python, PlatformIO, pre-commit, dan ekstensi editor. File ini membuat lingkungan kerja yang lebih seragam saat proyek dibuka memakai Dev Container.

## Isi Utama

| Bagian | Nilai / Fungsi |
|---|---|
| `name` | `Node Medini Dev` |
| `image` | `mcr.microsoft.com/devcontainers/cpp:default-bullseye` |
| `remoteUser` | `vscode` |
| `postCreateCommand` | Memasang PlatformIO dan pre-commit lalu menjalankan `pre-commit install`. |

## Ekstensi Editor

File ini menyarankan ekstensi:

- `platformio.platformio-ide`
- `ms-vscode.cpptools`
- `ms-vscode.cpptools-extension-pack`
- `esbenp.prettier-vscode`
- `dbaeumer.vscode-eslint`

Ekstensi tersebut mendukung PlatformIO, C/C++, format JavaScript, dan lint JavaScript.

## Data Masuk dan Keluar

Input file ini adalah konfigurasi container. Outputnya adalah lingkungan kerja yang siap dipakai, bukan firmware langsung.

## Error yang Mungkin Terjadi

- Jika image container tidak bisa diunduh, Dev Container gagal dibuat.
- Jika `pip install platformio pre-commit` gagal, environment belum siap build.
- Jika developer tidak memakai Dev Container, file ini tidak otomatis berpengaruh.

## Bagian untuk Pemula

File ini seperti resep komputer kerja. Dengan resep ini, orang lain bisa membuka proyek dengan alat yang mirip tanpa menebak-nebak harus memasang apa.

## Bagian Advanced

`postCreateCommand` memasang PlatformIO tanpa versi terkunci. Berbeda dengan workflow CI yang memakai `platformio==6.1.15`, container lokal bisa mendapat versi lebih baru dan perilakunya mungkin sedikit berbeda.

## Hubungan ke Sistem TA

Lingkungan kerja yang konsisten membantu proses build dan review firmware node, terutama saat proyek dipakai ulang oleh pembimbing, penguji, atau anggota tim.

