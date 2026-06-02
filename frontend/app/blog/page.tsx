import Link from 'next/link';
import { articles } from './data';

const categoryColors: Record<string, string> = {
  Cloud: 'bg-sky-50 text-sky-700 border-sky-200',
  DevOps: 'bg-violet-50 text-violet-700 border-violet-200',
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

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 lg:px-12 py-5 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-stone-200/60 sticky top-0 z-50">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#1A1A2E] hover:opacity-75 transition-opacity">
          Stackn<span className="text-violet-600">Scale</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-500">
          <Link href="/blog" className="text-[#1A1A2E] font-semibold">Blog</Link>
          <Link href="/portfolio" className="hover:text-[#1A1A2E] transition-colors">Portfolio</Link>
          <Link href="/#services" className="hover:text-[#1A1A2E] transition-colors">Layanan</Link>
        </nav>
        <Link href="/#audit-form" className="px-5 py-2.5 text-sm font-semibold bg-[#1A1A2E] text-[#F8F7F4] rounded-full hover:bg-violet-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          Konsultasi Gratis
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">

        {/* PAGE HEADER */}
        <div className="mb-14">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Insights & Perspectives</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-4">Blog StacknScale</h1>
          <p className="text-stone-500 max-w-xl text-lg leading-relaxed">
            Tulisan teknikal dan opini dari tim kami tentang cloud, DevOps, keamanan, dan arsitektur sistem skala enterprise.
          </p>
        </div>

        {/* FEATURED ARTICLE */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-16">
          <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-violet-100/50 hover:-translate-y-1 transition-all duration-300">
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
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] mb-4 leading-tight group-hover:text-violet-700 transition-colors">
                {featured.title}
              </h2>
              <p className="text-stone-500 leading-relaxed mb-6 text-sm md:text-base">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-stone-400 font-medium">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readingTime} baca</span>
                </div>
                <span className="text-sm font-semibold text-violet-600 group-hover:gap-2 flex items-center gap-1 transition-all">
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
                <article className="h-full rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-violet-100/40 hover:-translate-y-1 transition-all duration-300 flex flex-col">
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
                    <h3 className="text-base font-bold text-[#1A1A2E] mb-3 leading-snug group-hover:text-violet-700 transition-colors flex-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-5 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                      <div className="text-xs text-stone-400 font-medium">{article.date} · {article.readingTime}</div>
                      <svg className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Mari Diskusi</p>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Punya Tantangan Serupa?</h3>
            <p className="text-stone-400 mb-7 max-w-lg mx-auto text-sm leading-relaxed">
              Tim StacknScale siap membantu menganalisis kondisi sistem Anda dan merancang solusi yang tepat sasaran.
            </p>
            <Link href="/#audit-form" className="inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm">
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
