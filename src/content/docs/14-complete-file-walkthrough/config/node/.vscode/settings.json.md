---
title: "node/.vscode/settings.json"
---

# node/.vscode/settings.json

File ini menyimpan pengaturan workspace editor untuk proyek node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/.vscode/settings.json` |
| Komponen | Config |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Editor perlu tahu beberapa file harus dibaca sebagai C++ atau Tailwind CSS. File ini juga menyembunyikan folder tertentu dari tampilan editor.

## Isi Utama

| Bagian | Fungsi |
|---|---|
| `task.allowAutomaticTasks` | Mengizinkan task otomatis saat folder dibuka. |
| `files.associations` | Mengaitkan file header dan banyak header standar C++ ke mode C++. |
| `files.exclude` | Menyembunyikan `.codacy` dan `.git` dari tampilan file. |

## Error yang Mungkin Terjadi

- Jika task otomatis berjalan tanpa disadari, service watcher bisa aktif saat folder dibuka.
- Jika asosiasi file salah, highlight dan fitur editor bisa membingungkan.
- Jika folder disembunyikan terlalu luas, file penting bisa sulit ditemukan di panel editor.

## Bagian untuk Pemula

File ini mengatur cara editor menampilkan proyek. Ia membantu file C++ terlihat seperti C++ dan menyembunyikan folder yang biasanya tidak perlu dibuka.

## Bagian Advanced

`task.allowAutomaticTasks: on` berhubungan langsung dengan `.vscode/tasks.json`, khususnya task watcher yang berjalan saat folder dibuka.

## Hubungan ke Sistem TA

Pengaturan editor yang rapi mempercepat pembacaan firmware node, terutama untuk file header dan modul C++ yang saling terhubung.

