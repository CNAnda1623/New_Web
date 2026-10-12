# SUNGROW (India / EN) — FRONTEND SPECIFICATION FOR NEXT.JS RECREATION (5 reference pages + 1 login page)

> Evidence labels used throughout: **[O]** Observed (page text/markup, screenshot, or screen recording) · **[M]** Measured (browser-computed value; **none available**, see §0) · **[E]** Estimated from visuals · **[U]** Unverified.
> Hard rules for the implementation agent: scope is **exactly six pages** (the five reference pages plus the `/login` page added by the user, §7A); use the **original Sungrow assets listed in §10** (hot-link or download from the CDN; never generate or substitute imagery); never invent CSS values, timings or breakpoints that are marked [U]; ask before making consequential assumptions.

---

## 0. Evidence base and limitations (read first)

| Source | What it gave | What it could NOT give |
|---|---|---|
| Live page fetch (all 5 URLs) | Full text, section order, link targets, asset URLs (images, `.webm`), form fields | Computed CSS, fonts, DOM classes, JS behaviour, runtime states |
| 5 screenshots (full-page, scaled down) | Layout composition, proportions, relative spacing, mid-animation states | Pixel measurements, true viewport width/DPR |
| Screen recordings (Home 28.5 s, Brand Story 17.3 s, Sustainability 72.2 s; all 1918×912/916 px, 30 fps) | Header scroll behaviour, hover states, tab switching, counter end values, carousel presence | Easing curves, exact durations (labelled [E]) |
| HAR files | Only Next.js `?_rsc=` prefetch requests and one analytics POST (see §0.1) | **No** HTML, CSS, JS, fonts or image requests — so no font files, no CSS tokens, no breakpoints |
| No recordings for C&I and Residential | Per user: treat those pages as having no animations beyond the screenshots | — |

**Recording viewport:** ≈ **1920 px wide** (1918 px captured) [O]. This is the only viewport with real evidence. Screenshots are scaled full-page captures with unknown width.

**Framework [O]:** Next.js (asset path `website/_next/static/media/…`, `meta-next-size-adjust`, `_rsc` prefetch requests). Not evidence of any CSS framework.

**Viewport meta [O]:** `width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no`.

### 0.1 HAR findings
- `About_HAR.har` is **not** a Brand Story capture: its page title is the C&I URL and its 10 requests are identical to `C_I_HAR.har` (duplicate/mislabelled).
- `Home_HAR.har` has no page metadata; contains prefetches for `/for-home`, `/solutions-residential`, `/cases-homeowners`, `/technologyinnovation`, `/gres`, `/about/career`, `/news-media-news-list`, `/microinverter-challenge`, `/seadistributorsummit`, `/event/2025-mea-pv-ess-summit`, news article, privacy, disclaimer.
- All HARs include `POST https://mdb-api-sg.sungrowpower.com/tracking/create` (analytics) — **do not reproduce**.
- Link-casing 301 redirects exist on the live site (e.g. `/Sustainability/Excellent-Governance` → lowercase). Irrelevant locally.
- Sustainability HAR confirms the sub-nav/links target `/sustainability/excellent-governance`, `/sustainability/sustainability-reports`, `/sustainability/diversity-and-inclusion`, `/newsdetail/6400` — **all out of scope**.

### 0.2 Problems / limitations to acknowledge
1. No computed styles, fonts or breakpoints exist anywhere in the evidence. Typography and colour values below are visual **estimates**.
2. Mobile evidence is limited to **one 400 px emulation** (Home hero slider video + Brand Story capability-card still). The rest of §8 is a general responsive design agreed with the user, not an observation.
3. Mega-menu open states were never captured (no hover on header in recordings). Menu contents are known (text/links) but visuals/animation are [U].
4. Contact-form validation, select-option lists, and submit behaviour are [U].
5. Header search and country selector open-states are [U].
6. Some Sustainability sub-pages appeared in the recording (Net-Zero Transition, Eco-Harmony, Governance Excellence, Reports) — they are **out of scope**.
7. Filenames differ slightly from the original brief (`About_section.png`, `Residential_Ev_Charging_Solution.png`) — treated as the intended files.

---

## 1. Scope and route map (Deliverable G)

| # | Reference URL | Local route | Title |
|---|---|---|---|
| 1 | `/in/en` | `/` | Home Page – SUNGROW |
| 2 | `/in/en/solution/ci-pv-solution` | `/solution/ci-pv-solution` | C&I PV Solution – SUNGROW |
| 3 | `/in/en/solution/residential-pv-ess-ev-charging-solution` | `/solution/residential-pv-ess-ev-charging-solution` | Residential PV + ESS + EV Charging Solution – SUNGROW |
| 4 | `/in/en/about-us/brand-story` | `/about-us/brand-story` | Brand Story – SUNGROW |
| 5 | `/in/en/sustainability` | `/sustainability` | Sustainability – SUNGROW |
| 6 | Sungrow login page (reference URL not supplied; supplied as a screenshot only) | `/login` | Login – SUNGROW (title [U]) |


The user explicitly authorized a **sixth local screen, the Login page**, after the original five-page scope. No other auth screens (Sign Up, Forgot Password, email verification) are authorized.

Locale prefix `/in/en` is dropped locally (single locale). Keep the reference URL as a comment/constant per page.

**Internal links (user-approved):** header "LOGIN" → page 6 (`/login`), Login page "Return to Home" and logo → `/`, header → pages 2 and 3 (inside mega-menus), header "Sustainability" → page 5, header "About Us › Brand Story" → page 4, logo → page 1, Home "Discover Who We Are" → page 4, Home "Green Mission, Better Life › Explore More" → page 5, footer Brand Story → 4, footer Sustainability Overview → 5.
**All other links:** keep as external links to `https://www.sungrowpower.com/in/en/...` (open the original site). Do not build destination pages.

**Sustainability anchor decision (proposed, needs approval):** live "Sustainability Strategy" and "Reports and Policies" sub-nav links navigate to sub-pages. Locally, make them smooth-scroll to the matching sections on page 5 (§7).

---

## 2. Shared components

### 2.1 Header (identical on all 5 pages) [O]
- Two-row structure at top of page: **row 1** = India flag + "India" (left) · SUNGROW orange logo (centre) · search icon + person icon "LOGIN" (right); **row 2** = nav centred: *For Home, For Business, For Utility, Partners, Products, Service & Support, Sustainability, About Us*.
- Background: white / slightly translucent over content [E]. Fixed to top.
- **Scroll behaviour [O, recordings]:** scrolling down → row 2 (nav) hides, only the logo row remains; scrolling up / at top → full two-row header shows (visible in Sustainability recording). Easing/duration [U], suggest ~300 ms [E].
- Only **Sustainability** is a direct link; the other seven open mega-menus (hover vs click [U]).
- Logo: `https://official-oversears-file.sungrowpower.com/website/_next/static/media/logo.84e5bb0c.svg`; flag: `page-assets/28dafe10-f648-4fcf-a8af-ba5d0e1ef141.svg`. Search → `/search-results` (external). **LOGIN → local `/login`** (user-authorized; the live destination was never captured [U]).
- Active-page indication: not observed [U].
- Mobile header [O, 400 px video]: flag icon only, centred logo, search + hamburger icons (see §8.1). Drawer contents [U]; propose accordion drawer.

