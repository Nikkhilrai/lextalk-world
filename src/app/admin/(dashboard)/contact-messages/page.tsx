"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Building, Clock, Trash2, Eye, MessageSquare, RefreshCw } from "lucide-react";
import { getContactMessages, updateContactMessageStatus, deleteContactMessage } from "@/actions/contact";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    subject: string;
    message: string;
    status: string;
    createdAt: Date;
}

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [filter, setFilter] = useState<string>("all");

    const fetchMessages = async () => {
        setLoading(true);
        const data = await getContactMessages();
        console.log("Fetched messages in admin:", data);
        setMessages(data as ContactMessage[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleStatusChange = async (id: string, status: string) => {
        await updateContactMessageStatus(id, status);
        fetchMessages();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            await deleteContactMessage(id);
            fetchMessages();
            if (selectedMessage?.id === id) {
                setSelectedMessage(null);
            }
        }
    };

    const filteredMessages = messages.filter((msg) => {
        if (filter === "all") return true;
        return msg.status === filter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "New":
                return "bg-blue-100 text-blue-700";
            case "Read":
                return "bg-amber-100 text-amber-700";
            case "Replied":
                return "bg-emerald-100 text-emerald-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
                    <p className="text-slate-500 mt-1">View and manage contact form submissions</p>
                </div>
                <button
                    onClick={fetchMessages}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-200 pb-2">
                {["all", "New", "Read", "Replied"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                            ? "bg-amber-500 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                    >
                        {status === "all" ? "All" : status}
                        <span className="ml-2 text-xs opacity-70">
                            ({status === "all" ? messages.length : messages.filter((m) => m.status === status).length})
                        </span>
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredMessages.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
                    <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg">No messages found</p>
                    <p className="text-slate-400 text-sm mt-1">Contact form submissions will appear here</p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Messages List */}
                    <div className="space-y-4">
                        {filteredMessages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => {
                                    setSelectedMessage(msg);
                                    if (msg.status === "New") {
                                        handleStatusChange(msg.id, "Read");
                                    }
                                }}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedMessage?.id === msg.id
                                    ? "border-amber-500 bg-amber-50"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{msg.name}</h3>
                                        <p className="text-sm text-slate-500">{msg.email}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                                        {msg.status}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-slate-700 mb-1">{msg.subject}</p>
                                <p className="text-sm text-slate-500 line-clamp-2">{msg.message}</p>
                                <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
                                    <Clock size={12} />
                                    {formatDate(msg.createdAt)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Detail */}
                    {selectedMessage ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-6 h-fit">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedMessage.name}</h2>
                                    <p className="text-slate-500">{selectedMessage.subject}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(selectedMessage.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail size={16} className="text-slate-400" />
                                    <a href={`mailto:${selectedMessage.email}`} className="text-amber-600 hover:underline">
                                        {selectedMessage.email}
                                    </a>
                                </div>
                                {selectedMessage.phone && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone size={16} className="text-slate-400" />
                                        <a href={`tel:${selectedMessage.phone}`} className="text-slate-700">
                                            {selectedMessage.phone}
                                        </a>
                                    </div>
                                )}
                                {selectedMessage.company && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Building size={16} className="text-slate-400" />
                                        <span className="text-slate-700">{selectedMessage.company}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-sm">
                                    <Clock size={16} className="text-slate-400" />
                                    <span className="text-slate-500">{formatDate(selectedMessage.createdAt)}</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-4 mb-6">
                                <h3 className="text-sm font-semibold text-slate-700 mb-2">Message</h3>
                                <p className="text-slate-600 whitespace-pre-wrap">{selectedMessage.message}</p>
                            </div>

                            {/* Status Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleStatusChange(selectedMessage.id, "New")}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${selectedMessage.status === "New"
                                        ? "bg-blue-500 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                >
                                    New
                                </button>
                                <button
                                    onClick={() => handleStatusChange(selectedMessage.id, "Read")}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${selectedMessage.status === "Read"
                                        ? "bg-amber-500 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                >
                                    Read
                                </button>
                                <button
                                    onClick={() => handleStatusChange(selectedMessage.id, "Replied")}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${selectedMessage.status === "Replied"
                                        ? "bg-emerald-500 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                >
                                    Replied
                                </button>
                            </div>

                            {/* Reply Button */}
                            <a
                                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                className="block w-full mt-4 py-3 bg-amber-500 hover:bg-amber-600 text-white text-center font-semibold rounded-lg transition-colors"
                            >
                                Reply via Email
                            </a>
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex items-center justify-center min-h-[400px]">
                            <div className="text-center">
                                <Eye size={48} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-500">Select a message to view details</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
