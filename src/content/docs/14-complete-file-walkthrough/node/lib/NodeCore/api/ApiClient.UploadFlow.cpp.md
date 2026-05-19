---
title: "node/lib/NodeCore/api/ApiClient.UploadFlow.cpp"
---

# node/lib/NodeCore/api/ApiClient.UploadFlow.cpp

File ini mengimplementasikan alur upload ke gateway, recovery queue, dan penyelesaian record.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.UploadFlow.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini berisi fungsi upload yang berada di antara queue dan transport: membangun URL gateway, upload lokal ke gateway, reset state record, broadcast dispatch, menyelesaikan record yang sukses, recovery pop queue, dan memilih target queued upload.

## Kenapa File Ini Ada

Data yang sudah ada di queue perlu diperlakukan konsisten. Setelah dikirim, record harus dihapus dari sumber yang benar. Jika gagal dihapus, sistem harus recovery sebelum lanjut agar data tidak hilang atau terkirim ganda tanpa kontrol.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `buildLocalGatewayUrl` | Membuat URL `/api/data` untuk gateway lokal. |
| `performLocalGatewayUpload` | Mencoba POST ke kandidat gateway. |
| `resetSampleAccumulator` | Reset akumulator RSSI/sampling. |
| `clearCurrentRecordFlags` | Bersihkan flag pengiriman record saat ini. |
| `finishLoadedRecordSuccess` | Pop record sumber dan broadcast sukses. |
| `recoverPendingQueuePop` | Mencoba ulang pop record yang sebelumnya gagal. |
| `resolveQueuedUploadTarget` | Memilih proceed, wait, atau hold untuk cloud/edge. |

## Error Handling

Jika gateway URL tidak bisa dibuat, HTTP client gagal dialokasi, atau POST gateway gagal, `UploadResult` berisi status gagal. Jika pop queue gagal setelah upload sukses, cooldown dipasang agar recovery dilakukan dulu.

## Catatan Debugging

Jika data terkirim tetapi queue tidak berkurang, fokus ke `finishLoadedRecordSuccess`, `popLoadedRecord`, dan `applyQueuePopFailureCooldown`.

## Hubungan dengan Laporan TA

File ini menjelaskan bagaimana node menjaga konsistensi data saat upload sukses, gagal, atau harus berpindah antara cloud dan gateway.
