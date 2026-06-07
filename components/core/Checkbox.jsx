import React from "react";

/**
 * TEDxAmsterdam — Checkbox
 * Single checkbox with label. Checked state shows a white tick on red fill.
 * For checkbox groups, compose multiple Checkbox instances inside a <fieldset>.
 */
export function Checkbox({ label, checked, onChange, disabled = false, id, style }) {
  const checkId = id || `checkbox-${String(label).toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <label
      htmlFor={checkId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
    >
      <span
        style={{
          position: "relative",
          width: 18,
          height: 18,
          flex: "none",
          border: `1.5px solid ${checked ? "var(--tedx-red)" : "var(--border-hairline)"}`,
          borderRadius: 2,
          background: checked ? "var(--tedx-red)" : "transparent",
          transition: "background var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)",
        }}
      >
        {checked && (
          <svg
            aria-hidden="true"
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <input
          id={checkId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          style={{
            position: "absolute",
            opacity: 0,
            width: "100%",
            height: "100%",
            margin: 0,
            cursor: "inherit",
          }}
        />
      </span>
      <span style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)" }}>
        {label}
      </span>
    </label>
  );
}
