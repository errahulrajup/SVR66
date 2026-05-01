import { useEffect } from "react";
import { useNavigate } from "react-router";

const PILLARS = [
  { h: "Built for Scale",     p: "Distribution is the strategy, not the afterthought." },
  { h: "B2B & HoReCa Ready",  p: "Bulk supply, trade terms, kitchen-grade formats." },
  { h: "100% Plant-Based",    p: "No dairy. No compromise on taste or texture." },
  { h: "India-Focused",       p: "Familiar formats, better execution, local roots." },
];

const VALUES = [
  { icon: "🏆", h: "Taste Wins First",          p: "If it doesn't taste better, it doesn't matter. Taste is the only entry point to repeat demand — and we engineer every product around this truth." },
  { icon: "🇮🇳", h: "Built for Indian Kitchens", p: "Familiar formats. Better execution. Designed around the way India actually cooks and eats — from street food stalls to five-star kitchens." },
  { icon: "📈", h: "Scale Matters",             p: "Distribution is the strategy. A great product without reach is a missed opportunity. We build supply chains that deliver, every time." },
];

const TIMELINE = [
  { year: "2021", title: "Company Founded", desc: "Srivriddhi Enterprise was established with a clear mission: bring premium plant-based alternatives to the Indian market." },
  { year: "2022", title: "First Product Launch", desc: "PlantSmör Butter launched to select HoReCa partners in Madhya Pradesh, receiving outstanding feedback from professional chefs." },
  { year: "2023", title: "Product Line Expansion", desc: "Cooking Cream and Mayonnaise added to the lineup. Retail distribution partnerships established across central India." },
  { year: "2024", title: "National Growth", desc: "Expanded to pan-India distribution. Soya Chaap and frozen vegetables added to cater to broader plant protein demand." },
  { year: "2025+", title: "Global Ambition", desc: "Building toward export markets and establishing Srivriddhi as India's leading plant-based food enterprise." },
];

