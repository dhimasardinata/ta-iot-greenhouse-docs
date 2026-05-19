---
title: "Full File Inventory"
---

# Full File Inventory

Terakhir diperiksa: 2026-05-19

Inventory ini dibuat dari scan filesystem aktual. File yang masuk grup dependency/cache/build/log dicatat sebagai grup karena jumlahnya besar dan bukan source utama yang perlu dijelaskan file-by-file.

## Ringkasan

- Total file fisik ditemukan: 5244
- File inventory terperinci: 341
- File yang perlu dijelaskan: 317
- File terperinci yang di-skip dengan alasan: 24
- File dalam grup skip: 4903

## Ringkasan Kelas File

| Kelas | Jumlah |
|---|---:|
| Source | 228 |
| Config | 30 |
| Script | 23 |
| Asset | 10 |
| Test | 26 |
| Existing Docs | 16 |
| Generated Snapshot | 6 |
| Dependency/Build/Cache/Log | 0 |
| Other | 2 |

## Grup Skip

| Path / Pola | Jumlah File | Alasan |
|---|---:|---|
| `node/.cache/` | 52 | Local/editor/build cache; generated and not maintained source. |
| `node/.git/` | 61 | Nested Git metadata for the node project; not source code. |
| `node/node_modules/` | 69 | Installed JavaScript dependency output; dependency is represented by node/package.json and node/package-lock.json. |
| `node/tools/prompt/` | 241 | Generated prompt/context mirror of source files; duplicates real source paths and should not be documented as separate runtime code. |
| `node/var/` | 12 | Generated build, smoke-test, and log output; not maintained source. |
| `node/vendor/` | 4468 | Installed PlatformIO platforms, packages, and third-party libraries; dependency is represented by node/platformio.ini and lock/config files. |

## Daftar File Terperinci

