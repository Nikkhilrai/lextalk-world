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

// All-inclusive offer passes: the total is what the buyer pays; base and GST are its split.
const inclusive = (total: number) => {
    const price = Math.round(total / (1 + GST_RATE));
    return { price, gst: total - price, total };
};
export const MUMBAI_INCLUSIVE_PASSES = {
    "gc-inclusive": inclusive(7500),
    "law-firm-inclusive": inclusive(12500),
};
export type MumbaiInclusivePassType = keyof typeof MUMBAI_INCLUSIVE_PASSES;

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
    if (isMumbai && typeof passType === "string" && Object.hasOwn(MUMBAI_INCLUSIVE_PASSES, passType)) {
        const p = MUMBAI_INCLUSIVE_PASSES[passType as MumbaiInclusivePassType];
        return { originalPrice: p.price, discountedPrice: p.price, total: p.total };
    }
    return null;
}
