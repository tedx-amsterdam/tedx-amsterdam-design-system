import React from "react";

export interface FormFieldProps {
  /** Visible label above the slot. */
  label?: string;
  /** `id` of the child input element, for label association. */
  htmlFor?: string;
  /** Optional helper text shown below the label. */
  hint?: string;
  /** Validation message shown below children; triggers `role="alert"`. */
  error?: string;
  /** Appends a red `*` to the label. @default false */
  required?: boolean;
  /** The input, select, textarea, or any form element. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Slot-based form wrapper: label → hint → children → error. */
export function FormField(props: FormFieldProps): React.ReactElement;
