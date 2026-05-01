import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Logo } from "./Logo";

const NAV = [
  { label: "Home",     path: "/" },
  { label: "Products", path: "/products" },
  { label: "About",    path: "/about" },
  { label: "Contact",  path: "/contact" },
];

export function Header() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); document.body.style.overflow = ""; }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const go = (path: string) => {
    setMobileOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const isActive = (path: string) =>
    path === "/products"
      ? location.pathname.startsWith("/products")
      : location.pathname === path;

  return (
    <>
      <style>{`
        .hdr-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: var(--header-h);
          background: ${scrolled
            ? "rgba(11,11,11,0.96)"
            : "rgba(11,11,11,0.75)"};
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid ${scrolled
            ? "rgba(255,193,7,0.12)"
            : "rgba(255,255,255,0.05)"};
          box-shadow: ${scrolled ? "0 4px 32px rgba(0,0,0,0.7)" : "none"};
          transition: background 0.35s, border-color 0.35s, box-shadow 0.35s;
        }
        .hdr-inner {
          max-width: var(--container-max); margin: 0 auto; height: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 80px;
        }
        .hdr-logo-btn {
          display: flex; align-items: center; gap: 12px;
          background: none; border: none; cursor: pointer; padding: 0; flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .hdr-logo-btn:hover { opacity: 0.85; }
        .hdr-brand-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 19px; font-weight: 700;
          color: #FFFFFF; letter-spacing: -0.01em; line-height: 1;
        }
        .hdr-brand-sub {
          font-family: 'DM Sans', 'Inter', sans-serif;
          font-size: 8.5px; font-weight: 600;
          color: rgba(255,193,7,0.7);
          letter-spacing: 0.28em; line-height: 1; text-transform: uppercase; margin-top: 3px;
        }
        .hdr-nav { display: flex; align-items: center; gap: 2px; }
        .hdr-nav-link {
          background: none; border: none; cursor: pointer;
          padding: 8px 16px;
          font-family: 'DM Sans', 'Inter', sans-serif;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.60);
          letter-spacing: 0.03em;
          transition: color 0.2s; border-bottom: 2px solid transparent;
          white-space: nowrap; border-radius: 6px;
        }
        .hdr-nav-link:hover { color: #FFFFFF; background: rgba(255,255,255,0.04); }
        .hdr-nav-link.active {
          color: var(--color-primary); font-weight: 600;
          border-bottom-color: var(--color-primary);
        }
        .hdr-cta {
          margin-left: 16px; padding: 9px 22px;
          background: var(--color-primary); color: #0B0B0B;
          border: none; cursor: pointer;
          font-family: 'DM Sans', 'Inter', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.07em;
          border-radius: var(--radius-md);
          box-shadow: 0 4px 16px rgba(255,193,7,0.25);
          transition: background 0.2s, transform 0.18s, box-shadow 0.2s; flex-shrink: 0;
        }
        .hdr-cta:hover {
          background: var(--color-primary-hover); transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(255,193,7,0.45);
        }
        .hdr-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 6px;
        }
        .hdr-mobile-menu {
          background: #111111; border-top: 1px solid rgba(255,193,7,0.1);
          overflow: hidden; transition: max-height 0.32s ease, padding 0.32s ease;
        }
        .mob-nav-link {
          display: block; width: 100%; text-align: left;
          background: none; border: none; cursor: pointer;
          padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'DM Sans', 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        @media (max-width: 1024px) { .hdr-inner { padding: 0 40px; } }
        @media (max-width: 768px) {
          .hdr-inner { padding: 0 20px; }
          .desktop-nav { display: none !important; }
          .hdr-hamburger { display: flex !important; }
        }
        @media (max-width: 480px) { .hdr-inner { padding: 0 16px; } }
      `}</style>

      <nav className="hdr-root" aria-label="Main navigation">
        <div className="hdr-inner">

          {/* Logo */}
          <button className="hdr-logo-btn" onClick={() => go("/")} aria-label="Go to home">
            <div className="logo-glow" style={{ animation: "logoPulse 2.5s ease infinite alternate" }}>
              <Logo size={34} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span className="hdr-brand-name">Srivriddhi</span>
              <span className="hdr-brand-sub">Enterprise</span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hdr-nav desktop-nav">
            {NAV.map(({ label, path }) => (
              <button
                key={path} onClick={() => go(path)}
                className={`hdr-nav-link ${isActive(path) ? "active" : ""}`}
              >{label}</button>
            ))}
            <button className="hdr-cta" onClick={() => go("/contact")}>
              Get Samples →
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="hdr-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu" aria-expanded={mobileOpen}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 1.5,
                background: "#FFFFFF", borderRadius: 1,
                transition: "all 0.28s",
                transform: mobileOpen
                  ? i === 0 ? "rotate(45deg) translate(4.5px,4.5px)"
                  : i === 2 ? "rotate(-45deg) translate(4.5px,-4.5px)"
                  : "scaleX(0)" : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="hdr-mobile-menu" aria-hidden={!mobileOpen}
          style={{ padding: mobileOpen ? "20px 20px 32px" : "0 20px", maxHeight: mobileOpen ? "360px" : "0" }}
        >
          {NAV.map(({ label, path }) => (
            <button key={path} onClick={() => go(path)} className="mob-nav-link"
              style={{ color: isActive(path) ? "var(--color-primary)" : "rgba(255,255,255,0.7)" }}>
              {label}
            </button>
          ))}
          <button onClick={() => go("/contact")} className="btn btn--primary"
            style={{ width: "100%", marginTop: 16, borderRadius: "var(--radius-md)", justifyContent: "center" }}>
            Get Samples →
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.7)",
        }} />
      )}
    </>
  );
}
