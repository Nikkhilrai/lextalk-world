import { NextResponse } from "next/server";
import { nominationFee } from "@/lib/nominations/server";

/** The nomination fee as it will be charged, for showing on the payment buttons. */
export async function GET() {
    const [usd, inr] = await Promise.all([nominationFee("USD"), nominationFee("INR")]);
    return NextResponse.json({ usd: usd?.display ?? null, inr: inr?.display ?? null });
}
