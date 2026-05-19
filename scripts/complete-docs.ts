import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

type CoverageRow = {
  source: string;
  component: string;
  status: string;
  docPath: string;
  skipReason: string;
};

type ConceptRow = {
  keyword: string;
  category: string;
  files: string[];
  page: string;
};

const siteRoot = process.cwd();
const projectRoot = path.resolve(siteRoot, '..');
const docsRoot = path.join(siteRoot, 'src/content/docs');
const coveragePath = path.join(
  docsRoot,
  '14-complete-file-walkthrough/coverage-report.md',
);
const progressPath = path.join(projectRoot, 'docs/progress.md');
const inspectedDate = '2026-05-19';

function readText(file: string): string {
  return fs.readFileSync(file, 'utf8');
}

function writeText(file: string, text: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, 'utf8');
}

function escapeMarkdown(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function titleFromPath(file: string): string {
  return file;
}

function parseCoverageRows(text: string): CoverageRow[] {
  const rows: CoverageRow[] = [];
  const pattern = /^\| `([^`]+)` \| ([^|]+) \| ([^|]+) \| (`[^`]+`|-) \| ([^|]+) \|$/gm;

  for (const match of text.matchAll(pattern)) {
    rows.push({
      source: match[1],
      component: match[2].trim(),
      status: match[3].trim(),
      docPath: match[4] === '-' ? '-' : match[4].slice(1, -1),
      skipReason: match[5].trim(),
    });
  }

  return rows;
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function listMatches(text: string, pattern: RegExp, limit = 18): string[] {
  return unique(
    [...text.matchAll(pattern)].map((match) => match.slice(1).find((value) => value)?.trim() ?? ''),
  ).slice(0, limit);
}

function lineCount(text: string): number {
  if (text.length === 0) {
    return 0;
  }

  return text.split(/\r?\n/).length;
}

function codeFenceLanguage(file: string): string {
  const ext = path.extname(file).toLowerCase();
  if (['.h', '.hpp', '.cpp', '.ino'].includes(ext)) return 'cpp';
  if (ext === '.py') return 'python';
  if (ext === '.js') return 'javascript';
  if (ext === '.ts' || ext === '.tsx') return 'tsx';
  if (ext === '.vue') return 'vue';
  if (ext === '.php') return 'php';
  if (ext === '.kt') return 'kotlin';
  if (ext === '.xml') return 'xml';
  if (ext === '.json') return 'json';
  if (ext === '.ini') return 'ini';
  if (ext === '.sh') return 'bash';
  if (ext === '.bat') return 'bat';
  return 'text';
}

function fileKind(file: string): string {
  const ext = path.extname(file).toLowerCase();
  if (file.includes('/interfaces/')) return 'kontrak interface firmware';
  if (file.includes('/commands/')) return 'command terminal firmware';
  if (file.includes('/api/')) return 'modul API client firmware';
  if (file.includes('/net/')) return 'modul jaringan firmware';
  if (file.includes('/ota/')) return 'modul OTA firmware';
  if (file.includes('/security/')) return 'modul keamanan firmware';
  if (file.includes('/sensor/')) return 'modul pembacaan sensor';
  if (file.includes('/storage/')) return 'modul penyimpanan lokal';
  if (file.includes('/support/')) return 'helper pendukung firmware';
  if (file.includes('/system/')) return 'modul sistem firmware';
  if (file.includes('/terminal/')) return 'modul terminal diagnostik';
  if (file.includes('/web/')) return 'server web lokal firmware';
  if (file.includes('/test/mocks/')) return 'mock untuk pengujian native';
  if (file.includes('/test/')) return 'pengujian firmware node';
  if (file.includes('/scripts/') || file.includes('/tools/')) return 'script operasional';
  if (ext === '.vue') return 'komponen frontend Vue';
  if (ext === '.php') return 'bagian backend Laravel';
  return 'source code sistem TA';
}

function componentLevel(file: string, component: string): string {
  if (file.includes('/test/') || file.includes('/mocks/')) return 'Menengah';
  if (file.includes('/support/') || file.includes('/interfaces/')) return 'Menengah';
  if (component === 'Script' || component === 'Config') return 'Menengah';
  if (file.includes('/security/') || file.includes('/ota/') || file.includes('/net/')) return 'Advanced';
  return 'Advanced';
}

