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

// Darken a hex color by a given fraction (0–1)
function darkenHex(hex: string, amount = 0.28): string {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, Math.round(((n >> 16) & 0xff) * (1 - amount)));
    const g = Math.max(0, Math.round(((n >> 8) & 0xff) * (1 - amount)));
    const b = Math.max(0, Math.round((n & 0xff) * (1 - amount)));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}


async function buildHtml(data: BangalorePassData): Promise<string> {
    const verifyUrl = `https://lextalkworld.in/verify/bangalore/${data.ticketNumber}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        margin: 1,
        width: 200,
        color: { dark: "#111827", light: "#ffffff" },
    });

    const category = PASS_CATEGORY[data.passType] ?? DEFAULT_CATEGORY;
    const { label: passLabel, color: themeColor } = category;
    const darkColor = darkenHex(themeColor, 0.28);
    const nameDisplay = data.attendeeName.toUpperCase();
    const badgeId = data.ticketNumber.replace(/^LTW-BLR26-/i, "").toUpperCase();

    let logoSrc = "";
    try {
        const fs = await import("fs");
        const path = await import("path");
        const buf = fs.readFileSync(path.join(process.cwd(), "public/logo/lextalkworld-logo.png"));
        logoSrc = `data:image/png;base64,${buf.toString("base64")}`;
    } catch { /* fallback to text */ }

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 360px;
    height: 520px;
    font-family: 'Poppins', Arial, 'Helvetica Neue', sans-serif;
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

  /* ══════════════════════════════════════
     HEADER — colored, clip-path curved bottom-left
  ══════════════════════════════════════ */
  .header-bg {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 222px;
    background: linear-gradient(140deg, ${themeColor} 0%, ${darkColor} 100%);
    clip-path: path('M0 0 L360 0 L360 222 L148 222 C68 222 0 188 0 144 Z');
  }
  /* Large translucent circle — decorative depth top-right */
  .header-circle-lg {
    position: absolute;
    top: -55px; right: -55px;
    width: 210px; height: 210px;
    border-radius: 50%;
    background: rgba(255,255,255,0.07);
    pointer-events: none;
  }
  /* Medium circle ring -->
  .header-circle-md {
    position: absolute;
    top: 60px; right: 14px;
    width: 95px; height: 95px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.13);
    pointer-events: none;
  }
  /* Dot grid texture over header */
  .header-dots {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 222px;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 13px 13px;
    clip-path: path('M0 0 L360 0 L360 222 L148 222 C68 222 0 188 0 144 Z');
    pointer-events: none;
  }

  /* Category label */
  .pass-label {
    position: absolute;
    top: 22px; left: 20px;
    color: rgba(255,255,255,0.96);
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 2.5px;
    text-transform: uppercase;
  }
  .pass-label-underline {
    position: absolute;
    top: 44px; left: 20px;
    width: 44px;
    height: 2px;
    background: rgba(255,255,255,0.4);
    border-radius: 2px;
  }

  /* Event info block — right aligned */
  .event-info {
    position: absolute;
    top: 14px; right: 16px;
    text-align: right;
    color: white;
    max-width: 228px;
  }
  .event-brand {
    font-size: 24px;
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.4px;
  }
  .event-sub {
    font-size: 9px;
    font-weight: 600;
    line-height: 1.7;
    margin-top: 3px;
    opacity: 0.86;
    letter-spacing: 0.2px;
  }
  .event-date {
    font-size: 18px;
    font-weight: 800;
    margin-top: 8px;
    line-height: 1;
  }
  .event-venue {
    font-size: 8.5px;
    font-weight: 500;
    margin-top: 5px;
    line-height: 1.55;
    opacity: 0.8;
  }

  /* ══════════════════════════════════════
     LOGO AREA
  ══════════════════════════════════════ */
  .logo-area {
    position: absolute;
    top: 222px; left: 0; right: 0;
    height: 72px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 6px;
  }
  .logo-img { width: 174px; height: auto; }
  .logo-fallback {
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 3px;
    color: ${themeColor};
  }

  /* ══════════════════════════════════════
     GOLD SEPARATOR
  ══════════════════════════════════════ */
  .gold-sep {
    position: absolute;
    top: 294px;
    left: 50%;
    transform: translateX(-50%);
    width: 56px;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #C9A84C 30%, #F0CC6A 50%, #C9A84C 70%, transparent 100%);
    border-radius: 1px;
  }

  /* ══════════════════════════════════════
     ATTENDEE SECTION
  ══════════════════════════════════════ */
  .attendee {
    position: absolute;
    top: 302px; left: 0; right: 0;
    padding: 0 16px;
    text-align: center;
  }
  .attendee-name {
    font-size: 22px;
    font-weight: 900;
    color: ${themeColor};
    line-height: 1.1;
    word-break: break-word;
    letter-spacing: 0.3px;
  }
  .attendee-desg {
    font-size: 11px;
    font-weight: 600;
    color: #1f2937;
    margin-top: 7px;
    line-height: 1.4;
    letter-spacing: 0.1px;
  }
  .attendee-org {
    font-size: 10px;
    font-weight: 500;
    color: #6b7280;
    margin-top: 2px;
    line-height: 1.35;
  }

  /* ══════════════════════════════════════
     FOOTER
  ══════════════════════════════════════ */
  .footer {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 108px;
    background: linear-gradient(155deg, ${themeColor} 0%, ${darkColor} 100%);
    overflow: hidden;
  }
  /* Wave separator — white shape that creates organic boundary with the white card area */
  .footer-wave {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 24px;
    pointer-events: none;
  }
  .footer-wave svg { display:block; width:100%; height:24px; }
  /* Dot texture — same as header for visual consistency */
  .footer-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 13px 13px;
    pointer-events: none;
  }
  /* Large decorative circle bottom-left */
  .footer-circle-lg {
    position: absolute;
    bottom: -40px; left: -40px;
    width: 150px; height: 150px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    pointer-events: none;
  }
  /* Small circle ring top-right */
  .footer-circle-sm {
    position: absolute;
    top: 14px; right: 90px;
    width: 50px; height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    pointer-events: none;
  }
  .footer-content {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 84px;
    display: flex;
    align-items: center;
    padding: 0 106px 0 16px;
  }
  .footer-left { display:flex; flex-direction:column; gap:3px; }
  .footer-url {
    color: rgba(255,255,255,0.93);
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.4px;
  }
  .footer-ticket {
    color: rgba(255,255,255,0.4);
    font-size: 7.5px;
    font-family: 'Courier New', monospace;
    letter-spacing: 1.5px;
  }

  /* QR code — elevated white box */
  .qr-box {
    position: absolute;
    bottom: 8px; right: 8px;
    width: 90px; height: 90px;
    background: white;
    padding: 4px;
    border-radius: 4px;
    box-shadow: 0 3px 14px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.2);
  }
  .qr-box img { width:82px; height:82px; display:block; }
</style>
</head>
<body>
<div class="card">

  <!-- COLORED HEADER (with clip-path curve + decorative layers) -->
  <div class="header-bg"></div>
  <div class="header-circle-lg"></div>
  <div class="header-circle-md"></div>
  <div class="header-dots"></div>
  <div class="pass-label">${passLabel}</div>
  <div class="pass-label-underline"></div>
  <div class="event-info">
    <div class="event-brand">LexTalk World</div>
    <div class="event-sub">Conference &amp; Exhibition<br>Middle East &amp; APAC</div>
    <div class="event-date">11 June 2026</div>
    <div class="event-venue">Radisson Blu Atria,<br>Bangalore, INDIA</div>
  </div>

  <!-- LOGO -->
  <div class="logo-area">
    ${logoSrc
        ? `<img class="logo-img" src="${logoSrc}"/>`
        : `<div class="logo-fallback">LEXTALK WORLD</div>`
    }
  </div>

  <!-- GOLD SEPARATOR -->
  <div class="gold-sep"></div>

  <!-- ATTENDEE -->
  <div class="attendee">
    <div class="attendee-name">${nameDisplay}</div>
    ${data.designation ? `<div class="attendee-desg">${data.designation}</div>` : ""}
    ${data.organization ? `<div class="attendee-org">${data.organization}</div>` : ""}
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-wave">
      <svg viewBox="0 0 360 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0 L360 0 L360 10 Q270 24 180 14 Q90 4 0 20 Z" fill="white"/>
      </svg>
    </div>
    <div class="footer-dots"></div>
    <div class="footer-circle-lg"></div>
    <div class="footer-circle-sm"></div>
    <div class="footer-content">
      <div class="footer-left">
        <div class="footer-url">www.lextalkworld.in</div>
        <div class="footer-ticket">${badgeId}</div>
      </div>
    </div>
    <div class="qr-box"><img src="${qrDataUrl}"/></div>
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
        // networkidle0 waits for Google Fonts to fully load
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
