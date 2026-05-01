import { useEffect } from "react";
import { useNavigate } from "react-router";

export function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => { document.title = "404 — Srivriddhi Enterprise"; }, []);
  const go = (path: string) => { navigate(path); window.scrollTo(0, 0); };

  return (
    <div style={{
      minHeight: "100vh", background: "var(--color-bg-main)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      paddingTop: "var(--header-h)", textAlign: "center",
      padding: "80px 24px", boxSizing: "border-box", position: "relative", overflow: "hidden",
    }}>
      {/* Faded logo watermark */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 400, opacity: 0.03, pointerEvents: "none" }}>
        <img src="/images/logo.png" alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
      </div>
      {/* Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(255,193,7,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <p className="sec-label" style={{ marginBottom: 20, position: "relative" }}>404 Error</p>
      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(72px, 16vw, 160px)", fontWeight: 400,
        lineHeight: 0.9, color: "rgba(255,255,255,0.08)",
        letterSpacing: "0.04em", marginBottom: 0, position: "relative",
        userSelect: "none",
      }}>404</h1>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700,
        lineHeight: 1.15, color: "#FFFFFF", marginTop: -8, marginBottom: 16, position: "relative",
      }}>
        Page Not <span style={{ color: "var(--color-primary)" }}>Found.</span>
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", color: "rgba(255,255,255,0.45)", maxWidth: 440, marginBottom: 40, lineHeight: 1.7, position: "relative" }}>
        This page doesn't exist. Head back to explore our premium plant-based range.
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
        <button className="btn btn--primary btn--lg" onClick={() => go("/")}>← Back to Home</button>
        <button className="btn btn--ghost btn--lg" onClick={() => go("/products")}>View Products</button>
      </div>
    </div>
  );
}
