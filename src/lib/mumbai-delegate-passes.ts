// Mumbai 2026 delegate passes (the public /mumbai-delegate-registration-2026 page).
// Prices exclude 18% GST. Shared by the registration page (display + checkout) and
// the Event structured data on /mumbai-2026, so search engines show the real prices.
export const MUMBAI_GST_RATE = 0.18;

export const MUMBAI_DELEGATE_PASSES = {
    student: { name: "Student & Academic Pass", usdPrice: 129, inrPrice: 12000, usdOriginalPrice: 129, inrOriginalPrice: 12000 },
    delegate: { name: "Corporate Delegate Pass", usdPrice: 199, inrPrice: 18000, usdOriginalPrice: 399, inrOriginalPrice: 36000 },
    "delegate-vip": { name: "Law Firm Exclusive Pass", usdPrice: 499, inrPrice: 47000, usdOriginalPrice: 799, inrOriginalPrice: 72000 },
    "vendor-vip": { name: "Vendor & Business VIP Pass", usdPrice: 899, inrPrice: 84000, usdOriginalPrice: 1999, inrOriginalPrice: 160000 },
} as const;