| File | Komponen | Kelas | Status | Rencana Halaman Docs / Alasan |
|---|---|---|---|---|
| `android/AndroidManifest.xml.txt` | Android | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/android/AndroidManifest.xml.txt.md |
| `android/MainActivity.kt.txt` | Android | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/android/MainActivity.kt.txt.md |
| `android/activity_main.xml.txt` | Android | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/android/activity_main.xml.txt.md |
| `gateway/.gitignore` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/gateway/.gitignore.md |
| `gateway/include/ConfigManager.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/ConfigManager.h.md |
| `gateway/include/CryptoUtils.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/CryptoUtils.h.md |
| `gateway/include/DeferredControlActions.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/DeferredControlActions.h.md |
| `gateway/include/EmbeddedCryptoJs.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/EmbeddedCryptoJs.h.md |
| `gateway/include/GatewayControlState.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/GatewayControlState.h.md |
| `gateway/include/LCDDisplay.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/LCDDisplay.h.md |
| `gateway/include/MyNetworkManager.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/MyNetworkManager.h.md |
| `gateway/include/PortalAssets.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/PortalAssets.h.md |
| `gateway/include/RTCManager.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/RTCManager.h.md |
| `gateway/include/RelayController.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/RelayController.h.md |
| `gateway/include/SDCardLogger.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/SDCardLogger.h.md |
| `gateway/include/ScheduleValidation.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/ScheduleValidation.h.md |
| `gateway/include/SensorDataManager.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/SensorDataManager.h.md |
| `gateway/include/SensorNormalization.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/SensorNormalization.h.md |
| `gateway/include/ThresholdValidation.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/ThresholdValidation.h.md |
| `gateway/include/WebSerial.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/WebSerial.h.md |
| `gateway/include/WebSocketManager.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/WebSocketManager.h.md |
| `gateway/include/WiFiCredentialStore.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/WiFiCredentialStore.h.md |
| `gateway/include/config.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/config.h.md |
| `gateway/include/root_ca.h` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/include/root_ca.h.md |
| `gateway/lib/README` | Other | Other | Skipped With Reason | PlatformIO placeholder README for an empty lib folder, not runtime source code. |
| `gateway/partitions_custom.csv` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/gateway/partitions_custom.csv.md |
| `gateway/platformio.ini` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/gateway/platformio.ini.md |
| `gateway/src/ConfigManager.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/ConfigManager.cpp.md |
| `gateway/src/CryptoUtils.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/CryptoUtils.cpp.md |
| `gateway/src/GatewayControlState.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/GatewayControlState.cpp.md |
| `gateway/src/LCDDisplay.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/LCDDisplay.cpp.md |
| `gateway/src/MyNetworkManager.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/MyNetworkManager.cpp.md |
| `gateway/src/RTCManager.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/RTCManager.cpp.md |
| `gateway/src/RelayController.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/RelayController.cpp.md |
| `gateway/src/SDCardLogger.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/SDCardLogger.cpp.md |
| `gateway/src/SensorDataManager.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/SensorDataManager.cpp.md |
| `gateway/src/WebSerial.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/WebSerial.cpp.md |
| `gateway/src/WebSocketManager.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/WebSocketManager.cpp.md |
| `gateway/src/WiFiCredentialStore.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/WiFiCredentialStore.cpp.md |
| `gateway/src/main.cpp` | Firmware Gateway | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/gateway/src/main.cpp.md |
| `gateway/test/README` | Other | Other | Skipped With Reason | PlatformIO placeholder README for tests, not runtime source code. |
| Dokumen arahan internal | Other | Existing Docs | Skipped With Reason | Catatan kerja dokumentasi, bukan runtime source code. |
| `node/.clang-format` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.clang-format.md |
| `node/.codacy.yml` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.codacy.yml.md |
| `node/.devcontainer/devcontainer.json` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.devcontainer/devcontainer.json.md |
| `node/.github/dependabot.yml` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.github/dependabot.yml.md |
| `node/.github/instructions/codacy.instructions.md` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.github/instructions/codacy.instructions.md.md |
| `node/.github/workflows/ci.yml` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.github/workflows/ci.yml.md |
| `node/.github/workflows/docs-deploy.yml` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.github/workflows/docs-deploy.yml.md |
| `node/.github/workflows/simulation.yml` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.github/workflows/simulation.yml.md |
| `node/.gitignore` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.gitignore.md |
| `node/.hintrc` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.hintrc.md |
| `node/.lizardrc` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.lizardrc.md |
| `node/.pre-commit-config.yaml` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.pre-commit-config.yaml.md |
| `node/.vscode/c_cpp_properties.json` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.vscode/c_cpp_properties.json.md |
| `node/.vscode/extensions.json` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.vscode/extensions.json.md |
| `node/.vscode/launch.json` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.vscode/launch.json.md |
| `node/.vscode/settings.json` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.vscode/settings.json.md |
| `node/.vscode/tasks.json` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/.vscode/tasks.json.md |
| `node/Justfile` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/Justfile.md |
| `node/README.md` | Other | Existing Docs | Skipped With Reason | Existing project documentation; useful context but not runtime source code. |
| `node/SECURITY.md` | Other | Existing Docs | Skipped With Reason | Existing security documentation; useful context but not runtime source code. |
| `node/compile_commands.json` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/compile_commands.json.md |
| `node/data/connecting.html` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/connecting.html.md |
| `node/data/crypto.js` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/crypto.js.md |
| `node/data/index.html` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/index.html.md |
| `node/data/portal.html` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/portal.html.md |
| `node/data/rebooting.html` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/rebooting.html.md |
| `node/data/success.html` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/success.html.md |
| `node/data/terminal.css` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/terminal.css.md |
| `node/data/terminal.html` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/terminal.html.md |
| `node/data/terminal.js` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/terminal.js.md |
| `node/data/update.html` | Firmware Node | Asset | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/data/update.html.md |
| `node/docs/assets/aes_trace.js` | Other | Existing Docs | Skipped With Reason | Existing documentation asset, not runtime source for the TA system. |
| `node/docs/assets/app.js` | Other | Existing Docs | Skipped With Reason | Existing documentation asset, not runtime source for the TA system. |
| `node/docs/assets/cache_crc_trace.js` | Other | Existing Docs | Skipped With Reason | Existing documentation asset, not runtime source for the TA system. |
| `node/docs/assets/styles.css` | Other | Existing Docs | Skipped With Reason | Existing documentation asset, not runtime source for the TA system. |
| `node/docs/coding-standard.md` | Other | Existing Docs | Skipped With Reason | Existing node documentation, not runtime source code. |
| `node/docs/dependency-governance.md` | Other | Existing Docs | Skipped With Reason | Existing node documentation, not runtime source code. |
| `node/docs/deviations.md` | Other | Existing Docs | Skipped With Reason | Existing node documentation, not runtime source code. |
| Dokumen arahan teknis node | Other | Existing Docs | Skipped With Reason | Catatan engineering node, bukan runtime source code TA. |
| `node/docs/index.html` | Other | Existing Docs | Skipped With Reason | Existing generated/static documentation page, not TA runtime source. |
| `node/docs/internal/audit-prompt.md` | Other | Existing Docs | Skipped With Reason | Internal audit prompt documentation, not runtime source code. |
| `node/docs/prinsip-efisiensi-memori-embedded.md` | Other | Existing Docs | Skipped With Reason | Existing node documentation, not runtime source code. |
| `node/docs/repo-structure.md` | Other | Existing Docs | Skipped With Reason | Existing node documentation, not runtime source code. |
| `node/dump.md` | Other | Existing Docs | Skipped With Reason | Documentation/context dump, not runtime source code. |
| `node/include/app/Application.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/app/Application.h.md |
| `node/include/app/BootManager.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/app/BootManager.h.md |
| `node/include/app/HAL.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/app/HAL.h.md |
| `node/include/config/calibration.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/config/calibration.h.md |
| `node/include/config/constants.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/config/constants.h.md |
| `node/include/config/hardware_pins.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/config/hardware_pins.h.md |
| `node/include/generated/WebAppData.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/generated/WebAppData.h.md |
| `node/include/generated/certs.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/generated/certs.h.md |
| `node/include/generated/node_config.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/generated/node_config.h.md |
| `node/include/generated/root_ca_data.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/include/generated/root_ca_data.h.md |
| `node/lib/NodeCore/api/ApiClient.Context.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Context.h.md |
| `node/lib/NodeCore/api/ApiClient.Control.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Control.cpp.md |
| `node/lib/NodeCore/api/ApiClient.ControlController.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.ControlController.h.md |
| `node/lib/NodeCore/api/ApiClient.CoreShared.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.CoreShared.h.md |
| `node/lib/NodeCore/api/ApiClient.Health.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Health.h.md |
| `node/lib/NodeCore/api/ApiClient.Immediate.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Immediate.cpp.md |
| `node/lib/NodeCore/api/ApiClient.Lifecycle.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Lifecycle.cpp.md |
| `node/lib/NodeCore/api/ApiClient.LifecycleController.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.LifecycleController.h.md |
| `node/lib/NodeCore/api/ApiClient.Qos.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Qos.cpp.md |
| `node/lib/NodeCore/api/ApiClient.QosController.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.QosController.h.md |
| `node/lib/NodeCore/api/ApiClient.Queue.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Queue.cpp.md |
| `node/lib/NodeCore/api/ApiClient.QueueController.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.QueueController.h.md |
| `node/lib/NodeCore/api/ApiClient.QueueEmergency.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.QueueEmergency.cpp.md |
| `node/lib/NodeCore/api/ApiClient.QueueStorage.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.QueueStorage.cpp.md |
| `node/lib/NodeCore/api/ApiClient.Security.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Security.cpp.md |
| `node/lib/NodeCore/api/ApiClient.State.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.State.h.md |
| `node/lib/NodeCore/api/ApiClient.Transport.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Transport.cpp.md |
| `node/lib/NodeCore/api/ApiClient.TransportController.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.TransportController.h.md |
| `node/lib/NodeCore/api/ApiClient.TransportShared.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.TransportShared.cpp.md |
| `node/lib/NodeCore/api/ApiClient.TransportShared.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.TransportShared.h.md |
| `node/lib/NodeCore/api/ApiClient.TransportSingle.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.TransportSingle.cpp.md |
| `node/lib/NodeCore/api/ApiClient.TransportState.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.TransportState.cpp.md |
| `node/lib/NodeCore/api/ApiClient.TransportSupport.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.TransportSupport.cpp.md |
| `node/lib/NodeCore/api/ApiClient.Upload.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Upload.cpp.md |
| `node/lib/NodeCore/api/ApiClient.UploadController.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadController.h.md |
| `node/lib/NodeCore/api/ApiClient.UploadFlow.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadFlow.cpp.md |
| `node/lib/NodeCore/api/ApiClient.UploadRecords.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadRecords.cpp.md |
| `node/lib/NodeCore/api/ApiClient.UploadRuntime.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadRuntime.cpp.md |
| `node/lib/NodeCore/api/ApiClient.UploadRuntimeController.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadRuntimeController.h.md |
| `node/lib/NodeCore/api/ApiClient.UploadRuntimeCycle.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadRuntimeCycle.cpp.md |
| `node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp.md |
| `node/lib/NodeCore/api/ApiClient.UploadShared.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadShared.cpp.md |
| `node/lib/NodeCore/api/ApiClient.UploadShared.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadShared.h.md |
| `node/lib/NodeCore/api/ApiClient.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.cpp.md |
| `node/lib/NodeCore/api/ApiClient.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.h.md |
| `node/lib/NodeCore/commands/CacheStatusCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/CacheStatusCommand.cpp.md |
| `node/lib/NodeCore/commands/CacheStatusCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/CacheStatusCommand.h.md |
| `node/lib/NodeCore/commands/CheckUpdateCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/CheckUpdateCommand.cpp.md |
| `node/lib/NodeCore/commands/CheckUpdateCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/CheckUpdateCommand.h.md |
| `node/lib/NodeCore/commands/ClearCacheCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ClearCacheCommand.cpp.md |
| `node/lib/NodeCore/commands/ClearCacheCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ClearCacheCommand.h.md |
| `node/lib/NodeCore/commands/CommandContext.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/CommandContext.h.md |
| `node/lib/NodeCore/commands/CrashLogCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/CrashLogCommand.cpp.md |
| `node/lib/NodeCore/commands/CrashLogCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/CrashLogCommand.h.md |
| `node/lib/NodeCore/commands/FactoryResetCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/FactoryResetCommand.cpp.md |
| `node/lib/NodeCore/commands/FactoryResetCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/FactoryResetCommand.h.md |
| `node/lib/NodeCore/commands/ForceOtaInsecureCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ForceOtaInsecureCommand.h.md |
| `node/lib/NodeCore/commands/FormatFsCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/FormatFsCommand.cpp.md |
| `node/lib/NodeCore/commands/FormatFsCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/FormatFsCommand.h.md |
| `node/lib/NodeCore/commands/FsStatusCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/FsStatusCommand.cpp.md |
| `node/lib/NodeCore/commands/FsStatusCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/FsStatusCommand.h.md |
| `node/lib/NodeCore/commands/GetCalibrationCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/GetCalibrationCommand.cpp.md |
| `node/lib/NodeCore/commands/GetCalibrationCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/GetCalibrationCommand.h.md |
| `node/lib/NodeCore/commands/GetConfigCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/GetConfigCommand.cpp.md |
| `node/lib/NodeCore/commands/GetConfigCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/GetConfigCommand.h.md |
| `node/lib/NodeCore/commands/ICommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ICommand.h.md |
| `node/lib/NodeCore/commands/LoginCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/LoginCommand.cpp.md |
| `node/lib/NodeCore/commands/LoginCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/LoginCommand.h.md |
| `node/lib/NodeCore/commands/LogoutCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/LogoutCommand.cpp.md |
| `node/lib/NodeCore/commands/LogoutCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/LogoutCommand.h.md |
| `node/lib/NodeCore/commands/ModeCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ModeCommand.cpp.md |
| `node/lib/NodeCore/commands/ModeCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ModeCommand.h.md |
| `node/lib/NodeCore/commands/NetConfigCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/NetConfigCommand.cpp.md |
| `node/lib/NodeCore/commands/NetConfigCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/NetConfigCommand.h.md |
| `node/lib/NodeCore/commands/OpenWifiCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/OpenWifiCommand.cpp.md |
| `node/lib/NodeCore/commands/OpenWifiCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/OpenWifiCommand.h.md |
| `node/lib/NodeCore/commands/QosCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/QosCommand.cpp.md |
| `node/lib/NodeCore/commands/QosCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/QosCommand.h.md |
| `node/lib/NodeCore/commands/ReadSensorsCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ReadSensorsCommand.cpp.md |
| `node/lib/NodeCore/commands/ReadSensorsCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ReadSensorsCommand.h.md |
| `node/lib/NodeCore/commands/RebootCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/RebootCommand.cpp.md |
| `node/lib/NodeCore/commands/RebootCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/RebootCommand.h.md |
| `node/lib/NodeCore/commands/ResetCalibrationCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ResetCalibrationCommand.cpp.md |
| `node/lib/NodeCore/commands/ResetCalibrationCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ResetCalibrationCommand.h.md |
| `node/lib/NodeCore/commands/SendNowCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SendNowCommand.cpp.md |
| `node/lib/NodeCore/commands/SendNowCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SendNowCommand.h.md |
| `node/lib/NodeCore/commands/SetCalibrationCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetCalibrationCommand.cpp.md |
| `node/lib/NodeCore/commands/SetCalibrationCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetCalibrationCommand.h.md |
| `node/lib/NodeCore/commands/SetConfigCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetConfigCommand.cpp.md |
| `node/lib/NodeCore/commands/SetConfigCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetConfigCommand.h.md |
| `node/lib/NodeCore/commands/SetGatewayCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetGatewayCommand.cpp.md |
| `node/lib/NodeCore/commands/SetGatewayCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetGatewayCommand.h.md |
| `node/lib/NodeCore/commands/SetPortalPassCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetPortalPassCommand.cpp.md |
| `node/lib/NodeCore/commands/SetPortalPassCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetPortalPassCommand.h.md |
| `node/lib/NodeCore/commands/SetTimeCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetTimeCommand.cpp.md |
| `node/lib/NodeCore/commands/SetTimeCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetTimeCommand.h.md |
| `node/lib/NodeCore/commands/SetTokenCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetTokenCommand.cpp.md |
| `node/lib/NodeCore/commands/SetTokenCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetTokenCommand.h.md |
| `node/lib/NodeCore/commands/SetUrlCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetUrlCommand.cpp.md |
| `node/lib/NodeCore/commands/SetUrlCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetUrlCommand.h.md |
| `node/lib/NodeCore/commands/SetWifiCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetWifiCommand.cpp.md |
| `node/lib/NodeCore/commands/SetWifiCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SetWifiCommand.h.md |
| `node/lib/NodeCore/commands/SysInfoCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SysInfoCommand.cpp.md |
| `node/lib/NodeCore/commands/SysInfoCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/SysInfoCommand.h.md |
| `node/lib/NodeCore/commands/UplinkCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/UplinkCommand.cpp.md |
| `node/lib/NodeCore/commands/UplinkCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/UplinkCommand.h.md |
| `node/lib/NodeCore/commands/WifiAddCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/WifiAddCommand.cpp.md |
| `node/lib/NodeCore/commands/WifiAddCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/WifiAddCommand.h.md |
| `node/lib/NodeCore/commands/WifiListCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/WifiListCommand.cpp.md |
| `node/lib/NodeCore/commands/WifiListCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/WifiListCommand.h.md |
| `node/lib/NodeCore/commands/WifiRemoveCommand.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/WifiRemoveCommand.cpp.md |
| `node/lib/NodeCore/commands/WifiRemoveCommand.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/WifiRemoveCommand.h.md |
| `node/lib/NodeCore/commands/ZeroCalibrationCommand.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ZeroCalibrationCommand.cpp.md |
| `node/lib/NodeCore/commands/ZeroCalibrationCommand.h` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/commands/ZeroCalibrationCommand.h.md |
| `node/lib/NodeCore/interfaces/IAuthManager.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/interfaces/IAuthManager.h.md |
| `node/lib/NodeCore/interfaces/ICacheManager.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/interfaces/ICacheManager.h.md |
| `node/lib/NodeCore/interfaces/IConfigObserver.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/interfaces/IConfigObserver.h.md |
| `node/lib/NodeCore/interfaces/ISensorManager.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/interfaces/ISensorManager.h.md |
| `node/lib/NodeCore/interfaces/IWifiStateObserver.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/interfaces/IWifiStateObserver.h.md |
| `node/lib/NodeCore/library.json` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/library.json.md |
| `node/lib/NodeCore/net/NtpClient.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/net/NtpClient.cpp.md |
| `node/lib/NodeCore/net/NtpClient.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/net/NtpClient.h.md |
| `node/lib/NodeCore/net/WifiCredentialStore.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/net/WifiCredentialStore.cpp.md |
| `node/lib/NodeCore/net/WifiCredentialStore.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/net/WifiCredentialStore.h.md |
| `node/lib/NodeCore/net/WifiManager.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/net/WifiManager.cpp.md |
| `node/lib/NodeCore/net/WifiManager.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/net/WifiManager.h.md |
| `node/lib/NodeCore/ota/BootGuard.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/ota/BootGuard.cpp.md |
| `node/lib/NodeCore/ota/BootGuard.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/ota/BootGuard.h.md |
| `node/lib/NodeCore/ota/OtaManager.Context.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/ota/OtaManager.Context.h.md |
| `node/lib/NodeCore/ota/OtaManager.Health.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/ota/OtaManager.Health.h.md |
| `node/lib/NodeCore/ota/OtaManager.Security.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/ota/OtaManager.Security.cpp.md |
| `node/lib/NodeCore/ota/OtaManager.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/ota/OtaManager.cpp.md |
| `node/lib/NodeCore/ota/OtaManager.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/ota/OtaManager.h.md |
| `node/lib/NodeCore/security/TlsClientOps.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/security/TlsClientOps.cpp.md |
| `node/lib/NodeCore/security/TlsClientOps.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/security/TlsClientOps.h.md |
| `node/lib/NodeCore/security/TrustAnchors.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/security/TrustAnchors.cpp.md |
| `node/lib/NodeCore/security/TrustAnchors.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/security/TrustAnchors.h.md |
| `node/lib/NodeCore/sensor/SensorData.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/sensor/SensorData.h.md |
| `node/lib/NodeCore/sensor/SensorManager.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/sensor/SensorManager.cpp.md |
| `node/lib/NodeCore/sensor/SensorManager.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/sensor/SensorManager.h.md |
| `node/lib/NodeCore/sensor/SensorNormalization.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/sensor/SensorNormalization.h.md |
| `node/lib/NodeCore/storage/CacheManager.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/storage/CacheManager.cpp.md |
| `node/lib/NodeCore/storage/CacheManager.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/storage/CacheManager.h.md |
| `node/lib/NodeCore/storage/Paths.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/storage/Paths.h.md |
| `node/lib/NodeCore/storage/RtcManager.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/storage/RtcManager.cpp.md |
| `node/lib/NodeCore/storage/RtcManager.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/storage/RtcManager.h.md |
| `node/lib/NodeCore/support/CompileTimeJSON.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/CompileTimeJSON.h.md |
| `node/lib/NodeCore/support/CompileTimeUtils.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/CompileTimeUtils.h.md |
| `node/lib/NodeCore/support/Crc32.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/Crc32.cpp.md |
| `node/lib/NodeCore/support/Crc32.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/Crc32.h.md |
| `node/lib/NodeCore/support/CryptoUtils.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/CryptoUtils.cpp.md |
| `node/lib/NodeCore/support/CryptoUtils.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/CryptoUtils.h.md |
| `node/lib/NodeCore/support/GatewayTargeting.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/GatewayTargeting.h.md |
| `node/lib/NodeCore/support/ParseUtils.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/ParseUtils.h.md |
| `node/lib/NodeCore/support/PrecisionTypes.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/PrecisionTypes.h.md |
| `node/lib/NodeCore/support/RuntimeClock.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/RuntimeClock.h.md |
| `node/lib/NodeCore/support/TextBufferUtils.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/TextBufferUtils.h.md |
| `node/lib/NodeCore/support/TextFormatUtils.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/TextFormatUtils.h.md |
| `node/lib/NodeCore/support/Utils.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/Utils.cpp.md |
| `node/lib/NodeCore/support/Utils.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/support/Utils.h.md |
| `node/lib/NodeCore/system/ConfigManager.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/ConfigManager.cpp.md |
| `node/lib/NodeCore/system/ConfigManager.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/ConfigManager.h.md |
| `node/lib/NodeCore/system/CrashHandler.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/CrashHandler.cpp.md |
| `node/lib/NodeCore/system/CrashHandler.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/CrashHandler.h.md |
| `node/lib/NodeCore/system/IntervalTimer.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/IntervalTimer.h.md |
| `node/lib/NodeCore/system/Logger.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/Logger.cpp.md |
| `node/lib/NodeCore/system/Logger.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/Logger.h.md |
| `node/lib/NodeCore/system/MemoryTelemetry.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/MemoryTelemetry.h.md |
| `node/lib/NodeCore/system/NodeIdentity.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/NodeIdentity.h.md |
| `node/lib/NodeCore/system/SystemHealth.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/system/SystemHealth.h.md |
| `node/lib/NodeCore/terminal/DiagnosticsTerminal.Commands.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/terminal/DiagnosticsTerminal.Commands.cpp.md |
| `node/lib/NodeCore/terminal/DiagnosticsTerminal.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/terminal/DiagnosticsTerminal.cpp.md |
| `node/lib/NodeCore/terminal/DiagnosticsTerminal.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/terminal/DiagnosticsTerminal.h.md |
| `node/lib/NodeCore/terminal/TerminalFormatting.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/terminal/TerminalFormatting.cpp.md |
| `node/lib/NodeCore/terminal/TerminalFormatting.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/terminal/TerminalFormatting.h.md |
| `node/lib/NodeCore/web/AppServer.Routes.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/web/AppServer.Routes.cpp.md |
| `node/lib/NodeCore/web/AppServer.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/web/AppServer.cpp.md |
| `node/lib/NodeCore/web/AppServer.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/web/AppServer.h.md |
| `node/lib/NodeCore/web/PortalServer.Routes.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/web/PortalServer.Routes.cpp.md |
| `node/lib/NodeCore/web/PortalServer.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/web/PortalServer.cpp.md |
| `node/lib/NodeCore/web/PortalServer.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/web/PortalServer.h.md |
| `node/lib/NodeCore/web/WifiRouteUtils.h` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/lib/NodeCore/web/WifiRouteUtils.h.md |
| `node/node_id.ini` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/node_id.ini.md |
| `node/package-lock.json` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/package-lock.json.md |
| `node/package.json` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/package.json.md |
| `node/platformio.ini` | Config | Config | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/platformio.ini.md |
| `node/scripts/analyze_stack.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/analyze_stack.py.md |
| `node/scripts/build_all.bat` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/build_all.bat.md |
| `node/scripts/build_all.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/build_all.py.md |
| `node/scripts/build_and_ota.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/build_and_ota.py.md |
| `node/scripts/check_coding_standard.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/check_coding_standard.py.md |
| `node/scripts/collect_prompt_files.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/collect_prompt_files.py.md |
| `node/scripts/convert_certs.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/convert_certs.py.md |
| `node/scripts/convert_sysincludes.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/convert_sysincludes.py.md |
| `node/scripts/curl_ota_post.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/curl_ota_post.py.md |
| `node/scripts/curl_ota_post_all.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/curl_ota_post_all.py.md |
| `node/scripts/extra_script.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/extra_script.py.md |
| `node/scripts/format_all.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/format_all.py.md |
| `node/scripts/inject_config.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/inject_config.py.md |
| `node/scripts/install_watchers_service.sh` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/install_watchers_service.sh.md |
| `node/scripts/patch_header.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/patch_header.py.md |
| `node/scripts/prepare_assets.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/prepare_assets.py.md |
| `node/scripts/sanitize_for_public.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/sanitize_for_public.py.md |
| `node/scripts/test_ota_upload.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/test_ota_upload.py.md |
| `node/scripts/web_to_header.py` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/scripts/web_to_header.py.md |
| `node/src/Application.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/src/Application.cpp.md |
| `node/src/BootManager.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/src/BootManager.cpp.md |
| `node/src/generated/WebAppData.cpp` | Firmware Node | Source | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/src/generated/WebAppData.cpp.md |
| `node/src/main.cpp` | Firmware Node | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/node/src/main.cpp.md |
| `node/test/fault_injection/cache_fault_injection_e2e.js` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/fault_injection/cache_fault_injection_e2e.js.md |
| `node/test/mocks/Arduino.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/Arduino.h.md |
| `node/test/mocks/ArduinoOTA.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/ArduinoOTA.h.md |
| `node/test/mocks/ESP8266HTTPClient.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/ESP8266HTTPClient.h.md |
| `node/test/mocks/ESP8266WiFi.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/ESP8266WiFi.h.md |
| `node/test/mocks/ESP8266mDNS.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/ESP8266mDNS.h.md |
| `node/test/mocks/ESPAsyncWebServer.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/ESPAsyncWebServer.h.md |
| `node/test/mocks/FS.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/FS.h.md |
| `node/test/mocks/LittleFS.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/LittleFS.h.md |
| `node/test/mocks/MockSystem.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/MockSystem.h.md |
| `node/test/mocks/NativeTestHelper.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/NativeTestHelper.h.md |
| `node/test/mocks/Updater.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/Updater.h.md |
| `node/test/mocks/WiFiClientSecureBearSSL.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/WiFiClientSecureBearSSL.h.md |
| `node/test/mocks/bearssl/bearssl.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/bearssl/bearssl.h.md |
| `node/test/mocks/bearssl/bearssl_hash.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/bearssl/bearssl_hash.h.md |
| `node/test/mocks/bearssl/bearssl_hmac.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/bearssl/bearssl_hmac.h.md |
| `node/test/mocks/user_interface.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/mocks/user_interface.h.md |
| `node/test/test_cache_manager/test_main.cpp` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/test_cache_manager/test_main.cpp.md |
| `node/test/test_integration/mock_cache_manager.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/test_integration/mock_cache_manager.h.md |
| `node/test/test_integration/mock_sensor_manager.h` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/test_integration/mock_sensor_manager.h.md |
| `node/test/test_integration/test_main.cpp` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/test_integration/test_main.cpp.md |
| `node/test/test_native_json/test_json_logic.cpp` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/test_native_json/test_json_logic.cpp.md |
| `node/test/test_native_stress/test_logic_comprehensive.cpp` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/test_native_stress/test_logic_comprehensive.cpp.md |
| `node/test/test_native_stress/test_main.cpp` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/test_native_stress/test_main.cpp.md |
| `node/test/test_native_stress/test_simulation.cpp` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/test_native_stress/test_simulation.cpp.md |
| `node/test/test_native_stress/test_system_stress.cpp` | Firmware Node | Test | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/node/test/test_native_stress/test_system_stress.cpp.md |
| `node/tools/certs/dev-cert.pem` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/tools/certs/dev-cert.pem.md |
| `node/tools/certs/dev-private.key` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/tools/certs/dev-private.key.md |
| `node/tools/certs/isrg-root-x1.pem` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/tools/certs/isrg-root-x1.pem.md |
| `node/tools/certs/openssl-san.conf` | Config | Config | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/config/node/tools/certs/openssl-san.conf.md |
| `node/tools/context/github-ci.yml.txt` | Other | Generated Snapshot | Skipped With Reason | Captured context snapshot for tooling, not maintained runtime source. |
| `node/tools/context/github-dependabot.yml.txt` | Other | Generated Snapshot | Skipped With Reason | Captured context snapshot for tooling, not maintained runtime source. |
| `node/tools/context/github-simulation.yml.txt` | Other | Generated Snapshot | Skipped With Reason | Captured context snapshot for tooling, not maintained runtime source. |
| `node/tools/context/node_id.ini.txt` | Other | Generated Snapshot | Skipped With Reason | Captured context snapshot for tooling, not maintained runtime source. |
| `node/tools/context/platformio.ini.txt` | Other | Generated Snapshot | Skipped With Reason | Captured context snapshot for tooling, not maintained runtime source. |
| `node/tools/context/tree.txt` | Other | Generated Snapshot | Skipped With Reason | Captured context snapshot for tooling, not maintained runtime source. |
| `node/tools/repro/repro-bug.js` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/tools/repro/repro-bug.js.md |
| `node/tools/repro/test-concat-nan.js` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/tools/repro/test-concat-nan.js.md |
| `node/tools/repro/test-repro.js` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/tools/repro/test-repro.js.md |
| `node/tools/watch/repo-watchers.js` | Script | Script | Pending | docs-site/src/content/docs/14-complete-file-walkthrough/scripts/node/tools/watch/repo-watchers.js.md |
| `web/ApiController.php` | Backend Laravel | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/backend/web/ApiController.php.md |
| `web/Controlling.vue` | Frontend Web | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/web/Controlling.vue.md |
| `web/Heatmap.vue` | Frontend Web | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/web/Heatmap.vue.md |
| `web/OtaController.php` | Backend Laravel | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/backend/web/OtaController.php.md |
| `web/PageController.php` | Backend Laravel | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/backend/web/PageController.php.md |
| `web/ScheduleController.php` | Backend Laravel | Source | Drafted | docs-site/src/content/docs/14-complete-file-walkthrough/backend/web/ScheduleController.php.md |
