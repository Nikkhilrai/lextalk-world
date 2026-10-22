// Single source of truth for Singapore 2027 delegate pass prices (SGD, per attendee).
// Used by the passes page for display and by the API routes so the amount charged is
// never taken from the browser.
export const SINGAPORE_CURRENCY = "SGD";

export const SINGAPORE_PASS_PRICES: Record<string, number> = {
    "corporate-counsel": 249,
    "law-firm-partner": 499,
    "vendor": 899,
};

export function singaporePassPrice(passType: unknown): number | null {
    return typeof passType === "string" && passType in SINGAPORE_PASS_PRICES
        ? SINGAPORE_PASS_PRICES[passType]
        : null;
}
