import type { LucideIcon } from "lucide-react";

const fmt = (n: number) => n.toLocaleString("en-IN");

/** A ranked list with a proportional bar behind each row. */
export function BarList({ icon: Icon, title, unit, rows, mono, empty = "No data yet.", tone = "#405189" }: {
    icon: LucideIcon;
    title: string;
    unit?: string;
    rows: { label: string; n: number }[];
    mono?: boolean;
    empty?: string;
    tone?: string;
}) {
    const max = Math.max(1, ...rows.map(r => r.n));
    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <Icon size={15} className="text-[#7c8db5]" />
                <h3 className="text-[13px] font-semibold text-[#c9d2ea]">{title}</h3>
                {unit && <span className="ml-auto text-[11px] text-[#5d6b8f]">{unit}</span>}
            </div>
            {rows.length === 0 ? <p className="text-[12px] text-[#5d6b8f] px-2.5 py-1.5">{empty}</p> : (
                <ul className="space-y-1.5">
                    {rows.map(r => (
                        <li key={r.label} className="relative flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-md overflow-hidden">
                            <span className="absolute inset-y-0 left-0 rounded-md" style={{ width: `${(r.n / max) * 100}%`, background: `${tone}40` }} />
                            <span className={`relative truncate text-[12.5px] text-[#c9d2ea] ${mono ? "font-mono text-[11.5px]" : ""}`} title={r.label}>{r.label}</span>
                            <span className="relative text-[12px] tabular-nums text-white/90">{fmt(r.n)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
