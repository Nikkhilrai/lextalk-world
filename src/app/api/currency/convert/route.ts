
import { NextResponse } from "next/server";

// Cache the exchange rate for 1 hour to avoid excessive API calls
let cachedRate: { rate: number; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function GET() {
    try {
        // Check if we have a valid cached rate
        if (cachedRate && Date.now() - cachedRate.timestamp < CACHE_DURATION) {
            return NextResponse.json({
                rate: cachedRate.rate,
                source: "cached",
                timestamp: cachedRate.timestamp
            });
        }

        // Fetch live rate from ExchangeRate API (free tier)
        const response = await fetch(
            "https://open.er-api.com/v6/latest/USD",
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rate");
        }

        const data = await response.json();
        const inrRate = data.rates?.INR;

        if (!inrRate) {
            throw new Error("INR rate not found in response");
        }

        // Update cache
        cachedRate = {
            rate: inrRate,
            timestamp: Date.now()
        };

        return NextResponse.json({
            rate: inrRate,
            source: "live",
            timestamp: cachedRate.timestamp
        });

    } catch (error) {
        console.error("Currency conversion error:", error);

        // Fallback rate if API fails (approximate rate)
        const fallbackRate = 83.5;

        return NextResponse.json({
            rate: fallbackRate,
            source: "fallback",
            timestamp: Date.now()
        });
    }
}
