import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-slate-900 text-slate-300 border-t border-slate-800 overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full blur-3xl"></div>
            </div>

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1 space-y-4 sm:space-y-6">
                        <div className="bg-white p-3 rounded-xl inline-block shadow-lg shadow-slate-900/20">
                            <Image
                                src="/logo/Lextalk-Logo.png"
                                alt="Lextalk World"
                                width={180}
                                height={60}
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
                            The premier global platform connecting legal minds through conferences, content, and recognition.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-2 sm:gap-3 pt-2">
                            <Link
                                href="#"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                                <Linkedin size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover:text-white transition-colors" />
                            </Link>
                            <Link
                                href="#"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                                <Twitter size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover:text-white transition-colors" />
                            </Link>
                            <Link
                                href="#"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                                <Facebook size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover:text-white transition-colors" />
                            </Link>
                            <Link
                                href="#"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                                <Instagram size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover:text-white transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg mb-4 sm:mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-8 sm:w-12 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li>
                                <Link href="/" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/conferences" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Conferences
                                </Link>
                            </li>
                            <li>
                                <Link href="/awardees" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Awardees
                                </Link>
                            </li>
                            <li>
                                <Link href="/sponsor" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Become a Sponsor
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg mb-4 sm:mb-6 relative inline-block">
                            Resources
                            <span className="absolute -bottom-2 left-0 w-8 sm:w-12 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li>
                                <Link href="/about" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/e-meet" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    E-Meet
                                </Link>
                            </li>
                            <li>
                                <Link href="/speakers" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Speakers
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg mb-4 sm:mb-6 relative inline-block">
                            Contact
                            <span className="absolute -bottom-2 left-0 w-8 sm:w-12 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
                        </h3>
                        <ul className="space-y-3 sm:space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors">
                                    <Mail size={14} className="sm:w-4 sm:h-4 text-amber-500" />
                                </div>
                                <a href="mailto:abhishek@clickawaycreators.com" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors pt-1.5">
                                    abhishek@clickawaycreators.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors">
                                    <Phone size={14} className="sm:w-4 sm:h-4 text-amber-500" />
                                </div>
                                <a href="tel:+919811885302" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors pt-1.5">
                                    +91 981 188 5302
                                </a>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors">
                                    <MapPin size={14} className="sm:w-4 sm:h-4 text-amber-500" />
                                </div>
                                <span className="text-xs sm:text-sm text-slate-400 pt-1.5">
                                    Global: Dubai, Singapore, New York
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Global Legal Honors Awards */}
                    <div>
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg mb-4 sm:mb-6 relative inline-block">
                            Award Nominations
                            <span className="absolute -bottom-2 left-0 w-8 sm:w-12 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mb-3">
                            For Nominations of Global Legal Honors Awards
                        </p>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-amber-500 font-medium">Kishan Chettri</p>
                                <p className="text-xs text-slate-500">Customer Success Manager</p>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors">
                                    <Phone size={14} className="sm:w-4 sm:h-4 text-amber-500" />
                                </div>
                                <a href="tel:+918178539941" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors pt-1.5">
                                    +91 817 853 9941
                                </a>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors">
                                    <Mail size={14} className="sm:w-4 sm:h-4 text-amber-500" />
                                </div>
                                <a href="mailto:kishan@lextalkworld.in" className="text-xs sm:text-sm text-slate-400 hover:text-amber-500 transition-colors pt-1.5">
                                    kishan@lextalkworld.in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
                            © {new Date().getFullYear()} LexTalk World. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                            <Link href="/privacy" className="text-slate-500 hover:text-amber-500 transition-colors">
                                Privacy Policy
                            </Link>
                            <span className="text-slate-700 hidden sm:inline">•</span>
                            <Link href="/terms" className="text-slate-500 hover:text-amber-500 transition-colors">
                                Terms of Service
                            </Link>
                            <span className="text-slate-700 hidden sm:inline">•</span>
                            <Link href="/cookies" className="text-slate-500 hover:text-amber-500 transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
