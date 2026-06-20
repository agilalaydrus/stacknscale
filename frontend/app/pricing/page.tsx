"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// ========== VPS PRICING DATA ==========
const VPS_PACKAGES = [
  { name: "Starter", vcpu: 1, ram: 1, storage: 20, price: 75000 },
  { name: "Basic", vcpu: 2, ram: 2, storage: 40, price: 150000 },
  { name: "Standard", vcpu: 2, ram: 4, storage: 80, price: 240000 },
  { name: "Pro", vcpu: 4, ram: 8, storage: 160, price: 480000 },
  { name: "Business", vcpu: 8, ram: 16, storage: 320, price: 960000 },
  { name: "Enterprise", vcpu: 16, ram: 32, storage: 500, price: 1750000 },
];

const UNIT_PRICE = { vcpu: 28500, ram: 19500, storage: 1300 };

// ========== PRIVATE CLOUD PRICING LOGIC ==========
const PC_BASE = {
  setupPerNode: 15000000,
  managedPerNode: 8500000,
  storagePerTB: 500000,
  backupPerTB: 300000,
  firewallBase: 2500000,
  monitoringBase: 1500000,
};

function estimatePrivateCloud(nodes: number, storageTB: number, withBackup: boolean, withFirewall: boolean, withMonitoring: boolean) {
  const setupCost = nodes * PC_BASE.setupPerNode;
  let monthlyCost = nodes * PC_BASE.managedPerNode;
  monthlyCost += storageTB * PC_BASE.storagePerTB;
  if (withBackup) monthlyCost += storageTB * PC_BASE.backupPerTB;
  if (withFirewall) monthlyCost += PC_BASE.firewallBase;
  if (withMonitoring) monthlyCost += PC_BASE.monitoringBase;
  return { setupCost, monthlyCost };
}

// ========== HELPERS ==========
function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

// ========== COMPONENTS ==========

