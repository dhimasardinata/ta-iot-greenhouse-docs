---
title: "gateway/include/DeferredControlActions.h"
---

# gateway/include/DeferredControlActions.h

File ini mendeklarasikan antrian aksi kontrol yang ditunda.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/DeferredControlActions.h` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Beberapa perubahan kontrol tidak selalu aman dijalankan langsung dari handler request atau callback. File ini menyediakan fungsi untuk memasukkan permintaan perubahan ke antrian, lalu bagian utama firmware dapat menjalankannya pada waktu yang lebih aman.

## Fungsi yang Dideklarasikan

| Fungsi | Tujuan awal |
|---|---|
| `enqueueLocalThresholdMutation(...)` | Menjadwalkan perubahan threshold lokal. |
| `enqueueLocalScheduleMutation(...)` | Menjadwalkan perubahan schedule lokal. |
| `enqueueSourceModeMutation(...)` | Menjadwalkan perubahan mode sumber data. |
| `enqueueManualFetchMutation(...)` | Menjadwalkan fetch manual untuk greenhouse tertentu. |
| `enqueueClientEpochMutation(...)` | Menjadwalkan pembaruan waktu dari epoch client. |

## Data Masuk

Data masuk dapat berupa nilai threshold, konfigurasi schedule, mode sumber data, greenhouse ID, epoch waktu client, client ID untuk balasan, dan request ID.

## Data Keluar

Setiap fungsi mengembalikan `bool`, yang menunjukkan apakah permintaan berhasil masuk antrian atau tidak.

## Kapan Dipakai

File ini kemungkinan dipakai saat gateway menerima perintah dari WebSocket, terminal, atau dashboard lokal. Detail pemanggil harus dikonfirmasi lagi di implementasi dan source pengguna fungsi.

## Error yang Mungkin Terjadi

- Jika antrian penuh atau tidak siap, fungsi dapat mengembalikan `false`.
- Jika request ID tidak dibawa dengan benar, balasan ke client bisa sulit dicocokkan.
- Jika perubahan threshold atau schedule tidak divalidasi sebelum masuk antrian, keputusan kontrol aktuator bisa menerima nilai buruk.

## Bagian untuk Pemula

Antrian ini seperti daftar tugas. Perintah dari pengguna tidak langsung mengubah alat, tetapi ditulis dulu sebagai tugas yang akan diproses oleh gateway.

## Bagian Advanced

Desain deferred action membantu mengurangi risiko kerja berat di callback jaringan. Namun dokumentasi final perlu memeriksa implementasi antrian, kapasitas, dan kapan tugas diproses.

## Hubungan ke Sistem TA

Threshold, jadwal, mode cloud/edge/auto, fetch manual, dan waktu client memengaruhi cara gateway mengambil keputusan kontrol greenhouse.
