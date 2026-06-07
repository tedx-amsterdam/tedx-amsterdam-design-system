/* TEDxAmsterdam — Event Program page (the "X-monogram" landing).
   Recreated from /work/event-page (review build, 05.09). */
function EventProgramPage({ go }) {
  return (
    <main style={{ background: "var(--tedx-black)" }}>
      <EventHero go={go} />
      <EventDare />
      <EventStory />
      <EventUpNext go={go} />
      <EventSpeakers />
    </main>
  );
}

/* ---- HERO with big X monogram ---- */
function EventX() {
  // Striped red "X" monogram — two crossing chevron bars filled with
  // vertical red→orange stripes (recreated from the Figma Vector tiling).
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
      style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 760, height: 800, maxWidth: "92%", opacity: 0.92 }}>
      <defs>
        <linearGradient id="evx" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b3001f" />
          <stop offset="22%" stopColor="#eb0028" />
          <stop offset="42%" stopColor="#ff7919" />
          <stop offset="55%" stopColor="#ff9b19" />
          <stop offset="70%" stopColor="#eb0028" />
          <stop offset="100%" stopColor="#7a0016" />
        </linearGradient>
        <pattern id="evxstripe" width="26" height="800" patternUnits="userSpaceOnUse">
          <rect width="26" height="800" fill="url(#evx)" />
          <rect x="22" width="4" height="800" fill="#000" opacity="0.55" />
        </pattern>
        <clipPath id="evxclip">
          <polygon points="60,0 300,330 540,0 600,0 600,70 360,400 600,730 600,800 540,800 300,470 60,800 0,800 0,730 240,400 0,70 0,0" />
        </clipPath>
      </defs>
      <rect width="600" height="800" fill="url(#evxstripe)" clipPath="url(#evxclip)" />
    </svg>
  );
}
function EventHero({ go }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: 720, background: "var(--tedx-black)" }}>
      {/* warm motion-blur backdrop */}
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)), url(${ASSET}event-hero-x.png) 78% 30% / cover no-repeat`,
        pointerEvents: "none" }} />
      {/* big striped X monogram */}
      <EventX />
      {/* legibility scrims top + bottom + left text column */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 60%, rgba(0,0,0,.7) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.35) 34%, rgba(0,0,0,0) 56%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", padding: "120px var(--gutter-wide) 90px", maxWidth: 1180 }}>
        <Tag color="white" style={{ letterSpacing: ".06em" }}>Past&nbsp;—&nbsp;Present&nbsp;—&nbsp;Future</Tag>
        <h1 style={{ margin: "20px 0 0", font: "700 clamp(64px,7.5vw,118px)/0.92 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>
          Amsterdam<br /><span style={{ color: "var(--tedx-red)" }}>Reimagined</span>
        </h1>
        <p style={{ margin: "26px 0 0", maxWidth: 430, font: "var(--text-body)", color: "rgba(255,255,255,.9)" }}>
          The future isn't written. It's imagined, one bold idea at a time.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 30, alignItems: "center", marginTop: 48 }}>
          <Btn variant="primary" size="lg" onClick={() => go("home")}>SECURE YOUR SEAT</Btn>
          <p style={{ margin: 0, maxWidth: 280, font: "var(--text-body)", fontSize: 16, color: "rgba(255,255,255,.85)" }}>
            Join us to hear the ideas that are shaping our future
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---- WE BECOME THE CITY + event detail ---- */
function EventDare() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "100px var(--gutter-wide)" }}>
      <EdgeGlows />
      <h2 style={{ position: "relative", margin: "0 0 64px", maxWidth: 900, font: "700 clamp(34px,4vw,60px)/1.05 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>
        We become the city we dare to imagine
      </h2>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
        <div>
          <EventRow k="date" v="OCTOBER 16, 2025" />
          <EventRow k="time" v="STARTING FROM 13:00" />
          <EventRow k="place" v="DE HALLEN STUDIO'S" />
        </div>
        <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(255,255,255,.85)", maxWidth: 480 }}>
          This year's theme is all about re-thinking the way things have always been. Amsterdam Reimagined explores culture, inclusion, innovation, and sustainability. The theme reflects on the city's past, questioning its present, and shaping its future.
        </p>
      </div>
    </section>
  );
}
function EventRow({ k, v }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, borderBottom: "1px solid var(--border-hairline)", padding: "24px 0" }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.65)" }}>{k}</span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, letterSpacing: "-.01em", color: "var(--tedx-red)", textAlign: "right" }}>{v}</span>
    </div>
  );
}

/* ---- FOR 750 YEARS + new chapter story ---- */
function EventStory() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "0 var(--gutter-wide) 110px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 90, alignItems: "start", marginBottom: 90 }}>
        <h2 style={{ margin: 0, font: "700 clamp(32px,3.6vw,52px)/1 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>For 750 years</h2>
        <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(255,255,255,.85)", maxWidth: 560 }}>
          Amsterdam has been a city of bold beginnings. Built from water, shaped by visionaries, and fueled by a spirit that never settles.
        </p>
      </div>

      {/* bordered media block (red outline frame) */}
      <div style={{ position: "relative", height: 380, border: "1.5px solid var(--tedx-red)", borderRadius: 12, overflow: "hidden",
        background: `var(--img-scrim), url(${ASSET}photo-crowd.jpg) center/cover no-repeat #000`, marginBottom: 90 }} />

      <h2 style={{ margin: "0 auto 56px", maxWidth: 900, textAlign: "center", font: "700 clamp(28px,3.2vw,46px)/1.1 var(--font-display)", letterSpacing: "-.02em", textTransform: "uppercase", color: "#fff" }}>
        Now, TEDxAmsterdam invites you to join a new chapter: Amsterdam Reimagined.
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{ aspectRatio: "4 / 3", background: `var(--img-scrim), url(${ASSET}photo-stage.jpg) center/cover no-repeat #000` }} />
        <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(255,255,255,.85)", maxWidth: 520 }}>
          This is a story of daring to rethink everything. From how we move to how we connect, care, and create together. It's about imagining a city that's more inclusive, sustainable, and alive with possibility. On our 2025 stage, voices from every corner will come together to share ideas that challenge what's possible and inspire change that's urgent, honest, and deeply human. The future isn't written. It's imagined, one bold idea at a time.
        </p>
      </div>
    </section>
  );
}

