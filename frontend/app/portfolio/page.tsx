import Link from 'next/link';

export const metadata = {
  title: 'Portfolio | StacknScale',
  description: 'Proyek dan karya terpilih dari tim StacknScale — infrastruktur, produk digital, dan sistem enterprise yang telah kami bangun.',
};

type Project = {
  title: string;
  caption: string;
  description: string;
  image: string;       // ← Ganti dengan URL gambar Anda
  link: string;        // ← URL project / case study / demo
  linkLabel: string;
  tags: string[];
  featured?: boolean;
};

// ============================================================
// DATA PORTFOLIO — Ganti image URL dan detail sesuai project Anda
// ============================================================
const projects: Project[] = [
  {
    title: "Migrasi Cloud Fintech Cashplus",
    caption: "Local Cloud Migration · 2024",
    description:
      "Migrasi arsitektur sistem pembayaran dari AWS ke Cloud Lokal. Memangkas biaya operasional 40% tanpa downtime, menggunakan Blue-Green Deployment dan replikasi database real-time.",
    image: "https://placehold.co/800x500/1A1A2E/7C3AED?text=Cashplus+Migration", // ← Ganti URL gambar
    link: "https://cashplus.id",
    linkLabel: "Kunjungi Cashplus",
    tags: ["Cloud Migration", "DevOps", "MySQL Replication"],
    featured: true,
  },
  {
    title: "Infrastruktur Flash Sale Puas.id",
    caption: "Scalable Architecture · 2024",
    description:
      "Redesign total infrastruktur DevOps untuk menangani lonjakan traffic flash sale. Hasil: 0% downtime, response time < 200ms di puncak 1 juta request/menit.",
    image: "https://placehold.co/800x500/1A1A2E/059669?text=Puas.id+Infrastructure", // ← Ganti URL gambar
    link: "https://puas.id",
    linkLabel: "Kunjungi Puas.id",
    tags: ["High Availability", "Auto-scaling", "Redis", "RabbitMQ"],
    featured: true,
  },
  {
    title: "Private Cloud Metroreload",
    caption: "Private Cloud Architecture · 2023",
    description:
      "Konsultasi dan implementasi Private Cloud on-premise. Setup bare-metal server, virtualisasi dengan Proxmox, dan jaringan internal yang aman untuk operasional internal.",
    image: "https://placehold.co/800x500/1A1A2E/F59E0B?text=Metroreload+Private+Cloud", // ← Ganti URL gambar
    link: "https://metroreload.biz",
    linkLabel: "Kunjungi Metroreload",
    tags: ["Private Cloud", "Proxmox", "Bare-metal", "Networking"],
  },
  {
    title: "Audit Keamanan Enterprise System",
    caption: "Cyber Security Audit · 2024",
    description:
      "Audit menyeluruh pada sistem ERP klien enterprise. Ditemukan dan ditutup 12 celah kerentanan kritis. Implementasi standar keamanan kelas perbankan, hasil akhir: Grade A+.",
    image: "https://placehold.co/800x500/1A1A2E/DC2626?text=Security+Audit", // ← Ganti URL gambar
    link: "/#audit-form",
    linkLabel: "Jadwalkan Audit",
    tags: ["Security Audit", "Penetration Testing", "Compliance"],
  },
  {
    title: "Platform SaaS Maxcloud",
    caption: "Product & DevOps · 2023",
    description:
      "Kolaborasi pengembangan platform cloud management Maxcloud. Kontribusi pada pipeline CI/CD, monitoring stack (Grafana + Prometheus), dan optimasi infrastruktur backend.",
    image: "https://placehold.co/800x500/1A1A2E/0EA5E9?text=Maxcloud+Platform", // ← Ganti URL gambar
    link: "https://maxcloud.id",
    linkLabel: "Kunjungi Maxcloud",
    tags: ["CI/CD", "Monitoring", "Grafana", "Kubernetes"],
  },
  {
    title: "Sistem Integrasi Bisnis Multi-Platform",
    caption: "Business Integration · 2024",
    description:
      "Merancang dan mengimplementasikan sistem integrasi antara ERP, CRM, dan platform e-commerce klien. Otomatisasi alur data real-time yang sebelumnya manual.",
    image: "https://placehold.co/800x500/1A1A2E/8B5CF6?text=Business+Integration", // ← Ganti URL gambar
    link: "/#audit-form",
    linkLabel: "Diskusikan Proyek Serupa",
    tags: ["System Integration", "API Gateway", "Automation", "ETL"],
  },
];

