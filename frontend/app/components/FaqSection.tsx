"use client";

import { useState } from "react";

const faqs = [
  { q: "Berapa lama proses Audit IT?", a: "Tergantung skala infrastruktur. Untuk perusahaan menengah, biasanya 1 sampai 2 minggu kerja. Hasilnya berupa laporan kerentanan lengkap dan rekomendasi perbaikan." },
  { q: "Migrasi cloud bikin downtime gak?", a: "Kami pakai Blue-Green Deployment, jadi migrasi jalan paralel di background. Downtime bisa ditekan sampai nyaris nol." },
  { q: "StacknScale cuma untuk perusahaan besar?", a: "Tidak. Kami juga banyak kerja bareng startup yang lagi growth dan butuh fondasi sistem yang kuat sebelum traffic melonjak." },
];

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
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
  );
}
