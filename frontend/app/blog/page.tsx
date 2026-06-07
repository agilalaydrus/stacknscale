import Link from 'next/link';
import { articles } from './data';

const categoryColors: Record<string, string> = {
  Cloud: 'bg-sky-50 text-sky-700 border-sky-200',
  DevOps: 'bg-blue-50 text-blue-700 border-blue-200',
  Security: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Architecture: 'bg-amber-50 text-amber-700 border-amber-200',
};

export const metadata = {
  title: 'Blog & Insights | StacknScale',
  description: 'Artikel teknikal tentang cloud, DevOps, keamanan sistem, dan arsitektur skala enterprise dari tim StacknScale.',
};

export default function BlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1A1A2E]">

      {/* HEADER — floating glass pill */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
        <div className="flex items-center justify-between gap-4 pl-3 pr-2 py-2 rounded-full border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(11,19,48,0.12)]">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-sky-400/5 group-hover:from-blue-500/20 transition-all">
              <img src="/logo-mark.png" alt="StacknScale" className="w-8 h-8 object-contain" />
            </span>
            <span className="hidden sm:inline-block text-[15px] font-extrabold tracking-tight text-[#0B1330] pr-2">
              Stack<span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-sky-500">n</span>Scale
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
            <Link href="/blog" className="px-3.5 py-2 rounded-full text-[#0B1330] bg-stone-100/70 font-semibold">Blog</Link>
            <Link href="/portfolio" className="px-3.5 py-2 rounded-full hover:text-[#0B1330] hover:bg-stone-100/70 transition-all">Portfolio</Link>
            <Link href="/#services" className="px-3.5 py-2 rounded-full hover:text-[#0B1330] hover:bg-stone-100/70 transition-all">Layanan</Link>
          </nav>
          <Link href="/#audit-form" className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gradient-to-br from-[#0B1330] to-[#1E2647] text-white rounded-full hover:shadow-[0_8px_24px_-6px_rgba(11,19,48,0.5)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Konsultasi</span>
            <svg className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </header>
      <div className="pt-24" />

      <main className="max-w-6xl mx-auto px-6 py-16">

        {/* PAGE HEADER */}
        <div className="mb-14">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Insights & Perspectives</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-4">Blog StacknScale</h1>
          <p className="text-stone-500 max-w-xl text-lg leading-relaxed">
            Tulisan teknikal dan opini dari tim kami tentang cloud, DevOps, keamanan, dan arsitektur sistem skala enterprise.
          </p>
        </div>

        {/* FEATURED ARTICLE */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-16">
          <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300">
            {/* Image */}
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-[#1A1A2E]">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
            </div>
            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className={`px-3 py-1 text-xs font-bold border rounded-full ${categoryColors[featured.category] ?? 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                  {featured.category}
                </span>
                <span className="text-xs text-stone-400 font-medium">Terbaru</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                {featured.title}
              </h2>
              <p className="text-stone-500 leading-relaxed mb-6 text-sm md:text-base">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-stone-400 font-medium">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readingTime} baca</span>
                </div>
                <span className="text-sm font-semibold text-blue-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                  Baca
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* ARTICLE GRID */}
        <div>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-8">Semua Artikel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                <article className="h-full rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/40 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-[#1A1A2E]">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <span className={`self-start px-3 py-1 text-xs font-bold border rounded-full mb-4 ${categoryColors[article.category] ?? 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                      {article.category}
                    </span>
                    <h3 className="text-base font-bold text-[#1A1A2E] mb-3 leading-snug group-hover:text-blue-700 transition-colors flex-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-5 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                      <div className="text-xs text-stone-400 font-medium">{article.date} · {article.readingTime}</div>
                      <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 p-10 rounded-3xl bg-[#1A1A2E] text-white text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Mari Diskusi</p>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Punya Tantangan Serupa?</h3>
            <p className="text-stone-400 mb-7 max-w-lg mx-auto text-sm leading-relaxed">
              Tim StacknScale siap membantu menganalisis kondisi sistem Anda dan merancang solusi yang tepat sasaran.
            </p>
            <Link href="/#audit-form" className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm">
              Mulai Konsultasi Gratis
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-stone-200 py-8 px-6 text-center text-xs text-stone-400">
        <p>&copy; {new Date().getFullYear()} StacknScale. All rights reserved.</p>
      </footer>
    </div>
  );
}
