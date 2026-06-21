"use client";

import { useState, Suspense, lazy } from "react";
import dynamic from "next/dynamic";

const VPSSection = dynamic(() => import("./VPSSection"), {
  loading: () => <div className="animate-pulse h-96 bg-stone-100 rounded-2xl" />,
});
const DSSection = dynamic(() => import("./DSSection"), {
  loading: () => <div className="animate-pulse h-96 bg-stone-100 rounded-2xl" />,
});
const PCSection = dynamic(() => import("./PCSection"), {
  loading: () => <div className="animate-pulse h-96 bg-stone-100 rounded-2xl" />,
});

export default function PricingTabs() {
  const [activeProduct, setActiveProduct] = useState<"vps" | "ds" | "pc">("vps");

  return (
    <>
      {/* Product Tabs */}
      <section className="px-6 max-w-5xl mx-auto mb-8">
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-full bg-stone-100 border border-stone-200 flex-wrap justify-center gap-1">
            {([
              { key: "vps" as const, label: "VPS" },
              { key: "ds" as const, label: "Dedicated Server" },
              { key: "pc" as const, label: "Private Cloud" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveProduct(tab.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeProduct === tab.key
                    ? "bg-white text-[#1A1A2E] shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Content */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        {activeProduct === "vps" && <VPSSection />}
        {activeProduct === "ds" && <DSSection />}
        {activeProduct === "pc" && <PCSection />}
      </section>
    </>
  );
}
