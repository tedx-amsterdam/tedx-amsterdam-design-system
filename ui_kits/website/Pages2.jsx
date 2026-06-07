/* TEDxAmsterdam — About Us + Impact Program pages (+ FAQ accordion) */

/* ---------- FAQ accordion ---------- */
function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderTop: "1px solid var(--border-hairline)" }}>
            <button onClick={() => setOpen(isOpen ? -1 : i)}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, padding: "26px 0", textAlign: "left" }}>
              <span style={{ font: "700 22px/1.2 var(--font-display)", letterSpacing: "-.01em", textTransform: "uppercase", color: isOpen ? "var(--tedx-red)" : "#fff" }}>{it.q}</span>
              <span style={{ flex: "none", width: 26, height: 26, position: "relative", color: isOpen ? "var(--tedx-red)" : "#fff" }}>
                <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "currentColor", transform: "translateY(-50%)" }} />
                <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "currentColor", transform: `translateX(-50%) scaleY(${isOpen ? 0 : 1})`, transition: "transform .2s" }} />
              </span>
            </button>
            <div style={{ maxHeight: isOpen ? 240 : 0, overflow: "hidden", transition: "max-height .3s var(--ease-out)" }}>
              <p style={{ margin: 0, padding: "0 0 26px", font: "var(--text-body)", color: "rgba(255,255,255,.8)", maxWidth: 760 }}>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ===================== ABOUT US ===================== */
const VALUES = [
  { t: "Truly inclusive", d: "Everyone is welcome — every voice matters and belongs on our stage." },
  { t: "Diversity always", d: "We seek out perspectives that challenge and broaden our own." },
  { t: "Planet over profit", d: "We make choices that put people and the planet first." },
  { t: "Work together", d: "Nothing we do happens alone — community is the method." },
];
const TONE = [
  { w: "Bold", red: true }, { w: "Friendly", red: false }, { w: "Inclusive", red: true },
  { w: "Future-forward", red: false }, { w: "Authentic", red: true }, { w: "Engaging", red: false }, { w: "Playful", red: true },
];

