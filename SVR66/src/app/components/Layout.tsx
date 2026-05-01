import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", minHeight: "100vh", background: "var(--color-bg-main)" }}>
      <style>{`
        button:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
        a:focus-visible      { outline: 2px solid var(--color-primary); outline-offset: 2px; }
        input::placeholder, textarea::placeholder { color: var(--color-text-muted); }
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 30px;
        }
        .skip-link {
          position: absolute; left: 16px; top: -40px;
          background: var(--color-primary); color: #0B0B0B;
          padding: 8px 12px; text-decoration: none; z-index: 1200;
          font-family: 'DM Sans', 'Inter', sans-serif; font-size: 13px; font-weight: 600;
          border-radius: 4px;
        }
        .skip-link:focus { top: 12px; }
      `}</style>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
