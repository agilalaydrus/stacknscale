import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Portfolio | StacknScale',
  description: 'Proyek dan karya terpilih dari tim StacknScale — infrastruktur, produk digital, dan sistem enterprise yang telah kami bangun.',
};

type Project = {
  title: string;
  caption: string;
  description: string;
  image: string;
  link: string;
  linkLabel: string;
  tags: string[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Migrasi Cloud Fintech Cashplus",
    caption: "Local Cloud Migration · 2024",
    description:
      "Migrasi arsitektur sistem pembayaran dari AWS ke Cloud Lokal. Memangkas biaya operasional 40% tanpa downtime, menggunakan Blue-Green Deployment dan replikasi database real-time.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    link: "https://cashplus.id",
    linkLabel: "Kunjungi Cashplus",
    tags: ["Cloud Migration", "DevOps", "MySQL Replication"],
    featured: true,
  },
  {
    title: "Infrastruktur Flash Sale Puas.id",
    caption: "Scalable Architecture · 2024",
    description:
      "Redesign total infrastruktur DevOps untuk menangani lonjakan traffic flash sale. Hasil: 0% downtime, response time di bawah 200ms di puncak 1 juta request per menit.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&q=80",
    link: "https://metroreload.biz",
    linkLabel: "Kunjungi Metroreload",
    tags: ["Private Cloud", "Proxmox", "Bare-metal", "Networking"],
  },
  {
    title: "Audit Keamanan Enterprise System",
    caption: "Cyber Security Audit · 2024",
    description:
      "Audit menyeluruh pada sistem ERP klien enterprise. Ditemukan dan ditutup 12 celah kerentanan kritis. Implementasi standar keamanan kelas perbankan, hasil akhir: Grade A+.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    link: "/#audit-form",
    linkLabel: "Jadwalkan Audit",
    tags: ["Security Audit", "Penetration Testing", "Compliance"],
  },
  {
    title: "Platform SaaS Maxcloud",
    caption: "Product & DevOps · 2023",
    description:
      "Kolaborasi pengembangan platform cloud management Maxcloud. Kontribusi pada pipeline CI/CD, monitoring stack (Grafana + Prometheus), dan optimasi infrastruktur backend.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    link: "https://maxcloud.id",
    linkLabel: "Kunjungi Maxcloud",
    tags: ["CI/CD", "Monitoring", "Grafana", "Kubernetes"],
  },
  {
    title: "Sistem Integrasi Bisnis Multi-Platform",
    caption: "Business Integration · 2024",
    description:
      "Merancang dan mengimplementasikan sistem integrasi antara ERP, CRM, dan platform e-commerce klien. Otomatisasi alur data real-time yang sebelumnya dikerjakan secara manual.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    link: "/#audit-form",
    linkLabel: "Diskusikan Proyek Serupa",
    tags: ["System Integration", "API Gateway", "Automation", "ETL"],
  },
];

const tagColors = [
  'bg-blue-50 text-blue-700 border-blue-200',
  'bg-sky-50 text-sky-700 border-sky-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-rose-50 text-rose-700 border-rose-200',
  'bg-sky-50 text-sky-700 border-sky-200',
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
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto px-4 md:px-6 py-3 bg-white border-b border-stone-200 shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-mark.png" alt="StacknScale" width={28} height={28} className="w-7 h-7 object-contain" priority />
            <span className="text-[15px] font-extrabold tracking-tight text-[#0B1330]">
              Stack<span className="text-blue-600">n</span>Scale
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
            <Link href="/blog" className="px-3 py-1.5 hover:text-[#0B1330] transition-colors">Blog</Link>
            <Link href="/portfolio" className="px-3 py-1.5 text-[#0B1330] font-bold">Portfolio</Link>
            <Link href="/#services" className="px-3 py-1.5 hover:text-[#0B1330] transition-colors">Layanan</Link>
          </nav>
          <Link href="/#audit-form" className="inline-flex items-center px-5 py-2 text-sm font-semibold bg-[#0B1330] text-white rounded-lg hover:bg-blue-700 transition-colors">
            Konsultasi
          </Link>
        </div>
      </header>
      <div className="pt-16" />

      <main className="max-w-6xl mx-auto px-6 py-16">

        {/* PAGE HEADER */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Karya Terpilih</p>
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
              <div key={idx} className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
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
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-blue-700 transition-colors">
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
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group/link"
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
              <div key={idx} className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/40 hover:-translate-y-1 transition-all duration-300 flex flex-col">
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
                  <h3 className="text-base font-bold text-[#1A1A2E] mb-2 group-hover:text-blue-700 transition-colors">
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
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group/link"
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
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Wujudkan Proyek Anda</p>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Punya Proyek yang Ingin Kami Kerjakan?</h3>
            <p className="text-stone-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Dari konsultasi awal hingga go-live, kami mendampingi setiap langkah. Mulai dengan sesi konsultasi gratis bersama tim kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#audit-form" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm">
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
