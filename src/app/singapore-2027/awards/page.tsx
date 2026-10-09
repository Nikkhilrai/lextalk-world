"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Trophy, Plus, Minus, Check, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PROGRAM = "LexTalk World Singapore 2027 — The Medal of Excellence";

// ===================== Content — verbatim from the published programme brief =====================

const whyMatters = [
    { title: "Evidence, not adjectives", text: "Entries are judged on deployed work, measurable outcomes and demonstrable governance, not on marketing language." },
    { title: "Independent review", text: "Subject-matter experts assess each submission against published criteria, with declared conflicts and confidential handling." },
    { title: "A senior stage", text: "Recognition is presented to an executive audience of legal, risk, compliance, privacy, security and technology leaders." },
];

const focusAreas = [
    "AI Governance", "AI Risk", "Responsible AI", "Legal Technology", "Regulatory Compliance",
    "KYC, AML & Financial Crime Technology", "Privacy & Data Governance", "Cyber Resilience",
    "Digital Identity", "Third-Party Risk", "Digital Trust", "Dispute Resolution & Digital Evidence",
];

const whoCanParticipate = [
    { title: "Organisations and teams", text: "Enterprises, regulated institutions, public-sector bodies, technology providers, law firms and cross-functional teams with deployed programmes and demonstrable outcomes." },
    { title: "Individual leaders", text: "General counsel, risk and compliance leaders, CISOs, privacy officers, data and AI leaders, founders and managing partners with a proven record of impact." },
];

interface CategoryItem { title: string; type: string; desc: string; }
interface CategoryGroup { group: string; items: CategoryItem[]; }

