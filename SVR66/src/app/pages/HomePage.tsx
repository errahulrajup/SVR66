import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const HERO_SLIDES = [
  {
    image: "/images/hero.webp", pos: "center top",
    overlay: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.60) 38%, rgba(5,5,5,0.20) 65%, rgba(5,5,5,0.05) 100%)",
  },
  {
    image: "/images/hero-2.webp", pos: "center center",
    overlay: "linear-gradient(to top, rgba(4,3,2,0.96) 0%, rgba(4,3,2,0.52) 40%, rgba(4,3,2,0.15) 72%, transparent 100%)",
  },
  {
    image: "/images/hero-3.webp", pos: "center center",
    overlay: "linear-gradient(to top, rgba(6,5,2,0.96) 0%, rgba(6,5,2,0.68) 40%, rgba(6,5,2,0.30) 68%, rgba(6,5,2,0.08) 100%)",
  },
];

const PRODUCTS = [
  { title: "PlantSmör Butter",        line: "Rich taste. Stable melt. Everyday performance.",    image: "/images/product-plant-based-margarine.webp", path: "/products/plant-based-margarine" },
  { title: "PlantSmör Cooking Cream", line: "Smooth texture. Heat stable. Professional finish.", image: "/images/product-vegan-cooking-cream.webp",    path: "/products/vegan-cooking-cream" },
  { title: "PlantSmör Mayonnaise",    line: "Thick texture. Stable emulsion. Kitchen-ready.",    image: "/images/product-vegan-mayonnaise.webp",       path: "/products/vegan-mayonnaise" },
];

const SERVICES = [
  { icon: "🏭", title: "B2B & HoReCa Supply",  body: "Bulk formats, trade terms, and kitchen-grade packaging — ready for hotels, restaurants, and catering operations across India." },
  { icon: "🌱", title: "100% Plant-Based",       body: "Every product is fully dairy-free, cholesterol-free, and crafted from plants without compromising taste or texture." },
  { icon: "📦", title: "Retail-Ready Products",  body: "Shelf-stable packaging, premium branding, and consistent quality designed to perform in modern trade and quick commerce." },
  { icon: "🚀", title: "Fast Distribution",       body: "Wide distribution network ensuring reliable supply to your kitchen or store. Never run out when it matters most." },
  { icon: "🔬", title: "R&D-Driven Quality",      body: "Every formula is tested for heat stability, emulsification, and taste before it ever reaches your kitchen." },
  { icon: "💬", title: "Dedicated Support",        body: "Direct access to our team — no bots, no delays. WhatsApp, call, or email. We respond in hours, not days." },
];

const STATS = [
  { num: "3+",   label: "Core SKUs",    sub: "Butter, Cream, Mayo" },
  { num: "B2B",  label: "HoReCa Ready", sub: "Bulk & trade supply" },
  { num: "100%", label: "Plant-Based",  sub: "No dairy. No compromise." },
  { num: "24h",  label: "Response",     sub: "Direct team access" },
];

const TESTIMONIALS = [
  { quote: "Srivriddhi's cooking cream is the only plant-based cream that holds up in our high-heat kitchen. Absolutely incredible performance.", author: "Chef Aditya Sharma", role: "Executive Chef, Leela Hotels" },
  { quote: "We switched our entire butter line to PlantSmör. The taste difference is negligible but the demand from our vegan guests has doubled.", author: "Priya Menon", role: "F&B Manager, Taj Hotels" },
  { quote: "Finally, a plant-based mayo that our team cannot tell apart from the original. We've been using it in our deli counter for 8 months.", author: "Rajan Kapoor", role: "Retail Director, Nature's Basket" },
];

const TICKER_ITEMS = [
  "Plant-Based","Heat Stable","HoReCa Ready","100% Vegan","No Dairy","Built for Kitchens","Premium Quality",
  "Plant-Based","Heat Stable","HoReCa Ready","100% Vegan","No Dairy","Built for Kitchens","Premium Quality",
];

