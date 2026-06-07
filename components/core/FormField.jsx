import React from "react";

/**
 * TEDxAmsterdam — FormField
 * Slot-based form field wrapper.
 * Renders: label → hint → children → validation error.
 * Drop any input component inside to get consistent label/error treatment
 * without repeating markup.
 */
export function FormField({ label, htmlFor, hint, error, required = false, children, style }) {
  const errorId = error && htmlFor ? `${htmlFor}-formfield-error` : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", ...style }}>
      {label && (
        <label
          htmlFor={htmlFor}
          style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", opacity: 0.85 }}
        >
          {label}
          {required && (
            <span aria-hidden="true" style={{ color: "var(--tedx-red)", marginLeft: 2 }}>
              *
            </span>
          )}
        </label>
      )}
      {hint && (
        <span style={{ font: "var(--text-tag)", color: "var(--text-muted)" }}>{hint}</span>
      )}
      {children}
      {error && (
        <span id={errorId} role="alert" style={{ font: "var(--text-tag)", color: "var(--tedx-red)" }}>
          {error}
        </span>
      )}
    </div>
  );
}
