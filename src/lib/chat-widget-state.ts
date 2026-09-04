/**
 * A one-bit shared signal: is the Lex chat panel currently open?
 *
 * The chat widget and FloatingActions are mounted as siblings in the root layout
 * with no common ancestor holding state, and both are lead-capture surfaces that
 * would otherwise cover each other — the homepage auto-opens the "Register Your
 * Interest" modal 8s after load, right on top of an open chat panel.
 *
 * A module-level flag plus a subscriber list rather than a context provider: this
 * is a single boolean read by exactly one other component, and wrapping the whole
 * app in a provider to carry it would be more machinery than the problem needs.
 */

let chatOpen = false;
const listeners = new Set<(open: boolean) => void>();

export function isChatOpen(): boolean {
    return chatOpen;
}

export function setChatOpen(open: boolean): void {
    if (chatOpen === open) return;
    chatOpen = open;
    listeners.forEach(listener => listener(open));
}

/** Returns an unsubscribe function, so callers can clean up in a useEffect. */
export function subscribeChatOpen(listener: (open: boolean) => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}
