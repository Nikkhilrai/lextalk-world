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

// Maps internal passType → badge category label + theme color (matches LTW lanyard template)
const PASS_CATEGORY: Record<string, { label: string; color: string }> = {
    "delegate":           { label: "DELEGATES", color: "#1B5F7A" },
    "delegate-vip":       { label: "DELEGATES", color: "#1B5F7A" },
    "student":            { label: "DELEGATES", color: "#1B5F7A" },
    "corporate-counsel":  { label: "DELEGATES", color: "#1B5F7A" },
    "standard-physical":  { label: "DELEGATES", color: "#1B5F7A" },
    "premium-physical":   { label: "DELEGATES", color: "#1B5F7A" },
    "exclusive-physical": { label: "DELEGATES", color: "#1B5F7A" },
    "awardee":            { label: "AWARDEES",  color: "#7C3AED" },
    "vendor-vip":         { label: "SPONSORS",  color: "#B91C1C" },
    "sponsor":            { label: "SPONSORS",  color: "#B91C1C" },
    "speaker":            { label: "SPEAKERS",  color: "#166534" },
    "organiser":          { label: "ORGANISER", color: "#111827" },
};
const DEFAULT_CATEGORY = { label: "DELEGATES", color: "#1B5F7A" };

// Bangalore city skyline silhouette — white on colored background.
// Features: Vidhana Soudha dome (center), South Indian temple gopuram (left-center),
// UB City-style highrises (right-center), smaller buildings flanking.
const SKYLINE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" fill="white" preserveAspectRatio="xMidYMax meet">
  <!-- Left outer buildings -->
  <rect x="0" y="60" width="14" height="20"/>
  <rect x="16" y="52" width="18" height="28"/>
  <rect x="19" y="44" width="12" height="8"/>
  <rect x="36" y="58" width="12" height="22"/>

  <!-- Temple gopuram (stepped pyramid with finial) -->
  <rect x="50" y="62" width="26" height="18"/>
  <rect x="54" y="54" width="18" height="8"/>
  <rect x="58" y="46" width="10" height="8"/>
  <rect x="61" y="38" width="4" height="8"/>
  <rect x="62" y="30" width="2" height="8"/>
  <path d="M50 62 Q63 54 76 62" fill="white"/>

  <!-- Office cluster -->
  <rect x="80" y="46" width="16" height="34"/>
  <rect x="83" y="38" width="10" height="8"/>
  <rect x="98" y="54" width="14" height="26"/>

  <!-- Vidhana Soudha — wide classical building with dome -->
  <rect x="114" y="50" width="82" height="30"/>
  <rect x="118" y="42" width="74" height="8"/>
  <rect x="122" y="34" width="66" height="8"/>
  <rect x="126" y="26" width="58" height="8"/>
  <!-- Central dome -->
  <path d="M148 26 Q155 12 162 26 Z"/>
  <circle cx="155" cy="10" r="3.5"/>
  <!-- Side domes -->
  <path d="M129 28 Q136 20 143 28 Z"/>
  <path d="M167 28 Q174 20 181 28 Z"/>
  <!-- Facade columns -->
  <rect x="120" y="50" width="3" height="14" opacity="0.55"/>
  <rect x="128" y="50" width="3" height="14" opacity="0.55"/>
  <rect x="179" y="50" width="3" height="14" opacity="0.55"/>
  <rect x="187" y="50" width="3" height="14" opacity="0.55"/>

  <!-- UB City / modern highrises -->
  <rect x="200" y="30" width="20" height="50"/>
  <rect x="203" y="22" width="6" height="8"/>
  <rect x="212" y="22" width="6" height="8"/>
  <rect x="222" y="38" width="18" height="42"/>
  <rect x="225" y="30" width="12" height="8"/>
  <rect x="242" y="44" width="16" height="36"/>

  <!-- Right buildings -->
  <rect x="260" y="52" width="18" height="28"/>
  <rect x="263" y="44" width="12" height="8"/>

  <!-- Second temple / minaret right side -->
  <rect x="282" y="62" width="20" height="18"/>
  <rect x="285" y="54" width="14" height="8"/>
  <rect x="288" y="46" width="8" height="8"/>
  <rect x="291" y="38" width="2" height="8"/>

  <!-- Far right -->
  <rect x="306" y="56" width="16" height="24"/>
  <rect x="324" y="50" width="18" height="30"/>
  <rect x="344" y="60" width="16" height="20"/>

  <!-- Window details on key buildings -->
  <rect x="84" y="50" width="3" height="4" opacity="0.45"/>
  <rect x="90" y="50" width="3" height="4" opacity="0.45"/>
  <rect x="84" y="58" width="3" height="4" opacity="0.45"/>
  <rect x="90" y="58" width="3" height="4" opacity="0.45"/>
  <rect x="202" y="34" width="3" height="5" opacity="0.4"/>
  <rect x="209" y="34" width="3" height="5" opacity="0.4"/>
  <rect x="202" y="44" width="3" height="5" opacity="0.4"/>
  <rect x="209" y="44" width="3" height="5" opacity="0.4"/>
  <rect x="224" y="42" width="3" height="5" opacity="0.4"/>
  <rect x="231" y="42" width="3" height="5" opacity="0.4"/>
  <rect x="224" y="52" width="3" height="5" opacity="0.4"/>
  <rect x="231" y="52" width="3" height="5" opacity="0.4"/>
