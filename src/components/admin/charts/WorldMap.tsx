"use client";

import React, { useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "/world-110m.json";

// Country coordinates mapping
const COUNTRY_COORDS: Record<string, [number, number]> = {
    "United States": [-100, 40],
    "India": [78, 20],
    "United Arab Emirates": [54, 24],
    "Brazil": [-55, -10],
    "United Kingdom": [-2, 54],
    "Australia": [133, -25],
    "Canada": [-106, 56],
    "Germany": [10, 51],
    "France": [2, 47],
    "Saudi Arabia": [45, 24],
    "Singapore": [104, 1],
    "Netherlands": [5.5, 52],
    "Japan": [138, 36],
    "China": [105, 35],
    "South Korea": [128, 36],
    "Russia": [100, 60],
    "Indonesia": [120, -5],
    "Malaysia": [102, 4],
    "Pakistan": [70, 30],
    "Philippines": [122, 12],
    "Thailand": [100, 15],
    "Vietnam": [106, 16],
    "South Africa": [25, -30],
    "Nigeria": [8, 10],
    "Egypt": [30, 27],
    "Kenya": [38, 1],
    "Mexico": [-102, 23],
    "Argentina": [-65, -35],
    "Italy": [12, 42],
    "Spain": [-4, 40],
    "Poland": [20, 52],
    "Turkey": [35, 39],
    "Israel": [35, 31],
    "Qatar": [51, 25],
    "Kuwait": [48, 29],
    "Bahrain": [50.5, 26],
    "Oman": [57, 21],
    "Jordan": [36, 31],
    "Lebanon": [36, 34],
    "Ireland": [-8, 53],
    "Switzerland": [8, 47],
    "Austria": [14, 47],
    "Belgium": [4, 51],
    "Sweden": [18, 62],
    "Norway": [10, 62],
    "Denmark": [10, 56],
    "Finland": [26, 64],
    "New Zealand": [174, -41],
    "Hong Kong": [114, 22],
    "Taiwan": [121, 24],
    "Bangladesh": [90, 24],
    "Sri Lanka": [81, 7],
    "Nepal": [84, 28],
};

interface CountryData {
    country: string;
    users: number;
}

interface MapProps {
    data?: any[];
    countryData?: CountryData[];
}

export function WorldMap({ data, countryData }: MapProps) {
    // Generate markers from analytics country data
    const markers = useMemo(() => {
        if (countryData && countryData.length > 0) {
            return countryData
                .filter(c => COUNTRY_COORDS[c.country])
                .map(c => ({
                    name: c.country,
                    coordinates: COUNTRY_COORDS[c.country],
                    value: c.users,
                }));
        }

        // Fallback: Generate from leads data
        if (data && data.length > 0) {
            const countryMap = new Map<string, number>();
            data.forEach(lead => {
                const country = lead.country || "Unknown";
                countryMap.set(country, (countryMap.get(country) || 0) + 1);
            });

            return Array.from(countryMap.entries())
                .filter(([country]) => COUNTRY_COORDS[country])
                .map(([country, count]) => ({
                    name: country,
                    coordinates: COUNTRY_COORDS[country],
                    value: count,
                }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 10);
        }

        return [];
    }, [data, countryData]);

    return (
        <div className="w-full h-full min-h-[350px] relative bg-[#1b213b] rounded-sm overflow-hidden flex items-center justify-center">
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#2a304d"
                                stroke="#1b213b"
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: "none" },
                                    hover: { fill: "#353b59", outline: "none" },
                                    pressed: { fill: "#353b59", outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {markers.map(({ name, coordinates, value }) => (
                    <Marker key={name} coordinates={coordinates as [number, number]}>
                        <circle r={Math.min(12, Math.max(6, value / 2))} fill="rgba(10, 179, 156, 0.2)" className="animate-ping" />
                        <circle r={Math.min(6, Math.max(3, value / 4))} fill="#0ab39c" />
                        <title>{name}: {value} sessions</title>
                    </Marker>
                ))}
            </ComposableMap>

            {/* Legend */}
            {markers.length > 0 && (
                <div className="absolute top-3 right-3 bg-[#1b213b]/90 backdrop-blur rounded p-2 text-xs">
                    <p className="text-[#878a99] mb-1">{markers.length} countries</p>
                    {markers.slice(0, 3).map(m => (
                        <div key={m.name} className="flex items-center gap-1.5 text-white/80">
                            <span className="w-2 h-2 rounded-full bg-[#0ab39c]"></span>
                            <span className="truncate max-w-[100px]">{m.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#13192f]/50" />
        </div>
    );
}

