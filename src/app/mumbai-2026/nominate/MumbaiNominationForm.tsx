"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    ArrowLeft, ArrowRight, Award, Briefcase, CalendarDays, Check, CreditCard, FileText, GraduationCap, ImageIcon,
    Loader2, Lock, MapPin, ShieldCheck, Sparkles, Star, Trophy, UploadCloud, UserRound, X,
} from "lucide-react";
import { PhoneInput } from "@/components/PhoneInput";
import { COUNTRIES_DATA } from "@/lib/countries";
import {
    CATEGORY_GROUPS, DUAL_QUALIFIED, FIELD_LABELS, FILE_EXTENSIONS, FIRM_TYPES, FieldKey, INDIVIDUAL_ROLES,
    MAX_FILE_BYTES, MAX_FILES, MUMBAI_2026_NOMINATION as EVENT, NOMINATE_AS, NominationAnswers,
    PRACTICE_AREAS, YEAR_RANGES, validateNomination, visibleFields,
} from "@/lib/nominations/mumbai-2026";

declare global { interface Window { Razorpay: any } }

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STEPS: { title: string; hint: string }[] = [
    { title: "Terms & Conditions", hint: "Read and accept" },
    { title: "Personal Information", hint: "Your contact details" },
    { title: "Nomination", hint: "Profile and award category" },
    { title: "Key Practice Areas", hint: "Choose all that apply" },
    { title: "Your Story", hint: "Achievements and documents" },
    { title: "Payment", hint: `USD ${EVENT.feeUsd} nomination fee` },
];

const INDIAN_STATES = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const OPTIONAL_FIELDS: FieldKey[] = ["roleOther", "addressStreet", "addressLine2"];

/* Presentational helpers live outside the form so React keeps inputs mounted (and focused) while typing. */

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-5">
            <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/70 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-amber-600" />
                </span>
                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-slate-800">{title}</h3>
                <span className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
            </div>
            {children}
        </section>
    );
}

function FieldLabel({ htmlFor, children, required }: { htmlFor?: string; children: React.ReactNode; required?: boolean }) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-2 leading-snug">
            {children}{required && <span className="text-amber-600 ml-0.5">*</span>}
        </label>
    );
}

function ErrorText({ children }: { children?: string }) {
    return children ? <p className="mt-1.5 text-[13px] text-red-600">{children}</p> : null;
}

