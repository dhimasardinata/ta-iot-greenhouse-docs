---
title: "node/lib/NodeCore/api/ApiClient.QosController.h"
---

# node/lib/NodeCore/api/ApiClient.QosController.h

File ini mendeklarasikan controller QoS untuk `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.QosController.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

QoS controller menjalankan tes kualitas koneksi untuk jalur upload data dan OTA. Ia menghitung jumlah sukses, durasi total, latensi minimum, dan latensi maksimum.

## Kenapa File Ini Ada

Node bisa berada di lokasi dengan Wi-Fi tidak stabil. Tes QoS membantu operator melihat apakah jalur API atau OTA sedang layak dipakai.

## Isi Penting

| Method | Fungsi |
|---|---|
| `requestUpload` | Menandai bahwa tes QoS upload diminta. |
| `requestOta` | Menandai bahwa tes QoS OTA diminta. |
| `handlePendingTask` | Menjalankan tugas QoS yang sedang menunggu. |
| `updateStats` | Memperbarui statistik durasi dan latensi. |
| `reportResults` | Mengirim ringkasan hasil QoS. |
| `performTest` | Menjalankan tes ke target tertentu dengan URL, method, dan payload. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ApiClient.h` | Tipe context, transport, QoS, dan facade. |
| `QosRuntime` | Menyimpan task, sample, statistik, dan buffer. |
| `TransportRuntime` | Membantu menjalankan HTTP sample. |
| `GuardPolicy` / `RuntimeHealth` | Menjaga tes tidak memaksa perangkat saat kondisi buruk. |

## Catatan Desain

Controller ini memakai `QosBuffers` agar URL, method, dan payload kecil tidak perlu dialokasikan berulang kali dengan string dinamis.

## Error Handling

Jika sample gagal, statistik tetap bisa dilaporkan. Tujuannya bukan hanya sukses total, tetapi melihat kualitas jalur berdasarkan beberapa percobaan.

## Catatan Debugging

Jika command QoS tidak menghasilkan laporan, cek `pendingTask`, `active`, `sampleIdx`, dan `nextAt` di `QosRuntime`.

## Hubungan dengan Laporan TA

File ini mendukung bagian evaluasi sistem karena node dapat mengukur kualitas koneksi ke layanan backend/OTA.
