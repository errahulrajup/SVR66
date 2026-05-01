import { useState, useEffect, type ChangeEvent } from "react";
import emailjs from "@emailjs/browser";

const PROCESS_STEPS = [
  { step: "01", title: "We Review",         body: "Your enquiry is reviewed by our team within a few hours. No automated delays — a real person reads every message." },
  { step: "02", title: "We Reach Out",       body: "A Srivriddhi team member contacts you directly by call, WhatsApp, or email, whichever you prefer." },
  { step: "03", title: "Samples Dispatched", body: "For qualified enquiries, product samples are dispatched so you can evaluate before committing to any order." },
];

export function ContactPage() {
  const [form, setForm]     = useState({ name: "", phone: "", email: "", subject: "Product Enquiry", message: "" });
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    document.title = "Contact — Srivriddhi Enterprise";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "For retail, HoReCa, and bulk enquiries — reach Srivriddhi Enterprise directly.");
  }, []);

  const update = (k: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRx = /^[0-9+\-\s()]{7,20}$/;
    if (!form.name.trim())                return setError("Name is required.");
    if (!form.phone.trim())               return setError("Phone number is required.");
    if (!phoneRx.test(form.phone.trim())) return setError("Please enter a valid phone number.");
    if (!emailRx.test(form.email.trim())) return setError("Please enter a valid email address.");
    if (form.message.trim().length < 10)  return setError("Please share a little more detail (min 10 characters).");
    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID)
      return setError("Email service not configured. Please call or WhatsApp us directly.");
    setSending(true); setError(null);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, phone: form.phone, subject: form.subject, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
    } catch {
      setError("Failed to send. Please try again or reach us directly.");
    } finally { setSending(false); }
  };

  return (
    <>
      <style>{`
        .ct-hero { position: relative; width: 100%; height: 68vh; min-height: 480px; max-height: 740px; overflow: hidden; display: flex; align-items: flex-end; }
        .ct-hero__bg { position: absolute; inset: 0; background-image: url('/images/contact.webp'); background-size: cover; background-position: center 25%; transform: scale(1.02); transition: transform 7s ease; }
        .ct-hero:hover .ct-hero__bg { transform: scale(1.05); }
        .ct-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.60) 38%, rgba(5,5,5,0.22) 65%, rgba(5,5,5,0.06) 100%); }
        .ct-hero__glow { position: absolute; bottom: 0; left: 0; right: 0; height: 180px; background: linear-gradient(to top, rgba(255,193,7,0.07), transparent); pointer-events: none; }
        .ct-hero__content { position: relative; z-index: 2; width: 100%; max-width: var(--container-max); margin: 0 auto; padding: 0 80px 76px; }
        .ct-hero__sub { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(1.05rem, 1.6vw, 1.45rem); line-height: 1.55; color: rgba(255,255,255,0.65); max-width: 520px; margin-top: 18px; }
        .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 80px 0; }
        .ct-info-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 16px; transition: border-color 0.25s; }
        .ct-info-card:hover { border-color: var(--color-border-yellow); }
        .ct-success { text-align: center; padding: 60px 40px; background: var(--color-bg-card); border: 1px solid var(--color-border-yellow); border-radius: var(--radius-xl); }
        .ct-form-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: 40px; }
        @media (max-width:1200px) { .ct-hero__content { padding: 0 56px 68px; } }
        @media (max-width:1024px) { .ct-hero__content { padding: 0 40px 60px; } .ct-grid { grid-template-columns: 1fr; gap: 32px; padding: 60px 0; } }
        @media (max-width:768px) { .ct-hero { height: 65dvh; min-height: 400px; } .ct-hero__content { padding: 0 20px 52px; } .ct-form-card { padding: 28px 20px; } .ct-success { padding: 40px 20px; } }
      `}</style>

      <div style={{ background: "var(--color-bg-main)", paddingTop: "var(--header-h)" }}>

        {/* Hero */}
        <section className="ct-hero">
          <div className="ct-hero__bg" />
          <div className="ct-hero__overlay" />
          <div className="ct-hero__glow" />
          <div className="ct-hero__content">
            <p className="sec-label anim-0" style={{ marginBottom: 18 }}>Get in Touch</p>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 7.5vw, 92px)", lineHeight: 0.90, letterSpacing: "0.03em", color: "#FFFFFF" }} className="anim-1">
              LET'S START<br /><span style={{ color: "var(--color-primary)", textShadow: "0 0 40px rgba(255,193,7,0.4)" }}>SOMETHING.</span>
            </h1>
            <p className="ct-hero__sub anim-2">
              For retail, HoReCa, bulk supply, or samples — tell us what you need.
              Our team responds within 24 hours.
            </p>
          </div>
        </section>

        {/* Process */}
        <div style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", padding: "52px 0" }}>
          <div className="container-custom">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {PROCESS_STEPS.map((s) => (
                <div key={s.step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "var(--color-primary)", lineHeight: 1, flexShrink: 0, opacity: 0.8 }}>{s.step}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact grid */}
        <div className="container-custom">
          <div className="ct-grid">

            {/* Left — info */}
            <div>
              <p className="sec-label" style={{ marginBottom: 14 }}>Direct Contact</p>
              <h2 className="sec-heading" style={{ marginBottom: 8 }}>Reach Us Directly</h2>
              <div className="sec-divider" />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 32 }}>
                We prefer directness. No ticket systems, no chatbots. Call, WhatsApp, or email — we'll respond the same day.
              </p>

              {[
                { icon: "📞", label: "Phone", val: "+91 7565 000 365",      href: "tel:+917565000365" },
                { icon: "✉️", label: "Email",  val: "info@srivriddhi.com",   href: "mailto:info@srivriddhi.com" },
                { icon: "📍", label: "Office", val: "Sagar, M.P. — India",   href: undefined },
              ].map(c => (
                <div key={c.label} className="ct-info-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--color-primary-soft)", border: "1px solid var(--color-border-yellow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>{c.label}</p>
                      {c.href ? (
                        <a href={c.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, color: "#FFFFFF", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#FFFFFF")}>
                          {c.val}
                        </a>
                      ) : (
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.7)" }}>{c.val}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a href="https://wa.me/917565000365?text=Hi Srivriddhi, I'm interested in your products." target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.22)", borderRadius: "var(--radius-md)", padding: "14px 18px", textDecoration: "none", transition: "background 0.2s", marginTop: 8 }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(37,211,102,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(37,211,102,0.08)")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#25D366", lineHeight: 1 }}>Chat on WhatsApp</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(37,211,102,0.6)", marginTop: 2 }}>Fastest response — usually within minutes</p>
                </div>
              </a>
            </div>

            {/* Right — form */}
            <div>
              <p className="sec-label" style={{ marginBottom: 14 }}>Send a Message</p>
              <h2 className="sec-heading" style={{ marginBottom: 8 }}>We're Listening</h2>
              <div className="sec-divider" />

              {sent ? (
                <div className="ct-success">
                  <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: "var(--color-primary)", marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                    Thank you. Our team will be in touch within 24 hours.<br />
                    For urgent needs, WhatsApp us directly.
                  </p>
                </div>
              ) : (
                <div className="ct-form-card">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label className="form-label">Name *</label>
                      <input className="form-field" placeholder="Your name" value={form.name} onChange={update("name")} />
                    </div>
                    <div>
                      <label className="form-label">Phone *</label>
                      <input className="form-field" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={update("phone")} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="form-label">Email *</label>
                    <input className="form-field" type="email" placeholder="your@email.com" value={form.email} onChange={update("email")} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="form-label">Subject</label>
                    <select className="form-field" value={form.subject} onChange={update("subject")}
                      style={{ background: "var(--color-bg-card)", cursor: "pointer" }}>
                      <option>Product Enquiry</option>
                      <option>Bulk / HoReCa Order</option>
                      <option>Sample Request</option>
                      <option>Retail Partnership</option>
                      <option>Distribution</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label className="form-label">Message *</label>
                    <textarea className="form-field" rows={5} placeholder="Tell us about your requirement — product, quantity, usage, timeline..." value={form.message} onChange={update("message")} style={{ resize: "vertical" }} />
                  </div>
                  {error && (
                    <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: "var(--radius-sm)", padding: "10px 14px", marginBottom: 16 }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#F87171" }}>{error}</p>
                    </div>
                  )}
                  <button className="btn btn--primary" style={{ width: "100%", padding: "14px" }} onClick={handleSubmit} disabled={sending}>
                    {sending ? "Sending..." : "Send Message →"}
                  </button>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                    Mon–Sat · 10 AM – 7 PM IST · Responds within 24h
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
