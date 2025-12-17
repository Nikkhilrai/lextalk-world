"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, Check, Award, Star, Trophy, Sparkles } from "lucide-react";
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

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina Faso", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia",
    "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Libya", "Lithuania", "Luxembourg",
    "Macau", "Malaysia", "Maldives", "Malta", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Myanmar", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Nigeria", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
    "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea",
    "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Other"
];

// --- SCHEMA ---
const nominationSchema = z.object({
    acceptedTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms to proceed." }) }),

    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(5, "Phone number is required"),
    dob: z.string().min(1, "Date of birth is required"),

    nominateAs: z.enum(["Individual", "Company or Firm"]),

    individualRole: z.string().optional(),
    individualRoleOther: z.string().optional(),
    highestEducation: z.string().optional(),
    educationInstitute: z.string().optional(),
    dualQualified: z.enum(["Yes", "No"]).optional(),
    barYear: z.string().optional(),
    barName: z.string().optional(),

    firmType: z.string().optional(),
    firmTypeOther: z.string().optional(),

    orgName: z.string().optional(),
    currentPosition: z.string().optional(),
    positionTenure: z.string().optional(),
    totalYearsPractice: z.string().optional(),
    website: z.string().optional(),
    awardsReceived: z.string().optional(),

    addressCity: z.string().min(1, "City is required"),
    addressState: z.string().min(1, "State/Province is required"),
    addressCountry: z.string().min(1, "Country is required"),

    practiceAreas: z.array(z.string()).min(1, "Select at least 1 practice area").max(3, "Maximum 3 areas allowed"),

    essayReach: z.string().min(10, "Please provide more detail"),
    essayAchievements: z.string().min(10, "Please provide more detail"),
    essayInnovation: z.string().min(10, "Please provide more detail"),
    essayFuture: z.string().min(10, "Please provide more detail"),

    files: z.any().optional(),
});

type FormValues = z.infer<typeof nominationSchema>;