const categoryGroups: CategoryGroup[] = [
    {
        group: "AI & Responsible Innovation",
        items: [
            { title: "AI Leadership Award", type: "Individual", desc: "For a senior leader who sets a clear AI strategy and mobilises functions, investment and governance around it. Evidence: strategy, scale metrics, outcomes and references." },
            { title: "Enterprise AI Transformation Award", type: "Organisation / team", desc: "For AI deployed across material workflows with adoption, governance and measurable change. Evidence: baseline-to-current KPIs, deployment map and risk controls." },
            { title: "Applied AI Innovation Award", type: "Organisation / product team", desc: "For a material AI solution in live use, with a novel approach and verified adoption or results." },
            { title: "Responsible AI Excellence Award", type: "Organisation / team", desc: "For accountability, fairness, transparency, human oversight and lifecycle assurance in practice." },
            { title: "AI Governance Excellence Award", type: "Organisation / team", desc: "For a formal AI governance framework: ownership, inventory, classification, approvals, monitoring and escalation." },
            { title: "Agentic AI Implementation Award", type: "Organisation / product team", desc: "For live deployment of AI agents with defined autonomy boundaries, human oversight, testing, security and business value." },
            { title: "AI Business Impact Award", type: "Organisation / team", desc: "For quantified gains in revenue, cost, decision quality, speed, resilience or customer outcomes." },
        ],
    },
    {
        group: "Legal Innovation",
        items: [
            { title: "Legal Technology Innovation Award", type: "Organisation / product team", desc: "For meaningful improvement to legal delivery, matter work, research, workflow or access to legal services." },
            { title: "AI, Technology & Legal Leadership Award", type: "Individual", desc: "For a senior legal leader guiding AI, technology or digital-risk decisions with strategic counsel and governance influence." },
            { title: "AI Regulation & Compliance Excellence Award", type: "Organisation / team", desc: "For translating regulatory change into usable controls, policy and assurance." },
            { title: "Legal Operations Excellence Award", type: "Organisation / team", desc: "For measurable workflow, contracting, matter-management or sourcing improvement." },
            { title: "AI Contracting & Legal Risk Excellence Award", type: "Organisation / team", desc: "For practical management of data, IP, liability, procurement, model-use and third-party terms in AI contracting." },
            { title: "Technology, Privacy & Cyber Law Excellence Award", type: "Individual / team", desc: "For depth of applied legal work across technology, privacy and cyber, including complexity managed and impact delivered." },
        ],
    },
    {
        group: "Privacy, Data & Trust",
        items: [
            { title: "Privacy Leadership Award", type: "Individual", desc: "For a strategic privacy programme, leadership, culture-building and measurable organisational change." },
            { title: "AI Privacy Excellence Award", type: "Organisation / team", desc: "For managing personal data through the AI lifecycle: assessments, lawful use, minimisation, transparency and safeguards." },
            { title: "Data Governance Excellence Award", type: "Organisation / team", desc: "For data ownership, quality, lineage, access, accountability and trustworthy use." },
            { title: "Privacy-by-Design Excellence Award", type: "Organisation / product team", desc: "For early integration of privacy requirements into design, testing and release management." },
            { title: "Digital Trust Excellence Award", type: "Organisation / team", desc: "For strengthening trust across digital experiences through transparency, security, privacy, reliability and accountability." },
        ],
    },
    {
        group: "Cyber, Risk & Compliance",
        items: [
            { title: "Cybersecurity Leadership Award", type: "Individual", desc: "For security leadership, resilience, workforce influence and risk reduction." },
            { title: "AI Security Excellence Award", type: "Organisation / team", desc: "For protecting AI systems, models, data and AI-enabled workflows through threat modelling, controls, testing and response." },
            { title: "Cyber Risk Management Excellence Award", type: "Organisation / team", desc: "For risk identification, prioritisation, control testing, reporting and recovery readiness at enterprise level." },
            { title: "Enterprise Risk Management Excellence Award", type: "Organisation / team", desc: "For integrating technology and digital risks into overall risk governance, appetite and decision-making." },
            { title: "GRC Transformation Award", type: "Organisation / team", desc: "For modernising governance, risk and compliance processes or technology with better visibility and efficiency." },
            { title: "Third-Party Risk Management Excellence Award", type: "Organisation / team", desc: "For risk-tiering, due diligence, monitoring, remediation and executive oversight of vendor and ecosystem risk." },
            { title: "AI Compliance & Controls Excellence Award", type: "Organisation / team", desc: "For operational controls, monitoring, documentation, auditability and issue management for AI use." },
        ],
    },
    {
        group: "Leadership & Cross-Functional Impact",
        items: [
            { title: "Digital Transformation Leadership Award", type: "Individual", desc: "For strategic vision, execution, adoption and sustainable business outcomes in technology-driven change." },
            { title: "Chief Data & AI Leadership Award", type: "Individual", desc: "For enterprise accountability across data and AI strategy, responsible deployment, talent and measurable impact." },
            { title: "AI Risk Leadership Award", type: "Individual", desc: "For risk framing, controls, stakeholder influence and practical governance of AI-specific risk." },
            { title: "Emerging AI & Digital Trust Leader Award", type: "Individual", desc: "For demonstrable leadership, innovation, contribution and a credible upward trajectory, normally under 40 or with under ten years in the field." },
            { title: "Enterprise Digital Trust Initiative Award", type: "Cross-functional team", desc: "For a joint initiative across two or more functions with executive sponsorship, adoption and a measurable trust outcome." },
        ],
    },
];

const eligibilityRows = [
    { area: "Eligibility period", standard: "Achievement, deployment, leadership or material outcome active between 1 January 2025 and 31 December 2026." },
    { area: "Geography", standard: "Singapore-based organisations and individuals, plus APAC entrants with a material Singapore or regional deployment, client base, team, leadership remit or impact." },
    { area: "Category fit", standard: "The entry must address one category's defined criteria and cannot rely on future intent or unimplemented ideas." },
    { area: "Consent and accuracy", standard: "Nominees consent to LexTalk verifying the stated facts and to the use of approved recognition material." },
    { area: "Integrity", standard: "LexTalk may decline, suspend or withdraw recognition where materially misleading information or serious integrity concerns emerge." },
];

