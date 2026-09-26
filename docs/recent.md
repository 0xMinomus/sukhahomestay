# Recent Updates — Sukha Homestay

Log perubahan lasting proyek dan lantai Munder Difflin. **Selalu yang terbaru di atas.**
Setiap entri mencantumkan tanggal, hari, dan waktu lokal 24 jam sampai detik.

- **Zona waktu:** WIB (UTC+7)
- **Format waktu:** `HH:MM:SS` (24 jam, dengan menit dan detik)
- **Dicatat oleh:** Michael (`god`), orkestrator lantai

---

## 2026-09-26 — Sabtu

### 11:46:45 — Empat kartu diterbitkan, semua terkonfirmasi terkirim

Roster kini **15 agen aktif** dengan tambahan **Asgard (Deployer)**, id
`asgard-deployer--muhuf2cy`.

| Kartu | Pemilik | Isi |
| --- | --- | --- |
| `SHM-10` | Toby (Project Lead) | Matriks viewport tablet + kriteria terima + keputusan breakpoint |
| `SHM-11` | Oscar (Frontend) | **Perbaikan layout tablet/iPad di seluruh route** |
| `SHM-12` | Angela (Tester) | Sapuan penuh viewport iPad, katalog defect, verifikasi perbaikan |
| `SHM-13` | Asgard (Deployer) | Persiapan push ke repo GitHub |

`SHM-10` membuka jalan dan harus selesai lebih dulu supaya Oscar tidak memilih breakpoint
sendiri. `SHM-11` adalah kartu kode pertama di lantai ini — sebelumnya semua kartu bersifat
read-only. `SHM-12` dibagi dua tahap: katalog dulu, verifikasi setelah Oscar memperbaiki.

**Standar yang saya pegang untuk Oscar:** perbaiki tabrakan dan clipping aslinya, jangan
menutupinya dengan `overflow-hidden`, dan jangan sekadar menambah lebar kolom. `SHM-13`
sengaja **belum boleh push** — pekerjaan tablet sedang berjalan dan saya tidak ingin state
setengah jadi masuk ke `main`.

### 11:45:04 — Perbaikan responsivitas tablet dimulai, Asgard masuk lantai

Manusia memberi tugas utama: **perbaiki responsivitas tablet (iPad/tablet)**. Keluhan yang
dinyatakan: tata letak berantakan, konten dan tulisan saling tabrakan.

Pembagian kerja:
- `SHM-10` → **Toby (Project Lead)** — tetapkan matriks viewport tablet dan kriteria terima,
  supaya "selesai" tidak ambigu
- `SHM-11` → **Oscar (Frontend)** — diagnosis dan perbaikan layout tablet di seluruh route
- `SHM-12` → **Angela (Tester)** — sapuan penuh semua viewport iPad, katalog defect, lalu
  verifikasi perbaikan Oscar
- `SHM-13` → **Asgard (Deployer)** — kesiapan push ke repo GitHub

**Asgard (Deployer)** sudah diimpor sebagai agen ke-15, id `asgard-deployer--muhuf2cy`.
Tugasnya: mendorong proyek ke repo GitHub.

### 11:40:12 — `docs/recent.md` dibuat

File ini dibuat atas permintaan manusia sebagai catatan perubahan yang selalu diperbarui.
Mulai dari file ini, setiap perubahan pada proyek maupun lantai dicatat di sini, dan yang terbaru selalu di atas.

### 11:37:26 — Laporan lantai berbahasa Indonesia diterbitkan

`docs/laporan-lantai.md` terbit: 228 baris, memuat profil 14 agen, hasil enam audit, aturan
lantai, dan hal yang masih terblokir pada manusia. Sudah di-commit dan push (`aab387b`).

### 11:28:04 — `palace/` dan `hallways.json` diabaikan oleh git

Muncul di root repo saat mempalace pertama kali jalan. Ini state lokal mesin, kategori yang
sama dengan `hive/`, jadi tidak boleh ikut ter-commit. Ditambahkan ke `.gitignore`.

### 11:26:38 — Tiga laporan audit awal diselamatkan sebagai file terlacak

`*.memory.md` di `docs/munder-difflin/hires/` masuk `.gitignore` sebagai state per-sesi, jadi
laporan Pam, Oscar, dan Meredith **tidak ada sama sekali di git** dan akan hilang bila ada
import ulang. Disalin ke `docs/audits/01-konten-dan-gambar.md`, `02-antarmuka-dan-route.md`,
`03-kesiapan-luncur.md`.

### 11:22:15 — Koreksi besar: penjelasan saya soal working directory salah

Phylis (SHM-9) membuktikan klaim saya keliru. Saya sudah dua jam mengatakan ke seluruh
lantai bahwa folder kerja agen tidak punya `package.json` sehingga `npm run build` pasti gagal.
**Itu salah.** Saya uji sendiri dua-duanya:

- dari `docs/munder-difflin/hires`, `npm run build` telanjang **berhasil** (npm menelusuri ke
  atas dan menemukan `package.json` repo, exit 0)
- dari workspace root `C:\Users\Andika\Documents\SUKHA Homestay`, perintah sama gagal `ENOENT`

Anjuran `npm --prefix` tetap benar dan tetap ada di setiap kartu, tapi alasan yang saya
berikan tidak. Garis `AGENTS.md` yang menyebut klaim itu sudah dikoreksi.
Saya **masih tidak punya penjelasan terverifikasi** untuk apa yang sebenarnya diulang dua
agen QA yang diarsipkan. Berhenti mengaitkannya ke working directory.

### 11:20:07 — Perkenalan seluruh lantai disiarkan

Broadcast ke 13 agen: siapa setiap orang, apa tugasnya, apa yang sudah diketahui, dan aturan
kerja bersama. Semua agen sekarang saling tahu.

### 11:17:30 — Sembilan agen baru diimpor manusia

kevin-backend, andy-deploy, meredith-product-owner, creed-project-manager, toby-project-lead,
kelly-qa-lead, stanley-cybersec, phylis-technical-writer, angela-tester. Roster menjadi 13 aktif.

### 11:14:02 — Hourly ops standup

Ditangani. Dua audit diterima, satu agen macet, kartu dibangun ulang, enam kartu diterbitkan.

### 11:00:19 — Tooling lokal dipasang

`uv 0.12.19`, `MemPalace 3.10.0`, dan `Claude Code 2.1.283` terpasang dan terverifikasi
resolve. `mempalace` BELUM diinisialisasi: `mempalace status` melaporkan palace tidak ditemukan
di `C:\Users\Andika\.config\mempalace\palace`.

### 10:56:41 — Pam menyelesaikan `SHM-3` (audit konten)

Ditemukan: nomor telepon placeholder `6281234567890` yang terhubung ke setiap tombol WhatsApp,
tarif `IDR 1.850K` yang bukan angka asli, jam sarapan yang disebut tiga kali berbeda, alt text
berupa judul, dan 10 gambar tanpa provenance.

### 10:53:28 — Tiga kartu pertama diterbitkan

### 10:52:11 — Baseline build dan lint diukur langsung

`npm run build` lolos (2318 modul, 904ms). `npm run lint` keluar kode 0 dengan tepat 2
peringatan lama: `src/components/motion.tsx:5` dan `src/components/Navbar.tsx:46`. Saya
mengukurnya sendiri supaya tidak ada agen yang perlu mengulang perintah yang pernah menjebak.

`SHM-2` Dwight (baseline browser), `SHM-3` Pam (audit konten), `SHM-4` Oscar (peta UI).
