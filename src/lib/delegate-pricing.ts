// Server-side price list for every delegate pass that is on sale. The amount
// charged is always computed here; nothing about the price comes from the browser.
import { MUMBAI_DELEGATE_PASSES, MUMBAI_GST_RATE } from "@/lib/mumbai-delegate-passes";
import { mumbaiFixedPrice } from "@/lib/mumbai-pass-prices";
import { SINGAPORE_PASS_PRICES, SINGAPORE_CURRENCY } from "@/lib/singapore-pass-prices";

/** INR, excluding GST. Shown on /mumbai-corporate-counsel-pass. */
export const MUMBAI_CORPORATE_COUNSEL_PRICE = 9999;

/** Events still selling passes. Dubai and Bangalore 2026 are over. */
export const OPEN_CONFERENCES = ["mumbai-2026", "singapore-2027"];

export const isOpenConference = (slug: unknown): slug is string =>
    typeof slug === "string" && OPEN_CONFERENCES.includes(slug);

export type PassQuote =
    | { ok: true; originalPrice: number; discountedPrice: number; amount: number; couponsAllowed: boolean }
    | { ok: false; error: string };

const round2 = (n: number) => Math.round(n * 100) / 100;

export function quotePass(conferenceSlug: string, passType: unknown, currency: unknown, discountPct = 0): PassQuote {
    const unknownPass: PassQuote = { ok: false, error: "Unknown pass type" };
    const badCurrency: PassQuote = { ok: false, error: "Invalid currency" };
    if (typeof passType !== "string") return unknownPass;
    const mult = 1 - Math.min(Math.max(discountPct, 0), 100) / 100;

    if (conferenceSlug === "singapore-2027") {
        if (!Object.hasOwn(SINGAPORE_PASS_PRICES, passType)) return unknownPass;
        const price = SINGAPORE_PASS_PRICES[passType];
        if (currency !== SINGAPORE_CURRENCY) return badCurrency;
        return { ok: true, originalPrice: price, discountedPrice: price, amount: price, couponsAllowed: false };
    }

    if (conferenceSlug !== "mumbai-2026") return unknownPass;

    const fixed = mumbaiFixedPrice(conferenceSlug, passType);
    if (fixed) {
        if (currency !== "INR") return badCurrency;
        return { ok: true, originalPrice: fixed.originalPrice, discountedPrice: fixed.discountedPrice, amount: fixed.total, couponsAllowed: false };
    }

    let base: number;
    if (passType === "corporate-counsel") {
        if (currency !== "INR") return badCurrency;
        base = MUMBAI_CORPORATE_COUNSEL_PRICE;
    } else if (Object.hasOwn(MUMBAI_DELEGATE_PASSES, passType)) {
        const pass = MUMBAI_DELEGATE_PASSES[passType as keyof typeof MUMBAI_DELEGATE_PASSES];
        if (currency !== "INR" && currency !== "USD") return badCurrency;
        base = currency === "INR" ? pass.inrPrice : pass.usdPrice;
    } else {
        return unknownPass;
    }

    // Same rounding as the checkout screens, so the buyer pays exactly what is shown.
    const discounted = currency === "INR" ? Math.round(base * mult) : round2(base * mult);
    const withGst = discounted * (1 + MUMBAI_GST_RATE);
    const amount = currency === "INR" ? Math.round(withGst) : round2(withGst);
    return { ok: true, originalPrice: base, discountedPrice: discounted, amount, couponsAllowed: true };
}
