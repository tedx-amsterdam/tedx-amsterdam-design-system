import React from 'react';
import { cn } from '../utils/cn';
import { Tag } from './Tag';
import { AgendaClock } from './AgendaClock';
import styles from './Agenda.module.css';

export type AgendaItem = {
  /** Start time as written, e.g. "14:00". */
  time: string;
  /** End time as written, e.g. "15:00". Leave out for open-ended items such as an afterparty. */
  endTime?: string;
  title: string;
  /** Names of the people on stage, e.g. "Fieke Opdam, Joe Wilson". */
  speakers?: string;
  description?: string;
  /** Short note on the right, e.g. "No entry after start". */
  label?: string;
};

export type AgendaProps = React.HTMLAttributes<HTMLOListElement> & {
  items: AgendaItem[];
  /** Day of the event as YYYY-MM-DD. On that day the running item is marked "Now" and the earlier ones are dimmed, in Amsterdam time. */
  date?: string;
  /** Level of each item's title. @default 3 */
  headingLevel?: 2 | 3 | 4;
};

const CLOCK_TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

const toDateTime = (time: string) => (CLOCK_TIME.test(time) ? time : undefined);

/** Event schedule: a time, a title, an optional description and an optional label per item, as an ordered list. With a `date`, the running item is marked "Now" on the day itself. */
export function Agenda({ items, date, headingLevel = 3, className, ...rest }: AgendaProps): React.ReactElement {
  const Title = `h${headingLevel}` as const;
  return (
    <>
      <ol role="list" className={cn(styles.root, className)} data-agenda-date={date} {...rest}>
        {items.map(({ time, endTime, title, speakers, description, label }, index) => (
          <li key={`${index}-${time}-${title}`} className={styles.item}>
            <div className={styles.times}>
              <time className={styles.time} dateTime={toDateTime(time)}>
                {time}
              </time>
              {endTime && (
                <span className={styles.endTime}>
                  to <time dateTime={toDateTime(endTime)}>{endTime}</time>
                </span>
              )}
            </div>
            <div className={styles.content}>
              <Title className={styles.title}>{title}</Title>
              {speakers && (
                <p className={styles.speakers}>
                  <Tag dot>{speakers}</Tag>
                </p>
              )}
              {description && <p className={styles.description}>{description}</p>}
            </div>
            {label && <Tag color="red" className={styles.label}>{label}</Tag>}
          </li>
        ))}
      </ol>
      {date && <AgendaClock />}
    </>
  );
}