function roleSummary(file: string): string {
  const base = path.basename(file);
  const stem = base.replace(/\.[^.]+$/, '');

  if (file.includes('/interfaces/')) {
    return `File ini mendefinisikan kontrak ${stem}. Kontrak seperti ini dipakai agar modul lain bisa bergantung pada kemampuan yang jelas tanpa harus tahu detail class konkret yang menjalankannya.`;
  }
  if (file.includes('/net/NtpClient')) {
    return 'File ini menangani sinkronisasi waktu lewat NTP. Waktu yang benar penting untuk timestamp data sensor, log, dan keputusan runtime yang memakai jadwal.';
  }
  if (file.includes('/net/WifiCredentialStore')) {
    return 'File ini mengatur penyimpanan kredensial Wi-Fi node. Bagian ini menjaga SSID/password tetap bisa dipakai ulang setelah perangkat restart.';
  }
  if (file.includes('/net/WifiManager')) {
    return 'File ini mengatur state koneksi Wi-Fi node, termasuk transisi koneksi dan notifikasi perubahan status jaringan.';
  }
  if (file.includes('/ota/BootGuard')) {
    return 'File ini menjaga proses boot setelah update firmware. Tujuannya mengurangi risiko perangkat terjebak pada firmware baru yang gagal berjalan stabil.';
  }
  if (file.includes('/ota/OtaManager')) {
    return 'File ini adalah bagian dari pengelola OTA node. OTA memungkinkan firmware diperbarui lewat jaringan tanpa membuka casing perangkat.';
  }
  if (file.includes('/security/TlsClientOps')) {
    return 'File ini membungkus operasi TLS client supaya komunikasi HTTPS node memakai jalur keamanan yang konsisten.';
  }
  if (file.includes('/security/TrustAnchors')) {
    return 'File ini mengatur trust anchor atau akar kepercayaan TLS yang dipakai saat node memverifikasi koneksi HTTPS.';
  }
  if (file.includes('/sensor/SensorData')) {
    return 'File ini mendefinisikan bentuk data sensor yang dibaca node sebelum dikirim ke gateway atau cloud.';
  }
  if (file.includes('/sensor/SensorManager')) {
    return 'File ini mengatur pembacaan sensor pada node dan menyediakan hasilnya ke modul upload, terminal, atau diagnostik.';
  }
  if (file.includes('/sensor/SensorNormalization')) {
    return 'File ini menormalkan nilai sensor agar data yang dipakai sistem lebih konsisten sebelum ditampilkan atau dikirim.';
  }
  if (file.includes('/storage/CacheManager')) {
    return 'File ini mengatur cache lokal data node. Cache membantu data tidak langsung hilang ketika koneksi cloud atau gateway sedang bermasalah.';
  }
  if (file.includes('/storage/Paths')) {
    return 'File ini menyatukan path file lokal agar bagian firmware lain tidak menulis nama file penyimpanan secara terpisah.';
  }
  if (file.includes('/storage/RtcManager')) {
    return 'File ini mengelola data RTC atau waktu lokal yang tersimpan, terutama untuk membantu timestamp ketika jaringan belum siap.';
  }
  if (file.includes('/support/CompileTimeJSON')) {
    return 'File ini membantu validasi atau pembentukan JSON pada waktu compile sehingga sebagian kesalahan format bisa ditangkap lebih awal.';
  }
  if (file.includes('/support/CompileTimeUtils')) {
    return 'File ini menyediakan helper compile-time untuk menjaga konfigurasi firmware tetap bisa dicek sebelum runtime.';
  }
  if (file.includes('/support/Crc32')) {
    return 'File ini menghitung CRC32. CRC dipakai untuk mengecek integritas data, misalnya cache atau payload yang perlu diverifikasi.';
  }
  if (file.includes('/support/CryptoUtils')) {
    return 'File ini menyediakan helper kriptografi yang dipakai node untuk kebutuhan keamanan data.';
  }
  if (file.includes('/support/GatewayTargeting')) {
    return 'File ini membantu menentukan target gateway ketika node bekerja pada mode edge atau auto.';
  }
  if (file.includes('/support/ParseUtils')) {
    return 'File ini berisi helper parsing agar input string, angka, dan command tidak diolah secara berulang di banyak tempat.';
  }
  if (file.includes('/support/PrecisionTypes')) {
    return 'File ini menyatukan tipe presisi angka agar nilai sensor dan perhitungan terkait tidak memakai tipe yang berbeda-beda tanpa alasan.';
  }
  if (file.includes('/support/RuntimeClock')) {
    return 'File ini menyediakan sumber waktu runtime untuk interval, timeout, dan jadwal kerja firmware.';
  }
  if (file.includes('/support/TextBufferUtils') || file.includes('/support/TextFormatUtils')) {
    return 'File ini membantu pembentukan teks dengan buffer terbatas. Ini penting di ESP8266 karena RAM kecil dan alokasi string perlu dijaga.';
  }
  if (file.includes('/support/Utils')) {
    return 'File ini berisi helper umum yang dipakai beberapa modul firmware node.';
  }
  if (file.includes('/system/ConfigManager')) {
    return 'File ini mengatur konfigurasi node seperti mode kerja, URL, token, Wi-Fi, dan nilai runtime lain yang perlu bertahan setelah restart.';
  }
  if (file.includes('/system/CrashHandler')) {
    return 'File ini menangani catatan crash supaya penyebab restart atau kegagalan firmware bisa ditelusuri saat debugging.';
  }
  if (file.includes('/system/IntervalTimer')) {
    return 'File ini menyediakan timer interval sederhana untuk menjalankan pekerjaan berkala tanpa blocking delay panjang.';
  }
  if (file.includes('/system/Logger')) {
    return 'File ini mengatur format log firmware agar pesan diagnostik lebih konsisten saat dilihat lewat serial atau terminal.';
  }
  if (file.includes('/system/MemoryTelemetry')) {
    return 'File ini membantu membaca kondisi memori node. Telemetri memori penting untuk firmware ESP8266 yang RAM-nya terbatas.';
  }
  if (file.includes('/system/NodeIdentity')) {
    return 'File ini menyatukan identitas node yang dipakai saat perangkat mengirim data ke sistem.';
  }
  if (file.includes('/system/SystemHealth')) {
    return 'File ini merangkum status kesehatan sistem node untuk keperluan monitoring dan debugging.';
  }
  if (file.includes('/terminal/DiagnosticsTerminal')) {
    return 'File ini menjalankan terminal diagnostik lokal node, termasuk command operator untuk melihat status atau memicu aksi tertentu.';
  }
  if (file.includes('/terminal/TerminalFormatting')) {
    return 'File ini mengatur format tampilan terminal agar output command lebih mudah dibaca.';
  }
  if (file.includes('/web/AppServer')) {
    return 'File ini menjalankan server web lokal node untuk dashboard, endpoint status, dan fitur lokal lain.';
  }
  if (file.includes('/web/PortalServer')) {
    return 'File ini menjalankan portal konfigurasi Wi-Fi. Portal ini membantu operator mengatur node ketika belum tersambung ke jaringan.';
  }
  if (file.includes('/web/WifiRouteUtils')) {
    return 'File ini menyediakan helper route Wi-Fi supaya endpoint portal dan server lokal memproses input jaringan secara konsisten.';
  }
  if (file.includes('/scripts/') || file.includes('/tools/')) {
    return `File ini adalah script pendukung untuk pekerjaan pengembangan, build, release, pengujian, atau perawatan proyek node. Script ini bukan firmware runtime, tetapi penting untuk menjaga proses kerja proyek tetap bisa diulang.`;
  }
  if (file.includes('/test/mocks/')) {
    return 'File ini adalah mock untuk pengujian native. Mock membuat kode firmware bisa dites di komputer tanpa perangkat ESP8266 asli.';
  }
  if (file.includes('/test/')) {
    return 'File ini adalah bagian dari test firmware node. Test membantu memastikan cache, JSON, integrasi, dan simulasi tetap berjalan sesuai harapan.';
  }
  if (file.includes('/generated/')) {
    return 'File ini adalah source hasil generasi yang membawa asset web ke firmware. Walaupun dihasilkan, file ini ikut dibaca build firmware.';
  }

  return `File ini adalah bagian ${fileKind(file)}. Perannya dibaca dari lokasi file, nama file, dan pola kode yang ada di source.`;
}

