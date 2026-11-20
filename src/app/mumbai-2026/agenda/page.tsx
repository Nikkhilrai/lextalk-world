import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DubaiAgendaTimeline, type AgendaEventInfo, type ResolvedDay } from "@/app/dubai-2026/agenda/DubaiAgendaTimeline";
import { MUMBAI_AGENDA } from "./agenda-data";
import { DownloadAgendaButton } from "./DownloadAgendaButton";

// Same timeline design as /dubai-2026/agenda, with Mumbai's dates, venue and links.
const EVENT: AgendaEventInfo = {
    dates: "7 – 8 December 2026",
    venue: "Radisson Blu Mumbai International Airport",
    speakersLabel: "50+ Speakers",
    intro: "Two days of keynotes, GC power panels, round tables and case studies in India's commercial capital — closing with the India Legal Honors.",
    footnote: (
        <>
            Programme subject to minor adjustments. All times are India Standard Time (IST).
            <br className="hidden sm:block" />
            Speakers for each session will be announced soon.
        </>
    ),
    ctaTitle: "Secure your seat in Mumbai",
    ctaText: "Join General Counsel, law firm partners and legal technology leaders across two days at Radisson Blu Mumbai International Airport.",
    registerHref: "/mumbai-delegate-registration-2026",
    speakersHref: "/mumbai-2026/speakers",
};

const days: ResolvedDay[] = MUMBAI_AGENDA;

export default function MumbaiAgendaPage() {
    return (
        <main className="min-h-screen bg-[#050a15]">
            <Navbar />
            <DubaiAgendaTimeline days={days} event={EVENT} heroActions={<DownloadAgendaButton />} />
            <Footer />
        </main>
    );
}
