---
title: "node/include/generated/certs.h"
---

# node/include/generated/certs.h

File ini menyimpan sertifikat dan private key lokal hasil generate.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/generated/certs.h` |
| Komponen | Firmware Node |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas menyimpan `server_cert` dan `server_key` sebagai byte array di `PROGMEM`.

## Kenapa File Ini Ada

Jika firmware perlu menjalankan layanan lokal berbasis TLS atau memakai material sertifikat lokal, data sertifikat harus tersedia di firmware. File ini adalah hasil konversi dari PEM ke array C++.

## Isi Utama

| Simbol | Fungsi |
|---|---|
| `server_cert` | Sertifikat server lokal dalam bentuk byte array. |
| `server_cert_len` | Panjang sertifikat. |
| `server_key` | Private key pasangan sertifikat. |
| `server_key_len` | Panjang private key. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/tools/certs/dev-cert.pem` | Sumber sertifikat development. |
| `node/tools/certs/dev-private.key` | Sumber private key development. |
| `node/scripts/convert_certs.py` | Generator array sertifikat. |

## Konsep Dasar yang Perlu Dipahami

- Sertifikat membuktikan identitas server.
- Private key harus dijaga rahasia.
- `PROGMEM` menyimpan data di flash.
- Self-signed certificate biasanya dipakai untuk development atau jaringan lokal.

## Input

Input berasal dari file PEM sertifikat dan private key.

## Output

Output berupa array C++ yang dapat dipakai firmware.

## Error Handling

File ini tidak menjalankan error handling. Jika sertifikat dan key tidak cocok, fitur TLS lokal yang memakainya akan gagal.

## Catatan Keamanan

File ini mengandung private key. Jika key ini dipakai di perangkat nyata dan file source tersebar, private key dianggap bocor. Gunakan hanya material development atau rotasi key untuk deployment.

## Catatan Debugging

Jika TLS lokal gagal start, cek apakah `server_cert` dan `server_key` berasal dari pasangan yang sama dan apakah format array masih null-terminated sesuai kebutuhan library.

## Hubungan dengan Laporan TA

File ini terkait keamanan komunikasi lokal, sertifikat development, dan batasan keamanan pada firmware node.
