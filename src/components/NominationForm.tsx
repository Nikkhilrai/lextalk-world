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
        <div className="bg-slate-50">
            {/* Dark Header for Navbar Contrast */}
            <div className="bg-slate-900 pt-28 pb-12 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    Global Legal Honour <span className="text-amber-500">2026</span> Dubai
                </h1>
                <p className="text-slate-400 text-sm">Award Nomination Form</p>
            </div>

            <div className="max-w-3xl mx-auto px-4 -mt-6">
                {/* Progress Steps - Compact */}
                <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-3 shadow-sm">
                    {stepLabels.map((label, i) => (
                        <div key={i} className="flex items-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 < step ? 'bg-teal-500 text-white' :
                                i + 1 === step ? 'bg-amber-500 text-white' :
                                    'bg-slate-100 text-slate-400'
                                }`}>
                                {i + 1 < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                            </div>
                            {i < stepLabels.length - 1 && (
                                <div className={`w-8 md:w-12 h-0.5 mx-1 ${i + 1 < step ? 'bg-teal-500' : 'bg-slate-200'}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="px-6 py-4 border-b bg-slate-50 rounded-t-xl">
                        <h2 className="font-semibold text-slate-700">Step {step}: {stepLabels[step - 1]}</h2>
                    </div>

                    <div className="p-6">
                        {!isComplete && step < 6 ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                                {/* STEP 1: TERMS - Compact */}
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 max-h-72 overflow-y-auto space-y-3">
                                            <p className="font-medium text-slate-700">Terms & Conditions:</p>
                                            <ul className="space-y-1.5 text-xs">
                                                <li>• Awardees must be present (physically or virtually) to receive the Award.</li>
                                                <li>• Filling the form does not guarantee selection.</li>
                                                <li>• <strong>USD 50 nomination fee</strong> is fully refundable if not selected.</li>
                                                <li>• Winners must book Awardee Pass: Virtual USD 800 / In-Person USD 1200.</li>
                                                <li>• Awards Committee decision is final and binding.</li>
                                            </ul>

                                            <div className="pt-2 border-t text-xs space-y-2">
                                                <p><strong>Process:</strong> Submit → Evaluation (score 80/100 to qualify) → Scorecard → Result</p>
                                                <p><strong>Benefits:</strong> Article opportunity, Event participation, Award plaque, Certification, Website listing</p>
                                            </div>
                                        </div>

                                        <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${watch("acceptedTerms") ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-200'}`}>
                                            <input type="checkbox" {...register("acceptedTerms")} className="w-4 h-4 rounded text-teal-600" />
                                            <span className="text-sm text-slate-700">I accept the terms and conditions <span className="text-red-500">*</span></span>
                                        </label>
                                        {errors.acceptedTerms && <p className="text-red-500 text-xs">{errors.acceptedTerms.message}</p>}
                                    </div>
                                )}

                                {/* STEP 2: PERSONAL - Compact */}
                                {step === 2 && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="First Name" required {...register("firstName")} error={errors.firstName?.message} />
                                            <Input label="Last Name" required {...register("lastName")} error={errors.lastName?.message} />
                                        </div>
                                        <Input label="Email" type="email" required {...register("email")} error={errors.email?.message} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Phone" required {...register("phone")} error={errors.phone?.message} />
                                            <Input label="Date of Birth" type="date" required {...register("dob")} error={errors.dob?.message} />
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: PROFESSIONAL - Compact */}
                                {step === 3 && (
                                    <div className="space-y-4">
                                        {/* Nominate As */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Nominate As <span className="text-red-500">*</span></label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {["Individual", "Company or Firm"].map(v => (
                                                    <label key={v} className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer text-sm font-medium ${nominateAs === v ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600 hover:border-teal-200'}`}>
                                                        <input type="radio" value={v} {...register("nominateAs")} className="sr-only" />
                                                        {v}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {nominateAs === "Individual" && (
                                            <div className="space-y-3 p-3 bg-slate-50 rounded-lg">
                                                <Select label="Role" required options={INDIVIDUAL_ROLES} {...register("individualRole")} />
                                                {individualRole === "None of the above" && <Input label="Specify Role" required {...register("individualRoleOther")} />}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Input label="Education" {...register("highestEducation")} placeholder="e.g. LLB" />
                                                    <Input label="Institute" {...register("educationInstitute")} />
                                                </div>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <Select label="Dual Qualified?" options={["Yes", "No"]} {...register("dualQualified")} />
                                                    <Input label="Bar Year" type="number" {...register("barYear")} />
                                                    <Input label="Which Bar?" {...register("barName")} />
                                                </div>
                                            </div>
                                        )}

                                        {nominateAs === "Company or Firm" && (
                                            <div className="space-y-3 p-3 bg-slate-50 rounded-lg">
                                                <Select label="Type" required options={FIRM_TYPES} {...register("firmType")} />
                                                {firmType === "None of the above" && <Input label="Specify Type" required {...register("firmTypeOther")} />}
                                            </div>
                                        )}

                                        {nominateAs && (
                                            <>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Input label="Organization" {...register("orgName")} />
                                                    <Input label="Position" {...register("currentPosition")} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Select label="Time in Position" options={TENURE_OPTIONS} {...register("positionTenure")} />
                                                    <Select label="Total Experience" options={TENURE_OPTIONS} {...register("totalYearsPractice")} />
                                                </div>
                                                <Input label="Website" {...register("website")} placeholder="https://" />
                                                <div className="grid grid-cols-3 gap-3">
                                                    <Input label="City" required {...register("addressCity")} error={errors.addressCity?.message} />
                                                    <Input label="State" required {...register("addressState")} error={errors.addressState?.message} />
                                                    <Select label="Country" required options={COUNTRIES} {...register("addressCountry")} error={errors.addressCountry?.message} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* STEP 4: PRACTICE AREAS - Compact */}
                                {step === 4 && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-slate-700">Select up to 3 areas <span className="text-red-500">*</span></label>
                                            <span className={`text-xs px-2 py-0.5 rounded ${watchPracticeAreas.length === 3 ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>{watchPracticeAreas.length}/3</span>
                                        </div>
                                        <div className="grid grid-cols-3 md:grid-cols-4 gap-1.5 max-h-64 overflow-y-auto p-1">
                                            {PRACTICE_AREAS.map(area => {
                                                const isSelected = watchPracticeAreas.includes(area);
                                                const isDisabled = watchPracticeAreas.length >= 3 && !isSelected;
                                                return (
                                                    <label key={area} className={`flex items-center gap-1.5 p-2 rounded text-xs cursor-pointer border ${isSelected ? 'border-teal-500 bg-teal-50 text-teal-700' : isDisabled ? 'border-slate-100 text-slate-300' : 'border-slate-200 text-slate-600 hover:border-teal-200'}`}>
                                                        <input type="checkbox" checked={isSelected} disabled={isDisabled}
                                                            onChange={(e) => {
                                                                if (e.target.checked && watchPracticeAreas.length < 3) setValue("practiceAreas", [...watchPracticeAreas, area]);
                                                                else if (!e.target.checked) setValue("practiceAreas", watchPracticeAreas.filter(x => x !== area));
                                                            }} className="sr-only" />
                                                        <div className={`w-3 h-3 rounded-sm flex items-center justify-center ${isSelected ? 'bg-teal-500' : 'border border-slate-300'}`}>
                                                            {isSelected && <Check className="w-2 h-2 text-white" />}
                                                        </div>
                                                        <span className="truncate">{area}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        {errors.practiceAreas && <p className="text-red-500 text-xs">{errors.practiceAreas.message}</p>}
                                    </div>
                                )}

                                {/* STEP 5: ESSAYS - Compact */}
                                {step === 5 && (
                                    <div className="space-y-4">
                                        <TextArea label="Overall Reach" required hint="Education, experience, key cases" {...register("essayReach")} error={errors.essayReach?.message} />
                                        <TextArea label="Achievements & Impact" required hint="Your achievements and their impact" {...register("essayAchievements")} error={errors.essayAchievements?.message} />
                                        <TextArea label="Innovation" required hint="Innovative approaches you've used" {...register("essayInnovation")} error={errors.essayInnovation?.message} />
                                        <TextArea label="Future-Proof" required hint="Continuous development & tech adaptation" {...register("essayFuture")} error={errors.essayFuture?.message} />
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Upload CV <span className="text-slate-400">(Optional)</span></label>
                                            <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50 cursor-pointer hover:border-teal-300">
                                                <UploadCloud className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                                                <p className="text-slate-500 text-xs">PDF, DOC up to 10MB</p>
                                                <input type="file" className="hidden" {...register("files")} accept=".pdf,.doc,.docx" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between pt-4 border-t">
                                    {step > 1 ? (
                                        <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
                                            <ChevronLeft className="w-4 h-4" /> Back
                                        </button>
                                    ) : <div />}
                                    {step < 5 ? (
                                        <button type="button" onClick={handleNext} className="flex items-center gap-1 px-5 py-2 text-sm rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600">
                                            Next <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-1 px-5 py-2 text-sm rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 disabled:opacity-50">
                                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                                            {isSubmitting ? "Submitting..." : "Submit & Pay $50"}
                                        </button>
                                    )}
                                </div>
                            </form>
                        ) : step === 6 && !isComplete ? (
                            <div>
                                <div className="text-center mb-6">
                                    <Award className="w-10 h-10 mx-auto text-amber-500 mb-2" />
                                    <h3 className="text-xl font-bold text-slate-800">Nomination Fee: $50 USD</h3>
                                    <p className="text-slate-500 text-sm">Refundable if not selected</p>
                                </div>
                                {clientSecret && stripePromise ? (
                                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                                        <PaymentForm onSuccess={() => setIsComplete(true)} />
                                    </Elements>
                                ) : (
                                    <p className="text-center text-red-500">Payment error. Contact support.</p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <CheckCircle2 className="w-12 h-12 mx-auto text-teal-500 mb-3" />
                                <h2 className="text-xl font-bold text-slate-800 mb-2">Nomination Submitted!</h2>
                                <p className="text-slate-500 text-sm mb-6">We'll contact you via email with your scorecard.</p>
                                <a href="/dubai-2026" className="inline-block px-5 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600">
                                    Back to Event
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- COMPACT FORM COMPONENTS ---
const Input = ({ label, required, error, ...props }: any) => (
    <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <input className={`w-full px-3 py-2 text-sm rounded-lg border ${error ? 'border-red-300' : 'border-slate-300'} focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none`} {...props} />
        {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
);

const Select = ({ label, required, options, error, ...props }: any) => (
    <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <select className={`w-full px-3 py-2 text-sm rounded-lg border ${error ? 'border-red-300' : 'border-slate-300'} focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none bg-white`} {...props}>
            <option value="">Select</option>
            {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
);

const TextArea = ({ label, required, error, hint, ...props }: any) => (
    <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        {hint && <p className="text-slate-400 text-xs mb-1">{hint}</p>}
        <textarea rows={3} className={`w-full px-3 py-2 text-sm rounded-lg border ${error ? 'border-red-300' : 'border-slate-300'} focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none resize-none`} {...props} />
        {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            <button disabled={!stripe || loading} className="w-full py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? "Processing..." : "Pay $50.00 USD"}
            </button>
            {msg && <p className="text-red-500 text-center text-sm">{msg}</p>}
        </form>
    );
}
