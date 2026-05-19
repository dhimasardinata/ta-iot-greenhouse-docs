---
title: "Controller"
---

# Controller

Controller adalah class yang menerima request dan menjalankan logika backend.

## Controller yang Terlihat

| File | Peran |
|---|---|
| `web/ApiController.php` | Data sensor, chart, table, camera, threshold, device status. |
| `web/ScheduleController.php` | Get/save schedule untuk gateway dan web. |
| `web/OtaController.php` | Upload firmware dan info update firmware. |
| `web/PageController.php` | Render halaman Inertia seperti monitoring, heatmap, camera, controlling. |

## Pola yang Dipakai

Controller memakai:

- validasi request,
- query database,
- cache,
- response JSON,
- Inertia render,
- try/catch untuk beberapa operasi.

## Risiko

- validasi kurang lengkap,
- query berat,
- cache stale,
- response berbeda dari yang diharapkan firmware,
- upload firmware tidak aman,
- file route/middleware belum diverifikasi.

Lanjutkan ke [Model](./model.md).
