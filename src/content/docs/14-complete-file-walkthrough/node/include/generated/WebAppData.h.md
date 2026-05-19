---
title: "node/include/generated/WebAppData.h"
---

# node/include/generated/WebAppData.h

File ini adalah hasil generate asset web lokal node ke bentuk array C++.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/generated/WebAppData.h` |
| Komponen | Firmware Node |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas menyimpan halaman HTML, CSS, dan JavaScript lokal node sebagai data byte di flash ESP8266, sehingga firmware bisa mengirim dashboard, portal, terminal, crypto script, dan halaman OTA tanpa membaca file eksternal.

## Kenapa File Ini Ada

ESP8266 perlu menyajikan halaman web lokal. Agar asset bisa ikut firmware dan hemat RAM, file di `node/data/` dikonversi menjadi array `PROGMEM`.

## Isi Utama

| Asset | Fungsi |
|---|---|
| `CONNECTING_HTML` | Halaman proses koneksi Wi-Fi. |
| `CRYPTO_JS` | Library AES minimal untuk browser. |
| `INDEX_HTML` | Dashboard lokal node. |
| `PORTAL_HTML` | Captive portal setup Wi-Fi. |
| `REBOOTING_HTML` | Halaman sukses dan reboot. |
| `SUCCESS_HTML` | Halaman sukses koneksi. |
| `TERMINAL_CSS` | Style terminal lokal. |
| `TERMINAL_HTML` | Struktur terminal lokal. |
| `TERMINAL_JS` | Logic WebSocket terminal. |
| `UPDATE_HTML` | Halaman upload firmware OTA lokal. |

Setiap asset punya pasangan metadata seperti `_LEN`, `_MIME`, dan `_GZIPPED`.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/data/*` | Sumber HTML/CSS/JS sebelum dikonversi. |
| `node/scripts/web_to_header.py` | Generator yang membuat header ini. |
| `node/lib/NodeCore/web/AppServer.Routes.cpp` | Mengirim asset dashboard, terminal, update, dan static route lain. |
| `node/lib/NodeCore/web/PortalServer.Routes.cpp` | Mengirim asset portal, connecting, rebooting, dan crypto JS. |

## Konsep Dasar yang Perlu Dipahami

- `PROGMEM` menyimpan data di flash, bukan RAM.
- MIME type memberi tahu browser jenis file.
- Gzip flag memberi tahu firmware apakah perlu header `Content-Encoding: gzip`.
- Generated file biasanya tidak diedit manual; sumbernya ada di file lain.

## Input

Input berasal dari file web di `node/data/` dan proses generator.

## Output

Output berupa konstanta C++ yang dipakai route HTTP firmware.

## Error Handling

File ini tidak memiliki error handling. Jika data, panjang, MIME, atau flag gzip salah, masalah muncul saat browser memuat halaman.

## Catatan Keamanan

Asset yang berkaitan dengan portal, terminal, dan OTA ikut dimuat di sini. Jika `crypto.js` atau halaman update tidak sinkron dengan firmware, enkripsi command/password atau upload firmware bisa gagal.

## Catatan Performa

Header ini besar karena berisi ribuan byte asset. `PROGMEM` penting agar asset tidak menghabiskan heap ESP8266.

## Catatan Debugging

Jika perubahan di `node/data/` tidak muncul di browser, jalankan ulang generator asset dan pastikan `WebAppData.h` ikut berubah.

## Hubungan dengan Laporan TA

File ini menjelaskan bagaimana UI lokal node dikemas ke firmware, bagian penting untuk dashboard lokal, captive portal, OTA, dan terminal WebSocket.
