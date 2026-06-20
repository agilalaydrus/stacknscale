import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - VPS, Dedicated Server & Private Cloud",
  description: "Harga transparan untuk VPS, Dedicated Server, dan Private Cloud. Mulai dari Rp 480.000/bulan. Termasuk Snapshot, Backup, Firewall, dan support 24/7.",
  keywords: [
    "harga VPS Indonesia",
    "dedicated server murah",
    "private cloud Indonesia",
    "cloud hosting Indonesia",
    "VPS SSD Indonesia",
    "colocation server",
    "managed VPS",
  ],
  openGraph: {
    title: "Pricing - VPS, Dedicated Server & Private Cloud | StacknScale",
    description: "Harga transparan untuk VPS, Dedicated Server, dan Private Cloud. Mulai dari Rp 480.000/bulan.",
    url: "https://stacknscale.id/pricing",
  },
  alternates: {
    canonical: "https://stacknscale.id/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
