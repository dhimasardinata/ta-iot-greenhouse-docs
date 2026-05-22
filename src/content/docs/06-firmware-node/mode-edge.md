---
title: "Mode Edge"
description: "Penjelasan mendalam mengenai mekanisme pengiriman data lokal ke Gateway (Mode Edge) pada firmware Node ESP8266."
---

# Mode Edge (Local Gateway Uplink)

Mode Edge (`UploadMode::EDGE`) mengarahkan data hasil pembacaan sensor node ESP8266 ke Gateway lokal yang berjalan di dalam jaringan lokal Greenhouse. Mode ini sangat krusial ketika koneksi internet ke Cloud backend terputus, namun infrastruktur jaringan lokal (WiFi router lokal) masih berjalan dengan baik untuk mendukung aksi kendali otomatis actuator.

---

## Alur Resolusi URL Gateway Lokal

Untuk meminimalkan kegagalan pengiriman akibat perubahan IP Address gateway (misalnya akibat DHCP lease), node tidak hanya mengandalkan satu IP statis. Saat fungsi [performLocalGatewayUpload](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.UploadFlow.cpp#L45-L115) dieksekusi:

1. **Pembuatan Kandidat URL:** Node memanggil fungsi `build_gateway_url_candidates` untuk menghasilkan hingga **4 kandidat URL gateway** (disimpan dalam array `char gatewayUrls[4][MAX_URL_LEN]`). Kandidat ini dievaluasi secara berurutan:
   - IP Gateway yang dikonfigurasi secara eksplisit di memori flash.
   - Hostname mDNS Gateway.
   - IP default subnet gateway yang diperoleh dari alokasi DHCP WiFi.
   - Alamat fallback lainnya.
2. **Proses Pengiriman Paralel-Sekuensial:** Node menguji kandidat URL ini satu per satu menggunakan koneksi HTTP non-secure (`plainClient`). Batas waktu respon (*timeout*) diatur cukup singkat menggunakan parameter `m_policy.edgeHttpTimeoutMs` (defaultnya adalah 2000 ms atau 2 detik) agar tidak menghambat siklus pemrosesan loop utama.
3. **Penyelesaian Sukses:** Jika salah satu kandidat URL berhasil menerima request POST (HTTP status 200-299), perulangan segera dihentikan, client HTTP ditutup, dan node mencatat status pengiriman sebagai `OK (Edge)`.

---

## Pemrosesan Payload & Enkripsi Lokal

Sebelum dikirim ke Gateway lokal, payload data sensor mentah yang semula siap untuk Cloud diproses ulang terlebih dahulu untuk menyesuaikan dengan kebutuhan gateway dan menjaga kerahasiaan data di jaringan lokal.

Fungsi [prepareEdgePayload](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.UploadRuntimeCycle.cpp#L31-L106) melakukan langkah-langkah manipulasi string JSON secara manual pada *shared buffer* untuk menghindari alokasi memori dinamis baru:

1. **Pemisahan `recorded_at`:** Node mencari kolom waktu rekam `recorded_at` dari payload mentah, menyimpannya sementara ke variabel lokal `sendTimeValue`, kemudian menghapusnya dari string JSON utama menggunakan fungsi `strip_recorded_at_field`.
2. **Penyisipan Parameter Edge Khusus:** Node menambahkan beberapa kolom khusus ke dalam JSON:
   - `"rssi_nonactive"`: Nilai kekuatan sinyal WiFi dari router cadangan atau sinyal non-aktif yang terdeteksi.
   - `"send_time"`: Waktu pengiriman paket data yang diambil dari nilai epoch NTP saat ini.
3. **Enkripsi Payload:** Seluruh string JSON yang telah dimodifikasi dienkripsi secara lokal menggunakan algoritma enkripsi bawaan perangkat melalui fungsi `CryptoUtils::fast_serialize_encrypted_main`.
4. **Enveloping:** Payload terenkripsi dibungkus dengan awalan prefiks string **`ENC:`** (contoh: `ENC:a9f8b2d7...`) agar Gateway dapat langsung mengenali bahwa paket tersebut aman dan harus didekripsi sebelum dibaca.

---

## Mekanisme Live Snapshot

Pada Mode Edge atau Mode Auto yang sedang aktif di rute lokal, node mendukung pengiriman **Live Snapshot** melalui fungsi [trySendLiveSnapshotToGateway](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.UploadRuntimeCycle.cpp#L245-L307).
Jika ada data pembacaan sensor darurat atau terbaru, node akan memotong antrian sinkronisasi cache normal dan langsung mengirimkan data snapshot live terenkripsi ke gateway. Pengiriman snapshot ini ditangguhkan jika node mendeteksi adanya aktivitas pemutakhiran firmware (OTA) atau jika status memori RAM mengalami fragmentasi kritis.
