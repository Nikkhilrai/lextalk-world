"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Flame, ArrowRight } from "lucide-react";
import { RegisterModal } from "@/components/RegisterModal";
import { getAwardEvents } from "@/actions/awardee";

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
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [bannerVisible, setBannerVisible] = useState(false);
    const [bannerDismissed, setBannerDismissed] = useState(false);

    // Countdown to Dubai 2026 event
    const eventDate = new Date("2026-05-15T00:00:00");
    const now = new Date();
    const daysLeft = Math.max(0, Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const [dynamicNavLinks, setDynamicNavLinks] = useState<NavLink[]>([
        { name: "Home", href: "/" },
        {
            name: "E-Meet",
            href: "#",
            hasDropdown: true,
            dropdownItems: [
                { name: "Upcoming E-Meet", href: "/upcoming-e-meet" },
                { name: "Past E-Meet", href: "/e-meet" },
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

        // Fetch award events
        const fetchEvents = async () => {
            try {
                const res = await getAwardEvents();
                if (res.success && res.events.length > 0) {
                    const awardItems = res.events
                        .filter((e: any) => e.isActive)
                        .map((e: any) => ({
                            name: `Awardees ${e.name}`,
                            href: `/awardees/${e.slug}`
                        }));


                }
            } catch (error) {
                console.error("Failed to fetch nav events:", error);
            }
        };
        fetchEvents();

        // Banner: check dismissal and show after delay
        const dismissed = sessionStorage.getItem("banner_dismissed");
        if (dismissed) {
            setBannerDismissed(true);
        } else {
            const bannerTimer = setTimeout(() => setBannerVisible(true), 800);
            return () => {
                window.removeEventListener("scroll", handleScroll);
                clearTimeout(bannerTimer);
            };
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBannerDismiss = () => {
        setBannerDismissed(true);
        setBannerVisible(false);
        sessionStorage.setItem("banner_dismissed", "true");
    };

    const showBanner = bannerVisible && !bannerDismissed;

    return (
        <>
            {/* Urgency Banner - sits above navbar */}
            <div
                className={cn(
                    "fixed top-0 left-0 right-0 z-[51] transition-all duration-500 ease-out",
                    showBanner ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
                )}
            >
                <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-amber-500/20">
                    <div className="relative container mx-auto px-4">
                        <div className="flex items-center justify-center gap-2 sm:gap-4 py-2 sm:py-2.5 text-center pr-8">
                            <Flame className="hidden sm:block w-3.5 h-3.5 text-amber-400 animate-pulse flex-shrink-0" />
                            <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-[10px] sm:text-xs">
                                <span className="font-bold text-amber-400 tracking-wide">DUBAI 2026</span>
                                <span className="text-slate-400 hidden sm:inline">—</span>
                                <span className="text-white/90 font-medium">
                                    Only <span className="text-amber-400 font-black">{daysLeft}</span> days left
                                </span>
                                <span className="text-slate-500 hidden md:inline">|</span>
                                <span className="text-slate-300 hidden md:inline font-normal">Limited Seats</span>
                            </div>
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="group flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-[10px] sm:text-xs rounded-full transition-all duration-200 flex-shrink-0"
                            >
                                Register
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <button
                                onClick={handleBannerDismiss}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition-colors"
                                aria-label="Dismiss banner"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar - offset by banner height when visible */}
            <nav
                className={cn(
                    "fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out",
                    showBanner ? "top-[36px] sm:top-[40px]" : "top-0",
                    isScrolled
                        ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-2 md:px-4 flex items-center justify-between">
                    {/* Logo - Refined left shift */}
                    <Link href="/" className="flex items-center gap-2 group -ml-6 md:-ml-12">
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
                                    className="relative"
                                    onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.name)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "relative text-sm font-semibold tracking-wide transition-all duration-300 group flex items-center gap-1",
                                            isScrolled
                                                ? "text-slate-700 hover:text-amber-600"
                                                : variant === "light"
                                                    ? "text-slate-800 hover:text-amber-600"
                                                    : "text-white/90 hover:text-amber-400"
                                        )}
                                    >
                                        {link.name}
                                        {link.hasDropdown && (
                                            <ChevronDown size={14} className={cn("transition-transform duration-200", openDropdown === link.name && "rotate-180")} />
                                        )}
                                        <span className={cn(
                                            "absolute -bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 -translate-x-1/2 group-hover:w-full",
                                            isScrolled ? "bg-amber-600" : "bg-amber-400"
                                        )} />
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {link.hasDropdown && link.dropdownItems && (
                                        <div className={cn(
                                            "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300",
                                            openDropdown === link.name
                                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                                : "opacity-0 -translate-y-2 pointer-events-none"
                                        )}>
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
                                href="/dubai-delegate-registration-2026"
                                target="_blank"
                                className="px-7 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-slate-800 hover:to-slate-900 text-white text-sm font-bold tracking-wide rounded-lg hover:shadow-lg hover:shadow-slate-900/30 hover:scale-105 transition-all duration-300"
                            >
                                Secure Pass
                            </Link>
                        </div>
                    )}

                    {/* Minimal mode - just show Secure Pass button */}
                    {minimal && (
                        <Link
                            href="/dubai-delegate-registration-2026"
                            target="_blank"
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
                            href="/dubai-delegate-registration-2026"
                            target="_blank"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mx-3 mt-2 mb-2 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg text-sm text-center"
                        >
                            Secure Pass
                        </Link>
                    </div>
                </div>
            </nav >

            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
    );
}
