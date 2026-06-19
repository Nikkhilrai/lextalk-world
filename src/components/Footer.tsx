import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-slate-900 text-slate-300 border-t border-slate-800 overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
            </div>

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">

                    {/* Brand Column */}
                    <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4">
                        <div className="bg-white p-2.5 rounded-xl inline-block shadow-lg shadow-slate-900/20">
                            <Image
                                src="/logo/lextalkworld_logo.png"
                                alt="Lextalk World"
                                width={160}
                                height={50}
                                className="h-8 w-auto object-contain"
                            />
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                            The premier global platform connecting legal minds through conferences, content, and recognition.
                        </p>

                        {/* Organisation Info */}
                        <div className="grid grid-cols-2 gap-4 pt-1">
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-wider text-amber-500/80 font-bold">Organised by</p>
                                <div className="space-y-1">
                                    <Image
                                        src="/images/footer/ClickAway Creators LLP_logo.avif"
                                        alt="ClickAway Creators LLP"
                                        width={100}
                                        height={36}
                                        className="h-7 w-auto object-contain hover:scale-105 transition-transform"
                                    />
                                    <p className="text-xs text-slate-200 font-semibold">ClickAway Creators LLP</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-wider text-amber-500/80 font-bold">Managed by</p>
                                <div className="space-y-1">
                                    <Image
                                        src="/images/footer/MantraNex-Vista.png"
                                        alt="MantranexVista"
                                        width={100}
                                        height={36}
                                        className="h-7 w-auto object-contain hover:scale-105 transition-transform"
                                    />
                                    <p className="text-xs text-slate-200 font-semibold">MantranexVista</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-2 pt-1">
                            {[
                                { href: "https://www.linkedin.com/company/lextalkworld-apac-me/", Icon: Linkedin },
                                { href: "https://x.com/LextalkWorldME", Icon: Twitter },
                                { href: "https://www.facebook.com/profile.php?id=61585120593750", Icon: Facebook },
                                { href: "https://www.instagram.com/lextalkworldapacandme/", Icon: Instagram },
                                { href: "https://www.youtube.com/@LextalkWorldAPACandME", Icon: Youtube },
                            ].map(({ href, Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group w-8 h-8 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-amber-500"
                                >
                                    <Icon size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-serif font-bold text-sm sm:text-base mb-3 sm:mb-4 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/conferences", label: "Conferences" },
                                { href: "/awardees", label: "Awardees" },
                                { href: "/sponsor", label: "Become a Sponsor" },
                                { href: "/blog", label: "Blog/News" },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className="text-xs text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-serif font-bold text-sm sm:text-base mb-3 sm:mb-4 relative inline-block">
                            Resources
                            <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/upcoming-counsel-exchange", label: "The Counsel Exchange" },
                                { href: "/podcasts", label: "Podcasts" },
                                { href: "/testimonials", label: "Testimonials" },
                                { href: "/magazine", label: "Magazine" },
                                { href: "/contact", label: "Contact Us" },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className="text-xs text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-2 sm:col-span-2 lg:col-span-1">
                        <h3 className="text-white font-serif font-bold text-sm sm:text-base mb-3 sm:mb-4 relative inline-block">
                            Contact
                            <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2.5 group">
                                <div className="w-6 h-6 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors mt-0.5">
                                    <Mail size={11} className="text-amber-500" />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <a href="mailto:info@lextalkworld.in" className="text-xs text-slate-400 hover:text-amber-500 transition-colors">info@lextalkworld.in</a>
                                    <a href="mailto:partnerships@lextalkworld.in" className="text-xs text-slate-400 hover:text-amber-500 transition-colors">partnerships@lextalkworld.in</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-2.5 group">
                                <div className="w-6 h-6 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors">
                                    <Phone size={11} className="text-amber-500" />
                                </div>
                                <a href="tel:+919811885302" className="text-xs text-slate-400 hover:text-amber-500 transition-colors">+91 981 188 5302</a>
                            </li>
                            <li className="flex items-center gap-2.5 group">
                                <div className="w-6 h-6 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500 transition-colors">
                                    <MapPin size={11} className="text-amber-500" />
                                </div>
                                <span className="text-xs text-slate-400 uppercase font-medium tracking-wide">Gurgaon, India · Dubai, UAE</span>
                            </li>
                        </ul>

                        {/* Legal Honor Global */}
                        <div className="mt-4 pt-4 border-t border-slate-800">
                            <p className="text-xs text-amber-500 font-medium mb-1">Legal Honor Global</p>
                            <p className="text-xs text-slate-500 mb-1">Kishan Chhetry, Customer Success</p>
                            <a href="tel:+919311899545" className="text-xs text-slate-400 hover:text-amber-500 block">+91 931 189 9545</a>
                            <a href="mailto:kishan@lextalkworld.in" className="text-xs text-slate-400 hover:text-amber-500 block">kishan@lextalkworld.in</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative border-t border-slate-800/50 bg-slate-950/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                        <p className="text-xs text-slate-500 text-center sm:text-left">
                            © {new Date().getFullYear()} LexTalk World. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 text-xs">
                            <Link href="/privacy" className="text-slate-500 hover:text-amber-500 transition-colors">Privacy Policy</Link>
                            <span className="text-slate-700 hidden sm:inline">•</span>
                            <Link href="/terms" className="text-slate-500 hover:text-amber-500 transition-colors">Terms of Service</Link>
                            <span className="text-slate-700 hidden sm:inline">•</span>
                            <Link href="/cookies" className="text-slate-500 hover:text-amber-500 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
