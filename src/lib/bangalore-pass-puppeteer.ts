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

// Bangalore landmarks silhouette — white paths on colored bg
// Vidhana Soudha dome (center), gopuram (left), UB City highrises (right)
const SKYLINE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" fill="white" preserveAspectRatio="xMidYMax meet">
  <rect x="0" y="62" width="12" height="18"/>
  <rect x="14" y="54" width="16" height="26"/>
  <rect x="17" y="46" width="10" height="8"/>

  <!-- South Indian temple gopuram -->
  <rect x="32" y="64" width="24" height="16"/>
  <rect x="36" y="56" width="16" height="8"/>
  <rect x="40" y="48" width="8" height="8"/>
  <rect x="43" y="40" width="2" height="8"/>
  <path d="M32 64 Q44 56 56 64" fill="white"/>

  <rect x="58" y="48" width="14" height="32"/>
  <rect x="61" y="40" width="8" height="8"/>
  <rect x="74" y="56" width="12" height="24"/>

  <!-- Vidhana Soudha — wide legislative building -->
  <rect x="88" y="52" width="90" height="28"/>
  <rect x="92" y="44" width="82" height="8"/>
  <rect x="96" y="36" width="74" height="8"/>
  <rect x="100" y="28" width="66" height="8"/>
  <!-- Central dome -->
  <path d="M124 28 Q133 13 142 28 Z"/>
  <circle cx="133" cy="11" r="3.5"/>
  <!-- Side smaller domes -->
  <path d="M104 30 Q111 21 118 30 Z"/>
  <path d="M148 30 Q155 21 162 30 Z"/>
  <!-- Facade columns -->
  <rect x="94" y="52" width="3" height="14" opacity="0.55"/>
  <rect x="102" y="52" width="3" height="14" opacity="0.55"/>
  <rect x="163" y="52" width="3" height="14" opacity="0.55"/>
  <rect x="171" y="52" width="3" height="14" opacity="0.55"/>

  <!-- UB City — modern glass towers -->
  <rect x="182" y="32" width="18" height="48"/>
  <rect x="185" y="24" width="5" height="8"/>
  <rect x="193" y="24" width="5" height="8"/>
  <rect x="202" y="40" width="16" height="40"/>
  <rect x="205" y="32" width="10" height="8"/>
  <rect x="220" y="44" width="14" height="36"/>

  <rect x="238" y="54" width="16" height="26"/>
  <rect x="241" y="46" width="10" height="8"/>
  <rect x="256" y="58" width="14" height="22"/>

  <!-- Right temple -->
  <rect x="272" y="64" width="20" height="16"/>
  <rect x="275" y="56" width="14" height="8"/>
  <rect x="278" y="48" width="8" height="8"/>
  <rect x="281" y="40" width="2" height="8"/>

  <rect x="294" y="58" width="14" height="22"/>
  <rect x="310" y="52" width="16" height="28"/>
  <rect x="313" y="44" width="10" height="8"/>
  <rect x="328" y="60" width="14" height="20"/>
  <rect x="344" y="64" width="16" height="16"/>

  <!-- Subtle window details -->
  <rect x="61" y="52" width="3" height="4" opacity="0.45"/>
  <rect x="67" y="52" width="3" height="4" opacity="0.45"/>
  <rect x="61" y="60" width="3" height="4" opacity="0.45"/>
  <rect x="67" y="60" width="3" height="4" opacity="0.45"/>
  <rect x="184" y="36" width="2" height="4" opacity="0.4"/>
  <rect x="190" y="36" width="2" height="4" opacity="0.4"/>
  <rect x="184" y="46" width="2" height="4" opacity="0.4"/>
  <rect x="190" y="46" width="2" height="4" opacity="0.4"/>
  <rect x="204" y="44" width="2" height="4" opacity="0.4"/>
  <rect x="210" y="44" width="2" height="4" opacity="0.4"/>
  <rect x="204" y="54" width="2" height="4" opacity="0.4"/>
  <rect x="210" y="54" width="2" height="4" opacity="0.4"/>
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
    const darkColor = darkenHex(themeColor, 0.28);
    const nameDisplay = data.attendeeName.toUpperCase();
    const badgeId = data.ticketNumber.replace(/^LTW-BLR26-/i, "").toUpperCase();

    let logoSrc = "";
    try {
        const fs = await import("fs");
        const path = await import("path");
        const buf = fs.readFileSync(path.join(process.cwd(), "public/logo/lextalkworld_logo.png"));
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
    height: 128px;
    background: linear-gradient(155deg, ${themeColor} 0%, ${darkColor} 100%);
    overflow: hidden;
  }
  /* Decorative bottom-left circle */
  .footer-circle {
    position: absolute;
    bottom: -35px; left: -35px;
    width: 130px; height: 130px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    pointer-events: none;
  }

  .skyline-wrap {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 80px;
    opacity: 0.72;
  }
  .skyline-wrap svg { width:100%; height:100%; }

  /* Gradient fade that blends skyline into footer bottom */
  .skyline-fade {
    position: absolute;
    bottom: 44px; left: 0; right: 0;
    height: 24px;
    background: linear-gradient(to bottom, transparent, ${themeColor});
    pointer-events: none;
  }

  .footer-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 86px 0 14px;
  }
  .footer-left { display:flex; flex-direction:column; gap:2px; }
  .footer-url {
    color: rgba(255,255,255,0.93);
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.4px;
  }
  .footer-ticket {
    color: rgba(255,255,255,0.42);
    font-size: 7.5px;
    font-family: 'Courier New', monospace;
    letter-spacing: 1.5px;
  }

  /* QR code — elevated white box over footer */
  .qr-box {
    position: absolute;
    bottom: 7px; right: 10px;
    width: 70px; height: 70px;
    background: white;
    padding: 4px;
    border-radius: 3px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15);
  }
  .qr-box img { width:62px; height:62px; display:block; }
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
    <div class="footer-circle"></div>
    <div class="skyline-wrap">${SKYLINE_SVG}</div>
    <div class="skyline-fade"></div>
    <div class="footer-bar">
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
