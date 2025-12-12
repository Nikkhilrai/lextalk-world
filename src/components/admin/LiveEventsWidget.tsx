"use client";

import { Calendar, MapPin, Radio, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";

interface LegalEvent {
    id: string;
    name: string;
    location: string;
    region: "Dubai" | "Middle East" | "India" | "USA" | "Global";
    date: string;
    status: "live" | "upcoming" | "completed";
    type: string;
    url: string;
}

// Real upcoming legal events for 2025 - Updated December 2024
const LEGAL_EVENTS: LegalEvent[] = [
    {
        id: "1",
        name: "LexTalk World Summit 2025",
        location: "Dubai, UAE",
        region: "Dubai",
        date: "May 13-14, 2025",
        status: "upcoming",
        type: "Conference",
        url: "/dubai-2026"
    },
    {
        id: "2",
        name: "ILTACON 2025",
        location: "Orlando, FL, USA",
        region: "USA",
        date: "Aug 17-21, 2025",
        status: "upcoming",
        type: "Conference",
        url: "https://www.iltacon.org"
    },
    {
        id: "3",
        name: "Legal Geek Conference",
        location: "London, UK",
        region: "Global",
        date: "Oct 2025",
        status: "upcoming",
        type: "Conference",
        url: "https://www.legalgeek.co"
    },
    {
        id: "4",
        name: "Dubai Arbitration Week",
        location: "Dubai, UAE",
        region: "Dubai",
        date: "Nov 2025",
        status: "upcoming",
        type: "Week",
        url: "https://www.dubaiarbitrationweek.com"
    },
    {
        id: "5",
        name: "CLOC Global Institute",
        location: "Las Vegas, NV, USA",
        region: "USA",
        date: "May 5-8, 2025",
        status: "upcoming",
        type: "Conference",
        url: "https://cloc.org/global-institute/"
    },
    {
        id: "6",
        name: "ACC Annual Meeting",
        location: "Boston, MA, USA",
        region: "USA",
        date: "Oct 2025",
        status: "upcoming",
        type: "Conference",
        url: "https://www.acc.com/annual-meeting"
    },
    {
        id: "7",
        name: "MENA In-House Legal Summit",
        location: "Riyadh, Saudi Arabia",
        region: "Middle East",
        date: "Q2 2025",
        status: "upcoming",
        type: "Summit",
        url: "https://www.legalcommunity.it"
    },
    {
        id: "8",
        name: "India Legal Tech Summit",
        location: "Mumbai, India",
        region: "India",
        date: "Sep 2025",
        status: "upcoming",
        type: "Summit",
        url: "https://www.legaleraonline.com"
    }
];

const REGION_COLORS: Record<string, string> = {
    "Dubai": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Middle East": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "India": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "USA": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Global": "bg-purple-500/20 text-purple-400 border-purple-500/30"
};

export function LiveEventsWidget() {
    return (
        <div className="vz-card rounded-sm h-full flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <h4 className="text-[16px] font-semibold text-white">Upcoming Legal Events</h4>
                </div>
                <div className="flex items-center gap-2">
                    <Globe size={14} className="text-[#878a99]" />
                    <span className="text-[11px] text-[#878a99] uppercase tracking-wider">Global</span>
                </div>
            </div>

            {/* Events List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="divide-y divide-white/5">
                    {LEGAL_EVENTS.map((event) => (
                        <Link
                            key={event.id}
                            href={event.url}
                            target={event.url.startsWith("http") ? "_blank" : "_self"}
                            rel={event.url.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="p-4 hover:bg-white/[0.03] transition-colors group block cursor-pointer"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    {/* Event Name */}
                                    <div className="flex items-center gap-2">
                                        <h5 className="text-[14px] font-medium text-white truncate group-hover:text-[#0ab39c] transition-colors">
                                            {event.name}
                                        </h5>
                                        <ExternalLink size={12} className="text-[#878a99] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                    </div>

                                    {/* Location & Date */}
                                    <div className="flex items-center gap-3 mt-1.5 text-[12px] text-[#878a99]">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} className="text-[#405189]" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} className="text-[#405189]" />
                                            <span>{event.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Region Badge */}
                                <div className="flex flex-col items-end gap-1.5">
                                    <span className={`text-[10px] px-2 py-0.5 rounded border ${REGION_COLORS[event.region]}`}>
                                        {event.region}
                                    </span>

                                    {/* Status */}
                                    <div className="flex items-center gap-1">
                                        {event.status === "live" ? (
                                            <>
                                                <Radio size={10} className="text-green-500 animate-pulse" />
                                                <span className="text-[10px] text-green-400 font-medium">LIVE</span>
                                            </>
                                        ) : (
                                            <span className="text-[10px] text-[#878a99]">{event.type}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/5 text-center">
                <span className="text-[11px] text-[#878a99]">
                    Click any event to visit • {LEGAL_EVENTS.length} upcoming events in 2025
                </span>
            </div>
        </div>
    );
}

