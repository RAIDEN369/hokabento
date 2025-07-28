import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GTM, GTMNoScript } from "@/lib/gtm";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://hokabento.com'),
  title: {
    default: "ほか弁当 - 美味しいお弁当と定食をお届け",
    template: "%s | ほか弁当",
  },
  description: "新鮮な食材を使用した手作りのお弁当と定食を提供しています。特製唐揚げ弁当、チキン南蛮定食、海鮮丼など豊富なメニューをご用意。毎日心を込めて調理いたします。",
  keywords: ["弁当", "定食", "丼物", "サイドメニュー", "テイクアウト", "配達", "お弁当屋"],
  authors: [{ name: "ほか弁当" }],
  creator: "ほか弁当",
  publisher: "ほか弁当",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://hokabento.com",
    siteName: "ほか弁当",
    title: "ほか弁当 - 美味しいお弁当と定食をお届け", 
    description: "新鮮な食材を使用した手作りのお弁当と定食を提供しています。特製唐揚げ弁当、チキン南蛮定食、海鮮丼など豊富なメニューをご用意。",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ほか弁当 - 美味しいお弁当と定食",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ほか弁当 - 美味しいお弁当と定食をお届け",
    description: "新鮮な食材を使用した手作りのお弁当と定食を提供しています。",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID

  return (
    <html lang="ja">
      <head>
        <GTM gtmId={gtmId} ga4Id={ga4Id} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GTMNoScript gtmId={gtmId} />
        <a href="#main-content" className="skip-link">
          メインコンテンツにスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
