---
title: "Overview Operasi"
---

# Overview Operasi

Operasi adalah cara menjalankan, membangun, memperbarui, memantau, dan merawat sistem setelah kode dibuat.

Untuk TA IoT Greenhouse, operasi tidak hanya berarti menjalankan server. Operasi juga mencakup firmware node, firmware gateway, backend, web, Android, database, OTA, token, sertifikat, log, dan recovery saat perangkat gagal.

## Bukti dari Kode

- `node/Justfile` berisi command build, upload, check, test, dan deploy docs.
- `node/platformio.ini` mendefinisikan build Wemos D1 Mini, NodeMCU v2, OTA, native test, dan integration test.
- `gateway/platformio.ini` mendefinisikan build GH1 dan GH2.
- `node/scripts/build_all.py` membangun firmware node 1 sampai 10.
- `node/scripts/build_and_ota.py` membangun dan mengunggah firmware OTA.
- `node/scripts/analyze_stack.py` menjadi gate stack usage.
- `node/.github/workflows/ci.yml` menjalankan CI firmware node.
- `node/.github/workflows/docs-deploy.yml` deploy docs node lama ke Netlify.

## Area Operasi

1. Build firmware node.
2. Build firmware gateway.
3. OTA release.
4. Konfigurasi perangkat.
5. Monitoring log.
6. Dependency governance.
7. Deployment docs.
8. Troubleshooting produksi.

Lanjutkan ke [Build Firmware Node](./build-firmware-node.md).
