/* TEDxAmsterdam website UI kit — shared primitives (in-browser Babel).
   No import/export: uses window.React, ends with window assignment. */
const { useState } = React;

const NAV = ["Speakers", "Event Program", "Impact Program", "About Us", "Our Team", "Blog", "Gallery", "Partners"];

const ASSET = "../../assets/";

/* ---- Arrow glyph ---- */
function Arrow({ w = 18 }) {
  return (
    <svg width={w} height={w * 0.5} viewBox="0 0 18 9" fill="none" aria-hidden="true">
      <path d="M0 4.5h15" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

/* ---- Button ---- */
function Btn({ children, variant = "primary", size = "md", arrow, onClick, type = "button", full }) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const pad = { sm: "12px 24px", md: "16px 30px", lg: "20px 34px" }[size];
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
    fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: size === "lg" ? 16 : 14,
    lineHeight: 1, letterSpacing: "0.01em", padding: pad, borderRadius: "var(--radius-button)",
    border: "none", cursor: "pointer", width: full ? "100%" : "auto",
    transform: p ? "scale(0.97)" : "scale(1)",
    transition: "background .2s, transform .12s",
  };
  const v = {
    primary: { background: h ? "var(--accent-hover)" : "var(--tedx-red)", color: "#fff" },
    secondary: { background: h ? "#eaeaea" : "#fff", color: "#000" },
    ghost: { background: h ? "rgba(255,255,255,.08)" : "transparent", color: "#fff", border: "1.5px solid var(--border-hairline)" },
  }[variant];
  return (
    <button type={type} onClick={onClick} style={{ ...base, ...v }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setP(false); }}
      onMouseDown={() => setP(true)} onMouseUp={() => setP(false)}>
      {children}{arrow && <Arrow />}
    </button>
  );
}

/* ---- Eyebrow tag ---- */
function Tag({ children, color = "red", dot }) {
  const c = { red: "var(--tedx-red)", white: "#fff", muted: "var(--tedx-gray-400)" }[color];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)",
      fontWeight: 700, fontSize: 14, lineHeight: 1.2, textTransform: "uppercase", letterSpacing: ".04em", color: c }}>
      {dot && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--tedx-red)" }} />}
      {children}
    </span>
  );
}

/* ---- Arrow link ---- */
function ALink({ children, color = "red", onClick }) {
  const [h, setH] = useState(false);
  const c = color === "white" ? "#fff" : "var(--tedx-red)";
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: h ? 12 : 8, fontFamily: "var(--font-sans)",
        fontWeight: 700, fontSize: 14, color: c, textDecoration: "none", transition: "gap .2s" }}>
      {children}<Arrow />
    </a>
  );
}

/* ---- Logo ---- */
function Logo({ width = 225, onClick }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }} style={{ display: "inline-flex" }}>
      <img src={ASSET + "logo-tedxamsterdam-white.png"} alt="TEDxAmsterdam" style={{ width, height: "auto", display: "block" }} />
    </a>
  );
}

/* ---- Heat backdrops ---- */
function EdgeGlows() {
  return (
    <>
      <div style={{ position: "absolute", left: -110, top: 0, bottom: 0, width: 220, background: "var(--glow-edge)", pointerEvents: "none", opacity: .9 }} />
      <div style={{ position: "absolute", right: -110, top: 0, bottom: 0, width: 220, background: "var(--glow-edge)", pointerEvents: "none", opacity: .9 }} />
    </>
  );
}

/* ---- Data ---- */
const SPEAKERS = [
  { name: "Sofia Alvarez", topic: "Growing back ice, in the Arctic?", role: "Designer, researcher, author and the founder of Human Material Loop",
    date: "29 Nov 2025", place: "Muziekgebouw aan 't IJ",
    bio: "In Europe alone, 150 million kg of human hair waste ends up in landfills or in incinerators, while human hair is the same keratin protein fiber as wool. Human Material Loop has developed a technology to utilise waste keratin protein fiber and develop high-performance products for the textile industry." },
  { name: "David Ramirez", topic: "The architecture of belonging", role: "Urbanist and community organiser",
    date: "29 Nov 2025", place: "Muziekgebouw aan 't IJ",
    bio: "Cities are built twice — once in concrete, once in the habits of the people who live in them. David explores how small civic rituals quietly decide who feels at home." },
  { name: "Carlos Mendes", topic: "Repairing what we throw away", role: "Circular-economy engineer",
    date: "29 Nov 2025", place: "Muziekgebouw aan 't IJ",
    bio: "What if the most radical climate technology is simply repair? Carlos makes the case for a maintenance culture over a disposable one." },
  { name: "Julia Stein", topic: "The quiet power of slow data", role: "Data ethicist",
    date: "29 Nov 2025", place: "Muziekgebouw aan 't IJ",
    bio: "Faster isn't always wiser. Julia argues for data we can actually live with — patient, consented, and human-scaled." },
];

