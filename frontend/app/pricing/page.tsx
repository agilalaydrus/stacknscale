"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// ========== VPS PRICING DATA ==========
const VPS_PACKAGES = [
  { name: "Pro", vcpu: 4, ram: 8, storage: 160, price: 480000, badge: null },
  { name: "Business", vcpu: 8, ram: 16, storage: 320, price: 960000, badge: "POPULER" },
  { name: "Enterprise", vcpu: 16, ram: 32, storage: 500, price: 1750000, badge: null },
  { name: "Starter GPU", vcpu: 8, ram: 32, storage: 500, price: 2500000, badge: "AI/ML" },
];

const UNIT_PRICE = { vcpu: 28500, ram: 19500, storage: 1300 };

// ========== DEDICATED SERVER DATA ==========
const DS_PACKAGES = [
  { name: "DS-1", cpu: "Xeon E-2386G", cores: "6C/12T", ram: 64, storage: "2x 960GB SSD", bandwidth: "Unmetered 1Gbps", price: 4500000 },
  { name: "DS-2", cpu: "2x Xeon Gold 6138", cores: "40C/80T", ram: 256, storage: "2x 1.92TB SSD", bandwidth: "Unmetered 1Gbps", price: 8500000 },
  { name: "DS-3", cpu: "2x Xeon Gold 6248", cores: "40C/80T", ram: 512, storage: "4x 1.92TB SSD", bandwidth: "Unmetered 1Gbps", price: 15000000 },
];

// ========== ADDITIONAL PRODUCTS ==========
const ADDON_PRODUCTS = [
  {
    name: "Instant App",
    desc: "Deploy aplikasi web dengan cepat dan mudah. WordPress, Node.js, Laravel, dan lainnya siap dalam hitungan menit.",
    price: "Rp 200.000",
    icon: "rocket",
  },
  {
    name: "Load Balancer",
    desc: "Distribusi traffic yang optimal untuk aplikasi Anda. Auto health-check dan failover otomatis.",
    price: "Rp 150.000",
    icon: "balance",
  },
  {
    name: "Object Storage",
    desc: "Penyimpanan file yang scalable dan aman. Kompatibel dengan S3 API untuk integrasi mudah.",
    price: "Rp 50.000",
    icon: "storage",
  },
  {
    name: "Block Storage",
    desc: "Storage tambahan yang bisa dipasang ke server Anda. SSD/NVMe performance untuk database dan aplikasi berat.",
    price: "Rp 40.000",
    icon: "hdd",
  },
];

// ========== PLATFORM FEATURES ==========
const PLATFORM_FEATURES = [
  { name: "Multiple Data Center", desc: "Pilih lokasi data center terdekat untuk latensi rendah dan performa optimal." },
  { name: "Multiclass CPU", desc: "Berbagai kelas CPU (Intel/AMD) untuk kebutuhan ringan hingga performa tinggi." },
  { name: "Multiclass Storage", desc: "Pilih jenis storage (NVMe, SSD, HDD) sesuai kebutuhan dan budget." },
  { name: "Firewall Management", desc: "Firewall canggih untuk open/close port VM dan melindungi aplikasi dari ancaman." },
  { name: "Backup Otomatis", desc: "Backup terjadwal dan manual untuk melindungi data penting. Pemulihan mudah kapan saja." },
  { name: "Snapshot", desc: "Ambil snapshot data dan konfigurasi. Rollback ke kondisi sebelumnya dalam hitungan detik." },
  { name: "SSL Certificate", desc: "Kelola sertifikat SSL untuk enkripsi data yang aman antara pengguna dan server." },
  { name: "SSH Key Management", desc: "Kontrol dan kelola akses ke server dengan manajemen kunci terintegrasi." },
  { name: "Private Network", desc: "Bangun jaringan internal aman tanpa akses publik. Fleksibilitas dan kontrol penuh." },
  { name: "Floating IP", desc: "IP publik yang bisa dipindah antar server. Ideal untuk high availability dan failover." },
  { name: "API & Terraform", desc: "API lengkap dan dukungan Terraform untuk otomatisasi provisioning dan konfigurasi." },
  { name: "24/7 Monitoring", desc: "Monitoring server realtime dengan alerting otomatis. Tim support standby 24 jam." },
];

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

