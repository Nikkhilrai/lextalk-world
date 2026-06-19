"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { RegisterModal } from "@/components/RegisterModal";
import { cn } from "@/lib/utils";

interface NavLink {
    name: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: { name: string; href: string }[];
}

const navItems: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Upcoming Conference", href: "/conferences" },
    { name: "Blog/News", href: "/blog-news" },
    { name: "Sponsor", href: "/sponsor" },
    {
        name: "More",
        href: "#",
        hasDropdown: true,
        dropdownItems: [
            { name: "Podcasts", href: "/podcasts" },
            { name: "Testimonial", href: "/testimonials" },
            { name: "Magazine", href: "/magazine" },
        ]
    },
];

export function EventNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-lg py-4"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative">
                        <div className="relative w-[140px] h-10 lg:w-[200px] lg:h-12">
                            <Image
                                src="/logo/lextalkworld_logo.png"
                                alt="Lextalk World"
                                width={200}
                                height={48}
                                className="object-contain object-left w-full h-full"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((link) => (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.name)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-semibold transition-all duration-300 flex items-center gap-1",
                                        isScrolled
                                            ? "text-slate-700 hover:text-amber-500"
                                            : "text-white/90 hover:text-amber-400"
                                    )}
                                >
                                    {link.name}
                                    {link.hasDropdown && (
                                        <ChevronDown size={14} className={cn("transition-transform duration-200", openDropdown === link.name && "rotate-180")} />
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                {link.hasDropdown && link.dropdownItems && (
                                    <div className={cn(
                                        "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300",
                                        openDropdown === link.name
                                            ? "opacity-100 translate-y-0 pointer-events-auto"
                                            : "opacity-0 -translate-y-2 pointer-events-none"
                                    )}>
                                        <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden min-w-[180px]">
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
                    </div>

                    {/* Register Button */}
                    <div className="hidden md:block">
                        <button
                            onClick={() => setIsRegisterOpen(true)}
                            className="px-6 py-2.5 bg-amber-500 text-white font-bold text-sm tracking-wide rounded-full hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                        >
                            Register Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn("md:hidden p-2", isScrolled ? 'text-slate-900' : 'text-white')}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl md:hidden overflow-hidden transition-all duration-300",
                        isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <div className="container mx-auto px-4 py-6 space-y-1">
                        {navItems.map((link) => (
                            <div key={link.name}>
                                {link.hasDropdown ? (
                                    <>
                                        <button
                                            className="w-full flex items-center justify-between px-4 py-3 text-slate-700 font-bold text-sm hover:bg-slate-50 rounded-lg"
                                            onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                        >
                                            {link.name}
                                            <ChevronDown size={16} className={cn("transition-transform", openDropdown === link.name && "rotate-180")} />
                                        </button>
                                        {openDropdown === link.name && (
                                            <div className="bg-slate-50 rounded-lg mx-2 mb-2">
                                                {link.dropdownItems?.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className="block px-6 py-3 text-sm font-semibold text-slate-600 hover:text-amber-600"
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
                                        className="block px-4 py-3 text-slate-700 font-bold text-sm hover:bg-slate-50 rounded-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsRegisterOpen(true);
                            }}
                            className="w-full mt-4 px-6 py-3 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-600 transition-colors"
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            </nav>
            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
    );
}
