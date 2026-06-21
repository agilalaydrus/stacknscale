"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contentItems, type Platform } from './data';

const platformConfig = {
  tiktok: {
    label: 'TikTok',
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    badge: 'bg-pink-100 text-pink-700',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
      </svg>
    ),
  },
  instagram: {
    label: 'Instagram Reels',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    badge: 'bg-purple-100 text-purple-700',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  youtube: {
    label: 'YouTube',
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
    badge: 'bg-red-100 text-red-700',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
};

type FilterType = 'all' | Platform;

export default function ContentPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? contentItems : contentItems.filter(c => c.platform === filter);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0B1330] font-sans">

      {/* AMBIENT */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-[10%] w-[480px] h-[480px] rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute top-[30%] right-[5%] w-[420px] h-[420px] rounded-full bg-sky-200/30 blur-[120px]" />
      </div>

      {/* HEADER — floating glass pill */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
        <div className="flex items-center justify-between gap-4 pl-3 pr-2 py-2 rounded-full border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(11,19,48,0.12)]">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-sky-400/5 group-hover:from-blue-500/20 group-hover:to-sky-400/10 transition-all">
              <Image src="/logo-mark.png" alt="StacknScale" width={32} height={32} className="w-8 h-8 object-contain" priority />
            </span>
            <span className="hidden sm:inline-block text-[15px] font-extrabold tracking-tight text-[#0B1330] pr-2">
              Stack<span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-sky-500">n</span>Scale
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
            {[
              { href: '/#services', label: 'Layanan' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/blog', label: 'Blog' },
              { href: '/content', label: 'Content' },
              { href: '/#faq', label: 'FAQ' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="relative px-3.5 py-2 rounded-full hover:text-[#0B1330] hover:bg-stone-100/70 transition-all duration-200">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/#audit-form" className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gradient-to-br from-[#0B1330] to-[#1E2647] text-white rounded-full hover:shadow-[0_8px_24px_-6px_rgba(11,19,48,0.5)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Konsultasi</span>
            <svg className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-40 pb-16 px-6 max-w-4xl mx-auto text-center">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Content Hub</p>
        <h1 className="text-5xl font-extrabold tracking-tight text-[#0B1330] mb-5">
          Konten <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-sky-400">StacknScale</span>
        </h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto leading-relaxed">
          Tips IT, insight teknologi, dan behind-the-scenes — tersebar di semua platform.
        </p>
      </section>

      {/* FILTER */}
      <div className="flex justify-center gap-2 px-6 mb-12 flex-wrap">
        {(['all', 'tiktok', 'instagram', 'youtube'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              filter === f
                ? 'bg-[#0B1330] text-white border-[#0B1330] shadow-md'
                : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300 hover:text-[#0B1330]'
            }`}
          >
            {f === 'all' ? 'Semua' : platformConfig[f].label}
          </button>
        ))}
      </div>

      {/* CONTENT GRID */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            <p className="text-lg font-medium">Belum ada konten untuk platform ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const cfg = platformConfig[item.platform];
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col p-6 rounded-3xl bg-white border ${cfg.border} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
                >
                  {/* Platform badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cfg.badge}`}>
                      <span className={cfg.color}>{cfg.icon}</span>
                      {cfg.label}
                    </span>
                    {item.date && (
                      <span className="text-xs text-stone-400">
                        {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  {item.thumbnail ? (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-5 bg-stone-100">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className={`w-full aspect-video rounded-2xl mb-5 flex items-center justify-center ${cfg.bg}`}>
                      <span className={`${cfg.color} opacity-30`}>
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </span>
                    </div>
                  )}

                  <h3 className="text-base font-bold text-[#0B1330] mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 flex-1">{item.description}</p>
                  )}

                  <div className={`mt-4 flex items-center gap-1.5 text-sm font-semibold ${cfg.color}`}>
                    Tonton Sekarang
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A1A2E] text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-xs">
          <p>&copy; {new Date().getFullYear()} StacknScale. All rights reserved.</p>
          <Link href="/" className="hover:text-stone-300 transition-colors">← Kembali ke Beranda</Link>
        </div>
      </footer>
    </div>
  );
}
