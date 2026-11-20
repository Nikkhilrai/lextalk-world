import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MUMBAI_AGENDA } from "./agenda-data";
import { MumbaiAgendaTimeline } from "./MumbaiAgendaTimeline";

export default function MumbaiAgendaPage() {
    return (
        <main className="min-h-screen bg-[#faf8f3]">
            <Navbar variant="light" />
            <MumbaiAgendaTimeline days={MUMBAI_AGENDA} />
            <Footer />
        </main>
    );
}
