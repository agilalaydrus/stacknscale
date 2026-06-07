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

// UPDATE: SEO, Open Graph (Share Link Image), dan Favicon
export const metadata: Metadata = {
  title: "StacknScale | IT & Cloud Consultant",
  description: "Layanan end-to-end audit IT, migrasi cloud, dan software development untuk skala Enterprise.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'StacknScale | Strategic IT Solutions',
    description: 'Sistem yang aman. Bisnis yang tenang. Konsultasikan arsitektur IT Anda bersama kami.',
    url: 'https://stacknscale.id',
    siteName: 'StacknScale',
    images: [
      {
        url: '/og-image.jpg', // Memanggil gambar banner di folder public/
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
        {/* GOOGLE ANALYTICS */}
        {/* TODO: Ganti tulisan G-XXXXXXXXXX di bawah ini dengan Measurement ID Google Analytics Anda */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}