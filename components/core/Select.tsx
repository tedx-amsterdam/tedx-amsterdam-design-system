import React from 'react';
import { cn } from '../utils/cn';
import { useFormField } from './FormField';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /** Visible label above the select. */
  label?: string;
  /** Array of options. */
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  onChange?: (value: string) => void;
  /** Placeholder shown when no value selected. @default "Select…" */
  placeholder?: string;
  disabled?: boolean;
  /** Validation message; triggers red error state. */
  error?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Branded native dropdown matching the Input underline style. */
export function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  error,
  id,
  className,
  style,
  ...rest
}: SelectProps & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof SelectProps>): React.ReactElement {
  const field = useFormField();
  const selectId = id || field?.id || (label ? `select-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const errorId = selectId && error ? `${selectId}-error` : undefined;
  const describedBy = [errorId, field?.errorId].filter(Boolean).join(' ') || undefined;
  const hasValue = Boolean(value);

  return (
    <div className={cn(styles.wrapper, className)} style={style}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectWrap}>
        <select
          id={selectId}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={field?.required || undefined}
          aria-invalid={Boolean(error) || Boolean(field?.invalid)}
          aria-describedby={describedBy}
          className={cn(
            styles.select,
            error && styles.error,
            !hasValue && styles.placeholder,
            disabled && styles.disabled,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          className={styles.chevron}
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      {error && (
        <span id={errorId} className={styles.errorMsg}>
          {error}
        </span>
      )}
    </div>
  );
}
