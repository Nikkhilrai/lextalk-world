"use client";

import { Check } from "lucide-react";
import { INTEREST_OPTIONS, MAX_INTERESTS } from "@/lib/delegate-interests";

interface InterestPickerProps {
    selected: string[];
    onChange: (next: string[]) => void;
    otherText: string;
    onOtherTextChange: (text: string) => void;
}

export function InterestPicker({ selected, onChange, otherText, onOtherTextChange }: InterestPickerProps) {
    const atLimit = selected.length >= MAX_INTERESTS;

    const toggle = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter((s) => s !== option));
            if (option === "Other") onOtherTextChange("");
            return;
        }
        if (atLimit) return;
        onChange([...selected, option]);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Key areas of interest <span className="text-red-500">*</span>
                </p>
                <p className={`text-[11px] font-semibold ${atLimit ? "text-amber-600" : "text-slate-400"}`}>
                    {selected.length} / {MAX_INTERESTS} selected
                </p>
            </div>
            <p className="text-xs text-slate-400 mb-3">Select up to {MAX_INTERESTS}.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INTEREST_OPTIONS.map((option) => {
                    const checked = selected.includes(option);
                    const disabled = !checked && atLimit;
                    return (
                        <label
                            key={option}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
                                checked
                                    ? "border-amber-400 bg-amber-50 text-slate-900"
                                    : disabled
                                        ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                                        : "border-slate-200 text-slate-700 hover:border-amber-300 cursor-pointer"
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                disabled={disabled}
                                onChange={() => toggle(option)}
                                className="sr-only"
                            />
                            <span
                                className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center ${
                                    checked ? "bg-amber-500 border-amber-500" : "border-slate-300 bg-white"
                                }`}
                            >
                                {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </span>
                            <span>{option}</span>
                        </label>
                    );
                })}
            </div>

            {selected.includes("Other") && (
                <input
                    type="text"
                    value={otherText}
                    onChange={(e) => onOtherTextChange(e.target.value)}
                    placeholder="Please specify your area of interest"
                    className="mt-3 w-full px-4 py-2.5 text-sm text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                />
            )}
        </div>
    );
}
