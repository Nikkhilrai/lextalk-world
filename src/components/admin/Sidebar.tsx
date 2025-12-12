"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Users, FileText, Award, Mic, Settings,
    LogOut, Menu, X, Mail, HeartHandshake, BookOpen, Trophy, Ticket, Calendar,
    PieChart, Layers, Map as MapIcon, Shield
} from "lucide-react";
import Image from "next/image";
import { logout } from "@/actions/auth";

const NAV_GROUPS = [
    {
        title: "MENU",
        items: [
            { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { label: "Leads", href: "/admin/leads", icon: Users },
            { label: "Analytics", href: "/admin", icon: PieChart },
        ]
    },
    {
        title: "APPS",
        items: [
            { label: "Conferences", href: "/admin/conferences", icon: Calendar },
            { label: "Tickets", href: "/admin/tickets", icon: Ticket },
            { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
            { label: "Chat", href: "#", icon: Layers, badge: "New" }, // Placeholder
        ]
    },
    {
        title: "PAGES",
        items: [
            { label: "Speakers", href: "/admin/speakers", icon: Mic },
            { label: "Sponsors", href: "/admin/sponsors", icon: HeartHandshake },
            { label: "Awards", href: "/admin/awards", icon: Trophy },
            { label: "Dubai Contacts", href: "/admin/dubai-contacts", icon: Users },
            { label: "Blog", href: "/admin/blog", icon: BookOpen },
            { label: "Authentication", href: "/admin/settings", icon: Shield },
        ]
    }
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Initial state for mobile
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-3 left-4 z-50 p-2 text-white bg-[#405189] rounded shadow-lg"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <aside
                className={`fixed top-0 left-0 z-40 h-screen w-[250px] bg-[#13192f] border-r border-[#1b213b] transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="h-[70px] flex items-center justify-center border-b border-[#1b213b]">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-[#405189] flex items-center justify-center">
                            <span className="text-white font-bold text-lg">L</span>
                        </div>
                        <span className="text-white font-bold text-xl tracking-wide">LEXTALK</span>
                    </Link>
                </div>

                <div className="h-[calc(100vh-70px)] overflow-y-auto hidden-scrollbar py-4">
                    {NAV_GROUPS.map((group, idx) => (
                        <div key={idx} className="mb-6">
                            <div className="px-6 mb-2">
                                <p className="text-[#878a99] text-[11px] font-semibold uppercase tracking-wider">{group.title}</p>
                            </div>
                            <ul className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;

                                    return (
                                        <li key={item.label}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`relative flex items-center gap-3 px-6 py-2.5 text-[14px] font-medium transition-colors ${isActive
                                                    ? "text-white bg-[#1b213b] border-l-[3px] border-[#405189]"
                                                    : "text-[#abb9e8] hover:text-white hover:bg-[#1b213b]/50 border-l-[3px] border-transparent"
                                                    }`}
                                            >
                                                <Icon size={18} className={isActive ? "text-[#405189]" : "text-[#878a99]"} />
                                                <span className="flex-1">{item.label}</span>
                                                {(item as any).badge && (
                                                    <span className="bg-[#f06548] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                                                        {(item as any).badge}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}

                    {/* Logout */}
                    <div className="px-6 mt-8">
                        <button
                            onClick={async () => {
                                await logout();
                                window.location.href = "/admin/login";
                            }}
                            className="flex items-center gap-3 text-[#f06548] hover:text-white hover:bg-[#f06548] px-4 py-2 rounded transition-all w-full text-sm font-medium border border-[#f06548]/30"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#000]/50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
