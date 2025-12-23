"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { RegisterModal } from "@/components/RegisterModal";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "E-Meet", href: "#" },
    {
        name: "Conferences",
        href: "#",
        hasDropdown: true,
        dropdownItems: [
            { name: "Upcoming Conferences", href: "/conferences" },
        ]
    },
    { name: "Awardees", href: "/awards" },
    { name: "Sponsor", href: "#" },
    { name: "Blog", href: "/blog" },
];

interface NavbarProps {
    variant?: "default" | "light";
}

export function Navbar({ variant = "default" }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine colors based on variant and scroll state
    const isDark = variant === "default" && !isScrolled;
    const textColor = isDark ? "text-white/90" : "text-slate-700";
    const hoverColor = isDark ? "hover:text-amber-400" : "hover:text-amber-600";
    const underlineColor = isDark ? "bg-amber-400" : "bg-amber-600";

    return (
        <>
            {/* Floating Pill Navbar Container */}
            <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-500">
                <nav
                    className={cn(
                        "mx-auto transition-all duration-500 ease-out",
                        isScrolled
                            ? "mt-0 max-w-full bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-900/5 rounded-none border-b border-slate-100"
                            : variant === "light"
                                ? "mt-4 max-w-6xl bg-white/80 backdrop-blur-xl rounded-full shadow-lg shadow-slate-900/10 border border-white/50"
                                : "mt-4 max-w-6xl bg-slate-900/30 backdrop-blur-xl rounded-full shadow-lg shadow-black/20 border border-white/10"
                    )}
                >
                    <div className={cn(
                        "flex items-center justify-between transition-all duration-500",
                        isScrolled ? "px-6 py-3" : "px-6 md:px-8 py-3"
                    )}>
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-[130px] h-8 lg:w-[160px] lg:h-10 transition-transform group-hover:scale-105 flex items-center">
                                <Image
                                    src="/logo/Lextalk-Logo.png"
                                    alt="Lextalk World"
                                    width={160}
                                    height={40}
                                    className="object-contain object-left w-full h-full"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.name)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full flex items-center gap-1",
                                            textColor,
                                            hoverColor,
                                            "hover:bg-white/10"
                                        )}
                                    >
                                        {link.name}
                                        {link.hasDropdown && (
                                            <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                        )}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {link.hasDropdown && link.dropdownItems && (
                                        <div className={cn(
                                            "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200",
                                            openDropdown === link.name
                                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                                : "opacity-0 -translate-y-2 pointer-events-none"
                                        )}>
                                            <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-slate-100 overflow-hidden min-w-[200px]">
                                                {link.dropdownItems.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* CTA Button */}
                            <Link
                                href="/tickets"
                                target="_blank"
                                className={cn(
                                    "ml-4 px-5 py-2 text-sm font-bold tracking-wide rounded-full transition-all duration-300",
                                    "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
                                    "hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105"
                                )}
                            >
                                Secure Pass
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={cn(
                                "lg:hidden p-2 rounded-full transition-colors",
                                isDark ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"
                            )}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                    {/* Mobile Menu - Inside the pill */}
                    <div
                        className={cn(
                            "lg:hidden overflow-hidden transition-all duration-300",
                            isMobileMenuOpen ? "max-h-[400px] pb-4" : "max-h-0"
                        )}
                    >
                        <div className="px-4 pt-2 space-y-1">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.hasDropdown ? (
                                        <>
                                            <button
                                                className={cn(
                                                    "w-full px-4 py-2.5 text-left font-medium text-sm rounded-lg flex items-center justify-between transition-colors",
                                                    isDark ? "text-white/90 hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
                                                )}
                                                onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                            >
                                                {link.name}
                                                <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openDropdown === link.name && link.dropdownItems && (
                                                <div className="ml-4 mt-1 space-y-1">
                                                    {link.dropdownItems.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className={cn(
                                                                "block px-4 py-2 text-sm rounded-lg transition-colors",
                                                                isDark ? "text-white/70 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                                                            )}
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
                                            className={cn(
                                                "block px-4 py-2.5 font-medium text-sm rounded-lg transition-colors",
                                                isDark ? "text-white/90 hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
                                            )}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <Link
                                href="/tickets"
                                target="_blank"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block mx-2 mt-3 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full text-sm text-center"
                            >
                                Secure Pass
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>

            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
    );
}
