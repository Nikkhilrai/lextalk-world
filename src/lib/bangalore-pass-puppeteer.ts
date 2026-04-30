import QRCode from "qrcode";

export type BangalorePassTitle = "DELEGATE" | "AWARDEE" | "PARTICIPANT";

interface BangalorePassData {
    attendeeName: string;
    organization: string;
    designation: string;
    passTitle: BangalorePassTitle;
    passType: string;
    ticketNumber: string;
}

const TITLE_COLORS: Record<BangalorePassTitle, { bg: string; text: string; sub: string }> = {
    DELEGATE: { bg: "#F59E0B", text: "#ffffff", sub: "#0f172a" },
    AWARDEE: { bg: "#7c3aed", text: "#ffffff", sub: "#ffffff" },
    PARTICIPANT: { bg: "#0ea5e9", text: "#ffffff", sub: "#0f172a" },
};

function passTypeName(pt: string) {
    const map: Record<string, string> = {
        "delegate": "Delegate Pass",
        "delegate-vip": "Delegate VIP Pass",
        "student": "Student Pass",
        "vendor-vip": "Vendor Pass",
        "corporate-counsel": "Corporate Counsel Pass",
        "standard-physical": "Standard Pass",
        "premium-physical": "Premium Pass",
        "exclusive-physical": "Exclusive Pass",
    };
    return map[pt] || pt.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

async function buildHtml(data: BangalorePassData): Promise<string> {
    const verifyUrl = `https://lextalkworld.in/verify/bangalore/${data.ticketNumber}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        margin: 2,
        width: 280,
        color: { dark: "#0f172a", light: "#ffffff" },
    });

    const colors = TITLE_COLORS[data.passTitle];
    const passName = passTypeName(data.passType);
    const nameDisplay = data.attendeeName.toUpperCase();

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 400px;
    height: 700px;
    font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
    background: white;
    overflow: hidden;
  }

  /* ── Title Header ── */
  .header {
    background: ${colors.bg};
    padding: 22px 24px 16px;
    text-align: center;
    position: relative;
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: rgba(0,0,0,0.15);
  }
  .pass-title {
    font-size: 46px;
    font-weight: 900;
    color: ${colors.text};
    letter-spacing: 6px;
    line-height: 1;
  }
  .entry-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 4px;
    color: ${colors.sub};
    margin-top: 5px;
    text-transform: uppercase;
  }

  /* ── Navy Branding ── */
  .branding {
    background: #0f172a;
    padding: 22px 24px 18px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .branding-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #1e293b 1px, transparent 1px);
    background-size: 16px 16px;
    opacity: 0.6;
  }
  .branding-inner { position: relative; z-index: 1; }
  .event-name {
    font-size: 22px;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: 3px;
  }
  .amber-line {
    width: 60px;
    height: 2px;
    background: #F59E0B;
    margin: 10px auto;
    border-radius: 2px;
  }
  .event-sub {
    font-size: 9px;
    font-weight: 700;
    color: #F59E0B;
    letter-spacing: 2.5px;
    text-transform: uppercase;
  }
  .date-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 16px;
  }
  .date-box {
    background: #F59E0B;
    color: #0f172a;
    font-size: 32px;
    font-weight: 900;
    width: 58px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(245,158,11,0.4);
  }
  .month-block {
    background: #1e293b;
    border-radius: 10px;
    padding: 8px 14px;
    text-align: center;
    border: 1px solid #334155;
  }
  .month-block .month { color: #f1f5f9; font-size: 13px; font-weight: 800; letter-spacing: 1px; }
  .month-block .year  { color: #64748b; font-size: 11px; font-weight: 600; margin-top: 1px; }
  .city-block { text-align: left; }
  .city-name    { color: #F59E0B; font-size: 15px; font-weight: 800; letter-spacing: 1px; }
  .city-country { color: #64748b; font-size: 10px; font-weight: 600; margin-top: 1px; }
  .venue {
    font-size: 10px;
    color: #475569;
    margin-top: 12px;
    letter-spacing: 0.5px;
  }

  /* ── White Card ── */
  .card {
    background: #ffffff;
    padding: 20px 24px 16px;
    border-top: 3px solid #F59E0B;
    flex: 1;
  }
  .field-label {
    font-size: 8px;
    font-weight: 800;
    color: #94a3b8;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .attendee-name {
    font-size: 24px;
    font-weight: 900;
    color: #0f172a;
    line-height: 1.1;
    margin-bottom: 14px;
    word-break: break-word;
  }
  .org-name {
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 2px;
  }
  .designation {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .qr-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4px;
  }
  .qr-wrapper {
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px;
    display: inline-block;
    background: #fff;
  }
  .qr-img { width: 120px; height: 120px; display: block; }
  .pass-id {
    font-size: 10px;
    font-family: 'Courier New', monospace;
    color: #94a3b8;
    margin-top: 8px;
    letter-spacing: 1px;
  }
  .pass-chip {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 100px;
    padding: 4px 14px;
    font-size: 8px;
    font-weight: 800;
    color: #b45309;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 8px;
  }

  /* ── Footer ── */
  .footer {
    background: #0f172a;
    border-top: 2px solid #F59E0B;
    padding: 12px 24px;
    text-align: center;
  }
  .footer-url  { color: #F59E0B; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
  .footer-note { color: #475569; font-size: 8.5px; margin-top: 3px; letter-spacing: 0.5px; }
</style>
</head>
<body>

  <div class="header">
    <div class="pass-title">${data.passTitle}</div>
    <div class="entry-label">Entry Pass</div>
  </div>

  <div class="branding">
    <div class="branding-dots"></div>
    <div class="branding-inner">
      <div class="event-name">LEXTALK WORLD</div>
      <div class="amber-line"></div>
      <div class="event-sub">Global Legal Conference &amp; Awards</div>
      <div class="date-row">
        <div class="date-box">11</div>
        <div class="month-block">
          <div class="month">JUNE</div>
          <div class="year">2026</div>
        </div>
        <div class="city-block">
          <div class="city-name">BANGALORE</div>
          <div class="city-country">INDIA</div>
        </div>
      </div>
      <div class="venue">Radisson Blu Atria, Palace Rd, Bengaluru</div>
    </div>
  </div>

  <div class="card">
    <div class="field-label">Attendee Name</div>
    <div class="attendee-name">${nameDisplay}</div>

    ${data.organization ? `
    <div class="field-label">Organisation</div>
    <div class="org-name">${data.organization}</div>
    ${data.designation ? `<div class="designation">${data.designation}</div>` : ""}
    ` : ""}

    <div class="qr-section">
      <div class="qr-wrapper">
        <img class="qr-img" src="${qrDataUrl}" />
      </div>
      <div class="pass-id">${data.ticketNumber}</div>
      <div class="pass-chip">${passName}</div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-url">lextalkworld.in</div>
    <div class="footer-note">Present this pass at the registration desk on June 11, 2026</div>
  </div>

</body>
</html>`;
}

export async function generateBangalorePassPDF(data: BangalorePassData): Promise<Buffer> {
    let browser;

    try {
        const isDev = process.env.NODE_ENV === "development";

        if (isDev) {
            // Local: use system Chrome
            const puppeteer = await import("puppeteer-core");
            browser = await puppeteer.default.launch({
                executablePath:
                    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });
        } else {
            // Production (Vercel): use @sparticuz/chromium-min
            const chromium = await import("@sparticuz/chromium-min");
            const puppeteer = await import("puppeteer-core");

            const executablePath = await chromium.default.executablePath(
                "https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar"
            );

            browser = await puppeteer.default.launch({
                args: chromium.default.args,
                defaultViewport: chromium.default.defaultViewport,
                executablePath,
                headless: true,
            });
        }

        const page = await browser.newPage();
        await page.setViewport({ width: 400, height: 700 });

        const html = await buildHtml(data);
        await page.setContent(html, { waitUntil: "domcontentloaded" });

        const pdfBuffer = await page.pdf({
            width: "400px",
            height: "700px",
            printBackground: true,
            pageRanges: "1",
        });

        return Buffer.from(pdfBuffer);
    } finally {
        if (browser) await browser.close();
    }
}
