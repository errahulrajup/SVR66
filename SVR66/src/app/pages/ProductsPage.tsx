import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

type CoreProduct = {
  key: "BUTTER" | "CREAM" | "MAYO";
  name: string;
  line: string;
  desc: string;
  benefits: string[];
  detailsPath: string;
  image: string;
  tag: string;
};

const coreProducts: CoreProduct[] = [
  {
    key: "BUTTER",
    name: "PlantSmör Butter",
    line: "Rich taste. Stable melt.",
    desc: "High heat stability with a smooth spread texture. Consistent results every time — for toast, cooking, and professional bakery use.",
    benefits: ["High Heat Stability", "Smooth Spread", "Consistent Results"],
    detailsPath: "/products/plant-based-margarine",
    image: "/images/product-plant-based-margarine.webp",
    tag: "Spreads",
  },
  {
    key: "CREAM",
    name: "PlantSmör Cooking Cream",
    line: "Smooth texture. Heat stable.",
    desc: "No curdling, consistent reduction, reliable in service. Designed for gravies, sauces, and professional kitchen finishing.",
    benefits: ["No Curdling", "Consistent Reduction", "Reliable in Service"],
    detailsPath: "/products/vegan-cooking-cream",
    image: "/images/product-vegan-cooking-cream.webp",
    tag: "Cooking",
  },
  {
    key: "MAYO",
    name: "PlantSmör Mayonnaise",
    line: "Thick texture. Stable emulsion.",
    desc: "No splitting, consistent batches, smooth finish. Built for sandwiches, dips, and quick service operations.",
    benefits: ["No Splitting", "Consistent Batches", "Smooth Finish"],
    detailsPath: "/products/vegan-mayonnaise",
    image: "/images/product-vegan-mayonnaise.webp",
    tag: "Condiments",
  },
];

const COMING_SOON = [
  { name: "PlantSmör Paneer",  line: "Firm texture. Clean taste. Kitchen-ready." },
  { name: "PlantSmör Cheese",  line: "Melt performance. Rich flavour. Reliable stretch." },
  { name: "PlantSmör Dahi",    line: "Smooth texture. Balanced taste. Everyday use." },
];

type FilterKey = "ALL" | "BUTTER" | "CREAM" | "MAYO";

