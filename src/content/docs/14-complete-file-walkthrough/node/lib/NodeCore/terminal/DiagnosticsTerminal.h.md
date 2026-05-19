---
title: "node/lib/NodeCore/terminal/DiagnosticsTerminal.h"
---

# node/lib/NodeCore/terminal/DiagnosticsTerminal.h

File ini menjalankan terminal diagnostik lokal node, termasuk command operator untuk melihat status atau memicu aksi tertentu.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/terminal/DiagnosticsTerminal.h` |
| Komponen | Firmware Node |
| Jenis file | modul terminal diagnostik |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 180 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul terminal diagnostik. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `array`, `memory`, `string_view`, `AsyncWebSocket.h`, `support/CompileTimeUtils.h`, `support/CryptoUtils.h`, `interfaces/IAuthManager.h`, `system/IntervalTimer.h`, `config/constants.h` |
| Class/Struct | `ConfigManager`, `WifiManager`, `NtpClient`, `SensorManager`, `CacheManager`, `ApiClient`, `OtaManager`, `TerminalServices`, `DiagnosticsTerminal`, `IAuthManager`, `ClientState`, `QueuedCommand` |
| Fungsi C/C++ | `DiagnosticsTerminal`, `init`, `handle`, `setEnabled`, `isClientAuthenticatedImpl`, `setClientAuthenticatedImpl`, `isClientLockedOutImpl`, `recordFailedLoginImpl`, `clearFailedLoginsImpl`, `onEvent`, `handleConnect`, `flushPendingInitFrames`, `flushPendingClientOutput`, `sendInitFrame`, `isValidFrame`, `handleDataFrame`, `initCommands`, `pushCommandToQueue`, `dispatchCommand`, `printHelp`, `ws_println_client`, `findClientState`, `allocateClientState`, `freeClientState` |
| Macro | `DIAGNOSTICS_TERMINAL_H` |
| String command/konfigurasi | `cache`, `checkupdate`, `clearcache`, `clearcrash`, `crashlog`, `factoryreset`, `format`, `fsstatus`, `getcal`, `getconfig`, `login`, `logout`, `netconfig`, `qosupload`, `qosota`, `openwifi`, `read`, `reboot` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | command dari terminal lokal, parameter operator, dan status runtime node |
| Data keluar | teks terminal, hasil command, dan aksi diagnostik |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- Input operator perlu divalidasi karena command atau request lokal bisa kosong, salah format, atau tidak punya izin.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#ifndef DIAGNOSTICS_TERMINAL_H
#define DIAGNOSTICS_TERMINAL_H
#include <array>
#include <memory>
#include <string_view>
#include <AsyncWebSocket.h>
#include "support/CompileTimeUtils.h"
#include "support/CryptoUtils.h"
#include "interfaces/IAuthManager.h"
#include "system/IntervalTimer.h"
#include "config/constants.h"
// Forward declarations
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
