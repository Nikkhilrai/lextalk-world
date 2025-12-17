"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, Check, Award, ArrowRight } from "lucide-react";

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

    const stepLabels = ["Terms", "Personal", "Professional", "Practice Areas", "Essays", "Payment"];

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto px-6 py-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        <Award className="w-4 h-4" />
                        <span>Award Nomination</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Global Legal Honour - 2026 Dubai</h1>
                    <p className="text-teal-100 text-lg">Dubai Award Nomination Form</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}: {stepLabels[step - 1]}</span>
                        <span className="text-sm text-teal-600 font-semibold">{Math.round((step / totalSteps) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
                    </div>
                    <div className="flex justify-between mt-3">
                        {stepLabels.map((label, i) => (
                            <div key={i} className={`flex flex-col items-center ${i + 1 <= step ? 'text-teal-600' : 'text-gray-300'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-all ${i + 1 < step ? 'bg-teal-500 text-white' :
                                        i + 1 === step ? 'bg-teal-600 text-white ring-4 ring-teal-100' :
                                            'bg-gray-100 text-gray-400'
                                    }`}>
                                    {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className="text-xs hidden md:block">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="p-6 md:p-10">
                        {!isComplete && step < 6 ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                                {/* STEP 1: TERMS */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <p className="text-gray-500 text-sm">All fields marked with <span className="text-red-500">*</span> are required.</p>

                                        <div className="bg-gray-50 rounded-xl p-6 space-y-6 max-h-[500px] overflow-y-auto">
                                            {/* Step 1 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                                    <span className="w-6 h-6 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
                                                    Terms & Conditions
                                                </h3>
                                                <ul className="space-y-2 text-gray-600 text-sm ml-8">
                                                    <li>• All awardees are required to be physically or virtually present at the event to receive the Award. In case the Awardee is not able to attend, they can send a person on their behalf.</li>
                                                    <li>• Filling in the nomination form only does not ensure that you will be selected for the Award.</li>
                                                    <li>• The Awardees will be selected on the basis of parameters set by our Awards Committee and will be intimated accordingly.</li>
                                                    <li>• In case you do not win the award nomination, the nomination fee <strong className="text-teal-600">USD 50</strong> is completely refundable.</li>
                                                    <li>• All Awardees will need to book the Awardee pass to attend the conference and receive their award.</li>
                                                    <li>• The decision of the Awards Committee will be final and binding.</li>
                                                    <li>• LexTalk World and Legal Honour are brought to you by Canada-based firm; ClickAway Creators (A division of CAC Media & Events) which reserves the right to make any changes to the event.</li>
                                                </ul>
                                            </div>

                                            {/* Step 2 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                                    <span className="w-6 h-6 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
                                                    Evaluation Process
                                                </h3>
                                                <p className="text-gray-600 text-sm ml-8">Based on your answers and our own research, our Awards Committee rates you on different parameters such as the overall reach, impact on the legal industry, knowledge and market demand, innovative ideas and suggestions, futuristic spirit and approach, etc.</p>
                                            </div>

                                            {/* Step 3 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                                    <span className="w-6 h-6 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                                                    Scoring & Scorecard
                                                </h3>
                                                <p className="text-gray-600 text-sm ml-8">Once the Awards Committee completes the evaluation, they will share a detailed scorecard with each nominee via email. They follow a scoring procedure and give you a score out of 100. The cut-off to qualify is <strong className="text-teal-600">80 points out of 100</strong>.</p>
                                            </div>

                                            {/* Step 4 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                                    <span className="w-6 h-6 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">4</span>
                                                    Outcome
                                                </h3>
                                                <div className="ml-8 space-y-3">
                                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                        <p className="font-semibold text-green-700 mb-2">🏆 Winner</p>
                                                        <p className="text-gray-600 text-sm mb-2">We will reach out to you to confirm you as a winner at the LexTalk World conference.</p>
                                                        <div className="text-sm">
                                                            <p className="text-gray-500">Middle East Conference Pass Fees:</p>
                                                            <p className="text-gray-700">• Standard Virtual Awardee Pass: <strong className="text-teal-600">USD 800</strong></p>
                                                            <p className="text-gray-700">• Standard In-Person Awardee Pass: <strong className="text-teal-600">USD 1200</strong></p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-100 rounded-lg p-4">
                                                        <p className="font-semibold text-gray-700 mb-1">Fail to make the cut</p>
                                                        <p className="text-gray-600 text-sm">We will issue a full refund of the nomination fee (USD 50).</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Step 5 */}
                                            <div>
                                                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                                    <span className="w-6 h-6 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">5</span>
                                                    Event Day
                                                </h3>
                                                <p className="text-gray-600 text-sm ml-8">You attend the event, accept the award, and be a part of great sessions, while also networking with your peers!</p>
                                            </div>

                                            {/* Benefits */}
                                            <div className="border-t pt-6">
                                                <h3 className="font-semibold text-gray-800 mb-4">Standard Awardee Pass Benefits</h3>
                                                <div className="grid md:grid-cols-3 gap-4">
                                                    <div className="bg-white rounded-lg p-4 border">
                                                        <p className="text-teal-600 text-xs font-semibold uppercase mb-2">Pre-Conference</p>
                                                        <ul className="text-gray-600 text-xs space-y-1">
                                                            <li>• Opportunity to write an article promoted on social media</li>
                                                            <li>• Article in Jurisprudence e-Magazine</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-4 border">
                                                        <p className="text-teal-600 text-xs font-semibold uppercase mb-2">During Conference</p>
                                                        <ul className="text-gray-600 text-xs space-y-1">
                                                            <li>• Full event participation & networking</li>
                                                            <li>• Mic Time on stage</li>
                                                            <li>• Award plaque from Guest of Honor</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-4 border">
                                                        <p className="text-teal-600 text-xs font-semibold uppercase mb-2">Post-Conference</p>
                                                        <ul className="text-gray-600 text-xs space-y-1">
                                                            <li>• Social Media Announcement</li>
                                                            <li>• E-certification & E-badge of Honor</li>
                                                            <li>• Dedicated Website Section</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Acceptance */}
                                        <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${watch("acceptedTerms") ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-200'}`}>
                                            <input type="checkbox" {...register("acceptedTerms")} className="w-5 h-5 mt-0.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                            <span className="text-gray-700">I have read all the details and wish to proceed with nominations. <span className="text-red-500">*</span></span>
                                        </label>
                                        {errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms.message}</p>}
                                    </div>
                                )}

                                {/* STEP 2: PERSONAL */}
                                {step === 2 && (
                                    <div className="space-y-5">
                                        <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <Input label="First Name" required {...register("firstName")} error={errors.firstName?.message} />
                                            <Input label="Last Name" required {...register("lastName")} error={errors.lastName?.message} />
                                        </div>
                                        <Input label="Email Address" type="email" required {...register("email")} error={errors.email?.message} placeholder="you@example.com" />
                                        <Input label="Mobile Number" required {...register("phone")} error={errors.phone?.message} placeholder="+1 (XXX) XXX-XXXX" />
                                        <Input label="Date of Birth" type="date" required {...register("dob")} error={errors.dob?.message} />
                                    </div>
                                )}

                                {/* STEP 3: PROFESSIONAL */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-800">Professional Profile</h3>

                                        {/* Nominate As */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Nominate As <span className="text-red-500">*</span></label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {["Individual", "Company or Firm"].map(v => (
                                                    <label key={v} className={`relative flex items-center justify-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${nominateAs === v ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-200'}`}>
                                                        <input type="radio" value={v} {...register("nominateAs")} className="sr-only" />
                                                        <span className={`font-medium ${nominateAs === v ? 'text-teal-700' : 'text-gray-600'}`}>{v}</span>
                                                        {nominateAs === v && <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-teal-500" />}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Individual Fields */}
                                        {nominateAs === "Individual" && (
                                            <div className="space-y-5 p-5 bg-gray-50 rounded-xl">
                                                <Select label="Choose the option that describes you best" required options={INDIVIDUAL_ROLES} {...register("individualRole")} />
                                                {individualRole === "None of the above" && <Input label="Please specify" required {...register("individualRoleOther")} />}
                                                <div className="grid md:grid-cols-2 gap-5">
                                                    <Input label="Highest Education" {...register("highestEducation")} placeholder="e.g. LLB, JD" />
                                                    <Input label="University/Institute" {...register("educationInstitute")} />
                                                </div>
                                                <div className="grid md:grid-cols-3 gap-5">
                                                    <Select label="Dual Qualified?" options={["Yes", "No"]} {...register("dualQualified")} />
                                                    <Input label="Year Called to Bar" type="number" {...register("barYear")} placeholder="YYYY" />
                                                    <Input label="Which Bar?" {...register("barName")} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Firm Fields */}
                                        {nominateAs === "Company or Firm" && (
                                            <div className="space-y-5 p-5 bg-gray-50 rounded-xl">
                                                <Select label="Choose the option that describes you best" required options={FIRM_TYPES} {...register("firmType")} />
                                                {firmType === "None of the above" && <Input label="Please specify" required {...register("firmTypeOther")} />}
                                            </div>
                                        )}

                                        {/* Common Fields */}
                                        {nominateAs && (
                                            <div className="space-y-5">
                                                <div className="grid md:grid-cols-2 gap-5">
                                                    <Input label="Organization/Firm Name" {...register("orgName")} />
                                                    <Input label="Current Position" {...register("currentPosition")} />
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-5">
                                                    <Select label="Time in Current Position" options={TENURE_OPTIONS} {...register("positionTenure")} />
                                                    <Select label="Total Years in Practice" options={TENURE_OPTIONS} {...register("totalYearsPractice")} />
                                                </div>
                                                <Input label="Website" {...register("website")} placeholder="https://www.example.com" />
                                                <Input label="Previous Awards" {...register("awardsReceived")} placeholder="Optional" />

                                                <div className="pt-5 border-t">
                                                    <h4 className="font-medium text-gray-700 mb-4">Address</h4>
                                                    <div className="grid md:grid-cols-3 gap-5">
                                                        <Input label="City" required {...register("addressCity")} error={errors.addressCity?.message} />
                                                        <Input label="State/Province" required {...register("addressState")} error={errors.addressState?.message} />
                                                        <Select label="Country" required options={COUNTRIES} {...register("addressCountry")} error={errors.addressCountry?.message} />
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
                                            <h3 className="text-xl font-semibold text-gray-800">Key Practice Areas</h3>
                                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${watchPracticeAreas.length === 3 ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-500'}`}>{watchPracticeAreas.length}/3 selected</span>
                                        </div>
                                        <p className="text-gray-500 text-sm">Select up to 3 practice areas that best represent your expertise.</p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto p-1">
                                            {PRACTICE_AREAS.map(area => {
                                                const isSelected = watchPracticeAreas.includes(area);
                                                const isDisabled = watchPracticeAreas.length >= 3 && !isSelected;
                                                return (
                                                    <label key={area} className={`flex items-center gap-2 p-3 rounded-lg text-sm cursor-pointer transition-all border ${isSelected ? 'border-teal-500 bg-teal-50 text-teal-700' : isDisabled ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed' : 'border-gray-200 text-gray-600 hover:border-teal-200 hover:bg-teal-50/50'}`}>
                                                        <input type="checkbox" checked={isSelected} disabled={isDisabled}
                                                            onChange={(e) => {
                                                                if (e.target.checked && watchPracticeAreas.length < 3) setValue("practiceAreas", [...watchPracticeAreas, area]);
                                                                else if (!e.target.checked) setValue("practiceAreas", watchPracticeAreas.filter(x => x !== area));
                                                            }} className="sr-only" />
                                                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-teal-500' : 'border border-gray-300'}`}>
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
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-800">Tell Us About Yourself</h3>
                                        <TextArea label="Overall Reach as a Legal Professional" required hint="Include details about your Education, Experience, Key Practice Areas and examples of important cases." {...register("essayReach")} error={errors.essayReach?.message} />
                                        <TextArea label="Achievements and Industry Impact" required hint="Include details and examples pertaining to your achievements and their impacts." {...register("essayAchievements")} error={errors.essayAchievements?.message} />
                                        <TextArea label="How Innovative is your approach?" required hint="Share examples of your innovative approach that benefited your clients or company." {...register("essayInnovation")} error={errors.essayInnovation?.message} />
                                        <TextArea label="How do you keep yourself Future-Proof?" required hint="Discuss your efforts for continuous professional development and adapting to new technologies." {...register("essayFuture")} error={errors.essayFuture?.message} />

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents <span className="text-gray-400">(Optional)</span></label>
                                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-teal-300 transition-colors cursor-pointer bg-gray-50">
                                                <UploadCloud className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                                                <p className="text-gray-500 text-sm">Click to browse or drag files here</p>
                                                <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX up to 10MB</p>
                                                <input type="file" className="hidden" {...register("files")} accept=".pdf,.doc,.docx" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between pt-6 border-t">
                                    {step > 1 ? (
                                        <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors font-medium">
                                            <ChevronLeft className="w-4 h-4" /> Back
                                        </button>
                                    ) : <div />}
                                    {step < 5 ? (
                                        <button type="button" onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200">
                                            Continue <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 disabled:opacity-50">
                                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                                            {isSubmitting ? "Submitting..." : "Submit & Pay $50"}
                                        </button>
                                    )}
                                </div>
                            </form>
                        ) : step === 6 && !isComplete ? (
                            <div>
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Award className="w-8 h-8 text-teal-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Nomination Fee: $50.00 USD</h3>
                                    <p className="text-gray-500">Fully refundable if not selected</p>
                                </div>
                                {clientSecret && stripePromise ? (
                                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                                        <PaymentForm onSuccess={() => setIsComplete(true)} />
                                    </Elements>
                                ) : (
                                    <div className="text-center p-6 bg-red-50 border border-red-200 rounded-xl">
                                        <p className="text-red-600">Payment configuration error. Please contact support.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Nomination Submitted!</h2>
                                <p className="text-gray-500 max-w-md mx-auto mb-8">Thank you for your nomination. Our Awards Committee will review your application and contact you via email.</p>
                                <a href="/dubai-2026" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors">
                                    Back to Event Page
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-center text-gray-400 text-xs mt-8">© 2024 LexTalk World. All rights reserved.</p>
            </div>
        </div>
    );
}

// --- FORM COMPONENTS ---
const Input = ({ label, required, error, ...props }: any) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>}
        <input className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200'} focus:ring-2 outline-none transition-all`} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const Select = ({ label, required, options, error, ...props }: any) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>}
        <select className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-300' : 'border-gray-300'} focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white`} {...props}>
            <option value="">Please Select</option>
            {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const TextArea = ({ label, required, error, hint, ...props }: any) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>}
        {hint && <p className="text-gray-400 text-xs mb-2">{hint}</p>}
        <textarea rows={5} className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-300' : 'border-gray-300'} focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none`} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
            <button disabled={!stripe || loading} className="w-full py-4 rounded-lg bg-teal-600 text-white font-semibold text-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-teal-200">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? "Processing..." : "Pay $50.00 USD"}
            </button>
            {msg && <p className="text-red-500 text-center text-sm">{msg}</p>}
        </form>
    );
}
