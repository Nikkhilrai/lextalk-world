"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, Check, Award, ArrowRight, Star, Trophy, CreditCard, Lock } from "lucide-react";
import Image from "next/image";
import Script from "next/script";



// --- OPTIONS ---
const INDIVIDUAL_ROLES = [
    "Independent Lawyer/Advocate", "Lawyer in a Law Firm", "In-House Lawyer", "Compliance Expert",
    "IP Expert", "Data Privacy/Cyber Security Professional", "Legal Tech Expert",
    "Government Official/Representative", "Legal Business Consultant", "None of the above"
];

const FIRM_TYPES = ["Law Firm", "In-House Legal Department", "Legal Tech Company", "None of the above"];
const TENURE_OPTIONS = ["Less than 3 Years", "3 to 5 Years", "5 to 10 Years", "10 to 20 Years", "20+ Years"];

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
    "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bahrain", "Bangladesh",
    "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia", "Czech Republic", "Denmark", "Egypt",
    "Finland", "France", "Germany", "Ghana", "Greece", "Hong Kong", "Hungary", "India", "Indonesia",
    "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya", "Kuwait", "Lebanon", "Malaysia", "Mexico",
    "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Philippines",
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa",
    "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Vietnam", "Other"
];

// --- SCHEMA ---
const nominationSchema = z.object({
    acceptedTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms to proceed." }) }),
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(5, "Required"),
    dob: z.string().min(1, "Required"),
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
    addressCity: z.string().min(1, "Required"),
    addressState: z.string().min(1, "Required"),
    addressCountry: z.string().min(1, "Required"),
    practiceAreas: z.array(z.string()).min(1, "Select at least 1").max(3, "Maximum 3"),
    essayReach: z.string().min(10, "Please provide more detail"),
    essayAchievements: z.string().min(10, "Please provide more detail"),
    essayInnovation: z.string().min(10, "Please provide more detail"),
    essayFuture: z.string().min(10, "Please provide more detail"),
    files: z.any().optional(),
});

type FormValues = z.infer<typeof nominationSchema>;