/* ---- UP NEXT ON STAGE CTA ---- */
function EventUpNext({ go }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "120px var(--gutter-wide)", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(55% 90% at 50% 55%, rgba(255,155,25,.4), rgba(235,0,40,.5) 38%, rgba(60,0,12,.4) 66%, rgba(0,0,0,0) 84%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 26, maxWidth: 680 }}>
        <h2 style={{ margin: 0, font: "700 clamp(40px,5vw,76px)/1 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Up next on stage…</h2>
        <p style={{ margin: 0, font: "var(--text-body)", color: "rgba(255,255,255,.85)", maxWidth: 440 }}>
          Amsterdam's most innovative minds and powerful stories are coming your way. Join us to hear the ideas that are reimagining Amsterdam.
        </p>
        <Btn variant="primary" size="lg" onClick={() => go("home")}>SECURE YOUR SEAT</Btn>
      </div>
    </section>
  );
}

/* ---- OUR SPEAKERS teaser (silhouettes) ---- */
function EventSpeakers() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "20px var(--gutter-wide) 120px" }}>
      <Tag style={{ marginBottom: 16 }}>Stay tuned as we unveil this year's speakers shortly</Tag>
      <h2 style={{ margin: "0 0 48px", font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Our Speakers</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {[0, 1, 2, 3].map((n) => (
          <div key={n} style={{ aspectRatio: "3 / 4", position: "relative", overflow: "hidden",
            background: "radial-gradient(120% 80% at 50% 120%, var(--tedx-orange-amber), var(--tedx-red) 45%, #2a0008 78%, #000 100%)" }}>
            <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", width: "62%", height: "70%",
              background: "#0a0506", borderRadius: "50% 50% 0 0", filter: "blur(2px)" }} />
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { EventProgramPage });