function VPSPackages() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <p className="text-stone-500 mb-8 text-sm">Pilih paket yang sesuai kebutuhan Anda. Semua paket include dedicated resource, SSD storage, dan support.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VPS_PACKAGES.map((pkg, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
              selected === i
                ? "border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-100/50"
                : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">{pkg.name}</span>
              {i === 2 && (
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">POPULER</span>
              )}
            </div>
            <div className="mb-4">
              <span className="text-2xl font-extrabold text-[#1A1A2E]">{formatRp(pkg.price)}</span>
              <span className="text-stone-400 text-sm">/bulan</span>
            </div>
            <div className="space-y-2 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">C</span>
                {pkg.vcpu} vCPU
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">R</span>
                {pkg.ram} GB RAM
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">S</span>
                {pkg.storage} GB SSD
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function VPSCustom() {
  const [vcpu, setVcpu] = useState(2);
  const [ram, setRam] = useState(4);
  const [storage, setStorage] = useState(80);

  const price = useMemo(
    () => vcpu * UNIT_PRICE.vcpu + ram * UNIT_PRICE.ram + storage * UNIT_PRICE.storage,
    [vcpu, ram, storage]
  );

  return (
    <div>
      <p className="text-stone-500 mb-8 text-sm">Tentukan resource sesuai kebutuhan Anda. Harga otomatis dihitung.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sliders */}
        <div className="space-y-8">
          {/* vCPU */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">vCPU</label>
              <span className="text-sm font-bold text-blue-600">{vcpu} Core</span>
            </div>
            <input
              type="range"
              min={1}
              max={32}
              value={vcpu}
              onChange={(e) => setVcpu(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>1</span><span>8</span><span>16</span><span>32</span>
            </div>
          </div>
          {/* RAM */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">RAM</label>
              <span className="text-sm font-bold text-blue-600">{ram} GB</span>
            </div>
            <input
              type="range"
              min={1}
              max={64}
              value={ram}
              onChange={(e) => setRam(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>1 GB</span><span>16 GB</span><span>32 GB</span><span>64 GB</span>
            </div>
          </div>
          {/* Storage */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">SSD Storage</label>
              <span className="text-sm font-bold text-blue-600">{storage} GB</span>
            </div>
            <input
              type="range"
              min={20}
              max={1000}
              step={20}
              value={storage}
              onChange={(e) => setStorage(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>20 GB</span><span>250 GB</span><span>500 GB</span><span>1 TB</span>
            </div>
          </div>
        </div>

        {/* Price summary */}
        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-2xl bg-[#1A1A2E] text-white">
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">Estimasi Biaya</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">{formatRp(price)}</span>
              <span className="text-stone-400 text-sm">/bulan</span>
            </div>
            <div className="space-y-2 text-sm text-stone-300 mb-6">
              <div className="flex justify-between">
                <span>{vcpu} vCPU</span>
                <span>{formatRp(vcpu * UNIT_PRICE.vcpu)}</span>
              </div>
              <div className="flex justify-between">
                <span>{ram} GB RAM</span>
                <span>{formatRp(ram * UNIT_PRICE.ram)}</span>
              </div>
              <div className="flex justify-between">
                <span>{storage} GB SSD</span>
                <span>{formatRp(storage * UNIT_PRICE.storage)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white">
                <span>Total</span>
                <span>{formatRp(price)}</span>
              </div>
            </div>
            <a
              href="https://wa.me/6281283031003?text=Halo%20StacknScale%2C%20saya%20tertarik%20dengan%20VPS%20Custom%20%28{vcpu}vCPU%2F{ram}GB%20RAM%2F{storage}GB%20SSD%29"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivateCloudCalc() {
  const [nodes, setNodes] = useState(3);
  const [storageTB, setStorageTB] = useState(4);
  const [withBackup, setWithBackup] = useState(true);
  const [withFirewall, setWithFirewall] = useState(true);
  const [withMonitoring, setWithMonitoring] = useState(true);

  const estimate = useMemo(
    () => estimatePrivateCloud(nodes, storageTB, withBackup, withFirewall, withMonitoring),
    [nodes, storageTB, withBackup, withFirewall, withMonitoring]
  );

  return (
    <div>
      <p className="text-stone-500 mb-8 text-sm">
        Isi kebutuhan infrastruktur Anda untuk mendapat estimasi harga. Harga final ditentukan setelah konsultasi.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          {/* Nodes */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">Jumlah Server Node</label>
              <span className="text-sm font-bold text-blue-600">{nodes} node</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={nodes}
              onChange={(e) => setNodes(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>1</span><span>3</span><span>5</span><span>10</span>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">Minimal 3 node untuk high availability</p>
          </div>

          {/* Storage */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">Total Storage</label>
              <span className="text-sm font-bold text-blue-600">{storageTB} TB</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={storageTB}
              onChange={(e) => setStorageTB(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>1 TB</span><span>10 TB</span><span>25 TB</span><span>50 TB</span>
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="text-sm font-semibold text-[#1A1A2E] mb-3 block">Layanan Tambahan</label>
            <div className="space-y-3">
              {[
                { label: "Backup & Disaster Recovery", value: withBackup, setter: setWithBackup, price: `+${formatRp(storageTB * PC_BASE.backupPerTB)}/bln` },
                { label: "Firewall & Security", value: withFirewall, setter: setWithFirewall, price: `+${formatRp(PC_BASE.firewallBase)}/bln` },
                { label: "24/7 Monitoring & Alerting", value: withMonitoring, setter: setWithMonitoring, price: `+${formatRp(PC_BASE.monitoringBase)}/bln` },
              ].map((addon, i) => (
                <label key={i} className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:border-stone-300 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addon.value}
                      onChange={(e) => addon.setter(e.target.checked)}
                      className="w-4 h-4 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-[#1A1A2E]">{addon.label}</span>
                  </div>
                  <span className="text-xs text-stone-400">{addon.price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Estimate */}
        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-2xl bg-[#1A1A2E] text-white">
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-4">Estimasi Harga</p>

            {/* Setup */}
            <div className="mb-6">
              <p className="text-stone-400 text-xs mb-1">Biaya Setup (1x bayar)</p>
              <span className="text-3xl font-extrabold">{formatRp(estimate.setupCost)}</span>
            </div>

            {/* Monthly */}
            <div className="mb-6">
              <p className="text-stone-400 text-xs mb-1">Managed Service (per bulan)</p>
              <span className="text-3xl font-extrabold">{formatRp(estimate.monthlyCost)}</span>
              <span className="text-stone-400 text-sm">/bulan</span>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-sm text-stone-300 mb-6 border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span>{nodes} Node Server</span>
                <span>{formatRp(nodes * PC_BASE.managedPerNode)}/bln</span>
              </div>
              <div className="flex justify-between">
                <span>{storageTB} TB Storage</span>
                <span>{formatRp(storageTB * PC_BASE.storagePerTB)}/bln</span>
              </div>
              {withBackup && (
                <div className="flex justify-between">
                  <span>Backup & DR</span>
                  <span>{formatRp(storageTB * PC_BASE.backupPerTB)}/bln</span>
                </div>
              )}
              {withFirewall && (
                <div className="flex justify-between">
                  <span>Firewall & Security</span>
                  <span>{formatRp(PC_BASE.firewallBase)}/bln</span>
                </div>
              )}
              {withMonitoring && (
                <div className="flex justify-between">
                  <span>Monitoring & Alerting</span>
                  <span>{formatRp(PC_BASE.monitoringBase)}/bln</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-stone-500 mb-4">
              * Estimasi ini bersifat indikatif. Harga final disesuaikan setelah konsultasi teknis.
            </p>

            <a
              href="https://wa.me/6281283031003?text=Halo%20StacknScale%2C%20saya%20tertarik%20dengan%20Private%20Cloud%20%28{nodes}%20node%2C%20{storageTB}TB%20storage%29"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== MAIN PAGE ==========
export default function PricingPage() {
  const [activeProduct, setActiveProduct] = useState<"vps" | "pc">("vps");
  const [vpsView, setVpsView] = useState<"packages" | "custom">("packages");

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0B1330] font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      {/* Ambient backdrop */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-[10%] w-[480px] h-[480px] rounded-full bg-blue-200/40 blur-[120px] animate-float-slow" />
        <div className="absolute top-[30%] right-[5%] w-[420px] h-[420px] rounded-full bg-sky-200/30 blur-[120px] animate-float-slow-2" />
      </div>

      {/* Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
        <div className="flex items-center justify-between gap-4 pl-3 pr-2 py-2 rounded-full border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(11,19,48,0.12)]">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-sky-400/5 group-hover:from-blue-500/20 group-hover:to-sky-400/10 transition-all">
              <img src="/logo-mark.png" alt="StacknScale" className="w-8 h-8 object-contain" />
            </span>
            <span className="hidden sm:inline-block text-[15px] font-extrabold tracking-tight text-[#0B1330] pr-2">
              Stack<span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-sky-500">n</span>Scale
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
            <Link href="/" className="px-3.5 py-2 rounded-full hover:text-[#0B1330] hover:bg-stone-100/70 transition-all duration-200">Home</Link>
            <Link href="/pricing" className="px-3.5 py-2 rounded-full text-[#0B1330] bg-stone-100/70 transition-all duration-200">Pricing</Link>
            <Link href="/portfolio" className="px-3.5 py-2 rounded-full hover:text-[#0B1330] hover:bg-stone-100/70 transition-all duration-200">Portfolio</Link>
            <Link href="/blog" className="px-3.5 py-2 rounded-full hover:text-[#0B1330] hover:bg-stone-100/70 transition-all duration-200">Blog</Link>
          </nav>
          <a href="https://wa.me/6281283031003" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gradient-to-br from-[#0B1330] to-[#1E2647] text-white rounded-full hover:shadow-[0_8px_24px_-6px_rgba(11,19,48,0.5)] hover:-translate-y-0.5 transition-all duration-300">
            <span className="relative z-10">Hubungi Kami</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-12 px-6 max-w-4xl mx-auto text-center">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Pricing</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A1A2E] mb-4">
          Harga yang Transparan
        </h1>
        <p className="text-stone-500 text-lg max-w-2xl mx-auto">
          Pilih layanan sesuai kebutuhan bisnis Anda. Tanpa biaya tersembunyi.
        </p>
      </section>

      {/* Product Tabs */}
      <section className="px-6 max-w-5xl mx-auto mb-8">
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-full bg-stone-100 border border-stone-200">
            <button
              onClick={() => setActiveProduct("vps")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeProduct === "vps"
                  ? "bg-white text-[#1A1A2E] shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              VPS
            </button>
            <button
              onClick={() => setActiveProduct("pc")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeProduct === "pc"
                  ? "bg-white text-[#1A1A2E] shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              Private Cloud
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        {activeProduct === "vps" ? (
          <div>
            {/* VPS sub-tabs */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setVpsView("packages")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  vpsView === "packages"
                    ? "bg-[#1A1A2E] text-white"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
                }`}
              >
                Paket VPS
              </button>
              <button
                onClick={() => setVpsView("custom")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  vpsView === "custom"
                    ? "bg-[#1A1A2E] text-white"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
                }`}
              >
                Custom VPS
              </button>
            </div>

            {vpsView === "packages" ? <VPSPackages /> : <VPSCustom />}

            {/* VPS features */}
            <div className="mt-12 p-8 rounded-2xl bg-white border border-stone-200">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Semua paket VPS termasuk:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Dedicated Resource (bukan shared)",
                  "SSD/NVMe Storage",
                  "Bandwidth Dedicated",
                  "IP Public",
                  "Full Root Access",
                  "99.9% Uptime SLA",
                  "DDoS Protection Dasar",
                  "Technical Support",
                  "Free Setup",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-stone-600">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <PrivateCloudCalc />
        )}
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
        <div className="p-10 rounded-3xl bg-[#1A1A2E] text-white">
          <h2 className="text-2xl font-bold mb-3">Butuh solusi yang lebih spesifik?</h2>
          <p className="text-stone-400 mb-6 text-sm">Tim kami siap bantu rancang arsitektur dan hitung budget yang pas untuk kebutuhan Anda.</p>
          <a
            href="https://wa.me/6281283031003"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-sm transition-colors"
          >
            Konsultasi Gratis
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] text-white pt-12 pb-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo-mark-white.png" alt="StacknScale" className="h-8 w-auto" />
            <span className="text-sm font-bold">StacknScale</span>
          </div>
          <p className="text-stone-500 text-xs">&copy; {new Date().getFullYear()} StacknScale. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
