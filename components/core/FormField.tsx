import React from 'react';
import styles from './FormField.module.css';

export interface FormFieldProps {
  /** Visible label above the slot. */
  label?: string;
  /** `id` of the child input element, for label association. */
  htmlFor?: string;
  /** Optional helper text shown below the label. */
  hint?: string;
  /** Validation message shown below children; triggers `aria-live="polite"`. */
  error?: string;
  /** Appends a red `*` to the label. @default false */
  required?: boolean;
  /** The input, select, textarea, or any form element. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Slot-based form wrapper: label → hint → children → error. */
export function FormField({ label, htmlFor, hint, error, required = false, children, style }: FormFieldProps): React.ReactElement {
  return (
    <div className={styles.wrapper} style={style}>
      {label && (
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
          {required && (
            <span aria-hidden="true" className={styles.required}>
              *
            </span>
          )}
        </label>
      )}
      {hint && (
        <span className={styles.hint}>{hint}</span>
      )}
      {children}
      <span
        id={htmlFor ? `${htmlFor}-formfield-error` : undefined}
        aria-live="polite"
        className={styles.error}
      >
        {error ?? ''}
      </span>
    </div>
  );
}
