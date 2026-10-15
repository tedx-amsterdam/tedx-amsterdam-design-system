import React from 'react';
import { cn } from '../utils/cn';
import styles from './Accent.module.css';

export interface AccentProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** `white` on the red band, where the designs set the heading in black and these words in white. @default "red" */
  color?: 'red' | 'white';
}

/** Sets words inside a heading in the accent red, as the designs do ("Our <Accent>speakers</Accent>"); on the red band, in white. */
export function Accent({ children, color = 'red', className, ...rest }: AccentProps): React.ReactElement {
  return (
    <span className={cn(styles[color], className)} {...rest}>
      {children}
    </span>
  );
}
