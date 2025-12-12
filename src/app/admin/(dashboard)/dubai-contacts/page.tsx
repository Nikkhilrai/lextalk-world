"use client";

import { useState, useMemo } from "react";
import { Search, Download, Filter, Users, MapPin, Building2, Briefcase, Mail, Phone, CheckCircle, XCircle, FileSpreadsheet, FileText, Send, X } from "lucide-react";
import { sendInvitations, sendTestInvitation } from "@/actions/invitation";

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
    linkedin?: string | null;
}

// Real publicly available speaker data from Dubai legal conferences
// Sources: LexTalk World 2024, Legal500 GC Summit, IIPLA 2024, GLA events, M&A Summit 2025
const SAMPLE_CONTACTS: Contact[] = [
    // LexTalk World Dubai 2024 Speakers (Verified from lextalk.world)
    { id: "1", fullName: "Dr. Yasser Abo Ismail", email: "", contact: "", country: "UAE", organization: "Schindler Group", designation: "General Counsel & Compliance Officer MENA", previouslyAttended: true, previousConference: "LexTalk World Dubai 2024", type: "Speaker", linkedin: "https://www.linkedin.com/in/yasseraboismail/" },
    { id: "2", fullName: "Chehade El Kahi", email: "", contact: "", country: "UAE", organization: "Emirates Petroleum", designation: "General Counsel Legal", previouslyAttended: true, previousConference: "LexTalk World Dubai 2024", type: "Speaker" },
    { id: "3", fullName: "Sara Darazirar Vonk", email: "", contact: "", country: "UAE", organization: "LIXIL", designation: "Leader Legal & Compliance, MEA", previouslyAttended: true, previousConference: "LexTalk World Dubai 2024", type: "Speaker" },
    { id: "4", fullName: "Helen Grant", email: "", contact: "", country: "UAE", organization: "DNV", designation: "Group Legal Counsel, Middle East & Asia Pacific", previouslyAttended: true, previousConference: "LexTalk World Dubai 2024", type: "Speaker" },
    { id: "5", fullName: "Anna Kobzar", email: "", contact: "", country: "UAE", organization: "Seddiqi Holding LLC", designation: "Senior Legal Counsel", previouslyAttended: true, previousConference: "LexTalk World Dubai 2024", type: "Speaker" },
    { id: "6", fullName: "Beatriz Gomez Nosti", email: "", contact: "", country: "UAE", organization: "Amadeus IT Group", designation: "Senior Manager, Legal Head for MEA", previouslyAttended: true, previousConference: "LexTalk World Dubai 2024", type: "Speaker" },
    { id: "7", fullName: "Tawfiq Adnan Zuwayyed", email: "", contact: "", country: "UAE", organization: "Commercial Bank International", designation: "General Legal Counsel", previouslyAttended: true, previousConference: "LexTalk World Dubai 2024", type: "Speaker" },
    { id: "8", fullName: "N K Bhatnagar", email: "", contact: "", country: "UAE", organization: "NKB LEGAL", designation: "Managing Partner", previouslyAttended: true, previousConference: "LexTalk World Dubai 2024", type: "Speaker" },
    // Legal500 GC Summit Middle East 2025 Speakers
    { id: "10", fullName: "Patrik Daintry", email: "", contact: "", country: "UAE", organization: "CMS", designation: "Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "11", fullName: "Bashar Hanna El Nashef", email: "", contact: "", country: "UAE", organization: "Al Majd Law Firm", designation: "Legal Director", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "12", fullName: "Ahmed Omar Hashim", email: "", contact: "", country: "UAE", organization: "Al Majd Law Firm", designation: "Head of Dispute Resolution", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "13", fullName: "Shahram Safai", email: "", contact: "", country: "UAE", organization: "Afridi & Angell", designation: "Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "14", fullName: "Melissa Forbes-Miranda", email: "", contact: "", country: "UAE", organization: "Stephenson Harwood LLP", designation: "Partner, M&A", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "15", fullName: "Joel Vertes", email: "", contact: "", country: "UAE", organization: "CMS", designation: "Partner and Head of IP", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "16", fullName: "Mohammad Mostofinejad", email: "", contact: "", country: "UAE", organization: "Nestlé", designation: "Senior Legal Counsel", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "17", fullName: "Ed Reilly", email: "", contact: "", country: "UAE", organization: "Standard Chartered Bank", designation: "Senior Legal Counsel", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "18", fullName: "Ahmed Zaki", email: "", contact: "", country: "UAE", organization: "Al Hamra Group", designation: "Senior VP Legal Affairs", previouslyAttended: true, previousConference: "Global Litigation ConfEx 2024", type: "Speaker" },
    { id: "19", fullName: "Tarek Nakkach", email: "", contact: "", country: "UAE", organization: "Kyndryl", designation: "Director and General Counsel, MEA", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "20", fullName: "Yosr Hamza", email: "", contact: "", country: "UAE", organization: "Gartner", designation: "General Counsel", previouslyAttended: true, previousConference: "IIPLA Dubai 2024", type: "Speaker", linkedin: "https://www.linkedin.com/in/yosrhamza/" },
    // IIPLA Dubai 2024 Speakers
    { id: "21", fullName: "James M. Hall", email: "", contact: "", country: "USA", organization: "Global GC", designation: "CEO and Founder", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    { id: "22", fullName: "Saloni Tuteja", email: "", contact: "", country: "UAE", organization: "Les Laboratoires Servier", designation: "Head of Legal – Middle East", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    { id: "23", fullName: "Matthew Scott Lowe", email: "", contact: "", country: "Saudi Arabia", organization: "SABIC", designation: "Sr. Counsel, IP", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    { id: "24", fullName: "Sameet Gambhir", email: "", contact: "", country: "India", organization: "DCM Shriram LTD", designation: "VP Corp. Law & Company Secretary", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    { id: "25", fullName: "Muna Farid", email: "", contact: "", country: "UAE", organization: "Hatch Consulting FZE", designation: "Director", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    { id: "26", fullName: "Karim Elhelaly", email: "", contact: "", country: "UAE", organization: "VIU UAE", designation: "Group Legal Advisor", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    { id: "27", fullName: "Marium Razzaq", email: "", contact: "", country: "UK", organization: "JMR Solicitors", designation: "Equity Partner", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    { id: "28", fullName: "Hawraa Hammoud", email: "", contact: "", country: "UAE", organization: "Abou Naja IP Firm", designation: "IP Specialist", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    { id: "29", fullName: "Mona Adel", email: "", contact: "", country: "UAE", organization: "United Trademark & Patent Services", designation: "Legal Consultant", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    { id: "30", fullName: "Deepak Sriniwas", email: "", contact: "", country: "India", organization: "Rajeshwari & Associate", designation: "Partner", previouslyAttended: true, previousConference: "IIPLA 2024 Dubai", type: "Speaker" },
    // M&A Summit 2025 Speakers
    { id: "31", fullName: "Marcus Booth", email: "", contact: "", country: "UAE", organization: "White & Case", designation: "Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "32", fullName: "Anwar El Khatib", email: "", contact: "", country: "UAE", organization: "Salik", designation: "Chief Legal Counsel", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "33", fullName: "Joanna Maria El Khoury", email: "", contact: "", country: "UAE", organization: "Morgan Lewis", designation: "Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "34", fullName: "Chadi Salloum", email: "", contact: "", country: "UAE", organization: "Greenberg Traurig", designation: "Shareholder", previouslyAttended: false, previousConference: null, type: "Potential" },
    // GLA Concordium Dubai 2025 Speakers
    { id: "35", fullName: "Lena Dridi", email: "", contact: "", country: "UAE", organization: "DiliTrust", designation: "Legal Counsel & Alliances Mgr", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "36", fullName: "Kishore Jaichandani", email: "", contact: "", country: "UAE", organization: "CAVEAT CAPITAL", designation: "Founder & Managing Director", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "37", fullName: "Abduraheem Padinhare", email: "", contact: "", country: "UAE", organization: "CARS24 Arabia", designation: "Legal Manager", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "38", fullName: "Maria John", email: "", contact: "", country: "UAE", organization: "Bird & Bird", designation: "Senior Associate", previouslyAttended: false, previousConference: null, type: "Potential" },
    // Global Legal ConfEx 2025 Speakers
    { id: "39", fullName: "Anami Bhattacharyya", email: "", contact: "", country: "UAE", organization: "SLB (Schlumberger)", designation: "General Counsel – MENA", previouslyAttended: false, previousConference: null, type: "Potential", linkedin: "https://www.linkedin.com/in/anami-bhattacharyya/" },
    { id: "40", fullName: "Heba Hamdy", email: "", contact: "", country: "UAE", organization: "Cisco", designation: "EMEA Cybersecurity Legal Lead", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "41", fullName: "Purvi Patel", email: "", contact: "", country: "UAE", organization: "Nokia", designation: "Senior Counsel - Strategy", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "42", fullName: "Eman ElSharkawy", email: "", contact: "", country: "UAE", organization: "AbbVie", designation: "Regional Compliance Director", previouslyAttended: false, previousConference: null, type: "Potential" },
    // IBA Arbitration Summit Speakers
    { id: "43", fullName: "Soraya Corm-Bakhos", email: "", contact: "", country: "UAE", organization: "Independent", designation: "Arbitrator", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "44", fullName: "Zarghona Fazal", email: "", contact: "", country: "UAE", organization: "Hadef & Partners", designation: "Partner, Arbitration", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "45", fullName: "Robert Volterra", email: "", contact: "", country: "UK", organization: "Volterra Fietta", designation: "Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "46", fullName: "Jehad Abdulrazzaq Kazim", email: "", contact: "", country: "UAE", organization: "DIAC", designation: "Executive Director", previouslyAttended: false, previousConference: null, type: "Potential" },
    // DIFC Academy Summit Speakers
    { id: "47", fullName: "Clotilde Iaia-Polak", email: "", contact: "", country: "UAE", organization: "Yungo Law", designation: "Managing Partner", previouslyAttended: true, previousConference: "Dubai Legal Ops Summit 2024", type: "Speaker" },
    { id: "48", fullName: "James Donald", email: "", contact: "", country: "UAE", organization: "Accor", designation: "General Counsel", previouslyAttended: true, previousConference: "Dubai Legal Ops Summit 2024", type: "Speaker" },
    // Addleshaw Goddard GC Forum Speakers
    { id: "49", fullName: "Kellie Blyth", email: "", contact: "", country: "UAE", organization: "Addleshaw Goddard", designation: "Partner", previouslyAttended: true, previousConference: "GC Forum Middle East 2024", type: "Speaker" },
    { id: "50", fullName: "Robin Hickman", email: "", contact: "", country: "UAE", organization: "Addleshaw Goddard", designation: "Head of Region ME", previouslyAttended: true, previousConference: "GC Forum Middle East 2024", type: "Speaker" },
    { id: "51", fullName: "Katie Whang", email: "", contact: "", country: "UAE", organization: "Johnson & Johnson", designation: "Legal Counsel", previouslyAttended: true, previousConference: "GC Forum Middle East 2024", type: "Speaker" },
    // Additional professionals
    { id: "52", fullName: "Akanksha Raha", email: "", contact: "", country: "India", organization: "UnifiedHorizons", designation: "Founder", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "53", fullName: "Yiannos Georgiades", email: "", contact: "", country: "Cyprus", organization: "Y.Georgiades & Associates", designation: "Managing Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "54", fullName: "Swapnil Gaur", email: "", contact: "", country: "India", organization: "Rajeshwari & Associates", designation: "Senior Associate", previouslyAttended: false, previousConference: null, type: "Potential" },
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

    // Email invitation state
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailSubject, setEmailSubject] = useState("You're Invited to LexTalk World Summit 2026!");
    const [emailMessage, setEmailMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sendProgress, setSendProgress] = useState({ sent: 0, total: 0 });
    const [sendResult, setSendResult] = useState<{ sent: number; failed: number } | null>(null);

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

    const handleExportExcel = async () => {
        const XLSX = await import("xlsx");
        const headers = ["Full Name", "Email", "Contact", "Country", "Organization", "Designation", "Previously Attended", "Previous Conference", "Type"];
        const data = filteredContacts.map(c => ({
            "Full Name": c.fullName,
            "Email": c.email,
            "Contact": c.contact,
            "Country": c.country,
            "Organization": c.organization,
            "Designation": c.designation,
            "Previously Attended": c.previouslyAttended ? "Yes" : "No",
            "Previous Conference": c.previousConference || "N/A",
            "Type": c.type
        }));

        const ws = XLSX.utils.json_to_sheet(data, { header: headers });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Contacts");
        XLSX.writeFile(wb, "dubai_legal_contacts.xlsx");
    };

    const handleExportPDF = async () => {
        const { default: jsPDF } = await import("jspdf");
        const autoTable = (await import("jspdf-autotable")).default;

        const doc = new jsPDF({ orientation: "landscape" });
        doc.setFontSize(16);
        doc.text("Dubai Legal Conference Contacts", 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 22);

        const headers = [["Name", "Email", "Contact", "Country", "Organization", "Designation", "Attended", "Previous Event", "Type"]];
        const data = filteredContacts.map(c => [
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

        autoTable(doc, {
            head: headers,
            body: data,
            startY: 28,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [64, 81, 137] }
        });

        doc.save("dubai_legal_contacts.pdf");
    };

    // Selection handlers
    const toggleSelect = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredContacts.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredContacts.map(c => c.id)));
        }
    };

    const handleSendInvitations = async () => {
        const selected = filteredContacts.filter(c => selectedIds.has(c.id));
        if (selected.length === 0) return;

        setIsSending(true);
        setSendProgress({ sent: 0, total: selected.length });
        setSendResult(null);

        const contacts = selected.map(c => ({
            fullName: c.fullName,
            email: c.email,
            organization: c.organization
        }));

        const result = await sendInvitations(contacts, emailSubject, emailMessage);

        setSendResult({ sent: result.sent, failed: result.failed });
        setIsSending(false);

        if (result.success) {
            setSelectedIds(new Set());
            setTimeout(() => {
                setShowEmailModal(false);
                setSendResult(null);
            }, 2000);
        }
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
                <div className="flex gap-2">
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Download size={14} />
                        CSV
                    </button>
                    <button
                        onClick={handleExportExcel}
                        className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <FileSpreadsheet size={14} />
                        Excel
                    </button>
                    <button
                        onClick={handleExportPDF}
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <FileText size={14} />
                        PDF
                    </button>
                    <button
                        onClick={() => setShowEmailModal(true)}
                        disabled={selectedIds.size === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Send size={14} />
                        Send Invitation
                        {selectedIds.size > 0 && (
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">{selectedIds.size}</span>
                        )}
                    </button>
                </div>
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
                                <th className="px-3 py-3 w-10">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.size === filteredContacts.length && filteredContacts.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
                                    />
                                </th>
                                <th className="px-4 py-3 font-semibold">Full Name</th>
                                <th className="px-4 py-3 font-semibold">Email</th>
                                <th className="px-4 py-3 font-semibold">Contact</th>
                                <th className="px-4 py-3 font-semibold">Country</th>
                                <th className="px-4 py-3 font-semibold">Organization</th>
                                <th className="px-4 py-3 font-semibold">Designation</th>
                                <th className="px-4 py-3 font-semibold">Prev. Attended</th>
                                <th className="px-4 py-3 font-semibold">Previous Event</th>
                                <th className="px-4 py-3 font-semibold">LinkedIn</th>
                                <th className="px-4 py-3 font-semibold">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredContacts.map((contact) => (
                                <tr key={contact.id} className={`hover:bg-slate-800/30 transition-colors ${selectedIds.has(contact.id) ? 'bg-amber-500/5' : ''}`}>
                                    <td className="px-3 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.has(contact.id)}
                                            onChange={() => toggleSelect(contact.id)}
                                            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
                                        />
                                    </td>
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
                                        <span className="text-xs text-slate-300 truncate max-w-[150px] block" title={contact.previousConference || ""}>
                                            {contact.previousConference || "—"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {contact.linkedin ? (
                                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0ab39c] hover:underline text-xs">
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-xs text-slate-500">—</span>
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
                    {selectedIds.size > 0 && <span className="ml-2 text-amber-400">• {selectedIds.size} selected</span>}
                </div>
            </div>

            {/* Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg">
                        <div className="flex items-center justify-between p-5 border-b border-slate-800">
                            <div>
                                <h3 className="text-lg font-bold text-white">Send Invitations</h3>
                                <p className="text-sm text-slate-400 mt-1">
                                    Sending to {selectedIds.size} contact{selectedIds.size !== 1 ? 's' : ''}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowEmailModal(false)}
                                className="p-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Custom Message (Optional)</label>
                                <textarea
                                    value={emailMessage}
                                    onChange={(e) => setEmailMessage(e.target.value)}
                                    placeholder="Add a personalized message to the invitation..."
                                    rows={4}
                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                                />
                            </div>

                            {sendResult && (
                                <div className={`p-4 rounded-lg ${sendResult.failed > 0 ? 'bg-red-500/10 border border-red-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                                    <p className={sendResult.failed > 0 ? 'text-red-400' : 'text-green-400'}>
                                        ✓ {sendResult.sent} sent{sendResult.failed > 0 && `, ${sendResult.failed} failed`}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 p-5 border-t border-slate-800">
                            <button
                                onClick={() => setShowEmailModal(false)}
                                disabled={isSending}
                                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendInvitations}
                                disabled={isSending}
                                className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                {isSending ? (
                                    <>Sending...</>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Invitations
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