export function HomePage() {
  const navigate = useNavigate();
  const [slide,  setSlide]  = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    document.title = "Srivriddhi Enterprise — Premium Plant-Based Foods";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Premium plant-based foods built for Indian kitchens, HoReCa operators, and premium retail.");
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => { setSlide(s => (s + 1) % HERO_SLIDES.length); setFading(false); }, 600);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (path: string) => { navigate(path); window.scrollTo({ top: 0, behavior: "auto" }); };

  return (
    <>
      <style>{`
        /* ── Hero ── */
        .hp-hero { position: relative; width: 100%; height: 100vh; min-height: 640px; overflow: hidden; display: flex; align-items: flex-end; }
        .hp-hero__bg { position: absolute; inset: 0; background-size: cover; background-repeat: no-repeat; }
        .hp-hero__bg--fading { opacity: 0; }
        .hp-hero__overlay { position: absolute; inset: 0; transition: background 0.6s ease; }
        .hp-hero__watermark {
          position: absolute; top: 50%; right: 8%;
          transform: translateY(-50%);
          width: min(420px, 45vw); height: min(420px, 45vw);
          opacity: 0.055;
          pointer-events: none; z-index: 1;
          animation: watermarkPulse 4s ease-in-out infinite alternate;
        }
        @keyframes watermarkPulse {
          from { opacity: 0.04; transform: translateY(-50%) scale(0.97); }
          to   { opacity: 0.08; transform: translateY(-50%) scale(1.03); }
        }
        .hp-hero__content {
          position: relative; z-index: 2; width: 100%;
          max-width: var(--container-max); margin: 0 auto; padding: 0 80px 92px;
        }
        .hp-hero__title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(44px, 7.5vw, 96px);
          line-height: 0.90; letter-spacing: 0.03em; color: #FFFFFF; margin-bottom: 22px;
        }
        .hp-hero__title em { font-style: normal; color: var(--color-primary); text-shadow: 0 0 40px rgba(255,193,7,0.4); }
        .hp-hero__sub { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(1rem, 1.6vw, 1.45rem); line-height: 1.55; color: rgba(255,255,255,0.68); max-width: 520px; margin-bottom: 36px; }
        .hp-hero__dots { position: absolute; bottom: 40px; right: 80px; z-index: 3; display: flex; gap: 8px; }
        .hp-hero__dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.25); border: none; cursor: pointer; padding: 0; transition: background 0.3s, transform 0.3s; }
        .hp-hero__dot--active { background: var(--color-primary); transform: scale(1.35); box-shadow: 0 0 8px rgba(255,193,7,0.5); }

        /* ── Ticker ── */
        .hp-ticker { overflow: hidden; background: #0A0A0A; border-top: 1px solid rgba(255,193,7,0.12); border-bottom: 1px solid rgba(255,193,7,0.12); }

        /* ── Sections ── */
        .hp-sec { padding: 88px 0; }
        .hp-sec--alt { background: var(--color-bg-secondary); }
        .hp-sec--border { border-bottom: 1px solid var(--color-border); }

        /* ── Standard inner ── */
        .hp-standard-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .hp-cta-block { background: linear-gradient(135deg, #1A1A1A 0%, #141414 100%); border: 1px solid rgba(255,193,7,0.18); border-radius: var(--radius-xl); padding: 40px; margin-top: 40px; position: relative; overflow: hidden; }
        .hp-cta-block::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 0% 50%, rgba(255,193,7,0.05) 0%, transparent 60%); pointer-events: none; }

        /* ── Section header row ── */
        .hp-sec-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; flex-wrap: wrap; gap: 16px; }

        /* ── Final CTA band ── */
        .hp-final-cta {
          padding: 88px 0;
          background: linear-gradient(135deg, #111111 0%, #0B0B0B 50%, #0F0B00 100%);
          position: relative; overflow: hidden;
        }
        .hp-final-cta::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,193,7,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Testimonials ── */
        .hp-testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        /* ── Responsive ── */
        @media (max-width:1200px) { .hp-hero__content { padding: 0 56px 80px; } .hp-hero__dots { right: 56px; } }
        @media (max-width:1024px) {
          .hp-hero__content { padding: 0 40px 68px; } .hp-hero__dots { right: 40px; }
          .hp-sec { padding: 64px 0; }
          .hp-standard-inner { grid-template-columns: 1fr; gap: 40px; }
          .hp-testimonials-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width:768px) {
          .hp-hero { height: 100dvh; min-height: 580px; }
          .hp-hero__content { padding: 0 20px 56px; } .hp-hero__dots { right: 20px; bottom: 28px; }
          .hp-hero__title { font-size: clamp(38px, 10vw, 64px); line-height: 0.88; }
          .hp-hero__sub { font-size: clamp(0.9rem, 3.5vw, 1.15rem); max-width: 100%; }
          .hp-hero__watermark { display: none; }
          .hp-sec { padding: 52px 0; }
          .hp-sec-header { flex-direction: column; align-items: flex-start; }
          .hp-cta-block { padding: 28px 20px; }
          .hp-final-cta { padding: 64px 0; }
          .hp-testimonials-grid { grid-template-columns: 1fr; }
        }
        @media (max-width:480px) { .hp-hero__content { padding: 0 16px 44px; } .hp-hero__dots { right: 16px; } }
      `}</style>

      <div style={{ background: "var(--color-bg-main)", paddingTop: "var(--header-h)" }}>

        {/* ═══ HERO ═══════════════════════════════════════════ */}
        <section className="hp-hero">
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className={`hp-hero__bg${slide === i && fading ? " hp-hero__bg--fading" : ""}`}
              style={{ backgroundImage: `url('${s.image}')`, backgroundPosition: s.pos, opacity: slide === i ? 1 : 0, transition: "opacity 0.6s ease" }} />
          ))}
          <div className="hp-hero__overlay" style={{ background: HERO_SLIDES[slide].overlay }} />

          {/* Logo watermark */}
          <div className="hp-hero__watermark">
            <img src="/images/logo.png" alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>

          {/* Bottom yellow glow */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top, rgba(255,193,7,0.06), transparent)", pointerEvents: "none", zIndex: 1 }} />

          <div className="hp-hero__dots">
            {HERO_SLIDES.map((_, i) => (
              <button key={i}
                className={`hp-hero__dot${slide === i ? " hp-hero__dot--active" : ""}`}
                onClick={() => { setFading(true); setTimeout(() => { setSlide(i); setFading(false); }, 300); }}
                aria-label={`Slide ${i + 1}`} />
            ))}
          </div>

          <div className="hp-hero__content">
            <p className="sec-label anim-0" style={{ marginBottom: 18, letterSpacing: "0.28em" }}>
              Premium Plant-Based Foods
            </p>
            <h1 className="hp-hero__title anim-1">
              BUILT FOR <em>KITCHENS.</em>
              <br />DRIVEN BY <em>TASTE.</em>
              <br />MADE FOR INDIA.
            </h1>
            <p className="hp-hero__sub anim-2">
              Plant-based fats and spreads engineered for chefs, HoReCa operators,
              and premium retail — where performance is non-negotiable.
            </p>
            <div className="anim-3" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn btn--primary btn--lg" onClick={() => go("/contact")}>
                Get Samples →
              </button>
              <button className="btn btn--ghost btn--lg" onClick={() => go("/products")}>
                Explore Products
              </button>
            </div>
          </div>
        </section>

        {/* ═══ TICKER ═══════════════════════════════════════════ */}
        <div className="hp-ticker">
          <div className="ticker-track">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} style={{ color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                {item}
                <span style={{ marginLeft: 32, color: "var(--color-primary)", opacity: 0.6 }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ═══ PRODUCTS ═══════════════════════════════════════════ */}
        <section className="hp-sec hp-sec--border">
          <div className="container-custom">
            <div className="hp-sec-header">
              <div>
                <p className="sec-label" style={{ marginBottom: 10 }}>The Core System</p>
                <h2 className="sec-heading sec-heading--lg">Products That Deliver.</h2>
                <div className="sec-divider" />
              </div>
              <button className="btn btn--blue btn--lg" onClick={() => go("/products")}>
                View All Products
              </button>
            </div>
            <div className="grid-3col">
              {PRODUCTS.map((item) => (
                <article key={item.title} className="prod-card">
                  <div style={{ overflow: "hidden" }}>
                    <img src={item.image} alt={item.title} loading="lazy" className="prod-card__img" />
                  </div>
                  <div className="prod-card__body">
                    <h3 className="prod-card__title">{item.title}</h3>
                    <div className="prod-card__accent" />
                    <p className="prod-card__line">{item.line}</p>
                    <span className="prod-card__tag">100% Vegan</span>
                    <div style={{ marginTop: 18 }}>
                      <button className="btn btn--outline btn--sm" onClick={() => go(item.path)} style={{ width: "100%" }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SERVICES / CAPABILITIES ═══════════════════════════ */}
        <section className="hp-sec hp-sec--alt hp-sec--border">
          <div className="container-custom">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p className="sec-label" style={{ marginBottom: 10 }}>Why Choose Us</p>
              <h2 className="sec-heading sec-heading--lg">Built for Every Scale.</h2>
              <div className="sec-divider" style={{ margin: "16px auto 0" }} />
            </div>
            <div className="grid-3col" style={{ gap: 20 }}>
              {SERVICES.map((svc) => (
                <div key={svc.title} className="svc-card">
                  <div className="svc-card__icon">{svc.icon}</div>
                  <h3 className="svc-card__title">{svc.title}</h3>
                  <p className="svc-card__body">{svc.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ OUR STANDARD + STATS ═══════════════════════════════ */}
        <section className="hp-sec hp-sec--border">
          <div className="container-custom">
            <div className="hp-standard-inner">

              <div>
                <p className="sec-label" style={{ marginBottom: 14 }}>Our Standard</p>
                <h2 className="sec-heading sec-heading--lg" style={{ marginBottom: 28 }}>
                  Post-Dairy Starts Here.
                </h2>
                <div className="pull-quote" style={{ marginBottom: 36 }}>
                  <p>Taste × Distribution × Clarity<span style={{ color: "var(--color-primary)", margin: "0 6px" }}>=</span>Repeat Demand</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", marginTop: 10, fontSize: 11, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                    If it does not taste better, it does not ship.
                  </p>
                </div>

                <div className="hp-cta-block">
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, lineHeight: 1.2, color: "#FFFFFF", marginBottom: 12 }}>
                    Ready to Switch?
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 22, lineHeight: 1.7 }}>
                    Better taste. Better performance. No compromise on quality.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button className="btn btn--primary" onClick={() => go("/contact")}>Request Samples</button>
                    <button className="btn btn--ghost" onClick={() => go("/products")}>View Products</button>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {STATS.map(s => (
                  <div key={s.label} className="stat-block"
                    style={{ display: "flex", alignItems: "center", gap: 24, padding: "22px 28px" }}>
                    <strong className="stat-block__num" style={{ minWidth: 80 }}>{s.num}</strong>
                    <div>
                      <span className="stat-block__label">{s.label}</span>
                      <span className="stat-block__sub">{s.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══════════════════════════════════════ */}
        <section className="hp-sec hp-sec--alt hp-sec--border">
          <div className="container-custom">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p className="sec-label" style={{ marginBottom: 10 }}>Trusted By</p>
              <h2 className="sec-heading sec-heading--lg">What Our Clients Say.</h2>
              <div className="sec-divider" style={{ margin: "16px auto 0" }} />
            </div>
            <div className="hp-testimonials-grid">
              {TESTIMONIALS.map((t) => (
                <div key={t.author} className="testi-card">
                  <div style={{ color: "var(--color-primary)", fontSize: 28, marginBottom: 16, lineHeight: 1 }}>"</div>
                  <p className="testi-card__quote">{t.quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--color-primary-soft)", border: "1.5px solid var(--color-border-yellow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--color-primary)", flexShrink: 0 }}>
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="testi-card__author">{t.author}</div>
                      <div className="testi-card__role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA BAND ═══════════════════════════════════════ */}
        <section className="hp-final-cta">
          <div className="container-custom" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            {/* Faded logo watermark */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 320, height: 320, opacity: 0.04, pointerEvents: "none" }}>
              <img src="/images/logo.png" alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </div>
            <p className="sec-label" style={{ marginBottom: 20, position: "relative" }}>Get Started Today</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, lineHeight: 1.15, color: "#FFFFFF", marginBottom: 18, position: "relative" }}>
              Ready to Go <span style={{ color: "var(--color-primary)" }}>Plant-Based?</span>
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6, position: "relative" }}>
              Talk to our team about bulk supply, samples, or trade terms.
              We respond within 24 hours.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <button className="btn btn--primary btn--lg" onClick={() => go("/contact")}>
                Request Samples →
              </button>
              <a href="https://wa.me/917565000365" target="_blank" rel="noopener noreferrer"
                className="btn btn--ghost btn--lg" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
