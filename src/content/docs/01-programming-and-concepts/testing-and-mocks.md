---
title: "Testing and Mocks"
---

# Testing and Mocks

Testing memastikan logika firmware dan tooling tetap benar. Mock adalah versi tiruan dari library atau hardware agar test bisa berjalan di komputer tanpa perangkat asli.

Pada proyek ini mock ESP8266, LittleFS, HTTP client, Wi-Fi, dan BearSSL membantu test native mengecek cache, JSON, integrasi, dan simulasi stres.

## Jenis Test yang Terlihat

| Jenis | Fungsi |
|---|---|
| Native test | Menjalankan sebagian logic C++ di komputer tanpa board. |
| Mock Arduino/ESP | Mengganti API hardware seperti Wi-Fi, LittleFS, HTTP, dan BearSSL. |
| Integration test | Menguji beberapa modul bersama, misalnya API client, cache, dan sensor mock. |
| Fault injection | Memaksa kondisi gagal seperti cache korup atau storage error. |
| Stress/simulation | Menguji banyak skenario runtime tanpa perangkat fisik. |
| Script repro | Mereproduksi bug JavaScript atau data tertentu. |

## Kenapa Mock Penting

Tanpa mock, semua test harus menunggu perangkat fisik. Dengan mock, logic seperti JSON, cache, state upload, dan parsing response bisa dicek lebih cepat.

Mock bukan pengganti test perangkat. Mock hanya membuktikan logic yang dimodelkan. Hal seperti RSSI nyata, TLS asli, timing Wi-Fi, sensor fisik, dan relay tetap perlu diuji di perangkat.

## Edge Case Test Firmware

- heap rendah,
- cache penuh,
- CRC mismatch,
- HTTP timeout,
- token kosong,
- Wi-Fi putus,
- sensor invalid,
- OTA file kosong,
- boot crash berulang.

## File yang Relevan

- [test_cache_manager/test_main.cpp](../14-complete-file-walkthrough/node/test/test_cache_manager/test_main.cpp.md)
- [test_integration/test_main.cpp](../14-complete-file-walkthrough/node/test/test_integration/test_main.cpp.md)
- [test_native_json/test_json_logic.cpp](../14-complete-file-walkthrough/node/test/test_native_json/test_json_logic.cpp.md)
- [test_native_stress/test_system_stress.cpp](../14-complete-file-walkthrough/node/test/test_native_stress/test_system_stress.cpp.md)
- [cache_fault_injection_e2e.js](../14-complete-file-walkthrough/node/test/fault_injection/cache_fault_injection_e2e.js.md)
- [ESP8266WiFi.h mock](../14-complete-file-walkthrough/node/test/mocks/ESP8266WiFi.h.md)
- [LittleFS.h mock](../14-complete-file-walkthrough/node/test/mocks/LittleFS.h.md)
