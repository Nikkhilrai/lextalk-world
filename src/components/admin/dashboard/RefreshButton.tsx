"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export function RefreshButton() {
    const router = useRouter();
    const [pending, start] = useTransition();
    return (
        <button
            onClick={() => start(() => router.refresh())}
            disabled={pending}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#405189] hover:bg-[#4a5ea0] text-white text-[12.5px] font-medium shadow-lg shadow-[#405189]/25 transition-colors disabled:opacity-60"
        >
            <RefreshCw size={14} className={pending ? "animate-spin" : ""} />
            {pending ? "Refreshing…" : "Refresh"}
        </button>
    );
}
