import { SpeakerInterestForm } from "@/components/SpeakerInterestForm";

export default function MumbaiSpeakerInterestFormPage() {
    return (
        <SpeakerInterestForm
            defaultConference="LexTalk World Mumbai 2026"
            event={{
                name: "LexTalk World Mumbai 2026",
                details: "7–8 December 2026 · Radisson Blu Mumbai International Airport",
            }}
        />
    );
}
