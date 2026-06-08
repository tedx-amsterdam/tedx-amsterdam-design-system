/* TEDxAmsterdam — Homepage ("Amsterdam Reimagined") */
function Home({ go }) {
  return (
    <main style={{ background: "var(--tedx-black)" }}>
      <Hero />
      <IntroBand />
      <EventDetail />
      <SpeakersBand go={go} />
      <Snapshots go={go} />
      <Timetable />
      <TicketsCTA />
      <ImpactProgram />
      <Newsletter />
      <UpcomingEvents go={go} />
    </main>
  );
}

/* ---- HERO ---- */
function Hero() {
  const [done, setDone] = useState(false);
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", minHeight: 620 }}>
      {/* ambient heat bloom top-right */}
      <div style={{ position: "absolute", inset: 0, background:
        "radial-gradient(70% 90% at 78% 18%, rgba(255,155,25,.55) 0%, rgba(235,0,40,.55) 34%, rgba(90,0,16,.6) 62%, rgba(0,0,0,0) 84%)", pointerEvents: "none" }} />
      <EdgeGlows />
      <div style={{ position: "relative", padding: "120px var(--gutter-wide) 96px", display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ maxWidth: 1000 }}>
          <div style={{ marginBottom: 18 }}><Tag>Past&nbsp;&rarr;&nbsp;Present&nbsp;&rarr;&nbsp;Future</Tag></div>
          <h1 style={{ margin: 0, font: "700 clamp(64px,7vw,110px)/0.95 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>
            Amsterdam<br /><span style={{ color: "var(--tedx-red)" }}>Reimagined</span>
          </h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, alignItems: "flex-end" }}>
          <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 28 }}>
            <p style={{ margin: 0, font: "var(--text-body)", color: "#fff" }}>
              Be the first to get notified when tickets go on sale.
            </p>
            {done
              ? <Tag color="white" dot>You're on the list</Tag>
              : <div><Btn variant="primary" size="lg" onClick={() => setDone(true)}>NOTIFY ME</Btn></div>}
          </div>
          <p style={{ margin: 0, maxWidth: 420, font: "var(--text-body)", color: "rgba(255,255,255,.85)" }}>
            How can Amsterdam's spirit of connection shape a just and meaningful future?
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---- INTRO BAND ---- */
function IntroBand() {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "100px var(--gutter-wide)" }}>
      <div style={{ position: "absolute", left: -200, top: -120, width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,121,25,.4), rgba(235,0,40,.2) 50%, rgba(0,0,0,0) 72%)", pointerEvents: "none" }} />
      <h2 style={{ position: "relative", margin: 0, maxWidth: 1080, font: "700 clamp(30px,3.4vw,52px)/1.15 var(--font-display)", letterSpacing: "-.02em", textTransform: "uppercase", color: "#fff" }}>
        "Amsterdam Reimagined" explores culture, inclusion, innovation, and sustainability — reflecting on the city's past, questioning its present, and shaping its future.
      </h2>
    </section>
  );
}

/* ---- EVENT DETAIL ---- */
function DetailRow({ k, v }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--border-hairline)", padding: "22px 0" }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,.7)" }}>{k}</span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 24, fontWeight: 700, color: "var(--tedx-red)", letterSpacing: "-.01em" }}>{v}</span>
    </div>
  );
}
function EventDetail() {
  const [waiting, setWaiting] = useState(false);
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "0 var(--gutter-wide) 110px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 120, alignItems: "start" }}>
      <EdgeGlows />
      <div style={{ position: "relative" }}>
        <DetailRow k="date" v="23.07" />
        <DetailRow k="time" v="10:00" />
        <DetailRow k="place" v="ANNOUNCED SOON" />
        <div style={{ marginTop: 40 }}>
          {waiting ? <Tag color="white" dot>Added to the waiting list</Tag>
            : <Btn variant="primary" size="lg" onClick={() => setWaiting(true)}>JOIN WAITING LIST</Btn>}
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 28, paddingTop: 8 }}>
        <Tag>About</Tag>
        {["Rethinking Amsterdam's culture, identity, and future",
          "Exploring the city's spirit of connection and justice",
          "Speakers on the Past, Present, Future & Radical Future"].map((t) => (
          <p key={t} style={{ margin: 0, font: "var(--text-body)", color: "#fff" }}>{t}</p>
        ))}
      </div>
    </section>
  );
}

/* ---- SPEAKERS BAND ---- */
function SpeakersBand({ go }) {
  const [i, setI] = useState(0);
  const visible = [0, 1, 2, 3].map((n) => SPEAKERS[(i + n) % SPEAKERS.length]);
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "20px var(--gutter-wide) 110px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 440 }}>
          <Tag>Speakers</Tag>
          <h2 style={{ margin: 0, font: "var(--text-h2)", letterSpacing: "-.03em", color: "#fff" }}>Our Speakers</h2>
          <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(255,255,255,.8)" }}>
            TEDxAmsterdam invites speakers to inspire with powerful stories. Each year, a new theme sparks inspiration and ideas.
          </p>
          <ALink onClick={() => go("speaker")}>Check out our past Speakers</ALink>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, justifySelf: "end", minWidth: 420 }}>
          <StatRow value="2009" label="events have been organised since" />
          <div style={{ height: 1, background: "var(--border-hairline)" }} />
          <StatRow value="20K" label="people over the last 3 years" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {visible.map((s, n) => <SpeakerCard key={n} s={s} onClick={() => go("speaker")} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 14, marginTop: 28 }}>
        <CarouselBtn dir="left" onClick={() => setI((i - 1 + SPEAKERS.length) % SPEAKERS.length)} />
        <CarouselBtn dir="right" onClick={() => setI((i + 1) % SPEAKERS.length)} />
      </div>
    </section>
  );
}
function StatRow({ value, label }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 24, padding: "10px 0" }}>
      <span style={{ font: "700 80px/1 var(--font-display)", letterSpacing: "-.03em", color: "#fff" }}>{value}</span>
      <span style={{ font: "var(--text-body)", fontSize: 18, color: "rgba(255,255,255,.8)", maxWidth: 160, paddingTop: 14 }}>{label}</span>
    </div>
  );
}
function SpeakerCard({ s, onClick }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", gap: 14, textDecoration: "none" }}>
      <div style={{ aspectRatio: "3 / 4", background: "var(--grad-tile)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "var(--grad-tile)", transform: h ? "scale(1.04)" : "scale(1)", transition: "transform .4s" }} />
      </div>
      <h4 style={{ margin: 0, font: "700 16px/1.15 var(--font-display)", textTransform: "uppercase", letterSpacing: "-.01em", color: "#fff" }}>{s.topic}</h4>
      <Tag color="white" dot>{s.name}</Tag>
    </a>
  );
}
function CarouselBtn({ dir, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width: 48, height: 48, borderRadius: "50%", border: "1.5px solid var(--border-hairline)",
        background: h ? "var(--tedx-red)" : "transparent", color: "#fff", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s",
        transform: dir === "left" ? "scaleX(-1)" : "none" }}>
      <Arrow w={18} />
    </button>
  );
}
Object.assign(window, { Home, CarouselBtn });
