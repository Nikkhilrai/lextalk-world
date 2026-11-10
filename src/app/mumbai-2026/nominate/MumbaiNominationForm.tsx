"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { Check, ChevronLeft, ChevronRight, CreditCard, FileText, Loader2, Lock, Star, Trophy, UploadCloud, X } from "lucide-react";
import { PhoneInput } from "@/components/PhoneInput";
import { COUNTRIES_DATA } from "@/lib/countries";
import {
    CATEGORY_GROUPS, DUAL_QUALIFIED, FIELD_LABELS, FIRM_TYPES, FieldKey, INDIVIDUAL_ROLES, MAX_PRACTICE_AREAS,
    MUMBAI_2026_NOMINATION as EVENT, NOMINATE_AS, NominationAnswers, PRACTICE_AREAS, YEAR_RANGES,
    validateNomination, visibleFields,
} from "@/lib/nominations/mumbai-2026";

declare global { interface Window { Razorpay: any } }

type Step = 1 | 2 | 3 | 4 | 5 | 6;
const STEP_LABELS = ["Terms and Conditions", "Personal Information", "Nomination", "Key Practice Areas", "Required Information", "Payment"];

const INDIAN_STATES = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const FILE_TYPES = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
const FILE_MAX_BYTES = 10 * 1024 * 1024;

