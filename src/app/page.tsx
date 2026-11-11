import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedIn } from "@/components/FeaturedIn";
import { EventsList } from "@/components/EventsList";
import { SupportingAssociations } from "@/components/SupportingAssociations";
import { Testimonials } from "@/components/Testimonials";
import { MediaPartners } from "@/components/MediaPartners";
import { AdvisoryBoard } from "@/components/AdvisoryBoard";
import { WhoShouldJoin } from "@/components/WhoShouldJoin";
import { FAQ } from "@/components/FAQ";
import { StayUpdated } from "@/components/StayUpdated";
import { Footer } from "@/components/Footer";


const HOME_TITLE = "LexTalk World | Legal Tech & AI Law Conferences and Legal Honor Global Awards";
const HOME_DESCRIPTION =
  "LexTalk World is the global platform for legal, AI governance, risk and compliance leaders. Join LexTalk World Mumbai (7–8 December 2026) and APAC Singapore (4 February 2027) — conferences, exhibitions and the Legal Honor Global Awards.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://lextalkworld.in",
    siteName: "LexTalk World",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630, alt: "LexTalk World" }],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <FeaturedIn />
      <EventsList />
      <AdvisoryBoard />
      <WhoShouldJoin />
      <SupportingAssociations />
      <Testimonials />
      <MediaPartners />
      <FAQ />
      <StayUpdated />
      <Footer />
    </main>
  );
}
