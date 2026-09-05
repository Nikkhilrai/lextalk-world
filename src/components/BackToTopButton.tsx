"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

/**
 * Scroll-to-top button, sitewide.
 *
 * Used to live bundled inside FloatingActions.tsx alongside the WhatsApp/Call/social
 * cluster. When that whole cluster was removed in favour of the Ask Lex widget, this
 * went with it as an unintended side effect — it has nothing to do with lead capture
 * or chat, so it gets its own component rather than riding on either one again.
 *
 * Stacked directly above the chat launcher (bottom-24 vs. its bottom-5) rather than
 * beside it, so the two read as a paired stack the way they did before.
 */
export function BackToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 10 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed bottom-24 right-5 z-[9997] flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-[0_10px_25px_-6px_rgba(245,158,11,0.6)] transition-transform hover:scale-105 active:scale-95"
                >
                    <ChevronUp size={20} strokeWidth={2.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
