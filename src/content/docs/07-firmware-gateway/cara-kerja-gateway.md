---
title: "Cara Kerja Gateway"
---

# Cara Kerja Gateway

Gateway berjalan dalam loop utama yang menjaga kontrol tetap aktif sambil melakukan pekerjaan jaringan secara bertahap.

## Alur Loop

`gateway/src/main.cpp` menunjukkan `loop()` melakukan:

1. reset watchdog,
2. memproses pending control actions,
3. menjalankan control loop jika sudah waktunya,
4. menjalankan `net.handleWiFi()`,
5. memompa event WebSocket,
6. mencoba reconnect jaringan,
7. memproses deferred network/maintenance,
8. menjaga mDNS,
9. memperbarui effective data source,
10. menjalankan fetch cloud bertahap,
11. memeriksa failsafe,
12. update relay, LCD, log, WebSocket, SD, RTC, dan OTA.

## Pola Bertahap

Gateway tidak mengambil semua data cloud sekaligus dalam satu blok panjang. Loop memakai langkah `apiStep`:

- step 1: node data,
- step 2: threshold,
- step 3: schedule untuk recovery probe,
- step 4: camera/fog khusus GH2.

Jeda antar step membantu control path tetap berjalan.

## Kenapa Begitu

Gateway mengendalikan aktuator fisik. Jika firmware terlalu lama menunggu HTTP request, kontrol relay dan watchdog bisa terganggu. Karena itu kode menghitung timeout aman dan memanggil `serviceCriticalControlPath()`.

Lanjutkan ke [Boot Sequence](./boot-sequence.md).