const whatApplicantsSubmit = [
    { title: "A short narrative", text: "A 150-word summary, the challenge or opportunity, and the nominee's specific role." },
    { title: "Proof of impact", text: "Two or three specific measures, with client or stakeholder validation where available." },
    { title: "Governance evidence", text: "Relevant policy, control, privacy, security or risk-management material, redacted where required." },
];

const evaluationPillars = [
    { points: 30, title: "Impact and outcomes", text: "Measurable business, customer, risk, legal or market result." },
    { points: 25, title: "Innovation and implementation", text: "Originality plus real deployment, adoption and operational viability." },
    { points: 25, title: "Leadership, governance and integrity", text: "Accountability, responsible practice, controls, influence and ethics." },
    { points: 20, title: "Relevance and future contribution", text: "Importance to AI, legal innovation, risk or digital trust in Singapore and APAC." },
];

const judgingProcess = [
    { title: "Who reviews", text: "Eligible submissions are reviewed by subject-matter experts across legal leadership, AI governance, risk and compliance, privacy and cyber, and technology, moderated by an awards chair." },
    { title: "How conflicts are handled", text: "Reviewers declare conflicts and do not assess connected organisations or individuals. Each submission is scored independently, with a third reviewer used where scores diverge materially." },
    { title: "What happens after review", text: "Recognised awardees are notified with confirmation details and are announced at the ceremony. Unsuccessful entrants receive a concise result note." },
    { title: "Confidentiality", text: "Reviewers receive submissions only for assessment and treat all material as confidential. Publication of any details requires nominee approval." },
];

const keyDates = [
    { milestone: "Expressions of interest", status: "Now open" },
    { milestone: "Priority eligibility review", status: "Submit early for an earlier review cycle" },
    { milestone: "Nomination window", status: "By invitation after eligibility review" },
    { milestone: "Review and moderation", status: "Dates communicated to eligible nominees" },
    { milestone: "Recognition ceremony", status: "4 February 2027 · LexTalk World Singapore" },
];

const recognitionBenefits = [
    { title: "Ceremony recognition", text: "Recognition during the closing ceremony of LexTalk World Singapore before a senior executive audience." },
    { title: "Medal of Excellence asset", text: "A recognition asset and citation approved for use in your own communications." },
    { title: "Event visibility", text: "Inclusion in official event communications, the awards listing and selected post-event features." },
    { title: "Executive access", text: "Credible conversations with peers, partners, clients and the wider APAC legal, risk and technology ecosystem." },
];

const faqItems = [
    { q: "Can I nominate myself or my organisation?", a: "Yes. Self-nominations and third-party nominations are both welcome." },
    { q: "Can I nominate a colleague or client?", a: "Yes, with their knowledge and consent." },
    { q: "Can I enter more than one category?", a: "Normally choose the category that best represents the achievement. A second category may be considered only where the evidence is materially different." },
    { q: "Are entries confidential?", a: "Yes. Reviewers receive submissions only for assessment, and confidential information may be redacted." },
    { q: "Do awardees need to attend the ceremony?", a: "Recognised awardees should attend in Singapore or nominate a senior representative." },
    { q: "Does an expression of interest guarantee recognition?", a: "No. Every eligible submission is independently evaluated and recognition is subject to the published threshold." },
    { q: "When will I receive the nomination form?", a: "Following a brief eligibility review by the LexTalk team, normally within three business days." },
    { q: "How are conflicts of interest handled?", a: "Reviewers declare conflicts and do not assess related entries. The conflict and recusal record is maintained by the awards administrator." },
];

const categoryOptions = categoryGroups.flatMap((g) => g.items.map((i) => i.title));

// ===================== Small building blocks =====================

function SectionEyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-500" />
            <span className={`text-xs font-bold uppercase tracking-[0.3em] ${dark ? "text-amber-400" : "text-amber-600"}`}>{children}</span>
        </div>
    );
}

