import { Metadata } from "next";
import { getAwardeesByEvent } from "@/actions/awardee";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { event } = await getAwardeesByEvent(slug);

    if (!event) {
        return {
            title: "Awardees | LexTalk World",
        };
    }

    return {
        title: `${event.name} Awardees | LexTalk World`,
        description: `Meet the distinguished awardees from ${event.name} - celebrating excellence in the legal profession.`,
        openGraph: {
            title: `${event.name} Awardees | LexTalk World`,
            description: `Meet the distinguished awardees from ${event.name} - celebrating excellence in the legal profession.`,
            images: event.image ? [event.image] : [],
        },
    };
}

export default function AwardeesEventLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
