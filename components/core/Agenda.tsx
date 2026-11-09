import React from 'react';
import { cn } from '../utils/cn';
import { Tag } from './Tag';
import styles from './Agenda.module.css';

export type AgendaItem = {
  /** Start time as written, e.g. "14:00". */
  time: string;
  title: string;
  description?: string;
  /** Short note on the right, e.g. "No entry after start". */
  label?: string;
};

export type AgendaProps = React.HTMLAttributes<HTMLOListElement> & {
  items: AgendaItem[];
  /** Level of each item's title. @default 3 */
  headingLevel?: 2 | 3 | 4;
};

const CLOCK_TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Event schedule: a time, a title, an optional description and an optional label per item, as an ordered list. */
export function Agenda({ items, headingLevel = 3, className, ...rest }: AgendaProps): React.ReactElement {
  const Title = `h${headingLevel}` as const;
  return (
    <ol className={cn(styles.root, className)} {...rest}>
      {items.map(({ time, title, description, label }, index) => (
        <li key={`${index}-${time}-${title}`} className={styles.item}>
          <time className={styles.time} dateTime={CLOCK_TIME.test(time) ? time : undefined}>
            {time}
          </time>
          <div className={styles.content}>
            <Title className={styles.title}>{title}</Title>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {label && <Tag color="red" className={styles.label}>{label}</Tag>}
        </li>
      ))}
    </ol>
  );
}
