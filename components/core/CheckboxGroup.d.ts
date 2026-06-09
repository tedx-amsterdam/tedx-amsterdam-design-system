import React from "react";

export interface CheckboxGroupProps {
  /** Renders as a <legend> for screen-reader grouping. */
  legend?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/** Fieldset wrapper for accessible grouping of multiple Checkbox components. */
export function CheckboxGroup(props: CheckboxGroupProps): JSX.Element;
