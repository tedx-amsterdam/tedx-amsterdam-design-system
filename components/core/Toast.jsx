import React from "react";

/**
 * TEDxAmsterdam — Toast
 * Transient notification that auto-dismisses.
 * Caller controls rendering via React state; Toast manages its own
 * entrance/exit animation and auto-dismiss timer.
 * error/warning: red left border + role="alert" (assertive live region)
 * info/success: white left border + role="status" (polite live region)
 */
export function Toast({ message, type = "info", duration = 4000, onDismiss, style }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const enter = setTimeout(() => setVisible(true), 16);
    if (duration > 0) {
      const dismiss = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onDismiss?.(), 300);
      }, duration);
      return () => { clearTimeout(enter); clearTimeout(dismiss); };
    }
    return () => clearTimeout(enter);
  }, [duration, onDismiss]);

  const isUrgent = type === "error" || type === "warning";
  const accentColor = isUrgent ? "var(--tedx-red)" : "var(--tedx-white)";

  return (
    <div
      role={isUrgent ? "alert" : "status"}
      aria-live={isUrgent ? "assertive" : "polite"}
      style={{
        position: "fixed",
        bottom: "var(--space-6)",
        right: "var(--space-6)",
        maxWidth: 360,
        background: "var(--bg-elevated)",
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: "var(--radius-card)",
        padding: "var(--space-4) var(--space-6)",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-4)",
        zIndex: 1100,
        transform: visible ? "translateX(0)" : "translateX(calc(100% + var(--space-6)))",
        opacity: visible ? 1 : 0,
        transition: "transform var(--dur-slow) var(--ease-out), opacity var(--dur) var(--ease-standard)",
        ...style,
      }}
    >
      <p style={{ margin: 0, font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", flex: 1 }}>
        {message}
      </p>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onDismiss?.(), 300); }}
        aria-label="Dismiss notification"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          fontSize: 18,
          lineHeight: 1,
          padding: 0,
          flex: "none",
        }}
      >
        ×
      </button>
    </div>
  );
}
