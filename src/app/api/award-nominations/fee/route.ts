import { NextRequest, NextResponse } from "next/server";
import { MUMBAI_EVENT, nominationEvent } from "@/lib/nominations/events";
import { nominationFee } from "@/lib/nominations/server";

/** The nomination fee as it will be charged, for showing on the payment buttons. */
export async function GET(req: NextRequest) {
    const ev = nominationEvent(req.nextUrl.searchParams.get("event")) ?? MUMBAI_EVENT;
    const [usd, inr] = await Promise.all([nominationFee("USD", ev), nominationFee("INR", ev)]);
    return NextResponse.json({ usd: usd?.display ?? null, inr: inr?.display ?? null });
}
