"use client";

import { useState, useMemo } from "react";

const DS_PACKAGES = [
  { name: "Dell R640", cpu: "2x Xeon Gold 6138", cores: "40C/80T", ram: 256, storage: "1 TB NVMe/SSD", bandwidth: "Unmetered 1Gbps", os: "Linux / Windows", price: 8500000, badge: null },
  { name: "Dell R740", cpu: "2x Xeon Gold 6248", cores: "40C/80T", ram: 512, storage: "4x 1.92TB SSD", bandwidth: "Unmetered 1Gbps", os: "Linux / Windows", price: 14000000, badge: "POPULER" },
  { name: "Dell R650", cpu: "2x Xeon Gold 6330", cores: "56C/112T", ram: 512, storage: "2x 3.84TB NVMe", bandwidth: "Unmetered 1Gbps", os: "Linux / Windows", price: 18500000, badge: "GEN 15" },
  { name: "Dell R750", cpu: "2x Xeon Gold 6348", cores: "56C/112T", ram: 1024, storage: "4x 3.84TB NVMe", bandwidth: "Unmetered 10Gbps", os: "Linux / Windows", price: 28000000, badge: "FLAGSHIP" },
];

type DsModel = "r640" | "r740" | "r650" | "r750";
const DS_MODELS: { key: DsModel; name: string; cpu: string; cores: string; baseRam: number; maxRam: number; ramStep: number; basePrice: number; gen: string }[] = [
  { key: "r640", name: "Dell R640", cpu: "2x Xeon Gold 6138", cores: "40C/80T", baseRam: 256, maxRam: 512, ramStep: 128, basePrice: 8500000, gen: "Gen 14" },
  { key: "r740", name: "Dell R740", cpu: "2x Xeon Gold 6248", cores: "40C/80T", baseRam: 256, maxRam: 1024, ramStep: 128, basePrice: 14000000, gen: "Gen 14" },
  { key: "r650", name: "Dell R650", cpu: "2x Xeon Gold 6330", cores: "56C/112T", baseRam: 256, maxRam: 1024, ramStep: 128, basePrice: 18500000, gen: "Gen 15" },
  { key: "r750", name: "Dell R750", cpu: "2x Xeon Gold 6348", cores: "56C/112T", baseRam: 512, maxRam: 2048, ramStep: 256, basePrice: 28000000, gen: "Gen 15" },
];

type DsStorageType = "ssd" | "nvme";
const DS_STORAGE_OPTIONS: { key: DsStorageType; label: string; pricePerTB: number }[] = [
  { key: "ssd", label: "SSD SATA", pricePerTB: 500000 },
  { key: "nvme", label: "NVMe SSD", pricePerTB: 900000 },
];

type DsBandwidth = "1g" | "10g";
const DS_BW_OPTIONS: { key: DsBandwidth; label: string; price: number }[] = [
  { key: "1g", label: "Unmetered 1 Gbps", price: 0 },
  { key: "10g", label: "Unmetered 10 Gbps", price: 3500000 },
];

const DS_ADDONS = [
  { id: "managed", label: "24/7 Managed Service", price: 2000000, desc: "Monitoring, patching, incident response" },
  { id: "backup", label: "Daily Backup & DR", price: 1500000, desc: "Automated backup dengan retention 30 hari" },
  { id: "ddos", label: "Advanced DDoS Protection", price: 1000000, desc: "Layer 3/4/7 DDoS mitigation" },
  { id: "extraip", label: "Extra IP /29 (5 usable)", price: 500000, desc: "Tambahan subnet IP public" },
];

const DS_RAM_PRICE_PER_GB = 15000;

function formatRp(n: number) { return "Rp " + n.toLocaleString("id-ID"); }

