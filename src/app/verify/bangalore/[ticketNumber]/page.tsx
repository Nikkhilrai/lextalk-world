import { prisma } from "@/lib/prisma";
import { CheckCircle, XCircle, User, Building2, Briefcase, Calendar, MapPin, Hash } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ ticketNumber: string }>;
}

export const dynamic = "force-dynamic";

function passLabel(passType: string): string {
    const map: Record<string, string> = {
        "delegate": "Delegate Pass",
        "delegate-vip": "Delegate VIP Pass",
        "student": "Student Pass",
        "vendor-vip": "Vendor Pass",
        "corporate-counsel": "Corporate Counsel Pass",
        "standard-physical": "Standard Pass",
        "premium-physical": "Premium Pass",
        "exclusive-physical": "Exclusive Pass",
    };
    return map[passType] || passType.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function badgeTitle(passType: string, conferenceSlug: string): string {
    if (conferenceSlug?.includes("awardee") || passType?.includes("awardee")) return "AWARDEE";
    return "DELEGATE";
}

export default async function BangaloreVerifyPage(props: PageProps) {
    const { ticketNumber } = await props.params;
    if (!ticketNumber) return notFound();

    const prismaClient = prisma as any;
    const registration = await prismaClient.delegateRegistration.findFirst({
        where: { ticketNumber },
    });

    const isValid =
        !!registration &&
        registration.paymentStatus === "success" &&
        !registration.passType?.includes("virtual");

    const title = registration
        ? badgeTitle(registration.passType, registration.conferenceSlug || "")
        : "DELEGATE";

    const titleColor = title === "AWARDEE" ? "bg-purple-600" : "bg-amber-500";

    return (
        <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-sm w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200 bg-white">

                {/* Status header */}
                <div className={`p-6 text-center ${isValid ? "bg-[#0f172a]" : "bg-red-600"}`}>
                    {isValid ? (
                        <>
                            {/* Badge title strip */}
                            <div className={`inline-block px-6 py-1.5 rounded-full mb-4 ${titleColor}`}>
                                <span className="text-white font-black text-sm tracking-[0.2em]">{title}</span>
                            </div>
                            <div className="flex flex-col items-center text-white">
                                <CheckCircle size={52} className="mb-3 text-green-400" />
                                <h1 className="text-2xl font-bold">Valid Pass</h1>
                                <p className="text-slate-400 text-sm mt-1">Verified Successfully</p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-white">
                            <XCircle size={52} className="mb-3" />
                            <h1 className="text-2xl font-bold">Invalid Pass</h1>
                            <p className="text-red-200 text-sm mt-1">Pass not found or payment incomplete</p>
                        </div>
                    )}
                </div>

                {/* Amber accent bar */}
                {isValid && <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />}

                {isValid && registration ? (
                    <div className="p-6 space-y-5">

                        {/* Event info */}
                        <div className="text-center pb-4 border-b border-slate-100">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-1">LexTalk World</p>
                            <h2 className="text-lg font-serif font-bold text-slate-900">Bangalore 2026</h2>
                            <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-500 text-xs">
                                <Calendar size={11} />
                                <span>June 11, 2026</span>
                                <span className="text-slate-300">·</span>
                                <MapPin size={11} />
                                <span>Radisson Blu Atria, Bangalore</span>
                            </div>
                        </div>

                        {/* Attendee details */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-amber-50 p-2 rounded-lg text-amber-600 shrink-0">
                                    <User size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendee</p>
                                    <p className="font-bold text-slate-900 text-base leading-tight">
                                        {registration.firstName} {registration.lastName}
                                    </p>
                                    <p className="text-slate-500 text-xs mt-0.5">{registration.email}</p>
                                </div>
                            </div>

                            {registration.organization && (
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600 shrink-0">
                                        <Building2 size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Organisation</p>
                                        <p className="font-semibold text-slate-800 text-sm">{registration.organization}</p>
                                        {registration.designation && (
                                            <p className="text-slate-500 text-xs">{registration.designation}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <div className="bg-purple-50 p-2 rounded-lg text-purple-600 shrink-0">
                                    <Briefcase size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pass Type</p>
                                    <p className="font-semibold text-slate-800 text-sm">{passLabel(registration.passType)}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-slate-50 p-2 rounded-lg text-slate-600 shrink-0">
                                    <Hash size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pass ID</p>
                                    <p className="font-mono font-bold text-slate-900 text-sm tracking-wide">{registration.ticketNumber}</p>
                                </div>
                            </div>
                        </div>

                        {/* Status chip */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                <CheckCircle size={11} />
                                PAYMENT CONFIRMED
                            </span>
                            <p className="text-[10px] text-slate-400">
                                {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true })}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 text-center text-slate-600">
                        <p className="mb-2">Pass ID <strong className="font-mono">{ticketNumber}</strong> could not be verified.</p>
                        <p className="text-sm text-slate-400">Please contact the registration desk for assistance.</p>
                    </div>
                )}

                <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-100">
                    <Link href="/" className="text-xs font-bold text-slate-500 hover:text-amber-600 transition-colors">
                        lextalkworld.in
                    </Link>
                </div>
            </div>
        </main>
    );
}