function AboutPage() {
  return (
    <main style={{ background: "var(--tedx-black)" }}>
      <PageHero title={<>About<br />Us</>} eyebrow="Unsung heroes, unstoppable ideas"
        desc="TEDxAmsterdam is where bold ideas turn into action. A community that welcomes all people connected to Amsterdam and fosters an inclusive space to discuss, reflect and connect." />

      {/* vision + mission */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px var(--gutter-wide)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 90 }}>
        <EdgeGlows />
        <div style={{ position: "relative" }}>
          <Tag>Vision</Tag>
          <p style={{ margin: "18px 0 0", font: "700 28px/1.3 var(--font-display)", letterSpacing: "-.02em", color: "#fff" }}>
            A community that welcomes all people connected to Amsterdam and fosters an inclusive space to discuss, reflect and connect.
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <Tag>Mission</Tag>
          <p style={{ margin: "18px 0 0", font: "700 28px/1.3 var(--font-display)", letterSpacing: "-.02em", color: "#fff" }}>
            To create positive impact by sharing ideas worth spreading, and supporting unsung heroes with new ideas through our stage and impact program.
          </p>
        </div>
      </section>

      {/* values */}
      <section style={{ background: "var(--tedx-black)", padding: "40px var(--gutter-wide) 90px" }}>
        <h2 style={{ margin: "0 0 48px", font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Our Values</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {VALUES.map((v) => (
            <div key={v.t} style={{ border: "1px solid var(--border-hairline)", padding: "28px 26px 32px", display: "flex", flexDirection: "column", gap: 18, minHeight: 240 }}>
              <span style={{ width: 44, height: 44, borderRadius: "50%", background: "radial-gradient(circle at 50% 40%, var(--tedx-orange-glow), var(--tedx-orange-amber) 45%, var(--tedx-red) 78%)" }} />
              <h3 style={{ margin: "auto 0 0", font: "700 24px/1.15 var(--font-display)", letterSpacing: "-.02em", textTransform: "uppercase", color: "#fff" }}>{v.t}</h3>
              <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,.7)" }}>{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* tone of voice */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "60px var(--gutter-wide) 90px", borderTop: "1px solid var(--border-hairline)" }}>
        <div style={{ position: "absolute", right: -120, top: -80, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(235,0,40,.35), rgba(0,0,0,0) 65%)", pointerEvents: "none" }} />
        <Tag>Tone of voice</Tag>
        <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "0 40px", marginTop: 20 }}>
          {TONE.map((t, i) => (
            <span key={i} style={{ font: "700 clamp(40px,6vw,84px)/1.1 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: t.red ? "var(--tedx-red)" : "#fff" }}>
              We are {t.w}.
            </span>
          ))}
        </div>
      </section>

      {/* tagline + stats */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--tedx-black)", padding: "100px var(--gutter-wide)", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(55% 90% at 50% 50%, rgba(255,155,25,.4), rgba(235,0,40,.45) 40%, rgba(0,0,0,0) 78%)", pointerEvents: "none" }} />
        <h2 style={{ position: "relative", margin: 0, font: "700 clamp(44px,6vw,84px)/1 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>
          Unsung heroes,<br /><span style={{ color: "var(--tedx-red)" }}>unstoppable ideas.</span>
        </h2>
      </section>
    </main>
  );
}

/* ===================== IMPACT PROGRAM ===================== */
const PIONEER_PROFILE = [
  { k: "Business idea", d: "The pioneer needs to have a concrete, actionable idea or plan to develop." },
  { k: "Positive impact", d: "A genuine ambition to have a positive impact within Amsterdam and beyond." },
  { k: "Unwavering commitment", d: "Each pioneer must demonstrate unwavering commitment to work on their idea." },
  { k: "3 to 8 hours a week", d: "Each pioneer must make a commitment to spend around 3 to 8 hours a week on the program." },
  { k: "Available Sept—Sept", d: "Available from mid-September to mid-November for a weekly in-person session." },
  { k: "Comfortable to speak", d: "The pioneer is comfortable enough to speak at our closing VIP event, the Impact event." },
];
const PIONEER_CHECK = [
  "Is the idea a project or a real business?",
  "Have a viable business model / problem / solution fit for the product or service?",
  "Have conducted market and competitor research?",
  "Am I fully committed to continue with the idea / its development?",
  "Have proof of concept or a Minimum Viable Product (MVP) in place of working on it?",
  "Have already some traction (or test deployment)?",
];
const IMPACT_FAQ = [
  { q: "Who are our pioneers?", a: "Pioneers are individuals with new ways of thinking that move an idea into a prototype of a real-world solution, supported by our coaches and mentors." },
  { q: "The criteria", a: "A concrete, actionable idea, a genuine ambition for positive impact, and the commitment of 3–8 hours a week from September to November." },
  { q: "Does one have to pay a fee to participate?", a: "No. The Impact Program is free for the selected pioneers — it runs on the support of our mentors, coaches and partners." },
  { q: "How does the application process work?", a: "Submit your idea through the application form. Shortlisted pioneers are invited to a conversation before the final cohort is selected." },
  { q: "Can the idea consist of more than one founder?", a: "Yes — teams are welcome, though we ask one person to be the main point of contact throughout the program." },
  { q: "What if I am not good at public speaking?", a: "That's exactly what the program is for. Coaching and rehearsal time help you grow into the final Impact event stage." },
  { q: "Is attendance at all events mandatory?", a: "The weekly in-person sessions and the closing Impact event are the backbone of the program, so attendance is expected." },
];
const PIONEERS = ["Barend Koolhaas", "Sinem Tuncer", "Lara Alonso", "Valerie van Langhout", "Marta Nowak", "Pieter Bos", "Nadia Haddad", "Tomas Vidal"];

function ImpactPage() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <main style={{ background: "var(--tedx-black)" }}>
      <PageHero title={<>Visionary —<br /><span style={{ color: "var(--tedx-red)" }}>is that you?</span></>} eyebrow="Apply for the impact program"
        desc="TEDxAmsterdam is always looking for visionary Amsterdammers and ideas. Each year we form bold ideas with the potential to drive positive change, and supporting unsung heroes with new ideas through our stage and impact program." />

      {/* statement + pillars */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px var(--gutter-wide)", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "start" }}>
        <EdgeGlows />
        <h2 style={{ position: "relative", margin: 0, font: "700 clamp(28px,3.2vw,46px)/1.18 var(--font-display)", letterSpacing: "-.02em", textTransform: "uppercase", color: "#fff" }}>
          The Impact Program is your opportunity to bring forth a prototype of a solution regarding a real-world problem.
        </h2>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18, paddingTop: 8 }}>
          <Tag>The journey</Tag>
          {["Storytelling", "Leadership", "Customer experience", "Impact"].map((p) => (
            <div key={p} style={{ borderBottom: "1px solid var(--border-hairline)", paddingBottom: 14 }}>
              <ALink>{p}</ALink>
            </div>
          ))}
        </div>
      </section>

      {/* pioneer profile spec */}
      <section style={{ background: "var(--tedx-black)", padding: "20px var(--gutter-wide) 90px" }}>
        <h2 style={{ margin: "0 0 48px", font: "700 clamp(28px,3.2vw,46px)/1.15 var(--font-display)", letterSpacing: "-.02em", textTransform: "uppercase", color: "#fff", maxWidth: 900 }}>
          The following qualities are important for the pioneer profile
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            {PIONEER_PROFILE.map((r) => (
              <div key={r.k} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, borderTop: "1px solid var(--border-hairline)", padding: "20px 0" }}>
                <span style={{ font: "700 16px/1.3 var(--font-sans)", textTransform: "uppercase", letterSpacing: ".03em", color: "var(--tedx-red)" }}>{r.k}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(255,255,255,.82)" }}>{r.d}</span>
              </div>
            ))}
          </div>
          <div style={{ border: "1px solid var(--border-hairline)", padding: "30px 30px 34px" }}>
            <p style={{ margin: "0 0 22px", font: "700 18px/1.3 var(--font-display)", textTransform: "uppercase", letterSpacing: "-.01em", color: "#fff" }}>
              For the idea to be suitable, you will want to keep in mind whether you…
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {PIONEER_CHECK.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ flex: "none", marginTop: 7, width: 8, height: 8, borderRadius: "50%", background: "var(--tedx-red)" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(255,255,255,.8)" }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* red CTA band */}
      <section style={{ background: "var(--tedx-red)", padding: "80px var(--gutter-wide)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <h2 style={{ margin: 0, font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#000" }}>Want to be<br />a pioneer too?</h2>
        {ok ? <p style={{ margin: 0, font: "var(--text-body)", color: "#000" }}>Thanks — application received.</p> : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setOk(true); }} style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
            <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "rgba(0,0,0,.7)" }}>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,.45)", padding: "8px 0", fontFamily: "var(--font-sans)", fontSize: 20, color: "#000", outline: "none" }} />
            </label>
            <Btn variant="secondary" type="submit">SIGN UP</Btn>
          </form>
        )}
      </section>

      {/* pioneers grid */}
      <section style={{ position: "relative", overflow: "hidden", padding: "90px var(--gutter-wide) 40px" }}>
        <EdgeGlows />
        <h2 style={{ position: "relative", margin: "0 0 48px", font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>The Pioneers of 2025</h2>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "40px 20px" }}>
          {PIONEERS.map((n, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ aspectRatio: "1 / 1.05", background: "linear-gradient(160deg, var(--tedx-gray-700), var(--tedx-gray-900))" }} />
              <h4 style={{ margin: 0, font: "700 14px/1.2 var(--font-sans)", textTransform: "uppercase", letterSpacing: ".02em", color: "#fff" }}>{n}</h4>
              <Tag color="muted" dot style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>Impact Pioneer 2025</Tag>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--tedx-black)", padding: "70px var(--gutter-wide) 120px" }}>
        <h2 style={{ margin: "0 0 24px", font: "var(--text-h2)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>FAQ</h2>
        <Faq items={IMPACT_FAQ} />
      </section>
    </main>
  );
}

Object.assign(window, { Faq, AboutPage, ImpactPage });
