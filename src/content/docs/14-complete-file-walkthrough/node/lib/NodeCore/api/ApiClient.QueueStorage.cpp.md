---
title: "node/lib/NodeCore/api/ApiClient.QueueStorage.cpp"
---

# node/lib/NodeCore/api/ApiClient.QueueStorage.cpp

File ini mengimplementasikan baca/tulis queue RTC dan LittleFS.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.QueueStorage.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini membaca record upload dari RTC atau LittleFS, memilih record mana yang dikirim lebih dulu, menghapus record yang sudah sukses, dan memindahkan cache RTC ke LittleFS saat RTC penuh.

## Kenapa File Ini Ada

Node memakai dua jenis cache. RTC cepat dan kecil, LittleFS lebih besar tetapi lebih lambat. File ini membuat keduanya bekerja sebagai antrian upload yang bisa dipulihkan.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `loadRecordFromRtc` | Membaca record depan RTC dan membangun payload. |
| `loadRecordFromLittleFs` | Membaca satu record dari cache file system. |
| `loadRecordForUpload` | Mengunci sumber record agar retry tetap memakai sumber yang sama. |
| `popLoadedRecord` | Menghapus record dari sumber yang berhasil diupload. |
| `flushRtcToLittleFs` | Memindahkan semua record RTC ke LittleFS saat RTC penuh. |

## Alur Pemilihan Record

1. Jika sebelumnya sudah ada sumber terkunci, coba baca dari sumber itu dulu.
2. Jika tidak ada record terkunci, coba RTC.
3. Jika RTC kosong, coba LittleFS.
4. Jika salah satu sumber butuh retry, status `RETRY` dikembalikan.
5. Jika ada error berat, status `FATAL` dikembalikan.

## Error Handling

Record corrupt dari RTC atau LittleFS ditangani dengan pesan broadcast dan retry. Flush RTC punya guard loop agar tidak berputar tanpa akhir, serta drop record yang berulang kali gagal diserialisasi.

## Catatan Performa

Saat flush, loop dibatasi `RTC_MAX_RECORDS * 4` dan memakai `ESP.wdtFeed()` agar proses bulk tidak memicu watchdog.

## Catatan Debugging

Jika cache tidak terkirim habis, cek `loadedRecordSource`, hasil `RtcManager::peekEx`, hasil `CacheManager::read_one`, dan apakah `popLoadedRecord` gagal tiga kali.

## Hubungan dengan Laporan TA

File ini menjelaskan strategi offline-first node: data sensor disimpan dulu, lalu dikirim saat jaringan siap.
