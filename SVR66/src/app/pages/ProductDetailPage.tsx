import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { products } from "../data/products";

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const product  = products.find(p => p.slug === slug);

  useEffect(() => {
    if (!product) return;
    document.title = `${product.name} — Srivriddhi Enterprise`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", product.description);
    const id = "product-jsonld";
    let s = document.getElementById(id) as HTMLScriptElement | null;
    if (!s) { s = document.createElement("script"); s.id = id; s.type = "application/ld+json"; document.head.appendChild(s); }
    s.textContent = JSON.stringify({
      "@context": "https://schema.org/", "@type": "Product",
      name: product.name, description: product.description,
      image: `https://www.srivriddhi.com${product.image}`,
      brand: { "@type": "Brand", name: "Srivriddhi Enterprise" },
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "INR" },
    });
    return () => { document.getElementById(id)?.remove(); };
  }, [product]);

  const go = (path: string) => { navigate(path); window.scrollTo(0, 0); };

  if (!product) return (
    <div style={{ paddingTop: 120, minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, background: "var(--color-bg-main)" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--color-primary-soft)", border: "1px solid var(--color-border-yellow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 8 }}>?</div>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>Product Not Found</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)" }}>This product doesn't exist or has been removed.</p>
      <button className="btn btn--primary btn--lg" onClick={() => go("/products")}>← Back to Products</button>
    </div>
  );

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <style>{`
        .pd-root { background: var(--color-bg-main); padding-top: var(--header-h); }
        .pd-crumb { background: #080808; border-bottom: 1px solid rgba(255,193,7,0.08); padding: 14px 0; }
        .pd-crumb-inner { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad); display: flex; align-items: center; gap: 8px; }
        .pd-main { display: grid; grid-template-columns: 1fr 1fr; min-height: 80vh; border-bottom: 1px solid var(--color-border); }
        .pd-img-panel { position: relative; display: flex; align-items: center; justify-content: center; padding: 72px 56px; background: var(--color-bg-secondary); min-height: 480px; }
        .pd-img-panel::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(255,193,7,0.03) 0%, transparent 70%); pointer-events: none; }
        .pd-img { width: 100%; max-width: 420px; aspect-ratio: 1/1; object-fit: contain; filter: drop-shadow(0 24px 48px rgba(0,0,0,0.7)); transition: transform 0.4s ease; }
        .pd-img:hover { transform: scale(1.03) translateY(-6px); }
        .pd-watermark { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.03; pointer-events: none; }
        .pd-info { padding: 64px 56px; display: flex; flex-direction: column; justify-content: center; }
        .pd-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; background: var(--color-primary-soft); border: 1px solid var(--color-border-yellow); border-radius: var(--radius-full); font-family: 'DM Sans', 'Inter', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: var(--color-primary); }
        .pd-name { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: #FFFFFF; line-height: 1.15; }
        .pd-tagline { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(1rem, 1.6vw, 1.35rem); font-style: italic; color: rgba(255,255,255,0.5); line-height: 1.5; }
        .pd-divider { width: 48px; height: 2px; background: linear-gradient(90deg, var(--color-primary), transparent); margin: 20px 0; }
        .pd-desc { font-family: 'DM Sans', 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.9; }
        .pd-benefit-tag { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-full); font-family: 'DM Sans', 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.5); }
        .pd-usage-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px; transition: border-color 0.25s; }
        .pd-usage-card:hover { border-color: var(--color-border-yellow); }
        .pd-related-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        @media (max-width:1024px) { .pd-main { grid-template-columns: 1fr; } .pd-img-panel { padding: 48px 40px; min-height: 380px; } .pd-info { padding: 48px 40px; } }
        @media (max-width:768px) { .pd-img-panel { padding: 40px 24px; min-height: 300px; } .pd-info { padding: 36px 20px; } .pd-related-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="pd-root">

        {/* Breadcrumb */}
        <div className="pd-crumb">
          <div className="pd-crumb-inner">
            <button onClick={() => go("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", padding: 0, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>Home</button>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>/</span>
            <button onClick={() => go("/products")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", padding: 0, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>Products</button>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>/</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{product.name}</span>
          </div>
        </div>

        {/* Main split */}
        <div className="pd-main">

          {/* Image */}
          <div className="pd-img-panel">
            <div className="pd-watermark">
              <img src="/images/logo.png" alt="" aria-hidden="true" style={{ width: "80%", height: "80%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </div>
            <img src={product.image} alt={product.name} className="pd-img" />
          </div>

          {/* Info */}
          <div className="pd-info">
            <div style={{ marginBottom: 20 }}>
              <span className="pd-badge">
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-primary)", display: "inline-block" }} />
                {product.category}
              </span>
            </div>
            <h1 className="pd-name" style={{ marginBottom: 10 }}>{product.name}</h1>
            <p className="pd-tagline">{product.tagline}</p>
            <div className="pd-divider" />
            <p className="pd-desc" style={{ marginBottom: 28 }}>{product.description}</p>

            {/* Benefits */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {product.benefits.map(b => (
                <span key={b} className="pd-benefit-tag">
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--color-primary)", display: "inline-block" }} />
                  {b}
                </span>
              ))}
            </div>

            {/* Usage */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
              <div className="pd-usage-card">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 6, opacity: 0.7 }}>Home Use</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{product.usage.home}</p>
              </div>
              <div className="pd-usage-card">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 6, opacity: 0.7 }}>Professional</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{product.usage.professional}</p>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn--primary btn--lg" onClick={() => go("/contact")}>Request Sample →</button>
              <button className="btn btn--ghost" onClick={() => go("/products")}>← All Products</button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ padding: "72px 0", background: "var(--color-bg-secondary)" }}>
            <div className="container-custom">
              <p className="sec-label" style={{ marginBottom: 10 }}>Related</p>
              <h2 className="sec-heading" style={{ marginBottom: 0 }}>You May Also Like</h2>
              <div className="sec-divider" />
              <div className="pd-related-grid">
                {related.map(r => (
                  <article key={r.id} className="prod-card" onClick={() => go(`/products/${r.slug}`)} style={{ cursor: "pointer" }}>
                    <div style={{ overflow: "hidden" }}>
                      <img src={r.image} alt={r.name} loading="lazy" className="prod-card__img" />
                    </div>
                    <div className="prod-card__body">
                      <h3 className="prod-card__title">{r.name}</h3>
                      <div className="prod-card__accent" />
                      <p className="prod-card__line">{r.tagline}</p>
                      <span className="prod-card__tag">{r.category}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
