import { useState, useEffect, useRef, type ChangeEvent } from "react";
import { Logo } from "../components/Logo";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "plantsmor2026";
const STORAGE_KEY    = "svr20_admin_products";

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  tagline: string;
  description: string;
  benefits: string[];
  usageHome: string;
  usageProfessional: string;
  packSizes: string;
  inStock: boolean;
}

const CATEGORIES = ["Spreads","Condiments","Cooking Essentials","Plant Protein","Frozen Vegetables","Wellness Drinks"];

const EMPTY: Omit<AdminProduct, "id"> = {
  name: "", slug: "", image: "", category: "Spreads",
  tagline: "", description: "", benefits: [],
  usageHome: "", usageProfessional: "", packSizes: "", inStock: true,
};

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function load(): AdminProduct[] {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
function save(p: AdminProduct[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

/* ── Login ─────────────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw,  setPw]  = useState("");
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem("admin_auth", "1"); onLogin(); }
    else { setErr("Incorrect password. Try again."); setShake(true); setTimeout(() => setShake(false), 500); }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg-main)", paddingTop: "var(--header-h)" }}>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-9px)} 40%{transform:translateX(9px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }`}</style>
      <div style={{ width: "100%", maxWidth: 400, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="logo-glow" style={{ display: "inline-block", marginBottom: 16, animation: "logoPulse 2.5s ease infinite alternate" }}>
            <Logo size={52} />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: "#FFFFFF", marginBottom: 6 }}>Admin Panel</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Srivriddhi Enterprise</p>
        </div>
        <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "36px 32px", animation: shake ? "shake 0.5s ease" : undefined }}>
          <label className="form-label">Password</label>
          <input ref={inputRef} type="password" className="form-field" placeholder="Enter admin password"
            value={pw} onChange={e => { setPw(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && attempt()}
            style={{ marginBottom: err ? 10 : 20 }} />
          {err && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#F87171", marginBottom: 16 }}>{err}</p>}
          <button className="btn btn--primary" style={{ width: "100%", padding: "13px" }} onClick={attempt}>
            Sign In →
          </button>
        </div>
        <p style={{ textAlign: "center", marginTop: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          Default: plantsmor2026 · Set VITE_ADMIN_PASSWORD in .env to override
        </p>
      </div>
    </div>
  );
}

/* ── Product Form ───────────────────────────────────────────────────────── */
function ProductForm({
  initial, onSave, onCancel,
}: {
  initial: Omit<AdminProduct, "id"> & { id?: string };
  onSave: (p: AdminProduct) => void;
  onCancel: () => void;
}) {
  const [f, setF] = useState({ ...initial });
  const [bStr, setBStr] = useState((initial.benefits ?? []).join(", "));

  const upd = (k: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF(prev => ({ ...prev, [k]: e.target.value }));
  const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const n = e.target.value;
    setF(prev => ({ ...prev, name: n, slug: slugify(n) }));
  };

  const submit = () => {
    if (!f.name.trim())     return alert("Name is required.");
    if (!f.tagline.trim())  return alert("Tagline is required.");
    if (!f.category.trim()) return alert("Category is required.");
    const product: AdminProduct = {
      ...f, id: initial.id ?? genId(),
      benefits: bStr.split(",").map(s => s.trim()).filter(Boolean),
    };
    onSave(product);
  };

  const isEdit = !!initial.id;

  return (
    <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "36px 32px" }}>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginBottom: 28 }}>
        {isEdit ? "Edit Product" : "Add New Product"}
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label className="form-label">Name *</label>
          <input className="form-field" placeholder="e.g. PlantSmör Butter" value={f.name} onChange={nameChange} />
        </div>
        <div>
          <label className="form-label">Slug (auto-generated)</label>
          <input className="form-field" placeholder="e.g. plant-based-butter" value={f.slug}
            onChange={upd("slug")} style={{ color: "rgba(255,255,255,0.4)" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label className="form-label">Category *</label>
          <select className="form-field" value={f.category} onChange={upd("category")} style={{ background: "var(--color-bg-card)", cursor: "pointer" }}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">Image Path</label>
          <input className="form-field" placeholder="/images/product-xxx.webp" value={f.image} onChange={upd("image")} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="form-label">Tagline *</label>
        <input className="form-field" placeholder="Short punchy line, e.g. Rich taste. Stable melt." value={f.tagline} onChange={upd("tagline")} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="form-label">Description</label>
        <textarea className="form-field" rows={3} placeholder="Product description..." value={f.description} onChange={upd("description")} style={{ resize: "vertical" }} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="form-label">Benefits (comma-separated)</label>
        <input className="form-field" placeholder="High Heat Stability, Smooth Spread, Consistent Results" value={bStr} onChange={e => setBStr(e.target.value)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label className="form-label">Home Usage</label>
          <textarea className="form-field" rows={2} placeholder="How home users use it..." value={f.usageHome} onChange={upd("usageHome")} style={{ resize: "vertical" }} />
        </div>
        <div>
          <label className="form-label">Professional Usage</label>
          <textarea className="form-field" rows={2} placeholder="How chefs / HoReCa use it..." value={f.usageProfessional} onChange={upd("usageProfessional")} style={{ resize: "vertical" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
        <div>
          <label className="form-label">Pack Sizes</label>
          <input className="form-field" placeholder="500g, 1kg, 5kg" value={f.packSizes} onChange={upd("packSizes")} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 2 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ position: "relative" }}>
              <input type="checkbox" checked={f.inStock} onChange={e => setF(p => ({ ...p, inStock: e.target.checked }))}
                style={{ width: 18, height: 18, accentColor: "var(--color-primary)", cursor: "pointer" }} />
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: f.inStock ? "#FFFFFF" : "rgba(255,255,255,0.4)", fontWeight: 500 }}>
              In Stock
            </span>
          </label>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn btn--primary" onClick={submit} style={{ minWidth: 120 }}>
          {isEdit ? "Save Changes" : "Add Product"} →
        </button>
        <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

/* ── Dashboard ─────────────────────────────────────────────────────────── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [products,  setProducts]  = useState<AdminProduct[]>(load);
  const [editing,   setEditing]   = useState<AdminProduct | null>(null);
  const [adding,    setAdding]    = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [tab,       setTab]       = useState<"products" | "info">("products");
  const [info, setInfo] = useState({
    phone: "+91 7565 000 365", email: "info@srivriddhi.com",
    address: "Sagar, M.P. — India", whatsapp: "917565000365",
    heroHeadline: "BUILT FOR KITCHENS. DRIVEN BY TASTE. MADE FOR INDIA.",
  });

  useEffect(() => { save(products); }, [products]);

  const handleSave = (p: AdminProduct) => {
    setProducts(prev => {
      const idx = prev.findIndex(x => x.id === p.id);
      if (idx >= 0) { const n = [...prev]; n[idx] = p; return n; }
      return [...prev, p];
    });
    setEditing(null); setAdding(false);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const remove = (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setProducts(p => p.filter(x => x.id !== id));
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `svr20-products-${Date.now()}.json`; a.click();
  };

  const TABS = [{ key: "products", label: "Products" }, { key: "info", label: "Site Info" }] as const;

  return (
    <div style={{ background: "var(--color-bg-main)", minHeight: "100vh", paddingTop: "var(--header-h)" }}>
      <style>{`
        .adm-tab { background: none; border: none; cursor: pointer; padding: 10px 20px; font-family: 'DM Sans','Inter',sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; color: rgba(255,255,255,0.38); border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; }
        .adm-tab:hover { color: rgba(255,255,255,0.7); }
        .adm-tab--active { color: var(--color-primary); border-bottom-color: var(--color-primary); }
        .adm-prod-row { display: grid; grid-template-columns: 56px 1fr auto; gap: 16px; align-items: center; padding: 18px 20px; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); transition: border-color 0.2s; }
        .adm-prod-row:hover { border-color: var(--color-border-yellow); }
        @media (max-width:768px) { .adm-prod-row { grid-template-columns: 1fr auto; } .adm-prod-thumb { display: none !important; } }
      `}</style>

      {/* Top bar */}
      <div style={{ background: "#080808", borderBottom: "1px solid rgba(255,193,7,0.1)", padding: "0 var(--container-pad)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="logo-glow"><Logo size={28} /></div>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>
              Admin Panel
            </span>
            {saved && (
              <span style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: "var(--radius-full)", padding: "2px 10px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: "#4ADE80" }}>
                ✓ Saved
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn--dark btn--sm" onClick={exportJSON}>Export JSON</button>
            <button className="btn btn--ghost btn--sm" style={{ color: "#F87171", borderColor: "rgba(248,113,113,0.2)" }}
              onClick={() => { sessionStorage.removeItem("admin_auth"); onLogout(); }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#080808", borderBottom: "1px solid var(--color-border)", padding: "0 var(--container-pad)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "flex", gap: 0 }}>
          {TABS.map(t => (
            <button key={t.key} className={`adm-tab${tab === t.key ? " adm-tab--active" : ""}`} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "40px var(--container-pad) 80px" }}>

        {/* ── Products Tab ── */}
        {tab === "products" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div>
                <p className="sec-label" style={{ marginBottom: 6 }}>Content Management</p>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#FFFFFF" }}>
                  Products <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7em", fontFamily: "'DM Sans',sans-serif", fontWeight: 400 }}>({products.length})</span>
                </h2>
              </div>
              {!adding && !editing && (
                <button className="btn btn--primary" onClick={() => setAdding(true)}>+ Add Product</button>
              )}
            </div>

            {/* Add form */}
            {adding && (
              <div style={{ marginBottom: 24 }}>
                <ProductForm initial={{ ...EMPTY }} onSave={handleSave} onCancel={() => setAdding(false)} />
              </div>
            )}

            {/* Edit form */}
            {editing && (
              <div style={{ marginBottom: 24 }}>
                <ProductForm initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
              </div>
            )}

            {/* Product list */}
            {products.length === 0 && !adding ? (
              <div style={{ textAlign: "center", padding: "64px 24px", background: "var(--color-bg-card)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "var(--radius-xl)" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📦</div>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: "#FFFFFF", marginBottom: 8 }}>No products yet</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>Add your first product to get started.</p>
                <button className="btn btn--primary" onClick={() => setAdding(true)}>+ Add First Product</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {products.map(p => (
                  <div key={p.id} className="adm-prod-row">
                    {/* Thumb */}
                    <div className="adm-prod-thumb" style={{ width: 56, height: 56, borderRadius: "var(--radius-sm)", background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", overflow: "hidden", flexShrink: 0 }}>
                      {p.image ? <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📦</div>}
                    </div>
                    {/* Info */}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>{p.name}</span>
                        <span style={{ padding: "2px 8px", background: p.inStock ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)", border: `1px solid ${p.inStock ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}`, borderRadius: "var(--radius-full)", fontSize: 10, fontWeight: 700, color: p.inStock ? "#4ADE80" : "#F87171", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{p.category}</span>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>{p.tagline}</span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <button className="btn btn--dark btn--sm" onClick={() => { setEditing(p); setAdding(false); }}>Edit</button>
                      <button className="btn btn--sm" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#F87171", borderRadius: "var(--radius-md)", cursor: "pointer" }}
                        onClick={() => remove(p.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Site Info Tab ── */}
        {tab === "info" && (
          <div>
            <p className="sec-label" style={{ marginBottom: 8 }}>Configuration</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#FFFFFF", marginBottom: 28 }}>
              Site Information
            </h2>
            <div style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "36px 32px", maxWidth: 640 }}>
              <div style={{ display: "grid", gap: 16 }}>
                {([
                  { key: "phone",        label: "Phone Number",    placeholder: "+91 XXXXX XXXXX" },
                  { key: "whatsapp",     label: "WhatsApp Number", placeholder: "91XXXXXXXXXX (no +)" },
                  { key: "email",        label: "Email Address",   placeholder: "info@srivriddhi.com" },
                  { key: "address",      label: "Office Address",  placeholder: "City, State — Country" },
                  { key: "heroHeadline", label: "Hero Headline",   placeholder: "Your main headline..." },
                ] as const).map(field => (
                  <div key={field.key}>
                    <label className="form-label">{field.label}</label>
                    <input className="form-field" placeholder={field.placeholder}
                      value={info[field.key]}
                      onChange={e => setInfo(i => ({ ...i, [field.key]: e.target.value }))} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, padding: "14px 16px", background: "rgba(255,193,7,0.04)", border: "1px solid rgba(255,193,7,0.12)", borderRadius: "var(--radius-md)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,193,7,0.55)", lineHeight: 1.7 }}>
                  ℹ️ Changes here are stored locally in your browser. To persist permanently, integrate this panel with a backend CMS (Sanity, Supabase, or Firebase) and connect via API.
                </p>
              </div>
              <button className="btn btn--primary" style={{ marginTop: 20 }}
                onClick={() => { localStorage.setItem("svr20_site_info", JSON.stringify(info)); setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
                Save Info →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── Main Export ─────────────────────────────────────────────────────────── */
export function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => setAuthed(false)} />;
}
