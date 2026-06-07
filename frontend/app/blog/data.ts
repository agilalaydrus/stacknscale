export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  coverImage: string;
  content: string;
};

export const articles: Article[] = [
  {
    slug: "kenapa-cloud-lokal-lebih-hemat",
    title: "Kenapa Cloud Lokal Bisa Lebih Hemat 40% dari AWS atau GCP?",
    excerpt: "Banyak perusahaan masih terjebak membayar mahal untuk cloud internasional padahal ada alternatif lokal yang performanya setara. Ini hitungannya.",
    category: "Cloud",
    date: "15 Mei 2025",
    readingTime: "6 menit",
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80",
    content: `
      <p>Pertanyaan ini sering muncul di awal sesi konsultasi kami: <strong>"Apa bedanya Cloud Lokal dan AWS?"</strong> Jawabannya sederhana dari sisi teknis, tapi luar biasa dari sisi keuangan.</p>

      <h2>Biaya Bandwidth adalah Kuncinya</h2>
      <p>Provider cloud internasional seperti AWS, GCP, atau Azure mengenakan biaya <em>egress</em> (data keluar) yang dihitung dalam dolar. Jika aplikasi Anda melayani pengguna Indonesia dan volume datanya besar, tagihan egress bisa mengejutkan.</p>
      <p>Cloud Lokal Indonesia — seperti Maxcloud, BizNet Gio, atau Alibaba Cloud IDC — mengenakan biaya bandwidth dalam rupiah dengan kurs tetap, dan seringkali sudah termasuk dalam paket bulanan. Selisihnya bisa 30–50% untuk use case traffic-heavy.</p>

      <h2>Latensi yang Lebih Baik untuk Pengguna Lokal</h2>
      <p>Data center yang berlokasi di Jakarta atau Surabaya memberikan latensi di bawah 5ms untuk pengguna lokal. Dibandingkan server di Singapore (AWS ap-southeast-1) yang rata-rata 20–40ms. Untuk aplikasi real-time seperti payment gateway atau live dashboard, ini perbedaan yang terasa nyata.</p>

      <h2>Kepatuhan Data (Data Residency)</h2>
      <p>Regulasi OJK dan Kominfo semakin ketat soal di mana data nasabah atau pengguna WNI boleh disimpan. Cloud Lokal yang bersertifikat ISO 27001 dan beroperasi di wilayah hukum Indonesia lebih mudah memenuhi persyaratan ini tanpa overhead legal tambahan.</p>

      <h2>Studi Kasus: Klien Fintech Kami</h2>
      <p>Salah satu klien kami — sebuah platform payment mid-size — berhasil memangkas tagihan cloud bulanan dari Rp 180 juta menjadi Rp 107 juta setelah migrasi ke Cloud Lokal. Prosesnya memakan waktu 3 minggu dan tanpa downtime berarti berkat metodologi Blue-Green Deployment yang kami gunakan.</p>

      <h2>Kapan Cloud Internasional Masih Relevan?</h2>
      <p>Cloud Lokal bukan solusi untuk semua kasus. Jika bisnis Anda melayani pengguna global, membutuhkan layanan AI/ML managed (seperti SageMaker atau Vertex AI), atau ekosistem DevOps tools yang sudah terintegrasi dengan AWS/GCP, pertimbangan biasanya berbeda. Evaluasi harus case-by-case.</p>

      <p>Ingin kami hitung estimasi penghematan untuk infrastruktur spesifik Anda? <a href="/#audit-form">Mulai konsultasi gratis di sini.</a></p>
    `,
  },
  {
    slug: "blue-green-deployment-zero-downtime",
    title: "Blue-Green Deployment: Cara Kami Menjamin 0% Downtime saat Migrasi",
    excerpt: "Metodologi deployment yang kami gunakan untuk memastikan klien tidak kehilangan satu transaksi pun saat proses migrasi berlangsung.",
    category: "DevOps",
    date: "2 April 2025",
    readingTime: "8 menit",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    content: `
      <p>Ketakutan terbesar klien saat mendengar kata "migrasi server" adalah downtime. Dan itu wajar — setiap menit sistem tidak bisa diakses berarti transaksi yang gagal, reputasi yang tercoreng, dan SLA yang dilanggar.</p>

      <h2>Apa itu Blue-Green Deployment?</h2>
      <p>Blue-Green adalah strategi deployment di mana Anda menjalankan dua environment identik secara paralel: <strong>Blue</strong> (environment produksi aktif saat ini) dan <strong>Green</strong> (environment baru yang sedang disiapkan).</p>
      <p>Traffic pengguna 100% masih mengarah ke Blue selama Green disiapkan, diuji, dan divalidasi. Saat Green siap, router (load balancer atau DNS) dialihkan dalam hitungan detik. Jika ada masalah, rollback dilakukan dengan membalik router kembali — juga dalam hitungan detik.</p>

      <h2>Tahapan Implementasi Kami</h2>
      <p><strong>Fase 1 — Replikasi Infrastruktur:</strong> Kami membangun environment Green yang identik dengan Blue, termasuk konfigurasi server, variabel environment, dan versi dependencies.</p>
      <p><strong>Fase 2 — Sinkronisasi Database:</strong> Ini bagian paling kritis. Kami menggunakan replikasi database real-time (master-slave atau Galera Cluster untuk MySQL) sehingga data antara Blue dan Green selalu sinkron.</p>
      <p><strong>Fase 3 — Pengujian Menyeluruh:</strong> QA dilakukan penuh di environment Green menggunakan traffic duplikat (shadow traffic) tanpa mempengaruhi pengguna nyata.</p>
      <p><strong>Fase 4 — Cutover:</strong> Pengalihan traffic dilakukan melalui load balancer dalam waktu kurang dari 30 detik. Monitoring intensif dilakukan selama 24 jam pertama.</p>

      <h2>Apa yang Bisa Salah dan Cara Kami Mengatasinya</h2>
      <p>Masalah paling umum adalah schema database yang tidak kompatibel antara aplikasi versi lama dan baru. Solusinya adalah menggunakan <em>expand-contract pattern</em>: menambah kolom baru tanpa menghapus yang lama, lalu clean up setelah migrasi stabil.</p>

      <p>Tertarik mendiskusikan strategi migrasi untuk infrastruktur Anda? <a href="/#audit-form">Hubungi tim kami.</a></p>
    `,
  },
  {
    slug: "audit-keamanan-sistem-enterprise",
    title: "5 Celah Keamanan Paling Sering Kami Temukan saat Audit Sistem Enterprise",
    excerpt: "Dari ratusan audit yang kami lakukan, pola masalah yang sama terus berulang. Apakah sistem Anda sudah bebas dari celah ini?",
    category: "Security",
    date: "18 Maret 2025",
    readingTime: "7 menit",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    content: `
      <p>Setelah melakukan puluhan audit keamanan untuk perusahaan skala menengah hingga enterprise, kami menemukan pola yang konsisten: celah yang sama terus muncul, bukan karena tim IT tidak kompeten, tapi karena mereka tidak punya waktu atau framework yang tepat untuk mendeteksinya.</p>

      <h2>1. Secret Management yang Buruk</h2>
      <p>Database credentials, API keys, dan private keys yang di-hardcode langsung di source code atau di-commit ke repositori (bahkan private repo). Ini adalah celah nomor satu yang kami temukan. Solusinya: gunakan environment variables yang dikelola melalui secrets manager seperti HashiCorp Vault, AWS Secrets Manager, atau bahkan file .env yang di-gitignore dengan benar.</p>

      <h2>2. Tidak Ada Rate Limiting di API</h2>
      <p>API endpoint publik yang tidak memiliki rate limiting rentan terhadap brute force attack (untuk endpoint login) dan credential stuffing. Satu endpoint login tanpa rate limiting bisa diserang dengan jutaan kombinasi password per menit menggunakan botnet sederhana.</p>

      <h2>3. Database yang Terlalu Permissif</h2>
      <p>Satu user database dengan akses penuh (GRANT ALL) yang digunakan oleh semua service. Prinsip least privilege harus diterapkan: setiap service hanya memiliki akses ke tabel yang diperlukan dengan izin minimal (SELECT-only untuk read service, INSERT/UPDATE terbatas untuk write service).</p>

      <h2>4. Tidak Ada Monitoring dan Alerting</h2>
      <p>Sistem yang tidak dimonitor adalah sistem yang tidak Anda ketahui kondisinya. Kami sering menemukan server yang sudah dikompromis berbulan-bulan sebelum klien menyadarinya — hanya karena tidak ada alert untuk login dari IP asing atau lonjakan outbound traffic yang tidak normal.</p>

      <h2>5. SSL/TLS yang Kadaluarsa atau Dikonfigurasi Lemah</h2>
      <p>Sertifikat SSL yang expired, atau konfigurasi yang masih mendukung protokol lama (TLS 1.0/1.1, atau cipher suite lemah). Tools seperti SSL Labs dapat mendeteksi ini dalam hitungan menit, dan penyerang menggunakan tools yang sama.</p>

      <p>Apakah sistem Anda sudah bebas dari kelima celah ini? <a href="/#audit-form">Jadwalkan audit gratis bersama kami.</a></p>
    `,
  },
  {
    slug: "scalability-arsitektur-flash-sale",
    title: "Arsitektur yang Siap Hadapi Flash Sale: Dari 1.000 ke 1 Juta Request per Menit",
    excerpt: "Bagaimana kami mendesain ulang infrastruktur klien e-commerce agar tidak kolaps saat flash sale — tanpa harus meng-upgrade ke server yang jauh lebih mahal.",
    category: "Architecture",
    date: "5 Februari 2025",
    readingTime: "10 menit",
    coverImage: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1200&q=80",
    content: `
      <p>Flash sale adalah ujian sesungguhnya untuk sebuah infrastruktur. Traffic bisa naik 1000x dalam hitungan menit, lalu turun kembali ke normal dalam beberapa jam. Tantangannya: bagaimana merancang sistem yang elastis — scale up cepat saat butuh, tidak boros biaya saat traffic normal.</p>

      <h2>Masalah Awal: Monolith yang Tidak Elastis</h2>
      <p>Klien kami — platform e-commerce dengan ratusan ribu pengguna aktif — menggunakan arsitektur monolith di atas satu VM besar. Saat flash sale pertama mereka, server kolaps di menit ke-3. Semua komponen (web server, payment processing, inventory check, notifikasi) saling berebut resource di satu mesin.</p>

      <h2>Solusi: Decompose dan Distribute</h2>
      <p><strong>1. Pisahkan Read dan Write:</strong> Operasi read (cek stok, lihat produk) dipisah dari write (tambah ke cart, checkout). Read dilayani dari cache layer (Redis) dan read replicas database. Write saja yang menyentuh database primer.</p>
      <p><strong>2. Queue untuk Operasi Non-Kritis:</strong> Notifikasi email, update stok, dan pembuatan invoice dimasukkan ke message queue (RabbitMQ). Tidak ada alasan user harus menunggu email konfirmasi terkirim sebelum halaman checkout selesai loading.</p>
      <p><strong>3. CDN untuk Static Assets:</strong> Semua gambar produk, CSS, dan JavaScript disajikan dari CDN. Ini mengurangi beban origin server 60–70% untuk traffic flash sale.</p>
      <p><strong>4. Auto-scaling:</strong> Web server layer dikonfigurasi dengan auto-scaling policy: tambah instance baru jika CPU melebihi 70% selama 2 menit. Kurangi instance saat traffic normal kembali.</p>

      <h2>Hasilnya</h2>
      <p>Flash sale berikutnya: 0% downtime, response time rata-rata di bawah 200ms bahkan di puncak traffic. Biaya infrastruktur hanya naik selama 4 jam window flash sale, lalu kembali normal.</p>

      <p>Ingin kami review arsitektur Anda sebelum flash sale berikutnya? <a href="/#audit-form">Hubungi kami sekarang.</a></p>
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
