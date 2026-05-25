---
title: "JavaScript and TypeScript Tooling"
---

# JavaScript and TypeScript Tooling

Meskipun komponen utama *firmware* ditulis menggunakan C++, bahasa pemrograman **JavaScript (JS)** dan **TypeScript (TS)** memegang peran yang sangat penting di hampir semua lapisan proyek ini: mulai dari antarmuka pengguna web dashboard, halaman kontrol lokal di dalam flash mikrokontroler, script otomatisasi pengembangan, hingga mesin pencari pada situs dokumentasi.

---

## 1. Di Mana JS dan TS Digunakan?

Dalam arsitektur proyek ini, JS dan TS tersebar di beberapa bagian penting:

| Lingkungan | Lokasi File | Peran & Deskripsi | File Terkait |
| :--- | :--- | :--- | :--- |
| **Dashboard Vue** | `web/` | Membangun UI pemantauan greenhouse, grafik riwayat, dan panel kontrol threshold. | [Controlling.vue](file:///home/dhimasardinata/Dokumen/ta/web/Controlling.vue), [Heatmap.vue](file:///home/dhimasardinata/Dokumen/ta/web/Heatmap.vue) |
| **Asset Flash Node** | `node/data/` | Aset web statis yang di-flash langsung ke LittleFS ESP8266 untuk captive portal lokal dan console log terminal. | [terminal.js](file:///home/dhimasardinata/Dokumen/ta/node/data/terminal.js), [crypto.js](file:///home/dhimasardinata/Dokumen/ta/node/data/crypto.js) |
| **Aset Gateway** | `gateway/` | WebSerial terminal dan modul kriptografi lokal yang dikonversi menjadi header C++ `PROGMEM`. | [PortalAssets.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/PortalAssets.h) |
| **Watcher Tools** | `node/tools/` | Script Node.js untuk memantau perubahan repositori dan menyinkronkan data secara otomatis selama proses pengembangan. | `node/tools/watch/repo-watchers.js` |
| **Docs Site** | `docs-site/` | Next.js App Router dengan TypeScript penuh untuk merender halaman MDX dan menangani pencarian dengan Orama. | `docs-site/lib/docs.ts` |

---

## 2. Operasi Asinkron (`async`/`await`)

Interaksi web dengan API backend (Laravel) bersifat non-blocking menggunakan operasi asinkron:
- Di [Controlling.vue](file:///home/dhimasardinata/Dokumen/ta/web/Controlling.vue), Axios digunakan untuk menyimpan konfigurasi threshold baru secara asinkron tanpa memuat ulang seluruh halaman web (*reload*).
- Di [terminal.js](file:///home/dhimasardinata/Dokumen/ta/node/data/terminal.js), koneksi WebSocket dibuka dan dikelola secara asinkron untuk menyajikan log stream secara realtime dari mikrokontroler ke layar pengguna.

### Contoh Pola Pemanggilan API Asinkron:
```javascript
async function fetchDocsSearch(query) {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Gagal mengambil data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Pencarian bermasalah:", error);
    return [];
  }
}
```

---

## 3. Bahaya dan Penanganan Format JSON

JSON (*JavaScript Object Notation*) bertindak sebagai format pertukaran data utama antara sensor node, gateway, server backend, dan antarmuka web. Namun, terdapat beberapa risiko runtime yang harus ditangani secara defensif:

- **Tipe Data Tidak Konsisten**: Nilai sensor bisa sampai ke UI sebagai angka atau string, tergantung sumber data dan serialisasi JSON. [Heatmap.vue](file:///home/dhimasardinata/Dokumen/ta/web/Heatmap.vue) memakai `parseFloat(...)` pada beberapa jalur agar perhitungan warna dan posisi tetap numerik.
- **Properti Kosong (Undefined)**: Saat membandingkan objek konfigurasi atau data sensor yang dalam (*deeply nested*), pastikan menggunakan operator *optional chaining* (seperti `response.data?.success`) untuk menghindari error fatal yang dapat menghentikan eksekusi script browser.

---

## 4. Struktur Data `const` dan Imutabilitas

Penggunaan kata kunci `const` di JavaScript hanya mengunci referensi variabel, bukan nilainya.
```javascript
const config = { threshold: 30 };
config.threshold = 35; // Perubahan ini valid dan diperbolehkan
```
Untuk mengelola state yang aman dan reaktif di Vue, pengembang memanfaatkan *Reactivity API* (seperti `ref()` dan `computed()`) sehingga setiap perubahan data pada objek `const` secara otomatis memperbarui tampilan DOM browser secara efisien.
