/* TEDxAmsterdam — website app shell / router */
function App() {
  const [page, setPage] = useState("home");
  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  return (
    <div style={{ background: "var(--tedx-black)" }}>
      <Header page={page} go={go} />
      {page === "home" && <Home go={go} />}
      {page === "event" && <EventProgramPage go={go} />}
      {page === "speakers" && <SpeakersPage go={go} />}
      {page === "speaker" && <SpeakerPage go={go} />}
      {page === "team" && <TeamPage go={go} />}
      {page === "about" && <AboutPage go={go} />}
      {page === "impact" && <ImpactPage go={go} />}
      {page === "partners" && <PartnersPage go={go} />}
      {page === "gallery" && <GalleryPage go={go} />}
      {page === "blog" && <BlogPage go={go} />}
      <Footer />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