export function ProductsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterKey>("ALL");

  useEffect(() => {
    document.title = "Products — Srivriddhi Enterprise";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Premium plant-based kitchen system: Butter, Cream, and Mayo.");
  }, []);

  const go = (path: string) => { navigate(path); window.scrollTo({ top: 0, behavior: "auto" }); };

  const visible = useMemo(
    () => filter === "ALL" ? coreProducts : coreProducts.filter(p => p.key === filter),
    [filter],
  );

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "ALL",    label: "All Products" },
    { key: "BUTTER", label: "Butter" },
    { key: "CREAM",  label: "Cooking Cream" },
    { key: "MAYO",   label: "Mayonnaise" },
  ];

  return (
    <>
      <style>{`
        .pr-hero { position: relative; width: 100%; height: 72vh; min-height: 520px; max-height: 720px; overflow: hidden; display: flex; align-items: flex-end; }
        .pr-hero__bg { position: absolute; inset: 0; background-image: url('/images/hero.webp'); background-size: cover; background-position: center 30%; transform: scale(1.02); transition: transform 7s ease; }
        .pr-hero:hover .pr-hero__bg { transform: scale(1.05); }
        .pr-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.58) 38%, rgba(5,5,5,0.18) 65%, rgba(5,5,5,0.04) 100%); }
        .pr-hero__glow { position: absolute; bottom: 0; left: 0; right: 0; height: 180px; background: linear-gradient(to top, rgba(255,193,7,0.07), transparent); pointer-events: none; }
        .pr-hero__content { position: relative; z-index: 2; width: 100%; max-width: var(--container-max); margin: 0 auto; padding: 0 80px 76px; }
        .pr-hero__watermark { position: absolute; top: 50%; right: 8%; transform: translateY(-50%); width: min(360px, 40vw); height: min(360px, 40vw); opacity: 0.05; pointer-events: none; z-index: 1; }

        /* Filter bar */
        .pr-filter-bar { position: sticky; top: var(--header-h); z-index: 10; background: rgba(11,11,11,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,193,7,0.10); }
        .pr-filter-inner { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad); display: flex; align-items: center; gap: 4px; height: 54px; overflow-x: auto; }
        .pr-filter-btn { background: none; border: 1px solid transparent; border-radius: var(--radius-full); padding: 6px 18px; font-family: 'DM Sans', 'Inter', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.4); cursor: pointer; white-space: nowrap; transition: all 0.2s; }
        .pr-filter-btn:hover { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.12); }
        .pr-filter-btn--active { background: var(--color-primary-soft); border-color: var(--color-border-yellow); color: var(--color-primary); }

        /* Featured card */
        .pr-featured { display: grid; grid-template-columns: 1fr 1fr; gap: 0; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); overflow: hidden; transition: border-color 0.28s, box-shadow 0.28s; }
        .pr-featured:hover { border-color: var(--color-border-yellow); box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,193,7,0.12); }
        .pr-featured__img-wrap { overflow: hidden; aspect-ratio: 4/3; }
        .pr-featured__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .pr-featured:hover .pr-featured__img { transform: scale(1.04); }
        .pr-featured__body { padding: 44px 40px; display: flex; flex-direction: column; justify-content: center; }

        /* Coming soon */
        .pr-cs-card { background: var(--color-bg-card); border: 1px dashed rgba(255,255,255,0.1); border-radius: var(--radius-lg); padding: 24px; display: flex; align-items: center; gap: 16; }

        @media (max-width:1200px) { .pr-hero__content { padding: 0 56px 68px; } }
        @media (max-width:1024px) { .pr-hero__content { padding: 0 40px 60px; } .pr-featured { grid-template-columns: 1fr; } }
        @media (max-width:768px) { .pr-hero { height: 65dvh; min-height: 440px; } .pr-hero__content { padding: 0 20px 52px; } .pr-hero__watermark { display: none; } .pr-featured__body { padding: 28px 24px; } }
      `}</style>

      <div style={{ background: "var(--color-bg-main)", paddingTop: "var(--header-h)" }}>

        {/* Hero */}
        <section className="pr-hero">
          <div className="pr-hero__bg" />
          <div className="pr-hero__overlay" />
          <div className="pr-hero__glow" />
          <div className="pr-hero__watermark">
            <img src="/images/logo.png" alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>
          <div className="pr-hero__content">
            <p className="sec-label anim-0" style={{ marginBottom: 18 }}>The Core System</p>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 0.90, letterSpacing: "0.03em", color: "#FFFFFF" }} className="anim-1">
              PRODUCTS THAT<br /><span style={{ color: "var(--color-primary)", textShadow: "0 0 40px rgba(255,193,7,0.4)" }}>DELIVER.</span>
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1rem, 1.5vw, 1.4rem)", lineHeight: 1.55, color: "rgba(255,255,255,0.60)", maxWidth: 520, marginTop: 18 }} className="anim-2">
              Plant-based dairy alternatives built for professional kitchens,
              premium retail, and discerning home cooks.
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <div className="pr-filter-bar">
          <div className="pr-filter-inner">
            {FILTERS.map(f => (
              <button key={f.key} className={`pr-filter-btn${filter === f.key ? " pr-filter-btn--active" : ""}`}
                onClick={() => setFilter(f.key)}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div style={{ padding: "72px 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container-custom">
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {visible.map((product) => (
                <article key={product.key} className="pr-featured">
                  <div className="pr-featured__img-wrap">
                    <img src={product.image} alt={product.name} loading="lazy" className="pr-featured__img" />
                  </div>
                  <div className="pr-featured__body">
                    <span style={{ display: "inline-block", padding: "4px 12px", background: "var(--color-primary-soft)", border: "1px solid var(--color-border-yellow)", borderRadius: "var(--radius-full)", fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 20 }}>
                      {product.tag}
                    </span>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{product.name}</h2>
                    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1rem, 1.4vw, 1.2rem)", fontStyle: "italic", color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>{product.line}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 28 }}>{product.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                      {product.benefits.map(b => (
                        <span key={b} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius-full)", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-primary)", display: "inline-block" }} />
                          {b}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <button className="btn btn--primary" onClick={() => go(product.detailsPath)}>View Details →</button>
                      <button className="btn btn--ghost" onClick={() => go("/contact")}>Request Sample</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div style={{ padding: "72px 0", background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container-custom">
            <p className="sec-label" style={{ marginBottom: 10 }}>Coming Soon</p>
            <h2 className="sec-heading sec-heading--lg" style={{ marginBottom: 8 }}>Next in Line.</h2>
            <div className="sec-divider" />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 36, maxWidth: 480 }}>
              Our R&D pipeline is active. These products are in development and will launch soon.
            </p>
            <div className="grid-3col" style={{ gap: 16 }}>
              {COMING_SOON.map(p => (
                <div key={p.name} style={{ background: "var(--color-bg-card)", border: "1px dashed rgba(255,255,255,0.10)", borderRadius: "var(--radius-lg)", padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 16, right: 16, padding: "3px 10px", background: "rgba(255,193,7,0.07)", border: "1px solid rgba(255,193,7,0.15)", borderRadius: "var(--radius-full)", fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,193,7,0.5)" }}>
                    Coming Soon
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 8, marginTop: 8 }}>{p.name}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>{p.line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ padding: "72px 0" }}>
          <div className="container-custom" style={{ textAlign: "center" }}>
            <p className="sec-label" style={{ marginBottom: 16 }}>Want to Try?</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#FFFFFF", marginBottom: 14, lineHeight: 1.2 }}>
              Request Product Samples
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.8 }}>
              We dispatch samples to qualified HoReCa operators and retail buyers.
              Tell us what you need and we'll take it from there.
            </p>
            <button className="btn btn--primary btn--lg" onClick={() => go("/contact")}>Request Samples →</button>
          </div>
        </div>

      </div>
    </>
  );
}
