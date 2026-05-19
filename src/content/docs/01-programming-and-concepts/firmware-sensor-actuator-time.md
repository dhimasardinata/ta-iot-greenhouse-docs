---
title: "Sensor, Aktuator, dan Waktu Firmware"
---

# Sensor, Aktuator, dan Waktu Firmware

Firmware greenhouse berhubungan langsung dengan dunia fisik. Sensor membaca kondisi lingkungan. Aktuator mengubah kondisi. Waktu menentukan kapan data valid, kapan jadwal aktif, dan kapan data dianggap basi.

## Sensor

Sensor utama yang terlihat:

- SHT untuk suhu dan kelembapan,
- BH1750 untuk cahaya/lux,
- RSSI dari Wi-Fi sebagai kualitas sinyal,
- data kamera di backend untuk status kabut pada greenhouse tertentu.

Firmware perlu membedakan nilai angka dan status validitas. Angka sensor tidak otomatis benar jika sensor gagal, belum stabil, atau baru reboot.

Edge case:

- sensor belum siap setelah boot,
- pembacaan `NaN`,
- I2C gagal,
- nilai terlalu ekstrem,
- cahaya melewati rentang normal,
- kalibrasi berbeda antar node,
- data lama masih tersimpan saat sensor offline.

## Normalisasi dan Kalibrasi

Normalisasi membuat data sensor punya format yang konsisten sebelum dikirim. Kalibrasi mengoreksi offset atau faktor skala.

Contoh:

- suhu bisa punya offset,
- kelembapan bisa punya offset,
- lux bisa punya scaling factor,
- snapshot efektif bisa memakai nilai sensor plus koreksi config.

Risiko:

- kalibrasi salah membuat data terlihat rapi tetapi tidak akurat,
- offset terlalu besar perlu batas,
- nilai hasil koreksi tetap perlu validasi,
- perubahan kalibrasi perlu tercatat agar hasil uji bisa dijelaskan.

## Aktuator

Gateway mengendalikan aktuator seperti blower, exhaust, dehumidifier, relay, atau SSR. Keputusan bisa datang dari:

- threshold sensor,
- schedule,
- cloud control,
- mode manual,
- failsafe.

Aktuator berbeda dari UI biasa karena ada efek fisik. Kesalahan kecil bisa membuat perangkat menyala saat tidak seharusnya.

Edge case:

- sensor stale tetapi threshold tetap dipakai,
- jadwal overlap,
- cloud control dan local threshold bertentangan,
- relay aktif saat boot,
- aktuator perlu hold atau cooldown,
- perintah manual lupa dimatikan.

## Waktu

Waktu dipakai untuk:

- timestamp data sensor,
- jadwal aktuator,
- replay protection,
- log SD Card,
- TTL cache,
- timeout koneksi,
- interval upload,
- boot stability window.

Sumber waktu yang terlihat:

- NTP,
- RTC DS3231,
- modem network time,
- HTTP time API,
- client bootstrap.

Edge case:

- NTP belum sinkron,
- RTC kehilangan daya,
- timezone salah,
- jam mundur,
- timestamp payload berbeda dari waktu gateway,
- replay window terlalu ketat saat waktu belum valid.

## Kontrol Berbasis Threshold dan Jadwal

Threshold membaca nilai sensor dan memutuskan kondisi aman/tidak. Jadwal membaca waktu dan menentukan relay yang aktif pada rentang tertentu.

Yang perlu dipahami:

- threshold punya batas min/max,
- jadwal punya start/end,
- schedule gateway memakai format relay,
- UI web menyimpan mode actuator seperti `on`, `off`, atau `threshold`,
- gateway perlu menentukan prioritas saat beberapa sumber kontrol aktif.

## File yang Relevan

- [node/lib/NodeCore/sensor/SensorManager.h](../14-complete-file-walkthrough/node/lib/NodeCore/sensor/SensorManager.h.md)
- [node/lib/NodeCore/sensor/SensorNormalization.h](../14-complete-file-walkthrough/node/lib/NodeCore/sensor/SensorNormalization.h.md)
- [node/include/config/calibration.h](../14-complete-file-walkthrough/node/include/config/calibration.h.md)
- [gateway/include/ThresholdValidation.h](../14-complete-file-walkthrough/gateway/include/ThresholdValidation.h.md)
- [gateway/include/ScheduleValidation.h](../14-complete-file-walkthrough/gateway/include/ScheduleValidation.h.md)
- [gateway/src/RelayController.cpp](../14-complete-file-walkthrough/gateway/src/RelayController.cpp.md)
- [gateway/src/SensorDataManager.cpp](../14-complete-file-walkthrough/gateway/src/SensorDataManager.cpp.md)
- [gateway/src/RTCManager.cpp](../14-complete-file-walkthrough/gateway/src/RTCManager.cpp.md)
- [gateway/src/LCDDisplay.cpp](../14-complete-file-walkthrough/gateway/src/LCDDisplay.cpp.md)
