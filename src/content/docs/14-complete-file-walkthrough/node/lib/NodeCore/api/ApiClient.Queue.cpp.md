---
title: "node/lib/NodeCore/api/ApiClient.Queue.cpp"
---

# node/lib/NodeCore/api/ApiClient.Queue.cpp

File ini berisi wrapper queue dan ring buffer emergency.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Queue.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menghubungkan method private `ApiClient` ke `ApiClientQueueController`, lalu menyediakan operasi ring buffer untuk emergency record di RAM.

## Kenapa File Ini Ada

Facade `ApiClient` tetap punya nama method lama, tetapi implementasinya diarahkan ke queue controller. Ring buffer emergency tetap langsung ada di facade karena kecil dan dekat dengan state.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `loadRecordFromRtc` | Delegasi baca record RTC. |
| `loadRecordFromLittleFs` | Delegasi baca record LittleFS. |
| `loadRecordForUpload` | Delegasi pemilihan record upload. |
| `popLoadedRecord` | Delegasi hapus record yang sudah sukses. |
| `enqueueEmergencyRecord` | Menambah emergency record ke ring buffer. |
| `peekEmergencyRecord` | Melihat record paling depan tanpa menghapus. |
| `popEmergencyRecord` | Mengambil dan menghapus record paling depan. |
| `createAndCachePayload` | Delegasi pembuatan payload dan cache. |

## Catatan Desain

Emergency queue memakai head/tail/count dan kapasitas tetap. Saat queue kosong, head dan tail direset ke 0 agar state lebih mudah dibaca.

## Error Handling

Jika queue penuh, `enqueueEmergencyRecord` mengembalikan `false`. Jika queue kosong, `peek` dan `pop` juga mengembalikan `false`.

## Catatan Performa

Ring buffer tidak memakai alokasi heap. Ini penting karena emergency record sering dipakai justru saat storage atau memori sedang tertekan.

## Catatan Debugging

Jika emergency queue terasa tidak berkurang, cek `emergencyHead`, `emergencyTail`, `emergencyCount`, dan apakah `drainEmergencyQueueToStorage` dipanggil.

## Hubungan dengan Laporan TA

File ini menunjukkan mekanisme penyelamatan data sensor saat jalur penyimpanan utama sedang penuh atau gagal.
