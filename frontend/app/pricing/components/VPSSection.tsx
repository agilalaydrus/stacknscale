"use client";

import { useState, useMemo } from "react";

type CpuTier = "epyc" | "scalable" | "standard";
const CPU_TIERS: { key: CpuTier; label: string; desc: string; multiplier: number }[] = [
  { key: "epyc", label: "AMD Epyc", desc: "High performance, ideal untuk production", multiplier: 1.15 },
  { key: "scalable", label: "Intel Scalable", desc: "Xeon Scalable, balanced performance", multiplier: 1.0 },
  { key: "standard", label: "Intel Standard", desc: "Xeon Standard, cost-effective", multiplier: 0.9 },
];

const VPS_PACKAGES = [
  { name: "Pro", vcpu: 4, ram: 8, storage: 100, basePrice: 1500000, badge: null },
  { name: "Business", vcpu: 8, ram: 16, storage: 200, basePrice: 2800000, badge: "POPULER" },
  { name: "Enterprise", vcpu: 16, ram: 32, storage: 400, basePrice: 5200000, badge: null },
  { name: "GPU Compute", vcpu: 8, ram: 32, storage: 400, basePrice: 7500000, badge: "AI/ML" },
];

const UNIT_PRICE = { vcpu: 120000, ram: 75000, storage: 3000 };

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function CpuTierSelector({ cpuTier, setCpuTier }: { cpuTier: CpuTier; setCpuTier: (v: CpuTier) => void }) {
  return (
    <div className="mb-8">
      <label className="text-sm font-semibold text-[#1A1A2E] mb-3 block">Pilih Processor</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CPU_TIERS.map((tier) => (
          <button
            key={tier.key}
            onClick={() => setCpuTier(tier.key)}
            className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              cpuTier === tier.key
                ? "border-blue-500 bg-blue-50/50 shadow-sm"
                : "border-stone-200 bg-white hover:border-stone-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${cpuTier === tier.key ? "bg-blue-600 text-white" : "bg-stone-100 text-stone-500"}`}>
                {tier.key === "epyc" ? "AMD" : "Intel"}
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1A2E]">{tier.label}</p>
                <p className="text-[11px] text-stone-400">{tier.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function VPSPackages() {
  const [selected, setSelected] = useState<number | null>(null);
  const [cpuTier, setCpuTier] = useState<CpuTier>("scalable");
  const tierData = CPU_TIERS.find((t) => t.key === cpuTier)!;

  return (
    <div>
      <p className="text-stone-500 mb-6 text-sm">Pilih paket yang sesuai kebutuhan Anda. Semua paket include dedicated resource, SSD storage, dan support 24/7.</p>
      <CpuTierSelector cpuTier={cpuTier} setCpuTier={setCpuTier} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VPS_PACKAGES.map((pkg, i) => {
          const finalPrice = Math.round(pkg.basePrice * tierData.multiplier);
          return (
            <button key={i} onClick={() => setSelected(i)} className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${selected === i ? "border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-100/50" : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-md"}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">{pkg.name}</span>
                {pkg.badge && <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{pkg.badge}</span>}
              </div>
              <div className="mb-4">
                <span className="text-2xl font-extrabold text-[#1A1A2E]">{formatRp(finalPrice)}</span>
                <span className="text-stone-400 text-sm">/bulan</span>
              </div>
              <div className="space-y-2 text-sm text-stone-600">
                <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">C</span>{pkg.vcpu} vCPU</div>
                <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">R</span>{pkg.ram} GB RAM</div>
                <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">S</span>{pkg.storage} GB SSD</div>
                <div className="flex items-center gap-2 pt-1 border-t border-stone-100 mt-1"><span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-500">P</span><span className="text-xs text-blue-600 font-medium">{tierData.label}</span></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VPSCustom() {
  const [vcpu, setVcpu] = useState(4);
  const [ram, setRam] = useState(8);
  const [storage, setStorage] = useState(100);
  const [cpuTier, setCpuTier] = useState<CpuTier>("scalable");
  const tierData = CPU_TIERS.find((t) => t.key === cpuTier)!;
  const price = useMemo(() => Math.round((vcpu * UNIT_PRICE.vcpu + ram * UNIT_PRICE.ram + storage * UNIT_PRICE.storage) * tierData.multiplier), [vcpu, ram, storage, tierData.multiplier]);

  return (
    <div>
      <p className="text-stone-500 mb-6 text-sm">Tentukan resource sesuai kebutuhan Anda. Harga otomatis dihitung.</p>
      <CpuTierSelector cpuTier={cpuTier} setCpuTier={setCpuTier} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#1A1A2E]">vCPU</label><span className="text-sm font-bold text-blue-600">{vcpu} Core</span></div>
            <input type="range" min={2} max={32} value={vcpu} onChange={(e) => setVcpu(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>2</span><span>8</span><span>16</span><span>32</span></div>
          </div>
          <div>
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#1A1A2E]">RAM</label><span className="text-sm font-bold text-blue-600">{ram} GB</span></div>
            <input type="range" min={4} max={64} step={4} value={ram} onChange={(e) => setRam(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>4 GB</span><span>16 GB</span><span>32 GB</span><span>64 GB</span></div>
          </div>
          <div>
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#1A1A2E]">SSD Storage</label><span className="text-sm font-bold text-blue-600">{storage} GB</span></div>
            <input type="range" min={40} max={1000} step={20} value={storage} onChange={(e) => setStorage(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>40 GB</span><span>250 GB</span><span>500 GB</span><span>1 TB</span></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-2xl bg-[#1A1A2E] text-white">
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">Estimasi Biaya</p>
            <div className="mb-6"><span className="text-4xl font-extrabold">{formatRp(price)}</span><span className="text-stone-400 text-sm">/bulan</span></div>
            <div className="space-y-2 text-sm text-stone-300 mb-6">
              <div className="flex justify-between"><span>{vcpu} vCPU</span><span>{formatRp(vcpu * UNIT_PRICE.vcpu)}</span></div>
              <div className="flex justify-between"><span>{ram} GB RAM</span><span>{formatRp(ram * UNIT_PRICE.ram)}</span></div>
              <div className="flex justify-between"><span>{storage} GB SSD</span><span>{formatRp(storage * UNIT_PRICE.storage)}</span></div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white"><span>Total</span><span>{formatRp(price)}</span></div>
            </div>
            <a href={`https://wa.me/6281283031003?text=${encodeURIComponent(`Halo StacknScale, saya tertarik dengan VPS Custom (${tierData.label}, ${vcpu}vCPU/${ram}GB RAM/${storage}GB SSD)`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors">
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VPSSection() {
  const [vpsView, setVpsView] = useState<"packages" | "custom">("packages");

  return (
    <div>
      <div className="flex gap-2 mb-8">
        <button onClick={() => setVpsView("packages")} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${vpsView === "packages" ? "bg-[#1A1A2E] text-white" : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"}`}>Paket VPS</button>
        <button onClick={() => setVpsView("custom")} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${vpsView === "custom" ? "bg-[#1A1A2E] text-white" : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"}`}>Custom VPS</button>
      </div>
      {vpsView === "packages" ? <VPSPackages /> : <VPSCustom />}
      <div className="mt-12 p-8 rounded-2xl bg-white border border-stone-200">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Semua paket VPS termasuk:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["Dedicated Resource (bukan shared)", "SSD/NVMe Storage", "Bandwidth Dedicated", "IP Public (Floating IP ready)", "Full Root Access", "99.9% Uptime SLA", "DDoS Protection", "Snapshot & Backup", "Firewall Management", "Multi-VPC Support", "Technical Support 24/7", "Free Setup & Migration"].map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-stone-600">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              {feat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
