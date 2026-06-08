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

// Bangalore skyline — uses curved paths, ellipses, and arches (not plain rectangles).
// Layout: modern offices → temple gopuram → Vidhana Soudha (dome) → UB City towers → right terrace
const SKYLINE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" fill="white" preserveAspectRatio="xMidYMax meet">

  <!-- Ground baseline -->
  <rect x="0" y="78" width="360" height="2"/>

  <!-- Left low-rise cluster (varied rooflines) -->
  <path d="M0 78 L0 65 L8 65 L8 72 L16 72 L16 60 L20 56 L24 60 L24 72 L32 72 L32 65 L40 65 L40 78 Z"/>

  <!-- South-Indian temple gopuram (stepped pyramid with kalasha finial) -->
  <path d="M42 78 L42 68 L72 68 L72 78 Z"/>
  <!-- Arched gateway -->
  <path d="M52 78 L52 70 Q57 65 62 70 L62 78 Z" fill="white"/>
  <path d="M44 68 L44 60 L70 60 L70 68 Z"/>
  <path d="M47 60 L47 52 L67 52 L67 60 Z"/>
  <path d="M50 52 L50 44 L64 44 L64 52 Z"/>
  <path d="M53 44 L53 38 L61 38 L61 44 Z"/>
  <path d="M55 38 L55 33 L59 33 L59 38 Z"/>
  <!-- Kalasha (pot finial) -->
  <ellipse cx="57" cy="30" rx="5" ry="4"/>
  <circle cx="57" cy="25" r="2.5"/>
  <!-- Tier mouldings -->
  <rect x="44" y="62" width="26" height="1" opacity="0.4"/>
  <rect x="47" y="54" width="20" height="1" opacity="0.4"/>
  <rect x="50" y="46" width="14" height="1" opacity="0.4"/>

  <!-- Mid office between temple and Vidhana Soudha -->
  <path d="M74 78 L74 56 L78 52 L82 56 L82 78 Z"/>
  <path d="M84 78 L84 62 L94 62 L94 78 Z"/>
  <rect x="85" y="59" width="8" height="3" opacity="0.4"/>

  <!-- ═══ Vidhana Soudha (Karnataka Legislature) ═══ -->
  <!-- Grand staircase base -->
  <path d="M96 78 L96 72 L98 70 L178 70 L180 72 L180 78 Z"/>
  <!-- Main body tiers -->
  <path d="M99 70 L99 62 L177 62 L177 70 Z"/>
  <path d="M103 62 L103 54 L173 54 L173 62 Z"/>
  <path d="M107 54 L107 46 L169 46 L169 54 Z"/>
  <path d="M111 46 L111 40 L165 40 L165 46 Z"/>
  <!-- Side pavilion towers -->
  <path d="M111 46 L111 34 L121 34 L121 46 Z"/>
  <path d="M155 46 L155 34 L165 34 L165 46 Z"/>
  <!-- Pavilion domes -->
  <ellipse cx="116" cy="31" rx="7" ry="5"/>
  <circle cx="116" cy="25" r="2"/>
  <ellipse cx="160" cy="31" rx="7" ry="5"/>
  <circle cx="160" cy="25" r="2"/>
  <!-- Central dome drum -->
  <path d="M126 40 L126 30 L150 30 L150 40 Z"/>
  <!-- Main dome (filled ellipse) -->
  <ellipse cx="138" cy="26" rx="14" ry="9"/>
  <!-- Dome lantern neck -->
  <rect x="135" y="15" width="6" height="8"/>
  <!-- Globe finial -->
  <circle cx="138" cy="13" r="3.5"/>
  <!-- Arched central entrance -->
  <path d="M131 70 L131 62 Q138 57 145 62 L145 70 Z" fill="white"/>
  <!-- Facade columns -->
  <rect x="101" y="70" width="3" height="8" opacity="0.4"/>
  <rect x="109" y="70" width="3" height="8" opacity="0.4"/>
  <rect x="164" y="70" width="3" height="8" opacity="0.4"/>
  <rect x="172" y="70" width="3" height="8" opacity="0.4"/>
  <!-- Horizontal mouldings on tiers -->
  <rect x="99"  y="64" width="78" height="1" opacity="0.35"/>
  <rect x="103" y="56" width="70" height="1" opacity="0.35"/>

  <!-- ═══ UB City glass towers (modern Bangalore) ═══ -->
  <!-- Tower 1 — tallest, slight taper at top -->
  <path d="M184 78 L184 30 L186 28 L198 28 L200 30 L200 78 Z"/>
  <!-- Rooftop antenna -->
  <rect x="191" y="22" width="2" height="8"/>
  <circle cx="192" cy="20" r="2"/>
  <!-- Floor lines -->
  <rect x="184" y="48" width="16" height="1" opacity="0.35"/>
  <rect x="184" y="58" width="16" height="1" opacity="0.35"/>
  <rect x="184" y="68" width="16" height="1" opacity="0.35"/>
  <!-- Tower 2 -->
  <path d="M203 78 L203 40 L205 38 L217 38 L219 40 L219 78 Z"/>
  <rect x="203" y="34" width="2" height="6"/>
  <rect x="203" y="55" width="16" height="1" opacity="0.35"/>
  <rect x="203" y="65" width="16" height="1" opacity="0.35"/>
  <!-- Tower 3 -->
  <path d="M222 78 L222 48 L224 46 L234 46 L236 48 L236 78 Z"/>
  <rect x="222" y="62" width="14" height="1" opacity="0.35"/>
  <rect x="222" y="72" width="14" height="1" opacity="0.35"/>

  <!-- Right cluster -->
  <path d="M238 78 L238 58 L240 56 L252 56 L254 58 L254 78 Z"/>
  <path d="M256 78 L256 64 L266 64 L266 78 Z"/>
  <rect x="257" y="61" width="8" height="3" opacity="0.35"/>

  <!-- Right small temple / minaret -->
  <path d="M270 78 L270 68 L286 68 L286 78 Z"/>
  <path d="M273 68 L273 60 L283 60 L283 68 Z"/>
  <path d="M276 60 L276 52 L280 52 L280 60 Z"/>
  <path d="M277 52 L277 46 L279 46 L279 52 Z"/>
  <ellipse cx="278" cy="43" rx="4" ry="4"/>
  <circle cx="278" cy="38" r="2"/>
  <!-- Arch at base -->
  <path d="M270 68 L270 62 Q278 58 286 62 L286 68 Z" fill="white"/>

  <!-- Far-right low buildings -->
  <path d="M288 78 L288 65 L294 60 L300 65 L300 78 Z"/>
  <path d="M302 78 L302 68 L314 68 L314 78 Z"/>
  <path d="M316 78 L316 70 L328 70 L328 78 Z"/>
  <path d="M330 78 L330 72 L342 72 L342 78 Z"/>
  <path d="M344 78 L344 74 L360 74 L360 78 Z"/>

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
