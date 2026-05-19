---
title: "node/lib/NodeCore/api/ApiClient.LifecycleController.h"
---

# node/lib/NodeCore/api/ApiClient.LifecycleController.h

File ini mendeklarasikan controller lifecycle `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.LifecycleController.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Controller ini mengatur hidup harian `ApiClient`: inisialisasi, penerapan config, timer, watchdog software, loop handle, dan permintaan upload langsung.

## Kenapa File Ini Ada

Lifecycle adalah jalur yang dipanggil terus-menerus oleh aplikasi. Memisahkannya dari upload/transport membuat alur loop utama lebih mudah dibaca dan lebih mudah diuji.

## Isi Penting

| Method | Fungsi |
|---|---|
| `init` | Menyiapkan state dan timer awal. |
| `applyConfig` | Menerapkan perubahan konfigurasi. |
| `handleTimerTasks` | Menangani timer sampling, upload, cache, dan tugas berkala lain. |
| `checkSoftwareWdt` | Memantau watchdog software. |
| `handle` | Entry point rutin dari loop utama. |
| `scheduleImmediateUpload` | Menjadwalkan upload langsung. |
| `requestImmediateUpload` | Meminta upload langsung dan opsi restore WebSocket setelah upload. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ApiClient.h` | Facade utama dan friend access. |
| `OperationalState` | Timer dan status runtime utama. |
| `QosRuntime` | Tugas QoS yang perlu diproses dari loop. |
| `ResourceState` | Resource yang mungkin dibutuhkan saat upload langsung. |

## Catatan Desain

Controller ini tetap memegang reference ke semua context karena lifecycle bisa memanggil banyak area: timer, upload runtime, queue, QoS, dan health refresh.

## Error Handling

Header ini menyatakan titik masuk. Error handling nyata ada di implementasi lifecycle dan helper upload yang dipanggil dari sana.

## Catatan Debugging

Jika node tidak upload sesuai interval, mulai dari `handle()` dan `handleTimerTasks()` di controller ini.

## Hubungan dengan Laporan TA

File ini membantu menjelaskan hubungan antara loop firmware dan aktivitas pengiriman data periodik.
