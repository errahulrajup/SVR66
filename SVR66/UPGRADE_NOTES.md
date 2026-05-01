# SVR20 Premium Upgrade — Srivriddhi Enterprise
## Release: May 2026

---

## What Changed

### Design System (`src/styles/index.css`)
- Full dark premium color system: `#0B0B0B` / `#1A1A1A` / `#111111`
- Yellow accent `#FFC107` strictly for CTA, glow, highlights — never on white
- CSS custom properties for every color, spacing, radius, shadow token
- Bebas Neue + Playfair Display + Cormorant Garamond + DM Sans type system
- Button system: `--primary`, `--ghost`, `--outline`, `--dark`, `--blue`
- `svc-card`, `prod-card`, `testi-card`, `stat-block`, `glass-card` component classes
- Scroll animations: `anim-0..4` fadeUp keyframes
- Logo glow utility: `.logo-glow` with `logoPulse` animation
- Dark scrollbar, yellow selection highlight
- WhatsApp float button class `.wa-float`

### Header (`src/app/components/Header.tsx`)
- Sticky glassmorphism: `backdrop-filter: blur(24px)`
- Yellow border on scroll, progressive transparency
- Logo pulse animation in navbar
- Brand name stacked layout: "Srivriddhi" / "ENTERPRISE"
- Animated hamburger (transforms to ×)
- Yellow CTA button "Get Samples →" in desktop nav
- Mobile menu with overlay backdrop

### Footer (`src/app/components/Footer.tsx`)
- Dark `#080808` background with yellow top border
- 3-column grid: brand story / nav / contact
- Social icon buttons with yellow hover glow
- WhatsApp float button integrated here
- Cormorant Garamond italic brand tagline

### HomePage (`src/app/pages/HomePage.tsx`)
- 3-slide auto-advancing hero with fade transition + dot controls
- Faded logo watermark (right side, `opacity: 0.055`)
- Bebas Neue hero title with yellow italic accents + text-shadow glow
- Yellow ambient bottom glow on hero
- Animated ticker/marquee with brand keywords
- Services grid using `.svc-card` with circular icons
- Stats row using `.stat-block` with Bebas Neue numbers
- Testimonials grid with `testi-card`
- Final CTA band with logo watermark + gradient background

### AboutPage (`src/app/pages/AboutPage.tsx`)
- Full-bleed dark hero with logo watermark
- Mission statement section
- 4-pillar brand cards
- Values section using `svc-card`
- Journey timeline (year / title / description)
- Partner CTA band

### ProductsPage (`src/app/pages/ProductsPage.tsx`)
- Sticky filter bar (All / Butter / Cream / Mayo)
- Featured split-layout product cards (image left, copy right)
- Benefit tags with yellow dot indicators
- Coming Soon grid with dashed borders
- Bottom sample request CTA

### ProductDetailPage (`src/app/pages/ProductDetailPage.tsx`)
- Dark breadcrumb bar
- Split layout: image panel (dark bg, watermark) + info panel
- Yellow badge for category
- Benefit tags, usage cards (home / professional)
- Related products grid

### ContactPage (`src/app/pages/ContactPage.tsx`)
- Full-bleed dark hero
- 3-step process banner
- Left: contact cards + WhatsApp CTA button
- Right: dark form card with select, textarea, validation
- Success state with check mark

### AdminPage (`src/app/pages/AdminPage.tsx`)
- Premium dark login screen with logo glow
- Password from `VITE_ADMIN_PASSWORD` env var (falls back to `plantsmor2026`)
- Dashboard: Products tab + Site Info tab
- Product CRUD: Add / Edit / Delete with form validation
- localStorage persistence
- JSON export button
- Thumbnail preview in product list
- Stock status badges (green / red)

### SEO / Meta (`index.html`)
- Full Open Graph + Twitter Card tags
- JSON-LD Organization schema
- Canonical URL
- Preload for hero.webp
- Google Fonts: Playfair Display, DM Sans, Bebas Neue, Cormorant Garamond
- `robots.txt` — disallows /admin
- `sitemap.xml` — all 7 public routes

---

## Setup Instructions

```bash
npm install
npm run dev
```

### Environment Variables (`.env`)
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_PASSWORD=your_secure_password
```

### Deploy (Vercel)
```bash
npm run build
vercel --prod
```
Set env vars in Vercel dashboard under Project Settings → Environment Variables.

---

## Admin Panel
URL: `/admin`  
Default password: `plantsmor2026`  
Set `VITE_ADMIN_PASSWORD` in `.env` before deploying to production.

---

## Color Reference
| Token | Value | Usage |
|---|---|---|
| Primary | `#FFC107` | CTA, glow, accents only |
| BG Main | `#0B0B0B` | Page background |
| BG Card | `#1A1A1A` | All card surfaces |
| Text Primary | `#FFFFFF` | Headlines |
| Text Secondary | `#B0B0B0` | Body copy |
| Border | `rgba(255,255,255,0.07)` | Default card border |
| Border Yellow | `rgba(255,193,7,0.25)` | Hover/active borders |
