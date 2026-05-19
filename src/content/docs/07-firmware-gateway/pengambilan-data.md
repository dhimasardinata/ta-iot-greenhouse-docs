---
title: "Pengambilan Data"
---

# Pengambilan Data

Gateway mengambil data dari cloud dan menerima data dari node lokal.

## Pengambilan Data Cloud

`main.cpp` memakai `MyNetworkManager` untuk:

- `fetchNodeData`,
- `fetchThresholds`,
- `fetchSchedules`,
- `fetchCameraStatus`,
- `fetchBundleForGreenhouse`.

Hasilnya diterapkan dengan fungsi seperti:

- `applyCloudSensorSnapshot`,
- `applyCloudThresholdSnapshot`,
- `applyCloudScheduleSnapshot`,
- `applyCloudFogSnapshot`.

## Data Lokal dari Node

Data lokal masuk melalui proses pending action dan `SensorDataManager::updateFromNode()`. Data node disimpan di NVS sebagai backup, lalu rata-rata lokal dihitung ulang.

## QoS Log

Gateway punya queue `PendingQosLog`. `processPendingQosLogs()` menulis log QoS ke SD jika SD tidak sibuk.

## Risiko

- payload terlalu besar,
- memori upload tidak cukup,
- data sensor tidak lengkap,
- request HTTP timeout,
- SD logger sedang sibuk,
- data lokal stale.

Lanjutkan ke [Threshold Control](./threshold-control.md).