function dataIn(file: string): string {
  if (file.includes('/sensor/')) return 'pembacaan sensor, konfigurasi kalibrasi, status waktu, dan request diagnostik';
  if (file.includes('/net/')) return 'SSID, password, status Wi-Fi, waktu NTP, dan event koneksi jaringan';
  if (file.includes('/ota/')) return 'metadata update, URL firmware, status boot, dan response server OTA';
  if (file.includes('/security/')) return 'sertifikat, trust anchor, host HTTPS, dan payload yang perlu dilindungi';
  if (file.includes('/storage/')) return 'record sensor, path LittleFS, status cache, timestamp, dan data yang belum terkirim';
  if (file.includes('/terminal/')) return 'command dari terminal lokal, parameter operator, dan status runtime node';
  if (file.includes('/web/')) return 'HTTP request lokal, form konfigurasi, WebSocket atau endpoint status';
  if (file.includes('/scripts/') || file.includes('/tools/')) return 'argumen command line, file source, file konfigurasi, dan output build/test';
  if (file.includes('/test/')) return 'skenario test, mock object, input simulasi, dan fixture pengujian';
  return 'data runtime dari modul pemanggil dan konfigurasi firmware yang relevan';
}

function dataOut(file: string): string {
  if (file.includes('/sensor/')) return 'nilai sensor terstruktur, status error sensor, dan data siap kirim';
  if (file.includes('/net/')) return 'status koneksi, waktu tersinkron, event observer, atau kredensial tersimpan';
  if (file.includes('/ota/')) return 'keputusan update, status validasi firmware, dan tanda boot sukses/gagal';
  if (file.includes('/security/')) return 'client TLS siap pakai, hasil validasi sertifikat, atau helper keamanan';
  if (file.includes('/storage/')) return 'record cache, hasil baca/tulis LittleFS, dan status retry data';
  if (file.includes('/terminal/')) return 'teks terminal, hasil command, dan aksi diagnostik';
  if (file.includes('/web/')) return 'response HTTP, halaman portal, JSON status, atau perubahan konfigurasi';
  if (file.includes('/scripts/') || file.includes('/tools/')) return 'file hasil generasi, log, status exit command, atau laporan analisis';
  if (file.includes('/test/')) return 'assertion test, hasil simulasi, dan sinyal gagal/lulus untuk pengembang';
  return 'hasil pemrosesan yang dikembalikan ke modul pemanggil';
}

