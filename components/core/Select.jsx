import React from "react";

/**
 * TEDxAmsterdam — Select
 * Branded native dropdown. Matches Input visual style with a red-on-focus
 * hairline rule and custom chevron. Error state turns border red.
 */
export function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select…",
  disabled = false,
  error,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const selectId = id || `select-${String(label).toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", opacity: 0.85 }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <select
          id={selectId}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            appearance: "none",
            width: "100%",
            background: "transparent",
            border: "none",
            borderBottom: `1px solid ${error ? "var(--tedx-red)" : focused ? "var(--tedx-red)" : "var(--border-hairline)"}`,
            paddingTop: "var(--space-2)",
            paddingBottom: "var(--space-2)",
            paddingRight: "var(--space-8)",
            paddingLeft: 0,
            font: "var(--text-body)",
            fontSize: 16,
            color: value ? "var(--text-primary)" : "var(--text-secondary)",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.45 : 1,
            outline: focused ? "2px solid var(--focus-ring)" : "none",
            outlineOffset: "2px",
            transition: "border-color var(--dur) var(--ease-standard)",
          }}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "var(--text-secondary)",
          }}
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      {error && (
        <span id={errorId} style={{ font: "var(--text-tag)", color: "var(--tedx-red)" }}>
          {error}
        </span>
      )}
    </div>
  );
}