**Mega-menu content [O] (text and targets):**
- *For Home*: Solutions & Cases → Residential PV+ESS+EV Charging Solution (**local**), Residential PV Solution, Cases & Stories · How to Buy → Home Energy Estimator, Find a Distributor · Support → For Home Support, Product Documentation, iSolarCloud, iEnergyCharge, FAQs, Warranty.
- *For Business*: C&I PV Solution (**local**), C&I PV+ESS+EV Charging Solution, Cases & Stories · How to Buy → Find a Distributor · Support → For Business Support, Product Documentation, iSolarCloud, FAQs, Warranty.
- *For Utility*: Business Area → PV System, Energy Storage System, Floating PV System, Wind, Hydrogen · Support → Product Documentation, FAQs · Success Stories → Cases & Stories.
- *Partners* (tabs Installers / Distributors / Partnership): Sungrow for Installers, Become an Installer; Solutions for Home/Business; Cases; Find a Distributor; Installer Support, Product Documentation, Installation Videos, iSolarCloud, FAQs, Warranty.
- *Products*: All Products; tabs PV Inverter (String Inverter, Modular Inverter, MLPE, Accessory) / Energy Storage System / Smart Energy Products.
- *Service & Support*: Sungrow Service (Service Brand, Service Stories) · Support for You (Installers/Homeowners/Business Owners Support) · Resources (Product Documentation, FAQs, Warranty) · Success Stories.
- *About Us*: About Sungrow (**Brand Story → local**, Contact Sungrow) · News and Media (News, Events, Sungrow Campaign, White Paper) · Investors (Overview, Stock Information, Corporate Governance, Financial Reports) · Career · Sungrow Foundation.
- Full URL list: use the live page markup; all non-local items → external `https://www.sungrowpower.com/in/en/...` paths exactly as on the reference.

