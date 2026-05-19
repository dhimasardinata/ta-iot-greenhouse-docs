---
title: "Controlling Threshold"
---

# Controlling Threshold

Controlling threshold adalah fitur mengubah batas sensor dari dashboard.

## Bukti dari Kode

`Controlling.vue` memiliki sub-tab `threshold`. Data awal berasal dari props `initialData` yang dikirim `PageController::controlling()`.

Komponen memakai slider `@vueform/slider` dan input min/max. Perubahan disimpan di `editedThresholds`.

## Simpan Threshold

Saat user menekan simpan, frontend mengirim:

```txt
POST /api/update-thresholds
```

Payload berisi array `thresholds` dengan:

- `sensor_id`,
- `threshold_min`,
- `threshold_max`.

Jika sukses, state lokal dan `initialThreshold` diperbarui. Jika gagal, toast error ditampilkan.

## Risiko

- min lebih besar dari max,
- nilai terlalu besar,
- API gagal,
- user pindah tab saat perubahan belum disimpan.

Lanjutkan ke [Controlling Scheduling](./controlling-scheduling.md).
