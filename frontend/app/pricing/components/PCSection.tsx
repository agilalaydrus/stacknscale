"use client";

import { useState, useMemo } from "react";

const PC_BASE = {
  setupPerNode: 15000000,
  managedPerNode: 8500000,
  storagePerTB: 500000,
  backupPerTB: 300000,
  firewallBase: 2500000,
  monitoringBase: 1500000,
};

function formatRp(n: number) { return "Rp " + n.toLocaleString("id-ID"); }

function estimatePrivateCloud(nodes: number, storageTB: number, withBackup: boolean, withFirewall: boolean, withMonitoring: boolean) {
  const setupCost = nodes * PC_BASE.setupPerNode;
  let monthlyCost = nodes * PC_BASE.managedPerNode;
  monthlyCost += storageTB * PC_BASE.storagePerTB;
  if (withBackup) monthlyCost += storageTB * PC_BASE.backupPerTB;
  if (withFirewall) monthlyCost += PC_BASE.firewallBase;
  if (withMonitoring) monthlyCost += PC_BASE.monitoringBase;
  return { setupCost, monthlyCost };
}

export default function PCSection() {
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
      <p className="text-stone-500 mb-6 text-sm">Isi kebutuhan infrastruktur Anda untuk mendapat estimasi harga. Harga final ditentukan setelah konsultasi.</p>

      {/* Minimum Spec per Node */}
      <div className="mb-8 p-6 rounded-2xl bg-white border border-stone-200">
        <h3 className="text-sm font-bold text-[#1A1A2E] mb-4 uppercase tracking-wider">Spesifikasi Minimum per Node</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: "Processor", value: "80 Core CPU" },
            { label: "Memory", value: "256 GB RAM" },
            { label: "Storage", value: "1 TB NVMe/SSD" },
            { label: "Virtual Machine", value: "2 VM per Node" },
            { label: "Kapasitas", value: "1.000.000 txn/hari" },
            { label: "Network", value: "1 Gbps Uplink" },
            { label: "OS Support", value: "Linux / Windows" },
          ].map((spec, i) => (
            <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-100">
              <p className="text-[11px] text-stone-400 font-medium mb-1">{spec.label}</p>
              <p className="text-[#1A1A2E] font-semibold">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#1A1A2E]">Jumlah Server Node</label><span className="text-sm font-bold text-blue-600">{nodes} node</span></div>
            <input type="range" min={1} max={10} value={nodes} onChange={(e) => setNodes(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1"><span>1</span><span>3</span><span>5</span><span>10</span></div>
            <p className="text-[11px] text-stone-400 mt-1">Minimal 3 node untuk high availability</p>
          </div>
          <div>
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#1A1A2E]">Total Storage</label><span className="text-sm font-bold text-blue-600">{storageTB} TB</span></div>
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
                  <div className="flex items-center gap-3"><input type="checkbox" checked={addon.value} onChange={(e) => addon.setter(e.target.checked)} className="w-4 h-4 rounded border-stone-300 text-blue-600 focus:ring-blue-500" /><span className="text-sm text-[#1A1A2E]">{addon.label}</span></div>
                  <span className="text-xs text-stone-400">{addon.price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-2xl bg-[#1A1A2E] text-white">
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-4">Estimasi Harga</p>
            <div className="mb-6"><p className="text-stone-400 text-xs mb-1">Biaya Setup (1x bayar)</p><span className="text-3xl font-extrabold">{formatRp(estimate.setupCost)}</span></div>
            <div className="mb-6"><p className="text-stone-400 text-xs mb-1">Managed Service (per bulan)</p><span className="text-3xl font-extrabold">{formatRp(estimate.monthlyCost)}</span><span className="text-stone-400 text-sm">/bulan</span></div>
            <div className="space-y-2 text-sm text-stone-300 mb-6 border-t border-white/10 pt-4">
              <div className="flex justify-between"><span>{nodes} Node Server</span><span>{formatRp(nodes * PC_BASE.managedPerNode)}/bln</span></div>
              <div className="flex justify-between"><span>{storageTB} TB Storage</span><span>{formatRp(storageTB * PC_BASE.storagePerTB)}/bln</span></div>
              {withBackup && <div className="flex justify-between"><span>Backup & DR</span><span>{formatRp(storageTB * PC_BASE.backupPerTB)}/bln</span></div>}
              {withFirewall && <div className="flex justify-between"><span>Firewall & Security</span><span>{formatRp(PC_BASE.firewallBase)}/bln</span></div>}
              {withMonitoring && <div className="flex justify-between"><span>Monitoring & Alerting</span><span>{formatRp(PC_BASE.monitoringBase)}/bln</span></div>}
            </div>
            <p className="text-[11px] text-stone-500 mb-4">* Estimasi bersifat indikatif. Harga final disesuaikan setelah konsultasi teknis.</p>
            <a href={`https://wa.me/6281283031003?text=${encodeURIComponent(`Halo StacknScale, saya tertarik dengan Private Cloud (${nodes} node, ${storageTB}TB storage)`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors">Konsultasi via WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
