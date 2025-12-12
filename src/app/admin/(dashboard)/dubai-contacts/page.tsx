"use client";

import { useState, useMemo } from "react";
import { Search, Download, Filter, Users, MapPin, Building2, Briefcase, Mail, Phone, CheckCircle, XCircle } from "lucide-react";

interface Contact {
    id: string;
    fullName: string;
    email: string;
    contact: string;
    country: string;
    organization: string;
    designation: string;
    previouslyAttended: boolean;
    previousConference: string | null;
    type: "Speaker" | "Attendee" | "Sponsor" | "Potential";
}

// Curated sample data for Dubai legal conference contacts
const SAMPLE_CONTACTS: Contact[] = [
    {
        id: "1",
        fullName: "Ahmed Al Hammadi",
        email: "ahmed.alhammadi@legaldubai.ae",
        contact: "+971 50 123 4567",
        country: "UAE",
        organization: "Al Hammadi Law Firm",
        designation: "Managing Partner",
        previouslyAttended: true,
        previousConference: "Dubai Legal Week 2024",
        type: "Speaker"
    },
    {
        id: "2",
        fullName: "Sarah Chen",
        email: "sarah.chen@globalcounsel.com",
        contact: "+971 55 234 5678",
        country: "UAE",
        organization: "Global Counsel LLP",
        designation: "Senior Associate",
        previouslyAttended: true,
        previousConference: "MENA Legal Summit 2023",
        type: "Attendee"
    },
    {
        id: "3",
        fullName: "Mohammed Al Rashid",
        email: "m.alrashid@emirates-legal.ae",
        contact: "+971 56 345 6789",
        country: "UAE",
        organization: "Emirates Legal Advisors",
        designation: "Partner",
        previouslyAttended: false,
        previousConference: null,
        type: "Potential"
    },
    {
        id: "4",
        fullName: "Dr. Fatima Al Zahra",
        email: "fatima.alzahra@uaeu.ac.ae",
        contact: "+971 52 456 7890",
        country: "UAE",
        organization: "UAE University",
        designation: "Professor of Law",
        previouslyAttended: true,
        previousConference: "Gulf Legal Forum 2024",
        type: "Speaker"
    },
    {
        id: "5",
        fullName: "James Wilson",
        email: "jwilson@cliffordchance.com",
        contact: "+971 54 567 8901",
        country: "UK",
        organization: "Clifford Chance Dubai",
        designation: "Partner - Corporate",
        previouslyAttended: true,
        previousConference: "Dubai Arbitration Week 2023",
        type: "Speaker"
    },
    {
        id: "6",
        fullName: "Priya Sharma",
        email: "priya.sharma@legaltechme.com",
        contact: "+971 58 678 9012",
        country: "India",
        organization: "LegalTech ME",
        designation: "CEO & Founder",
        previouslyAttended: true,
        previousConference: "Legal Innovation Summit 2024",
        type: "Sponsor"
    },
    {
        id: "7",
        fullName: "Khalid Al Mansoori",
        email: "khalid@difc-courts.ae",
        contact: "+971 50 789 0123",
        country: "UAE",
        organization: "DIFC Courts",
        designation: "Registrar",
        previouslyAttended: true,
        previousConference: "DIFC Legal Week 2024",
        type: "Speaker"
    },
    {
        id: "8",
        fullName: "Lisa Thompson",
        email: "lthompson@allenandovery.com",
        contact: "+971 55 890 1234",
        country: "USA",
        organization: "Allen & Overy",
        designation: "Counsel - Disputes",
        previouslyAttended: false,
        previousConference: null,
        type: "Potential"
    },
    {
        id: "9",
        fullName: "Abdullah bin Saeed",
        email: "abdullah@adgm.ae",
        contact: "+971 56 901 2345",
        country: "UAE",
        organization: "ADGM",
        designation: "Head of Legal",
        previouslyAttended: true,
        previousConference: "Abu Dhabi Legal Week 2024",
        type: "Attendee"
    },
    {
        id: "10",
        fullName: "Rania Khoury",
        email: "rania.khoury@bakermckenzie.com",
        contact: "+971 52 012 3456",
        country: "Lebanon",
        organization: "Baker McKenzie",
        designation: "Associate Partner",
        previouslyAttended: true,
        previousConference: "MENA Corporate Counsel Summit 2023",
        type: "Speaker"
    },
    {
        id: "11",
        fullName: "Dr. Hassan Al Mulla",
        email: "hassan.almulla@moj.gov.ae",
        contact: "+971 54 123 0987",
        country: "UAE",
        organization: "Ministry of Justice UAE",
        designation: "Legal Advisor",
        previouslyAttended: true,
        previousConference: "Government Legal Forum 2024",
        type: "Speaker"
    },
    {
        id: "12",
        fullName: "Emily Roberts",
        email: "eroberts@linklaters.com",
        contact: "+971 58 234 9876",
        country: "UK",
        organization: "Linklaters LLP",
        designation: "Senior Associate",
        previouslyAttended: false,
        previousConference: null,
        type: "Potential"
    },
    {
        id: "13",
        fullName: "Naveen Patel",
        email: "naveen@casedocker.com",
        contact: "+971 50 345 8765",
        country: "India",
        organization: "CaseDocker",
        designation: "Co-Founder",
        previouslyAttended: true,
        previousConference: "LegalTech Dubai 2024",
        type: "Sponsor"
    },
    {
        id: "14",
        fullName: "Mariam Al Suwaidi",
        email: "mariam@dubaicourtslegal.ae",
        contact: "+971 55 456 7654",
        country: "UAE",
        organization: "Dubai Courts",
        designation: "Judge",
        previouslyAttended: true,
        previousConference: "Judicial Conference 2024",
        type: "Speaker"
    },
    {
        id: "15",
        fullName: "Michael Chang",
        email: "mchang@dlapiper.com",
        contact: "+971 56 567 6543",
        country: "Singapore",
        organization: "DLA Piper",
        designation: "Partner - M&A",
        previouslyAttended: true,
        previousConference: "Cross-Border Legal Summit 2023",
        type: "Attendee"
    }
];

