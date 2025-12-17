"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

// --- Zod Schema Definitions ---
const baseSchema = z.object({
    type: z.enum(["Individual", "Firm"]),
    category: z.string().min(1, "Please select a category"),

    // Nominator (Contact)
    nominatorEmail: z.string().email(),
    nominatorPhone: z.string().optional(),

    // Nominee Basic
    nomineeName: z.string().min(2, "Name required"),
    nomineeEmail: z.string().email(),

    // Conditional Fields (merged into formResponse)
    details: z.object({
        // Individual Specific
        profession: z.string().optional(),
        professionOther: z.string().optional(),
        education: z.string().optional(),
        university: z.string().optional(),
        barDate: z.string().optional(),
        barName: z.string().optional(),

        // Firm Specific
        firmType: z.string().optional(),
        firmTypeOther: z.string().optional(),
        organizationName: z.string().optional(),
        designation: z.string().optional(),
        website: z.string().optional(),

        // Common
        addressCountry: z.string().min(1, "Country required"),
        practiceAreas: z.array(z.string()).max(3, "Select up to 3"),

        // Essay
        reach: z.string().min(10, "Please elaborate"),
        achievements: z.string().min(10, "Please elaborate"),
        innovation: z.string().min(10, "Please elaborate"),
        futureProof: z.string().min(10, "Please elaborate"),
    })
});

type FormValues = z.infer<typeof baseSchema>;

