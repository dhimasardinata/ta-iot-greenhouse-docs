---
title: "node/lib/NodeCore/api/ApiClient.Upload.cpp"
---

# node/lib/NodeCore/api/ApiClient.Upload.cpp

File ini berisi wrapper upload facade untuk `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Upload.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini tidak berisi logic panjang. Ia meneruskan method upload dari `ApiClient` ke `ApiClientUploadController`.

## Kenapa File Ini Ada

Facade `ApiClient` tetap menjadi pintu masuk tunggal, tetapi implementasi upload dipisah ke controller. File ini menjaga pemisahan tersebut tanpa mengubah nama method internal yang sudah dipakai file lain.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `buildLocalGatewayUrl` | Delegasi membuat URL gateway lokal. |
| `performLocalGatewayUpload` | Delegasi upload ke gateway lokal. |
| `populateEmergencyRecord` | Delegasi membuat emergency record. |
| `appendEmergencyRecordToRtc` / `appendEmergencyRecordToLittleFs` | Delegasi penyimpanan emergency record. |
| `tryDirectSendEmergencyRecord` | Delegasi kirim langsung saat storage gagal. |
| `finishLoadedRecordSuccess` | Delegasi penyelesaian record sukses. |
| `recoverPendingQueuePop` | Delegasi recovery pop queue. |
| `resolveQueuedUploadTarget` | Delegasi pemilihan target queued upload. |

## Catatan Desain

File ini adalah lapisan adapter. Nilainya ada pada struktur kode: class besar tetap punya interface lengkap, tetapi implementasi detail bisa dikelola per controller.

## Catatan Debugging

Jika mencari logic upload sebenarnya, jangan berhenti di file ini. Lanjut ke `ApiClient.UploadFlow.cpp`, `ApiClient.UploadRecords.cpp`, atau file upload runtime.

## Hubungan dengan Laporan TA

File ini menunjukkan pola arsitektur internal firmware: facade stabil, implementasi dipisah agar modul upload lebih mudah dipelajari.
