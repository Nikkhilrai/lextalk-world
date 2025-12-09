"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    BarChart3,
    Users,
    Ticket,
    Settings,
    LogOut,
    Menu,
    X,
    BookOpen,
    Trophy
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming cn utility is available

const sidebarItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Lead Generation", href: "/admin/leads", icon: Users },
    { label: "Blog Management", href: "/admin/blog", icon: BookOpen },
    { label: "Advisory Board", href: "/admin/advisors", icon: Users },
    { label: "Award Management", href: "/admin/awards", icon: Trophy },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Ticket Sales", href: "/admin/sales", icon: Ticket },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); // Changed from isMobileOpen to isOpen
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950 flex items-center justify-between px-4 z-40 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo/Lextalk-Logo.png"
                        alt="Lextalk World"
                        width={120}
                        height={32}
                        className="object-contain"
                    />
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-slate-400 hover:text-white"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 bottom-0 w-64 bg-slate-950 border-r border-slate-800 z-50 transition-transform duration-300 lg:translate-x-0 flex flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <Image
                        src="/logo/Lextalk-Logo.png"
                        alt="Lextalk World"
                        width={140}
                        height={40}
                        className="object-contain"
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden ml-auto text-slate-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-3">
                    <nav className="space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1",
                                        isActive
                                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                                    )}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer User Area */}
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                    <div className="mt-4 pt-4 border-t border-slate-900 text-center">
                        <p className="text-xs text-slate-600">v1.0.0 • Admin Panel</p>
                    </div>
                </div>
            </aside>
        </>
    );
}
