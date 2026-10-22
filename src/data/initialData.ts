/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import {
  CmsSettings,
  StatItem,
  ProblemItem,
  BenefitItem,
  StepItem,
  ModuleItem,
  PortfolioItem,
  MentorProfile,
  TestimonialItem,
  PackageItem,
  BonusItem,
  UrgencySettings,
  FaqItem,
  StaticPageItem,
  ApplicantItem,
  ActivityLogItem,
} from '../types';

export const INITIAL_CMS_SETTINGS: CmsSettings = {
  identity: {
    appName: 'Guber Smart',
    slogan: 'Belajar membuat aplikasi web, profesional dan mudah dipahami.',
    logo: {
      source: 'tautan',
      value: '',
    },
    favicon: '',
    pageTitle: 'Guber Smart - Ubah Ide Menjadi Aplikasi, Tanpa Perlu Koding',
    pageDescription: 'Ubah Ide Menjadi Aplikasi, Tanpa Perlu Koding. Belajar membuat aplikasi web profesional dan mudah dipahami bersama Guber Smart.',
  },
  theme: {
    primaryColor: '#4F46E5',
    secondaryColor: '#0F172A',
    accentColor: '#F97316',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: '16px',
    light: {
      background: '#F8FAFC',
      card: '#FFFFFF',
      text: '#0F172A',
      textSecondary: '#475569',
    },
    dark: {
      background: '#0B1120',
      card: '#131C31',
      text: '#E5E7EB',
      textSecondary: '#94A3B8',
    },
  },
  navigation: [
    { id: 'nav-beranda', label: 'Beranda', href: '#beranda', isVisible: true, order: 1 },
    { id: 'nav-manfaat', label: 'Manfaat', href: '#manfaat', isVisible: true, order: 2 },
    { id: 'nav-cara-kerja', label: 'Cara Kerja', href: '#cara-kerja', isVisible: true, order: 3 },
    { id: 'nav-materi', label: 'Materi', href: '#materi', isVisible: true, order: 4 },
    { id: 'nav-karya', label: 'Karya', href: '#karya', isVisible: true, order: 5 },
    { id: 'nav-testimoni', label: 'Testimoni', href: '#testimoni', isVisible: true, order: 6 },
    { id: 'nav-paket', label: 'Paket', href: '#paket', isVisible: true, order: 7 },
    { id: 'nav-faq', label: 'FAQ', href: '#faq', isVisible: true, order: 8 },
  ],
  buttons: {
    ctaHeroText: 'Daftar Sekarang',
    ctaWorkText: 'Lihat Cara Kerja',
    ctaFloatingText: 'Daftar Sekarang',
    ctaFormText: 'Kirim Pendaftaran',
    ctaClosingText: 'Daftar Sekarang',
    whatsappNumber: '6285376604024',
    whatsappGeneralMessage: 'Halo Guber Smart, saya ingin konsultasi mengenai program pembuatan aplikasi web.',
    whatsappPostRegistrationMessage: 'Halo Guber Smart, saya sudah mengisi formulir pendaftaran atas nama {name} untuk {package}. Mohon informasi langkah berikutnya.',
  },
  features: {
    showCountdown: true,
    showQuota: true,
    showMobileCtaBar: true,
    showFloatingWhatsapp: true,
    showPromoVideo: true,
    showTestimonials: true,
    showPortfolio: true,
    showBonus: true,
    showRegForm: true,
    enableScrollAnimation: true,
  },
  sections: {
    hero: { id: 'hero', title: 'Ubah Ide Menjadi Aplikasi, Tanpa Perlu Koding', subtitle: 'Belajar membuat aplikasi web yang profesional dan mudah dipahami bersama Guber Smart, dari ide sampai aplikasi jadi.', isVisible: true, order: 1 },
    stats: { id: 'stats', title: 'Statistik Peserta', isVisible: true, order: 2 },
    problems: { id: 'problems', title: 'Tantangan Pemula', isVisible: true, order: 3 },
    benefits: { id: 'benefits', title: 'Keunggulan Program', isVisible: true, order: 4 },
    howItWorks: { id: 'howItWorks', title: 'Cara Kerja', isVisible: true, order: 5 },
    curriculum: { id: 'curriculum', title: 'Materi Belajar', isVisible: true, order: 6 },
    portfolio: { id: 'portfolio', title: 'Karya Peserta', isVisible: true, order: 7 },
    video: { id: 'video', title: 'Video Pengenalan', isVisible: true, order: 8 },
    mentor: { id: 'mentor', title: 'Profil Mentor', isVisible: true, order: 9 },
    testimonials: { id: 'testimonials', title: 'Pengalaman Peserta', isVisible: true, order: 10 },
    packages: { id: 'packages', title: 'Pilihan Paket Belajar', isVisible: true, order: 11 },
    urgency: { id: 'urgency', title: 'Pendaftaran Terbatas', isVisible: true, order: 12 },
    faq: { id: 'faq', title: 'Pertanyaan Umum', isVisible: true, order: 13 },
    form: { id: 'form', title: 'Formulir Pendaftaran', isVisible: true, order: 14 },
    closingCta: { id: 'closingCta', title: 'Wujudkan Aplikasi Anda Sekarang', subtitle: 'Bergabung bersama ratusan peserta lainnya dan bangun aplikasi pertama Anda dalam hitungan hari.', isVisible: true, order: 15 },
    footer: { id: 'footer', title: 'Footer', isVisible: true, order: 16 },
  },
  media: {
    promoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    heroMockupImage: {
      source: 'tautan',
      value: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    },
    sharePreviewImage: {
      source: 'tautan',
      value: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    },
  },
  seoTrackers: {
    metaTitle: 'Guber Smart - Ubah Ide Menjadi Aplikasi, Tanpa Perlu Koding',
    metaDescription: 'Belajar membuat aplikasi web profesional dan mudah dipahami bersama Guber Smart, dari ide sampai aplikasi jadi.',
    shareImage: {
      source: 'tautan',
      value: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    },
    metaPixelId: '',
    googleAnalyticsId: '',
  },
  footerContact: {
    address: 'Jakarta, Indonesia',
    phone: '085376604024',
    email: 'info@gubersmart.com',
    operatingHours: 'Senin - Sabtu: 09.00 - 18.00 WIB',
    copyright: '© 2026 Guber Smart. Hak Cipta Dilindungi.',
    socialLinks: {
      instagram: 'https://instagram.com/gubersmart',
      youtube: 'https://youtube.com/@gubersmart',
      facebook: '',
      linkedin: '',
    },
  },
  syncSettings: {
    webAppUrl: '',
    token: '',
    driveFolderId: '',
    spreadsheetId: '',
    sheetNames: {
      applicants: 'Pendaftar',
      settings: 'Pengaturan',
      packages: 'Paket',
      content: 'Konten',
      logs: 'LogAktivitas',
      accounts: 'Akun',
    },
  },
};

