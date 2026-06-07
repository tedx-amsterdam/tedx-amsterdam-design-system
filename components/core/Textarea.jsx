import React from "react";

/**
 * TEDxAmsterdam — Textarea
 * Multi-line text input. Visually consistent with Input:
 * hairline bottom border turns red on focus. Error state turns border red.
 */
export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  error,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const taId = id || `textarea-${String(label).toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${taId}-error` : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label && (
        <label
          htmlFor={taId}
          style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", opacity: 0.85 }}
        >
          {label}
        </label>
      )}
      <textarea
        id={taId}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={errorId}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          appearance: "none",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${error ? "var(--tedx-red)" : focused ? "var(--tedx-red)" : "var(--border-hairline)"}`,
          padding: "var(--space-2) 0",
          font: "var(--text-body)",
          fontSize: 16,
          color: "var(--text-primary)",
          resize: "vertical",
          cursor: disabled ? "not-allowed" : "auto",
          opacity: disabled ? 0.45 : 1,
          outline: focused ? "2px solid var(--focus-ring)" : "none",
          outlineOffset: "2px",
          transition: "border-color var(--dur) var(--ease-standard)",
          fontFamily: "var(--font-sans)",
        }}
        {...rest}
      />
      {error && (
        <span id={errorId} style={{ font: "var(--text-tag)", color: "var(--tedx-red)" }}>
          {error}
        </span>
      )}
    </div>
  );
}
