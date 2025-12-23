"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
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
            setIsScrolled(window.scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine colors based on variant and scroll state
    const isDark = variant === "default" && !isScrolled;

    return (
        <>
            {/* Two-Tier Navbar Container */}
            <div className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "translate-y-[-36px]" : ""
            )}>
                {/* Top Utility Bar */}
                <div className={cn(
                    "transition-all duration-300 border-b",
                    isDark
                        ? "bg-slate-900/80 backdrop-blur-md border-white/10"
                        : "bg-slate-800 border-slate-700"
                )}>
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex items-center justify-between h-9 text-xs">
                            {/* Left - Contact Info */}
                            <div className="hidden sm:flex items-center gap-4 text-slate-300">
                                <a href="mailto:info@lextalkworld.in" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                                    <Mail size={12} />
                                    <span>info@lextalkworld.in</span>
                                </a>
                                <span className="w-px h-3 bg-slate-600" />
                                <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                                    <Phone size={12} />
                                    <span>+91 98765 43210</span>
                                </a>
                            </div>

                            {/* Center - Location */}
                            <div className="flex items-center gap-1.5 text-slate-400 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                                <MapPin size={12} className="text-amber-500" />
                                <span>Dubai, UAE</span>
                            </div>

                            {/* Right - Social Links */}
                            <div className="hidden sm:flex items-center gap-3">
                                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors"><Facebook size={14} /></a>
                                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors"><Twitter size={14} /></a>
                                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors"><Linkedin size={14} /></a>
                                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors"><Instagram size={14} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Bar */}
                <nav
                    className={cn(
                        "transition-all duration-300",
                        isScrolled
                            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-900/5"
                            : isDark
                                ? "bg-slate-900/40 backdrop-blur-md"
                                : "bg-white/90 backdrop-blur-md border-b border-slate-100"
                    )}
                >
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="relative w-[140px] h-10 lg:w-[180px] lg:h-11 transition-transform group-hover:scale-105 flex items-center">
                                    <Image
                                        src="/logo/Lextalk-Logo.png"
                                        alt="Lextalk World"
                                        width={180}
                                        height={44}
                                        className="object-contain object-left w-full h-full"
                                        priority
                                    />
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center">
                                {/* Nav Links with separators */}
                                <div className="flex items-center">
                                    {navLinks.map((link, index) => (
                                        <div
                                            key={link.name}
                                            className="relative flex items-center"
                                            onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.name)}
                                            onMouseLeave={() => setOpenDropdown(null)}
                                        >
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    "relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-1",
                                                    isScrolled || variant === "light"
                                                        ? "text-slate-700 hover:text-amber-600"
                                                        : "text-white/90 hover:text-amber-400"
                                                )}
                                            >
                                                {link.name}
                                                {link.hasDropdown && (
                                                    <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                                )}
                                            </Link>

                                            {/* Separator */}
                                            {index < navLinks.length - 1 && (
                                                <span className={cn(
                                                    "w-px h-4",
                                                    isScrolled || variant === "light" ? "bg-slate-200" : "bg-white/20"
                                                )} />
                                            )}

                                            {/* Dropdown Menu */}
                                            {link.hasDropdown && link.dropdownItems && (
                                                <div className={cn(
                                                    "absolute top-full left-0 pt-2 transition-all duration-200",
                                                    openDropdown === link.name
                                                        ? "opacity-100 translate-y-0 pointer-events-auto"
                                                        : "opacity-0 -translate-y-2 pointer-events-none"
                                                )}>
                                                    <div className="bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden min-w-[200px]">
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
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href="/tickets"
                                    target="_blank"
                                    className="ml-6 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold tracking-wide rounded-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300"
                                >
                                    Secure Pass
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className={cn(
                                    "lg:hidden p-2 rounded-lg transition-colors",
                                    isScrolled || variant === "light"
                                        ? "text-slate-900 hover:bg-slate-100"
                                        : "text-white hover:bg-white/10"
                                )}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={cn(
                            "lg:hidden bg-white border-t border-slate-100 overflow-hidden transition-all duration-300",
                            isMobileMenuOpen ? "max-h-[500px]" : "max-h-0"
                        )}
                    >
                        <div className="container mx-auto px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.hasDropdown ? (
                                        <>
                                            <button
                                                className="w-full px-4 py-3 text-left font-semibold text-slate-700 rounded-lg flex items-center justify-between hover:bg-slate-50 transition-colors"
                                                onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                            >
                                                {link.name}
                                                <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openDropdown === link.name && link.dropdownItems && (
                                                <div className="ml-4 mt-1 space-y-1 border-l-2 border-amber-200">
                                                    {link.dropdownItems.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="block px-4 py-2 text-sm text-slate-600 hover:text-amber-600 transition-colors"
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
                                            className="block px-4 py-3 font-semibold text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="pt-3">
                                <Link
                                    href="/tickets"
                                    target="_blank"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg text-center"
                                >
                                    Secure Pass
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Spacer for fixed navbar */}
            <div className="h-[100px] lg:h-[100px]" />

            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
    );
}