export const INITIAL_STATS: StatItem[] = [
  { id: 'stat-1', label: 'Peserta', value: '1.200+', numericTarget: 1200, suffix: '+', order: 1, isVisible: true },
  { id: 'stat-2', label: 'Aplikasi Jadi', value: '350+', numericTarget: 350, suffix: '+', order: 2, isVisible: true },
  { id: 'stat-3', label: 'Rating', value: '4,9/5', numericTarget: 4.9, suffix: '/5', order: 3, isVisible: true },
  { id: 'stat-4', label: 'Jenis Aplikasi', value: '20+', numericTarget: 20, suffix: '+', order: 4, isVisible: true },
];

export const INITIAL_PROBLEMS: ProblemItem[] = [
  { id: 'prob-1', title: 'Punya ide, bingung mulai dari mana', order: 1, isVisible: true },
  { id: 'prob-2', title: 'Takut koding itu rumit', order: 2, isVisible: true },
  { id: 'prob-3', title: 'Biaya jasa pembuat aplikasi mahal', order: 3, isVisible: true },
];

export const INITIAL_SOLUTION_STATEMENT = 'Guber Smart memandu Anda dari ide sampai aplikasi jadi, tanpa menulis satu baris kode.';

export const INITIAL_BENEFITS: BenefitItem[] = [
  { id: 'ben-1', title: 'Tanpa Koding', description: 'Cukup ceritakan alur dan kebutuhan ide aplikasi Anda.', iconName: 'Code2', order: 1, isVisible: true },
  { id: 'ben-2', title: 'Praktik Langsung', description: 'Setiap materi langsung menghasilkan modul aplikasi nyata.', iconName: 'Sparkles', order: 2, isVisible: true },
  { id: 'ben-3', title: 'Hasil Profesional', description: 'Tampilan modern, rapi, dan siap digunakan pengguna.', iconName: 'ShieldCheck', order: 3, isVisible: true },
  { id: 'ben-4', title: 'Nyaman di HP', description: 'Responsif sempurna di layar ponsel hingga laptop.', iconName: 'Smartphone', order: 4, isVisible: true },
  { id: 'ben-5', title: 'Mentoring Pribadi', description: 'Didampingi langkah demi langkah sampai tuntas.', iconName: 'Users', order: 5, isVisible: true },
  { id: 'ben-6', title: 'Akses Selamanya', description: 'Materi dan pembaruan dapat dipelajari kapan saja.', iconName: 'Infinity', order: 6, isVisible: true },
];

