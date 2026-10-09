import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Medal of Excellence 2027 | LexTalk World Singapore",
    description: "An evidence-led recognition programme for leaders and organisations advancing responsible AI, legal innovation, governance, cybersecurity and digital trust across Singapore and APAC. Presented at LexTalk World Singapore, 4 February 2027.",
};

export default function SingaporeAwardsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
