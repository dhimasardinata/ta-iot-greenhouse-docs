---
title: "node/lib/NodeCore/api/ApiClient.Context.h"
---

# node/lib/NodeCore/api/ApiClient.Context.h

File ini mendefinisikan context bersama untuk controller `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Context.h` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini berisi struktur yang menyimpan resource, batas keamanan memori, kesehatan runtime, dan referensi state bersama. Controller `ApiClient` memakai context ini agar semua bagian melihat state yang sama.

## Kenapa File Ini Ada

`ApiClient` sudah dibagi ke banyak controller. Agar setiap controller tidak membawa parameter panjang, file ini membuat `ControllerContext` yang merangkum dependency, runtime state, transport state, QoS state, resource, policy, dan health.

## Isi Penting

| Bagian | Fungsi |
|---|---|
| `PayloadBuffer` | Buffer `MAX_PAYLOAD_SIZE + 1` untuk payload berbasis string C. |
| `ResourceState` | Menyimpan shared buffer, trust anchor lokal, dan status TLS. |
| `GuardPolicy` | Batas heap, timeout HTTP/TLS, cooldown, dan throttle log. |
| `RuntimeHealth` | Snapshot kondisi RAM, Wi-Fi, storage, TLS, dan backpressure. |
| `ControllerContext` | Kumpulan reference ke semua state yang dibutuhkan controller. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ApiClient.State.h` | Definisi state utama upload, queue, transport, dan QoS. |
| `ConfigManager.h` | Tipe konfigurasi aplikasi. |
| `config/constants.h` | Batas payload, heap, dan ukuran cache. |
| `WiFiClientSecureBearSSL.h` | Tipe TLS trust anchor dan client secure. |

## Catatan Desain

`GuardPolicy` membuat nilai batas keamanan mudah dilihat di satu tempat. Ini penting karena upload HTTPS, WebSocket, dan cache bisa berebut RAM pada ESP8266.

## Error Handling

File ini tidak menangani error langsung. Ia menyediakan nilai kebijakan yang dipakai file lain untuk memutuskan apakah operasi aman dilanjutkan atau harus ditunda.

## Catatan Performa

`ControllerContext` memakai reference, bukan copy, sehingga controller tidak menggandakan state besar. Ini membantu menjaga RAM tetap kecil.

## Catatan Debugging

Jika upload sering ditunda karena memori atau storage, cek nilai di `GuardPolicy` dan field `RuntimeHealth` yang diperbarui oleh `ApiClient.Health.h`.

## Hubungan dengan Laporan TA

File ini penting untuk menjelaskan bagaimana node membuat keputusan upload berdasarkan kondisi nyata perangkat, bukan hanya berdasarkan jadwal.
