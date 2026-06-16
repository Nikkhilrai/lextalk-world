import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, User, Ticket, CreditCard, Tag, Hash, Calendar,
    Download, CheckCircle, Clock, Mail
} from "lucide-react";
import { getDelegateRegistrationById } from "@/actions/delegate-registration";

function Field({ label, value }: { label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
            <span className="text-sm text-slate-200 break-all">{value}</span>
        </div>
    );
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
    return (
        <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                <Icon size={11} /> {title}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                {children}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        failed: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${colors[status] ?? "bg-slate-500/10 text-slate-400 border-slate-500/30"}`}>
            {status}
        </span>
    );
}

export default async function RegistrationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { success, registration: reg } = await getDelegateRegistrationById(id);

    if (!success || !reg) notFound();

    return (
        <div className="max-w-3xl space-y-6">
            {/* Back + Header */}
            <div className="flex items-start gap-4">
                <Link
                    href="/admin/delegate-registrations"
                    className="mt-1 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <ArrowLeft size={16} className="text-slate-400" />
                </Link>
                <div className="flex-1 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-white">{reg.firstName} {reg.lastName}</h1>
                        <p className="text-sm text-slate-400 mt-0.5">{reg.email}</p>
                        <p className="text-xs text-slate-600 font-mono mt-1">{reg.id}</p>
                    </div>
                    <StatusBadge status={reg.paymentStatus} />
                </div>
            </div>

            {/* Card */}
            <div className="bg-[#1a1d21] border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 bg-[#212946]">
                    <p className="text-xs text-slate-400">
                        Registered{" "}
                        <span className="text-slate-200 font-medium">
                            {reg.createdAt ? new Date(reg.createdAt).toLocaleString("en-IN") : "—"}
                        </span>
                        {" "}· Conference{" "}
                        <span className="text-amber-400 font-medium">{reg.conferenceSlug}</span>
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Personal */}
                    <Section icon={User} title="Personal Details">
                        <Field label="First Name" value={reg.firstName} />
                        <Field label="Last Name" value={reg.lastName} />
                        <Field label="Email" value={reg.email} />
                        <Field label="Phone" value={reg.phone} />
                        <Field label="Organisation" value={reg.organization} />
                        <Field label="Designation" value={reg.designation} />
                        <Field label="Country" value={reg.country} />
                    </Section>

                    {/* Pass */}
                    <Section icon={Ticket} title="Pass Details">
                        <Field label="Pass Type" value={reg.passType?.replace(/-/g, " ").toUpperCase()} />
                        <Field label="Category" value={reg.passCategory?.toUpperCase()} />
                        <Field label="Conference" value={reg.conferenceSlug} />
                        <Field label="Payment Type" value={reg.paymentType} />
                    </Section>

                    {/* Payment */}
                    <Section icon={CreditCard} title="Payment Details">
                        <Field label="Status" value={reg.paymentStatus} />
                        <Field label="Currency" value={reg.currency} />
                        <Field
                            label="Original Price"
                            value={reg.originalPrice != null ? `${reg.currency} ${reg.originalPrice}` : null}
                        />
                        <Field
                            label="Discounted Price"
                            value={reg.discountedPrice != null ? `${reg.currency} ${reg.discountedPrice}` : null}
                        />
                        <Field label="Razorpay Order ID" value={reg.razorpayOrderId} />
                        <Field label="Razorpay Payment ID" value={reg.razorpayPaymentId} />
                    </Section>

                    {/* Coupon */}
                    {reg.couponCode && (
                        <Section icon={Tag} title="Coupon">
                            <Field label="Coupon Code" value={reg.couponCode} />
                            <Field
                                label="Discount %"
                                value={reg.couponDiscount != null ? `${reg.couponDiscount}%` : null}
                            />
                        </Section>
                    )}

                    {/* Ticket */}
                    {reg.ticketNumber && (
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                                <Hash size={11} /> Ticket
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                                <Field label="Ticket Number" value={reg.ticketNumber} />
                                <Field label="Email Sent" value={reg.emailSent ? "Yes" : "No"} />
                            </div>
                            {reg.ticketId && (
                                <a
                                    href={`/api/delegate-registration/ticket/${reg.ticketId}/download`}
                                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors"
                                >
                                    <Download size={12} /> Download Ticket PDF
                                </a>
                            )}
                        </div>
                    )}

                    {/* Email Status */}
                    <div className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        {reg.emailSent ? (
                            <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                        ) : (
                            <Clock size={16} className="text-amber-400 shrink-0" />
                        )}
                        <div>
                            <p className="text-xs font-bold text-slate-300">
                                {reg.emailSent ? "Confirmation email sent" : "Confirmation email pending"}
                            </p>
                            <p className="text-[11px] text-slate-500">
                                {reg.emailSent
                                    ? "Delegate has received their confirmation."
                                    : "Email has not been sent yet."}
                            </p>
                        </div>
                        <Link
                            href={`/admin/delegate-registrations`}
                            className="ml-auto flex items-center gap-1.5 text-xs text-[#abb9e8] hover:text-white transition-colors"
                        >
                            <Mail size={13} /> Resend via list
                        </Link>
                    </div>

                    {/* Timestamps */}
                    <Section icon={Calendar} title="Timestamps">
                        <Field
                            label="Registered At"
                            value={reg.createdAt ? new Date(reg.createdAt).toLocaleString("en-IN") : null}
                        />
                        <Field
                            label="Last Updated"
                            value={reg.updatedAt ? new Date(reg.updatedAt).toLocaleString("en-IN") : null}
                        />
                        <Field label="Registration ID" value={reg.id} />
                    </Section>
                </div>
            </div>
        </div>
    );
}