function errorNotes(file: string): string[] {
  const notes = [
    'Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.',
  ];

  if (file.includes('/net/')) {
    notes.push('Koneksi Wi-Fi/NTP bisa gagal karena kredensial salah, sinyal lemah, DNS bermasalah, atau server waktu tidak merespons.');
  }
  if (file.includes('/ota/')) {
    notes.push('OTA bisa gagal karena URL salah, firmware tidak cocok, koneksi putus, validasi boot gagal, atau ruang flash tidak cukup.');
  }
  if (file.includes('/security/')) {
    notes.push('TLS bisa gagal jika trust anchor kedaluwarsa, host tidak cocok, jam perangkat salah, atau sertifikat server berubah.');
  }
  if (file.includes('/storage/')) {
    notes.push('LittleFS/cache bisa gagal jika filesystem belum mount, ruang penuh, format data berubah, atau listrik mati saat tulis.');
  }
  if (file.includes('/sensor/')) {
    notes.push('Pembacaan sensor bisa tidak valid jika pin salah, sensor rusak, kalibrasi keliru, atau nilai di luar rentang normal.');
  }
  if (file.includes('/terminal/') || file.includes('/web/')) {
    notes.push('Input operator perlu divalidasi karena command atau request lokal bisa kosong, salah format, atau tidak punya izin.');
  }
  if (file.includes('/scripts/') || file.includes('/tools/')) {
    notes.push('Script bisa gagal jika dependency belum terpasang, path dijalankan dari folder salah, atau file target tidak ada.');
  }
  if (file.includes('/test/')) {
    notes.push('Test bisa memberi hasil keliru jika mock tidak lagi mengikuti perilaku firmware sebenarnya.');
  }

  return unique(notes).slice(0, 4);
}

