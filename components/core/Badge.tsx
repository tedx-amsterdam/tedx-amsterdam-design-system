import React from 'react';
import { cn } from '../utils/cn';
import styles from './Badge.module.css';

export interface BadgeProps {
  label: string;
  /** Fill variant. @default "red" */
  color?: 'red' | 'white' | 'muted';
  /** @default "md" */
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

/** Small inline pill label. Distinct from Tag: no dot, pill shape, inline flow. */
export function Badge({ label, color = 'red', size = 'md', style }: BadgeProps): React.ReactElement {
  return (
    <span className={cn(styles.badge, styles[color], styles[size])} style={style}>
      {label}
    </span>
  );
}
