/* TEDxAmsterdam — site header (sticky nav, responsive w/ hamburger) */
function Header({ page, go }) {
  const [open, setOpen] = useState(false);
  const ROUTE = {
    "Speakers": "speakers", "Event Program": "event", "Impact Program": "impact",
    "About Us": "about", "Our Team": "team", "Blog": "blog", "Gallery": "gallery", "Partners": "partners",
  };
  const nav = (item) => {
    const route = ROUTE[item] || "home";
    setOpen(false);
    go(route);
  };
  return (
    <header className="site-header" style={{
      position: "sticky", top: 0, zIndex: 50, height: "var(--header-height)",
      background: "var(--tedx-black)", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 var(--gutter)",
      borderBottom: "1px solid #161616", gap: 40,
    }}>
      <div style={{ flex: "none" }}><Logo width={200} onClick={() => go("home")} /></div>

      {/* desktop nav */}
      <nav className="nav-desktop" style={{ display: "flex", gap: 26, alignItems: "center", flexWrap: "nowrap" }}>
        {NAV.map((item) => {
          const route = ROUTE[item] || "home";
          const active = route !== "home" && (route === page || (route === "speakers" && page === "speaker"));
          return <NavItem key={item} label={item} active={active} onClick={() => nav(item)} />;
        })}
      </nav>

      {/* hamburger (mobile only) */}
      <button className="nav-burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, flex: "none", flexDirection: "column", gap: 5, width: 40 }}>
        <span style={{ display: "block", height: 2, width: 26, background: "#fff", transform: open ? "translateY(7px) rotate(45deg)" : "none", transition: "transform .2s" }} />
        <span style={{ display: "block", height: 2, width: 26, background: "#fff", opacity: open ? 0 : 1, transition: "opacity .2s" }} />
        <span style={{ display: "block", height: 2, width: 26, background: "#fff", transform: open ? "translateY(-7px) rotate(-45deg)" : "none", transition: "transform .2s" }} />
      </button>

      {/* mobile drawer */}
      {open && (
        <div className="nav-drawer" style={{ position: "fixed", left: 0, right: 0, top: "var(--header-height)", bottom: 0,
          background: "var(--tedx-black)", zIndex: 49, padding: "24px var(--gutter)", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
          {NAV.map((item) => {
            const route = ROUTE[item] || "home";
            const active = route !== "home" && (route === page || (route === "speakers" && page === "speaker"));
            return (
              <a key={item} href="#" onClick={(e) => { e.preventDefault(); nav(item); }}
                style={{ font: "700 28px/1.2 var(--font-display)", letterSpacing: "-.02em", textTransform: "uppercase",
                  color: active ? "var(--tedx-red)" : "#fff", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid var(--border-hairline)" }}>
                {item}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

function NavItem({ label, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 400,
        color: active ? "var(--tedx-red)" : h ? "var(--tedx-red)" : "#fff",
        textDecoration: "none", transition: "color .2s", whiteSpace: "nowrap",
      }}>
      {label}
    </a>
  );
}
window.Header = Header;
