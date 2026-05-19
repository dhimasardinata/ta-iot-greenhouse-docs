---
title: "Build Firmware Node"
---

# Build Firmware Node

Build firmware node mengubah source C++ menjadi file `.bin` yang bisa dipasang ke ESP8266 atau Wemos D1 Mini.

## Command yang Terlihat

Dari `node/Justfile`:

```bash
pio run
pio run -t upload
pio test -e native -v
python3 scripts/check_coding_standard.py
```

Dari `node/platformio.ini`, default environment adalah:

```txt
wemosd1mini_usb
```

Environment lain yang terlihat:

- `wemosd1mini_ota`
- `nodemcuv2_usb`
- `nodemcuv2_ota`
- `integration_test_mocked`
- `native`

## Build Banyak Node

`node/scripts/build_all.py` membangun node 1 sampai 10 dan menyalin hasil ke:

```txt
node/var/dist/node1.bin
node/var/dist/node2.bin
...
node/var/dist/node10.bin
```

Script ini juga memetakan:

- node 1 sampai 5 ke GH 1,
- node 6 sampai 10 ke GH 2.

## Hal yang Perlu Dijaga

- Jangan mengubah `node_id.ini` secara manual tanpa paham efeknya.
- Pastikan `include/generated/node_config.h` dihasilkan dari konfigurasi yang benar.
- Perhatikan output `analyze_stack.py` karena ESP8266 punya RAM dan stack kecil.
- Jangan menganggap build native sama dengan aman di perangkat fisik.

Lanjutkan ke [Build Firmware Gateway](./build-firmware-gateway.md).