function DSPackages() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div>
      <p className="text-stone-500 mb-8 text-sm">Server fisik dedicated untuk Anda. Full control, tanpa sharing resource dengan siapapun.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {DS_PACKAGES.map((pkg, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${selected === i ? "border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-100/50" : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-md"}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">{pkg.name}</span>
              {pkg.badge && <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{pkg.badge}</span>}
            </div>
            <div className="mb-5"><span className="text-2xl font-extrabold text-[#1A1A2E]">{formatRp(pkg.price)}</span><span className="text-stone-400 text-sm">/bulan</span></div>
            <div className="space-y-2.5 text-sm text-stone-600">
              <div className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500 mt-0.5 flex-shrink-0">P</span><div><span className="font-medium">{pkg.cpu}</span><br /><span className="text-xs text-stone-400">{pkg.cores}</span></div></div>
              <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">R</span>{pkg.ram} GB RAM</div>
              <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">S</span>{pkg.storage}</div>
              <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">B</span>{pkg.bandwidth}</div>
              <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">O</span>{pkg.os}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DSCustom() {
  const [model, setModel] = useState<DsModel>("r640");
  const [ram, setRam] = useState(256);
  const [storageType, setStorageType] = useState<DsStorageType>("ssd");
  const [storageTB, setStorageTB] = useState(2);
  const [bandwidth, setBandwidth] = useState<DsBandwidth>("1g");
  const [addons, setAddons] = useState<string[]>(["managed"]);

  const modelData = DS_MODELS.find((m) => m.key === model)!;
  const storageData = DS_STORAGE_OPTIONS.find((s) => s.key === storageType)!;
  const bwData = DS_BW_OPTIONS.find((b) => b.key === bandwidth)!;

  const effectiveRam = useMemo(() => {
    const clamped = Math.max(modelData.baseRam, Math.min(ram, modelData.maxRam));
    return modelData.baseRam + Math.round((clamped - modelData.baseRam) / modelData.ramStep) * modelData.ramStep;
  }, [ram, modelData]);

  const ramUpgradeCost = Math.max(0, (effectiveRam - modelData.baseRam) * DS_RAM_PRICE_PER_GB);
  const storageCost = storageTB * storageData.pricePerTB;
  const addonsCost = DS_ADDONS.filter((a) => addons.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const totalPrice = modelData.basePrice + ramUpgradeCost + storageCost + bwData.price + addonsCost;
  const toggleAddon = (id: string) => setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);

  return (
    <div>
      <p className="text-stone-500 mb-6 text-sm">Konfigurasi server sesuai kebutuhan Anda. Pilih model, RAM, storage, dan layanan tambahan.</p>
      <div className="mb-8">
        <label className="text-sm font-semibold text-[#1A1A2E] mb-3 block">Pilih Server Model</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DS_MODELS.map((m) => (
            <button key={m.key} onClick={() => setModel(m.key)} className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${model === m.key ? "border-blue-500 bg-blue-50/50 shadow-sm" : "border-stone-200 bg-white hover:border-stone-300"}`}>
              <div className="flex items-center justify-between mb-2"><span className="text-sm font-bold text-[#1A1A2E]">{m.name}</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${model === m.key ? "bg-blue-600 text-white" : "bg-stone-100 text-stone-500"}`}>{m.gen}</span></div>
              <p className="text-[11px] text-stone-500">{m.cpu}</p>
              <p className="text-[11px] text-stone-400">{m.cores} &middot; Base {m.baseRam}GB RAM</p>
              <p className="text-xs font-bold text-blue-600 mt-2">Mulai {formatRp(m.basePrice)}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#1A1A2E]">RAM</label><span className="text-sm font-bold text-blue-600">{effectiveRam} GB</span></div>
            <input type="range" min={modelData.baseRam} max={modelData.maxRam} step={modelData.ramStep} value={effectiveRam} onChange={(e) => setRam(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>{modelData.baseRam} GB</span><span>{modelData.maxRam} GB</span></div>
            {ramUpgradeCost > 0 && <p className="text-[11px] text-blue-500 mt-1">+{formatRp(ramUpgradeCost)} upgrade RAM</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1A1A2E] mb-3 block">Tipe Storage</label>
            <div className="grid grid-cols-2 gap-3">
              {DS_STORAGE_OPTIONS.map((opt) => (<button key={opt.key} onClick={() => setStorageType(opt.key)} className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${storageType === opt.key ? "border-blue-500 bg-blue-50/50 text-blue-700" : "border-stone-200 text-stone-600 hover:border-stone-300"}`}>{opt.label}<span className="block text-[10px] text-stone-400 mt-0.5">{formatRp(opt.pricePerTB)}/TB</span></button>))}
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#1A1A2E]">Kapasitas Storage</label><span className="text-sm font-bold text-blue-600">{storageTB} TB</span></div>
            <input type="range" min={1} max={20} value={storageTB} onChange={(e) => setStorageTB(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>1 TB</span><span>5 TB</span><span>10 TB</span><span>20 TB</span></div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1A1A2E] mb-3 block">Bandwidth</label>
            <div className="grid grid-cols-2 gap-3">
              {DS_BW_OPTIONS.map((opt) => (<button key={opt.key} onClick={() => setBandwidth(opt.key)} className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${bandwidth === opt.key ? "border-blue-500 bg-blue-50/50 text-blue-700" : "border-stone-200 text-stone-600 hover:border-stone-300"}`}>{opt.label}<span className="block text-[10px] text-stone-400 mt-0.5">{opt.price === 0 ? "Included" : `+${formatRp(opt.price)}/bln`}</span></button>))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1A1A2E] mb-3 block">Layanan Tambahan</label>
            <div className="space-y-3">
              {DS_ADDONS.map((addon) => (
                <label key={addon.id} className={`flex items-center justify-between p-3 rounded-xl border transition-colors cursor-pointer ${addons.includes(addon.id) ? "border-blue-300 bg-blue-50/30" : "border-stone-200 hover:border-stone-300"}`}>
                  <div className="flex items-center gap-3"><input type="checkbox" checked={addons.includes(addon.id)} onChange={() => toggleAddon(addon.id)} className="w-4 h-4 rounded border-stone-300 text-blue-600 focus:ring-blue-500" /><div><span className="text-sm text-[#1A1A2E] font-medium">{addon.label}</span><p className="text-[11px] text-stone-400">{addon.desc}</p></div></div>
                  <span className="text-xs text-stone-500 whitespace-nowrap ml-2">+{formatRp(addon.price)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start md:sticky md:top-28 self-start">
          <div className="p-8 rounded-2xl bg-[#1A1A2E] text-white">
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">Estimasi Biaya</p>
            <div className="mb-6"><span className="text-4xl font-extrabold">{formatRp(totalPrice)}</span><span className="text-stone-400 text-sm">/bulan</span></div>
            <div className="space-y-3 text-sm text-stone-300 mb-6">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10"><span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">S</span><div><p className="text-white font-medium">{modelData.name}</p><p className="text-[11px] text-stone-400">{modelData.cpu} &middot; {modelData.cores}</p></div></div>
              <div className="flex justify-between"><span>{effectiveRam} GB RAM</span><span>{ramUpgradeCost > 0 ? `+${formatRp(ramUpgradeCost)}` : "Included"}</span></div>
              <div className="flex justify-between"><span>{storageTB} TB {storageData.label}</span><span>{formatRp(storageCost)}</span></div>
              <div className="flex justify-between"><span>{bwData.label}</span><span>{bwData.price === 0 ? "Included" : formatRp(bwData.price)}</span></div>
              {DS_ADDONS.filter((a) => addons.includes(a.id)).map((addon) => (<div key={addon.id} className="flex justify-between"><span>{addon.label}</span><span>{formatRp(addon.price)}</span></div>))}
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white"><span>Total</span><span>{formatRp(totalPrice)}/bln</span></div>
            </div>
            <p className="text-[11px] text-stone-500 mb-4">* Harga belum termasuk pajak. Harga final dikonfirmasi setelah konsultasi teknis.</p>
            <a href={`https://wa.me/6281283031003?text=${encodeURIComponent(`Halo StacknScale, saya tertarik dengan Dedicated Server Custom:\n- Model: ${modelData.name}\n- CPU: ${modelData.cpu} (${modelData.cores})\n- RAM: ${effectiveRam}GB\n- Storage: ${storageTB}TB ${storageData.label}\n- Bandwidth: ${bwData.label}\n- Add-ons: ${addons.length > 0 ? DS_ADDONS.filter(a => addons.includes(a.id)).map(a => a.label).join(', ') : 'Tidak ada'}\n- Estimasi: ${formatRp(totalPrice)}/bulan`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors">Order via WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DSSection() {
  const [dsView, setDsView] = useState<"packages" | "custom">("packages");
  return (
    <div>
      <div className="flex gap-2 mb-8">
        <button onClick={() => setDsView("packages")} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${dsView === "packages" ? "bg-[#1A1A2E] text-white" : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"}`}>Paket Server</button>
        <button onClick={() => setDsView("custom")} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${dsView === "custom" ? "bg-[#1A1A2E] text-white" : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"}`}>Custom Server</button>
      </div>
      {dsView === "packages" ? <DSPackages /> : <DSCustom />}
      <div className="mt-8 p-8 rounded-2xl bg-white border border-stone-200">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Semua Dedicated Server termasuk:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["Full Root / IPMI Access", "Unmetered Bandwidth 1Gbps", "/29 IP Address (5 usable)", "Colocation di Data Center Tier-3", "Hardware Replacement SLA", "DDoS Protection", "24/7 Managed Service", "OS Installation & Setup", "Private Network Ready"].map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-stone-600"><svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{feat}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
