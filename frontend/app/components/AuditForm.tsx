"use client";

import { useState } from "react";

export function AuditForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
      const response = await fetch('/api/audit-request', {
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

  return (
    <section id="audit-form" className="px-6 pb-24 max-w-3xl mx-auto scroll-mt-20">
      <div className="relative p-8 md:p-12 rounded-3xl bg-white border border-stone-100 shadow-2xl shadow-stone-200/50 overflow-hidden">
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
              <textarea required name="problem" rows={4} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-[#1A1A2E] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition-all resize-none" placeholder="Apakah Anda butuh audit, migrasi cloud untuk hemat biaya, atau pembangunan sistem baru? Ceritakan kondisi saat ini..." />
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
  );
}
