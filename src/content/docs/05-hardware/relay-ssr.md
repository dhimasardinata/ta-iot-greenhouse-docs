---
title: "Relay dan SSR"
---

# Relay dan SSR

Relay dan SSR adalah saklar elektronik yang dikendalikan program. Perangkat ini menghubungkan keputusan software dengan perangkat fisik seperti fan atau dehumidifier.

## Bukti dari Kode

`gateway/include/config.h` mendefinisikan `RelayIndex`:

| Index | Fungsi |
|---|---|
| `RELAY_EXHAUST` | Exhaust |
| `RELAY_DEHUMIDIFIER` | Dehumidifier |
| `RELAY_BLOWER` | Blower |
| `RELAY_UNUSED` | Channel tidak dipakai |

## Pin Relay

| Greenhouse | CH1 | CH2 | CH3 | CH4 |
|---|---:|---:|---:|---:|
| GH1 | 32 | 33 | 14 | 12 |
| GH2 | 32 | 33 | 12 | 14 |

CH1, CH2, dan CH3 terhubung ke exhaust, dehumidifier, dan blower sesuai komentar di `config.h`. CH4 ditandai unused.

## Risiko

Relay punya efek fisik. Kesalahan wiring atau logika kontrol dapat membuat aktuator menyala/mati di waktu yang salah.

Halaman file terkait menjelaskan:

- active high atau active low jika terlihat dari kode,
- mode manual, schedule, threshold, dan hold,
- failsafe,
- manual override,
- penyimpanan state jika ada.

Lanjutkan ke [Aktuator](./aktuator.md).
