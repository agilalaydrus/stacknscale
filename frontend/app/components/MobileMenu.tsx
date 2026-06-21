"use client";

import { useState } from "react";
import Link from "next/link";

export function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2.5 rounded-full hover:bg-stone-100 transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <div className={`fixed inset-0 z-[60] transition-all duration-300 ${open ? "visible" : "invisible pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div className={`absolute top-0 right-0 w-72 h-full bg-white shadow-2xl p-6 flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
          <button onClick={() => setOpen(false)} className="self-end mb-8 p-2 rounded-full hover:bg-stone-100 transition-colors">
            <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex flex-col gap-2">
            {[
              { href: "#services", label: "Layanan" },
              { href: "/pricing", label: "Pricing", isLink: true },
              { href: "/portfolio", label: "Portfolio", isLink: true },
              { href: "/blog", label: "Blog", isLink: true },
              { href: "#faq", label: "FAQ" },
            ].map((item) =>
              item.isLink ? (
                <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-[#1A1A2E] font-medium hover:bg-stone-50 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-[#1A1A2E] font-medium hover:bg-stone-50 transition-colors">
                  {item.label}
                </a>
              )
            )}
          </nav>
          <div className="mt-auto">
            <a href="#audit-form" onClick={() => setOpen(false)} className="block w-full text-center py-3 bg-[#1A1A2E] text-white font-semibold rounded-xl text-sm">
              Konsultasi
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
