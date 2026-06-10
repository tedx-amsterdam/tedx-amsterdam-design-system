import React from 'react';
import { cn } from '../utils/cn';
import styles from './Radio.module.css';

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
export function Radio({ legend, options = [], value, onChange, name, disabled = false, style }: RadioProps): React.ReactElement {
  return (
    <fieldset className={styles.fieldset} style={style}>
      {legend && (
        <legend className={styles.legend}>{legend}</legend>
      )}
      {options.map((opt) => {
        const isSelected = value === opt.value;
        const radioId = `${name}-${opt.value}`;
        return (
          <label
            key={opt.value}
            htmlFor={radioId}
            className={cn(styles.optionLabel, disabled && styles.disabled)}
          >
            <span className={cn(styles.indicator, isSelected && styles.selected)}>
              {isSelected && (
                <span className={styles.dot} />
              )}
              <input
                id={radioId}
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange?.(opt.value)}
                disabled={disabled}
                className={styles.nativeInput}
              />
            </span>
            <span className={styles.text}>{opt.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