export function NominationForm() {
    const [step, setStep] = useState(1);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const totalSteps = 6;

    const { register, handleSubmit, watch, trigger, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(nominationSchema),
        defaultValues: { practiceAreas: [] }
    });

    const nominateAs = watch("nominateAs");
    const individualRole = watch("individualRole");
    const firmType = watch("firmType");
    const watchPracticeAreas = watch("practiceAreas") || [];

    const handleNext = async () => {
        let fields: (keyof FormValues)[] = [];
        if (step === 1) fields = ["acceptedTerms"];
        if (step === 2) fields = ["firstName", "lastName", "email", "phone", "dob"];
        if (step === 3) fields = ["nominateAs", "addressCity", "addressState", "addressCountry"];
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
                nomineeName: `${data.firstName} ${data.lastName}`,
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

    const stepTitles = [
        "Terms & Conditions",
        "Personal Details",
        "Professional Profile",
        "Practice Areas",
        "Your Story",
        "Complete Payment"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Luxury Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/dubai-2026/pattern.png')] opacity-5" />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
                <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Exclusive Nomination</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                        Global Legal Honour <span className="text-amber-400">2026</span> Dubai
                    </h1>
                    <p className="text-xl text-slate-400 font-light">Dubai Award Nomination Form</p>
                </div>
            </div>

            {/* Progress Section */}
            <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            {[1, 2, 3, 4, 5, 6].map((s) => (
                                <div
                                    key={s}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${s === step ? 'bg-amber-500 text-slate-900 scale-110' :
                                            s < step ? 'bg-emerald-500 text-white' :
                                                'bg-slate-800 text-slate-500'
                                        }`}
                                >
                                    {s < step ? <Check className="w-4 h-4" /> : s}
                                </div>
                            ))}
                        </div>
                        <span className="text-slate-500 text-sm">{Math.round((step / totalSteps) * 100)}% Complete</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Form Container */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">

                    {/* Step Header */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-b border-white/5 px-8 py-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <span className="text-amber-400 font-bold">{step}</span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Step {step} of {totalSteps}</p>
                                <h2 className="text-xl font-bold text-white">{stepTitles[step - 1]}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        {!isComplete && step < 6 ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* STEP 1: TERMS */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <p className="text-slate-400 text-sm">
                                            All fields marked with <span className="text-amber-400">*</span> are required and must be filled.
                                        </p>

                                        {/* Terms Content - Scrollable */}
                                        <div className="bg-slate-800/50 rounded-xl border border-white/5 p-6 max-h-[500px] overflow-y-auto custom-scrollbar space-y-6 text-sm">

                                            {/* Step 1 */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-amber-400 text-xs font-bold">1</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">File your nomination in the next steps. The terms and conditions for the same are as follows:</h3>
                                                </div>
                                                <ul className="ml-8 space-y-2 text-slate-400">
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-1">•</span>
                                                        <span>All awardees are required to be physically or virtually present at the event to receive the Award. In case the Awardee is not able to attend, they can send a person on their behalf.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-1">•</span>
                                                        <span>Filling in the nomination form only does not ensure that you will be selected for the Award.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-1">•</span>
                                                        <span>The Awardees will be selected on the basis of parameters set by our Awards Committee and will be intimated accordingly.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-1">•</span>
                                                        <span>In case you do not win the award nomination, the nomination fee <span className="text-amber-400 font-semibold">USD 50</span> is completely refundable.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-1">•</span>
                                                        <span>All Awardees will need to book the Awardee pass to attend the conference and receive their award.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-1">•</span>
                                                        <span>The decision of the Awards Committee will be final and binding.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-1">•</span>
                                                        <span>LexTalk World and Legal Honour are brought to you by Canada-based firm; ClickAway Creators (A division of CAC Media & Events) which reserves the right to make any changes to the event, as it deems necessary.</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Step 2 */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-amber-400 text-xs font-bold">2</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">Evaluation Process</h3>
                                                </div>
                                                <p className="ml-8 text-slate-400">
                                                    Based on your answers and our own research, our Awards Committee rates you on different parameters such as the overall reach, impact on the legal industry, knowledge and market demand, innovative ideas and suggestions, futuristic spirit and approach, etc.
                                                </p>
                                            </div>

                                            {/* Step 3 */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-amber-400 text-xs font-bold">3</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">Scoring & Scorecard</h3>
                                                </div>
                                                <p className="ml-8 text-slate-400">
                                                    Once the Awards Committee completes the evaluation, they will share a detailed scorecard with each nominee via email. They follow a scoring procedure and give you a score out of 100 in each of your answers, the cut-off to qualify is <span className="text-amber-400 font-semibold">80 points out of 100</span>.
                                                </p>
                                            </div>

                                            {/* Step 4 */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-amber-400 text-xs font-bold">4</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">Outcome</h3>
                                                </div>
                                                <div className="ml-8 space-y-4">
                                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                                                        <p className="text-emerald-400 font-semibold mb-2">🏆 Winner</p>
                                                        <p className="text-slate-400 text-sm mb-3">We will reach out to you, to confirm you as a winner of the Award at the LexTalk World conference and get you signed up for the Awardee pass.</p>
                                                        <div className="text-sm">
                                                            <p className="text-slate-500 mb-1">Middle East Conference Pass Fees:</p>
                                                            <p className="text-slate-300">Standard Virtual Awardee Pass: <span className="text-amber-400 font-semibold">USD 800</span></p>
                                                            <p className="text-slate-300">Standard In-Person Awardee Pass: <span className="text-amber-400 font-semibold">USD 1200</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
                                                        <p className="text-slate-300 font-semibold mb-2">Fail to make the cut</p>
                                                        <p className="text-slate-400 text-sm">We will go ahead and issue a full refund of the nomination fee (USD 50).</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Step 5 */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-amber-400 text-xs font-bold">5</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">Event Day</h3>
                                                </div>
                                                <p className="ml-8 text-slate-400">
                                                    You attend the event, accept the award, and be a part of great sessions, while also networking with your peers!
                                                </p>
                                            </div>

                                            {/* Benefits Section */}
                                            <div className="border-t border-white/5 pt-6 space-y-4">
                                                <h3 className="text-white font-semibold flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-amber-400" />
                                                    Standard Awardee Pass Benefits
                                                </h3>

                                                <div className="grid md:grid-cols-3 gap-4">
                                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                                                        <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">Pre-Conference</p>
                                                        <ul className="space-y-1.5 text-slate-400 text-xs">
                                                            <li>• Opportunity to write an article; promoted on social media and website</li>
                                                            <li>• Article in Jurisprudence e-Magazine by Global Lawyers Association</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                                                        <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">During Conference</p>
                                                        <ul className="space-y-1.5 text-slate-400 text-xs">
                                                            <li>• Announcement of Awardees for each category</li>
                                                            <li>• Full event participation with networking</li>
                                                            <li>• Awardees listing in event show guide</li>
                                                            <li>• Mic Time on the stage</li>
                                                            <li>• Award plaque from Guest of Honor</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                                                        <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">Post-Conference</p>
                                                        <ul className="space-y-1.5 text-slate-400 text-xs">
                                                            <li>• Social Media Announcement</li>
                                                            <li>• Dedicated Section on Website</li>
                                                            <li>• E-certification for all Awardees</li>
                                                            <li>• E-badge of Honor</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Acceptance Checkbox */}
                                        <label className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${watch("acceptedTerms") ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'}`}>
                                            <input
                                                type="checkbox"
                                                {...register("acceptedTerms")}
                                                className="w-5 h-5 mt-0.5 rounded bg-slate-700 border-slate-600 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
                                            />
                                            <span className="text-white">
                                                I have read all the details and wish to proceed with nominations.
                                                <span className="text-amber-400 ml-1">*</span>
                                            </span>
                                        </label>
                                        {errors.acceptedTerms && <p className="text-red-400 text-sm">{errors.acceptedTerms.message}</p>}
                                    </div>
                                )}

                                {/* STEP 2: PERSONAL DETAILS */}
                                {step === 2 && (
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <LuxuryInput label="First Name" required {...register("firstName")} error={errors.firstName?.message} placeholder="Enter your first name" />
                                            <LuxuryInput label="Last Name" required {...register("lastName")} error={errors.lastName?.message} placeholder="Enter your last name" />
                                        </div>
                                        <LuxuryInput label="Email Address" type="email" required {...register("email")} error={errors.email?.message} placeholder="you@example.com" />
                                        <LuxuryInput label="Mobile Number" required {...register("phone")} error={errors.phone?.message} placeholder="+1 (XXX) XXX-XXXX" />
                                        <LuxuryInput label="Date of Birth" type="date" required {...register("dob")} error={errors.dob?.message} />
                                    </div>
                                )}

                                {/* STEP 3: PROFESSIONAL PROFILE */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        {/* Nominate As */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-3">
                                                Nominate As <span className="text-amber-400">*</span>
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {["Individual", "Company or Firm"].map(v => (
                                                    <label
                                                        key={v}
                                                        className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all ${nominateAs === v ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'}`}
                                                    >
                                                        <input type="radio" value={v} {...register("nominateAs")} className="sr-only" />
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${nominateAs === v ? 'bg-amber-500/20' : 'bg-slate-700/50'}`}>
                                                            {v === "Individual" ? (
                                                                <svg className={`w-6 h-6 ${nominateAs === v ? 'text-amber-400' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                            ) : (
                                                                <svg className={`w-6 h-6 ${nominateAs === v ? 'text-amber-400' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                                            )}
                                                        </div>
                                                        <span className={`font-semibold ${nominateAs === v ? 'text-white' : 'text-slate-400'}`}>{v}</span>
                                                        {nominateAs === v && (
                                                            <div className="absolute top-3 right-3">
                                                                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                                                            </div>
                                                        )}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Individual Branch */}
                                        {nominateAs === "Individual" && (
                                            <div className="space-y-5 p-5 rounded-xl bg-slate-800/30 border border-slate-700">
                                                <LuxurySelect label="Choose the option that describes you best" required options={INDIVIDUAL_ROLES} {...register("individualRole")} error={errors.individualRole?.message} />
                                                {individualRole === "None of the above" && (
                                                    <LuxuryInput label="Please specify" required {...register("individualRoleOther")} placeholder="Enter your role" />
                                                )}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <LuxuryInput label="Highest Education" {...register("highestEducation")} placeholder="e.g. LLB, JD, BCL" />
                                                    <LuxuryInput label="University/Institute" {...register("educationInstitute")} placeholder="Name of institution" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                    <LuxurySelect label="Dual Qualified?" options={["Yes", "No"]} {...register("dualQualified")} />
                                                    <LuxuryInput label="Year Called to Bar" type="number" {...register("barYear")} placeholder="YYYY" />
                                                    <LuxuryInput label="Which Bar?" {...register("barName")} placeholder="e.g. NY Bar" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Firm Branch */}
                                        {nominateAs === "Company or Firm" && (
                                            <div className="space-y-5 p-5 rounded-xl bg-slate-800/30 border border-slate-700">
                                                <LuxurySelect label="Choose the option that describes you best" required options={FIRM_TYPES} {...register("firmType")} error={errors.firmType?.message} />
                                                {firmType === "None of the above" && (
                                                    <LuxuryInput label="Please specify" required {...register("firmTypeOther")} placeholder="Enter your organization type" />
                                                )}
                                            </div>
                                        )}

                                        {/* Common Fields */}
                                        {nominateAs && (
                                            <div className="space-y-5">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <LuxuryInput label="Organization/Firm Name" {...register("orgName")} placeholder="Name of your company" />
                                                    <LuxuryInput label="Current Position/Designation" {...register("currentPosition")} placeholder="e.g. Partner, Senior Associate" />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-300 mb-3">Time in Current Position</label>
                                                        <div className="space-y-2">
                                                            {TENURE_OPTIONS.map(opt => (
                                                                <label key={opt} className="flex items-center gap-3 text-sm cursor-pointer group">
                                                                    <input type="radio" value={opt} {...register("positionTenure")} className="w-4 h-4 text-amber-500 bg-slate-700 border-slate-600 focus:ring-amber-500" />
                                                                    <span className="text-slate-400 group-hover:text-slate-300">{opt}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-300 mb-3">Total Years in Practice/Business</label>
                                                        <div className="space-y-2">
                                                            {TENURE_OPTIONS.map(opt => (
                                                                <label key={opt} className="flex items-center gap-3 text-sm cursor-pointer group">
                                                                    <input type="radio" value={opt} {...register("totalYearsPractice")} className="w-4 h-4 text-amber-500 bg-slate-700 border-slate-600 focus:ring-amber-500" />
                                                                    <span className="text-slate-400 group-hover:text-slate-300">{opt}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <LuxuryInput label="Website" {...register("website")} placeholder="https://www.example.com" />
                                                <LuxuryInput label="Previous Legal Awards Received" {...register("awardsReceived")} placeholder="List any previous awards (optional)" />

                                                {/* Address */}
                                                <div className="pt-5 border-t border-slate-700">
                                                    <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                        Address
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                        <LuxuryInput label="City" required {...register("addressCity")} error={errors.addressCity?.message} placeholder="City" />
                                                        <LuxuryInput label="State/Province" required {...register("addressState")} error={errors.addressState?.message} placeholder="State" />
                                                        <LuxurySelect label="Country" required options={COUNTRIES} {...register("addressCountry")} error={errors.addressCountry?.message} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* STEP 4: PRACTICE AREAS */}
                                {step === 4 && (
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-slate-300">
                                                Select your Key Practice Areas <span className="text-amber-400">*</span>
                                                <span className="text-slate-500 font-normal ml-2">(maximum 3)</span>
                                            </label>
                                            <span className={`text-sm font-semibold ${watchPracticeAreas.length === 3 ? 'text-amber-400' : 'text-slate-500'}`}>
                                                {watchPracticeAreas.length}/3
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                                            {PRACTICE_AREAS.map(area => {
                                                const isSelected = watchPracticeAreas.includes(area);
                                                const isDisabled = watchPracticeAreas.length >= 3 && !isSelected;
                                                return (
                                                    <label
                                                        key={area}
                                                        className={`flex items-center gap-2 p-3 rounded-lg text-sm cursor-pointer transition-all ${isSelected ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : isDisabled ? 'text-slate-600 cursor-not-allowed opacity-50' : 'text-slate-400 hover:bg-slate-700/50 border border-transparent'}`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            disabled={isDisabled}
                                                            onChange={(e) => {
                                                                if (e.target.checked && watchPracticeAreas.length < 3) {
                                                                    setValue("practiceAreas", [...watchPracticeAreas, area]);
                                                                } else if (!e.target.checked) {
                                                                    setValue("practiceAreas", watchPracticeAreas.filter(x => x !== area));
                                                                }
                                                            }}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-amber-500' : 'border border-slate-600'}`}>
                                                            {isSelected && <Check className="w-3 h-3 text-slate-900" />}
                                                        </div>
                                                        <span className="truncate">{area}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        {errors.practiceAreas && <p className="text-red-400 text-sm">{errors.practiceAreas.message}</p>}
                                    </div>
                                )}

                                {/* STEP 5: ESSAYS */}
                                {step === 5 && (
                                    <div className="space-y-6">
                                        <LuxuryTextArea
                                            label="Tell us about your Overall Reach as a Legal Professional"
                                            required
                                            hint="Include details about your Education, Experience, Key Practice Areas and examples of important cases or disputes."
                                            {...register("essayReach")}
                                            error={errors.essayReach?.message}
                                        />
                                        <LuxuryTextArea
                                            label="Tell us about your Achievements and Industry Impact"
                                            required
                                            hint="Include details and examples pertaining to your achievements and their impacts."
                                            {...register("essayAchievements")}
                                            error={errors.essayAchievements?.message}
                                        />
                                        <LuxuryTextArea
                                            label="How Innovative is your approach?"
                                            required
                                            hint="Share examples of your innovative approach of handling legal matters that benefited your clients or your company."
                                            {...register("essayInnovation")}
                                            error={errors.essayInnovation?.message}
                                        />
                                        <LuxuryTextArea
                                            label="How do you keep yourself Future-Proof?"
                                            required
                                            hint="Discuss your efforts for continuous professional development, adapting to new technologies, and keeping yourself relevant."
                                            {...register("essayFuture")}
                                            error={errors.essayFuture?.message}
                                        />

                                        {/* File Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Upload Documents (CV/Profile)
                                                <span className="text-slate-500 font-normal ml-2">Optional</span>
                                            </label>
                                            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-amber-500/50 transition-all cursor-pointer bg-slate-800/20 group">
                                                <UploadCloud className="w-10 h-10 mx-auto text-slate-500 mb-3 group-hover:text-amber-400 transition-colors" />
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
                                        <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-all font-medium">
                                            <ChevronLeft className="w-4 h-4" /> Back
                                        </button>
                                    ) : <div />}

                                    {step < 5 ? (
                                        <button type="button" onClick={handleNext} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all">
                                            Continue <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all disabled:opacity-50">
                                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                            {isSubmitting ? "Submitting..." : "Submit & Pay"}
                                        </button>
                                    )}
                                </div>
                            </form>
                        ) : step === 6 && !isComplete ? (
                            /* PAYMENT STEP */
                            <div>
                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                                        <Trophy className="w-10 h-10 text-amber-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Nomination Fee</h3>
                                    <p className="text-4xl font-bold text-amber-400 mb-2">$50.00 <span className="text-lg text-slate-400 font-normal">USD</span></p>
                                    <p className="text-slate-400 text-sm">Fully refundable if not selected</p>
                                </div>

                                {clientSecret && stripePromise ? (
                                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#f59e0b', colorBackground: '#1e293b', colorText: '#f1f5f9' } } }}>
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
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-3">Nomination Submitted!</h2>
                                <p className="text-slate-400 max-w-md mx-auto mb-8">
                                    Thank you for your nomination. Our Awards Committee will review your application and contact you via email with your detailed scorecard.
                                </p>
                                <a href="/dubai-2026" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all">
                                    Back to Event Page
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-600 text-xs mt-8">
                    © 2024 LexTalk World. All rights reserved. Powered by ClickAway Creators.
                </p>
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245,158,11,0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245,158,11,0.5);
        }
      `}</style>
        </div>
    );
}

// --- LUXURY FORM COMPONENTS ---
const LuxuryInput = ({ label, required, error, ...props }: any) => (
    <div>
        {label && (
            <label className="block text-sm font-medium text-slate-300 mb-2">
                {label} {required && <span className="text-amber-400">*</span>}
            </label>
        )}
        <input
            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-700'} text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all`}
            {...props}
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
);

const LuxurySelect = ({ label, required, options, error, ...props }: any) => (
    <div>
        {label && (
            <label className="block text-sm font-medium text-slate-300 mb-2">
                {label} {required && <span className="text-amber-400">*</span>}
            </label>
        )}
        <select
            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-700'} text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all appearance-none`}
            {...props}
        >
            <option value="" className="bg-slate-900">Please Select</option>
            {options.map((o: string) => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
        </select>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
);

const LuxuryTextArea = ({ label, required, error, hint, ...props }: any) => (
    <div>
        {label && (
            <label className="block text-sm font-medium text-slate-300 mb-1">
                {label} {required && <span className="text-amber-400">*</span>}
            </label>
        )}
        {hint && <p className="text-slate-500 text-xs mb-2">{hint}</p>}
        <textarea
            rows={5}
            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-700'} text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none`}
            {...props}
        />
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
            <button
                disabled={!stripe || loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trophy className="w-5 h-5" />}
                {loading ? "Processing..." : "Pay $50.00 USD"}
            </button>
            {msg && <p className="text-red-400 text-center text-sm">{msg}</p>}
        </form>
    );
}
