---
title: "node/lib/NodeCore/commands/ForceOtaInsecureCommand.h"
---

# node/lib/NodeCore/commands/ForceOtaInsecureCommand.h

File ini mendefinisikan command `force-ota-insecure`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ForceOtaInsecureCommand.h` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini memicu pengecekan OTA dengan pesan peringatan bahwa validasi SSL dilewati.

## Catatan Keamanan

Ini command berbahaya karena melewati validasi SSL. Ia perlu autentikasi dan sebaiknya hanya dipakai untuk kondisi debug atau pemulihan khusus.

## Isi Penting

Implementasi berada langsung di header. `execute` mengirim warning ke terminal lalu memanggil `OtaManager::forceUpdateCheck()`.
