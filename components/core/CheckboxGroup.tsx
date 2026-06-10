import React from 'react';
import styles from './CheckboxGroup.module.css';

export interface CheckboxGroupProps {
  /** Renders as a <legend> for screen-reader grouping. */
  legend?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/** Fieldset wrapper for accessible grouping of multiple Checkbox components. */
export function CheckboxGroup({ legend, children, style }: CheckboxGroupProps): React.ReactElement {
  return (
    <fieldset className={styles.fieldset} style={style}>
      {legend && (
        <legend className={styles.legend}>{legend}</legend>
      )}
      {children}
    </fieldset>
  );
}
