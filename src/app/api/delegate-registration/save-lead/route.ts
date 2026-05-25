import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { triggerLeadsSync } from "@/lib/sheets-sync";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            customerDetails,
            passType,
            passCategory,
            conferenceSlug,
            originalPrice,
            discountedPrice,
        } = body;

        const prismaClient = prisma as any;

        // Check if a registration already exists for this email and conference that is pending
        const existingRegistration = await prismaClient.delegateRegistration.findFirst({
            where: {
                email: customerDetails.email,
                conferenceSlug: conferenceSlug,
                paymentStatus: "pending"
            }
        });

        let registration;

        if (existingRegistration) {
            // Update existing lead
            registration = await prismaClient.delegateRegistration.update({
                where: { id: existingRegistration.id },
                data: {
                    firstName: customerDetails.firstName,
                    lastName: customerDetails.lastName,
                    phone: customerDetails.phone || null,
                    organization: customerDetails.organization || null,
                    designation: customerDetails.designation || null,
                    country: customerDetails.country,
                    passType,
                    passCategory,
                    originalPrice,
                    discountedPrice,
                },
            });

            // Sync with general Lead
            try {
                await prismaClient.lead.updateMany({
                    where: { email: customerDetails.email },
                    data: {
                        firstName: customerDetails.firstName,
                        lastName: customerDetails.lastName,
                        contact: customerDetails.phone || null,
                        organization: customerDetails.organization || null,
                        designation: customerDetails.designation || null,
                        country: customerDetails.country,
                        conference: "Dubai 2026 (Delegate)",
                        joinAs: "Delegate",
                    }
                });
            } catch (err) {
                console.error("Lead sync error:", err);
            }
        } else {
            // Create new record
            registration = await prismaClient.delegateRegistration.create({
                data: {
                    firstName: customerDetails.firstName,
                    lastName: customerDetails.lastName,
                    email: customerDetails.email,
                    phone: customerDetails.phone || null,
                    organization: customerDetails.organization || null,
                    designation: customerDetails.designation || null,
                    country: customerDetails.country,
                    passType,
                    passCategory,
                    conferenceSlug,
                    originalPrice,
                    discountedPrice,
                    paymentStatus: "pending",
                },
            });

            // ALSO save as a general Lead for dashboard visibility
            try {
                const existingLead = await prismaClient.lead.findFirst({
                    where: { email: customerDetails.email }
                });

                if (existingLead) {
                    await prismaClient.lead.update({
                        where: { id: existingLead.id },
                        data: {
                            firstName: customerDetails.firstName,
                            lastName: customerDetails.lastName,
                            contact: customerDetails.phone || null,
                            organization: customerDetails.organization || null,
                            designation: customerDetails.designation || null,
                            country: customerDetails.country,
                            conference: "Dubai 2026 (Delegate)",
                            joinAs: "Delegate",
                        }
                    });
                } else {
                    await prismaClient.lead.create({
                        data: {
                            firstName: customerDetails.firstName,
                            lastName: customerDetails.lastName,
                            email: customerDetails.email,
                            contact: customerDetails.phone || null,
                            organization: customerDetails.organization || null,
                            designation: customerDetails.designation || null,
                            country: customerDetails.country,
                            conference: "Dubai 2026 (Delegate)",
                            joinAs: "Delegate",
                            status: "New"
                        }
                    });
                }
            } catch (leadErr) {
                console.error("Secondary lead creation error:", leadErr);
            }

            // Create notification for new lead captured
            await prismaClient.notification.create({
                data: {
                    type: "TICKET_PURCHASE",
                    message: `New lead captured: ${customerDetails.firstName} ${customerDetails.lastName} has reached Step 2 for ${passType}`,
                    referenceId: registration.id,
                    link: `/admin/delegate-registrations`,
                }
            }).catch((err: any) => console.error("Notification error:", err));
        }

        // Sync "Interest Form (Website)" sheet tab
        triggerLeadsSync();

        // Revalidate both admin dashboards to show new lead
        revalidatePath("/admin/delegate-registrations");
        revalidatePath("/admin/leads");
        revalidatePath("/admin");

        return NextResponse.json({
            success: true,
            registrationId: registration.id,
        });
    } catch (error: any) {
        console.error("Error saving lead:", error.message);
        return NextResponse.json(
            { error: "Failed to save lead information" },
            { status: 500 }
        );
    }
}
