import { Globe2, MonitorSmartphone, MousePointerClick, Radio } from "lucide-react";
import { getAnalyticsData, getRealTimeUsers } from "@/actions/analytics";

const fmt = (n: number) => n.toLocaleString("en-IN");
const duration = (s: number) => `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;

/** Google Analytics, last 30 days. Server-rendered and streamed in after the rest of the page. */
export async function WebsiteTraffic() {
    const [res, live] = await Promise.all([getAnalyticsData(), getRealTimeUsers()]);

    if (!res.success || !res.data) {
        return (
            <section className="vz-card rounded-2xl p-6">
                <Heading live={null} />
                <p className="text-[13px] text-[#7c8db5]">Couldn&apos;t load Google Analytics, so traffic figures aren&apos;t shown. Use Refresh to try again; if it keeps happening, check the GOOGLE_ANALYTICS_PRIVATE_KEY setting.</p>
            </section>
        );
    }

    const d = res.data;
    const tiles = [
        { label: "Visitors", value: fmt(d.activeUsers), sub: `${fmt(d.newUsers)} new` },
        { label: "Sessions", value: fmt(d.sessions), sub: d.activeUsers ? `${(d.sessions / d.activeUsers).toFixed(1)} per visitor` : "" },
        { label: "Page views", value: fmt(d.pageViews), sub: d.sessions ? `${(d.pageViews / d.sessions).toFixed(1)} per session` : "" },
        { label: "Avg. session", value: duration(d.avgSessionDuration), sub: `${(d.bounceRate * 100).toFixed(0)}% bounce rate` },
    ];

    return (
        <section className="vz-card rounded-2xl p-6">
            <Heading live={live.success ? live.count : null} />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {tiles.map(t => (
                    <div key={t.label} className="rounded-xl bg-white/[0.03] ring-1 ring-inset ring-white/[0.05] p-4">
                        <p className="text-[12px] text-[#7c8db5] mb-1.5">{t.label}</p>
                        <p className="text-[22px] leading-none font-semibold text-white tabular-nums">{t.value}</p>
                        {t.sub && <p className="text-[11.5px] text-[#5d6b8f] mt-2">{t.sub}</p>}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <BarList icon={MousePointerClick} title="Top pages" unit="views" rows={d.topPages.slice(0, 8).map(p => ({ label: p.page, n: p.views }))} mono />
                <BarList icon={Globe2} title="Top countries" unit="sessions" rows={d.topCountries.slice(0, 8).map(c => ({ label: c.country, n: c.users }))} />
                <div className="space-y-6">
                    <BarList icon={Radio} title="Traffic sources" unit="sessions" rows={d.trafficSources.slice(0, 5).map(s => ({ label: s.source, n: s.sessions }))} />
                    <BarList icon={MonitorSmartphone} title="Devices" unit="sessions" rows={d.deviceCategories.map(c => ({ label: c.device.replace(/^\w/, x => x.toUpperCase()), n: c.users }))} />
                </div>
            </div>
        </section>
    );
}

function Heading({ live }: { live: number | null }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
                <h2 className="text-[15px] font-semibold text-white">Website traffic</h2>
                <p className="text-[12px] text-[#7c8db5] mt-0.5">Google Analytics · last 30 days</p>
            </div>
            {live !== null && (
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0ab39c]/15 text-[#2dd4b4] text-[12px] font-medium">
                    <span className="relative flex w-2 h-2">
                        <span className="absolute inset-0 rounded-full bg-[#2dd4b4] animate-ping opacity-60" />
                        <span className="relative w-2 h-2 rounded-full bg-[#2dd4b4]" />
                    </span>
                    {live} on the site now
                </span>
            )}
        </div>
    );
}

function BarList({ icon: Icon, title, unit, rows, mono }: { icon: typeof Globe2; title: string; unit: string; rows: { label: string; n: number }[]; mono?: boolean }) {
    const max = Math.max(1, ...rows.map(r => r.n));
    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <Icon size={15} className="text-[#7c8db5]" />
                <h3 className="text-[13px] font-semibold text-[#c9d2ea]">{title}</h3>
                <span className="ml-auto text-[11px] text-[#5d6b8f]">{unit}</span>
            </div>
            {rows.length === 0 ? <p className="text-[12px] text-[#5d6b8f]">No data yet.</p> : (
                <ul className="space-y-1.5">
                    {rows.map(r => (
                        <li key={r.label} className="relative flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-md overflow-hidden">
                            <span className="absolute inset-y-0 left-0 bg-[#405189]/25 rounded-md" style={{ width: `${(r.n / max) * 100}%` }} />
                            <span className={`relative truncate text-[12.5px] text-[#c9d2ea] ${mono ? "font-mono text-[11.5px]" : ""}`} title={r.label}>{r.label}</span>
                            <span className="relative text-[12px] tabular-nums text-white/90">{fmt(r.n)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
