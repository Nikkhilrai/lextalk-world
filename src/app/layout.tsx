import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { SupportChatWidget } from "@/components/SupportChatWidget";
import { Toaster } from "react-hot-toast";

// Elegant, high-contrast serif for headings - authoritative and professional
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
    default: "LexTalk World | Global Legal Conference & Tech Platform | Middle East & Asia",
    template: "%s | LexTalk World",
  },
  description: "LexTalk World is the Global Authority on Legal Tech. Organizing premier legal conferences in Dubai, Mumbai, and globally. Join 500+ legal professionals for award-winning networking and innovation.",
  keywords: [
    "LexTalk World",
    "Lextalk",
    "Global Legal Conference",
    "Legal Tech Dubai",
    "Legal Tech 2026",
    "Dubai Legal Conference 2026",
    "Legal Awards Global",
    "Legal Technology Summit",
    "Law Firm Excellence Awards",
    "Asia Legal Conference",
    "Middle East Legal Tech",
    "Legal Networking Event",
    "Legal Innovation Forum",
    "legalhonor.com",
    "lextalkworld.org",
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
        url: "/logo/favicon.png",
        width: 512,
        height: 512,
        alt: "LexTalk World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LexTalk World | Global Legal Conference Platform",
    description: "The Global Authority on Legal Tech. Connect, Lead, and Innovate with legal professionals worldwide.",
    images: ["/logo/favicon.png"],
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
  icons: {
    icon: [
      { url: "/favicon/faviconlextalk-logo.svg", type: "image/svg+xml" },
      { url: "/logo/favicon.png", type: "image/png" },
    ],
    shortcut: "/logo/favicon.png",
    apple: "/logo/favicon.png",
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
        <ToastProvider>
          <CartProvider>
            {children}
            {/* Replaces the old FloatingActions cluster (WhatsApp/Call/Instagram/
                LinkedIn/Register bubbles) sitewide — those links still live in the
                Footer, but the floating corner is now a single "Ask Lex" launcher,
                matching the minimal one-button pattern on lextalk.world's own site
                rather than an expanding menu of options.
                Off unless explicitly enabled: the support agent is a separate service,
                and a chat bubble that errors on every message is worse than no bubble.
                Set NEXT_PUBLIC_SUPPORT_AGENT_ENABLED=true once the agent is deployed. */}
            {process.env.NEXT_PUBLIC_SUPPORT_AGENT_ENABLED === "true" && <SupportChatWidget />}
            <Toaster position="bottom-right" />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

