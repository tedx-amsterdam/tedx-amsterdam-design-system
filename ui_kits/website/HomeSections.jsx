/* TEDxAmsterdam — Homepage lower sections */

/* ---- SNAPSHOTS (full-bleed red gallery teaser) ---- */
function Snapshots({ go }) {
  const imgs = [ASSET + "photo-event-1.jpg", ASSET + "photo-stage.jpg", ASSET + "photo-crowd.jpg",
                ASSET + "photo-audience.jpg", ASSET + "photo-event-2.jpg"];
  return (
    <section style={{ background: "var(--tedx-red)", padding: "90px var(--gutter-wide)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
        <h2 style={{ margin: 0, font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff", maxWidth: 620 }}>
          Snapshots from our past events
        </h2>
        <ALink color="white" onClick={() => go("blog")}>View our gallery</ALink>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridAutoRows: 150, gap: 16 }}>
        <Snap img={imgs[0]} c="span 4" r="span 2" />
        <Snap img={imgs[1]} c="span 3" r="span 1" mt={40} />
        <Snap img={imgs[2]} c="span 5" r="span 2" />
        <Snap img={imgs[3]} c="span 3" r="span 1" />
        <Snap img={imgs[4]} c="span 4" r="span 1" />
        <Snap img={imgs[1]} c="span 5" r="span 1" />
      </div>
    </section>
  );
}
function Snap({ img, c, r, mt = 0 }) {
  return <div style={{ gridColumn: c, gridRow: r, marginTop: mt, background: `var(--img-scrim), url(${img}) center/cover no-repeat #000` }} />;
}

/* ---- TIMETABLE ---- */
function Timetable() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "100px var(--gutter-wide)" }}>
      <EdgeGlows />
      <h2 style={{ position: "relative", margin: "0 0 48px", font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Timetable</h2>
      <div style={{ position: "relative" }}>
        {TIMETABLE.map((row, idx) => <TtRow key={idx} row={row} />)}
      </div>
    </section>
  );
}
function TtRow({ row }) {
  const isSession = row.kind === "session";
  const isBreak = row.kind === "break";
  if (isBreak) {
    return (
      <div style={{ display: "flex", gap: 40, alignItems: "center", padding: "16px 0", borderTop: "1px solid var(--border-hairline)" }}>
        <span style={{ width: 120, fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,.7)" }}>{row.time}</span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: "rgba(255,255,255,.7)" }}>{row.title}</span>
      </div>
    );
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 40, alignItems: "center", padding: "28px 0", borderTop: "1px solid var(--border-hairline)" }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "#fff" }}>{row.time}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <h3 style={{ margin: 0, font: "700 28px/1.1 var(--font-display)", letterSpacing: "-.02em", textTransform: "uppercase", color: isSession ? "var(--tedx-red)" : "#fff" }}>{row.title}</h3>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,.6)" }}>short description</span>
      </div>
      {isSession && (
        <div style={{ display: "flex", gap: 12 }}>
          {[0, 1, 2, 3].map((n) => <div key={n} style={{ width: 92, height: 92, background: "var(--grad-tile)" }} />)}
        </div>
      )}
    </div>
  );
}

/* ---- TICKETS CTA ---- */
function TicketsCTA() {
  const [done, setDone] = useState(false);
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "130px var(--gutter-wide)", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 90% at 50% 50%, rgba(255,155,25,.45), rgba(235,0,40,.5) 38%, rgba(60,0,12,.4) 66%, rgba(0,0,0,0) 84%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 28, maxWidth: 720 }}>
        <Tag>Early Bird</Tag>
        <h2 style={{ margin: 0, font: "700 clamp(40px,5vw,72px)/1 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Be the first to get tickets</h2>
        <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(255,255,255,.85)", maxWidth: 480 }}>
          Don't miss out — sign up now for early-bird access and be the first to know when tickets go on sale.
        </p>
        {done ? <Tag color="white" dot>You're on the list</Tag>
          : <Btn variant="primary" size="lg" onClick={() => setDone(true)}>JOIN WAITING LIST</Btn>}
      </div>
    </section>
  );
}

