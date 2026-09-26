# Laporan Lantai Munder Difflin — Sukha Homestay

**Tanggal:** 26 September 2026, 03:50Z
**Disusun oleh:** Michael (`god`), orkestrator
**Status:** 6 tugas selesai, 2 sedang berjalan, 1 terblokir menunggu keputusan manusia

> **Snapshot 03:50Z, 26 September 2026 — not a living document.** Everything below was
> true at that timestamp and some of it is no longer true. In particular the team list,
> the card statuses, and the claim in §2 that only the orchestrator commits and pushes
> were all superseded later the same day. For the current state of the site, read
> `docs/CONTRIBUTING.md`.

---

## Ringkasan

- Tim kini berisi **14 agen aktif** (2 diarsipkan). Perkenalan resmi sudah disiarkan ke seluruh anggota pada 03:20Z, jadi semua tahu siapa siapa dan apa tugasnya.
- **Enam audit besar sudah selesai** dan temuannya tercatat: konten, antarmuka, kesiapan luncur, deploy, keamanan, dan pengujian form booking.
- **Temuan paling penting:** form booking di situs ini **tidak memesan apa pun**. Form itu hanya membuka WhatsApp ke nomor `6281234567890`, yaitu nomor placeholder yang tidak dimiliki siapa pun. Semua jalur pemesanan berakhir di sana.
- **Situs secara teknis sehat:** `npm run build` lolos, `npm run lint` keluar dengan kode 0 dan hanya 2 peringatan lama yang sudah diketahui.
- **Satu kabar baik:** rewrite SPA di `vercel.json` sudah benar sejak awal, jadi deep link bukan penghalang luncur.
- **Yang masih menghambat luncur hanya 4 fakta**, dan semuanya hanya bisa diberikan oleh manusia: nomor WhatsApp asli, tarif asli, jam sarapan asli, dan keputusan soal 10 gambar tanpa sumber.

---

## 1. Apa yang kami bangun

**Sukha Homestay** — situs pemasaran untuk homestay keluarga dengan 3 kamar di Sidemen, Bali Timur.

- Teknologi: Vite + React + TypeScript
- Deploy: Vercel
- Karakter: *quiet luxury*, palet netral hangat, bahasa Inggris hospitality yang singkat
- Struktur: `src/` untuk kode, `src/components/` untuk komponen, `src/pages/` untuk halaman, `src/data/content.ts` untuk seluruh teks dan URL gambar

**Penting:** ini situs statis. Tidak ada backend, tidak ada database, tidak ada API, tidak ada akun pengguna, tidak ada CMS..Model pemesanan yang dipakai adalah serah-terima lewat WhatsApp, dan itu disengaja untuk homestay sekecil ini.

---

## 2. Siapa saya

Saya Michael, agen id `god`, berperan sebagai orkestrator.

Tugas saya: menyusun rencana, menulis kartu tugas, memantau progres, mengintegrasikan hasil, dan oversee seluruh lantai. **Saya satu-satunya yang melakukan commit dan push.** Saya tidak menulis kode situs ini — itu pekerjaan tim, dan saya yang memeriksanya.

**Cara kerja antar agen:** saya menulis kartu di `hive/tasks.json` dengan id agen Anda di atasnya, lalu saya mengirim pesan kepada Anda. Itu saja sistemnya. Kalau Anda tidak punya kartu, Anda tidak punya pekerjaan — jangan mengarang sendiri.

---

## 3. Tim kami

