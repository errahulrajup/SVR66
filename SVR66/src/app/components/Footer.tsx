import { useNavigate } from "react-router";
import { Logo } from "./Logo";

const NAV = [
  { label: "Home",     path: "/" },
  { label: "Products", path: "/products" },
  { label: "About",    path: "/about" },
  { label: "Contact",  path: "/contact" },
];

const SOCIALS = [
  {
    name: "Facebook", href: "https://www.facebook.com/srivriddhi",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    name: "Instagram", href: "https://www.instagram.com/srivriddhi",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    name: "LinkedIn", href: "https://www.linkedin.com/company/srivriddhi",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    name: "Twitter", href: "https://twitter.com/srivriddhi",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
];

export function Footer() {
  const navigate = useNavigate();
  const go = (path: string) => { navigate(path); window.scrollTo(0, 0); };

  return (
    <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,193,7,0.1)" }}>
      <style>{`
        .ftr-link { transition: color 0.2s; }
        .ftr-link:hover { color: var(--color-primary) !important; }
        .ftr-inner { max-width: var(--container-max); margin: 0 auto; padding: 72px 80px 40px; }
        .ftr-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 64px; padding-bottom: 52px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ftr-bottom { padding-top: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .ftr-socials { display: flex; gap: 8px; margin-top: 28px; flex-wrap: wrap; }
        .ftr-social-btn {
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: rgba(255,255,255,0.45);
          cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.18s;
          text-decoration: none; flex-shrink: 0;
        }
        .ftr-social-btn:hover { background: var(--color-primary-soft); border-color: var(--color-border-yellow); color: var(--color-primary); transform: translateY(-2px); }
        .ftr-nav-link { display: block; background: none; border: none; cursor: pointer; font-family: 'DM Sans', 'Inter', sans-serif; font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.45); padding: 5px 0; text-align: left; transition: color 0.2s; }
        .ftr-nav-link:hover { color: var(--color-primary) !important; }
        @media (max-width:1024px) { .ftr-inner { padding: 56px 40px 32px; } .ftr-grid { gap: 36px; } }
        @media (max-width:768px) {
          .ftr-inner { padding: 44px 20px 24px; }
          .ftr-grid { grid-template-columns: 1fr; gap: 32px; }
          .ftr-bottom { flex-direction: column; align-items: flex-start; gap: 6px; }
        }
      `}</style>

      <div className="ftr-inner">
        <div className="ftr-grid">

          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div className="logo-glow">
                <Logo size={36} />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>
                  Srivriddhi
                </div>
                <div style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", fontSize: 9, fontWeight: 700, color: "rgba(255,193,7,0.65)", letterSpacing: "0.28em", textTransform: "uppercase", marginTop: 3 }}>
                  Enterprise
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, maxWidth: 300 }}>
              Premium plant-based foods from India — built around appetite,
              quality, and category ambition.
            </p>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)", flexShrink: 0, boxShadow: "0 0 8px rgba(255,193,7,0.5)" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, fontStyle: "italic", color: "rgba(255,255,255,0.40)", lineHeight: 1.3 }}>
                Plant-based products. Built to win.
              </p>
            </div>

            <div className="ftr-socials">
              {SOCIALS.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="ftr-social-btn" aria-label={`Follow us on ${s.name}`} title={s.name}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="sec-label" style={{ marginBottom: 20 }}>Navigate</p>
            {NAV.map(({ label, path }) => (
              <button key={path} className="ftr-nav-link" onClick={() => go(path)}>{label}</button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="sec-label" style={{ marginBottom: 20 }}>Contact</p>
            <p style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 2.2 }}>
              info@srivriddhi.com<br />
              +91 7565 000 365<br />
              Sagar, M.P. — India
            </p>
            <div style={{ marginTop: 18, padding: "10px 14px", background: "rgba(255,193,7,0.05)", border: "1px solid rgba(255,193,7,0.12)", borderRadius: "var(--radius-sm)" }}>
              <p style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", fontSize: 11, color: "rgba(255,193,7,0.6)", lineHeight: 1.65 }}>
                Responds within 24 hours<br />
                Mon–Sat | 10 AM – 7 PM IST
              </p>
            </div>
          </div>
        </div>

        <div className="ftr-bottom">
          <p style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.2)" }}>
            © 2026 Srivriddhi Enterprise. All rights reserved.
          </p>
          <p style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.2)" }}>
            srivriddhi.com
          </p>
        </div>
      </div>

      {/* WhatsApp float */}
      <a href="https://wa.me/917565000365" target="_blank" rel="noopener noreferrer"
        className="wa-float" aria-label="Chat on WhatsApp" title="WhatsApp Us">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </footer>
  );
}
