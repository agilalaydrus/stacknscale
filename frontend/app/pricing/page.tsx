import Link from "next/link";
import Image from "next/image";
import PricingTabs from "./components/PricingTabs";

const ADDON_PRODUCTS = [
  { name: "Instant App", desc: "Deploy aplikasi web dengan cepat dan mudah. WordPress, Node.js, Laravel, dan lainnya siap dalam hitungan menit.", price: "Rp 200.000", icon: "rocket", tags: ["1-Click Deploy", "Auto Config"] },
  { name: "Load Balancer", desc: "Distribusi traffic yang optimal untuk aplikasi Anda. Auto health-check dan failover otomatis.", price: "Rp 150.000", icon: "balance", tags: ["Auto Failover", "Health Check"] },
  { name: "Object Storage", desc: "Penyimpanan file yang scalable dan aman. Kompatibel dengan S3 API untuk integrasi mudah.", price: "Rp 50.000", icon: "storage", tags: ["S3 Compatible", "Unlimited Scale"] },
  { name: "Block Storage", desc: "Storage tambahan yang bisa dipasang ke server Anda. SSD/NVMe performance untuk database dan aplikasi berat.", price: "Rp 40.000", icon: "hdd", tags: ["NVMe Ready", "Hot Attach"] },
];

const PLATFORM_FEATURES = [
  { name: "Multiclass Compute", desc: "Pilih performa sesuai kebutuhan dengan opsi CPU Intel atau AMD, dan storage HDD/SSD. Upgrade, downgrade, atau ganti hardware kapan saja tanpa migrasi manual.", tags: ["Kinerja Fleksibel", "Upgrade Instan"] },
  { name: "Flexible Connection (Floating IP)", desc: "Pindahkan IP publik antar VM untuk mendukung High Availability dan migrasi cepat tanpa downtime.", tags: ["Tanpa Downtime", "Migrasi Cepat"] },
  { name: "Custom Private Network", desc: "Buat lebih dari satu private network untuk mengatur topologi internal sesuai kebutuhan aplikasi Anda.", tags: ["Jaringan Tertutup", "Multi-VPC"] },
  { name: "Snapshot & Backup", desc: "Backup manual atau terjadwal, dan restore dalam satu klik dengan snapshot. Data selalu aman dan recoverable.", tags: ["Pulihkan Sekejap", "Data Terlindungi"] },
  { name: "Firewall Management", desc: "Kelola rule inbound dan outbound langsung dari dashboard tanpa konfigurasi manual. Kontrol penuh keamanan.", tags: ["Kontrol Penuh", "Keamanan Maksimal"] },
  { name: "SSH Key & Console Access", desc: "Login aman tanpa password dengan SSH key dan akses penuh melalui console web untuk kontrol langsung server.", tags: ["Akses Aman", "Kontrol Langsung"] },
  { name: "OS & Template Marketplace", desc: "Deploy berbagai OS (Ubuntu, Debian, AlmaLinux, Rocky, Windows) serta template aplikasi populer dalam hitungan detik.", tags: ["Instalasi Cepat", "Pilihan Luas"] },
  { name: "Monitoring & Alerting", desc: "Pantau resource (CPU, RAM, I/O, network) secara real-time dari dashboard. Notifikasi otomatis saat ada anomali.", tags: ["Data Real-Time", "Notifikasi Langsung"] },
  { name: "API & Terraform", desc: "API lengkap dan dukungan Terraform untuk otomatisasi provisioning, konfigurasi, dan scaling infrastruktur.", tags: ["Full Automation", "IaC Ready"] },
  { name: "Multiple Data Center", desc: "Pilih lokasi data center terdekat untuk mengurangi latensi dan meningkatkan performa aplikasi.", tags: ["Latensi Rendah", "Redundansi Lokasi"] },
];

