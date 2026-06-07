import React from "react";

/**
 * TEDxAmsterdam — Radio
 * Radio button group. Always rendered with <fieldset> + <legend> for
 * correct accessibility grouping. Selected option shows red dot.
 */
export function Radio({ legend, options = [], value, onChange, name, disabled = false, style }) {
  return (
    <fieldset
      style={{
        border: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        ...style,
      }}
    >
      {legend && (
        <legend
          style={{
            font: "var(--text-body)",
            fontSize: 16,
            color: "var(--text-primary)",
            opacity: 0.85,
            padding: 0,
            marginBottom: "var(--space-2)",
          }}
        >
          {legend}
        </legend>
      )}
      {options.map((opt) => {
        const isSelected = value === opt.value;
        const radioId = `${name}-${opt.value}`;
        return (
          <label
            key={opt.value}
            htmlFor={radioId}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-3)",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.45 : 1,
            }}
          >
            <span
              style={{
                position: "relative",
                width: 18,
                height: 18,
                flex: "none",
                border: `1.5px solid ${isSelected ? "var(--tedx-red)" : "var(--border-hairline)"}`,
                borderRadius: "var(--radius-full)",
                background: "transparent",
                transition: "border-color var(--dur) var(--ease-standard)",
              }}
            >
              {isSelected && (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 8,
                    height: 8,
                    borderRadius: "var(--radius-full)",
                    background: "var(--tedx-red)",
                  }}
                />
              )}
              <input
                id={radioId}
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange?.(opt.value)}
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
              {opt.label}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
