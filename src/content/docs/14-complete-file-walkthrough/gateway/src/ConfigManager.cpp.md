---
title: "gateway/src/ConfigManager.cpp"
---

# gateway/src/ConfigManager.cpp

File ini mengimplementasikan konfigurasi, portal setup, autentikasi admin, dan OTA handler gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/ConfigManager.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway perlu memuat konfigurasi dari NVS, menjalankan portal konfigurasi saat diperlukan, mengamankan aksi admin, dan menerima update firmware OTA. File ini menggabungkan fungsi-fungsi tersebut.

## Area Utama

File ini mencakup:

- variabel global konfigurasi aktif,
- admin session token,
- rate limit login admin,
- encrypted admin proof,
- validasi scope request admin,
- konteks upload OTA dengan SHA-256,
- halaman OTA embedded,
- loading konfigurasi dari NVS,
- portal konfigurasi AP,
- handler upload OTA,
- clear Wi-Fi dan simpan GPRS.

## Load Configuration

`loadConfiguration()` membaca namespace `device-config`, lalu mengisi:

- SSID dan password,
- token API,
- token TA API,
- threshold URL,
- node data base URL,
- admin password,
- GPRS enabled,
- device status URL.

Jika URL lama berisi `node-data`, file ini memigrasikannya ke default baru dan menyimpan ulang ke NVS.

## Admin Auth

Autentikasi admin memakai:

- password admin,
- rate limit per binding,
- session token 30 menit,
- binding berdasarkan IP client,
- token dari encrypted proof, header, bearer token, atau param,
- optional encrypted proof untuk aksi sensitif.

## Portal Konfigurasi

`startConfigPortal(...)` membuat AP `Gateway-Config-<GH_ID_CONFIG>` dengan password AP yang terlihat hardcoded di source. Portal menyediakan route:

- `/` untuk halaman konfigurasi,
- `/scan` untuk scan Wi-Fi,
- `/save` untuk menyimpan konfigurasi,
- redirect captive untuk route lain.

Setelah menyimpan konfigurasi atau timeout portal, gateway restart.

## OTA Handler

`setupOtaHandlers(...)` memasang `POST /doUpdate`. Upload OTA harus authorized, metadata filename/size/SHA-256 harus cocok, hash upload dihitung selama stream, lalu firmware ditulis melalui `Update`.

## Data Masuk

Data masuk berasal dari NVS, form portal, request admin, header OTA, encrypted proof, upload firmware, dan parameter HTTP.

## Data Keluar

Data keluar berupa konfigurasi aktif, data tersimpan di NVS, response HTTP, status LCD, update firmware, dan restart perangkat.

## Error yang Mungkin Terjadi

- Jika NVS gagal atau kosong, default dari `config.h` dipakai.
- Jika admin proof tidak cocok method/path/file/upload metadata, request ditolak.
- Jika upload OTA hash atau size tidak cocok, update dibatalkan.
- Portal AP dan password admin/default terlihat hardcoded di source; ini perlu dicatat sebagai risiko keamanan produksi.
- `OtaUploadAuthContext` memakai allocation manual pada request temp object; cleanup harus selalu terjadi agar tidak bocor.

## Bagian untuk Pemula

File ini adalah tempat gateway menyimpan pengaturan Wi-Fi dan server. Saat gateway belum dikonfigurasi, file ini membuat halaman setup agar pengguna bisa mengisi data.

## Bagian Advanced

OTA di file ini sudah mengikat authorization dengan metadata dan SHA-256. Ini jauh lebih kuat daripada upload file bebas, tetapi tetap bergantung pada keamanan admin token, proof terenkripsi, dan password default.

## Hubungan ke Sistem TA

Tanpa konfigurasi yang benar, gateway tidak bisa masuk jaringan, mengambil data TA, atau menerima update firmware secara aman.
