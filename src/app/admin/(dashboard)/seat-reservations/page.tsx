"use client";

import { SeatReservationsTable } from "@/components/admin/SeatReservationsTable";

export default function SeatReservationsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Seat Reservations</h2>
                    <p className="text-slate-400">View and manage "Reserve Your Seat" form submissions.</p>
                </div>
            </div>

            <SeatReservationsTable />
        </div>
    );
}