const POSTS = [
  { cat: "News", title: "The power of ideas: 5 talks that changed Amsterdam", img: ASSET + "photo-audience.jpg", date: "24 Jun 2025" },
  { cat: "Podcast", title: "One day, a hundred stories: volunteering at TEDxAmsterdam", img: ASSET + "photo-stage.jpg", date: "24 Jun 2025" },
  { cat: "News", title: "The future of cities: what our speakers are saying", img: ASSET + "photo-event-1.jpg", date: "24 Jun 2025" },
  { cat: "Podcast", title: "Speaker spotlight: where are they now?", img: ASSET + "photo-crowd.jpg", date: "24 Jun 2025" },
  { cat: "News", title: "How to pitch your idea to TEDxAmsterdam", img: ASSET + "photo-event-2.jpg", date: "24 Jun 2025" },
  { cat: "News", title: "Why we're still 100% volunteer-driven — and proud of it", img: ASSET + "photo-audience.jpg", date: "24 Jun 2025" },
];

const TIMETABLE = [
  { time: "10:30", title: "Opening Performance", kind: "head" },
  { time: "10:50", title: "Session 1", kind: "session" },
  { time: "12:00–13:00", title: "Lunch", kind: "break" },
  { time: "13:30", title: "Session 2", kind: "session" },
  { time: "15:00–15:40", title: "Break", kind: "break" },
  { time: "15:40", title: "Session 3", kind: "session" },
  { time: "17:30", title: "Ends", kind: "break" },
];

/* ---- Upcoming speaker line-up (grid) ---- */
const LINEUP = [
  { topic: "Growing back ice, in the Arctic?", name: "David Karimov", role: "Computational artist" },
  { topic: "How technology is changing the way we experience art", name: "Carlos Mendes", role: "Media researcher" },
  { topic: "The architecture of belonging", name: "Julia Stein", role: "Student, AI justice advocate and changemaker" },
  { topic: "Repairing what we throw away", name: "Sofia Alvarez", role: "Circular-economy engineer" },
  { topic: "The quiet power of slow data", name: "Eva Renia", role: "Data ethicist" },
  { topic: "Cities that listen", name: "Manuel Toscano", role: "Urbanist" },
  { topic: "What the canals remember", name: "Lisa Xiu", role: "Historian" },
  { topic: "Designing for the radical future", name: "Stephen Akinremi", role: "Speculative designer" },
];

/* ---- Past speakers ---- */
const PAST_SPEAKERS = [
  { talk: "How technology is changing the way we experience art", name: "Friendred Peng", role: "Computational artist" },
  { talk: "Redefining poverty: towards a better understanding of inequality", name: "Milio Van De Kamp", role: "Sociologist and writer" },
  { talk: "Growing back ice, in the Arctic?", name: "Fonger Ypma", role: "Founder & CEO" },
  { talk: "Error 404: human face not found", name: "Robin Pocornie", role: "Student, AI justice advocate and changemaker" },
  { talk: "The reality of living the fantasy", name: "Ma'Ma Queen", role: "Professional drag artist" },
  { talk: "All the sea we do not see", name: "Lisa Becking", role: "Marine biologist" },
  { talk: "Layco medical devices", name: "Thom Weustink", role: "Co-founder of Layco Medical Devices" },
  { talk: "Human Material Loop", name: "Zsofia Kollar", role: "Designer, researcher, founder of Human Material Loop" },
];

/* ---- Team ---- */
const TEAM = [
  { name: "Angela Bos", role: "Team lead communications", group: "Communications" },
  { name: "Jillian Vorce", role: "Team lead", group: "Exec" },
  { name: "Robin Masereeuw", role: "Programme curator", group: "Production" },
  { name: "Lisa Xiu", role: "Teamlead web development", group: "Internal" },
  { name: "Alejandra Villacis", role: "Co-lead impact program", group: "Impact" },
  { name: "Manuel Toscano", role: "Co-lead impact program", group: "Impact" },
  { name: "Eva Renia", role: "Speakers project manager", group: "Production" },
  { name: "Fabrizia Sant'Elia", role: "Partnerships lead", group: "Partnerships" },
  { name: "Aleksandra Graca", role: "Communications", group: "Communications" },
  { name: "Stephen Akinremi", role: "Compliance, fact-checking", group: "Internal" },
  { name: "Veerle de Cock", role: "Team lead", group: "Exec" },
  { name: "David Karimov", role: "Production assistant", group: "Production" },
];
const TEAM_GROUPS = ["All", "Exec", "Communications", "Internal", "Partnerships", "Impact", "Production"];
const OPEN_ROLES = ["front-end developer / webmaster", "back-end web developers", "graphic designer", "social media manager"];

/* ---- Partners ---- */
const PARTNERS = ["Veriteer", "A'DAM&Co.", "Skoll Foundation", "Bill & Melinda Gates", "Infosys", "Logitech", "Greenpeace", "Adyen", "KLM", "Heineken", "Rituals", "Booking.com"];

Object.assign(window, { useState, NAV, ASSET, Arrow, Btn, Tag, ALink, Logo, EdgeGlows,
  SPEAKERS, POSTS, TIMETABLE, LINEUP, PAST_SPEAKERS, TEAM, TEAM_GROUPS, OPEN_ROLES, PARTNERS });