export function MumbaiNominationForm() {
    const [step, setStep] = useState<Step>(1);
    const [a, setA] = useState<NominationAnswers>({ practiceAreas: [], addressCountry: "India" });
    const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
    const [hp, setHp] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [saved, setSaved] = useState<{ id: string; token: string } | null>(null);
    const [fileWarning, setFileWarning] = useState<string | null>(null);

    const [fee, setFee] = useState<{ usd: string | null; inr: string | null } | null>(null);
    const [paying, setPaying] = useState<null | "USD" | "INR">(null);
    const [payError, setPayError] = useState<string | null>(null);
    const [paid, setPaid] = useState(false);

    const topRef = useRef<HTMLDivElement>(null);
    const shown = useMemo(() => visibleFields(a), [a]);

    const set = useCallback(<K extends FieldKey>(key: K, value: NominationAnswers[K]) => {
        setA(prev => ({ ...prev, [key]: value }));
        setErrors(prev => (prev[key] ? { ...prev, [key]: undefined } : prev));
    }, []);
    const onPhone = useCallback((v: string) => set("phone", v), [set]);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [step]);

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

    const pickFile = (f: File | null) => {
        setFileError(null);
        if (!f) return setFile(null);
        const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
        if (!FILE_TYPES.split(",").includes(`.${ext}`)) return setFileError("Please upload a PDF, Word document or image (JPG/PNG).");
        if (f.size > FILE_MAX_BYTES) return setFileError("The file must be 10 MB or smaller.");
        setFile(f);
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
            // Jump back to the first step that has a problem.
            for (const s of [1, 2, 3, 4, 5] as const) {
                if (Object.keys(validateNomination(a, s)).length > 0) { setStep(s); break; }
            }
            return;
        }
        setSubmitting(true);
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
            if (file) {
                try {
                    await uploadFile(json.id, json.token, file);
                } catch {
                    setFileWarning("Your nomination was saved, but the file didn't upload. Please email it to us by replying to the confirmation email.");
                }
            }
            setStep(6);
        } catch (err: any) {
            setSubmitError(err.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
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

    /* --------------------------- field helpers --------------------------- */

    const err = (k: FieldKey) => errors[k] && <p className="mt-1.5 text-sm text-red-600">{errors[k]}</p>;
    const required = (k: FieldKey) => !["roleOther", "addressStreet", "addressLine2"].includes(k);
    const Label = ({ k, label }: { k: FieldKey; label?: string }) => (
        <label htmlFor={k} className="block text-sm font-medium text-slate-700 mb-1.5">
            {label ?? FIELD_LABELS[k]} {required(k) && <span className="text-red-500">*</span>}
        </label>
    );
    const inputCls = (k: FieldKey) =>
        `w-full px-4 py-3 rounded-lg bg-white border ${errors[k] ? "border-red-400" : "border-slate-300"} text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all`;

    const text = (k: FieldKey, opts: { label?: string; type?: string; placeholder?: string } = {}) =>
        shown.has(k) && (
            <div>
                <Label k={k} label={opts.label} />
                <input id={k} type={opts.type ?? "text"} maxLength={255} placeholder={opts.placeholder}
                    value={(a[k] as string) ?? ""} onChange={e => set(k, e.target.value as never)} className={inputCls(k)} />
                {err(k)}
            </div>
        );

    const select = (k: FieldKey, options: string[], label?: string) =>
        shown.has(k) && (
            <div>
                <Label k={k} label={label} />
                <select id={k} value={(a[k] as string) ?? ""} onChange={e => set(k, e.target.value as never)} className={inputCls(k)}>
                    <option value="">-Select-</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {err(k)}
            </div>
        );

    const radios = (k: FieldKey, options: readonly string[], cols = "sm:grid-cols-3") =>
        shown.has(k) && (
            <fieldset>
                <legend className="block text-sm font-medium text-slate-700 mb-2">{FIELD_LABELS[k]} <span className="text-red-500">*</span></legend>
                <div className={`grid grid-cols-1 ${cols} gap-2`}>
                    {options.map(o => {
                        const on = a[k] === o;
                        return (
                            <label key={o} className={`relative flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer text-sm transition-all ${on ? "border-amber-500 bg-amber-50 text-amber-800 font-semibold" : "border-slate-200 hover:border-amber-300 text-slate-700"}`}>
                                <input type="radio" name={k} value={o} checked={on} onChange={() => set(k, o as never)} className="accent-amber-500" />
                                {o}
                            </label>
                        );
                    })}
                </div>
                {err(k)}
            </fieldset>
        );

    const essay = (k: FieldKey, hint: string) => (
        <div>
            <Label k={k} />
            <p className="text-xs text-slate-500 mb-2">{hint}</p>
            <textarea id={k} rows={6} maxLength={10000} value={(a[k] as string) ?? ""} onChange={e => set(k, e.target.value as never)}
                className={`${inputCls(k)} resize-y`} />
            {err(k)}
        </div>
    );

    const india = a.addressCountry === "India";
    const practice = a.practiceAreas ?? [];
    const progress = ((Math.min(step, 6) - 1) / 5) * 100;

    /* ------------------------------- render ------------------------------- */

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <div ref={topRef} className="pt-32 md:pt-40 pb-6 px-4 text-center scroll-mt-24">
                <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.25em] mb-3">Nomination Form</p>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-2">
                    Legal Honor Global Awards — <span className="text-amber-600">2026 Mumbai</span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base">{EVENT.details}</p>
            </div>

            {/* Progress */}
            <div className="max-w-4xl mx-auto px-4 mb-6">
                <div className="bg-white rounded-2xl shadow-lg shadow-amber-100/50 p-4 md:p-6 border border-amber-100">
                    <div className="flex justify-between items-start mb-4">
                        {STEP_LABELS.map((label, i) => (
                            <div key={label} className="flex flex-col items-center flex-1 min-w-0">
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i + 1 < step || paid
                                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
                                    : i + 1 === step ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white ring-4 ring-amber-100" : "bg-slate-100 text-slate-400"}`}>
                                    {i + 1 < step || paid ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`text-[11px] mt-2 font-medium text-center leading-tight hidden md:block ${i + 1 <= step ? "text-amber-600" : "text-slate-400"}`}>{label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-full transition-all duration-500" style={{ width: `${paid ? 100 : progress}%` }} />
                    </div>
                    <p className="text-sm text-slate-500 mt-3 md:hidden">Step {step} of 6 · {STEP_LABELS[step - 1]}</p>
                </div>
            </div>

            {/* Card */}
            <div className="max-w-4xl mx-auto px-4 pb-16">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                            <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">{step}</span>
                            {STEP_LABELS[step - 1]}
                        </h2>
                    </div>

                    <div className="p-5 md:p-8 space-y-6">
                        {/* Honeypot */}
                        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={e => setHp(e.target.value)}
                            className="absolute -left-[9999px] w-px h-px opacity-0" name="company_website" />

                        {step === 1 && (
                            <>
                                <Terms />
                                <label className={`relative flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${a.acceptedTerms ? "border-amber-500 bg-amber-50" : errors.acceptedTerms ? "border-red-400" : "border-slate-200 hover:border-amber-300"}`}>
                                    <input type="checkbox" checked={!!a.acceptedTerms} onChange={e => set("acceptedTerms", e.target.checked)} className="mt-0.5 w-5 h-5 accent-amber-500" />
                                    <span className="text-slate-700">I accept the Terms and Conditions. <span className="text-red-500">*</span></span>
                                </label>
                                {err("acceptedTerms")}
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {text("firstName")}
                                    {text("lastName")}
                                </div>
                                <div>
                                    <Label k="phone" />
                                    <PhoneInput value={a.phone} onChange={onPhone} name="phone" id="phone" required />
                                    {err("phone")}
                                </div>
                                {text("email", { type: "email", placeholder: "name@example.com" })}
                            </>
                        )}

                        {step === 3 && (
                            <>
                                {radios("nominateAs", NOMINATE_AS, "sm:grid-cols-2")}
                                {select("individualRole", INDIVIDUAL_ROLES)}
                                {select("firmType", FIRM_TYPES)}
                                {text("roleOther")}

                                {(shown.has("highestEducation") || shown.has("dualQualified")) && (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {text("highestEducation")}
                                        {text("educationInstitute")}
                                    </div>
                                )}
                                {radios("dualQualified", DUAL_QUALIFIED, "grid-cols-2 sm:grid-cols-4")}
                                {shown.has("barYear") && (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {text("barYear")}
                                        {text("barName")}
                                    </div>
                                )}
                                {text("awardsReceived")}
                                {shown.has("orgName") && (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {text("orgName")}
                                        {text("currentPosition")}
                                    </div>
                                )}
                                {radios("positionTenure", YEAR_RANGES)}
                                {text("website")}
                                {radios("totalYearsPractice", YEAR_RANGES)}

                                {shown.has("category") && (
                                    <div>
                                        <Label k="category" />
                                        <select id="category" value={a.category ?? ""} onChange={e => set("category", e.target.value)} className={inputCls("category")}>
                                            <option value="">-Select-</option>
                                            {CATEGORY_GROUPS.map(g => (
                                                <optgroup key={g.group} label={g.group}>
                                                    {g.options.map(o => <option key={o} value={`${g.group} - ${o}`}>{o}</option>)}
                                                </optgroup>
                                            ))}
                                        </select>
                                        {err("category")}
                                    </div>
                                )}

                                {shown.has("addressCity") && (
                                    <fieldset className="space-y-4 rounded-xl border border-slate-200 p-4 md:p-5">
                                        <legend className="px-1 text-sm font-semibold text-slate-700">Address <span className="text-red-500">*</span></legend>
                                        {text("addressStreet")}
                                        {text("addressLine2")}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {text("addressCity")}
                                            {india ? select("addressState", INDIAN_STATES) : text("addressState")}
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {text("addressPostal")}
                                            <div>
                                                <Label k="addressCountry" />
                                                <select id="addressCountry" value={a.addressCountry ?? ""} className={inputCls("addressCountry")}
                                                    onChange={e => { set("addressCountry", e.target.value); set("addressState", ""); }}>
                                                    <option value="">-Select-</option>
                                                    {COUNTRIES_DATA.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
                                                </select>
                                                {err("addressCountry")}
                                            </div>
                                        </div>
                                    </fieldset>
                                )}
                            </>
                        )}

                        {step === 4 && (
                            <div>
                                <div className="flex items-baseline justify-between gap-4 mb-3">
                                    <p className="text-sm font-medium text-slate-700">Now Select your Top 3 Key Practice Areas <span className="text-red-500">*</span></p>
                                    <span className="text-sm text-amber-600 font-semibold shrink-0">{practice.length}/{MAX_PRACTICE_AREAS}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {PRACTICE_AREAS.map(p => {
                                        const on = practice.includes(p);
                                        const disabled = !on && practice.length >= MAX_PRACTICE_AREAS;
                                        return (
                                            <label key={p} className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all ${on ? "bg-amber-50 border-amber-400 text-amber-800 font-medium" : disabled ? "border-slate-100 text-slate-300 cursor-not-allowed" : "border-slate-200 text-slate-700 hover:border-amber-300 cursor-pointer"}`}>
                                                <input type="checkbox" checked={on} disabled={disabled} className="accent-amber-500"
                                                    onChange={() => set("practiceAreas", on ? practice.filter(x => x !== p) : [...practice, p])} />
                                                {p}
                                            </label>
                                        );
                                    })}
                                </div>
                                {err("practiceAreas")}
                            </div>
                        )}

                        {step === 5 && (
                            <>
                                {essay("essayReach", "Include details about your Education, Experience, Key Practice Areas and examples of important cases or disputes.")}
                                {essay("essayAchievements", "Include details and examples pertaining to your achievements and their impact.")}
                                {essay("essayInnovation", "Share examples of your innovative approach that benefited your clients or company.")}
                                {essay("essayFuture", "Discuss your efforts for continuous professional development and adapting to new technologies.")}
                                <div>
                                    <p className="block text-sm font-medium text-slate-700 mb-1.5">File Upload <span className="text-slate-400 font-normal">(optional)</span></p>
                                    {file ? (
                                        <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-300 bg-amber-50">
                                            <FileText className="w-5 h-5 text-amber-600 shrink-0" />
                                            <span className="text-sm text-slate-700 truncate flex-1">{file.name} <span className="text-slate-400">({(file.size / 1024 / 1024).toFixed(1)} MB)</span></span>
                                            <button type="button" onClick={() => setFile(null)} className="p-1 rounded hover:bg-amber-100" aria-label="Remove file"><X className="w-4 h-4 text-slate-500" /></button>
                                        </div>
                                    ) : (
                                        <label className="relative block border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer bg-slate-50"
                                            onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); pickFile(e.dataTransfer.files?.[0] ?? null); }}>
                                            <UploadCloud className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                            <span className="block text-slate-600 text-sm">Click to choose a file, or drag it here</span>
                                            <span className="block text-slate-400 text-xs mt-1">PDF, Word or image · up to 10 MB · 1 file</span>
                                            <input type="file" accept={FILE_TYPES} className="sr-only" onChange={e => pickFile(e.target.files?.[0] ?? null)} />
                                        </label>
                                    )}
                                    {fileError && <p className="mt-1.5 text-sm text-red-600">{fileError}</p>}
                                </div>
                                {submitError && <p className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{submitError}</p>}
                            </>
                        )}

                        {step === 6 && !paid && (
                            <div className="text-center space-y-6">
                                <div className="text-left bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-slate-700">
                                    <p className="font-semibold text-amber-800 mb-1">⚠️ IMPORTANT: Nomination Fee Payment</p>
                                    <p>Your nomination has been saved. Please complete the nomination fee payment below — your nomination will only be considered after successful payment.
                                        If you experience any payment issues, you can close this page and our team will contact you to assist with the payment.</p>
                                </div>
                                {fileWarning && <p className="text-left p-3 rounded-lg bg-orange-50 border border-orange-200 text-sm text-orange-800">{fileWarning}</p>}
                                <div>
                                    <p className="text-slate-500 text-sm">LexTalkWorld – Nomination Fee</p>
                                    <p className="text-4xl font-bold text-slate-900 mt-1">USD {EVENT.feeUsd}</p>
                                    <p className="text-xs text-slate-400 mt-1">Fully refundable if you do not make the cut</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                                    <button type="button" onClick={() => pay("USD")} disabled={!!paying}
                                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-amber-200 hover:shadow-xl disabled:opacity-60 cursor-pointer">
                                        {paying === "USD" ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                                        Pay {fee?.usd ?? `USD ${EVENT.feeUsd}`}
                                    </button>
                                    <button type="button" onClick={() => pay("INR")} disabled={!!paying || !fee?.inr}
                                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-amber-500 text-amber-700 font-semibold hover:bg-amber-50 disabled:opacity-50 cursor-pointer">
                                        {paying === "INR" ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="font-bold">₹</span>}
                                        {fee?.inr ? `Pay ${fee.inr} (INR)` : fee ? "INR unavailable" : "Loading INR…"}
                                    </button>
                                </div>
                                <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5"><Lock className="w-3 h-3" /> Secure payment via Razorpay · cards, UPI, net banking</p>
                                {payError && <p className="text-left p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{payError}</p>}
                            </div>
                        )}

                        {paid && (
                            <div className="text-center py-6 space-y-4">
                                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center"><Check className="w-8 h-8 text-emerald-600" /></div>
                                <h3 className="text-2xl font-serif font-bold text-slate-900">Thank you — your nomination is complete</h3>
                                <p className="text-slate-600 max-w-md mx-auto">We've received your nomination fee and emailed you a confirmation. The Awards Committee will send you a detailed scorecard once the evaluation is complete.</p>
                            </div>
                        )}

                        {/* Navigation */}
                        {step < 6 && (
                            <div className="flex justify-between gap-3 pt-6 border-t border-slate-100">
                                {step > 1 ? (
                                    <button type="button" onClick={back} className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                ) : <span />}
                                {step < 5 ? (
                                    <button type="button" onClick={next} className="flex items-center gap-1.5 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-amber-200 hover:shadow-xl cursor-pointer">
                                        Next <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button type="button" onClick={submit} disabled={submitting} className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-amber-200 hover:shadow-xl disabled:opacity-60 cursor-pointer">
                                        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <>Submit &amp; continue to payment <ChevronRight className="w-4 h-4" /></>}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Terms text from the Zoho "Legal Honor Global Awards - 2026 Mumbai" form. */
function Terms() {
    const Num = ({ n }: { n: number }) => (
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">{n}</span>
    );
    return (
        <div className="space-y-4">
            <div className="text-center space-y-1">
                <p className="font-semibold text-slate-800">All nominations undergo an independent screening and evaluation process by the LEGAL HONOR GLOBAL AWARDS JURY Panel.</p>
                <p className="text-sm text-slate-500">All fields marked with <span className="text-red-500">*</span> are required and must be filled.</p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 md:p-6 max-h-[460px] overflow-y-auto space-y-6 text-sm text-slate-600">
                <div className="space-y-3">
                    <div className="flex items-center gap-2"><Num n={1} /><h3 className="text-slate-800 font-semibold">File your nomination in the next steps. The terms and conditions for the same are as follows.</h3></div>
                    <ul className="ml-9 space-y-2 list-disc marker:text-amber-500">
                        <li>All awardees are required to be physically or virtually present at the event to receive the Award. In case the Awardee is not able to attend, they can send a person on their behalf.</li>
                        <li>Filling in the nomination form only does not ensure that you will be selected for the Award.</li>
                        <li>The Awardees will be selected on the basis of parameters set by our Awards Committee and will be intimated accordingly.</li>
                        <li>In case you do not win the award nomination, the nomination fee <strong className="text-amber-700">USD 50</strong> is completely refundable.</li>
                        <li>All Awardees will need to book the Awardee pass to attend the conference and receive their award.</li>
                        <li>The decision of the Awards Committee will be final and binding.</li>
                        <li>LexTalk World and Legal Honor are brought to you by Canada-based firm; ClickAway Creators (A division of CAC Media &amp; Events) and managed by MantranexVista, which reserves the right to make any changes to the event, as it deems necessary.</li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2"><Num n={2} /><h3 className="text-slate-800 font-semibold">Evaluation</h3></div>
                    <p className="ml-9">Based on your answers and our own research, our Awards Committee rates you on different parameters such as the overall reach, impact on the legal industry, knowledge and market demand, innovative ideas and suggestions, futuristic spirit and approach, etc.</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2"><Num n={3} /><h3 className="text-slate-800 font-semibold">Scorecard</h3></div>
                    <p className="ml-9">Once the Awards Committee completes the evaluation, they will share a detailed scorecard with each nominee via email. They follow a scoring procedure and give you a score out of 100 in each of your answers; the cut-off to qualify is <strong className="text-amber-700">80 points out of 100</strong>.</p>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center gap-2"><Num n={4} /><h3 className="text-slate-800 font-semibold">Depending on whether you win or fail to make the cut, the following will happen</h3></div>
                    <div className="ml-9 space-y-3">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                            <p className="text-emerald-700 font-semibold mb-1 flex items-center gap-2"><Trophy className="w-4 h-4" /> Winner</p>
                            <p>We will reach out to you to confirm you as a winner of the Award at the LexTalk World conference and get you signed up for the Awardee pass. Registration fee:</p>
                            <p className="mt-2 text-slate-700">India Conference: Standard In-Person Awardee Pass — <strong className="text-amber-700">USD 1000</strong> (inclusive of taxes)</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4">
                            <p className="text-slate-700 font-semibold mb-1">Fail to make the cut</p>
                            <p>We will go ahead and issue a full refund of the nomination fee (USD 50).</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2"><Num n={5} /><h3 className="text-slate-800 font-semibold">The event</h3></div>
                    <p className="ml-9">You attend the event, accept the award, and be a part of great sessions, while also networking with your peers! As an awardee you will be entitled to all the below benefits in the Standard Awardee Pass:</p>
                </div>
                <div className="border-t border-slate-200 pt-5">
                    <h3 className="text-slate-800 font-semibold mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" /> Standard Awardee Pass Benefits</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <p className="text-amber-600 font-semibold uppercase tracking-wider mb-2">Pre-Conference</p>
                            <ul className="space-y-1.5"><li>• Opportunity to write an article; promoted on social media and website</li><li>• Article in the upcoming editions of the Jurisprudence e-Magazine published by Global Lawyers Association</li></ul>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <p className="text-amber-600 font-semibold uppercase tracking-wider mb-2">During Conference</p>
                            <ul className="space-y-1.5"><li>• Announcement of Awardees for each category</li><li>• Full event participation with networking opportunities</li><li>• Awardees listing in the event show guide</li><li>• Mic Time on the stage</li><li>• Award plaque from the Guest of Honor</li></ul>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <p className="text-amber-600 font-semibold uppercase tracking-wider mb-2">Post-Conference</p>
                            <ul className="space-y-1.5"><li>• Social Media Announcement for Awardees</li><li>• Dedicated Section on our Website in the Awardees List</li><li>• E-certification for all Awardees</li><li>• E-badge of Honor for all Awardees</li><li>• PR announcements in 200+ International Digital Publications and Internet News sites</li></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
