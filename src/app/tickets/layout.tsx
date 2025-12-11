import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tickets",
    description: "Get your tickets for LexTalk World Summit. Early bird discounts available. Choose from Standard, Premium, and VIP passes for our global legal conferences.",
    keywords: [
        "Legal Conference Tickets",
        "LexTalk World Tickets",
        "Legal Summit Pass",
        "Conference Registration",
        "Legal Event Tickets",
        "VIP Conference Pass",
    ],
    openGraph: {
        title: "Get Tickets | LexTalk World",
        description: "Secure your spot at LexTalk World Summit. Early bird discounts available.",
        url: "https://lextalkworld.in/tickets",
    },
};

export default function TicketsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
