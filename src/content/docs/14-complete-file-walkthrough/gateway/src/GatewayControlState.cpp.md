---
title: "gateway/src/GatewayControlState.cpp"
---

# gateway/src/GatewayControlState.cpp

File ini mengimplementasikan resolver status kontrol gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/GatewayControlState.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway harus memilih apakah kontrol berjalan dari data lokal, cloud, auto fallback, atau fail-safe. File ini menghitung kondisi tersebut berdasarkan data sensor, relay, RTC, koneksi jaringan, dan waktu saat ini.

## Data Internal

File ini menyimpan cache global:

- `g_cachedGatewayControlState`,
- `g_cachedGatewayControlStateAtMs`,
- `g_cachedGatewayControlStateValid`.

Cache ini memungkinkan modul lain membaca status terakhir tanpa menghitung ulang terus-menerus.

## Logika Fog

Untuk `GH_ID_CONFIG == 2`, kesiapan fog dicek dari data lokal/cloud. Untuk greenhouse lain, fungsi helper mengembalikan `true`. Artinya kebutuhan data fog khusus terlihat aktif untuk GH2.

## Fungsi Utama

| Fungsi | Peran |
|---|---|
| `resolveGatewayControlState(...)` | Menghitung semua flag dan string status kontrol. |
| `resolveAndCacheGatewayControlState(...)` | Menghitung status lalu menyimpannya ke cache. |
| `cacheGatewayControlState(...)` | Menyimpan cache status. |
| `tryGetCachedGatewayControlState(...)` | Mengambil cache jika valid dan belum terlalu lama. |
| `resolveShouldUseLocalRuntime(...)` | Menentukan apakah runtime harus memakai data lokal. |
| `resolveShouldEnterFailSafe(...)` | Menentukan apakah fail-safe perlu aktif. |

## Data Masuk

Data masuk berasal dari `SensorDataManager`, `RelayController`, `RTCManager`, status koneksi network, waktu sekarang, dan waktu terakhir control path sehat.

## Data Keluar

Data keluar berupa `GatewayControlState` dan keputusan boolean untuk local runtime atau fail-safe.

## Alur Keputusan Auto

Pada mode auto, gateway akan cenderung memakai lokal jika local control sehat dan cloud belum cukup siap, belum fresh, atau failure count cloud mencapai threshold. Gateway bisa kembali ke cloud jika cloud bundle ready, data cloud fresh, dan success count cloud mencapai threshold recovery.

## Error yang Mungkin Terjadi

- Jika `lastHealthyControlPathMs` tidak diperbarui benar, fail-safe bisa terlalu cepat atau terlambat.
- Jika RTC belum valid, explicit schedule tidak dianggap aktif.
- Jika data fog GH2 tidak fresh, control health bisa gagal walau data sensor lain tersedia.
- Jika cache dibaca dengan `maxAgeMs` terlalu longgar, modul lain bisa memakai status lama.

## Bagian untuk Pemula

File ini seperti pengambil keputusan: gateway harus percaya cloud, percaya data lokal, atau masuk mode aman.

## Bagian Advanced

Source ini menyatukan banyak flag menjadi keputusan akhir. Saat debugging kontrol, baca hasil `GatewayControlState` bersamaan dengan timestamp freshness dan mode sumber data.

## Hubungan ke Sistem TA

Mode cloud, edge, auto, dan fail-safe adalah inti sistem greenhouse. File ini menentukan kapan gateway berpindah sumber kontrol.
