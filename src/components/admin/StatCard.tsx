import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react";

type Color = "primary" | "success" | "warning" | "danger" | "info" | "purple" | "emerald" | "blue" | "amber";

interface StatCardProps {
    title: string;
    value: string | number;
    /** A short caption under the number. Shown with a trend arrow only when it is a percentage. */
    percentage?: string;
    /** Same as `percentage` (some pages use this name). */
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    color: Color | string;
}

const COLORS: Record<Color, string> = {
    primary: "text-[#8da2ea] bg-[#405189]/25 ring-[#5b6fb5]/30",
    success: "text-[#2dd4b4] bg-[#0ab39c]/15 ring-[#0ab39c]/25",
    emerald: "text-[#2dd4b4] bg-[#0ab39c]/15 ring-[#0ab39c]/25",
    warning: "text-[#f7c46c] bg-[#f7b84b]/15 ring-[#f7b84b]/25",
    amber: "text-[#f7c46c] bg-[#f7b84b]/15 ring-[#f7b84b]/25",
    danger: "text-[#ff8a73] bg-[#f06548]/15 ring-[#f06548]/25",
    info: "text-[#6ea1ff] bg-[#3577f1]/15 ring-[#3577f1]/25",
    blue: "text-[#6ea1ff] bg-[#3577f1]/15 ring-[#3577f1]/25",
    purple: "text-[#a99df0] bg-[#6559cc]/20 ring-[#6559cc]/30",
};

export function StatCard({ title, value, percentage: pct, trend, trendUp, icon: Icon, color }: StatCardProps) {
    const percentage = pct ?? trend;
    const isTrend = !!percentage && /%$/.test(percentage.trim());
    return (
        <div className="vz-card rounded-2xl p-5 h-full">
            <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                    <p className="text-[#7c8db5] text-[12px] font-medium mb-2">{title}</p>
                    <p className="text-[26px] leading-none font-semibold text-white tabular-nums">{value}</p>
                </div>
                <div className={`shrink-0 w-10 h-10 rounded-xl ring-1 ring-inset flex items-center justify-center ${COLORS[color as Color] ?? COLORS.primary}`}>
                    <Icon size={19} />
                </div>
            </div>

            {percentage && (
                <div className="mt-4 text-[12px]">
                    {isTrend ? (
                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-medium ${trendUp ? "bg-[#0ab39c]/15 text-[#2dd4b4]" : "bg-[#f06548]/15 text-[#ff8a73]"}`}>
                            {trendUp ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                            {percentage}
                        </span>
                    ) : (
                        <span className="text-[#7c8db5]">{percentage}</span>
                    )}
                </div>
            )}
        </div>
    );
}
