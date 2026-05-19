---
title: "node/lib/NodeCore/api/ApiClient.ControlController.h"
---

# node/lib/NodeCore/api/ApiClient.ControlController.h

File ini mendeklarasikan controller kontrol mode `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.ControlController.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Controller ini mengatur hal yang bisa dikendalikan dari luar: mode upload, label mode, broadcast target, pesan terenkripsi, pause/resume, status OTA, dan pengecekan apakah upload sedang aktif.

## Kenapa File Ini Ada

Kontrol mode sering dipakai terminal, command, dan lifecycle aplikasi. Dengan controller khusus, logic mode upload tidak bercampur dengan logic HTTP atau queue.

## Isi Penting

| Method | Fungsi |
|---|---|
| `setUploadMode` | Mengubah mode AUTO, CLOUD, atau EDGE. |
| `copyUploadModeString` | Menyalin nama mode upload ke buffer output. |
| `copyUplinkModeString` | Menyalin nama mode uplink. |
| `copyActiveCloudRouteString` | Menyalin route cloud aktif, termasuk relay jika sedang dipakai. |
| `broadcastUploadTarget` | Memberi tahu web/terminal target upload saat ini. |
| `broadcastEncrypted` | Mengirim pesan terenkripsi ke WebSocket. |
| `pause` / `resume` | Menghentikan atau melanjutkan upload sistem. |
| `setOtaInProgress` | Menandai bahwa OTA sedang berjalan. |
| `isUploadActive` | Mengecek status upload aktif. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ApiClient.h` | Membuka akses ke facade dan type alias private melalui friend class. |
| `ControllerContext` | Memberi reference ke state runtime, transport, QoS, resource, policy, dan health. |

## Catatan Desain

Constructor menyimpan reference ke bagian-bagian context. Ini membuat implementasi `.cpp` bisa langsung memakai `m_runtime`, `m_transport`, atau `m_resources` tanpa mengambilnya berulang-ulang dari `ApiClient`.

## Error Handling

Header ini belum menjalankan error handling. Implementasinya yang akan menjaga output string tidak melewati buffer dan menjaga perubahan mode tetap konsisten.

## Catatan Debugging

Jika command terminal untuk mode upload tidak sesuai hasilnya, lanjutkan dari header ini ke `ApiClient.Control.cpp`.

## Hubungan dengan Laporan TA

File ini menjelaskan bagaimana operator bisa mempengaruhi jalur pengiriman data node tanpa mengubah firmware ulang.
