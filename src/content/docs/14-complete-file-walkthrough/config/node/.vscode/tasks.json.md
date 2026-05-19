---
title: "node/.vscode/tasks.json"
---

# node/.vscode/tasks.json

File ini mengatur task editor untuk service watcher proyek node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/.vscode/tasks.json` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Proyek node memiliki script watcher. File ini menyediakan tombol atau task editor untuk memastikan watcher berjalan, memasang service, melihat status, dan membaca log.

## Task yang Tersedia

| Label | Command | Fungsi |
|---|---|---|
| `watchers: ensure running` | `bash scripts/install_watchers_service.sh` | Berjalan saat folder dibuka untuk memastikan service ada. |
| `watchers: install service` | `bash scripts/install_watchers_service.sh` | Memasang atau memperbarui service watcher. |
| `watchers: status` | `systemctl --user status node-medini-watchers.service` | Melihat status service user. |
| `watchers: logs` | `journalctl --user -u node-medini-watchers.service -n 200 -f` | Mengikuti log service watcher. |

## Error yang Mungkin Terjadi

- Jika sistem tidak memakai `systemd --user`, task status dan logs bisa gagal.
- Jika script `scripts/install_watchers_service.sh` bermasalah, task otomatis juga bermasalah.
- Jika task otomatis berjalan di lingkungan yang tidak diharapkan, bisa muncul service lokal yang tidak dimaksudkan.

## Bagian untuk Pemula

File ini seperti daftar tombol kerja di editor. Tombol itu membantu menjalankan atau memeriksa watcher tanpa mengetik command panjang.

## Bagian Advanced

Task `watchers: ensure running` memakai `runOn: folderOpen`, sehingga bisa berjalan otomatis karena `task.allowAutomaticTasks` di `settings.json` bernilai `on`.

## Hubungan ke Sistem TA

Watcher dapat membantu proses pengembangan firmware node, misalnya memantau perubahan atau menjaga alur tooling lokal tetap hidup.

