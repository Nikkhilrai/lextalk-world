// Fixed-price Mumbai 2026 passes (INR). The server uses this table so the amount
// charged is never taken from the browser.
export const MUMBAI_LAW_FIRM_PASS_TYPE = "law-firm-lawyer";

const GST_RATE = 0.18;

export const MUMBAI_LAW_FIRM_PRICE = {
    listPrice: 47000, // regular price, excl. GST
    price: 20000, // Diwali offer, excl. GST
    gstRate: GST_RATE,
    total: Math.round(20000 * (1 + GST_RATE)), // 23,600 incl. GST
};

export interface MumbaiFixedPrice {
    originalPrice: number;
    discountedPrice: number;
    total: number;
}

export function mumbaiFixedPrice(conferenceSlug: unknown, passType: unknown): MumbaiFixedPrice | null {
    if (
        typeof conferenceSlug === "string" &&
        conferenceSlug.toLowerCase().includes("mumbai") &&
        passType === MUMBAI_LAW_FIRM_PASS_TYPE
    ) {
        return {
            originalPrice: MUMBAI_LAW_FIRM_PRICE.listPrice,
            discountedPrice: MUMBAI_LAW_FIRM_PRICE.price,
            total: MUMBAI_LAW_FIRM_PRICE.total,
        };
    }
    return null;
}
