import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Brand Column */}
                    <div className="sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
                        <div className="bg-white p-3 rounded-xl inline-block shadow-lg shadow-slate-900/20">
                            <Image
                                src="/logo/lextalkworld_logo.png"
                                alt="Lextalk World"
                                width={180}
                                height={60}
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
                            The premier global platform connecting legal minds through conferences, content, and recognition.
                        </p>

                        {/* Organisation Info */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-wider text-amber-500/80 font-bold">Organised by</p>
                                <p className="text-sm text-slate-200 font-semibold">ClickAway Creators LLP</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-wider text-amber-500/80 font-bold">Managed by</p>
                                <p className="text-sm text-slate-200 font-semibold">MantranexVista</p>
                            </div>
                        </div>
                        {/* Social Links */}
                        <div className="flex gap-2 sm:gap-3 pt-2">
                            <Link
                                href="https://www.linkedin.com/company/lextalkworld-apac-me/posts/?feedView=all"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                                <Linkedin size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover:text-white transition-colors" />
                            </Link>
                            <Link
                                href="https://x.com/LextalkWorldME"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                                <Twitter size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover:text-white transition-colors" />
                            </Link>
                            <Link
                                href="https://www.facebook.com/profile.php?id=61585120593750"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                                <Facebook size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover:text-white transition-colors" />
                            </Link>
                            <Link
                                href="https://www.instagram.com/lextalkworldapacandme/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                                <Instagram size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover:text-white transition-colors" />
                            </Link>
                            <Link
                                href="https://www.youtube.com/@LextalkWorldAPACandME"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                            >
                                <Youtube size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 group-hover:text-white transition-colors" />
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
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg mb-4 sm:mb-6 relative inline-block">
                            Contact
                            <span className="absolute -bottom-2 left-0 w-8 sm:w-12 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 group">
                                <div className="w-7 h-7 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors mt-1">
                                    <Mail size={12} className="text-amber-500" />
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <a href="mailto:info@lextalk.world" className="text-xs text-slate-400 hover:text-amber-500 transition-colors">
                                        info@lextalk.world
                                    </a>
                                    <a href="mailto:partnerships@lextalk.world" className="text-xs text-slate-400 hover:text-amber-500 transition-colors">
                                        partnerships@lextalk.world
                                    </a>
                                    <div className="text-[10px] text-slate-600 font-medium my-0.5 uppercase tracking-wide">Or</div>
                                    <a href="mailto:abhishek@clickawaycreators.com" className="text-xs text-slate-400 hover:text-amber-500 transition-colors">
                                        abhishek@clickawaycreators.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="w-7 h-7 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors">
                                    <Phone size={12} className="text-amber-500" />
                                </div>
                                <a href="tel:+919811885302" className="text-xs text-slate-400 hover:text-amber-500 transition-colors pt-1">
                                    +91 981 188 5302
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="w-7 h-7 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors">
                                    <MapPin size={12} className="text-amber-500" />
                                </div>
                                <span className="text-xs text-slate-400 pt-0.5 leading-relaxed uppercase font-medium tracking-wide">
                                    GURGAON, INDIA | Dubai, UAE
                                </span>
                            </li>
                        </ul>

                        {/* Award Nominations - Merged */}
                        <div className="mt-6 pt-4 border-t border-slate-800">
                            <p className="text-xs text-amber-500 font-medium mb-2">Global Legal Honour</p>
                            <p className="text-xs text-slate-500 mb-2">Kishan Chhetry, Customer Success Manager</p>
                            <div className="space-y-1">
                                <a href="tel:+919311899545" className="text-xs text-slate-400 hover:text-amber-500 block">+91 931 189 9545</a>
                                <a href="mailto:kishan@lextalkworld.in" className="text-xs text-slate-400 hover:text-amber-500 block">kishan@lextalkworld.in</a>
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
