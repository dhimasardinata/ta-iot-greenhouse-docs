---
title: "node/lib/NodeCore/api/ApiClient.Control.cpp"
---

# node/lib/NodeCore/api/ApiClient.Control.cpp

File ini mengimplementasikan kontrol mode upload dan broadcast status `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Control.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menangani perubahan mode upload, penulisan label mode, pengumuman target upload ke WebSocket, pesan terenkripsi ke terminal/web lokal, pause/resume sistem, dan status upload aktif.

## Kenapa File Ini Ada

Operator atau command terminal bisa mengubah jalur upload node. Logic kontrol seperti ini perlu dipisah dari logic HTTP agar mode `AUTO`, `CLOUD`, dan `EDGE` mudah dipahami.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `setUploadMode` | Mengubah mode upload dan membersihkan konteks record yang sedang dimuat. |
| `copyUploadModeString` | Menghasilkan teks `auto`, `cloud`, atau `edge`. |
| `copyUplinkModeString` | Menghasilkan teks uplink `auto`, `direct`, atau `relay`. |
| `copyActiveCloudRouteString` | Menunjukkan route cloud aktif: direct atau relay. |
| `broadcastUploadTarget` | Membuat pesan target upload saat ini. |
| `broadcastEncrypted` | Mengirim pesan WebSocket dalam bentuk terenkripsi. |
| `pause` / `resume` | Menghentikan atau melanjutkan upload, termasuk melepas koneksi aktif. |
| `isUploadActive` | Mengecek apakah HTTP state atau QoS masih aktif. |

## Alur Kerja Mode

1. Mode baru diterima lewat `setUploadMode`.
2. Record upload yang sedang terkunci dibersihkan agar target lama tidak terbawa.
3. `CLOUD` mematikan gateway lokal, `EDGE` mengaktifkannya, dan `AUTO` membiarkan fallback otomatis.
4. Status dikirim ke terminal/web lokal dengan `broadcastEncrypted`.

## Catatan Keamanan

Broadcast memakai `CryptoUtils::fast_serialize_encrypted_main`, sehingga pesan terminal tidak dikirim sebagai teks polos. Pesan panjang juga dipotong per chunk sesuai batas plaintext crypto.

## Error Handling

Jika tidak ada client WebSocket atau teks kosong, broadcast langsung berhenti. Saat pause, koneksi aktif dihentikan dan resource TLS dilepas supaya tidak meninggalkan upload setengah jalan.

## Catatan Debugging

Jika terminal tidak menampilkan perubahan mode, cek jumlah client WebSocket, hasil enkripsi, dan apakah `broadcastEncrypted` menerima teks kosong.

## Hubungan dengan Laporan TA

File ini menjelaskan bagaimana operator dapat mengubah jalur pengiriman data node secara runtime tanpa flash firmware ulang.