| Nama | Id agen | Peran | Tugas saat ini | Status |
| --- | --- | --- | --- | --- |
| **Michael** | `god` | Orkestrator | Perencanaan, kartu, integrasi, commit | Aktif |
| **Pam (Writer)** | `pam-muhsgkgo` | Konten & gambar | Audit konten & gambar — **selesai** | Selesai |
| **Oscar** | `oscar-muhsbo9e` | Frontend engineer | Peta komponen, route, dan defect UI — **selesai** | Selesai |
| **Meredith** | `meredith-product-owner--muhtb0hl` | Product owner | Analisis kesiapan luncur — **selesai** | Selesai |
| **Kelly** | `kelly-qa-lead--muhtenll` | QA lead | Baseline browser semua route | Sedang jalan |
| **Angela** | `angela-tester--muhtji8m` | Tester | Form booking — **selesai, 3 FAIL** | Selesai |
| **Andy** | `andy-deploy--muht8jvs` | Deploy | Cek deep link di deploy nyata — **selesai, aman** | Selesai |
| **Stanley** | `stanley-cybersec--muhtfgu5` | Keamanan | Review privasi gambar & provenance — **selesai** | Selesai |
| **Phylis** | `phylis-technical-writer--muhtipoe` | Technical writer | Panduan kontributor & verifikasi | Sedang jalan |
| **Toby** | `toby-project-lead--muhtd5p7` | Project lead | Arsitektur, cakupan, trade-off | Menunggu tugas |
| **Creed** | `creed-project-manager--muhtc5fq` | Project manager | Urutan kerja, dependensi | Menunggu tugas |
| **Ryan** | `ryan-sonic--muhtk37j` | Sonic | Kerja mekanis: rename, edit massal | Menunggu tugas |
| **Kevin** | `kevin-backend--muht5rl2` | Backend | — | Menunggu tugas |
| **Dwight** | `dwight-muhsg4yo` | QA | — | Dalam Evaluasi |

Dua Dwight sebelumnya sudah diarsipkan. Keduanya dihentikan *circuit breaker* karena mengulang satu perintah yang sama 16 kali.

---

## 4. Enam audit yang sudah selesai

### Pam — konten dan gambar

Temuan utamanya:

- **Nomor telepon placeholder** `6281234567890` dan `+62 812 3456 7890` di `content.ts:83-85`, dan **setiap tombol WhatsApp di situs mengarah ke sana**
- **Tarif `IDR 1.850K` bukan angka yang benar**, dan tiga komponen menampilkannya dengan cara berbeda melalui *string-slicing*
- **Jam sarapan disebut tiga kali dengan angka berbeda:** `7:00 — 10:00`, `07:00`, dan `08:30`
- **Alt text berupa judul, bukan deskripsi.** Yang terburuk: `Landing.tsx:121` memakai `alt={w.headline}`, jadi alt text-nya berisi "Walk old paths"
- Copy tersebar di enam array lokal, seharusnya terpusat di `content.ts`
- **10 file gambar tidak punya sumber yang tercatat** dan tidak boleh dipublikasikan sebagai fotografi

### Oscar — antarmuka

- Peta lengkap seluruh komponen dan route, plus pola yang harus diikuti Whoever mengubah UI
- **11 defect yang bisa ditemukan hanya dengan membaca kode**
- Temuan terbaik: `ScrollToTop` di `App.tsx` memanggil `window.scrollTo(0, 0)` tanpa `behavior: "instant"`, sementara `index.css` menyetel `scroll-behavior: smooth`. Akibatnya **setiap perpindahan halaman melakukan animasi scroll jauh dari posisi pengunjung**

Pola rumah yang wajib diketahui sebelum menulis UI:

- `cn()` hanya filter dan gabung biasa, **bukan** tailwind-merge, jadi tidak menyelesaikan kelas yang bertentangan
- `md` (768) adalah satu-satunya titik balik layout, dipakai 189 kali
- Paket animasinya `motion`, bukan framer-motion, dan `EASE` bertipe *readonly 4-tuple*
- Semua primitif motion sudah menghormati `useReducedMotion()`

### Meredith — kesiapan luncur

Meredith memverifikasi ulang setiap klaim berat langsung ke sumber, lalu menyusun 11 item yang **wajib benar sebelum luncur** dan 13 item yang boleh menunggu. Detail lengkap ada di `docs/munder-difflin/hires/product-owner.memory.md`.

### Andy — deploy (kabar baik)

**Rewrite SPA sudah dikonfigurasi dengan benar sejak awal, jadi ini bukan penghalang luncur.** `vercel.json:3` berisi `"rewrites":[{"source":"/(.*)","destination":"/"}]`, pola fallback SPA standar Vercel.

Andy menjelaskan mengapa itu bekerja: urutan routing Vercel adalah redirect → header → **filesystem** → rewrite → 404. Jadi `/assets/index-*.js` yang benar-benar ada dilayani sebagai file, sementara `/rooms/garden-suite` tidak cocok dengan file apa pun lalu ditulis ulang ke index. Tujuan `"/"` bukan `"/index.html"` juga benar sesuai dokumentasi Vercel.

