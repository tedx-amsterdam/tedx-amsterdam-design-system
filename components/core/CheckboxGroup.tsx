import React from 'react';
import { cn } from '../utils/cn';
import styles from './CheckboxGroup.module.css';

export interface CheckboxGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Renders as a <legend> for screen-reader grouping. */
  legend?: string;
  children: React.ReactNode;
}

/** Fieldset wrapper for accessible grouping of multiple Checkbox components. */
export function CheckboxGroup({ legend, children, className, style, ...rest }: CheckboxGroupProps): React.ReactElement {
  return (
    <fieldset {...rest} className={cn(styles.fieldset, className)} style={style}>
      {legend && (
        <legend className={styles.legend}>{legend}</legend>
      )}
      {children}
    </fieldset>
  );
}