function fileSize(bytes: number) {
    return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function MumbaiNominationForm() {
    const reduceMotion = useReducedMotion();
    const [step, setStep] = useState<Step>(1);
    const [a, setA] = useState<NominationAnswers>({ practiceAreas: [], addressCountry: "India" });
    const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
    const [hp, setHp] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);

    const [submitting, setSubmitting] = useState<null | string>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [saved, setSaved] = useState<{ id: string; token: string } | null>(null);
    const [fileWarning, setFileWarning] = useState<string | null>(null);

    const [fee, setFee] = useState<{ usd: string | null; inr: string | null } | null>(null);
    const [paying, setPaying] = useState<null | "USD" | "INR">(null);
    const [payError, setPayError] = useState<string | null>(null);
    const [paid, setPaid] = useState(false);

    const topRef = useRef<HTMLDivElement>(null);
    const firstRender = useRef(true);
    const shown = useMemo(() => visibleFields(a), [a]);

    const set = useCallback(<K extends FieldKey>(key: K, value: NominationAnswers[K]) => {
        setA(prev => ({ ...prev, [key]: value }));
        setErrors(prev => (prev[key] ? { ...prev, [key]: undefined } : prev));
    }, []);
    const onPhone = useCallback((v: string) => set("phone", v), [set]);

    useEffect(() => {
        if (firstRender.current) { firstRender.current = false; return; }
        topRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, [step, paid, reduceMotion]);

    useEffect(() => {
        if (step === 6 && !fee) {
            fetch("/api/award-nominations/fee").then(r => r.json()).then(setFee).catch(() => setFee({ usd: `USD ${EVENT.feeUsd}`, inr: null }));
        }
    }, [step, fee]);

    const next = () => {
        const errs = validateNomination(a, step as 1 | 2 | 3 | 4 | 5);
        setErrors(errs);
        if (Object.keys(errs).length === 0) setStep(s => (s + 1) as Step);
    };
    const back = () => setStep(s => (s - 1) as Step);

    const addFiles = (list: FileList | null) => {
        if (!list) return;
        setFileError(null);
        const incoming = Array.from(list);
        const problems: string[] = [];
        const ok: File[] = [];
        for (const f of incoming) {
            const ext = `.${f.name.split(".").pop()?.toLowerCase() ?? ""}`;
            if (!FILE_EXTENSIONS.includes(ext)) problems.push(`${f.name}: file type not supported`);
            else if (f.size > MAX_FILE_BYTES) problems.push(`${f.name}: larger than 10 MB`);
            else if (files.some(x => x.name === f.name && x.size === f.size) || ok.some(x => x.name === f.name && x.size === f.size)) continue;
            else ok.push(f);
        }
        const room = MAX_FILES - files.length;
        if (ok.length > room) problems.push(`Only ${MAX_FILES} files can be uploaded — ${ok.length - room} not added`);
        setFiles(prev => [...prev, ...ok.slice(0, Math.max(0, room))]);
        if (problems.length) setFileError(problems.join(" · "));
    };

    async function uploadFile(id: string, token: string, f: File) {
        const sigRes = await fetch(`/api/award-nominations/${id}/upload-signature`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }),
        });
        const sig = await sigRes.json();
        if (!sigRes.ok) throw new Error(sig.error || "Upload failed");
        const fd = new FormData();
        fd.append("file", f);
        fd.append("api_key", sig.apiKey);
        fd.append("timestamp", String(sig.timestamp));
        fd.append("signature", sig.signature);
        fd.append("folder", sig.folder);
        const up = await fetch(sig.uploadUrl, { method: "POST", body: fd });
        const upJson = await up.json();
        if (!up.ok) throw new Error(upJson?.error?.message || "Upload failed");
        const save = await fetch(`/api/award-nominations/${id}/file`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, url: upJson.secure_url, name: f.name, bytes: f.size }),
        });
        if (!save.ok) throw new Error("Upload failed");
    }

    const submit = async () => {
        const errs = validateNomination(a);
        setErrors(errs);
        if (Object.keys(errs).length > 0) {
            for (const s of [1, 2, 3, 4, 5] as const) {
                if (Object.keys(validateNomination(a, s)).length > 0) { setStep(s); break; }
            }
            return;
        }
        setSubmitting("Submitting…");
        setSubmitError(null);
        try {
            const res = await fetch("/api/award-nominations", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ event: EVENT.event, answers: a, hp }),
            });
            const json = await res.json();
            if (!res.ok) {
                if (json.errors) setErrors(json.errors);
                throw new Error(json.error || "Something went wrong");
            }
            setSaved({ id: json.id, token: json.token });

            const failed: string[] = [];
            for (let i = 0; i < files.length; i++) {
                setSubmitting(`Uploading file ${i + 1} of ${files.length}…`);
                try { await uploadFile(json.id, json.token, files[i]); } catch { failed.push(files[i].name); }
            }
            if (failed.length) {
                setFileWarning(`Your nomination was saved, but ${failed.length === 1 ? "this file" : "these files"} didn't upload: ${failed.join(", ")}. Please reply to your confirmation email with ${failed.length === 1 ? "it" : "them"} attached.`);
            }
            setStep(6);
        } catch (err: any) {
            setSubmitError(err.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(null);
        }
    };

    const pay = async (currency: "USD" | "INR") => {
        if (!saved) return;
        if (!window.Razorpay) { setPayError("The payment window is still loading. Please try again in a moment."); return; }
        setPaying(currency);
        setPayError(null);
        try {
            const res = await fetch(`/api/award-nominations/${saved.id}/order`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: saved.token, currency }),
            });
            const order = await res.json();
            if (!res.ok) throw new Error(order.error || "Could not start the payment");

            const rzp = new window.Razorpay({
                key: order.keyId,
                amount: order.amount,
                currency: order.currency,
                order_id: order.orderId,
                name: "LexTalk World",
                description: `Nomination Fee — ${EVENT.eventName}`,
                prefill: { name: order.name, email: order.email, contact: order.phone?.replace(/[^\d+]/g, "") },
                theme: { color: "#f59e0b" },
                handler: async (response: any) => {
                    try {
                        const v = await fetch(`/api/award-nominations/${saved.id}/verify`, {
                            method: "POST", headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ token: saved.token, ...response }),
                        });
                        const vj = await v.json();
                        if (!v.ok) throw new Error(vj.error || "Could not confirm the payment");
                        setPaid(true);
                    } catch (err: any) {
                        setPayError(`${err.message}. If money was deducted, our team will contact you — no need to pay again.`);
                    } finally {
                        setPaying(null);
                    }
                },
                modal: { ondismiss: () => setPaying(null) },
            });
            rzp.on("payment.failed", (resp: any) => {
                setPayError(resp?.error?.description || "The payment failed. Please try again.");
                setPaying(null);
            });
            rzp.open();
        } catch (err: any) {
            setPayError(err.message || "Could not start the payment.");
            setPaying(null);
        }
    };

    /* --------------------------- field renderers --------------------------- */

    const inputCls = (k: FieldKey) =>
        `w-full h-12 px-4 rounded-xl bg-white border text-[15px] text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm shadow-slate-900/[0.02] ${errors[k]
            ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
            : "border-slate-200 hover:border-slate-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"}`;

    const text = (k: FieldKey, opts: { label?: string; type?: string; placeholder?: string } = {}) =>
        shown.has(k) && (
            <div>
                <FieldLabel htmlFor={k} required={!OPTIONAL_FIELDS.includes(k)}>{opts.label ?? FIELD_LABELS[k]}</FieldLabel>
                <input id={k} type={opts.type ?? "text"} maxLength={255} placeholder={opts.placeholder}
                    value={(a[k] as string) ?? ""} onChange={e => set(k, e.target.value as never)} className={inputCls(k)} />
                <ErrorText>{errors[k]}</ErrorText>
            </div>
        );

    const select = (k: FieldKey, options: string[], label?: string) =>
        shown.has(k) && (
            <div>
                <FieldLabel htmlFor={k} required>{label ?? FIELD_LABELS[k]}</FieldLabel>
                <select id={k} value={(a[k] as string) ?? ""} onChange={e => set(k, e.target.value as never)}
                    className={`${inputCls(k)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_0.9rem_center] pr-10 ${a[k] ? "" : "text-slate-400"}`}>
                    <option value="">Select an option</option>
                    {options.map(o => <option key={o} value={o} className="text-slate-900">{o}</option>)}
                </select>
                <ErrorText>{errors[k]}</ErrorText>
            </div>
        );

    const choices = (k: FieldKey, options: readonly string[], cols = "sm:grid-cols-3") =>
        shown.has(k) && (
            <fieldset>
                <legend className="block text-sm font-medium text-slate-700 mb-2 leading-snug">{FIELD_LABELS[k]}<span className="text-amber-600 ml-0.5">*</span></legend>
                <div className={`grid grid-cols-1 ${cols} gap-2.5`}>
                    {options.map(o => {
                        const on = a[k] === o;
                        return (
                            <label key={o} className={`relative flex items-center gap-3 min-h-12 px-4 py-2.5 rounded-xl border cursor-pointer text-[15px] transition-all ${on
                                ? "border-amber-500 bg-amber-50/70 text-slate-900 font-semibold ring-4 ring-amber-500/10"
                                : errors[k] ? "border-red-300 bg-white text-slate-700" : "border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50/30"}`}>
                                <input type="radio" name={k} value={o} checked={on} onChange={() => set(k, o as never)} className="sr-only" />
                                <span className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${on ? "border-amber-500 bg-amber-500" : "border-slate-300"}`}>
                                    {on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                </span>
                                {o}
                            </label>
                        );
                    })}
                </div>
                <ErrorText>{errors[k]}</ErrorText>
            </fieldset>
        );

    const essay = (k: FieldKey, hint: string) => {
        const len = ((a[k] as string) ?? "").length;
        return (
            <div>
                <FieldLabel htmlFor={k} required>{FIELD_LABELS[k]}</FieldLabel>
                <p className="text-[13px] text-slate-500 -mt-1 mb-2.5">{hint}</p>
                <textarea id={k} rows={6} maxLength={10000} value={(a[k] as string) ?? ""} onChange={e => set(k, e.target.value as never)}
                    className={`${inputCls(k)} h-auto py-3 leading-relaxed resize-y`} />
                <div className="flex justify-between">
                    <ErrorText>{errors[k]}</ErrorText>
                    <span className="mt-1.5 ml-auto text-xs text-slate-400 tabular-nums">{len.toLocaleString()} / 10,000</span>
                </div>
            </div>
        );
    };

    const india = a.addressCountry === "India";
    const practice = a.practiceAreas ?? [];
    const current = paid ? 7 : step;
    const anyShown = (...keys: FieldKey[]) => keys.some(k => shown.has(k));

    const motionProps = reduceMotion
        ? {}
        : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.25 } };

    /* ------------------------------- render ------------------------------- */

    return (
        <div className="relative min-h-screen bg-[#faf8f4] overflow-x-clip">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            {/* Ambient background */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.16),transparent_65%)]" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-[0.35] [background-image:linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

            {/* Logo */}
            <header className="relative z-10 flex justify-center pt-8 md:pt-10">
                <Link href="/" aria-label="LexTalk World home" className="inline-flex">
                    <Image src="/logo/lextalkworld-logo.png" alt="LexTalk World" width={494} height={150} priority className="h-11 md:h-14 w-auto" />
                </Link>
            </header>

            {/* Hero */}
            <div ref={topRef} className="relative z-10 max-w-3xl mx-auto px-4 pt-10 md:pt-14 pb-10 text-center scroll-mt-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
                    <Trophy className="w-3.5 h-3.5" /> Legal Honor Global Awards
                </div>
                <h1 className="mt-5 font-serif text-[2.1rem] leading-tight md:text-5xl font-bold text-slate-900">
                    Nominate for <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">Mumbai 2026</span>
                </h1>
                <p className="mt-4 text-slate-600 md:text-lg max-w-xl mx-auto">
                    Recognising excellence across law firms, in-house teams and independent practice at LexTalk World Mumbai.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2 text-[13px] text-slate-700">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"><CalendarDays className="w-3.5 h-3.5 text-amber-600" /> 7–8 December 2026</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"><MapPin className="w-3.5 h-3.5 text-amber-600" /> Radisson Blu, Mumbai International Airport</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"><ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> USD {EVENT.feeUsd} fee · refundable</span>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20 grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 items-start">
                {/* Stepper — vertical on desktop */}
                <aside className="hidden lg:block sticky top-8">
                    <ol className="relative space-y-1">
                        {STEPS.map((s, i) => {
                            const n = i + 1;
                            const done = n < current;
                            const active = n === current;
                            return (
                                <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
                                    {i < STEPS.length - 1 && (
                                        <span className={`absolute left-[17px] top-10 bottom-1 w-px ${done ? "bg-amber-400" : "bg-slate-200"}`} />
                                    )}
                                    <span className={`relative z-10 w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-all ${done
                                        ? "bg-amber-500 text-white"
                                        : active ? "bg-slate-900 text-amber-400 ring-4 ring-amber-500/20" : "bg-white border border-slate-200 text-slate-400"}`}>
                                        {done ? <Check className="w-4 h-4" strokeWidth={3} /> : n}
                                    </span>
                                    <div className="pt-1.5">
                                        <p className={`text-sm font-semibold ${active ? "text-slate-900" : done ? "text-slate-700" : "text-slate-400"}`}>{s.title}</p>
                                        <p className={`text-xs mt-0.5 ${active ? "text-amber-700" : "text-slate-400"}`}>{s.hint}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                    <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs text-slate-600 leading-relaxed">
                        <p className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1"><Award className="w-3.5 h-3.5 text-amber-600" /> Independent jury</p>
                        Every nomination is screened by the Legal Honor Global Awards Jury Panel. Qualifying score: 80/100.
                    </div>
                </aside>

                <div>
                    {/* Progress — compact on mobile/tablet */}
                    <div className="lg:hidden mb-4 px-1">
                        <div className="flex items-center justify-between text-xs font-semibold mb-2">
                            <span className="text-amber-700 uppercase tracking-wider">Step {Math.min(current, 6)} of 6</span>
                            <span className="text-slate-600">{STEPS[Math.min(current, 6) - 1].title}</span>
                        </div>
                        <div className="grid grid-cols-6 gap-1.5">
                            {STEPS.map((s, i) => (
                                <span key={s.title} className={`h-1.5 rounded-full transition-colors ${i + 1 < current ? "bg-amber-500" : i + 1 === current ? "bg-slate-900" : "bg-slate-200"}`} />
                            ))}
                        </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.25)] overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500" />
                        <div className="p-5 sm:p-8 md:p-10">
                            {/* Honeypot */}
                            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={e => setHp(e.target.value)}
                                className="absolute -left-[9999px] w-px h-px opacity-0" name="company_website" />

                            {!paid && (
                                <div className="mb-8">
                                    <p className="hidden lg:block text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Step {step} of 6</p>
                                    <h2 className="lg:mt-1.5 font-serif text-2xl md:text-3xl font-bold text-slate-900">{STEPS[step - 1].title}</h2>
                                </div>
                            )}

                            <AnimatePresence mode="wait">
                                <motion.div key={paid ? "paid" : step} {...motionProps} className="space-y-8">
                                    {step === 1 && (
                                        <>
                                            <Terms />
                                            <label className={`relative flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${a.acceptedTerms
                                                ? "border-amber-500 bg-amber-50/70 ring-4 ring-amber-500/10"
                                                : errors.acceptedTerms ? "border-red-300" : "border-slate-200 hover:border-amber-300"}`}>
                                                <input type="checkbox" checked={!!a.acceptedTerms} onChange={e => set("acceptedTerms", e.target.checked)} className="sr-only" />
                                                <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center ${a.acceptedTerms ? "bg-amber-500 border-amber-500" : "border-slate-300"}`}>
                                                    {a.acceptedTerms && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                </span>
                                                <span className="text-slate-800 font-medium">I accept the Terms and Conditions.<span className="text-amber-600 ml-0.5">*</span></span>
                                            </label>
                                            <ErrorText>{errors.acceptedTerms}</ErrorText>
                                        </>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-5">
                                            <div className="grid sm:grid-cols-2 gap-5">
                                                {text("firstName")}
                                                {text("lastName")}
                                            </div>
                                            <div>
                                                <FieldLabel htmlFor="phone" required>{FIELD_LABELS.phone}</FieldLabel>
                                                <PhoneInput value={a.phone} onChange={onPhone} name="phone" id="phone" required />
                                                <ErrorText>{errors.phone}</ErrorText>
                                            </div>
                                            {text("email", { type: "email", placeholder: "name@example.com" })}
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <>
                                            <Section icon={UserRound} title="Nomination type">
                                                {choices("nominateAs", NOMINATE_AS, "sm:grid-cols-2")}
                                                {select("individualRole", INDIVIDUAL_ROLES)}
                                                {select("firmType", FIRM_TYPES)}
                                                {text("roleOther")}
                                            </Section>

                                            {anyShown("highestEducation", "dualQualified") && (
                                                <Section icon={GraduationCap} title="Education & Bar">
                                                    <div className="grid sm:grid-cols-2 gap-5">
                                                        {text("highestEducation")}
                                                        {text("educationInstitute")}
                                                    </div>
                                                    {choices("dualQualified", DUAL_QUALIFIED, "grid-cols-2 sm:grid-cols-4")}
                                                    {shown.has("barYear") && (
                                                        <div className="grid sm:grid-cols-2 gap-5">
                                                            {text("barYear")}
                                                            {text("barName")}
                                                        </div>
                                                    )}
                                                </Section>
                                            )}

                                            {shown.has("orgName") && (
                                                <Section icon={Briefcase} title="Professional profile">
                                                    <div className="grid sm:grid-cols-2 gap-5">
                                                        {text("orgName")}
                                                        {text("currentPosition")}
                                                    </div>
                                                    {choices("positionTenure", YEAR_RANGES)}
                                                    {choices("totalYearsPractice", YEAR_RANGES)}
                                                    {text("website", { placeholder: "Website or LinkedIn profile" })}
                                                    {text("awardsReceived", { placeholder: "e.g. Name of award, year — or “No”" })}
                                                </Section>
                                            )}

                                            {shown.has("category") && (
                                                <Section icon={Trophy} title="Award category">
                                                    <div>
                                                        <FieldLabel htmlFor="category" required>{FIELD_LABELS.category}</FieldLabel>
                                                        <select id="category" value={a.category ?? ""} onChange={e => set("category", e.target.value)}
                                                            className={`${inputCls("category")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_0.9rem_center] pr-10 ${a.category ? "" : "text-slate-400"}`}>
                                                            <option value="">Select the award category</option>
                                                            {CATEGORY_GROUPS.map(g => (
                                                                <optgroup key={g.group} label={g.group}>
                                                                    {g.options.map(o => <option key={o} value={`${g.group} - ${o}`} className="text-slate-900">{o}</option>)}
                                                                </optgroup>
                                                            ))}
                                                        </select>
                                                        <ErrorText>{errors.category}</ErrorText>
                                                    </div>
                                                </Section>
                                            )}

                                            {shown.has("addressCity") && (
                                                <Section icon={MapPin} title="Address">
                                                    {text("addressStreet")}
                                                    {text("addressLine2")}
                                                    <div className="grid sm:grid-cols-2 gap-5">
                                                        {text("addressCity")}
                                                        {india ? select("addressState", INDIAN_STATES) : text("addressState")}
                                                    </div>
                                                    <div className="grid sm:grid-cols-2 gap-5">
                                                        {text("addressPostal")}
                                                        <div>
                                                            <FieldLabel htmlFor="addressCountry" required>{FIELD_LABELS.addressCountry}</FieldLabel>
                                                            <select id="addressCountry" value={a.addressCountry ?? ""}
                                                                className={`${inputCls("addressCountry")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_0.9rem_center] pr-10`}
                                                                onChange={e => { set("addressCountry", e.target.value); set("addressState", ""); }}>
                                                                <option value="">Select country</option>
                                                                {COUNTRIES_DATA.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
                                                            </select>
                                                            <ErrorText>{errors.addressCountry}</ErrorText>
                                                        </div>
                                                    </div>
                                                </Section>
                                            )}
                                        </>
                                    )}

                                    {step === 4 && (
                                        <div>
                                            <div className="flex items-center justify-between gap-4 mb-4">
                                                <p className="text-sm text-slate-600">Select all the key practice areas that apply to you.<span className="text-amber-600 ml-0.5">*</span></p>
                                                <span className="shrink-0 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-bold tabular-nums">{practice.length} selected</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {PRACTICE_AREAS.map(p => {
                                                    const on = practice.includes(p);
                                                    const disabled = false;
                                                    return (
                                                        <label key={p} className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm transition-all select-none ${on
                                                            ? "bg-amber-500 border-amber-500 text-white font-semibold shadow-md shadow-amber-500/25"
                                                            : disabled ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed" : "border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:text-amber-800 cursor-pointer"}`}>
                                                            <input type="checkbox" checked={on} disabled={disabled} className="sr-only"
                                                                onChange={() => set("practiceAreas", on ? practice.filter(x => x !== p) : [...practice, p])} />
                                                            {on && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                                                            {p}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                            <ErrorText>{errors.practiceAreas}</ErrorText>
                                        </div>
                                    )}

                                    {step === 5 && (
                                        <>
                                            <div className="space-y-7">
                                                {essay("essayReach", "Include details about your education, experience, key practice areas and examples of important cases or disputes.")}
                                                {essay("essayAchievements", "Include details and examples of your achievements and their impact.")}
                                                {essay("essayInnovation", "Share examples of your innovative approach that benefited your clients or company.")}
                                                {essay("essayFuture", "Describe your continuous professional development and how you adapt to new technologies.")}
                                            </div>

                                            <Section icon={UploadCloud} title="Supporting documents">
                                                <p className="text-sm text-slate-600 -mt-1">
                                                    Upload a <strong className="text-slate-800">high-resolution photo</strong>, your <strong className="text-slate-800">CV</strong>, <strong className="text-slate-800">recent achievements</strong> and any <strong className="text-slate-800">case studies</strong>. Optional.
                                                </p>
                                                <label
                                                    className={`relative flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed px-6 py-9 cursor-pointer transition-all ${dragging ? "border-amber-500 bg-amber-50" : "border-slate-300 bg-slate-50/60 hover:border-amber-400 hover:bg-amber-50/40"} ${files.length >= MAX_FILES ? "opacity-50 pointer-events-none" : ""}`}
                                                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                                                    onDragLeave={() => setDragging(false)}
                                                    onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}>
                                                    <span className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                                                        <UploadCloud className="w-6 h-6 text-amber-600" />
                                                    </span>
                                                    <span className="text-[15px] font-semibold text-slate-800">Click to choose files <span className="font-normal text-slate-500">or drag them here</span></span>
                                                    <span className="mt-1 text-xs text-slate-500">JPG, PNG, PDF, Word or PowerPoint · up to {MAX_FILES} files · 10 MB each</span>
                                                    <input type="file" multiple accept={FILE_EXTENSIONS.join(",")} className="sr-only"
                                                        onChange={e => { addFiles(e.target.files); e.target.value = ""; }} />
                                                </label>
                                                {fileError && <p className="text-[13px] text-red-600">{fileError}</p>}
                                                {files.length > 0 && (
                                                    <ul className="grid sm:grid-cols-2 gap-2.5">
                                                        {files.map((f, i) => {
                                                            const isImage = /\.(jpe?g|png|webp)$/i.test(f.name);
                                                            const Icon = isImage ? ImageIcon : FileText;
                                                            return (
                                                                <li key={`${f.name}-${f.size}`} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white">
                                                                    <span className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${isImage ? "bg-sky-50 text-sky-600" : "bg-amber-50 text-amber-600"}`}><Icon className="w-4 h-4" /></span>
                                                                    <span className="min-w-0 flex-1">
                                                                        <span className="block text-sm text-slate-800 truncate">{f.name}</span>
                                                                        <span className="block text-xs text-slate-400">{fileSize(f.size)}</span>
                                                                    </span>
                                                                    <button type="button" onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer" aria-label={`Remove ${f.name}`}>
                                                                        <X className="w-4 h-4" />
                                                                    </button>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </Section>
                                            {submitError && <p className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{submitError}</p>}
                                        </>
                                    )}

                                    {step === 6 && !paid && (
                                        <div className="space-y-6">
                                            <div className="flex gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
                                                <span className="w-6 h-6 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white" strokeWidth={3} /></span>
                                                <p><strong>Your nomination has been saved.</strong> It will be considered once the nomination fee is paid. If you have any trouble paying, you can close this page — our team will contact you to help.</p>
                                            </div>
                                            {fileWarning && <p className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 text-sm text-orange-800">{fileWarning}</p>}

                                            <div className="rounded-2xl border border-slate-200 overflow-hidden">
                                                <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-slate-700">LexTalkWorld – Nomination Fee</span>
                                                    <span className="text-xs text-slate-500">{EVENT.eventName}</span>
                                                </div>
                                                <div className="px-5 py-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Amount due</p>
                                                        <p className="text-4xl font-bold text-slate-900 mt-1">USD {EVENT.feeUsd}</p>
                                                    </div>
                                                    <p className="text-xs text-slate-500 sm:text-right max-w-[220px]">Fully refunded if you do not make the cut.</p>
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <button type="button" onClick={() => pay("USD")} disabled={!!paying}
                                                    className="group flex items-center justify-center gap-2 h-14 px-6 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 shadow-lg shadow-slate-900/20 disabled:opacity-60 cursor-pointer transition-colors">
                                                    {paying === "USD" ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4 text-amber-400" />}
                                                    Pay {fee?.usd ?? `USD ${EVENT.feeUsd}`}
                                                </button>
                                                <button type="button" onClick={() => pay("INR")} disabled={!!paying || !fee?.inr}
                                                    className="flex items-center justify-center gap-2 h-14 px-6 rounded-2xl border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-50 disabled:opacity-50 cursor-pointer transition-colors">
                                                    {paying === "INR" ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="font-bold text-amber-600">₹</span>}
                                                    {fee?.inr ? `Pay ${fee.inr} (INR)` : fee ? "INR unavailable" : "Loading INR…"}
                                                </button>
                                            </div>
                                            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5"><Lock className="w-3 h-3" /> Secured by Razorpay · cards, UPI and net banking</p>
                                            {payError && <p className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{payError}</p>}
                                        </div>
                                    )}

                                    {paid && (
                                        <div className="text-center py-8 space-y-5">
                                            <div className="relative w-20 h-20 mx-auto">
                                                <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping motion-reduce:animate-none" />
                                                <span className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30">
                                                    <Trophy className="w-9 h-9 text-white" />
                                                </span>
                                            </div>
                                            <h2 className="font-serif text-3xl font-bold text-slate-900">Your nomination is complete</h2>
                                            <p className="text-slate-600 max-w-md mx-auto">Thank you. We&apos;ve received your nomination fee and emailed you a confirmation. The Awards Committee will send you a detailed scorecard once the evaluation is complete.</p>
                                            <Link href="/mumbai-2026" className="inline-flex items-center gap-2 mt-2 px-6 h-12 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800">
                                                Explore LexTalk World Mumbai <ArrowRight className="w-4 h-4 text-amber-400" />
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation */}
                            {step < 6 && (
                                <div className="flex items-center justify-between gap-3 mt-10 pt-6 border-t border-slate-100">
                                    {step > 1 ? (
                                        <button type="button" onClick={back} disabled={!!submitting}
                                            className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl text-slate-600 font-medium hover:bg-slate-100 cursor-pointer disabled:opacity-50">
                                            <ArrowLeft className="w-4 h-4" /> Back
                                        </button>
                                    ) : <span />}
                                    {step < 5 ? (
                                        <button type="button" onClick={next}
                                            className="group inline-flex items-center gap-2 h-12 px-7 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 shadow-lg shadow-slate-900/15 cursor-pointer transition-colors">
                                            Continue <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-0.5" />
                                        </button>
                                    ) : (
                                        <button type="button" onClick={submit} disabled={!!submitting}
                                            className="inline-flex items-center gap-2 h-12 px-7 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl disabled:opacity-70 cursor-pointer">
                                            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> {submitting}</> : <><Sparkles className="w-4 h-4" /> Submit nomination</>}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-slate-500">
                        Questions? Write to <a href="mailto:info@lextalkworld.in" className="text-amber-700 hover:underline">info@lextalkworld.in</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

/* Terms text from the Zoho "Legal Honor Global Awards - 2026 Mumbai" form. */
function Terms() {
    const Item = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
        <div className="relative pl-12">
            <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 text-amber-400 text-sm font-bold flex items-center justify-center">{n}</span>
            <h3 className="font-semibold text-slate-900 pt-1">{title}</h3>
            <div className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">{children}</div>
        </div>
    );
    return (
        <div className="space-y-6">
            <div className="flex gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">All nominations undergo an independent screening and evaluation process by the <strong>Legal Honor Global Awards Jury Panel</strong>. All fields marked with <span className="text-amber-600 font-bold">*</span> are required.</p>
            </div>

            <div className="max-h-[480px] overflow-y-auto pr-2 -mr-2 space-y-7 [scrollbar-width:thin]">
                <Item n={1} title="Terms and conditions">
                    <ul className="space-y-2 list-disc pl-4 marker:text-amber-500">
                        <li>All awardees are required to be physically or virtually present at the event to receive the Award. In case the Awardee is not able to attend, they can send a person on their behalf.</li>
                        <li>Filling in the nomination form only does not ensure that you will be selected for the Award.</li>
                        <li>The Awardees will be selected on the basis of parameters set by our Awards Committee and will be intimated accordingly.</li>
                        <li>In case you do not win the award nomination, the nomination fee <strong className="text-slate-900">USD 50</strong> is completely refundable.</li>
                        <li>All Awardees will need to book the Awardee pass to attend the conference and receive their award.</li>
                        <li>The decision of the Awards Committee will be final and binding.</li>
                        <li>LexTalk World and Legal Honor are brought to you by Canada-based firm ClickAway Creators (a division of CAC Media &amp; Events) and managed by MantranexVista, which reserves the right to make any changes to the event, as it deems necessary.</li>
                    </ul>
                </Item>
                <Item n={2} title="Evaluation">
                    Based on your answers and our own research, our Awards Committee rates you on different parameters such as the overall reach, impact on the legal industry, knowledge and market demand, innovative ideas and suggestions, futuristic spirit and approach, etc.
                </Item>
                <Item n={3} title="Scorecard">
                    Once the Awards Committee completes the evaluation, they will share a detailed scorecard with each nominee via email. They give you a score out of 100 in each of your answers; the cut-off to qualify is <strong className="text-slate-900">80 points out of 100</strong>.
                </Item>
                <Item n={4} title="Outcome">
                    <div className="grid sm:grid-cols-2 gap-3 mt-1">
                        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                            <p className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-1"><Trophy className="w-4 h-4" /> Winner</p>
                            <p className="text-sm">We will confirm you as a winner at the LexTalk World conference and sign you up for the Awardee pass.</p>
                            <p className="text-sm mt-2 text-slate-800">India Conference — Standard In-Person Awardee Pass: <strong>USD 1000</strong> (inclusive of taxes)</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                            <p className="font-semibold text-slate-800 mb-1">Fail to make the cut</p>
                            <p className="text-sm">We will issue a full refund of the nomination fee (USD 50).</p>
                        </div>
                    </div>
                </Item>
                <Item n={5} title="The event">
                    You attend the event, accept the award, and are part of great sessions while networking with your peers. As an awardee you are entitled to all of the benefits below in the Standard Awardee Pass.
                </Item>

                <div className="rounded-2xl border border-slate-200 p-5">
                    <p className="font-semibold text-slate-900 flex items-center gap-2 mb-4"><Star className="w-4 h-4 text-amber-500" /> Standard Awardee Pass benefits</p>
                    <div className="grid md:grid-cols-3 gap-5 text-[13px] text-slate-600">
                        {[
                            ["Pre-Conference", ["Opportunity to write an article, promoted on social media and website", "Article in the upcoming editions of the Jurisprudence e-Magazine published by Global Lawyers Association"]],
                            ["During Conference", ["Announcement of Awardees for each category", "Full event participation with networking opportunities", "Awardees listing in the event show guide", "Mic time on the stage", "Award plaque from the Guest of Honor"]],
                            ["Post-Conference", ["Social media announcement for Awardees", "Dedicated section in the Awardees List on our website", "E-certificate and e-badge of Honor", "PR announcements in 200+ international digital publications and news sites"]],
                        ].map(([title, items]) => (
                            <div key={title as string}>
                                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-700 mb-2">{title as string}</p>
                                <ul className="space-y-1.5">
                                    {(items as string[]).map(i => (
                                        <li key={i} className="flex gap-2"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" strokeWidth={3} />{i}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
