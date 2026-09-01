import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { speakers } from "../dubai-speakers-data";
import { AGENDA } from "./agenda-data";
import { DubaiAgendaTimeline, type ResolvedDay } from "./DubaiAgendaTimeline";

// Headshots live in dubai-speakers-data.ts (the speakers page's source of truth).
// Resolving here — on the server — keeps the speaker bios out of the client bundle;
// only the name/role/image the agenda actually renders is shipped.
const HEADSHOTS = new Map(
    speakers.map(s => [s.name.trim().toLowerCase(), s.image] as const)
);

const days: ResolvedDay[] = AGENDA.map(day => ({
    ...day,
    sessions: day.sessions.map(session => ({
        ...session,
        speakers: session.speakers?.map(sp => ({
            ...sp,
            image: HEADSHOTS.get(sp.name.trim().toLowerCase()),
        })),
    })),
}));

export default function DubaiAgendaPage() {
    return (
        <main className="min-h-screen bg-[#050a15]">
            <Navbar />
            <DubaiAgendaTimeline days={days} />
            <Footer />
        </main>
    );
}
