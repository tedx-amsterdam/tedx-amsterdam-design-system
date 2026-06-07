import React from "react";

/**
 * TEDxAmsterdam — NavigationBar
 * Sticky top bar: logo left, nav links centre, CTA button right.
 * Collapses to hamburger menu at < 768px (detected via window.innerWidth).
 * Pass `base` to resolve asset paths from nested HTML files.
 */
export function NavigationBar({ links = [], ctaLabel, ctaHref, logoHref = "/", activePath, base = "", style }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const uid = React.useId();
  const menuId = `nav-mobile-menu-${uid}`;
  const hamburgerRef = React.useRef(null);

  // Responsive detection — initialise on mount to avoid SSR hydration mismatch
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close menu on Escape and return focus to hamburger button
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const logoSrc = base + "assets/logo-tedxamsterdam-white.png";

  const linkStyle = (href) => ({
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-bold)",
    fontSize: "var(--fs-tag)",
    letterSpacing: "var(--ls-wide)",
    textTransform: "uppercase",
    color: activePath === href ? "var(--text-accent)" : "var(--text-primary)",
    textDecoration: "none",
  });

  const ctaStyle = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-bold)",
    fontSize: 14,
    padding: "12px 24px",
    background: "var(--tedx-red)",
    color: "var(--tedx-white)",
    borderRadius: "var(--radius-button)",
    textDecoration: "none",
    flex: "none",
    lineHeight: 1,
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        background: "var(--bg-base)",
        borderBottom: "1px solid var(--border-hairline)",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div
        style={{
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--gutter)",
          gap: "var(--space-8)",
        }}
      >
        {/* Logo */}
        <a href={logoHref} style={{ display: "inline-flex", textDecoration: "none", flex: "none" }}>
          <img src={logoSrc} alt="TEDxAmsterdam" style={{ width: 160, height: "auto", display: "block" }} />
        </a>

        {/* Desktop: nav links + CTA */}
        {!isMobile && (
          <>
            <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "var(--space-8)", marginLeft: "auto" }}>
              {links.map((link) => (
                <a key={link.href} href={link.href} aria-current={activePath === link.href ? "page" : undefined} style={linkStyle(link.href)}>
                  {link.label}
                </a>
              ))}
            </nav>
            {ctaHref && ctaLabel && (
              <a href={ctaHref} style={ctaStyle}>{ctaLabel}</a>
            )}
          </>
        )}

        {/* Mobile: hamburger */}
        {isMobile && (
          <button
            ref={hamburgerRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
              padding: "var(--space-2)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg aria-hidden="true" width="24" height="18" viewBox="0 0 24 18" fill="none">
              {menuOpen ? (
                <>
                  <line x1="2" y1="2" x2="22" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="22" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="0" y1="2" x2="24" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Mobile menu dropdown */}
      {isMobile && menuOpen && (
        <div
          id={menuId}
          style={{
            background: "var(--bg-base)",
            borderBottom: "1px solid var(--border-hairline)",
            padding: "var(--space-6) var(--gutter)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <nav aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={activePath === link.href ? "page" : undefined}
                style={{ ...linkStyle(link.href), display: "block", padding: "var(--space-2) 0" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {ctaHref && ctaLabel && (
            <a href={ctaHref} onClick={() => setMenuOpen(false)} style={{ ...ctaStyle, alignSelf: "flex-start" }}>{ctaLabel}</a>
          )}
        </div>
      )}
    </header>
  );
}
