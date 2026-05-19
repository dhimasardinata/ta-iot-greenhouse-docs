---
title: "Peta Memori Embedded"
---

# Peta Memori Embedded

Firmware tidak berjalan seperti aplikasi desktop. Node ESP8266 dan gateway ESP32 punya RAM terbatas, flash terbatas, dan beberapa jenis memori dengan sifat berbeda. Karena itu, memahami letak data sama pentingnya dengan memahami tipe data.

## Gambaran Besar

| Area | Isi Umum | Risiko |
|---|---|---|
| Flash | Program, literal read-only, asset `PROGMEM`, filesystem, partisi OTA | Ukuran binary, write wear, ruang OTA. |
| IRAM | Instruksi yang perlu berada di RAM instruksi | IRAM penuh jika terlalu banyak fungsi dipaksa masuk. |
| DRAM/SRAM | Data runtime, global, stack, heap | OOM, fragmentasi, stack overflow. |
| PSRAM | RAM eksternal di board tertentu | Lebih lambat, tidak selalu tersedia, tidak semua operasi cocok. |
| `.data` | Global/static dengan nilai awal non-zero | Memakai RAM sejak boot. |
| `.bss` | Global/static zero-initialized | Memakai RAM sejak boot walau nilainya nol. |
| `.rodata` | Data read-only | Bisa berada di flash atau mapping read-only, tergantung target/toolchain. |
| Stack | Variabel lokal, call frame | Overflow jika buffer lokal besar atau call chain dalam. |
| Heap | `new`, `malloc`, `String`, `std::vector`, buffer dinamis | Fragmentasi dan gagal alokasi. |

## Stack

Stack dipakai untuk variabel lokal:

```cpp
void f() {
  char buffer[256];
}
```

Buffer di atas memakai stack selama fungsi berjalan.

Kelebihan:

- cepat,
- otomatis bersih saat keluar fungsi,
- tidak membuat fragmentasi heap.

Risiko:

- stack kecil pada task embedded,
- array lokal besar bisa menabrak stack,
- recursion berbahaya,
- callback async bisa punya stack terbatas.

Project node memakai flag `-Wstack-usage=1024` dan `-fstack-usage` untuk membantu melihat fungsi yang memakai stack besar.

## Heap

Heap dipakai oleh alokasi dinamis:

- `new`,
- `std::unique_ptr` yang membuat object,
- `std::vector`,
- `String`,
- beberapa library HTTP/TLS,
- buffer async web/server.

Heap tidak hanya dinilai dari total free heap. Blok kontigu terbesar juga penting. TLS bisa gagal walau free heap total terlihat cukup jika fragmentasi membuat blok besar tidak tersedia.

Project node punya threshold seperti:

- `HEAP_WARNING_THRESHOLD`,
- `HEAP_CRITICAL_THRESHOLD`,
- `API_MIN_SAFE_BLOCK_SIZE`,
- `TLS_MIN_SAFE_BLOCK_SIZE`,
- `TLS_MIN_TOTAL_HEAP`.

Ini menunjukkan firmware membedakan "RAM total masih ada" dan "blok aman untuk HTTP/TLS masih ada".

## `.bss` dan `.data`

Global atau static variable masuk area data.

Contoh konseptual:

```cpp
static char buffer[512];        // .bss jika zero-initialized
static int counter = 5;         // .data
```

`.bss` tidak disimpan sebagai byte nol panjang di file firmware, tetapi saat runtime tetap memakan RAM. Jadi array global besar tetap mahal walau terlihat "kosong".

Edge case:

- `std::array<char, 4096> globalBuf{};` masuk RAM global.
- Banyak singleton dengan buffer member bisa menghabiskan RAM sebelum loop mulai.
- Memindahkan buffer dari stack ke static menghindari stack overflow, tetapi menambah RAM tetap sepanjang hidup program.

## Flash dan `PROGMEM`

Flash menyimpan program dan data read-only besar. Di project ini, banyak asset web, sertifikat, string log, dan tabel CRC disimpan dengan `PROGMEM`.

Contoh file:

- `WebAppData.h` menyimpan HTML/CSS/JS sebagai array `PROGMEM`,
- `root_ca_data.h` menyimpan root certificate,
- `PortalAssets.h` dan `EmbeddedCryptoJs.h` menyimpan asset gateway,
- `Crc32.cpp` menyimpan table CRC di flash.

Pada ESP8266, data `PROGMEM` sering perlu dibaca dengan fungsi khusus seperti:

- `strlen_P`,
- `memcpy_P`,
- `snprintf_P`,
- `vsnprintf_P`,
- `PSTR`,
- `F()`,
- `FPSTR`.