### 2.2 Footer (identical on all 5 pages) [O]
- Light grey background (≈ #f3f3f3 [E]). 5 link columns, small text (≈12 px [E]), column headings bold.
  - **Products & Solutions:** Solutions for Home, Solutions for Business, Solutions for Utility, PV Inverter, Energy Storage System, Smart Energy Products.
  - **Partners:** Sungrow for Installers, Sungrow for Distributors, Find a Distributor.
  - **Service & Support:** Sungrow Service, Service Stories, Installers Support, For Home Support, For Business Support, Product Documentation, Cases & Stories, FAQs, Warranty, Security Incident Response.
  - **Sustainability:** Overview (**local**), Sustainability Strategy, Reports and Policies.
  - **About Us:** Brand Story (**local**), Technology and Innovation, Globalization, Lean Manufacturing, News & Media, Investors, Career, Sungrow Foundation, Blog, Contact Sungrow.
- Bottom: small orange SUNGROW logo (left), "© 2026 SUNGROW. All Rights Reserved.", right-aligned "Privacy Policy · Disclaimer", thin divider line above copyright.
- **"Follow SUNGROW" row** with 5 grey icons (LinkedIn, Instagram, Facebook, X, YouTube) directly above footer on Home, C&I, Residential. On Brand Story and Sustainability it is **absent** [O screenshots]. Icons: `website/_next/static/media/{linkedin,ins,facebook,twitter,youtube}_gray.*.svg`.
- Social targets: linkedin.com/company/sungrow-power-supply-co-ltd/posts/ · instagram.com/sungrow_power/ · facebook.com/CleanPowerForAll · x.com/Sungrow_Power · youtube.com/@Sungrow.

### 2.3 Back-to-top button [O]
Fixed bottom-right, white circle with orange outline and orange up-arrow, visible on all pages after scrolling; click scrolls to top (smooth [E]).

### 2.4 Contact form (C&I + Residential only) [O fields, U behaviour]
"CONTACT US" large heading at left; form at right: *Which best describes you?* (select "Select your Role") · First Name / Last Name (2 cols) · Email · Country / Region (select) / City (2 cols) · Privacy-policy text with link · checkbox "I have read and agree to the Sungrow Terms of Use" · checkbox newsletter (MailChimp wording) · dark-grey **Submit** button. Inputs appear as light-grey filled boxes [E]. Validation/submit: [U] → implement client-side required validation + inert submit unless told otherwise (ask user).

### 2.5 Design language [E — all values estimated, none measured]
- Font: geometric sans resembling **Montserrat** (not confirmed; no font file in HAR). Ask user/inspect DevTools before final.
- Primary accent: Sungrow orange ≈ `#F07C00–#F58220` [E]. Used for logo, section accent headings ("Clean Power for All", "Why Sungrow"), counters' icons, CTAs, links like "Learn More".
- Body text dark grey `#333–#555`; headings mid-grey, light weight (300–400) at large sizes [E].
- Backgrounds: white and very light grey `#f5f5f5/#f3f3f3` alternating.
- Buttons: (a) outlined pill/rounded-rect with 1 px orange border, orange text (Explore More, Discover Who We Are); (b) solid orange rounded-rect, white text (card CTAs on dark photos, "Learn More About Our Actions"); (c) translucent dark-grey button (“All Strategies”); (d) outlined grey rounded-rect (Learn More / Documents & Installation on product cards); (e) solid dark grey Submit.
- Radii: large (≈16–24 px) on photos/cards; small (≈4–8 px) on buttons/inputs [E].
- Content max-width ≈ 1200–1400 px centred on 1920 viewport, with full-bleed media where noted [E].
- Section headings: centred, ≈ 36–44 px on desktop [E].

---

## 3. PAGE 1 — HOME (`/`)

Reference screenshot: `Home.png` (captured mid-animation: counters low, headline frames stacked). Recording: `Home_V.mp4` (scrolls from stats to footer).

### Ordered sections
1. **Hero [O]:** video `page-assets-process/78a8c56d-634f-4ff5-830f-6121131fd0b2.webm` with poster `page-assets/2223f2bc-4e90-4dae-9007-6f692ec1930d.jpeg`. Screenshot shows overlay line "Leading us onward" and a second text line "GATHERING GOODWILL FOR A BETTER WORLD" (stacked text/frames [E]; text appears to be part of the video or a sequential text reveal [U]). Hero is full-bleed, ≈ viewport tall [E]. Autoplay/mute/loop [U].
2. **Stats banner [O recording]:** rounded image banner (blue sky, white inverter cabinets) reading "**Sungrow No.1 in Global Inverter Bankability**" with sub-copy "Fortune Future 69 / AAA MSCI ESG Rating in 2025" (screenshot) and big metallic **"75 GW⁺ — India Shipments of PV Inverters"**. Image asset not identified in markup (probably `page-assets/142b0ff7…` is an icon; banner source [U]). Scroll-in animation: banner scales/expands from the hero (the blue panel is visible narrow at first, widening) [E].
3. **"Clean Power for All" intro [O]:** orange centred heading + vertical thin divider line; paragraph "At Sungrow, we are committed to promoting the development and application of clean energy across all major energy technology sectors, including solar, wind, storage, electrification, and hydrogen. Our goal is to increase the adoption of clean energy and drive more creative, innovative ways to use clean energy." — **word/line colour reveal on scroll** (grey→dark), seen faded in screenshot [E]. Then **5 stats** with orange line icons (`page-assets/142b0ff7…svg`, `f49dbb09…svg`, `7d449bdc…svg`, `f72e870b…svg`, `701fe861…svg`): **46 GW** Power Electronic Converters Installation · **NO.1** PV Inverter & ESS & PCS Bankability*¹ · **6** R&D Centers · **19+** International Subsidiaries · **AAA** MSCI ESG Rating in 2025*² [end values O from recording; start at 0 in markup → count-up on viewport entry, ~1–2 s [E]]. Footnotes: "*¹ Source: BloombergNEF  *² Source: Morgan Stanley Capital International". CTA outlined button "Discover Who We Are" → Brand Story (**local**).
4. **Customer Scenarios / Business Areas [O recording]:** full-bleed photo section ≈ 900 px high [E]. Background images change by tab (`page-assets/d1a5c459-4138-4fa0-a7ae-3b9cfb030504.jpg` is one of them; others per tab [U — extract from DevTools]). Top mini-labels "Customer Scenarios · Business Areas". Large white title (tab name), then 3 links with orange chevrons. Bottom **pill tab bar** (translucent dark grey, white active tab with black text, separators `|`): *For Home | For Business | For Utility | Installers | Distributors*.
   - For Home: Products & Solutions, Cases & Stories, Service & Support (photo: mother and baby).
   - For Business: [links not captured — U].
   - For Utility: Utility PV System, Energy Storage System, Floating PV System, Wind, Hydrogen (photo: engineer in hi-vis).
   - Installers: [U].
   - Distributors: For Home Solutions, For Business Solutions, Become a Distributor (photo: two professionals with tablet).
   - Interaction: **click** (cursor on tab in recording) switches content with crossfade of background [E]. Auto-advance [U].
5. **"Why Sungrow" [O]:** orange heading, vertical line, paragraph "Backed by the trust of partners worldwide, Sungrow is committed to delivering unwavering excellence in technology, manufacturing and service. Together, let's bridge to a sustainable future." with the same scroll colour-reveal.
6. **"Our Commitment to Innovation and Excellence" [O]:** heading + **horizontal card carousel/scroller** — 4 dark photo cards with rounded corners (~24 px [E]), white title top-left, solid orange "Explore More" button: Technological Innovation (`e37a79ea…png`), Lean Manufacturing (`1f77f7c2…png`), Global Presence (`2735e941…png`), Professional Services (`7639e445…png`). Cards bleed off the right edge; scrolling is scroll-linked horizontal movement as the page scrolls (cards slide left in the recording) [E]. Links: technologyinnovation, lean-manufacturing, globalpresence, service-brand (all external).
7. **"Together, We Forge a Greener Tomorrow" [O]:** centred heading, then **three stacked panels** each a rounded white card ≈ 60/40 split text-left/image-right: small grey eyebrow + orange double-dash, grey 2-line title, outlined orange "Explore More":
   - *Sustainability* — "Green Mission, Better Life" → Sustainability (**local**); image aerial forest/river.
   - *Our people* — "Greener World, Greater Us" → Career; image: meeting (colleagues).
   - *Our Service* — "Where the Sun Shines, We're Ready to Serve" → Sungrow Service; image: engineers in hi-vis at solar farm.
   Panels appear to **stick and stack/replace** each other during scroll (large empty scroll area in screenshot) [E].
8. **Trending News & Events [O]:** heading; 1 large featured card (All Energy Australia 2025 — "Countdown Begins! Sungrow Unveils New Innovation at All Energy Australia 2025", Oct. 22, 2025, tag News) + 4 small cards (Events: "2025 MEA PV & ESS summit" Aug. 21, 2025; Events: "2025 Southeast Asia Distributor Summit" Jul. 17, 2025; Events: "Microinverter Quick Installation Challenge" Apr. 16, 2025; Influencer: "Explore the New MG Series Together with Jonn" Jul. 31, 2025). Card images: `73fb1f86…jpg`, `1bfbbc81…png`, `9fd8ede7…jpg` (3 of 5 identified; others [U]). Tag orange, title dark, date grey. "Explore More" → news list (external).
9. **Follow SUNGROW + footer** (§2.2).

---

## 4. PAGE 2 — C&I PV SOLUTION (`/solution/ci-pv-solution`)

Screenshot: `Solution_PV.png` (hero text partly faded = text reveal [E]). No recording.

1. **Hero:** full-width photo `14a7fb18-eb97-4752-b598-c5a6743d920a.jpg` (two engineers, roof, tablet), white headline "Enhanced Safety, Increased Returns" with small sub-label "C&I PV Solution". Height ≈ 45% of the 1920 viewport width ratio → in screenshot ~ 200/373 of width [E].
2. **"Flexible Solutions for Maximum Value":** centred heading + 3-line grey paragraph; rounded wide image `c88fb058-bbd6-41b5-b303-1383ea96f7fd.png` (inverters on rooftop).
3. **"Advanced Safety":** heading + paragraph (AFCI 3.0, RSD/Optimizer…); full-width rounded **video** `page-assets-process/c3f36bb2-b776-43ac-bb15-3cad05e22521.webm` (dark roof/panels).
4. **"Smart Optimization" ("Two ways to boost overall yields."):** video `883461c0-8a96-4d2d-8631-d6a3d3e26fea.webm`; below it a 2-column caption pair: orange "Fearless of Shading, Increase Generation by 30%" + grey "Module-Level Optimization" (left, underlined with orange rule) and "Track Maximum Power Points, Increase Yield by 2%" + "PowerMax Global MPPT" (right).
5. **"Effortless Installation & Commissioning":** heading + paragraph; **full-bleed** image `8401893d-e04e-48da-89dc-e2d6d806b35a.png` (glass panels "SUNGROW System Scenarios VS Other Brand System Scenarios").
6. **"Hassle-Free O&M":** heading + paragraph; video `989a636d-e31c-4b92-a282-9844c7fcb1a9.webm` (phone IV-scan UI); two captions: orange "Reducing Scanning Losses by 8%-30%" (Module-Level IV Scanning & Diagnosis) / "Preventing Overheating & Shutdown" (Multi-Component Self-Cleaning Cooling System).
7. **"How Does It Work?" ("A complete system to power your business with clean energy."):** left half-width image `c9ff94b3-fb90-4368-94aa-617795fc4e10.png` (rooftop PV), right side two **expandable selector rows** (rounded white cards with product thumb, label, chevron): "PV Inverter" (`c5db4644…png`) and "iSolarCloud" (`567b8603…jpg`). Accordion vs tab, and whether the left image swaps: [U] → assume the left image changes per selected row; confirm.
8. **"Cases & Stories":** 2 cards (rounded image on top; orange tag "Business Owners"; title): "Drinking Water From The Sun 100 kWp PV Plant", "C&I PV with SG125CX-P2 in Metzlesdorf Münch Energie Is the Customer". Card images not present in markup text [U]. Outlined orange "Explore More".
9. **"Our Products":** 3 white rounded cards on grey bg: product image, small orange caption "3-Phase String Inverter"/"Smart Energy Management Platform", name ("150kW SG150CX", "125kW SG125CX-P2", "iSolarCloud"), outlined buttons "Learn More", "Documents & Installation". Images: `news-images/06ad25d3…png`, `e81ecbf7…png`, `5280c47c…png`. "Explore More" → products.
10. **Contact Us form + Follow SUNGROW + footer.**

---

## 5. PAGE 3 — RESIDENTIAL PV + ESS + EV CHARGING (`/solution/residential-pv-ess-ev-charging-solution`)

Screenshot: `Residential_Ev_Charging_Solution.png`. No recording.

1. **Hero:** `608f64db-b3b6-41f2-8159-40d3cd88357c.jpg` (couple with tablet on sofa), headline "Clean Power, Carbon-Free Life", sub-label "Residential PV + ESS + EV Charging Solution" (text colour white, reveal anim [E]).
2. **"Solutions that Bring Zero-Carbon Energy to Every Home":** heading + paragraph; rounded image `8e62e317-a425-4b0c-8bd1-e0e54dc2f8b6.jpg` (modern house, car, daytime).
3. **"Efficient and Reliable Clean Energy: Your Key to True Energy Freedom":** heading + paragraph; rounded image `e39c7e2f-00e5-4bdb-af39-969dde7d4e22.png` (house at dusk).
4. **"Triple Protection, Worry-Free Design":** heading + paragraph; rounded image `071f278c-c280-4ca5-a9ce-8ab4b7c564a5.jpg` (house, lightning sky).
5. **"An Intuitive Experience that Brings Comfort to Every Part of Your Life":** split — text left (large heading + small paragraph), image right `98dbe5e1-96d1-4e3a-a8b4-97cf828c4a23.jpg` (patio dinner). 
6. **"Powered by The Sun, Managed by iSolarCloud":** large image `2aed9f68-1f61-4da9-b288-b7ea5beecef4.jpg` (living room with phone-UI overlay) spanning top; heading left and paragraph right below it.
7. **"How Does It Work?":** half-width image `9587b228-c257-42a0-aa0d-aadfb724e600.JPG` left (house + solar); right two selector rows: "Residential Hybrid Inverter" (`bf4a653f…png` thumb; chevron) and "iSolarCloud" (`914e714d…png`). Behaviour [U] (same note as C&I).
8. **"Service That Goes Above and Beyond":** wide rounded photo `c415e170-1bcc-444c-961f-63a25a32c70a.png` (technician with laptop) with white overlay text: three items — *All-in-One System Design* (Customized solutions from a team of experts at no extra cost.), *Turnkey Solutions* (Comprehensive support and services—from grid connection to daily operations and maintenance.), *One-Stop Service* (End-to-end support with clear accountability and fast response.).
9. **"Hear from Our Customers and Partners":** 2 cards (aerial neighbourhood image in 2nd; first image missing in screenshot [U]); tag orange "Homeowners"; titles "Sungrow Home Energy System: Smart Way to Reduce Your Electricity Bills", "A Decade of Trust: Why This Family Chose Sungrow Solar Again"; "Explore More".
10. **"Our Products":** a single card — iSolarCloud (`news-images/5280c47c…png`).
11. **Contact Us form + Follow + footer.**

---

## 6. PAGE 4 — BRAND STORY (`/about-us/brand-story`)

Screenshot: `About_section.png`. Recording: `About_V.mp4` (17 s; scroll with card-hover).

1. **Hero:** video `page-assets-process/c97a6b8b-b026-4e37-8c2e-810c9b631490.webm` (dark audio-mixer close-up in screenshot), centred white "Brand Story", ≈ 560 px tall at 1920 [E]. Small dot/cursor mark right of title (decorative [U]).
2. **Mission:** orange centred "Clean Power for All"; tall thin vertical line; paragraph "It is our mission and underlying belief. With the rapid advancement of renewable power systems primarily based on renewable energy sources, green power is gradually penetrating numerous industries and households. The road to the clean energy future is full of opportunities and challenges." — **scroll-driven text colour reveal** (light grey → dark; first line lighter) [O recording]. Second vertical line below. Page background `#f5f5f5` [E].
3. **"To Be the Global Leader of Clean Energy Conversion Technology":** heading (≈40 px [E]) + small centred paragraph.
4. **5 capability cards [O recording]:** white rounded (~12 px [E]) tall cards with soft shadow, equal width in a row: **Solar** (`c55f4662…png`), **Wind** (`a343664e…png`), **Storage System** (`cb47dec7…png`), **Electrification** (`69f2dda1…svg`), **Hydrogen** (`c37700f1…png`). Orange line icon + label, circular `+` button bottom.
   - **Hover [O]:** hovered card grows taller (lifts above neighbours, other cards slightly shift), icon enlarges, label moves up, a thin divider and its link list fade in below: Solar → PV System, Floating PV System, Smart Energy Products, Sungrow Renewables · Wind → Wind Products & Solutions · Storage System → Storage System, Smart Energy Products · Electrification → E-Power, EV Charger · Hydrogen → Hydrogen. Transition ≈ 300–400 ms ease [E]. Click on `+` behaviour [U]; on touch devices expect tap-to-expand [proposal].
5. **"Bridge to A Sustainable Future":** heading + 2-line paragraph.
6. **Full-bleed video** `page-assets-process/82b590fe-a965-459e-be2d-ff4a552d9977.webm` (dark grass/fern, ≈ 600 px tall) with caption "As we moving towards an accessible clean future" bottom-centre (reveal) [E].
7. **"Together, We Build A Sustainable Future":** heading + paragraph; large rounded image `4cf674b4-a5eb-4db5-a4b6-8152a51f9153.jpg` (children running, ≈ 90% width, radius ~24 px [E]).
8. **"Milestones of Sungrow":** heading; full-bleed building photo `1303c32a-ac0e-4634-86e9-f13a1659a2d2.png` with **horizontal slider of frosted-glass cards** (backdrop blur, rounded), orange year + white text; prev/next arrow (circular, right side). Items: 2024 Brand value exceeded USD 14 billion · 2023 The world's first 2000 V inverter connected to the grid · 2022 Successfully developed the world's first 35 kV solid-state transformer (SST) based PV inverter · 2021 Ranked No.1 among "China's Top 500 ESG Excellent Enterprises" · 2019 Awarded National Industrial Design Center · 2011 Listed on the Shenzhen Stock Exchange · 2009 The first PV concession project in China · 2003 The first grid-connected inverter · 2002 Township Electrification Program · 1997 Establishment of the company. Visible ≈ 2.5 cards per view at 1920 [E]; drag/auto-advance [U].
9. **Footer** (no Follow row).

---

## 7. PAGE 5 — SUSTAINABILITY (`/sustainability`)

Screenshot: `Sustainability.png`. Recording: `sustainability.mp4` (72 s).

1. **Hero:** image `a839ab4c-3e3d-4e8f-8fad-720bdd468644.png` (aerial forest + solar panels), white two-line title "Green Mission / Better Life" left-of-centre, ≈ 500 px tall [E].
2. **Sticky sub-nav [O recording]:** text tabs *Overview · Sustainability Strategy · Reports and Policies* centred under hero, orange underline on active; sticks beneath header while scrolling (header nav row hides, sub-nav stays) [O]. Local behaviour: smooth scroll to sections (see §1).
3. **"Sungrow Climate Targets":** 3 columns, orange line icons (`43be3704…svg`, `225bbf6a…svg`, `cb8b38d2…svg`): "Achieving carbon neutrality at the operational level — by 2028 | Scope 1+2"; "Achieving carbon neutrality across the supply chain — by 2038 | Scope 1+2+3"; "Achieving net zero across the supply chain — by 2048 | Scope 1+2+3"; note "The definition of carbon neutrality and net zero is cited from ISO14068-1:2023". Light grey background.
4. **Governance Framework pyramid** (heading "Sustainability Governance Framework" top-right): triangle graphic (pale grey gradient layers) with 3 orange icons and right-offset labels with horizontal rules: **Governance** (Strategy and Sustainability Committee (Directors of the Board)), **Management** (Sustainability Management Office (Senior Management of Business Units/Centers), ESG Development Center), **Implementation** (Sustainability Implementation Working Group (Representatives from Business Units/Centers)). Likely a single image: `82e0a428-4d3d-4e77-bb51-ffbb7ddd17fc.jpg` (**unconfirmed mapping**); otherwise build as SVG + text [U].
5. **"Sustainability Strategy":** centred heading; wide illustration banner (green hills → orange loop labelled "Clean Energy" → solar town with turbines) with labels "Green Ecosystem · Clean Energy · Better Life". Asset likely `9afb16cb-ddd4-4172-a2c2-bd149fbe4acb.jpg` [E mapping].
6. **Strategy tabs [O recording]:** 5 text tabs (Governance Excellence, Net-Zero Transition, Eco-Harmony, Mutual Prosperity, Equity & Inclusion) with orange underline on active; panel = large rounded photo (≈ 90% width, ~16 px radius) with overlaid white title, orange button "Learn More About Our Actions", translucent grey button "All Strategies", and a **dark translucent stat bar** at the bottom with 4 stats (small label + large white value):
   - Governance Excellence (`c6bdc140…png`): R&D Investment in 2024(USD) 585 Million · R&D Personnel 40% · Cumulative Patent Applications 11000+ · Female Director Proportion 25%.
   - Net-Zero Transition (`5365bda3…png`): Renewable Electricity Usage 79% · Energy Consumption per Unit of Product Decreased Compared to 2020 10% · Electricity Saving in 2025 3950 MWh · Rooftop PV installed capacity 42 MW.
   - Eco-Harmony (`c8620cbd…png`): Environmental Management System Coverage 100% · Product carbon footprint certification 16 products · Eco-design pilot project 2 products · Resource utilization rate for non-hazardous waste 91%.
   - Mutual Prosperity (`f6fcd283…png`): Customer Satisfaction 94.7% · Signing Rate of Supplier Code of Conduct 99.2% · Number of Suppliers Receiving ESG Audit in 2025 251 · Number of Suppliers Receiving Organizational Carbon Inventory in 2025 139.
   - Equity & Inclusion (`1f5be03a…png`): Female Manager Proportion 16.9% · Local Hiring Rate 98% · Employees with Certification Support 1700+ · Cumulative Volunteer Service Hours 12000+.
   Tab change = crossfade of photo/content [E]. "Learn More" / "All Strategies" go to out-of-scope sub-pages → external links.
7. **"Latest Reports & Policies":** heading; 2 sub-tabs "Sustainability Report | Sustainability Policy" (orange underline). Light-grey band holding a **carousel** with prev/next circular arrows at the edges: slide = report cover (left, shadowed) + orange eyebrow "Enterprise" + large uppercase title + orange "Download ↓" button. Slides: 2025 (`2fa6fda3…png`), 2024 (`8f2523b3…png`), 2023 (`cf17bcb3…png`), 2022 (`8dc96a5e…png`), 2021 CSR Report (`d949be09…png`). Policy tab slides: Equity, Inclusion, and Diversity Policy (`5c504040…jpg`), Environmental Management Policy (`314064a3…jpg`), Biodiversity Conservation Policy (`96b3fbaf…jpg`). Download targets are PDFs [U — not in markup]. Outlined "Explore More" below.
8. **"Honors and Rewards":** full-bleed misty-forest background `3d08a0cb-637f-4818-b6d1-05b603de558b.png`, white title over image, row of 4 translucent white rounded cards with logos + caption: MSCI (MSCI ESG Rating AAA), EcoVadis (Sustainability Rating Gold Medal), United Nations Global Compact (20 Case Examples of Private Sector's Sustainable Development in China for 20 Years), BCG (BCG "Global-Challenger Climate Pioneers"). Logo images: `66a5d067…png`, `1a3055ff…png`, `e2bbd3cd…png`, `650a72ff…png`. Row overflows → slider with prev/next [E].
9. **"Latest News":** 3 cards (image top with rounded corners, orange tag "Sustainability", dark title): `c48bead9…png` "From Decade to Decades, Sustainability on the Way: Sungrow Releases its 2024 Sustainability Report."; `a195e679…jpg` "Sungrow Ranks in the Global Top 5%, Awarded EcoVadis Gold Medal"; `a6e0c0a6…jpg` "Sungrow Is listed in Boston Consulting Group's Global-Challenger Climate Pioneers". Links → external news detail pages.
10. **Contact Us banner:** misty-mountain image `318a2075-cf26-4d98-a918-ae6807ad9c92.jpg`; white heading "Contact Us"; text "Your insights drive our progress. Contact our ESG team to share feedback, ask questions, or explore partnerships for a greener tomorrow."; outlined orange button "Email ESG Team" → `mailto:esg@sungrowpower.com`.
11. **Footer** (no Follow row).

---

## 7A. LOGIN (`/login`) — user-authorized sixth screen

Source: one screenshot (1917 × 910 px, desktop). Header LOGIN control destination was never captured, so whether the live site shows a page or a modal is [U]; the screenshot is a standalone page (own logo, no site header), so build it as a **standalone page**. Colours below are **pixel-sampled from the screenshot [M]**; sizes are measured off the 1917 px capture [E, ±2 px].

**Measured from the screenshot's pixels [M, screenshot only]:** page background `#d9d9d9`, card `#ffffff` spanning x 636–1281 (646 px) and y 97–758 (662 px), Login button `#606060`, orange button `#fe7900`, both buttons exactly 500 × 54 px, input underline `#b2b2b2`. Everything else below is estimated.

**Layout**
- Page background `#D9D9D9`, full viewport height, no site header or footer.
- Orange SUNGROW logo centred at the very top (≈ 196 px wide, y ≈ 12–40; the same logo SVG as the header).
- **Card:** white, centred, ≈ 646 px wide × 662 px tall, top ≈ 97 px, corner radius ≈ 40 px, inner padding ≈ 73 px; content column ≈ 500 px wide.
- **Title:** lowercase "login", ≈ 36 px, regular weight, `#09090B`, left-aligned.
- **Fields (underline style, no box):** label above ("Your Email", "Password", ≈ 14 px, dark); input shows light-grey placeholder text ≈ 16 px ("sungrow@email.com", "Enter your Password") with a 1 px `#B2B2B2` bottom rule. Password field has a **closed-eye icon** at the right end (toggles show/hide [E]). Field spacing ≈ 90 px between label tops.
- **Row:** circular outlined checkbox + "Remember me" (≈ 17 px) at left; "Forget Password?" in orange `#FE7900`, ≈ 13 px, right-aligned.
- **Primary button:** "Login", full width (500 px), ≈ 54 px high, radius ≈ 14 px, background `#606060`, white semibold ≈ 18 px. (Greyed look suggests a disabled state while fields are empty [E]; enabled style [U].)
- **Divider:** thin grey line – "or" – thin grey line.
- **Secondary button:** "Sign in Via email Verification", full width, ≈ 54 px high, radius ≈ 14 px, background `#FE7900`, white semibold ≈ 18 px.
- **Footer links under buttons (centred, ≈ 15 px, black with orange links):** "Do not have an account? **Sign Up**" and "Return to **Home**".
- **Page footer:** centred grey text ≈ 18 px: "2025 SUNGROW. All Rights Reserved", "Privacy", "Contact US" (note the year is **2025** here, unlike the 2026 on the main site; reproduce as shown).
- Font: same geometric sans as the rest of the site [U].

**Behaviour (none observed; all assumptions for the user to confirm)**
- Mock only: client-side validation (valid email, non-empty password), show/hide password, remember-me toggle, loading and error states. No real authentication, no API.
- "Forget Password?", "Sign Up" and "Sign in Via email Verification" are inert or point to the external Sungrow site (confirm).
- "Return to Home" and the logo go to `/`.
- Local decision to confirm: the submit is **non-functional**; show a small inline notice ("Sign-in is not available in this demo."), never call a Sungrow auth endpoint, never store credentials. Enable the Login button only when the email is valid and the password is non-empty.
- "Privacy" → external `https://www.sungrowpower.com/in/en/privacy-policy-terms`; "Contact US" → external `https://www.sungrowpower.com/in/en/about-us/contact-us` (same targets as the main footer).
- Accessibility: real `<label>`s, `autocomplete="email"` / `"current-password"`, `aria-pressed` on the eye toggle, visible orange focus ring, error text tied with `aria-describedby`.
- Mobile: general responsive design: card becomes full-width with ≈ 20 px side margins and reduced padding (≈ 24 px), logo stays centred, footer text wraps.

## 8. Responsive behaviour (Deliverable F)

### 8.0 Evidence and scope of this section
Only **one** mobile data point exists: a Chrome DevTools "Responsive" emulation at **400 px wide** (`home_responsive_animation.mp4`, 5.9 s, and one still of the Brand Story capability cards). Everything else is a *general responsive design* chosen by the implementer, as agreed with the user. **No breakpoint threshold was observed.** Do not claim one; pick a placeholder (suggested: 1024 and 768 as layout switches, 640 as the point where the Home hero switches to the mobile slider) and tell the user it is a placeholder.

**Rule per page (user instruction):**
| Page | Responsive rule |
|---|---|
| Home | **Only the first three visuals (the hero sequence) follow the supplied video.** Every other section: general responsive design. |
| Brand Story | **Only the five capability cards (Solar, Wind, Storage System, Electrification, Hydrogen) follow the supplied screenshot.** Everything else: general responsive design. |
| C&I PV, Residential, Sustainability | General responsive design (§8.3) |

### 8.1 Home, hero sequence at mobile (400 px) — **Observed in video** unless marked
- **Header on mobile [O]:** white bar, ≈ 54 CSS px tall [E, measured from a 1.25× scaled capture]. Left: India flag icon only (the word "India" is dropped). Centre: SUNGROW orange logo (≈ 112 px wide [E]). Right: search icon and hamburger (three-line) icon, dark grey. The desktop second row (nav labels) is gone; navigation lives behind the hamburger (drawer contents [U]).
- **Hero area:** full-width, fills the viewport below the header (≈ 100 vh minus header [E]). It is a **horizontal slider** (not the desktop video / scroll sequence).
- **Slide A:** forest-with-mist photograph (the "GATHERING GOODWILL / FOR / A BETTER WORLD" image, white centred text, wrapped onto three lines: "GATHERING GOODWILL", "FOR", "A BETTER WORLD"), vertically centred around 40–45 % of the slide height, light weight uppercase, ≈ 18–20 px [E].
- **Slide B:** the blue-sky banner: top line "Sungrow No.1 in Global Inverter Bankability" (white, ≈ 20 px), two small columns "Fortune Future 69 | AAA MSCI ESG Rating in 2025" (the screenshot's text), large metallic copper "**75 GW⁺**" and "India Shipments of PV Inverters", with inverter cabinets across the bottom. **The image is cropped on both sides at 400 px** (the headline is visibly cut: "…ow No.1 in Global Inverter Ban…"), so it is rendered as `object-fit: cover` with a centre crop in a tall (≈ 400 × 810 px) frame, **not** re-laid-out as a mobile variant. If a dedicated mobile image exists it was not seen [U].
- **Behaviour [O]:** auto-advancing, **looping**: Slide A → (slides left, ≈ 0.4–0.5 s ease) → Slide B → (slides left again) → Slide A. In the recording the banner is held ≈ 3.5 s and the forest ≈ 1 s before leaving (the recording starts mid-cycle, so the true dwell on Slide A is [U], assume ≈ 3.5–4 s). The incoming slide pushes the outgoing one left (translate-X, no crossfade). No pagination dots, arrows or captions were visible [O]. Touch swipe: not tested [U], add as a normal progressive enhancement.
- **Back-to-top on mobile [O]:** larger white circle (≈ 56 px) with a soft shadow and an orange up-arrow, fixed bottom-right (≈ 16 px margin). Present over the hero from the first frame. (Desktop equivalent is a smaller outlined circle.)
- **Interpretation to confirm:** the user said "only the first 3 images" follow the video. The desktop page shows three visuals in sequence: (1) hero video with "Leading us onward", (2) the "GATHERING GOODWILL" forest image, (3) the 75 GW banner. The mobile video shows **two** slides (2 and 3). Assumption: on mobile, visual 1 (hero video) is **not** shown; confirm.
- **Everything below the hero on Home:** general responsive design (§8.3).

### 8.2 Brand Story, capability cards at mobile (400 px) — **Observed in screenshot (collapsed state only)**
- Cards become a **vertical stack of full-width horizontal rows**, order Solar, Wind, Storage System, Electrification, Hydrogen.
- Page background light grey (≈ #f7f7f7); rows are white, rounded (≈ 16 px [E]), side margin ≈ 20 px, vertical gap ≈ 10 px, row height ≈ 70 px [E, from a 1.25× scaled capture].
- Row layout: orange line icon at left (≈ 24 px, starts ≈ 43 px inside the row), label in black medium weight (≈ 15–16 px) to its right, and a **circular outlined "+" button** (≈ 24–28 px, grey 1 px border) at the right edge, vertically centred (on desktop it sits at the bottom centre).
- Section headings below ("Bridge to A Sustainable Future", ≈ 24 px, centred, grey) keep the desktop styling at smaller size.
- **Expanded state: not provided [U].** Proposed (flag to user as an assumption): tapping a row (or its "+") expands it inline to show the same link list as the desktop hover (e.g. Solar → PV System, Floating PV System, Smart Energy Products, Sungrow Renewables), the "+" becomes "−", only one row open at a time, ≈ 300 ms height transition. The desktop hover-expand does not apply on touch.
- Rest of the page: general responsive design (§8.3).

### 8.3 General responsive design (all remaining content, and the other three pages)
These are design decisions, not observations. Keep them simple and consistent.

| Aspect | Desktop (≥ 1280) | Tablet (768–1279) | Mobile (< 768) |
|---|---|---|---|
| Header | Two rows, mega-menus | Same as mobile (flag, logo, search, hamburger) | Flag icon only, logo, search, hamburger (matches §8.1) |
| Mobile nav drawer | n/a | Full-height drawer; top-level items as accordions | Same |
| Hero images/video (C&I, Residential, Sustainability, Brand Story) | Full-bleed, fixed aspect | Shorter, `object-fit: cover`, text left-aligned | Height ≈ 60–70 vh, text wraps, `object-position` centre |
| Section headings | ≈ 40 px | ≈ 32 px | ≈ 24–28 px |
| Two-column splits (text/image, How Does It Work?) | Side by side | Stack, image first | Stack |
| Card rows (products, cases, news, reports, honors, commitments) | 3–5 across | 2 across | 1 across; carousels become swipe |
| Home counters | 5 across | 3 + 2 | 2 across or vertical list |
| Home scenario tabs | Pill tab bar | Pill tab bar | Horizontally scrollable pill bar |
| Home "Greener Tomorrow" panels | Text left, image right | Stack | Stack, image on top |
| Strategy tabs (Sustainability) | 5 across | Horizontally scrollable | Horizontally scrollable; stat bar 2×2 |
| Reports carousel | Cover + text side by side | Same | Stack (cover above text) |
| Milestone slider (Brand Story) | ≈ 2.5 cards visible | 2 | 1 + peek, swipe |
| Contact form | Heading left, form right | Stack | Stack, single-column fields |
| Footer | 5 columns | 3 + 2 | Stacked or accordion; copyright row stacks |
| Videos | Autoplay muted loop (assumed) | Same | Same; do not preload on mobile |
| Overflow | No horizontal page scroll at any width | | |
Use fluid type (`clamp`) and `max-width: 100%` images; touch targets ≥ 44 px; honour `prefers-reduced-motion`. Breakpoint values are placeholders [U].

## 9. Animation and interaction matrix (Deliverable E)

| Page | Element | Trigger | Initial → Final | Timing | Mobile | Confidence |
|---|---|---|---|---|---|---|
| All | Header nav row | Scroll direction | Row 2 visible ↔ hidden | ~300 ms [E] | [U] | O (behaviour) / E (timing) |
| All | Back-to-top | Scroll past hero | Hidden → visible; click scrolls to 0 | [U] | [U] | O |
| Home | Hero slider (mobile only, 400 px) | Auto-advance, loop | Forest slide → 75 GW banner → forest | ≈ 0.4–0.5 s slide-left; dwell ≈ 3.5 s [E] | This row is the mobile behaviour | O |
| Login | Eye icon / Login button | Click / valid input | Hidden ↔ visible password; button idle grey → enabled | [U] | [U] | U |
| Home | Stats numbers | Enter viewport | 0 → 46 GW / 6 / 19+ (NO.1 and AAA static) | ~1–2 s [E] | [U] | O (end values) |
| Home | "Clean Power" / "Why Sungrow" paragraphs | Scroll | Light grey → dark text | scroll-linked [E] | [U] | O |
| Home | Hero banner | Scroll | Narrow blue panel → full-width rounded banner | scroll-linked [E] | [U] | E |
| Home | Customer-scenario tabs | Click | Background + title + links swap | ~400 ms fade [E] | [U] | O / E |
| Home | Commitment cards | Scroll | Horizontal slide-in from right | scroll-linked [E] | swipe [U] | E |
| Home | Greener Tomorrow panels | Scroll | Sticky stacked replacement | scroll-linked [E] | [U] | E |
| Brand Story | Mission paragraph | Scroll | Faded → dark | scroll-linked | [U] | O |
| Brand Story | 5 capability cards | Hover | Card enlarges, icon scales, links fade in | ~300–400 ms [E] | tap [proposal] | O |
| Brand Story | Milestone slider | Click arrows/drag | Slide next/prev | [U] | swipe | O (arrows present) |
| Brand Story | Video caption | Scroll | Reveal text over video | [E] | [U] | E |
| Sustainability | Sticky sub-nav | Scroll | Fixed under header; active underline follows section | [E] | [U] | O |
| Sustainability | Strategy tabs | Click | Photo + 4 stats swap; underline moves | ~300–500 ms fade [E] | [U] | O |
| Sustainability | Reports carousel | Click arrows | Next/prev slide; tab swaps dataset | [U] | swipe | O |
| Sustainability | Honors slider | Arrows | Slide | [U] | swipe | E |
| C&I / Residential | Hero text | Load | Faded → white (reveal) | [U] | [U] | E (screenshot only) |
| C&I / Residential | "How Does It Work?" rows | Click | Expand/collapse or tab swap | [U] | [U] | U |
| C&I | 3 videos | In view | Autoplay muted loop [assumed] | — | [U] | U |

Reduced-motion behaviour: not observed [U]. Recommend respecting `prefers-reduced-motion`.

---

## 10. Asset manifest (Deliverable D)

Base for images: `https://official-oversears-file.sungrowpower.com/page-assets/`; video: `…/page-assets-process/`; product images: `…/news-images/`; UI: `…/website/_next/static/media/`. All **[O from page markup]** unless noted. Dimensions: [U] for all (no network metadata). Mobile variants: [U].

| ID | Page | Section | Type | Filename | Treatment | Confidence |
|---|---|---|---|---|---|---|
| H-01 | Home | Hero | video | `page-assets-process/78a8c56d-634f-4ff5-830f-6121131fd0b2.webm` | full-bleed hero | High |
| H-02 | Home | Hero | poster | `2223f2bc-4e90-4dae-9007-6f692ec1930d.jpeg` | video poster | High |
| H-03 | Home | Stats | icons ×5 | `142b0ff7…svg`, `f49dbb09-69ab-4af5-bfc1-f4d8fde4a4f0.svg`, `7d449bdc-2800-4447-b6eb-65bffe212c7b.svg`, `f72e870b-aae8-4ee7-b2dd-709657d0c8f6.svg`, `701fe861-3fed-4d68-9a52-b2b638fcbbc1.svg` (first: `142b0ff7-280b-4505-846d-44f92568bc2e.svg`) | inline icons | High |
| H-04 | Home | Scenarios | bg photo | `d1a5c459-4138-4fa0-a7ae-3b9cfb030504.jpg` | full-bleed, tab-dependent | Medium (other tab images not identified) |
| H-05 | Home | Commitment | cards ×4 | `e37a79ea-b0ac-4e40-97d0-3795846747b8.png`, `1f77f7c2-4739-4736-8625-6eb8094701d8.png`, `2735e941-0dd6-4b49-ae6e-c2423c5cc060.png`, `7639e445-ec50-4651-8b20-294e39c42b92.png` | rounded cards | High |
| H-06 | Home | News | `73fb1f86-55a8-4b57-9556-113cbac49342.jpg`, `1bfbbc81-67f9-4739-9d12-a47c53e4ee54.png`, `9fd8ede7-0164-42bc-8a50-c8b97e2f59bc.jpg` | news thumbs (2 of 5 + stats banner image missing) | Medium |
| C-01 | C&I | Hero | `14a7fb18-eb97-4752-b598-c5a6743d920a.jpg` | hero | High |
| C-02 | C&I | Flexible | `c88fb058-bbd6-41b5-b303-1383ea96f7fd.png` | rounded wide | High |
| C-03 | C&I | Safety/Optimization/O&M | video ×3 | `c3f36bb2-b776-43ac-bb15-3cad05e22521.webm`, `883461c0-8a96-4d2d-8631-d6a3d3e26fea.webm`, `989a636d-e31c-4b92-a282-9844c7fcb1a9.webm` | wide rounded video | High |
| C-04 | C&I | Install | `8401893d-e04e-48da-89dc-e2d6d806b35a.png` | full-bleed | High |
| C-05 | C&I | How it works | `c9ff94b3-fb90-4368-94aa-617795fc4e10.png` (main), `c5db4644-fb81-4c78-a4a9-e587b873494f.png` (inverter thumb), `567b8603-1072-496f-9583-363854a178af.jpg` (iSolarCloud thumb) | split | Medium (thumb mapping inferred) |
| C-06 | C&I | Products | `news-images/06ad25d3-2dfd-4da3-a32d-d716a23c90c8.png`, `…/e81ecbf7-0c2b-45b5-a579-54db44f4a1a0.png`, `…/5280c47c-006f-425b-b8a0-a29722434cc8.png` | product cards | High |
| C-07 | C&I | Cases | 2 case images | not present in markup | **Missing** |
| R-01 | Residential | Hero | `608f64db-b3b6-41f2-8159-40d3cd88357c.jpg` | hero | High |
| R-02 | Residential | Story blocks | `8e62e317-a425-4b0c-8bd1-e0e54dc2f8b6.jpg`, `e39c7e2f-00e5-4bdb-af39-969dde7d4e22.png`, `071f278c-c280-4ca5-a9ce-8ab4b7c564a5.jpg`, `98dbe5e1-96d1-4e3a-a8b4-97cf828c4a23.jpg`, `2aed9f68-1f61-4da9-b288-b7ea5beecef4.jpg` | rounded wide | High |
| R-03 | Residential | How it works | `9587b228-c257-42a0-aa0d-aadfb724e600.JPG`, `bf4a653f-e12d-442f-9efd-b268ec4ef41b.png`, `914e714d-b213-45ab-9346-8e2266fd0561.png` | split | Medium |
| R-04 | Residential | Service | `c415e170-1bcc-444c-961f-63a25a32c70a.png` | banner w/ overlay | High |
| R-05 | Residential | Product | `news-images/5280c47c-006f-425b-b8a0-a29722434cc8.png` | card | High |
| R-06 | Residential | Cases | case images | not in markup | **Missing** |
| B-01 | Brand | Hero | `page-assets-process/c97a6b8b-b026-4e37-8c2e-810c9b631490.webm` | full-bleed video | High |
| B-02 | Brand | Cards | `c55f4662-f6e4-4c67-b890-2c01c749ecf3.png`, `a343664e-9ac6-465e-bff7-1e576ac16b42.png`, `cb47dec7-fab1-48ea-afbc-e24cb492468c.png`, `69f2dda1-9d7b-4ee8-912a-1860ae2dbef9.svg`, `c37700f1-2a0e-4861-a29e-4b572a6b0f42.png` | icons (orange) | High |
| B-03 | Brand | Bridge | `page-assets-process/82b590fe-a965-459e-be2d-ff4a552d9977.webm` | full-bleed video | High |
| B-04 | Brand | Together | `4cf674b4-a5eb-4db5-a4b6-8152a51f9153.jpg` | rounded wide | High |
| B-05 | Brand | Milestones | `1303c32a-ac0e-4634-86e9-f13a1659a2d2.png` | bg image | High |
| S-01 | Sustainability | Hero | `a839ab4c-3e3d-4e8f-8fad-720bdd468644.png` | hero | High |
| S-02 | Sustainability | Targets | `43be3704-8756-4d9b-875e-825226ec3e5e.svg`, `225bbf6a-95d2-4d5f-a3c2-8a1437529688.svg`, `cb8b38d2-cde9-40c3-883b-49de469f619f.svg` | icons | High |
| S-03 | Sustainability | Governance / Strategy | `82e0a428-4d3d-4e77-bb51-ffbb7ddd17fc.jpg`, `9afb16cb-ddd4-4172-a2c2-bd149fbe4acb.jpg` | diagrams | Medium (which is which not confirmed) |
| S-04 | Sustainability | Strategy tabs | `c6bdc140…`, `5365bda3-87f1-4ae3-95c2-8b26205cdba5`, `c8620cbd-9f50-48e3-8dc5-5081a3971715`, `f6fcd283-676e-4ddd-9e90-e6bde6f0221a`, `1f5be03a-fc2b-439f-8111-b8189b945e40` (.png each; first full ID `c6bdc140-5232-435d-a19b-2ef9a0aa1d3e`) | photo per tab | High |
| S-05 | Sustainability | Reports | `2fa6fda3-f2f2-4620-aa34-1bded2417913.png`, `8f2523b3-49e4-40b8-b8b6-ce96b5121d5a.png`, `cf17bcb3-1ae5-422d-8903-326737a3acab.png`, `8dc96a5e-6bdb-4e85-a808-4749320070b7.png`, `d949be09-7f2e-4fca-a8d8-f11797eb9151.png`; policies `5c504040-3f39-462f-8f60-b08b39b02389.jpg`, `314064a3-1434-47f2-aec7-8202e05857d9.jpg`, `96b3fbaf-70cc-4677-89f6-3be866efb2f0.jpg` | covers | High |
| S-06 | Sustainability | Honors | bg `3d08a0cb-637f-4818-b6d1-05b603de558b.png`; logos `66a5d067-db76-400a-b502-8716333c8ade.png`, `1a3055ff-2eef-409d-8f19-1f04ca906763.png`, `e2bbd3cd-07da-4fa4-b6ed-cd0794678e01.png`, `650a72ff-baf1-4d07-a472-c3ea51e08c0b.png` | cards | High |
| S-07 | Sustainability | News | `c48bead9-b03f-48cd-90b3-cfeacac25447.png`, `a195e679-bcaf-4906-b017-0623ac53ef0b.jpg`, `a6e0c0a6-e4c3-4891-87fe-c58e7f2ef892.jpg` | cards | High |
| S-08 | Sustainability | Contact | `318a2075-cf26-4d98-a918-ae6807ad9c92.jpg` | banner | High |
| X-01 | All | Header/Footer | `website/_next/static/media/logo.84e5bb0c.svg`; flag `page-assets/28dafe10-f648-4fcf-a8af-ba5d0e1ef141.svg`; social `*_gray.*.svg` | UI | High |
| X-02 | Home | Stats banner (75 GW), news thumbs 1 & 4–5, Home hero mid-frames | not identified in markup | **Missing** — obtain from DevTools |

Note: some IDs are abbreviated (`…`) where the full UUID is easily recovered from the live markup; the implementation agent must use the full UUIDs from the live page source / DevTools Network panel.

---

## 11. Design token inventory (Deliverable C) — all [E]

| Token | Proposed value | Confidence |
|---|---|---|
| `--color-brand-orange` | **#FE7900** | Measured (pixel-sampled from the login screenshot; logo and orange button) |
| `--color-login-bg` | #D9D9D9 | Measured (pixel sample) |
| `--color-btn-dark` | #606060 | Measured (pixel sample) |
| `--color-title` | #09090B | Measured (pixel sample) |
| `--color-input-line` | #B2B2B2 | Measured (pixel sample) |
| `--color-text` | #333 | Estimated |
| `--color-text-muted` | #666–#888 | Estimated |
| `--color-bg` | #fff | Estimated |
| `--color-bg-alt` | #f4f4f4 | Estimated |
| `--font-sans` | Montserrat-like geometric sans | Unverified |
| `--radius-card` | 16–24 px | Estimated |
| `--radius-btn` | 4–8 px (pills on some outlined buttons) | Estimated |
| `--container` | ~1200–1400 px | Estimated |
| Heading scale | H2 ≈ 40 px/light; H3 ≈ 24–28 px; body ≈ 14–16 px; footer ≈ 12 px | Estimated |
| Spacing | section padding ≈ 80–120 px vertical at 1920 | Estimated |

---

## 12. Component inventory (Deliverable C)

**Shared:** SiteHeader (+MegaMenu, +MobileNav), SiteFooter, FollowBar, BackToTop, SectionHeading, OutlinedButton / SolidButton, ContactForm (C&I + Residential), CaseCard (C&I, Residential), ProductCard (C&I, Residential), SelectorAccordion "How Does It Work?" (C&I, Residential), ScrollRevealText (Home ×2, Brand Story), Stat/Counter (Home, Sustainability stat bar), HeroMedia (all).
**Page-specific:** Home — ScenarioTabs, CommitmentCarousel, StackedPanels, NewsGrid; C&I — VideoFeatureBlock, CaptionPair; Residential — SplitFeature, ServiceBanner; Brand Story — CapabilityCard (hover-expand), FullBleedVideo, MilestoneSlider; Sustainability — SubNav (sticky), ClimateTargets, GovernancePyramid, StrategyTabs, ReportCarousel, HonorsSlider.
**Login page:** LoginCard, UnderlineInput, PasswordField (eye toggle), RoundCheckbox, DividerOr, InlineNotice.
Do not merge unrelated components (e.g., StrategyTabs and ScenarioTabs differ in structure).

---

## 13. Priorities (Deliverable H)

**P1:** header/footer + routing; hero media on all pages; section order + exact copy + original assets; Home counters and scenario tabs; Brand Story card hover; Sustainability strategy tabs, reports carousel, sub-nav; contact form layout.
**P2:** scroll-linked text reveals, stacked panels, horizontal commitment scroller, milestone slider, mega-menu visuals, header hide/show on scroll, responsive layouts.
**P3:** subtle easing refinements, banner scale-in on Home, hero text reveals on solution pages.
**Risks:** missing assets (X-01/X-02, case images); mega-menu visuals unknown; responsive entirely proposed; font/colour unverified; videos are large (`.webm`) — lazy-load.

---

## 14. Validation plan (Deliverable J partial)

Compare at **1920×912** (the only evidenced viewport): initial viewport, full-page screenshot vs supplied PNGs, section heights, content widths, image crops, header two-row/one-row states, tab/hover states from recordings. Check counters end at 46/6/19+; Brand-Story hover expansion; Sustainability tab content. No single similarity score; review by region. Do **not** claim 100% fidelity.

### Pre-coding checklist
| Item | Status |
|---|---|
| 5 pages fetched live | ✅ |
| All section order/copy captured | ✅ |
| Header two-row scroll behaviour | ✅ (recordings) |
| Mega-menu content/links | ✅; visuals ❌ |
| Footer | ✅ |
| Counters end values (Home) | ✅ |
| Tab behaviours (Home, Sustainability) | ✅ |
| Brand-card hover | ✅ |
| C&I / Residential animations | ❌ (no recordings; per user: none assumed) |
| Computed CSS / fonts / colours | ❌ |
| Login screen layout/colours | ✅ (screenshot); behaviour ❌ |
| Login page desktop layout | ✅ (screenshot) |
| Login behaviour / states / mobile | ❌ |
| Home hero at 400 px | ✅ (video) |
| Brand Story cards at 400 px (collapsed) | ✅ (screenshot); expanded ❌ |
| Other breakpoints / thresholds | ❌ (general design, placeholders) |
| Video attributes (autoplay/loop/poster) | ❌ except Home poster |
| Missing images (listed X-02, C-07, R-06) | ❌ |
| Form validation / select options | ❌ |

---

## 15. Open questions (Deliverable I)
1. Can you capture computed font family/sizes/colours (DevTools → Computed) for: header, H2, body, buttons, orange accent? Or accept estimates?
2. Missing images: Home stats banner (75 GW), Home news thumbs, case-card thumbnails (C&I, Residential). Can you provide DevTools Network image lists or screenshots at full size?
3. Responsive: confirm the Home hero mobile slider shows only the two slides seen in the video (forest text image, 75 GW banner), and that the hero video is omitted on mobile. Provide the expanded state of a Brand Story card if you want it exact.
4. Contact form: static UI only, or client-side validation? Select-option lists needed?
5. Sustainability sub-nav: confirm smooth-scroll to on-page sections.
6. "How Does It Work?" selector: accordion or tab, and does the left image swap? A short recording would settle it.
7. Login: confirm standalone page (not modal), mock validation only, and that Sign Up / Forget Password / email verification stay inert or external.
8. Mega-menu: do you want the full mega-menus built (with external links), or just the labels + five local links?
