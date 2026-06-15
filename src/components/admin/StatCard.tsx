import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    percentage?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    color: "primary" | "success" | "warning" | "danger" | "info" | "purple";
}

const COLOR_MAP = {
    primary: "text-[#405189] bg-[#405189]/10",
    success: "text-[#0ab39c] bg-[#0ab39c]/10",
    warning: "text-[#f7b84b] bg-[#f7b84b]/10",
    danger: "text-[#f06548] bg-[#f06548]/10",
    info: "text-[#3577f1] bg-[#3577f1]/10",
    purple: "text-[#6559cc] bg-[#6559cc]/10",
};

export function StatCard({ title, value, percentage, trendUp, icon: Icon, color }: StatCardProps) {
    return (
        <div className="vz-card rounded-sm p-5 h-full relative overflow-hidden group">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[#878a99] uppercase text-[11px] font-semibold tracking-wider mb-2">{title}</p>
                    <h4 className="text-2xl font-bold text-white mb-2">{value}</h4>
                </div>
                <div className={`p-3 rounded-lg ${COLOR_MAP[color]} flex items-center justify-center`}>
                    <Icon size={22} className="stroke-[2px]" />
                </div>
            </div>

            {percentage && (
                <div className="flex items-center gap-2 mt-2">
                    <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium ${trendUp ? "bg-[#0ab39c]/10 text-[#0ab39c]" : "bg-[#f06548]/10 text-[#f06548]"
                            }`}
                    >
                        {trendUp ? <ArrowUp size={10} className="mr-0.5" /> : <ArrowDown size={10} className="mr-0.5" />}
                        {percentage}
                    </span>
                    <span className="text-[#878a99] text-xs">vs. previous month</span>
                </div>
            )}

            {/* Link Overlay */}
            <a href="#" className="absolute inset-0 z-10 block" aria-label={`View details for ${title}`}></a>
        </div>
    );
}
