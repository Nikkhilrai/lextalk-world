"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * New-entry counts for the sidebar badges.
 *
 * Each tab remembers when this browser last opened it; the badge is the number
 * of entries created since then. Opening a tab clears its badge. The first
 * time a tab is tracked it starts from 24 hours ago.
 */
const KEY = "admin-nav-seen-v1";
const POLL_MS = 60_000;

type Seen = Record<string, string>;

function readSeen(): Seen {
    try { const v = JSON.parse(localStorage.getItem(KEY) || "{}"); return v && typeof v === "object" ? v : {}; }
    catch { return {}; }
}
function writeSeen(s: Seen) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private mode: badges just won't persist */ }
}

export function useNavCounts(activeHref: string | null) {
    const [counts, setCounts] = useState<Record<string, number>>({});
    const activeRef = useRef(activeHref);
    activeRef.current = activeHref;

    const markSeen = useCallback((href: string) => {
        const seen = readSeen();
        seen[href] = new Date().toISOString();
        writeSeen(seen);
        setCounts(c => (c[href] ? { ...c, [href]: 0 } : c));
    }, []);

    const refresh = useCallback(async () => {
        const seen = readSeen();
        try {
            const res = await fetch("/api/admin/nav-counts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ since: seen }),
                cache: "no-store",
            });
            if (!res.ok) return;
            const { counts: next } = (await res.json()) as { counts: Record<string, number> };

            // Start tracking new tabs from 24h ago so the window doesn't keep sliding.
            let changed = false;
            const dayAgo = new Date(Date.now() - 86_400_000).toISOString();
            for (const href of Object.keys(next)) if (!seen[href]) { seen[href] = dayAgo; changed = true; }
            if (changed) writeSeen(seen);

            setCounts(next);
        } catch { /* offline etc. — keep the last counts */ }
    }, []);

    // Opening a tab marks it as seen.
    useEffect(() => { if (activeHref) markSeen(activeHref); }, [activeHref, markSeen]);

    useEffect(() => {
        refresh();
        const timer = setInterval(() => { if (document.visibilityState === "visible") refresh(); }, POLL_MS);
        const onVisible = () => { if (document.visibilityState === "visible") refresh(); };
        const onStorage = (e: StorageEvent) => { if (e.key === KEY) refresh(); }; // another browser tab marked something seen
        document.addEventListener("visibilitychange", onVisible);
        window.addEventListener("storage", onStorage);
        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", onVisible);
            window.removeEventListener("storage", onStorage);
        };
    }, [refresh]);

    return counts;
}

export const badgeText = (n: number) => (n > 99 ? "99+" : String(n));
