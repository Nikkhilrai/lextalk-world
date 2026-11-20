"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download } from "lucide-react";
import { AgendaModal } from "@/components/AgendaModal";

/** Opens the same lead form the Mumbai event page uses to send the agenda PDF. */
export function DownloadAgendaButton() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 text-amber-300 hover:text-amber-200 rounded-lg text-sm font-semibold transition-colors duration-300 w-full sm:w-auto"
            >
                <Download className="w-4 h-4" />
                Download Agenda (PDF)
            </button>
            {/* Portalled to <body>: the hero's animated wrapper would otherwise trap the
                fixed-position modal under the sticky day switcher. */}
            {mounted && createPortal(
                <AgendaModal isOpen={open} onClose={() => setOpen(false)} eventSlug="mumbai-2026" />,
                document.body,
            )}
        </>
    );
}
