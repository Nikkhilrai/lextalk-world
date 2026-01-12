import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Row,
    Column,
} from "@react-email/components";
import * as React from "react";

interface TicketEmailProps {
    customerName: string;
    email: string;
    phone: string;
    organization: string;
    designation: string;
    passType: string;
    ticketId: string;
    amount: string;
    transactionId: string;
}

export const TicketEmail = ({
    customerName = "John Doe",
    email = "john@example.com",
    phone = "+1 555-123-4567",
    organization = "Legal Corp",
    designation = "Partner",
    passType = "Standard Pass",
    ticketId = "LTW-2026-001",
    amount = "$1,200",
    transactionId = "PAY-123456",
}: TicketEmailProps) => {
    const previewText = `Your LexTalk World Dubai 2026 Pass - ${passType}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={headerSection}>
                        <Img
                            src="https://lextalkworld.in/logo/Lextalk-Logo.png"
                            width="180"
                            height="50"
                            alt="LexTalk World"
                            style={logo}
                        />
                    </Section>

                    {/* Success Banner */}
                    <Section style={successBanner}>
                        <Text style={successText}>✓ Payment Confirmed</Text>
                    </Section>

                    {/* Main Content */}
                    <Section style={contentSection}>
                        <Heading style={heading}>
                            Your Dubai 2026 Conference Pass
                        </Heading>
                        <Text style={paragraph}>
                            Dear {customerName},
                        </Text>
                        <Text style={paragraph}>
                            Thank you for registering for the <strong>LexTalk World Global Legal Conference - Dubai 2026</strong>.
                            Your payment has been successfully processed.
                        </Text>
                    </Section>

                    <Hr style={hr} />

                    {/* Ticket Card */}
                    <Section style={ticketCard}>
                        <div style={ticketHeader}>
                            <Text style={ticketTitle}>CONFERENCE PASS</Text>
                            <Text style={passTypeStyle}>{passType.toUpperCase()}</Text>
                        </div>

                        <div style={ticketBody}>
                            <Row>
                                <Column style={ticketCol}>
                                    <Text style={ticketLabel}>TICKET ID</Text>
                                    <Text style={ticketValue}>{ticketId}</Text>
                                </Column>
                                <Column style={ticketCol}>
                                    <Text style={ticketLabel}>AMOUNT PAID</Text>
                                    <Text style={ticketValue}>{amount}</Text>
                                </Column>
                            </Row>

                            <Row style={{ marginTop: "16px" }}>
                                <Column style={ticketCol}>
                                    <Text style={ticketLabel}>ATTENDEE</Text>
                                    <Text style={ticketValue}>{customerName}</Text>
                                </Column>
                                <Column style={ticketCol}>
                                    <Text style={ticketLabel}>ORGANIZATION</Text>
                                    <Text style={ticketValue}>{organization}</Text>
                                </Column>
                            </Row>

                            <Row style={{ marginTop: "16px" }}>
                                <Column style={ticketCol}>
                                    <Text style={ticketLabel}>DESIGNATION</Text>
                                    <Text style={ticketValue}>{designation}</Text>
                                </Column>
                                <Column style={ticketCol}>
                                    <Text style={ticketLabel}>EMAIL</Text>
                                    <Text style={ticketValue}>{email}</Text>
                                </Column>
                            </Row>
                        </div>

                        <div style={ticketFooter}>
                            <Text style={eventDetails}>
                                📍 Dubai, UAE • 📅 2026
                            </Text>
                        </div>
                    </Section>

                    <Hr style={hr} />

                    {/* Transaction Details */}
                    <Section style={contentSection}>
                        <Heading as="h3" style={subheading}>Transaction Details</Heading>
                        <Text style={detailRow}>
                            <strong>Transaction ID:</strong> {transactionId}
                        </Text>
                        <Text style={detailRow}>
                            <strong>Payment Method:</strong> PayPal
                        </Text>
                        <Text style={detailRow}>
                            <strong>Email:</strong> {email}
                        </Text>
                        <Text style={detailRow}>
                            <strong>Phone:</strong> {phone}
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footerSection}>
                        <Text style={footerText}>
                            Please save this email as your entry pass. Present this at the venue.
                        </Text>
                        <Text style={footerText}>
                            For queries, contact us at info@lextalk.world
                        </Text>
                        <Hr style={hr} />
                        <Text style={copyright}>
                            © 2026 LexTalk World. All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default TicketEmail;

// Styles
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
    maxWidth: "600px",
};

const headerSection = {
    padding: "24px",
    textAlign: "center" as const,
};

const logo = {
    margin: "0 auto",
};

const successBanner = {
    backgroundColor: "#10b981",
    padding: "12px 24px",
    textAlign: "center" as const,
};

const successText = {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0",
};

const contentSection = {
    padding: "24px",
};

const heading = {
    color: "#0f172a",
    fontSize: "24px",
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    margin: "0 0 24px",
};

const subheading = {
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "bold" as const,
    margin: "0 0 16px",
};

const paragraph = {
    color: "#334155",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 16px",
};

const hr = {
    borderColor: "#e2e8f0",
    margin: "0",
};

const ticketCard = {
    margin: "24px",
    border: "2px solid #f59e0b",
    borderRadius: "12px",
    overflow: "hidden",
};

const ticketHeader = {
    backgroundColor: "#0f172a",
    padding: "16px 24px",
    textAlign: "center" as const,
};

const ticketTitle = {
    color: "#94a3b8",
    fontSize: "12px",
    letterSpacing: "2px",
    margin: "0 0 4px",
};

const passTypeStyle = {
    color: "#f59e0b",
    fontSize: "24px",
    fontWeight: "bold" as const,
    margin: "0",
};

const ticketBody = {
    padding: "24px",
    backgroundColor: "#f8fafc",
};

const ticketCol = {
    width: "50%",
};

const ticketLabel = {
    color: "#64748b",
    fontSize: "10px",
    letterSpacing: "1px",
    margin: "0 0 4px",
    textTransform: "uppercase" as const,
};

const ticketValue = {
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "600" as const,
    margin: "0",
};

const ticketFooter = {
    backgroundColor: "#0f172a",
    padding: "12px 24px",
    textAlign: "center" as const,
};

const eventDetails = {
    color: "#f59e0b",
    fontSize: "14px",
    margin: "0",
};

const detailRow = {
    color: "#334155",
    fontSize: "14px",
    margin: "0 0 8px",
};

const footerSection = {
    padding: "24px",
    textAlign: "center" as const,
    backgroundColor: "#f8fafc",
};

const footerText = {
    color: "#64748b",
    fontSize: "14px",
    margin: "0 0 8px",
};

const copyright = {
    color: "#94a3b8",
    fontSize: "12px",
    margin: "16px 0 0",
};
