import { getAwardeesByEvent } from "@/actions/awardee";
import { notFound } from "next/navigation";
import AwardeeEventClient from "./AwardeeEventClient";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function AwardeesEventPage({ params }: Props) {
    const { slug } = await params;
    const { success, event, categories } = await getAwardeesByEvent(slug);

    if (!success || !event) {
        notFound();
    }

    return (
        <AwardeeEventClient
            event={event as any}
            categories={categories as any}
        />
    );
}
