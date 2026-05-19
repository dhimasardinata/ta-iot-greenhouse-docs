---
title: "Dependency Governance"
---

# Dependency Governance

Dependency governance adalah cara mengontrol library, toolchain, dan action CI agar sistem tidak bergantung pada komponen yang tidak jelas.

## Bukti dari Kode

Firmware node memiliki kontrol dependency yang kuat:

- `node/platformio.ini` memakai vendor PlatformIO lokal untuk ESP8266.
- `node/scripts/check_coding_standard.py` mengecek vendored manifest dan dependency governance.
- `node/docs/dependency-governance.md` ada sebagai dokumentasi node lama.
- `node/package.json` mengunci dependency JavaScript melalui `package-lock.json`.
- `node/.github/dependabot.yml` terlihat di inventory.
- `node/.github/workflows/ci.yml` menjalankan `npm audit --audit-level=high`.

Gateway memakai dependency PlatformIO eksternal di `gateway/platformio.ini`, seperti ArduinoJson, RTClib, LiquidCrystal_I2C, TinyGSM, NTPClient, ESPAsyncWebServer, dan AsyncTCP.

## Risiko

- Library berubah versi dan perilaku ikut berubah.
- Toolchain berubah dan warning baru muncul.
- Dependency web memiliki vulnerability.
- Vendor library besar memakan flash atau RAM.

## Prinsip

Untuk firmware embedded, dependency bukan hanya urusan "bisa install". Dependency harus dilihat dari RAM, flash, blocking behavior, interrupt safety, dan maintenance.

Lanjutkan ke [Deployment Docs](./deployment-docs.md).
