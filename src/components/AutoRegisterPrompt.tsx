"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RegisterModal } from "./RegisterModal";
import { isChatOpen, subscribeChatOpen } from "@/lib/chat-widget-state";

/**
 * Auto-opens the "Register Your Interest" modal 8s after a visitor lands on the
 * homepage — the site's main lead-generation nudge. Previously lived inside
 * FloatingActions.tsx alongside the old WhatsApp/Call/Instagram/LinkedIn bubble
 * cluster; when that cluster was replaced by the "Ask Lex" chat launcher, the
 * whole file was deleted and this auto-open behavior went with it as
 * unintended collateral. Split out on its own now so retiring a future launcher
 * doesn't silently take the lead-gen modal down with it again.
 */
export function AutoRegisterPrompt() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const pathname = usePathname();

    // Never let the auto-open modal land on top of an open chat panel — a visitor
    // mid-conversation with Lex is already engaged, and covering that with a second
    // lead form loses both. If the chat opens after the modal is already up, the
    // modal steps aside.
    useEffect(() => {
        return subscribeChatOpen(open => {
            if (open) setIsRegisterOpen(false);
        });
    }, []);

    useEffect(() => {
        if (pathname !== "/") return;
        const timer = setTimeout(() => {
            if (!isChatOpen()) setIsRegisterOpen(true);
        }, 8000);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
        />
    );
}
