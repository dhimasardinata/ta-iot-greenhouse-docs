---
title: "node/lib/NodeCore/api/ApiClient.TransportShared.cpp"
---

# node/lib/NodeCore/api/ApiClient.TransportShared.cpp

File ini mengimplementasikan helper transport HTTP bersama.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.TransportShared.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini berisi fungsi pendukung jaringan: memilih target gateway, membuat bearer token, memecah URL cloud, membaca baris HTTP, menulis stream dengan timeout, membaca header, sinkronisasi waktu, dan membaca potongan body response.

## Kenapa File Ini Ada

Upload HTTP punya banyak operasi kecil yang berulang. File ini menyatukan operasi tersebut agar implementasi transport utama lebih fokus pada state machine dan hasil upload.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `resolveEdgeGatewayTargets` | Mengambil gateway primary/secondary dari config berdasarkan pairing greenhouse. |
| `build_bearer` | Menulis header authorization dengan prefix `Bearer `. |
| `build_auth_header_for_upload` | Membuat auth header dari token upload aktif. |
| `build_auth_header_for_ota` | Membuat auth header dari token OTA aktif. |
| `resolveCloudTarget` | Memecah URL menjadi host dan path dengan fallback default. |
| `read_line` | Membaca response line sampai newline atau timeout. |
| `write_all` | Menulis data sampai selesai, timeout, atau disconnect. |
| `parse_status_code` | Mengambil tiga digit kode HTTP. |
| `lookup_http_reason_P` | Mengubah kode HTTP umum menjadi pesan pendek. |
| `parse_response_headers` | Mengambil `Date` dan `Location`. |
| `sync_time_from_http_date` | Mengisi waktu NTP dari header `Date`. |
| `read_body_preview` | Membaca potongan body untuk debug/error. |
| `response_body_indicates_waf_block` | Mengenali body yang menunjukkan blokir Imunify360/bot protection. |

## Error Handling

Fungsi membaca/menulis stream mengembalikan status timeout, disconnect, atau hasil kosong. Fungsi URL dan auth header juga memakai fallback atau `false` jika token kosong.

## Catatan Keamanan

Token auth tidak dicetak ke dokumentasi atau log oleh helper ini. Fungsi hanya menyusun header di buffer runtime.

## Catatan Performa

Semua operasi memakai buffer tetap dan copy berbatas ukuran. Ini menghindari alokasi string dinamis saat sedang melakukan upload.

## Catatan Debugging

Jika server mengembalikan redirect atau blokir WAF, cek `lastResponseLocation`, body preview, dan hasil `response_body_indicates_waf_block`.

## Hubungan dengan Laporan TA

File ini adalah lapisan utilitas yang membuat komunikasi node lebih robust terhadap variasi response HTTP dan kondisi jaringan.
