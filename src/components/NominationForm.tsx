"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, Check } from "lucide-react";
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
    acceptedTerms: z.literal(true, { errorMap: () => ({ message: "This field is required." }) }),

    firstName: z.string().min(1, "This field is required."),
    lastName: z.string().min(1, "This field is required."),
    email: z.string().email("Valid email required"),
    phone: z.string().min(5, "This field is required."),
    dob: z.string().min(1, "This field is required."),

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
    addressCity: z.string().min(1, "This field is required."),
    addressState: z.string().min(1, "This field is required."),
    addressCountry: z.string().min(1, "This field is required."),

    // Practice Areas
    practiceAreas: z.array(z.string()).min(1, "Select at least 1 area").max(3, "Maximum 3 areas"),

    // Essays
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
        if (step === 3) {
            fields = ["nominateAs", "addressCity", "addressState", "addressCountry"];
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

    return (
        <div className="min-h-screen bg-white">
            {/* Header with Logo */}
            <div className="bg-gradient-to-r from-[#1a3a4a] to-[#2d5a6e] py-6">
                <div className="max-w-3xl mx-auto px-4">
                    <Image
                        src="/images/dubai-2026/glh-logo.png"
                        alt="Global Legal Honour 2026"
                        width={400}
                        height={100}
                        className="mx-auto"
                    />
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-100 border-b">
                <div className="max-w-3xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>Step {step} of {totalSteps}</span>
                        <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#21b573] transition-all duration-300"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Form Container */}
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">

                    {/* Page Header */}
                    <div className="bg-[#f7f7f7] border-b px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {step === 1 && "Terms & Conditions"}
                            {step === 2 && "Personal Details"}
                            {step === 3 && "Nominate As"}
                            {step === 4 && "Key Practice Areas"}
                            {step === 5 && "Tell Us About Yourself"}
                            {step === 6 && "Payment"}
                        </h2>
                    </div>

                    <div className="p-6">
                        {!isComplete && step < 6 ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* STEP 1: TERMS */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div className="bg-[#f9f9f9] border border-gray-200 rounded-lg p-5 text-sm text-gray-700 space-y-3">
                                            <p className="font-semibold text-gray-900">Please read the following carefully before proceeding:</p>
                                            <ol className="list-decimal list-inside space-y-2 text-gray-600">
                                                <li>All fields marked with <span className="text-red-500">*</span> are required and must be filled.</li>
                                                <li>All awardees must be physically or virtually present to receive the Award. If not, the Award shall not be handed over.</li>
                                                <li>Filling the nomination form does not ensure selection for the Award.</li>
                                                <li>If you do not win, the nomination fee (USD 50) is fully refundable.</li>
                                                <li>Winners will be notified via email to the address provided and must book an Awardee Pass.</li>
                                                <li><strong>Standard Virtual Awardee Pass:</strong> USD 800</li>
                                                <li><strong>Standard In-Person Awardee Pass:</strong> USD 1200</li>
                                                <li>The decision of the Awards Committee is final and cannot be contested.</li>
                                            </ol>
                                        </div>

                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                {...register("acceptedTerms")}
                                                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#21b573] focus:ring-[#21b573]"
                                            />
                                            <span className="text-gray-700">
                                                I have read all the details and wish to proceed with nominations.
                                                <span className="text-red-500 ml-1">*</span>
                                            </span>
                                        </label>
                                        {errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms.message}</p>}
                                    </div>
                                )}

                                {/* STEP 2: PERSONAL DETAILS */}
                                {step === 2 && (
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <FormInput label="First Name" required {...register("firstName")} error={errors.firstName?.message} />
                                            <FormInput label="Last Name" required {...register("lastName")} error={errors.lastName?.message} />
                                        </div>
                                        <FormInput label="E-mail" type="email" required placeholder="ex: myname@example.com" {...register("email")} error={errors.email?.message} />
                                        <FormInput label="Mobile Number" required placeholder="+1 (XXX) XXX-XXXX" {...register("phone")} error={errors.phone?.message} helperText="Please enter a valid phone number." />
                                        <FormInput label="Date of Birth" type="date" required {...register("dob")} error={errors.dob?.message} />
                                    </div>
                                )}

                                {/* STEP 3: NOMINATE AS */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        {/* Nominate As Radio */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Nominate As <span className="text-red-500">*</span>
                                            </label>
                                            <div className="space-y-2">
                                                {["Individual", "Company or Firm"].map(v => (
                                                    <label key={v} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                                        <input
                                                            type="radio"
                                                            value={v}
                                                            {...register("nominateAs")}
                                                            className="w-4 h-4 text-[#21b573] focus:ring-[#21b573] border-gray-300"
                                                        />
                                                        <span className="text-gray-700">{v}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Individual Branch */}
                                        {nominateAs === "Individual" && (
                                            <div className="space-y-5 pt-4 border-t">
                                                <FormSelect
                                                    label="Choose the option that describes you the best"
                                                    required
                                                    options={INDIVIDUAL_ROLES}
                                                    {...register("individualRole")}
                                                    error={errors.individualRole?.message}
                                                />
                                                {individualRole === "None of the above" && (
                                                    <FormInput label="If it's None of the Above, Write It Here" required {...register("individualRoleOther")} error={errors.individualRoleOther?.message} />
                                                )}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <FormInput label="Highest Education" placeholder="e.g. LLB, JD, BCL" {...register("highestEducation")} />
                                                    <FormInput label="University/Institute where highest education was achieved" {...register("educationInstitute")} />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                    <FormSelect label="Are you Dual Qualified?" options={["Yes", "No"]} {...register("dualQualified")} />
                                                    <FormInput label="Year Called to Bar" type="number" placeholder="YYYY" {...register("barYear")} />
                                                    <FormInput label="Which Bar?" placeholder="e.g. NY Bar" {...register("barName")} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Firm Branch */}
                                        {nominateAs === "Company or Firm" && (
                                            <div className="space-y-5 pt-4 border-t">
                                                <FormSelect
                                                    label="Choose the option that describes you the best"
                                                    required
                                                    options={FIRM_TYPES}
                                                    {...register("firmType")}
                                                    error={errors.firmType?.message}
                                                />
                                                {firmType === "None of the above" && (
                                                    <FormInput label="If it's None of the Above, Write It Here" required {...register("firmTypeOther")} error={errors.firmTypeOther?.message} />
                                                )}
                                            </div>
                                        )}

                                        {/* Common Fields */}
                                        {nominateAs && (
                                            <div className="space-y-5 pt-4 border-t">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <FormInput label="Organization/Firm/Company Name" {...register("orgName")} />
                                                    <FormInput label="Current Position/Designation" {...register("currentPosition")} />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Time in current position
                                                        </label>
                                                        <div className="space-y-2">
                                                            {TENURE_OPTIONS.map(opt => (
                                                                <label key={opt} className="flex items-center gap-2 text-sm">
                                                                    <input type="radio" value={opt} {...register("positionTenure")} className="w-4 h-4 text-[#21b573] focus:ring-[#21b573]" />
                                                                    <span className="text-gray-600">{opt}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Total Years in Practice/Business
                                                        </label>
                                                        <div className="space-y-2">
                                                            {TENURE_OPTIONS.map(opt => (
                                                                <label key={opt} className="flex items-center gap-2 text-sm">
                                                                    <input type="radio" value={opt} {...register("totalYearsPractice")} className="w-4 h-4 text-[#21b573] focus:ring-[#21b573]" />
                                                                    <span className="text-gray-600">{opt}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <FormInput label="Website" placeholder="https://www.example.com" {...register("website")} />
                                                <FormInput label="Previous Legal Awards Received (if any)" {...register("awardsReceived")} />

                                                {/* Address */}
                                                <div className="pt-4 border-t">
                                                    <h3 className="text-sm font-medium text-gray-700 mb-4">Address</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                        <FormInput label="City" required {...register("addressCity")} error={errors.addressCity?.message} />
                                                        <FormInput label="State / Province" required {...register("addressState")} error={errors.addressState?.message} />
                                                        <FormSelect label="Country" required options={COUNTRIES} {...register("addressCountry")} error={errors.addressCountry?.message} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* STEP 4: PRACTICE AREAS */}
                                {step === 4 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">
                                                Select your Key Practice Areas (max 3) <span className="text-red-500">*</span>
                                            </label>
                                            <span className="text-sm text-gray-500">{watchPracticeAreas.length}/3 selected</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
                                            {PRACTICE_AREAS.map(area => {
                                                const isSelected = watchPracticeAreas.includes(area);
                                                const isDisabled = watchPracticeAreas.length >= 3 && !isSelected;
                                                return (
                                                    <label
                                                        key={area}
                                                        className={`flex items-center gap-2 p-2 rounded text-sm cursor-pointer transition-colors ${isSelected ? 'bg-[#21b573]/10 text-[#21b573]' : isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
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
                                                            className="w-4 h-4 rounded border-gray-300 text-[#21b573] focus:ring-[#21b573]"
                                                        />
                                                        <span>{area}</span>
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
                                        <FormTextArea
                                            label="Tell us about your Overall Reach as a Legal Professional"
                                            required
                                            hint="Include details about your Education, Experience, Key Practice Areas and examples of important cases or disputes."
                                            {...register("essayReach")}
                                            error={errors.essayReach?.message}
                                        />
                                        <FormTextArea
                                            label="Tell us about your Achievements and Industry Impact"
                                            required
                                            hint="Include details and examples pertaining to your achievements and their impacts."
                                            {...register("essayAchievements")}
                                            error={errors.essayAchievements?.message}
                                        />
                                        <FormTextArea
                                            label="How Innovative is your approach?"
                                            required
                                            hint="Share examples of your innovative approach of handling legal matters that benefited your clients or your company."
                                            {...register("essayInnovation")}
                                            error={errors.essayInnovation?.message}
                                        />
                                        <FormTextArea
                                            label="How do you keep yourself Future-Proof?"
                                            required
                                            hint="Discuss your efforts for continuous professional development, adapting to new technologies, and keeping yourself relevant in the changing landscape of the legal industry."
                                            {...register("essayFuture")}
                                            error={errors.essayFuture?.message}
                                        />

                                        {/* File Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Upload Documents (CV/Profile) - Optional
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#21b573] transition-colors cursor-pointer bg-gray-50">
                                                <UploadCloud className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                                <p className="text-gray-600 text-sm">Click to browse or drag files here</p>
                                                <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX up to 10MB</p>
                                                <input type="file" className="hidden" {...register("files")} accept=".pdf,.doc,.docx" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between pt-6 border-t">
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            onClick={() => setStep(s => s - 1)}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                                        >
                                            <ChevronLeft className="w-4 h-4" /> Back
                                        </button>
                                    ) : <div />}

                                    {step < 5 ? (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#21b573] text-white font-medium hover:bg-[#1a9560] transition-colors"
                                        >
                                            Next <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#21b573] text-white font-medium hover:bg-[#1a9560] transition-colors disabled:opacity-50"
                                        >
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
                                    <div className="w-16 h-16 bg-[#21b573]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-[#21b573]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Nomination Fee: $50.00 USD</h3>
                                    <p className="text-gray-500 text-sm">This fee is fully refundable if you are not selected.</p>
                                </div>

                                {clientSecret && stripePromise ? (
                                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                                        <PaymentForm onSuccess={() => setIsComplete(true)} />
                                    </Elements>
                                ) : (
                                    <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600">Payment configuration error. Please contact support.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* SUCCESS */
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-[#21b573]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-[#21b573]" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Nomination Submitted Successfully!</h2>
                                <p className="text-gray-600 max-w-md mx-auto mb-8">
                                    Thank you for your nomination. Our Awards Committee will review your application and contact you via email.
                                </p>
                                <a
                                    href="/dubai-2026"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#21b573] text-white font-medium hover:bg-[#1a9560] transition-colors"
                                >
                                    Back to Event Page
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-400 text-xs mt-6">
                    © 2024 LexTalk World. All rights reserved.
                </p>
            </div>
        </div>
    );
}

// --- FORM COMPONENTS ---
const FormInput = ({ label, required, error, helperText, ...props }: any) => (
    <div>
        {label && (
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <input
            className={`w-full px-3 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#21b573] focus:border-[#21b573] outline-none transition-colors`}
            {...props}
        />
        {helperText && <p className="text-gray-500 text-xs mt-1">{helperText}</p>}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const FormSelect = ({ label, required, options, error, ...props }: any) => (
    <div>
        {label && (
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <select
            className={`w-full px-3 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-800 focus:ring-2 focus:ring-[#21b573] focus:border-[#21b573] outline-none transition-colors bg-white`}
            {...props}
        >
            <option value="">Please Select</option>
            {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const FormTextArea = ({ label, required, error, hint, ...props }: any) => (
    <div>
        {label && (
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        {hint && <p className="text-gray-500 text-xs mb-2">{hint}</p>}
        <textarea
            rows={5}
            className={`w-full px-3 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#21b573] focus:border-[#21b573] outline-none transition-colors resize-none`}
            {...props}
        />
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
                className="w-full py-3 rounded-lg bg-[#21b573] text-white font-medium text-lg hover:bg-[#1a9560] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? "Processing..." : "Pay $50.00 USD"}
            </button>
            {msg && <p className="text-red-500 text-center text-sm">{msg}</p>}
        </form>
    );
}
