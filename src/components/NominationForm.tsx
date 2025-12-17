"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, UploadCloud } from "lucide-react";

// Safe loading of Stripe
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

// --- Options (From JotForm) ---
const COUNTRIES = "Afghanistan,Albania,Algeria,American Samoa,Andorra,Angola,Anguilla,Antigua and Barbuda,Argentina,Armenia,Aruba,Australia,Austria,Azerbaijan,Bahamas,Bahrain,Bangladesh,Barbados,Belarus,Belgium,Belize,Benin,Bermuda,Bhutan,Bolivia,Bosnia and Herzegovina,Botswana,Brazil,Brunei,Bulgaria,Burkina Faso,Burundi,Cambodia,Cameroon,Canada,Cape Verde,Cayman Islands,Central African Republic,Chad,Chile,China,Christmas Island,Colombia,Comoros,Congo,Cook Islands,Costa Rica,Croatia,Cuba,Curaçao,Cyprus,Czech Republic,Denmark,Djibouti,Dominica,Dominican Republic,Ecuador,Egypt,El Salvador,Equatorial Guinea,Eritrea,Estonia,Ethiopia,Fiji,Finland,France,Gabon,Gambia,Georgia,Germany,Ghana,Gibraltar,Greece,Greenland,Grenada,Guadeloupe,Guam,Guatemala,Guinea,Guyana,Haiti,Honduras,Hong Kong,Hungary,Iceland,India,Indonesia,Iran,Iraq,Ireland,Israel,Italy,Jamaica,Japan,Jordan,Kazakhstan,Kenya,Kiribati,Kosovo,Kuwait,Kyrgyzstan,Laos,Latvia,Lebanon,Lesotho,Liberia,Libya,Liechtenstein,Lithuania,Luxembourg,Macau,Macedonia,Madagascar,Malawi,Malaysia,Maldives,Mali,Malta,Mauritania,Mauritius,Mexico,Micronesia,Moldova,Monaco,Mongolia,Montenegro,Morocco,Mozambique,Myanmar,Namibia,Nauru,Nepal,Netherlands,New Zealand,Nicaragua,Niger,Nigeria,Niue,North Korea,Norway,Oman,Pakistan,Palau,Palestine,Panama,Papua New Guinea,Paraguay,Peru,Philippines,Poland,Portugal,Qatar,Romania,Russia,Rwanda,Samoa,San Marino,Saudi Arabia,Senegal,Serbia,Seychelles,Sierra Leone,Singapore,Slovakia,Slovenia,Somalia,South Africa,South Korea,South Sudan,Spain,Sri Lanka,Sudan,Suriname,Swaziland,Sweden,Switzerland,Syria,Taiwan,Tajikistan,Tanzania,Thailand,Togo,Tonga,Trinidad and Tobago,Tunisia,Turkey,Turkmenistan,Tuvalu,Uganda,Ukraine,United Arab Emirates,United Kingdom,United States,Uruguay,Uzbekistan,Vanuatu,Vatican City,Venezuela,Vietnam,Yemen,Zambia,Zimbabwe".split(",");

const PRACTICE_AREAS = "Administrative|Capital Markets|Banking & Finance|M&A|Construction|Data Protection and Privacy|Dispute Resolution|Litigation|Arbitration|Bankruptcy/Restructuring/Insolvency|Anti-Bribery & Corruption|Aviation|Corporate/Commercial|Competition/Antitrust|Intellectual Property|Labour and Employment|Regulatory & Compliance|Risk and Corporate Governance|Taxation|White Collar Crime|Technology|Criminal|Environmental|Family|Health|Immigration|Personal Injury|Infrastructure|Real Estate|Media and Entertainment|Sports|Other".split("|");