export function NominationForm() {
    const [step, setStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);

    // Payment State
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [inrRate, setInrRate] = useState<number | null>(null);
    const [nominationId, setNominationId] = useState<string | null>(null);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch exchange rate
        fetch("/api/currency/convert")
            .then(res => res.json())
            .then(data => setInrRate(data.rate))
            .catch(() => setInrRate(84.0)); // Fallback
    }, []);

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
                category: "Legal Honor Global 2026",
                nominatorEmail: data.email,
                nominatorPhone: data.phone,
                nomineeName: `${data.firstName} ${data.lastName}`,
                nomineeEmail: data.email,
                formResponse: data
            };
            const res = await fetch("/api/nominate", { method: "POST", body: JSON.stringify(payload) });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setNominationId(json.nominationId);
            setStep(6);
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    };

    const stepLabels = ["Terms", "Personal", "Professional", "Expertise", "Essays", "Payment"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
            {/* Header with Logo */}
            <div className="pt-40 pb-6 text-center">
                <div className="flex justify-center mb-6">
                    <Image src="/logo/Lextalk-Logo.png" alt="LexTalk World" width={200} height={50} className="h-12 w-auto" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-2">
                    Legal Honor Global <span className="text-amber-600">2026</span> Dubai
                </h1>
                <p className="text-slate-500">Dubai Award Nomination Form</p>
            </div>

            {/* Beautiful Progress Bar */}
            <div className="max-w-4xl mx-auto px-4 mb-8">
                <div className="bg-white rounded-2xl shadow-lg shadow-amber-100/50 p-6 border border-amber-100">
                    {/* Step Labels */}
                    <div className="flex justify-between items-center mb-4">
                        {stepLabels.map((label, i) => (
                            <div key={i} className="flex flex-col items-center flex-1">
                                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i + 1 < step
                                    ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-300/50'
                                    : i + 1 === step
                                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-400/50 ring-4 ring-amber-100 scale-110'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {i + 1 < step ? <Check className="w-5 h-5" /> : i + 1}
                                </div>
                                <span className={`text-xs mt-2 font-medium hidden md:block ${i + 1 <= step ? 'text-amber-600' : 'text-slate-400'
                                    }`}>{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Connecting Lines Progress */}
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                        />
                        {/* Animated shimmer */}
                        <div
                            className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"
                            style={{ left: `${((step - 1) / (totalSteps - 1)) * 100 - 5}%` }}
                        />
                    </div>

                    <div className="flex justify-between mt-3">
                        <span className="text-sm text-slate-500">Step {step} of {totalSteps}</span>
                        <span className="text-sm font-semibold text-amber-600">{Math.round((step / totalSteps) * 100)}% Complete</span>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="max-w-4xl mx-auto px-4 pb-12">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">{step}</span>
                            {stepLabels[step - 1]}
                        </h2>
                    </div>

                    <div className="p-6 md:p-8">
                        {!isComplete && step < 6 ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* STEP 1: FULL TERMS & CONDITIONS */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <p className="text-slate-500 text-sm">All fields marked with <span className="text-red-500">*</span> are required.</p>

                                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 max-h-[450px] overflow-y-auto space-y-6">
                                            {/* Step 1 */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                                        <span className="text-white text-xs font-bold">1</span>
                                                    </div>
                                                    <h3 className="text-slate-800 font-semibold">Terms & Conditions</h3>
                                                </div>
                                                <ul className="ml-9 space-y-2 text-slate-600 text-sm">
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-500 mt-0.5">•</span>
                                                        <span>All awardees are required to be physically or virtually present at the event to receive the Award. In case the Awardee is not able to attend, they can send a person on their behalf.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-500 mt-0.5">•</span>
                                                        <span>Filling in the nomination form only does not ensure that you will be selected for the Award.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-500 mt-0.5">•</span>
                                                        <span>The Awardees will be selected on the basis of parameters set by our Awards Committee and will be intimated accordingly.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-500 mt-0.5">•</span>
                                                        <span>In case you do not win the award nomination, the nomination fee <span className="text-amber-600 font-semibold">USD 50</span> is completely refundable.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-500 mt-0.5">•</span>
                                                        <span>All Awardees will need to book the Awardee pass to attend the conference and receive their award.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-500 mt-0.5">•</span>
                                                        <span>The decision of the Awards Committee will be final and binding.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-500 mt-0.5">•</span>
                                                        <span>LexTalk World and Legal Honor Global are brought to you by Canada-based firm; ClickAway Creators (A division of CAC Media & Events) which reserves the right to make any changes to the event.</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Step 2 */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                                        <span className="text-white text-xs font-bold">2</span>
                                                    </div>
                                                    <h3 className="text-slate-800 font-semibold">Evaluation Process</h3>
                                                </div>
                                                <p className="ml-9 text-slate-600 text-sm">Based on your answers and our own research, our Awards Committee rates you on different parameters such as the overall reach, impact on the legal industry, knowledge and market demand, innovative ideas and suggestions, futuristic spirit and approach, etc.</p>
                                            </div>

                                            {/* Step 3 */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                                        <span className="text-white text-xs font-bold">3</span>
                                                    </div>
                                                    <h3 className="text-slate-800 font-semibold">Scoring & Scorecard</h3>
                                                </div>
                                                <p className="ml-9 text-slate-600 text-sm">Once the Awards Committee completes the evaluation, they will share a detailed scorecard with each nominee via email. They follow a scoring procedure and give you a score out of 100. The cut-off to qualify is <span className="text-amber-600 font-semibold">80 points out of 100</span>.</p>
                                            </div>

                                            {/* Step 4 */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                                        <span className="text-white text-xs font-bold">4</span>
                                                    </div>
                                                    <h3 className="text-slate-800 font-semibold">Outcome</h3>
                                                </div>
                                                <div className="ml-9 space-y-3">
                                                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                                        <p className="text-emerald-700 font-semibold mb-2 flex items-center gap-2">
                                                            <Trophy className="w-4 h-4" /> Winner
                                                        </p>
                                                        <p className="text-slate-600 text-sm mb-3">We will reach out to you to confirm you as a winner at the LexTalk World conference and get you signed up for the Awardee pass.</p>
                                                        <div className="text-sm space-y-1 bg-white/50 rounded-lg p-3">
                                                            <p className="text-slate-500">Middle East Conference Pass Fees:</p>
                                                            <p className="text-slate-700">• Standard Virtual Awardee Pass: <span className="text-amber-600 font-semibold">USD 800</span></p>
                                                            <p className="text-slate-700">• Standard In-Person Awardee Pass: <span className="text-amber-600 font-semibold">USD 1200</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-slate-100 border border-slate-200 rounded-xl p-4">
                                                        <p className="text-slate-700 font-semibold mb-1">Fail to make the cut</p>
                                                        <p className="text-slate-500 text-sm">We will issue a full refund of the nomination fee (USD 50).</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Step 5 */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                                        <span className="text-white text-xs font-bold">5</span>
                                                    </div>
                                                    <h3 className="text-slate-800 font-semibold">Event Day</h3>
                                                </div>
                                                <p className="ml-9 text-slate-600 text-sm">You attend the event, accept the award, and be a part of great sessions, while also networking with your peers!</p>
                                            </div>

                                            {/* Benefits Grid */}
                                            <div className="border-t border-slate-200 pt-6">
                                                <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-amber-500" />
                                                    Standard Awardee Pass Benefits
                                                </h3>
                                                <div className="grid md:grid-cols-3 gap-4">
                                                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                                                        <p className="text-amber-600 text-xs font-semibold uppercase tracking-wider mb-3">Pre-Conference</p>
                                                        <ul className="space-y-2 text-slate-600 text-xs">
                                                            <li>• Opportunity to write an article; promoted on social media and website</li>
                                                            <li>• Article in Jurisprudence e-Magazine by Global Lawyers Association</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                                                        <p className="text-amber-600 text-xs font-semibold uppercase tracking-wider mb-3">During Conference</p>
                                                        <ul className="space-y-2 text-slate-600 text-xs">
                                                            <li>• Announcement of Awardees for each category</li>
                                                            <li>• Full event participation with networking</li>
                                                            <li>• Awardees listing in event show guide</li>
                                                            <li>• Mic Time on the stage</li>
                                                            <li>• Award plaque from Guest of Honor</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                                                        <p className="text-amber-600 text-xs font-semibold uppercase tracking-wider mb-3">Post-Conference</p>
                                                        <ul className="space-y-2 text-slate-600 text-xs">
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
                                        <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${watch("acceptedTerms") ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300 bg-white'}`}>
                                            <input type="checkbox" {...register("acceptedTerms")} className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500" />
                                            <span className="text-slate-700">I have read all the details and wish to proceed with nominations. <span className="text-red-500">*</span></span>
                                        </label>
                                        {errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms.message}</p>}
                                    </div>
                                )}

                                {/* STEP 2: PERSONAL DETAILS */}
                                {step === 2 && (
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <Input label="First Name" required {...register("firstName")} error={errors.firstName?.message} />
                                            <Input label="Last Name" required {...register("lastName")} error={errors.lastName?.message} />
                                        </div>
                                        <Input label="Email Address" type="email" required {...register("email")} error={errors.email?.message} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <Input label="Phone Number" required {...register("phone")} error={errors.phone?.message} />
                                            <Input label="Date of Birth" type="date" required {...register("dob")} error={errors.dob?.message} />
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: PROFESSIONAL PROFILE */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-3">Nominate As <span className="text-red-500">*</span></label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {["Individual", "Company or Firm"].map(v => (
                                                    <label key={v} className={`relative flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${nominateAs === v ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300 bg-white'}`}>
                                                        <input type="radio" value={v} {...register("nominateAs")} className="sr-only" />
                                                        <span className={`font-semibold ${nominateAs === v ? 'text-amber-600' : 'text-slate-600'}`}>{v}</span>
                                                        {nominateAs === v && <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-amber-500" />}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {nominateAs === "Individual" && (
                                            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                <Select label="Choose the option that describes you best" required options={INDIVIDUAL_ROLES} {...register("individualRole")} />
                                                {individualRole === "None of the above" && <Input label="Please specify" required {...register("individualRoleOther")} />}
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <Input label="Highest Education" {...register("highestEducation")} placeholder="e.g. LLB, JD" />
                                                    <Input label="University/Institute" {...register("educationInstitute")} />
                                                </div>
                                                <div className="grid md:grid-cols-3 gap-4">
                                                    <Select label="Dual Qualified?" options={["Yes", "No"]} {...register("dualQualified")} />
                                                    <Input label="Year Called to Bar" type="number" {...register("barYear")} />
                                                    <Input label="Which Bar?" {...register("barName")} />
                                                </div>
                                            </div>
                                        )}

                                        {nominateAs === "Company or Firm" && (
                                            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                <Select label="Choose the option that describes you best" required options={FIRM_TYPES} {...register("firmType")} />
                                                {firmType === "None of the above" && <Input label="Please specify" required {...register("firmTypeOther")} />}
                                            </div>
                                        )}

                                        {nominateAs && (
                                            <div className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <Input label="Organization/Firm Name" {...register("orgName")} />
                                                    <Input label="Current Position" {...register("currentPosition")} />
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <Select label="Time in Current Position" options={TENURE_OPTIONS} {...register("positionTenure")} />
                                                    <Select label="Total Years in Practice" options={TENURE_OPTIONS} {...register("totalYearsPractice")} />
                                                </div>
                                                <Input label="Website" {...register("website")} placeholder="https://" />
                                                <Input label="Previous Awards Received" {...register("awardsReceived")} />
                                                <div className="grid md:grid-cols-3 gap-4">
                                                    <Input label="City" required {...register("addressCity")} error={errors.addressCity?.message} />
                                                    <Input label="State/Province" required {...register("addressState")} error={errors.addressState?.message} />
                                                    <Select label="Country" required options={COUNTRIES} {...register("addressCountry")} error={errors.addressCountry?.message} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* STEP 4: PRACTICE AREAS */}
                                {step === 4 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-slate-700">Select up to 3 Practice Areas <span className="text-red-500">*</span></label>
                                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${watchPracticeAreas.length === 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{watchPracticeAreas.length}/3</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[350px] overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                                            {PRACTICE_AREAS.map(area => {
                                                const isSelected = watchPracticeAreas.includes(area);
                                                const isDisabled = watchPracticeAreas.length >= 3 && !isSelected;
                                                return (
                                                    <label key={area} className={`flex items-center gap-2 p-3 rounded-lg text-sm cursor-pointer transition-all ${isSelected ? 'bg-amber-100 text-amber-700 border border-amber-300' : isDisabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-amber-50 border border-transparent'}`}>
                                                        <input type="checkbox" checked={isSelected} disabled={isDisabled}
                                                            onChange={(e) => {
                                                                if (e.target.checked && watchPracticeAreas.length < 3) setValue("practiceAreas", [...watchPracticeAreas, area]);
                                                                else if (!e.target.checked) setValue("practiceAreas", watchPracticeAreas.filter(x => x !== area));
                                                            }} className="sr-only" />
                                                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-amber-500' : 'border border-slate-300'}`}>
                                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                                        </div>
                                                        <span className="truncate">{area}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        {errors.practiceAreas && <p className="text-red-500 text-sm">{errors.practiceAreas.message}</p>}
                                    </div>
                                )}

                                {/* STEP 5: ESSAYS */}
                                {step === 5 && (
                                    <div className="space-y-5">
                                        <TextArea label="Tell us about your Overall Reach as a Legal Professional" required hint="Include details about your Education, Experience, Key Practice Areas and examples of important cases or disputes." {...register("essayReach")} error={errors.essayReach?.message} />
                                        <TextArea label="Tell us about your Achievements and Industry Impact" required hint="Include details and examples pertaining to your achievements and their impacts." {...register("essayAchievements")} error={errors.essayAchievements?.message} />
                                        <TextArea label="How Innovative is your approach?" required hint="Share examples of your innovative approach that benefited your clients or company." {...register("essayInnovation")} error={errors.essayInnovation?.message} />
                                        <TextArea label="How do you keep yourself Future-Proof?" required hint="Discuss your efforts for continuous professional development and adapting to new technologies." {...register("essayFuture")} error={errors.essayFuture?.message} />
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Upload Documents <span className="text-slate-400">(Optional)</span></label>
                                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer bg-slate-50">
                                                <UploadCloud className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                                <p className="text-slate-500 text-sm">Click to browse or drag files here</p>
                                                <p className="text-slate-400 text-xs mt-1">PDF, DOC, DOCX up to 10MB</p>
                                                <input type="file" className="hidden" {...register("files")} accept=".pdf,.doc,.docx" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between pt-6 border-t border-slate-100">
                                    {step > 1 ? (
                                        <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors font-medium">
                                            <ChevronLeft className="w-4 h-4" /> Back
                                        </button>
                                    ) : <div />}
                                    {step < 5 ? (
                                        <button type="button" onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:shadow-lg hover:shadow-amber-300/50 transition-all">
                                            Continue <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:shadow-lg hover:shadow-amber-300/50 transition-all disabled:opacity-50">
                                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                                            {isSubmitting ? "Submitting..." : "Submit & Pay $50"}
                                        </button>
                                    )}
                                </div>
                            </form>
                        ) : step === 6 && !isComplete ? (
                            <div>
                                <Script
                                    src="https://checkout.razorpay.com/v1/checkout.js"
                                    onLoad={() => setRazorpayLoaded(true)}
                                />
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Trophy className="w-8 h-8 text-amber-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Nomination Fee: $50.00 USD</h3>
                                    <p className="text-slate-500">Fully refundable if not selected</p>
                                </div>

                                <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                                    <div className="flex items-center gap-2 text-slate-500 mb-6 justify-center">
                                        <Lock size={16} />
                                        <span className="text-sm">Secure Payment via Razorpay</span>
                                    </div>

                                    {paymentError && (
                                        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200 text-center">
                                            {paymentError}
                                        </div>
                                    )}

                                    <div className="space-y-4 max-w-md mx-auto">
                                        {/* International (USD) */}
                                        <button
                                            onClick={async () => {
                                                if (!razorpayLoaded) return;
                                                setProcessingPayment(true);
                                                setPaymentError(null);
                                                try {
                                                    // Create Order
                                                    const orderRes = await fetch("/api/razorpay/create-order", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({ amount: 50, currency: "USD", cartItems: [] }) // Empty cart items for simple payment
                                                    });
                                                    const orderData = await orderRes.json();
                                                    if (!orderRes.ok) throw new Error(orderData.error);

                                                    const options = {
                                                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                                                        amount: orderData.amount,
                                                        currency: orderData.currency,
                                                        name: "LexTalk World",
                                                        description: "Nomination Fee - Legal Honor Global",
                                                        order_id: orderData.orderId,
                                                        handler: async function (response: any) {
                                                            try {
                                                                await fetch("/api/razorpay/verify-nomination", {
                                                                    method: "POST",
                                                                    headers: { "Content-Type": "application/json" },
                                                                    body: JSON.stringify({
                                                                        ...response,
                                                                        nominationId: nominationId,
                                                                        nomineeName: `${watch("firstName")} ${watch("lastName")}`,
                                                                        amount: 50,
                                                                        currency: "USD"
                                                                    })
                                                                });
                                                                setIsComplete(true);
                                                            } catch (err) {
                                                                setPaymentError("Payment verification failed. Please contact support.");
                                                            }
                                                        },
                                                        theme: { color: "#F59E0B" }
                                                    };
                                                    const rzp = new (window as any).Razorpay(options);
                                                    rzp.open();
                                                } catch (err: any) {
                                                    setPaymentError(err.message || "Payment failed");
                                                } finally {
                                                    setProcessingPayment(false);
                                                }
                                            }}
                                            disabled={!razorpayLoaded || processingPayment}
                                            className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
                                        >
                                            <span className="text-xl">🌍</span>
                                            <div className="text-left">
                                                <span className="block text-base">{processingPayment ? "Processing..." : "Pay $50 USD"}</span>
                                                <span className="block text-xs text-blue-200">International Cards</span>
                                            </div>
                                        </button>

                                        {/* India (INR) */}
                                        <button
                                            onClick={async () => {
                                                if (!razorpayLoaded || !inrRate) return;
                                                setProcessingPayment(true);
                                                setPaymentError(null);
                                                const amountINR = Math.round(50 * inrRate);
                                                try {
                                                    // Create Order
                                                    const orderRes = await fetch("/api/razorpay/create-order", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({ amount: amountINR, currency: "INR", cartItems: [] })
                                                    });
                                                    const orderData = await orderRes.json();
                                                    if (!orderRes.ok) throw new Error(orderData.error);

                                                    const options = {
                                                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                                                        amount: orderData.amount,
                                                        currency: orderData.currency,
                                                        name: "LexTalk World",
                                                        description: "Nomination Fee - Legal Honor Global",
                                                        order_id: orderData.orderId,
                                                        handler: async function (response: any) {
                                                            try {
                                                                await fetch("/api/razorpay/verify-nomination", {
                                                                    method: "POST",
                                                                    headers: { "Content-Type": "application/json" },
                                                                    body: JSON.stringify({
                                                                        ...response,
                                                                        nominationId: nominationId,
                                                                        nomineeName: `${watch("firstName")} ${watch("lastName")}`,
                                                                        amount: amountINR,
                                                                        currency: "INR"
                                                                    })
                                                                });
                                                                setIsComplete(true);
                                                            } catch (err) {
                                                                setPaymentError("Payment verification failed. Please contact support.");
                                                            }
                                                        },
                                                        theme: { color: "#16a34a" }
                                                    };
                                                    const rzp = new (window as any).Razorpay(options);
                                                    rzp.open();
                                                } catch (err: any) {
                                                    setPaymentError(err.message || "Payment failed");
                                                } finally {
                                                    setProcessingPayment(false);
                                                }
                                            }}
                                            disabled={!razorpayLoaded || processingPayment || !inrRate}
                                            className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
                                        >
                                            <span className="text-xl">🇮🇳</span>
                                            <div className="text-left">
                                                <span className="block text-base">{processingPayment ? "Processing..." : `Pay ₹${Math.round(50 * (inrRate || 84)).toLocaleString()} INR`}</span>
                                                <span className="block text-xs text-green-200">UPI, Cards, NetBanking</span>
                                            </div>
                                        </button>

                                        <p className="text-center text-xs text-slate-400 mt-4">
                                            1 USD ≈ ₹{inrRate ? inrRate.toFixed(2) : '...'} INR
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-3">Nomination Submitted!</h2>
                                <p className="text-slate-500 max-w-md mx-auto mb-8">Thank you for your nomination. Our Awards Committee will review your application and contact you via email.</p>
                                <a href="/dubai-2026" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold">Back to Event Page</a>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-center text-slate-400 text-xs mt-8">© 2024 LexTalk World. All rights reserved.</p>
            </div>
        </div>
    );
}

// --- FORM COMPONENTS (Light Theme) ---
const Input = ({ label, required, error, ...props }: any) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>
        <input className={`w-full px-4 py-3 rounded-lg bg-white border ${error ? 'border-red-400' : 'border-slate-300'} text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all`} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const Select = ({ label, required, options, error, ...props }: any) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>
        <select className={`w-full px-4 py-3 rounded-lg bg-white border ${error ? 'border-red-400' : 'border-slate-300'} text-slate-800 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all`} {...props}>
            <option value="">Select</option>
            {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const TextArea = ({ label, required, error, hint, ...props }: any) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        {hint && <p className="text-slate-400 text-xs mb-2">{hint}</p>}
        <textarea rows={4} className={`w-full px-4 py-3 rounded-lg bg-white border ${error ? 'border-red-400' : 'border-slate-300'} text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all resize-none`} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);