function FeatureIcon({ type }: { type: string }) {
  const base = "w-5 h-5";
  const paths: Record<string, string> = {
    rocket: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    balance: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    storage: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
    hdd: "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
  };
  return <svg className={base} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={paths[type] || "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"} /></svg>;
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0B1330] font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      {/* Ambient backdrop */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-[10%] w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full bg-blue-200/40 blur-[80px] md:blur-[120px] animate-float-slow" />
        <div className="absolute top-[30%] right-[5%] w-[260px] h-[260px] md:w-[420px] md:h-[420px] rounded-full bg-sky-200/30 blur-[80px] md:blur-[120px] animate-float-slow-2" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative flex items-center justify-between gap-4 max-w-7xl mx-auto px-4 md:px-6 py-3 bg-white border-b border-stone-200 shadow-sm">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo-mark.png" alt="StacknScale" width={28} height={28} className="w-7 h-7 object-contain" priority />
            <span className="text-[15px] font-extrabold tracking-tight text-[#0B1330]">
              Stack<span className="text-blue-600">n</span>Scale
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
            <Link href="/" className="px-3 py-1.5 hover:text-[#0B1330] transition-colors">Home</Link>
            <Link href="/pricing" className="px-3 py-1.5 text-[#0B1330] font-bold transition-colors">Pricing</Link>
            <Link href="/portfolio" className="px-3 py-1.5 hover:text-[#0B1330] transition-colors">Portfolio</Link>
            <Link href="/blog" className="px-3 py-1.5 hover:text-[#0B1330] transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href="https://wa.me/6281283031003" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center px-5 py-2 text-sm font-semibold bg-[#0B1330] text-white rounded-lg hover:bg-blue-700 transition-colors">
              Hubungi Kami
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-12 px-6 max-w-4xl mx-auto text-center">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Pricing</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A1A2E] mb-4">Harga yang Transparan</h1>
        <p className="text-stone-500 text-lg max-w-2xl mx-auto">Pilih layanan sesuai kebutuhan bisnis Anda. Tanpa biaya tersembunyi.</p>
      </section>

      {/* Dynamic pricing tabs */}
      <PricingTabs />

      {/* Additional Products */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Add-On Services</p>
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">Produk Tambahan</h2>
          <p className="text-stone-500 text-sm max-w-xl mx-auto">Lengkapi infrastruktur Anda dengan layanan tambahan yang bisa diaktifkan kapan saja.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ADDON_PRODUCTS.map((product, i) => (
            <div key={i} className="group p-6 rounded-2xl bg-white border border-stone-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:from-blue-100 group-hover:to-sky-100 transition-colors">
                  <FeatureIcon type={product.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#1A1A2E] mb-1">{product.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.tags.map((tag, j) => (
                      <span key={j} className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed mb-3">{product.desc}</p>
                  <p className="text-sm font-bold text-[#1A1A2E]">Start from <span className="text-blue-600">{product.price}</span><span className="text-stone-400 font-normal text-xs">/bulan</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Features */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 rounded-full mb-4">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Fitur
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-4 leading-tight">Lebih dari Sekedar Cloud</h2>
            <p className="text-stone-500 leading-relaxed mb-6">Layanan lengkap yang dirancang untuk mendukung bisnis Anda. Dari compute hingga security, semua tersedia dalam satu platform.</p>
            <a href="https://wa.me/6281283031003" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A2E] text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors">
              Pelajari Lebih Lanjut
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </a>
          </div>
          <div className="lg:col-span-3 space-y-4">
            {PLATFORM_FEATURES.map((feat, i) => (
              <div key={i} className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-sky-50 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">{String(i + 1).padStart(2, '0')}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#1A1A2E] mb-1.5">{feat.name}</h4>
                    <div className="flex flex-wrap gap-3 mb-2">{feat.tags.map((tag, j) => (<span key={j} className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" />{tag}</span>))}</div>
                    <p className="text-xs text-stone-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
        <div className="p-10 rounded-3xl bg-[#1A1A2E] text-white">
          <h2 className="text-2xl font-bold mb-3">Butuh solusi yang lebih spesifik?</h2>
          <p className="text-stone-400 mb-6 text-sm">Tim kami siap bantu rancang arsitektur dan hitung budget yang pas untuk kebutuhan Anda.</p>
          <a href="https://wa.me/6281283031003" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-sm transition-colors">
            Konsultasi Gratis
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] text-white pt-12 pb-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo-mark-white.png" alt="StacknScale" width={32} height={32} className="h-8 w-auto" />
            <span className="text-sm font-bold">StacknScale</span>
          </div>
          <p className="text-stone-500 text-xs">&copy; 2025 StacknScale. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
