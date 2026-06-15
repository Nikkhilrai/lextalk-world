# LexTalk World — Development Work Log

> Last updated: 22 May 2026

---

## 21 May 2026

| # | Commit | Change |
|---|--------|--------|
| 1 | `a91ca22` | **Feature:** Added Google Sheets sync — admin can push all registrations to a shared sheet (clears and rewrites Sheet1 with Free / Paid / Pending sections + summary row). |
| 2 | `9420a27` | **Content:** Extended EARLY30 coupon countdown expiry display and timer limit to May 27, 2026. |
| 3 | `2fb86a6` | **Fix:** Removed record count from Excel section headers; added the original CSV export button back alongside Excel export. |
| 4 | `788b82b` | **Feature:** Replaced basic CSV export with a beautifully styled Excel (`.xlsx`) export featuring three color-coded sections, alternating row tints, custom column widths, and a summary sheet. |
| 5 | `427e29f` | **Fix:** Free registrations were storing `originalPrice: 99, currency: USD` in DB — corrected to `0 / FREE`. CSV export also overrides legacy records. |
| 6 | `12e9d51` | **Feature:** CSV export now splits into 3 sections — Free Registrations / Paid Registrations / Registered (Payment Pending) — with row counts per section |

---

## 20 May 2026

| # | Commit | Change |
|---|--------|--------|
| 7 | `0f59ac7` | **UI:** Hero background video replaced with new LexTalk Highlights 2023 video |
| 8 | `3f446ad` | **UI:** Added spring bounce animation, shimmer sweep, and amber glow ring when a card comes to front on hover |
| 9 | `770004b` | **UI:** Hovering Mumbai or Dubai card now brings it to front (z-index swap) with smooth transition |
| 10 | `543c95c` | **Feature:** Bangalore hero card now shows live confirmed registrant count fetched from DB (auto-updates) |
| 11 | `196f16a` | **Content:** Updated delegate count to 300+ and nations to 10+ on `/bangalore-invite-2026/` page |
| 12 | `a9f3823` | **UI:** Bangalore card moved to front featured position on hero — it's the nearest upcoming event |
| 13 | `e927094` | **UI:** Bangalore hero card made visible with float animation and "Upcoming" badge; fixed broken link (`#` → `/bangalore-2026`) |
| 14 | `b23adc4` | **Fix:** INR delegate registrations were storing USD price amount — now correctly stores INR price. Manually corrected Manoj Kumar's record (INR 69 → INR 5,999) |
| 15 | `344cff0` | **Content:** Updated EARLY30 coupon expiry display from May 20 → May 27, 2026 |

---

## 19 May 2026

| # | Commit | Change |
|---|--------|--------|
| 16 | `f6844e4` | **Fix:** Navbar text was invisible on the invite page (dark hero + light variant = unreadable) |
| 17 | `9be7c2a` | **Fix:** Notification bell was polling every 5 min — reduced to 30 sec. Notification link was pointing to a 404 page — fixed to `/admin/delegate-registrations` |
| 18 | `364ddb2` | **Fix:** Ticket PDF showed "To be announced" for Bangalore venue. Bangalore confirmation page showed "Bangalore, India" instead of full venue. Both fixed. |
| 19 | `77bf485` | **UI:** Redesigned `/bangalore-invite-2026/` page — dark hero banner, two-column layout, venue card, event stats, proper Navbar & Footer |
| 20 | `62c5a0d` | **Feature:** Created `/bangalore-invite-2026/` — standalone free delegate registration page. Registers to DB, sends Bangalore confirmation email, syncs to admin dashboard |
| 21 | `91796cf` | **Fix:** LinkedIn button text was showing "in Follow Us on LinkedIn" — removed erroneous "in" prefix from all email templates |
| 22 | `84912d2` | **Feature:** Added LinkedIn Follow button to sponsorship interest confirmation email |
| 23 | `46a452e` | **Feature:** Added LinkedIn Follow button + Event Page link to all delegate confirmation emails (Bangalore & Dubai) |
| 24 | `2c2e9c5` | **Content:** Removed Punya Patra from Bangalore speakers (not a confirmed speaker) |
| 25 | `acf8e9a` | **Content:** Added Punya Patra with bio to Bangalore 2026 speakers page |

---

## 18 May 2026

| # | Commit | Change |
|---|--------|--------|
| 26 | `9176d11` | **Fix:** MysticVerse Global logo was untracked in git — committed and pushed so it appears on site |
| 27 | `b0fc3b1` | **Sponsor:** Added MysticVerse Global as "Wellness & Consciousness Partner" on Bangalore, Dubai and Mumbai sponsor sections |
| 28 | `e037b3c` | **Fix:** Speaker bio modal was rendering behind the navbar on the Bangalore speakers page — fixed z-index |
| 29 | `480befd` | **Content:** Updated Balaji Mohan's designation and bio on Bangalore 2026 page |
| 30 | `2b09d3e` | **Content:** Added bio for speaker Ankita Choudhary |
| 31 | `9da0775` | **Content:** Added Deepti Aggarwal to Bangalore 2026 speakers list |

---

## 15 May 2026

| # | Commit | Change |
|---|--------|--------|
| 32 | `9895f10` | **Feature:** Added "Forward confirmation to another email" in admin registration detail modal — useful for resending to alternate addresses |

---

## 14 May 2026

| # | Commit | Change |
|---|--------|--------|
| 33 | `92d6ebe` | **Content:** Updated Corporate Counsel Pass price to $79 USD on Bangalore registration page |
| 34 | `41108b2` | **Content:** Updated Prashant Srivastava's bio and designation on Bangalore page |
| 35 | `1e979fa` | **Content:** Added Balaji Mohan and Yawar Usmani to Bangalore 2026 speakers list |

---

## 13 May 2026

| # | Commit | Change |
|---|--------|--------|
| 36 | `4b62bba` | **Content:** Removed Apoorva Achwal Sane from Bangalore speakers list |
| 37 | `9764b8d` | **Content:** Added Houston 2026, NYC 2025, San Francisco 2025, NYC 2024 to Awardees page |
| 38 | `2129ae3` | **Fix:** NYC 2025 event page link was broken (wrong slug) — corrected |
| 39 | `8dafd53` | **Content:** Added Houston 2026, San Francisco 2025, NYC 2025, NYC 2024 to Past Conferences page |

---

## Admin / DB Operations (No Code Changes)

| Date | Action |
|------|--------|
| 21 May | Corrected Swastika Mukherjee's registration — Delegate VIP INR price was stored as USD 79. Corrected: Original Price INR 79 → INR 7,499 · Discounted Price INR 55.30 → INR 5,249 (EARLY30 coupon, 30% off) |
| 20 May | Corrected Manoj Kumar's registration — Student Pass INR price was stored as USD 69. Corrected: Original Price INR 69 → INR 5,999 |
| 19 May | Forwarded Swastika Mukherjee's confirmation email to `swastika.mukherjee@rtx.com` as requested |

---

**Total commits this period: 39**
