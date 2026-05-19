---
title: "node/include/generated/node_config.h"
---

# node/include/generated/node_config.h

File ini adalah hasil generate konfigurasi identitas dan endpoint node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/generated/node_config.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas memberi nilai compile-time seperti greenhouse id, node id, versi firmware, password Wi-Fi bawaan, token API/OTA, URL cloud, URL relay, dan IP gateway default.

## Kenapa File Ini Ada

Setiap node perlu identitas dan endpoint yang jelas saat firmware dibangun. File ini dibuat otomatis dari konfigurasi seperti `node_id.ini`, sehingga source firmware bisa memakai macro `GH_ID`, `NODE_ID`, dan `FIRMWARE_VERSION`.

## Isi Penting

| Macro | Fungsi |
|---|---|
| `GH_ID` | Identitas greenhouse. |
| `NODE_ID` | Identitas node sensor. |
| `FIRMWARE_VERSION` | Versi firmware yang dilaporkan ke sistem. |
| `FACTORY_WIFI_PASS` | Password Wi-Fi bawaan untuk mode awal/factory. |
| `FACTORY_API_TOKEN` | Token default komunikasi API. |
| `FACTORY_OTA_TOKEN` | Token default OTA. |
| `DEFAULT_DATA_URL` | Endpoint utama pengiriman data sensor. |
| `DEFAULT_OTA_URL_BASE` | Endpoint utama download firmware OTA. |
| `DEFAULT_RELAY_DATA_URL` | Endpoint relay/fallback untuk data sensor. |
| `DEFAULT_RELAY_OTA_URL_BASE` | Endpoint relay/fallback untuk OTA. |
| `DEFAULT_GATEWAY_IP_GH1/GH2` | IP gateway default per greenhouse. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/node_id.ini` | Sumber konfigurasi yang dipakai generator. |
| `node/scripts/inject_config.py` | Generator file ini. |
| `node/include/config/calibration.h` | Memilih nilai kalibrasi berdasarkan `NODE_ID`. |
| `node/src/Application.cpp` | Mencetak versi, GH ID, dan node ID saat running. |
| `node/lib/NodeCore/api/*` | Memakai identitas node untuk upload data dan OTA. |
| `node/lib/NodeCore/system/ConfigManager.*` | Memakai default token, URL, dan hostname. |

## Konsep Dasar yang Perlu Dipahami

- Macro `#define` mengganti nilai saat compile.
- Compile-time config berarti nilai masuk ke firmware saat build.
- File generated sebaiknya diubah lewat sumber/generator, bukan diedit manual.

## Input

Input berasal dari file konfigurasi build dan script generator.

## Output

Output berupa macro yang dibaca banyak modul firmware.

## Error Handling

File ini tidak menangani error runtime. Jika nilai salah, efeknya bisa muncul sebagai node salah identitas, upload ke endpoint salah, OTA salah versi, atau kalibrasi salah.

## Catatan Keamanan

File ini berisi default token dan password bawaan. Nilai seperti ini sensitif. Untuk deployment nyata, token perlu dikelola hati-hati dan tidak boleh dipublikasikan sembarangan.

## Catatan Debugging

Jika node mengaku sebagai ID yang salah atau OTA mengambil file yang salah, cek `GH_ID`, `NODE_ID`, `FIRMWARE_VERSION`, dan hasil generate file ini.

## Hubungan dengan Laporan TA

File ini terkait identitas node, pemetaan node ke greenhouse, endpoint cloud/relay, OTA, dan kalibrasi per node.
