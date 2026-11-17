import { Suspense } from "react";
import Link from "next/link";
import {
    ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, Download, ExternalLink, MapPin,
    MessagesSquare, Mic, Target, Users, Mail, type LucideIcon,
} from "lucide-react";
import { getAdminProfile } from "@/actions/auth";
import { getDashboardData, type ActivityItem, type EventCard } from "@/lib/admin-dashboard";
import { ActivityChart } from "@/components/admin/dashboard/ActivityChart";
import { RefreshButton } from "@/components/admin/dashboard/RefreshButton";
import { WebsiteTraffic } from "@/components/admin/dashboard/WebsiteTraffic";

export const dynamic = "force-dynamic";

const TZ = "Asia/Kolkata";

export default async function AdminDashboard() {
    const [{ profile }, data] = await Promise.all([getAdminProfile(), getDashboardData()]);
    const firstName = (profile?.name || "there").split(" ")[0];
    const now = new Date(data.generatedAt);
    const hour = Number(now.toLocaleString("en-GB", { hour: "numeric", hour12: false, timeZone: TZ }));
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const k = data.kpis;

    return (
        <div className="max-w-[1500px] mx-auto space-y-6 pb-10">
            {/* Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-[22px] sm:text-[26px] font-semibold text-white">{greeting}, {firstName}</h1>
                    <p className="text-[13px] text-[#7c8db5] mt-1">
                        {now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ })}
                        <span className="text-[#3b4566] mx-2">·</span>
                        Updated {now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: TZ })} IST
                    </p>
                </div>
                <RefreshButton />
            </div>

            {/* Upcoming events */}
            {data.events.length > 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {data.events.map(ev => <EventPanel key={ev.key} ev={ev} />)}
                </div>
            )}

            {/* This week */}
            <section>
                <div className="flex items-baseline justify-between mb-3">
                    <h2 className="text-[15px] font-semibold text-white">Last 7 days</h2>
                    <span className="text-[12px] text-[#5d6b8f]">compared with the 7 days before</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                    <Kpi label="New leads" icon={Target} tone="#6ea1ff" href="/admin/leads" {...k.leads} />
                    <Kpi label="Agenda downloads" icon={Download} tone="#2dd4b4" href="/admin/agenda-downloads" {...k.agendas} />
                    <Kpi label="Paid delegates" icon={Users} tone="#f7c46c" href="/admin/delegate-registrations" {...k.delegates} />
                    <Kpi label="Speaker applications" icon={Mic} tone="#a99df0" href="/admin/speaker-applications" {...k.speakers} />
                    <Kpi label="Newsletter sign-ups" icon={Mail} tone="#ff8a73" href="/admin/newsletter" {...k.subscribers} />
                    <Kpi label="Chatbot conversations" icon={MessagesSquare} tone="#6ea1ff" href="/admin/chat-conversations" {...k.chats} />
                </div>
            </section>

            {/* Trend + attention */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <section className="vz-card rounded-2xl p-6 xl:col-span-2 h-[380px] flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-[15px] font-semibold text-white">Daily activity</h2>
                        <p className="text-[12px] text-[#7c8db5] mt-0.5">Last 30 days · tap a series to hide it</p>
                    </div>
                    <div className="flex-1 min-h-0"><ActivityChart data={data.trend} /></div>
                </section>

                <section className="vz-card rounded-2xl p-6 flex flex-col">
                    <h2 className="text-[15px] font-semibold text-white">Needs attention</h2>
                    <p className="text-[12px] text-[#7c8db5] mt-0.5 mb-4">Items still marked “New”</p>
                    {data.attention.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                            <CheckCircle2 size={28} className="text-[#2dd4b4] mb-2" />
                            <p className="text-[13px] text-[#c9d2ea]">All caught up</p>
                        </div>
                    ) : (
                        <ul className="space-y-1.5">
                            {data.attention.map(a => (
                                <li key={a.href}>
                                    <Link href={a.href} className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
                                        <span className="min-w-[38px] h-7 px-2 rounded-lg bg-[#f7b84b]/15 text-[#f7c46c] text-[12.5px] font-semibold tabular-nums flex items-center justify-center">{a.n}</span>
                                        <span className="flex-1 text-[13px] text-[#c9d2ea] group-hover:text-white">{a.label}</span>
                                        <ArrowRight size={14} className="text-[#3b4566] group-hover:text-[#a3b0cf] transition-colors" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>

            {/* Recent activity */}
            <section className="vz-card rounded-2xl p-6">
                <h2 className="text-[15px] font-semibold text-white">Latest activity</h2>
                <p className="text-[12px] text-[#7c8db5] mt-0.5 mb-4">The newest submissions across every form on the site</p>
                {data.recent.length === 0 ? <p className="text-[13px] text-[#7c8db5]">Nothing yet.</p> : (
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                        {data.recent.map((r, i) => <ActivityRow key={i} item={r} now={now} />)}
                    </ul>
                )}
            </section>

            {/* Google Analytics — slow, so it streams in last */}
            <Suspense fallback={<TrafficSkeleton />}>
                <WebsiteTraffic />
            </Suspense>
        </div>
    );
}

/* ------------------------------------------------------------------ */

function EventPanel({ ev }: { ev: EventCard }) {
    const when = ev.startsIn > 1 ? `in ${ev.startsIn} days` : ev.startsIn === 1 ? "tomorrow" : ev.startsIn === 0 ? "today" : "happening now";
    const stats: { label: string; value: number; sub?: string; href: string }[] = [
        { label: "Paid delegates", value: ev.delegatesPaid, sub: ev.delegatesPending ? `+${ev.delegatesPending} didn't finish payment` : undefined, href: "/admin/delegate-registrations" },
        { label: "Agenda downloads", value: ev.agendas, href: "/admin/agenda-downloads" },
        { label: "Leads", value: ev.leads, href: "/admin/leads" },
        { label: "Speaker applications", value: ev.speakers, href: "/admin/speaker-applications" },
        { label: "Nominations", value: ev.nominations, href: "/admin/nominations" },
        { label: "Consent forms", value: ev.consent, href: "/admin/delegate-consent" },
    ];
    return (
        <section className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#1d2650] via-[#161d3a] to-[#121831] ring-1 ring-inset ring-[#5b6fb5]/25">
            <div className="pointer-events-none absolute -top-20 -right-16 w-64 h-64 rounded-full bg-[#405189]/30 blur-3xl" />
            <div className="relative flex flex-wrap items-start justify-between gap-3 mb-5">
                <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2dd4b4]/15 text-[#2dd4b4] text-[11.5px] font-semibold mb-2">
                        <CalendarDays size={12} /> {when}
                    </span>
                    <h2 className="text-[18px] font-semibold text-white">{ev.name}</h2>
                    <p className="text-[12.5px] text-[#9aa8c9] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{ev.dateLabel}</span>
                        <span className="inline-flex items-center gap-1"><MapPin size={12} />{ev.venue}</span>
                    </p>
                </div>
                <a href={ev.href} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-[12px] text-[#c9d2ea] ring-1 ring-inset ring-white/10 transition-colors">
                    Event page <ExternalLink size={12} />
                </a>
            </div>
            <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {stats.map(s => (
                    <Link key={s.label} href={s.href} className="rounded-xl bg-black/20 hover:bg-black/30 ring-1 ring-inset ring-white/[0.06] px-3.5 py-3 transition-colors">
                        <p className="text-[11.5px] text-[#9aa8c9]">{s.label}</p>
                        <p className="text-[20px] leading-tight font-semibold text-white tabular-nums mt-1">{s.value.toLocaleString("en-IN")}</p>
                        {s.sub && <p className="text-[11px] text-[#f7c46c] mt-0.5">{s.sub}</p>}
                    </Link>
                ))}
            </div>
        </section>
    );
}

function Kpi({ label, icon: Icon, tone, href, thisWeek, lastWeek, total }: { label: string; icon: LucideIcon; tone: string; href: string; thisWeek: number; lastWeek: number; total: number }) {
    const diff = thisWeek - lastWeek;
    const pct = lastWeek > 0 ? Math.round((diff / lastWeek) * 100) : null;
    const up = diff >= 0;
    return (
        <Link href={href} className="vz-card rounded-2xl p-4 group block">
            <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${tone}22`, color: tone }}><Icon size={16} /></span>
                {diff !== 0 && (
                    <span className={`inline-flex items-center text-[11.5px] font-medium ${up ? "text-[#2dd4b4]" : "text-[#ff8a73]"}`}>
                        {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        {pct === null ? `+${diff}` : `${Math.abs(pct)}%`}
                    </span>
                )}
            </div>
            <p className="text-[24px] leading-none font-semibold text-white tabular-nums">{thisWeek.toLocaleString("en-IN")}</p>
            <p className="text-[12px] text-[#9aa8c9] mt-1.5">{label}</p>
            <p className="text-[11px] text-[#5d6b8f] mt-2">{lastWeek} the week before · {total.toLocaleString("en-IN")} all time</p>
        </Link>
    );
}

const KIND_STYLE: Record<ActivityItem["kind"], string> = {
    Lead: "bg-[#3577f1]/15 text-[#6ea1ff]",
    Delegate: "bg-[#f7b84b]/15 text-[#f7c46c]",
    Agenda: "bg-[#0ab39c]/15 text-[#2dd4b4]",
    Speaker: "bg-[#6559cc]/20 text-[#a99df0]",
    Nomination: "bg-[#f06548]/15 text-[#ff8a73]",
    Message: "bg-white/[0.06] text-[#c9d2ea]",
    Sponsorship: "bg-[#0ab39c]/15 text-[#2dd4b4]",
    Consent: "bg-[#3577f1]/15 text-[#6ea1ff]",
};

function ago(iso: string, now: Date) {
    const m = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 60000));
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.round(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.round(h / 24);
    if (d < 7) return `${d}d ago`;
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: TZ });
}

function ActivityRow({ item, now }: { item: ActivityItem; now: Date }) {
    return (
        <li className="border-b border-white/[0.05] last:border-0 lg:[&:nth-last-child(2):nth-child(odd)]:border-0">
            <Link href={item.href} className="flex items-center gap-3 py-3 group">
                <span className={`w-[88px] shrink-0 text-center px-2 py-1 rounded-md text-[11px] font-semibold ${KIND_STYLE[item.kind]}`}>{item.kind}</span>
                <span className="flex-1 min-w-0">
                    <span className="block text-[13px] text-white truncate group-hover:underline underline-offset-2">{item.title || "—"}</span>
                    {item.detail && <span className="block text-[11.5px] text-[#7c8db5] truncate">{item.detail}</span>}
                </span>
                <span className="shrink-0 text-[11.5px] text-[#5d6b8f] tabular-nums">{ago(item.at, now)}</span>
            </Link>
        </li>
    );
}

function TrafficSkeleton() {
    return (
        <section className="vz-card rounded-2xl p-6">
            <div className="h-4 w-36 rounded bg-white/[0.06] mb-2" />
            <div className="h-3 w-48 rounded bg-white/[0.04] mb-6" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map(i => <div key={i} className="h-[88px] rounded-xl bg-white/[0.03] animate-pulse" />)}
            </div>
            <p className="text-[12px] text-[#5d6b8f] mt-4">Loading Google Analytics…</p>
        </section>
    );
}
