import { Suspense } from "react";
import Link from "next/link";
import {
    ArrowDownRight, ArrowRight, ArrowUpRight, Briefcase, CalendarDays, CheckCircle2, Download, ExternalLink, Globe2,
    Mail, MapPin, MessagesSquare, Mic, Award, FileCheck2, Target, Ticket, Users, Wallet, CreditCard, Sparkles,
    Building2, LayoutGrid, type LucideIcon,
} from "lucide-react";
import { getAdminProfile } from "@/actions/auth";
import {
    getEventData, getOverviewData, listEvents,
    type ActivityItem, type EventSummary, type ListedEvent, type Money,
} from "@/lib/admin-dashboard";
import { ActivityChart } from "@/components/admin/dashboard/ActivityChart";
import { BarList } from "@/components/admin/dashboard/BarList";
import { RefreshButton } from "@/components/admin/dashboard/RefreshButton";
import { WebsiteTraffic } from "@/components/admin/dashboard/WebsiteTraffic";

export const dynamic = "force-dynamic";

const TZ = "Asia/Kolkata";
const num = (n: number) => n.toLocaleString("en-IN");
function money(m: Money) {
    try { return new Intl.NumberFormat("en-IN", { style: "currency", currency: m.currency, maximumFractionDigits: 0 }).format(m.amount); }
    catch { return `${m.currency} ${num(Math.round(m.amount))}`; }
}

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ event?: string }> }) {
    const [{ event: picked }, { profile }, events] = await Promise.all([searchParams, getAdminProfile(), listEvents()]);
    const selected = events.find(e => e.slug === picked) ?? null;

    const now = new Date();
    const firstName = (profile?.name || "there").split(" ")[0];
    const hour = Number(now.toLocaleString("en-GB", { hour: "numeric", hour12: false, timeZone: TZ }));
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    return (
        <div className="max-w-[1500px] mx-auto space-y-6 pb-10">
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

            <EventTabs events={events} active={selected?.slug ?? null} />

            {selected ? <EventView ev={selected} /> : <Overview events={events} />}
        </div>
    );
}

/* ================================================================== */
/* Event switcher                                                      */
/* ================================================================== */

function statusText(ev: ListedEvent) {
    if (ev.status === "live") return "Happening now";
    if (ev.status === "upcoming") return ev.days === 1 ? "Tomorrow" : `In ${ev.days} days`;
    if (ev.status === "past") return "Ended";
    return "Date not set";
}

