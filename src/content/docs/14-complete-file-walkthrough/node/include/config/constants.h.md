---
title: "node/include/config/constants.h"
---

# node/include/config/constants.h

File ini menyimpan konstanta global firmware node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/config/constants.h` |
| Komponen | Firmware Node |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas menjadi pusat angka penting firmware: timeout Wi-Fi, interval NTP, interval sensor, timeout OTA, ukuran buffer TLS, batas command, batas kalibrasi, batas heap, dan aturan keamanan terminal.

## Kenapa File Ini Ada

Jika angka penting tersebar di banyak file, perubahan menjadi berisiko. Dengan `AppConstants`, nilai yang dipakai banyak modul bisa dilacak dari satu tempat.

## Kelompok Konstanta

| Kelompok | Contoh Isi |
|---|---|
| Wi-Fi dan Network | DNS port dan jumlah client WebSocket. |
| Rate limiting | Batas gagal login dan durasi lockout. |
| Application timers | Stabilisasi sensor, delay reboot, loop watchdog. |
| WifiManager timers | Timeout koneksi, interval reconnect, watchdog disconnect. |
| NTP timers | Delay awal, interval retry, timeout sync, timezone WIB. |
| OTA timers | Delay cek update, interval reguler, timeout stall, durasi maksimum. |
| Sensor | Alamat BH1750, interval baca SHT/BH1750, batas gagal sensor. |
| Session/security | Timeout WebSocket session dan replay skew. |
| Memory | Threshold heap, fragmentasi, batas aman HTTP/TLS. |
| Terminal/WebSocket | Ukuran packet, jumlah argumen command, batas sanitasi input. |
| Fallback gateway | Ambang gagal cloud dan port gateway lokal. |

## Konsep Dasar yang Perlu Dipahami

- `namespace AppConstants` mencegah nama konstanta bentrok dengan file lain.
- `constexpr` membuat nilai tetap dan bisa dihitung saat compile.
- `static_assert` memaksa aturan dicek saat compile.
- Time value memakai milidetik agar cocok dengan `millis()`.

## Error Handling

File ini tidak menangani error runtime, tetapi memakai `static_assert` untuk mencegah konfigurasi yang tidak masuk akal, misalnya interval session check lebih lama dari timeout session.

## Catatan Keamanan

Konstanta keamanan penting ada di sini: batas gagal auth, lockout, session timeout, batas replay WebSocket, batas input command, dan ukuran paket WebSocket.

## Catatan Performa

Nilai heap dan buffer TLS sangat penting untuk ESP8266. Jika terlalu besar, TLS bisa menghabiskan RAM. Jika terlalu kecil, HTTPS bisa gagal.

## Catatan Debugging

Jika ada timeout terlalu cepat, koneksi sering ulang, OTA berhenti, command ditolak, atau TLS gagal karena heap, file ini adalah tempat pertama untuk mengecek nilai batasnya.

## Hubungan dengan Laporan TA

File ini berhubungan dengan parameter pengujian QoS, reliabilitas, keamanan terminal, OTA, caching, konektivitas Wi-Fi, dan batasan performa firmware node.
