---
title: "node/data/terminal.js"
---

# node/data/terminal.js

File ini menjalankan terminal lokal node di browser.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/data/terminal.js` |
| Komponen | Firmware Node |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas mengatur tema, membuka WebSocket ke node, mengenkripsi command, mendekripsi response, menampilkan output terminal, melakukan reconnect, dan menyesuaikan tampilan ketika keyboard mobile muncul.

## Posisi File dalam Sistem

File ini dimuat oleh `terminal.html` dan bergantung pada `crypto.js`. Di firmware, komunikasi WebSocket ditangani oleh `DiagnosticsTerminal`.

## Alur Kerja File

1. Tema light/dark dibaca dari `localStorage`.
2. Fungsi `encryptMessage()` dan `decryptMessage()` dibuat memakai `CryptoJS`.
3. WebSocket dibuka ke `/ws`.
4. Saat tersambung, browser mengirim waktu ke `/api/time` dan command `status`.
5. Response WebSocket didekripsi.
6. Jika response JSON bertipe `init`, banner node dan versi firmware dicetak.
7. Command dari input dienkripsi lalu dikirim melalui WebSocket.
8. Jika koneksi putus, reconnect dijadwalkan.

## Fungsi Penting

| Fungsi | Fungsi |
|---|---|
| `encryptMessage()` | Menambahkan timestamp, membuat IV, lalu mengenkripsi command AES-CBC. |
| `decryptMessage()` | Memisahkan IV/ciphertext, mendekripsi payload, dan membuang timestamp. |
| `connectWS()` | Membuka koneksi WebSocket dan memasang handler event. |
| `sendCmd()` | Menampilkan command dan mengirim command terenkripsi. |
| `printBanner()` | Menampilkan banner node, firmware, dan node id. |
| `syncClientTime()` | Mengirim waktu browser ke firmware. |

## Input

Input berupa command pengguna, pesan WebSocket terenkripsi, response JSON init, ukuran viewport, dan perubahan tema.

## Output

Output berupa paket WebSocket terenkripsi, tampilan console, status connected/disconnected, dan request waktu ke `/api/time`.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/data/crypto.js` | Menyediakan `CryptoJS`. |
| `node/lib/NodeCore/terminal/DiagnosticsTerminal.cpp` | Memproses command dan mengirim response. |
| `node/lib/NodeCore/support/CryptoUtils.cpp` | Pasangan dekripsi/enkripsi di firmware. |
| `node/lib/NodeCore/web/AppServer.Routes.cpp` | Menyediakan `/api/time` dan asset terminal. |

## Catatan Keamanan

Command terminal dienkripsi dengan AES-CBC dan diberi timestamp 4 byte untuk membantu membatasi replay. Kunci terlihat hardcoded di JavaScript, jadi ini lebih cocok sebagai perlindungan dasar komunikasi lokal, bukan rahasia kuat terhadap orang yang punya akses ke asset firmware.

## Error Handling

File ini menangani kegagalan decrypt, kegagalan encrypt, WebSocket close/error, dan reconnect berkala. Jika command dikirim saat WebSocket belum open, pesan "Not connected" ditampilkan.

## Catatan Performa

Terminal menyesuaikan ukuran banner agar tidak memenuhi layar kecil. Reconnect diberi timer 2 detik agar tidak melakukan loop koneksi terlalu agresif.

## Catatan Debugging

Jika command tidak sampai, cek apakah `ws.readyState === WebSocket.OPEN`, apakah `/crypto.js` berhasil dimuat, dan apakah firmware menerima pesan di WebSocket `/ws`.

## Hubungan dengan Laporan TA

File ini mendukung WebSocket terminal, keamanan lokal AES-256-CBC, debugging node, dan maintenance perangkat.
