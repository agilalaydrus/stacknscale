import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '../data';

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | StacknScale Blog`,
    description: article.excerpt,
  };
}

const categoryColors: Record<string, string> = {
  Cloud: 'bg-sky-50 text-sky-700 border-sky-200',
  DevOps: 'bg-blue-50 text-blue-700 border-blue-200',
  Security: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Architecture: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

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
          <Link href="/#audit-form" className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gradient-to-br from-[#0B1330] to-[#1E2647] text-white rounded-full hover:shadow-[0_8px_24px_-6px_rgba(11,19,48,0.5)] hover:-translate-y-0.5 transition-all duration-300">
            <span>Konsultasi</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </header>
      <div className="pt-24" />

      <main className="max-w-3xl mx-auto px-6 py-16">

        {/* BACK */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-[#1A1A2E] transition-colors mb-10 group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Kembali ke Blog
        </Link>

        {/* ARTICLE HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className={`px-3 py-1 text-xs font-bold border rounded-full ${categoryColors[article.category] ?? 'bg-stone-50 text-stone-600 border-stone-200'}`}>
              {article.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] leading-tight mb-5">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-stone-400 font-medium">
            <span>StacknScale Team</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readingTime} baca</span>
          </div>
        </div>

        {/* COVER IMAGE */}
        <div className="rounded-2xl overflow-hidden mb-10 aspect-video bg-[#1A1A2E]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* EXCERPT */}
        <p className="text-lg text-stone-600 leading-relaxed mb-10 font-medium border-l-4 border-blue-400 pl-5 italic">
          {article.excerpt}
        </p>

        {/* ARTICLE CONTENT */}
        <div
          className="prose prose-stone prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-[#1A1A2E]
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-stone-600 prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-[#1A1A2E]
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-em:text-stone-500"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* DIVIDER */}
        <div className="my-14 border-t border-stone-200" />

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-[#1A1A2E] text-white text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Mari Diskusi</p>
            <h3 className="text-xl font-extrabold mb-2">Punya Tantangan Serupa?</h3>
            <p className="text-stone-400 mb-6 text-sm">Tim StacknScale siap membantu.</p>
            <Link href="/#audit-form" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 hover:-translate-y-0.5 transition-all text-sm">
              Konsultasi Gratis
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <div className="mt-14">
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-6">Artikel Lainnya</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="aspect-video overflow-hidden bg-[#1A1A2E]">
                    <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className={`inline-block px-2.5 py-0.5 text-[11px] font-bold border rounded-full mb-3 ${categoryColors[rel.category] ?? 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#1A1A2E] leading-snug group-hover:text-blue-700 transition-colors">{rel.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <footer className="mt-16 border-t border-stone-200 py-8 px-6 text-center text-xs text-stone-400">
        <p>&copy; {new Date().getFullYear()} StacknScale. All rights reserved.</p>
      </footer>
    </div>
  );
}