function Accordion({ summary, badge, children, open, onToggle }: { summary: string; badge?: string; children: React.ReactNode; open: boolean; onToggle: () => void }) {
    return (
        <div className={`rounded-xl border transition-colors overflow-hidden ${open ? "border-amber-300 bg-amber-50/40" : "border-slate-200 bg-white hover:border-slate-300"}`}>
            <button onClick={onToggle} className="flex items-center justify-between w-full gap-4 px-5 py-4 text-left cursor-pointer">
                <span className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm md:text-[15px]">{summary}</span>
                    {badge && <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{badge}</span>}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${open ? "bg-amber-500 border-amber-500 text-white" : "border-slate-300 text-slate-400"}`}>
                    {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{children}</p>
                </div>
            </div>
        </div>
    );
}

// ===================== Page =====================

export default function SingaporeAwardsPage() {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form state
    const [form, setForm] = useState({
        name: "", role: "", organization: "", email: "", country: "", linkedin: "",
        category: "", summary: "", source: "",
    });
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim()) {
            setSubmitError("Full name and work email are required.");
            return;
        }
        if (!consent) {
            setSubmitError("Please confirm the consent statement to continue.");
            return;
        }
        setSubmitError(null);
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/awards-eligibility", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, program: PROGRAM, consent: true }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Submission failed");
            }
            setSubmitted(true);
            setForm({ name: "", role: "", organization: "", email: "", country: "", linkedin: "", category: "", summary: "", source: "" });
            setConsent(false);
        } catch (err: any) {
            setSubmitError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* ===================== HERO ===================== */}
            <section className="relative overflow-hidden bg-[#050a15] pt-28 pb-24 md:pt-36 md:pb-28">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/8 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link href="/singapore-2027" className="inline-flex items-center gap-2 text-[11px] text-white/40 hover:text-amber-400 transition-colors mb-10 uppercase tracking-[0.2em] font-semibold">
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Singapore 2027
                        </Link>
                    </motion.div>

                    <div className="max-w-3xl">
                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-5">
                            LexTalk World Singapore 2027
                        </motion.p>

                        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-serif text-4xl md:text-6xl lg:text-[60px] font-bold text-white leading-[1.1] tracking-tight mb-7">
                            The Medal of <span className="text-amber-400">Excellence</span>
                        </motion.h1>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="flex flex-wrap gap-x-6 gap-y-2 text-amber-400/90 text-[13px] font-semibold tracking-wide mb-7">
                            <span>4 FEBRUARY 2027 · SINGAPORE</span>
                            <span>AI · LAW · RISK · DIGITAL TRUST</span>
                            <span>INDEPENDENTLY ASSESSED</span>
                        </motion.div>

                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                            Recognising the leaders and organisations shaping responsible AI, legal innovation, risk and digital trust across Singapore and APAC. Presented during LexTalk World Singapore, this evidence-led recognition programme celebrates work that turns innovation into trusted, accountable and measurable impact.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <a href="#apply" className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30">
                                Request an Eligibility Review
                            </a>
                            <a href="#categories" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white/85 font-semibold text-sm rounded-full hover:bg-white/5 transition-all duration-300">
                                Explore Categories
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===================== INTRO ===================== */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <SectionEyebrow>The Programme</SectionEyebrow>
                    <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
                        Recognition for work that <span className="text-amber-600">moves the market forward</span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                        The Medal of Excellence is not a popularity contest. It is a focused industry recognition process for organisations, teams and professionals whose work demonstrates practical innovation, responsible leadership and meaningful impact in AI, law, risk and digital trust.
                    </p>
                </div>
            </section>

            {/* ===================== WHY THESE AWARDS MATTER ===================== */}
            <section className="py-20 md:py-28 bg-[#0a0f1e] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mb-14">
                        <SectionEyebrow dark>Why These Awards Matter</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-white leading-tight">
                            From AI ambition to <span className="text-amber-400">trusted execution</span>
                        </h2>
                        <p className="text-white/60 mt-5 leading-relaxed">
                            As organisations deploy AI and digital systems at pace, the hard questions are no longer theoretical: Who is accountable? How is risk governed? How is data protected? What does defensible, scalable implementation look like? These honours recognise the people and teams answering those questions with substance.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {whyMatters.map((item, i) => (
                            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                                <h3 className="font-serif text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== THEME & FOCUS AREAS ===================== */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-10">
                        <SectionEyebrow>Theme and Focus Areas</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Built around the issues senior leaders <span className="text-amber-600">must solve now</span>
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {focusAreas.map((area) => (
                            <span key={area} className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== WHO CAN PARTICIPATE ===================== */}
            <section className="py-20 md:py-28 bg-[#0a0f1e] relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-12">
                        <SectionEyebrow dark>Who Can Participate</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-white leading-tight mb-5">
                            Who we <span className="text-amber-400">invite to be considered</span>
                        </h2>
                        <p className="text-white/60 leading-relaxed">
                            We welcome expressions of interest from Singapore and APAC organisations, technology providers, legal and professional-service teams, and senior professionals with a material record in the relevant fields. Nominees may be self-nominated or nominated by a colleague, client, partner or industry peer.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {whoCanParticipate.map((item, i) => (
                            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-white/[0.04] border border-white/10 rounded-2xl p-7">
                                <h3 className="font-serif text-lg font-bold text-white mb-2.5">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== CATEGORIES ===================== */}
            <section id="categories" className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-12">
                        <SectionEyebrow>30 Categories</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
                            A focused portfolio across <span className="text-amber-600">five recognition streams</span>
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Nominate in the category that best represents the achievement. A second category may be considered only where the evidence is materially different. Categories may be withheld where the evaluation standard is not met.
                        </p>
                    </div>

                    <div className="space-y-12 max-w-3xl">
                        {categoryGroups.map((group) => (
                            <div key={group.group}>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-4">{group.group}</h3>
                                <div className="space-y-2.5">
                                    {group.items.map((item) => {
                                        const key = `${group.group}__${item.title}`;
                                        return (
                                            <Accordion
                                                key={key}
                                                summary={item.title}
                                                badge={item.type}
                                                open={openCategory === key}
                                                onToggle={() => setOpenCategory(openCategory === key ? null : key)}
                                            >
                                                {item.desc}
                                            </Accordion>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== ELIGIBILITY ===================== */}
            <section id="eligibility" className="py-20 md:py-28 bg-[#0a0f1e] relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-10">
                        <SectionEyebrow dark>Eligibility</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-white leading-tight">
                            A selective, <span className="text-amber-400">evidence-led process</span>
                        </h2>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-white/[0.06]">
                                    <th className="text-left px-5 py-3.5 font-bold text-white text-xs uppercase tracking-wider">Area</th>
                                    <th className="text-left px-5 py-3.5 font-bold text-white text-xs uppercase tracking-wider">Standard</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eligibilityRows.map((row, i) => (
                                    <tr key={row.area} className={i !== 0 ? "border-t border-white/10" : ""}>
                                        <td className="px-5 py-4 text-amber-400 font-semibold align-top whitespace-nowrap">{row.area}</td>
                                        <td className="px-5 py-4 text-white/65 leading-relaxed">{row.standard}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 text-sm text-white/55 bg-white/[0.04] border-l-2 border-amber-500 rounded-r-lg px-5 py-4 max-w-2xl">
                        Confidential information may be anonymised or redacted. Submissions are restricted to the review team and independent reviewers.
                    </div>
                </div>
            </section>

            {/* ===================== WHAT APPLICANTS SUBMIT ===================== */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-12">
                        <SectionEyebrow>What Applicants Submit</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Clear, focused evidence — <span className="text-amber-600">no unnecessary paperwork</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {whatApplicantsSubmit.map((item, i) => (
                            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-slate-500 text-sm">Most nominations take 45 to 60 minutes to prepare. Up to three supporting documents or links are optional but encouraged.</p>
                </div>
            </section>

            {/* ===================== EVALUATION METHODOLOGY ===================== */}
            <section id="methodology" className="py-20 md:py-28 bg-[#0a0f1e] relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-12">
                        <SectionEyebrow dark>Evaluation Methodology</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-white leading-tight">
                            How nominations are <span className="text-amber-400">assessed</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {evaluationPillars.map((p, i) => (
                            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                                <div className="flex items-baseline gap-1.5 mb-3">
                                    <span className="text-3xl font-serif font-bold text-amber-400">{p.points}</span>
                                    <span className="text-xs text-white/50 font-semibold uppercase tracking-wide">points</span>
                                </div>
                                <h3 className="font-serif text-base font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed">{p.text}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-6 text-sm text-white/55 bg-white/[0.04] border-l-2 border-amber-500 rounded-r-lg px-5 py-4 max-w-2xl">
                        Recognition requires a score of 80 out of 100. Ties are broken first on impact and outcomes, then on leadership, governance and integrity.
                    </div>
                </div>
            </section>

            {/* ===================== JUDGING PROCESS ===================== */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-12">
                        <SectionEyebrow>Judging Process</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Independent assessment, <span className="text-amber-600">responsible moderation</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {judgingProcess.map((item, i) => (
                            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== KEY DATES ===================== */}
            <section id="dates" className="py-20 md:py-28 bg-[#0a0f1e] relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-10">
                        <SectionEyebrow dark>Key Dates</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-white leading-tight">
                            Review cycles and <span className="text-amber-400">the ceremony</span>
                        </h2>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-white/[0.06]">
                                    <th className="text-left px-5 py-3.5 font-bold text-white text-xs uppercase tracking-wider">Milestone</th>
                                    <th className="text-left px-5 py-3.5 font-bold text-white text-xs uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keyDates.map((row, i) => (
                                    <tr key={row.milestone} className={i !== 0 ? "border-t border-white/10" : ""}>
                                        <td className="px-5 py-4 text-amber-400 font-semibold whitespace-nowrap">{row.milestone}</td>
                                        <td className="px-5 py-4 text-white/65">{row.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ===================== RECOGNITION BENEFITS ===================== */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mb-12">
                        <SectionEyebrow>Recognition Benefits</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                            More than a <span className="text-amber-600">moment on stage</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recognitionBenefits.map((item, i) => (
                            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== THE CEREMONY ===================== */}
            <section className="py-20 md:py-24 bg-[#0a0f1e] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/6 rounded-full blur-[130px] pointer-events-none" />
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="container mx-auto px-4 max-w-3xl text-center relative z-10">
                    <div className="w-14 h-14 rounded-full border border-amber-500/25 bg-amber-500/10 flex items-center justify-center mx-auto mb-7">
                        <Trophy className="w-6 h-6 text-amber-400" strokeWidth={1.75} />
                    </div>
                    <SectionEyebrow dark>The Ceremony</SectionEyebrow>
                    <p className="font-serif text-xl md:text-2xl text-white/85 leading-relaxed">
                        Awardees will be recognised during the closing ceremony of LexTalk World Singapore on <span className="text-amber-400">4 February 2027</span>. The one-day conference convenes senior legal, risk, compliance, privacy, cybersecurity and technology leaders around AI, law, risk and digital trust, with 150 or more senior delegates, 40 or more speakers and 15 or more exhibitors. Venue to be confirmed.
                    </p>
                </motion.div>
            </section>

            {/* ===================== FAQ ===================== */}
            <section id="faq" className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="mb-10">
                        <SectionEyebrow>FAQ</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Questions, <span className="text-amber-600">answered</span>
                        </h2>
                    </div>
                    <div className="space-y-2.5">
                        {faqItems.map((item, i) => (
                            <Accordion key={item.q} summary={item.q} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)}>
                                {item.a}
                            </Accordion>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== APPLY / ELIGIBILITY REVIEW FORM ===================== */}
            <section id="apply" className="py-20 md:py-28 bg-[#0a0e12] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/8 rounded-full blur-[140px] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-2xl relative z-10">
                    <div className="text-center mb-10">
                        <SectionEyebrow dark>Call to Action</SectionEyebrow>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-white leading-tight mb-5">
                            Request an <span className="text-amber-400">Eligibility Review</span>
                        </h2>
                        <p className="text-white/60 leading-relaxed max-w-xl mx-auto">
                            If your work has advanced responsible AI, trusted digital transformation or resilient governance, tell us why it should be considered. Our team will review category fit and share the next steps with eligible candidates.
                        </p>
                    </div>

                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8">
                        {submitted ? (
                            <div className="py-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-6">
                                    <Check className="w-8 h-8 text-amber-400" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-white mb-3">Request Received</h3>
                                <p className="text-white/60 text-sm max-w-sm leading-relaxed">
                                    Thank you for your interest in the Medal of Excellence. Our team will review your submission and respond within three business days.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Full Name <span className="text-amber-400">*</span></label>
                                        <input required value={form.name} onChange={update("name")} type="text" placeholder="Your name" className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-colors placeholder:text-white/30" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Job Title</label>
                                        <input value={form.role} onChange={update("role")} type="text" placeholder="e.g. Chief Risk Officer" className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-colors placeholder:text-white/30" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Organisation</label>
                                        <input value={form.organization} onChange={update("organization")} type="text" placeholder="Organisation" className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-colors placeholder:text-white/30" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Work Email <span className="text-amber-400">*</span></label>
                                        <input required value={form.email} onChange={update("email")} type="email" placeholder="name@company.com" className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-colors placeholder:text-white/30" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Country / Market</label>
                                        <input value={form.country} onChange={update("country")} type="text" placeholder="e.g. Singapore" className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-colors placeholder:text-white/30" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">LinkedIn or Website</label>
                                        <input value={form.linkedin} onChange={update("linkedin")} type="url" placeholder="https://" className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-colors placeholder:text-white/30" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Preferred Category</label>
                                    <select value={form.category} onChange={update("category")} className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-colors [&>option]:text-slate-900">
                                        <option value="">Select a category</option>
                                        {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                                        <option value="Not sure yet">Not sure yet — please advise</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">Achievement Summary (75 words)</label>
                                    <textarea value={form.summary} onChange={update("summary")} rows={4} placeholder="What was achieved, how it was implemented, and what changed as a result." className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-colors placeholder:text-white/30 resize-none" />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">How Did You Hear About the Awards?</label>
                                    <input value={form.source} onChange={update("source")} type="text" placeholder="Referral, LinkedIn, association, event, other" className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-colors placeholder:text-white/30" />
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer pt-2">
                                    <input checked={consent} onChange={(e) => setConsent(e.target.checked)} type="checkbox" className="mt-0.5 w-4 h-4 shrink-0 rounded border-white/30 bg-white/5 text-amber-500 focus:ring-amber-400/50 cursor-pointer" />
                                    <span className="text-xs text-white/55 leading-relaxed">
                                        I confirm the information provided is accurate, that I am authorised to submit it, and that I consent to LexTalk World contacting me about this recognition process. <span className="text-amber-400">*</span>
                                    </span>
                                </label>

                                {submitError && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">{submitError}</p>}

                                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Eligibility Request <ArrowRight className="w-4 h-4" /></>}
                                </button>
                            </form>
                        )}
                    </div>

                    <p className="mt-6 text-xs text-white/40 leading-relaxed text-center max-w-xl mx-auto">
                        Submission is an expression of interest only. It does not constitute recognition, and all recognition remains subject to eligibility and independent assessment. Participation arrangements for recognised awardees are shared privately after assessment.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
