/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
/**
 * ATURAN DESAIN PERMANEN GUBER SMART
 * 
 * 1. PRINSIP: Minimalis, bersih, ringkas, dan jelas. Tampil seperti produk jadi yang profesional, bukan prototipe.
 * 2. LARANGAN MUTLAK TEKS PETUNJUK:
 *    - Dilarang keras menaruh kalimat instruksi, tips, panduan, teks bantuan, atau penjelasan fungsi.
 *    - Dilarang menyebut istilah teknis di antarmuka (Drive, Apps Script, spreadsheet, base64, dsb).
 *    - Dilarang teks kecil abu-abu penjelas di bawah tombol, kolom, atau judul.
 *    - Dilarang tooltip, balon petunjuk, tour, onboarding, banner cara pakai, badge baru/demo, kata simulasi/mock.
 * 3. HANYA TEKS RESMI YANG DIIZINKAN:
 *    - Konten asli aplikasi (isi artikel, data produk, nama peserta).
 *    - Judul halaman & judul bagian (satu frasa singkat).
 *    - Label tombol & menu (kata kerja singkat 1-3 kata).
 *    - Label kolom isian (satu frasa singkat di atas kolom, tanda * untuk wajib).
 *    - Pesan galat validasi (hanya saat terjadi kesalahan).
 *    - Notifikasi hasil aksi (misalnya "Berhasil disimpan", "Gagal mengunggah", "Offline").
 *    - Keadaan kosong singkat (misalnya "Belum ada data").
 *    - Placeholder: dikosongkan atau hanya contoh nama murni, bukan kalimat instruksi.
 * 4. PENGGUNAAN KOMPONEN:
 *    - Tombol aksi jelas dan tegas: Simpan, Tambah, Hapus, Pilih Gambar, Batal, Cari.
 *    - Kolom input/textarea otomatis membesar mengikuti isinya (auto-expand textarea) tanpa internal scrollbar.
 *    - Kolom gambar punya tombol "Hapus Gambar" berikon sampah.
 *    - Banner/hero boleh dikosongkan teksnya; bila kosong tampilkan gambar murni tanpa gradien gelap.
 *    - Tidak ada gambar bawaan yang tertulis mati; semua gambar dari pengaturan, bila kosong tampilkan kerangka abu.
 * 5. TAMPILAN HP SEBAGAI PRIORITAS UTAMA (360-430px):
 *    - Tombol hamburger di kanan atas header, berubah jadi ikon tutup saat terbuka.
 *    - Menu samping laci / panel layar penuh dengan overlay gelap di belakangnya.
 *    - Item navigasi tersusun vertikal satu kolom, tinggi >= 48px, font >= 16px.
 *    - Tombol login "Masuk" HANYA item biasa terakhir di menu navigasi, bukan tombol di header atau body.
 *    - Saat login berhasil, item "Masuk" berubah menjadi "Dasbor" di posisi yang sama.
 *    - Tepat SATU tombol pengalih tema terang/gelap di seluruh aplikasi, diletakkan sebagai satu item di menu.
 *    - Area sentuh minimal 44px.
 *    - Bilah ajakan tetap di bawah HP (tombol "Daftar Sekarang" penuh lebar) muncul setelah hero terlewat, disembunyikan saat formulir terlihat.
 *    - Tombol WhatsApp bulat melayang di kanan bawah berada di atas bilah ajakan HP.
 */

export const DESIGN_SYSTEM = {
  colors: {
    primary: '#4F46E5',    // Indigo
    secondary: '#0F172A',  // Dark slate
    accent: '#F97316',     // Orange CTA
    backgroundLight: '#F8FAFC',
    cardLight: '#FFFFFF',
    textLight: '#0F172A',
    textMutedLight: '#475569',
    backgroundDark: '#0B1120',
    cardDark: '#131C31',
    textDark: '#E5E7EB',
    textMutedDark: '#94A3B8',
  },
  typography: {
    display: 'Plus Jakarta Sans, sans-serif',
    body: 'Inter, sans-serif',
  },
  radii: {
    card: '16px',
    button: '12px',
    input: '10px',
  },
  whatsapp: {
    displayNumber: '085376604024',
    intlNumber: '6285376604024',
  },
  rules: {
    noInstructionText: true,
    autoExpandInputs: true,
    singleThemeToggle: true,
    mobileFirst: true,
  }
} as const;
