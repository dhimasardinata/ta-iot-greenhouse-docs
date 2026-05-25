---
title: "Authentication"
description: "Peta autentikasi yang konsisten dengan controller Laravel dan firmware yang ada di snapshot repo."
---

# Authentication

Autentikasi sistem perlu dibaca dari dua sisi: perangkat mengirim identitas dan token, lalu backend Laravel harus memutuskan apakah request diterima sebelum masuk ke controller. Di snapshot ini, firmware node/gateway sudah menyiapkan header keamanan, sedangkan controller PHP yang terlihat masih berfokus pada validasi body, penyimpanan data, cache, dan response JSON.

## Jalur Perangkat ke Backend

Perangkat dapat membawa identitas melalui beberapa mekanisme:

- `Authorization: Bearer <token>` terlihat pada firmware gateway dan node saat mengirim request HTTP.
- `X-Device-ID` dikirim sebagai identitas perangkat.
- `X-Signature` dapat dikirim oleh firmware node untuk payload yang ditandatangani.

Rumus konseptual tanda tangan payload adalah:

$$
\text{signature} = \operatorname{HMAC}_{SHA256}(\text{token}, \text{canonical payload})
$$

Di sisi Laravel, pemeriksaan token/signature sebaiknya ditempatkan di middleware API sebelum request masuk ke `ApiController::saveSensorData()`, `ApiController::postDeviceStatus()`, atau `OtaController::getFirmwareInfo()`. Dengan begitu controller tetap sederhana, sementara kebijakan keamanan berada di satu lapisan yang konsisten.

## Perilaku Controller yang Terlihat

`ApiController::saveSensorData()` memvalidasi `gh_id` dan `node_id`, lalu menyimpan nilai sensor yang ada di body request. Method ini tidak membaca `Authorization`, `X-Device-ID`, atau `X-Signature` secara langsung.

`OtaController::uploadFirmware()` memvalidasi `status`, `version`, file `.bin`, dan `node_id`/`sensor_id`. Method ini menyimpan file firmware dan metadata versi, lalu mengaktifkan satu firmware per node jika `status = true`.

`ScheduleController::saveSchedules()` memakai validator Laravel untuk membatasi payload jadwal, termasuk maksimal empat jadwal per greenhouse dan mode aktuator hanya `on`, `off`, atau `threshold`.

## Jalur Admin Web

Halaman dashboard dirender melalui `PageController` dengan Inertia. File login, route web, dan middleware auth lengkap tidak ada di potongan `web/` yang terlihat, sehingga dokumentasi ini hanya menyebut kebutuhan session auth Laravel secara umum. Untuk implementasi lengkap, route dashboard seperti `/monitoring`, `/heatmap`, `/table`, `/camera`, dan `/controlling` perlu diletakkan di balik session auth Laravel.

Lanjutkan ke [API Sensor](./api-sensor.md).
