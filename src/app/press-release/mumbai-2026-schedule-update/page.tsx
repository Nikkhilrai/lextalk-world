import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MUMBAI_RELEASE as R, MUMBAI_RELEASE_HREF } from "./release-data";

export const metadata: Metadata = {
    title: { absolute: "Press Release: LexTalk World Mumbai 2026 Moves to a Single Day on 8 December 2026" },
    description: R.summary,
    alternates: { canonical: MUMBAI_RELEASE_HREF },
    openGraph: {
        type: "article",
        url: `https://lextalkworld.in${MUMBAI_RELEASE_HREF}`,
        title: R.title,
        description: R.summary,
        publishedTime: "2026-11-25",
    },
    twitter: { card: "summary_large_image", title: R.title, description: R.summary },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: R.title,
    datePublished: "2026-11-25",
    description: R.summary,
    publisher: { "@type": "Organization", name: "LexTalk World", url: "https://lextalkworld.in" },
    mainEntityOfPage: `https://lextalkworld.in${MUMBAI_RELEASE_HREF}`,
};

export default function MumbaiScheduleReleasePage() {
    const [first, ...rest] = R.paragraphs;
    return (
        <main className="min-h-screen bg-[#fcfbf9] text-slate-900 overflow-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />

            {/* Masthead */}
            <header className="relative isolate px-5 sm:px-8 pt-36 md:pt-44 pb-32 md:pb-40 bg-[#050a15]">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(245,158,11,0.18),transparent_70%)]" />
                <div
                    className="absolute inset-0 -z-10 opacity-40"
                    style={{
                        backgroundImage: "radial-gradient(rgba(245,158,11,0.22) 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                        maskImage: "radial-gradient(ellipse at 50% 20%, black 15%, transparent 70%)",
                        WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, black 15%, transparent 70%)",
                    }}
                />
                <div className="relative max-w-4xl mx-auto text-center">
                    <p className="flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-400 mb-6">
                        <span className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent to-amber-400" />
                        {R.kicker} · {R.issued}
                        <span className="hidden sm:block w-12 h-px bg-gradient-to-l from-transparent to-amber-400" />
                    </p>
                    <h1 className="font-serif text-[2rem] sm:text-5xl lg:text-[3.3rem] font-bold text-white leading-[1.1] tracking-tight [text-wrap:balance]">
                        {R.title}
                    </h1>
                </div>
            </header>

            {/* Fact card */}
            <dl className="relative z-10 grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-5 lg:mx-auto -mt-16 md:-mt-20 rounded-2xl bg-white border border-slate-200/80 shadow-[0_30px_60px_-30px_rgba(5,10,21,0.4)] overflow-hidden">
                {R.facts.map((f, i) => (
                    <div
                        key={f.label}
                        className={`px-5 py-5 md:px-7 md:py-6 ${i > 0 ? "md:border-l" : ""} ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} border-slate-200/80`}
                    >
                        <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600 mb-2">{f.label}</dt>
                        <dd className="font-serif text-base md:text-lg font-semibold text-slate-900 leading-snug">{f.value}</dd>
                    </div>
                ))}
            </dl>

            {/* Body */}
            <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 md:pt-20 pb-8">
                <p className="mb-8 font-serif text-xl md:text-[1.4rem] leading-[1.7] text-slate-700">
                    <strong className="text-[0.78em] font-sans font-bold uppercase tracking-[0.14em] text-amber-700">{R.dateline} —</strong>{" "}
                    {first}
                </p>
                {rest.map((p, i) => (
                    <p key={i} className="text-[1.0625rem] leading-[1.85] text-slate-600 mb-6">{p}</p>
                ))}
                <p className="text-[1.0625rem] leading-[1.85] text-slate-600 mb-6">
                    For registration, speaking, or sponsorship inquiries, please visit{" "}
                    <Link href="/mumbai-2026" className="text-amber-700 font-semibold underline underline-offset-2 hover:text-amber-800">lextalkworld.in/mumbai-2026</Link>
                </p>
                <p aria-hidden="true" className="mt-10 text-center text-sm font-bold tracking-[0.5em] text-amber-600">###</p>
            </article>

            {/* Contact + next steps */}
            <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-24 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white border border-slate-200/80 p-7 md:p-9 flex flex-col gap-3">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">Media contact</h2>
                    <p className="text-sm text-slate-500">{R.contactOrg}</p>
                    {R.emails.map(e => (
                        <a key={e} href={`mailto:${e}`} className="flex items-center gap-2.5 font-serif text-lg font-semibold text-slate-900 hover:text-amber-700 break-all">
                            <Mail className="w-4 h-4 text-amber-600 shrink-0" />{e}
                        </a>
                    ))}
                    <a href="https://lextalkworld.in/mumbai-2026" className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-amber-700">
                        <Globe className="w-4 h-4 text-amber-600 shrink-0" />lextalkworld.in/mumbai-2026
                    </a>
                </div>
                <Link href="/mumbai-2026/agenda" className="group rounded-2xl bg-[#050a15] border border-amber-500/30 p-7 md:p-9 flex flex-col gap-3 text-white hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(5,10,21,0.6)] transition-all duration-500">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400">The day-long programme</h2>
                    <span className="flex items-center gap-2.5 font-serif text-xl font-semibold">
                        <CalendarDays className="w-5 h-5 text-amber-400" />View the Mumbai agenda
                    </span>
                    <p className="mt-auto text-sm text-slate-400">
                        Tuesday, 8 December 2026 · Radisson Blu Mumbai International Airport{" "}
                        <ArrowRight className="inline w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                    </p>
                </Link>
            </section>

            <Footer />
        </main>
    );
}
