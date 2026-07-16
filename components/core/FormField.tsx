import React from 'react';
import { cn } from '../utils/cn';
import styles from './FormField.module.css';

export interface FormFieldContextValue {
  /** id for the wrapped control (matches the label's htmlFor). */
  id: string;
  /** id of the always-present error live region. */
  errorId: string;
  invalid: boolean;
  required: boolean;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

/** Read the enclosing FormField wiring; null outside a FormField. */
export function useFormField(): FormFieldContextValue | null {
  return React.useContext(FormFieldContext);
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visible label above the slot. */
  label?: string;
  /** `id` for the child control. Auto-generated when omitted. */
  htmlFor?: string;
  /** Optional helper text shown below the label. */
  hint?: string;
  /** Validation message shown below children; announced via `aria-live="polite"`. */
  error?: string;
  /** Appends a red `*` and marks the wired control as required. @default false */
  required?: boolean;
  /** The input, select, textarea, or any form element. */
  children?: React.ReactNode;
}

/**
 * Slot-based form wrapper: label → hint → children → error.
 * Provides FormFieldContext so Input/Select/Textarea auto-wire
 * id, aria-describedby, aria-invalid, and required.
 */
export function FormField({ label, htmlFor, hint, error, required = false, children, className, style, ...rest }: FormFieldProps): React.ReactElement {
  const autoId = React.useId();
  const fieldId = htmlFor ?? `field-${autoId}`;
  const errorId = `${fieldId}-formfield-error`;

  const ctx = React.useMemo<FormFieldContextValue>(
    () => ({ id: fieldId, errorId, invalid: Boolean(error), required }),
    [fieldId, errorId, error, required],
  );

  return (
    <FormFieldContext.Provider value={ctx}>
      <div {...rest} className={cn(styles.wrapper, className)} style={style}>
        {label && (
          <label htmlFor={fieldId} className={styles.label}>
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
          id={errorId}
          aria-live="polite"
          className={styles.error}
        >
          {error ?? ''}
        </span>
      </div>
    </FormFieldContext.Provider>
  );
}