const TYPE_COLORS: Record<string, string> = {
    "Speaker": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Attendee": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Sponsor": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Potential": "bg-slate-500/20 text-slate-400 border-slate-500/30"
};

export default function DubaiContactsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string>("all");
    const [filterAttended, setFilterAttended] = useState<string>("all");

    const filteredContacts = useMemo(() => {
        return SAMPLE_CONTACTS.filter(contact => {
            // Search filter
            const matchesSearch =
                contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.country.toLowerCase().includes(searchTerm.toLowerCase());

            // Type filter
            const matchesType = filterType === "all" || contact.type === filterType;

            // Attendance filter
            const matchesAttended =
                filterAttended === "all" ||
                (filterAttended === "yes" && contact.previouslyAttended) ||
                (filterAttended === "no" && !contact.previouslyAttended);

            return matchesSearch && matchesType && matchesAttended;
        });
    }, [searchTerm, filterType, filterAttended]);

    const handleExportCSV = () => {
        const headers = ["Full Name", "Email", "Contact", "Country", "Organization", "Designation", "Previously Attended", "Previous Conference", "Type"];
        const csvData = filteredContacts.map(c => [
            c.fullName,
            c.email,
            c.contact,
            c.country,
            c.organization,
            c.designation,
            c.previouslyAttended ? "Yes" : "No",
            c.previousConference || "N/A",
            c.type
        ]);

        const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "dubai_legal_contacts.csv";
        a.click();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Users className="text-amber-500" />
                        Dubai Legal Contacts
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Potential speakers, attendees, and legal professionals for Dubai conferences
                    </p>
                </div>
                <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0ab39c] hover:bg-[#099c88] text-white rounded-lg font-medium transition-colors"
                >
                    <Download size={16} />
                    Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email, organization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-slate-500"
                    />
                </div>

                {/* Type Filter */}
                <div className="flex items-center gap-2">
                    <Filter size={16} className="text-slate-400" />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                        <option value="all">All Types</option>
                        <option value="Speaker">Speakers</option>
                        <option value="Attendee">Attendees</option>
                        <option value="Sponsor">Sponsors</option>
                        <option value="Potential">Potential</option>
                    </select>
                </div>

                {/* Attendance Filter */}
                <select
                    value={filterAttended}
                    onChange={(e) => setFilterAttended(e.target.value)}
                    className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                    <option value="all">All Attendance</option>
                    <option value="yes">Previously Attended</option>
                    <option value="no">New Contacts</option>
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">{SAMPLE_CONTACTS.length}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Total Contacts</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">{SAMPLE_CONTACTS.filter(c => c.type === "Speaker").length}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Speakers</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">{SAMPLE_CONTACTS.filter(c => c.previouslyAttended).length}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Previous Attendees</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <div className="text-2xl font-bold text-amber-400">{SAMPLE_CONTACTS.filter(c => c.type === "Sponsor").length}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Sponsors</div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-800/50">
                            <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                                <th className="px-4 py-3 font-semibold">Full Name</th>
                                <th className="px-4 py-3 font-semibold">Email</th>
                                <th className="px-4 py-3 font-semibold">Contact</th>
                                <th className="px-4 py-3 font-semibold">Country</th>
                                <th className="px-4 py-3 font-semibold">Organization</th>
                                <th className="px-4 py-3 font-semibold">Designation</th>
                                <th className="px-4 py-3 font-semibold">Prev. Attended</th>
                                <th className="px-4 py-3 font-semibold">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredContacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-white">{contact.fullName}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <a href={`mailto:${contact.email}`} className="text-[#0ab39c] hover:underline flex items-center gap-1">
                                            <Mail size={12} />
                                            {contact.email}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3">
                                        <a href={`tel:${contact.contact}`} className="text-slate-300 hover:text-white flex items-center gap-1">
                                            <Phone size={12} />
                                            {contact.contact}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1 text-slate-300">
                                            <MapPin size={12} className="text-slate-500" />
                                            {contact.country}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1 text-slate-300">
                                            <Building2 size={12} className="text-slate-500" />
                                            <span className="truncate max-w-[150px]" title={contact.organization}>
                                                {contact.organization}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1 text-slate-300">
                                            <Briefcase size={12} className="text-slate-500" />
                                            <span className="truncate max-w-[120px]" title={contact.designation}>
                                                {contact.designation}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {contact.previouslyAttended ? (
                                            <div className="flex items-center gap-1">
                                                <CheckCircle size={14} className="text-green-500" />
                                                <span className="text-xs text-green-400" title={contact.previousConference || ""}>
                                                    Yes
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <XCircle size={14} className="text-slate-500" />
                                                <span className="text-xs text-slate-500">No</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[10px] px-2 py-1 rounded border font-medium ${TYPE_COLORS[contact.type]}`}>
                                            {contact.type}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredContacts.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No contacts found matching your filters.
                    </div>
                )}

                {/* Footer */}
                <div className="px-4 py-3 border-t border-slate-800 text-sm text-slate-400">
                    Showing {filteredContacts.length} of {SAMPLE_CONTACTS.length} contacts
                </div>
            </div>
        </div>
    );
}
