import React from 'react';
import { cn } from '../utils/cn';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /** Visible label beside the checkbox. */
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Associates the native input; defaults to a slug of label. */
  id?: string;
}

/** Single checkbox. Checked state: red fill + white tick. */
export function Checkbox({ label, checked, onChange, disabled = false, id, className, style, ...rest }: CheckboxProps): React.ReactElement {
  const checkId = id || `checkbox-${String(label).toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <label
      {...rest}
      htmlFor={checkId}
      className={cn(styles.label, disabled && styles.disabled, className)}
      style={style}
    >
      <span className={cn(styles.indicator, checked && styles.checked)}>
        {checked && (
          <svg
            aria-hidden="true"
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            className={styles.tick}
          >
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <input
          id={checkId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className={styles.nativeInput}
        />
      </span>
      <span className={styles.text}>
        {label}
      </span>
    </label>
  );
}
