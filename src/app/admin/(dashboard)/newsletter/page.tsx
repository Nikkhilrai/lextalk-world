"use client";

import { useState, useEffect } from "react";
import { getSubscribers, deleteSubscriber } from "@/actions/newsletter";
import { Mail, Trash2, Download, Copy, RefreshCw } from "lucide-react";
import { format } from "date-fns";

export default function NewsletterPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadSubscribers = async () => {
        setIsLoading(true);
        const result = await getSubscribers();
        if (result.success) {
            setSubscribers(result.subscribers);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadSubscribers();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to remove this subscriber?")) {
            await deleteSubscriber(id);
            loadSubscribers();
        }
    };

    const copyEmails = () => {
        const emails = subscribers.map(s => s.email).join(", ");
        navigator.clipboard.writeText(emails);
        alert("All emails copied to clipboard!");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Newsletter Subscribers</h1>
                    <p className="text-slate-400 text-sm">Manage your email list for marketing campaigns.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={copyEmails}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2 border border-slate-700"
                    >
                        <Copy size={16} />
                        Copy Emails
                    </button>
                    <button
                        onClick={loadSubscribers}
                        className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Total Subscribers</p>
                            <h3 className="text-2xl font-bold text-white">{subscribers.length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-950/50 text-slate-400 text-sm border-b border-slate-800">
                                <th className="px-6 py-4 font-medium">Email Address</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Joined Date</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        Loading subscribers...
                                    </td>
                                </tr>
                            ) : subscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        No subscribers yet.
                                    </td>
                                </tr>
                            ) : (
                                subscribers.map((sub) => (
                                    <tr key={sub.id} className="group hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                                                    {sub.email.substring(0, 2)}
                                                </div>
                                                <span className="text-slate-200 text-sm">{sub.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">
                                            {format(new Date(sub.createdAt), "MMM d, yyyy")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(sub.id)}
                                                className="text-slate-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                                                title="Remove Subscriber"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
