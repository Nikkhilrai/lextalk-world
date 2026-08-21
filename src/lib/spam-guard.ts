/**
 * Lightweight spam heuristics for public forms.
 *
 * Tuned against the real bot traffic that hit the contact form between
 * Feb and Aug 2026: random consonant-heavy names ("HBidBTDJUusxwauHLKO"),
 * message bodies containing nothing but a phone number, and Gmail
 * dot-trick addresses. Deliberately conservative — every rule below was
 * checked against the one genuine enquiry in that period ("R S RAO",
 * rsrao@bfsngrc.com) to make sure it still passes.
 */

export type SpamVerdict = { spam: boolean; reason?: string };

/** Random-looking token: long, single word, and vowel-poor or case-scrambled. */
function looksRandom(value: string): boolean {
    const v = value.trim();
    if (v.includes(" ")) return false;      // real names are usually spaced
    if (v.length < 12) return false;         // short handles are plausible
    const vowels = (v.match(/[aeiou]/gi) || []).length;
    const vowelRatio = vowels / v.length;
    const caseFlips = (v.match(/[a-z][A-Z]/g) || []).length;
    return vowelRatio < 0.32 || caseFlips >= 3;
}

/** Body is just a phone number / digit blob with no actual sentence. */
function isDigitsOnly(value: string): boolean {
    const v = value.trim();
    return v.length > 0 && /^[\d\s+()\-.]{6,20}$/.test(v);
}

export function checkContactSpam(input: {
    name: string;
    email: string;
    message: string;
    subject?: string;
    /** Hidden honeypot field — must be empty for a real submission. */
    website?: string;
}): SpamVerdict {
    // 1. Honeypot: invisible to humans, irresistible to naive bots.
    if (input.website && input.website.trim() !== "") {
        return { spam: true, reason: "honeypot" };
    }

    const name = (input.name || "").trim();
    const message = (input.message || "").trim();
    const email = (input.email || "").trim();

    if (!name || !email || !message) {
        return { spam: true, reason: "missing required fields" };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        return { spam: true, reason: "malformed email" };
    }

    // 2. Message body is only a phone number — the exact pattern seen in the wild.
    if (isDigitsOnly(message)) {
        return { spam: true, reason: "message is only digits" };
    }

    // 3. Random-string name, optionally corroborated by a random-string body.
    if (looksRandom(name)) {
        return { spam: true, reason: "name looks machine-generated" };
    }

    // 4. Message is a single long random token (no spaces, no punctuation).
    if (message.length >= 14 && !message.includes(" ") && looksRandom(message)) {
        return { spam: true, reason: "message looks machine-generated" };
    }

    // 5. Links in the body are a strong spam signal for this form; real
    //    enquiries here have never contained one.
    if (/https?:\/\/|\[url=|<a\s/i.test(message)) {
        return { spam: true, reason: "contains links" };
    }

    return { spam: false };
}

/* ── In-memory per-key rate limiting ──────────────────────────────────
 * Serverless instances are short-lived and not shared, so this throttles
 * bursts from a single warm instance rather than acting as a global
 * limiter. That is enough to blunt rapid-fire submissions; the heuristics
 * above do the real filtering.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max = 3, windowMs = 60_000): boolean {
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
        hits.set(key, recent);
        return false; // blocked
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 500) {
        // keep the map from growing unbounded on a long-lived instance
        for (const [k, v] of hits) {
            if (v.every((t) => now - t > windowMs)) hits.delete(k);
        }
    }
    return true; // allowed
}
