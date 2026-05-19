---
title: "gateway/src/MyNetworkManager.cpp"
---

# gateway/src/MyNetworkManager.cpp

File ini mengimplementasikan pengelola jaringan gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/MyNetworkManager.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway membutuhkan Wi-Fi, GPRS, HTTP/HTTPS, relay fallback, fetch data cloud, post status perangkat, time sync, dan QoS check. File ini adalah implementasi utama jaringan gateway.

## Area Besar dalam File

File ini mencakup:

- helper user-agent dan device ID gateway,
- helper status Wi-Fi, state Wi-Fi, dan mode uplink,
- masking query sensitif pada URL,
- deteksi WAF/block dari response body,
- parsing sensor cloud, threshold, schedule, fog, dan waktu,
- Wi-Fi HTTP request,
- GPRS HTTP request,
- router request umum `_performHttpRequest(...)`,
- fetch threshold, node data, schedule, bundle greenhouse, camera status,
- post/get device status,
- QoS check beberapa endpoint,
- state machine Wi-Fi,
- manual Wi-Fi switch,
- state machine fallback GPRS SIM800,
- relay/proxy fallback untuk request cloud.

## Alur HTTP

`_performHttpRequest(...)` memilih jalur request. Request bisa lewat Wi-Fi langsung, GPRS, atau relay URL tergantung mode uplink, status koneksi, HTTP status, dan deteksi WAF.

## Cloud Fetch

File ini menyediakan fetch untuk:

- threshold,
- node data,
- schedule,
- bundle greenhouse,
- camera/fog status,
- HTTP time info,
- modem time info,
- firmware/QoS endpoint.

## Wi-Fi State Machine

Wi-Fi dikelola dengan state seperti scanning, connecting, connected, retry delay, dan fallback GPRS. Kredensial berasal dari `WiFiCredentialStore`.

## GPRS Fallback

GPRS memakai SIM800 melalui `TinyGsm`. Tahap setup berjalan dari probe AT, disable echo, APN/PDP setup, bearer check, attach GPRS, sampai query IP dan DNS.

## Data Masuk

Data masuk berupa token, URL API, SSID/password, APN, SIM PIN, payload HTTP, response JSON cloud, status Wi-Fi, response modem, dan request operator.

## Data Keluar

Data keluar berupa snapshot cloud, status device, time info, QoS metrics, status koneksi, perubahan credential Wi-Fi, dan route uplink aktif.

## Error yang Mungkin Terjadi

- Token atau URL salah membuat request gagal walau jaringan sehat.
- Response JSON berubah format sehingga parsing snapshot gagal.
- GPRS setup dapat berhenti di salah satu stage jika modem/SIM/APN bermasalah.
- Relay fallback bisa aktif jika direct cloud dianggap gagal atau diblokir.
- Timeout request harus dijaga agar tidak mengganggu loop kontrol.

## Bagian untuk Pemula

File ini adalah "bagian internet" gateway. Ia mencari Wi-Fi, bisa memakai SIM/GPRS, mengambil data dari server, dan mengirim status alat.

## Bagian Advanced

File ini sangat besar dan memegang banyak tanggung jawab. Saat review final, pisahkan pembacaan menjadi tiga jalur: state machine koneksi, transport HTTP/GPRS, dan parser payload cloud.

## Hubungan ke Sistem TA

Mode cloud, auto recovery, sinkronisasi threshold/jadwal, status device, dan data cloud greenhouse bergantung pada file ini.