export const INITIAL_STEPS: StepItem[] = [
  { id: 'step-1', stepNumber: 1, title: 'Ceritakan Ide', description: 'Jelaskan alur, kebutuhan, dan fitur yang ingin dihadirkan pada aplikasi Anda.', order: 1, isVisible: true },
  { id: 'step-2', stepNumber: 2, title: 'Buat Prompt', description: 'Susun instruksi terarah sesuai formula praktis yang disediakan.', order: 2, isVisible: true },
  { id: 'step-3', stepNumber: 3, title: 'Aplikasi Jadi', description: 'Dapatkan aplikasi web lengkap, fungsional, dan siap dipublikasikan.', order: 3, isVisible: true },
];

export const INITIAL_MODULES: ModuleItem[] = [
  {
    id: 'mod-1',
    title: 'Mengenal Ide dan Jenis Aplikasi',
    points: [
      'Memilih model aplikasi yang sesuai kebutuhan usaha atau kantor',
      'Menentukan fitur utama dan alur navigasi pengguna',
      'Menyiapkan rancangan struktur halaman yang efektif',
    ],
    order: 1,
    isVisible: true,
  },
  {
    id: 'mod-2',
    title: 'Menyusun Prompt yang Tepat',
    points: [
      'Formula instruksi terarah yang menghasilkan susunan rapi',
      'Menghindari kesalahan umum pada perumusan kebutuhan',
      'Teknik perbaikan tampilan bertahap secara efisien',
    ],
    order: 2,
    isVisible: true,
  },
  {
    id: 'mod-3',
    title: 'Membuat Aplikasi di Google AI Studio',
    points: [
      'Membuka ruang kerja dan memilih model yang optimal',
      'Menjalankan pembuatan aplikasi secara interaktif',
      'Menyesuaikan antarmuka dan kerapian tata letak ponsel',
    ],
    order: 3,
    isVisible: true,
  },
  {
    id: 'mod-4',
    title: 'Mengelola Data dengan Google Sheets dan Drive',
    points: [
      'Menyiapkan lembar kerja sebagai basis penyimpanan data',
      'Menghubungkan formulir input ke baris spreadsheet',
      'Menyimpan dan menampilkan file media serta foto',
    ],
    order: 4,
    isVisible: true,
  },
  {
    id: 'mod-5',
    title: 'Menyiapkan Dasbor Admin dan Login',
    points: [
      'Membuat antarmuka manajemen data khusus pengelola',
      'Mengamankan halaman akses dengan verifikasi kata sandi',
      'Menyediakan pencarian, filter status, dan unduh data',
    ],
    order: 5,
    isVisible: true,
  },
  {
    id: 'mod-6',
    title: 'Menerbitkan Aplikasi agar Bisa Dipakai Orang Lain',
    points: [
      'Menyiapkan alamat web resmi yang siap diakses publik',
      'Uji coba responsivitas di berbagai ukuran layar',
      'Mengatur tautan dan informasi saat dibagikan ke media sosial',
    ],
    order: 6,
    isVisible: true,
  },
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Website Sekolah',
    category: 'Website',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' },
    order: 1,
    isVisible: true,
  },
  {
    id: 'port-2',
    title: 'Toko Online',
    category: 'Toko',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80' },
    order: 2,
    isVisible: true,
  },
  {
    id: 'port-3',
    title: 'Absensi Guru',
    category: 'Administrasi',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
    order: 3,
    isVisible: true,
  },
  {
    id: 'port-4',
    title: 'Inventaris Barang',
    category: 'Administrasi',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
    order: 4,
    isVisible: true,
  },
  {
    id: 'port-5',
    title: 'Laporan Kantor',
    category: 'Administrasi',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80' },
    order: 5,
    isVisible: true,
  },
  {
    id: 'port-6',
    title: 'Perpustakaan Digital',
    category: 'Administrasi',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80' },
    order: 6,
    isVisible: true,
  },
  {
    id: 'port-7',
    title: 'Kasir',
    category: 'Toko',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80' },
    order: 7,
    isVisible: true,
  },
  {
    id: 'port-8',
    title: 'Undangan Digital',
    category: 'Website',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
    order: 8,
    isVisible: true,
  },
];

