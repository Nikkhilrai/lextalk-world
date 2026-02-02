import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, workEmail, organization, role, passType } = body;

        // Server-side validation
        if (!fullName || !workEmail || !organization || !role || !passType) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(workEmail)) {
            return NextResponse.json(
                { error: 'Invalid email address.' },
                { status: 400 }
            );
        }

        // Prevent duplicate submissions within a short timeframe (optional, but good practice)
        // For now, we'll just check if a reservation with this email exists for this role/passType recently
        // effectively allowing updates or re-submissions if needed, but preventing instant double-clicks
        // Ideally, we might want to update existing or just create new.
        // Let's create new for now as per requirement "Save all form data".

        const reservation = await prisma.seatReservation.create({
            data: {
                fullName,
                workEmail,
                organization,
                role,
                passType,
            },
        });

        return NextResponse.json({ success: true, id: reservation.id }, { status: 200 });

    } catch (error) {
        console.error('Seat reservation error:', error);
        return NextResponse.json(
            { error: 'Failed to process reservation. Please try again.' },
            { status: 500 }
        );
    }
}
