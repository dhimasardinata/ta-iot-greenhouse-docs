---
title: "node/package.json"
---

# node/package.json

File ini mendefinisikan script NPM dan dependency JavaScript untuk proyek node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/package.json` |
| Komponen | Config |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Walau firmware utama ditulis C++, proyek tetap memakai JavaScript untuk watcher dan beberapa asset/tooling. `package.json` menjadi pintu masuk NPM.

## Script

| Script | Command |
|---|---|
| `watchers` | `node tools/watch/repo-watchers.js` |
| `watchers:install` | `bash ./scripts/install_watchers_service.sh` |
| `watchers:status` | `systemctl --user --no-pager --full status node-medini-watchers.service` |
| `watchers:logs` | `journalctl --user -u node-medini-watchers.service -n 200 -f` |

## Dependency

| Dependency | Versi | Fungsi umum |
|---|---:|---|
| `chokidar` | `5.0.0` | Memantau perubahan file. |
| `crypto-js` | `4.2.0` | Fungsi kriptografi JavaScript. |

## Error yang Mungkin Terjadi

- Jika Node tidak sesuai, script watcher gagal.
- Jika `systemd --user` tidak tersedia, script status/logs tidak bekerja.
- Jika dependency tidak di-install, watcher dan tooling JavaScript gagal.

## Bagian untuk Pemula

File ini seperti daftar alat JavaScript kecil yang dipakai proyek. Ia bukan firmware utama, tetapi membantu proses pengembangan.

## Bagian Advanced

Script NPM beririsan dengan `.vscode/tasks.json`, karena keduanya mengarah ke service watcher yang sama.

## Hubungan ke Sistem TA

Tooling JavaScript membantu menjaga proses kerja repository node, sementara firmware tetap dibangun lewat PlatformIO.

