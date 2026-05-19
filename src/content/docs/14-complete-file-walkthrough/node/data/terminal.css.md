---
title: "node/data/terminal.css"
---

# node/data/terminal.css

File ini mengatur tampilan terminal lokal node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/data/terminal.css` |
| Komponen | Firmware Node |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas mengatur warna, layout, header, console, input command, tombol, status koneksi, dan respons mobile untuk halaman terminal.

## Posisi File dalam Sistem

File ini dimuat oleh `terminal.html` dan dilayani oleh `AppServer` pada route `/terminal.css`.

## Kenapa File Ini Dibutuhkan

Terminal harus mudah dibaca saat debugging. CSS ini membuat output console, command line, status WebSocket, dan input bawah tetap rapi di desktop maupun mobile.

## Bagian Penting

| Bagian | Fungsi |
|---|---|
| `:root` | Menyimpan token warna dark mode. |
| `:root[data-theme="light"]` | Menyimpan token warna light mode. |
| `#header` | Header terminal tetap di atas. |
| `#console` | Area scroll untuk output command. |
| `#input-bar` | Area input command tetap di bawah. |
| `.connected` | Indikator visual WebSocket tersambung. |
| `.ascii-banner` | Tampilan banner node di console. |

## Konsep Dasar yang Perlu Dipahami

- CSS variable seperti `--accent` membuat tema mudah diganti.
- `position: fixed` menahan header dan input agar tetap terlihat.
- `overflow: auto` membuat console bisa discroll.
- `@media` atau ukuran responsif membantu tampilan mobile.

## Input

Input tidak berupa data sensor, tetapi state DOM seperti class `connected`, class pesan, dan atribut tema.

## Output

Output berupa tampilan terminal yang rapi dan status koneksi yang terlihat.

## Error Handling

Tidak ada error handling langsung. Jika CSS gagal dimuat, terminal tetap mungkin berjalan tetapi tampilan menjadi polos dan sulit digunakan.

## Catatan Performa

CSS ini berjalan di browser, bukan di ESP8266. Namun ukuran file tetap memengaruhi flash dan waktu load dari firmware.

## Catatan Debugging

Jika layout terminal rusak, cek apakah route `/terminal.css` mengirim MIME `text/css` dan apakah file ini ikut masuk `WebAppData.h`.

## Hubungan dengan Laporan TA

File ini mendukung aspek usability terminal lokal dan maintenance firmware node.