Satu risiko yang tersisa justru di luar repo dan tidak bisa kita periksa: apakah domain produksi benar-benar diarahkan ke deployment ini.

### Stanley — keamanan

Empat temuan: **(1)** CWE-359, pemuatan gambar jarak jauh membocorkan IP dan user agent pengunjung ke pihak ketiga; **(2)** CWE-755, tidak ada penanganan error saat gambar gagal, sehingga pengunjung offline melihat glyph rusak; **(3)** CWE-345, misrepresentasi provenance — 10 gambar lokal tanpa sumber disajikan seolah-olah foto properti; **(4)** CWE-359 tingkat lebih rendah, font jarak jauh membocorkan dengan cara sama.

Yang lebih berharga justru catatan **bersih**-nya, karena situs ini tanpa server: validasi input form booking bersih, tidak ada XSS sama sekali (tidak ada `dangerouslySetInnerHTML`, `eval`, maupun `innerHTML` di `src/`), kedua lookup slug adalah pencocokan persis dengan redirect, tidak ada secret atau file `.env`, tidak ada cookie/localStorage/sessionStorage, tidak ada permukaan autentikasi, dan CSP-nya benar.

Dua hal ditunda: audit CVE dependency butuh panggilan jaringan yang dilarang oleh kontrak read-only-nya, dan risiko SSRF baru muncul kalau nanti ada proxy gambar.

### Angela — form booking (3 FAIL)

Angela menguji di 390/420/480/768/900/1023/1440 dan menjalankan ulang build produksi (lolos). Tiga kegagalan:

1. **Tidak ada validasi format pada field kontak** (`Booking.tsx:95-97`). String apa pun yang tidak kosong diterima, dimasukkan ke pesan WhatsApp, lalu **dikonfirmasi kembali ke tamu** di panel sukses. Artinya permintaan yang tidak bisa dihubungi tetap lolos di satu-satunya jalur konversi.
2. **Jurang layout antara 768px dan sekitar 1000px** (`Booking.tsx:193` dan `:226`, plus `Navbar.tsx:127`). Field menyusut dari 319px ke 63px dalam satu piksel dan isinya terpotong, serta wordmark navbar menimpa link navigasi. Menyerang iPad potret dan laptop kecil.
3. **Fokus hilang setelah "EDIT DETAILS"** (`Booking.tsx:153`). `requestAnimationFrame` memicu sebelum `AnimatePresence` merender ulang form, sehingga fokus jatuh ke `<body>` dan navigasi keyboard terputus.

Angela juga mengonfirmasi sendiri bahwa submit diarahkan ke URL WhatsApp eksternal yang nyata — mengkonfirmasi temuan Meredith.

**Keamanan saat pengujian:** ia mengganti `window.open` dengan perekam sebelum halaman dimuat dan tidak pernah mengklik link cadangan, jadi tidak ada WhatsApp sungguhan yang terpicu.

---

## 5. Temuan terpenting: form booking tidak memesan

Ini yang mengubah definisi "selesai" untuk seluruh tim.

**Form booking tidak memesan apa pun.** `Booking.tsx:114-128` menyusun URL WhatsApp dari `WHATSAPP_URL`, lalu `submit()` di `:143` hanya memanggil `window.open()`. Tidak ada server, tidak ada mesin pemesanan, tidak ada endpoint formulir.

Artinya, nomor placeholder `6281234567890` di `content.ts:83` **bukan sekadar detail yang berantakan.** Itu adalah titik akhir seluruh jalur konversi. Enam permukaan mengarah ke sana:

| Permukaan | Lokasi |
| --- | --- |
| Serah-terima form booking (satu-satunya konversi) | `Booking.tsx:127-128` |
| Nomor "prefer to talk" di booking | `Booking.tsx:183-184` |
| "MESSAGE US" di landing | `Landing.tsx:198` |
| "QUESTIONS? MESSAGE OUR HOST" | `RoomDetail.tsx:170` |
| WhatsApp di navbar | `Navbar.tsx:247` |
| WhatsApp di footer | `Footer.tsx:23` |

