"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { RegisterModal } from "@/components/RegisterModal";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Upcoming Conference", href: "/conferences" },
    { label: "Blog", href: "/blog" },
    { label: "Sponsor", href: "#sponsorship" },
];

export function EventNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        {/* Logo */}
                        <Link href="/" className="relative">
                            <div className="relative w-[140px] h-10 lg:w-[200px] lg:h-12">
                                <Image
                                    src="/logo/Lextalk-Logo.png"
                                    alt="Lextalk World"
                                    className="object-contain object-left w-full h-full"
                                    width={200}
                                    height={48}
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors hover:text-amber-500 ${isScrolled ? "text-slate-700" : "text-white/90"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Register Button */}
                        <div className="hidden md:block">
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="px-6 py-2.5 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors"
                            >
                                Register Now
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`md:hidden p-2 ${isScrolled ? 'text-slate-900' : 'text-white'}`}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="block text-slate-700 hover:text-amber-500 font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsRegisterOpen(true);
                                }}
                                className="block w-full text-center px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors"
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                )}
            </nav>
            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
    );
}
