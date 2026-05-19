---
title: "node/lib/NodeCore/api/ApiClient.Security.cpp"
---

# node/lib/NodeCore/api/ApiClient.Security.cpp

File ini mengatur resource TLS dan trust anchor API.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Security.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menyiapkan sertifikat root, mengecek heap sebelum TLS, mengatur fallback insecure jika perlu, dan melepas resource TLS setelah upload selesai.

## Kenapa File Ini Ada

HTTPS di ESP8266 butuh RAM cukup besar. Jika TLS dipaksa saat heap terfragmentasi, upload bisa gagal. File ini mengatur kapan TLS aman dipakai dan kapan resource harus dilepas.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `ensureTrustAnchors` | Membuat `BearSSL::X509List` dari `ROOT_CA_PEM` jika belum ada trust anchor eksternal. |
| `activeTrustAnchors` | Memilih trust anchor dari dependency atau lokal. |
| `prepareTlsHeap` | Melepas buffer QoS, HTTP client, scan cache, dan crypto scratch saat heap tertekan. |
| `acquireTlsResources` | Menyiapkan secure client, trust anchor, buffer TLS, atau fallback insecure. |
| `releaseTlsResources` | Menghentikan secure client, reset buffer, dan log perubahan heap. |
| `setTrustAnchors` | Mengganti trust anchor aktif dari luar. |

## Alur TLS

1. Heap disiapkan dan dicek.
2. Jika heap tidak cukup, TLS tidak dialokasikan.
3. Jika mode insecure diizinkan, client langsung dibuat insecure.
4. Jika secure path cukup sehat, trust anchor dipasang.
5. Jika secure path tidak cukup, fallback insecure bisa dipakai dengan warning.
6. Setelah selesai, client dihentikan dan resource dilepas.

## Catatan Keamanan

Fallback insecure hanya dipilih saat config mengizinkan atau heap tidak cukup untuk secure path. File ini juga mengirim warning `[SEC]` saat fallback insecure terjadi karena tekanan memori.

## Error Handling

Jika alokasi trust anchor gagal, fungsi mengembalikan `false` dan menulis warning. Jika heap tidak sehat, TLS allocation dilewati daripada memaksa sistem gagal lebih parah.

## Catatan Debugging

Jika HTTPS sering fallback insecure, cek log heap `TLS alloc skipped` dan nilai `tlsSecureExtraBlock` / `tlsSecureExtraTotal` di policy.

## Hubungan dengan Laporan TA

File ini mendukung pembahasan keamanan komunikasi node sekaligus keterbatasan RAM perangkat embedded.
