import { Metadata } from "next";

export const metadata: Metadata = {
    title: "General Pass — LexTalk World Mumbai 2026",
    description: "The all-inclusive LexTalk World Mumbai 2026 General Pass at ₹30,000 inclusive of all taxes. Two days of sessions, networking and more, 7–8 December 2026.",
};

export default function MumbaiGeneralPassLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
