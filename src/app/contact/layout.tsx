import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with LexTalk World. Contact us for event inquiries, sponsorship opportunities, speaking engagements, and partnerships. We're here to help.",
    keywords: [
        "Contact LexTalk World",
        "Legal Conference Inquiry",
        "Sponsorship Opportunities",
        "Speaking Engagement",
        "Partnership Inquiry",
        "Event Contact",
    ],
    openGraph: {
        title: "Contact Us | LexTalk World",
        description: "Get in touch for event inquiries, sponsorship opportunities, and partnerships.",
        url: "https://lextalkworld.in/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
