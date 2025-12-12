"use client";

import { useState, useMemo } from "react";
import { Search, Download, Filter, Users, MapPin, Building2, Briefcase, Mail, Phone, CheckCircle, XCircle, FileSpreadsheet, FileText } from "lucide-react";

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

// Curated sample data for Dubai legal conference contacts - 75 professionals
const SAMPLE_CONTACTS: Contact[] = [
    // UAE/Dubai Law Firms
    { id: "1", fullName: "Ahmed Al Hammadi", email: "ahmed.alhammadi@legaldubai.ae", contact: "+971 50 123 4567", country: "UAE", organization: "Al Hammadi Law Firm", designation: "Managing Partner", previouslyAttended: true, previousConference: "Dubai Legal Week 2024", type: "Speaker" },
    { id: "2", fullName: "Mohammed Al Rashid", email: "m.alrashid@emirates-legal.ae", contact: "+971 56 345 6789", country: "UAE", organization: "Emirates Legal Advisors", designation: "Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "3", fullName: "Khalid Al Mansoori", email: "khalid@difc-courts.ae", contact: "+971 50 789 0123", country: "UAE", organization: "DIFC Courts", designation: "Registrar", previouslyAttended: true, previousConference: "DIFC Legal Week 2024", type: "Speaker" },
    { id: "4", fullName: "Abdullah bin Saeed", email: "abdullah@adgm.ae", contact: "+971 56 901 2345", country: "UAE", organization: "ADGM", designation: "Head of Legal", previouslyAttended: true, previousConference: "Abu Dhabi Legal Week 2024", type: "Attendee" },
    { id: "5", fullName: "Dr. Hassan Al Mulla", email: "hassan.almulla@moj.gov.ae", contact: "+971 54 123 0987", country: "UAE", organization: "Ministry of Justice UAE", designation: "Legal Advisor", previouslyAttended: true, previousConference: "Government Legal Forum 2024", type: "Speaker" },
    { id: "6", fullName: "Mariam Al Suwaidi", email: "mariam@dubaicourtslegal.ae", contact: "+971 55 456 7654", country: "UAE", organization: "Dubai Courts", designation: "Judge", previouslyAttended: true, previousConference: "Judicial Conference 2024", type: "Speaker" },
    { id: "7", fullName: "Saeed Al Dhaheri", email: "saeed@aldhaheri-legal.ae", contact: "+971 50 234 5678", country: "UAE", organization: "Al Dhaheri Law", designation: "Senior Partner", previouslyAttended: true, previousConference: "MENA Legal Summit 2023", type: "Attendee" },
    { id: "8", fullName: "Noura Al Ketbi", email: "noura@alketbi-advocates.ae", contact: "+971 55 345 6789", country: "UAE", organization: "Al Ketbi Advocates", designation: "Founding Partner", previouslyAttended: true, previousConference: "Women in Law Summit 2024", type: "Speaker" },
    { id: "9", fullName: "Omar Al Shamsi", email: "omar@shamsi-law.ae", contact: "+971 56 456 7890", country: "UAE", organization: "Al Shamsi Legal Consultants", designation: "Managing Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "10", fullName: "Hessa Al Falasi", email: "hessa@falasi-legal.ae", contact: "+971 52 567 8901", country: "UAE", organization: "Al Falasi Law Firm", designation: "Partner", previouslyAttended: true, previousConference: "Dubai Arbitration Week 2023", type: "Attendee" },

    // International Law Firms - Dubai Offices
    { id: "11", fullName: "James Wilson", email: "jwilson@cliffordchance.com", contact: "+971 54 567 8901", country: "UK", organization: "Clifford Chance Dubai", designation: "Partner - Corporate", previouslyAttended: true, previousConference: "Dubai Arbitration Week 2023", type: "Speaker" },
    { id: "12", fullName: "Lisa Thompson", email: "lthompson@allenandovery.com", contact: "+971 55 890 1234", country: "USA", organization: "Allen & Overy", designation: "Counsel - Disputes", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "13", fullName: "Rania Khoury", email: "rania.khoury@bakermckenzie.com", contact: "+971 52 012 3456", country: "Lebanon", organization: "Baker McKenzie", designation: "Associate Partner", previouslyAttended: true, previousConference: "MENA Corporate Counsel Summit 2023", type: "Speaker" },
    { id: "14", fullName: "Emily Roberts", email: "eroberts@linklaters.com", contact: "+971 58 234 9876", country: "UK", organization: "Linklaters LLP", designation: "Senior Associate", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "15", fullName: "Michael Chang", email: "mchang@dlapiper.com", contact: "+971 56 567 6543", country: "Singapore", organization: "DLA Piper", designation: "Partner - M&A", previouslyAttended: true, previousConference: "Cross-Border Legal Summit 2023", type: "Attendee" },
    { id: "16", fullName: "David Campbell", email: "dcampbell@freshfields.com", contact: "+971 50 678 9012", country: "UK", organization: "Freshfields Bruckhaus", designation: "Partner - Finance", previouslyAttended: true, previousConference: "Banking & Finance Law Forum 2024", type: "Speaker" },
    { id: "17", fullName: "Sophie Martin", email: "smartin@whitecase.com", contact: "+971 55 789 0123", country: "France", organization: "White & Case", designation: "Counsel - Energy", previouslyAttended: true, previousConference: "Energy Law Conference 2024", type: "Attendee" },
    { id: "18", fullName: "Robert Johnson", email: "rjohnson@kirkland.com", contact: "+971 54 890 1234", country: "USA", organization: "Kirkland & Ellis", designation: "Partner - PE", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "19", fullName: "Anna Schmidt", email: "aschmidt@herbertsmith.com", contact: "+971 52 901 2345", country: "Germany", organization: "Herbert Smith Freehills", designation: "Partner - Disputes", previouslyAttended: true, previousConference: "International Arbitration Week 2024", type: "Speaker" },
    { id: "20", fullName: "Richard Brown", email: "rbrown@nortonrose.com", contact: "+971 56 012 3456", country: "UK", organization: "Norton Rose Fulbright", designation: "Head of MENA", previouslyAttended: true, previousConference: "MENA Legal Summit 2024", type: "Speaker" },

    // Corporate Counsel
    { id: "21", fullName: "Sarah Chen", email: "sarah.chen@globalcounsel.com", contact: "+971 55 234 5678", country: "UAE", organization: "Emirates Group", designation: "General Counsel", previouslyAttended: true, previousConference: "MENA Legal Summit 2023", type: "Speaker" },
    { id: "22", fullName: "Ahmad Najjar", email: "anajjar@dubaiholding.com", contact: "+971 50 345 6789", country: "UAE", organization: "Dubai Holding", designation: "Chief Legal Officer", previouslyAttended: true, previousConference: "Corporate Counsel Summit 2024", type: "Speaker" },
    { id: "23", fullName: "Jennifer Lee", email: "jlee@emirates.com", contact: "+971 54 456 7890", country: "USA", organization: "Emirates Airlines", designation: "VP Legal", previouslyAttended: true, previousConference: "Aviation Law Forum 2024", type: "Attendee" },
    { id: "24", fullName: "Tariq Hassan", email: "thassan@etisalat.ae", contact: "+971 55 567 8901", country: "UAE", organization: "Etisalat", designation: "Head of Legal", previouslyAttended: true, previousConference: "Telecom Law Conference 2024", type: "Attendee" },
    { id: "25", fullName: "Maria Gonzalez", email: "mgonzalez@dp-world.com", contact: "+971 56 678 9012", country: "Spain", organization: "DP World", designation: "General Counsel - MENA", previouslyAttended: true, previousConference: "Maritime Law Summit 2024", type: "Speaker" },
    { id: "26", fullName: "Faisal Al Mazrouei", email: "fmazrouei@adnoc.ae", contact: "+971 52 789 0123", country: "UAE", organization: "ADNOC", designation: "VP Legal Affairs", previouslyAttended: true, previousConference: "Energy Law Conference 2024", type: "Speaker" },
    { id: "27", fullName: "Christina Park", email: "cpark@samsung-gulf.com", contact: "+971 50 890 1234", country: "South Korea", organization: "Samsung Gulf", designation: "Regional Counsel", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "28", fullName: "Hassan Mahmoud", email: "hmahmoud@majid-al-futtaim.com", contact: "+971 55 901 2345", country: "UAE", organization: "Majid Al Futtaim", designation: "Group Legal Director", previouslyAttended: true, previousConference: "Retail Law Forum 2024", type: "Attendee" },
    { id: "29", fullName: "Laura Williams", email: "lwilliams@hsbc.ae", contact: "+971 54 012 3456", country: "UK", organization: "HSBC Middle East", designation: "Head of Legal", previouslyAttended: true, previousConference: "Banking Law Summit 2024", type: "Speaker" },
    { id: "30", fullName: "Rashid Al Nuaimi", email: "rnuaimi@mubadala.ae", contact: "+971 56 123 4567", country: "UAE", organization: "Mubadala", designation: "Legal Counsel", previouslyAttended: true, previousConference: "Investment Law Forum 2024", type: "Attendee" },

    // Legal Tech & Innovation
    { id: "31", fullName: "Priya Sharma", email: "priya.sharma@legaltechme.com", contact: "+971 58 678 9012", country: "India", organization: "LegalTech ME", designation: "CEO & Founder", previouslyAttended: true, previousConference: "Legal Innovation Summit 2024", type: "Sponsor" },
    { id: "32", fullName: "Naveen Patel", email: "naveen@casedocker.com", contact: "+971 50 345 8765", country: "India", organization: "CaseDocker", designation: "Co-Founder", previouslyAttended: true, previousConference: "LegalTech Dubai 2024", type: "Sponsor" },
    { id: "33", fullName: "Alex Thompson", email: "alex@luminance.com", contact: "+971 55 456 9876", country: "UK", organization: "Luminance", designation: "MENA Director", previouslyAttended: true, previousConference: "AI in Legal Summit 2024", type: "Sponsor" },
    { id: "34", fullName: "Yuki Tanaka", email: "ytanaka@legalforce.jp", contact: "+971 54 567 0987", country: "Japan", organization: "LegalForce", designation: "Global BD Head", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "35", fullName: "Omar Khattab", email: "omar@lexcorp.ae", contact: "+971 56 678 1098", country: "UAE", organization: "Lex Corp", designation: "Founder & CEO", previouslyAttended: true, previousConference: "LexTalk Innovation 2024", type: "Sponsor" },
    { id: "36", fullName: "Rachel Green", email: "rgreen@kira.com", contact: "+971 52 789 2109", country: "Canada", organization: "Kira Systems", designation: "Enterprise Sales", previouslyAttended: true, previousConference: "Contract AI Summit 2024", type: "Sponsor" },
    { id: "37", fullName: "Vikram Mehta", email: "vmehta@cyril-ai.com", contact: "+971 50 890 3210", country: "India", organization: "Cyril AI Legal", designation: "CTO", previouslyAttended: true, previousConference: "Legal AI Forum 2024", type: "Speaker" },
    { id: "38", fullName: "Nina Petrov", email: "npetrov@lawgeex.com", contact: "+971 55 901 4321", country: "Israel", organization: "LawGeex", designation: "VP Sales EMEA", previouslyAttended: false, previousConference: null, type: "Potential" },

    // Academics & Law Professors
    { id: "39", fullName: "Dr. Fatima Al Zahra", email: "fatima.alzahra@uaeu.ac.ae", contact: "+971 52 456 7890", country: "UAE", organization: "UAE University", designation: "Professor of Law", previouslyAttended: true, previousConference: "Gulf Legal Forum 2024", type: "Speaker" },
    { id: "40", fullName: "Prof. John Richardson", email: "jrichardson@nyu-ad.ae", contact: "+971 54 567 8901", country: "USA", organization: "NYU Abu Dhabi", designation: "Professor - Int'l Law", previouslyAttended: true, previousConference: "International Law Conference 2024", type: "Speaker" },
    { id: "41", fullName: "Dr. Mohammed Qasim", email: "mqasim@su.ac.ae", contact: "+971 56 678 9012", country: "UAE", organization: "Sharjah University", designation: "Dean of Law", previouslyAttended: true, previousConference: "Legal Education Summit 2024", type: "Speaker" },
    { id: "42", fullName: "Prof. Elizabeth Knight", email: "eknight@kcl.ac.uk", contact: "+44 20 7836 5454", country: "UK", organization: "King's College London", designation: "Professor - Commercial Law", previouslyAttended: true, previousConference: "Commercial Law Forum 2024", type: "Speaker" },
    { id: "43", fullName: "Dr. Ahmad Farhan", email: "afarhan@aus.edu", contact: "+971 52 789 0123", country: "UAE", organization: "American Univ of Sharjah", designation: "Associate Professor", previouslyAttended: true, previousConference: "Academic Legal Forum 2024", type: "Attendee" },
    { id: "44", fullName: "Prof. Layla Hassan", email: "lhassan@zayed.ac.ae", contact: "+971 50 890 1234", country: "UAE", organization: "Zayed University", designation: "Professor - Islamic Law", previouslyAttended: true, previousConference: "Islamic Finance Law 2024", type: "Speaker" },

    // Arbitrators & Mediators
    { id: "45", fullName: "Sir Charles Gray", email: "cgray@arbitration.org", contact: "+44 20 7404 5252", country: "UK", organization: "DIFC-LCIA", designation: "Arbitrator", previouslyAttended: true, previousConference: "Dubai Arbitration Week 2024", type: "Speaker" },
    { id: "46", fullName: "Dr. Nadia Darwazeh", email: "ndarwazeh@icc-arbitration.org", contact: "+33 1 49 53 28 28", country: "Lebanon", organization: "ICC International", designation: "Arbitrator", previouslyAttended: true, previousConference: "ICC Middle East Conference 2024", type: "Speaker" },
    { id: "47", fullName: "Mark Kantor", email: "mkantor@arbitration.com", contact: "+1 202 555 0123", country: "USA", organization: "Independent Arbitrator", designation: "Arbitrator", previouslyAttended: true, previousConference: "Investment Treaty Arbitration 2024", type: "Speaker" },
    { id: "48", fullName: "Essam Al Tamimi", email: "etamimi@tamimi.com", contact: "+971 50 123 5678", country: "UAE", organization: "Al Tamimi & Company", designation: "Chairman & Arbitrator", previouslyAttended: true, previousConference: "MENA Arbitration Forum 2024", type: "Speaker" },
    { id: "49", fullName: "Dr. Habib Kazzi", email: "hkazzi@lcia-mena.org", contact: "+971 54 234 6789", country: "Lebanon", organization: "LCIA-MENA", designation: "Director", previouslyAttended: true, previousConference: "LCIA MENA Conference 2024", type: "Speaker" },
    { id: "50", fullName: "Teresa Giovannini", email: "tgiovannini@lalive.ch", contact: "+41 22 319 87 00", country: "Switzerland", organization: "LALIVE", designation: "Partner & Arbitrator", previouslyAttended: true, previousConference: "Swiss Arbitration Forum 2024", type: "Attendee" },

    // Middle East Regional
    { id: "51", fullName: "Fadi Moubarak", email: "fmoubarak@alem-law.com", contact: "+961 1 999 888", country: "Lebanon", organization: "Alem & Associates", designation: "Managing Partner", previouslyAttended: true, previousConference: "Beirut Legal Week 2024", type: "Attendee" },
    { id: "52", fullName: "Sultan Al Abdulla", email: "sabdulla@qatarlaw.qa", contact: "+974 4444 5555", country: "Qatar", organization: "Sultan Al Abdulla", designation: "Senior Partner", previouslyAttended: true, previousConference: "Qatar Legal Forum 2024", type: "Speaker" },
    { id: "53", fullName: "Hani Al Omar", email: "halomar@omarlaw.com.sa", contact: "+966 11 234 5678", country: "Saudi Arabia", organization: "Al Omar Legal", designation: "Managing Partner", previouslyAttended: true, previousConference: "Riyadh Legal Summit 2024", type: "Speaker" },
    { id: "54", fullName: "Zainab Al Khalifa", email: "zkhalifa@bahrain-legal.bh", contact: "+973 1750 0000", country: "Bahrain", organization: "Al Khalifa Law", designation: "Partner", previouslyAttended: true, previousConference: "Bahrain Legal Week 2024", type: "Attendee" },
    { id: "55", fullName: "Youssef Mansour", email: "ymansour@shalakany.com", contact: "+20 2 2735 8888", country: "Egypt", organization: "Shalakany Law", designation: "Partner - Corporate", previouslyAttended: true, previousConference: "Egypt Legal Congress 2024", type: "Speaker" },
    { id: "56", fullName: "Reem Al Zarouni", email: "rzarouni@zarouni-law.ae", contact: "+971 50 234 5678", country: "UAE", organization: "Al Zarouni Advocates", designation: "Managing Partner", previouslyAttended: true, previousConference: "UAE Women Lawyers Forum 2024", type: "Speaker" },
    { id: "57", fullName: "Karim Nassif", email: "knassif@nassif-law.jo", contact: "+962 6 555 4444", country: "Jordan", organization: "Nassif Law Firm", designation: "Senior Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "58", fullName: "Aisha Al Mazmi", email: "amazmi@omanlaw.om", contact: "+968 2456 7890", country: "Oman", organization: "Al Mazmi Legal", designation: "Founding Partner", previouslyAttended: true, previousConference: "GCC Legal Forum 2024", type: "Attendee" },

    // Indian Subcontinent
    { id: "59", fullName: "Rajesh Khanna", email: "rkhanna@cyrilshroff.com", contact: "+91 22 6639 3939", country: "India", organization: "Cyril Amarchand", designation: "Partner", previouslyAttended: true, previousConference: "India-UAE Business Law 2024", type: "Speaker" },
    { id: "60", fullName: "Pallavi Shroff", email: "pshroff@amsslaw.com", contact: "+91 11 4151 5100", country: "India", organization: "Shardul Amarchand", designation: "Managing Partner", previouslyAttended: true, previousConference: "Indo-Gulf Legal Summit 2024", type: "Speaker" },
    { id: "61", fullName: "Zia Mody", email: "zmody@azbpartners.com", contact: "+91 22 6639 6880", country: "India", organization: "AZB & Partners", designation: "Founding Partner", previouslyAttended: true, previousConference: "Cross-Border M&A Forum 2024", type: "Speaker" },
    { id: "62", fullName: "Anand Kumar", email: "akumar@khaitan.com", contact: "+91 22 6636 5000", country: "India", organization: "Khaitan & Co", designation: "Partner - Disputes", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "63", fullName: "Sana Malik", email: "smalik@luthra.com", contact: "+91 11 4121 5100", country: "India", organization: "Luthra & Luthra", designation: "Partner - Banking", previouslyAttended: true, previousConference: "Banking Law Summit 2024", type: "Attendee" },

    // Asia Pacific
    { id: "64", fullName: "Kevin Wong", email: "kwong@hklaw.hk", contact: "+852 2522 1122", country: "Hong Kong", organization: "Wong & Partners", designation: "Managing Partner", previouslyAttended: true, previousConference: "Asia Legal Forum 2024", type: "Speaker" },
    { id: "65", fullName: "Hiroshi Yamamoto", email: "hyamamoto@nagashima.jp", contact: "+81 3 3211 0155", country: "Japan", organization: "Nagashima Ohno", designation: "Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "66", fullName: "Mei Lin Chen", email: "mlchen@jingtian.cn", contact: "+86 10 5809 1000", country: "China", organization: "JunHe LLP", designation: "Partner - Int'l", previouslyAttended: true, previousConference: "China-MENA Legal Bridge 2024", type: "Attendee" },
    { id: "67", fullName: "Tanya Sharma", email: "tsharma@wongpartnership.com", contact: "+65 6416 8000", country: "Singapore", organization: "WongPartnership", designation: "Partner", previouslyAttended: true, previousConference: "Singapore-Dubai Legal Forum 2024", type: "Speaker" },

    // Europe
    { id: "68", fullName: "Hans Mueller", email: "hmueller@gleiss.de", contact: "+49 711 8997 0", country: "Germany", organization: "Gleiss Lutz", designation: "Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "69", fullName: "Pierre Dupont", email: "pdupont@gide.com", contact: "+33 1 40 75 60 00", country: "France", organization: "Gide Loyrette", designation: "Partner - M&A", previouslyAttended: true, previousConference: "France-UAE Business Law 2024", type: "Attendee" },
    { id: "70", fullName: "Marco Rossi", email: "mrossi@chiomenti.net", contact: "+39 02 7217 51", country: "Italy", organization: "Chiomenti", designation: "Senior Partner", previouslyAttended: true, previousConference: "Italian-Gulf Legal Forum 2024", type: "Speaker" },

    // Americas
    { id: "71", fullName: "John Martinez", email: "jmartinez@skadden.com", contact: "+1 212 735 3000", country: "USA", organization: "Skadden Arps", designation: "Partner - MENA", previouslyAttended: true, previousConference: "US-UAE Investment Summit 2024", type: "Speaker" },
    { id: "72", fullName: "Sarah O'Brien", email: "sobrien@sullivan.com", contact: "+1 212 558 4000", country: "USA", organization: "Sullivan & Cromwell", designation: "Partner", previouslyAttended: false, previousConference: null, type: "Potential" },
    { id: "73", fullName: "Carlos Rodriguez", email: "crodriguez@cuatrecasas.com", contact: "+34 93 290 55 00", country: "Spain", organization: "Cuatrecasas", designation: "Partner - LatAm", previouslyAttended: true, previousConference: "Spanish Legal Forum 2024", type: "Attendee" },

    // Government & Regulatory
    { id: "74", fullName: "Dr. Jamal Al Hosani", email: "jalhosani@sca.gov.ae", contact: "+971 2 627 7888", country: "UAE", organization: "SCA UAE", designation: "Director of Legal", previouslyAttended: true, previousConference: "Capital Markets Law 2024", type: "Speaker" },
    { id: "75", fullName: "Fatima Al Blooshi", email: "falblooshi@centralbank.ae", contact: "+971 2 665 2220", country: "UAE", organization: "Central Bank UAE", designation: "Legal Counsel", previouslyAttended: true, previousConference: "Banking Regulation Forum 2024", type: "Attendee" },
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

        const headers = [["Name", "Email", "Contact", "Country", "Organization", "Designation", "Attended", "Type"]];
        const data = filteredContacts.map(c => [
            c.fullName,
            c.email,
            c.contact,
            c.country,
            c.organization,
            c.designation,
            c.previouslyAttended ? "Yes" : "No",
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
