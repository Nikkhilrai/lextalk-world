"use client";

import Image from "next/image";
import { User, Linkedin, Twitter, Globe } from "lucide-react";

interface AuthorBioProps {
    name: string;
    image?: string | null;
    bio?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
}

export default function AuthorBio({
    name,
    image,
    bio = "A legal industry expert and contributor to LexTalk World, sharing insights on global legal developments, technology, and professional growth.",
    linkedin,
    twitter,
    website
}: AuthorBioProps) {
    return (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-start gap-5 p-6 bg-gradient-to-br from-slate-50 to-amber-50/30 dark:from-slate-800 dark:to-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                {/* Author Image */}
                <div className="flex-shrink-0">
                    {image ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden relative border-2 border-white dark:border-slate-600 shadow-lg">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center border-2 border-white dark:border-slate-600 shadow-lg">
                            <User size={32} className="text-amber-600 dark:text-amber-400" />
                        </div>
                    )}
                </div>

                {/* Author Info */}
                <div className="flex-1">
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                        Written by
                    </p>
                    <h4 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                        {name}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                        {bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {linkedin && (
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white dark:bg-slate-700 hover:bg-[#0A66C2] hover:text-white rounded-full text-slate-500 dark:text-slate-400 transition-all shadow-sm"
                                title="LinkedIn"
                            >
                                <Linkedin size={16} />
                            </a>
                        )}
                        {twitter && (
                            <a
                                href={twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white dark:bg-slate-700 hover:bg-black hover:text-white rounded-full text-slate-500 dark:text-slate-400 transition-all shadow-sm"
                                title="Twitter/X"
                            >
                                <Twitter size={16} />
                            </a>
                        )}
                        {website && (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white dark:bg-slate-700 hover:bg-amber-500 hover:text-white rounded-full text-slate-500 dark:text-slate-400 transition-all shadow-sm"
                                title="Website"
                            >
                                <Globe size={16} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
