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
  title: "StacknScale | IT & Cloud Consultant",
  description: "Konsultan IT untuk audit sistem, migrasi cloud lokal, dan pengembangan software. 7+ tahun pengalaman.",
  icons: {
    icon: [
      { url: '/logo-mark.png', type: 'image/png' },
    ],
    apple: '/logo-mark.png',
    shortcut: '/logo-mark.png',
  },
  openGraph: {
    title: 'StacknScale | Strategic IT Solutions',
    description: 'Konsultan IT yang bantu bisnis punya infrastruktur kuat dan biaya cloud yang masuk akal.',
    url: 'https://stacknscale.id',
    siteName: 'StacknScale',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <head>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}