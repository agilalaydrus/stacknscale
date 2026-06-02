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
  DevOps: 'bg-violet-50 text-violet-700 border-violet-200',
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
        <p className="text-lg text-stone-600 leading-relaxed mb-10 font-medium border-l-4 border-violet-400 pl-5 italic">
          {article.excerpt}
        </p>

        {/* ARTICLE CONTENT */}
        <div
          className="prose prose-stone prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-[#1A1A2E]
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-stone-600 prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-[#1A1A2E]
            prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
            prose-em:text-stone-500"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* DIVIDER */}
        <div className="my-14 border-t border-stone-200" />

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-[#1A1A2E] text-white text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Mari Diskusi</p>
            <h3 className="text-xl font-extrabold mb-2">Punya Tantangan Serupa?</h3>
            <p className="text-stone-400 mb-6 text-sm">Tim StacknScale siap membantu.</p>
            <Link href="/#audit-form" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-500 hover:-translate-y-0.5 transition-all text-sm">
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
                    <h4 className="text-sm font-bold text-[#1A1A2E] leading-snug group-hover:text-violet-700 transition-colors">{rel.title}</h4>
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
