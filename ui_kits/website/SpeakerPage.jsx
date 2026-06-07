/* TEDxAmsterdam — Speaker detail page */
function SpeakerPage({ go }) {
  const [idx, setIdx] = useState(0);
  const s = SPEAKERS[idx];
  return (
    <main style={{ background: "var(--tedx-black)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(50% 50% at 18% 30%, rgba(235,0,40,.35), rgba(0,0,0,0) 60%)", pointerEvents: "none" }} />
      <section style={{ position: "relative", padding: "80px var(--gutter-wide) 110px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 90, alignItems: "start" }}>
        {/* left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <Tag>Topic</Tag>
          <h1 style={{ margin: 0, font: "700 clamp(48px,5.5vw,84px)/0.95 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: "var(--tedx-red)" }}>{s.topic}</h1>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <Tag color="white" dot>{s.date}</Tag>
            <Tag color="white" dot>{s.place}</Tag>
          </div>
          <p style={{ margin: 0, font: "var(--text-body)", color: "#fff", maxWidth: 640 }}>{s.bio}</p>
          <div style={{ height: 1, background: "var(--border-hairline)", margin: "20px 0" }} />
          <Tag>About</Tag>
          <h2 style={{ margin: 0, font: "var(--text-h2)", letterSpacing: "-.02em", textTransform: "uppercase", color: "#fff" }}>{s.name}</h2>
          <Tag color="white" dot>{s.role}</Tag>
        </div>

        {/* right column — portrait tile */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "sticky", top: 110 }}>
          <div style={{ position: "relative", aspectRatio: "3 / 4", background: "var(--grad-tile)" }}>
            <span style={{ position: "absolute", left: 0, bottom: 22, background: "var(--tedx-black)", color: "#fff",
              padding: "12px 22px", font: "700 18px/1 var(--font-sans)", textTransform: "uppercase", letterSpacing: ".02em" }}>{s.name}</span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <SpkSocial network="linkedin" label="LinkedIn" />
            <SpkSocial network="instagram" label="Instagram" />
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
            <CarouselBtn dir="left" onClick={() => setIdx((idx - 1 + SPEAKERS.length) % SPEAKERS.length)} />
            <CarouselBtn dir="right" onClick={() => setIdx((idx + 1) % SPEAKERS.length)} />
          </div>
        </div>
      </section>
    </main>
  );
}
function SpkSocial({ network, label }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onClick={(e) => e.preventDefault()} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", fontFamily: "var(--font-sans)", fontSize: 18, color: h ? "var(--tedx-red)" : "#fff", transition: "color .2s" }}>
      <img src={ASSET + "icon-" + network + ".svg"} alt="" style={{ width: 20, height: 20, filter: "brightness(0) invert(1)" }} />
      {label}
    </a>
  );
}
window.SpeakerPage = SpeakerPage;