</svg>`;

async function buildHtml(data: BangalorePassData): Promise<string> {
    const verifyUrl = `https://lextalkworld.in/verify/bangalore/${data.ticketNumber}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        margin: 1,
        width: 200,
        color: { dark: "#111827", light: "#ffffff" },
    });

    const category = PASS_CATEGORY[data.passType] ?? DEFAULT_CATEGORY;
    const { label: passLabel, color: themeColor } = category;
    const nameDisplay = data.attendeeName.toUpperCase();

    // Embed logo as base64 for reliable rendering in Puppeteer (no external HTTP needed)
    let logoSrc = "";
    try {
        const fs = await import("fs");
        const path = await import("path");
        const logoPath = path.join(process.cwd(), "public/logo/lextalkworld_logo.png");
        const buf = fs.readFileSync(logoPath);
        logoSrc = `data:image/png;base64,${buf.toString("base64")}`;
    } catch {
        // logo will fall back to text
    }

    // Show last 6 chars of ticket number as the badge ID (e.g. AB3X9K)
    const badgeId = data.ticketNumber.replace(/^LTW-BLR26-/i, "").toUpperCase();

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 360px;
    height: 520px;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    background: white;
    overflow: hidden;
  }
  .card {
    width: 360px;
    height: 520px;
    background: white;
    position: relative;
    overflow: hidden;
  }

  /* ── HEADER: colored top with curved bottom-left ── */
  .header {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 208px;
    background: ${themeColor};
    border-radius: 0 0 0 110px;
    display: flex;
    align-items: flex-start;
    padding: 18px 15px 0 18px;
  }
  .pass-label {
    flex: 0 0 auto;
    color: rgba(255,255,255,0.95);
    font-size: 17px;
    font-weight: 900;
    letter-spacing: 1.2px;
    padding-top: 6px;
    text-transform: uppercase;
  }
  .event-info {
    flex: 1;
    text-align: right;
    color: white;
    padding-left: 8px;
  }
  .event-brand {
    font-size: 25px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.3px;
  }
  .event-sub {
    font-size: 9.5px;
    font-weight: 700;
    line-height: 1.55;
    margin-top: 4px;
    opacity: 0.92;
  }
  .event-date {
    font-size: 19px;
    font-weight: 900;
    margin-top: 8px;
    line-height: 1;
  }
  .event-venue {
    font-size: 9px;
    font-weight: 700;
    margin-top: 5px;
    line-height: 1.5;
    opacity: 0.88;
  }

  /* ── LOGO ── */
  .logo-area {
    position: absolute;
    top: 208px; left: 0; right: 0;
    height: 74px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 8px;
  }
  .logo-img {
    width: 180px;
    height: auto;
  }
  .logo-fallback {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 3px;
    color: ${themeColor};
  }

  /* ── DIVIDER ── */
  .divider {
    position: absolute;
    top: 282px;
    left: 22px; right: 22px;
    height: 1px;
    background: #e5e7eb;
  }

  /* ── ATTENDEE ── */
  .attendee {
    position: absolute;
    top: 290px; left: 0; right: 0;
    padding: 0 18px;
    text-align: center;
  }
  .attendee-name {
    font-size: 24px;
    font-weight: 900;
    color: ${themeColor};
    line-height: 1.1;
    word-break: break-word;
    hyphens: auto;
  }
  .attendee-desg {
    font-size: 11.5px;
    font-weight: 700;
    color: #1f2937;
    margin-top: 6px;
    line-height: 1.35;
    word-break: break-word;
  }
  .attendee-org {
    font-size: 11px;
    font-weight: 600;
    color: #4b5563;
    margin-top: 2px;
    line-height: 1.3;
    word-break: break-word;
  }

  /* ── FOOTER ── */
  .footer {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 128px;
    background: ${themeColor};
    overflow: visible;
  }
  .skyline-wrap {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 82px;
    opacity: 0.82;
  }
  .skyline-wrap svg {
    width: 100%;
    height: 100%;
  }
  .footer-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 46px;
    display: flex;
    align-items: center;
    padding: 0 84px 0 14px;
  }
  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .footer-url {
    color: rgba(255,255,255,0.95);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }
  .footer-ticket {
    color: rgba(255,255,255,0.55);
    font-size: 8px;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
  }
  /* QR box floats over skyline + footer bar (right side) */
  .qr-box {
    position: absolute;
    bottom: 7px;
    right: 10px;
    width: 70px;
    height: 70px;
    background: white;
    padding: 3px;
    box-shadow: 0 0 0 1.5px rgba(255,255,255,0.5);
  }
  .qr-box img {
    width: 64px;
    height: 64px;
    display: block;
  }