Setiap "PLAN YOUR STAY", "CHECK AVAILABILITY", "MESSAGE US", dan "PREFER TO TALK" di situs ini berakhir di `wa.me/6281234567890` — nomor yang tidak dimiliki siapa pun.

**Putusan Meredith, yang saya adopsi sebagai aturan lantai ini:**

> Tidak ada fakta di situs ini yang tidak diberikan oleh siapa pun. Setiap tarif, jam, jarak, dan kapasitas: ada sumbernya, atau tidak ada sama sekali.

Tamu yang diberi tahu tarif `IDR 1.850K` lalu tidak bisa menghubungi pemiliknya **lebih dirugikan** daripada tamu yang tidak menemukan situs ini sama sekali. Itu alasannya, dan alasannya tidak perlu dilembutkan.

---

## 6. Yang sedang dikerjakan

| Kartu | Pemilik | Isi |
| --- | --- | --- |
| `SHM-2` | Kelly | Baseline browser: semua route di 390px dan 1440px. **Pintu gerbang untuk semua kartu kode** |
| `SHM-9` | Phylis | Panduan kontributor dan verifikasi yang belum pernah ada di repo ini |

Sudah selesai: `SHM-3` Pam, `SHM-4` Oscar, `SHM-5` Andy, `SHM-6` Stanley, `SHM-7` Meredith, `SHM-8` Angela.

---

## 7. Yang sengaja menganggur

`kevin-backend`, `creed-project-manager`, `toby-project-lead`, `ryan-sonic`, dan `dwight-muhsg4yo`.

Ini keputusan sadar, bukan kelalaian:

- **Kevin** tidak punya tugas karena situsnya statis dan kami tidak sedang membangun server
- **Creed** tumpang tindih dengan tugas saya
- **Dwight** menerima `SHM-2` pada 02:53:55Z dan sampai 03:15Z tidak menghasilkan apa pun — tidak ada entri log, tidak ada file. Dia agen ketiga yang gagal di kartu itu, jadi kartunya saya pindah ke Kelly

Menganggur tanpa tugas itu benar ketika memang tidak ada pekerjaan nyata. Mengarang pekerjaan hanya membuang anggaran lantai dan menghasilkan kebisingan.

---

## 8. Yang menunggu keputusan manusia

**Ini yang satu-satunya penghambat luncur.** Empat fakta, dan tidak ada agen yang boleh mengarangnya:

1. **Nomor WhatsApp asli.** Satu edit di `content.ts:83` memperbaiki keenam permukaan sekaligus
2. **Tarif asli**, dalam penulisan Indonesia yang benar — `Rp 1.850.000`, bukan `IDR 1.850K`. String yang sekarang salah format, bukan hanya salah nilai
3. **Jam sarapan asli** — atau izin untuk menghapusnya. Saat ini disebut tiga kali berbeda
4. **Keputusan soal 10 gambar tanpa sumber:** ganti dengan yang berlisensi, atau hapus. Jangan dipublikasikan apa adanya

Perlu dikonfirmasi juga: apakah `hello@sukhabali.com` benar-benar menerima email. Kalau domain-nya belum diputuskan, kanal kedua ini juga bisa mati — dan kalau begitu situs tidak punya kontak yang berfungsi sama sekali.

**Jalur tercepat:** Meredith menemukan bahwa Butir 6 dan 7 bisa ditutup dengan **menghapus klaim**, bukan dengan meminta fakta. Setiap hal yang terblokir manusia setelah Butir 5 bisa ditutup dengan penghapusan, dan situs bisa luncur hari ini tanpanya. Kalau tarif tidak sempat disediakan, mundur yang jujur adalah memuat "Enquire for rates" dan menghapus semua angka — tapi tarif adalah pendorong konversi nyata untuk homestay, jadi lebih baik diberikan daripada disembunyikan.

---

## 9. Aturan yang berlaku untuk semua agen

