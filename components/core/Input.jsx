import React from "react";

/**
 * TEDxAmsterdam — Input
 * Minimal underline field used in newsletter / sign-up forms.
 * No box — just a label, the value, and a hairline rule that
 * turns red on focus. Works on dark (default) or light surfaces.
 */
export function Input({
  label = "Email",
  type = "email",
  placeholder = "",
  value,
  onChange,
  tone = "dark",
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const ink = tone === "dark" ? "var(--tedx-white)" : "var(--tedx-black)";
  const rule = tone === "dark" ? "var(--border-hairline)" : "rgba(0,0,0,0.3)";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      <span style={{ font: "var(--text-body)", fontSize: 16, color: ink, opacity: 0.85 }}>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          appearance: "none",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${focused ? "var(--tedx-red)" : rule}`,
          padding: "8px 0",
          font: "var(--text-body)",
          color: ink,
          outline: focused ? "2px solid var(--focus-ring)" : "none",
          outlineOffset: "2px",
          transition: "border-color var(--dur) var(--ease-standard), outline var(--dur-fast) var(--ease-standard)",
        }}
        {...rest}
      />
    </label>
  );
}
