---
title: "node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp"
---

# node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp

File ini mengimplementasikan policy runtime upload.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menentukan apa yang dilakukan saat memori rendah, upload sukses, upload gagal, gateway memberi hasil, dan gateway mode perlu dipolling.

## Kenapa File Ini Ada

Runtime upload perlu kebijakan yang konsisten: kapan backoff, kapan pindah ke gateway, kapan relay dipakai, kapan Wi-Fi ditoggle, dan kapan cloud dianggap pulih.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `notifyLowMemory` | Broadcast pesan upload dilewati karena RAM rendah. |
| `calculateBackoffInterval` | Menghitung exponential backoff dengan batas maksimum. |
| `trackUploadFailure` | Menambah counter gagal dan toggle Wi-Fi setelah 5 gagal. |
| `handleSuccessfulUpload` | Reset backoff, update timestamp sukses, clear relay/gateway recovery bila perlu. |
| `handleFailedUpload` | Broadcast gagal, relay fallback, backoff, dan local gateway fallback. |
| `isHeapHealthy` | Cek heap API minimum. |
| `processGatewayResult` | Memproses hasil upload edge atau live snapshot. |
| `checkGatewayMode` | Polling `/api/mode` dari kandidat gateway. |

## Error Handling

Upload gagal tidak langsung dibuang. File ini menaikkan counter, mengatur retry interval, bisa mengaktifkan relay, atau pindah ke gateway mode setelah threshold kegagalan.

## Catatan Debugging

Jika retry terlalu lama, cek `consecutiveUploadFailures`, hasil `calculateBackoffInterval`, dan apakah `MAX_BACKOFF_MS` sudah tercapai.

## Hubungan dengan Laporan TA

File ini menjelaskan strategi fault tolerance node saat cloud, relay, gateway, Wi-Fi, atau memori sedang tidak ideal.
