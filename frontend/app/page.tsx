"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function StacknScaleLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      problem: formData.get('problem'),
    };
    try {
      const response = await fetch('http://localhost:8080/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Gagal menghubungi server:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerLogos = [
    { name: "Maxcloud", url: "https://maxcloud.id/icon/logo-container.svg" },
    { name: "Cashplus", url: "https://cashplus.id/assets/logo-cashplus-2.svg" },
    { name: "Puas.id", url: "https://puas.id/image/logo.png" },
    { name: "Metroreload", url: "https://metroreload.biz/assets/icon-metro.svg" },
  ];
  const marqueeItems = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  const faqs = [
    { q: "Berapa lama proses Audit IT?", a: "Tergantung skala infrastruktur. Untuk perusahaan menengah, biasanya 1 sampai 2 minggu kerja. Hasilnya berupa laporan kerentanan lengkap dan rekomendasi perbaikan." },
    { q: "Migrasi cloud bikin downtime gak?", a: "Kami pakai Blue-Green Deployment, jadi migrasi jalan paralel di background. Downtime bisa ditekan sampai nyaris nol." },
    { q: "StacknScale cuma untuk perusahaan besar?", a: "Tidak. Kami juga banyak kerja bareng startup yang lagi growth dan butuh fondasi sistem yang kuat sebelum traffic melonjak." },
  ];

  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
        </svg>
      ),
      title: "IT & Application Audit",
      desc: "Cek kondisi sistem Anda sekarang. Kami temukan celah keamanan, bottleneck performa, dan bagian yang boros resource.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      ),
      title: "Local Cloud Migration",
      desc: "Pindah dari AWS/GCP ke cloud lokal tanpa drama. Performa tetap oke, tagihan bulanan bisa turun sampai 40%.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>
      ),
      title: "Private Cloud Architecture",
      desc: "Butuh cloud sendiri? Kami bantu dari konsultasi, pengadaan server, sampai setup arsitektur yang jalan di data center Anda.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "DevOps & Cyber Security",
      desc: "CI/CD pipeline, container orchestration, penetration testing, dan monitoring. Sistem Anda jalan otomatis dan tetap aman.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
      title: "Project & Product Management",
      desc: "Kami kawal dari planning sampai delivery. Biar project gak molor, budget gak bengkak, dan hasilnya sesuai kebutuhan.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      title: "Business Analysis & Development",
      desc: "Analisis proses bisnis, cari peluang efisiensi, dan susun roadmap pertumbuhan. Teknologi jadi pengungkit, bukan beban.",
    },
  ];

  const caseStudies = [
    { tag: "Fintech / PPOB", title: "Migrasi Payment Gateway ke Cloud Lokal", metric: "37%", metricLabel: "Hemat Biaya Bulanan", desc: "Sistem payment processing dipindah dari AWS ke cloud lokal. Latency tetap di bawah 50ms, compliance data lokal terpenuhi." },
    { tag: "PPOB / Telco", title: "Optimasi Database Transaksi Realtime", metric: "68%", metricLabel: "Response Time Turun", desc: "Tuning PostgreSQL dan Redis caching untuk jutaan transaksi pulsa dan tagihan harian. Response dari 1.2s jadi 380ms di peak hour." },
    { tag: "Digital Platform", title: "Arsitektur Multi-Tenant SaaS", metric: "5x", metricLabel: "Kapasitas Tenant Naik", desc: "Redesign platform digital dari single-tenant ke multi-tenant. Satu infrastruktur bisa handle 5x lebih banyak klien tanpa tambah server." },
    { tag: "Logistics / SaaS", title: "Rebuild Monolith ke Microservices", metric: "4x", metricLabel: "Lebih Cepat Deploy", desc: "Pecah sistem monolith platform logistik jadi microservices. Deploy cycle dari 2 jam jadi 30 menit, rollback otomatis." },
    { tag: "Enterprise", title: "Audit Keamanan Sistem Internal", metric: "23", metricLabel: "Celah Ditemukan & Ditutup", desc: "Full security audit untuk sistem ERP internal. Ditemukan 23 vulnerability termasuk 4 kritikal, semua di-patch dalam 2 minggu." },
    { tag: "Healthcare", title: "Private Cloud Rekam Medis", metric: "100%", metricLabel: "Compliance Terpenuhi", desc: "Setup private cloud on-premise untuk rumah sakit. Data pasien tetap di jaringan internal, comply regulasi kesehatan Indonesia." },
    { tag: "Pendidikan", title: "Infrastruktur E-Learning Scalable", metric: "15rb", metricLabel: "User Concurrent", desc: "Bangun infrastruktur LMS yang kuat handle 15.000 mahasiswa online bersamaan saat ujian. Auto-scale saat peak, hemat saat idle." },
    { tag: "Retail / POS", title: "Migrasi Sistem POS ke Cloud", metric: "99.9%", metricLabel: "Uptime Tercapai", desc: "Migrasi sistem point-of-sale 200+ outlet dari server fisik ke cloud. Sinkronisasi data realtime antar cabang, downtime nyaris nol." },
    { tag: "Startup", title: "Setup DevOps dari Nol", metric: "80%", metricLabel: "Waktu Deploy Berkurang", desc: "Implementasi CI/CD pipeline, container orchestration, dan monitoring untuk startup yang baru scale. Dari deploy manual ke fully automated." },
    { tag: "Media / Publishing", title: "CDN & Caching untuk Portal Berita", metric: "3x", metricLabel: "Page Load Lebih Cepat", desc: "Optimasi arsitektur portal berita dengan CDN lokal dan edge caching. Handle traffic spike saat breaking news tanpa lambat." },
    { tag: "Manufaktur", title: "Integrasi IoT & Dashboard Monitoring", metric: "24/7", metricLabel: "Monitoring Realtime", desc: "Koneksi 500+ sensor IoT pabrik ke dashboard monitoring realtime. Alert otomatis kalau ada anomali produksi, data tersimpan aman di cloud." },
    { tag: "Government", title: "Dedicated Server untuk Sistem Publik", metric: "50jt+", metricLabel: "Request/bulan Terlayani", desc: "Setup dedicated server untuk layanan publik online. Full isolasi, compliance keamanan pemerintah, dan backup multi-lokasi data center." },
  ];

  const stats = [
    { value: "40+", label: "Klien Terlayani" },
    { value: "99.9%", label: "Uptime Rata-Rata" },
    { value: "7+", label: "Tahun Pengalaman" },
    { value: "24/7", label: "Support & Monitoring" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0B1330] font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">

      {/* AMBIENT BACKDROP — soft floating aurora orbs */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-[10%] w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full bg-blue-200/40 blur-[80px] md:blur-[120px] animate-float-slow" />
        <div className="absolute top-[30%] right-[5%] w-[260px] h-[260px] md:w-[420px] md:h-[420px] rounded-full bg-sky-200/30 blur-[80px] md:blur-[120px] animate-float-slow-2" />
        <div className="absolute top-[70%] left-[20%] w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full bg-blue-100/50 blur-[80px] md:blur-[120px] animate-float-slow" />
      </div>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/6281283031003"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_10px_40px_-10px_rgba(37,211,102,0.6)] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
        aria-label="Chat WhatsApp"
      >
        <span className="absolute w-full h-full bg-[#25D366] rounded-full animate-pulse opacity-30 -z-10"></span>
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z" />
        </svg>
      </a>

      {/* MOBILE MENU */}
      {/* Mobile menu — always mounted, animated via CSS */}
      <div className={`fixed inset-0 z-[60] transition-all duration-300 ${mobileMenuOpen ? "visible" : "invisible pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-72 h-full bg-white shadow-2xl p-6 flex flex-col transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button onClick={() => setMobileMenuOpen(false)} className="self-end mb-8 p-2 rounded-full hover:bg-stone-100 transition-colors">
            <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <nav className="flex flex-col gap-2">
            {[
              { href: "#services", label: "Layanan" },
              { href: "/pricing", label: "Pricing", isLink: true },
              { href: "/portfolio", label: "Portfolio", isLink: true },
              { href: "/blog", label: "Blog", isLink: true },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              item.isLink ? (
                <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-[#1A1A2E] font-medium hover:bg-stone-50 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-[#1A1A2E] font-medium hover:bg-stone-50 transition-colors">
                  {item.label}
                </a>
              )
            ))}
          </nav>
          <div className="mt-auto">
            <a href="#audit-form" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 bg-[#1A1A2E] text-white font-semibold rounded-xl text-sm">
              Konsultasi
            </a>
          </div>
        </div>
      </div>

      {/* HEADER — floating glass pill */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
        <div className="relative flex items-center justify-between gap-4 pl-3 pr-2 py-2 rounded-full border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(11,19,48,0.12)]">
          {/* Left: logo */}
          <a href="#" className="flex items-center gap-2 group flex-shrink-0">
            <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-sky-400/5 group-hover:from-blue-500/20 group-hover:to-sky-400/10 transition-all">
              <Image src="/logo-mark.png" alt="StacknScale" width={32} height={32} className="w-8 h-8 object-contain" priority />
            </span>
            <span className="hidden sm:inline-block text-[15px] font-extrabold tracking-tight text-[#0B1330] pr-2">
              Stack<span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-sky-500">n</span>Scale
            </span>
          </a>

          {/* Center: brand name on mobile, nav on desktop */}
          <span className="sm:hidden text-[15px] font-extrabold tracking-tight text-[#0B1330] absolute left-1/2 -translate-x-1/2">
            Stack<span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-sky-500">n</span>Scale
          </span>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
            {[
              { href: "#services", label: "Layanan" },
              { href: "/pricing", label: "Pricing", isLink: true },
              { href: "/portfolio", label: "Portfolio", isLink: true },
              { href: "/blog", label: "Blog", isLink: true },
              { href: "/content", label: "Content", isLink: true },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              item.isLink ? (
                <Link key={item.label} href={item.href} className="relative px-3.5 py-2 rounded-full hover:text-[#0B1330] hover:bg-stone-100/70 transition-all duration-200">
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className="relative px-3.5 py-2 rounded-full hover:text-[#0B1330] hover:bg-stone-100/70 transition-all duration-200">
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href="#audit-form" className="hidden sm:inline-flex group relative items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gradient-to-br from-[#0B1330] to-[#1E2647] text-white rounded-full hover:shadow-[0_8px_24px_-6px_rgba(11,19,48,0.5)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Konsultasi</span>
              <svg className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
            </a>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2.5 rounded-full hover:bg-stone-100 transition-colors">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-40 pb-28 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[11px] font-semibold tracking-[0.18em] text-blue-700 uppercase bg-white/70 backdrop-blur border border-blue-100 rounded-full shadow-sm">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-blue-500 opacity-60 animate-pulse" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-blue-500" />
          </span>
          IT &amp; Cloud Consulting Partner
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-[-0.03em] mb-7 text-[#0B1330] leading-[1.02]">
          Stack the tech.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400">
            Scale the business.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-stone-500 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
          Konsultan IT yang bantu bisnis Anda punya infrastruktur kuat,
          biaya cloud yang masuk akal, dan sistem yang siap scale kapan saja.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#audit-form" className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-gradient-to-br from-[#0B1330] to-[#1E2647] text-white rounded-2xl hover:shadow-[0_20px_50px_-12px_rgba(11,19,48,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Mulai Audit IT Sekarang</span>
            <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700" />
          </a>
          <a href="#portfolio" className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-stone-600 hover:text-[#0B1330] transition-colors">
            Lihat Case Studies
            <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-10 border-y border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold text-[#1A1A2E] mb-1">{s.value}</div>
              <div className="text-sm text-stone-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="py-14 border-b border-[#1A1A2E]/10 bg-[#1A1A2E] overflow-hidden">
        <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-10 text-center px-6">
          Dipercaya oleh
        </p>
        <div className="w-full relative flex overflow-hidden items-center min-h-[72px]">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1A1A2E] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1A1A2E] to-transparent z-10 pointer-events-none" />
          <div className="flex w-max animate-marquee gap-20 md:gap-32 items-center px-8">
            {marqueeItems.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center hover:scale-110 transition-transform duration-300 min-w-[120px]">
                <img
                  src={partner.url}
                  alt={partner.name}
                  className="h-9 md:h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = `<span class="text-stone-400 font-bold text-xl tracking-tight">${partner.name}</span>`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-24 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Apa yang kami lakukan</p>
          <h2 className="text-4xl font-bold text-[#1A1A2E] mb-4">Layanan End-to-End</h2>
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">Satu tim untuk semua kebutuhan IT Anda, dari audit sampai eksekusi.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl bg-white border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-1.5 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="portfolio" className="px-6 pb-24 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-4xl font-bold text-[#1A1A2E] mb-4">Dampak Nyata yang Kami Berikan</h2>
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">Bukan janji kosong. Ini hasil kerja nyata bersama klien kami.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {caseStudies.map((item, idx) => (
            <div key={idx} className="group p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="inline-block px-2.5 py-1 mb-4 text-[10px] font-semibold tracking-wider text-stone-500 uppercase bg-stone-100 rounded-full">
                {item.tag}
              </span>
              <h3 className="text-sm font-semibold text-[#1A1A2E] mb-3 leading-snug">{item.title}</h3>
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span className="text-3xl font-extrabold text-[#1A1A2E]">{item.metric}</span>
              </div>
              <p className="text-xs font-medium text-blue-600 mb-3">{item.metricLabel}</p>
              <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS / HOW IT WORKS */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Cara Kami Bekerja</p>
          <h2 className="text-4xl font-bold text-[#1A1A2E] mb-4">Proses yang Sederhana</h2>
          <p className="text-stone-500 max-w-xl mx-auto">Tiga langkah. Tanpa ribet.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Konsultasi & Audit", desc: "Ceritakan kondisi sistem Anda. Kami audit, temukan masalahnya, dan kasih rekomendasi yang actionable." },
            { step: "02", title: "Rancang Solusi", desc: "Tim kami bikin arsitektur yang pas untuk kebutuhan dan budget Anda. Bukan over-engineering, bukan juga asal jadi." },
            { step: "03", title: "Eksekusi & Support", desc: "Kami eksekusi sampai live, lalu tetap standby untuk monitoring dan support 24/7." },
          ].map((step, idx) => (
            <div key={idx} className="relative p-8 rounded-3xl bg-white border border-stone-100 shadow-sm">
              <div className="text-6xl font-extrabold text-stone-100 mb-4 select-none">{step.step}</div>
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{step.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 pb-24 max-w-3xl mx-auto scroll-mt-20">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-[#1A1A2E] mb-4">Pertanyaan Umum</h2>
          <p className="text-stone-500">Yang sering ditanya sebelum mulai kerja bareng.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 text-left font-semibold text-[#1A1A2E] flex justify-between items-center hover:bg-stone-50 focus:outline-none transition-colors"
              >
                <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                <span className={`text-blue-500 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-stone-500 text-sm leading-relaxed border-t border-stone-100 pt-4">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section id="audit-form" className="px-6 pb-24 max-w-3xl mx-auto scroll-mt-20">
        <div className="relative p-8 md:p-12 rounded-3xl bg-white border border-stone-100 shadow-2xl shadow-stone-200/50 overflow-hidden">
          {/* Decorative corner orb */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-100/80 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-sky-50/80 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center mb-10">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Mari Mulai</p>
            <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-3">Konsultasikan Bisnis Anda</h2>
            <p className="text-stone-500">Isi detail di bawah ini dan kami akan menghubungi Anda via WhatsApp dalam 1x24 jam.</p>
          </div>

          {submitStatus === 'success' ? (
            <div className="p-10 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-emerald-900 font-bold mb-2 text-xl">Permintaan Diterima!</h4>
              <p className="text-emerald-700 text-sm">Tim StacknScale akan segera menghubungi Anda melalui WhatsApp yang terdaftar.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1A1A2E]">Nama Lengkap</label>
                  <input required name="name" type="text" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-[#1A1A2E] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition-all" placeholder="Budi Santoso" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1A1A2E]">Email Profesional</label>
                  <input required name="email" type="email" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-[#1A1A2E] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition-all" placeholder="budi@perusahaan.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1A1A2E]">Instansi / Perusahaan</label>
                  <input required name="company" type="text" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-[#1A1A2E] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition-all" placeholder="PT Sukses Makmur" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1A1A2E]">Nomor WhatsApp Aktif</label>
                  <input required name="whatsapp" type="tel" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-[#1A1A2E] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition-all" placeholder="081234567890" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#1A1A2E]">Ceritakan Kebutuhan Utama Anda</label>
                <textarea required name="problem" rows={4} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-[#1A1A2E] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition-all resize-none" placeholder="Apakah Anda butuh audit, migrasi cloud untuk hemat biaya, atau pembangunan sistem baru? Ceritakan kondisi saat ini..."></textarea>
              </div>

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 text-center">
                  Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung via WhatsApp.
                </div>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#1A1A2E] hover:bg-blue-700 text-white font-bold rounded-xl py-4 text-sm transition-all duration-200 disabled:opacity-50 hover:shadow-xl hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mengirim Permintaan...
                  </span>
                ) : 'Kirim Permintaan Konsultasi →'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A2E] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
            <div>
              <div className="mb-4">
                <Image src="/logo-white.png" alt="StacknScale" width={56} height={56} className="h-14 w-auto" />
              </div>
              <p className="text-stone-400 text-sm max-w-xs leading-relaxed">Konsultan IT yang ngerti bisnis. Bukan cuma teknis.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-sm">
              <div>
                <p className="font-semibold text-stone-300 mb-3">Hubungi Kami</p>
                <div className="flex flex-col gap-2">
                  <a href="mailto:agilalidrus89@gmail.com" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    agilalidrus89@gmail.com
                  </a>
                  <a href="https://wa.me/6281283031003" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z" />
                    </svg>
                    081283031003
                  </a>
                  <a href="https://instagram.com/stacknscale.id" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    @stacknscale.id
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-xs">
            <p>&copy; {new Date().getFullYear()} StacknScale. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
