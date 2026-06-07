/* TEDxAmsterdam — Blog index page */
function BlogPage({ go }) {
  return (
    <main style={{ background: "var(--tedx-black)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 900,
        background: "radial-gradient(70% 60% at 8% 12%, rgba(235,0,40,.4), rgba(0,0,0,0) 60%)", pointerEvents: "none" }} />
      <section style={{ position: "relative", padding: "70px var(--gutter-wide) 40px" }}>
        <h1 style={{ margin: 0, font: "700 clamp(64px,8vw,120px)/0.9 var(--font-display)", letterSpacing: "-.03em", textTransform: "uppercase", color: "#fff" }}>Blog</h1>
      </section>
      <section style={{ position: "relative", padding: "40px var(--gutter-wide) 120px", borderTop: "1px solid var(--border-hairline)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "64px 28px" }}>
          {POSTS.map((p, i) => <BlogCard key={i} p={p} onClick={() => go("speaker")} />)}
        </div>
      </section>
    </main>
  );
}
function BlogCard({ p, onClick }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", flexDirection: "column", gap: 18, textDecoration: "none", color: "#fff" }}>
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1 / 1", background: "var(--grad-tile)" }}>
        <div style={{ position: "absolute", inset: 0, background: `url(${p.img}) center/cover no-repeat`, transform: h ? "scale(1.04)" : "scale(1)", transition: "transform .4s" }} />
        <span style={{ position: "absolute", left: 16, top: 16, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.6)" }}>{p.cat}</span>
      </div>
      <h3 style={{ margin: 0, font: "700 24px/1.15 var(--font-display)", letterSpacing: "-.02em", textTransform: "uppercase" }}>{p.title}</h3>
      <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--tedx-gray-400)" }}>{p.title}</p>
      <Tag color="white" dot>{p.date}</Tag>
    </a>
  );
}
window.BlogPage = BlogPage;