const tagColors = [
  'bg-violet-50 text-violet-700 border-violet-200',
  'bg-sky-50 text-sky-700 border-sky-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-rose-50 text-rose-700 border-rose-200',
  'bg-indigo-50 text-indigo-700 border-indigo-200',
];

const stats = [
  { value: "40+", label: "Proyek Selesai" },
  { value: "15+", label: "Klien Aktif" },
  { value: "99.9%", label: "Uptime Rata-Rata" },
  { value: "5 Tahun", label: "Pengalaman" },
];

export default function PortfolioPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1A1A2E]">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 lg:px-12 py-5 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-stone-200/60 sticky top-0 z-50">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#1A1A2E] hover:opacity-75 transition-opacity">
          Stackn<span className="text-violet-600">Scale</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-500">
          <Link href="/blog" className="hover:text-[#1A1A2E] transition-colors">Blog</Link>
          <Link href="/portfolio" className="text-[#1A1A2E] font-semibold">Portfolio</Link>
          <Link href="/#services" className="hover:text-[#1A1A2E] transition-colors">Layanan</Link>
        </nav>
        <Link href="/#audit-form" className="px-5 py-2.5 text-sm font-semibold bg-[#1A1A2E] text-[#F8F7F4] rounded-full hover:bg-violet-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          Konsultasi Gratis
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">

        {/* PAGE HEADER */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Karya Terpilih</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-5">Portfolio StacknScale</h1>
          <p className="text-stone-500 max-w-xl mx-auto text-lg leading-relaxed">
            Proyek nyata yang telah kami kerjakan — dari migrasi cloud, keamanan sistem, hingga arsitektur skala enterprise.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-8 rounded-3xl bg-white border border-stone-100 shadow-sm">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold text-[#1A1A2E] mb-1">{s.value}</div>
              <div className="text-sm text-stone-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* FEATURED PROJECTS */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-8">Proyek Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((project, idx) => (
              <div key={idx} className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-violet-100/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-[#1A1A2E]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/70 text-xs font-medium">{project.caption}</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-violet-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-5 flex-1">{project.description}</p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag, ti) => (
                      <span key={ti} className={`px-2.5 py-0.5 text-[11px] font-semibold border rounded-full ${tagColors[ti % tagColors.length]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Link */}
                  <a
                    href={project.link}
                    target={project.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors group/link"
                  >
                    {project.linkLabel}
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ALL PROJECTS GRID */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-8">Semua Proyek</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, idx) => (
              <div key={idx} className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-violet-100/40 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-[#1A1A2E]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white/60 text-[11px] font-medium">{project.caption}</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-[#1A1A2E] mb-2 group-hover:text-violet-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4 flex-1 line-clamp-3">{project.description}</p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag, ti) => (
                      <span key={ti} className={`px-2.5 py-0.5 text-[10px] font-semibold border rounded-full ${tagColors[ti % tagColors.length]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Link */}
                  <a
                    href={project.link}
                    target={project.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors group/link"
                  >
                    {project.linkLabel}
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 p-10 md:p-14 rounded-3xl bg-[#1A1A2E] text-white text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Wujudkan Proyek Anda</p>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Punya Proyek yang Ingin Kami Kerjakan?</h3>
            <p className="text-stone-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Dari konsultasi awal hingga go-live, kami mendampingi setiap langkah. Mulai dengan sesi konsultasi gratis bersama tim kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#audit-form" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm">
                Mulai Konsultasi Gratis
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-200 text-sm border border-white/20">
                Baca Insights Kami
              </Link>
            </div>
          </div>
        </div>

      </main>

      <footer className="mt-16 border-t border-stone-200 py-8 px-6 text-center text-xs text-stone-400">
        <p>&copy; {new Date().getFullYear()} StacknScale. All rights reserved.</p>
      </footer>
    </div>
  );
}
