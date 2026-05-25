// Fire-and-forget helpers — call without await so they never block the request

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://lextalkworld.com";

export function triggerDelegateSync() {
    fetch(`${BASE}/api/admin/sync-to-sheets`, { method: "POST" })
        .catch(() => {}); // silently ignore errors
}

export function triggerAgendaSync() {
    fetch(`${BASE}/api/admin/sync-agenda-downloads-to-sheets`, { method: "POST" })
        .catch(() => {});
}
