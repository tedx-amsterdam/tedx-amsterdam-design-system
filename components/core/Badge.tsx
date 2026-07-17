import React from 'react';
import { cn } from '../utils/cn';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  /** Fill variant. @default "red" */
  color?: 'red' | 'white' | 'muted';
  /** @default "md" */
  size?: 'sm' | 'md';
}

/** Small inline pill label. Distinct from Tag: no dot, pill shape, inline flow. */
export function Badge({ label, color = 'red', size = 'md', className, style, ...rest }: BadgeProps): React.ReactElement {
  return (
    <span className={cn(styles.badge, styles[color], styles[size], className)} style={style} {...rest}>
      {label}
    </span>
  );
}
