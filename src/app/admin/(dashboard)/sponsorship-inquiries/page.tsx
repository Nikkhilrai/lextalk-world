"use client";

import { useEffect, useState } from "react";

import { Building2, Mail, Phone, MapPin, FileText, Calendar, Filter } from "lucide-react";

interface SponsorshipInquiry {
    id: string;
    fullName: string;
    email: string;
    contactNumber: string;
    country: string;
    organization: string;
    designation: string;
    additionalInfo?: string;
    attachmentUrl?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export default function SponsorshipInquiriesPage() {
    const [inquiries, setInquiries] = useState<SponsorshipInquiry[]>([]);
    const [filteredInquiries, setFilteredInquiries] = useState<SponsorshipInquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        fetchInquiries();
    }, []);

    useEffect(() => {
        if (statusFilter === "All") {
            setFilteredInquiries(inquiries);
        } else {
            setFilteredInquiries(inquiries.filter((inquiry) => inquiry.status === statusFilter));
        }
    }, [statusFilter, inquiries]);

    const fetchInquiries = async () => {
        try {
            const response = await fetch("/api/sponsorship-inquiry");
            const data = await response.json();
            if (data.success) {
                setInquiries(data.data);
                setFilteredInquiries(data.data);
            }
        } catch (error) {
            console.error("Error fetching inquiries:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/sponsorship-inquiry/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchInquiries();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "New":
                return "bg-blue-100 text-blue-800";
            case "Contacted":
                return "bg-yellow-100 text-yellow-800";
            case "Converted":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Sponsorship Inquiries</h1>
                <p className="text-slate-500">Manage and track sponsorship inquiries</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Total Inquiries</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {inquiries.length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">New</p>
                                <p className="text-3xl font-bold text-blue-900 mt-1">
                                    {inquiries.filter((i) => i.status === "New").length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Contacted</p>
                                <p className="text-3xl font-bold text-yellow-900 mt-1">
                                    {inquiries.filter((i) => i.status === "Contacted").length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Phone className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Converted</p>
                                <p className="text-3xl font-bold text-green-900 mt-1">
                                    {inquiries.filter((i) => i.status === "Converted").length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-slate-200">
                    <div className="flex items-center gap-4">
                        <Filter className="w-5 h-5 text-slate-500" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        >
                            <option value="All">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                        </select>
                    </div>
                </div>

                {/* Inquiries List */}
                {isLoading ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-slate-200">
                        <p className="text-slate-500">Loading inquiries...</p>
                    </div>
                ) : filteredInquiries.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-slate-200">
                        <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No sponsorship inquiries found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredInquiries.map((inquiry) => (
                            <div
                                key={inquiry.id}
                                className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    {/* Main Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {inquiry.fullName}
                                                </h3>
                                                <p className="text-sm text-slate-500">
                                                    {inquiry.designation} at {inquiry.organization}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                    inquiry.status
                                                )}`}
                                            >
                                                {inquiry.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Mail className="w-4 h-4 text-slate-400" />
                                                <a
                                                    href={`mailto:${inquiry.email}`}
                                                    className="hover:text-amber-600 transition-colors"
                                                >
                                                    {inquiry.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Phone className="w-4 h-4 text-slate-400" />
                                                <a
                                                    href={`tel:${inquiry.contactNumber}`}
                                                    className="hover:text-amber-600 transition-colors"
                                                >
                                                    {inquiry.contactNumber}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                {inquiry.country}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {new Date(inquiry.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {inquiry.additionalInfo && (
                                            <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                                <p className="text-sm font-semibold text-slate-700 mb-1">
                                                    Additional Information:
                                                </p>
                                                <p className="text-sm text-slate-600">
                                                    {inquiry.additionalInfo}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex lg:flex-col gap-2">
                                        <select
                                            value={inquiry.status}
                                            onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                                            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        >
                                            <option value="New">New</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Converted">Converted</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
