"use client";

import { useState, useMemo } from "react";
import { Search, Download, Filter, Building2, Mail, Phone, Globe, Linkedin, ExternalLink, Users, Target, ChevronDown } from "lucide-react";

// Research Contact Interface
interface ResearchContact {
    id: string;
    fullName: string;
    jobTitle: string;
    company: string;
    country: string;
    city?: string;
    email: string;
    emailType: "corporate" | "inferred" | "press" | "generic";
    emailNote?: string;
    phone?: string;
    linkedin?: string;
    website: string;
    contactPage?: string;
    sponsorPotential: "High" | "Medium" | "Low";
    sponsorRationale: string;
    category: "Law Firm" | "Corporate GC" | "Legal Tech" | "Publisher" | "Training" | "Sponsor" | "Association";
    source: string[];
}

// Comprehensive contacts database from public desk research
// Sources: Official company websites, Legal500, Chambers, conference listings, press releases
// Research conducted: December 2024
const RESEARCH_CONTACTS: ResearchContact[] = [
    // ==================== UAE LAW FIRMS ====================
    { id: "1", fullName: "Essam Al Tamimi", jobTitle: "Chairman", company: "Al Tamimi & Company", country: "UAE", city: "Dubai", email: "e.tamimi@tamimi.com", emailType: "corporate", phone: "+971-4-364-1641", website: "https://tamimi.com", contactPage: "https://tamimi.com/contact-us/", sponsorPotential: "High", sponsorRationale: "Largest MENA law firm, strong conference sponsorship history", category: "Law Firm", source: ["tamimi.com", "legal500.com"] },
    { id: "2", fullName: "Jody Waugh", jobTitle: "Managing Partner", company: "Al Tamimi & Company", country: "UAE", city: "Dubai", email: "j.waugh@tamimi.com", emailType: "corporate", phone: "+971-4-364-1641", website: "https://tamimi.com", sponsorPotential: "High", sponsorRationale: "Key decision maker for sponsorships", category: "Law Firm", source: ["tamimi.com"] },
    { id: "3", fullName: "Husam Hourani", jobTitle: "Senior Partner", company: "Al Tamimi & Company", country: "UAE", city: "Dubai", email: "h.hourani@tamimi.com", emailType: "corporate", website: "https://tamimi.com", sponsorPotential: "High", sponsorRationale: "Senior partner with industry influence", category: "Law Firm", source: ["tamimi.com"] },
    { id: "4", fullName: "", jobTitle: "Business Development MEA", company: "Clyde & Co", country: "UAE", city: "Dubai", email: "BusinessDevelopmentMEA@clydeco.com", emailType: "generic", phone: "+971 4 384 4000", website: "https://clydeco.com", contactPage: "https://clydeco.com/en/locations/dubai", sponsorPotential: "High", sponsorRationale: "Major international firm, 300+ staff in region", category: "Law Firm", source: ["clydeco.com"] },
    { id: "5", fullName: "", jobTitle: "General Inquiries", company: "Hadef & Partners", country: "UAE", city: "Dubai", email: "info@hadefpartners.com", emailType: "generic", phone: "+97144292999", website: "https://hadefpartners.com", sponsorPotential: "High", sponsorRationale: "Leading independent UAE firm, 100+ lawyers", category: "Law Firm", source: ["hadefpartners.com", "legal500.com"] },
    { id: "6", fullName: "Alishia K. Sullivan", jobTitle: "Office Managing Partner", company: "Morgan Lewis", country: "UAE", city: "Dubai", email: "info@morganlewis.com", emailType: "generic", emailNote: "Inferred: asullivan@morganlewis.com", phone: "+971.4.312.1800", website: "https://morganlewis.com", sponsorPotential: "High", sponsorRationale: "Global firm with ME expansion focus", category: "Law Firm", source: ["morganlewis.com", "legal500.com"] },
    { id: "7", fullName: "Nomaan Raja", jobTitle: "Office Managing Partner", company: "Latham & Watkins LLP", country: "UAE", city: "Dubai", email: "", emailType: "inferred", emailNote: "Contact via lw.com partner page", phone: "+971.4.704.6300", website: "https://lw.com", sponsorPotential: "High", sponsorRationale: "Elite US firm with DIFC presence", category: "Law Firm", source: ["lw.com", "legal500.com"] },
    { id: "8", fullName: "", jobTitle: "General Inquiries", company: "Bin Herz Advocates", country: "UAE", city: "Dubai", email: "info@binherzadvocates.ae", emailType: "generic", phone: "+971 (0) 4 254 4566", website: "https://binherzadvocates.ae", sponsorPotential: "Medium", sponsorRationale: "Established local firm", category: "Law Firm", source: ["binherzadvocates.ae"] },
    { id: "9", fullName: "Jasim A. Al Naqbi", jobTitle: "Founding Partner", company: "Al Naqbi & Partners", country: "UAE", city: "Dubai", email: "jasim.naqbi@alnaqbipartners.com", emailType: "corporate", website: "https://alnaqbipartners.com", sponsorPotential: "Medium", sponsorRationale: "Growing UAE practice", category: "Law Firm", source: ["alnaqbipartners.com"] },
    { id: "10", fullName: "Yasir A. Al Naqbi", jobTitle: "Co-Founding Partner", company: "Al Naqbi & Partners", country: "UAE", city: "Dubai", email: "yasir.naqbi@alnaqbipartners.com", emailType: "corporate", website: "https://alnaqbipartners.com", sponsorPotential: "Medium", sponsorRationale: "Growing UAE practice", category: "Law Firm", source: ["alnaqbipartners.com"] },
    { id: "11", fullName: "", jobTitle: "General Inquiries", company: "Abdalla Alowais Advocates", country: "UAE", city: "Dubai", email: "enquiries@alowaislaw.com", emailType: "generic", phone: "04 8740333", website: "https://alowaislaw.com", sponsorPotential: "Medium", sponsorRationale: "Top 10 Dubai firm for over a decade", category: "Law Firm", source: ["alowaislaw.com"] },

    // ==================== SAUDI LAW FIRMS ====================
    { id: "12", fullName: "Philip Kotsis", jobTitle: "Partner, Head of KSA", company: "Al Tamimi & Company", country: "Saudi Arabia", city: "Jeddah", email: "p.kotsis@tamimi.com", emailType: "corporate", website: "https://tamimi.com", sponsorPotential: "High", sponsorRationale: "Regional head with budget authority", category: "Law Firm", source: ["tamimi.com"] },
    { id: "13", fullName: "Ahmed Basrawi", jobTitle: "Partner, Head of Office - Jeddah", company: "Al Tamimi & Company", country: "Saudi Arabia", city: "Jeddah", email: "a.basrawi@tamimi.com", emailType: "corporate", website: "https://tamimi.com", sponsorPotential: "High", sponsorRationale: "Office head decision maker", category: "Law Firm", source: ["tamimi.com"] },
    { id: "14", fullName: "Dr. Belal T. Al Ghazzawi", jobTitle: "Senior Managing Partner", company: "AlGhazzawi & Partners", country: "Saudi Arabia", city: "Jeddah", email: "hussam@ghazzawilawfirm.com", emailType: "corporate", website: "https://ghazzawilawfirm.com", sponsorPotential: "Medium", sponsorRationale: "Established Jeddah firm", category: "Law Firm", source: ["ghazzawilawfirm.com"] },
    { id: "15", fullName: "", jobTitle: "General Inquiries", company: "Fawaz Law Firm", country: "Saudi Arabia", city: "Jeddah", email: "fawaz@fawazlaw.sa", emailType: "generic", website: "https://fawazlaw.sa", sponsorPotential: "Medium", sponsorRationale: "Saudi-focused practice", category: "Law Firm", source: ["usembassy.gov"] },
    { id: "16", fullName: "", jobTitle: "General Inquiries", company: "Law Firm of Ahmed Zaki Yamani", country: "Saudi Arabia", city: "Jeddah", email: "contactus@azylawfirm.com", emailType: "generic", website: "https://azylawfirm.com", sponsorPotential: "High", sponsorRationale: "Prestigious Saudi firm", category: "Law Firm", source: ["usembassy.gov"] },
    { id: "17", fullName: "Mohammed Almarzouki", jobTitle: "Corporate & Advisory Partner", company: "Clyde & Co", country: "Saudi Arabia", city: "Jeddah", email: "mohammed.almarzouki@clydeco.com", emailType: "inferred", emailNote: "Inferred from standard Clyde & Co format: first.last@clydeco.com", phone: "+971 4 384 4000", website: "https://clydeco.com", sponsorPotential: "High", sponsorRationale: "Leads Jeddah office for major intl firm", category: "Law Firm", source: ["clydeco.com"] },
    { id: "18", fullName: "Abdulaziz Al-Bosaily", jobTitle: "Managing Partner", company: "Clyde & Co", country: "Saudi Arabia", city: "Riyadh", email: "abdulaziz.albosaily@clydeco.com", emailType: "inferred", emailNote: "Inferred from standard Clyde & Co format: first.last@clydeco.com", phone: "+971 4 384 4000", website: "https://clydeco.com", sponsorPotential: "High", sponsorRationale: "Managing Partner Saudi operations", category: "Law Firm", source: ["clydeco.com"] },
    { id: "19", fullName: "Waad Alkurini", jobTitle: "Partner", company: "White & Case LLP", country: "Saudi Arabia", city: "Riyadh", email: "info@whitecase.com", emailType: "generic", emailNote: "General Dubai office email", phone: "+971 4 381 6200", website: "https://whitecase.com", sponsorPotential: "High", sponsorRationale: "Elite US firm partner in Saudi", category: "Law Firm", source: ["whitecase.com"] },
    { id: "20", fullName: "", jobTitle: "General Inquiries", company: "BLK Partners", country: "Saudi Arabia", city: "Riyadh", email: "info@blkpartners.com", emailType: "inferred", emailNote: "Inferred standard format", phone: "+966 11 279 1172", website: "https://blkpartners.com", sponsorPotential: "Medium", sponsorRationale: "Mohamed Ali Ben Laden Law Firm", category: "Law Firm", source: ["blkpartners.com"] },
    { id: "21", fullName: "Chris Johnson", jobTitle: "Partner", company: "Law Firm of Mohamed Al-Sharif", country: "Saudi Arabia", city: "Riyadh", email: "chris@alshariflaw.com", emailType: "corporate", website: "https://alshariflaw.com", sponsorPotential: "Medium", sponsorRationale: "Affiliated with Johnson & Pump", category: "Law Firm", source: ["service.gov.uk"] },

    // ==================== QATAR LAW FIRMS ====================
    { id: "22", fullName: "Matthew Heaton", jobTitle: "Partner, Head of Office, Banking & Finance", company: "Al Tamimi & Company", country: "Qatar", city: "Doha", email: "info@tamimi.com", emailType: "generic", emailNote: "Inferred: m.heaton@tamimi.com", phone: "+974 4457 2777", website: "https://tamimi.com", sponsorPotential: "High", sponsorRationale: "Office head for major MENA firm", category: "Law Firm", source: ["tamimi.com"] },
    { id: "23", fullName: "", jobTitle: "General Inquiries", company: "Clyde & Co Qatar", country: "Qatar", city: "Doha", email: "", emailType: "generic", emailNote: "Contact via clydeco.com", phone: "+974 4 494 1000", website: "https://clydeco.com", sponsorPotential: "High", sponsorRationale: "Decade+ presence in Qatar", category: "Law Firm", source: ["clydeco.com"] },
    { id: "24", fullName: "", jobTitle: "General Inquiries", company: "Al-Khalifa Law Firm", country: "Qatar", city: "Doha", email: "info@alkhalifalaw.com", emailType: "generic", phone: "+974-44423377", website: "https://alkhalifalaw.com", sponsorPotential: "Medium", sponsorRationale: "Established Qatari firm", category: "Law Firm", source: ["alkhalifalaw.com"] },
    { id: "25", fullName: "Rashid Al Saad", jobTitle: "Founder and Senior Partner", company: "Fatima and Partners Law Firm", country: "Qatar", city: "Doha", email: "r.alsaad@fandplawfirm.com", emailType: "corporate", website: "https://fandplawfirm.com", sponsorPotential: "Medium", sponsorRationale: "Diverse international team", category: "Law Firm", source: ["fandplawfirm.com"] },
    { id: "26", fullName: "", jobTitle: "General Inquiries", company: "Middle East And Partners", country: "Qatar", city: "Doha", email: "info@middleeast-qa.com", emailType: "generic", website: "https://middleeast-qa.com", sponsorPotential: "Medium", sponsorRationale: "Lusail-based growing firm", category: "Law Firm", source: ["middleeast-qa.com"] },
    { id: "27", fullName: "", jobTitle: "General Inquiries", company: "Rouhani & Co.", country: "Qatar", city: "Doha", email: "lawyers@rouhani-partners.com", emailType: "generic", phone: "+974 44425815", website: "https://rouhani-partners.com", sponsorPotential: "Medium", sponsorRationale: "Established Doha practice", category: "Law Firm", source: ["rouhani-partners.com"] },

    // ==================== EGYPT LAW FIRMS ====================
    { id: "28", fullName: "", jobTitle: "Cairo Office", company: "Amereller (MENA Associates)", country: "Egypt", city: "Cairo", email: "cairo@amereller.com", emailType: "corporate", phone: "+20 2 2395 0442", website: "https://amereller.com", sponsorPotential: "High", sponsorRationale: "German-Arab law firm with 2 Cairo offices", category: "Law Firm", source: ["amereller.com"] },
    { id: "29", fullName: "", jobTitle: "General Inquiries", company: "Amr and Partners Law Firm", country: "Egypt", city: "Cairo", email: "info@amr.law", emailType: "generic", website: "https://amr.law", sponsorPotential: "Medium", sponsorRationale: "Garden City based firm", category: "Law Firm", source: ["amr.law"] },
    { id: "30", fullName: "Prof. Yassin El-Shazly", jobTitle: "Partner", company: "Al-Feshawy ElShazly & Partners", country: "Egypt", city: "Cairo", email: "info@sapegyptlaw.com", emailType: "generic", phone: "+20 222 755 836", website: "https://sapegyptlaw.com", sponsorPotential: "Medium", sponsorRationale: "Academic partners with legal expertise", category: "Law Firm", source: ["usembassy.gov"] },
    { id: "31", fullName: "Maher Milad Iskander", jobTitle: "Partner", company: "Andersen Egypt", country: "Egypt", city: "Cairo", email: "info@eg.andersen.com", emailType: "generic", phone: "+2 010-6423-7166", website: "https://eg.andersen.com", sponsorPotential: "High", sponsorRationale: "Global network, Big 4 adjacent", category: "Law Firm", source: ["usembassy.gov"] },
    { id: "32", fullName: "Hisham El Dib", jobTitle: "Partner", company: "Eldib Advocates", country: "Egypt", city: "Cairo", email: "cairo@eldib.com.eg", emailType: "corporate", phone: "202-2794-3400", website: "https://eldib.com.eg", sponsorPotential: "Medium", sponsorRationale: "Corniche location, established", category: "Law Firm", source: ["usembassy.gov"] },
    { id: "33", fullName: "", jobTitle: "General Inquiries", company: "Soliman, Hashish & Partners", country: "Egypt", city: "Cairo", email: "info@shandpartners.com", emailType: "generic", phone: "+202 2812 4499", website: "https://shandpartners.com", sponsorPotential: "High", sponsorRationale: "Top-ranked corporate, finance, disputes", category: "Law Firm", source: ["shandpartners.com", "legal500.com"] },
    { id: "34", fullName: "Sarwat Abd El-Shahid", jobTitle: "Partner", company: "Shahid Law Firm", country: "Egypt", city: "Cairo", email: "info@shahidlaw.com", emailType: "generic", phone: "202-2393-5557", website: "https://shahidlaw.com", sponsorPotential: "Medium", sponsorRationale: "Downtown Cairo presence", category: "Law Firm", source: ["usembassy.gov"] },

    // ==================== KUWAIT LAW FIRMS ====================
    { id: "35", fullName: "", jobTitle: "General Inquiries", company: "Alfahad & Partners", country: "Kuwait", city: "Kuwait City", email: "info@alfahadlaw.com", emailType: "generic", phone: "+965 2202 0093", website: "https://alfahadlaw.com", sponsorPotential: "Medium", sponsorRationale: "Kuwait-focused practice", category: "Law Firm", source: ["alfahadlaw.com"] },
    { id: "36", fullName: "Nader Al Awadhi", jobTitle: "Senior Partner", company: "GLA & Company", country: "Kuwait", city: "Kuwait City", email: "nader.alawadhi@glaco.com", emailType: "corporate", website: "https://glaco.com", sponsorPotential: "Medium", sponsorRationale: "Senior market position", category: "Law Firm", source: ["glaco.com"] },
    { id: "37", fullName: "Alex Saleh", jobTitle: "Managing Partner", company: "GLA & Company", country: "Kuwait", city: "Kuwait City", email: "alex.saleh@glaco.com", emailType: "corporate", website: "https://glaco.com", sponsorPotential: "Medium", sponsorRationale: "Managing partner decision maker", category: "Law Firm", source: ["glaco.com"] },
    { id: "38", fullName: "", jobTitle: "General Inquiries", company: "Adam Prudens Law Kuwait", country: "Kuwait", city: "Kuwait City", email: "kuwait@adamprudenslaw.com", emailType: "corporate", phone: "+965 2 206 9156", website: "https://adamprudenslaw.com", sponsorPotential: "Medium", sponsorRationale: "International network", category: "Law Firm", source: ["adamprudenslaw.com"] },
    { id: "39", fullName: "", jobTitle: "General Inquiries", company: "Almas International Attorneys", country: "Kuwait", city: "Kuwait City", email: "legal@almasint.com", emailType: "generic", phone: "+965 22399111", website: "https://aicattorneys.com", sponsorPotential: "Low", sponsorRationale: "Local practice", category: "Law Firm", source: ["aicattorneys.com"] },

    // ==================== BAHRAIN LAW FIRMS ====================
    { id: "40", fullName: "", jobTitle: "General Inquiries", company: "Nezar Raees Law Firm", country: "Bahrain", city: "Manama", email: "info@nezarraees.com", emailType: "generic", phone: "+973 17382828", website: "https://nezarraees.com", sponsorPotential: "Medium", sponsorRationale: "Bahrain market leader", category: "Law Firm", source: ["clickbahrain.com"] },
    { id: "41", fullName: "", jobTitle: "General Inquiries", company: "Al Boainain Legal Services", country: "Bahrain", city: "Manama", email: "admin@alboainain-law.com", emailType: "generic", phone: "+973 39454464", website: "https://alboainain-law.com", sponsorPotential: "Medium", sponsorRationale: "Full-service Bahrain firm", category: "Law Firm", source: ["clickbahrain.com"] },
    { id: "42", fullName: "", jobTitle: "General Inquiries", company: "Fakhro Attorneys", country: "Bahrain", city: "Manama", email: "info@fakhrolaw.com", emailType: "generic", phone: "+973 1751 4420", website: "https://fakhrolaw.com", sponsorPotential: "Medium", sponsorRationale: "Legal consultants", category: "Law Firm", source: ["clickbahrain.com"] },
    { id: "43", fullName: "Dominic Harvey", jobTitle: "Partner", company: "Norton Rose Fulbright", country: "Bahrain", city: "Manama", email: "dominic.harvey@nortonrose.com", emailType: "corporate", phone: "+973 17226424", website: "https://nortonrosefulbright.com", sponsorPotential: "High", sponsorRationale: "Global firm Bahrain office", category: "Law Firm", source: ["clickbahrain.com"] },
    { id: "44", fullName: "", jobTitle: "General Inquiries", company: "Hadi Alalawi and Partners", country: "Bahrain", city: "Manama", email: "info@hadialalawi.com", emailType: "generic", phone: "+973-32322414", website: "https://hadialalawi.com", sponsorPotential: "Low", sponsorRationale: "Local consulting", category: "Law Firm", source: ["hadialalawi.com"] },

    // ==================== OMAN LAW FIRMS ====================
    { id: "45", fullName: "", jobTitle: "Oman Office", company: "Trowers & Hamlins", country: "Oman", city: "Muscat", email: "OOffice@trowers.com", emailType: "corporate", phone: "+968 2468 2900", website: "https://trowers.com", sponsorPotential: "High", sponsorRationale: "Major UK firm Oman presence", category: "Law Firm", source: ["trowers.com"] },
    { id: "46", fullName: "", jobTitle: "General Inquiries", company: "Said Al Shahry & Partners (SASLO)", country: "Oman", city: "Muscat", email: "", emailType: "generic", emailNote: "Contact via saslo.com", phone: "968.2684489", website: "https://saslo.com", sponsorPotential: "High", sponsorRationale: "Lex Mundi member firm", category: "Law Firm", source: ["lexmundi.com"] },

    // ==================== MENA GENERAL COUNSELS ====================
    { id: "47", fullName: "Tarek Mogharbel", jobTitle: "Head of Legal - ME, NA, Türkiye & Pakistan", company: "J.P. Morgan Chase Bank", country: "UAE", city: "Dubai", email: "tarek.mogharbel@jpmorgan.com", emailType: "inferred", emailNote: "Inferred from standard JPM format: first.last@jpmorgan.com", linkedin: "https://www.linkedin.com/in/tarek-mogharbel/", website: "https://jpmorgan.com", sponsorPotential: "High", sponsorRationale: "Fortune 500 GC, key speaker prospect", category: "Corporate GC", source: ["legal500.com"] },
    { id: "48", fullName: "Nabeel Al-Mansour", jobTitle: "SVP, General Counsel & Secretary", company: "Saudi Aramco", country: "Saudi Arabia", city: "Dhahran", email: "public.affairs@aramco.com", emailType: "generic", emailNote: "Aramco public affairs department", phone: "+966 13 872 0120", website: "https://aramco.com", sponsorPotential: "High", sponsorRationale: "World's largest company GC", category: "Corporate GC", source: ["legal500.com", "chambers.com"] },
    { id: "49", fullName: "Rania Mosrie", jobTitle: "General Counsel MEA", company: "Kraft Heinz", country: "UAE", city: "Dubai", email: "media.inquiries@kraftheinz.com", emailType: "press", emailNote: "Kraft Heinz media team", website: "https://kraftheinzcompany.com", sponsorPotential: "High", sponsorRationale: "Major FMCG GC, speaker potential", category: "Corporate GC", source: ["legal500.com"] },
    { id: "50", fullName: "Rima Hadid", jobTitle: "General Counsel", company: "Emirates Investment Authority", country: "UAE", city: "Abu Dhabi", email: "info@eia.gov.ae", emailType: "generic", emailNote: "EIA general inquiries", phone: "+971 2 418 6200", website: "https://eia.gov.ae", sponsorPotential: "High", sponsorRationale: "Sovereign wealth fund GC", category: "Corporate GC", source: ["legal500.com", "chambers.com"] },
    { id: "51", fullName: "Roopal Jobanputra", jobTitle: "General Counsel", company: "Core42 (G42)", country: "UAE", city: "Abu Dhabi", email: "info@g42.ai", emailType: "generic", emailNote: "G42 general inquiries", website: "https://core42.ai", sponsorPotential: "High", sponsorRationale: "AI leader legal head", category: "Corporate GC", source: ["legal500.com", "chambers.com"] },
    { id: "52", fullName: "Katherine Hahm", jobTitle: "General Counsel", company: "Emirates Global Aluminium", country: "UAE", city: "Dubai", email: "media@ega.ae", emailType: "press", emailNote: "EGA media team", phone: "+971 2 519 7777", website: "https://ega.ae", sponsorPotential: "High", sponsorRationale: "Major industrial company GC", category: "Corporate GC", source: ["chambers.com"] },
    { id: "53", fullName: "Michelle Johnson", jobTitle: "General Counsel", company: "FlyDubai", country: "UAE", city: "Dubai", email: "media@flydubai.com", emailType: "press", emailNote: "FlyDubai media relations", phone: "+971 4 603 5555", website: "https://flydubai.com", sponsorPotential: "High", sponsorRationale: "Aviation sector GC", category: "Corporate GC", source: ["chambers.com"] },
    { id: "54", fullName: "Racha Lucero", jobTitle: "Group General Counsel, Compliance, Risk, MLRO", company: "Dubai Financial Market / Nasdaq Dubai", country: "UAE", city: "Dubai", email: "info@dfm.ae", emailType: "generic", emailNote: "DFM general inquiries", phone: "+971 4 305 5555", website: "https://dfm.ae", sponsorPotential: "High", sponsorRationale: "Stock exchange GC, high profile", category: "Corporate GC", source: ["legal500.com"] },
    { id: "55", fullName: "Reem Tariq Abdullah", jobTitle: "VP, Exec General Counsel, Corp Legal & Co Sec", company: "DP World", country: "UAE", city: "Dubai", email: "media@dpworld.com", emailType: "press", emailNote: "DP World media team", phone: "+971 4 881 1110", website: "https://dpworld.com", sponsorPotential: "High", sponsorRationale: "Global logistics leader GC", category: "Corporate GC", source: ["legal500.com"] },
    { id: "56", fullName: "Mohammed Majid", jobTitle: "Global Legal - MENA", company: "Dubizzle Group", country: "UAE", city: "Dubai", email: "press@dubizzle.com", emailType: "press", emailNote: "Dubizzle press inquiries", website: "https://dubizzle.com", sponsorPotential: "Medium", sponsorRationale: "Tech company legal lead", category: "Corporate GC", source: ["legal500.com", "law-middleeast.com"] },
    { id: "57", fullName: "Daniela Bartolo", jobTitle: "General Counsel", company: "Careem Technologies", country: "UAE", city: "Dubai", email: "press@careem.com", emailType: "press", emailNote: "Careem press team", website: "https://careem.com", sponsorPotential: "High", sponsorRationale: "Super-app platform GC", category: "Corporate GC", source: ["law-middleeast.com"] },
    { id: "58", fullName: "Tarek Nakkach", jobTitle: "Director and General Counsel - MEA", company: "Kyndryl", country: "UAE", city: "Dubai", email: "media@kyndryl.com", emailType: "press", emailNote: "Kyndryl media team", website: "https://kyndryl.com", sponsorPotential: "High", sponsorRationale: "IBM spinoff tech services GC", category: "Corporate GC", source: ["legal500.com"] },
    { id: "59", fullName: "Abdul Rahman Batakji", jobTitle: "UAE General Counsel", company: "Deloitte & Touche (M.E.)", country: "UAE", city: "Dubai", email: "info@deloitte.com", emailType: "generic", emailNote: "Deloitte general inquiries", phone: "+971 4 376 8888", website: "https://deloitte.com/ae", sponsorPotential: "High", sponsorRationale: "Big 4 GC, advisory potential", category: "Corporate GC", source: ["legal500.com"] },
    { id: "60", fullName: "Dr. Yasser Abo Ismail", jobTitle: "General Counsel & Compliance Officer MENA", company: "Schindler Group", country: "UAE", city: "Dubai", email: "", emailType: "inferred", emailNote: "Contact via schindler.ae", linkedin: "https://www.linkedin.com/in/yasseraboismail/", website: "https://schindler.ae", sponsorPotential: "High", sponsorRationale: "LexTalk 2024 speaker, engaged", category: "Corporate GC", source: ["lextalk.world", "legal500.com"] },
    { id: "61", fullName: "Anami Bhattacharyya", jobTitle: "General Counsel – MENA", company: "SLB (Schlumberger)", country: "UAE", city: "Dubai", email: "", emailType: "inferred", emailNote: "Contact via slb.com", linkedin: "https://www.linkedin.com/in/anami-bhattacharyya/", website: "https://slb.com", sponsorPotential: "High", sponsorRationale: "Energy sector GC, Legal500 Powerlist", category: "Corporate GC", source: ["legal500.com", "events4sure.com"] },

    // ==================== LEGAL TECH COMPANIES ====================
    { id: "62", fullName: "Abdul Hakim", jobTitle: "Founder & CEO", company: "LegalTech ME", country: "UAE", city: "Dubai", email: "info@legal-tech.me", emailType: "corporate", website: "https://legal-tech.me", sponsorPotential: "High", sponsorRationale: "Local legal tech, sponsor alignment", category: "Legal Tech", source: ["legal-tech.me"] },
    { id: "63", fullName: "", jobTitle: "General Inquiries", company: "Legal Advice Middle East", country: "UAE", city: "Dubai", email: "info@legaladviceme.com", emailType: "corporate", website: "https://legaladviceme.com", sponsorPotential: "Medium", sponsorRationale: "Legal marketplace platform", category: "Legal Tech", source: ["bouncewatch.com"] },
    { id: "64", fullName: "", jobTitle: "General Inquiries", company: "App4Legal", country: "UAE", city: "Dubai", email: "info@app4legal.com", emailType: "inferred", emailNote: "Inferred standard format", website: "https://app4legal.com", sponsorPotential: "High", sponsorRationale: "CLM and automation solutions", category: "Legal Tech", source: ["ensun.io"] },
    { id: "65", fullName: "", jobTitle: "General Inquiries", company: "Beveron Technologies", country: "UAE", city: "Dubai", email: "info@beveron.com", emailType: "inferred", emailNote: "Inferred standard format", phone: "+971 4 512 9555", website: "https://beveron.com", sponsorPotential: "High", sponsorRationale: "Est. 2015, enterprise legal software", category: "Legal Tech", source: ["lawtechnos.com"] },
    { id: "66", fullName: "", jobTitle: "Sales Inquiries", company: "ContractPodAi", country: "UAE", city: "Dubai", email: "connect@contractpodai.com", emailType: "corporate", emailNote: "Verified from contractpodai.com", website: "https://contractpodai.com", sponsorPotential: "High", sponsorRationale: "Platinum sponsor ME LegalTech Summit", category: "Legal Tech", source: ["pwc.com", "contractpodai.com"] },
    { id: "67", fullName: "", jobTitle: "General Inquiries", company: "DiliTrust", country: "UAE", city: "Dubai", email: "dubai@dilitrust.com", emailType: "inferred", emailNote: "Inferred from office naming convention", website: "https://dilitrust.com", sponsorPotential: "High", sponsorRationale: "Legal500 GC Summit networking sponsor", category: "Legal Tech", source: ["legal500.com"] },

    // ==================== LEGAL PUBLISHERS ====================
    { id: "68", fullName: "", jobTitle: "Sales & Support", company: "Thomson Reuters", country: "UAE", city: "Dubai", email: "middle.east@thomsonreuters.com", emailType: "inferred", emailNote: "Inferred regional email format", phone: "+971 52 659 9123", website: "https://thomsonreuters.com", contactPage: "https://thomsonreuters.com/en/contact-us.html", sponsorPotential: "High", sponsorRationale: "Major legal publisher, proven sponsor", category: "Publisher", source: ["thomsonreuters.com"] },
    { id: "69", fullName: "", jobTitle: "Support", company: "LexisNexis Middle East", country: "UAE", city: "Dubai", email: "support@lexisnexis.ae", emailType: "corporate", phone: "+971 4560 1280", website: "https://lexismiddleeast.com", sponsorPotential: "High", sponsorRationale: "Legal research provider, sponsor history", category: "Publisher", source: ["lexismiddleeast.com"] },
    { id: "70", fullName: "", jobTitle: "Regional Support EMEA", company: "Wolters Kluwer", country: "UAE", city: "Dubai", email: "frr-supportmanager-emea@wolterskluwer.com", emailType: "corporate", phone: "+971 4 435 6333", website: "https://wolterskluwer.com", sponsorPotential: "High", sponsorRationale: "Global legal tech, compliance solutions", category: "Publisher", source: ["wolterskluwer.com"] },

    // ==================== TRAINING PROVIDERS ====================
    { id: "71", fullName: "", jobTitle: "Training Inquiries", company: "Meirc Training & Consulting", country: "UAE", city: "Dubai", email: "dubai@meirc.com", emailType: "inferred", emailNote: "Inferred from office naming", phone: "+971 4 556 7171", website: "https://meirc.com", sponsorPotential: "Medium", sponsorRationale: "Legal courses provider", category: "Training", source: ["meirc.com"] },
    { id: "72", fullName: "", jobTitle: "Training Services", company: "British Legal Centre", country: "UAE", city: "Dubai", email: "info@british-legal-centre.com", emailType: "inferred", emailNote: "Inferred standard format", website: "https://british-legal-centre.com", sponsorPotential: "Medium", sponsorRationale: "CLPD authorized provider", category: "Training", source: ["british-legal-centre.com"] },
    { id: "73", fullName: "", jobTitle: "Training Inquiries", company: "de Burgh Group", country: "UAE", city: "Dubai", email: "info@deburghgroup.com", emailType: "inferred", emailNote: "Inferred standard format", website: "https://deburghgroup.com", sponsorPotential: "Medium", sponsorRationale: "CLPD accredited since 2017", category: "Training", source: ["deburghgroup.com"] },
    { id: "74", fullName: "", jobTitle: "Academy Inquiries", company: "DIFC Academy", country: "UAE", city: "Dubai", email: "academy@difc.ae", emailType: "inferred", emailNote: "Inferred from DIFC academy web", phone: "+971 4 362 2222", website: "https://difc.ae/business/academy", sponsorPotential: "High", sponsorRationale: "DIFC educational arm, partnership potential", category: "Training", source: ["difc.ae"] },

    // ==================== CONFERENCE SPONSORS ====================
    { id: "75", fullName: "", jobTitle: "Sponsorship Inquiries", company: "Reed Smith", country: "UAE", city: "Dubai", email: "reedsmith@reedsmith.com", emailType: "corporate", emailNote: "Verified from reedsmith.com", phone: "+971 47096300", website: "https://reedsmith.com", sponsorPotential: "High", sponsorRationale: "Dubai Arbitration Week 2024 sponsor", category: "Sponsor", source: ["reedsmith.com"] },
    { id: "76", fullName: "", jobTitle: "Sponsorship Inquiries", company: "CMS", country: "UAE", city: "Dubai", email: "dubai@cms-cmck.com", emailType: "corporate", emailNote: "Verified from legal500.com", phone: "+971 4 374 2800", website: "https://cms.law", sponsorPotential: "High", sponsorRationale: "Legal500 GC Summit partner", category: "Sponsor", source: ["legal500.com"] },
    { id: "77", fullName: "", jobTitle: "Sponsorship Inquiries", company: "Stephenson Harwood", country: "UAE", city: "Dubai", email: "Info.dubai@stephensonharwood.com", emailType: "corporate", emailNote: "Verified from stephensonharwood.com", website: "https://shlegal.com", sponsorPotential: "High", sponsorRationale: "Legal500 GC Summit partner", category: "Sponsor", source: ["legal500.com", "stephensonharwood.com"] },
    { id: "78", fullName: "", jobTitle: "Sponsorship Inquiries", company: "Greenberg Traurig", country: "UAE", city: "Dubai", email: "Steven.Bainbridge@gtlaw.com", emailType: "corporate", emailNote: "Head of Sport & Entertainment - verified", phone: "+971.45.55.3666", website: "https://gtlaw.com", sponsorPotential: "High", sponsorRationale: "Legal500 networking sponsor, M&A Summit partner", category: "Sponsor", source: ["legal500.com", "gtlaw.com"] },
    { id: "79", fullName: "", jobTitle: "Sponsorship Inquiries", company: "Afridi & Angell", country: "UAE", city: "Dubai", email: "dubai@afridi-angell.com", emailType: "corporate", emailNote: "Verified from afridi-angell.com", phone: "+971 4 330 3900", website: "https://afridi-angell.com", sponsorPotential: "High", sponsorRationale: "Legal500 GC Summit sponsor", category: "Sponsor", source: ["legal500.com", "afridi-angell.com"] },
    { id: "80", fullName: "", jobTitle: "Sponsorship Inquiries", company: "WinJustice", country: "UAE", city: "Dubai", email: "info@winjustice.com", emailType: "inferred", emailNote: "Inferred standard format", website: "https://winjustice.com", sponsorPotential: "Medium", sponsorRationale: "ICC MENA Conference official sponsor", category: "Sponsor", source: ["winjustice.com"] },
    { id: "81", fullName: "", jobTitle: "Sponsorship Inquiries", company: "BSA LAW", country: "UAE", city: "Dubai", email: "info@bsalaw.com", emailType: "inferred", emailNote: "Inferred standard format", website: "https://bsalaw.com", sponsorPotential: "High", sponsorRationale: "M&A Summit 2025 partner", category: "Sponsor", source: ["law-middleeast.com"] },

    // ==================== LEGAL ASSOCIATIONS ====================
    { id: "82", fullName: "", jobTitle: "Events Inquiries", company: "Dubai International Arbitration Centre (DIAC)", country: "UAE", city: "Dubai", email: "events@diac.com", emailType: "corporate", emailNote: "Verified for events/training inquiries", phone: "+971 4 375 8300", website: "https://diac.com", sponsorPotential: "High", sponsorRationale: "Key arbitration institution, partnership", category: "Association", source: ["diac.com"] },
    { id: "83", fullName: "", jobTitle: "General Inquiries", company: "DIFC-LCIA Arbitration Centre", country: "UAE", city: "Dubai", email: "casework@difc-lcia.org", emailType: "inferred", emailNote: "Inferred from arbitration convention", phone: "+971 4 427 3360", website: "https://difc-lcia.org", sponsorPotential: "High", sponsorRationale: "Premier arbitration centre", category: "Association", source: ["reedsmith.com"] },
    { id: "84", fullName: "", jobTitle: "Events Inquiries", company: "International Bar Association", country: "International", city: "", email: "", emailType: "generic", emailNote: "Contact via ibanet.org", website: "https://ibanet.org", sponsorPotential: "High", sponsorRationale: "Global bar, ME conference organizer", category: "Association", source: ["shandpartners.com"] },
];

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
    "Law Firm": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Corporate GC": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Legal Tech": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Publisher": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Training": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Sponsor": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Association": "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const POTENTIAL_COLORS: Record<string, string> = {
    "High": "bg-green-500/20 text-green-400 border-green-500/30",
    "Medium": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "Low": "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