// --- Schema ---
const nominationSchema = z.object({
    // STEP 1: Terms
    acceptedTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),

    // STEP 2: Personal Details
    nominatorName: z.string().min(2, "Name required"),
    nominatorEmail: z.string().email(),
    nominatorPhone: z.string().min(5, "Phone required"), // Widget 19
    nominatorDob: z.string().min(1, "Date of Birth required"), // qid 22

    // STEP 3: Nomination Details (Conditional)
    nominateAs: z.enum(["Individual", "Company or Firm"]), // qid 24

    // Cond: Individual
    individualRole: z.string().optional(), // qid 25
    highestEducation: z.string().optional(), // qid 27
    educationInstitute: z.string().optional(), // qid 28
    dualQualified: z.enum(["Yes", "No"]).optional(), // qid 29
    barYear: z.string().optional(), // qid 30
    barName: z.string().optional(), // qid 31
    awardsReceived: z.string().optional(), // qid 60

    // Cond: Firm
    firmRole: z.string().optional(), // qid 26

    // Common (but hidden initially?) logic says both fill these:
    orgName: z.string().optional(), // qid 33
    currentPosition: z.string().optional(), // qid 34
    positionTenure: z.string().optional(), // qid 35
    website: z.string().optional(), // qid 61 (If no website, blank)
    totalYearsPractice: z.string().optional(), // qid 39

    // Address (qid 40)
    addressStreet: z.string().min(1, "Street required"),
    addressLine2: z.string().optional(),
    addressCity: z.string().min(1, "City required"),
    addressState: z.string().min(1, "State required"),
    addressZip: z.string().min(1, "Zip/Postal Code required"),
    addressCountry: z.string().min(1, "Country required"),

    // STEP 4: Practice Areas (qid 45)
    practiceAreas: z.array(z.string()).min(1, "Select at least 1").max(3, "Select up to 3"),

    // STEP 5: Essays
    essayReach: z.string().min(10, "Required"), // qid 47
    essayAchievements: z.string().min(10, "Required"), // qid 49
    essayInnovation: z.string().min(10, "Required"), // qid 50
    essayFuture: z.string().min(10, "Required"), // qid 51

    // File Upload
    // For V1 we just validate if user wants (optional). Zod handling for file list is tricky in client-side only without transform
    // We'll skip validation for file in this schema version or allow any
    files: z.any().optional(),
});

type FormValues = z.infer<typeof nominationSchema>;

