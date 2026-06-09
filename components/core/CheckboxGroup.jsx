import React from "react";

/**
 * TEDxAmsterdam — CheckboxGroup
 * Fieldset + legend wrapper for multiple Checkbox instances.
 *
 * Usage:
 *   <CheckboxGroup legend="Notify me about">
 *     <Checkbox label="Events" checked={...} onChange={...} id="events" />
 *     <Checkbox label="Blog posts" checked={...} onChange={...} id="blog" />
 *   </CheckboxGroup>
 */
export function CheckboxGroup({ legend, children, style }) {
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
      {children}
    </fieldset>
  );
}
