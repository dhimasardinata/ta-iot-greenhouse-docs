---
title: "API Schedule"
description: "Spesifikasi teknis API manajemen jadwal aktuator, validasi bentrokan waktu, dan representasi pemadatan status biner untuk ESP32 Gateway."
---

# API Schedule

Manajemen jadwal aktuator diatur terpusat oleh kelas [ScheduleController.php](file:///home/dhimasardinata/Dokumen/ta/web/ScheduleController.php). Pengontrol ini melayani kueri polling cepat dari ESP32 Gateway dan pengeditan dinamis oleh admin melalui editor web.

---

## 1. Ambil Jadwal untuk Gateway (`GET /api/schedules`)

ESP32 Gateway memanggil endpoint ini secara berkala untuk menyinkronkan status kerjanya di lapangan.

*   **Parameter**: `gh_id` (Wajib), `schedule_id` (Opsional)
*   **Caching Polling**: Karena gateway melakukan polling berkala, backend menahan data ini selama 60 detik. Key cache dibuat dari `gh_id` dan `schedule_id` memakai `md5(json_encode(...))`.
*   **Pemadatan Status Biner (`relay_binary`)**:
    Jadwal yang dikirim ke gateway dipadatkan menjadi 3 karakter angka biner di field `relay` untuk menghemat ruang memori parsing mikro:
    *   **Karakter 0**: Status Exhaust (`relay_exhaust`).
    *   **Karakter 1**: Status Dehumidifier (`relay_dehumidifier`).
    *   **Karakter 2**: Status Blower (`relay_blower`).
    *   *Nilai karakter*: `'0'` = Force OFF, `'1'` = Force ON, `'2'` = Threshold Control.
    *   *Contoh*: `"221"` artinya Exhaust & Dehumidifier otomatis mengikuti sensor, Blower dipaksa terus menyala (ON).

### Contoh Respons Gateway:
```json
{
  "success": true,
  "gh_id": 1,
  "schedules": [
    {
      "id": 12,
      "aktif": 1,
      "mulai": "08:00",
      "selesai": "12:00",
      "relay": "220"
    }
  ]
}
```

---

## 2. Simpan Jadwal dari Web Dashboard (`POST /api/schedules`)

Administrator mengirimkan pengaturan jadwal baru dari editor web.

### Validasi Request Input:
Untuk menjaga kestabilan operasional, backend membatasi jumlah jadwal maksimal 4 per greenhouse dan memvalidasi tipe data input:
*   `gh_id`: Harus berupa integer dan eksis di tabel `greenhouses`.
*   `schedules`: Array objek jadwal, maksimal 4 item.
*   `schedules.*.start_time`: Format `H:i` (Jam:Menit).
*   `schedules.*.end_time`: Format `H:i` dan wajib disetel **setelah** waktu mulai.
*   `schedules.*.actuators.*`: Harus bernilai `'on'`, `'off'`, atau `'threshold'`.

### Siklus Simpan dan Hapus:
Untuk menyederhanakan sinkronisasi tanpa perlu membandingkan satu-persatu record yang berubah, controller menggunakan metode **Purge-and-Insert**:
1.  Hapus seluruh record jadwal lama untuk greenhouse tersebut:
    ```php
    Schedule::where('gh_id', $request->gh_id)->delete();
    ```
2.  Lakukan loop dan insert baru dari payload `schedules` yang dikirim:
    ```php
    foreach ($request->schedules as $scheduleData) {
        Schedule::create([ ... ]);
    }
    ```
3.  Invalidasi Cache Terkait:
    *   `Cache::forget("schedule_gateway_{gh_id}")`
    *   `Cache::forget("schedule_web_{gh_id}")`
    *   `Cache::forget('controlling_schedules')`
    *   `Cache::forget('monitoring_actuator_status')`

---

Catatan implementasi: cache gateway pada `getSchedule()` memakai key hash, sedangkan invalidasi di `saveSchedules()` membuang key sederhana `schedule_gateway_{gh_id}`. Jika jadwal gateway masih stale selama TTL 60 detik, samakan pola key cache atau gunakan tag cache.

## 3. Ambil Jadwal untuk Editor Web (`GET /api/schedules` - Context Web)

Fungsi `getSchedulesForWeb()` mengembalikan daftar jadwal dalam format lengkap (bukan biner ringkas) agar editor Vue dapat me-render toggle button dan dropdown mode aktuator secara tepat di antarmuka admin.

Lanjutkan ke bagian **[API Firmware OTA](./api-firmware-ota.md)** untuk melihat bagaimana pembaruan berkas biner sistem didistribusikan.