// ========== ICON COMPONENTS ==========
function FeatureIcon({ type }: { type: string }) {
  const base = "w-5 h-5";
  switch (type) {
    case "rocket":
      return <svg className={base} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>;
    case "balance":
      return <svg className={base} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
    case "storage":
      return <svg className={base} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>;
    case "hdd":
      return <svg className={base} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" /></svg>;
    default:
      return <svg className={base} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
  }
}

// ========== VPS COMPONENTS ==========

function VPSPackages() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <p className="text-stone-500 mb-8 text-sm">Pilih paket yang sesuai kebutuhan Anda. Semua paket include dedicated resource, SSD storage, dan support.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              {pkg.badge && (
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{pkg.badge}</span>
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
  const [vcpu, setVcpu] = useState(4);
  const [ram, setRam] = useState(8);
  const [storage, setStorage] = useState(160);

  const price = useMemo(
    () => vcpu * UNIT_PRICE.vcpu + ram * UNIT_PRICE.ram + storage * UNIT_PRICE.storage,
    [vcpu, ram, storage]
  );

  return (
    <div>
      <p className="text-stone-500 mb-8 text-sm">Tentukan resource sesuai kebutuhan Anda. Harga otomatis dihitung.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">vCPU</label>
              <span className="text-sm font-bold text-blue-600">{vcpu} Core</span>
            </div>
            <input type="range" min={2} max={32} value={vcpu} onChange={(e) => setVcpu(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>2</span><span>8</span><span>16</span><span>32</span></div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">RAM</label>
              <span className="text-sm font-bold text-blue-600">{ram} GB</span>
            </div>
            <input type="range" min={4} max={64} step={4} value={ram} onChange={(e) => setRam(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>4 GB</span><span>16 GB</span><span>32 GB</span><span>64 GB</span></div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">SSD Storage</label>
              <span className="text-sm font-bold text-blue-600">{storage} GB</span>
            </div>
            <input type="range" min={40} max={1000} step={20} value={storage} onChange={(e) => setStorage(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>40 GB</span><span>250 GB</span><span>500 GB</span><span>1 TB</span></div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-2xl bg-[#1A1A2E] text-white">
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">Estimasi Biaya</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">{formatRp(price)}</span>
              <span className="text-stone-400 text-sm">/bulan</span>
            </div>
            <div className="space-y-2 text-sm text-stone-300 mb-6">
              <div className="flex justify-between"><span>{vcpu} vCPU</span><span>{formatRp(vcpu * UNIT_PRICE.vcpu)}</span></div>
              <div className="flex justify-between"><span>{ram} GB RAM</span><span>{formatRp(ram * UNIT_PRICE.ram)}</span></div>
              <div className="flex justify-between"><span>{storage} GB SSD</span><span>{formatRp(storage * UNIT_PRICE.storage)}</span></div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white"><span>Total</span><span>{formatRp(price)}</span></div>
            </div>
            <a href={`https://wa.me/6281283031003?text=${encodeURIComponent(`Halo StacknScale, saya tertarik dengan VPS Custom (${vcpu}vCPU/${ram}GB RAM/${storage}GB SSD)`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors">
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== DEDICATED SERVER COMPONENT ==========

function DedicatedServer() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <p className="text-stone-500 mb-8 text-sm">Server fisik dedicated untuk Anda. Full control, tanpa sharing resource dengan siapapun. Cocok untuk workload berat dan compliance ketat.</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {DS_PACKAGES.map((pkg, i) => (
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
              {i === 1 && <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">POPULER</span>}
            </div>
            <div className="mb-5">
              <span className="text-2xl font-extrabold text-[#1A1A2E]">{formatRp(pkg.price)}</span>
              <span className="text-stone-400 text-sm">/bulan</span>
            </div>
            <div className="space-y-2.5 text-sm text-stone-600">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500 mt-0.5 flex-shrink-0">P</span>
                <div><span className="font-medium">{pkg.cpu}</span><br /><span className="text-xs text-stone-400">{pkg.cores}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">R</span>
                {pkg.ram} GB RAM
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">S</span>
                {pkg.storage}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">B</span>
                {pkg.bandwidth}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* DS features */}
      <div className="p-8 rounded-2xl bg-white border border-stone-200">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Semua Dedicated Server termasuk:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Full Root / IPMI Access",
            "Unmetered Bandwidth 1Gbps",
            "/29 IP Address (5 usable)",
            "Colocation di Data Center Tier-3",
            "Hardware Replacement SLA",
            "DDoS Protection",
            "24/7 Managed Service",
            "OS Installation & Setup",
            "Private Network Ready",
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

      <div className="mt-6 text-center">
        <a href="https://wa.me/6281283031003?text=Halo%20StacknScale%2C%20saya%20tertarik%20dengan%20Dedicated%20Server" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A1A2E] hover:bg-blue-700 rounded-xl font-semibold text-sm text-white transition-colors">
          Konsultasi Dedicated Server
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>
    </div>
  );
}

// ========== PRIVATE CLOUD COMPONENT ==========

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
      <p className="text-stone-500 mb-8 text-sm">Isi kebutuhan infrastruktur Anda untuk mendapat estimasi harga. Harga final ditentukan setelah konsultasi.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">Jumlah Server Node</label>
              <span className="text-sm font-bold text-blue-600">{nodes} node</span>
            </div>
            <input type="range" min={1} max={10} value={nodes} onChange={(e) => setNodes(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>1</span><span>3</span><span>5</span><span>10</span></div>
            <p className="text-[11px] text-stone-400 mt-1">Minimal 3 node untuk high availability</p>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-[#1A1A2E]">Total Storage</label>
              <span className="text-sm font-bold text-blue-600">{storageTB} TB</span>
            </div>
            <input type="range" min={1} max={50} value={storageTB} onChange={(e) => setStorageTB(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>1 TB</span><span>10 TB</span><span>25 TB</span><span>50 TB</span></div>
          </div>
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
                    <input type="checkbox" checked={addon.value} onChange={(e) => addon.setter(e.target.checked)} className="w-4 h-4 rounded border-stone-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-[#1A1A2E]">{addon.label}</span>
                  </div>
                  <span className="text-xs text-stone-400">{addon.price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-2xl bg-[#1A1A2E] text-white">
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-4">Estimasi Harga</p>
            <div className="mb-6">
              <p className="text-stone-400 text-xs mb-1">Biaya Setup (1x bayar)</p>
              <span className="text-3xl font-extrabold">{formatRp(estimate.setupCost)}</span>
            </div>
            <div className="mb-6">
              <p className="text-stone-400 text-xs mb-1">Managed Service (per bulan)</p>
              <span className="text-3xl font-extrabold">{formatRp(estimate.monthlyCost)}</span>
              <span className="text-stone-400 text-sm">/bulan</span>
            </div>
            <div className="space-y-2 text-sm text-stone-300 mb-6 border-t border-white/10 pt-4">
              <div className="flex justify-between"><span>{nodes} Node Server</span><span>{formatRp(nodes * PC_BASE.managedPerNode)}/bln</span></div>
              <div className="flex justify-between"><span>{storageTB} TB Storage</span><span>{formatRp(storageTB * PC_BASE.storagePerTB)}/bln</span></div>
              {withBackup && <div className="flex justify-between"><span>Backup & DR</span><span>{formatRp(storageTB * PC_BASE.backupPerTB)}/bln</span></div>}
              {withFirewall && <div className="flex justify-between"><span>Firewall & Security</span><span>{formatRp(PC_BASE.firewallBase)}/bln</span></div>}
              {withMonitoring && <div className="flex justify-between"><span>Monitoring & Alerting</span><span>{formatRp(PC_BASE.monitoringBase)}/bln</span></div>}
            </div>
            <p className="text-[11px] text-stone-500 mb-4">* Estimasi bersifat indikatif. Harga final disesuaikan setelah konsultasi teknis.</p>
            <a href={`https://wa.me/6281283031003?text=${encodeURIComponent(`Halo StacknScale, saya tertarik dengan Private Cloud (${nodes} node, ${storageTB}TB storage)`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors">
              Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== MOBILE NAV ==========
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl p-6 flex flex-col">
        <button onClick={onClose} className="self-end mb-8 p-2 rounded-full hover:bg-stone-100 transition-colors">
          <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <nav className="flex flex-col gap-2">
          {[
            { href: "/", label: "Home" },
            { href: "/pricing", label: "Pricing" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/blog", label: "Blog" },
          ].map((item) => (
            <Link key={item.label} href={item.href} onClick={onClose} className="px-4 py-3 rounded-xl text-[#1A1A2E] font-medium hover:bg-stone-50 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <a href="https://wa.me/6281283031003" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 bg-[#1A1A2E] text-white font-semibold rounded-xl text-sm">
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}

// ========== MAIN PAGE ==========
export default function PricingPage() {
  const [activeProduct, setActiveProduct] = useState<"vps" | "ds" | "pc">("vps");
  const [vpsView, setVpsView] = useState<"packages" | "custom">("packages");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0B1330] font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      {/* Ambient backdrop */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-[10%] w-[480px] h-[480px] rounded-full bg-blue-200/40 blur-[120px] animate-float-slow" />
        <div className="absolute top-[30%] right-[5%] w-[420px] h-[420px] rounded-full bg-sky-200/30 blur-[120px] animate-float-slow-2" />
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

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
          <div className="flex items-center gap-2">
            <a href="https://wa.me/6281283031003" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex group relative items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gradient-to-br from-[#0B1330] to-[#1E2647] text-white rounded-full hover:shadow-[0_8px_24px_-6px_rgba(11,19,48,0.5)] hover:-translate-y-0.5 transition-all duration-300">
              <span className="relative z-10">Hubungi Kami</span>
            </a>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2.5 rounded-full hover:bg-stone-100 transition-colors">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-12 px-6 max-w-4xl mx-auto text-center">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Pricing</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A1A2E] mb-4">Harga yang Transparan</h1>
        <p className="text-stone-500 text-lg max-w-2xl mx-auto">Pilih layanan sesuai kebutuhan bisnis Anda. Tanpa biaya tersembunyi.</p>
      </section>

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
        {activeProduct === "vps" && (
          <div>
            <div className="flex gap-2 mb-8">
              <button onClick={() => setVpsView("packages")} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${vpsView === "packages" ? "bg-[#1A1A2E] text-white" : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"}`}>
                Paket VPS
              </button>
              <button onClick={() => setVpsView("custom")} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${vpsView === "custom" ? "bg-[#1A1A2E] text-white" : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"}`}>
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
                  "IP Public (Floating IP ready)",
                  "Full Root Access",
                  "99.9% Uptime SLA",
                  "DDoS Protection",
                  "Snapshot & Backup",
                  "Firewall Management",
                  "Multi-VPC Support",
                  "Technical Support 24/7",
                  "Free Setup & Migration",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-stone-600">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeProduct === "ds" && <DedicatedServer />}
        {activeProduct === "pc" && <PrivateCloudCalc />}
      </section>

      {/* Additional Products */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Add-On Services</p>
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">Produk Tambahan</h2>
          <p className="text-stone-500 text-sm max-w-xl mx-auto">Lengkapi infrastruktur Anda dengan layanan tambahan yang bisa diaktifkan kapan saja.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ADDON_PRODUCTS.map((product, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <FeatureIcon type={product.icon} />
              </div>
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-2">{product.name}</h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-4">{product.desc}</p>
              <p className="text-sm font-bold text-blue-600">Start from {product.price}<span className="text-stone-400 font-normal">/bulan</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Features */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Platform</p>
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">Fitur Platform Lengkap</h2>
          <p className="text-stone-500 text-sm max-w-xl mx-auto">Semua fitur yang Anda butuhkan untuk manage infrastruktur cloud dengan mudah dan aman.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLATFORM_FEATURES.map((feat, i) => (
            <div key={i} className="p-5 rounded-xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-200">
              <h4 className="text-sm font-bold text-[#1A1A2E] mb-1.5">{feat.name}</h4>
              <p className="text-xs text-stone-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
        <div className="p-10 rounded-3xl bg-[#1A1A2E] text-white">
          <h2 className="text-2xl font-bold mb-3">Butuh solusi yang lebih spesifik?</h2>
          <p className="text-stone-400 mb-6 text-sm">Tim kami siap bantu rancang arsitektur dan hitung budget yang pas untuk kebutuhan Anda.</p>
          <a href="https://wa.me/6281283031003" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-sm transition-colors">
            Konsultasi Gratis
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