export function NominationForm() {
    const [step, setStep] = useState(1);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [nominationId, setNominationId] = useState<string | null>(null);

    const { register, handleSubmit, watch, setValue, trigger, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(baseSchema),
        defaultValues: {
            type: "Individual",
            details: {
                practiceAreas: []
            }
        }
    });

    const watchType = watch("type");
    const watchFirmType = watch("details.firmType");
    const watchPracticeAreas = watch("details.practiceAreas") || [];

    const handleNext = async () => {
        // Validate current step fields
        let isValid = false;
        if (step === 1) {
            isValid = await trigger(["type", "category", "nominatorEmail", "nomineeName", "nomineeEmail"]);
        } else if (step === 2) {
            // Validate details based on type
            const fields: any[] = ["details.addressCountry", "details.practiceAreas"];
            if (watchType === "Individual") {
                fields.push("details.profession", "details.education", "details.barDate");
            } else {
                fields.push("details.firmType", "details.organizationName");
            }
            isValid = await trigger(fields);
        } else if (step === 3) {
            isValid = await trigger(["details.reach", "details.achievements", "details.innovation", "details.futureProof"]);
        }

        if (isValid) setStep(prev => prev + 1);
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            // 1. Submit Data
            // Map flat details to nested "formResponse" for DB
            const payload = {
                type: data.type,
                category: data.category,
                nominatorEmail: data.nominatorEmail,
                nominatorPhone: data.nominatorPhone,
                nomineeName: data.nomineeName,
                nomineeEmail: data.nomineeEmail,
                formResponse: data.details
            };

            const res = await fetch("/api/nominate", {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const resData = await res.json();
            if (!res.ok) throw new Error(resData.error);

            setNominationId(resData.nominationId);

            // 2. Get Payment Intent
            const payRes = await fetch("/api/create-payment-intent", {
                method: "POST",
                body: JSON.stringify({ nominationId: resData.nominationId })
            });
            const payData = await payRes.json();
            setClientSecret(payData.clientSecret);

            setStep(4); // Move to Payment
        } catch (err) {
            console.error(err);
            alert("Submission failed. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-slate-50 border-b border-slate-100 p-4">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <span>Step {step} of 4</span>
                    <span>Completion</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${step * 25}%` }} />
                </div>
            </div>

            <div className="p-8 md:p-12">
                {step < 4 ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        {/* --- STEP 1: BASIC INFO --- */}
                        {step === 1 && (
                            <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
                                <h2 className="text-2xl font-serif font-bold text-slate-900">Let's Get Started</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-full">
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Nominate As <span className="text-red-500">*</span></label>
                                        <div className="flex gap-4">
                                            {["Individual", "Firm"].map((val) => (
                                                <label key={val} className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all ${watchType === val ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold ring-1 ring-amber-500' : 'border-slate-200 hover:border-slate-300'}`}>
                                                    <input type="radio" value={val} {...register("type")} className="sr-only" />
                                                    <div className="text-center">{val}</div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <Input label="Category" {...register("category")} error={errors.category?.message} placeholder="e.g. Rising Star" />

                                    <div className="col-span-full border-t border-slate-100 pt-6 mt-2">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Information</h3>
                                    </div>

                                    <Input label="Your Email (Nominator)" type="email" {...register("nominatorEmail")} error={errors.nominatorEmail?.message} />
                                    <Input label="Phone (Optional)" {...register("nominatorPhone")} />

                                    <Input label="Nominee Name" {...register("nomineeName")} error={errors.nomineeName?.message} />
                                    <Input label="Nominee Email" type="email" {...register("nomineeEmail")} error={errors.nomineeEmail?.message} />
                                </div>
                            </div>
                        )}

                        {/* --- STEP 2: DETAILS (CONDITIONAL) --- */}
                        {step === 2 && (
                            <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
                                <h2 className="text-2xl font-serif font-bold text-slate-900">
                                    {watchType === "Individual" ? "Professional Background" : "Organization Details"}
                                </h2>

                                {watchType === "Individual" ? (
                                    <div className="space-y-4">
                                        <Select
                                            label="Current Role"
                                            {...register("details.profession")}
                                            options={[
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
                                            ]}
                                            error={errors.details?.profession?.message}
                                        />
                                        {watch("details.profession") === "None of the above" && (
                                            <Input label="Please Specify" {...register("details.professionOther")} placeholder="Write it here..." />
                                        )}

                                        <Input label="Highest Education" {...register("details.education")} error={errors.details?.education?.message} />
                                        <Input label="University/Institute" {...register("details.university")} />

                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Year Called to Bar" type="number" {...register("details.barDate")} error={errors.details?.barDate?.message} />
                                            <Input label="Which Bar?" {...register("details.barName")} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Select
                                            label="Organization Type"
                                            {...register("details.firmType")}
                                            options={[
                                                "Law Firm",
                                                "In-House Legal Department",
                                                "Legal Tech Company",
                                                "None of the above"
                                            ]}
                                            error={errors.details?.firmType?.message}
                                        />
                                        {watch("details.firmType") === "None of the above" && (
                                            <Input label="Please Specify" {...register("details.firmTypeOther")} placeholder="Write it here..." />
                                        )}

                                        <Input label="Organization Name" {...register("details.organizationName")} error={errors.details?.organizationName?.message} />
                                        <Input label="Current Position/Designation" {...register("details.designation")} />
                                        <Input label="Website URL" {...register("details.website")} />
                                    </div>
                                )}

                                <div className="pt-6 border-t border-slate-100">
                                    <Select label="Country" {...register("details.addressCountry")} options={["United Arab Emirates", "United Kingdom", "United States", "India", "Singapore", "Saudi Arabia", "Other"]} error={errors.details?.addressCountry?.message} />

                                    <div className="mt-4">
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Key Practice Areas (Select up to 3)</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                            {["Banking & Finance", "M&A", "Dispute Resolution", "Real Estate", "Technology (TMT)", "Intellectual Property", "Litigation", "Compliance", "Tax"].map(area => (
                                                <label key={area} className="flex items-center gap-2 text-sm p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={area}
                                                        checked={watchPracticeAreas.includes(area)}
                                                        onChange={(e) => {
                                                            const current = watchPracticeAreas;
                                                            if (e.target.checked) {
                                                                if (current.length < 3) setValue("details.practiceAreas", [...current, area]);
                                                            } else {
                                                                setValue("details.practiceAreas", current.filter(x => x !== area));
                                                            }
                                                        }}
                                                        className="rounded text-amber-500 focus:ring-amber-500"
                                                    />
                                                    {area}
                                                </label>
                                            ))}
                                        </div>
                                        {errors.details?.practiceAreas && <p className="text-red-500 text-xs mt-1">{errors.details?.practiceAreas.message}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- STEP 3: ESSAY --- */}
                        {step === 3 && (
                            <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
                                <h2 className="text-2xl font-serif font-bold text-slate-900">Your Story</h2>
                                <p className="text-slate-500">Please provide detailed answers. These play a crucial role in the judging process.</p>

                                <TextArea label="Tell us about your overall reach as a legal professional" {...register("details.reach")} error={errors.details?.reach?.message} />
                                <TextArea label="What are your key achievements and impact on the industry?" {...register("details.achievements")} error={errors.details?.achievements?.message} />
                                <TextArea label="How innovative is your approach?" {...register("details.innovation")} error={errors.details?.innovation?.message} />
                                <TextArea label="How do you keep yourself future-proof?" {...register("details.futureProof")} error={errors.details?.futureProof?.message} />
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between pt-8 border-t border-slate-100">
                            {step > 1 ? (
                                <button type="button" onClick={() => setStep(s => s - 1)} className="btn-secondary flex items-center gap-2">
                                    <ChevronLeft size={16} /> Back
                                </button>
                            ) : <div />}

                            {step < 3 ? (
                                <button type="button" onClick={handleNext} className="btn-primary flex items-center gap-2">
                                    Next <ChevronRight size={16} />
                                </button>
                            ) : (
                                <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2">
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Proceed to Payment"}
                                </button>
                            )}
                        </div>
                    </form>
                ) : (
                    /* --- STEP 4: PAYMENT --- */
                    <div className="animate-in zoom-in fade-in duration-300">
                        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Secure Payment</h2>
                        {clientSecret && stripePromise ? (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <PaymentForm onSuccess={() => setStep(5)} />
                            </Elements>
                        ) : clientSecret && (
                            <div className="p-6 bg-red-50 text-center rounded-xl border border-red-100">
                                <p className="text-red-600 font-bold mb-2">Configuration Error</p>
                                <p className="text-sm text-red-500">Stripe Publishable Key is missing. Please check your settings.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* --- SUCCESS --- */}
                {step === 5 && (
                    <div className="text-center py-10 animate-in zoom-in fade-in">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Nomination Received!</h2>
                        <p className="text-slate-500 mb-8">Your application has been securely submitted. Good luck!</p>
                        <a href="/" className="btn-secondary">Return Home</a>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Sub Components ---

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.origin + "/awards" },
            redirect: "if_required"
        });

        if (error) setMsg(error.message || "Payment Failed");
        else onSuccess();
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={!stripe || loading} className="w-full mt-6 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex justify-center items-center">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Pay $100.00"}
            </button>
            {msg && <p className="text-red-500 mt-4 text-center">{msg}</p>}
        </form>
    );
}

const labelClass = "block text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wide";
const inputClass = "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400 bg-white";

const Input = ({ label, error, ...props }: any) => (
    <div>
        <label className={labelClass}>{label} {props.required && <span className="text-red-500">*</span>}</label>
        <input className={`${inputClass} ${error ? 'border-red-500' : ''}`} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const TextArea = ({ label, error, ...props }: any) => (
    <div>
        <label className={labelClass}>{label}</label>
        <textarea rows={4} className={`${inputClass} ${error ? 'border-red-500' : ''}`} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const Select = ({ label, options, error, ...props }: any) => (
    <div>
        <label className={labelClass}>{label}</label>
        <select className={`${inputClass} ${error ? 'border-red-500' : ''}`} {...props}>
            <option value="">Select...</option>
            {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);
