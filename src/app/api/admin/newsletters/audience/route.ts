import { NextRequest, NextResponse } from "next/server";
import { getAudienceCounts, AudienceSource } from "@/lib/newsletter-audience";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sourcesParam = searchParams.get("sources") || "delegates,leads,subscribers,sponsorship,counsel";
    const sources = sourcesParam.split(",").filter(Boolean) as AudienceSource[];

    const counts = await getAudienceCounts(sources);
    return NextResponse.json(counts);
}
