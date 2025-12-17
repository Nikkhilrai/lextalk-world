"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, FileText, Award, User, Briefcase, Building2, MapPin, Scale, Sparkles, CreditCard } from "lucide-react";
import Image from "next/image";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

// --- EXACT OPTIONS FROM JOTFORM ---
const INDIVIDUAL_ROLES = [
    "Independent Lawyer/Advocate",
    "Lawyer in a Law Firm",
    "In-House Lawyer",
    "Compliance Expert",
    "IP Expert",
    "Data Privacy/Cyber Security Professional",
    "Legal Tech Expert",
    "Government Official/Representative",
    "Legal Business Consultant",
    "None of the above"
];

const FIRM_TYPES = [
    "Law Firm",
    "In-House Legal Department",
    "Legal Tech Company",
    "None of the above"
];

const TENURE_OPTIONS = [
    "Less than 3 Years",
    "3 to 5 Years",
    "5 to 10 Years",
    "10 to 20 Years",
    "20+ Years"
];

const PRACTICE_AREAS = [
    "Administrative", "Capital Markets", "Banking & Finance", "M&A", "Construction",
    "Data Protection and Privacy", "Dispute Resolution", "Litigation", "Arbitration",
    "Bankruptcy/Restructuring/Insolvency", "Anti-Bribery & Corruption", "Aviation",
    "Corporate/Commercial", "Competition/Antitrust", "Intellectual Property",
    "Labour and Employment", "Regulatory & Compliance", "Risk and Corporate Governance",
    "Taxation", "White Collar Crime", "Technology", "Criminal", "Environmental",
    "Family", "Health", "Immigration", "Personal Injury", "Infrastructure",
    "Real Estate", "Media and Entertainment", "Sports", "Other"
];

const COUNTRIES = ["United Arab Emirates", "United States", "United Kingdom", "India", "Singapore", "Saudi Arabia", "Canada", "Australia", "Germany", "France", "Netherlands", "Switzerland", "Japan", "China", "South Korea", "Brazil", "Mexico", "South Africa", "Nigeria", "Kenya", "Egypt", "Other"];

// --- SCHEMA ---
const nominationSchema = z.object({
    acceptedTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),

    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(5, "Phone number required"),
    dob: z.string().min(1, "Date of birth required"),

    nominateAs: z.enum(["Individual", "Company or Firm"]),

    // Individual
    individualRole: z.string().optional(),
    individualRoleOther: z.string().optional(),
    highestEducation: z.string().optional(),
    educationInstitute: z.string().optional(),
    dualQualified: z.enum(["Yes", "No"]).optional(),
    barYear: z.string().optional(),
    barName: z.string().optional(),

    // Firm
    firmType: z.string().optional(),
    firmTypeOther: z.string().optional(),

    // Common
    orgName: z.string().optional(),
    currentPosition: z.string().optional(),
    positionTenure: z.string().optional(),
    totalYearsPractice: z.string().optional(),
    website: z.string().optional(),
    awardsReceived: z.string().optional(),

    // Address
    addressCity: z.string().min(1, "City required"),
    addressState: z.string().min(1, "State/Province required"),
    addressCountry: z.string().min(1, "Country required"),

    // Practice Areas
    practiceAreas: z.array(z.string()).min(1, "Select at least 1").max(3, "Maximum 3"),

    // Essays
    essayReach: z.string().min(10, "Please provide more detail"),
    essayAchievements: z.string().min(10, "Please provide more detail"),
    essayInnovation: z.string().min(10, "Please provide more detail"),
    essayFuture: z.string().min(10, "Please provide more detail"),

    files: z.any().optional(),
});

type FormValues = z.infer<typeof nominationSchema>;

const STEPS = [
    { id: 1, name: "Terms", icon: FileText },
    { id: 2, name: "Personal", icon: User },
    { id: 3, name: "Details", icon: Briefcase },
    { id: 4, name: "Expertise", icon: Scale },
    { id: 5, name: "Essays", icon: Sparkles },
    { id: 6, name: "Payment", icon: CreditCard },
];

