import React from "react";

/**
 * TEDxAmsterdam — RadioGroup
 * Controlled compound component for composition-based radio groups.
 * RadioGroup.Option renders individual radio items; the parent injects
 * name/value/onChange via React.cloneElement.
 *
 * Usage:
 *   <RadioGroup name="plan" legend="Select plan" value={plan} onChange={setPlan}>
 *     <RadioGroup.Option value="free" label="Free" />
 *     <RadioGroup.Option value="pro" label="Pro" />
 *   </RadioGroup>
 */
function RadioGroupRoot({ name, legend, value, onChange, disabled = false, children, style }) {
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
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { _name: name, _groupValue: value, _onChange: onChange, _disabled: disabled })
          : child
      )}
    </fieldset>
  );
}

function RadioOption({ value, label, _name, _groupValue, _onChange, _disabled }) {
  const id = `${_name}-${value}`;
  const isSelected = _groupValue === value;
  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: _disabled ? "not-allowed" : "pointer",
        opacity: _disabled ? 0.45 : 1,
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
          <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 8, height: 8, borderRadius: "var(--radius-full)", background: "var(--tedx-red)" }} />
        )}
        <input
          id={id}
          type="radio"
          name={_name}
          value={value}
          checked={isSelected}
          onChange={() => _onChange?.(value)}
          disabled={_disabled}
          style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", margin: 0, cursor: "inherit" }}
        />
      </span>
      <span style={{ font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)" }}>{label}</span>
    </label>
  );
}

RadioGroupRoot.Option = RadioOption;
export const RadioGroup = RadioGroupRoot;
