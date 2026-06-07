import React from "react";

/**
 * TEDxAmsterdam — Accordion
 * FAQ-style disclosure list. Each row is an UPPERCASE question with a
 * +/− toggle; the open row's question turns red. One row open at a time.
 */
export function Accordion({ items = [], defaultOpen = 0, style }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={style}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderTop: "1px solid var(--border-hairline)" }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: 24, padding: "26px 0", textAlign: "left",
              }}
            >
              <span style={{ font: "700 22px/1.2 var(--font-display)", letterSpacing: "-.01em", textTransform: "uppercase", color: isOpen ? "var(--tedx-red)" : "var(--tedx-white)" }}>
                {it.q}
              </span>
              <span style={{ flex: "none", width: 26, height: 26, position: "relative", color: isOpen ? "var(--tedx-red)" : "var(--tedx-white)" }}>
                <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "currentColor", transform: "translateY(-50%)" }} />
                <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "currentColor", transform: `translateX(-50%) scaleY(${isOpen ? 0 : 1})`, transition: "transform var(--dur) var(--ease-out)" }} />
              </span>
            </button>
            <div style={{ maxHeight: isOpen ? 260 : 0, overflow: "hidden", transition: "max-height var(--dur-slow) var(--ease-out)" }}>
              <p style={{ margin: 0, padding: "0 0 26px", font: "var(--text-body)", color: "var(--text-secondary)", maxWidth: 760 }}>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
