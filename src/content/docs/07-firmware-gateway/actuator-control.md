---
title: "Actuator Control"
---

# Actuator Control

Actuator control adalah bagian gateway yang mengubah keputusan software menjadi kondisi relay.

## Relay yang Dikendalikan

`config.h` mendefinisikan:

- `RELAY_EXHAUST`,
- `RELAY_DEHUMIDIFIER`,
- `RELAY_BLOWER`,
- `RELAY_UNUSED`.

`RelayController::begin()` mengatur pin relay sebagai output dan menulis `HIGH` sebagai kondisi awal off.

## Logika Keputusan

`RelayController::updateSingleRelayState()` mengevaluasi:

1. schedule,
2. threshold,
3. hold jika threshold sedang tidak dievaluasi.

Exhaust dan dehumidifier dipengaruhi kelembapan atau fog. Blower dipengaruhi suhu.

## Active Low

Kode memakai:

```txt
digitalWrite(pin, states[i] ? LOW : HIGH)
```

Artinya relay aktif saat output `LOW`. Ini penting untuk wiring dan debugging.

## Failsafe

`forceSafeState()` mematikan tiga relay utama dan memastikan relay 4 tetap off. Ini dipanggil saat gateway masuk failsafe.

Lanjutkan ke [SD Card Logging](./sd-card-logging.md).
