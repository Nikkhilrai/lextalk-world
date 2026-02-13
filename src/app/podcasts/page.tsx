"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Play, Pause, Clock, ChevronDown, ChevronRight, Search,
    Globe, ShieldCheck, TrendingUp, Users, Mic2,
    Youtube, Mail, Linkedin, X, Volume2, Share2, Star, Flame, ArrowRight, Copy, Check
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Theme CSS Variables
   ───────────────────────────────────────────── */
const THEME_STYLES = `
  :root {
    --navy: #0f2336;
    --navy-light: #162d44;
    --navy-muted: #1a3654;
    --gold: #d4a843;
    --gold-light: #e8c36a;
    --card-bg: #ffffff;
    --card-bg-dark: #0f1b2b;
    --text-primary: #0f2336;
    --text-secondary: #4a6580;
    --body-bg: #0b1a2a;
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 35s linear infinite;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
`;

/* ─────────────────────────────────────────────
   Real Playlist Data (50 videos)
   ───────────────────────────────────────────── */
const EPISODES = [
    { id: 1, title: "Rediscovering Identity and Purpose in the Legal Profession | Featuring Jorge Barona", youtubeId: "FhzAMLOX5os", duration: "1:15:22", guest: "Jorge Barona" },
    { id: 2, title: "The Real Stories Behind the Résumé | Featuring Ewa Kozlowska, Esq.", youtubeId: "l2q8lMZrW04", duration: "28:24", guest: "Ewa Kozlowska" },
    { id: 3, title: "Matters of Law With Ankur Malik: Expert Legal Solutions", youtubeId: "1K_a9kmMcKs", duration: "50:35", guest: "Ankur Malik" },
    { id: 4, title: "Transition to In-House Legal from Private Practice", youtubeId: "Tt1MR3sHz9s", duration: "32:44", guest: "Industry Panel" },
    { id: 5, title: "Understanding the Impact of AI In Legal Profession Ft. Anatoly Kotlyar", youtubeId: "h0o6J3zVOWY", duration: "1:00:49", guest: "Anatoly Kotlyar" },
    { id: 6, title: "Shocking Truth About Lawyers Dealing with Fake Case In Court", youtubeId: "8yDhmCmZ_Ec", duration: "2:00:45", guest: "LexTalk Special" },
    { id: 7, title: "Lawyer vs Police – Ankur Malik", youtubeId: "K9TBecH59fY", duration: "20:33", guest: "Ankur Malik" },
    { id: 8, title: "Talk Show with Mr. Prakhar Srivastava, Advocate at Supreme Court of India", youtubeId: "av6p8nHSQcU", duration: "21:47", guest: "Prakhar Srivastava" },
    { id: 9, title: "Talk Show with Neha Sachde, Head of Legal at Infinity Capital", youtubeId: "50F6dOZrl1c", duration: "10:58", guest: "Neha Sachde" },
    { id: 10, title: "Talk Show with Avdhesh Bairwa, Corporate Counsel at Anand Sharma and Associates", youtubeId: "jLYYkMEMHPw", duration: "8:37", guest: "Avdhesh Bairwa" },
    { id: 11, title: "Talk Show with Shivender Kumar Sharma, Founder & Managing Partner at SKS LAW CHAMBERS", youtubeId: "_et8zn0PE-E", duration: "26:47", guest: "Shivender Kumar Sharma" },
    { id: 12, title: "Talk Show with Jayesh Gaurav, Senior Arguing Counsel", youtubeId: "LxGLU8U02-o", duration: "22:50", guest: "Jayesh Gaurav" },
    { id: 13, title: "Talk Show with Jomol Joy, Associate at Wadhwa Law Offices", youtubeId: "AyABHTCFaOo", duration: "22:23", guest: "Jomol Joy" },
    { id: 14, title: "Talk Show with CS Rahul Jain, Principal – Corporate Law & IPR, RANJ Corporate Advisors", youtubeId: "xZdQ3DrNi2U", duration: "19:42", guest: "CS Rahul Jain" },
    { id: 15, title: "Talk Show with A K Gupta, Founder and Managing Director of TPM", youtubeId: "by_ViMOw3Dg", duration: "27:22", guest: "A K Gupta" },
    { id: 16, title: "Talk Show with Prashant Ramdas, VP & Head-Legal, Entertainment Network (India) Ltd.", youtubeId: "28eAh8beJXM", duration: "23:12", guest: "Prashant Ramdas" },
    { id: 17, title: "Talk Show with Devashish Jagirdar, a Litigation Strategist", youtubeId: "spL4z_AXZIo", duration: "26:38", guest: "Devashish Jagirdar" },
    { id: 18, title: "Talk Show with Abbhinav Thakshak, Co Founder of TSA Legal", youtubeId: "dRHAgDtqu8c", duration: "25:35", guest: "Abbhinav Thakshak" },
    { id: 19, title: "Talk Show with Sunny Mittal, VP – Legal & Compliance at FincFriends Private Limited", youtubeId: "Py8RgVWRT98", duration: "23:02", guest: "Sunny Mittal" },
    { id: 20, title: "Talk Show with Ryan Mendonca, Founder of Your Virtual Legal Counsel", youtubeId: "_BLSySzf5lo", duration: "29:08", guest: "Ryan Mendonca" },
    { id: 21, title: "Talk Show with Reshant Vasant Shah, Managing Partner at Lex Conseiller", youtubeId: "JJ4N8Wj0Tp8", duration: "39:32", guest: "Reshant Vasant Shah" },
    { id: 22, title: "Talk Show with Anku Khanna, Managing Partner, The Attorneys Corporate Law Consultants", youtubeId: "j38HOo6WCgE", duration: "19:22", guest: "Anku Khanna" },
    { id: 23, title: "Talk Show with Jaydeepsinh Zala, Senior Associate Partner, KAMENDU JOSHI & ASSOCIATES", youtubeId: "s7qNondZtwg", duration: "6:13", guest: "Jaydeepsinh Zala" },
    { id: 24, title: "Talk Show with Lion Amirr Virani, LegalTech Evangelist at Prime Infotech Solution", youtubeId: "v4U8QfLodbI", duration: "28:26", guest: "Amirr Virani" },
    { id: 25, title: "Talk Show with Prithvish Rajamani, Founder of TRAN Legal & Mediation Services", youtubeId: "N3VV0sd-KZM", duration: "30:14", guest: "Prithvish Rajamani" },
    { id: 26, title: "Talk Show with Mohini Priya, Advocate on Record at Supreme Court of India", youtubeId: "rs9j2YNWMck", duration: "19:56", guest: "Mohini Priya" },
    { id: 27, title: "Talk Show with Akshay Lal, Consulting Partner at Taarkik Legal Advocates & Consultants", youtubeId: "4742xk8y56Y", duration: "29:12", guest: "Akshay Lal" },
    { id: 28, title: "Talk Show with Teresa Daulat, Founding Partner at TRD Associates, Advocates", youtubeId: "8ukcS8kM4CM", duration: "21:18", guest: "Teresa Daulat" },
    { id: 29, title: "Talk Show with Usha Tanna, Owner of Adv. Mrs. Usha Tanna & Associates", youtubeId: "tyQHJT3jDOU", duration: "8:44", guest: "Usha Tanna" },
    { id: 30, title: "Talk Show with Gopalan Surya Narayanan, Managing/Senior Partner at GSJ Legal", youtubeId: "qsbEdWv5n08", duration: "32:52", guest: "Gopalan Surya Narayanan" },
    { id: 31, title: "Talk Show with Md. Imam Hossain, Head of Chamber at Investment & Development", youtubeId: "nYqLFcDUJfs", duration: "27:46", guest: "Md. Imam Hossain" },
    { id: 32, title: "Talk Show with Vivek Jhunjhunwala, Partner at Khaitan & Co.", youtubeId: "BlXqaPXR604", duration: "20:56", guest: "Vivek Jhunjhunwala" },
    { id: 33, title: "Talk Show with M. Savithri Sravanthi, Founder & Managing Partner at IUSTUS LEGAL", youtubeId: "rp38CF4nj9o", duration: "32:37", guest: "M. Savithri Sravanthi" },
    { id: 34, title: "Talk Show with Noshir Kumana, Sole Proprietor & Solicitor of Kumana & Company", youtubeId: "FoRW9QoGryc", duration: "41:59", guest: "Noshir Kumana" },
    { id: 35, title: "Talk Show with Dr. Yasser Abo Ismail, GC & Compliance Officer at Schindler Group, UAE", youtubeId: "AlQ5o7wMTOs", duration: "35:18", guest: "Dr. Yasser Abo Ismail" },
    { id: 36, title: "Talk Show with Sunita Pareek, General Counsel at Talent500", youtubeId: "j8QY1GXPvws", duration: "24:10", guest: "Sunita Pareek" },
    { id: 37, title: "Talk Show with Leena Desai, Managing Associate at ROYZZ & CO", youtubeId: "P39cRHZ7K4g", duration: "10:43", guest: "Leena Desai" },
    { id: 38, title: "Talk Show with Vivek Tiwari, Advocate and Partner at Analogue Legal", youtubeId: "xcWWrXV6FCc", duration: "31:02", guest: "Vivek Tiwari" },
    { id: 39, title: "Talk Show with Sharifah Thaherah Alasree, Head of Legal of APAC and India at Infobip", youtubeId: "iyZwzfYjmKE", duration: "18:06", guest: "Sharifah Thaherah Alasree" },
    { id: 40, title: "Talk Show with Anubhav Sinha, Advocate", youtubeId: "okGEGVaqw0w", duration: "42:46", guest: "Anubhav Sinha" },
    { id: 41, title: "Talk Show with Samrat SenGupta, Equity Partner at S. Jalan and Company, Advocates", youtubeId: "9ns4LwivwgM", duration: "52:50", guest: "Samrat SenGupta" },
    { id: 42, title: "Talk Show with Karan Phalgun Gandhi, Proprietor at Advocate Karan Gandhi & Associates", youtubeId: "0bQkKqAZ3jo", duration: "18:21", guest: "Karan Phalgun Gandhi" },
    { id: 43, title: "Talk Show with Sourav Ghosh, Managing Partner at S. Jalan and Company, Advocates", youtubeId: "g7vEi4dEiOQ", duration: "35:54", guest: "Sourav Ghosh" },
    { id: 44, title: "Talk Show with Raghvendra Verma, Group Head – Legal, Compliance & CS, ISON Group", youtubeId: "w-Xf4F-blbQ", duration: "29:19", guest: "Raghvendra Verma" },
    { id: 45, title: "Talk Show with Hila Eyal, Advocate Legal Department at Hotmobile", youtubeId: "xTI4-da51w8", duration: "16:06", guest: "Hila Eyal" },
    { id: 46, title: "Talk Show with Barrister Awais Babar, Senior Counsel at HYAT & MEERJEES", youtubeId: "0FwI157pBZE", duration: "26:47", guest: "Awais Babar" },
    { id: 47, title: "Talk Show with Sean Janse van Rensburg, Attorney at JV Rensburg Kinsella Inc Attorneys", youtubeId: "g8K2nHMQ7Io", duration: "28:55", guest: "Sean Janse van Rensburg" },
    { id: 48, title: "Talk Show with Pragyna P C Raut, Part Head, Legal (Senior Legal Counsel) at Samsung", youtubeId: "3rsCMYI5Ljs", duration: "27:40", guest: "Pragyna P C Raut" },
    { id: 49, title: "Talk Show with Srijan Sinha, Partner at Edictum Law & Co.", youtubeId: "TcLVE3wgkCk", duration: "34:52", guest: "Srijan Sinha" },
    { id: 50, title: "Talk Show with Anthony Wong, Senior Director & Associate General Counsel – Informatica", youtubeId: "UejRAgX0LRU", duration: "22:43", guest: "Anthony Wong" },
];


