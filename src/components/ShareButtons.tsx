"use client";

import { Facebook, Twitter, Linkedin, Share2, Check, Copy } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
    title: string;
    slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    // Construct the full URL
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://lextalkworld.in";
    const fullUrl = `${baseUrl}/blog/${slug}`;
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const openShareWindow = (url: string) => {
        window.open(url, "_blank", "width=600,height=400,scrollbars=yes");
    };

    return (
        <div className="mt-16 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-4 text-center">Share this article</h3>
            <div className="flex items-center justify-center gap-3">
                <button
                    onClick={() => openShareWindow(shareLinks.facebook)}
                    className="p-3 bg-slate-50 hover:bg-[#1877F2] hover:text-white rounded-full transition-all duration-300 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-1"
                    title="Share on Facebook"
                >
                    <Facebook size={20} />
                </button>
                <button
                    onClick={() => openShareWindow(shareLinks.twitter)}
                    className="p-3 bg-slate-50 hover:bg-[#000000] hover:text-white rounded-full transition-all duration-300 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-1"
                    title="Share on X (Twitter)"
                >
                    <Twitter size={20} />
                </button>
                <button
                    onClick={() => openShareWindow(shareLinks.linkedin)}
                    className="p-3 bg-slate-50 hover:bg-[#0A66C2] hover:text-white rounded-full transition-all duration-300 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-1"
                    title="Share on LinkedIn"
                >
                    <Linkedin size={20} />
                </button>
                <button
                    onClick={handleCopyLink}
                    className={`p-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 ${copied
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-50 hover:bg-emerald-500 hover:text-white text-slate-600"
                        }`}
                    title={copied ? "Copied!" : "Copy link"}
                >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
            </div>
        </div>
    );
}
