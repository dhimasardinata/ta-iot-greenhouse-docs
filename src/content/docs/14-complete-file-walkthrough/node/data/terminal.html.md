---
title: "node/data/terminal.html"
---

# node/data/terminal.html

File ini adalah struktur halaman terminal lokal node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/data/terminal.html` |
| Komponen | Firmware Node |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas membuat halaman terminal berbasis browser agar operator bisa mengetik command ke node melalui WebSocket.

## Posisi File dalam Sistem

`AppServer.Routes.cpp` mengirim file ini pada route `/terminal`. File ini memuat `terminal.css`, `crypto.js`, dan `terminal.js`.

## Kenapa File Ini Dibutuhkan

Terminal lokal membantu debugging tanpa Serial Monitor. Operator bisa membuka browser, melihat log/response, dan menjalankan command seperti status, konfigurasi, sensor, cache, atau OTA sesuai command firmware.

## Struktur Utama

| Elemen | Fungsi |
|---|---|
| Header | Menampilkan judul terminal, node id, firmware, dan status koneksi. |
| `#console` | Area output terminal. |
| `#cmd-input` | Input command dari pengguna. |
| `#send` | Tombol kirim command. |
| `terminal.css` | Styling terminal. |
| `crypto.js` | Library AES minimal. |
| `terminal.js` | Logic WebSocket, enkripsi, dan UI terminal. |

## Input

Input utama adalah command yang diketik pengguna.

## Output

Output berupa pesan terminal, status koneksi WebSocket, banner node, dan response command.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/data/terminal.css` | Mengatur tampilan terminal. |
| `node/data/crypto.js` | Menyediakan object `CryptoJS`. |
| `node/data/terminal.js` | Menjalankan logic terminal. |
| `node/lib/NodeCore/terminal/DiagnosticsTerminal.cpp` | Memproses command di firmware. |
| `node/lib/NodeCore/web/AppServer.Routes.cpp` | Mendaftarkan route `/terminal`. |

## Error Handling

HTML ini tidak menangani error langsung. Error WebSocket, enkripsi, dan reconnect dikelola di `terminal.js`.

## Catatan Keamanan

Terminal bisa menjalankan command penting, sehingga jalur WebSocket dan command parser harus menjaga autentikasi, enkripsi, session timeout, dan validasi command.

## Catatan Debugging

Jika terminal kosong, cek apakah `/terminal.css`, `/crypto.js`, dan `/terminal.js` berhasil dimuat. Jika status tetap connecting, cek route WebSocket `/ws`.

## Hubungan dengan Laporan TA

File ini mendukung debugging firmware node, maintenance lapangan, terminal lokal, dan fitur WebSocket.
