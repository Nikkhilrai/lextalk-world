"use client";

interface Props {
    value: boolean | null;
    onChange: (v: boolean) => void;
    error?: string | null;
}

const btn = (on: boolean) =>
    `px-5 py-2 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
        on ? "border-amber-400 bg-amber-50 text-slate-900" : "border-slate-200 text-slate-700 hover:border-amber-300"
    }`;

export function LegalHonorsYesNo({ value, onChange, error }: Props) {
    return (
        <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Would you like to be considered for Legal Honors? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
                <button type="button" onClick={() => onChange(true)} className={btn(value === true)}>Yes</button>
                <button type="button" onClick={() => onChange(false)} className={btn(value === false)}>No</button>
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