</style>
</head>
<body>
<div class="card">

  <div class="header">
    <div class="pass-label">${passLabel}</div>
    <div class="event-info">
      <div class="event-brand">LexTalk World</div>
      <div class="event-sub">Conference &amp; Exhibition<br>Middle East &amp; APAC</div>
      <div class="event-date">11 June 2026</div>
      <div class="event-venue">Radisson Blu Atria,<br>Bangalore, INDIA</div>
    </div>
  </div>

  <div class="logo-area">
    ${logoSrc
        ? `<img class="logo-img" src="${logoSrc}" />`
        : `<div class="logo-fallback">LEXTALK WORLD</div>`
    }
  </div>

  <div class="divider"></div>

  <div class="attendee">
    <div class="attendee-name">${nameDisplay}</div>
    ${data.designation ? `<div class="attendee-desg">${data.designation}</div>` : ""}
    ${data.organization ? `<div class="attendee-org">${data.organization}</div>` : ""}
  </div>

  <div class="footer">
    <div class="skyline-wrap">${SKYLINE_SVG}</div>
    <div class="footer-bar">
      <div class="footer-left">
        <div class="footer-url">www.lextalkworld.in</div>
        <div class="footer-ticket">${badgeId}</div>
      </div>
    </div>
    <div class="qr-box">
      <img src="${qrDataUrl}" />
    </div>
  </div>

</div>
</body>
</html>`;
}

export async function generateBangalorePassPDF(data: BangalorePassData): Promise<Buffer> {
    let browser;

    try {
        const isDev = process.env.NODE_ENV === "development";

        if (isDev) {
            const puppeteer = await import("puppeteer-core");
            browser = await puppeteer.default.launch({
                executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });
        } else {
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
        await page.setViewport({ width: 360, height: 520 });

        const html = await buildHtml(data);
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            width: "90mm",
            height: "130mm",
            printBackground: true,
            pageRanges: "1",
        });

        return Buffer.from(pdfBuffer);
    } finally {
        if (browser) await browser.close();
    }
}