function EventTabs({ events, active }: { events: ListedEvent[]; active: string | null }) {
    const tab = (isActive: boolean) =>
        `shrink-0 snap-start flex items-center gap-2.5 pl-3 pr-3.5 py-2 rounded-xl text-[13px] font-medium ring-1 ring-inset transition-colors ${isActive
            ? "bg-[#405189]/35 text-white ring-[#6f84d0]/50 shadow-lg shadow-[#405189]/20"
            : "bg-white/[0.03] text-[#a3b0cf] ring-white/[0.06] hover:bg-white/[0.06] hover:text-white"}`;
    const dot: Record<ListedEvent["status"], string> = {
        live: "bg-[#2dd4b4] animate-pulse",
        upcoming: "bg-[#6ea1ff]",
        past: "bg-[#5d6b8f]",
        unscheduled: "bg-[#5d6b8f]",
    };
    return (
        <nav aria-label="Events" className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto hidden-scrollbar">
            <div className="flex gap-2 snap-x min-w-max">
                <Link href="/admin" className={tab(active === null)} scroll={false}>
                    <LayoutGrid size={15} className="text-[#8da2ea]" />
                    All events
                </Link>
                <span className="w-px self-stretch bg-white/[0.06] mx-1" aria-hidden />
                {events.map(ev => (
                    <Link key={ev.slug} href={`/admin?event=${ev.slug}`} className={tab(active === ev.slug)} scroll={false}>
                        <span className={`w-2 h-2 rounded-full ${dot[ev.status]}`} />
                        <span className="flex flex-col leading-tight text-left">
                            <span>{ev.short}</span>
                            <span className={`text-[10.5px] font-normal ${ev.status === "past" ? "text-[#5d6b8f]" : "text-[#7c8db5]"}`}>{statusText(ev)}</span>
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

/* ================================================================== */
/* All events                                                          */
/* ================================================================== */

async function Overview({ events }: { events: ListedEvent[] }) {
    const data = await getOverviewData(events);
    const k = data.kpis;
    const upcoming = data.events.filter(e => e.status === "live" || e.status === "upcoming");

    return (
        <>
            {upcoming.length > 0 && (
                <div className={`grid grid-cols-1 gap-4 ${upcoming.length > 1 ? "xl:grid-cols-2" : ""}`}>
                    {upcoming.map(ev => <UpcomingCard key={ev.slug} ev={ev} />)}
                </div>
            )}

            <section className="vz-card rounded-2xl overflow-hidden">
                <div className="px-6 pt-5 pb-4 flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <h2 className="text-[15px] font-semibold text-white">Every event at a glance</h2>
                        <p className="text-[12px] text-[#7c8db5] mt-0.5">Totals to date · click a row for that event&apos;s full dashboard</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px] text-[13px]">
                        <thead>
                            <tr className="text-left text-[11.5px] text-[#7c8db5] border-y border-white/[0.06] bg-white/[0.015]">
                                <th className="font-medium px-6 py-2.5">Event</th>
                                <th className="font-medium px-3 py-2.5 text-right">Confirmed delegates</th>
                                <th className="font-medium px-3 py-2.5 text-right">Revenue</th>
                                <th className="font-medium px-3 py-2.5 text-right">Unfinished payments</th>
                                <th className="font-medium px-3 py-2.5 text-right">Agenda downloads</th>
                                <th className="font-medium px-3 py-2.5 text-right">Leads</th>
                                <th className="font-medium px-3 py-2.5 text-right">Speakers</th>
                                <th className="font-medium px-3 py-2.5 text-right">Nominations</th>
                                <th className="font-medium px-6 py-2.5 text-right">Consent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.events.map(ev => {
                                const href = `/admin?event=${ev.slug}`;
                                const cell = "block px-3 py-3 text-right tabular-nums";
                                return (
                                    <tr key={ev.slug} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors">
                                        <td>
                                            <Link href={href} className="flex items-center gap-3 px-6 py-3">
                                                <StatusDot status={ev.status} />
                                                <span className="min-w-0">
                                                    <span className="block text-white font-medium">{ev.short}</span>
                                                    <span className="block text-[11.5px] text-[#7c8db5]">{ev.dateLabel} · {statusText(ev)}</span>
                                                </span>
                                            </Link>
                                        </td>
                                        <td><Link href={href} className={cell}>
                                            <span className="text-white font-semibold">{num(ev.confirmed)}</span>
                                            {ev.complimentary > 0 && <span className="block text-[11px] text-[#7c8db5]">{num(ev.paid)} paid · {num(ev.complimentary)} free</span>}
                                        </Link></td>
                                        <td><Link href={href} className={cell}>
                                            {ev.revenue.length === 0 ? <span className="text-[#5d6b8f]">—</span> : ev.revenue.map(m => <span key={m.currency} className="block text-white">{money(m)}</span>)}
                                        </Link></td>
                                        <td><Link href={href} className={cell}><span className={ev.unfinished ? "text-[#f7c46c]" : "text-[#5d6b8f]"}>{num(ev.unfinished)}</span></Link></td>
                                        <td><Link href={href} className={`${cell} text-[#c9d2ea]`}>{num(ev.agendas)}</Link></td>
                                        <td><Link href={href} className={`${cell} text-[#c9d2ea]`}>{num(ev.leads)}</Link></td>
                                        <td><Link href={href} className={`${cell} text-[#c9d2ea]`}>{num(ev.speakers)}</Link></td>
                                        <td><Link href={href} className={`${cell} text-[#c9d2ea]`}>{num(ev.nominations)}</Link></td>
                                        <td><Link href={href} className={`${cell} pr-6 text-[#c9d2ea]`}>{num(ev.consent)}</Link></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <div className="flex items-baseline justify-between mb-3">
                    <h2 className="text-[15px] font-semibold text-white">Last 7 days</h2>
                    <span className="text-[12px] text-[#5d6b8f]">compared with the 7 days before</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                    <Kpi label="New leads" icon={Target} tone="#6ea1ff" href="/admin/leads" {...k.leads} />
                    <Kpi label="Agenda downloads" icon={Download} tone="#2dd4b4" href="/admin/agenda-downloads" {...k.agendas} />
                    <Kpi label="Confirmed delegates" icon={Users} tone="#f7c46c" href="/admin/delegate-registrations" {...k.delegates} />
                    <Kpi label="Speaker applications" icon={Mic} tone="#a99df0" href="/admin/speaker-applications" {...k.speakers} />
                    <Kpi label="Newsletter sign-ups" icon={Mail} tone="#ff8a73" href="/admin/newsletter" {...k.subscribers} />
                    <Kpi label="Chatbot conversations" icon={MessagesSquare} tone="#6ea1ff" href="/admin/chat-conversations" {...k.chats} />
                </div>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <section className="vz-card rounded-2xl p-6 xl:col-span-2 h-[380px] flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-[15px] font-semibold text-white">Daily activity · all events</h2>
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

            <ActivityList title="Latest activity" sub="The newest submissions across every form on the site" items={data.recent} />

            <Suspense fallback={<TrafficSkeleton />}>
                <WebsiteTraffic />
            </Suspense>
        </>
    );
}

function UpcomingCard({ ev }: { ev: EventSummary }) {
    const stats = [
        { label: "Confirmed delegates", value: num(ev.confirmed), sub: ev.unfinished ? `+${ev.unfinished} didn't finish payment` : undefined },
        { label: "Agenda downloads", value: num(ev.agendas) },
        { label: "Leads", value: num(ev.leads) },
    ];
    return (
        <Link href={`/admin?event=${ev.slug}`} scroll={false}
            className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#1d2650] via-[#161d3a] to-[#121831] ring-1 ring-inset ring-[#5b6fb5]/25 hover:ring-[#7b8fdc]/45 transition-shadow block">
            <div className="pointer-events-none absolute -top-20 -right-16 w-64 h-64 rounded-full bg-[#405189]/30 blur-3xl" />
            <div className="relative flex items-start justify-between gap-3 mb-5">
                <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2dd4b4]/15 text-[#2dd4b4] text-[11.5px] font-semibold mb-2">
                        <CalendarDays size={12} /> {statusText(ev)}
                    </span>
                    <h2 className="text-[18px] font-semibold text-white">{ev.name}</h2>
                    <p className="text-[12.5px] text-[#9aa8c9] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{ev.dateLabel}</span>
                        {ev.venue && <span className="inline-flex items-center gap-1"><MapPin size={12} />{ev.venue}</span>}
                    </p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 text-[12px] text-[#a3b0cf] group-hover:text-white transition-colors">
                    Open <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
            </div>
            <div className="relative grid grid-cols-3 gap-2.5">
                {stats.map(s => (
                    <div key={s.label} className="rounded-xl bg-black/20 ring-1 ring-inset ring-white/[0.06] px-3.5 py-3">
                        <p className="text-[11.5px] text-[#9aa8c9]">{s.label}</p>
                        <p className="text-[20px] leading-tight font-semibold text-white tabular-nums mt-1">{s.value}</p>
                        {s.sub && <p className="text-[11px] text-[#f7c46c] mt-0.5">{s.sub}</p>}
                    </div>
                ))}
            </div>
        </Link>
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
            <p className="text-[24px] leading-none font-semibold text-white tabular-nums">{num(thisWeek)}</p>
            <p className="text-[12px] text-[#9aa8c9] mt-1.5">{label}</p>
            <p className="text-[11px] text-[#5d6b8f] mt-2">{lastWeek} the week before · {num(total)} all time</p>
        </Link>
    );
}

/* ================================================================== */
/* One event                                                           */
/* ================================================================== */

async function EventView({ ev }: { ev: ListedEvent }) {
    const d = await getEventData(ev);
    const s = d.summary;
    const when = ev.status === "past" ? `Ended ${ev.days} day${ev.days === 1 ? "" : "s"} ago` : statusText(ev);

    const tiles: { label: string; value: React.ReactNode; sub?: string; icon: LucideIcon; tone: string; href: string; warn?: boolean }[] = [
        { label: "Confirmed delegates", value: num(s.confirmed), sub: s.complimentary ? `${num(s.paid)} paid · ${num(s.complimentary)} complimentary` : `${num(s.paid)} paid`, icon: Users, tone: "#f7c46c", href: "/admin/delegate-registrations" },
        { label: "Delegate revenue", value: s.revenue.length ? s.revenue.map(m => <span key={m.currency} className="block">{money(m)}</span>) : "—", sub: "Confirmed passes, after discounts", icon: Wallet, tone: "#2dd4b4", href: "/admin/delegate-registrations" },
        { label: "Didn't finish payment", value: num(s.unfinished), sub: "Started checkout, no payment yet", icon: CreditCard, tone: "#ff8a73", href: "/admin/delegate-registrations", warn: s.unfinished > 0 },
        { label: "Agenda downloads", value: num(s.agendas), icon: Download, tone: "#2dd4b4", href: "/admin/agenda-downloads" },
        { label: "Leads", value: num(s.leads), sub: s.chatbot ? `+${num(s.chatbot)} via the chatbot` : undefined, icon: Target, tone: "#6ea1ff", href: "/admin/leads" },
        { label: "Speaker applications", value: num(s.speakers), icon: Mic, tone: "#a99df0", href: "/admin/speaker-applications" },
        { label: "Award nominations", value: num(s.nominations), icon: Award, tone: "#ff8a73", href: "/admin/nominations" },
        { label: "Consent forms", value: num(s.consent), icon: FileCheck2, tone: "#6ea1ff", href: "/admin/delegate-consent" },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-[#1f2a58] via-[#172041] to-[#121831] ring-1 ring-inset ring-[#5b6fb5]/30">
                <div className="pointer-events-none absolute -top-24 -right-10 w-80 h-80 rounded-full bg-[#405189]/35 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 left-1/3 w-72 h-72 rounded-full bg-[#6559cc]/15 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-5">
                    <div className="min-w-0">
                        <StatusPill ev={ev} text={when} />
                        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white mt-3">{ev.name}</h2>
                        <p className="text-[13px] text-[#9aa8c9] mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} />{ev.dateLabel}</span>
                            {ev.venue && <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{ev.venue}</span>}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href="/admin/delegate-registrations" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.07] hover:bg-white/[0.12] text-[12.5px] text-white ring-1 ring-inset ring-white/10 transition-colors">
                            <Ticket size={14} /> Delegates
                        </Link>
                        <Link href="/admin/agenda-downloads" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.07] hover:bg-white/[0.12] text-[12.5px] text-white ring-1 ring-inset ring-white/10 transition-colors">
                            <Download size={14} /> Agenda leads
                        </Link>
                        <a href={ev.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#405189] hover:bg-[#4a5ea0] text-[12.5px] text-white shadow-lg shadow-[#405189]/30 transition-colors">
                            Event page <ExternalLink size={13} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Numbers */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {tiles.map(t => {
                    const Icon = t.icon;
                    return (
                        <Link key={t.label} href={t.href} className="vz-card rounded-2xl p-4 block">
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${t.tone}22`, color: t.tone }}><Icon size={16} /></span>
                                <span className="text-[12px] text-[#9aa8c9] leading-tight">{t.label}</span>
                            </div>
                            <div className={`text-[24px] leading-tight font-semibold tabular-nums ${t.warn ? "text-[#f7c46c]" : "text-white"}`}>{t.value}</div>
                            {t.sub && <p className="text-[11.5px] text-[#5d6b8f] mt-1.5">{t.sub}</p>}
                        </Link>
                    );
                })}
            </div>

            {/* Trend + passes */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <section className="vz-card rounded-2xl p-6 xl:col-span-2 h-[380px] flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-[15px] font-semibold text-white">Daily activity · {ev.short}</h2>
                        <p className="text-[12px] text-[#7c8db5] mt-0.5">{d.trendLabel} · tap a series to hide it</p>
                    </div>
                    <div className="flex-1 min-h-0"><ActivityChart data={d.trend} /></div>
                </section>
                <section className="vz-card rounded-2xl p-6 space-y-6">
                    <BarList icon={Ticket} title="Confirmed delegates by pass" unit="delegates" rows={d.passes} tone="#f7b84b" empty="No confirmed delegates yet." />
                    {d.unfinishedPasses.length > 0 && (
                        <div>
                            <BarList icon={CreditCard} title="Didn't finish payment, by pass" unit="people" rows={d.unfinishedPasses} tone="#f06548" />
                            <Link href="/admin/delegate-registrations" className="inline-flex items-center gap-1 mt-3 px-2.5 text-[12px] text-[#8da2ea] hover:text-white">
                                Follow them up in Delegates <ArrowRight size={13} />
                            </Link>
                        </div>
                    )}
                </section>
            </div>

            {/* Who's coming */}
            <section className="vz-card rounded-2xl p-6">
                <h2 className="text-[15px] font-semibold text-white">Who&apos;s interested</h2>
                <p className="text-[12px] text-[#7c8db5] mt-0.5 mb-5">From delegate registrations, leads, agenda downloads and consent forms for this event · internal and test entries left out</p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <BarList icon={Building2} title="Top organisations" rows={d.organisations} />
                    <BarList icon={Briefcase} title="Top roles" rows={d.roles} tone="#6559cc" />
                    <BarList icon={Globe2} title="Countries" rows={d.countries} tone="#0ab39c" />
                    <BarList icon={Sparkles} title="Topics delegates want" rows={d.interests} tone="#f06548" empty="No topics picked yet." />
                </div>
            </section>

            <ActivityList title={`Latest for ${ev.short}`} sub="Newest registrations, downloads, leads, applications and forms for this event" items={d.recent} />
        </>
    );
}

/* ================================================================== */
/* Shared bits                                                         */
/* ================================================================== */

function StatusDot({ status }: { status: ListedEvent["status"] }) {
    const c = status === "live" ? "bg-[#2dd4b4] animate-pulse" : status === "upcoming" ? "bg-[#6ea1ff]" : "bg-[#5d6b8f]";
    return <span className={`shrink-0 w-2 h-2 rounded-full ${c}`} />;
}

function StatusPill({ ev, text }: { ev: ListedEvent; text: string }) {
    const c = ev.status === "live" ? "bg-[#2dd4b4]/15 text-[#2dd4b4]"
        : ev.status === "upcoming" ? "bg-[#6ea1ff]/15 text-[#8db8ff]"
            : "bg-white/[0.07] text-[#a3b0cf]";
    return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${c}`}><StatusDot status={ev.status} />{text}</span>;
}

const KIND_STYLE: Record<ActivityItem["kind"], string> = {
    Lead: "bg-[#3577f1]/15 text-[#6ea1ff]",
    Delegate: "bg-[#f7b84b]/15 text-[#f7c46c]",
    Unpaid: "bg-white/[0.06] text-[#a3b0cf]",
    Agenda: "bg-[#0ab39c]/15 text-[#2dd4b4]",
    Speaker: "bg-[#6559cc]/20 text-[#a99df0]",
    Nomination: "bg-[#f06548]/15 text-[#ff8a73]",
    Message: "bg-white/[0.06] text-[#c9d2ea]",
    Sponsorship: "bg-[#0ab39c]/15 text-[#2dd4b4]",
    Consent: "bg-[#3577f1]/15 text-[#6ea1ff]",
    Chatbot: "bg-[#6559cc]/20 text-[#a99df0]",
};
const KIND_LABEL: Partial<Record<ActivityItem["kind"], string>> = { Unpaid: "Not paid" };

function ago(iso: string) {
    const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.round(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.round(h / 24);
    if (d < 7) return `${d}d ago`;
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: d > 300 ? "numeric" : undefined, timeZone: TZ });
}

function ActivityList({ title, sub, items }: { title: string; sub: string; items: ActivityItem[] }) {
    return (
        <section className="vz-card rounded-2xl p-6">
            <h2 className="text-[15px] font-semibold text-white">{title}</h2>
            <p className="text-[12px] text-[#7c8db5] mt-0.5 mb-4">{sub}</p>
            {items.length === 0 ? <p className="text-[13px] text-[#7c8db5]">Nothing yet.</p> : (
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                    {items.map((r, i) => (
                        <li key={i} className="border-b border-white/[0.05]">
                            <Link href={r.href} className="flex items-center gap-3 py-3 group">
                                <span className={`w-[88px] shrink-0 text-center px-2 py-1 rounded-md text-[11px] font-semibold ${KIND_STYLE[r.kind]}`}>{KIND_LABEL[r.kind] ?? r.kind}</span>
                                <span className="flex-1 min-w-0">
                                    <span className="block text-[13px] text-white truncate group-hover:underline underline-offset-2">{r.title || "—"}</span>
                                    {r.detail && <span className="block text-[11.5px] text-[#7c8db5] truncate">{r.detail}</span>}
                                </span>
                                <span className="shrink-0 text-[11.5px] text-[#5d6b8f] tabular-nums">{ago(r.at)}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
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
