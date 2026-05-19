---
title: "gateway/include/WebSerial.h"
---

# gateway/include/WebSerial.h

File ini mendeklarasikan terminal WebSerial custom untuk gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/WebSerial.h` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway membutuhkan terminal berbasis WebSocket agar operator bisa melihat output dan mengirim perintah lewat browser. File ini membuat class `WebSerialClass` yang meniru `Stream` sehingga dapat dipakai seperti output serial.

## Isi Utama

File ini berisi:

- alias callback `WebSerialCallback`,
- class `WebSerialClass : public Stream`,
- `begin(...)` untuk menempelkan WebSocket ke server,
- `onMessage(...)` untuk menerima pesan client,
- `print`, `println`, dan `printf`,
- implementasi method dasar `Stream`,
- global instance `WebSerial`.

## Data Masuk

Data masuk berupa pesan WebSocket dari client browser.

## Data Keluar

Data keluar berupa teks yang dikirim ke semua client WebSocket yang terhubung.

## Kapan Dipakai

File ini dipakai saat gateway menyediakan terminal/debug output lokal melalui web.

## Error yang Mungkin Terjadi

- Karena `available()`, `read()`, dan `peek()` tidak membaca input seperti Stream penuh, kode yang mengharapkan input Stream biasa tidak bisa langsung mengandalkannya.
- Jika banyak client tersambung dan output terlalu sering, WebSocket dapat membebani memori.
- Jika callback pesan tidak dipasang, input dari client tidak diproses.

## Bagian untuk Pemula

WebSerial adalah terminal lewat browser. Operator tidak perlu kabel serial untuk membaca sebagian pesan gateway.

## Bagian Advanced

Class memakai static `_ws` dan static callback, sehingga desainnya singleton. Ini cocok untuk satu terminal gateway, tetapi tidak untuk banyak instance independen.

## Hubungan ke Sistem TA

Terminal lokal membantu debugging gateway, cek status, dan operasi lapangan saat sistem greenhouse bermasalah.
