"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, Menu, Search, CornerDownLeft } from "lucide-react";
import { Sidebar } from "@/components/admin/Sidebar";
import { NotificationBell } from "@/components/admin/NotificationBell";
import { activeItem, navForRole, roleLabel, type NavItem } from "@/components/admin/nav";

type Props = { name: string; role: string | null; children: React.ReactNode };

export function AdminShell({ name, role, children }: Props) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const current = activeItem(pathname);

    return (
        <div className="min-h-screen admin-bg text-slate-200 font-sans selection:bg-[#405189]/40">
            <Sidebar role={role} open={menuOpen} onClose={() => setMenuOpen(false)} />

            <main className="lg:ml-[260px] min-h-screen flex flex-col">
                <header className="sticky top-0 z-30 h-16 bg-[#0b1020]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 flex items-center gap-4">
                    <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 -ml-2 rounded-lg text-[#a3b0cf] hover:text-white hover:bg-white/5" aria-label="Open menu">
                        <Menu size={20} />
                    </button>

                    <div className="min-w-0 flex-1">
                        {current ? (
                            <div className="flex items-center gap-2 text-[13px] min-w-0">
                                <span className="text-[#5d6b8f] hidden sm:inline">{current.group.title}</span>
                                <span className="text-[#3b4566] hidden sm:inline">/</span>
                                <span className="text-white font-semibold truncate">{current.item.label}</span>
                            </div>
                        ) : (
                            <span className="text-white font-semibold text-[13px]">Admin</span>
                        )}
                    </div>

                    <QuickJump role={role} />

                    <a href="/" target="_blank" rel="noopener noreferrer" title="Open the website"
                        className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12.5px] text-[#a3b0cf] hover:text-white hover:bg-white/5 transition-colors">
                        <ExternalLink size={15} /> View site
                    </a>

                    <NotificationBell />

                    <div className="flex items-center gap-3 pl-3 border-l border-white/[0.06]">
                        <div className="text-right hidden sm:block leading-tight">
                            <div className="text-[13px] font-semibold text-white">{name}</div>
                            <div className="text-[11px] text-[#7c8db5]">{roleLabel(role)}</div>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4f66b8] to-[#6559cc] flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white/10">
                            {name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">{children}</div>
            </main>
        </div>
    );
}

/** Jump to any tab by name: click the box or press ⌘K / Ctrl+K. */
function QuickJump({ role }: { role: string | null }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const [sel, setSel] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const all = useMemo(() => navForRole(role).flatMap(g => g.items.map(i => ({ ...i, group: g.title }))), [role]);
    const results = useMemo(() => {
        const t = q.trim().toLowerCase();
        if (!t) return all;
        return all.filter(i => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(t));
    }, [q, all]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(o => !o); }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);
    useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => inputRef.current?.focus(), 0); } }, [open]);
    useEffect(() => setSel(0), [q]);

    const go = (item?: NavItem) => { if (!item) return; setOpen(false); router.push(item.href); };

    return (
        <>
            <button onClick={() => setOpen(true)}
                className="hidden md:flex items-center gap-2 w-60 px-3 py-2 rounded-lg bg-white/[0.04] ring-1 ring-inset ring-white/[0.06] text-[12.5px] text-[#7c8db5] hover:bg-white/[0.06] transition-colors">
                <Search size={15} />
                <span className="flex-1 text-left">Jump to…</span>
                <kbd className="text-[10.5px] font-sans px-1.5 py-0.5 rounded bg-white/[0.06] text-[#a3b0cf]">⌘K</kbd>
            </button>
            <button onClick={() => setOpen(true)} className="md:hidden p-2 rounded-lg text-[#a3b0cf] hover:text-white hover:bg-white/5" aria-label="Search tabs">
                <Search size={19} />
            </button>

            {open && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
                    <div className="w-full max-w-lg rounded-2xl bg-[#121831] ring-1 ring-white/10 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-3 px-4 border-b border-white/[0.06]">
                            <Search size={17} className="text-[#7c8db5]" />
                            <input
                                ref={inputRef}
                                value={q}
                                onChange={e => setQ(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)); }
                                    if (e.key === "ArrowUp") { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
                                    if (e.key === "Enter") go(results[sel]);
                                }}
                                placeholder="Search tabs — delegates, nominations, blog…"
                                className="flex-1 bg-transparent py-4 text-[14px] text-white placeholder:text-[#5d6b8f] focus:outline-none"
                            />
                        </div>
                        <ul className="max-h-[50vh] overflow-y-auto p-2">
                            {results.length === 0 && <li className="px-3 py-6 text-center text-[13px] text-[#7c8db5]">No tab matches “{q}”.</li>}
                            {results.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.href}>
                                        <Link href={item.href} onClick={() => setOpen(false)} onMouseEnter={() => setSel(i)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${i === sel ? "bg-[#405189]/30 text-white" : "text-[#a3b0cf]"}`}>
                                            <Icon size={17} className={i === sel ? "text-[#8da2ea]" : "text-[#5d6b8f]"} />
                                            <span className="flex-1 min-w-0">
                                                <span className="block text-[13.5px] font-medium truncate">{item.label}</span>
                                                {item.hint && <span className="block text-[11.5px] text-[#7c8db5] truncate">{item.hint}</span>}
                                            </span>
                                            <span className="text-[11px] text-[#5d6b8f]">{item.group}</span>
                                            {i === sel && <CornerDownLeft size={14} className="text-[#7c8db5]" />}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
