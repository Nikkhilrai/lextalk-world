"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, Check, Award, ArrowRight, Star, Trophy } from "lucide-react";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

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

    const stepLabels = ["Terms", "Personal", "Professional", "Expertise", "Essays", "Payment"];

    return (
        <div className="bg-slate-900 min-h-screen">
            {/* Header */}
            <div className="pt-32 pb-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Award Nomination</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                    Global Legal Honour <span className="text-amber-500">2026</span> Dubai
                </h1>
                <p className="text-slate-400">Dubai Award Nomination Form</p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto px-4 mb-6">
                <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">Step {step} of {totalSteps}</span>
                        <span className="text-sm text-amber-400 font-medium">{Math.round((step / totalSteps) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
                    </div>
                    <div className="flex justify-between">
                        {stepLabels.map((label, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all ${i + 1 < step ? 'bg-amber-500 text-slate-900' :
                                        i + 1 === step ? 'bg-amber-500 text-slate-900 ring-4 ring-amber-500/30' :
                                            'bg-slate-700 text-slate-400'
                                    }`}>
                                    {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`text-xs hidden md:block ${i + 1 <= step ? 'text-amber-400' : 'text-slate-500'}`}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="max-w-4xl mx-auto px-4 pb-12">
                <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="bg-slate-800 px-6 py-4 border-b border-slate-700/50">
                        <h2 className="text-lg font-semibold text-white">Step {step}: {stepLabels[step - 1]}</h2>
                    </div>

                    <div className="p-6 md:p-8">
                        {!isComplete && step < 6 ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* STEP 1: FULL TERMS & CONDITIONS */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <p className="text-slate-400 text-sm">All fields marked with <span className="text-amber-400">*</span> are required.</p>

                                        <div className="bg-slate-900/50 rounded-xl border border-slate-700/50 p-6 max-h-[500px] overflow-y-auto custom-scrollbar space-y-6">
                                            {/* Step 1 */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-slate-900 text-xs font-bold">1</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">Terms & Conditions</h3>
                                                </div>
                                                <ul className="ml-9 space-y-2 text-slate-300 text-sm">
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-0.5">•</span>
                                                        <span>All awardees are required to be physically or virtually present at the event to receive the Award. In case the Awardee is not able to attend, they can send a person on their behalf.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-0.5">•</span>
                                                        <span>Filling in the nomination form only does not ensure that you will be selected for the Award.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-0.5">•</span>
                                                        <span>The Awardees will be selected on the basis of parameters set by our Awards Committee and will be intimated accordingly.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-0.5">•</span>
                                                        <span>In case you do not win the award nomination, the nomination fee <span className="text-amber-400 font-semibold">USD 50</span> is completely refundable.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-0.5">•</span>
                                                        <span>All Awardees will need to book the Awardee pass to attend the conference and receive their award.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-0.5">•</span>
                                                        <span>The decision of the Awards Committee will be final and binding.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-0.5">•</span>
                                                        <span>LexTalk World and Legal Honour are brought to you by Canada-based firm; ClickAway Creators (A division of CAC Media & Events) which reserves the right to make any changes to the event.</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Step 2 */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-slate-900 text-xs font-bold">2</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">Evaluation Process</h3>
                                                </div>
                                                <p className="ml-9 text-slate-300 text-sm">Based on your answers and our own research, our Awards Committee rates you on different parameters such as the overall reach, impact on the legal industry, knowledge and market demand, innovative ideas and suggestions, futuristic spirit and approach, etc.</p>
                                            </div>

                                            {/* Step 3 */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-slate-900 text-xs font-bold">3</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">Scoring & Scorecard</h3>
                                                </div>
                                                <p className="ml-9 text-slate-300 text-sm">Once the Awards Committee completes the evaluation, they will share a detailed scorecard with each nominee via email. They follow a scoring procedure and give you a score out of 100. The cut-off to qualify is <span className="text-amber-400 font-semibold">80 points out of 100</span>.</p>
                                            </div>

                                            {/* Step 4 */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-slate-900 text-xs font-bold">4</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">Outcome</h3>
                                                </div>
                                                <div className="ml-9 space-y-3">
                                                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                                                        <p className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                                                            <Trophy className="w-4 h-4" /> Winner
                                                        </p>
                                                        <p className="text-slate-300 text-sm mb-3">We will reach out to you to confirm you as a winner at the LexTalk World conference and get you signed up for the Awardee pass.</p>
                                                        <div className="text-sm space-y-1">
                                                            <p className="text-slate-400">Middle East Conference Pass Fees:</p>
                                                            <p className="text-slate-300">• Standard Virtual Awardee Pass: <span className="text-amber-400 font-semibold">USD 800</span></p>
                                                            <p className="text-slate-300">• Standard In-Person Awardee Pass: <span className="text-amber-400 font-semibold">USD 1200</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
                                                        <p className="text-slate-300 font-semibold mb-1">Fail to make the cut</p>
                                                        <p className="text-slate-400 text-sm">We will issue a full refund of the nomination fee (USD 50).</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Step 5 */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-slate-900 text-xs font-bold">5</span>
                                                    </div>
                                                    <h3 className="text-white font-semibold">Event Day</h3>
                                                </div>
                                                <p className="ml-9 text-slate-300 text-sm">You attend the event, accept the award, and be a part of great sessions, while also networking with your peers!</p>
                                            </div>

                                            {/* Benefits Grid */}
                                            <div className="border-t border-slate-700/50 pt-6">
                                                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-amber-400" />
                                                    Standard Awardee Pass Benefits
                                                </h3>
                                                <div className="grid md:grid-cols-3 gap-4">
                                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                        <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">Pre-Conference</p>
                                                        <ul className="space-y-2 text-slate-300 text-xs">
                                                            <li>• Opportunity to write an article; promoted on social media and website</li>
                                                            <li>• Article in Jurisprudence e-Magazine by Global Lawyers Association</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                        <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">During Conference</p>
                                                        <ul className="space-y-2 text-slate-300 text-xs">
                                                            <li>• Announcement of Awardees for each category</li>
                                                            <li>• Full event participation with networking</li>
                                                            <li>• Awardees listing in event show guide</li>
                                                            <li>• Mic Time on the stage</li>
                                                            <li>• Award plaque from Guest of Honor</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                                        <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">Post-Conference</p>
                                                        <ul className="space-y-2 text-slate-300 text-xs">
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
                                        <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${watch("acceptedTerms") ? 'border-amber-500 bg-amber-500/10' : 'border-slate-600 hover:border-slate-500 bg-slate-800/30'}`}>
                                            <input type="checkbox" {...register("acceptedTerms")} className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-amber-500 focus:ring-amber-500" />
                                            <span className="text-white">I have read all the details and wish to proceed with nominations. <span className="text-amber-400">*</span></span>
                                        </label>
                                        {errors.acceptedTerms && <p className="text-red-400 text-sm">{errors.acceptedTerms.message}</p>}
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
                                            <label className="block text-sm font-medium text-slate-300 mb-3">Nominate As <span className="text-amber-400">*</span></label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {["Individual", "Company or Firm"].map(v => (
                                                    <label key={v} className={`relative flex items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all ${nominateAs === v ? 'border-amber-500 bg-amber-500/10' : 'border-slate-600 hover:border-slate-500 bg-slate-800/30'}`}>
                                                        <input type="radio" value={v} {...register("nominateAs")} className="sr-only" />
                                                        <span className={`font-semibold ${nominateAs === v ? 'text-amber-400' : 'text-slate-300'}`}>{v}</span>
                                                        {nominateAs === v && <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-amber-400" />}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {nominateAs === "Individual" && (
                                            <div className="space-y-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
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
                                            <div className="space-y-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
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
                                            <label className="text-sm font-medium text-slate-300">Select up to 3 Practice Areas <span className="text-amber-400">*</span></label>
                                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${watchPracticeAreas.length === 3 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'}`}>{watchPracticeAreas.length}/3</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[350px] overflow-y-auto p-2 bg-slate-900/50 rounded-xl border border-slate-700/50">
                                            {PRACTICE_AREAS.map(area => {
                                                const isSelected = watchPracticeAreas.includes(area);
                                                const isDisabled = watchPracticeAreas.length >= 3 && !isSelected;
                                                return (
                                                    <label key={area} className={`flex items-center gap-2 p-3 rounded-lg text-sm cursor-pointer transition-all ${isSelected ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : isDisabled ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:bg-slate-700/50 border border-transparent'}`}>
                                                        <input type="checkbox" checked={isSelected} disabled={isDisabled}
                                                            onChange={(e) => {
                                                                if (e.target.checked && watchPracticeAreas.length < 3) setValue("practiceAreas", [...watchPracticeAreas, area]);
                                                                else if (!e.target.checked) setValue("practiceAreas", watchPracticeAreas.filter(x => x !== area));
                                                            }} className="sr-only" />
                                                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-amber-500' : 'border border-slate-500'}`}>
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
                                    <div className="space-y-5">
                                        <TextArea label="Tell us about your Overall Reach as a Legal Professional" required hint="Include details about your Education, Experience, Key Practice Areas and examples of important cases or disputes." {...register("essayReach")} error={errors.essayReach?.message} />
                                        <TextArea label="Tell us about your Achievements and Industry Impact" required hint="Include details and examples pertaining to your achievements and their impacts." {...register("essayAchievements")} error={errors.essayAchievements?.message} />
                                        <TextArea label="How Innovative is your approach?" required hint="Share examples of your innovative approach that benefited your clients or company." {...register("essayInnovation")} error={errors.essayInnovation?.message} />
                                        <TextArea label="How do you keep yourself Future-Proof?" required hint="Discuss your efforts for continuous professional development and adapting to new technologies." {...register("essayFuture")} error={errors.essayFuture?.message} />
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Upload Documents <span className="text-slate-500">(Optional)</span></label>
                                            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-amber-500/50 transition-colors cursor-pointer bg-slate-800/30">
                                                <UploadCloud className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                                                <p className="text-slate-400 text-sm">Click to browse or drag files here</p>
                                                <p className="text-slate-600 text-xs mt-1">PDF, DOC, DOCX up to 10MB</p>
                                                <input type="file" className="hidden" {...register("files")} accept=".pdf,.doc,.docx" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between pt-6 border-t border-slate-700/50">
                                    {step > 1 ? (
                                        <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/50 transition-colors font-medium">
                                            <ChevronLeft className="w-4 h-4" /> Back
                                        </button>
                                    ) : <div />}
                                    {step < 5 ? (
                                        <button type="button" onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all">
                                            Continue <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50">
                                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                                            {isSubmitting ? "Submitting..." : "Submit & Pay $50"}
                                        </button>
                                    )}
                                </div>
                            </form>
                        ) : step === 6 && !isComplete ? (
                            <div>
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                                        <Trophy className="w-8 h-8 text-amber-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Nomination Fee: $50.00 USD</h3>
                                    <p className="text-slate-400">Fully refundable if not selected</p>
                                </div>
                                {clientSecret && stripePromise ? (
                                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#f59e0b' } } }}>
                                        <PaymentForm onSuccess={() => setIsComplete(true)} />
                                    </Elements>
                                ) : <p className="text-center text-red-400">Payment error. Contact support.</p>}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">Nomination Submitted!</h2>
                                <p className="text-slate-400 max-w-md mx-auto mb-8">Thank you for your nomination. Our Awards Committee will review your application and contact you via email.</p>
                                <a href="/dubai-2026" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold">Back to Event Page</a>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-center text-slate-600 text-xs mt-8">© 2024 LexTalk World. All rights reserved.</p>
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245,158,11,0.5); }
      `}</style>
        </div>
    );
}

// --- FORM COMPONENTS (Website Theme) ---
const Input = ({ label, required, error, ...props }: any) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">{label} {required && <span className="text-amber-400">*</span>}</label>
        <input className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-600'} text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all`} {...props} />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
);

const Select = ({ label, required, options, error, ...props }: any) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">{label} {required && <span className="text-amber-400">*</span>}</label>
        <select className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-600'} text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all`} {...props}>
            <option value="" className="bg-slate-900">Select</option>
            {options.map((o: string) => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
        </select>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
);

const TextArea = ({ label, required, error, hint, ...props }: any) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">{label} {required && <span className="text-amber-400">*</span>}</label>
        {hint && <p className="text-slate-500 text-xs mb-2">{hint}</p>}
        <textarea rows={4} className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-600'} text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none`} {...props} />
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
        const { error } = await stripe.confirmPayment({ elements, confirmParams: { return_url: window.location.origin + "/awards" }, redirect: "if_required" });
        if (error) setMsg(error.message || "Payment failed");
        else onSuccess();
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <button disabled={!stripe || loading} className="w-full py-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trophy className="w-5 h-5" />}
                {loading ? "Processing..." : "Pay $50.00 USD"}
            </button>
            {msg && <p className="text-red-400 text-center text-sm">{msg}</p>}
        </form>
    );
}
