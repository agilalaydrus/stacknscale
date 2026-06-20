import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stacknscale.id'),
  title: {
    default: "StacknScale | IT & Cloud Consultant Indonesia",
    template: "%s | StacknScale",
  },
  description: "Konsultan IT untuk audit sistem, migrasi cloud lokal, VPS, dedicated server, private cloud, dan pengembangan software. 7+ tahun pengalaman.",
  keywords: [
    "konsultan IT Indonesia",
    "cloud migration",
    "VPS Indonesia",
    "dedicated server Indonesia",
    "private cloud",
    "audit IT",
    "DevOps",
    "managed service",
    "infrastruktur cloud",
    "migrasi cloud lokal",
    "colocation Indonesia",
    "StacknScale",
  ],
  authors: [{ name: "StacknScale" }],
  creator: "StacknScale",
  icons: {
    icon: [
      { url: '/logo-mark.png', type: 'image/png' },
    ],
    apple: '/logo-mark.png',
    shortcut: '/logo-mark.png',
  },
  openGraph: {
    title: 'StacknScale | IT & Cloud Consultant Indonesia',
    description: 'Konsultan IT yang bantu bisnis punya infrastruktur kuat dan biaya cloud yang masuk akal. VPS, Dedicated Server, Private Cloud.',
    url: 'https://stacknscale.id',
    siteName: 'StacknScale',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'StacknScale - IT & Cloud Consultant',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StacknScale | IT & Cloud Consultant Indonesia',
    description: 'Konsultan IT untuk audit sistem, migrasi cloud lokal, VPS, dedicated server, dan private cloud.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://stacknscale.id',
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'your-verification-code',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'StacknScale',
  description: 'Konsultan IT untuk audit sistem, migrasi cloud lokal, VPS, dedicated server, private cloud, dan pengembangan software.',
  url: 'https://stacknscale.id',
  logo: 'https://stacknscale.id/logo-mark.png',
  image: 'https://stacknscale.id/og-image.jpg',
  telephone: '+6281283031003',
  email: 'agilalidrus89@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Indonesia',
  },
  serviceType: [
    'IT Consulting',
    'Cloud Migration',
    'VPS Hosting',
    'Dedicated Server',
    'Private Cloud',
    'DevOps',
    'Cyber Security Audit',
    'Managed Service',
  ],
  priceRange: 'Rp 125.000 - Rp 15.000.000+/bulan',
  knowsAbout: [
    'Cloud Computing',
    'Infrastructure as a Service',
    'DevOps',
    'Kubernetes',
    'Docker',
    'PostgreSQL',
    'Linux Administration',
    'Network Security',
  ],
  sameAs: [
    'https://instagram.com/stacknscale.id',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
