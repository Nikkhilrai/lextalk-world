"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavLink {
    name: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: { name: string; href: string }[];
}

interface NavbarProps {
    variant?: "default" | "light";
    minimal?: boolean;
}

export function Navbar({ variant = "default", minimal = false }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const [dynamicNavLinks] = useState<NavLink[]>([
        { name: "Home", href: "/" },
        {
            name: "The Counsel Exchange",
            href: "#",
            hasDropdown: true,
            dropdownItems: [
                { name: "Inside the Room", href: "/upcoming-counsel-exchange" },
                { name: "Session Archive", href: "/past-counsel-exchange" },
            ]
        },
        {
            name: "Conferences",
            href: "#",
            hasDropdown: true,
            dropdownItems: [
                { name: "Upcoming Conferences", href: "/conferences" },
            ]
        },
        { name: "Awardees", href: "/awardees" },
        { name: "Sponsor", href: "/sponsor" },
        {
            name: "More",
            href: "#",
            hasDropdown: true,
            dropdownItems: [
                { name: "Blog", href: "/blog" },
                { name: "Podcasts", href: "/podcasts" },
                { name: "Testimonial", href: "/testimonials" },
                { name: "Magazine", href: "/magazine" },
            ]
        },
    ]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={cn(
                    "fixed left-0 right-0 z-[99999] transition-all duration-500 ease-in-out top-0 pointer-events-auto",
                    isScrolled
                        ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Logo - Refined left shift */}
                    <Link href="/" className="flex items-center gap-2 group md:-ml-8">
                        <div className="relative w-[140px] h-10 lg:w-[200px] lg:h-14 transition-transform group-hover:scale-105 flex items-center">
                            <Image
                                src="/logo/lextalkworld_logo.png"
                                alt="Lextalk World"
                                width={240}
                                height={64}
                                className="object-contain object-left w-full h-full"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation - Hidden on Mobile/Tablet and when minimal */}
                    {!minimal && (
                        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                            {dynamicNavLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative group/nav"
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "relative text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-1",
                                            isScrolled
                                                ? "text-slate-700 hover:text-amber-600"
                                                : variant === "light"
                                                    ? "text-slate-800 hover:text-amber-600"
                                                    : "text-white/90 hover:text-amber-400"
                                        )}
                                    >
                                        {link.name}
                                        {link.hasDropdown && (
                                            <ChevronDown size={14} className="transition-transform duration-200 group-hover/nav:rotate-180" />
                                        )}
                                        <span className={cn(
                                            "absolute -bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 -translate-x-1/2 group-hover/nav:w-full",
                                            isScrolled ? "bg-amber-600" : "bg-amber-400"
                                        )} />
                                    </Link>

                                    {/* Dropdown Menu - CSS hover controlled, no React state needed */}
                                    {link.hasDropdown && link.dropdownItems && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 opacity-0 -translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto z-[99999]">
                                            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-w-[200px]">
                                                {link.dropdownItems.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className="block px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-amber-400 hover:text-slate-900 transition-all duration-200"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link
                                href="/delegate-registration"
                                className="px-7 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-slate-800 hover:to-slate-900 text-white text-sm font-bold tracking-wide rounded-lg hover:shadow-lg hover:shadow-slate-900/30 hover:scale-105 transition-all duration-300"
                            >
                                Secure Pass
                            </Link>
                        </div>
                    )}

                    {/* Minimal mode - just show Secure Pass button */}
                    {minimal && (
                        <Link
                            href="/delegate-registration"
                            className="px-7 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-slate-800 hover:to-slate-900 text-white text-sm font-bold tracking-wide rounded-lg hover:shadow-lg hover:shadow-slate-900/30 hover:scale-105 transition-all duration-300"
                        >
                            Secure Pass
                        </Link>
                    )}

                    {/* Mobile/Tablet Menu Button - Hidden when minimal */}
                    {!minimal && (
                        <button
                            className={cn("lg:hidden p-2", isScrolled || variant === "light" ? "text-slate-900" : "text-white")}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>

                {/* Mobile Menu - Vertical Dropdown (Right Aligned) */}
                <div
                    className={cn(
                        "absolute top-full right-3 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-lg lg:hidden overflow-hidden transition-all duration-300 ease-out border border-slate-100",
                        isMobileMenuOpen
                            ? "opacity-100 translate-y-1 pointer-events-auto"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                >
                    {/* Menu Links - Single Vertical Column */}
                    <div className="flex flex-col py-2 max-h-[80vh] overflow-y-auto">
                        {dynamicNavLinks.map((link) => (
                            <div key={link.name}>
                                {link.hasDropdown ? (
                                    <>
                                        <button
                                            className="w-full px-5 py-2.5 text-slate-700 font-medium text-sm hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 border-b border-slate-50 flex items-center justify-between"
                                            onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                        >
                                            {link.name}
                                            <ChevronDown size={14} className={cn("transition-transform duration-200", openDropdown === link.name && "rotate-180")} />
                                        </button>
                                        {openDropdown === link.name && link.dropdownItems && (
                                            <div className="bg-slate-50">
                                                {link.dropdownItems.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className="block px-8 py-2.5 text-sm font-semibold text-slate-700 hover:bg-amber-400 hover:text-slate-900 transition-colors"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="px-5 py-2.5 text-slate-700 font-medium text-sm hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 border-b border-slate-50 block"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/delegate-registration"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mx-3 mt-2 mb-2 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg text-sm text-center block"
                        >
                            Secure Pass
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
