"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Users, FileText, Award, Mic, Settings,
    LogOut, Menu, X, Mail, HeartHandshake, BookOpen, Trophy, Ticket, Calendar
} from "lucide-react";
import Image from "next/image";
import { logout } from "@/actions/auth";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Leads", href: "/admin/leads", icon: Users },
    { label: "Conferences", href: "/admin/conferences", icon: Calendar },
    { label: "Tickets", href: "/admin/tickets", icon: Ticket },
    { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
    { label: "Speakers", href: "/admin/speakers", icon: Mic },
    { label: "Sponsors", href: "/admin/sponsors", icon: HeartHandshake },
    { label: "Awards", href: "/admin/awards", icon: Trophy },
    { label: "Blog", href: "/admin/blog", icon: BookOpen },
    { label: "Advisors", href: "/admin/advisors", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
                    {/* Logo Section */}
                    <div className="p-6 border-b border-slate-800 flex justify-center">
                        <Image
                            src="/logo/Lextalk-Logo.png"
                            alt="Lextalk World"
                            width={140}
                            height={40}
                            className="h-8 w-auto object-contain"
                        />
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative ${isActive
                                        ? "bg-gradient-to-r from-amber-500/10 to-amber-600/5 text-amber-500"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 w-1 h-6 bg-amber-500 rounded-r-full" />
                                    )}
                                    <Icon
                                        size={20}
                                        className={`transition-colors ${isActive ? "text-amber-500" : "text-slate-500 group-hover:text-white"
                                            }`}
                                    />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Section */}
                    <div className="p-4 border-t border-slate-800">
                        <button
                            onClick={async () => {
                                await logout();
                                window.location.href = "/admin/login";
                            }}
                            className="flex items-center gap-3 w-full px-3 py-3 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
                />
            )}
        </>
    );
}
