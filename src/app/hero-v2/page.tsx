import { Navbar } from "@/components/Navbar";
import { HeroV2 } from "@/components/HeroV2/HeroV2";
import { FeaturedIn } from "@/components/FeaturedIn";
import { EventsList } from "@/components/EventsList";
import { Footer } from "@/components/Footer";

export default function HeroV2Preview() {
    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />
            <HeroV2 />
            <FeaturedIn />
            <EventsList />
            <Footer />
        </main>
    );
}
