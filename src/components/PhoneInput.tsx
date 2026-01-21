"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { COUNTRIES_DATA, Country, DEFAULT_COUNTRY } from "@/lib/countries";

interface PhoneInputProps {
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
    id?: string;
    required?: boolean;
    dropdownDirection?: "up" | "down";
}

export function PhoneInput({ value, onChange, name, id, required, dropdownDirection = "down" }: PhoneInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);
    const [phoneNumber, setPhoneNumber] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter countries based on search (by name, code, or dial code)
    const filteredCountries = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return COUNTRIES_DATA.filter(country =>
            country.name.toLowerCase().includes(query) ||
            country.code.toLowerCase().includes(query) ||
            country.dialCode.includes(query)
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

    // Update the full value when country or phone changes
    useEffect(() => {
        const fullNumber = phoneNumber ? `${selectedCountry.dialCode} ${phoneNumber}` : "";
        onChange?.(fullNumber);
    }, [selectedCountry, phoneNumber, onChange]);

    const handleSelectCountry = (country: Country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearchQuery("");
        inputRef.current?.focus();
    };

    return (
        <div className="relative group" ref={wrapperRef}>
            <div className="flex items-center gap-2">
                {/* Country Code Selector */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "flex items-center gap-1.5 py-2 px-2 border-b transition-all min-w-[90px]",
                            isOpen ? "border-amber-500" : "border-slate-300 hover:border-slate-400"
                        )}
                    >
                        <span className="text-lg leading-none">{selectedCountry.flag}</span>
                        <span className="text-sm text-slate-700 font-medium">{selectedCountry.dialCode}</span>
                        <ChevronDown className={cn(
                            "w-3.5 h-3.5 text-slate-400 transition-transform duration-200",
                            isOpen && "rotate-180 text-amber-500"
                        )} />
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <div className={cn(
                            "absolute left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-64 flex flex-col",
                            dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
                        )}>
                            {/* Search Bar */}
                            <div className="p-3 border-b border-slate-100 sticky top-0 bg-white rounded-t-xl z-10">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 text-slate-900 text-sm rounded-lg border-0 focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
                                        placeholder="Search country or code..."
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
                                            onClick={() => handleSelectCountry(country)}
                                            className={cn(
                                                "w-full px-3 py-2 text-left text-sm hover:bg-amber-50 transition-colors flex items-center gap-3 group/item",
                                                selectedCountry.code === country.code ? "bg-amber-50 text-amber-900" : "text-slate-600"
                                            )}
                                        >
                                            <span className="text-lg leading-none">{country.flag}</span>
                                            <span className="flex-1 truncate">{country.name}</span>
                                            <span className="text-slate-400 text-xs">{country.dialCode}</span>
                                            {selectedCountry.code === country.code && (
                                                <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
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

                {/* Phone Number Input */}
                <div className="relative flex-1">
                    <input
                        ref={inputRef}
                        type="tel"
                        name={name}
                        id={id}
                        required={required}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                        className="peer w-full py-2 bg-transparent text-slate-900 border-b border-slate-300 focus:border-amber-500 transition-all outline-none placeholder-transparent text-base"
                        placeholder="Phone Number"
                    />
                    <label
                        htmlFor={id}
                        className={cn(
                            "absolute left-0 transition-all duration-200 pointer-events-none",
                            (phoneNumber || document.activeElement === inputRef.current)
                                ? "-top-4 text-xs text-amber-600 font-semibold"
                                : "top-2 text-slate-400 text-base"
                        )}
                    >
                        Contact Number
                    </label>
                </div>
            </div>

            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={value || `${selectedCountry.dialCode} ${phoneNumber}`} />
        </div>
    );
}
