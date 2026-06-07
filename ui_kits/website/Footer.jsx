/* TEDxAmsterdam — site footer with red radial glow + big wordmark */
function Social({ network, label }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none",
        fontFamily: "var(--font-sans)", fontSize: 20, color: h ? "var(--tedx-red)" : "#fff", transition: "color .2s" }}>
      <img src={ASSET + "icon-" + network + ".svg"} alt="" style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
      {label}
    </a>
  );
}

function FootCol({ heading, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Tag color="white">{heading}</Tag>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>{children}</div>
    </div>
  );
}

function FootLink({ children }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontFamily: "var(--font-sans)", fontSize: 20, color: h ? "var(--tedx-red)" : "#fff", textDecoration: "none", transition: "color .2s" }}>
      {children}
    </a>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <footer style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", paddingTop: 200 }}>
      {/* red radial glow rising from the bottom */}
      <div style={{ position: "absolute", left: "50%", bottom: -260, transform: "translateX(-50%)",
        width: 1700, height: 760, background: "radial-gradient(60% 70% at 50% 100%, var(--tedx-red) 0%, #8e0019 38%, rgba(0,0,0,0) 72%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", padding: "0 var(--gutter-wide) 40px",
        display: "grid", gridTemplateColumns: "1fr 1fr 1.4fr", gap: 60, alignItems: "start" }}>
        <FootCol heading="Menu">
          <FootLink>FAQ</FootLink><FootLink>Contact</FootLink>
          <FootLink>Become a partner</FootLink><FootLink>Become a volunteer</FootLink>
        </FootCol>
        <FootCol heading="Social media">
          <Social network="linkedin" label="LinkedIn" />
          <Social network="instagram" label="Instagram" />
          <Social network="youtube" label="YouTube" />
        </FootCol>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <h3 style={{ margin: 0, font: "700 36px/1.1 var(--font-display)", letterSpacing: "-.02em", color: "#fff", textTransform: "uppercase" }}>
            Subscribe<br />to newsletter
          </h3>
          {ok ? (
            <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 18, color: "#fff" }}>Thanks — you're on the list.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setOk(true); }} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,.85)" }}>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  style={{ background: "transparent", border: "none", borderBottom: "1px solid var(--border-hairline)",
                    padding: "8px 0", fontFamily: "var(--font-sans)", fontSize: 20, color: "#fff", outline: "none" }} />
              </label>
              <label style={{ display: "flex", gap: 12, alignItems: "flex-start", fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,.7)", maxWidth: 460 }}>
                <input type="checkbox" style={{ marginTop: 3, accentColor: "var(--tedx-red)" }} />
                I agree to the processing of my personal data for the purpose of receiving emails from TEDxAmsterdam, in accordance with the Privacy Policy.
              </label>
              <Btn variant="secondary" full type="submit">SIGN UP</Btn>
            </form>
          )}
        </div>
      </div>

      <div style={{ position: "relative", padding: "0 var(--gutter-wide)" }}>
        <img src={ASSET + "logo-tedxamsterdam-white.png"} alt="TEDxAmsterdam" style={{ width: "100%", display: "block" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 60px", padding: "20px 0 40px",
          fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,.85)" }}>
          <span>This independent TEDx event is operated under license from TED</span>
          <span>Copyright Stichting TEDxAmsterdam, 2025</span>
          <span>All Rights Reserved</span>
          <span>Privacy policy</span>
          <span>Design busy.studio</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
