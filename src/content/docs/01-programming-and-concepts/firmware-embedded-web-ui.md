---
title: "Web UI Tertanam di Firmware"
---

# Web UI Tertanam di Firmware

Firmware project ini tidak hanya berisi C++. Di dalam node dan gateway juga ada HTML, CSS, dan JavaScript yang disajikan langsung dari perangkat. Halaman ini menjelaskan konsep web yang hidup di dalam firmware supaya pembaca tidak bingung saat melihat file seperti `portal.html`, `crypto.js`, `WebAppData`, `PortalAssets`, dan `WebSerial`.

## Kenapa Firmware Punya Web UI

Perangkat greenhouse perlu tetap bisa dikonfigurasi walau cloud belum siap. Karena itu firmware menyediakan halaman lokal untuk:

- setup Wi-Fi,
- cek status perangkat,
- terminal diagnostik,
- login admin,
- reset konfigurasi,
- OTA lokal,
- format filesystem,
- melihat hasil scan Wi-Fi.

Web UI tertanam berbeda dari web Laravel. Web Laravel berjalan di server. Web UI firmware berjalan dari memori flash atau filesystem perangkat.

## Bentuk Asset Web di Node

Node menyimpan asset web dalam dua bentuk:

| Bentuk | Contoh | Fungsi |
|---|---|---|
| File mentah | `node/data/portal.html`, `node/data/terminal.js`, `node/data/crypto.js` | Dipakai saat development dan upload filesystem. |
| Header/generated source | `WebAppData.h`, `WebAppData.cpp` | Asset dipaketkan ke firmware agar bisa dilayani dari flash. |

Script PlatformIO seperti `web_to_header.py` mengubah file web menjadi data C++ agar firmware bisa membawanya saat flashing.

Risiko:

- asset web berubah tetapi header generated belum diperbarui,
- ukuran HTML/JS terlalu besar untuk flash,
- cache browser menampilkan asset lama,
- route firmware mengarah ke asset yang belum ikut dipaketkan.

## Bentuk Asset Web di Gateway

Gateway punya dua pola:

- `PortalAssets.h` berisi HTML portal sebagai string di firmware,
- `WebSerial.cpp` membangun halaman terminal dan menyajikan `crypto.js`.

Karena gateway memakai ESP32, resource lebih lega daripada ESP8266, tetapi tetap terbatas. String HTML besar tetap mempengaruhi ukuran firmware dan waktu compile.

## Route Lokal

Route lokal adalah alamat yang dibuka browser langsung ke perangkat, misalnya:

- `/` untuk portal atau dashboard lokal,
- `/terminal` untuk terminal,
- `/crypto.js` untuk script enkripsi,
- `/save` untuk menyimpan konfigurasi,
- endpoint OTA atau reset lokal.

Route ini biasanya memakai `ESPAsyncWebServer`. Artinya request diproses secara asynchronous, tetapi handler tetap harus cepat dan tidak boleh menahan loop terlalu lama.

Edge case:

- request datang saat Wi-Fi belum stabil,
- browser disconnect sebelum response selesai,
- route sensitif dipanggil tanpa autentikasi,
- payload form terlalu panjang,
- perangkat reboot saat browser masih menunggu response.

## JavaScript di Dalam Firmware

JavaScript firmware dipakai untuk:

- membaca input form,
- mengirim request ke route lokal,
- membuka WebSocket,
- mengenkripsi payload tertentu,
- menyimpan token admin sementara di `sessionStorage`,
- menampilkan log terminal.

Kode ini harus defensif karena berjalan di browser user, bukan di firmware. Browser bisa lama, cache bisa stale, dan koneksi ke perangkat bisa putus.

## CryptoJS, WebCrypto, dan Fallback

Node dan gateway memakai AES-CBC untuk beberapa payload lokal. Di browser, implementasinya bisa lewat:

- `CryptoJS` dari `crypto.js`,
- `window.crypto.subtle` jika tersedia,
- fallback kompatibilitas saat WebCrypto tidak bisa dipakai.

Konsep penting:

- IV harus berbeda per pesan,
- ciphertext biasanya dikirim sebagai Base64,
- plaintext tetap perlu validasi setelah didekripsi,
- enkripsi tidak otomatis membuktikan user adalah admin,
- token/session tetap perlu timeout.

Edge case:

- clock perangkat tidak sinkron sehingga replay window salah,
- payload terenkripsi rusak saat copy atau jaringan putus,
- browser lama tidak mendukung WebCrypto,
- fallback CryptoJS punya bentuk object yang berbeda dari WebCrypto,
- password tidak boleh dicetak ke log.

## Admin Session

Admin session pada gateway memakai token yang disimpan sementara di browser. Token dipakai agar user tidak memasukkan password setiap command sensitif.

Yang perlu dipahami:

- session admin punya TTL,
- token harus dikirim bersama command sensitif,
- token harus dihapus saat logout atau expired,
- command biasa dan command admin perlu dipisah.

## File yang Relevan

- [node/data/portal.html](../14-complete-file-walkthrough/node/data/portal.html.md)
- [node/data/terminal.html](../14-complete-file-walkthrough/node/data/terminal.html.md)
- [node/data/terminal.js](../14-complete-file-walkthrough/node/data/terminal.js.md)
- [node/data/crypto.js](../14-complete-file-walkthrough/node/data/crypto.js.md)
- [node/include/generated/WebAppData.h](../14-complete-file-walkthrough/node/include/generated/WebAppData.h.md)
- [node/src/generated/WebAppData.cpp](../14-complete-file-walkthrough/node/src/generated/WebAppData.cpp.md)
- [node/lib/NodeCore/web/PortalServer.Routes.cpp](../14-complete-file-walkthrough/node/lib/NodeCore/web/PortalServer.Routes.cpp.md)
- [node/lib/NodeCore/web/AppServer.Routes.cpp](../14-complete-file-walkthrough/node/lib/NodeCore/web/AppServer.Routes.cpp.md)
- [gateway/include/PortalAssets.h](../14-complete-file-walkthrough/gateway/include/PortalAssets.h.md)
- [gateway/include/EmbeddedCryptoJs.h](../14-complete-file-walkthrough/gateway/include/EmbeddedCryptoJs.h.md)
- [gateway/src/WebSerial.cpp](../14-complete-file-walkthrough/gateway/src/WebSerial.cpp.md)
- [gateway/src/CryptoUtils.cpp](../14-complete-file-walkthrough/gateway/src/CryptoUtils.cpp.md)
