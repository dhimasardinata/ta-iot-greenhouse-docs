---
title: "node/lib/NodeCore/commands/QosCommand.cpp"
---

# node/lib/NodeCore/commands/QosCommand.cpp

File ini mengimplementasikan command `qosupload` dan `qosota`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/QosCommand.cpp` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini hanya menjadwalkan pengujian QoS lewat `ApiClient`, lalu memberi pesan bahwa hasil akan muncul setelah proses berjalan.

## Isi Penting

`qosupload` memanggil `requestQosUpload()`, sedangkan `qosota` memanggil `requestQosOta()`.
