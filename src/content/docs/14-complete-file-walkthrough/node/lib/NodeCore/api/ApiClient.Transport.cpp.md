---
title: "node/lib/NodeCore/api/ApiClient.Transport.cpp"
---

# node/lib/NodeCore/api/ApiClient.Transport.cpp

File ini berisi facade helper transport untuk `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Transport.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menyediakan keputusan awal dan wrapper transport: kapan memakai relay, response mana yang dianggap gagal cloud, update hasil upload, label sumber record, transisi state HTTP, dan delegasi ke `ApiClientTransportController`.

## Kenapa File Ini Ada

Facade `ApiClient` tetap menyediakan method private lama, tetapi detail transport dipindah ke controller. File ini menjadi jembatan supaya kode lain tetap memanggil method `ApiClient` dengan nama yang jelas.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `shouldUseRelayForCloudUpload` | Menentukan direct atau relay berdasarkan `UplinkMode`, force flag, dan relay pin. |
| `shouldTreatAsCloudFailure` | Memilih kode HTTP yang layak memicu fallback. |
| `shouldFallbackToRelay` | Memutuskan apakah gagal direct harus dialihkan ke relay. |
| `updateResult` / `updateResult_P` | Mengisi `lastResult` transport. |
| `uploadSourceLabelP` | Label sumber queue: RTC, LittleFS, atau Unknown. |
| `transitionState` | Mengubah state HTTP dan mencatat waktu masuk state. |
| Wrapper controller | Delegasi NTP probe, cloud target, relay fallback, QoS sample, state handler, dan upload tunggal. |

## Error Handling

Kode 400, 401, dan 422 tidak dianggap cloud failure untuk fallback relay karena biasanya terkait data/auth. Kode timeout, redirect, rate limit, forbidden, dan 5xx bisa memicu fallback.

## Catatan Debugging

Jika upload tiba-tiba memakai relay, cek `forceRelayNextCloudAttempt`, `relayPinnedUntil`, `cloudTargetIsRelay`, dan hasil `shouldTreatAsCloudFailure`.

## Hubungan dengan Laporan TA

File ini menjelaskan keputusan routing cloud/relay yang membuat node lebih tahan terhadap gangguan endpoint utama.
