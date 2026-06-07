/* TEDxAmsterdam — secondary pages: Speakers grid, Team, Partners, Gallery */

/* ---- shared page hero (title + about column) ---- */
function PageHero({ title, titleColor = "#fff", eyebrow, desc, link, onLink }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "70px var(--gutter-wide) 50px", borderBottom: "1px solid var(--border-hairline)" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 900, height: 520, background: "radial-gradient(60% 70% at 6% 10%, rgba(235,0,40,.4), rgba(0,0,0,0) 62%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "start" }}>
        <h1 style={{ margin: 0, font: "700 clamp(56px,7vw,104px)/0.9 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: titleColor }}>{title}</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 12, maxWidth: 460 }}>
          {eyebrow && <Tag>{eyebrow}</Tag>}
          {desc && <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(255,255,255,.85)" }}>{desc}</p>}
          {link && <div style={{ marginTop: 4 }}><ALink onClick={onLink}>{link}</ALink></div>}
        </div>
      </div>
    </section>
  );
}

/* =================== SPEAKERS GRID =================== */
function SpeakersPage({ go }) {
  return (
    <main style={{ background: "var(--tedx-black)" }}>
      <PageHero title="Speakers" eyebrow="About Speakers"
        desc="TEDxAmsterdam invites speakers to inspire with powerful stories. Each year, a new theme sparks inspiration and ideas." />

      <section style={{ position: "relative", overflow: "hidden", padding: "70px var(--gutter-wide) 40px" }}>
        <EdgeGlows />
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "48px 20px" }}>
          {LINEUP.map((s, i) => (
            <a key={i} href="#" onClick={(e) => { e.preventDefault(); go("speaker"); }}
              style={{ display: "flex", flexDirection: "column", gap: 14, textDecoration: "none" }}>
              <div style={{ aspectRatio: "1 / 1.25", background: "var(--grad-tile)" }} />
              <h4 style={{ margin: 0, font: "700 17px/1.18 var(--font-display)", textTransform: "uppercase", letterSpacing: "-.01em", color: "#fff" }}>{s.topic}</h4>
              <Tag color="white" dot>{s.name}</Tag>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--tedx-gray-400)" }}>{s.role}</span>
            </a>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--tedx-black)", padding: "70px var(--gutter-wide) 110px", borderTop: "1px solid var(--border-hairline)", marginTop: 40 }}>
        <h2 style={{ margin: "0 0 48px", font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Past Speakers</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "48px 20px" }}>
          {PAST_SPEAKERS.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ aspectRatio: "1 / 1.1", background: "linear-gradient(160deg, var(--tedx-gray-700), var(--tedx-gray-900))" }} />
              <h4 style={{ margin: 0, font: "700 17px/1.18 var(--font-display)", textTransform: "uppercase", letterSpacing: "-.01em", color: "#fff" }}>{s.talk}</h4>
              <Tag color="white" dot>{s.name}</Tag>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--tedx-gray-400)" }}>{s.role}</span>
              <div style={{ marginTop: 4 }}><ALink>Watch the talk</ALink></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* =================== TEAM =================== */
function TeamPage() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? TEAM : TEAM.filter((m) => m.group === filter);
  return (
    <main style={{ background: "var(--tedx-black)" }}>
      <PageHero title={<>Our<br />Team</>} eyebrow="About Team"
        desc="Our 100% volunteer-led team brings events to life with skill and passion — from behind the scenes to showtime. Together, we push boundaries to build a better city and a better world." />

      <section style={{ position: "relative", overflow: "hidden", padding: "44px var(--gutter-wide) 100px" }}>
        <EdgeGlows />
        <div style={{ position: "relative", display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 48 }}>
          {TEAM_GROUPS.map((g) => (
            <button key={g} onClick={() => setFilter(g)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0,
                fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em",
                color: filter === g ? "var(--tedx-red)" : "rgba(255,255,255,.55)", transition: "color .2s" }}>{g}</button>
          ))}
        </div>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "40px 20px" }}>
          {shown.map((m, i) => <TeamCard key={m.name + i} m={m} />)}
        </div>
      </section>

      <section style={{ background: "var(--tedx-black)", padding: "20px var(--gutter-wide) 110px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 90, alignItems: "start" }}>
        <div>
          <h2 style={{ margin: "0 0 40px", font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Volunteer<br />Opportunities</h2>
          <Tag>Open positions</Tag>
          <div style={{ marginTop: 22 }}>
            {OPEN_ROLES.map((r) => (
              <div key={r} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-hairline)", padding: "20px 0" }}>
                <span style={{ font: "var(--text-body)", color: "#fff" }}>{r}</span>
                <ALink>Join us</ALink>
              </div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 96, maxWidth: 440 }}>
          <Tag>Volunteer</Tag>
          <p style={{ margin: "18px 0 0", font: "var(--text-body)", color: "rgba(255,255,255,.85)" }}>
            A large group of volunteers dedicate their time and energy to set up events and build our community, acting as personal ambassadors for change and innovation. With their professional skills and boundless enthusiasm, they make TEDxAmsterdam possible.
          </p>
        </div>
      </section>
    </main>
  );
}
function TeamCard({ m }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ position: "relative", aspectRatio: "1 / 1.12", background: "linear-gradient(160deg, var(--tedx-gray-700), var(--tedx-gray-900))", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(235,0,40,.85)", opacity: h ? 1 : 0, transition: "opacity .2s",
          display: "flex", alignItems: "flex-end", padding: 14 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#fff", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700 }}>
            <img src={ASSET + "icon-linkedin.svg"} alt="" style={{ width: 18, height: 18, filter: "brightness(0) invert(1)" }} />
            LinkedIn <Arrow w={16} />
          </span>
        </div>
      </div>
      <h4 style={{ margin: 0, font: "700 14px/1.2 var(--font-sans)", textTransform: "uppercase", letterSpacing: ".02em", color: "#fff" }}>{m.name}</h4>
      <Tag color="muted" dot style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>{m.role}</Tag>
    </div>
  );
}

/* =================== PARTNERS =================== */
function PartnersPage() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <main style={{ background: "var(--tedx-black)" }}>
      <PageHero title={<>How to<br />become<br />a partner</>} eyebrow="About our partners"
        desc="Our partners believe in making a change. It's thanks to them that ideas worth sharing transcend beyond being just an idea. Our partners are part of the movement. They don't just talk about it. They ACT."
        link="Join us" />

      {/* red become-a-partner band */}
      <section style={{ background: "var(--tedx-red)", padding: "80px var(--gutter-wide)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{ maxWidth: 460 }}>
          <h2 style={{ margin: "0 0 24px", font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#000" }}>Become<br />a partner</h2>
          <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(0,0,0,.82)" }}>
            Become a partner for 2025 and support the TEDxAmsterdam community by reaching out to partners@tedxamsterdam.nl.
          </p>
        </div>
        {ok ? <p style={{ margin: 0, font: "var(--text-body)", color: "#000" }}>Thanks — we'll be in touch.</p> : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setOk(true); }} style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(0,0,0,.7)" }}>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,.45)", padding: "8px 0", fontFamily: "var(--font-sans)", fontSize: 20, color: "#000", outline: "none" }} />
            </label>
            <label style={{ display: "flex", gap: 12, alignItems: "flex-start", fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(0,0,0,.7)", maxWidth: 460 }}>
              <input type="checkbox" style={{ marginTop: 3 }} />
              I agree to the processing of my personal data for the purpose of receiving emails from TEDxAmsterdam, in accordance with the Privacy Policy.
            </label>
            <Btn variant="secondary" type="submit">SIGN UP</Btn>
          </form>
        )}
      </section>

      <section style={{ position: "relative", overflow: "hidden", padding: "90px var(--gutter-wide) 120px" }}>
        <EdgeGlows />
        <h2 style={{ position: "relative", margin: "0 0 56px", font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Our Partners</h2>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "40px 24px" }}>
          {PARTNERS.map((p) => (
            <div key={p} style={{ height: 92, display: "flex", alignItems: "center", justifyContent: "center",
              borderTop: "1px solid var(--border-hairline)", color: "rgba(255,255,255,.85)",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "-.01em", textAlign: "center" }}>{p}</div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* =================== GALLERY =================== */
function GalleryPage() {
  const imgs = [ASSET + "photo-event-1.jpg", ASSET + "photo-stage.jpg", ASSET + "photo-crowd.jpg",
                ASSET + "photo-audience.jpg", ASSET + "photo-event-2.jpg"];
  const spans = [[5,2],[3,2],[4,1],[4,1],[3,1],[5,2],[4,1],[3,2],[5,1]];
  return (
    <main style={{ background: "var(--tedx-black)" }}>
      <PageHero title="Gallery" eyebrow="From our past events"
        desc="A look back at the speakers, ideas and people that made past editions of TEDxAmsterdam unforgettable." />
      <section style={{ padding: "60px var(--gutter-wide) 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridAutoRows: 150, gap: 16 }}>
          {spans.map(([c, r], i) => (
            <div key={i} style={{ gridColumn: `span ${c}`, gridRow: `span ${r}`,
              background: `var(--img-scrim), url(${imgs[i % imgs.length]}) center/cover no-repeat #000` }} />
          ))}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { PageHero, SpeakersPage, TeamPage, PartnersPage, GalleryPage });
