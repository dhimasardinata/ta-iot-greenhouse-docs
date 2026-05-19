---
title: "node/lib/NodeCore/api/ApiClient.Qos.cpp"
---

# node/lib/NodeCore/api/ApiClient.Qos.cpp

File ini mengimplementasikan pengujian QoS API dan OTA.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Qos.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menjalankan beberapa request uji ke endpoint upload data atau OTA, lalu melaporkan jumlah sukses, packet loss, latency rata-rata, latency minimum/maksimum, dan jitter.

## Kenapa File Ini Ada

Node butuh cara cepat untuk mengecek kualitas koneksi. QoS test membantu membedakan masalah server, Wi-Fi, OTA endpoint, atau RAM perangkat.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `requestUpload` | Menandai tes QoS upload data. |
| `requestOta` | Menandai tes QoS OTA. |
| `handlePendingTask` | Memulai dan menjalankan sample QoS sampai selesai. |
| `updateStats` | Menghitung sukses, total durasi, min, dan max latency. |
| `reportResults` | Membuat laporan terenkripsi ke terminal/web lokal. |
| `performTest` | Menyiapkan buffer, HTTP client, target URL, method, payload, dan state QoS. |

## Alur Kerja

1. Command meminta QoS upload atau OTA.
2. `handlePendingTask` menolak eksekusi jika OTA aktif, HTTP sibuk, atau sistem pause.
3. URL dan payload disiapkan.
4. Heap dicek sebelum buffer dan HTTP client dialokasikan.
5. Lima sample request dijalankan dengan jeda pendek.
6. Hasil dihitung dan dikirim ke terminal/web lokal.

## Error Handling

Tes dibatalkan jika heap tidak sehat, alokasi buffer gagal, atau HTTP client gagal dibuat. Jika satu sample gagal, sample berikutnya tetap bisa berjalan.

## Catatan Performa

QoS memakai `QosBuffers` dan `HTTPClient` reuse untuk mengurangi alokasi berulang. Jumlah sample tetap 5 agar tes tidak terlalu berat.

## Catatan Debugging

Jika laporan QoS menunjukkan packet loss tinggi, lihat log per sample `Req failed`, endpoint yang diuji, dan kondisi heap sebelum tes dimulai.

## Hubungan dengan Laporan TA

File ini dapat dipakai sebagai bukti bahwa sistem punya alat pengamatan kualitas komunikasi, bukan hanya upload data biasa.
