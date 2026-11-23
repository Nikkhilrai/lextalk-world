// Fixed-price Mumbai 2026 passes (INR). The server uses this table so the amount
// charged is never taken from the browser.
export const MUMBAI_LAW_FIRM_PASS_TYPE = "law-firm-lawyer";
export const MUMBAI_GENERAL_PASS_TYPE = "general";

const GST_RATE = 0.18;

export const MUMBAI_LAW_FIRM_PRICE = {
    listPrice: 47000, // regular price, excl. GST
    price: 20000, // Diwali offer, excl. GST
    gstRate: GST_RATE,
    total: Math.round(20000 * (1 + GST_RATE)), // 23,600 incl. GST
};

// General Pass: an all-inclusive ₹30,000 total (GST included). The base and GST
// are the split of that total, so the buyer is charged exactly ₹30,000.
const GENERAL_TOTAL = 30000;
const GENERAL_BASE = Math.round(GENERAL_TOTAL / (1 + GST_RATE)); // 25,424
export const MUMBAI_GENERAL_PRICE = {
    price: GENERAL_BASE, // excl. GST
    gst: GENERAL_TOTAL - GENERAL_BASE, // 4,576
    total: GENERAL_TOTAL,
};

export interface MumbaiFixedPrice {
    originalPrice: number;
    discountedPrice: number;
    total: number;
}

export function mumbaiFixedPrice(conferenceSlug: unknown, passType: unknown): MumbaiFixedPrice | null {
    const isMumbai = typeof conferenceSlug === "string" && conferenceSlug.toLowerCase().includes("mumbai");
    if (isMumbai && passType === MUMBAI_GENERAL_PASS_TYPE) {
        return {
            originalPrice: MUMBAI_GENERAL_PRICE.price,
            discountedPrice: MUMBAI_GENERAL_PRICE.price,
            total: MUMBAI_GENERAL_PRICE.total,
        };
    }
    if (isMumbai && passType === MUMBAI_LAW_FIRM_PASS_TYPE) {
        return {
            originalPrice: MUMBAI_LAW_FIRM_PRICE.listPrice,
            discountedPrice: MUMBAI_LAW_FIRM_PRICE.price,
            total: MUMBAI_LAW_FIRM_PRICE.total,
        };
    }
    return null;
}