// Featured guests for marquee (select ones with recognizable titles)
const FEATURED_GUESTS = [
    { name: "Jorge Barona", role: "Legal Identity Expert", youtubeId: "FhzAMLOX5os" },
    { name: "Ewa Kozlowska", role: "Attorney at Law", youtubeId: "l2q8lMZrW04" },
    { name: "Anatoly Kotlyar", role: "AI & Legal Tech", youtubeId: "h0o6J3zVOWY" },
    { name: "Anthony Wong", role: "Assoc. GC, Informatica", youtubeId: "UejRAgX0LRU" },
    { name: "Dr. Yasser Abo Ismail", role: "GC, Schindler Group UAE", youtubeId: "AlQ5o7wMTOs" },
    { name: "Pragyna Raut", role: "Legal Head, Samsung", youtubeId: "3rsCMYI5Ljs" },
    { name: "Vivek Jhunjhunwala", role: "Partner, Khaitan & Co.", youtubeId: "BlXqaPXR604" },
    { name: "Samrat SenGupta", role: "Equity Partner", youtubeId: "9ns4LwivwgM" },
    { name: "Noshir Kumana", role: "Solicitor", youtubeId: "FoRW9QoGryc" },
    { name: "Sunita Pareek", role: "GC, Talent500", youtubeId: "j8QY1GXPvws" },
    { name: "Sean van Rensburg", role: "Attorney, South Africa", youtubeId: "g8K2nHMQ7Io" },
    { name: "Hila Eyal", role: "Legal, Hotmobile", youtubeId: "xTI4-da51w8" },
];