Pada ESP32, flash lebih mudah dimapping ke address space, tetapi konsep hemat RAM tetap relevan.

Edge case:

- `const char text[] = "..."` belum selalu berarti tidak memakai RAM pada semua target/pola.
- `F("...")` cocok untuk literal yang langsung dipakai sebagai flash string.
- Jangan menyalin asset besar dari flash ke heap penuh jika bisa streaming/chunking.
- Flash punya batas write cycle. Konfigurasi yang sering berubah lebih aman jika ditulis hanya saat ada perubahan.

## IRAM dan DRAM

IRAM adalah instruction RAM. Fungsi tertentu bisa dipaksa masuk IRAM, misalnya interrupt handler atau fungsi yang perlu berjalan saat flash cache tidak bisa dipakai.

DRAM adalah data RAM. Buffer runtime, heap, dan global data biasanya berada di DRAM/SRAM.

Edge case:

- Memaksa terlalu banyak fungsi ke IRAM bisa membuat IRAM penuh.
- Fungsi interrupt tidak bebas memanggil fungsi biasa jika fungsi itu berada di flash atau melakukan operasi berat.
- Data yang perlu DMA kadang perlu memory dengan capability tertentu, terutama pada ESP32.

## SRAM dan PSRAM

SRAM adalah RAM internal. Ini cepat dan paling aman untuk operasi umum.

PSRAM adalah RAM eksternal pada board ESP32 tertentu. Gateway memiliki command yang membaca `ESP.getFreePsram()`, tetapi PSRAM tidak selalu ada di semua board.

PSRAM berguna untuk:

- buffer besar,
- asset sementara,
- data yang tidak latency-critical.

Edge case:

- PSRAM lebih lambat daripada SRAM internal.
- Tidak semua peripheral/DMA cocok dengan PSRAM.
- Kode perlu fallback jika PSRAM tidak tersedia.
- Alokasi default belum tentu otomatis masuk PSRAM, tergantung konfigurasi framework dan allocator.

## Stack vs Heap vs Static

| Pilihan | Cocok Untuk | Risiko |
|---|---|---|
| Stack lokal | Buffer kecil dan pendek umur | Stack overflow jika terlalu besar. |
| Static/global | Buffer tetap dan sering dipakai | RAM habis sejak boot. |
| Heap | Buffer besar yang jarang dipakai | Fragmentasi dan gagal alokasi. |
| Flash/PROGMEM | Data read-only besar | Perlu API baca khusus di ESP8266. |
| PSRAM | Buffer besar di ESP32 yang mendukung | Lebih lambat dan tidak selalu cocok untuk DMA. |

## Contoh Keputusan di Project

| Kode | Keputusan Memori |
|---|---|
| `std::array<EmergencyRecord, 16>` | Queue ukuran tetap, tidak perlu vector heap. |
| `std::unique_ptr<PayloadBuffer>` | Payload buffer besar dibuat saat diperlukan. |
| `std::vector<uint8_t>` di crypto gateway | Buffer fleksibel untuk decode/decrypt, perlu batas input. |
| `PROGMEM` pada asset web | Asset besar berada di flash, bukan heap. |
| `std::span<char>` pada helper string | Fungsi tahu batas buffer tanpa memiliki memori. |
| `char stackBuf[256]` | Cepat untuk output kecil, perlu batas stack. |

## Membaca Laporan Memori

Saat debugging firmware, lihat beberapa angka sekaligus:

- free heap total,
- max free block,
- fragmentation percent,
- stack usage,
- ukuran binary,
- ukuran `.bss` dan `.data`,
- free sketch space,
- ukuran partisi OTA,
- PSRAM tersedia atau tidak.

Free heap besar tidak otomatis aman jika max block kecil. Binary kecil juga tidak otomatis aman jika `.bss` besar.

## File yang Relevan

- [node/include/config/constants.h](../14-complete-file-walkthrough/node/include/config/constants.h.md)
- [node/lib/NodeCore/system/MemoryTelemetry.h](../14-complete-file-walkthrough/node/lib/NodeCore/system/MemoryTelemetry.h.md)
- [node/lib/NodeCore/system/SystemHealth.h](../14-complete-file-walkthrough/node/lib/NodeCore/system/SystemHealth.h.md)
- [node/lib/NodeCore/support/Utils.cpp](../14-complete-file-walkthrough/node/lib/NodeCore/support/Utils.cpp.md)
- [node/include/generated/WebAppData.h](../14-complete-file-walkthrough/node/include/generated/WebAppData.h.md)
- [gateway/include/PortalAssets.h](../14-complete-file-walkthrough/gateway/include/PortalAssets.h.md)
- [gateway/partitions_custom.csv](../14-complete-file-walkthrough/config/gateway/partitions_custom.csv.md)
