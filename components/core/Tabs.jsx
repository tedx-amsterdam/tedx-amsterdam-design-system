import React from "react";

/**
 * TEDxAmsterdam — Tabs
 * Tabbed content switcher. Active tab has a red bottom border.
 * Keyboard: Left/Right arrows move focus; Enter/Space activates.
 * ARIA: tablist + tab + tabpanel pattern.
 */
export function Tabs({ tabs = [], defaultIndex = 0, style }) {
  const [active, setActive] = React.useState(defaultIndex);
  const tabRefs = React.useRef([]);

  const onKeyDown = (e, i) => {
    if (e.key === "ArrowRight") {
      const next = (i + 1) % tabs.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = (i - 1 + tabs.length) % tabs.length;
      setActive(prev);
      tabRefs.current[prev]?.focus();
    }
  };

  return (
    <div style={style}>
      <div
        role="tablist"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border-hairline)",
          marginBottom: "var(--space-6)",
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            aria-selected={active === i}
            aria-controls={`tabpanel-${i}`}
            id={`tab-btn-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            style={{
              background: "none",
              border: "none",
              borderBottom: `2px solid ${active === i ? "var(--tedx-red)" : "transparent"}`,
              marginBottom: -1,
              cursor: "pointer",
              padding: "var(--space-3) var(--space-6)",
              fontFamily: "var(--font-sans)",
              fontWeight: "var(--weight-bold)",
              fontSize: "var(--fs-tag)",
              letterSpacing: "var(--ls-wide)",
              textTransform: "uppercase",
              color: active === i ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "color var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={i}
          id={`tabpanel-${i}`}
          role="tabpanel"
          aria-labelledby={`tab-btn-${i}`}
          style={{ display: active === i ? "block" : "none" }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
