import { NextRequest, NextResponse } from "next/server";
import { sendNewsletterEmail } from "@/lib/newsletter-mail";

const TEST_EMAIL = "nikhil@mantranexvista.com";
const TEST_NAME  = "Nikhil";

const NEWSLETTER_SUBJECT = "LexTalk World | Law, AI & Data Privacy — This Week's Top Reads";

const NEWSLETTER_HTML = `
<!-- Intro -->
<p style="margin:0 0 12px;color:#475569;font-size:15px;line-height:1.8;">
  Welcome to this week's edition of the <strong style="color:#0f172a;">LexTalk World Newsletter.</strong>
  In this issue, we dive deep into the rapid technological advancements reshaping the legal landscape —
  from the implications of India's DPDP Act to the double-edged sword of AI in legal drafting and corporate governance.
</p>
<p style="margin:0 0 32px;color:#64748b;font-size:14px;font-style:italic;">
  ☕ Grab a cup of coffee and explore our top picks for the week.
</p>

<!-- Divider -->
<div style="height:1px;background:linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b);margin:0 0 32px;"></div>

<!-- Article 1 -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
  <tr>
    <td style="padding:20px 24px;background:#f8fafc;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#f59e0b;letter-spacing:0.15em;text-transform:uppercase;">Article 01 &nbsp;·&nbsp; Data Privacy</p>
      <h2 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#0f172a;line-height:1.4;">Digital Evidence and Data Privacy in India: Navigating Litigation Data in the DPDPA Era</h2>
      <p style="margin:0 0 10px;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">By Apoorva Sane</p>
      <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.7;">
        The rapid digitization of business operations has fundamentally transformed litigation in India. With the enactment of the DPDPA 2023, organizations face a new layer of complexity — how do you balance preserving crucial electronic evidence for litigation while complying with strict data minimization and purpose limitation rules?
      </p>
      <a href="https://lextalkworld.in/blog/digital-evidence-and-data-privacy-in-india-navigating-litigation-data-in-the-dpdpa-era"
         style="display:inline-block;padding:8px 20px;background:#0f172a;color:#f59e0b;font-size:13px;font-weight:700;text-decoration:none;border-radius:6px;">
        Read Article &rarr;
      </a>
    </td>
  </tr>
</table>

<!-- Article 2 -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
  <tr>
    <td style="padding:20px 24px;background:#f8fafc;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#f59e0b;letter-spacing:0.15em;text-transform:uppercase;">Article 02 &nbsp;·&nbsp; AI &amp; Legal Practice</p>
      <h2 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#0f172a;line-height:1.4;">AI Hallucinations in Legal Drafting: The Next Professional Negligence Crisis?</h2>
      <p style="margin:0 0 10px;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">By Abhishek Gourav</p>
      <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.7;">
        Generative AI presents an extraordinary opportunity for the legal profession — but it introduces a massive structural risk. AI hallucinations (fabricated citations, imaginary precedents, distorted reasoning) are increasingly entering courtrooms. Judges globally are imposing sanctions on lawyers who fail to verify AI-generated content. The future of legal practice will not be defined by whether we use AI, but by how responsibly we supervise it.
      </p>
      <a href="https://lextalkworld.in/blog/ai-hallucinations-in-legal-drafting-the-next-professional-negligence-crisis"
         style="display:inline-block;padding:8px 20px;background:#0f172a;color:#f59e0b;font-size:13px;font-weight:700;text-decoration:none;border-radius:6px;">
        Read Article &rarr;
      </a>
    </td>
  </tr>
</table>

<!-- Event Spotlight -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
  <tr>
    <td style="padding:24px 28px;background:#0f172a;border-radius:10px;border:1px solid #1e293b;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#f59e0b;letter-spacing:0.2em;text-transform:uppercase;">⚡ Exclusive Event Spotlight</p>
      <h2 style="margin:0 0 4px;font-size:17px;font-weight:700;color:#ffffff;line-height:1.4;">The Counsel Exchange (E-Meet)</h2>
      <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#fbbf24;">AI, Patents &amp; Power: Who Owns Innovation in the Age of Generative Tech?</p>
      <p style="margin:0 0 14px;color:#94a3b8;font-size:13px;line-height:1.7;">
        A private 60-minute closed-door exchange — no monologues, no slides. Just elite peer dialogue on the shifting boundaries of IP law, patent eligibility, and ownership rights in an AI-dominated ecosystem.
      </p>

      <!-- Speaker list -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #1e293b;">
          <p style="margin:0;color:#e2e8f0;font-size:13px;font-weight:600;">Deepalakshmi Vadivelan</p>
          <p style="margin:2px 0 0;color:#64748b;font-size:11px;">General Counsel &amp; SVP Legal, Global DPO — Quess Corp Limited</p>
        </td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #1e293b;">
          <p style="margin:0;color:#e2e8f0;font-size:13px;font-weight:600;">Sergey Medvedev</p>
          <p style="margin:2px 0 0;color:#64748b;font-size:11px;">Managing Partner — Gorodissky &amp; Partners</p>
        </td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #1e293b;">
          <p style="margin:0;color:#e2e8f0;font-size:13px;font-weight:600;">Saurabh Anand <span style="color:#f59e0b;font-size:10px;font-weight:700;margin-left:6px;">MODERATOR</span></p>
          <p style="margin:2px 0 0;color:#64748b;font-size:11px;">Lead Counsel — Akamai Technologies</p>
        </td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #1e293b;">
          <p style="margin:0;color:#e2e8f0;font-size:13px;font-weight:600;">Sushma Shankar</p>
          <p style="margin:2px 0 0;color:#64748b;font-size:11px;">Vice President Legal — Accenture</p>
        </td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #1e293b;">
          <p style="margin:0;color:#e2e8f0;font-size:13px;font-weight:600;">Dr. Akshay Kant Chaturvedi</p>
          <p style="margin:2px 0 0;color:#64748b;font-size:11px;">Corporate Head — IPR, Gujarat Fluorochemicals Limited</p>
        </td></tr>
        <tr><td style="padding:10px 0;">
          <p style="margin:0;color:#e2e8f0;font-size:13px;font-weight:600;">Krishna Chellapilla</p>
          <p style="margin:2px 0 0;color:#64748b;font-size:11px;">Head — Patents, Prosecution &amp; Copyrights, Tata Consultancy Services</p>
        </td></tr>
      </table>

      <a href="https://lextalkworld.in/upcoming-counsel-exchange"
         style="display:inline-block;padding:10px 24px;background:#f59e0b;color:#0f172a;font-size:13px;font-weight:800;text-decoration:none;border-radius:6px;letter-spacing:0.03em;">
        Watch the Recording &rarr;
      </a>
    </td>
  </tr>
</table>

<!-- Article 4 -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
  <tr>
    <td style="padding:20px 24px;background:#f8fafc;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#f59e0b;letter-spacing:0.15em;text-transform:uppercase;">Article 04 &nbsp;·&nbsp; Compliance</p>
      <h2 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#0f172a;line-height:1.4;">India's DPDP Act: From Compliance Burden to Business Trust</h2>
      <p style="margin:0 0 10px;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">By Kaushik Karmakar</p>
      <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.7;">
        India's Digital Personal Data Protection Act, 2023 represents a paradigm shift in how businesses handle personal data. Beyond a compliance checklist, the Act operationalizes privacy as a fundamental right — demanding consent that is free, informed, specific, and easily withdrawable. For fintech, healthcare, and e-commerce sectors, this means redesigning entire customer journeys. The true takeaway? The DPDP Act is an opportunity to build deeper trust.
      </p>
      <a href="https://lextalkworld.in/blog/india-s-dpdp-act-from-compliance-burden-to-business-trust"
         style="display:inline-block;padding:8px 20px;background:#0f172a;color:#f59e0b;font-size:13px;font-weight:700;text-decoration:none;border-radius:6px;">
        Read Article &rarr;
      </a>
    </td>
  </tr>
</table>

<!-- Article 5 -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
  <tr>
    <td style="padding:20px 24px;background:#f8fafc;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#f59e0b;letter-spacing:0.15em;text-transform:uppercase;">Article 05 &nbsp;·&nbsp; Corporate Governance</p>
      <h2 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#0f172a;line-height:1.4;">The Institutionalization of Artificial Intelligence in Indian Corporate Governance</h2>
      <p style="margin:0 0 10px;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">By Dr. Adarika Ghose</p>
      <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.7;">
        AI integration in governance is no longer optional — it's a fiduciary necessity. With India's AI Governance Guidelines (2026) and the DPDP Act, corporate boards are now expected to possess baseline AI literacy to oversee algorithmic governance, data sovereignty, and "Shadow AI" risks. The rise of the Algorithmic Chief Compliance Officer demonstrates how AI is driving automation across AML, insider trading detection, and data privacy compliance.
      </p>
      <a href="https://lextalkworld.in/blog/the-institutionalization-of-artificial-intelligence-in-indian-corporate-governance"
         style="display:inline-block;padding:8px 20px;background:#0f172a;color:#f59e0b;font-size:13px;font-weight:700;text-decoration:none;border-radius:6px;">
        Read Article &rarr;
      </a>
    </td>
  </tr>
</table>

<!-- Article 6 -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
  <tr>
    <td style="padding:20px 24px;background:#f8fafc;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#f59e0b;letter-spacing:0.15em;text-transform:uppercase;">Article 06 &nbsp;·&nbsp; Legal Education</p>
      <h2 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#0f172a;line-height:1.4;">The Skills We Leave Behind: Preparing Lawyers for a Post-AI World</h2>
      <p style="margin:0 0 10px;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">By Sivaramakrishnan M.S</p>
      <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.7;">
        Every generation inherits a technology that displaces a skill. As AI becomes adept at document construction, senior lawyers fear juniors will lose the ability to draft. But the constraint of the blank page was never the actual skill. The true, irreplaceable skill is legal judgment — the ability to understand a client's problem, weigh risks, and catch AI's contextual hallucinations. Embracing AI for mechanical drafting frees us to teach the strategic thinking that defines a true legal professional.
      </p>
      <a href="https://lextalkworld.in/blog/the-skills-we-leave-behind-preparing-lawyers-for-a-post-ai-world"
         style="display:inline-block;padding:8px 20px;background:#0f172a;color:#f59e0b;font-size:13px;font-weight:700;text-decoration:none;border-radius:6px;">
        Read Article &rarr;
      </a>
    </td>
  </tr>
</table>

<!-- Article 7 -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
  <tr>
    <td style="padding:20px 24px;background:#f8fafc;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#f59e0b;letter-spacing:0.15em;text-transform:uppercase;">Article 07 &nbsp;·&nbsp; Middle East &amp; India</p>
      <h2 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#0f172a;line-height:1.4;">The AI Boom: Implications for Commercial Contracts and Data Protection in the Middle East and India</h2>
      <p style="margin:0 0 10px;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">By Udit Mehta</p>
      <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.7;">
        The explosive growth of AI is reshaping commercial contracts, risk-management models, and data privacy regulations across the Middle East and India. From drafting and negotiating to executing contracts, AI introduces unique challenges around IP rights, algorithmic bias, liability, and transparency — all while navigating India's DPDP Act, the UAE's PDPL, and Saudi Arabia's PDPL.
      </p>
      <a href="https://lextalkworld.in/blog/the-ai-boom-implications-for-commercial-contracts-and-data-protection-in-the-middle-east-and-india"
         style="display:inline-block;padding:8px 20px;background:#0f172a;color:#f59e0b;font-size:13px;font-weight:700;text-decoration:none;border-radius:6px;">
        Read Article &rarr;
      </a>
    </td>
  </tr>
</table>

<!-- Closing -->
<div style="height:1px;background:#e2e8f0;margin:0 0 24px;"></div>
<p style="margin:0;color:#64748b;font-size:13px;line-height:1.8;text-align:center;">
  Thank you for reading this week's <strong style="color:#0f172a;">LexTalk World Newsletter.</strong><br>
  Stay tuned for more insights at the intersection of law, technology, and business.
</p>
`;

// GET — returns the pre-built newsletter so the compose form can auto-fill
export async function GET() {
    return NextResponse.json({ subject: NEWSLETTER_SUBJECT, htmlContent: NEWSLETTER_HTML });
}

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => ({}));

    const subject     = (body as any).subject?.trim()     || NEWSLETTER_SUBJECT;
    const htmlContent = (body as any).htmlContent?.trim() || NEWSLETTER_HTML;

    // Support sending to multiple recipients (comma-separated emails)
    const rawEmails: string = (body as any).testEmails || TEST_EMAIL;
    const recipients = rawEmails
        .split(",")
        .map((e: string) => e.trim())
        .filter(Boolean);

    const results = await Promise.all(
        recipients.map(email =>
            sendNewsletterEmail({
                to: email,
                name: email.split("@")[0],
                subject: `[TEST] ${subject}`,
                htmlContent,
                unsubscribeToken: "test-preview-token",
            })
        )
    );

    const failed = results.filter(r => !r.success);
    if (failed.length === results.length) {
        return NextResponse.json({ error: failed[0].error }, { status: 500 });
    }

    return NextResponse.json({ success: true, sentTo: recipients.join(", ") });
}
