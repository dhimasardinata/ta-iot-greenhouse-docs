---
title: "Runtime Jaringan Firmware"
---

# Runtime Jaringan Firmware

Jaringan firmware adalah gabungan Wi-Fi, HTTP, HTTPS/TLS, WebSocket, captive portal, NTP, dan fallback cloud-edge. Sistem greenhouse tidak bisa menganggap koneksi selalu stabil, sehingga firmware perlu timeout, retry, cache, dan mode fallback.

## Jalur Jaringan Utama

| Jalur | Dipakai Oleh | Fungsi |
|---|---|---|
| Wi-Fi STA | Node dan gateway | Terhubung ke router atau jaringan greenhouse. |
| Access Point / portal | Node dan gateway | Konfigurasi lokal saat Wi-Fi belum siap. |
| HTTP/REST | Node, gateway, backend | Upload sensor, ambil threshold, jadwal, status, OTA metadata. |
| HTTPS/TLS | Node dan gateway | Komunikasi aman ke endpoint cloud/relay. |
| WebSocket | Browser lokal dan firmware | Terminal, status realtime, command lokal. |
| NTP / time API | Node dan gateway | Sinkronisasi waktu untuk timestamp, schedule, dan replay window. |
| Relay proxy | Node/gateway ke cloud | Fallback saat direct origin bermasalah. |
| GPRS/SIM800 | Gateway | Jalur cadangan atau jalur tambahan pada gateway. |

## Wi-Fi Credential dan Scan

Node dan gateway sama-sama menyimpan credential Wi-Fi. Node memakai `WifiCredentialStore` dengan built-in GH network dan user-saved network. Gateway juga punya store credential dan cache hasil scan.

Konsep penting:

- SSID maksimal sekitar 32 byte,
- password maksimal sekitar 64 byte,
- RSSI dipakai untuk memilih jaringan terbaik,
- hidden network perlu dicoba walau tidak muncul di scan,
- scan Wi-Fi bisa mahal untuk heap dan waktu.

Edge case:

- SSID sama bisa muncul dari beberapa access point,
- hasil scan bisa stale,
- RSSI rendah tidak selalu berarti koneksi gagal, tetapi risiko timeout naik,
- scan saat heap rendah bisa membuat service web lokal tidak responsif.

## HTTP dan HTTPS

HTTP dipakai untuk request biasa. HTTPS menambah TLS handshake, validasi sertifikat, buffer TLS, dan trust anchor.

Di node, TLS memakai BearSSL dan punya guard heap. Firmware mengecek free heap dan max block karena TLS butuh blok memori kontigu. Jika blok kontigu kecil, request bisa gagal walau total free heap terlihat cukup.

Edge case:

- DNS bisa gagal sebelum koneksi HTTP dibuat,
- TLS trust anchor bisa tidak cocok dengan hostname,
- waktu perangkat yang salah bisa membuat validasi sertifikat gagal,
- redirect atau response HTML error bisa terbaca seperti response API jika tidak dicek,
- timeout harus dibedakan antara connect, write, header, dan body.

## WebSocket dan Terminal

WebSocket dipakai agar browser dan firmware bisa saling kirim pesan tanpa request baru terus-menerus.

Di project ini WebSocket berkaitan dengan:

- terminal node,
- WebSerial gateway,
- status dashboard lokal,
- command terenkripsi,
- session timeout,
- replay protection.

Edge case:

- client disconnect saat command berjalan,
- output terminal terlalu panjang,
- banyak pesan bisa memenuhi queue,
- payload WebSocket perlu batas ukuran,
- command sensitif perlu autentikasi.

## Cloud, Edge, Auto, dan Relay

Mode cloud mengutamakan server. Mode edge mengutamakan gateway lokal. Mode auto memilih jalur sesuai kondisi.

Relay dipakai sebagai jalur alternatif saat direct origin API bermasalah. Ini membuat firmware perlu menyimpan state:

- target upload saat ini,
- jumlah gagal upload,
- kapan boleh retry cloud,
- apakah relay sedang dipin,
- apakah record saat ini sudah terkirim ke gateway.

Edge case:

- data bisa terkirim ganda jika status record tidak jelas,
- fallback terlalu cepat bisa membanjiri gateway,
- fallback terlalu lambat membuat data tertahan lama,
- mode auto perlu log agar operator tahu jalur yang sedang dipakai.

## Runtime Loop

Firmware tidak memakai model blocking panjang. Loop harus sering kembali agar Wi-Fi stack, OTA, WebSocket, sensor, dan watchdog tetap hidup.

Konsep yang muncul:

- timer interval,
- deferred action,
- yield saat heap/network butuh waktu,
- watchdog,
- state machine upload,
- throttle log.

## File yang Relevan

- [node/lib/NodeCore/net/WifiManager.h](../14-complete-file-walkthrough/node/lib/NodeCore/net/WifiManager.h.md)
- [node/lib/NodeCore/net/WifiCredentialStore.h](../14-complete-file-walkthrough/node/lib/NodeCore/net/WifiCredentialStore.h.md)
- [node/lib/NodeCore/api/ApiClient.Transport.cpp](../14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Transport.cpp.md)
- [node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp](../14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp.md)
- [node/lib/NodeCore/web/AppServer.h](../14-complete-file-walkthrough/node/lib/NodeCore/web/AppServer.h.md)
- [node/lib/NodeCore/terminal/DiagnosticsTerminal.h](../14-complete-file-walkthrough/node/lib/NodeCore/terminal/DiagnosticsTerminal.h.md)
- [gateway/include/MyNetworkManager.h](../14-complete-file-walkthrough/gateway/include/MyNetworkManager.h.md)
- [gateway/src/WebSocketManager.cpp](../14-complete-file-walkthrough/gateway/src/WebSocketManager.cpp.md)

## Halaman Lanjutan

- [Web UI Tertanam di Firmware](./firmware-embedded-web-ui.md)
- [GPRS dan Fallback Gateway](./gateway-gprs-fallback.md)