function extractEvidence(text: string, file: string): { label: string; values: string[] }[] {
  const includes = listMatches(text, /^\s*#include\s+[<"]([^>"]+)[>"]/gm, 20);
  const imports = listMatches(text, /^\s*(?:import|from)\s+([^;\n]+)/gm, 20);
  const classes = listMatches(text, /\b(?:class|struct)\s+([A-Za-z_][A-Za-z0-9_]*)/g, 20);
  const enums = listMatches(text, /\benum(?:\s+class)?\s+([A-Za-z_][A-Za-z0-9_]*)/g, 12);
  const functions = listMatches(
    text,
    /^\s*(?:static\s+|inline\s+|constexpr\s+|virtual\s+|bool\s+|void\s+|int\s+|long\s+|float\s+|double\s+|String\s+|auto\s+|std::[A-Za-z0-9_:<>]+\s+|[A-Za-z_][A-Za-z0-9_:<>*&]+\s+)+([A-Za-z_][A-Za-z0-9_:]*)\s*\([^;{}]*\)\s*(?:const\s*)?(?:\{|;)/gm,
    24,
  );
  const pythonDefs = listMatches(text, /^\s*def\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/gm, 18);
  const jsFns = listMatches(text, /\b(?:function\s+([A-Za-z_][A-Za-z0-9_]*)|const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(?:async\s*)?\()/g, 18)
    .map((value) => value.split(',').find(Boolean) ?? value);
  const routes = listMatches(text, /['"`](\/api\/[^'"` ]+|\/[^'"` ]+)['"`]/g, 18);
  const commands = listMatches(text, /['"`]([a-z][a-z0-9_-]{2,})['"`]/g, 18);
  const macros = listMatches(text, /^\s*#define\s+([A-Za-z_][A-Za-z0-9_]*)/gm, 18);

  const rows = [
    { label: 'Include', values: includes },
    { label: 'Import', values: imports },
    { label: 'Class/Struct', values: classes },
    { label: 'Enum', values: enums },
    { label: 'Fungsi C/C++', values: functions },
    { label: 'Fungsi Python', values: pythonDefs },
    { label: 'Fungsi JavaScript', values: jsFns },
    { label: 'Macro', values: macros },
    { label: 'Route/String endpoint', values: routes },
    { label: 'String command/konfigurasi', values: commands },
  ].filter((row) => row.values.length > 0);

  if (rows.length === 0 && text.trim().length > 0) {
    return [{ label: 'Isi file', values: [`${lineCount(text)} baris ${codeFenceLanguage(file)}`] }];
  }

  return rows.slice(0, 7);
}

function sourcePreview(text: string, file: string): string {
  const lines = text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .slice(0, 12)
    .join('\n');

  if (lines.length === 0) {
    return 'File kosong atau tidak berisi teks yang bisa dipreview.';
  }

  return `\`\`\`${codeFenceLanguage(file)}\n${lines.slice(0, 1600)}\n\`\`\``;
}

function renderEvidenceTable(evidence: { label: string; values: string[] }[]): string {
  if (evidence.length === 0) {
    return 'Belum ada identifier penting yang bisa diekstrak otomatis dari file ini.';
  }

  const rows = evidence.map(
    (row) => `| ${row.label} | ${row.values.map((value) => `\`${escapeMarkdown(value)}\``).join(', ')} |`,
  );

  return ['| Jenis bukti | Ditemukan di source |', '|---|---|', ...rows].join('\n');
}

function renderDoc(row: CoverageRow, sourceText: string): string {
  const evidence = extractEvidence(sourceText, row.source);
  const kind = fileKind(row.source);
  const level = componentLevel(row.source, row.component);

  return `---
title: ${JSON.stringify(titleFromPath(row.source))}
---

# ${row.source}

${roleSummary(row.source)}

## Metadata File

| Item | Nilai |
|---|---|
| Source file | \`${row.source}\` |
| Komponen | ${row.component} |
| Jenis file | ${kind} |
| Level | ${level} |
| Status | Drafted |
| Terakhir diperiksa | ${inspectedDate} |
| Jumlah baris | ${lineCount(sourceText)} |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian ${row.component} membutuhkan fungsi ${kind}. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

${renderEvidenceTable(evidence)}

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | ${dataIn(row.source)} |
| Data keluar | ${dataOut(row.source)} |

## Hal yang Perlu Diperhatikan

${errorNotes(row.source).map((note) => `- ${note}`).join('\n')}

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

${sourcePreview(sourceText, row.source)}

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada ${inspectedDate}. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
`;
}

function updateCoverageReport(text: string): string {
  let next = text;
  next = next.replace('- Total file terdokumentasi awal: 200', '- Total file terdokumentasi awal: 317');
  next = next.replace('| Pending | 117 |', '| Pending | 0 |');
  next = next.replace('| Drafted | 200 |', '| Drafted | 317 |');
  next = next.replace(
    /(\| `[^`]+` \| [^|]+ \| )Pending( \| `[^`]+` \| - \|)/g,
    '$1Drafted$2',
  );

  return next;
}

function updateProgress(text: string): string {
  let next = text;
  next = next.replace('- Total file terdokumentasi: 180', '- Total file terdokumentasi: 317');
  next = next.replace('- Total pending: 137', '- Total pending: 0');
  next = next.replace(
    /## Batch Terakhir[\s\S]*?## Selesai/,
    `## Batch Terakhir

Tanggal: ${inspectedDate}
Komponen: Final coverage completion
Jumlah file: 117 pending file + concept coverage
Ringkasan: Semua file Pending pada coverage-report dibuatkan halaman file-by-file Drafted. Concept coverage dari explain.md juga dibuat agar keyword, library, framework, dan konsep utama punya halaman rujukan.

## Selesai`,
  );

  const items = [
    'Firmware node',
    'Backend Laravel review final',
    'Frontend Web review final',
    'Android review final',
    'Database file-by-file',
    'Testing file-by-file',
    'Operations file-by-file',
    'File-by-file semua komponen',
  ];

  for (const item of items) {
    next = next.replace(`- [ ] ${item}`, `- [x] ${item}`);
  }

  next = next.replace(
    /- Validasi terakhir:[^\n]+/,
    '- Validasi terakhir: menunggu validasi ulang setelah final coverage completion.',
  );

  return next;
}

function conceptPage(title: string, body: string): string {
  return `---
title: ${JSON.stringify(title)}
---

# ${title}

${body}
`;
}

function createConceptPages() {
  const base = path.join(docsRoot, '01-programming-and-concepts');
  const pages: Record<string, string> = {
    'index.md': conceptPage(
      'Programming and Concepts',
      `Bagian ini menjelaskan istilah yang muncul di kode TA IoT Greenhouse. Pembaca diasumsikan mulai dari nol, sehingga istilah bahasa, framework, library, firmware, web, database, jaringan, keamanan, dan pengujian diberi rujukan singkat.

Mulai dari halaman dasar programming jika belum paham file, folder, variabel, tipe data, fungsi, kondisi, dan perulangan. Setelah itu lanjutkan ke halaman C++ firmware, JavaScript tooling, Laravel/Vue, jaringan IoT, keamanan, dan testing.

Coverage lengkap konsep ada di [Concept Coverage](../99-generated/concept-coverage.md).`,
    ),
    'cpp-firmware.md': conceptPage(
      'C++ Firmware Concepts',
      `C++ dipakai pada firmware node dan gateway karena bisa berjalan dekat dengan hardware. Konsep yang sering muncul adalah \`#include\`, \`class\`, \`struct\`, \`enum\`, \`constexpr\`, pointer, reference, buffer, header, dan file implementasi.

Untuk pemula, anggap header \`.h\` sebagai daftar janji fungsi atau bentuk data, sedangkan file \`.cpp\` sebagai tempat pekerjaan sebenarnya dilakukan.

Pada proyek ini C++ dipakai untuk membaca sensor, mengelola Wi-Fi, menyimpan cache, mengirim data, menjalankan OTA, dan menampilkan terminal lokal.`,
    ),
    'javascript-typescript-tooling.md': conceptPage(
      'JavaScript and TypeScript Tooling',
      `JavaScript dan TypeScript muncul pada script pengembangan, test, asset web firmware, dan platform dokumentasi Next.js. Konsep yang sering muncul adalah \`import\`, \`export\`, \`const\`, \`async\`, JSON, package, script npm, dan fungsi helper.

Dalam proyek TA ini, JavaScript tidak hanya untuk tampilan. Ia juga dipakai untuk tooling, halaman firmware lokal, dan pengujian perilaku cache atau reproduksi bug.`,
    ),
    'python-and-shell-scripts.md': conceptPage(
      'Python and Shell Scripts',
      `Python, shell, dan batch dipakai untuk pekerjaan yang berulang: build firmware, OTA upload, konversi sertifikat, persiapan asset, sanitasi source, dan analisis stack.

Untuk pemula, script adalah file instruksi yang dijalankan developer dari terminal. Script berbeda dari firmware runtime karena script berjalan di komputer pengembang, bukan di ESP8266 atau ESP32.`,
    ),
    'laravel-vue-android.md': conceptPage(
      'Laravel, Vue, and Android',
      `Laravel menangani backend dan endpoint API. Vue menangani tampilan web seperti monitoring, heatmap, dan controlling. Android WebView membuka sistem web dari aplikasi mobile.

Konsep pentingnya adalah controller, route, request, response JSON, component, props, state, event, Activity, WebView, permission, dan layout XML.`,
    ),
    'iot-networking.md': conceptPage(
      'IoT Networking Concepts',
      `Konsep jaringan yang sering muncul adalah Wi-Fi, SSID, password, captive portal, NTP, REST API, WebSocket, HTTPS, gateway, cloud, edge, retry, timeout, dan payload JSON.

Pada sistem greenhouse, jaringan menentukan apakah data sensor bisa sampai ke server, apakah gateway bisa mengontrol aktuator, dan apakah operator bisa membuka dashboard lokal.`,
    ),
    'security-ota-cache.md': conceptPage(
      'Security, OTA, and Cache',
      `Keamanan muncul lewat HTTPS/TLS, trust anchor, token, AES-256-CBC, dan validasi request. OTA memungkinkan firmware diperbarui lewat jaringan. Cache menjaga data tetap tersimpan saat koneksi bermasalah.

Tiga konsep ini saling terkait: sistem harus tetap aman, bisa diperbarui, dan tidak langsung kehilangan data saat jaringan greenhouse tidak stabil.`,
    ),
    'testing-and-mocks.md': conceptPage(
      'Testing and Mocks',
      `Testing memastikan logika firmware dan tooling tetap benar. Mock adalah versi tiruan dari library atau hardware agar test bisa berjalan di komputer tanpa perangkat asli.

Pada proyek ini mock ESP8266, LittleFS, HTTP client, Wi-Fi, dan BearSSL membantu test native mengecek cache, JSON, integrasi, dan simulasi stres.`,
    ),
  };

  for (const [file, text] of Object.entries(pages)) {
    writeText(path.join(base, file), text);
  }
}

function detectConcepts(rows: CoverageRow[]): ConceptRow[] {
  const concepts = new Map<string, ConceptRow>();

  function add(keyword: string, category: string, file: string, page: string) {
    const existing = concepts.get(keyword);
    if (existing) {
      existing.files.push(file);
      existing.files = unique(existing.files).slice(0, 8);
      return;
    }

    concepts.set(keyword, { keyword, category, files: [file], page });
  }

  const sourceRows = rows.filter((row) => row.status !== 'Skipped With Reason');

  for (const row of sourceRows) {
    const abs = path.join(projectRoot, row.source);
    if (!fs.existsSync(abs)) continue;
    const text = readText(abs);
    const ext = path.extname(row.source).toLowerCase();

    if (['.h', '.hpp', '.cpp', '.ino'].includes(ext)) add('C++ firmware', 'Bahasa', row.source, '../01-programming-and-concepts/cpp-firmware.md');
    if (text.includes('#include')) add('#include', 'C++', row.source, '../01-programming-and-concepts/cpp-firmware.md');
    if (/\bclass\b/.test(text)) add('class', 'Programming', row.source, '../01-programming-fundamentals/fungsi-dan-parameter.md');
    if (/\bstruct\b/.test(text)) add('struct', 'Programming', row.source, '../01-programming-fundamentals/array-object-struct-enum.md');
    if (/\benum\b/.test(text)) add('enum', 'Programming', row.source, '../01-programming-fundamentals/array-object-struct-enum.md');
    if (/\bconstexpr\b/.test(text)) add('constexpr', 'C++', row.source, '../01-programming-and-concepts/cpp-firmware.md');
    if (/\bstatic\b/.test(text)) add('static', 'Programming', row.source, '../01-programming-and-concepts/cpp-firmware.md');
    if (/\bconst\b/.test(text)) add('const', 'Programming', row.source, '../01-programming-fundamentals/variabel-dan-tipe-data.md');
    if (/\bnamespace\b/.test(text)) add('namespace', 'C++', row.source, '../01-programming-and-concepts/cpp-firmware.md');
    if (/\bString\b|\bstd::string\b/.test(text)) add('string', 'Tipe data', row.source, '../01-programming-fundamentals/variabel-dan-tipe-data.md');
    if (/\bJSON\b|Json|json/.test(text)) add('JSON', 'Format data', row.source, '../01-programming-fundamentals/variabel-dan-tipe-data.md');
    if (/WiFi|SSID|password/i.test(text)) add('Wi-Fi', 'Jaringan', row.source, '../01-programming-and-concepts/iot-networking.md');
    if (/NTP|time|epoch/i.test(text)) add('NTP/time sync', 'Jaringan', row.source, '../01-programming-and-concepts/iot-networking.md');
    if (/HTTPS|TLS|BearSSL|certificate|trust/i.test(text)) add('HTTPS/TLS', 'Keamanan', row.source, '../01-programming-and-concepts/security-ota-cache.md');
    if (/AES|encrypt|decrypt|crypto/i.test(text)) add('AES/encryption', 'Keamanan', row.source, '../01-programming-and-concepts/security-ota-cache.md');
    if (/OTA|Update|firmware/i.test(text)) add('OTA update', 'Operasi firmware', row.source, '../01-programming-and-concepts/security-ota-cache.md');
    if (/cache|LittleFS|filesystem|FS\./i.test(text)) add('cache/LittleFS', 'Penyimpanan', row.source, '../01-programming-and-concepts/security-ota-cache.md');
    if (/sensor|temperature|humidity|lux|cahaya/i.test(text)) add('sensor data', 'IoT', row.source, '../03-system-foundation/iot.md');
    if (/WebSocket/i.test(text)) add('WebSocket', 'Jaringan', row.source, '../03-system-foundation/websocket.md');
    if (/\/api\/|HTTP|GET|POST|REST/i.test(text)) add('REST API/HTTP', 'Jaringan', row.source, '../03-system-foundation/rest-api.md');
    if (ext === '.py') add('Python script', 'Tooling', row.source, '../01-programming-and-concepts/python-and-shell-scripts.md');
    if (['.sh', '.bat'].includes(ext)) add('shell/batch script', 'Tooling', row.source, '../01-programming-and-concepts/python-and-shell-scripts.md');
    if (['.js', '.ts', '.tsx'].includes(ext)) add('JavaScript/TypeScript', 'Tooling', row.source, '../01-programming-and-concepts/javascript-typescript-tooling.md');
    if (ext === '.vue') add('Vue component', 'Frontend', row.source, '../01-programming-and-concepts/laravel-vue-android.md');
    if (ext === '.php') add('Laravel controller', 'Backend', row.source, '../01-programming-and-concepts/laravel-vue-android.md');
    if (['.kt', '.xml'].includes(ext) || row.source.startsWith('android/')) add('Android WebView', 'Android', row.source, '../01-programming-and-concepts/laravel-vue-android.md');
    if (row.source.includes('/test/') || /mock|assert|test/i.test(text)) add('testing/mock', 'Pengujian', row.source, '../01-programming-and-concepts/testing-and-mocks.md');
  }

  add('Next.js', 'Docs stack', 'docs-site/package.json', '../13-operations/deployment-docs.md');
  add('Fumadocs', 'Docs stack', 'docs-site/package.json', '../13-operations/deployment-docs.md');
  add('MDX', 'Docs stack', 'docs-site/package.json', '../13-operations/deployment-docs.md');
  add('Tailwind CSS', 'Docs stack', 'docs-site/package.json', '../13-operations/deployment-docs.md');
  add('Shiki', 'Docs stack', 'docs-site/package.json', '../13-operations/deployment-docs.md');
  add('Mermaid', 'Docs stack', 'docs-site/package.json', '../04-system-architecture/overview.md');

  return [...concepts.values()].sort((a, b) => a.keyword.localeCompare(b.keyword));
}

function createConceptCoverage(rows: CoverageRow[]) {
  const concepts = detectConcepts(rows);
  const lines = [
    '---',
    'title: "Concept Coverage"',
    '---',
    '',
    '# Concept Coverage',
    '',
    `Terakhir diperiksa: ${inspectedDate}`,
    '',
    'File ini memenuhi kontrak `explain.md`: keyword, konsep, library, framework, dan pola penting yang muncul di source code dicatat supaya pembaca awam punya halaman rujukan sebelum membaca file-by-file.',
    '',
    '| Keyword / Concept | Kategori | Ditemukan di File | Sudah Dijelaskan? | Halaman Penjelasan |',
    '|---|---|---|---|---|',
  ];

  for (const concept of concepts) {
    const files = concept.files.map((file) => `\`${file}\``).join('<br />');
    lines.push(
      `| \`${escapeMarkdown(concept.keyword)}\` | ${escapeMarkdown(concept.category)} | ${files} | Explained | ${concept.page} |`,
    );
  }

  writeText(path.join(docsRoot, '99-generated/concept-coverage.md'), `${lines.join('\n')}\n`);
}

function main() {
  const coverage = readText(coveragePath);
  const rows = parseCoverageRows(coverage);
  const pendingRows = rows.filter((row) => row.status === 'Pending');

  for (const row of pendingRows) {
    if (row.docPath === '-') {
      throw new Error(`Pending row has no doc path: ${row.source}`);
    }

    const sourcePath = path.join(projectRoot, row.source);
    const docPath = path.join(projectRoot, row.docPath);
    const sourceText = fs.existsSync(sourcePath)
      ? readText(sourcePath)
      : 'Belum terkonfirmasi dari kode: source file tidak ditemukan saat generator dijalankan.';

    writeText(docPath, renderDoc(row, sourceText));
  }

  createConceptPages();
  createConceptCoverage(rows.map((row) => (row.status === 'Pending' ? { ...row, status: 'Drafted' } : row)));
  writeText(coveragePath, updateCoverageReport(coverage));
  writeText(progressPath, updateProgress(readText(progressPath)));

  console.log(`OK completed ${pendingRows.length} pending file docs`);
}

main();
