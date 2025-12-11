import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { OrganizationJsonLd } from "@/components/JsonLd";

// Elegant, high-contrast serif for headings - authoritative and professional
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-heading",
});

// Clean, geometric sans-serif for body text
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "LexTalk World | Global Legal Conference Platform",
    template: "%s | LexTalk World",
  },
  description: "LexTalk World is the Global Authority on Legal Tech. Join 500+ legal professionals from 30+ countries at our premier conferences. Connect, Lead, and Innovate with the world's top legal minds.",
  keywords: [
    "LexTalk World",
    "Lextalk",
    "Legal Conference",
    "Legal Tech",
    "Law Conference",
    "Dubai Legal Conference",
    "Legal Innovation",
    "Legal Technology",
    "Legal Awards",
    "Global Legal Platform",
    "Legal Professionals",
    "Law Firm Conference",
    "Legal Summit",
    "Asia Legal Conference",
  ],
  authors: [{ name: "LexTalk World" }],
  creator: "LexTalk World",
  publisher: "LexTalk World",
  metadataBase: new URL("https://lextalkworld.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lextalkworld.in",
    siteName: "LexTalk World",
    title: "LexTalk World | Global Legal Conference Platform",
    description: "The Global Authority on Legal Tech. Join 500+ legal professionals from 30+ countries. Connect, Lead, and Innovate.",
    images: [
      {
        url: "/logo/Lextalk-Logo.png",
        width: 1200,
        height: 630,
        alt: "LexTalk World - Global Legal Conference Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LexTalk World | Global Legal Conference Platform",
    description: "The Global Authority on Legal Tech. Connect, Lead, and Innovate with legal professionals worldwide.",
    images: ["/logo/Lextalk-Logo.png"],
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
  verification: {
    google: "VGxkaVCom6ZjS705UYvw7oO6sontjb5B1YgMyQpQEFk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <OrganizationJsonLd />
      </head>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}

