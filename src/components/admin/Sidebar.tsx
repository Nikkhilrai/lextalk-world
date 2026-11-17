"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, X } from "lucide-react";
import { logout } from "@/actions/auth";
import { activeItem, homeForRole, navForRole, roleLabel } from "@/components/admin/nav";
import { badgeText } from "@/components/admin/useNavCounts";

const COLLAPSE_KEY = "admin-nav-collapsed";

export function Sidebar({ role, open, onClose, counts = {} }: { role: string | null; open: boolean; onClose: () => void; counts?: Record<string, number> }) {
    const pathname = usePathname();
    const groups = navForRole(role);
    const current = activeItem(pathname);

    // Which groups are folded. Starts from each group's default; the viewer's
    // own choice is remembered in this browser.
    const [folded, setFolded] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(groups.map(g => [g.title, !!g.collapsed])));
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(COLLAPSE_KEY) || "null");
            if (saved && typeof saved === "object") setFolded(f => ({ ...f, ...saved }));
        } catch { /* private mode etc. — defaults are fine */ }
    }, []);
    const toggle = (title: string) => setFolded(f => {
        const next = { ...f, [title]: !f[title] };
        try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(next)); } catch { }
        return next;
    });

    return (
        <>
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col bg-[#0f1426] border-r border-white/[0.06] transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Brand */}
                <div className="h-16 shrink-0 flex items-center justify-between px-5 border-b border-white/[0.06]">
                    <Link href={homeForRole(role)} onClick={onClose} className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4f66b8] to-[#2d3a6b] flex items-center justify-center shadow-lg shadow-[#405189]/30 ring-1 ring-white/10">
                            <span className="text-white font-bold text-base">L</span>
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="text-white font-semibold text-[15px] tracking-wide">LexTalk World</span>
                            <span className="text-[#7c8db5] text-[11px] mt-1">{roleLabel(role)} console</span>
                        </span>
                    </Link>
                    <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-[#7c8db5] hover:text-white hover:bg-white/5" aria-label="Close menu">
                        <X size={18} />
                    </button>
                </div>

                {/* Groups */}
                <nav className="flex-1 overflow-y-auto hidden-scrollbar px-3 py-4 space-y-4">
                    {groups.map(group => {
                        const hasActive = group.items.some(i => i.href === current?.item.href);
                        const isFolded = folded[group.title] && !hasActive;
                        const groupNew = group.items.reduce((n, i) => n + (counts[i.href] ?? 0), 0);
                        return (
                            <div key={group.title}>
                                <button
                                    onClick={() => toggle(group.title)}
                                    className="w-full flex items-center justify-between px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5d6b8f] hover:text-[#9aa8c9] transition-colors"
                                >
                                    <span className="flex items-center gap-2">
                                        {group.title}
                                        {isFolded && groupNew > 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#f06548]" title={`${groupNew} new`} />}
                                    </span>
                                    <ChevronDown size={13} className={`transition-transform ${isFolded ? "-rotate-90" : ""}`} />
                                </button>
                                {!isFolded && (
                                    <ul className="space-y-0.5">
                                        {group.items.map(item => {
                                            const active = item.href === current?.item.href;
                                            const Icon = item.icon;
                                            return (
                                                <li key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={onClose}
                                                        title={item.hint}
                                                        className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-all ${active
                                                            ? "bg-[#405189]/25 text-white ring-1 ring-inset ring-[#5b6fb5]/40"
                                                            : "text-[#a3b0cf] hover:text-white hover:bg-white/[0.04]"}`}
                                                    >
                                                        <Icon size={17} className={active ? "text-[#8da2ea]" : "text-[#5d6b8f] group-hover:text-[#a3b0cf]"} />
                                                        <span className="flex-1 truncate">{item.label}</span>
                                                        {!!counts[item.href] && (
                                                            <span
                                                                title={`${counts[item.href]} new since you last opened this tab`}
                                                                className="shrink-0 min-w-[22px] h-5 px-1.5 rounded-full bg-[#f06548] text-white text-[10.5px] font-semibold flex items-center justify-center tabular-nums shadow-sm shadow-[#f06548]/40"
                                                            >
                                                                {badgeText(counts[item.href])}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="shrink-0 p-3 border-t border-white/[0.06]">
                    <button
                        onClick={async () => { await logout(); window.location.href = "/admin/login"; }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium text-[#a3b0cf] hover:text-[#ff8a73] hover:bg-[#f06548]/10 transition-colors"
                    >
                        <LogOut size={17} />
                        <span>Log out</span>
                    </button>
                </div>
            </aside>

            {open && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />}
        </>
    );
}
