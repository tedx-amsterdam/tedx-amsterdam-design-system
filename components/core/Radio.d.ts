import React from "react";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps {
  /** Group label rendered as `<legend>`. */
  legend?: string;
  options: RadioOption[];
  /** Controlled selected value. */
  value?: string;
  onChange?: (value: string) => void;
  /** Shared `name` attribute for the radio group — required for native grouping. */
  name: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Radio button group. Selected option shows red dot. Uses fieldset/legend for a11y. */
export function Radio(props: RadioProps): JSX.Element;