export const INITIAL_MENTOR: MentorProfile = {
  name: 'Mentor Utama Guber Smart',
  title: 'Pendiri dan Mentor',
  bio: 'Berpengalaman membimbing ratusan pemula dari beragam latar belakang menghasilkan aplikasi web fungsional tanpa koding. Berfokus pada kemudahan pemahaman, kerapian hasil, dan penerapan praktis di dunia nyata.',
  photo: {
    source: 'tautan',
    value: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
};

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Rina Aprilia',
    role: 'Guru SD',
    rating: 5,
    quote: 'Awalnya ragu karena tidak punya dasar IT sama sekali. Ternyata dalam beberapa hari aplikasi absensi kelas sudah jadi dan langsung dipakai di sekolah.',
    photo: { source: 'tautan', value: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
    order: 1,
    isVisible: true,
  },
  {
    id: 'test-2',
    name: 'Budi Santoso',
    role: 'Pemilik Warung Kopi',
    rating: 5,
    quote: 'Saya bisa membuat aplikasi kasir dan pencatatan stok sendiri. Hemat biaya dan sangat mudah disesuaikan dengan kebutuhan usaha sehari-hari.',
    photo: { source: 'tautan', value: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    order: 2,
    isVisible: true,
  },
  {
    id: 'test-3',
    name: 'Dewi Lestari',
    role: 'Staf Administrasi',
    rating: 5,
    quote: 'Sistem rekap laporan kantor yang dulu makan waktu berhari-hari kini otomatis tersimpan rapi. Bimbingan mentor sangat sabar dan terarah.',
    photo: { source: 'tautan', value: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    order: 3,
    isVisible: true,
  },
  {
    id: 'test-4',
    name: 'Ahmad Fauzi',
    role: 'Pengurus Masjid',
    rating: 5,
    quote: 'Aplikasi jadwal kegiatan dan laporan donasi masjid selesai dengan rapi. Jamaah sangat terbantu saat membuka melalui ponsel masing-masing.',
    photo: { source: 'tautan', value: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    order: 4,
    isVisible: true,
  },
  {
    id: 'test-5',
    name: 'Sinta Maharani',
    role: 'Mahasiswa',
    rating: 5,
    quote: 'Sangat terbantu untuk menyelesaikan proyek tugas akhir. Konsep pembelajarannya praktis, to the point, dan langsung menghasilkan aplikasi nyata.',
    photo: { source: 'tautan', value: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
    order: 5,
    isVisible: true,
  },
  {
    id: 'test-6',
    name: 'Hendra Wijaya',
    role: 'Wirausaha',
    rating: 5,
    quote: 'Layanan pemesanan dan katalog produk toko jadi jauh lebih profesional. Pendampingan dari awal ide sampai aplikasi selesai terbukti nyata.',
    photo: { source: 'tautan', value: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
    order: 6,
    isVisible: true,
  },
];

export const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: 'pkg-pemula',
    name: 'Paket Pemula',
    price: 'Rp199.000',
    strikePrice: 'Rp399.000',
    features: [
      'Akses 6 Modul Lengkap',
      'Template Prompt Siap Pakai',
      'Pembuatan 1 Aplikasi Web',
      'Akses Komunitas Belajar',
      'Pembaruan Materi Selamanya',
    ],
    isFeatured: false,
    buttonText: 'Pilih Paket',
    isActive: true,
    order: 1,
  },
  {
    id: 'pkg-kreator',
    name: 'Paket Kreator',
    price: 'Rp499.000',
    strikePrice: 'Rp899.000',
    features: [
      'Semua Fitur Paket Pemula',
      'Pembuatan Hingga 5 Aplikasi',
      'Modul Dasbor Admin & Login',
      'Integrasi Database Spreadsheet',
      'Sesi Tanya Jawab Berkala',
      'Dukungan Prioritas',
    ],
    isFeatured: true,
    buttonText: 'Pilih Paket',
    isActive: true,
    order: 2,
  },
  {
    id: 'pkg-mentoring',
    name: 'Paket Mentoring',
    price: 'Rp999.000',
    strikePrice: 'Rp1.799.000',
    features: [
      'Semua Fitur Paket Kreator',
      'Pendampingan 1-on-1 Sampai Jadi',
      'Review & Optimasi Aplikasi',
      'Bantuan Penerbitan Domain Web',
      'Bebas Konsultasi Kapan Saja',
      'Garansi Sampai Aplikasi Berjalan',
    ],
    isFeatured: false,
    buttonText: 'Pilih Paket',
    isActive: true,
    order: 3,
  },
];

export const INITIAL_BONUSES: BonusItem[] = [
  { id: 'bon-1', title: 'Kumpulan Template Prompt', description: 'Puluhan template prompt siap modifikasi untuk berbagai jenis kebutuhan sistem.', order: 1, isVisible: true },
  { id: 'bon-2', title: 'Grup Komunitas Alumni', description: 'Wadah berbagi studi kasus, inspirasi ide, dan pembaruan berkala sesama pembelajar.', order: 2, isVisible: true },
  { id: 'bon-3', title: 'Sesi Konsultasi Ide', description: 'Kesempatan bedah alur logika dan strategi pembuatan aplikasi langsung bersama mentor.', order: 3, isVisible: true },
];

export const INITIAL_GUARANTEE = 'Garansi Pendampingan sampai Aplikasi Jadi';

// 14 days from now default
const now = new Date();
const deadline = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

export const INITIAL_URGENCY: UrgencySettings = {
  deadlineDate: deadline.toISOString(),
  totalSeats: 30,
  remainingSeats: 12,
};

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Apakah benar-benar tanpa koding?',
    answer: 'Ya, seluruh tahapan pembuatan aplikasi memanfaatkan instruksi bahasa terarah yang diterjemahkan menjadi kode aplikasi utuh tanpa Anda harus menulis sintaks pemrograman.',
    order: 1,
    isVisible: true,
  },
  {
    id: 'faq-2',
    question: 'Apakah cocok untuk pemula?',
    answer: 'Sangat cocok. Pembelajaran dirancang sistematis dari tingkat dasar tanpa memerlukan latar belakang teknologi informasi atau latar pendidikan komputer.',
    order: 2,
    isVisible: true,
  },
  {
    id: 'faq-3',
    question: 'Perangkat apa yang dibutuhkan?',
    answer: 'Anda hanya memerlukan laptop atau komputer dengan peramban web modern (Google Chrome, Edge, dll) serta koneksi internet yang stabil.',
    order: 3,
    isVisible: true,
  },
  {
    id: 'faq-4',
    question: 'Berapa lama durasi belajar?',
    answer: 'Materi dapat dipelajari secara fleksibel sesuai waktu luang Anda. Rata-rata peserta menyelesaikan aplikasi pertama mereka dalam 3 hingga 7 hari.',
    order: 4,
    isVisible: true,
  },
  {
    id: 'faq-5',
    question: 'Jenis aplikasi apa saja yang bisa dibuat?',
    answer: 'Bermacam jenis, antara lain website instansi/organisasi, toko online, sistem pencatatan inventaris, absensi guru/karyawan, formulir pendaftaran, hingga dashboard kantor.',
    order: 5,
    isVisible: true,
  },
  {
    id: 'faq-6',
    question: 'Apakah ada mentoring?',
    answer: 'Ya, tersedia bimbingan terarah dan ruang konsultasi untuk memastikan setiap kendala yang dihadapi peserta dapat diselesaikan hingga aplikasi siap pakai.',
    order: 6,
    isVisible: true,
  },
  {
    id: 'faq-7',
    question: 'Bagaimana cara pembayaran dan pendaftaran?',
    answer: 'Cukup isi formulir pendaftaran pada halaman ini, lalu konfirmasikan melalui tautan WhatsApp yang tersedia untuk diarahkan ke aktivasi akses.',
    order: 7,
    isVisible: true,
  },
  {
    id: 'faq-8',
    question: 'Apa yang didapat setelah mendaftar?',
    answer: 'Anda akan mendapatkan akses ke seluruh modul belajar, dokumen panduan prompt, paket template siap pakai, serta akses ke grup komunitas diskusi alumni.',
    order: 8,
    isVisible: true,
  },
];

export const INITIAL_STATIC_PAGES: StaticPageItem[] = [
  {
    id: 'page-privacy',
    slug: 'kebijakan-privasi',
    title: 'Kebijakan Privasi',
    content: `Kebijakan Privasi Guber Smart

1. Informasi yang Dikumpulkan
Kami mengumpulkan informasi yang Anda berikan secara sukarela saat mengisi formulir pendaftaran, termasuk nama lengkap, nomor WhatsApp, preferensi paket, dan jenis aplikasi yang diinginkan.

2. Penggunaan Informasi
Informasi yang kami kumpulkan digunakan semata-mata untuk:
- Memproses pendaftaran dan verifikasi keikutsertaan Anda dalam program belajar.
- Menghubungi Anda terkait konfirmasi pendaftaran dan pemberian informasi program.
- Memberikan layanan pendampingan dan dukungan teknis selama proses belajar.

3. Perlindungan Data
Kami berkomitmen menjaga kerahasiaan data pribadi Anda dan tidak akan menyebarluaskan, memperjualbelikan, atau membagikan informasi Anda kepada pihak ketiga tanpa persetujuan Anda.

4. Hak Pengguna
Anda berhak meminta klarifikasi, pembaruan, atau penghapusan data pribadi Anda dengan menghubungi saluran resmi WhatsApp kami.`,
    order: 1,
    isVisible: true,
  },
  {
    id: 'page-terms',
    slug: 'syarat-dan-ketentuan',
    title: 'Syarat dan Ketentuan',
    content: `Syarat dan Ketentuan Guber Smart

1. Ketentuan Umum
Dengan mengakses landing page ini dan mendaftar pada program Guber Smart, Anda menyetujui seluruh syarat dan ketentuan yang berlaku.

2. Hak Cipta Materi
Seluruh materi pelatihan, modul panduan, dan formula prompt yang diberikan merupakan hak cipta Guber Smart dan hanya diperuntukkan bagi penggunaan pribadi peserta. Dilarang mendistribusikan ulang atau memperjualbelikan materi tanpa izin tertulis.

3. Kepemilikan Aplikasi
Aplikasi yang dihasilkan oleh peserta sepenuhnya merupakan milik peserta. Peserta bebas menggunakan, menerbitkan, maupun mengomersialkan aplikasi yang dibuat.

4. Garansi dan Pendampingan
Garansi pendampingan berlaku sesuai dengan ketentuan pada paket yang dipilih, dengan komitmen membantu peserta hingga aplikasi fungsional berhasil diwujudkan sesuai lingkup kesepakatan awal.`,
    order: 2,
    isVisible: true,
  },
];

export const INITIAL_APPLICANTS: ApplicantItem[] = [
  {
    id: 'app-1',
    name: 'Rahmat Hidayat',
    whatsapp: '081234567890',
    appType: 'Toko Online',
    packageId: 'pkg-kreator',
    packageName: 'Paket Kreator',
    message: 'Ingin membuat toko perlengkapan olahraga dengan katalog produk dan pesanan WA.',
    status: 'Baru',
    createdAt: '2026-10-22T08:15:00.000Z',
    notes: '',
  },
  {
    id: 'app-2',
    name: 'Siti Nurhaliza',
    whatsapp: '085298765432',
    appType: 'Website Instansi',
    packageId: 'pkg-pemula',
    packageName: 'Paket Pemula',
    message: 'Untuk kebutuhan profil madrasah.',
    status: 'Dihubungi',
    createdAt: '2026-10-21T14:30:00.000Z',
    notes: 'Sudah dihubungi via WA, konfirmasi pembayaran besok.',
  },
  {
    id: 'app-3',
    name: 'Agus Setiawan',
    whatsapp: '087812341234',
    appType: 'Absensi',
    packageId: 'pkg-mentoring',
    packageName: 'Paket Mentoring',
    message: 'Perlu sistem absensi barcode untuk yayasan pendidikan.',
    status: 'Selesai',
    createdAt: '2026-10-20T10:00:00.000Z',
    notes: 'Akses belajar aktif, sesi onboarding selesai.',
  },
  {
    id: 'app-4',
    name: 'Fitri Handayani',
    whatsapp: '082156789012',
    appType: 'Inventaris',
    packageId: 'pkg-kreator',
    packageName: 'Paket Kreator',
    message: 'Inventaris klinik swasta.',
    status: 'Baru',
    createdAt: '2026-10-20T16:45:00.000Z',
    notes: '',
  },
  {
    id: 'app-5',
    name: 'Bambang Tri',
    whatsapp: '081398761234',
    appType: 'Laporan Kantor',
    packageId: 'pkg-pemula',
    packageName: 'Paket Pemula',
    message: '',
    status: 'Dihubungi',
    createdAt: '2026-10-19T09:20:00.000Z',
    notes: 'Menunggu konfirmasi jadwal mulai.',
  },
  {
    id: 'app-6',
    name: 'Nur Aisyah',
    whatsapp: '085311223344',
    appType: 'Perpustakaan',
    packageId: 'pkg-kreator',
    packageName: 'Paket Kreator',
    message: 'Aplikasi katalog buku dan peminjaman santri.',
    status: 'Baru',
    createdAt: '2026-10-18T11:10:00.000Z',
    notes: '',
  },
  {
    id: 'app-7',
    name: 'Eko Prasetyo',
    whatsapp: '081277889900',
    appType: 'Toko Online',
    packageId: 'pkg-mentoring',
    packageName: 'Paket Mentoring',
    message: 'Toko kue dan bakery dengan pilihan ongkir lokal.',
    status: 'Selesai',
    createdAt: '2026-10-17T13:00:00.000Z',
    notes: 'Selesai konsultasi rancangan awal.',
  },
  {
    id: 'app-8',
    name: 'Sri Wahyuni',
    whatsapp: '085733445566',
    appType: 'Website Instansi',
    packageId: 'pkg-pemula',
    packageName: 'Paket Pemula',
    message: '',
    status: 'Baru',
    createdAt: '2026-10-16T15:30:00.000Z',
    notes: '',
  },
  {
    id: 'app-9',
    name: 'Dedi Kurniawan',
    whatsapp: '082266778899',
    appType: 'Laporan Kantor',
    packageId: 'pkg-kreator',
    packageName: 'Paket Kreator',
    message: 'Sistem rekapitulasi data anggota koperasi.',
    status: 'Dihubungi',
    createdAt: '2026-10-15T08:50:00.000Z',
    notes: '',
  },
  {
    id: 'app-10',
    name: 'Lina Marlina',
    whatsapp: '081912349876',
    appType: 'Absensi',
    packageId: 'pkg-pemula',
    packageName: 'Paket Pemula',
    message: '',
    status: 'Selesai',
    createdAt: '2026-10-14T10:15:00.000Z',
    notes: '',
  },
  {
    id: 'app-11',
    name: 'Yusuf Maulana',
    whatsapp: '085288990011',
    appType: 'Inventaris',
    packageId: 'pkg-mentoring',
    packageName: 'Paket Mentoring',
    message: 'Pencatatan suku cadang bengkel motor.',
    status: 'Dihubungi',
    createdAt: '2026-10-13T12:00:00.000Z',
    notes: '',
  },
  {
    id: 'app-12',
    name: 'Mega Utami',
    whatsapp: '087755667788',
    appType: 'Lainnya',
    packageId: 'pkg-kreator',
    packageName: 'Paket Kreator',
    message: 'Aplikasi pendaftaran seminar dan cetak tiket barcode.',
    status: 'Baru',
    createdAt: '2026-10-12T14:40:00.000Z',
    notes: '',
  },
];

export const INITIAL_LOGS: ActivityLogItem[] = [
  { id: 'log-1', role: 'superadmin', action: 'Inisialisasi Sistem', details: 'Pengaturan awal data aplikasi selesai.', timestamp: '2026-10-12T00:00:00.000Z' },
  { id: 'log-2', role: 'admin', action: 'Pembaruan Status', details: 'Mengubah status pendaftar Agus Setiawan menjadi Selesai.', timestamp: '2026-10-20T11:00:00.000Z' },
  { id: 'log-3', role: 'admin', action: 'Catatan Internal', details: 'Menambahkan catatan pada pendaftar Siti Nurhaliza.', timestamp: '2026-10-21T15:00:00.000Z' },
];