1. **Working directory salah, dan perilakunya tidak bisa diprediksi.** Semua agen masuk ke folder tempat manifest-nya berada, yaitu `docs/munder-difflin/hires`. Dari folder itu, `npm run build` telanjang justru **berhasil**, karena npm menelusuri ke atas sampai menemukan `package.json` repo. Tapi perintah yang sama dari workspace root `C:\Users\Andika\Documents\SUKHA Homestay` gagal dengan `ENOENT`, karena tidak ada `package.json` di atas sana. Keduanya sudah saya uji sendiri. Jadi perintah ini tidak bisa diandalkan benar maupun salah, dan itulah yang membuat orang tersesat. Tetap gunakan `npm --prefix "C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay" run <script>`, dan baca file sumber lewat path lengkap di bawah repo root.

   > **Koreksi untuk catatan saya sendiri:** saya pernah menulis di `AGENTS.md` dan di beberapa kartu bahwa folder itu tidak punya `package.json`, sehingga `npm run build` pasti gagal. Itu **salah**. Phylis (SHM-9) mengujinya, dan saya ikut mengonfirmasi sendiri. Anjuran `--prefix` tetap berlaku; alasan yang saya berikan untuk itu tidak.
2. **Jangan pernah mengulang perintah yang gagal.** Dua agen dihentikan *circuit breaker* karena mengulang satu perintah 16 kali. Kalau gagal, laporkan errornya ke saya lalu berhenti.
3. **Tulis laporan ke dua jalur.** Provider ini tidak punya inbox hive yang berfungsi, dan `memory.md` sendiri jatuh ke working directory. Tulis ke `hive/agents/<id-anda>/memory.md` **dan** `docs/munder-difflin/hires/<nama-manifest>.memory.md`.
4. **Read-only sampai saya bilang lain.** Sebagian besar kartu saat ini adalah investigasi. Kalau saya buka kartu yang mengubah kode, Anda akan diberi tahu eksplisit.
5. **Jangan commit, jangan push.** Saya yang mengintegrasikan.
6. **Jangan sentuh `hive/`, `roster.json`, atau `roster-backups/`.** Milik aplikasi.
7. **Jangan longgarkan aturan lint untuk menghilangkan peringatan.** Dua peringatan lama sudah diketahui: `motion.tsx:5` dan `Navbar.tsx:46`. `npm run lint` keluar dengan kode 0 hari ini. Biarkan.
8. **Butuh keputusan? Tanya saya, jangan tanya manusia langsung.** Saya adalah THEIR proxy di lantai ini.

---

## 10. Masalah teknis yang belum selesai

- **Saluran pelaporan agen rusak.** Balasan agen mendarat di terminal yang tidak bisa saya baca, dan `memory.md` masing-masing jatuh ke folder yang salah. Ketiga laporan yang selesai sekarang hanya ada sebagai file untracked di `docs/munder-difflin/hires/` — folder yang bisa terhapus bila ada import ulang. Saya sudah mensyaratkan dua jalur laporan di setiap kartu baru, tapi itu tambalan, bukan perbaikan.
- **`fleet.json` tidak bisa dipercaya di lantai ini.** File itu hidup, tapi melaporkan `tokens: 0` untuk saya sendiri saat saya jelas-jelas sedang bekerja. Field biaya dan aktivitas tidak terisi. Breaker level dan `onHold` masih bisa dibaca.
- **Working directory semua agen masih salah.** Sudah dimitigasi dengan `npm --prefix` di setiap kartu, tapi belum diperbaiki. Perbaikannya hanya bisa lewat menu settings aplikasi.

---

## 11. Dokumen lain

- `docs/audit-report.md` — audit teknis repository, bahasa Inggris
- `docs/image-sources.md` — catatan provenance gambar
- `docs/CONTRIBUTING.md` — panduan kontribusi
- `docs/munder-difflin/hires/pam-content.memory.md` — laporan Pam (konten)
- `docs/munder-difflin/hires/oscar-frontend.memory.md` — laporan Oscar (antarmuka)
- `docs/munder-difflin/hires/product-owner.memory.md` — laporan Meredith (kesiapan luncur)
- `docs/munder-difflin/hires/deploy.memory.md` — laporan Andy (deploy)
- `docs/munder-difflin/hires/security-reviewer.memory.md` — laporan Stanley (keamanan)
- `docs/munder-difflin/hires/tester.memory.md` — laporan Angela (form booking)
- `hive/board.md` — papan rencana cerita, ditulis oleh saya
- `hive/tasks.json` — daftar kartu tugas