export function NominationForm() {
    const [step, setStep] = useState(1);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    const { register, handleSubmit, watch, trigger, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(nominationSchema),
        defaultValues: { practiceAreas: [] }
    });

    const nominateAs = watch("nominateAs");
    const individualRole = watch("individualRole");
    const firmType = watch("firmType");
    const watchPracticeAreas = watch("practiceAreas") || [];

    const handleNext = async () => {
        let fields: any[] = [];
        if (step === 1) fields = ["acceptedTerms"];
        if (step === 2) fields = ["fullName", "email", "phone", "dob"];
        if (step === 3) {
            fields = ["nominateAs", "addressCity", "addressState", "addressCountry"];
            if (nominateAs === "Individual") {
                fields.push("individualRole");
                if (individualRole === "None of the above") fields.push("individualRoleOther");
            } else {
                fields.push("firmType");
                if (firmType === "None of the above") fields.push("firmTypeOther");
            }
        }
        if (step === 4) fields = ["practiceAreas"];
        if (step === 5) fields = ["essayReach", "essayAchievements", "essayInnovation", "essayFuture"];

        const isValid = await trigger(fields);
        if (isValid) setStep(prev => prev + 1);
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const payload = {
                type: data.nominateAs,
                category: "Global Legal Honour 2026",
                nominatorEmail: data.email,
                nominatorPhone: data.phone,
                nomineeName: data.fullName,
                nomineeEmail: data.email,
                formResponse: data
            };

            const res = await fetch("/api/nominate", { method: "POST", body: JSON.stringify(payload) });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);

            const payRes = await fetch("/api/create-payment-intent", { method: "POST", body: JSON.stringify({ nominationId: json.nominationId }) });
            const payJson = await payRes.json();
            setClientSecret(payJson.clientSecret);
            setStep(6);
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Global Legal Honour 2026</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Nomination Application</h1>
                    <p className="text-slate-400">Dubai, United Arab Emirates</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-1 mb-8 overflow-x-auto pb-2">
                    {STEPS.map((s, i) => {
                        const Icon = s.icon;
                        const isActive = step === s.id;
                        const isCompleted = step > s.id;
                        return (
                            <div key={s.id} className="flex items-center">
                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive ? 'bg-amber-500 text-slate-900' : isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                                    <span className="text-xs font-bold hidden md:block">{s.name}</span>
                                </div>
                                {i < STEPS.length - 1 && <div className={`w-4 h-0.5 mx-1 ${isCompleted ? 'bg-green-500' : 'bg-slate-700'}`} />}
                            </div>
                        );
                    })}
                </div>

                {/* Main Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border-b border-white/10 px-8 py-4">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            {step === 1 && <><FileText className="w-5 h-5 text-amber-400" /> Terms & Conditions</>}
                            {step === 2 && <><User className="w-5 h-5 text-amber-400" /> Personal Details</>}
                            {step === 3 && <><Briefcase className="w-5 h-5 text-amber-400" /> Professional Details</>}
                            {step === 4 && <><Scale className="w-5 h-5 text-amber-400" /> Key Practice Areas</>}
                            {step === 5 && <><Sparkles className="w-5 h-5 text-amber-400" /> Your Story</>}
                            {step === 6 && <><CreditCard className="w-5 h-5 text-amber-400" /> Secure Payment</>}
                        </h2>
                    </div>

                    <div className="p-6 md:p-10">
                        {!isComplete && step < 6 ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* STEP 1: TERMS */}
                                {step === 1 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 max-h-64 overflow-y-auto text-sm text-slate-300 space-y-3">
                                            <p className="font-bold text-white">Important Information:</p>
                                            <ul className="list-disc list-inside space-y-2 text-slate-400">
                                                <li>All fields marked with * are required and must be filled.</li>
                                                <li>All awardees must be physically or virtually present to receive the Award.</li>
                                                <li>Filling the nomination form does not ensure selection for the Award.</li>
                                                <li>If you do not win, the nomination fee (USD 50) is fully refundable.</li>
                                                <li>Winners will be notified via email and must book an Awardee Pass.</li>
                                                <li>Standard Virtual Awardee Pass: USD 800</li>
                                                <li>Standard In-Person Awardee Pass: USD 1200</li>
                                                <li>The decision of the Awards Committee is final.</li>
                                            </ul>
                                        </div>

                                        <label className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${watch("acceptedTerms") ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'}`}>
                                            <input type="checkbox" {...register("acceptedTerms")} className="w-5 h-5 mt-0.5 rounded text-amber-500 focus:ring-amber-500 bg-slate-700 border-slate-600" />
                                            <span className="text-white font-medium">I have read all the details and wish to proceed with nominations.</span>
                                        </label>
                                        {errors.acceptedTerms && <p className="text-red-400 text-sm">{errors.acceptedTerms.message}</p>}
                                    </div>
                                )}

                                {/* STEP 2: PERSONAL */}
                                {step === 2 && (
                                    <div className="space-y-5 animate-in fade-in slide-in-from-right duration-300">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <Input label="Full Name *" placeholder="Enter your full name" {...register("fullName")} error={errors.fullName?.message} />
                                            <Input label="Email Address *" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
                                            <Input label="Mobile Number *" placeholder="+1 555 123 4567" {...register("phone")} error={errors.phone?.message} />
                                            <Input label="Date of Birth *" type="date" {...register("dob")} error={errors.dob?.message} />
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: DETAILS */}
                                {step === 3 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">

                                        {/* Nominate As */}
                                        <div>
                                            <label className={labelClass}>Nominate As *</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {["Individual", "Company or Firm"].map(v => (
                                                    <label key={v} className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${nominateAs === v ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600'}`}>
                                                        {v === "Individual" ? <User className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                                                        <input type="radio" value={v} {...register("nominateAs")} className="sr-only" />
                                                        <span className="font-bold">{v}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Individual Branch */}
                                        {nominateAs === "Individual" && (
                                            <div className="space-y-4 p-5 rounded-xl bg-slate-800/30 border border-slate-700">
                                                <Select label="Choose the option that describes you best *" {...register("individualRole")} options={INDIVIDUAL_ROLES} error={errors.individualRole?.message} />
                                                {individualRole === "None of the above" && (
                                                    <Input label="Please specify *" placeholder="Enter your role" {...register("individualRoleOther")} error={errors.individualRoleOther?.message} />
                                                )}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Input label="Highest Education" placeholder="e.g. LLB, JD, BCL" {...register("highestEducation")} />
                                                    <Input label="University/Institute" placeholder="Name of institution" {...register("educationInstitute")} />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <Select label="Dual Qualified?" {...register("dualQualified")} options={["Yes", "No"]} />
                                                    <Input label="Year Called to Bar" placeholder="e.g. 2010" {...register("barYear")} />
                                                    <Input label="Which Bar?" placeholder="e.g. NY Bar" {...register("barName")} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Firm Branch */}
                                        {nominateAs === "Company or Firm" && (
                                            <div className="space-y-4 p-5 rounded-xl bg-slate-800/30 border border-slate-700">
                                                <Select label="Choose the type that describes you best *" {...register("firmType")} options={FIRM_TYPES} error={errors.firmType?.message} />
                                                {firmType === "None of the above" && (
                                                    <Input label="Please specify *" placeholder="Enter your organization type" {...register("firmTypeOther")} error={errors.firmTypeOther?.message} />
                                                )}
                                            </div>
                                        )}

                                        {/* Common Fields */}
                                        {nominateAs && (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Input label="Organization/Firm Name" placeholder="Name of your company" {...register("orgName")} />
                                                    <Input label="Current Position/Designation" placeholder="e.g. Partner" {...register("currentPosition")} />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Select label="Time in Current Position" {...register("positionTenure")} options={TENURE_OPTIONS} />
                                                    <Select label="Total Years in Practice/Business" {...register("totalYearsPractice")} options={TENURE_OPTIONS} />
                                                </div>
                                                <Input label="Website (Optional)" placeholder="www.yourfirm.com" {...register("website")} />
                                                <Input label="Previous Awards Received (Optional)" placeholder="List any previous legal awards" {...register("awardsReceived")} />

                                                {/* Address */}
                                                <div className="pt-4 border-t border-slate-700">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <MapPin className="w-4 h-4 text-amber-400" />
                                                        <span className="text-sm font-bold text-white uppercase tracking-wider">Address</span>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <Input label="City *" placeholder="City" {...register("addressCity")} error={errors.addressCity?.message} />
                                                        <Input label="State/Province *" placeholder="State" {...register("addressState")} error={errors.addressState?.message} />
                                                        <Select label="Country *" {...register("addressCountry")} options={COUNTRIES} error={errors.addressCountry?.message} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* STEP 4: PRACTICE AREAS */}
                                {step === 4 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                                        <p className="text-slate-400">Select your <span className="text-amber-400 font-bold">Top 3</span> Key Practice Areas:</p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-80 overflow-y-auto p-2">
                                            {PRACTICE_AREAS.map(area => {
                                                const isSelected = watchPracticeAreas.includes(area);
                                                return (
                                                    <label key={area} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all text-sm ${isSelected ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600'}`}>
                                                        <input
                                                            type="checkbox"
                                                            value={area}
                                                            checked={isSelected}
                                                            onChange={(e) => {
                                                                const current = watchPracticeAreas;
                                                                if (e.target.checked && current.length < 3) {
                                                                    setValue("practiceAreas", [...current, area]);
                                                                } else if (!e.target.checked) {
                                                                    setValue("practiceAreas", current.filter(x => x !== area));
                                                                }
                                                            }}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-amber-500 border-amber-500' : 'border-slate-600'}`}>
                                                            {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                        </div>
                                                        <span>{area}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <p className="text-xs text-slate-500">Selected: {watchPracticeAreas.length}/3</p>
                                        {errors.practiceAreas && <p className="text-red-400 text-sm">{errors.practiceAreas.message}</p>}
                                    </div>
                                )}

                                {/* STEP 5: ESSAYS */}
                                {step === 5 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                                        <TextArea
                                            label="Tell us about your Overall Reach as a Legal Professional *"
                                            hint="Include details about your Education, Experience, Key Practice Areas, and examples of important cases or disputes."
                                            {...register("essayReach")}
                                            error={errors.essayReach?.message}
                                        />
                                        <TextArea
                                            label="Tell us about your Achievements and Industry Impact *"
                                            hint="Include details and examples pertaining to your achievements and their impacts."
                                            {...register("essayAchievements")}
                                            error={errors.essayAchievements?.message}
                                        />
                                        <TextArea
                                            label="How Innovative is your approach? *"
                                            hint="Share examples of your innovative approach that benefited your clients or company."
                                            {...register("essayInnovation")}
                                            error={errors.essayInnovation?.message}
                                        />
                                        <TextArea
                                            label="How do you keep yourself Future-Proof? *"
                                            hint="Discuss your efforts for continuous professional development and adapting to new technologies."
                                            {...register("essayFuture")}
                                            error={errors.essayFuture?.message}
                                        />

                                        {/* File Upload */}
                                        <div className="pt-4 border-t border-slate-700">
                                            <label className={labelClass}>Upload Documents (CV/Profile)</label>
                                            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-amber-500/50 transition-all cursor-pointer bg-slate-800/20">
                                                <UploadCloud className="w-10 h-10 mx-auto text-slate-500 mb-3" />
                                                <p className="text-slate-400 text-sm">Click to browse or drag files here</p>
                                                <p className="text-slate-600 text-xs mt-1">PDF, DOC, DOCX up to 10MB</p>
                                                <input type="file" className="hidden" {...register("files")} accept=".pdf,.doc,.docx" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between pt-6 border-t border-slate-700">
                                    {step > 1 ? (
                                        <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-all font-bold">
                                            <ChevronLeft className="w-4 h-4" /> Back
                                        </button>
                                    ) : <div />}

                                    {step < 5 ? (
                                        <button type="button" onClick={handleNext} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all">
                                            Next <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all">
                                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                                            {isSubmitting ? "Processing..." : "Proceed to Payment"}
                                        </button>
                                    )}
                                </div>
                            </form>
                        ) : step === 6 && !isComplete ? (
                            /* PAYMENT STEP */
                            <div className="animate-in zoom-in duration-300">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CreditCard className="w-8 h-8 text-amber-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Nomination Fee: $50.00</h3>
                                    <p className="text-slate-400 text-sm">Fully refundable if not selected</p>
                                </div>

                                {clientSecret && stripePromise ? (
                                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#f59e0b' } } }}>
                                        <PaymentForm onSuccess={() => setIsComplete(true)} />
                                    </Elements>
                                ) : (
                                    <div className="text-center p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                                        <p className="text-red-400">Payment configuration error. Please contact support.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* SUCCESS */
                            <div className="text-center py-12 animate-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-white mb-3">Nomination Submitted!</h2>
                                <p className="text-slate-400 max-w-md mx-auto mb-8">Thank you for your application. Our Awards Committee will review your nomination and get back to you soon.</p>
                                <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all">Return Home</a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-600 text-xs mt-8">© LexTalk World. All rights reserved. Powered by LexTalk.</p>
            </div>
        </div>
    );
}

// --- COMPONENTS ---
const labelClass = "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2";

const Input = ({ label, error, hint, ...props }: any) => (
    <div>
        {label && <label className={labelClass}>{label}</label>}
        <input className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-700'} text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all`} {...props} />
        {hint && <p className="text-slate-500 text-xs mt-1">{hint}</p>}
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
);

const TextArea = ({ label, error, hint, ...props }: any) => (
    <div>
        {label && <label className={labelClass}>{label}</label>}
        <textarea rows={4} className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-700'} text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none`} {...props} />
        {hint && <p className="text-slate-500 text-xs mt-1">{hint}</p>}
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
);

const Select = ({ label, options, error, ...props }: any) => (
    <div>
        {label && <label className={labelClass}>{label}</label>}
        <select className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-700'} text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all appearance-none`} {...props}>
            <option value="" className="bg-slate-900">Select...</option>
            {options.map((o: string) => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
        </select>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
);

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.origin + "/awards" },
            redirect: "if_required"
        });
        if (error) setMsg(error.message || "Payment failed");
        else onSuccess();
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <button disabled={!stripe || loading} className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? "Processing..." : "Pay $50.00"}
            </button>
            {msg && <p className="text-red-400 text-center text-sm">{msg}</p>}
        </form>
    );
}