export function AboutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "About — Srivriddhi Enterprise";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Srivriddhi Enterprise is a premium plant-based food brand built for Indian kitchens and global ambition.");
  }, []);
  const go = (path: string) => { navigate(path); window.scrollTo({ top: 0, behavior: "auto" }); };

  return (
    <>
      <style>{`
        .ab-hero { position: relative; width: 100%; height: 100vh; min-height: 600px; overflow: hidden; display: flex; align-items: flex-end; }
        .ab-hero__bg { position: absolute; inset: 0; background-image: url('/images/about.webp'); background-size: cover; background-position: center 20%; transform: scale(1.02); transition: transform 8s ease; }
        .ab-hero:hover .ab-hero__bg { transform: scale(1.055); }
        .ab-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.60) 38%, rgba(5,5,5,0.22) 65%, rgba(5,5,5,0.06) 100%); }
        .ab-hero__glow { position: absolute; bottom: 0; left: 0; right: 0; height: 200px; background: linear-gradient(to top, rgba(255,193,7,0.07), transparent); pointer-events: none; }
        .ab-hero__content { position: relative; z-index: 2; width: 100%; max-width: var(--container-max); margin: 0 auto; padding: 0 80px 92px; }
        .ab-hero__watermark { position: absolute; top: 50%; right: 8%; transform: translateY(-50%); width: min(380px, 40vw); height: min(380px, 40vw); opacity: 0.05; pointer-events: none; z-index: 1; }
        .ab-hero__sub { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(1.1rem, 1.7vw, 1.5rem); line-height: 1.55; color: rgba(255,255,255,0.65); max-width: 560px; margin-top: 18px; }
        .ab-sec { padding: 88px 0; border-bottom: 1px solid var(--color-border); }
        .ab-sec--alt { background: var(--color-bg-secondary); }
        .ab-pillars { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 40px; }
        .ab-pillar-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 24px 20px; transition: border-color 0.25s, box-shadow 0.25s; }
        .ab-pillar-card:hover { border-color: var(--color-border-yellow); box-shadow: 0 0 24px rgba(255,193,7,0.07); }
        .ab-values { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 40px; }
        .ab-timeline { display: flex; flex-direction: column; gap: 0; margin-top: 40px; position: relative; }
        .ab-timeline::before { content: ''; position: absolute; left: 80px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, var(--color-primary), var(--color-primary), transparent); opacity: 0.25; }
        .ab-timeline-item { display: grid; grid-template-columns: 160px 1fr; gap: 32px; padding: 28px 0; border-bottom: 1px solid var(--color-border); position: relative; }
        .ab-timeline-item:last-child { border-bottom: none; }
        .ab-timeline-year { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--color-primary); letter-spacing: 0.05em; line-height: 1; padding-top: 2px; text-align: right; }
        .ab-cta-band { padding: 88px 0; background: linear-gradient(135deg, #111 0%, #0B0B0B 100%); position: relative; overflow: hidden; }
        .ab-cta-band::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,193,7,0.05) 0%, transparent 70%); pointer-events: none; }
        @media (max-width:1200px) { .ab-hero__content { padding: 0 56px 80px; } }
        @media (max-width:1024px) { .ab-hero__content { padding: 0 40px 68px; } .ab-sec { padding: 64px 0; } .ab-pillars { grid-template-columns: repeat(2,1fr); } .ab-timeline::before { left: 60px; } .ab-timeline-item { grid-template-columns: 120px 1fr; gap: 24px; } }
        @media (max-width:768px) { .ab-hero { height: 100dvh; min-height: 560px; } .ab-hero__content { padding: 0 20px 56px; } .ab-hero__watermark { display: none; } .ab-sec { padding: 52px 0; } .ab-values { grid-template-columns: 1fr; } .ab-pillars { grid-template-columns: 1fr 1fr; } .ab-timeline::before { display: none; } .ab-timeline-item { grid-template-columns: 1fr; gap: 8px; } .ab-timeline-year { text-align: left; font-size: 26px; } .ab-cta-band { padding: 64px 0; } }
      `}</style>

      <div style={{ background: "var(--color-bg-main)", paddingTop: "var(--header-h)" }}>

        {/* Hero */}
        <section className="ab-hero">
          <div className="ab-hero__bg" />
          <div className="ab-hero__overlay" />
          <div className="ab-hero__glow" />
          <div className="ab-hero__watermark">
            <img src="/images/logo.png" alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>
          <div className="ab-hero__content">
            <p className="sec-label anim-0" style={{ marginBottom: 18 }}>Our Story</p>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 7.5vw, 96px)", lineHeight: 0.90, letterSpacing: "0.03em", color: "#FFFFFF", marginBottom: 0 }} className="anim-1">
              SRIVRIDDHI<br /><span style={{ color: "var(--color-primary)", textShadow: "0 0 40px rgba(255,193,7,0.4)" }}>ENTERPRISE.</span>
            </h1>
            <p className="ab-hero__sub anim-2">
              A premium Indian plant-based food company built around appetite,
              quality, and the belief that taste should never be compromised.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="ab-sec ab-sec--alt">
          <div className="container-custom">
            <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              <p className="sec-label" style={{ marginBottom: 14 }}>Our Mission</p>
              <h2 className="sec-heading sec-heading--lg" style={{ marginBottom: 28 }}>
                Plant-Based. Premium. <span style={{ color: "var(--color-primary)" }}>Purposeful.</span>
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.1rem, 2vw, 1.45rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: 28 }}>
                Srivriddhi Enterprise was founded with a single conviction: that plant-based food in India
                deserves to be built with the same rigor, quality, and ambition as the world's best food brands.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.9, color: "rgba(255,255,255,0.4)", maxWidth: 600, margin: "0 auto" }}>
                We don't make compromises for plants. We build better products — and we prove it every time
                a chef, retailer, or customer chooses us again.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="ab-sec">
          <div className="container-custom">
            <p className="sec-label" style={{ marginBottom: 14 }}>What We Stand For</p>
            <h2 className="sec-heading" style={{ marginBottom: 0 }}>Our Four Pillars</h2>
            <div className="sec-divider" />
            <div className="ab-pillars">
              {PILLARS.map((p) => (
                <div key={p.h} className="ab-pillar-card">
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-primary)", marginBottom: 14, boxShadow: "0 0 8px rgba(255,193,7,0.4)" }} />
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{p.h}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{p.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="ab-sec ab-sec--alt">
          <div className="container-custom">
            <p className="sec-label" style={{ marginBottom: 14 }}>Our Values</p>
            <h2 className="sec-heading sec-heading--lg" style={{ marginBottom: 0 }}>How We Think.</h2>
            <div className="sec-divider" />
            <div className="ab-values">
              {VALUES.map((v) => (
                <div key={v.h} className="svc-card">
                  <div className="svc-card__icon">{v.icon}</div>
                  <h3 className="svc-card__title">{v.h}</h3>
                  <p className="svc-card__body">{v.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="ab-sec">
          <div className="container-custom">
            <p className="sec-label" style={{ marginBottom: 14 }}>Our Journey</p>
            <h2 className="sec-heading sec-heading--lg" style={{ marginBottom: 0 }}>Built Over Time.</h2>
            <div className="sec-divider" />
            <div className="ab-timeline">
              {TIMELINE.map((t) => (
                <div key={t.year} className="ab-timeline-item">
                  <div className="ab-timeline-year">{t.year}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{t.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ab-cta-band">
          <div className="container-custom" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <p className="sec-label" style={{ marginBottom: 20 }}>Partner With Us</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 700, color: "#FFFFFF", marginBottom: 16, lineHeight: 1.2 }}>
              Let's Build the Future<br /><span style={{ color: "var(--color-primary)" }}>of Food Together.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.8 }}>
              Whether you're a chef, retailer, or distributor — we want to work with people
              who believe great food can come from plants.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn--primary btn--lg" onClick={() => go("/contact")}>Get in Touch</button>
              <button className="btn btn--ghost btn--lg" onClick={() => go("/products")}>See Our Products</button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
