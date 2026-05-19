---
title: "Uji Keamanan"
---

# Uji Keamanan

Uji keamanan memastikan data greenhouse tidak mudah dipalsukan, dibaca sembarang orang, atau dirusak lewat request yang salah.

## Area Keamanan yang Terlihat

- HTTPS pada node dan backend.
- Bearer token untuk upload dan OTA.
- AES-CBC pada terminal atau portal tertentu.
- Validasi request di backend.
- Cache firmware OTA per node.
- Permission Android.
- Dependency audit NPM.
- Static analysis C++.

## Bukti dari Kode

- `node/lib/NodeCore/support/CryptoUtils.*`
- `node/lib/NodeCore/api/ApiClient.TransportSupport.cpp`
- `node/lib/NodeCore/api/ApiClient.TransportShared.cpp`
- `gateway/include/CryptoUtils.h`
- `gateway/include/EmbeddedCryptoJs.h`
- `web/OtaController.php`
- `web/ApiController.php`
- `node/.github/workflows/ci.yml`
- `node/Justfile`

## Skenario Uji

| Skenario | Harapan |
|---|---|
| Token kosong | Request ditolak atau tidak dikirim |
| Token salah | Backend menolak |
| Payload rusak | Tidak disimpan sebagai data valid |
| Firmware bukan `.bin` | Upload OTA ditolak |
| File OTA terlalu besar | Upload ditolak |
| Command terminal tanpa izin | Command sensitif ditolak |
| Dependency rentan | Audit memberi sinyal gagal |

## Batasan

AES-256-CBC melindungi isi pesan, tetapi tetap perlu autentikasi, validasi, dan replay protection. Detail replay protection harus dikonfirmasi file-by-file karena tidak boleh diasumsikan hanya dari nama fungsi enkripsi.

Lanjutkan ke [Blackbox Testing](./blackbox-testing.md).