export function NominationForm() {
    const [step, setStep] = useState(1);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const { register, handleSubmit, watch, trigger, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(nominationSchema),
        defaultValues: {
            practiceAreas: [],
            acceptedTerms: undefined
        }
    });

    const nominateAs = watch("nominateAs");
    const watchPracticeAreas = watch("practiceAreas") || [];

    const handleNext = async () => {
        let fields: any[] = [];
        if (step === 1) fields = ["acceptedTerms"];
        if (step === 2) fields = ["nominatorName", "nominatorEmail", "nominatorPhone", "nominatorDob"];
        if (step === 3) {
            // Logic for step 3 details
            fields = ["nominateAs", "orgName", "currentPosition", "positionTenure", "totalYearsPractice", "addressStreet", "addressCity", "addressState", "addressZip", "addressCountry"];
            if (nominateAs === "Individual") {
                fields.push("individualRole", "highestEducation", "educationInstitute", "dualQualified", "barYear", "barName");
            } else {
                fields.push("firmRole");
            }
        }
        if (step === 4) fields = ["practiceAreas"];
        if (step === 5) fields = ["essayReach", "essayAchievements", "essayInnovation", "essayFuture"];

        const isValid = await trigger(fields);
        if (isValid) setStep(prev => prev + 1);
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            // Prepare Payload for API (flattened or structured)
            // We map specific fields to the root contact info required by API schema
            const payload = {
                type: data.nominateAs,
                category: "Global Legal Honour", // Hardcoded or select? JotForm didn't explicitly have "Award Category" dropdown? 
                // UPDATE: qid 44 just says "Select Practice Areas". Maybe that IS the category? 
                // The user's earlier text mentioned "Award Category". I will use Practice Areas as category or generic.
                // Actually, let's pass data.practiceAreas.join(", ") as Category.

                nominatorEmail: data.nominatorEmail,
                nominatorPhone: data.nominatorPhone,
                nomineeName: data.nominatorName, // Assuming Nominator IS Nominee (Self Nomination) based on flow
                nomineeEmail: data.nominatorEmail,
                formResponse: data // Send full data dump
            };

            const res = await fetch("/api/nominate", { method: "POST", body: JSON.stringify(payload) });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);

            // Payment
            const payRes = await fetch("/api/create-payment-intent", { method: "POST", body: JSON.stringify({ nominationId: json.nominationId }) });
            const payJson = await payRes.json();
            setClientSecret(payJson.clientSecret);

            setStep(6);
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 text-center">
                <h1 className="text-2xl font-serif font-bold">Global Legal Honour - 2026 Dubai</h1>
                <p className="text-slate-400 text-sm mt-1">Application Wizard</p>
            </div>

            {/* Progress */}
            <div className="h-1 bg-slate-100">
                <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${(step / 6) * 100}%` }} />
            </div>

            <div className="p-8">
                {step < 6 ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* STEP 1: Terms */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right duration-300 space-y-4">
                                <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Terms & Conditions</h2>
                                <div className="h-48 overflow-y-auto bg-slate-50 p-4 rounded text-xs text-slate-600 space-y-2 border">
                                    <p>All awardees are required to be physically or virtually present at the event to receive the Award...</p>
                                    <p>Standard Virtual Awardee Pass: USD 800...</p>
                                    <p>(Full terms as per portal)...</p>
                                </div>
                                <label className="flex items-center gap-3 p-4 border rounded cursor-pointer hover:bg-slate-50">
                                    <input type="checkbox" {...register("acceptedTerms")} className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500" />
                                    <span className="font-bold text-slate-700">I have read all the details and wish to proceed with nominations.</span>
                                </label>
                                {errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms.message}</p>}
                            </div>
                        )}

                        {/* STEP 2: Personal Details */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right duration-300 space-y-4">
                                <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Personal Details</h2>
                                <Input label="Full Name" {...register("nominatorName")} error={errors.nominatorName?.message} />
                                <Input label="Email" type="email" {...register("nominatorEmail")} error={errors.nominatorEmail?.message} />
                                <Input label="Mobile Number" {...register("nominatorPhone")} error={errors.nominatorPhone?.message} />
                                <Input label="Date of Birth" type="date" {...register("nominatorDob")} error={errors.nominatorDob?.message} />
                            </div>
                        )}

                        {/* STEP 3: Details & Logic */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right duration-300 space-y-4">
                                <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Nomination Details</h2>

                                {/* QID 24 */}
                                <div>
                                    <label className={labelClass}>Nominate As</label>
                                    <div className="flex gap-4">
                                        {["Individual", "Company or Firm"].map(v => (
                                            <label key={v} className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" value={v} {...register("nominateAs")} className="text-amber-500 focus:ring-amber-500" />
                                                <span>{v}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {nominateAs === "Individual" && (
                                    <>
                                        <Select label="Choose the option that describes you best" {...register("individualRole")} options={["Independent Lawyer/Advocate", "Lawyer in a Law Firm", "In-House Lawyer", "Compliance Expert", "Other"]} />
                                        <Input label="Highest Education" {...register("highestEducation")} />
                                        <Input label="University/Institute" {...register("educationInstitute")} />

                                        {/* QID 29 & 30 & 31 */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <Select label="Dual Qualified?" {...register("dualQualified")} options={["Yes", "No"]} />
                                            <Input label="Year Called to Bar" {...register("barYear")} />
                                        </div>
                                        <Input label="Which Bar?" {...register("barName")} />
                                    </>
                                )}

                                {nominateAs === "Company or Firm" && (
                                    <Select label="Choose the option that describes you best" {...register("firmRole")} options={["Law Firm", "In-House Legal Department", "Legal Tech Company", "Other"]} />
                                )}

                                {/* Common Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                    <Input label="Name of Organization/Firm" {...register("orgName")} />
                                    <Input label="Current Position" {...register("currentPosition")} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select label="Time in Position" {...register("positionTenure")} options={["Less than 3 Years", "3 to 5 Years", "5 to 10 Years", "20+ Years"]} />
                                    <Select label="Total Years Practice" {...register("totalYearsPractice")} options={["Less than 3 Years", "3 to 5 Years", "5 to 10 Years", "20+ Years"]} />
                                </div>

                                <Input label="Website URL (Leave blank if none)" {...register("website")} />

                                {/* Address (QID 40) */}
                                <div className="space-y-2 pt-4 border-t">
                                    <label className={labelClass}>Address</label>
                                    <Input placeholder="Street Address" {...register("addressStreet")} error={errors.addressStreet?.message} />
                                    <Input placeholder="Street Address Line 2" {...register("addressLine2")} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="City" {...register("addressCity")} error={errors.addressCity?.message} />
                                        <Input placeholder="State / Province" {...register("addressState")} error={errors.addressState?.message} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="Postal / Zip Code" {...register("addressZip")} error={errors.addressZip?.message} />
                                        <Select placeholder="Country" {...register("addressCountry")} options={COUNTRIES} error={errors.addressCountry?.message} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: Practice Areas */}
                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right duration-300 space-y-4">
                                <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Key Practice Areas</h2>
                                <p className="text-sm text-slate-500">Select your Top 3 Key Practice Areas.</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-96 overflow-y-auto p-2 border rounded">
                                    {PRACTICE_AREAS.map(area => (
                                        <label key={area} className="flex items-start gap-2 text-sm p-2 hover:bg-slate-50 rounded cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value={area}
                                                checked={watchPracticeAreas.includes(area)}
                                                onChange={(e) => {
                                                    const current = watchPracticeAreas;
                                                    if (e.target.checked) {
                                                        if (current.length < 3) setValue("practiceAreas", [...current, area]);
                                                    } else {
                                                        setValue("practiceAreas", current.filter(x => x !== area));
                                                    }
                                                }}
                                                className="mt-1 text-amber-500 focus:ring-amber-500"
                                            />
                                            <span>{area}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.practiceAreas && <p className="text-red-500 text-sm">{errors.practiceAreas.message}</p>}
                            </div>
                        )}

                        {/* STEP 5: Essays */}
                        {step === 5 && (
                            <div className="animate-in fade-in slide-in-from-right duration-300 space-y-4">
                                <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Detailed Questions</h2>
                                <TextArea label="Tell us about your Overall Reach as a Legal Professional" {...register("essayReach")} error={errors.essayReach?.message} />
                                <TextArea label="Tell us about your Achievements and the Impact you made on the Industry" {...register("essayAchievements")} error={errors.essayAchievements?.message} />
                                <TextArea label="How Innovative is your approach?" {...register("essayInnovation")} error={errors.essayInnovation?.message} />
                                <TextArea label="How do you keep yourself Future-Proof?" {...register("essayFuture")} error={errors.essayFuture?.message} />

                                <div className="pt-4 border-t">
                                    <label className={labelClass}>Upload Documents (CV / Profile)</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition cursor-pointer">
                                        <UploadCloud className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                        <p className="text-sm text-slate-500">Click to browse or drag file here</p>
                                        <input type="file" className="hidden" {...register("files")} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between pt-6 border-t mt-6">
                            {step > 1 ? (
                                <button type="button" onClick={() => setStep(s => s - 1)} className="px-6 py-2 border rounded hover:bg-slate-50 flex items-center gap-2 text-sm font-bold text-slate-600">
                                    <ChevronLeft size={16} /> Back
                                </button>
                            ) : <div />}

                            {step < 5 ? (
                                <button type="button" onClick={handleNext} className="px-8 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded flex items-center gap-2 text-sm font-bold shadow-lg shadow-amber-500/20">
                                    Next <ChevronRight size={16} />
                                </button>
                            ) : (
                                <button type="submit" disabled={isSubmitting} className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2 text-sm font-bold shadow-lg shadow-green-600/20">
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Proceed to Payment"}
                                </button>
                            )}
                        </div>
                    </form>
                ) : (
                    /* STEP 6: Payment */
                    <div className="animate-in zoom-in duration-300">
                        <h2 className="text-2xl font-bold mb-6 text-center">Final Step: Payment</h2>
                        {clientSecret && stripePromise ? (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <PaymentForm onSuccess={() => alert("Success!")} />
                            </Elements>
                        ) : (
                            <div className="text-red-500 text-center p-4 bg-red-50 rounded">
                                Payment Gateway Error. (Missing Key?)
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Helpers ---
const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1";
const inputClass = "w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-sm";

const Input = ({ label, error, ...props }: any) => (
    <div>
        {label && <label className={labelClass}>{label}</label>}
        <input className={`${inputClass} ${error ? 'border-red-500' : ''}`} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const TextArea = ({ label, error, ...props }: any) => (
    <div>
        {label && <label className={labelClass}>{label}</label>}
        <textarea rows={3} className={`${inputClass} ${error ? 'border-red-500' : ''}`} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const Select = ({ label, options, error, ...props }: any) => (
    <div>
        {label && <label className={labelClass}>{label}</label>}
        <select className={`${inputClass} ${error ? 'border-red-500' : ''}`} {...props}>
            <option value="">Select...</option>
            {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
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
        if (error) setMsg(error.message || "Failed");
        else onSuccess();
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={!stripe || loading} className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded">
                {loading ? "Processing..." : "Pay $100"}
            </button>
            {msg && <p className="text-red-500 mt-2 text-center text-sm">{msg}</p>}
        </form>
    )
}
