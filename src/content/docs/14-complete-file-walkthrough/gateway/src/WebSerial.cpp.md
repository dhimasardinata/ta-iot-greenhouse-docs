---
title: "gateway/src/WebSerial.cpp"
---

# gateway/src/WebSerial.cpp

File ini mengimplementasikan WebSerial custom dan halaman dashboard lokal gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/WebSerial.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway membutuhkan halaman lokal yang bisa menampilkan dashboard, node, schedule, Wi-Fi, file SD Card, terminal, dan OTA. File ini menyimpan HTML/CSS/JavaScript besar sebagai `UNIFIED_HTML`, lalu menyediakan WebSocket terminal yang mengirim output terenkripsi.

## Isi Utama

File ini berisi:

- static WebSocket pointer dan callback,
- helper `sendEncryptedWebSerialFrame(...)`,
- asset `UNIFIED_HTML` di `PROGMEM`,
- tab dashboard, nodes, schedule, Wi-Fi, files, terminal, dan OTA,
- JavaScript client-side untuk crypto, admin token, command, Wi-Fi action, upload OTA, theme, dan rendering status,
- implementasi `WebSerialClass::begin(...)`,
- method `print`, `println`, `printf`, `write`,
- handler event WebSocket.

## Data Masuk

Data masuk berupa command dari browser, file OTA dari UI, aksi Wi-Fi, form threshold/schedule, dan event WebSocket.

## Data Keluar

Data keluar berupa halaman HTML lokal dan pesan WebSocket terenkripsi ke semua client.

## Kapan Dipakai

File ini dipakai saat gateway menjalankan web dashboard lokal dan terminal operator.

## Error yang Mungkin Terjadi

- Karena HTML/JS sangat besar dan embedded, perubahan UI membutuhkan rebuild firmware.
- Jika crypto JS dan `CryptoUtils.cpp` tidak cocok format, WebSocket terenkripsi gagal dibaca.
- Jika banyak pesan terminal dikirim ke semua client, memori dan bandwidth lokal bisa naik.
- Jika browser lama tidak mendukung fitur JavaScript yang dipakai, UI bisa gagal.

## Bagian untuk Pemula

File ini adalah halaman web yang tinggal di dalam gateway. Saat dibuka lewat browser, operator bisa melihat status dan mengirim perintah.

## Bagian Advanced

`WebSerialClass` adalah singleton berbasis static member. Fungsi `write()` mengirim frame terenkripsi sehingga output terminal bukan teks polos biasa pada jalur WebSocket.

## Hubungan ke Sistem TA

Dashboard lokal, terminal, download log, Wi-Fi switch, dan OTA lokal gateway bergantung pada file ini.
