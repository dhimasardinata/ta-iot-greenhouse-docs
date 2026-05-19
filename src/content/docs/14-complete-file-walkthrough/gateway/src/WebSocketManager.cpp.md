---
title: "gateway/src/WebSocketManager.cpp"
---

# gateway/src/WebSocketManager.cpp

File ini mengimplementasikan WebSocket status dan aksi dashboard gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/WebSocketManager.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Dashboard lokal perlu menerima status gateway real-time dan mengirim aksi seperti auth admin, scan Wi-Fi, change Wi-Fi, threshold, schedule, mode, fetch manual, dan epoch client. File ini menangani pesan WebSocket tersebut.

## Area Besar dalam File

File ini mencakup:

- slot admin WebSocket dengan TTL 30 menit,
- cache mutation result,
- enkripsi dan dekripsi frame WebSocket memakai `CryptoUtils`,
- listener disconnect Wi-Fi STA,
- helper diagnosis kegagalan Wi-Fi,
- builder JSON status gateway,
- broadcast status,
- kirim hasil mutation ke client,
- event async Wi-Fi scan/change,
- admin auth,
- handler incoming WebSocket message.

## Status JSON

`buildStatusDoc(...)` menyusun status dari `SensorDataManager`, `RelayController`, `MyNetworkManager`, `RTCManager`, dan `GatewayControlState`. Status ini menjadi bahan dashboard lokal.

## Admin dan Aksi Sensitif

File ini memakai session admin WebSocket dan juga memanggil fungsi auth dari `ConfigManager`. Aksi sensitif dapat meminta admin auth sebelum diteruskan ke antrian deferred action.

## Wi-Fi Workflow

File ini menangani request scan Wi-Fi, cache hasil scan, request perubahan Wi-Fi, log proses Wi-Fi, dan hasil perubahan Wi-Fi. Ada default password untuk SSID GH Atas/GH Bawah yang terlihat hardcoded di source.

## Data Masuk

Data masuk berupa frame WebSocket terenkripsi atau plaintext, password admin, SSID/password Wi-Fi, request mutation, dan status internal gateway.

## Data Keluar

Data keluar berupa frame WebSocket terenkripsi berisi status, hasil mutation, hasil scan Wi-Fi, log Wi-Fi, dan pesan admin required.

## Error yang Mungkin Terjadi

- Jika frame encrypted gagal decrypt, request client ditolak.
- Jika admin slot expired, aksi sensitif perlu login ulang.
- Jika hasil scan/cache Wi-Fi terlalu lama, UI bisa menampilkan data lama.
- Jika default password hardcoded tidak cocok kondisi lapangan, auto password untuk SSID dikenal bisa gagal.

## Bagian untuk Pemula

WebSocket membuat halaman dashboard mendapat update tanpa refresh. File ini mengatur pesan masuk dan keluar antara browser dan gateway.

## Bagian Advanced

File ini menjadi penghubung UI ke action queue di `main.cpp`. Jadi perubahan kontrol tidak selalu dijalankan langsung dari handler WebSocket, tetapi dikirim sebagai mutation/deferred action.

## Hubungan ke Sistem TA

Monitoring lokal real-time, ganti Wi-Fi dari dashboard, auth admin, dan kontrol lokal gateway bergantung pada file ini.
