"use client";

import React, { useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip } from "react-tooltip";

const geoUrl = "/world-110m.json";

interface MapProps {
    data?: any[];
}

export function WorldMap({ data }: MapProps) {
    // Example markers (could be passed via props in real app)
    const markers = [
        { name: "United States", coordinates: [-100, 40], value: 120 },
        { name: "India", coordinates: [78, 20], value: 80 },
        { name: "Brazil", coordinates: [-55, -10], value: 45 },
        { name: "UK", coordinates: [0, 55], value: 30 },
        { name: "Australia", coordinates: [133, -25], value: 25 },
        { name: "Canada", coordinates: [-106, 56], value: 20 },
    ];

    return (
        <div className="w-full h-full min-h-[350px] relative bg-[#1b213b] rounded-sm overflow-hidden flex items-center justify-center">
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#2a304d" // Darker map color
                                stroke="#1b213b" // Match background for gaps
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
                        <circle r={8} fill="rgba(10, 179, 156, 0.2)" className="animate-ping" />
                        <circle r={4} fill="#0ab39c" />
                    </Marker>
                ))}
            </ComposableMap>

            {/* Overlay Gradient for "Galaxy" feel */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#13192f]/50" />
        </div>
    );
}
