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

        // Ensure prisma client is ready and SeatReservation model exists on it
        // (casting to any to bypass potential type mismatch if generation is pending)
        const prismaClient = prisma as any;

        if (!prismaClient.seatReservation) {
            console.error('Prisma Client does not have seatReservation model. Schema might not be generated.');
            return NextResponse.json(
                { error: 'System error: Database model not found.' },
                { status: 500 }
            );
        }

        const reservation = await prismaClient.seatReservation.create({
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
