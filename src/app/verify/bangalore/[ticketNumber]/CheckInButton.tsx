"use client";

import { useState } from "react";
import { CheckCircle, Loader2, AlertTriangle, Clock } from "lucide-react";

interface Props {
    ticketNumber: string;
    alreadyCheckedIn: boolean;
    checkedInAt: string | null;
}

export function CheckInButton({ ticketNumber, alreadyCheckedIn, checkedInAt }: Props) {
    const [state, setState] = useState<"idle" | "loading" | "done" | "duplicate" | "error">(
        alreadyCheckedIn ? "duplicate" : "idle"
    );
    const [checkedInTime, setCheckedInTime] = useState<string | null>(checkedInAt);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            day: "numeric",
            month: "short",
        });

    const handleCheckIn = async () => {
        setState("loading");
        try {
            const res = await fetch("/api/delegate-registration/check-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ticketNumber, checkedInBy: "Staff" }),
            });
            const data = await res.json();

            if (data.alreadyCheckedIn) {
                setCheckedInTime(data.checkedInAt);
                setState("duplicate");
            } else if (data.success) {
                setCheckedInTime(data.checkedInAt);
                setState("done");
            } else {
                setState("error");
            }
        } catch {
            setState("error");
        }
    };

    if (state === "duplicate") {
        return (
            <div className="mt-5 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
                <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-orange-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-orange-800 text-sm">Already Checked In</p>
                        {checkedInTime && (
                            <div className="flex items-center gap-1.5 mt-1 text-orange-600 text-xs">
                                <Clock size={11} />
                                <span>{formatTime(checkedInTime)}</span>
                            </div>
                        )}
                        <p className="text-orange-600 text-xs mt-1">This pass was already scanned. Please verify with the delegate.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (state === "done") {
        return (
            <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
                <CheckCircle size={22} className="text-green-600 shrink-0" />
                <div>
                    <p className="font-bold text-green-800 text-sm">Checked In Successfully</p>
                    {checkedInTime && (
                        <p className="text-green-600 text-xs mt-0.5">{formatTime(checkedInTime)}</p>
                    )}
                </div>
            </div>
        );
    }

    if (state === "error") {
        return (
            <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium text-center">
                Failed to check in. Try again or contact admin.
            </div>
        );
    }

    return (
        <button
            onClick={handleCheckIn}
            disabled={state === "loading"}
            className="mt-5 w-full py-3.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-green-600/20"
        >
            {state === "loading" ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    Checking In...
                </>
            ) : (
                <>
                    <CheckCircle size={18} />
                    Mark as Checked In
                </>
            )}
        </button>
    );
}
