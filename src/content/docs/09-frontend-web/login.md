---
title: "Login Halaman Dashboard"
description: "Kebutuhan login dashboard dan batas bukti source frontend yang tersedia."
---

# Login Halaman Dashboard

Snapshot frontend web yang tersedia hanya memuat `Controlling.vue` dan `Heatmap.vue`. File login seperti `Auth/Login.vue` tidak ada di potongan source ini, sehingga halaman ini menjelaskan kebutuhan login dashboard berdasarkan alur Laravel/Inertia yang harus mengitari halaman monitoring dan controlling.

## Kebutuhan Login

Dashboard mengubah threshold, jadwal, dan konfigurasi operasional greenhouse. Karena itu route web seperti `/monitoring`, `/heatmap`, `/table`, `/camera`, dan `/controlling` perlu dilindungi session auth di Laravel penuh.

## Alur yang Diperlukan

```mermaid
sequenceDiagram
    participant Admin as Browser Admin
    participant Login as Form Login
    participant Laravel as Laravel Auth
    participant Dashboard as Halaman Dashboard

    Admin->>Login: Isi email dan password
    Login->>Laravel: POST /login
    alt Kredensial valid
        Laravel-->>Admin: Set session cookie
        Admin->>Dashboard: Buka halaman dashboard
    else Kredensial salah
        Laravel-->>Login: Kembalikan pesan error
    end
```

## Hubungan dengan File yang Terlihat

`Controlling.vue` memanggil API untuk menyimpan threshold dan jadwal. Jika halaman ini tidak dilindungi auth, pengguna tidak sah dapat mengubah perilaku aktuator. Jadi kontrol akses harus dipasang di route web dan API yang menerima perubahan.

`Heatmap.vue` lebih bersifat monitoring, tetapi tetap menampilkan data operasional greenhouse. Pada deployment nyata, aksesnya sebaiknya mengikuti kebijakan login yang sama.

Lanjutkan ke [Export Data](./export-data.md).
