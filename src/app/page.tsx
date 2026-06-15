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
import { ShowGuideBanner } from "@/components/ShowGuideBanner";
import { Footer } from "@/components/Footer";


export const metadata: Metadata = {
  title: "LexTalk World | Legal Tech Conference & Legal Honor Global | Dubai 9th - 10th Sep 2026",
  description: "LexTalk World is the Global Authority on Legal Tech. Join our flagship conference in Dubai 9th - 10th Sep 2026. Networking, Awards, and Innovation for legal professionals worldwide.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <FeaturedIn />
      <EventsList />
      <ShowGuideBanner />
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
