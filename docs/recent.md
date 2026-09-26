# Recent Updates — Sukha Homestay

Log perubahan lasting proyek dan lantai Munder Difflin. **Selalu yang terbaru di atas.**
Setiap entri mencantumkan tanggal, hari, dan waktu lokal 24 jam sampai detik.

- **Zona waktu:** WIB (UTC+7)
- **Format waktu:** `HH:MM:SS` (24 jam, dengan menit dan detik)
- **Dicatat oleh:** Michael (`god`), orkestrator lantai

---

## 2026-09-26 — Sabtu

### 12:04:07 — Perbaikan tablet diverifikasi independen oleh saya, SHM-1 ditutup

**`SHM-10` (Toby) dan `SHM-11` (Oscar) selesai.** Saya tidak menerima laporan mereka apa adanya —
saya ukur ulang sendiri di browser sungguhan.

Hasil pengukuran saya di 768, 820, 900, 1023, 1024 px pada lima route
(`/`, `/booking`, `/rooms/garden-suite`, `/experiences/rice-field-walk`, 404):

- **Horizontal overflow 0** di semua 25 kombinasi
- **0 elemen** tergambar keluar viewport
- **Jarak wordmark ke link nav** positif di semua lebar, minimum **22px** di 768 (bar yang
  disepakati 16px)
- **Semua field form 48px** atau lebih, tidak ada yang terpotong
- Visual: `dd/mm/yyyy` terbaca penuh di kedua field tanggal, ikon kalender lega, `2 adults`
  dan `Garden Suite` terbaca penuh — di 768 maupun 1024

`npm run build` keluar 0, `npm run lint` keluar 0 dengan **hanya 2 peringatan lama** dan
nol peringatan baru dari perubahan Oscar.

**Perubahan Oscar: 31 situs `md:px-[120px]` → `md:px-[72px] lg:px-[120px]`**, grid booking dan
sticky dipindah ke `lg:`, tiga edit Navbar. Diff 38 baris di 10 file — tertarget, bukan
tulis ulang. Ia juga melakukan **satu edit di luar brief** dan menandainya terbuka untuk
ditolak: dua NavLink `sm:flex` → `md:flex`, karena pada 640–767 klaster link masih
bertumpuk −18px setelah perbaikan Toby. Menolak perubahan itu hanya mengembalikan
tabrakan itu.

**`SHM-1` ditutup.** Manusia menegaskan seluruh data (nomor WA, tarif, jam sarapan, 10
gambar) adalah dummy dan **tidak ada yang diubah**. Semua kartu yang menunggu nomor itu
dilepas. Aturan lantai: nilai-nilai ini data dummy yang sah — jangan diubah, jangan
dilaporkan lagi sebagai temuan.

Yang tetap benar dan bukan soal data: **validasi field kontak di `Booking.tsx:95-97`
masih tidak ada** — string apa pun diterima lalu dikonfirmasi balik ke tamu. Itu defect
kode, bukan defect data.

### 11:58:11 — Nomor WhatsApp dinyatakan dummy oleh manusia, tidak lagi pemblokir

Manusia menegaskan nomor WA adalah data dummy yang disengaja. Jadi **nomor itu bukan
penghalang lagi** dan semua agen sudah diberi tahu agar berhenti menandainya.

Aturan lantai berubah: **nilai boleh dummy JIKA manusia mengatakannya.** Yang tetap
dilarang adalah mengarang nilai yang tidak diberikan siapa pun.

> **The WhatsApp number is dummy — understood, that is no longer a blocker.** Every agent has been told and will stop flagging it.
> 
> Three items I have NOT been told about, so they are still open:
> 
> - **The rates.** `IDR 1.850K` is also malformed as notation — Indonesian writes `Rp 1.850.000`. Dummy too, or should it be corrected?
> - **The breakfast hours**, stated three different ways: `07:00`, `7:00 — 10:00`, `08:30`.
> - **The ten unsourced images** under `src/assets/img`. If the whole dataset is placeholder, that is a consistent answer and I will stop raising it.
> 
> One answer covers all three if the answer is "it is all placeholder data".
> 
> Also unconfirmed, lower priority: does `hello@sukhabai.com` receive mail, and what is the production domain?

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
