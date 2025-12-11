"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { COUNTRIES_DATA, Country, getCountryByName } from "@/lib/countries";

interface CountrySelectProps {
    value?: string;
    onChange?: (value: string) => void;
    id?: string;
}

export function CountrySelect({ value, onChange, id }: CountrySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Get selected country object from value (country name)
    const selectedCountry = useMemo(() => {
        return value ? getCountryByName(value) : undefined;
    }, [value]);

    // Filter countries based on search
    const filteredCountries = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return COUNTRIES_DATA.filter(country =>
            country.name.toLowerCase().includes(query) ||
            country.code.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (country: Country) => {
        onChange?.(country.name);
        setIsOpen(false);
        setSearchQuery("");
    };

    return (
        <div className="relative group" ref={wrapperRef}>
            {/* Display Input (triggers dropdown) */}
            <div
                className="relative cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={cn(
                    "peer w-full py-2 bg-transparent border-b border-slate-300 transition-all text-sm sm:text-base flex items-center justify-between",
                    isOpen ? "border-amber-500" : "group-hover:border-slate-400"
                )}>
                    <div className="flex items-center gap-2">
                        {selectedCountry && (
                            <span className="text-lg leading-none">{selectedCountry.flag}</span>
                        )}
                        <span className={cn(
                            value ? "text-slate-900" : "text-transparent"
                        )}>
                            {value || "Select Country"}
                        </span>
                    </div>
                    <ChevronDown className={cn(
                        "w-4 h-4 text-slate-400 transition-transform duration-200",
                        isOpen && "rotate-180 text-amber-500"
                    )} />
                </div>

                {/* Floating Label */}
                <label
                    htmlFor={id}
                    className={cn(
                        "absolute left-0 transition-all duration-200 pointer-events-none",
                        (value || isOpen)
                            ? "-top-4 text-xs text-amber-600 font-semibold"
                            : "top-2 text-slate-400 text-sm sm:text-base"
                    )}
                >
                    Country*
                </label>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-56 flex flex-col">
                    {/* Search Bar */}
                    <div className="p-3 border-b border-slate-100 sticky top-0 bg-white rounded-t-xl z-10">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                                type="text"
                                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 text-slate-900 text-sm rounded-lg border-0 focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
                                placeholder="Search country..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>

                    {/* Country List */}
                    <div className="overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleSelect(country)}
                                    className={cn(
                                        "w-full px-4 py-2 text-left text-sm hover:bg-amber-50 transition-colors flex items-center gap-3 group/item",
                                        selectedCountry?.code === country.code ? "bg-amber-50 text-amber-900 font-medium" : "text-slate-600"
                                    )}
                                >
                                    <span className="text-lg leading-none">{country.flag}</span>
                                    <span className="flex-1">{country.name}</span>
                                    {selectedCountry?.code === country.code && (
                                        <Check className="w-3.5 h-3.5 text-amber-600" />
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-slate-400 text-center">
                                No countries found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
