
import { prisma } from "@/lib/prisma";
import { CheckCircle, XCircle, Calendar, MapPin, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Next.js 15/16: Params are a Promise
interface PageProps {
    params: Promise<{ ticketNumber: string }>;
}

export const dynamic = "force-dynamic";

export default async function VerifyTicketPage(props: PageProps) {
    const params = await props.params;
    const { ticketNumber } = params;

    if (!ticketNumber) return notFound();

    const ticket = await prisma.ticketOrder.findFirst({
        where: { ticketNumber },
        include: { ticketType: true }
    });

    const isValid = !!ticket && ticket.status !== "cancelled" && ticket.status !== "refunded";

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

                {/* Header */}
                <div className={`p-6 text-center ${isValid ? "bg-green-600" : "bg-red-600"}`}>
                    {isValid ? (
                        <div className="flex flex-col items-center text-white">
                            <CheckCircle size={64} className="mb-4" />
                            <h1 className="text-2xl font-bold">Valid Ticket</h1>
                            <p className="text-green-100 text-sm mt-1">Verified Successfully</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-white">
                            <XCircle size={64} className="mb-4" />
                            <h1 className="text-2xl font-bold">Invalid Ticket</h1>
                            <p className="text-red-100 text-sm mt-1">Ticket not found or cancelled</p>
                        </div>
                    )}
                </div>

                {/* Content */}
                {isValid && ticket ? (
                    <div className="p-8 space-y-6">

                        <div className="text-center border-b border-slate-100 pb-6">
                            <h2 className="text-xl font-serif font-bold text-slate-900 mb-1">Dubai 2026</h2>
                            <p className="text-slate-500 text-sm">Global Legal Conference</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendee</p>
                                    <p className="font-semibold text-slate-900 text-lg">{ticket.buyerName}</p>
                                    <p className="text-slate-600 text-sm">{ticket.buyerEmail}</p>
                                </div>
                            </div>

                            {/* Design/Org Parsing */}
                            {ticket.notes && (
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role</p>
                                        <p className="font-medium text-slate-700">{ticket.notes}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-4">
                                <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pass Type</p>
                                    <p className="font-medium text-slate-700">{ticket.ticketType.name}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Ticket ID</p>
                                    <p className="font-mono text-slate-600 text-sm">{ticket.ticketNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
                                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                        {ticket.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="pt-6 border-t border-slate-100 text-center">
                            <p className="text-xs text-slate-400">Scan Time: {new Date().toLocaleString()}</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 text-center text-slate-600">
                        <p>The ticket ID <strong>{ticketNumber}</strong> could not be verified in our system.</p>
                        <p className="mt-4 text-sm">Please contact support if you believe this is an error.</p>
                    </div>
                )}

                <div className="bg-slate-50 p-4 text-center">
                    <Link href="/" className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors">
                        Back to LexTalk World
                    </Link>
                </div>

            </div>
        </main>
    );
}
