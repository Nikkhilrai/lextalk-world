import { NextRequest, NextResponse } from "next/server";
import { getAudienceCounts, AudienceSource } from "@/lib/newsletter-audience";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sourcesParam = searchParams.get("sources") || "delegates,leads,subscribers,sponsorship,counsel";
    const sources = sourcesParam.split(",").filter(Boolean) as AudienceSource[];

    const counts = await getAudienceCounts(sources);

    // compute total from unique merge (approximate — exact dedup requires full query)
    const total = counts.delegates + counts.leads + counts.subscribers + counts.sponsorship + counts.counsel;

    return NextResponse.json({ ...counts, total });
}
