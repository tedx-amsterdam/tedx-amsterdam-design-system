import React from 'react';
import { cn } from '../utils/cn';
import styles from './RadioGroup.module.css';

export interface RadioGroupOptionProps {
  value: string;
  label: string;
  /** Injected by RadioGroup parent via cloneElement — do not pass directly. */
  _name?: string;
  _groupValue?: string;
  _onChange?: (value: string) => void;
  _disabled?: boolean;
}

export interface RadioGroupProps {
  /** Shared name attribute for the radio inputs. */
  name: string;
  legend?: string;
  /** Currently selected value (controlled). */
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function RadioOption({ value, label, _name, _groupValue, _onChange, _disabled }: RadioGroupOptionProps): React.ReactElement {
  const id = `${_name}-${value}`;
  const isSelected = _groupValue === value;
  return (
    <label
      htmlFor={id}
      className={cn(styles.optionLabel, _disabled && styles.disabled)}
    >
      <span className={cn(styles.indicator, isSelected && styles.selected)}>
        {isSelected && (
          <span className={styles.dot} />
        )}
        <input
          id={id}
          type="radio"
          name={_name}
          value={value}
          checked={isSelected}
          onChange={() => _onChange?.(value)}
          disabled={_disabled}
          className={styles.nativeInput}
        />
      </span>
      <span className={styles.text}>{label}</span>
    </label>
  );
}

function RadioGroupRoot({ name, legend, value, onChange, disabled = false, children, style }: RadioGroupProps): React.ReactElement {
  return (
    <fieldset className={styles.fieldset} style={style}>
      {legend && (
        <legend className={styles.legend}>{legend}</legend>
      )}
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<RadioGroupOptionProps>, {
              _name: name,
              _groupValue: value,
              _onChange: onChange,
              _disabled: disabled,
            })
          : child
      )}
    </fieldset>
  );
}

interface RadioGroupType {
  (props: RadioGroupProps): React.ReactElement;
  Option: (props: RadioGroupOptionProps) => React.ReactElement;
}

export const RadioGroup = RadioGroupRoot as RadioGroupType;
RadioGroup.Option = RadioOption;
