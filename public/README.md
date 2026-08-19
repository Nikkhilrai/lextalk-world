# `public/` — Static Assets

Everything here is served from the site root. `public/logo/x.png` → `https://lextalkworld.in/logo/x.png`.

## Naming rules

- **lowercase-kebab-case** for all new files: `dubai-hero.jpg`, not `Dubai Hero.jpg`
- **no spaces** — they force `%20` encoding and break shell scripts
- Exception: a handful of files under `advisory/` keep `Underscore_Case` because **those exact
  strings are stored in the production database** (see "Database-referenced assets" below).

## Folder map

| Folder | Contents |
|---|---|
| `og/` | Social share cards (1200×630). One per event + `default.jpg`. Referenced from each event's `layout.tsx` `openGraph.images`. |
| `logo/` | **LexTalk brand** marks only (`lextalkworld_logo.png`, `favicon.png`). |
| `logos/` | **Press / "Featured In"** logos (numbered `102.png`–`120.png`). Consumed by `src/components/FeaturedIn.tsx`. Not brand assets — despite the similar name. |
| `dubai-event/` | Dubai 2026 assets: `sponsors/`, `why-attend/`, `why-attend-slideshow/`, `new-logo/`. |
| `bangalore-2026/` | Bangalore assets: `Sponsor/`, `awardees/`, `document/`. |
| `mumbai-2026/` | Mumbai assets (`Decision-Makers/`). |
| `indonesia-2027/` | Jakarta 2027 assets (`images/`). |
| `agendas/` | Event agenda PDFs. **Served dynamically** — see below. |
| `advisory/` | Advisory board headshots. **DB-referenced** — see below. |
| `sponsor/` | Sponsorship page art + `sponsor-logos/{platinum,diamond,gold}/`. |
| `media-partners/`, `associations/` | Partner and association logos. |
| `about/`, `images/`, `testimonials/`, `ceo/`, `passes/` | General site imagery. |
| `background/` | `lextalk-hero-2.mp4`, used by `src/components/Hero.tsx`. |

## ⚠️ Before renaming or deleting anything

Three categories are **not** discoverable by grepping the source. Check these first:

### 1. Dynamically-constructed paths
Some paths are built at runtime from a slug, so a plain text search will not find them:

```ts
// src/app/api/agenda/download/route.ts
const agendaUrl = `/agendas/${eventSlug}-agenda.pdf`;

// src/app/dubai-2026/page.tsx
`/dubai-event/why-attend-slideshow/${i + 1}.avif`
```

Renaming `agendas/dubai-2026-agenda.pdf` silently breaks agenda downloads.

### 2. Database-referenced assets
The `Advisor.image` column stores **local paths**, not Cloudinary URLs. Verify with:

```bash
curl -s https://lextalkworld.in/api/advisors | grep -o '"image":"[^"]*"'
```

Any file listed there must keep its exact filename, or update the DB rows in the same change.
`prisma/seed-advisors.ts` must stay in sync too.

### 3. Cloudinary is the source for most other imagery
Blog, awardees, and most sponsor logos are served from Cloudinary
(`res.cloudinary.com/djagw0s4d/...`), not from this folder.

**All speaker photography now lives on Cloudinary** — do not add speaker images here:

| Event | Cloudinary folder | Count |
|---|---|---|
| Dubai 2026 | `lextalk/dubai-speakers` | 44 |
| Mumbai 2026 | `lextalk/mumbai-speakers` | 7 (+5 reuse Dubai URLs for shared speakers) |
| Bangalore 2026 | `lextalk/bangalore-speakers` | 45 (39 in use, 6 archived/not in lineup) |

To add a speaker, upload to the relevant folder with a slugified `public_id`
(`firstname-lastname`) and reference the returned `secure_url`.

## Verifying you didn't break anything

```bash
# every "/asset.ext" string referenced in source
grep -rhoE '"/[^"]+\.(png|jpg|jpeg|avif|webp|svg|mp4|pdf)"' src/ | tr -d '"' | sort -u > /tmp/refs.txt
# every file actually present
find public -type f ! -name .DS_Store | sed 's|^public||' | sort -u > /tmp/disk.txt
# anything referenced but missing:
comm -23 /tmp/refs.txt /tmp/disk.txt
```

Baseline: **9 known-missing** files (pre-existing, need source art re-supplied):
`/about/image.avif`, `/associations/3.png`, `/bangalore-2026/Sponsor/Global-Corporates/SILF.png`,
`/bangalore-2026/document/final-showguide-bangalore.png`, `/dubai-event/event-bg.avif`,
`/dubai-event/sponsors/dahua.avif`, `/images/authors/nikhil-rai.jpg`,
`/images/blog/ai-contract-management-hero.png`, `/images/counsel-exchange/Sergey Medvedev.jpg`.

Anything beyond those 9 is a regression.

## Large originals

Full-resolution event photography is **not** kept in this repo. Bangalore 2026 originals
(7008×4672 masters) live outside the project at:

```
~/Developer/lextalkWorld-media-archive/bangalore-2026-originals/
```

Cloudinary holds only 1400×933 web derivatives of those, so the archive is the only master copy.
