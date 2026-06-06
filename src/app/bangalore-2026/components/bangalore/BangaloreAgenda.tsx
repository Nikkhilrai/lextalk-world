"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Speaker = { name: string; designation: string; image?: string };
type SessionType = "registration" | "opening" | "inauguration" | "keynote" | "panel" | "casestudy" | "break" | "roundtable" | "vvip" | "awards" | "closing";

type Session = {
    time: string;
    type: SessionType;
    title: string;
    duration: string;
    speakers?: Speaker[];
    isBreak?: boolean;
};

const TYPE_CONFIG: Record<SessionType, { label: string; dot: string; badge: string; border: string }> = {
    registration: { label: "Registration",        dot: "bg-slate-400",  badge: "bg-slate-500/20 text-slate-300 border-slate-500/30",   border: "border-slate-500/20" },
    opening:      { label: "Opening Address",     dot: "bg-purple-400", badge: "bg-purple-500/20 text-purple-300 border-purple-500/30", border: "border-purple-500/20" },
    inauguration: { label: "Inauguration",        dot: "bg-amber-400",  badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",   border: "border-amber-500/20" },
    keynote:      { label: "Opening Keynote",     dot: "bg-amber-400",  badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",   border: "border-amber-500/20" },
    panel:        { label: "Panel Discussion",    dot: "bg-blue-400",   badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",      border: "border-blue-500/20" },
    casestudy:    { label: "Case Study",          dot: "bg-emerald-400",badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", border: "border-emerald-500/20" },
    break:        { label: "Break",               dot: "bg-slate-600",  badge: "bg-slate-700/30 text-slate-500 border-slate-600/20",   border: "border-slate-700/20" },
    roundtable:   { label: "Leadership Roundtable", dot: "bg-indigo-400", badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30", border: "border-indigo-500/20" },
    vvip:         { label: "VVIP Session",        dot: "bg-amber-400",  badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",   border: "border-amber-500/20" },
    awards:       { label: "Awards Ceremony",     dot: "bg-amber-400",  badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",   border: "border-amber-500/20" },
    closing:      { label: "Networking",          dot: "bg-slate-400",  badge: "bg-slate-500/20 text-slate-300 border-slate-500/30",   border: "border-slate-500/20" },
};

const agenda: Session[] = [
    {
        time: "7:30 AM – 9:00 AM",
        type: "registration",
        title: "Arrival, Registration & Open Networking",
        duration: "90 min",
        isBreak: true,
    },
    {
        time: "9:00 AM – 9:05 AM",
        type: "opening",
        title: "Welcome Address by the Co-Founder & Director, LTW",
        duration: "5 min",
        speakers: [
            { name: "Abhishek Gourav", designation: "Co-Founder & Director, CAC & MantraNex Vista" },
        ],
    },
    {
        time: "9:05 AM – 9:10 AM",
        type: "inauguration",
        title: "Traditional Lamp Lighting Ceremony",
        duration: "10 min",
    },
    {
        time: "9:10 AM – 9:20 AM",
        type: "keynote",
        title: "Technology in Law",
        duration: "15 min",
        speakers: [
            { name: "Dr. Lalit Bhasin", designation: "President, Society of Indian Law Firms", image: "/bangalore-2026/speakers-images/lalit bhasin.png" },
        ],
    },
    {
        time: "9:20 AM – 10:10 AM",
        type: "panel",
        title: "AI in Legal Practice: Transforming Research, Compliance, and Legal Operations in the Indian Context",
        duration: "50 min",
        speakers: [
            { name: "Jaya Kathju",          designation: "Associate Director - Legal, Eli Lilly",                                        image: "/bangalore-2026/speakers-images/Jaya-Kathju.png" },
            { name: "Gaurav Sahay",         designation: "Founder/Partner, Arthashastra Legal" },
            { name: "Priyesh Sharma",       designation: "Assistant VP Legal, Knowledge Realty Trust",                                   image: "/bangalore-2026/speakers-images/Priyesh Sharma.png" },
            { name: "Hena Datta",           designation: "Head of Legal, Emmvee Group",                                                  image: "/bangalore-2026/speakers-images/Hena-Datta.png" },
            { name: "Smitha Chandrashekar", designation: "Legal Director, Harman International",                                         image: "/bangalore-2026/speakers-images/Smitha-Chandrashekar.png" },
            { name: "Prashant Srivastava",  designation: "Head of Contracts & Attorney Regional Counsel, Hewlett Packard Enterprise",     image: "/bangalore-2026/speakers-images/prashant-srivastava.jpg" },
        ],
    },
    {
        time: "10:10 AM – 10:40 AM",
        type: "break",
        title: "Tea & Networking Break",
        duration: "30 min",
        isBreak: true,
    },
    {
        time: "10:40 AM – 11:35 AM",
        type: "panel",
        title: "Regulation, Data Protection, and AI Governance: South Asia in a Global Frame",
        duration: "55 min",
        speakers: [
            { name: "Antony Alex",           designation: "Founder & CEO, Rainmaker",                                                     image: "/bangalore-2026/speakers-images/Antony-Alex.png" },
            { name: "Debasish Roychowdhury", designation: "General Counsel & Head Legal, In-solutions Global Ltd.",                       image: "/bangalore-2026/speakers-images/Debasish-Roychowdhury.png" },
            { name: "Sivani Peesapati",      designation: "Director, Cyber Security Lab, GE Healthcare",                                  image: "/bangalore-2026/speakers-images/Sivani-Peesapati.png" },
            { name: "Arvind Subramaniam",    designation: "Data Privacy Officer, M2P Fintech",                                            image: "/bangalore-2026/speakers-images/Arvind-Subramaniam.png" },
            { name: "Yogesh Naik",           designation: "Senior Legal Counsel, Volvo Group India",                                      image: "/bangalore-2026/speakers-images/YOGESH NAIK.png" },
        ],
    },
    {
        time: "11:35 AM – 11:55 AM",
        type: "casestudy",
        title: "Case Study Presentation by ABiz",
        duration: "20 min",
    },
    {
        time: "11:55 AM – 12:45 PM",
        type: "panel",
        title: "Intellectual Property in the Age of AI: Ownership, Authorship & Enforcement",
        duration: "50 min",
        speakers: [
            { name: "Saurabh Anand",          designation: "Lead Counsel, Akamai Technologies" },
            { name: "Deepalakshmi Vadivelan",  designation: "General Counsel & SVP Legal, Global DPO, Quess Corp Limited",                 image: "/bangalore-2026/speakers-images/Deepalakshmi-Vadivelan.png" },
            { name: "Krishna Chellapilla",     designation: "Head - Patents, Prosecution and Copyrights, Tata Consultancy Services",       image: "/bangalore-2026/speakers-images/Krishna-Chellapilla.png" },
            { name: "Iqbal Tauseef",           designation: "Executive Director – Legal Head - India & Global Contracts COE, TTEC",        image: "/bangalore-2026/speakers-images/Iqbal-Tauseef.png" },
            { name: "Sanjay Jain",             designation: "Founder & Managing Partner, Lex Corp",                                        image: "/bangalore-2026/speakers-images/Sunjjoy-Jaiin.png" },
        ],
    },
    {
        time: "12:45 PM – 1:45 PM",
        type: "break",
        title: "Power Lunch & Networking",
        duration: "60 min",
        isBreak: true,
    },
    {
        time: "1:45 PM – 2:40 PM",
        type: "panel",
        title: "India's Role in the Emerging Global LegalTech Ecosystem",
        duration: "55 min",
        speakers: [
            { name: "Amit Anand",            designation: "India Head Legal (VP Legal), Adobe",                                            image: "/bangalore-2026/speakers-images/Amit-Anand.png" },
            { name: "Shalini Chawla",        designation: "Patent Specialist, ITC Limited",                                               image: "/bangalore-2026/speakers-images/Shalini-Chawla.png" },
            { name: "MS Sivaramakrishnan",   designation: "Independent Lawyer/Advocate",                                                  image: "/bangalore-2026/speakers-images/Sivaramakrishnan M.S.png" },
            { name: "Bhavesh Saxena",        designation: "Compliance Lead - Asia Pacific & Country Counsel India, Agilent Technologies",  image: "/bangalore-2026/speakers-images/Bhavesh-Saxena1.jpg" },
            { name: "Ankita Choudhary",      designation: "Head of Legal, Nuvama Group",                                                  image: "/bangalore-2026/speakers-images/Ankita-Choudhary.png" },
            { name: "Anvesha Kumar",         designation: "Director - Legal, JLL",                                                        image: "/bangalore-2026/speakers-images/Anvesha-Kumar.png" },
        ],
    },
    {
        time: "2:40 PM – 2:50 PM",
        type: "casestudy",
        title: "The AI-Powered Legal WorkDesk: CaseDocker's Vision for Seamless Operations",
        duration: "10 min",
        speakers: [
            { name: "Kapil Singhal", designation: "Chief Executive Officer, Case Docker", image: "/bangalore-2026/speakers-images/Kapil-Singhal.png" },
        ],
    },
    {
        time: "2:50 PM – 3:45 PM",
        type: "panel",
        title: "Digital Forensics, Data Privacy & Cybersecurity Investigations: Managing Evidence, Risk and Response",
        duration: "55 min",
        speakers: [
            { name: "Jagannath PV",              designation: "Global Data Privacy Officer, LTIMindtree",                                  image: "/bangalore-2026/speakers-images/Jagannath PV.png" },
            { name: "Sushma Shankar",            designation: "Vice President - Legal, Accenture",                                        image: "/bangalore-2026/speakers-images/sushma_shankar.png" },
            { name: "Rakesh Kumarswamy Udupi",   designation: "Associate Vice President, Infosys Ltd.",                                   image: "/bangalore-2026/speakers-images/Rakesh Udupi.png" },
            { name: "Yawar Usmani",              designation: "Group General Counsel & Company Secretary, MooMark",                       image: "/bangalore-2026/speakers-images/YAWAR USMANI.png" },
            { name: "Hon'ble Justice G. Shyam Prasad", designation: "Former Judge, High Court of Judicature at Hyderabad | Senior Counsel, Supreme Court of India", image: "/bangalore-2026/speakers-images/G-Shyam-Prasad.jpeg" },
            { name: "Punya Patra",               designation: "Head - Legal Innovation Hub, Novartis Healthcare",                         image: "/bangalore-2026/speakers-images/Punya Patra.png" },
        ],
    },
    {
        time: "3:45 PM – 4:45 PM",
        type: "roundtable",
        title: "Future of Law in Asia: Cross-Border Regulation and Digital Dispute Resolution",
        duration: "60 min",
        speakers: [
            { name: "Sathish Kolar Ramamoorthy", designation: "General Counsel VP Legal & CS, Manipal Health Enterprises",               image: "/bangalore-2026/speakers-images/Sathish-Kolar-Ramamoorthy.png" },
            { name: "Devesh Bhardwaj",           designation: "Head - Legal, VerSe Innovation",                                           image: "/bangalore-2026/speakers-images/Devesh-Bhardwaj.png" },
            { name: "Panduranga Acharya",        designation: "General Counsel, Zepto",                                                   image: "/bangalore-2026/speakers-images/Panduranga Acharya.png" },
            { name: "Balaji Mohan",              designation: "Director, Head of Legal, Trianz Digital Consulting",                       image: "/bangalore-2026/speakers-images/Balaji Mohan.png" },
            { name: "Deepti Aggarwal",           designation: "Associate Director, Regulatory Affairs & Drug Development Solutions, IQVIA", image: "/bangalore-2026/speakers-images/Deepti Aggarwal.png" },
            { name: "Aniket Gautam",             designation: "Founding Partner, ASG & Partners Advocates",                               image: "/bangalore-2026/speakers-images/Aniket-Gautam.png" },
            { name: "Velmuruga Venkatesh",       designation: "Executive Director - Technology Risk Policy Governance, Wells Fargo",       image: "/bangalore-2026/speakers-images/Velmuruga-Venkatesh.png" },
        ],
    },
    {
        time: "4:45 PM – 5:00 PM",
        type: "vvip",
        title: "Valedictory Session",
        duration: "15 min",
    },
    {
        time: "5:00 PM – 5:30 PM",
        type: "awards",
        title: "LTW Legal Excellence Awards 2026",
        duration: "30 min",
    },
    {
        time: "5:30 PM – 6:00 PM",
        type: "closing",
        title: "High Tea & Farewell Networking",
        duration: "30 min",
        isBreak: true,
    },
];

function SpeakerAvatar({ sp }: { sp: Speaker }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10 bg-slate-800">
                {sp.image ? (
                    <Image
                        src={sp.image}
                        alt={sp.name}
                        width={40}
                        height={40}
                        unoptimized
                        className="w-full h-full object-cover object-top"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold">
                        {sp.name.charAt(0)}
                    </div>
                )}
            </div>
            <div className="min-w-0">
                <p className="text-white/85 text-xs font-semibold leading-tight truncate">{sp.name}</p>
                <p className="text-slate-500 text-[11px] leading-tight mt-0.5 line-clamp-2">{sp.designation}</p>
            </div>
        </div>
    );
}

function AgendaItem({ session, index }: { session: Session; index: number }) {
    const [open, setOpen] = useState(false);
    const cfg = TYPE_CONFIG[session.type];
    const hasExpandable = session.speakers && session.speakers.length > 0;

    if (session.isBreak) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="flex gap-4 md:gap-8 items-center py-3"
            >
                <div className="w-28 md:w-36 flex-shrink-0 text-right">
                    <span className="text-[10px] md:text-xs text-slate-600 font-medium tabular-nums">{session.time}</span>
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                </div>
                <div className="flex items-center gap-3 flex-1 py-2 px-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-600 text-sm">—</span>
                    <span className="text-slate-500 text-xs md:text-sm font-medium">{session.title}</span>
                    <span className="ml-auto text-[10px] text-slate-600 font-medium">{session.duration}</span>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.03 }}
            className="flex gap-4 md:gap-8 items-start py-2"
        >
            {/* Time */}
            <div className="w-28 md:w-36 flex-shrink-0 text-right pt-3">
                <span className="text-[10px] md:text-xs text-slate-400 font-semibold tabular-nums leading-tight">{session.time}</span>
            </div>

            {/* Timeline spine */}
            <div className="flex flex-col items-center flex-shrink-0 pt-3">
                <div className={`w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050a15] ${cfg.dot} flex-shrink-0`} />
                <div className="w-[1px] flex-1 bg-gradient-to-b from-white/10 to-transparent mt-1 min-h-[32px]" />
            </div>

            {/* Card */}
            <div className={`flex-1 mb-4 rounded-2xl border ${cfg.border} bg-white/[0.03] hover:bg-white/[0.05] transition-colors duration-200 overflow-hidden`}>
                <div
                    className={`p-4 md:p-5 ${hasExpandable && session.speakers!.length > 1 ? "cursor-pointer" : ""}`}
                    onClick={() => hasExpandable && session.speakers!.length > 1 && setOpen(v => !v)}
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                                    {cfg.label}
                                </span>
                                <span className="text-[10px] text-slate-600 font-medium">{session.duration}</span>
                            </div>
                            <h3 className="text-white/90 text-sm md:text-base font-semibold leading-snug">{session.title}</h3>
                        </div>
                        {hasExpandable && session.speakers!.length > 1 && (
                            <motion.div
                                animate={{ rotate: open ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                                className="flex-shrink-0 mt-1"
                            >
                                <svg className="w-4 h-4 text-slate-500" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                        )}
                    </div>

                    {/* Single speaker shown inline */}
                    {session.speakers?.length === 1 && (
                        <div className="mt-3">
                            <SpeakerAvatar sp={session.speakers[0]} />
                        </div>
                    )}
                </div>

                {/* Expandable multi-speaker list */}
                {hasExpandable && session.speakers!.length > 1 && (
                    <AnimatePresence initial={false}>
                        {open ? (
                            <motion.div
                                key="open"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="border-t border-white/5 px-4 md:px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {session.speakers!.map((sp, si) => (
                                        <SpeakerAvatar key={si} sp={sp} />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="closed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="px-4 md:px-5 pb-4"
                            >
                                {/* Avatar strip preview */}
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {session.speakers!.slice(0, 5).map((sp, si) => (
                                            <div key={si} className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-[#050a15] bg-slate-800 flex-shrink-0">
                                                {sp.image ? (
                                                    <Image src={sp.image} alt={sp.name} width={28} height={28} unoptimized className="w-full h-full object-cover object-top" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-400 font-bold">{sp.name.charAt(0)}</div>
                                                )}
                                            </div>
                                        ))}
                                        {session.speakers!.length > 5 && (
                                            <div className="w-7 h-7 rounded-full bg-slate-800 ring-2 ring-[#050a15] flex items-center justify-center text-[9px] text-slate-400 font-bold">
                                                +{session.speakers!.length - 5}
                                            </div>
                                        )}
                                    </div>
                                    <button className="text-[11px] text-slate-500 hover:text-amber-400 transition-colors duration-150 font-medium ml-1">
                                        {session.speakers!.length} speakers — tap to expand
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
}

export function BangaloreAgenda() {
    return (
        <section id="agenda" className="relative bg-[#050a15] py-24 md:py-32 overflow-hidden">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/6 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/6 to-transparent rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-4xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500 font-bold tracking-[0.35em] text-xs uppercase mb-4 block">
                        Full-Day Conference · South Asia Focus
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-5 tracking-tight">
                        Conference Agenda
                    </h2>
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-white/60 text-xs md:text-sm font-medium">June 2026 · Bangalore, India</span>
                    </div>
                </motion.div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {(["keynote", "panel", "casestudy", "roundtable", "awards"] as SessionType[]).map(t => (
                        <span key={t} className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${TYPE_CONFIG[t].badge}`}>
                            {TYPE_CONFIG[t].label}
                        </span>
                    ))}
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    <div className="absolute left-[calc(7rem+1.25rem)] md:left-[calc(9rem+1.25rem)] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
                    {agenda.map((session, i) => (
                        <AgendaItem key={i} session={session} index={i} />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-slate-600 text-xs mt-12"
                >
                    * Schedule subject to minor adjustments. All times are IST.
                </motion.p>
            </div>
        </section>
    );
}