export default function DubaiContactsResearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("All");
    const [countryFilter, setCountryFilter] = useState<string>("All");
    const [potentialFilter, setPotentialFilter] = useState<string>("All");

    // Get unique values for filters
    const categories = useMemo(() => ["All", ...Array.from(new Set(RESEARCH_CONTACTS.map(c => c.category)))], []);
    const countries = useMemo(() => ["All", ...Array.from(new Set(RESEARCH_CONTACTS.map(c => c.country))).sort()], []);
    const potentials = ["All", "High", "Medium", "Low"];

    // Filter contacts
    const filteredContacts = useMemo(() => {
        return RESEARCH_CONTACTS.filter(contact => {
            const matchesSearch = searchTerm === "" ||
                contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.country.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === "All" || contact.category === categoryFilter;
            const matchesCountry = countryFilter === "All" || contact.country === countryFilter;
            const matchesPotential = potentialFilter === "All" || contact.sponsorPotential === potentialFilter;
            return matchesSearch && matchesCategory && matchesCountry && matchesPotential;
        });
    }, [searchTerm, categoryFilter, countryFilter, potentialFilter]);

    // Stats
    const stats = useMemo(() => {
        const byCategory: Record<string, number> = {};
        const byCountry: Record<string, number> = {};
        const byPotential: Record<string, number> = {};
        RESEARCH_CONTACTS.forEach(c => {
            byCategory[c.category] = (byCategory[c.category] || 0) + 1;
            byCountry[c.country] = (byCountry[c.country] || 0) + 1;
            byPotential[c.sponsorPotential] = (byPotential[c.sponsorPotential] || 0) + 1;
        });
        return { byCategory, byCountry, byPotential, total: RESEARCH_CONTACTS.length };
    }, []);

    // Export CSV
    const handleExportCSV = () => {
        const headers = ["Full Name", "Job Title", "Company", "Country", "City", "Email", "Email Type", "Email Note", "Phone", "LinkedIn", "Website", "Sponsor Potential", "Rationale", "Category", "Sources"];
        const rows = filteredContacts.map(c => [
            c.fullName, c.jobTitle, c.company, c.country, c.city || "", c.email, c.emailType, c.emailNote || "", c.phone || "", c.linkedin || "", c.website, c.sponsorPotential, c.sponsorRationale, c.category, c.source.join("; ")
        ]);
        const csvContent = [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `lextalk_research_contacts_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
            <div className="max-w-[1800px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Conference Contact Research</h1>
                    <p className="text-slate-400">Public desk research: potential attendees, sponsors & collaborators for LexTalk World Dubai</p>
                    <p className="text-xs text-slate-500 mt-1">Sources: Official company websites, Legal500, Chambers, conference listings, press releases • Research: December 2024</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                        <div className="text-xs text-slate-400">Total Contacts</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-2xl font-bold text-blue-400">{stats.byCategory["Law Firm"] || 0}</div>
                        <div className="text-xs text-slate-400">Law Firms</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-2xl font-bold text-purple-400">{stats.byCategory["Corporate GC"] || 0}</div>
                        <div className="text-xs text-slate-400">Corporate GCs</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-2xl font-bold text-emerald-400">{stats.byCategory["Legal Tech"] || 0}</div>
                        <div className="text-xs text-slate-400">Legal Tech</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-2xl font-bold text-green-400">{stats.byPotential["High"] || 0}</div>
                        <div className="text-xs text-slate-400">High Potential</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-2xl font-bold text-amber-400">{Object.keys(stats.byCountry).length}</div>
                        <div className="text-xs text-slate-400">Countries</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="text-2xl font-bold text-cyan-400">{filteredContacts.length}</div>
                        <div className="text-xs text-slate-400">Filtered</div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex-1 min-w-[250px] relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, company, title, country..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-slate-400" />
                            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500">
                                {categories.map(cat => <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>)}
                            </select>
                            <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500">
                                {countries.map(c => <option key={c} value={c}>{c === "All" ? "All Countries" : c}</option>)}
                            </select>
                            <select value={potentialFilter} onChange={(e) => setPotentialFilter(e.target.value)} className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500">
                                {potentials.map(p => <option key={p} value={p}>{p === "All" ? "All Potential" : `${p} Potential`}</option>)}
                            </select>
                        </div>
                        <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
                            <Download size={16} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Contacts Table */}
                <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-900/50 text-slate-300 text-xs uppercase tracking-wide">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Name / Title</th>
                                    <th className="px-4 py-3 text-left font-semibold">Company</th>
                                    <th className="px-4 py-3 text-left font-semibold">Country</th>
                                    <th className="px-4 py-3 text-left font-semibold">Contact</th>
                                    <th className="px-4 py-3 text-left font-semibold">Category</th>
                                    <th className="px-4 py-3 text-left font-semibold">Potential</th>
                                    <th className="px-4 py-3 text-left font-semibold">Links</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-white">{contact.fullName || "(General Contact)"}</div>
                                            <div className="text-xs text-slate-400">{contact.jobTitle}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-slate-200">{contact.company}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-slate-300">{contact.country}</div>
                                            {contact.city && <div className="text-xs text-slate-500">{contact.city}</div>}
                                        </td>
                                        <td className="px-4 py-3">
                                            {contact.email && (
                                                <div className="flex items-center gap-1 text-xs">
                                                    <Mail size={12} className="text-slate-400" />
                                                    <a href={`mailto:${contact.email}`} className="text-amber-400 hover:underline">{contact.email}</a>
                                                </div>
                                            )}
                                            {contact.emailNote && <div className="text-[10px] text-slate-500 mt-0.5">{contact.emailNote}</div>}
                                            {contact.phone && (
                                                <div className="flex items-center gap-1 text-xs mt-1">
                                                    <Phone size={12} className="text-slate-400" />
                                                    <span className="text-slate-300">{contact.phone}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[10px] px-2 py-1 rounded border font-medium ${CATEGORY_COLORS[contact.category]}`}>
                                                {contact.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[10px] px-2 py-1 rounded border font-medium ${POTENTIAL_COLORS[contact.sponsorPotential]}`}>
                                                {contact.sponsorPotential}
                                            </span>
                                            <div className="text-[10px] text-slate-500 mt-1 max-w-[150px] truncate" title={contact.sponsorRationale}>
                                                {contact.sponsorRationale}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                {contact.linkedin && (
                                                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                                        <Linkedin size={16} />
                                                    </a>
                                                )}
                                                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                                                    <Globe size={16} />
                                                </a>
                                                {contact.contactPage && (
                                                    <a href={contact.contactPage} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-4 py-3 bg-slate-900/30 border-t border-slate-700 text-xs text-slate-400">
                        Showing {filteredContacts.length} of {stats.total} contacts
                    </div>
                </div>

                {/* Methods Note */}
                <div className="mt-6 bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                    <h3 className="text-sm font-semibold text-white mb-2">Research Methodology</h3>
                    <p className="text-xs text-slate-400">
                        Searched official company websites (contact/team pages), Legal500, Chambers directories, conference speaker lists (LexTalk 2024, Legal500 GC Summit, IIPLA, Dubai Arbitration Week), legal association websites, and press releases.
                        Prioritized verified corporate emails from official sources. Inferred emails marked as "inferred" with pattern notes. No LinkedIn scraping - only public profile URLs included where found through company pages.
                    </p>
                </div>
            </div>
        </div>
    );
}
