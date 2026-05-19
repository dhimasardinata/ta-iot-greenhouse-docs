---
title: "Table"
---

# Table

Halaman table menampilkan data sensor dalam bentuk tabel.

## Bukti dari Backend

`PageController::table()` merender `Table` dan mengirim `greenhouses`.

`ApiController::tablePerGH()` menyediakan data tabel pivot dengan:

- `node_id`,
- `recorded_at`,
- `temperature`,
- `humidity`,
- `light_intensity`,
- `rssi`,
- pagination,
- sorting,
- filter tanggal dan node.

## Status Frontend

File Vue table tidak terlihat di snapshot ini. Detail UI tabel belum terkonfirmasi.

## Hal yang Harus Dicari Nanti

- kolom yang ditampilkan,
- filter GH/node/tanggal,
- pagination,
- sort,
- export,
- loading/error state.

Lanjutkan ke [Export Data](./export-data.md).
