import React from "react";

/**
 * TEDxAmsterdam — Modal
 * Overlay dialog for confirmations, detail views, or forms.
 * - Traps keyboard focus inside while open
 * - Locks body scroll while open
 * - Closes on Escape key or overlay click
 * - Red top accent border signals brand dialog
 */
export function Modal({ isOpen, onClose, title, children, size = "md", hideCloseButton = false, style }) {
  const dialogRef = React.useRef(null);
  const titleId = `modal-title-${React.useId()}`;
  const maxWidths = { sm: 480, md: 640, lg: 800 };

  // Body scroll lock + Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  // Focus trap
  React.useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const getFirst = () => dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )[0];
    getFirst()?.focus();
    const trap = (e) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-6)",
        zIndex: 1000,
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-elevated)",
          borderTop: "2px solid var(--tedx-red)",
          borderRadius: "var(--radius-card)",
          width: "100%",
          maxWidth: maxWidths[size],
          padding: "var(--space-8)",
          position: "relative",
          boxShadow: "var(--shadow-card)",
          ...style,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "var(--space-6)",
          }}
        >
          {title && (
            <h2
              id={titleId}
              style={{
                margin: 0,
                font: "var(--text-h3)",
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "var(--ls-display)",
              }}
            >
              {title}
            </h2>
          )}
          {!hideCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                fontSize: 24,
                lineHeight: 1,
                padding: "var(--space-1)",
                marginLeft: "var(--space-4)",
                flex: "none",
              }}
            >
              ×
            </button>
          )}
        </div>
        <div style={{ color: "var(--text-secondary)", font: "var(--text-body)", fontSize: 16 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