/* ─────────────────────────────────────────────
   Animated Count-Up Component
   ───────────────────────────────────────────── */
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const step = Math.max(1, Math.floor(end / 40));
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(start);
        }, 30);
        return () => clearInterval(timer);
    }, [isInView, end]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   Skeleton Loader
   ───────────────────────────────────────────── */
function CardSkeleton() {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
            <div className="aspect-video bg-slate-200" />
            <div className="p-4 space-y-2.5">
                <div className="h-3 w-20 bg-slate-200 rounded" />
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-2/3 bg-slate-100 rounded" />
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main Page Component
   ───────────────────────────────────────────── */
import { notFound } from "next/navigation";

// ... (existing imports)

export default function PodcastPage() {
    // Force "Under Construction" page as requested
    notFound();

    // The rest of the component remains but won't be executed for now
    const [activeVideo, setActiveVideo] = useState(EPISODES[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [visibleCount, setVisibleCount] = useState(12);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showMiniPlayer, setShowMiniPlayer] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<"latest" | "popular">("latest");
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const featuredRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const style = document.createElement("style");
        style.textContent = THEME_STYLES;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    // Mini player on scroll
    useEffect(() => {
        if (!featuredRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setShowMiniPlayer(!entry.isIntersecting && isPlaying),
            { threshold: 0.1 }
        );
        observer.observe(featuredRef.current);
        return () => observer.disconnect();
    }, [isPlaying]);

    // Sorted episodes based on tab
    const sortedEpisodes = useMemo(() => {
        const eps = [...EPISODES];
        if (activeTab === "popular") {
            // Sort by duration descending (longer = more engaging as a heuristic)
            return eps.sort((a, b) => {
                const toSec = (d: string) => d.split(":").reverse().reduce((s, v, i) => s + parseInt(v) * Math.pow(60, i), 0);
                return toSec(b.duration) - toSec(a.duration);
            });
        }
        return eps; // latest = default order
    }, [activeTab]);

    const filteredEpisodes = searchQuery
        ? sortedEpisodes.filter(ep =>
            ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ep.guest.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : sortedEpisodes;
    const visibleEpisodes = filteredEpisodes.slice(0, visibleCount);
    const hasMore = visibleCount < filteredEpisodes.length;

    const handlePlayFeatured = (episode: typeof EPISODES[0]) => {
        setActiveVideo(episode);
        setIsPlaying(true);
        setShowModal(false);
        window.scrollTo({ top: (featuredRef.current?.offsetTop ?? 0) - 100, behavior: "smooth" });
    };

    const handleCardClick = (episode: typeof EPISODES[0]) => {
        setActiveVideo(episode);
        setShowModal(true);
        setIsPlaying(true);
    };

    const handleShare = async (episode: typeof EPISODES[0], e: React.MouseEvent) => {
        e.stopPropagation();
        const url = `https://www.youtube.com/watch?v=${episode.youtubeId}`;
        await navigator.clipboard.writeText(url);
        setCopiedId(episode.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Extract short role from title
    const getRole = (title: string) => {
        const roleMatch = title.match(/(?:at|of|,)\s(.+?)(?:\.|$)/);
        if (roleMatch) return roleMatch[1].substring(0, 40);
        return "";
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 25 },
        visible: (i: number) => ({
            opacity: 1, y: 0,
            transition: { delay: i * 0.04, duration: 0.35, ease: "easeOut" }
        })
    };

    return (
        <main className="min-h-screen" style={{ background: "var(--body-bg, #0b1a2a)" }}>
            <Navbar variant="default" />

            {/* ═══════════════════════════════════════
                1. HERO — Lighter gradient + stats
               ═══════════════════════════════════════ */}
            <section className="relative pt-28 pb-14 md:pt-40 md:pb-20 overflow-hidden">
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0f3350 0%, rgba(15, 51, 80, 0.92) 50%, #0b1a2a 100%)" }} />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(https://i.ytimg.com/vi/FhzAMLOX5os/maxresdefault.jpg)`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(30px) saturate(0.6)" }} />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
                <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#d4a843]/8 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[900px] mx-auto">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[#e8c36a] text-xs font-semibold uppercase tracking-[0.15em] mb-7">
                            <Mic2 size={14} /> LexTalk World Media
                        </span>
                        <h1 className="font-bold text-white mb-5 tracking-tight" style={{ fontSize: "clamp(32px, 6vw, 56px)", lineHeight: "1.1" }}>
                            Vlogs & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8c36a] to-[#d4a843]">Podcasts</span>
                        </h1>
                        <p className="text-[#8eafc4] text-base md:text-lg max-w-xl mx-auto mb-9 leading-relaxed font-light">
                            Where Law Meets Leadership, Innovation & Global Insight.
                            Featuring general counsel, partners, and pioneers reshaping the future.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <button onClick={() => { setActiveVideo(EPISODES[0]); setIsPlaying(true); }} className="group px-7 py-3 bg-[#d4a843] hover:bg-[#c49a3a] text-[#0f2336] font-bold rounded-full transition-all flex items-center gap-2.5 shadow-lg shadow-[#d4a843]/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#d4a843]/30">
                                <Play fill="currentColor" size={15} /> Watch Latest Episode
                            </button>
                            <a href="#playlist" className="px-7 py-3 bg-white/8 hover:bg-white/14 border border-white/15 text-white/90 font-medium rounded-full transition-all flex items-center gap-2">
                                View All Episodes <ChevronDown size={15} />
                            </a>
                        </div>
                    </motion.div>

                    {/* ── Stats Banner ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-14 max-w-2xl mx-auto"
                    >
                        <div className="flex items-center justify-center gap-6 md:gap-10 py-5 px-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            {[
                                { value: 50, suffix: "+", label: "Episodes" },
                                { value: 35, suffix: "+", label: "Countries" },
                                { value: 100, suffix: "K+", label: "Views" },
                                { value: 40, suffix: "+", label: "Legal Leaders" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-xl md:text-2xl font-bold text-white">
                                        <CountUp end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-[10px] md:text-xs text-[#6895b2] font-medium mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                2. FEATURED GUESTS MARQUEE
               ═══════════════════════════════════════ */}
            <section className="py-8 overflow-hidden border-y border-white/5" style={{ background: "rgba(15,35,54,0.6)" }}>
                <div className="container mx-auto px-4 mb-4">
                    <p className="text-[11px] font-bold text-[#6895b2] uppercase tracking-[0.2em]">Featured Guests</p>
                </div>
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0b1a2a] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0b1a2a] to-transparent z-10 pointer-events-none" />
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...FEATURED_GUESTS, ...FEATURED_GUESTS].map((guest, i) => (
                            <div key={i} className="inline-flex items-center gap-3 mx-4 px-4 py-2.5 rounded-full bg-white/5 border border-white/8 flex-shrink-0 hover:border-[#d4a843]/30 hover:bg-white/8 transition-all cursor-pointer group">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex-shrink-0 ring-2 ring-white/10 group-hover:ring-[#d4a843]/40 transition-all">
                                    <Image
                                        src={`https://i.ytimg.com/vi/${guest.youtubeId}/default.jpg`}
                                        alt={guest.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white leading-none">{guest.name}</p>
                                    <p className="text-[10px] text-[#6895b2] leading-none mt-0.5">{guest.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                3. FEATURED VIDEO — White card
               ═══════════════════════════════════════ */}
            <section ref={featuredRef} className="py-14 md:py-16 z-20">
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/15 p-3 md:p-4">
                            <div className="relative aspect-video w-full bg-[#0f2336] rounded-xl overflow-hidden">
                                {isPlaying ? (
                                    <iframe key={activeVideo.youtubeId} width="100%" height="100%" src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`} title={activeVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute inset-0 w-full h-full" />
                                ) : (
                                    <button onClick={() => setIsPlaying(true)} className="absolute inset-0 w-full h-full group cursor-pointer">
                                        <Image src={`https://i.ytimg.com/vi/${activeVideo.youtubeId}/maxresdefault.jpg`} alt={activeVideo.title} fill className="object-cover" priority />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#d4a843] text-[#0f2336] flex items-center justify-center shadow-2xl shadow-[#d4a843]/40 group-hover:scale-110 transition-transform">
                                                <Play fill="currentColor" size={28} className="ml-1" />
                                            </div>
                                        </div>
                                    </button>
                                )}
                            </div>
                            <div className="px-2 md:px-3 pt-4 pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                                        <span className="px-2.5 py-0.5 bg-[#d4a843] text-[#0f2336] text-[10px] font-bold rounded-full uppercase tracking-wide">Now Playing</span>
                                        <span className="px-2.5 py-0.5 bg-[#f0f4f8] text-[#4a6580] text-[10px] font-semibold rounded-full">Episode {String(activeVideo.id).padStart(2, "0")}</span>
                                        <span className="flex items-center gap-1 text-[#8eafc4] text-xs"><Clock size={11} /> {activeVideo.duration}</span>
                                    </div>
                                    <h2 className="text-base md:text-lg font-bold text-[#0f2336] leading-snug">{activeVideo.title}</h2>
                                    <p className="text-xs text-[#6895b2] mt-1">Featuring <span className="font-semibold text-[#0f2336]">{activeVideo.guest}</span></p>
                                </div>
                                <button
                                    onClick={(e) => handleShare(activeVideo, e)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f4f8] hover:bg-[#e2e8f0] text-[#4a6580] text-xs font-medium rounded-lg transition-colors flex-shrink-0"
                                >
                                    {copiedId === activeVideo.id ? <><Check size={12} /> Copied!</> : <><Share2 size={12} /> Share</>}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ═══════════════════════════════════════
                5. VIDEO MODAL
               ═══════════════════════════════════════ */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
                        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setShowModal(false)} className="absolute -top-11 right-0 text-white/60 hover:text-white transition-colors"><X size={26} /></button>
                            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                                <div className="aspect-video bg-black">
                                    <iframe key={`modal-${activeVideo.youtubeId}`} width="100%" height="100%" src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`} title={activeVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-full h-full" />
                                </div>
                                <div className="p-5 flex items-start justify-between gap-4">
                                    <div>
                                        <span className="text-[#d4a843] text-xs font-bold">EP {String(activeVideo.id).padStart(2, "0")} · {activeVideo.duration}</span>
                                        <h3 className="text-base font-bold text-[#0f2336] mt-1">{activeVideo.title}</h3>
                                        <p className="text-xs text-[#6895b2] mt-1">Featuring <span className="font-semibold text-[#0f2336]">{activeVideo.guest}</span></p>
                                    </div>
                                    <button onClick={(e) => handleShare(activeVideo, e)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f4f8] hover:bg-[#e2e8f0] text-[#4a6580] text-xs font-medium rounded-lg transition-colors flex-shrink-0">
                                        {copiedId === activeVideo.id ? <><Check size={12} /> Copied!</> : <><Share2 size={12} /> Share</>}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════
                6. STICKY MINI PLAYER
               ═══════════════════════════════════════ */}
            <AnimatePresence>
                {showMiniPlayer && (
                    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", damping: 25 }} className="fixed bottom-5 right-5 z-40 bg-white rounded-xl shadow-2xl shadow-black/20 border border-slate-100 p-3 flex items-center gap-3 max-w-sm">
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                            <Image src={`https://i.ytimg.com/vi/${activeVideo.youtubeId}/default.jpg`} alt="" fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-[#d4a843] font-bold uppercase">Now Playing</p>
                            <p className="text-xs font-semibold text-[#0f2336] truncate">{activeVideo.guest}</p>
                        </div>
                        <button onClick={() => window.scrollTo({ top: (featuredRef.current?.offsetTop ?? 0) - 100, behavior: "smooth" })} className="w-8 h-8 rounded-full bg-[#d4a843] text-[#0f2336] flex items-center justify-center flex-shrink-0 hover:bg-[#c49a3a] transition-colors">
                            <Play fill="currentColor" size={12} className="ml-0.5" />
                        </button>
                        <button onClick={() => setShowMiniPlayer(false)} className="text-slate-400 hover:text-slate-600 flex-shrink-0"><X size={14} /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════
                7. ALL EPISODES GRID — tabs + search
               ═══════════════════════════════════════ */}
            <section id="playlist" className="py-16 md:py-20" style={{ background: "linear-gradient(180deg, #0b1a2a 0%, #0e2133 100%)" }}>
                <div className="container mx-auto px-4">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">All Episodes</h2>
                            <p className="text-[#6895b2] text-sm mt-1">{filteredEpisodes.length} episodes</p>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {/* Tabs */}
                            <div className="flex bg-white/5 rounded-lg border border-white/10 p-0.5">
                                <button onClick={() => { setActiveTab("latest"); setVisibleCount(12); }} className={cn("px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all", activeTab === "latest" ? "bg-[#d4a843] text-[#0f2336]" : "text-[#6895b2] hover:text-white")}>
                                    <span className="flex items-center gap-1.5"><ChevronDown size={12} /> Latest</span>
                                </button>
                                <button onClick={() => { setActiveTab("popular"); setVisibleCount(12); }} className={cn("px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all", activeTab === "popular" ? "bg-[#d4a843] text-[#0f2336]" : "text-[#6895b2] hover:text-white")}>
                                    <span className="flex items-center gap-1.5"><Flame size={12} /> Popular</span>
                                </button>
                            </div>
                            {/* Search */}
                            <div className="relative flex-1 md:w-56">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input type="text" placeholder="Search..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setVisibleCount(12); }} className="w-full pl-9 pr-3 py-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg text-xs text-white placeholder:text-[#6895b2] focus:outline-none focus:border-[#d4a843]/50 transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {!mounted
                            ? Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)
                            : visibleEpisodes.map((episode, i) => (
                                <motion.div key={episode.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }} variants={fadeUp} className="group cursor-pointer" onClick={() => handleCardClick(episode)}>
                                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/10 border border-slate-100 hover:border-[#d4a843]/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                                            <Image src={`https://i.ytimg.com/vi/${episode.youtubeId}/hqdefault.jpg`} alt={episode.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                                            <div className="absolute inset-0 bg-[#0f2336]/0 group-hover:bg-[#0f2336]/40 transition-colors duration-300 flex items-center justify-center">
                                                <div className="w-11 h-11 rounded-full bg-[#d4a843] text-[#0f2336] flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                                                    <Play fill="currentColor" size={16} className="ml-0.5" />
                                                </div>
                                            </div>
                                            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/75 backdrop-blur-sm rounded text-[10px] font-semibold text-white">{episode.duration}</span>
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-[#d4a843] text-[11px] font-bold tracking-wide">EP {String(episode.id).padStart(2, "0")}</span>
                                                <button onClick={(e) => handleShare(episode, e)} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-[#d4a843] p-1">
                                                    {copiedId === episode.id ? <Check size={12} /> : <Copy size={12} />}
                                                </button>
                                            </div>
                                            {/* Guest name prominently */}
                                            <p className="text-xs font-bold text-[#0f2336] mb-0.5">{episode.guest}</p>
                                            <h3 className="text-[13px] text-[#4a6580] leading-snug line-clamp-2 flex-1">{episode.title}</h3>
                                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                                <span className="text-[11px] text-[#8eafc4] flex items-center gap-1"><Clock size={10} /> {episode.duration}</span>
                                                <span className="text-[11px] font-bold text-[#d4a843] group-hover:text-[#c49a3a] flex items-center gap-1 transition-colors">Watch <ArrowRight size={10} /></span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>

                    {mounted && filteredEpisodes.length === 0 && (
                        <div className="text-center py-16"><p className="text-[#6895b2] text-lg">No episodes found matching &quot;{searchQuery}&quot;</p></div>
                    )}

                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <button onClick={() => setVisibleCount(prev => prev + 12)} className="group px-8 py-3 bg-white/8 hover:bg-[#d4a843] text-white hover:text-[#0f2336] font-semibold rounded-full border border-white/15 hover:border-[#d4a843] transition-all duration-300 flex items-center gap-2 text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#d4a843]/20">
                                Load More Episodes <ChevronDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════
                8. WHY WATCH — White cards
               ═══════════════════════════════════════ */}
            <section className="py-20 md:py-24" style={{ background: "linear-gradient(180deg, #0e2133 0%, #0f2a40 50%, #0e2133 100%)" }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Why Watch <span className="text-[#d4a843]">LexTalk?</span></h2>
                        <p className="text-[#6895b2] text-sm max-w-md mx-auto">More than interviews — real insights shaping the global legal profession.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                        {[
                            { icon: Globe, title: "Global Perspectives", desc: "Leaders from 50+ jurisdictions sharing cross-border insights and strategies." },
                            { icon: ShieldCheck, title: "Actionable Strategies", desc: "Practical frameworks for GCs, partners, and in-house legal teams." },
                            { icon: TrendingUp, title: "Future of Law", desc: "AI, blockchain, compliance — the trends reshaping legal practice." },
                            { icon: Users, title: "Elite Network", desc: "Access to conversations with the biggest names in law globally." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                                <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group text-center h-full">
                                    <div className="w-11 h-11 rounded-lg bg-[#fdf6e3] flex items-center justify-center text-[#d4a843] mb-4 mx-auto group-hover:bg-[#d4a843] group-hover:text-white transition-all">
                                        <item.icon size={20} />
                                    </div>
                                    <h3 className="text-sm font-bold text-[#0f2336] mb-1.5">{item.title}</h3>
                                    <p className="text-[#6895b2] text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                9. SUBSCRIBE CTA
               ═══════════════════════════════════════ */}
            <section className="py-20 md:py-24" style={{ background: "#0b1a2a" }}>
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto bg-gradient-to-br from-[#162d44] to-[#0f2336] backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4a843]/10 rounded-full blur-[80px] pointer-events-none" />
                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-full bg-[#d4a843]/15 flex items-center justify-center text-[#d4a843] mx-auto mb-5">
                                <Volume2 size={18} />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Never Miss an Episode</h2>
                            <p className="text-[#6895b2] mb-8 text-sm max-w-md mx-auto">Subscribe to stay updated with the latest legal insights, interviews, and global perspectives.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <a href="https://www.youtube.com/@LextalkWorldAPACandME" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-2.5 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all text-sm hover:-translate-y-0.5">
                                    <Youtube size={16} /> YouTube
                                </a>
                                <a href="https://www.linkedin.com/company/lextalkworld-apac-me/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-2.5 bg-[#0077b5] hover:bg-[#005e93] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all text-sm hover:-translate-y-0.5">
                                    <Linkedin size={16} /> LinkedIn
                                </a>
                                <button className="w-full sm:w-auto px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all border border-white/10 text-sm">
                                    <Mail size={16} /> Newsletter
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