/* ---- IMPACT PROGRAM ---- */
function ImpactProgram() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "20px var(--gutter-wide) 110px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 420 }}>
        <Tag>Start-up Accelerator</Tag>
        <h2 style={{ margin: 0, font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Impact Program</h2>
        <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(255,255,255,.85)" }}>
          The Impact Program is a start-up accelerator unique to TEDxAmsterdam and designed to help bring ideas into action!
        </p>
        <ALink>Learn more about the Impact Program</ALink>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
          <div style={{ aspectRatio: "4/3", background: `var(--img-scrim), url(${ASSET}photo-crowd.jpg) center/cover no-repeat #000` }} />
          <div style={{ aspectRatio: "4/3", background: `var(--img-scrim), url(${ASSET}photo-audience.jpg) center/cover no-repeat #000` }} />
        </div>
      </div>
      <p style={{ margin: 0, font: "var(--text-body)", color: "#fff", maxWidth: 520, justifySelf: "end" }}>
        Over eight weeks, our Impact Pioneers will engage in weekly in-person strategy sessions with expert coaching and mentorship, to develop essential skills and build their business. The program concludes with a final Impact event, where participants will pitch their ideas to a supportive audience.
      </p>
    </section>
  );
}

/* ---- NEWSLETTER ---- */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <section style={{ background: "var(--tedx-black)", padding: "0 var(--gutter-wide) 110px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <h2 style={{ margin: 0, font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Join our Newsletter</h2>
        <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(255,255,255,.8)" }}>Be inspired and first to know about our events.</p>
      </div>
      {ok ? <p style={{ margin: 0, font: "var(--text-body)", color: "#fff" }}>Thanks — you're subscribed.</p>
        : (
        <form onSubmit={(e) => { e.preventDefault(); if (email) setOk(true); }} style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
          <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,.85)" }}>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              style={{ background: "transparent", border: "none", borderBottom: "1px solid var(--border-hairline)", padding: "8px 0", fontFamily: "var(--font-sans)", fontSize: 20, color: "#fff", outline: "none" }} />
          </label>
          <Btn variant="secondary" type="submit">Sign up</Btn>
        </form>
      )}
    </section>
  );
}

/* ---- UPCOMING EVENTS ---- */
function UpcomingEvents({ go }) {
  const items = POSTS.slice(0, 3);
  return (
    <section style={{ background: "var(--tedx-black)", padding: "0 var(--gutter-wide) 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <h2 style={{ margin: 0, font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Upcoming events</h2>
        <ALink onClick={() => go("blog")}>View All Events</ALink>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
        {items.map((p, i) => <PostCard key={i} p={p} onClick={() => go("blog")} ratio="16 / 10" />)}
      </div>
    </section>
  );
}

/* ---- shared post card ---- */
function PostCard({ p, onClick, ratio = "4 / 3" }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", gap: 16, textDecoration: "none", color: "#fff" }}>
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: ratio, background: "var(--grad-tile)" }}>
        <div style={{ position: "absolute", inset: 0, background: `url(${p.img}) center/cover no-repeat`, transform: h ? "scale(1.04)" : "scale(1)", transition: "transform .4s" }} />
        <span style={{ position: "absolute", left: 14, top: 14, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.6)" }}>{p.cat}</span>
      </div>
      <h3 style={{ margin: 0, font: "700 22px/1.15 var(--font-display)", letterSpacing: "-.02em", textTransform: "uppercase" }}>{p.title}</h3>
      <Tag color="white" dot>{p.date}</Tag>
    </a>
  );
}

Object.assign(window, { Snapshots, Timetable, TicketsCTA, ImpactProgram, Newsletter, UpcomingEvents, PostCard });
