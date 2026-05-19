---
title: "node/lib/NodeCore/api/ApiClient.TransportSupport.cpp"
---

# node/lib/NodeCore/api/ApiClient.TransportSupport.cpp

File ini berisi fungsi pendukung transport: NTP fallback, target cloud, relay, error message, signature, dan QoS sample.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.TransportSupport.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menangani hal pendukung upload: mengambil waktu dari header HTTP saat NTP macet, memilih URL cloud/relay, membuat pesan error yang mudah dibaca, membuat HMAC signature payload, dan menjalankan satu sample QoS.

## Kenapa File Ini Ada

Transport upload bukan hanya kirim request. Firmware juga butuh waktu yang benar, fallback relay, signature edge, dan pengujian endpoint. File ini memisahkan pekerjaan pendukung tersebut dari state machine utama.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `tryNtpFallbackProbe` | Mencoba sync waktu dari server jika NTP lama tidak berhasil. |
| `probeServerTimeHeader` | Mengirim HEAD request dan membaca header `Date`. |
| `updateCloudTargetCacheFor` | Memecah URL direct/relay menjadi host dan path. |
| `activateRelayFallback` | Memaksa retry berikutnya lewat relay dan memasang pin waktu. |
| `clearRelayFallback` | Mengembalikan route ke direct bila sudah pulih. |
| `buildErrorMessage` | Membuat pesan hasil HTTP yang ringkas. |
| `signPayload` | Membuat HMAC-SHA256 untuk payload edge. |
| `executeQosSample` | Menjalankan satu request QoS GET/POST. |

## Error Handling

Jika token upload kosong, signature dikosongkan dan error dicatat. Jika NTP fallback gagal connect atau membaca response, fungsi mengembalikan `false` setelah melepas TLS.

## Catatan Keamanan

`signPayload` memakai token upload efektif sebagai kunci HMAC. Nilai token tidak dicetak, hanya dipakai untuk membuat signature.

## Catatan Debugging

Jika gateway menolak payload edge, cek apakah `X-Signature` dibuat, token upload aktif, dan payload tidak kosong.

## Hubungan dengan Laporan TA

File ini mendukung integritas data edge dan fallback waktu/relay saat koneksi normal bermasalah.
